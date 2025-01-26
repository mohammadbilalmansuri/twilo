const config = {
  appUrl: window.location.origin,
  verifyEmailUrl: `${window.location.origin}/verify-email`,
  resetPasswordUrl: `${window.location.origin}/reset-password`,
  appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
  appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteUsersCollectionId: String(
    import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID
  ),
  appwritePostsCollectionId: String(
    import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID
  ),
  appwriteConnectionsCollectionId: String(
    import.meta.env.VITE_APPWRITE_CONNECTIONS_COLLECTION_ID
  ),
  appwriteCommentsCollectionId: String(
    import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID
  ),
  appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default config;
