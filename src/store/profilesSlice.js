import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profiles: [],
};

const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    addProfile: (state, { payload }) => {
      const exists = state.profiles.some(
        (profile) => profile.$id === payload.$id
      );
      if (!exists) state.profiles.push(payload);
    },
    updateProfile: (state, { payload }) => {
      state.profiles = state.profiles.map((profile) =>
        profile.$id === payload.$id ? payload : profile
      );
    },
    cleanProfiles: (state) => (state = initialState),
    addPost: (state, { payload }) => {
      state.profiles = state.profiles.map((profile) =>
        profile.$id === payload.owner.$id
          ? {
              ...profile,
              posts: [payload, ...profile.posts],
              total: profile.total + 1,
            }
          : profile
      );
    },
    updatePost: (state, { payload }) => {
      state.profiles = state.profiles.map((profile) =>
        profile.$id === payload.owner.$id
          ? {
              ...profile,
              posts: profile.posts.map((post) =>
                post.$id === payload.$id ? payload : post
              ),
            }
          : profile
      );
    },
    removePost: (state, { payload }) => {
      state.profiles = state.profiles.map((profile) =>
        profile.$id === payload.owner.$id
          ? {
              ...profile,
              posts: profile.posts.filter((post) => post.$id !== payload.$id),
              total: profile.total - 1,
            }
          : profile
      );
    },
  },
});

export const {
  addProfile,
  updateProfile,
  cleanProfiles,
  addPost,
  updatePost,
  removePost,
} = profilesSlice.actions;
export default profilesSlice.reducer;
