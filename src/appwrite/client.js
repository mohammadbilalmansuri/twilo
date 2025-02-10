import config from "../config";
import { Client } from "appwrite";

const client = new Client()
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

export default client;
