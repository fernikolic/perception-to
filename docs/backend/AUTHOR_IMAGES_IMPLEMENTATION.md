# Author Images Implementation Guide

## Overview

Automated system for fetching and displaying author profile images using Google Custom Search API (FREE tier: 100 searches/day).

## Architecture

```
┌─────────────────────┐
│  Google Custom      │
│  Search API         │
│  (100 free/day)     │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Cloud Function     │
│  fetchAuthorImages  │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Cloud Storage      │
│  /author-images/    │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Firestore          │
│  /authors/{id}      │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Frontend           │
│  <AuthorAvatar />   │
└─────────────────────┘
```

## Setup Instructions

### Step 1: Get Google API Credentials

**Follow:** `/docs/backend/GOOGLE_SEARCH_SETUP.md`

You need:
1. ✅ Google Custom Search API Key
2. ✅ Custom Search Engine ID

### Step 2: Add Environment Variables

Add to `/functions/.env`:

```bash
GOOGLE_SEARCH_API_KEY=AIza...your-api-key-here
GOOGLE_SEARCH_ENGINE_ID=a1b2c3d4e5f6g7h8i
```

### Step 3: Deploy Cloud Functions

```bash
cd /Users/fernandonikolic/perception

# Build functions
cd functions && npm run build && cd ..

# Deploy all three functions
firebase deploy --only functions:fetchAuthorImages,functions:getAuthorImage,functions:fetchAuthorImagesScheduled
```

### Step 4: Set Up Cloud Storage

The function automatically creates the structure, but you can pre-create:

```bash
# Create author-images directory in Cloud Storage
gsutil mb gs://perception-app-3db34.appspot.com/author-images/ || true

# Set public access (function does this automatically)
gsutil iam ch allUsers:objectViewer gs://perception-app-3db34.appspot.com
```

### Step 5: Create Firestore Collection

```bash
# The function auto-creates this, but you can verify:
firebase firestore:get authors
```

## Usage

### Manual Trigger (First Run)

Trigger the function manually to fetch images for all authors:

```bash
# Via HTTP endpoint
curl -X POST https://us-central1-perception-app-3db34.cloudfunctions.net/fetchAuthorImages

# Or via Firebase Console
# Go to: https://console.firebase.google.com/project/perception-app-3db34/functions
# Click on fetchAuthorImages → Test function → Run
```

**Note:** The free tier allows 100 searches/day, so:
- Day 1: Processes first 100 authors
- Day 2: Processes next 100 authors
- Day 3: Processes remaining authors

The function automatically skips authors that already have images.

### Automatic Schedule

The function runs automatically every Sunday at 4 AM UTC to fetch images for new authors.

### Frontend Usage

Import the component in your React files:

```typescript
import { AuthorAvatar } from '@/components/dashboard/components/author-avatar';

// Use in your component
<AuthorAvatar authorName="Daniel Kuhn" size="md" />
```

**Props:**
- `authorName` (required): The author's name
- `size` (optional): 'xs' | 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `className` (optional): Additional CSS classes
- `showFallbackIcon` (optional): Show user icon if no image (default: false)

**Example Usage:**

```tsx
// In reporter table
<div className="flex items-center gap-3">
  <AuthorAvatar authorName={reporter.name} size="sm" />
  <span>{reporter.name}</span>
</div>

// In profile modal
<AuthorAvatar authorName={reporter.name} size="xl" />

// Simple version (no API calls, just generated avatars)
import { AuthorAvatarSimple } from '@/components/dashboard/components/author-avatar';

<AuthorAvatarSimple authorName={reporter.name} size="md" />
```

## How It Works

### 1. Image Search Process

For each author, the function tries these queries in order:

1. `"{Author Name} {Outlet} journalist headshot"`
2. `"{Author Name} journalist headshot"`
3. `"{Author Name} reporter photo"`
4. `"{Author Name} profile photo"`

Stops at first successful result.

### 2. Image Storage

```
Found Image → Download → Upload to Cloud Storage → Save URL to Firestore
                ↓
             Fallback
                ↓
        UI Avatars (Generated)
```

### 3. Name Normalization

**Original:** `"Cointelegraph by Daniel Kuhn"`
**Cleaned:** `"Daniel Kuhn"` (for search)
**ID:** `"daniel-kuhn"` (for Firestore/Storage)

### 4. Fallback System

If no image found or download fails:
- Uses UI Avatars API
- Generates colorful avatar with initials
- Always works (never breaks UI)

## Firestore Schema

**Collection:** `authors`
**Document ID:** `{normalized-author-name}`

```typescript
{
  id: "daniel-kuhn",
  name: "Daniel Kuhn",                    // Cleaned name
  originalName: "Daniel Kuhn",            // Original from BigQuery
  outlet: "The Block",
  imageUrl: "https://storage.googleapis.com/...",  // or UI Avatars URL
  imageSource: "google-search" | "ui-avatars" | "ui-avatars-fallback",
  imageLastUpdated: Timestamp,
  updatedAt: Timestamp
}
```

## Cloud Storage Structure

```
gs://perception-app-3db34.appspot.com/
└── author-images/
    ├── daniel-kuhn.jpg
    ├── nikhilesh-de.jpg
    ├── billy-bambrough.jpg
    ├── james-hunt.png
    └── ...
```

## API Endpoints

### 1. Fetch Author Images (Manual Trigger)

```bash
POST https://us-central1-perception-app-3db34.cloudfunctions.net/fetchAuthorImages
```

**Response:**
```json
{
  "success": true,
  "message": "Author images fetched successfully",
  "results": {
    "total": 100,
    "processed": 100,
    "foundImages": 65,
    "usedFallback": 35,
    "errors": 0,
    "authors": [...]
  }
}
```

### 2. Get Author Image (Frontend)

```bash
GET https://us-central1-perception-app-3db34.cloudfunctions.net/getAuthorImage?name=Daniel%20Kuhn
```

**Response:**
```json
{
  "name": "Daniel Kuhn",
  "imageUrl": "https://storage.googleapis.com/...",
  "source": "google-search"
}
```

## Monitoring & Maintenance

### Check Function Logs

```bash
# View recent logs
firebase functions:log --only fetchAuthorImages

# Filter for errors
firebase functions:log --only fetchAuthorImages | grep "ERROR"
```

### Check Firestore Data

```bash
# Get all authors with images
firebase firestore:get authors --limit 10

# Count total authors
firebase firestore:get authors | wc -l
```

### Check Cloud Storage

```bash
# List all stored images
gsutil ls gs://perception-app-3db34.appspot.com/author-images/

# Count images
gsutil ls gs://perception-app-3db34.appspot.com/author-images/ | wc -l

# Check storage usage
gsutil du -sh gs://perception-app-3db34.appspot.com/author-images/
```

### Monitor API Quota

1. Go to: https://console.cloud.google.com/apis/api/customsearch.googleapis.com/quotas
2. Check "Queries per day" usage
3. Free tier: 100/day (resets at midnight PT)

## Cost Analysis

### Current Setup (FREE)

**Google Custom Search API:**
- Free tier: 100 queries/day
- Cost: $0/month

**Cloud Storage:**
- ~300 images × 50KB = 15MB
- Cost: < $0.01/month

**Cloud Functions:**
- fetchAuthorImages: ~5 min/week
- getAuthorImage: ~1000 calls/month
- Cost: < $0.50/month

**Firestore:**
- 300 author documents
- Cost: < $0.01/month

**Total: < $1/month** ✨

### If Scaling Beyond Free Tier

**Google Custom Search API (Paid):**
- $5 per 1,000 queries
- For 1,000 authors: $5 one-time

## Troubleshooting

### Issue: No images found

**Solution:**
1. Check API credentials in `.env`
2. Verify Custom Search Engine is set to "Search entire web"
3. Check API quota usage
4. Try manual test:
   ```bash
   curl "https://www.googleapis.com/customsearch/v1?key=YOUR_KEY&cx=YOUR_CX&q=Daniel+Kuhn+journalist&searchType=image&num=1"
   ```

### Issue: Images not displaying

**Solution:**
1. Check Firestore for author document
2. Verify imageUrl is valid
3. Check Cloud Storage permissions
4. Test fallback:
   ```typescript
   <AuthorAvatarSimple authorName="Test Author" />
   ```

### Issue: Function timeout

**Solution:**
- Function has 9-minute timeout
- Processes 100 authors at a time
- Run multiple times for all authors
- Or increase `LIMIT` in query

### Issue: Rate limit exceeded

**Solution:**
- Free tier: 100/day
- Function has 1-second delay between requests
- Wait until next day or enable billing

## Updating Existing Reporter Components

### Before:
```tsx
<div className="flex items-center gap-3">
  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
    <User className="h-5 w-5 text-muted-foreground" />
  </div>
  <span>{reporter.name}</span>
</div>
```

### After:
```tsx
import { AuthorAvatar } from '@/components/dashboard/components/author-avatar';

<div className="flex items-center gap-3">
  <AuthorAvatar authorName={reporter.name} size="md" />
  <span>{reporter.name}</span>
</div>
```

## Performance Optimization

### Option 1: API Calls (Current Implementation)
- Fetches from Firestore on component mount
- Caches result in state
- Falls back to UI Avatars

**Best for:** When you have real images stored

### Option 2: UI Avatars Only (Faster)
```tsx
import { AuthorAvatarSimple } from '@/components/dashboard/components/author-avatar';

<AuthorAvatarSimple authorName={reporter.name} size="md" />
```

**Best for:**
- Initial development
- When performance is critical
- When you don't have images yet

## Future Enhancements

### Phase 2 (Optional):
- [ ] Allow manual image uploads
- [ ] Reporter profile claiming
- [ ] Higher quality image sources (Clearbit, LinkedIn)
- [ ] Image verification workflow
- [ ] Automatic re-fetch for stale images

### Phase 3 (Optional):
- [ ] Image CDN integration
- [ ] Image optimization/resizing
- [ ] Multiple image sizes
- [ ] Lazy loading improvements

## Quick Commands Reference

```bash
# Deploy functions
firebase deploy --only functions:fetchAuthorImages,functions:getAuthorImage

# Run manually
curl -X POST https://us-central1-perception-app-3db34.cloudfunctions.net/fetchAuthorImages

# Check logs
firebase functions:log --only fetchAuthorImages

# View stored images
gsutil ls gs://perception-app-3db34.appspot.com/author-images/

# Check Firestore
firebase firestore:get authors --limit 10

# Check API quota
# https://console.cloud.google.com/apis/api/customsearch.googleapis.com/quotas
```

---

**Status:** ✅ Ready to deploy
**Cost:** FREE (< $1/month)
**Setup Time:** 15 minutes
**First Run:** 3 days (100 authors/day with free tier)

