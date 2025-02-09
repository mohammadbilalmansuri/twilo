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
      const index = state.profiles.findIndex((p) => p.$id === payload.$id);
      if (index !== -1) state.profiles[index] = payload;
    },
    cleanProfiles: () => initialState,
    addPost: (state, { payload }) => {
      if (!state.profiles.length) return;
      state.profiles = state.profiles.map((profile) =>
        profile.$id === payload.owner.$id
          ? {
              ...profile,
              posts: [...(profile.posts || []), payload],
              total: (profile.total || 0) + 1,
            }
          : profile
      );
    },
    updatePost: (state, { payload }) => {
      if (!state.profiles.length) return;
      state.profiles = state.profiles.map((profile) =>
        profile.$id === payload.owner.$id
          ? {
              ...profile,
              posts: profile.posts?.map((post) =>
                post.$id === payload.$id ? payload : post
              ),
            }
          : profile
      );
    },
    removePost: (state, { payload }) => {
      if (!state.profiles.length) return;
      state.profiles = state.profiles.map((profile) =>
        profile.$id === payload.owner.$id
          ? {
              ...profile,
              posts: profile.posts?.filter((post) => post.$id !== payload.$id),
              total: Math.max((profile.total || 0) - 1, 0),
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
