# SEO Audit Report: perception.to
**Date:** December 20, 2024
**Auditor:** SEO Agent

---

## Executive Summary

**Overall SEO Health: NEEDS ATTENTION**

The site has solid foundations (robots.txt, sitemap, canonical URLs) but has **critical issues** that are likely preventing search visibility:

| Category | Status | Priority |
|----------|--------|----------|
| SSR/Content Rendering | ⚠️ Partial | HIGH |
| Meta Tags | ❌ Duplicate | CRITICAL |
| Heading Structure | ❌ Client-side only | CRITICAL |
| Structured Data | ❌ Missing | HIGH |
| robots.txt | ✅ Good | - |
| Sitemap | ✅ Good | - |
| Canonical URLs | ✅ Present | - |

---

## Critical Issues

### 1. ❌ Duplicate Meta Tags Across All Pages (CRITICAL)

**Problem:** Every page returns the SAME title and description:

```
Title: "Perception - Intelligence Workspace for Bitcoin, Stablecoins & Tokenized Finance"
Description: "Intelligence workspace for Bitcoin, stablecoins & tokenized finance..."
```

**Pages checked with identical meta:**
- / (homepage)
- /pricing
- /methodology
- /about
- /journalist

**Impact:** Google sees duplicate content signals. Pages cannot rank for different keywords.

**Fix Required:** Implement unique meta tags per page. The site uses React with `react-helmet-async` but the SSR isn't properly hydrating unique meta for each route.

---

### 2. ❌ Headings Not Rendered Server-Side (CRITICAL)

**Problem:** No `<h1>`, `<h2>`, or `<h3>` tags appear in the server response.

```bash
curl -s https://perception.to | grep '<h1'
# Returns nothing
```

The headings exist in the React components but are only rendered after JavaScript executes. Googlebot may not see them.

**Impact:** Google cannot understand page structure and main topics. Critical for ranking.

**Fix Required:** Ensure headings are rendered in the initial HTML response (SSR/prerendering).

---

### 3. ❌ No Structured Data (HIGH)

**Problem:** Zero JSON-LD structured data found on any page.

```bash
curl -s https://perception.to | grep 'application/ld+json'
# Returns 0 matches
```

**Missing schemas:**
- Organization
- SoftwareApplication
- FAQPage
- WebSite

**Impact:** Missing rich results in Google. Reduced LLM/AI visibility (ChatGPT, Claude, Perplexity won't have structured info to cite).

**Fix Required:** Add structured data to `<head>` before React hydration, or use SSR to include it.

---

### 4. ⚠️ Title Not Optimized for Target Keywords (HIGH)

**Current Title:**
```
Perception - Intelligence Workspace for Bitcoin, Stablecoins & Tokenized Finance
```

**Issues:**
- 83 characters (ideal: 50-60)
- Missing target keywords: "crypto media monitoring", "media intelligence"
- "Workspace" is vague - doesn't convey product value

**Recommended Title:**
```
Perception | Bitcoin & Crypto Media Intelligence Platform | 250+ Sources
```

---

### 5. ⚠️ Description Needs Optimization (MEDIUM)

**Current Description:**
```
Intelligence workspace for Bitcoin, stablecoins & tokenized finance. Monitor trends with watchlists, organize in Spaces, generate deliverables with Recipes. 650+ sources, full citations.
```

**Issues:**
- Says "650+ sources" but your messaging says "250+ sources" - inconsistency
- Missing CTA ("Start free trial")
- Doesn't mention key differentiators (media monitoring, PR teams, sentiment)

**Recommended Description:**
```
Track Bitcoin and crypto narratives across 250+ media sources. Real-time sentiment analysis, media monitoring, and intelligence reports for PR teams, analysts, and researchers. Start free trial.
```

---

## What's Working Well

### ✅ robots.txt (Good)

```
User-agent: *
Allow: /
Sitemap: https://perception.to/sitemap.xml
```

- Allows all crawlers
- Points to sitemaps
- Specifically allows social bots (Facebook, Twitter, LinkedIn, etc.)
- Allows AI crawlers (good for LLM visibility)

### ✅ Sitemap (Good)

- Multiple sitemaps exist (main, conferences, sentiment)
- 22 URLs in main sitemap
- Proper XML format with lastmod, changefreq, priority

### ✅ Canonical URLs (Good)

```html
<link rel="canonical" href="https://perception.to/" />
```

Present on pages checked.

### ✅ Open Graph / Twitter Cards (Present)

OG and Twitter meta tags are present in the initial HTML.

---

## Keyword Analysis

### Current Targeting (from meta keywords):
```
Bitcoin intelligence platform, stablecoin market intelligence, tokenized finance monitoring,
competitive intelligence workspace, crypto trend discovery, Bitcoin sentiment analysis
```

### Missing High-Value Keywords:
- ❌ "crypto media monitoring" (primary target)
- ❌ "bitcoin media intelligence"
- ❌ "crypto PR tools"
- ❌ "crypto narrative tracking"
- ❌ "250+ sources" (unique differentiator)

---

## Content Gaps

### Pages in Sitemap (22 total):
- Homepage, pricing, methodology, about
- Persona pages: /journalist, /investor
- Intelligence articles (8+)
- Glossary entries

### Missing High-Priority Pages:
- ❌ /compare/perception-vs-lunarcrush
- ❌ /compare/perception-vs-santiment
- ❌ /compare/best-crypto-media-monitoring-tools
- ❌ /use-cases/pr-teams
- ❌ /use-cases/research-analysts
- ❌ /features (dedicated feature page)
- ❌ FAQ section with schema

---

## Recommended Action Plan

### Immediate (This Week)

1. **Fix SSR for meta tags** - Ensure each route has unique title/description server-rendered
2. **Fix SSR for headings** - H1, H2, H3 must appear in initial HTML
3. **Add structured data** - Start with Organization + SoftwareApplication on homepage
4. **Update homepage title** - Change to keyword-optimized version
5. **Update homepage description** - Include target keywords and CTA

### Short-Term (2 Weeks)

6. **Create comparison pages** - vs LunarCrush, vs Santiment
7. **Add FAQPage schema** - To homepage and relevant pages
8. **Create /features page** - Dedicated SEO-optimized feature overview
9. **Optimize existing persona pages** - /journalist, /investor need unique meta

### Medium-Term (4 Weeks)

10. **Create use-case pages** - PR teams, research analysts, etc.
11. **Build blog/content section** - Target long-tail keywords
12. **Internal linking audit** - Ensure proper link flow
13. **Submit to Google Search Console** - Monitor indexing

---

## Technical Notes

### Framework
- React SPA with Vite
- Uses `react-helmet-async` for meta management
- Deployed on Cloudflare Pages

### SSR Status
- Partial SSR - meta tags in `<head>` are rendered
- Body content is client-rendered (`<div id="root"></div>`)
- This is the root cause of heading/structured data issues

### Recommendations for SSR
Consider:
1. **Vite SSR** - Add server-side rendering to current setup
2. **Prerendering** - Use vite-plugin-ssr or similar for static routes
3. **Cloudflare Pages Functions** - Render critical content at edge

---

## Files Referenced

- Schemas ready to use: `/perception-cmo/seo/lib/schemas.ts`
- Metadata configs: `/perception-cmo/seo/lib/metadata.ts`
- Checklist: `/perception-cmo/seo/docs/SEO_CHECKLIST.md`

---

*Generated by SEO Agent | perception-cmo/seo*
