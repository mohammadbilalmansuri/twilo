const config = {
  appUrl: window.location.origin,
  verifyEmailUrl: `${window.location.origin}/verify-email`,
  resetPasswordUrl: `${window.location.origin}/reset-password`,
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appwriteUsersCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  appwritePostsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
  appwriteConnectionsCollectionId: import.meta.env
    .VITE_APPWRITE_CONNECTIONS_COLLECTION_ID,
  appwriteCommentsCollectionId: import.meta.env
    .VITE_APPWRITE_COMMENTS_COLLECTION_ID,
  appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
};

export default config;
