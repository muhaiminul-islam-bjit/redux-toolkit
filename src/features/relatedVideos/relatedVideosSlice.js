import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getRelatedVideos } from "./relatedVideosAPI";

const initialState = {
    relatedVideos: {},
    isLoading: false,
    isError: false,
    error: "",
};

export const fetchRelatedVideo = createAsyncThunk("relatedvideos/fetchRelatedVideo", async ({ tags, id }) => {
    const relatedVideos = await getRelatedVideos({ tags, id });
    return relatedVideos;
});

const relatedVideosSloice = createSlice({
    name: "relatedVideos",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchRelatedVideo.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchRelatedVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.relatedVideos = action.payload;
            })
            .addCase(fetchRelatedVideo.rejected, (state, action) => {
                state.isLoading = false;
                state.relatedVideos = {};
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export default relatedVideosSloice.reducer;
