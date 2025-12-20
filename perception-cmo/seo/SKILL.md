# SEO Agent Skill for Perception

## Skill Name
`seo`

## Description
SEO optimization agent for perception.to. Performs technical audits, content optimization, competitive analysis, and implements SEO improvements across the entire website.

## Invocation
```
/seo [command]
```

## Available Commands

### Audit Commands
- `/seo audit` - Run full technical SEO audit
- `/seo audit:meta` - Audit meta tags across all pages
- `/seo audit:structured-data` - Audit JSON-LD structured data
- `/seo audit:headings` - Audit heading hierarchy (H1, H2, H3)
- `/seo audit:images` - Audit image alt text and optimization
- `/seo audit:links` - Audit internal linking structure
- `/seo audit:performance` - Check Core Web Vitals

### Analysis Commands
- `/seo analyze:competitors` - Analyze competitor SEO strategies
- `/seo analyze:keywords` - Analyze keyword opportunities
- `/seo analyze:serp [keyword]` - Analyze SERP for specific keyword
- `/seo analyze:gaps` - Find content gaps vs competitors

### Implementation Commands
- `/seo optimize:page [url]` - Optimize a specific page
- `/seo optimize:meta` - Optimize meta tags site-wide
- `/seo generate:sitemap` - Generate/update sitemap.xml
- `/seo generate:robots` - Generate/update robots.txt
- `/seo generate:schema [type]` - Generate structured data schema

### Content Commands
- `/seo content:comparison [competitor]` - Create comparison page content
- `/seo content:usecase [persona]` - Create use-case page content
- `/seo content:faq` - Generate FAQ content with schema

### Reporting Commands
- `/seo report` - Generate full SEO status report
- `/seo checklist` - Show implementation checklist with progress

---

## Project Context

**Company:** Perception
**Domain:** perception.to
**Product:** Crypto media intelligence platform monitoring 250+ sources
**Target Users:** PR/comms professionals, research analysts, BD teams, content creators
**Pricing:** $99/month (beta)

## The Problem

Perception is invisible for non-branded searches:
- "bitcoin media monitoring" → Not ranking
- "crypto sentiment analysis tool" → Not ranking
- "crypto narrative tracking" → Not ranking
- "crypto PR intelligence" → Not ranking

**Competitors dominating these searches:**
- LunarCrush (social + market intelligence)
- Santiment (behavioral analytics, on-chain + social)
- Glassnode (on-chain market intelligence)
- Arkham (wallet/whale tracking)

## Our Differentiation

1. **Media intelligence** (not just social sentiment) - legacy + crypto media
2. **250+ aggregated sources** - most comprehensive coverage
3. **PR/comms workflow focus** - built for professionals, not traders
4. **Citation-backed research** - full source attribution
5. **Deliverable generation** - reports and briefs, not just dashboards

## Target Keywords

### Tier 1: High Intent (Priority)
- crypto media monitoring
- bitcoin media intelligence
- crypto PR tools
- bitcoin coverage tracking
- crypto narrative monitoring

### Tier 2: Research Professionals
- crypto sentiment analysis tool
- bitcoin narrative tracking
- crypto intelligence platform
- bitcoin media sentiment

### Tier 3: Long-tail
- bitcoin news aggregator
- how to track bitcoin narratives
- crypto media analysis

### Tier 4: Comparison (High Intent)
- perception vs lunarcrush
- perception vs santiment
- lunarcrush alternative
- santiment alternative

---

## Technical SEO Checklist

### Critical (Do First)
- [ ] SSR/SSG renders content without JavaScript
- [ ] robots.txt allows crawling
- [ ] sitemap.xml exists and includes all pages
- [ ] Canonical URLs set on all pages
- [ ] Mobile responsive
- [ ] HTTPS configured
- [ ] Core Web Vitals passing

### On-Page SEO
- [ ] Unique, keyword-optimized title tags (50-60 chars)
- [ ] Compelling meta descriptions with CTAs (150-160 chars)
- [ ] One H1 per page containing primary keyword
- [ ] Logical heading hierarchy
- [ ] Alt text on all images
- [ ] Internal linking between related pages
- [ ] Clean URL structure

### Structured Data
- [ ] Organization schema on all pages
- [ ] SoftwareApplication schema on homepage
- [ ] FAQPage schema where appropriate
- [ ] BreadcrumbList schema for navigation
- [ ] WebSite schema with search action

### Content
- [ ] Homepage optimized for primary keywords
- [ ] Feature pages for each capability
- [ ] Comparison pages vs competitors
- [ ] Use-case pages for each persona
- [ ] FAQ section with schema

---

## Page Specifications

### Homepage (/)
**Title:** "Perception | Bitcoin & Crypto Media Intelligence Platform | 250+ Sources"
**Description:** "Track Bitcoin and crypto narratives across 250+ media sources. Real-time sentiment analysis, media monitoring, and intelligence reports for PR teams, analysts, and researchers. Start free trial."
**H1:** "Crypto Media Intelligence Platform"
**Schemas:** Organization, SoftwareApplication, FAQPage

### Pricing (/pricing)
**Title:** "Pricing | Perception Crypto Intelligence Platform"
**Description:** "Perception pricing starts at $99/month. Get unlimited access to 250+ crypto media sources, sentiment tracking, and AI-powered intelligence reports."

### Features (/features)
**Title:** "Features | Crypto Media Monitoring & Intelligence Tools | Perception"
**Description:** "Monitor 250+ crypto media sources, track Bitcoin narratives in real-time, generate intelligence reports with citations."

### Comparison Pages (Create)
- /compare/perception-vs-lunarcrush
- /compare/perception-vs-santiment
- /compare/best-crypto-media-monitoring-tools

### Use-Case Pages (Create)
- /use-cases/pr-teams
- /use-cases/research-analysts
- /use-cases/content-creators
- /use-cases/business-development

---

## Quick Commands

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

## Available Tools & APIs

### Built-in
- **WebSearch** - SERP analysis, competitor research
- **WebFetch** - Page content analysis, competitor auditing
- **Scrape.do** - Web scraping for competitor data (API key required)

### Google Cloud Platform
- Project: `triple-upgrade-245423`
- **Google Search Console API** - Performance data, indexing status
- **Google Sheets API** - Already configured for content

### Other
- **Perplexity API** - Research and content analysis
- **OpenAI API** - Content generation
- **Semrush** - PDF exports for keyword/competitor data

---

## File Structure

```
perception-cmo/seo/
├── SKILL.md              # This file - main skill definition
├── prompts/              # Reusable prompt templates
│   ├── audit.md
│   ├── competitor-analysis.md
│   ├── content-optimization.md
│   └── serp-analysis.md
├── audits/               # Audit results and reports
│   └── .gitkeep
├── configs/              # API configurations
│   ├── google-search-console.md
│   └── scrape-do.md
├── docs/                 # SEO guidelines and references
│   ├── SEO_CHECKLIST.md
│   ├── competitive-analysis.md
│   └── faq-content.md
├── lib/                  # TypeScript utilities
│   ├── schemas.ts
│   └── metadata.ts
└── data/                 # Keyword data, tracking
    ├── keywords.json
    └── competitors.json
```

---

## Implementation Priority

### Phase 1: Technical Foundation
1. Audit and fix SSR issues
2. Create/verify robots.txt
3. Create/verify sitemap.xml
4. Implement canonical URLs
5. Add structured data to homepage

### Phase 2: Meta Optimization
1. Optimize all existing page titles
2. Optimize all meta descriptions
3. Fix heading hierarchy
4. Add alt text to images
5. Implement breadcrumbs

### Phase 3: Content Creation
1. Create comparison pages
2. Create use-case landing pages
3. Add FAQ section with schema
4. Internal linking optimization

### Phase 4: Content Expansion
1. Launch blog/resources section
2. Create SEO-targeted articles
3. Submit sitemap to Google Search Console
4. Monitor and iterate
