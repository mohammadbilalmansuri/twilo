import config from "../config";
import { Client, Account } from "appwrite";

// creating a class for getting access for appwrite services.
// in the documentation there is seperate methods of each services available but this is the optimize and easy to understand and configure way to use appwrite services.

// this service is for user authentication.
export class AuthService {
  client = new Client(); // connected us as appwrite client to use services.
  account; // declare user account

  // contructor properties will assign to client and account that we created avobe.
  // we can also create this thing according to the documentation but we doing these this without the dependency on appwrite we can easily change our backend if we want to.
  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // these methods are async funtions because we don't want to proceed things if this will fail. if we change our backend we just need to change the functions ahead await of that backend who perform these kind of things.

  async createAccount({ userId, email, password, name }) {
    try {
      const userAccount = await this.account.create(
        // ID.unique(),
        userId,
        email,
        password,
        name
      );
      return userAccount ? this.loginUser({ email, password }) : null;
    } catch (error) {
      console.error("Appwrite Service :: createAccount :: ", error);
      // throw new Error("Failed to create account");
      throw error;
    }
  }

  async loginUser({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Appwrite Service :: loginUser :: ", error);
      throw error;
    }
  }

  async logoutUser() {
    try {
      await this.account.deleteSessions();
      return true;
    } catch (error) {
      console.error("Appwrite Service :: logoutUser :: ", error);
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

  async updateName(name) {
    try {
      return await this.account.updateName(name);
    } catch (error) {
      console.log("Appwrite Service :: updateUserName :: ", error);
      throw error;
    }
  }

  async updatePassword(newPassword, currentPassword) {
    try {
      return await this.account.updatePassword(newPassword, currentPassword);
    } catch (error) {
      console.log("Appwrite Service :: updatePassword :: ", error);
      throw error;
    }
  }
}

// created an object of AuthService class for getting the access of methods and properties of the class.
// and also like we don't need create object again again in diffrent diffrent file.
const authService = new AuthService();

export default authService;
