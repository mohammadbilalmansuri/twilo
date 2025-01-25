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
    try {
      await this.account.create(userId, email, password, name);
      const user = await this.loginUser({ email, password });
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      console.error("Appwrite :: createAccount :: ", error);
      throw error;
    }
  }

  async loginUser({ email, password }) {
    try {
      await this.account.createEmailPasswordSession(email, password);
      return await this.getCurrentUser();
    } catch (error) {
      console.error("Appwrite :: loginUser :: ", error);
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite Service :: getCurrentUser :: ", error);
      throw error;
    }
  }

  async sendVerificationEmail() {
    try {
      await this.account.createVerification(config.verifyEmailUrl);
      return true;
    } catch (error) {
      console.error("Appwrite :: sendVerificationEmail :: ", error);
      throw error;
    }
  }

  async verifyEmail(userId, secret) {
    try {
      await this.account.updateVerification(userId, secret);
      return true;
    } catch (error) {
      console.error("Appwrite :: verifyEmail :: ", error);
      throw error;
    }
  }

  async logoutUser() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.error("Appwrite :: logoutUser :: ", error);
      throw error;
    }
  }

  async updateName(name) {
    try {
      await this.account.updateName(name);
      return true;
    } catch (error) {
      console.log("Appwrite :: updateUserName :: ", error);
      throw error;
    }
  }

  async updatePassword(newPassword, currentPassword) {
    try {
      await this.account.updatePassword(newPassword, currentPassword);
      return true;
    } catch (error) {
      console.log("Appwrite :: updatePassword :: ", error);
      throw error;
    }
  }

  async sendResetPasswordLink(email) {
    try {
      await this.account.createRecovery(email, config.resetPasswordUrl);
      return true;
    } catch (error) {
      console.log("Appwrite :: resetPassword :: ", error);
      throw error;
    }
  }

  async resetPassword(userId, secret, password) {
    try {
      await this.account.updateRecovery(userId, secret, password);
      return true;
    } catch (error) {
      console.log("Appwrite :: resetPassword :: ", error);
      throw error;
    }
  }

  async deleteAccount(email, password, userId) {
    try {
      await this.loginUser(email, password);
      await this.account.deleteIdentity(userId);
      return true;
    } catch (error) {
      console.log("Appwrite :: deleteAccount :: ", error);
      throw error;
    }
  }

  async changeEmail(email, password) {
    try {
      await this.account.updateEmail(email, password);
      return true;
    } catch (error) {
      console.log("Appwrite :: changeEmail :: ", error);
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;
