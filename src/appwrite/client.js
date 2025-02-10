import { Client } from "appwrite";
import config from "../config";

const client = new Client()
  .setEndpoint(config.appwriteUrl)
  .setProject(config.appwriteProjectId);

export default client;
