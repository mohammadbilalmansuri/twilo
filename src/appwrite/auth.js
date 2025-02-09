import config from "../config";
import { Client, Account } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createAccount({ userId, email, password, name }) {
    if (!userId || !email || !password || !name) {
      throw new Error("User ID, email, password, and name are required.");
    }

    try {
      await this.account.create(userId, email, password, name);
      const user = await this.loginUser({ email, password });
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.error("Appwrite :: createAccount :: ", error.message);
      throw error;
    }
  }

  async loginUser({ email, password }) {
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    try {
      await this.account.createEmailPasswordSession(email, password);
      return await this.getCurrentUser();
    } catch (error) {
      console.error("Appwrite :: loginUser :: ", error.message);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Appwrite Service :: getCurrentUser :: ", error.message);
      throw error;
    }
  }

  async sendVerificationEmail() {
    try {
      await this.account.createVerification(config.VerificationUrl);
      return true;
    } catch (error) {
      console.error("Appwrite :: sendVerificationEmail :: ", error.message);
      throw error;
    }
  }

  async verification(userId, secret) {
    if (!userId || !secret) {
      throw new Error("User ID and secret are required.");
    }

    try {
      await this.account.updateVerification(userId, secret);
      return true;
    } catch (error) {
      console.error("Appwrite :: Verification :: ", error.message);
      throw error;
    }
  }

  async logoutUser() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.error("Appwrite :: logoutUser :: ", error.message);
      throw error;
    }
  }

  async sendPasswordResetLink(email) {
    if (!email) {
      throw new Error("Email is required.");
    }

    try {
      await this.account.createRecovery(email, config.resetPasswordUrl);
      return true;
    } catch (error) {
      console.error("Appwrite :: sendPasswordResetLink :: ", error.message);
      throw error;
    }
  }

  async resetPassword({ userId, secret, password }) {
    if (!userId || !secret || !password) {
      throw new Error("User ID, secret, and password are required.");
    }

    try {
      await this.account.updateRecovery(userId, secret, password);
      return true;
    } catch (error) {
      console.error("Appwrite :: resetPassword :: ", error.message);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
