import config from "../config";
import { Client, Databases, ID, Query } from "appwrite";
import authService from "./auth";

export class DatabaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  // User related methods

  async createUser({ userId, name, email }) {
    if (!userId || !name || !email) {
      throw new Error("User ID, name and email are required.");
    }

    try {
      await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        userId,
        { name, email }
      );
      return true;
    } catch (error) {
      console.error("Appwrite :: createUser :: ", error.message);
      throw error;
    }
  }

  async updateUserName(userId, name) {
    if (!userId || !name) {
      throw new Error("User ID and name are required.");
    }

    try {
      await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        userId,
        { name }
      );
      return true;
    } catch (error) {
      console.error("Appwrite :: updateUserName :: ", error.message);
      throw error;
    }
  }

  async getUser(userId) {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    try {
      return await this.databases.getDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        userId
      );
    } catch (error) {
      console.error("Appwrite :: getUser :: ", error.message);
      throw error;
    }
  }

  async deleteUser(userId) {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        userId
      );

      const connections = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteConnectionsCollectionId,
        [
          Query.or([
            Query.equal("follower", userId),
            Query.equal("followed", userId),
          ]),
        ]
      );
      await Promise.all(
        connections.documents.map((connection) =>
          this.deleteConnection(connection["$id"])
        )
      );

      return true;
    } catch (error) {
      console.error("Appwrite :: deleteUser :: ", error.message);
      throw error;
    }
  }

  // Post related methods

  async createPost({ title, excerpt, content, thumbnail, owner }) {
    if (!title || !content || !owner) {
      throw new Error("Title, excerpt, content, owner ID are required.");
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

  async getPostsByUser(userId, limit, cursor) {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    try {
      const queries = [
        Query.equal("owner", userId),
        Query.orderDesc("$updatedAt"),
      ];
      if (limit) queries.push(Query.limit(limit));
      if (cursor) queries.push(Query.cursorAfter(cursor));

      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwritePostsCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite :: getPostsByUser :: ", error.message);
      throw error;
    }
  }

  async getPosts(limit, cursor) {
    try {
      const queries = [Query.orderDesc("$updatedAt")];
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

  // Connection related methods

  async createConnection(follower, followed) {
    if (!follower || !followed) {
      throw new Error("Follower and followed IDs are required.");
    }

    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteConnectionsCollectionId,
        ID.unique(),
        { follower, followed }
      );
    } catch (error) {
      console.error("Appwrite :: createConnection :: ", error.message);
      throw error;
    }
  }

  async deleteConnection(connectionId) {
    if (!connectionId) {
      throw new Error("Connection ID is required.");
    }

    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteConnectionsCollectionId,
        connectionId
      );
      return true;
    } catch (error) {
      console.error("Appwrite :: deleteConnection :: ", error.message);
      throw error;
    }
  }

  async getFollowers(userId) {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteConnectionsCollectionId,
        [Query.equal("followed", userId), Query.orderDesc("$updatedAt")]
      );
    } catch (error) {
      console.error("Appwrite :: getFollowers :: ", error.message);
      throw error;
    }
  }

  async getFollowing(userId) {
    if (!userId) {
      throw new Error("User ID is required.");
    }

    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteConnectionsCollectionId,
        [Query.equal("follower", userId), Query.orderDesc("$updatedAt")]
      );
    } catch (error) {
      console.error("Appwrite :: getFollowing :: ", error.message);
      throw error;
    }
  }

  // Comment related methods

  async addComment({ postId, comment, owner }) {
    if (!postId || !comment || !owner) {
      throw new Error("Post ID, comment and owner ID are required.");
    }

    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCommentsCollectionId,
        ID.unique(),
        { postId, comment, owner }
      );
    } catch (error) {
      console.error("Appwrite :: addComment :: ", error.message);
      throw error;
    }
  }

  async deleteComment(commentId) {
    if (!commentId) {
      throw new Error("Comment ID is required.");
    }

    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCommentsCollectionId,
        commentId
      );
      return true;
    } catch (error) {
      console.error("Appwrite :: deleteComment :: ", error.message);
      throw error;
    }
  }

  async getCommentsByPost(postId, limit, cursor) {
    if (!postId) {
      throw new Error("Post ID is required.");
    }

    try {
      const queries = [
        Query.equal("postId", postId),
        Query.orderDesc("$updatedAt"),
      ];
      if (limit) queries.push(Query.limit(limit));
      if (cursor) queries.push(Query.cursorAfter(cursor));

      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCommentsCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite :: getCommentsByPost :: ", error.message);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
