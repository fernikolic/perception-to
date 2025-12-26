# Google Custom Search API Setup Guide

## Step 1: Enable Google Custom Search API

1. Go to Google Cloud Console: https://console.cloud.google.com/apis/library
2. Search for "Custom Search API"
3. Click "Enable"
4. Wait for activation (takes ~30 seconds)

## Step 2: Create API Key

1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "Create Credentials" → "API Key"
3. Copy the API key (starts with `AIza...`)
4. (Optional but recommended) Click "Restrict Key":
   - Set "API restrictions" → "Restrict key" → Select "Custom Search API"
   - Click "Save"

## Step 3: Create Custom Search Engine

1. Go to: https://programmablesearchengine.google.com/controlpanel/create
2. Fill in:
   - **Name**: "Author Image Search"
   - **What to search**: Select "Search the entire web"
   - Click "Create"
3. On the next page:
   - Click "Customize"
   - Turn ON "Image search"
   - Turn ON "Search the entire web"
   - Click "Update"
4. Copy your **Search Engine ID** (looks like: `a1b2c3d4e5f6g7h8i`)

## Step 4: Add to Environment Variables

Add these to your `.env` file in `/functions`:

```bash
GOOGLE_SEARCH_API_KEY=AIza...your-api-key-here
GOOGLE_SEARCH_ENGINE_ID=a1b2c3d4e5f6g7h8i
```

## Step 5: Test the API

Run this test command:
```bash
curl "https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=YOUR_SEARCH_ENGINE_ID&q=Daniel+Kuhn+journalist&searchType=image&num=1"
```

You should see JSON with image results!

## Quotas & Limits

**Free Tier:**
- 100 search queries per day
- Resets at midnight Pacific Time
- No credit card required

**Paid Tier** (if you need more):
- $5 per 1,000 queries
- Up to 10,000 queries per day
- Enable billing in Google Cloud Console

---

## Quick Reference

**API Endpoint:**
```
https://www.googleapis.com/customsearch/v1
```

**Parameters:**
- `key`: Your API key
- `cx`: Your Search Engine ID
- `q`: Search query
- `searchType`: "image"
- `num`: Number of results (1-10)
- `imgSize`: "medium" or "large"

---

**Next:** Once you have the API key and Search Engine ID, add them to `/functions/.env`
