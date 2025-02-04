import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cursor: null,
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.cursor = payload[payload.length - 1].$id;
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      state.posts = [payload, ...state.posts];
    },
    removePost: (state, { payload }) => {
      state.posts = state.posts.filter(({ $id }) => $id !== payload);
    },
    updatePost: (state, { payload }) => {
      const index = state.posts.findIndex(({ $id }) => $id === payload.$id);
      if (index !== -1) state.posts[index] = payload;
    },
    cleanPosts: (state) => {
      state.cursor = null;
      state.posts = [];
    },
  },
});

export const { setPosts, addPost, updatePost, removePost, cleanPosts } =
  postSlice.actions;

export default postSlice.reducer;
