import { Account } from "appwrite";
import client from "./client";

const account = new Account(client);

export const createAccount = async ({ userId, email, password, name }) => {
  if (!userId || !email || !password || !name)
    throw new Error("User ID, email, password, and name are required.");

  try {
    await account.create(userId, email, password, name);
    const user = await loginUser({ email, password });
    await sendVerificationEmail();
    return user;
  } catch (error) {
    console.error("Appwrite Error [createAccount]: ", error.message);
    throw error;
  }
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) throw new Error("Email and password are required.");
  try {
    await account.createEmailPasswordSession(email, password);
    return await getCurrentUser();
  } catch (error) {
    console.error("Appwrite Error [loginUser]: ", error.message);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.error("Appwrite Error [getCurrentUser]: ", error.message);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSessions();
    return true;
  } catch (error) {
    console.error("Appwrite Error [logoutUser]: ", error.message);
    throw error;
  }
};

export const sendVerificationEmail = async () => {
  try {
    await account.createVerification(config.VerificationUrl);
    return true;
  } catch (error) {
    console.error("Appwrite Error [sendVerificationEmail]: ", error.message);
    throw error;
  }
};

export const verifyEmail = async ({ userId, secret }) => {
  if (!userId || !secret) throw new Error("User ID and secret are required.");
  try {
    await account.updateVerification(userId, secret);
    return true;
  } catch (error) {
    console.error("Appwrite Error [verifyEmail]: ", error.message);
    throw error;
  }
};

export const sendPasswordResetLink = async ({ email }) => {
  if (!email) throw new Error("Email is required.");
  try {
    await account.createRecovery(email, config.resetPasswordUrl);
    return true;
  } catch (error) {
    console.error("Appwrite Error [sendPasswordResetLink]: ", error.message);
    throw error;
  }
};

export const resetPassword = async ({ userId, secret, password }) => {
  if (!userId || !secret || !password)
    throw new Error("User ID, secret, and password are required.");
  try {
    await account.updateRecovery(userId, secret, password);
    return true;
  } catch (error) {
    console.error("Appwrite Error [resetPassword]: ", error.message);
    throw error;
  }
};
