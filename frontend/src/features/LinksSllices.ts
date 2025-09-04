import {createSlice} from "@reduxjs/toolkit";
import {createLink, fetchAllLinks} from "./LinkThunks.ts";
import {Link} from "../types";
import {RootState} from "../app/store.ts";

interface LinksState {
    items: Link[];
    fetchLoading: boolean;
    createLoading: boolean;
}

const initialState: LinksState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
};

export const linksSlice = createSlice({
    name: 'links',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllLinks.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAllLinks.fulfilled, (state, {payload}) => {
                state.items = Array.isArray(payload) ? payload : [payload];
                state.fetchLoading = false;
            })
            .addCase(createLink.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createLink.fulfilled, (state, {payload: link}) => {
                const newLink: Link = {
                    shortUrl: link.shortUrl,
                    originalUrl: '',
                };
                state.items.push(newLink);
                state.createLoading = false;
            })
            .addCase(createLink.rejected, (state) => {
                state.createLoading = false;
            })
    }
});

export const linksReducer = linksSlice.reducer;

export const selectFetchLinksLoading = (state: RootState) => state.links.fetchLoading;
