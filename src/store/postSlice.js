import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  posts: null,
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
      state.posts = state.posts.filter((post) => post.$id !== action.payload);
    },
    updatePost: (state, action) => {
      state.posts = [action.payload, ...state.posts];

      /* if we want to update post without changing post index.
      const [postToUpdateId, updatedPost] = action.payload;
      state.posts = state.posts.map((post) =>
        post.$id === postToUpdateId ? updatedPost : post
      );
      then we have to dispatch that post like this from PostForm
      dispatch(updatePosts([post.$id, updatedPost])); */
    },
    cleanPosts: (state) => {
      state.status = false;
      state.posts = null;
    },
  },
});

export const { setPosts, addPost, updatePost, removePost, cleanPosts } =
  postSlice.actions;

export default postSlice.reducer;
