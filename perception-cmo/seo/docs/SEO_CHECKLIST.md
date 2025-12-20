# SEO Implementation Checklist

Use this checklist to track progress on SEO implementation for perception.to.

---

## Phase 1: Technical Foundation

### Critical (Week 1)

- [ ] **SSR/SSG Verification**
  - [ ] Run `curl -s https://perception.to | head -100` to check if content renders
  - [ ] Ensure all important text content is in initial HTML (not JS-loaded)
  - [ ] Test with JavaScript disabled in browser

- [ ] **robots.txt**
  - [ ] File exists at `/public/robots.txt`
  - [ ] Allows crawling of important pages
  - [ ] Points to sitemap
  - [ ] Verify at https://perception.to/robots.txt

- [ ] **sitemap.xml**
  - [ ] File exists at `/public/sitemap.xml` or generated dynamically
  - [ ] Includes all important pages
  - [ ] Has correct URLs (https://perception.to/...)
  - [ ] Submit to Google Search Console
  - [ ] Verify at https://perception.to/sitemap.xml

- [ ] **Canonical URLs**
  - [ ] Every page has `<link rel="canonical">` tag
  - [ ] No duplicate content issues
  - [ ] Trailing slashes consistent

- [ ] **HTTPS**
  - [ ] All pages served over HTTPS
  - [ ] HTTP redirects to HTTPS
  - [ ] No mixed content warnings

### Core Web Vitals

- [ ] **LCP (Largest Contentful Paint) < 2.5s**
  - [ ] Test at https://pagespeed.web.dev/
  - [ ] Optimize images (WebP, lazy loading)
  - [ ] Preload critical fonts
  - [ ] Minimize render-blocking resources

- [ ] **CLS (Cumulative Layout Shift) < 0.1**
  - [ ] Set explicit dimensions on images
  - [ ] Reserve space for dynamic content
  - [ ] Avoid inserting content above existing content

- [ ] **INP (Interaction to Next Paint) < 200ms**
  - [ ] Optimize JavaScript execution
  - [ ] Break up long tasks
  - [ ] Debounce/throttle event handlers

---

## Phase 2: On-Page SEO

### Meta Tags

- [ ] **Homepage**
  - [ ] Title: "Perception | Bitcoin & Crypto Media Intelligence Platform | 250+ Sources"
  - [ ] Description: (150-160 chars with CTA)
  - [ ] OG tags complete
  - [ ] Twitter card tags complete

- [ ] **Pricing Page**
  - [ ] Unique title with "pricing" keyword
  - [ ] Description mentions price point
  - [ ] OG/Twitter tags

- [ ] **Features Page**
  - [ ] Unique title with feature keywords
  - [ ] Description highlights capabilities
  - [ ] OG/Twitter tags

- [ ] **All Pages**
  - [ ] Verify no duplicate titles
  - [ ] Verify no duplicate descriptions
  - [ ] All have canonical URLs

### Heading Structure

- [ ] **Every page has exactly one H1**
  - [ ] Homepage H1 contains primary keyword
  - [ ] Feature page H1s are descriptive
  - [ ] H1 is visible (not hidden)

- [ ] **Logical heading hierarchy**
  - [ ] H2s follow H1
  - [ ] H3s follow H2s
  - [ ] No skipped levels

### Images

- [ ] **All images have alt text**
  - [ ] Alt text is descriptive
  - [ ] Includes keywords where natural
  - [ ] Not keyword-stuffed

- [ ] **Image optimization**
  - [ ] WebP format used
  - [ ] Proper sizing (not oversized)
  - [ ] Lazy loading implemented

---

## Phase 3: Structured Data

### Organization Schema

- [ ] Added to all pages
- [ ] Includes: name, url, logo, description
- [ ] Includes founder info
- [ ] Includes social links
- [ ] Validated at https://validator.schema.org/

### SoftwareApplication Schema

- [ ] Added to homepage
- [ ] Includes: name, category, description
- [ ] Includes pricing info
- [ ] Includes feature list
- [ ] Validated

### FAQPage Schema

- [ ] Added to homepage
- [ ] Added to relevant feature pages
- [ ] 5-8 questions per page
- [ ] Questions match actual user queries
- [ ] Validated

### Breadcrumbs

- [ ] Implemented on all non-homepage pages
- [ ] BreadcrumbList schema added
- [ ] Navigation matches schema
- [ ] Validated

---

## Phase 4: Content Creation

### Use Case Pages

- [ ] **/use-cases/pr-teams**
  - [ ] Created with unique content
  - [ ] Meta tags optimized
  - [ ] Structured data added
  - [ ] Internal links to/from homepage

- [ ] **/use-cases/research-analysts**
  - [ ] Created with unique content
  - [ ] Meta tags optimized
  - [ ] Structured data added
  - [ ] Internal links

- [ ] **/use-cases/content-creators**
  - [ ] Created with unique content
  - [ ] Meta tags optimized
  - [ ] Structured data added
  - [ ] Internal links

- [ ] **/use-cases/business-development**
  - [ ] Created with unique content
  - [ ] Meta tags optimized
  - [ ] Structured data added
  - [ ] Internal links

### Comparison Pages

- [x] **/alternatives/lunarcrush-alternative** (exists)
  - [x] Created with 1500+ words
  - [x] Comparison table included
  - [x] FAQ section with schema
  - [x] Meta tags optimized
  - [x] CTA to trial

- [x] **/alternatives/santiment-alternative** (exists)
  - [x] Created with 1500+ words
  - [x] Comparison table included
  - [x] FAQ section with schema
  - [x] Meta tags optimized
  - [x] CTA to trial

- [x] **/alternatives/alternative-me-alternative** (exists)
  - [x] Created with 1500+ words
  - [x] Comparison table included
  - [x] FAQ section with schema
  - [x] Meta tags optimized
  - [x] CTA to trial

- [x] **/compare/best-crypto-sentiment-tools** ✅ NEW Dec 20
  - [x] Created with 2000+ words
  - [x] 6 tools compared (Perception, LunarCrush, Santiment, Alternative.me, The TIE, Messari)
  - [x] Feature comparison table
  - [x] Detailed reviews with pros/cons
  - [x] FAQ section with schema
  - [x] Meta tags optimized
  - [x] Perception positioned favorably

### Educational Content (Learn Hub)

- [x] **/learn** (index page) ✅ NEW Dec 20
  - [x] Hub page linking to all articles
  - [x] Featured articles highlighted
  - [x] Category navigation
  - [x] Meta tags optimized

- [x] **/learn/what-is-crypto-sentiment-analysis** ✅ NEW Dec 20
  - [x] 2000+ words comprehensive guide
  - [x] Table of contents
  - [x] Article schema
  - [x] Internal links to tools and comparisons
  - [x] Meta tags optimized

- [ ] **/learn/how-to-read-fear-greed-index**
  - [ ] Guide on interpreting the index
  - [ ] Score ranges explained
  - [ ] Trading strategies
  - [ ] Article schema

- [ ] **/learn/bitcoin-market-psychology**
  - [ ] Market psychology explained
  - [ ] FOMO/FUD cycles
  - [ ] Institutional behavior
  - [ ] Article schema

---

## Phase 5: Internal Linking

### Homepage Links

- [ ] Links to all use case pages
- [ ] Links to features page
- [ ] Links to pricing
- [ ] Links to comparison pages (in footer or relevant sections)

### Feature Pages

- [ ] Link to related use cases
- [ ] Link to pricing
- [ ] Link to relevant comparisons

### Use Case Pages

- [ ] Link to relevant features
- [ ] Link to pricing
- [ ] Link to other use cases
- [ ] Cross-link with comparisons

### Comparison Pages

- [ ] Link to features mentioned
- [ ] Link to pricing
- [ ] Link to relevant use cases

---

## Phase 6: Verification & Monitoring

### Google Search Console

- [ ] Site verified
- [ ] Sitemap submitted
- [ ] Check for crawl errors
- [ ] Check for mobile usability issues
- [ ] Monitor index coverage
- [ ] Set up search performance alerts

### Testing

- [ ] Test all pages in Rich Results Test
- [ ] Test all pages in PageSpeed Insights
- [ ] Verify structured data renders correctly
- [ ] Check mobile rendering

### Monitoring (Ongoing)

- [ ] Weekly: Check Search Console for new queries
- [ ] Weekly: Monitor index coverage
- [ ] Monthly: Track keyword rankings
- [ ] Monthly: Review Core Web Vitals
- [ ] Quarterly: Full technical audit

---

## Quick Reference Commands

```bash
# Check if SSR is working
curl -s https://perception.to | grep -i "bitcoin\|crypto\|perception"

# Check robots.txt
curl https://perception.to/robots.txt

# Check sitemap
curl https://perception.to/sitemap.xml

# Check meta tags
curl -s https://perception.to | grep -E "<title>|<meta name=\"description\""

# Check headings
curl -s https://perception.to | grep -E "<h1|<h2|<h3" | head -20

# Check structured data
curl -s https://perception.to | grep -o 'application/ld+json.*</script>' | head -5
```

---

## Progress Notes

**Date: December 20, 2025**
Major SEO execution session completed:

### ✅ Completed Today
- [x] Updated sitemap.xml with 25+ missing pages (use-cases, alternatives, compare, learn, sentiment archives, conferences)
- [x] Created `/compare/best-crypto-sentiment-tools` - comprehensive tool comparison page
- [x] Created `/learn/` hub with first article
- [x] Created `/learn/what-is-crypto-sentiment-analysis` - 2,000+ word guide
- [x] Added routes to App.tsx for all new pages
- [x] Updated Fear & Greed page internal links (added learn, compare, alternatives)
- [x] Verified build passes with no errors
- [x] Documented full execution plan in SEO_EXECUTION_PLAN.md

### Discovered Assets
- Programmatic SEO already generating 1,122 sentiment pages + 9 conference pages
- sitemap-sentiment.xml and sitemap-conferences.xml auto-generated on build

### 🔲 Immediate TODO (Before End of Week)
- [ ] Deploy changes to production
- [ ] Submit all 3 sitemaps to GSC
- [ ] Request indexing for 7 priority pages
- [ ] Create `/learn/how-to-read-fear-greed-index`
- [ ] Create `/learn/bitcoin-market-psychology`
- [ ] Add `/learn/` to footer navigation

### Baseline Metrics (for comparison in 3 months)
- Organic Clicks: ~32 (90 days)
- Impressions: ~3,500 (90 days)
- Average Position: 27.5
- Fear & Greed page: 851 impressions, Position 67.6

---

**Date: ___________**
Notes:


**Date: ___________**
Notes:
