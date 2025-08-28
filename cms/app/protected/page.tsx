'use client';

import { useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (err) {
        console.error("No valid session:", err);
        router.push("/"); // back to login
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <main style={{ padding: 20 }}>
      <h1>Protected Page</h1>
      <p>Welcome, {user?.email} 🎉</p>
    </main>
  );
}
