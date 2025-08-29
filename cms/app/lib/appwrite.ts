import { Client, Databases, Account } from "appwrite";

const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;

if (!projectId) {


  console.error('this is the project ID \n', projectId); 

  throw new Error('APPWRITE_PROJECT_ID is not defined in environment variables');
}

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(projectId);

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
