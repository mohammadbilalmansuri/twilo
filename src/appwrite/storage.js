import config from "../config";
import { Client, ID, ImageFormat, Storage } from "appwrite";

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
    if (!file) {
      throw new Error("File is required");
    }
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

  async deleteFile(fileId) {
    if (!fileId) {
      throw new Error("File ID is required");
    }

    try {
      await this.storage.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deleteFile :: ERROR:", error);
      throw error;
    }
  }

  getFilePreview(fileId) {
    if (!fileId) {
      throw new Error("File ID is required");
    }

    return this.storage.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const storageService = new StorageService();
export default storageService;
