import config from "../config";
import { Client, Databases, ID, Query } from "appwrite";

// this service is for post related sevices in database.
export class DatabaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, media, userId, userName }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwritePostsCollectionId,
        ID.unique(),
        { title, userId, slug, content, media, userName }
      );
    } catch (error) {
      console.log("Appwrite Service :: createPost :: ERROR:", error);
      throw error;
    }
  }

  async updatePost(postId, { title, content, slug, media }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwritePostsCollectionId,
        postId,
        { title, slug, content, media }
      );
    } catch (error) {
      console.log("Appwrite Service :: updatePost :: ERROR:", error);
      throw error;
    }
  }

  async deletePost(postId) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDatabaseId,
        config.appwritePostsCollectionId,
        postId
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deletePost :: ERROR:", error);
      throw error;
    }
  }

  // using appwrite Query to filter post according queries values for this we have to import Query from appwrite and create and index of that query in appwrite collection.
  //like this but we are not using this here just because we will filter userpost from state.
  async getPosts(queries = [Query.orderDesc("$updatedAt")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwritePostsCollectionId,
        queries // we can also define queries directly here
      );
    } catch (error) {
      console.log("Appwrite Service :: getPosts :: ERROR:", error);
      throw error;
    }
  }

  // here we can get posts without any query in assending order by default
  // async getPosts() {
  //   try {
  //     return await this.databases.listDocuments(
  //       config.appwriteDatabaseId,
  //       config.appwritePostsCollectionId
  //     );
  //   } catch (error) {
  //     console.log("Appwrite Service :: getPosts :: ERROR:", error);
  //     throw error;
  //   }
  // }

  // with help of this we can get a single post in the basis of postId and if we want to get posts on the basis of other attribute we have to use queries
  // async getPost(postId) {
  //   try {
  //     return await this.databases.getDocument(
  //       config.appwriteDatabaseId,
  //       config.appwritePostsCollectionId,
  //       postId
  //     );
  //   } catch (error) {
  //     console.log("Appwrite Service :: getPost :: ERROR:", error);
  //     throw error;
  //   }
  // }

  async addUser({ email, name, id }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        id,
        { email, name }
      );
    } catch (error) {
      console.log("Appwrite Service :: addUser :: ERROR:", error);
      throw error;
    }
  }

  async updateUser(id, { name }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        id,
        { name }
      );
    } catch (error) {
      console.log("Appwrite Service :: updateUser :: ERROR:", error);
      throw error;
    }
  }

  async getUsers() {
    try {
      return await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId
      );
    } catch (error) {
      console.log("Appwrite Service :: getUsers :: ERROR:", error);
      throw error;
    }
  }
}

const databaseService = new DatabaseService();

export default databaseService;
