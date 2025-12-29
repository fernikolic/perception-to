# Ghost CMS Integration

Documentation for the Ghost CMS integration powering the Bitcoin Media Research newsletter and content.

## Overview

Ghost CMS provides the content management system for the `/bitcoin-media-research` section, including:
- Newsletter signup and subscription management
- Research articles and reports
- Opinion pieces and analysis

## Configuration

### Ghost Instance

- **URL**: https://bitcoin-perception.ghost.io
- **Admin**: https://bitcoin-perception.ghost.io/ghost
- **Type**: Ghost Pro (hosted)

### API Access

| API Type | Purpose | Access |
|----------|---------|--------|
| Content API | Read posts, tags, authors | Public (with key) |
| Admin API | Manage content | Private (admin only) |

### Environment Variables

```env
# Required for build
GHOST_API_URL=https://bitcoin-perception.ghost.io
GHOST_CONTENT_API_KEY=your_content_api_key_here
```

## Content API Integration

### Fetching Posts

**Script**: `scripts/fetch-ghost-posts.js`

The fetch script runs at build time and:
1. Fetches all posts with pagination
2. Includes tags and author data
3. Fetches full HTML content
4. Saves to `src/data/ghost-posts.json`

```bash
# Manual fetch
npm run ghost:fetch

# Automatic (runs in prebuild)
npm run build
```

### API Endpoint

```
GET https://bitcoin-perception.ghost.io/ghost/api/content/posts/
  ?key={GHOST_CONTENT_API_KEY}
  &include=tags,authors
  &formats=html
  &limit=15
  &page=1
```

### Response Structure

```json
{
  "posts": [
    {
      "id": "...",
      "uuid": "...",
      "title": "Post Title",
      "slug": "post-slug",
      "html": "<p>Full post content...</p>",
      "excerpt": "Short excerpt...",
      "feature_image": "https://...",
      "published_at": "2025-01-15T10:00:00.000Z",
      "reading_time": 5,
      "tags": [{ "slug": "reports", "name": "Reports" }],
      "primary_author": { "name": "Author Name", "bio": "..." }
    }
  ],
  "meta": {
    "pagination": {
      "page": 1,
      "limit": 15,
      "pages": 7,
      "total": 99
    }
  }
}
```

## Cached Data Structure

**File**: `src/data/ghost-posts.json`

```json
{
  "posts": [...],
  "fetchedAt": "2025-01-15T10:00:00.000Z",
  "totalPosts": 99
}
```

## TypeScript Types

**File**: `src/lib/ghost.ts`

```typescript
interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html: string;
  excerpt?: string;
  custom_excerpt?: string;
  feature_image?: string;
  feature_image_alt?: string;
  featured: boolean;
  published_at: string;
  updated_at: string;
  reading_time: number;
  tags: GhostTag[];
  primary_tag?: GhostTag;
  authors: GhostAuthor[];
  primary_author: GhostAuthor;
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
}

interface GhostTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  profile_image?: string;
  bio?: string;
}
```

## Helper Functions

```typescript
import {
  formatReadingTime,  // "5 min read"
  formatPostDate,     // "January 15, 2025"
  getPostsByTag,      // Filter by tag slug
  getPostBySlug,      // Get single post
  getExcerpt          // Truncated excerpt
} from '@/lib/ghost';
```

## Routes & Pages

### URL Structure

| Route | Component | Description |
|-------|-----------|-------------|
| `/bitcoin-media-research` | `index.tsx` | Newsletter hero + all posts |
| `/bitcoin-media-research/reports` | `reports.tsx` | Reports category |
| `/bitcoin-media-research/opinion` | `opinion.tsx` | Opinion category |
| `/bitcoin-media-research/:slug` | `[slug].tsx` | Individual article |

### Redirects

Old `/research/*` URLs redirect to `/bitcoin-media-research/*`:

```typescript
// In App.tsx
<Route path="/research" element={<Navigate to="/bitcoin-media-research" replace />} />
<Route path="/research/reports" element={<Navigate to="/bitcoin-media-research/reports" replace />} />
<Route path="/research/opinion" element={<Navigate to="/bitcoin-media-research/opinion" replace />} />
<Route path="/research/:slug" element={<ResearchSlugRedirect />} />
```

## Newsletter Signup

### Ghost Signup Form Widget

The inline signup form is implemented in `bitcoin-media-research/index.tsx`:

```typescript
// Load Ghost Signup Form script
const formScript = document.createElement('script');
formScript.src = 'https://cdn.jsdelivr.net/ghost/signup-form@~0.2/umd/signup-form.min.js';
formScript.setAttribute('data-button-color', '#000000');
formScript.setAttribute('data-button-text-color', '#FFFFFF');
formScript.setAttribute('data-site', 'https://bitcoin-perception.ghost.io/');
formScript.setAttribute('data-locale', 'en');
```

### Styling Overrides

```css
/* Custom signup form styling */
.signup-form-container [&_input]:!text-sm
.signup-form-container [&_button]:!bg-black
.signup-form-container [&_button]:hover:!bg-black/90
```

## Content Security

### HTML Sanitization

Ghost HTML is sanitized with DOMPurify before rendering:

```typescript
import DOMPurify from 'dompurify';

function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['h1', 'h2', 'p', 'a', 'img', 'blockquote', ...],
    ALLOWED_ATTR: ['href', 'src', 'alt', 'class', ...],
    ALLOW_DATA_ATTR: true
  });
}
```

### Allowed Content

- Text formatting (headings, paragraphs, lists)
- Links and images
- Embeds (YouTube, Twitter)
- Tables
- Ghost cards (callouts, buttons, galleries)
- SVG icons

## Ghost Card Styles

**File**: `src/styles/ghost-cards.css`

Styles for Ghost Koenig editor cards:
- Callout cards (colored backgrounds)
- Signup cards
- Button cards
- Image cards with captions
- Gallery cards
- Video cards
- Embed cards (Twitter, YouTube)

## Sitemap Generation

**Script**: `scripts/generate-research-sitemap.js`

Generates `public/sitemap-research.xml` with:
- Main research page
- Category pages (reports, opinion)
- All individual post URLs

```bash
npm run sitemap:research
```

## Troubleshooting

### Posts Not Updating

1. Check API key is valid:
   ```bash
   curl "https://bitcoin-perception.ghost.io/ghost/api/content/posts/?key=YOUR_KEY&limit=1"
   ```

2. Run fetch manually:
   ```bash
   GHOST_CONTENT_API_KEY=your_key npm run ghost:fetch
   ```

3. Check cached data:
   ```bash
   cat src/data/ghost-posts.json | head -50
   ```

### Build Fails on Ghost Fetch

If API key not set, fetch is skipped and uses cached data:
```
⚠️  GHOST_CONTENT_API_KEY not set - skipping Ghost fetch
   Using existing cached posts if available
   Found 99 cached posts
```

### Newsletter Form Not Loading

1. Check console for errors
2. Verify Ghost site URL is correct
3. Check network tab for blocked requests
4. Ensure CORS is properly configured in Ghost

## Getting API Key

1. Log in to Ghost Admin
2. Go to Settings > Integrations
3. Click "Add custom integration"
4. Name it (e.g., "Perception Website")
5. Copy the **Content API Key**

> Note: Content API keys are read-only and safe to use in builds.
> Never expose Admin API keys.
