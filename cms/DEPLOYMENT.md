# Deployment Guide

## Environment Variables Required

Make sure you have these environment variables set in your Vercel project:

### Public Variables (Client-side)
```
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
```

### Private Variables (Server-side only - more secure)
```
APPWRITE_PROJECT_ID=your_appwrite_project_id
APPWRITE_DATABASE_ID=your_appwrite_database_id
APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

## Security Improvements

✅ **Database credentials are now server-side only** - Your sensitive database IDs are no longer exposed to the client
✅ **API routes handle all database operations** - All Appwrite interactions happen through secure server-side API routes
✅ **Environment variable validation** - Build process validates all required variables

## Vercel Deployment Steps

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add all variables above (both public and private)
3. **Deploy**

## Troubleshooting 404 Errors

If you're getting a 404 error after deployment:

### 1. Check Environment Variables
- Verify all environment variables are set in Vercel
- Make sure you have both public and private variables
- Check that the values match your local `.env.local` file

### 2. Check Build Logs
- Look for any build errors in Vercel deployment logs
- Check if the validation script passes
- Look for environment variable validation errors

### 3. Common Issues

#### Missing Environment Variables
If environment variables are missing, you'll see errors in the console:
```
❌ Missing (Public): NEXT_PUBLIC_APPWRITE_PROJECT_ID
❌ Missing (Private): APPWRITE_DATABASE_ID
```

#### Appwrite Configuration
Make sure your Appwrite project is properly configured:
- Project ID is correct
- Database and collection IDs exist
- OAuth providers are configured

#### API Route Issues
The app now uses secure API routes. Check that:
- `/api/events/list` endpoint works
- `/api/events/create` endpoint works
- Server-side environment variables are accessible

## Local Development

1. Create `.env.local` file with your environment variables:
   ```
   # Public (client-side)
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   
   # Private (server-side)
   APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_DATABASE_ID=your_database_id
   APPWRITE_COLLECTION_ID=your_collection_id
   ```

2. Run `npm run dev`
3. Run `npm run validate-env` to check environment variables

## Build Process

The build process now includes:
1. Environment variable validation (both public and private)
2. TypeScript compilation
3. Next.js build

If any step fails, the deployment will fail with a clear error message.

## Architecture

- **Client-side**: Only has access to `NEXT_PUBLIC_APPWRITE_PROJECT_ID` for OAuth
- **Server-side**: Has access to all private variables for database operations
- **API Routes**: Handle all database interactions securely
- **Context**: Manages state and communicates with API routes
