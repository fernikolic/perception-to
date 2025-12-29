# Infrastructure Overview

Complete documentation of the Bitcoin Perception platform infrastructure, including Cloudflare Pages, Workers, Ghost CMS integration, and all APIs.

## Architecture Diagram

```
                                    ┌─────────────────────────────────────┐
                                    │         perception.to               │
                                    │      (Cloudflare Pages)             │
                                    └─────────────────┬───────────────────┘
                                                      │
                    ┌─────────────────────────────────┼─────────────────────────────────┐
                    │                                 │                                 │
                    ▼                                 ▼                                 ▼
        ┌───────────────────┐           ┌───────────────────┐           ┌───────────────────┐
        │  Cloudflare       │           │  Ghost CMS        │           │  Firebase/GCP     │
        │  Functions        │           │  (Content)        │           │  (Backend APIs)   │
        └───────────────────┘           └───────────────────┘           └───────────────────┘
        - SEO Middleware                - Newsletter Posts             - Sentiment Data
        - OG Image Generation           - Research Articles           - Trends API
        - API Routing                   - Build-time Fetch            - User Auth
```

## 1. Cloudflare Pages

### Deployment Configuration

- **Project Name**: `perception-to`
- **Production URL**: https://perception.to
- **Build Command**: `npm run build`
- **Build Output**: `dist/`
- **Node Version**: 20.x

### Wrangler Configuration

**File**: `wrangler.jsonc`
```json
{
  "name": "perception-to",
  "compatibility_date": "2025-06-15",
  "main": "functions/_worker.js"
}
```

### Deployment Commands

```bash
# Build the project
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=perception-to

# View deployment status
npx wrangler pages deployment list --project-name=perception-to
```

### Environment Variables (Cloudflare Dashboard)

Set these in Cloudflare Pages > Settings > Environment Variables:

| Variable | Description | Required |
|----------|-------------|----------|
| `GHOST_API_URL` | Ghost CMS URL | Yes |
| `GHOST_CONTENT_API_KEY` | Ghost Content API Key | Yes |

## 2. Cloudflare Functions (Workers)

### Directory Structure

```
functions/
├── _middleware.js      # SEO middleware (bot detection, meta injection)
├── _routes.json        # Route configuration
├── seo-config.js       # Page-specific SEO configurations
└── api/
    └── og-image.js     # Dynamic OG image generation
```

### SEO Middleware (`_middleware.js`)

The middleware intercepts requests and:
- Detects search engine bots (Google, Bing, etc.)
- Detects social media crawlers (Twitter, Facebook, LinkedIn, etc.)
- Injects page-specific meta tags for SEO
- Handles dynamic route SEO (sentiment dates, conferences, etc.)

**Supported Bots**:
- Search: Googlebot, Bingbot, Yandex, DuckDuckBot
- Social: Facebook, Twitter, LinkedIn, Slack, Discord, WhatsApp
- AI: GPTBot, Claude, Perplexity

### OG Image Generation

**File**: `functions/api/og-image.js`

Generates dynamic Open Graph images for social sharing.

**Endpoint**: `https://perception.to/api/og-image?path=/your-page`

## 3. Ghost CMS Integration

### Configuration

- **Ghost URL**: https://bitcoin-perception.ghost.io
- **API Type**: Content API (read-only)
- **Integration**: Build-time static generation

### Ghost Content API

**Fetch Script**: `scripts/fetch-ghost-posts.js`

```bash
# Fetch posts manually
npm run ghost:fetch

# Runs automatically during build
npm run prebuild  # includes ghost:fetch
```

### Data Flow

```
Ghost CMS → fetch-ghost-posts.js → src/data/ghost-posts.json → React Components
```

### Ghost Post Types

| Type | Tag Slug | Route |
|------|----------|-------|
| All Posts | - | `/bitcoin-media-research` |
| Reports | `reports` | `/bitcoin-media-research/reports` |
| Opinion | `opinion` | `/bitcoin-media-research/opinion` |
| Individual | - | `/bitcoin-media-research/:slug` |

### Ghost Helper Library

**File**: `src/lib/ghost.ts`

Provides TypeScript types and helper functions:
- `GhostPost`, `GhostTag`, `GhostAuthor` interfaces
- `formatReadingTime()` - Format reading time
- `formatPostDate()` - Format publication date
- `getPostsByTag()` - Filter posts by tag
- `getPostBySlug()` - Get single post
- `getExcerpt()` - Get post excerpt

### Newsletter Signup

Ghost Portal is used for newsletter subscriptions:
- **Widget**: Ghost Signup Form (inline)
- **Site**: https://bitcoin-perception.ghost.io
- **Styling**: Custom CSS overrides in components

## 4. Backend APIs (Firebase/GCP)

### API Endpoints

| Service | Base URL | Purpose |
|---------|----------|---------|
| API v1 | `https://btcpapifunction-45998414364.us-central1.run.app` | Legacy endpoints |
| API v2 | `https://btcpapifunction2-45998414364.us-central1.run.app` | Current production |
| Trends API | `https://btcpapifunction3-1-45998414364.us-central1.run.app` | AI trends extraction |

### Authentication

- Firebase Authentication (JWT tokens)
- Required for most API endpoints

```javascript
import { getAuth } from 'firebase/auth';
const token = await getAuth().currentUser?.getIdToken();

fetch('/api/endpoint', {
  headers: { Authorization: `Bearer ${token}` }
});
```

### Key Endpoints

See `docs/api/README.md` for full API documentation.

## 5. Build Process

### NPM Scripts

```bash
# Development
npm run dev              # Start Vite dev server

# Build
npm run build           # Full production build
npm run prebuild        # Runs before build (ghost, sitemap, social)

# Ghost CMS
npm run ghost:fetch     # Fetch posts from Ghost

# Sitemaps
npm run sitemap:all     # Generate all sitemaps
npm run sitemap:research    # Research posts sitemap
npm run sitemap:sentiment   # Sentiment pages sitemap
npm run sitemap:conferences # Conference pages sitemap

# Social Images
npm run social:generate # Generate social image config
npm run social:audit    # Audit social images
```

### Build Pipeline

```
prebuild:
  1. npm run ghost:fetch      → Fetch Ghost posts
  2. npm run social:generate  → Generate social config
  3. npm run sitemap:all      → Generate all sitemaps

build:
  1. vite build              → Build React app
  2. npm run copy:functions  → Copy Cloudflare functions
  3. npm run copy:sitemaps   → Copy sitemaps to dist/
```

## 6. URL Structure

### Main Routes

| Route | Description | Source |
|-------|-------------|--------|
| `/` | Homepage | React SPA |
| `/bitcoin-media-research` | Newsletter + Research Hub | React + Ghost |
| `/bitcoin-media-research/reports` | Reports category | React + Ghost |
| `/bitcoin-media-research/opinion` | Opinion category | React + Ghost |
| `/bitcoin-media-research/:slug` | Individual article | React + Ghost |
| `/bitcoin-market-sentiment` | Sentiment index | React |
| `/bitcoin-market-sentiment/:year/:month/:day` | Daily sentiment | React |
| `/crypto-conferences` | Conference tracker | React + Firestore |

### Redirects

| From | To | Type |
|------|-----|------|
| `/research` | `/bitcoin-media-research` | 301 |
| `/research/reports` | `/bitcoin-media-research/reports` | 301 |
| `/research/opinion` | `/bitcoin-media-research/opinion` | 301 |
| `/research/:slug` | `/bitcoin-media-research/:slug` | 301 |

## 7. Environment Setup

### Required Environment Variables

**Local Development** (`.env.local`):
```env
# Ghost CMS
GHOST_API_URL=https://bitcoin-perception.ghost.io
GHOST_CONTENT_API_KEY=your_ghost_content_api_key

# Firebase (if needed locally)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

**Cloudflare Pages** (Dashboard):
- `GHOST_CONTENT_API_KEY` - Set in Production & Preview environments

### Getting Ghost API Key

1. Go to Ghost Admin: https://bitcoin-perception.ghost.io/ghost
2. Navigate to Settings > Integrations
3. Create or use existing Custom Integration
4. Copy the **Content API Key**

## 8. Monitoring & Debugging

### Cloudflare Analytics

- Access via Cloudflare Dashboard > Pages > perception-to > Analytics
- View: Requests, Bandwidth, Unique Visitors, Status Codes

### Build Logs

```bash
# View recent deployments
npx wrangler pages deployment list --project-name=perception-to

# Tail production logs
npx wrangler pages deployment tail --project-name=perception-to
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Ghost posts not updating | Run `npm run ghost:fetch` manually, check API key |
| SEO not working | Check `functions/_middleware.js`, test with curl |
| Build fails | Check Node version (20.x required), verify dependencies |

## 9. Security Considerations

### Content Security

- Ghost HTML sanitized with DOMPurify before rendering
- No user-generated content directly rendered
- All external scripts loaded from trusted CDNs

### API Security

- Firebase Auth required for sensitive endpoints
- Rate limiting on public endpoints
- No secrets in client-side code

### Cloudflare Security

- DDoS protection enabled
- WAF rules configured
- HTTPS enforced

## 10. Related Documentation

- [API Reference](../api/README.md)
- [Ghost Cards Styling](../../src/styles/ghost-cards.css)
- [SEO Configuration](../../functions/seo-config.js)
- [Deployment Guide](../deployment/production-readiness.md)
