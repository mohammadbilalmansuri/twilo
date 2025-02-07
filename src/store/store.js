import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import postReducer from "./postsSlice";
import profilesSlice from "./profilesSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    profiles: profilesSlice,
    notification: notificationReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
