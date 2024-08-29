import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      if (!state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes.push(action.payload);
        state.currentVideo.dislikes.splice(
          state.currentVideo.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislike: (state, action) => {
      if (!state.currentVideo.dislikes.includes(action.payload)) {
        state.currentVideo.dislikes.push(action.payload);
        state.currentVideo.likes.splice(
          state.currentVideo.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },

    deleteVideo: (state, action) => {
        state.videos = state.videos.filter(video => video._id !== action.payload);
      },
      editVideo: (state, action) => {
     
        const index = state.videos.findIndex((video) => video._id === action.payload._id);
        if (index !== -1) {
          state.videos[index] = { ...state.videos[index], ...action.payload };
        }
    
        if (state.currentVideo && state.currentVideo._id === action.payload._id) {
          state.currentVideo = { ...state.currentVideo, ...action.payload };
        }
      },
  
    },

});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike, deleteVideo, editVideo } =
  videoSlice.actions;

export default videoSlice.reducer;