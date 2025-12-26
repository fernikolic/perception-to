# Firebase Analytics Integration Setup Guide

## Current Status
Your admin dashboard currently shows **mock data** that simulates your real Firebase Analytics numbers (252 MAU, 74 WAU, ~20-25 DAU). To display **real Firebase Analytics data**, follow the setup steps below.

## Why Mock Data?
The Firebase Analytics dashboard in Firebase Console uses **Google Analytics 4 (GA4) data**, which requires special API access and authentication to retrieve programmatically. Your dashboard needs to be connected to the same data source.

## Setup Steps

### 1. Enable Google Analytics Data API
```bash
# Open Google Cloud Console
https://console.cloud.google.com/apis/library/analyticsdata.googleapis.com

# Select your Firebase project: perception-app-3db34
# Click "Enable" to enable the Google Analytics Data API
```

### 2. Create Service Account
```bash
# Go to: https://console.cloud.google.com/iam-admin/serviceaccounts
# Select project: perception-app-3db34
# Click "Create Service Account"

Name: firebase-analytics-reader
Description: Service account for reading Firebase Analytics data
Role: Analytics Viewer
```

### 3. Download Service Account Key
```bash
# In Service Accounts page, click on your new service account
# Go to "Keys" tab
# Click "Add Key" > "Create new key" > JSON
# Download the JSON file
# Rename it to: firebase-analytics-key.json
```

### 4. Configure Firebase Functions
```bash
# Add the service account key to your Firebase Functions
# Upload firebase-analytics-key.json to Firebase Functions environment

# Or set environment variables:
firebase functions:config:set google.analytics.key_file="path/to/key.json"
firebase functions:config:set google.analytics.property_id="445998414364"
```

### 5. Grant Analytics Access
```bash
# Go to: https://analytics.google.com/analytics/web/#/
# Select your property (GA4 - perception.to or similar)
# Go to Admin > Property Access Management
# Add the service account email as a Viewer
```

### 6. Deploy Updated Functions
```bash
cd functions
npm run build
firebase deploy --only functions:getRealFirebaseAnalytics
```

### 7. Test the Integration
```bash
# Your admin dashboard will automatically try to fetch real data
# Check the browser console for logs:
# - "✅ Successfully got REAL Firebase Analytics data"
# - Or error messages if setup needs adjustment
```

## Alternative: Manual Data Entry
If the API setup is complex, you can also:

1. **Manually update the mock data** in `src/lib/firebase/google-analytics-api.ts`
2. **Replace hard-coded numbers** with your current Firebase Console numbers
3. **Set up a simple admin form** to update the numbers periodically

## Expected Results
Once properly configured, your dashboard will show:
- ✅ Real MAU, WAU, DAU from Firebase Analytics
- ✅ Real-time active users
- ✅ Actual session duration and page views
- ✅ Real device and geographic breakdowns
- ✅ Historical trends and growth rates

## Troubleshooting

### Common Issues
1. **"Failed to fetch real Firebase Analytics data"**
   - Check service account permissions
   - Verify Analytics property access
   - Ensure API is enabled

2. **"Authentication failed"**
   - Check service account key file
   - Verify Firebase Functions can access the key
   - Check project permissions

3. **"Property not found"**
   - Verify GA4 Property ID: 445998414364
   - Check if property exists in Analytics account
   - Ensure property is linked to Firebase project

### Debug Mode
The dashboard includes debug logging. Check browser console for:
```
🔍 Attempting to fetch REAL Firebase Analytics data...
✅ Successfully got REAL Firebase Analytics data: { mau: X, wau: Y, dau: Z }
```

### Contact Support
If you need help with the setup:
1. Check Firebase Console > Analytics for your current numbers
2. Verify your GA4 Property ID in Firebase Console
3. Share any error messages from browser console
4. Confirm which step in the setup process is failing

---

**Note:** The mock data currently shown is calibrated to match your Firebase Console numbers for demonstration purposes. Once the real API is connected, you'll see live, accurate data that updates automatically.