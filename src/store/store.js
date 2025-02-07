import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import feedReducer from "./feedSlice";
import profilesSlice from "./profilesSlice";
import notificationReducer from "./notificationSlice";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    auth: authReducer,
    feed: feedReducer,
    profiles: profilesSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
