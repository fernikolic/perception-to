# Author Images Storage Solution

## Overview

This document outlines the best approach for fetching, storing, and displaying author/reporter profile images in the Perception dashboard.

## Problem Statement

Currently, the reporter features display author names and their article data, but lack visual profile images. We need a scalable solution to:
1. Fetch author profile images from various sources
2. Store them efficiently
3. Display them in the UI with proper fallbacks

## Recommended Solution: Multi-Tier Approach

### Architecture Overview

```
┌─────────────────┐
│  Weekly Sync    │
│  Cloud Function │
└────────┬────────┘
         │
         ├─→ Clearbit API (for corporate authors)
         ├─→ LinkedIn Scraping (with caution)
         ├─→ Gravatar (email-based)
         └─→ UI Avatars (fallback/generated)
         │
         ↓
┌─────────────────┐
│  Cloud Storage  │
│  /author-images │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Firestore     │
│  /authors/{id}  │
│  - imageUrl     │
│  - imageSource  │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Frontend UI   │
│  <Avatar />     │
└─────────────────┘
```

## Implementation Options

### Option 1: Third-Party API Services (RECOMMENDED)

**Pros:**
- High-quality professional images
- Automatic updates
- Legal/licensed images
- Low maintenance

**Cons:**
- Ongoing API costs
- Rate limits
- Dependency on external services

**Services to Use:**

1. **Clearbit Logo API** (Free tier: 100 requests/month)
   - Best for: Corporate/organization authors
   - URL: `https://logo.clearbit.com/{domain}`
   - Example: `https://logo.clearbit.com/forbes.com`

2. **UI Avatars** (Free, unlimited)
   - Best for: Fallback/generated avatars
   - URL: `https://ui-avatars.com/api/?name={authorName}&size=128&background=random`
   - Generates colorful initials-based avatars

3. **Gravatar** (Free)
   - Best for: Authors with known email addresses
   - URL: `https://www.gravatar.com/avatar/{md5_email}?d=404`

4. **LinkedIn Profile Images** (Manual/Curated)
   - Best for: Key reporters (manually curated list)
   - Method: Store CDN URLs in Firestore
   - Note: Respect LinkedIn's TOS

### Option 2: Web Scraping (USE WITH CAUTION)

**Pros:**
- Can get images from multiple sources
- No API costs

**Cons:**
- Legal gray area
- Websites block scrapers
- Images may be copyrighted
- High maintenance (selectors break)

**Not Recommended** due to legal and maintenance concerns.

### Option 3: Manual Curation + Fallbacks (HYBRID APPROACH)

**Best Overall Solution:**

1. **Manual Curation** (Top 50-100 reporters)
   - Store high-quality profile images for key reporters
   - Update quarterly
   - Source: Public LinkedIn, Twitter, outlet bio pages

2. **Automatic Fallbacks** (All others)
   - UI Avatars for generated images
   - Clearbit for organization logos

3. **User Uploads** (Future feature)
   - Allow reporters to claim profiles
   - Upload their own images

## Detailed Implementation Plan

### Phase 1: Database Schema

Add to Firestore `authors` collection:

```typescript
interface AuthorProfile {
  id: string;                    // Normalized author name
  name: string;                  // Display name
  originalName: string;          // Name from BigQuery
  outlets: string[];             // Associated outlets

  // Image fields
  imageUrl?: string;             // Cloud Storage URL or external URL
  imageSource?: 'manual' | 'clearbit' | 'gravatar' | 'ui-avatars' | 'fallback';
  imageLastUpdated?: Timestamp;

  // Metadata
  isVerified: boolean;           // Manually verified profile
  isCurated: boolean;            // High-priority/curated author
  email?: string;                // For Gravatar lookup
  linkedInUrl?: string;          // For reference
  twitterHandle?: string;        // For reference

  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Phase 2: Cloud Storage Structure

```
gs://perception-app-3db34.appspot.com/
└── author-images/
    ├── curated/                 # Manually uploaded
    │   ├── daniel-kuhn.jpg
    │   ├── nikhilesh-de.jpg
    │   └── ...
    ├── generated/               # Auto-generated fallbacks
    │   ├── john-doe.png
    │   └── ...
    └── cache/                   # Cached external images
        ├── clearbit-forbes.png
        └── ...
```

### Phase 3: Image Fetching Function

Create `/functions/src/fetch-author-images.ts`:

```typescript
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { BigQuery } from '@google-cloud/bigquery';
import * as admin from 'firebase-admin';
import axios from 'axios';
import crypto from 'crypto';

export const fetchAuthorImages = onSchedule(
  {
    schedule: '0 3 * * 0', // Weekly on Sunday at 3 AM
    timeZone: 'UTC',
    memory: '1GiB',
    timeoutSeconds: 540, // 9 minutes
  },
  async (event) => {
    const firestore = admin.firestore();
    const storage = admin.storage().bucket();

    // Get all authors from BigQuery
    const authors = await getAuthorsFromBigQuery();

    for (const author of authors) {
      // Check if image already exists
      const authorDoc = await firestore
        .collection('authors')
        .doc(normalizeAuthorId(author.name))
        .get();

      if (authorDoc.exists && authorDoc.data()?.imageUrl) {
        continue; // Skip if image exists
      }

      // Try different image sources
      let imageUrl = null;
      let source = 'fallback';

      // 1. Check for manual/curated image
      const curatedPath = `author-images/curated/${normalizeAuthorId(author.name)}.jpg`;
      const [curatedExists] = await storage.file(curatedPath).exists();

      if (curatedExists) {
        imageUrl = await storage.file(curatedPath).publicUrl();
        source = 'manual';
      }

      // 2. Try Gravatar (if email available)
      if (!imageUrl && author.email) {
        const gravatarUrl = getGravatarUrl(author.email);
        const isValid = await checkImageExists(gravatarUrl);
        if (isValid) {
          imageUrl = gravatarUrl;
          source = 'gravatar';
        }
      }

      // 3. Try Clearbit (for organization/outlet)
      if (!imageUrl && isOrganization(author.name)) {
        const domain = getOutletDomain(author.outlet);
        if (domain) {
          const clearbitUrl = `https://logo.clearbit.com/${domain}`;
          const isValid = await checkImageExists(clearbitUrl);
          if (isValid) {
            imageUrl = clearbitUrl;
            source = 'clearbit';
          }
        }
      }

      // 4. Fallback to UI Avatars (always works)
      if (!imageUrl) {
        imageUrl = getUIAvatarUrl(author.name);
        source = 'ui-avatars';
      }

      // Save to Firestore
      await firestore
        .collection('authors')
        .doc(normalizeAuthorId(author.name))
        .set({
          name: author.name,
          originalName: author.originalName,
          outlets: author.outlets,
          imageUrl,
          imageSource: source,
          imageLastUpdated: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
    }
  }
);

function getUIAvatarUrl(name: string): string {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&size=128&background=random&color=fff&bold=true`;
}

function getGravatarUrl(email: string): string {
  const hash = crypto.createHash('md5').update(email.toLowerCase().trim()).digest('hex');
  return `https://www.gravatar.com/avatar/${hash}?s=128&d=404`;
}

function normalizeAuthorId(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

async function checkImageExists(url: string): Promise<boolean> {
  try {
    const response = await axios.head(url, { timeout: 3000 });
    return response.status === 200;
  } catch {
    return false;
  }
}
```

### Phase 4: Frontend Implementation

Update `/src/components/dashboard/components/reporter-avatar.tsx`:

```typescript
import { useState } from 'react';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ReporterAvatarProps {
  name: string;
  imageUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ReporterAvatar({
  name,
  imageUrl,
  size = 'md',
  className
}: ReporterAvatarProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-8 w-8'
  };

  // Fallback to UI Avatars if no image or error
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&background=random&color=fff&bold=true`;
  const displayUrl = (imageError || !imageUrl) ? fallbackUrl : imageUrl;

  return (
    <div className={cn(
      'rounded-full overflow-hidden bg-muted flex items-center justify-center',
      sizeClasses[size],
      className
    )}>
      {displayUrl ? (
        <img
          src={displayUrl}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <User className={cn('text-muted-foreground', iconSizes[size])} />
      )}
    </div>
  );
}
```

## Cost Analysis

### Monthly Costs

**Cloud Storage:**
- Storage: ~100 images × 50KB = 5MB
- Cost: < $0.01/month

**Clearbit API:**
- Free tier: 100 requests/month
- Paid: $99/month for unlimited
- **Recommendation:** Start with free tier

**UI Avatars:**
- Completely free, unlimited
- Cost: $0

**Cloud Function Execution:**
- Runtime: ~5 minutes/week
- Cost: < $0.10/month

**Total Estimated Cost:** < $1/month (free tier)

## Privacy & Legal Considerations

1. **Copyright:**
   - Only use publicly available images
   - Prefer generated avatars for unknowns
   - Get permission for manual curation

2. **Privacy:**
   - Don't store personal information unnecessarily
   - Allow opt-out mechanism
   - Clear image source attribution

3. **Terms of Service:**
   - Respect API provider terms
   - Don't scrape restricted sites
   - Follow robots.txt

## Migration Plan

### Week 1: Setup
- [ ] Create Firestore `authors` collection
- [ ] Set up Cloud Storage buckets
- [ ] Deploy image fetching function

### Week 2: Manual Curation
- [ ] Identify top 50 reporters
- [ ] Manually source profile images
- [ ] Upload to Cloud Storage

### Week 3: Automation
- [ ] Enable weekly sync function
- [ ] Test fallback mechanisms
- [ ] Monitor error rates

### Week 4: Frontend Integration
- [ ] Create Avatar component
- [ ] Update reporter tables
- [ ] Update profile modals
- [ ] Test on all pages

## Monitoring & Maintenance

### Metrics to Track
- Image fetch success rate
- Fallback usage percentage
- Storage costs
- API quota usage

### Quarterly Tasks
- Review and update curated images
- Check for broken image URLs
- Evaluate new image sources
- Update top reporters list

## Alternative: Quick Start (Minimal Implementation)

If you want to start **immediately** with minimal effort:

1. **Use UI Avatars only:**
   ```typescript
   const getAuthorAvatar = (name: string) =>
     `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=128&background=random&color=fff`;
   ```

2. **Add to existing reporter data:**
   - No database changes needed
   - No storage needed
   - No costs
   - Works today!

3. **Upgrade later** to the full solution when needed.

## Recommended Next Steps

1. **Start with UI Avatars** (Quick win, no setup)
2. **Manually curate top 20 reporters** (High impact)
3. **Implement Firestore storage** (Scalable foundation)
4. **Add automated fetching** (Long-term solution)

---

**Decision Required:** Which approach do you prefer?

A. **Full Solution** (Firestore + Cloud Storage + Multiple sources)
B. **Quick Start** (UI Avatars only, upgrade later)
C. **Hybrid** (UI Avatars + Manual curation for top reporters)

