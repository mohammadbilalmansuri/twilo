import config from "../config";
import client from "./client";
import { Storage, ID } from "appwrite";

const storage = new Storage(client);

export const uploadFile = async (file) => {
  if (!file) throw new Error("File is required");
  try {
    return await storage.createFile(config.appwriteBucketId, ID.unique(), file);
  } catch (error) {
    console.error("Appwrite Error [uploadFile]: ", error.message);
    throw error;
  }
};

export const deleteFile = async (fileId) => {
  if (!fileId) throw new Error("File ID is required");
  try {
    await storage.deleteFile(config.appwriteBucketId, fileId);
    return true;
  } catch (error) {
    console.error("Appwrite Error [deleteFile]: ", error.message);
    throw error;
  }
};

export const getFilePreview = (fileId) => {
  if (!fileId) throw new Error("File ID is required");
  return storage.getFilePreview(config.appwriteBucketId, fileId);
};
