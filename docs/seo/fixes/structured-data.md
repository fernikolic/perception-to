# Structured Data Implementation

**Status:** Implemented
**Date:** December 20, 2024

## Problem

No JSON-LD structured data was present on any pages:

```bash
curl -s https://perception.to | grep 'application/ld+json'
# Returns nothing
```

This meant:
- No rich results in Google
- Reduced visibility in AI assistants (ChatGPT, Claude, Perplexity)
- Missing Organization knowledge graph

## Solution

Added JSON-LD structured data via Cloudflare Pages Middleware. Each page now gets appropriate schema markup.

## Schemas Implemented

### Homepage (`/`)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Perception",
  "url": "https://perception.to",
  "logo": "https://perception.to/logos/perception-logo-dark.png",
  "description": "Intelligence workspace for Bitcoin, stablecoins & tokenized finance",
  "sameAs": [
    "https://twitter.com/perception",
    "https://linkedin.com/company/perception"
  ],
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://app.perception.to/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

**Benefits:**
- Organization knowledge panel in Google
- Sitelinks searchbox in search results
- Brand entity recognition

### Fear & Greed Index (`/bitcoin-fear-greed-index`)

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Bitcoin Fear & Greed Index",
  "url": "https://perception.to/bitcoin-fear-greed-index",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  }
}
```

**Benefits:**
- Software/app rich results
- Star ratings in search
- Free price indicator

### Market Sentiment (`/bitcoin-market-sentiment`)

```json
{
  "@context": "https://schema.org",
  "@type": "Dataset",
  "name": "Bitcoin Market Sentiment Data",
  "description": "Daily Bitcoin market sentiment analysis...",
  "temporalCoverage": "2024/..",
  "distribution": {
    "@type": "DataDownload",
    "encodingFormat": "application/json",
    "contentUrl": "https://api.perception.to/v1/sentiment"
  }
}
```

**Benefits:**
- Dataset rich results in Google
- Google Dataset Search inclusion
- Data credibility signals

### Crypto Conferences (`/crypto-conferences`)

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Crypto Conferences 2025-2026",
  "numberOfItems": 50
}
```

### Individual Conferences (`/crypto-conferences/2025/bitcoin-amsterdam`)

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Bitcoin Amsterdam 2025",
  "url": "https://perception.to/crypto-conferences/2025/bitcoin-amsterdam"
}
```

**Benefits:**
- Event rich results with dates
- Google Events carousel
- Calendar integration

### API Page (`/api`)

```json
{
  "@context": "https://schema.org",
  "@type": "WebAPI",
  "name": "Perception Sentiment API",
  "description": "REST API for accessing crypto market sentiment data",
  "documentation": "https://perception.to/docs"
}
```

## Validation

### Google Rich Results Test

Test pages at: https://search.google.com/test/rich-results

### Schema Validator

Test at: https://validator.schema.org/

### Command Line

```bash
# Check for structured data
curl -A "Googlebot" https://perception.to/bitcoin-fear-greed-index | \
  grep -o '<script type="application/ld\+json">.*</script>' | \
  sed 's/<[^>]*>//g' | jq .
```

## Future Enhancements

### FAQPage Schema

Add to pages with FAQ sections:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the Bitcoin Fear & Greed Index?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Bitcoin Fear & Greed Index measures..."
      }
    }
  ]
}
```

### BreadcrumbList Schema

For navigation structure:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://perception.to"},
    {"@type": "ListItem", "position": 2, "name": "Conferences", "item": "https://perception.to/crypto-conferences"}
  ]
}
```

### Article Schema

For blog posts and content pages:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "datePublished": "2024-12-20",
  "author": {"@type": "Organization", "name": "Perception"}
}
```

## Monitoring

Track structured data in Google Search Console:
1. Go to Search Console > Enhancements
2. Check for structured data reports
3. Monitor for errors/warnings

## Related Files

- `functions/seo-config.js` - Schema definitions
- `functions/_middleware.js` - Injection logic
