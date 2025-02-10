import config from "../config";
import client from "./appwriteClient";
import { Databases, ID, Query } from "appwrite";

const databases = new Databases(client);

export const createProfile = async ({ userId, name }) => {
  if (!userId || !name) throw new Error("User ID and name are required.");

  try {
    await databases.createDocument(
      config.appwriteDatabaseId,
      config.appwriteProfilesCollectionId,
      userId,
      { name }
    );
    return true;
  } catch (error) {
    console.error("Appwrite Error [createProfile]: ", error.message);

    throw error;
  }
};

export const getProfile = async (userId) => {
  if (!userId) throw new Error("User ID is required.");

  try {
    return await databases.getDocument(
      config.appwriteDatabaseId,
      config.appwriteProfilesCollectionId,
      userId
    );
  } catch (error) {
    console.error("Appwrite Error [getProfile]: ", error.message);
    throw error;
  }
};

export const createPost = async ({ summary, content, thumbnail, owner }) => {
  if (!summary || !owner) throw new Error("Summary and owner are required.");

  try {
    return await databases.createDocument(
      config.appwriteDatabaseId,
      config.appwritePostsCollectionId,
      ID.unique(),
      { summary, content, thumbnail, owner }
    );
  } catch (error) {
    console.error("Appwrite Error [createPost]: ", error.message);

    throw error;
  }
};

export const updatePost = async ({ postId, updatedPostData }) => {
  if (!postId || !updatedPostData || Object.keys(updatedPostData).length === 0)
    throw new Error("Post ID and at least one update field are required.");

  if (updatedPostData.owner) delete updatedPostData.owner;

  try {
    return await databases.updateDocument(
      config.appwriteDatabaseId,
      config.appwritePostsCollectionId,
      postId,
      updatedPostData
    );
  } catch (error) {
    console.error("Appwrite Error [updatePost]: ", error.message);
    throw error;
  }
};

export const deletePost = async (postId) => {
  if (!postId) throw new Error("Post ID is required.");

  try {
    return await databases.deleteDocument(
      config.appwriteDatabaseId,
      config.appwritePostsCollectionId,
      postId
    );
  } catch (error) {
    console.error("Appwrite Error [deletePost]: ", error.message);
    throw error;
  }
};

export const getFeed = async ({ userId, limit, cursor }) => {
  if (!userId) throw new Error("User ID is required.");

  try {
    const queries = [
      Query.orderDesc("$createdAt"),
      Query.notEqual("owner", userId),
    ];
    if (cursor) queries.push(Query.cursor(cursor));
    if (limit) queries.push(Query.limit(limit));

    return await databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwritePostsCollectionId,
      queries
    );
  } catch (error) {
    console.error("Appwrite Error [getFeed]: ", error.message);
    throw error;
  }
};

export const getUserPosts = async ({ userId, limit, cursor }) => {
  if (!userId) throw new Error("User ID is required.");

  try {
    const queries = [
      Query.orderDesc("$createdAt"),
      Query.equal("owner", userId),
    ];
    if (cursor) queries.push(Query.cursor(cursor));
    if (limit) queries.push(Query.limit(limit));

    return await databases.listDocuments(
      config.appwriteDatabaseId,
      config.appwritePostsCollectionId,
      queries
    );
  } catch (error) {
    console.error("Appwrite Error [getUserPosts]: ", error.message);
    throw error;
  }
};
