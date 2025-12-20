# Scrape.do API Configuration

## Overview

Scrape.do is a web scraping API that can be used for:
- Competitor page analysis
- SERP data collection
- Content extraction
- Structured data validation

## Setup

### API Key

Add to `.env`:

```bash
SCRAPE_DO_API_KEY=your_api_key_here
```

### Base URL

```
https://api.scrape.do/
```

## Usage Examples

### Basic Page Scrape

```typescript
const SCRAPE_DO_API_KEY = process.env.SCRAPE_DO_API_KEY;

async function scrapePage(url: string) {
  const apiUrl = `https://api.scrape.do/?token=${SCRAPE_DO_API_KEY}&url=${encodeURIComponent(url)}`;

  const response = await fetch(apiUrl);
  const html = await response.text();

  return html;
}

// Example: Scrape competitor page
const lunarcrushHtml = await scrapePage('https://lunarcrush.com');
```

### With JavaScript Rendering

For SPAs that require JavaScript:

```typescript
async function scrapeWithJS(url: string) {
  const apiUrl = `https://api.scrape.do/?token=${SCRAPE_DO_API_KEY}&url=${encodeURIComponent(url)}&render=true`;

  const response = await fetch(apiUrl);
  return response.text();
}
```

### Extract Structured Data

```typescript
async function extractStructuredData(url: string) {
  const html = await scrapePage(url);

  // Find JSON-LD scripts
  const jsonLdPattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  const matches = [...html.matchAll(jsonLdPattern)];

  const schemas = matches.map(match => {
    try {
      return JSON.parse(match[1]);
    } catch {
      return null;
    }
  }).filter(Boolean);

  return schemas;
}
```

### Extract Meta Tags

```typescript
async function extractMetaTags(url: string) {
  const html = await scrapePage(url);

  const titleMatch = html.match(/<title>(.*?)<\/title>/);
  const descMatch = html.match(/<meta name="description" content="(.*?)"/);
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/);

  return {
    title: titleMatch?.[1] || null,
    description: descMatch?.[1] || null,
    h1: h1Match?.[1] || null,
  };
}
```

## SEO Use Cases

### 1. Competitor Meta Tag Analysis

```typescript
const competitors = [
  'https://lunarcrush.com',
  'https://santiment.net',
  'https://glassnode.com',
  'https://messari.io',
];

async function analyzeCompetitorMeta() {
  const results = await Promise.all(
    competitors.map(async url => ({
      url,
      meta: await extractMetaTags(url),
    }))
  );

  return results;
}
```

### 2. SERP Scraping (if allowed)

```typescript
async function scrapeSERP(query: string) {
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  const html = await scrapeWithJS(searchUrl);

  // Parse results (be careful with ToS)
  // Consider using official APIs instead

  return html;
}
```

### 3. Heading Structure Analysis

```typescript
async function analyzeHeadings(url: string) {
  const html = await scrapePage(url);

  const headings = {
    h1: [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/g)].map(m => m[1]),
    h2: [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/g)].map(m => m[1]),
    h3: [...html.matchAll(/<h3[^>]*>(.*?)<\/h3>/g)].map(m => m[1]),
  };

  return headings;
}
```

### 4. Internal Link Extraction

```typescript
async function extractInternalLinks(url: string) {
  const html = await scrapePage(url);
  const domain = new URL(url).hostname;

  const linkPattern = /<a[^>]+href="([^"]+)"[^>]*>/g;
  const matches = [...html.matchAll(linkPattern)];

  const internalLinks = matches
    .map(m => m[1])
    .filter(href => {
      try {
        const linkUrl = new URL(href, url);
        return linkUrl.hostname === domain;
      } catch {
        return href.startsWith('/');
      }
    });

  return [...new Set(internalLinks)];
}
```

## Rate Limiting

Scrape.do has rate limits based on your plan. Implement throttling:

```typescript
import pLimit from 'p-limit';

const limit = pLimit(5); // 5 concurrent requests

async function scrapeMultiple(urls: string[]) {
  return Promise.all(
    urls.map(url => limit(() => scrapePage(url)))
  );
}
```

## Caching

Cache results to reduce API calls:

```typescript
const cache = new Map<string, { html: string; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

async function scrapeWithCache(url: string) {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.html;
  }

  const html = await scrapePage(url);
  cache.set(url, { html, timestamp: Date.now() });
  return html;
}
```

## Error Handling

```typescript
async function safeScrape(url: string) {
  try {
    const response = await fetch(
      `https://api.scrape.do/?token=${SCRAPE_DO_API_KEY}&url=${encodeURIComponent(url)}`
    );

    if (!response.ok) {
      throw new Error(`Scrape failed: ${response.status}`);
    }

    return await response.text();
  } catch (error) {
    console.error(`Failed to scrape ${url}:`, error);
    return null;
  }
}
```

## Best Practices

1. **Respect robots.txt** - Don't scrape disallowed paths
2. **Rate limit requests** - Don't overwhelm target servers
3. **Cache responses** - Reduce redundant API calls
4. **Handle errors gracefully** - Sites may block or timeout
5. **Use for legitimate SEO purposes only** - Competitive analysis, not copying content
