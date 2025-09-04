import express from 'express';
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

export default linkRouter;
