import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  cursor: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.posts = [...state.posts, ...payload];
      state.cursor = payload ? payload[payload.length - 1].$id : null;
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
      state.posts = [];
      state.cursor = null;
    },
  },
});

export const { setPosts, addPost, updatePost, removePost, cleanPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
