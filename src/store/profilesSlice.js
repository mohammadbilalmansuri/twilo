import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profiles: [],
  currentUserPosts: [],
};

const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setCurrentUserPosts: (state, { payload }) => {
      state.currentUserPosts = payload;
    },
    addPost: (state, { payload }) => {
      state.currentUserPosts = [payload, ...state.currentUserPosts];
    },
    updatePost: (state, { payload }) => {
      state.currentUserPosts = state.currentUserPosts.map((post) =>
        post.$id === payload.$id ? payload : post
      );
    },
    removePost: (state, { payload }) => {
      state.currentUserPosts = state.currentUserPosts.filter(
        ({ $id }) => $id !== payload
      );
    },
    addProfile: (state, { payload }) => {
      state.profiles.push(payload);
    },
    cleanProfiles: (state) => (state = initialState),
  },
});

export const {
  setCurrentUserPosts,
  addPost,
  updatePost,
  removePost,
  addProfile,
  cleanProfiles,
} = profilesSlice.actions;
export default profilesSlice.reducer;
