import { Client, Databases, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!); // ✅ fix here

export const account = new Account(client);
export const databases = new Databases(client);

// Optional: utility to verify session
export const verifyConnection = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.error("Appwrite connection error:", error);
    throw error;
  }
};
