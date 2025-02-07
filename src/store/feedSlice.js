import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  cursor: null,
  hasMore: true,
  total: 0,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      if (!payload) return;
      const { documents, total } = payload;
      state.posts = [...state.posts, ...documents];
      state.cursor = state.posts[state.posts.length - 1].$id;
      state.hasMore = state.posts.length < total;
      state.total = total;
    },
    cleanPosts: (state) => (state = initialState),
  },
});

export const { setPosts, addPost, updatePost, removePost, cleanPosts } =
  feedSlice.actions;

export default feedSlice.reducer;
