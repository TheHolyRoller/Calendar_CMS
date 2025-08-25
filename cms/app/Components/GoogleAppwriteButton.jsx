"use client";

import { account } from "../lib/appwrite";
import { OAuthProvider } from "appwrite";
import { useEffect, useState } from "react";

export default function GoogleAppwriteButton() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginSIWG = () => {
    account.createOAuth2Session(
      OAuthProvider.Google,
      "http://localhost:3000/", // success redirect
      "http://localhost:3000/fail" // failure redirect
    );
  };

  const fetchUserWithRetry = async (retries = 10, delay = 500) => {
    for (let i = 0; i < retries; i++) {
      try {
        const currentUser = await account.get(); // throws 401 if no session
        return currentUser;
      } catch (err) {
        await new Promise((res) => setTimeout(res, delay));
      }
    }
    throw new Error("No active session after retries");
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        // Step 1: Ensure session exists in the browser
        const currentUser = await fetchUserWithRetry();
        console.log("Appwrite session found:", currentUser);

        const ALLOWED_EMAIL = process.env.NEXT_PUBLIC_APPWRITE_USER_EMAIL;

        // Step 2: Check email client-side
        if (currentUser.email !== ALLOWED_EMAIL) {
          alert("Unauthorized email");
          return;
        }

        // Step 3: Send email to server to issue JWT
        const res = await fetch("/api/auth/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: currentUser.email }),
        });
        const data = await res.json();

        if (!res.ok) {
          console.warn("Server rejected JWT:", data.message);
          return;
        }

        // Step 4: Store JWT locally
        localStorage.setItem("jwt", data.jwt);
        setUser(currentUser);
      } catch (err) {
        console.log("No active session or unauthorized account");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      {loading && <p>Loading...</p>}
      {user ? (
        <h3>Hi {user.name || user.email} 👋</h3>
      ) : (
        <button
          onClick={loginSIWG}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
}
