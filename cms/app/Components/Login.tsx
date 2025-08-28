"use client"; // needed if you’re in Next.js 13+ with app router

import { useEffect, useState } from "react";
// import { account, } from "@/lib/appwrite";
import { account } from "../lib/appwrite";
import { OAuthProvider } from "appwrite";
import ProtectedPage from "../protected/page";

export default function Login() {
  const [user, setUser] = useState<any>(null);

  const loginWithGoogle = () => {
    account.createOAuth2Session(
      OAuthProvider.Google,
      "http://localhost:3000/protected",        // Success redirect
      "http://localhost:3000/fail"    // Failure redirect
    );
  };

  useEffect(() => {
    const fetchUser = async () => {

        console.log('this is the fetch user function'); 

      try {
        const current = await account.get();
        console.log('this is the current account \n', current); 
        setUser(current);
      } catch (err) {
        console.log("No user logged in");
      }
    };

    fetchUser();
  }, []);

  if (user) {

    console.log('this is the current user', user); 

    // return <h3>Hi {user.name || user.email} 👋</h3>;
    // return <ProtectedPage/> 
    
  }

  if(!user){

    console.error('no user found! \n', user); 


  }

  return (
    <button 
      onClick={loginWithGoogle} 
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Sign in with Google
    </button>
  );
}
