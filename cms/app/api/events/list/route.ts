import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases, Query } from 'appwrite';

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.APPWRITE_PROJECT_ID!);

const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const QUESTION_COLLECTION_ID = process.env.APPWRITE_COLLECTION_ID;

export async function GET() {
  try {
    if (!DATABASE_ID || !QUESTION_COLLECTION_ID) {
      return NextResponse.json(
        { error: 'Missing required Appwrite configuration' },
        { status: 500 }
      );
    }

    const allEvents = [];
    let offset = 0;
    let total;

    do {
      const response = await databases.listDocuments(
        DATABASE_ID,
        QUESTION_COLLECTION_ID,
        [
          Query.limit(1000),
          Query.offset(offset), 
        ]
      );
      
      if (response.documents.length === 0) break;
    
      allEvents.push(...response.documents);
      total = response.total;
      offset += response.documents.length;
    
    } while (offset < total);

    return NextResponse.json({ events: allEvents });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
