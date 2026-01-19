<div align="center">
  <img src="/logos/perception-logo-light.png" alt="Perception" width="80">
</div>

```
░▒▓█████████████████████████████████████████████████████████████▓▒░
```

# Markdown for AI Agents

> AI-friendly content discovery and retrieval for LLMs and AI crawlers

## Overview

Perception provides Markdown versions of all pages for AI agents, LLMs, and automated crawlers. This follows the pattern established by [Dries Buytaert](https://dri.es/making-my-content-more-accessible-to-ai-agents) for making web content more accessible to AI systems.

Every page on Perception has a `.md` alternative that AI agents can discover via `<link rel="alternate">` tags or request directly.

---

## How It Works

### Architecture

```
Request: /bitcoin-media-research/some-post
         ↓
   [Cloudflare Middleware]
         ↓
   Check: URL ends with .md? OR Accept: text/markdown?
         ↓ YES                    ↓ NO
   Serve Markdown file      Inject <link rel="alternate"> + serve HTML
```

### Auto-Discovery

Every HTML page includes a `<link rel="alternate">` tag pointing to the Markdown version:

```html
<link rel="alternate" type="text/markdown" href="/methodology.md" title="Markdown">
```

AI agents can discover this link and request the Markdown version for easier parsing.

---

## Accessing Markdown Content

### Method 1: URL Suffix

Append `.md` to any page URL:

| Original URL | Markdown URL |
|-------------|--------------|
| `/methodology` | `/methodology.md` |
| `/bitcoin-media-research/my-post` | `/bitcoin-media-research/my-post.md` |
| `/bitcoin-market-sentiment/2025/january/15` | `/bitcoin-market-sentiment/2025/january/15.md` |

**Example:**
```bash
curl https://perception.to/methodology.md
```

### Method 2: Accept Header

Request any page with the `Accept: text/markdown` header:

```bash
curl -H "Accept: text/markdown" https://perception.to/methodology
```

Both methods return the same Markdown content with:
- Content-Type: `text/markdown; charset=utf-8`
- Cache-Control: `public, max-age=3600`

---

## Content Types

### Research Posts

Research articles from `/bitcoin-media-research/` are converted to Markdown with full content preservation.

**URL Pattern:** `/bitcoin-media-research/{slug}.md`

**Example:**
```bash
curl https://perception.to/bitcoin-media-research/perception-quarterly-hidden-in-plain-sight.md
```

**Output format:**
```markdown
---
title: "Article Title"
date: 2025-01-15
author: Fernando Nikolic
tags: ["Reports", "Analysis"]
url: https://perception.to/bitcoin-media-research/slug
description: "Article excerpt..."
image: https://cms.perception.to/content/images/...
---

# Article Title

[Full article content in Markdown...]
```

**Note:** Members-only posts (`visibility: "members"`) are not available in Markdown format to protect gated content.

---

### Static Pages

All static pages (methodology, pricing, about, etc.) have Markdown versions.

**URL Pattern:** `/{page}.md`

**Available pages:**
| Page | Markdown URL |
|------|--------------|
| Home | `/.md` |
| Methodology | `/methodology.md` |
| Pricing | `/pricing.md` |
| About | `/about.md` |
| Bitcoin Fear & Greed Index | `/bitcoin-fear-greed-index.md` |
| Bitcoin Market Sentiment | `/bitcoin-market-sentiment.md` |
| Crypto Conferences | `/crypto-conferences.md` |
| Documentation | `/docs.md` |
| API | `/api.md` |
| For Journalists | `/journalist.md` |
| For Investors | `/investor.md` |
| Bitcoin Media Research | `/bitcoin-media-research.md` |

---

### Sentiment Data

Daily and monthly sentiment pages have structured Markdown with data frontmatter.

#### Daily Sentiment

**URL Pattern:** `/bitcoin-market-sentiment/{year}/{month}/{day}.md`

**Example:**
```bash
curl https://perception.to/bitcoin-market-sentiment/2025/january/15.md
```

**Output format:**
```markdown
---
title: "Bitcoin Market Sentiment - January 15, 2025"
date: 2025-01-15
url: https://perception.to/bitcoin-market-sentiment/2025/january/15
score: 60
category: "Neutral"
sources: 1027
---

# Bitcoin Market Sentiment - January 15, 2025

## Fear & Greed Index: 60/100 (Neutral)

Based on analysis of 1,027 sources.

### Source Breakdown

- **Positive signals:** 288
- **Neutral signals:** 553
- **Negative signals:** 186

### Interpretation

Markets remained **neutral** with a balanced score of 60/100. Mixed signals were observed.

---

Data provided by [Perception](https://perception.to) - Intelligence Workspace for Bitcoin & Crypto
```

#### Monthly Sentiment

**URL Pattern:** `/bitcoin-market-sentiment/{year}/{month}.md`

**Example:**
```bash
curl https://perception.to/bitcoin-market-sentiment/2025/january.md
```

**Output format:**
```markdown
---
title: "Bitcoin Market Sentiment - January 2025"
date: 2025-01-01
url: https://perception.to/bitcoin-market-sentiment/2025/january
avgScore: 58
category: "Neutral"
totalSources: 28500
days: 31
---

# Bitcoin Market Sentiment - January 2025

## Monthly Average: 58/100 (Neutral)

Based on 31 days of data from 28,500 total sources.

### Monthly Breakdown

- **Fear days (score < 30):** 3
- **Neutral days (score 30-70):** 22
- **Greed days (score > 70):** 6

### Summary

In January 2025, Bitcoin market sentiment averaged **58/100**, classified as **Neutral**.
The month saw 3 days of fear, 22 neutral days, and 6 days of greed.
```

---

## Technical Implementation

### File Structure

After build, markdown files are generated in:

```
dist/
└── markdown/
    ├── pages/              # Static pages
    │   ├── home.md
    │   ├── methodology.md
    │   ├── pricing.md
    │   └── ...
    ├── research/           # Research posts
    │   ├── post-slug-1.md
    │   ├── post-slug-2.md
    │   └── ...
    └── sentiment/
        ├── daily/          # Daily sentiment (YYYY-MM-DD.md)
        │   ├── 2025-01-15.md
        │   └── ...
        └── monthly/        # Monthly sentiment (YYYY-MM.md)
            ├── 2025-01.md
            └── ...
```

### Build Process

Markdown files are generated during the build process:

1. **Ghost posts** → Converted using [Turndown](https://github.com/mixmark-io/turndown) HTML-to-Markdown converter
2. **Static pages** → Generated from SEO configuration metadata
3. **Sentiment pages** → Generated from sentiment cache data

**Build command:**
```bash
npm run build
# Includes: npm run markdown:generate
```

**Standalone generation:**
```bash
npm run markdown:generate
```

### Middleware Handling

The Cloudflare Pages middleware (`functions/_middleware.js`) handles:

1. **URL suffix detection:** Requests ending in `.md`
2. **Accept header detection:** Requests with `Accept: text/markdown`
3. **Path resolution:** Maps page URLs to markdown file paths
4. **Alternate link injection:** Adds `<link rel="alternate">` to HTML responses

### Path Resolution

| Page Type | URL Pattern | Markdown Path |
|-----------|-------------|---------------|
| Research post | `/bitcoin-media-research/{slug}` | `/markdown/research/{slug}.md` |
| Daily sentiment | `/bitcoin-market-sentiment/{year}/{month}/{day}` | `/markdown/sentiment/daily/{YYYY-MM-DD}.md` |
| Monthly sentiment | `/bitcoin-market-sentiment/{year}/{month}` | `/markdown/sentiment/monthly/{YYYY-MM}.md` |
| Static page | `/{page}` | `/markdown/pages/{page}.md` |
| Home | `/` | `/markdown/pages/home.md` |

---

## For AI Agent Developers

### Discovering Content

1. **Parse HTML pages** for `<link rel="alternate" type="text/markdown">` tags
2. **Construct URLs** by appending `.md` to known page paths
3. **Use sitemap** at `/sitemap.xml` for complete URL list

### Best Practices

1. **Use Accept header** for content negotiation when you want Markdown
2. **Cache responses** - Markdown files are cached for 1 hour
3. **Parse frontmatter** - All Markdown files include YAML frontmatter with metadata
4. **Respect robots.txt** - Standard crawling etiquette applies

### Rate Limits

Standard Cloudflare rate limits apply. For bulk access, consider:
- Spread requests over time
- Cache locally
- Use the sitemap for efficient discovery

---

## Verification & Testing

### Test URL Suffix

```bash
curl https://perception.to/methodology.md
```

Expected: Markdown content with `Content-Type: text/markdown`

### Test Accept Header

```bash
curl -H "Accept: text/markdown" https://perception.to/methodology
```

Expected: Same Markdown content

### Test Auto-Discovery

```bash
curl https://perception.to/methodology | grep 'rel="alternate"'
```

Expected: `<link rel="alternate" type="text/markdown" href="/methodology.md" title="Markdown">`

### Local Development

```bash
npm run build
npx wrangler pages dev dist/
# Then test with:
curl http://localhost:8788/methodology.md
```

---

## Statistics

| Content Type | Count |
|-------------|-------|
| Research posts | 83 |
| Static pages | 12 |
| Daily sentiment pages | 1,101+ |
| Monthly sentiment pages | 37+ |
| **Total markdown files** | **1,233+** |

---

## Related

- [Data Exports](./exports.md)
- [Sources Overview](../data-coverage/sources-overview.md)
- [API Documentation](/api)
