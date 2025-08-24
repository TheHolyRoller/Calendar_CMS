"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function GoogleLogin() {

    const router = useRouter();



  useEffect(() => {
    // 1. Create script element
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    

    // 2. When script loads, initialize Google login
    script.onload = () => {
      const google = (window as any).google;
      if (!google) {
        console.error("Google library not loaded");
        return;
      }

      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    };

    // 3. Add script to document
    document.body.appendChild(script);

    // 4. Clean up on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function handleCredentialResponse(response: any) {
    const res = await fetch("/api/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: response.credential }),
    });
    const data = await res.json();
    console.log("Server response:", data);

    if (res.ok) {
      document.cookie = `auth_token=${data.session.$id}; path=/; max-age=86400;`;
    //   window.location.href = "/";
    router.push("/");
    console.log("Login response:", data);
    } else {
      alert(data.message || "Login failed");
    }
  }

  return <div id="googleSignInDiv"></div>;
}
