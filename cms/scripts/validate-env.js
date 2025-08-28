#!/usr/bin/env node

const requiredPublicEnvVars = [
  'NEXT_PUBLIC_APPWRITE_PROJECT_ID'
];

const requiredPrivateEnvVars = [
  'APPWRITE_PROJECT_ID',
  'APPWRITE_DATABASE_ID',
  'APPWRITE_COLLECTION_ID'
];

console.log('🔍 Validating environment variables...');

const missingPublicVars = [];
const missingPrivateVars = [];

// Check public variables (for client-side)
requiredPublicEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    missingPublicVars.push(varName);
    console.log(`❌ Missing (Public): ${varName}`);
  } else {
    console.log(`✅ Found (Public): ${varName}`);
  }
});

// Check private variables (for server-side)
requiredPrivateEnvVars.forEach(varName => {
  if (!process.env[varName]) {
    missingPrivateVars.push(varName);
    console.log(`❌ Missing (Private): ${varName}`);
  } else {
    console.log(`✅ Found (Private): ${varName}`);
  }
});

const allMissing = [...missingPublicVars, ...missingPrivateVars];

if (allMissing.length > 0) {
  console.error('\n🚨 Missing required environment variables:');
  
  if (missingPublicVars.length > 0) {
    console.error('\nPublic variables (for client-side):');
    missingPublicVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
  }
  
  if (missingPrivateVars.length > 0) {
    console.error('\nPrivate variables (for server-side):');
    missingPrivateVars.forEach(varName => {
      console.error(`   - ${varName}`);
    });
  }
  
  console.error('\nPlease add these variables to your .env.local file and Vercel environment variables.');
  console.error('\nNote: Private variables (without NEXT_PUBLIC_) are only available server-side.');
  process.exit(1);
} else {
  console.log('\n✅ All required environment variables are present!');
}
