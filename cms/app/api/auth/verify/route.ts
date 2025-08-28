import { NextResponse } from "next/server";
import { Client, Account } from "node-appwrite";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const ALLOWED_EMAIL = process.env.APPWRITE_USER_EMAIL!;
    if (email !== ALLOWED_EMAIL) {
      return NextResponse.json(
        { message: "Unauthorized email" },
        { status: 403 }
      );
    }

    // Initialize Appwrite client with server API key
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_ENDPOINT!)
      .setProject(process.env.APPWRITE_PROJECT_ID!)
      .setKey(process.env.APPWRITE_API_KEY!);

    const account = new Account(client);

    // Issue server-side JWT for the allowed email
    const jwt = await account.createJWT();

    return NextResponse.json({
      jwt: jwt.jwt,
      user: { email },
    });
  } catch (err) {
    console.error("Auth verification error:", err);
    return NextResponse.json(
      { message: "Server error or invalid request" },
      { status: 500 }
    );
  }
}
