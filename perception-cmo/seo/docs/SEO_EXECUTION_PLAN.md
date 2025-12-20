# SEO Execution Plan - December 2025

**Created:** December 20, 2025
**Goal:** Execute all SEO work ASAP, measure results over 3 months
**Target:** 20,000 monthly organic visitors

---

## Current State (December 20, 2025)

### Baseline Metrics (from GSC 90-day data)
| Metric | Value |
|--------|-------|
| Organic Clicks | ~32 |
| Impressions | ~3,500 |
| Average CTR | 0.9% |
| Average Position | 27.5 |
| Estimated Monthly Visitors | 30-50 |

### Top Performing Keywords (Position < 10)
- "bitcoin sentiment analysis december 2025" - Position 5.9 (62 impressions)
- "bitcoin current sentiment analysis november 2025" - Position 5.2 (24 impressions)
- "bitcoin market sentiment analysis october 2025" - Position 4.5 (2 impressions)
- "bitcoin perception" - Position 5.8 (26 impressions)
- Conference queries (satsconf, bitcoin amsterdam) - Position 5-8

### Biggest Opportunities
- `/bitcoin-fear-greed-index` - 851 impressions, Position 67.6 (needs to reach page 1)
- `/bitcoin-market-sentiment` - 1,106 impressions, Position 27, 5 clicks (close to page 1)
- Date-specific sentiment queries already ranking well

---

## What Was Completed (December 20, 2025)

### ✅ Sitemap Updates
Added 25+ missing pages to `public/sitemap.xml`:
- `/use-cases/` (4 pages)
- `/use-cases/journalism`
- `/use-cases/pr-agency`
- `/use-cases/executive-intelligence`
- `/use-cases/stakeholder-communications`
- `/alternatives/` (3 pages)
- `/alternatives/lunarcrush-alternative`
- `/alternatives/santiment-alternative`
- `/alternatives/alternative-me-alternative`
- `/compare/best-crypto-sentiment-tools`
- `/learn/`
- `/learn/what-is-crypto-sentiment-analysis`
- Monthly sentiment archives (4 recent months)
- Major conference pages (4 pages)

### ✅ New Pages Created
1. **`/compare/best-crypto-sentiment-tools`** (`src/pages/compare/best-crypto-sentiment-tools.tsx`)
   - Comprehensive comparison of 6 tools
   - Targets: "best crypto sentiment tools", "LunarCrush vs Santiment", "crypto sentiment analysis"
   - ~500 lines, feature comparison table, detailed reviews, FAQ with schema

2. **`/learn/`** hub (`src/pages/learn/index.tsx`)
   - Educational content hub
   - Links to all guides
   - Targets: "crypto sentiment analysis guide", "learn crypto trading"

3. **`/learn/what-is-crypto-sentiment-analysis`** (`src/pages/learn/what-is-crypto-sentiment-analysis.tsx`)
   - 2,000+ word comprehensive guide
   - Targets: "what is crypto sentiment analysis", "crypto sentiment explained"
   - Article schema, internal links

### ✅ Routes Added
Updated `src/App.tsx` with routes for:
- `/compare/best-crypto-sentiment-tools`
- `/learn`
- `/learn/what-is-crypto-sentiment-analysis`

### ✅ Internal Linking
Updated `/bitcoin-fear-greed-index` related resources section:
- Added link to `/learn/what-is-crypto-sentiment-analysis`
- Added link to `/compare/best-crypto-sentiment-tools`
- Added link to `/alternatives/alternative-me-alternative`
- Reorganized to 5-card layout

### ✅ Programmatic SEO (Already Built)
Discovered existing generators that create:
- **1,122 sentiment pages** (sitemap-sentiment.xml)
  - 1 main page
  - 36 monthly pages
  - 1,085 daily pages
- **9 conference pages** (sitemap-conferences.xml)

---

## Immediate Execution Checklist

### Deploy & Index (Do NOW)

- [ ] **Deploy to production**
  ```bash
  git add -A
  git commit -m "SEO: Add comparison page, learn hub, sitemap updates, internal links"
  git push origin main
  ```

- [ ] **Submit sitemaps to Google Search Console**
  1. Go to GSC > Sitemaps
  2. Submit: `https://perception.to/sitemap.xml`
  3. Submit: `https://perception.to/sitemap-sentiment.xml`
  4. Submit: `https://perception.to/sitemap-conferences.xml`

- [ ] **Request indexing for priority pages**
  Use GSC URL Inspection > Request Indexing:
  1. `/compare/best-crypto-sentiment-tools`
  2. `/learn`
  3. `/learn/what-is-crypto-sentiment-analysis`
  4. `/alternatives/lunarcrush-alternative`
  5. `/alternatives/santiment-alternative`
  6. `/alternatives/alternative-me-alternative`
  7. `/bitcoin-fear-greed-index` (re-request after content update)

### Content Creation (Execute ASAP)

#### Learn Articles to Create
| Priority | Article | Target Keyword | Status |
|----------|---------|----------------|--------|
| P1 | `/learn/how-to-read-fear-greed-index` | how to read fear greed index | ⬜ TODO |
| P1 | `/learn/bitcoin-market-psychology` | bitcoin market psychology | ⬜ TODO |
| P2 | `/learn/crypto-narrative-trading` | crypto narrative trading | ⬜ TODO |
| P2 | `/learn/understanding-bitcoin-dominance` | bitcoin dominance explained | ⬜ TODO |
| P3 | `/learn/crypto-social-sentiment` | crypto social sentiment | ⬜ TODO |

#### Comparison Pages to Create
| Priority | Page | Target Keywords | Status |
|----------|------|-----------------|--------|
| P1 | `/compare/perception-vs-glassnode` | glassnode alternative | ⬜ TODO |
| P2 | `/compare/best-crypto-news-aggregators` | crypto news aggregator | ⬜ TODO |

### Technical SEO (Execute ASAP)

- [ ] **Verify structured data** - Test all pages with Google Rich Results Test
- [ ] **Check Core Web Vitals** - Run Lighthouse on key pages
- [ ] **Verify SSR meta tags** - Curl key pages to confirm meta tags render
- [ ] **Set up weekly GSC monitoring** - Run `npm run seo:monitor` weekly

### Internal Linking (Execute ASAP)

- [ ] Add `/learn/` link to main navigation or footer
- [ ] Add `/compare/best-crypto-sentiment-tools` link to pricing page
- [ ] Add `/alternatives/` links to relevant competitor mention contexts
- [ ] Cross-link all `/learn/` articles to each other
- [ ] Add contextual links from `/bitcoin-market-sentiment` to learn articles

### Backlink Strategy (Start ASAP)

- [ ] **HARO signup** - Sign up at helpareporter.com
- [ ] **Guest post outreach** - Target list:
  - CoinDesk (contributor program)
  - Decrypt
  - The Block
  - Bitcoin Magazine
  - Crypto news sites accepting guests
- [ ] **Press release** - Announce Fear & Greed Index tool
- [ ] **Product Hunt launch** - Prepare listing

---

## Content Calendar

### Week 1 (Dec 20-27)
- [x] Deploy all completed work
- [x] Submit sitemaps to GSC
- [x] Request indexing for new pages
- [ ] Create `/learn/how-to-read-fear-greed-index`
- [ ] Create `/learn/bitcoin-market-psychology`

### Week 2 (Dec 28 - Jan 3)
- [ ] Create `/learn/crypto-narrative-trading`
- [ ] Create `/compare/perception-vs-glassnode`
- [ ] Add internal links throughout site
- [ ] First HARO responses

### Week 3 (Jan 4-10)
- [ ] Create remaining learn articles
- [ ] Guest post outreach begins
- [ ] First GSC position check

### Week 4 (Jan 11-17)
- [ ] Product Hunt preparation
- [ ] Press release draft
- [ ] Monthly content refresh

---

## Tracking & Milestones

### Weekly GSC Check
Run every Monday:
```bash
cd /Users/fernandonikolic/bitcoin-perception
node perception-cmo/seo/scripts/monitor-seo.js
```

### Key Metrics to Track
| Metric | Baseline (Dec 20) | Month 1 Target | Month 3 Target |
|--------|-------------------|----------------|----------------|
| Organic Clicks | 32 | 200 | 2,000 |
| Impressions | 3,500 | 15,000 | 100,000 |
| Average Position | 27.5 | 18 | 10 |
| Pages Indexed | ~50 | 200 | 500+ |
| Backlinks | Unknown | 10 | 50 |

### Milestone Checkpoints

**Month 1 (January 20, 2026)**
- [ ] All learn articles published (5+)
- [ ] All comparison pages published (3+)
- [ ] 10+ pages indexed in GSC
- [ ] First backlinks acquired
- [ ] 200+ monthly clicks

**Month 2 (February 20, 2026)**
- [ ] Product Hunt launch complete
- [ ] 3+ guest posts published
- [ ] 500+ monthly clicks
- [ ] 5+ keywords on page 1

**Month 3 (March 20, 2026)**
- [ ] 2,000+ monthly clicks
- [ ] 50+ keywords on page 1
- [ ] 50+ backlinks
- [ ] Clear trajectory to 20k visitors

---

## File References

### Pages Created/Modified
- `src/pages/compare/best-crypto-sentiment-tools.tsx` - NEW
- `src/pages/learn/index.tsx` - NEW
- `src/pages/learn/what-is-crypto-sentiment-analysis.tsx` - NEW
- `src/pages/bitcoin-fear-greed-index/index.tsx` - MODIFIED (internal links)
- `src/App.tsx` - MODIFIED (routes added)
- `public/sitemap.xml` - MODIFIED (25+ pages added)

### Existing SEO Assets
- `perception-cmo/seo/data/gsc-export-2025-12-19.json` - Latest GSC data
- `perception-cmo/seo/data/keywords.json` - Keyword database
- `perception-cmo/seo/scripts/monitor-seo.js` - Weekly monitoring
- `perception-cmo/seo/scripts/request-indexing.js` - Bulk indexing requests
- `docs/seo/strategy/20k-visitors-roadmap.md` - Full strategy doc

### Sitemap Files
- `public/sitemap.xml` - Main sitemap (manual pages)
- `public/sitemap-sentiment.xml` - 1,122 programmatic sentiment pages
- `public/sitemap-conferences.xml` - 9 conference pages

---

## Notes

### Why This Will Work
1. **Programmatic foundation exists** - 1,100+ pages already generated
2. **Quick wins available** - Multiple keywords at position 5-15
3. **Content gaps filled** - Comparison, learn, alternatives pages now exist
4. **Internal linking improved** - SEO juice flowing between pages

### Risks & Mitigations
| Risk | Mitigation |
|------|------------|
| Slow indexing | Submit sitemaps, request indexing manually |
| No backlinks | HARO, guest posts, PR outreach |
| Algorithm changes | Diversify content types, focus on quality |
| Competitor response | Move fast, publish more content |

### Tools Needed (All Free)
- Google Search Console (have)
- Google Analytics (have)
- Ahrefs Webmaster Tools (free backlink checker)
- HARO (free journalist queries)

---

*Last Updated: December 20, 2025*
*Next Review: January 20, 2026*
