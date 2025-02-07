import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  profiles: [],
  currentUserPosts: {},
};

const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setUserPosts: (state, { payload }) => {
      state.currentUserPosts = payload;
    },
    addPost: (state, { payload }) => {
      state.currentProfile = {
        ...state.currentProfile,
        posts: [...payload, ...state.currentProfile.posts],
      };
    },
    removePost: (state, { payload }) => {
      state.currentProfile = {
        ...state.currentProfile,
        posts: state.currentProfile.posts.filter(({ $id }) => $id !== payload),
      };
    },
    updatePost: (state, { payload }) => {
      state.currentProfile = {
        ...state.currentProfile,
        posts: state.currentProfile.posts.map((post) =>
          post.$id === payload.$id ? payload : post
        ),
      };
    },
    addProfile: (state, { payload }) => {
      state.profiles.push(payload);
    },
    cleanProfiles: (state) => (state = initialState),
  },
});

export const { setCurrentProfile, addProfile, cleanProfiles } =
  profilesSlice.actions;
export default profilesSlice.reducer;
