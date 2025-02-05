import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    notification: notificationReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
