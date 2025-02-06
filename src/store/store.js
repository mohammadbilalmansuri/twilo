import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postsSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    notification: notificationReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
