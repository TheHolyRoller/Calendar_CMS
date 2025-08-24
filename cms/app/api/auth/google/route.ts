import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { Client, Account } from "node-appwrite";

const clientId = process.env.GOOGLE_CLIENT_ID!;
const googleClient = new OAuth2Client(clientId);

async function verifyGoogleToken(token: string) {
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: clientId,
    });
    return ticket.getPayload();
  } catch (error) {
    console.error("Error verifying Google token:", error);
    return null;
  }
}

export async function POST(req: Request) {
  const { token } = await req.json();
  const payload = await verifyGoogleToken(token);

  if (!payload) {
    return NextResponse.json({ message: "Invalid Google token" }, { status: 401 });
  }

  const { email, name } = payload;

  // ✅ Check if the email matches your predefined account
  const PREDEFINED_EMAIL = process.env.APPWRITE_USER_EMAIL!;
  const PREDEFINED_PASSWORD = process.env.APPWRITE_USER_PASSWORD!;

  if (email !== PREDEFINED_EMAIL) {
    return NextResponse.json({ message: "Unauthorized email" }, { status: 403 });
  }

  // 🔑 Initialize Appwrite client for server
  const appwrite = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  const account = new Account(appwrite);

  try {
    // Create a session for the predefined account
    const session = await account.createSession(PREDEFINED_EMAIL, PREDEFINED_PASSWORD);

    return NextResponse.json({
      message: "Authentication successful",
      user: { email, name },
      session, // contains JWT & session info
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Appwrite session failed" }, { status: 500 });
  }
}
