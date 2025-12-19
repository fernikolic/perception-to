# SSR Meta Tags Fix

**Status:** Implemented
**Date:** December 20, 2024

## Problem

The site was serving identical meta tags (title, description, OG tags) for all pages because:
1. React Helmet only runs client-side after JavaScript executes
2. Search engine crawlers often don't execute JavaScript
3. Result: All pages indexed with the same meta content

**Evidence from GSC:**
- `/bitcoin-fear-greed-index` had 851 impressions but 0 clicks (position 68)
- `/bitcoin-market-sentiment` had 1,106 impressions but 5 clicks (position 27)

## Solution

Implemented **Cloudflare Pages Middleware** to inject page-specific meta tags and structured data for bot requests.

### How It Works

1. Middleware detects bot requests (Googlebot, Bingbot, social crawlers, AI crawlers)
2. For bot requests, HTML is intercepted before sending
3. Page-specific meta tags and JSON-LD are injected into `<head>`
4. Regular users still get the client-side React experience

### Files Created/Modified

```
functions/
├── _middleware.js     # Main middleware (UPDATED)
└── seo-config.js      # Page SEO configurations (NEW)
```

## Implementation Details

### seo-config.js

Contains page-specific SEO data:

```javascript
export const PAGE_SEO = {
  '/bitcoin-fear-greed-index': {
    title: 'Bitcoin Fear & Greed Index - Real-Time Market Sentiment | Perception',
    description: 'Track Bitcoin market sentiment with our real-time Fear & Greed Index...',
    keywords: 'bitcoin fear and greed index, crypto fear greed index...',
    canonical: 'https://perception.to/bitcoin-fear-greed-index',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      // ... structured data
    }
  },
  // ... more pages
};
```

### _middleware.js

Handles:
- Bot detection (search engines, social crawlers, AI crawlers)
- Dynamic route handling (e.g., `/bitcoin-market-sentiment/2025/12/15`)
- HTML injection of meta tags and JSON-LD
- Canonical URL redirects

### Bots Detected

- **Search Engines:** Googlebot, Bingbot, Yandex, Baidu, DuckDuckBot
- **Social Media:** Facebook, Twitter, LinkedIn, Slack, WhatsApp, Telegram, Discord
- **AI Crawlers:** GPTBot, ChatGPT, Claude, Perplexity

## Testing

### Local Testing

Can't test locally since middleware only runs on Cloudflare Pages.

### Production Testing

After deployment, test with:

```bash
# Test as Googlebot
curl -A "Googlebot/2.1" https://perception.to/bitcoin-fear-greed-index | grep -A5 "<title>"

# Verify structured data
curl -A "Googlebot/2.1" https://perception.to/bitcoin-fear-greed-index | grep "application/ld+json"
```

### Google Search Console

After 1-2 weeks:
1. Check "URL Inspection" tool for each page
2. Verify rendered HTML shows correct meta tags
3. Monitor position changes for target keywords

## Adding New Pages

To add SEO config for a new page:

1. Edit `functions/seo-config.js`
2. Add entry to `PAGE_SEO` object:

```javascript
'/new-page': {
  title: 'Page Title | Perception',
  description: 'Page description...',
  keywords: 'keyword1, keyword2',
  canonical: 'https://perception.to/new-page',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Page Name'
  }
}
```

3. Deploy to Cloudflare Pages

## Dynamic Routes

The middleware automatically handles:

- `/bitcoin-market-sentiment/YYYY/MM/DD` - Daily sentiment pages
- `/crypto-conferences/YYYY/slug` - Individual conference pages

These generate unique meta tags based on the URL parameters.

## Expected Results

After Google recrawls:
- Each page should have unique title/description in search results
- Structured data should appear in Google's Rich Results
- Ranking positions should improve (target: page 1 for key terms)
- CTR should increase with better meta descriptions

## Rollback

To rollback, restore the original `_middleware.js`:

```bash
git checkout HEAD~1 -- functions/_middleware.js
```

And remove `seo-config.js`:

```bash
rm functions/seo-config.js
```
