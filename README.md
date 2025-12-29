# Bitcoin Perception Intelligence Platform

A comprehensive Bitcoin narrative intelligence platform built with React, Cloudflare infrastructure, and Ghost CMS.

## Live Site

- **Production**: https://perception.to
- **Newsletter/Research**: https://perception.to/bitcoin-media-research
- **Sentiment Index**: https://perception.to/bitcoin-market-sentiment
- **Conference Tracker**: https://perception.to/crypto-conferences

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              perception.to                                   │
│                          (Cloudflare Pages)                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│  Frontend (React + Vite)  │  Functions (Workers)  │  Content (Ghost CMS)   │
│  - TypeScript             │  - SEO Middleware     │  - Newsletter Posts    │
│  - Tailwind CSS           │  - OG Image Gen       │  - Research Articles   │
│  - React Router           │  - Bot Detection      │  - Build-time Fetch    │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              │                       │                       │
              ▼                       ▼                       ▼
       Ghost CMS API          Firebase/GCP APIs        MongoDB Atlas
       (Content)              (Sentiment, Trends)      (Learn, Glossary)
```

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Hosting | Cloudflare Pages |
| Functions | Cloudflare Workers (Edge Functions) |
| CMS | Ghost Pro (Newsletter & Research) |
| Database | MongoDB Atlas (Learn/Glossary), Firestore (App Data) |
| APIs | Firebase Functions, Google Cloud Run |
| Auth | Firebase Authentication |

## Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Ghost Content API Key (for full builds)

### Installation

```bash
# Clone repository
git clone https://github.com/fernikolic/perception-to.git
cd bitcoin-perception

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create `.env.local`:
```env
# Ghost CMS (required for full builds)
GHOST_API_URL=https://bitcoin-perception.ghost.io
GHOST_CONTENT_API_KEY=your_content_api_key
```

### Building & Deploying

```bash
# Full production build
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name=perception-to
```

## Project Structure

```
bitcoin-perception/
├── src/                          # React frontend
│   ├── pages/
│   │   ├── bitcoin-media-research/  # Newsletter & Research pages
│   │   ├── bitcoin-market-sentiment/  # Sentiment pages
│   │   ├── crypto-conferences/  # Conference tracker
│   │   └── learn/               # Educational content
│   ├── components/              # Reusable components
│   ├── lib/
│   │   └── ghost.ts             # Ghost CMS client
│   └── data/
│       └── ghost-posts.json     # Cached Ghost content
├── functions/                   # Cloudflare Workers
│   ├── _middleware.js           # SEO middleware
│   ├── seo-config.js            # Page SEO configs
│   └── api/                     # API endpoints
├── scripts/                     # Build scripts
│   ├── fetch-ghost-posts.js     # Ghost content fetcher
│   └── generate-*.js            # Sitemap generators
├── docs/                        # Documentation
│   ├── infrastructure/          # Infrastructure docs
│   ├── api/                     # API documentation
│   └── ...                      # Feature documentation
└── public/                      # Static assets
```

## Key Features

### Newsletter & Research Hub (`/bitcoin-media-research`)

- Ghost CMS powered content
- Newsletter signup integration
- Research reports and opinion articles
- Build-time content fetching

### Market Sentiment (`/bitcoin-market-sentiment`)

- Daily/monthly sentiment tracking
- Historical data visualization
- Fear & Greed Index

### Conference Tracker (`/crypto-conferences`)

- Bitcoin/crypto conference directory
- Real-time updates via Firestore
- Automatic sitemap generation

### SEO Infrastructure

- Cloudflare Workers middleware for bot detection
- Dynamic meta tag injection
- Structured data (JSON-LD)
- Dynamic OG image generation

## NPM Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Full production build |
| `npm run ghost:fetch` | Fetch Ghost CMS content |
| `npm run sitemap:all` | Generate all sitemaps |
| `npm run social:generate` | Generate social image config |

## Documentation

- **[Infrastructure Overview](docs/infrastructure/INFRASTRUCTURE-OVERVIEW.md)** - Complete infrastructure docs
- **[API Reference](docs/api/README.md)** - Backend API documentation
- **[Project Overview](docs/development/PROJECT-OVERVIEW.md)** - Development guide

## Ghost CMS Integration

Content is fetched from Ghost at build time:

1. **Fetch**: `npm run ghost:fetch` pulls posts from Ghost API
2. **Cache**: Posts saved to `src/data/ghost-posts.json`
3. **Build**: React components read from cached JSON
4. **Deploy**: Static content served from Cloudflare edge

### Content Types

| Type | Tag | URL |
|------|-----|-----|
| All Posts | - | `/bitcoin-media-research` |
| Reports | `reports` | `/bitcoin-media-research/reports` |
| Opinion | `opinion` | `/bitcoin-media-research/opinion` |

## Cloudflare Configuration

### Pages Settings

- **Production Branch**: `main`
- **Build Command**: `npm run build`
- **Build Output**: `dist`
- **Node.js Version**: 20

### Environment Variables

Set in Cloudflare Dashboard > Pages > Settings > Environment Variables:

| Variable | Environment |
|----------|-------------|
| `GHOST_CONTENT_API_KEY` | Production & Preview |

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Proprietary - All rights reserved.

---

Built with care for the Bitcoin community.
