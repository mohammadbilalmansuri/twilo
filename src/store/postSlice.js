import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      state.status = true;
      state.posts = payload;
    },
    addPost: (state, { payload }) => {
      state.posts = [payload, ...state.posts];
    },
    removePost: (state, { payload }) => {
      state.posts = state.posts.filter(({ $id }) => $id !== payload.$id);
    },
    updatePost: (state, { payload }) => {
      const index = state.posts.findIndex(({ $id }) => $id === payload.$id);
      if (index !== -1) state.posts[index] = payload;
    },
    cleanPosts: (state) => {
      state.status = false;
      state.posts = [];
    },
  },
});

export const { setPosts, addPost, updatePost, removePost, cleanPosts } =
  postSlice.actions;

export default postSlice.reducer;
