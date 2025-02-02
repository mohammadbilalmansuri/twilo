import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  posts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.status = true;
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.$id !== action.payload.$id
      );
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        (post) => post.$id === action.payload.$id
      );
      if (index !== -1) state.posts[index] = action.payload;
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
