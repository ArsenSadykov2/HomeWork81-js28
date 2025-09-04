import {createAsyncThunk} from "@reduxjs/toolkit";

import {Link, OriginalUrl} from "../types";
import axiosAPI from "../axiosApi.ts";

export const fetchAllLinks = createAsyncThunk<Link, void>(
    'links/fetchAllLinks',
    async () => {
        const response = await axiosAPI.get<Link>('/links');
        return response.data;
    }
);


export const createLink = createAsyncThunk<{ shortUrl: string }, OriginalUrl>(
    'links/createLink',
    async (linkToAdd) => {
        const response = await axiosAPI.post<{ shortUrl: string }>('/links', {
            originalUrl: linkToAdd.originalUrl
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }
);