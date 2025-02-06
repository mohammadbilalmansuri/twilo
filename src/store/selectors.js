import { createSelector } from "reselect";
const selectAuthState = (state) => state.auth;
const selectPostsState = (state) => state.posts;
const selectNotificationState = (state) => state.notification;

// Auth Selectors
export const selectIsLoggedIn = createSelector(
  [selectAuthState],
  (authState) => authState.status
);

export const selectIsVerified = createSelector(
  [selectAuthState],
  (authState) => authState.verified
);

export const selectUser = createSelector(
  [selectAuthState],
  (authState) => authState.user
);

// Posts Selectors

export const selectPosts = createSelector(
  [selectPostsState],
  (postState) => postState.posts
);

export const selectCursor = createSelector(
  [selectPostsState],
  (postState) => postState.cursor
);

// Notification Selectors

export const selectNotification = createSelector(
  [selectNotificationState],
  (notificationState) => ({
    isOpen: notificationState.isOpen,
    type: notificationState.type,
    message: notificationState.message,
  })
);
