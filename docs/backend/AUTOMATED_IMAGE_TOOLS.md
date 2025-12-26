# Automated Author Image Fetching Tools

## Overview

Comparison of automated tools and APIs for fetching author profile images at scale.

---

## 🥇 Best Options (Recommended)

### 1. **Clearbit Logo & Person API**
**Best for:** Professional headshots and company logos

**Pricing:**
- Free tier: 50 requests/month
- Enrichment API: $99/month for 2,500 requests
- Logo API: Free for logos only

**How it works:**
```javascript
// Logo API (Free)
const logoUrl = `https://logo.clearbit.com/${domain}`;

// Person API (Paid - requires email)
const personData = await fetch('https://person.clearbit.com/v2/combined/find', {
  params: { email: 'author@outlet.com' },
  headers: { Authorization: `Bearer ${CLEARBIT_KEY}` }
});
// Returns: person.avatar (profile photo URL)
```

**Pros:**
- High-quality professional photos
- Excellent for corporate/outlet logos
- Good coverage for business professionals
- Simple REST API

**Cons:**
- Requires email address for person lookup
- Limited free tier
- Not all journalists have profiles

**Coverage:** ~40% for journalists (higher for business/tech)

---

### 2. **Hunter.io (Email Finder + Clearbit)**
**Best for:** Finding emails, then using Clearbit

**Pricing:**
- Free: 25 searches/month
- Starter: $49/month for 500 searches
- Pro: $99/month for 2,500 searches

**How it works:**
```javascript
// Step 1: Find email with Hunter
const response = await fetch(
  `https://api.hunter.io/v2/email-finder?domain=forbes.com&first_name=Billy&last_name=Bambrough&api_key=${HUNTER_KEY}`
);

// Step 2: Use email with Clearbit
const email = response.data.email;
const profile = await clearbit.Person.find({ email });
const imageUrl = profile.avatar;
```

**Pros:**
- Finds emails for most journalists
- Can verify emails
- Works with Clearbit for images

**Cons:**
- Two-step process
- Costs add up ($99 + $99/month)
- Rate limits

**Coverage:** ~60% for well-known journalists

---

### 3. **Pipl API (People Search)**
**Best for:** Comprehensive people data including photos

**Pricing:**
- No free tier
- $0.50 per search
- Bulk pricing available

**How it works:**
```javascript
const response = await fetch('https://api.pipl.com/search/', {
  params: {
    first_name: 'Daniel',
    last_name: 'Kuhn',
    raw_name: 'Daniel Kuhn',
    api_key: PIPL_KEY
  }
});

const imageUrl = response.person.images[0].url;
```

**Pros:**
- Very comprehensive data
- High accuracy
- Multiple image sources
- Social media profiles included

**Cons:**
- Expensive ($0.50 per lookup = $150 for 300 authors)
- Privacy concerns (very intrusive data)
- Overkill for just images

**Coverage:** ~70-80% for public figures

---

### 4. **Google Custom Search API + Image Search**
**Best for:** Finding images via Google Images

**Pricing:**
- Free: 100 queries/day
- Paid: $5 per 1,000 queries (up to 10k/day)

**How it works:**
```javascript
const response = await fetch(
  `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_KEY}&cx=${SEARCH_ENGINE_ID}&q=${authorName} journalist headshot&searchType=image&num=1`
);

const imageUrl = response.items[0].link;
```

**Pros:**
- Very affordable
- Finds almost anyone with online presence
- Can filter by image type/size
- No privacy concerns

**Cons:**
- Need to verify image quality
- May return wrong person
- Need to download/re-host images (copyright)
- Results vary in quality

**Coverage:** ~90% but quality varies

---

### 5. **SerpAPI (Google Search Results)**
**Best for:** Automated Google searching with better parsing

**Pricing:**
- Free: 100 searches/month
- Starter: $50/month for 5,000 searches
- Pro: $130/month for 15,000 searches

**How it works:**
```javascript
const response = await fetch(
  `https://serpapi.com/search.json?engine=google_images&q=${authorName}+journalist&api_key=${SERPAPI_KEY}`
);

const imageUrl = response.images_results[0].original;
```

**Pros:**
- Better than raw Google API
- Handles Google's complexity
- Reliable parsing
- Good documentation

**Cons:**
- Still need to verify images
- Copyright concerns
- Need to download/store images

**Coverage:** ~85%

---

### 6. **LinkedIn Profile Scraper APIs**

**Options:**
- **Proxycurl** ($1.50 per profile)
- **PhantomBuster** ($30/month for 1,000 profiles)
- **ScraperAPI** ($29/month starter)

**How it works:**
```javascript
// Proxycurl example
const response = await fetch(
  `https://nubela.co/proxycurl/api/v2/linkedin?url=linkedin.com/in/${linkedinUsername}`,
  { headers: { Authorization: `Bearer ${PROXYCURL_KEY}` }}
);

const imageUrl = response.profile_pic_url;
```

**Pros:**
- High-quality professional photos
- LinkedIn photos are usually current
- Good for verified professionals

**Cons:**
- Expensive at scale
- Requires knowing LinkedIn URLs
- LinkedIn TOS violations (risky)
- Can get accounts banned

**Coverage:** ~50% (if you have LinkedIn URLs)

---

### 7. **Twitter/X API**
**Best for:** Journalists who are active on Twitter

**Pricing:**
- Free tier: Deprecated
- Basic: $100/month
- Pro: $5,000/month

**How it works:**
```javascript
const response = await fetch(
  `https://api.twitter.com/2/users/by/username/${twitterHandle}?user.fields=profile_image_url`,
  { headers: { Authorization: `Bearer ${TWITTER_TOKEN}` }}
);

const imageUrl = response.data.profile_image_url;
```

**Pros:**
- Good quality photos
- Many journalists on Twitter
- Official API

**Cons:**
- Expensive ($100/month minimum)
- Need to know Twitter handles
- API access restrictions

**Coverage:** ~40% (if you have handles)

---

### 8. **Gravatar**
**Best for:** Authors with known email addresses

**Pricing:** FREE

**How it works:**
```javascript
import crypto from 'crypto';

function getGravatarUrl(email: string): string {
  const hash = crypto
    .createHash('md5')
    .update(email.toLowerCase().trim())
    .digest('hex');

  return `https://www.gravatar.com/avatar/${hash}?s=200&d=404`;
}
```

**Pros:**
- Completely free
- No rate limits
- Many developers/tech people use it
- Simple implementation

**Cons:**
- Very limited coverage for journalists (~5%)
- Need email addresses
- Returns 404 if no Gravatar

**Coverage:** ~5% for journalists

---

## 🎯 Recommended Strategy: Multi-Tier Approach

### Tier 1: Free/Cheap Sources (Run First)
```
1. Check Gravatar (if email available) - FREE
2. Check UI Avatars as fallback - FREE
3. Check outlet author pages - FREE (requires scraping)
```

### Tier 2: Paid APIs (For Important Authors)
```
4. Google Custom Search API - $5/1,000
5. SerpAPI - $50/month for 5,000
6. Clearbit (if email available) - $99/month
```

### Tier 3: Premium (For Top 20 Key Reporters)
```
7. Manual curation
8. Proxycurl/LinkedIn - $1.50 each
```

---

## 💰 Cost Analysis

**Scenario: 300 Authors**

### Option A: Google Custom Search Only
- 300 searches = $1.50
- Quality: Medium (need verification)
- Coverage: ~85%
- **Total: $1.50 one-time**

### Option B: SerpAPI
- $50/month subscription
- 5,000 searches included
- Can process all 300 authors easily
- **Total: $50/month (cancel after first month)**

### Option C: Hybrid Approach
- Gravatar (free): ~5% = 15 authors
- Google Search (free tier): 100 queries = 100 authors
- SerpAPI ($50): Remaining 185 authors
- Manual top 20: $0 (your time)
- **Total: $50 one-time**

### Option D: Premium (Not Recommended)
- Proxycurl for all: 300 × $1.50 = $450
- Clearbit: $99/month
- **Total: $549 🚫 Too expensive**

---

## 🛠️ Implementation Recommendation

### Best Value: **SerpAPI + Manual Verification**

**Step 1: Automated Search (1 hour)**
```javascript
// Use SerpAPI to find images for all 300 authors
for (const author of authors) {
  const images = await searchAuthorImage(author.name);
  await downloadImage(images[0], `author-images/${author.id}.jpg`);
}
```

**Step 2: Manual Review (2-3 hours)**
- Check first 50 images
- Replace incorrect ones
- Mark high-quality ones

**Step 3: Fallback System**
- Missing/low quality → UI Avatars
- Organizations → Clearbit logos (free)

**Total Cost: $50 one-time**
**Time Investment: 4-5 hours**
**Coverage: ~85% with images, 100% with fallbacks**

---

## 🚀 Quick Start: Use Google Custom Search API (FREE)

**You get 100 free searches/day!**

### Setup (5 minutes):
1. Go to: https://console.cloud.google.com/apis/credentials
2. Create API key for Custom Search API
3. Create Custom Search Engine: https://cse.google.com/cse/
4. Get Search Engine ID

### Code:
```javascript
async function fetchAuthorImage(authorName: string) {
  const API_KEY = 'your-google-api-key';
  const SEARCH_ENGINE_ID = 'your-search-engine-id';

  const query = `${authorName} journalist headshot`;
  const url = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}&searchType=image&num=1&imgSize=medium`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.items && data.items.length > 0) {
    return data.items[0].link;
  }

  return null;
}
```

---

## ⚠️ Legal Considerations

### Copyright:
- **Google Images**: Images may be copyrighted, you're just linking
- **LinkedIn/Twitter**: TOS may prohibit scraping
- **Clearbit**: Properly licensed
- **UI Avatars**: Free for any use

### Privacy:
- Using public profile photos is generally okay
- Don't store personal data beyond image URL
- Allow opt-out mechanism
- Attribute sources when possible

### Best Practice:
1. Link to images (don't re-host copyrighted ones)
2. Use generated avatars (UI Avatars) for fallbacks
3. Allow reporters to claim/update their profiles
4. Include "Report incorrect image" feature

---

## 📋 Action Plan

### Week 1: Free Tier
- [ ] Set up Google Custom Search API
- [ ] Run on all 300 authors (3 days × 100 searches)
- [ ] Download and review results
- [ ] Estimated cost: **$0**

### Week 2: Paid Tier (If Needed)
- [ ] Subscribe to SerpAPI ($50)
- [ ] Fill gaps from Week 1
- [ ] Get higher quality images
- [ ] Cancel subscription
- [ ] Estimated cost: **$50**

### Week 3: Polish
- [ ] Manually curate top 20 reporters
- [ ] Set up fallback system
- [ ] Deploy to production
- [ ] Estimated cost: **$0**

**Total: $50 (or $0 if Google free tier is enough)**

---

## 🎯 My Recommendation

**Start with Google Custom Search API (FREE)**

1. **Day 1-3:** Run free searches (100/day)
2. **Day 4:** Review results, identify gaps
3. **Day 5:** Decision point:
   - If 85%+ quality → Done! Use UI Avatars for rest
   - If <70% quality → Subscribe to SerpAPI for 1 month

**This approach:**
- Costs $0-50 total
- Takes 1 week
- Gets you 85-100% coverage
- No ongoing costs

Want me to build the Google Custom Search implementation right now?

