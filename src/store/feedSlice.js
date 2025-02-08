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
      state.posts = [
        ...new Map(
          [...state.posts, ...documents].map((p) => [p.$id, p])
        ).values(),
      ];
      state.cursor = state.posts.length
        ? state.posts[state.posts.length - 1].$id
        : null;
      state.hasMore = state.posts.length < total;
      state.total = total;
    },
    cleanPosts: (state) => (state = initialState),
  },
});

export const { setPosts, cleanPosts } = feedSlice.actions;

export default feedSlice.reducer;
