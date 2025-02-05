import { createSelector } from "reselect";
const selectAuthState = (state) => state.auth;
const selectPostState = (state) => state.post;
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

export const selectUserData = createSelector(
  [selectAuthState],
  (authState) => authState.userData
);

// Posts Selectors

export const selectPosts = createSelector(
  [selectPostState],
  (postState) => postState.posts
);

export const selectCursor = createSelector(
  [selectPostState],
  (postState) => postState.cursor
);

// Notification Selectors

export const selectNotification = createSelector(
  [selectNotificationState],
  (notificationState) => ({
    isOpen: notificationState.isOpen,
    content: notificationState.content,
  })
);
