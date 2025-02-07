import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profiles: [],
};

const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setProfiles: (state, { payload }) => {
      state.profiles = [...state.profiles, ...payload];
    },
    cleanProfiles: (state) => {
      state.profiles = [];
    },
  },
});

export const { setProfiles, cleanProfiles } = profilesSlice.actions;
export default profilesSlice.reducer;
