# Google Search Console Analysis Report

**Generated:** December 20, 2024
**Property:** sc-domain:perception.to
**Date Range:** September 20, 2025 - December 19, 2025 (90 days)

---

## Executive Summary

Perception.to is getting **significant impressions** but **almost no clicks**. This indicates Google is indexing the pages but users aren't clicking through, likely due to:

1. Poor meta titles/descriptions (not compelling or not matching search intent)
2. Low ranking positions (pages 3-7 of results)
3. SSR issues causing duplicate/incorrect meta tags

**Key Metrics:**
- Total Impressions: ~3,500+
- Total Clicks: ~32
- Average CTR: 0.9%
- Average Position: 27.5

---

## Page-Level Analysis

### High-Impression Pages

#### 1. /bitcoin-market-sentiment
- **Impressions:** 1,106
- **Clicks:** 5
- **CTR:** 0.5%
- **Position:** 27.2 (Page 3)

**Issue:** Despite being the highest-impression page, it ranks on page 3. Users don't scroll that far.

**Fix Required:**
- Improve page content depth
- Add more unique data/charts
- Fix SSR to ensure proper meta rendering
- Build backlinks to this page

#### 2. /bitcoin-fear-greed-index
- **Impressions:** 851
- **Clicks:** 0
- **CTR:** 0%
- **Position:** 67.7 (Page 7)

**Issue:** This is a high-value keyword but the page is practically invisible.

**Fix Required:**
- Complete content overhaul
- Add daily updated content (automated)
- Implement proper schema markup (FAQPage, Dataset)
- Fix SSR immediately
- Consider creating daily/weekly subpages for freshness signals

#### 3. Homepage (perception.to)
- **Impressions:** 115
- **Clicks:** 6
- **CTR:** 5.2%
- **Position:** 5.1

**Status:** Relatively healthy CTR for position. Brand queries working.

#### 4. /about
- **Impressions:** 80
- **Clicks:** 2
- **CTR:** 2.5%
- **Position:** 5.4

**Status:** Good positioning, reasonable CTR for an about page.

---

## Keyword Analysis

### Brand vs Non-Brand

| Type | Keywords | Clicks | Impressions | CTR |
|------|----------|--------|-------------|-----|
| Brand | 1 | 0 | 26 | 0% |
| Non-Brand | 99 | 3 | 1,416 | 0.2% |

**Insight:** 100% of clicks come from non-brand queries. Brand awareness is essentially zero.

### Top Keywords by Impressions

| Keyword | Impressions | Clicks | Position |
|---------|-------------|--------|----------|
| bitcoin sentiment score december 2025 | 225 | 0 | 7.8 |
| bitcoin fear and greed index 10 november 2025 | 121 | 0 | 8.0 |
| bitcoin market sentiment december 2025 | 112 | 0 | 8.9 |
| bitcoin market sentiment analysis november 2025 | 101 | 0 | 8.3 |
| bitcoin sentiment analysis september 2025 | 77 | 0 | 7.8 |
| bitcoin market sentiment analysis 2025-12-06 | 75 | 0 | 7.3 |
| bitcoin sentiment | 63 | 0 | 73.7 |
| bitcoin market sentiment analysis december 2025 | 63 | 0 | 6.8 |

### Keyword Categories

#### 1. Date-Specific Sentiment Queries (HIGH VOLUME)
Examples:
- "bitcoin sentiment analysis december 2025"
- "bitcoin market sentiment november 2025"
- "bitcoin fear and greed index 10 november 2025"

**Opportunity:** These are time-sensitive queries. Automated daily/weekly content generation would capture this traffic.

#### 2. Conference Queries (MODERATE VOLUME)
Examples:
- "bitcoin amsterdam 2025" - 22 impressions, position 11.2
- "blockchain futurist conference" - impressions in hundreds

**Status:** /crypto-conferences pages are performing well. Continue updating.

#### 3. Generic Sentiment Queries (HIGH VALUE, POOR RANKING)
Examples:
- "bitcoin sentiment" - 63 impressions, position 73.7
- "bitcoin market sentiment" - 8 impressions, position 71.6
- "bitcoin sentiment analysis" - 4 impressions, position 61.3

**Issue:** These are high-value head terms but rankings are terrible (page 7+).

---

## Quick Wins (Position 11-20)

These keywords are "almost page 1" and need small optimizations:

| Keyword | Position | Impressions | Action |
|---------|----------|-------------|--------|
| bitcoin amsterdam 2025 | 11.2 | 22 | Optimize conference page |
| bitcoin investor sentiment november 2025 | 11.0 | 1 | Add investor sentiment section |

---

## Recommendations

### Immediate (This Week)

1. **Fix SSR for meta tags**
   - Ensure each page renders unique title/description server-side
   - Priority pages: /bitcoin-fear-greed-index, /bitcoin-market-sentiment

2. **Add structured data**
   - FAQPage schema on sentiment pages
   - Dataset schema for data pages
   - Organization schema on homepage

3. **Improve Fear & Greed page**
   - Current position 68 is unacceptable for 851 impressions
   - Add more content, daily updates, historical data

### Short-Term (2 Weeks)

4. **Create date-specific pages**
   - Monthly sentiment archive pages (/bitcoin-market-sentiment/2025/december)
   - These are already getting impressions

5. **Optimize meta titles/descriptions**
   - Make them more compelling
   - Include CTAs ("Live data", "Updated daily")

6. **Build internal links**
   - Link from homepage to key SEO pages
   - Cross-link between sentiment pages

### Long-Term (1 Month)

7. **Create comparison pages**
   - /compare/perception-vs-lunarcrush
   - /compare/perception-vs-santiment

8. **Build backlinks**
   - Guest posts on crypto publications
   - PR for data/insights

---

## Data Source

Raw data exported to: `perception-cmo/seo/data/gsc-export-2025-12-19.json`

Script location: `perception-cmo/seo/scripts/gsc-keyword-analysis.js`

Run with: `node perception-cmo/seo/scripts/gsc-keyword-analysis.js`
