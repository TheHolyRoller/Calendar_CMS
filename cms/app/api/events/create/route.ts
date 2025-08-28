import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases, ID } from 'appwrite';

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const QUESTION_COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID;

export async function POST(request: NextRequest) {
  try {
    const { event_name, location_url } = await request.json();

    if (!event_name || !location_url) {
      return NextResponse.json(
        { error: 'Event name and location URL are required' },
        { status: 400 }
      );
    }

    if (!DATABASE_ID || !QUESTION_COLLECTION_ID) {
      return NextResponse.json(
        { error: 'Missing required Appwrite configuration' },
        { status: 500 }
      );
    }

    const result = await databases.createDocument(
      DATABASE_ID,
      QUESTION_COLLECTION_ID,
      ID.unique(),
      {
        event_name,
        location_url
      }
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error creating document:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
