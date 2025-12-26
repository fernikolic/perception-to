# Deploy AI Analysis Function - Manual Instructions

## The Issue
The "What's Happening Now" card shows "AI features temporarily unavailable" because the OpenAI API key isn't properly configured in the deployed Firebase function.

## Solution Steps

### 1. Firebase Configuration is Set
The OpenAI API key has already been configured in Firebase:
```bash
firebase functions:config:set openai.api_key="YOUR_OPENAI_API_KEY"
```
✅ This step is already completed.

### 2. Function Code is Updated
The `simple-dynamic-chat.ts` function has been updated to:
- Load environment variables with dotenv
- Use Firebase config or environment variables for the API key
- Handle errors gracefully
✅ This step is already completed.

### 3. Deploy the Function

Due to Firebase CLI version limitations, you need to deploy manually:

#### Option A: Deploy via Firebase Console
1. Go to https://console.firebase.google.com/project/perception-app-3db34/functions
2. Click on "Deploy" or "Redeploy" for the `dynamicSchemaChat` function
3. The function will use the configured API key

#### Option B: Deploy from Command Line (requires Node 20+)
If you have Node 20 or higher available:
```bash
cd /Users/fernandonikolic/perception/functions
npm run build
firebase deploy --only functions:dynamicSchemaChat
```

#### Option C: Deploy All Functions
If individual function deployment fails:
```bash
cd /Users/fernandonikolic/perception/functions
npm run build
firebase deploy --only functions
```

### 4. Verify the Deployment

After deployment, test the AI analysis:
1. Go to your app
2. Navigate to the Trends page
3. Check if "What's Happening Now" card shows AI-powered analysis
4. The message should no longer say "AI features temporarily unavailable"

## Technical Details

The function now:
- Reads the OpenAI API key from `functions.config().openai.api_key` (production)
- Falls back to `process.env.OPENAI_API_KEY` (local development)
- Returns proper error messages if the API key is missing
- Handles authentication and CORS properly

## Local Testing

To test locally before deployment:
```bash
cd functions
npm run build
firebase emulators:start --only functions
```

Then test the endpoint:
```bash
curl -X POST http://localhost:5001/perception-app-3db34/us-central1/dynamicSchemaChat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ID_TOKEN" \
  -d '{"question": "What are the latest Bitcoin trends?"}'
```

## Troubleshooting

If deployment fails with "Unexpected key extensions" error:
1. This is due to Firebase CLI version mismatch
2. Use the Firebase Console web interface to deploy instead
3. Or update Node.js to version 20+ and update Firebase CLI

If AI analysis still shows as unavailable after deployment:
1. Check Firebase Functions logs for errors
2. Verify the API key is correct in Firebase config
3. Ensure the function has sufficient memory (1GiB) and timeout (120s)