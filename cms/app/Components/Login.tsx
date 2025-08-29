"use client"; // needed if you're in Next.js 13+ with app router

import { useEffect, useState } from "react";
// import { account, } from "@/lib/appwrite";
import { account } from "../lib/appwrite";
import { OAuthProvider } from "appwrite";
import ProtectedPage from "../protected/page";
import Event from "../event/page";

export default function Login() {
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const loginWithGoogle = () => {
    try {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      account.createOAuth2Session(
        OAuthProvider.Google,
        `${baseUrl}/event`,        // Success redirect
        `${baseUrl}/fail`    // Failure redirect
      );
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to initiate login. Please try again.');
    }
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

  if (error) {
    return (
      <div className="text-red-500 mb-4">
        {error}
        <button 
          onClick={() => setError(null)}
          className="ml-2 text-blue-500 underline"
        >
          Try again
        </button>
      </div>
    );
  }

  if (user) {
    console.log('this is the current user', user); 
    // return <ProtectedPage />;
    return <Event/>; 
    
    
  }

  if(!user){
    console.error('no user found! \n', user); 
  }

  return (
    <button 
      onClick={loginWithGoogle} 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Sign in with Google
    </button>
  );
}
