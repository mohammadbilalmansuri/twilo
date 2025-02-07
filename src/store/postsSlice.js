import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  cursor: null,
  hasMore: true,
  total: 0,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      if (!payload) return;
      const { documents, total } = payload;
      state.posts = [...state.posts, ...documents];
      state.cursor = documents.length
        ? documents[documents.length - 1].$id
        : null;
      state.hasMore = state.posts.length < total;
      state.total = total;
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
      state.hasMore = true;
      state.total = 0;
    },
  },
});

export const { setPosts, addPost, updatePost, removePost, cleanPosts } =
  postsSlice.actions;

export default postsSlice.reducer;
