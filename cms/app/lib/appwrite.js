'use client';

// import them from appwrite here 

import { Client, Databases, Account } from 'appwrite'; 
import { use } from 'react';
const projectID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID; 

if (!projectID) {
  throw new Error('NEXT_PUBLIC_APPWRITE_PROJECT_ID is not defined');
  console.log('No PROJECT ID \n'); 
}

const client = new Client(); 

  
// TO DO Change this to the newly configured sub domain from 123reg 
// client.setEndpoint("https://api.ivvidyslexiascreener.com")
client.setEndpoint("https://fra.cloud.appwrite.io/v1")
.setProject(projectID); 

export const account = new Account(client); 
console.log('this is the client object \n', client); 


// Add in the anonymous session auth here 
export const createAnonymousSession = async () => {

    try{

      // Get the user here and assign it to a variable 
      const user = await account.get(); 

      // Now check if that user actually exists and if they do the user had logged in before but if they don't then throw an error and pass on the auth session creation to the catch block and return the user so the function stops running 
      if(user){

        console.log('User already exists \n', user);
        return user; 


      }

    

    }

    catch(error){


      // Now check the error code and if it matches 401 and not like 500 or 404 then you can proceed with account creation because it just means that the user does not exist and we should create one 
      if(error.code === 401){

        console.log("🔐 No session found, creating anonymous session...");

        // Now create the new user 
        const newUser = await account.createAnonymousSession(); 
        console.log("✅ Anonymous session created");
        return newUser; 

      }
      // Now in the else block throw an error if there was any other error code indicating there was a problem checking if there was a user or there was insufficient permissions 
      else{

        console.error("❌ Unexpected error:", error); 

        throw error; 

      } 

    }

}

export const databases = new Databases(client); 

export const verifyConnection = async () => {
  try {
    const response = await account.get();
    return response;
  } catch (error) {
    console.error('Appwrite connection error:', error);
    throw error;
  }
};