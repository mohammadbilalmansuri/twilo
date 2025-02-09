import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  cursor: null,
  total: 0,
  hasMore: true,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setPosts: (state, { payload }) => {
      if (!payload) return;
      const posts = new Map(
        [...state.posts, ...payload.documents].map((p) => [p.$id, p])
      );
      state.posts = Array.from(posts.values());
      state.cursor = state.posts.length
        ? state.posts[state.posts.length - 1].$id
        : null;
      state.total = payload.total;
      state.hasMore = state.posts.length < state.total;
    },
    cleanPosts: () => initialState,
  },
});

export const { setPosts, cleanPosts } = feedSlice.actions;

export default feedSlice.reducer;
