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
    login: (state, { payload }) => {
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
    verify: (state) => {
      state.verified = true;
      localStorage.setItem("isVerified", "true");
    },
    logout: (state) => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isVerified");
      state.status = false;
      state.verified = false;
      state.user = {};
    },
  },
});

export const { login, verify, logout } = authSlice.actions;
export default authSlice.reducer;
