import config from "../config";
import { Client, Databases, ID, Query } from "appwrite";

export class DatabaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  // Profile methods

  async createProfile({ userId, name, email }) {
    if (!userId || !name || !email) {
      throw new Error("User ID, name and email are required.");
    }

    try {
      await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteProfilesCollectionId,
        userId,
        { name, email }
      );
      return true;
    } catch (error) {
      console.error("Appwrite :: createProfile :: ", error.message);
      throw error;
    }
  }

  async updateProfile(userId, updatedProfileData) {
    if (!userId || !updatedProfileData) {
      throw new Error("User ID and updated data are required.");
    }

    try {
      await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteProfilesCollectionId,
        userId,
        updatedProfileData
      );
      return true;
    } catch (error) {
      console.error("Appwrite :: updateProfile :: ", error.message);
      throw error;
    }
  }

  async getProfile(userId) {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteProfilesCollectionId,
        userId
      );
    } catch (error) {
      console.error("Appwrite :: getProfile :: ", error.message);
      throw error;
    }
  }

  // Post related methods

  async createPost({ title, excerpt, content, thumbnail, owner }) {
    if (!title || !excerpt || !owner) {
      throw new Error("Title, excerpt, owner ID are required.");
    }

    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwritePostsCollectionId,
        ID.unique(),
        { title, excerpt, content, thumbnail, owner }
      );
    } catch (error) {
      console.error("Appwrite :: createPost :: ", error.message);
      throw error;
    }
  }

  async updatePost(postId, updatedPostData) {
    if (!postId || !updatedPostData) {
      throw new Error("Post ID and updated data are required.");
    }

    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwritePostsCollectionId,
        postId,
        updatedPostData
      );
    } catch (error) {
      console.error("Appwrite :: updatePost :: ", error.message);
      throw error;
    }
  }

  async deletePost(postId) {
    if (!postId) {
      throw new Error("Post ID is required.");
    }

    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwritePostsCollectionId,
        postId
      );
      return true;
    } catch (error) {
      console.error("Appwrite :: deletePost :: ", error.message);
      throw error;
    }
  }

  async getPost(postId) {
    if (!postId) {
      throw new Error("Post ID is required.");
    }

    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwritePostsCollectionId,
        postId
      );
    } catch (error) {
      console.error("Appwrite :: getPost :: ", error.message);
      throw error;
    }
  }

  async getPosts({ userId = null, limit, cursor }) {
    try {
      const queries = [Query.orderDesc("$createdAt")];

      if (userId) queries.push(Query.equal("owner", userId));
      if (limit) queries.push(Query.limit(limit));
      if (cursor) queries.push(Query.cursorAfter(cursor));

      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwritePostsCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite :: getPosts :: ", error.message);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
