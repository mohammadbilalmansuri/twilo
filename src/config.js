const config = {
  appUrl: window.location.origin,
  VerificationUrl: `${window.location.origin}/verification`,
  resetPasswordUrl: `${window.location.origin}/reset-password`,
  appwriteUrl: import.meta.env.VITE_APPWRITE_URL,
  appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  appwriteDatabaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  appwriteProfilesCollectionId: import.meta.env
    .VITE_APPWRITE_PROFILES_COLLECTION_ID,
  appwritePostsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
  appwriteBucketId: import.meta.env.VITE_APPWRITE_BUCKET_ID,
  tinyMceApiKey: import.meta.env.VITE_TINYMCE_API_KEY,
};

export default config;
