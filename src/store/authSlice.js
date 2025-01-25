import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: localStorage.getItem("isLoggedIn") === "true",
  verified: localStorage.getItem("isVerified") === "true",
  userData: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { emailVerification, ...rest } = action.payload;

      if (!state.status) {
        state.status = true;
        localStorage.setItem("isLoggedIn", "true");
      }

      if (state.verified !== emailVerification) {
        state.verified = emailVerification;
        localStorage.setItem("isVerified", String(emailVerification));
      }

      state.userData = { ...state.userData, ...rest };
    },
    verify: (state) => {
      state.verified = true;
      localStorage.setItem("isVerified", "true");
    },
    logout: (state) => {
      state.status = false;
      state.verified = false;
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("isVerified");
      state.userData = {};
    },
  },
});

export const { login, verify, logout } = authSlice.actions;
export default authSlice.reducer;
