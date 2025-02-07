import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: localStorage.getItem("isLoggedIn") === "true",
  verified: localStorage.getItem("isVerified") === "true",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      const { emailVerification, ...rest } = payload;

      if (!state.status) {
        state.status = true;
        localStorage.setItem("isLoggedIn", "true");
      }

      if (state.verified !== emailVerification) {
        state.verified = emailVerification;
        localStorage.setItem("isVerified", String(emailVerification));
      }

      state.user = { ...state.user, ...rest };
    },
    verifyUser: (state) => {
      state.verified = true;
      localStorage.setItem("isVerified", "true");
    },
    removeUser: (state) => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isVerified");
      state.status = false;
      state.verified = false;
      state.user = {};
    },
  },
});

export const { setUser, verifyUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
