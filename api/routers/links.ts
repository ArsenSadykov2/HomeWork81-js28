import express from 'express';
import {Error} from "mongoose";
import {LinkWithoutId} from "../types";
import Link from "../Models/Links";


const linkRouter = express.Router();

linkRouter.get('/', async (req, res, next) => {
    try{
        const links = await  Link.find();
        res.send(links);
    }catch(err){
        next(err);
    }
});

linkRouter.get('/:shortUrl', async (req, res) => {
    try {
        const shortUrl = req.params.shortUrl;
        const link = await Link.findOne({ shortUrl });

        if(!link){
            res.status(404).send("Link not found");
            return;
        }

        let redirectUrl = link.originalUrl;

        if (!redirectUrl.startsWith('http')) {
            redirectUrl = 'https://' + redirectUrl;
        }

        res.redirect(302, redirectUrl);

    } catch (err) {
        res.status(500).send('Что-то пошло не так');
    }
});

linkRouter.post('/', async (req, res, next) => {
    try {
        const originalUrl = req.body.originalUrl;

        const { nanoid } = require('nanoid/non-secure');

        const shortUrl = nanoid(7);

        const newLink: LinkWithoutId = {
            originalUrl: originalUrl,
            shortUrl: shortUrl,
        };

        const link = new Link(newLink);
        await link.save();
        res.send(link);

    } catch (error) {
        if(error instanceof Error.ValidationError){
            res.status(400).send(error)
            return;
        }
        next(error);
    }
});
export default linkRouter;