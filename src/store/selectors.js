import { createSelector } from "reselect";
const selectAuthState = (state) => state.auth;
const selectPostState = (state) => state.post;

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

export const selectPosts = createSelector(
  [selectPostState],
  (postState) => postState.posts
);

export const selectCursor = createSelector(
  [selectPostState],
  (postState) => postState.cursor
);
