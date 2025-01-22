import config from "../config";
import { Client, ID, Storage } from "appwrite";

// this service is for store media files.
export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: ERROR:", error);
      throw error;
    }
  }

  async updateFile(file) {
    try {
      return await this.storage.updateFile(config.appwriteBucketId, file);
    } catch (error) {
      console.log("Appwrite Service :: updateFile :: ERROR:", error);
      throw error;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deleteFile :: ERROR:", error);
      throw error;
    }
  }

  // here we can use async function but this getFilePreview methos response fast thats why we are not using.
  getFilePreview(fileId) {
    return this.storage.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const storageService = new StorageService();

export default storageService;
