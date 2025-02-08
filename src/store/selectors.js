import { createSelector } from "reselect";
const selectNotificationState = (state) => state.notification;
const selectAuthState = (state) => state.auth;
const selectFeedState = (state) => state.feed;
const selectProfilesState = (state) => state.profiles;

// Notification Selectors

export const selectNotification = createSelector(
  [selectNotificationState],
  (notificationState) => ({
    isOpen: notificationState.isOpen,
    type: notificationState.type,
    message: notificationState.message,
  })
);

// Auth State Selectors
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

// Feed State Selectors

export const selectPosts = createSelector(
  [selectFeedState],
  (feedState) => feedState.posts
);

export const selectCursor = createSelector(
  [selectFeedState],
  (feedState) => feedState.cursor
);

export const selectHasMore = createSelector(
  [selectFeedState],
  (feedState) => feedState.hasMore
);

export const selectTotalPosts = createSelector(
  [selectFeedState],
  (feedState) => feedState.total
);

// Profile State Selectors

export const selectProfiles = createSelector(
  [selectProfilesState],
  (profilesState) => profilesState.profiles
);
