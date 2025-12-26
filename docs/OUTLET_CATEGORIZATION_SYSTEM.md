# Outlet Categorization System

## Overview

The outlet categorization system provides a consistent way to classify media outlets, news sources, podcasts, and other content sources across the entire application. This enables filtering, analytics, and better organization of content by source type.

> **Looking for the complete list of tracked sources?**
> See [SOURCES_DIRECTORY.md](./data-pipeline/SOURCES_DIRECTORY.md) for the comprehensive directory of all 450+ feeds.

## Table of Contents

1. [Categories](#categories)
2. [Architecture](#architecture)
3. [Categorization Logic](#categorization-logic)
4. [Usage](#usage)
5. [Adding New Outlets](#adding-new-outlets)
6. [Troubleshooting](#troubleshooting)
7. [History & Changelog](#history--changelog)

---

## Categories

The system supports **10 distinct categories**:

### 1. Social Media (`'social'`)
**Label**: "Social Media"

Platforms where users share and discuss content.

**Examples**: X (Twitter), Facebook, Instagram, YouTube, LinkedIn, Telegram, Discord

**Detection**: 
- URL patterns (x.com, twitter.com, facebook.com, youtube.com, etc.)
- Outlet name matching

### 2. Communities (`'communities'`)
**Label**: "Communities"

Forums, discussion boards, and community platforms.

**Examples**: Reddit, Stacker News, Hacker News, Stack Overflow, Medium, Substack

**Detection**:
- URL patterns (reddit.com, stacker.news, etc.)
- Outlet name matching

### 3. Repositories (`'repositories'`)
**Label**: "Repositories"

Code repositories and development platforms, particularly GitHub.

**Examples**: GitHub, bitcoin/bitcoin, fedimint/fedimint, lightningnetwork/lnd

**Detection**:
- URL patterns (github.com)
- Specific repository names

**Full List**:
- GitHub (platform)
- bitcoin/bitcoin (Bitcoin Core)
- lightningnetwork/lnd (LND)
- ElementsProject/lightning (c-lightning)
- ACINQ/eclair (Eclair)
- fedimint/fedimint (Fedimint)
- btcpayserver/btcpayserver (BTCPay Server)
- rsksmart/rskj (RSK)
- ElementsProject/elements (Elements)

### 4. Podcasts (`'podcasts'`)
**Label**: "Podcasts"

Audio content and podcast shows, particularly Bitcoin/crypto-focused.

**Examples**: Bitcoin Audible, What Bitcoin Did, Rabbit Hole Recap, Stephan Livera Podcast, TFTC

**Detection**:
- Specific podcast name matching
- Generic "podcast" keyword in outlet name
- **Checked BEFORE crypto category** to prevent misclassification

**Full List**:
- Bitcoin Audible
- Bitcoin for Millennials
- Citadel Dispatch
- Fed Watch
- What Bitcoin Did
- Rabbit Hole Recap
- Robin Seyr Podcast
- Simply Bitcoin
- TFTC
- Tales from the Crypt
- The Bitcoin Frontier
- The Bitcoin Layer
- The Bitcoin Standard Podcast
- The Mining Pod
- Stephan Livera Podcast
- Bitcoin Capital Podcast
- Bitcoin Takeover

### 5. Crypto Media (`'crypto'`)
**Label**: "Crypto Media"

Cryptocurrency and blockchain-focused news outlets and publications.

**Examples**: CoinDesk, Cointelegraph, The Block, Bitcoin Magazine, Decrypt, Onramp, The Rage

**Detection**:
- Specific outlet name matching
- Keywords: crypto, bitcoin, blockchain, coin

**Full List**:
- News Sites: CoinDesk, The Block, Decrypt, Cointelegraph, Bitcoin Magazine, Blockworks, CryptoSlate, BeInCrypto, Bitcoinist, NewsBTC, CryptoPotato, etc.
- Exchanges: Coinbase, Binance, Kraken, BitMEX
- Research/Analytics: Messari, Chainalysis, Galaxy Research, CoinMarketCap, CoinGecko
- Newsletters: Onramp, The Rage

### 6. Financial Media (`'financial'`)
**Label**: "Financial Media"

Traditional financial news and business publications.

**Examples**: Bloomberg, Reuters, Wall Street Journal, Financial Times, Fortune, Barron's

**Full List**:
- Bloomberg
- Reuters
- Financial Times
- Wall Street Journal
- MarketWatch
- Yahoo Finance
- Barron's
- Investor's Business Daily
- Seeking Alpha
- TheStreet
- Benzinga
- Motley Fool
- Fortune
- American Banker
- Finansavisen

### 7. Tech Media (`'tech'`)
**Label**: "Tech Media"

Technology-focused publications and news sites.

**Examples**: TechCrunch, Wired, The Verge, Ars Technica, CNET

**Full List**:
- TechCrunch
- Wired
- The Verge
- Ars Technica
- Gizmodo
- Engadget
- The Next Web
- Mashable
- CNET
- ZDNet
- PCMag
- Tom's Hardware
- AnandTech
- VentureBeat

### 8. Research (`'research'`)
**Label**: "Research"

Academic institutions, research organizations, and scholarly publications.

**Examples**: Harvard Business Review, MIT Technology Review, Nature, Science, arXiv

**Full List**:
- Harvard Business Review
- MIT Technology Review
- IEEE Spectrum
- Nature
- Science
- New Scientist
- Scientific American
- arXiv

### 9. Mainstream Media (`'mainstream'`)
**Label**: "Mainstream Media"

Traditional news outlets, newspapers, and broadcast media.

**Examples**: CNN, BBC, Forbes, CNBC, The Guardian, New York Times, The Independent

**Full List**:
- TV/Broadcast: CNN, BBC, CNBC, Fox News, MSNBC, ABC News, CBS News, NPR
- Newspapers: New York Times, Washington Post, USA Today, Daily Mail, The Guardian, The Independent
- Magazines: TIME, Newsweek, Forbes
- Online: Business Insider, Axios, Politico, The Hill, Vox

### 10. Other (`'other'`)
**Label**: "Other"

**Default category** for outlets that don't match any specific category.

This prevents unknown outlets from being incorrectly categorized.

---

## Architecture

### File Structure

```
src/lib/utils/outlet-categorization.ts  (Centralized source of truth)
src/components/dashboard/pages/keyword-search.tsx  (Local implementation)
src/components/dashboard/components/
  ├── watchlist-view.tsx
  ├── media-outlet-ranking.tsx
  ├── reporter-search-results.tsx
  ├── media-reporter-ranking.tsx
  ├── outlet-bias-heatmap.tsx
  ├── media-vs-reality-chart.tsx
  └── top-media-outlets.tsx
```

### Centralized Utility

**Location**: `src/lib/utils/outlet-categorization.ts`

This is the **single source of truth** for outlet categorization.

**Exports**:
```typescript
export type OutletCategory =
  | 'social'
  | 'communities'
  | 'repositories'
  | 'crypto'
  | 'mainstream'
  | 'financial'
  | 'tech'
  | 'research'
  | 'podcasts'
  | 'other';

export function getOutletCategory(outlet: string, url?: string): OutletCategory;
export function getOutletCategoryLabel(category: OutletCategory): string;
```

**Constants**:
- `SOCIAL_MEDIA`: Array of social media platforms
- `COMMUNITIES`: Array of community platforms
- `REPOSITORIES`: Array of code repositories (GitHub)
- `CRYPTO_MEDIA`: Array of crypto news outlets
- `FINANCIAL_MEDIA`: Array of financial publications
- `TECH_MEDIA`: Array of tech publications
- `RESEARCH_OUTLETS`: Array of research organizations
- `PODCASTS`: Array of podcast names
- `MAINSTREAM_MEDIA`: Array of mainstream news outlets

---

## Categorization Logic

### Priority Order

Categories are checked in a specific order. **Order matters** because some outlets could match multiple categories.

```
1. Social Media (URL patterns first, then name matching)
2. Communities (URL patterns first, then name matching)
3. Podcasts ← Checked BEFORE crypto!
4. Crypto Media
5. Financial Media
6. Tech Media
7. Research
8. Mainstream Media
9. Repositories (GitHub URLs and repo names)
10. Fallback patterns (reddit, twitter, crypto keywords)
11. Default: 'other'
```

### Why Podcasts Come Before Crypto

Many podcasts have "bitcoin" or "crypto" in their names:
- "Bitcoin Audible" contains "bitcoin"
- "The Bitcoin Frontier" contains "bitcoin"

If crypto media is checked first, these would be incorrectly categorized as crypto news sites instead of podcasts.

### URL-Based Detection

The function accepts an optional `url` parameter for more accurate categorization:

```typescript
getOutletCategory('X', 'https://x.com/example')  // Returns 'social'
getOutletCategory('GitHub', 'https://github.com/repo')  // Returns 'repositories'
```

URL patterns are checked **before** outlet name matching for social media and communities.

### Case-Insensitive Matching

All outlet names and URLs are converted to lowercase before comparison:

```typescript
'CoinDesk' → 'coindesk'
'TechCrunch' → 'techcrunch'
```

### Normalization

For some categories, spaces are removed during matching:

```typescript
'bitcoin audible' matches 'Bitcoin Audible'
'bitcoinaudible' matches 'Bitcoin Audible'
```

---

## Usage

### Importing

```typescript
import { getOutletCategory, getOutletCategoryLabel, OutletCategory } from '@/lib/utils/outlet-categorization';
```

### Basic Usage

```typescript
// Get category
const category = getOutletCategory('CoinDesk');
// Returns: 'crypto'

// Get category with URL context
const category = getOutletCategory('X', 'https://x.com/user/status/123');
// Returns: 'social'

// Get display label
const label = getOutletCategoryLabel('crypto');
// Returns: 'Crypto Media'
```

### In Components

```typescript
// Filter entries by category
const cryptoEntries = entries.filter(entry => 
  getOutletCategory(entry.Outlet, entry.URL) === 'crypto'
);

// Categorize for display
const categoryLabel = getOutletCategoryLabel(
  getOutletCategory(outlet.name)
);
```

### In Search/Filter Logic

```typescript
const filteredResults = searchResults.filter(result => {
  const category = getOutletCategory(result.Outlet, result.URL);
  return selectedCategories.includes(category);
});
```

---

## Adding New Outlets

### Step 1: Determine Category

Decide which category the outlet belongs to:
- Is it a podcast? → `PODCASTS`
- Is it crypto-specific? → `CRYPTO_MEDIA`
- Is it financial? → `FINANCIAL_MEDIA`
- Is it tech? → `TECH_MEDIA`
- Is it research? → `RESEARCH_OUTLETS`
- Is it mainstream? → `MAINSTREAM_MEDIA`

### Step 2: Add to Centralized Utility

Edit `src/lib/utils/outlet-categorization.ts`:

```typescript
// Example: Adding a new crypto outlet
const CRYPTO_MEDIA = [
  'CoinDesk', 'The Block', 'Decrypt',
  'Your New Outlet Name',  // ← Add here
  // ... rest of list
];
```

### Step 3: Add to Local Implementations (if needed)

Some components have local categorization functions that should be updated:
- `src/components/dashboard/pages/keyword-search.tsx`

### Step 4: Test

Test that the new outlet is correctly categorized:

```typescript
console.log(getOutletCategory('Your New Outlet Name'));
// Should output the expected category
```

### Guidelines

1. **Use exact outlet name** as it appears in your data
2. **Add to only ONE category** (the most specific one)
3. **Consider order**: If outlet could match multiple patterns, add it to the most specific category
4. **Case doesn't matter**: 'coindesk' will match 'CoinDesk'
5. **Partial matches work**: 'coin' in outlet name will match crypto pattern

---

## Troubleshooting

### Problem: Outlet categorized incorrectly

**Example**: "Bitcoin Podcast" is showing as Crypto Media instead of Podcasts

**Solution**: 
1. Check the order of category checks
2. Podcasts should be checked BEFORE crypto
3. Add the specific podcast name to the `PODCASTS` array

### Problem: Outlet not being categorized (showing as 'other')

**Solution**:
1. Add the outlet name to the appropriate category array
2. Make sure the name matches exactly (case-insensitive)
3. Check for typos in the outlet name

### Problem: Mainstream media showing crypto outlets

**Solution**:
1. This was likely the default categorization bug
2. Ensure the default return is `'other'` not `'mainstream'`
3. Check line ~96 in `outlet-categorization.ts`: `return 'other';`

### Problem: Same outlet categorized differently in different components

**Solution**:
1. Use the centralized utility: `import { getOutletCategory } from '@/lib/utils/outlet-categorization'`
2. Remove local categorization functions
3. Update all components to use the centralized version

### Problem: New category not showing in filters

**Solution**:
1. Update the `OutletCategory` type to include your new category
2. Update `getOutletCategoryLabel()` to include the label
3. Update UI components to include the new category in filter options

---

## History & Changelog

### 2025-12-17: Added Repositories Category

**Issue Fixed**:
GitHub URLs were incorrectly showing under "Communities" or could be miscategorized. Users requested a dedicated "Repositories" category for code repositories.

**Changes Made**:
1. **Added new category**: `'repositories'` with label "Repositories"
2. **Separated GitHub from Communities**: GitHub and repo patterns moved from COMMUNITIES to new REPOSITORIES constant
3. **Updated BigQuery data**: Changed 6,011 records from "Bitcoin Repositories" to "Repositories" for consistency
4. **Updated UI**: Research page source distribution now includes "Repositories" category
5. **URL detection**: github.com URLs now categorized as repositories instead of communities

**Full List of Tracked Repositories**:
- GitHub (platform)
- bitcoin/bitcoin (Bitcoin Core)
- lightningnetwork/lnd (LND)
- ElementsProject/lightning (c-lightning)
- ACINQ/eclair (Eclair)
- fedimint/fedimint (Fedimint)
- btcpayserver/btcpayserver (BTCPay Server)
- rsksmart/rskj (RSK)
- ElementsProject/elements (Elements)

**Files Modified**:
1. `src/lib/utils/outlet-categorization.ts` - Added REPOSITORIES constant and detection logic
2. `src/pages/unified-research.tsx` - Updated source distribution UI
3. BigQuery `outlet_categories` table - Updated category names
4. BigQuery `all_channels_data` table - Updated 6,011 rows

---

### 2025-11-14: Major Categorization Fix & Podcasts Category

**Issues Fixed**:
1. **Default categorization bug**: Unknown outlets were defaulting to `'mainstream'` instead of `'other'`
2. **Missing outlets**: Many crypto podcasts and mainstream outlets were not categorized
3. **Podcasts lumped with crypto**: Podcasts were in the crypto category

**Changes Made**:
1. **Fixed default**: Changed from `return 'mainstream'` to `return 'other'`
2. **Expanded categories**: Added `'financial'`, `'tech'`, `'research'`, `'podcasts'`
3. **Separated podcasts**: Created dedicated podcasts category
4. **Reordered checks**: Podcasts now checked BEFORE crypto
5. **Enhanced detection**: Added URL-based detection for social and communities
6. **Updated lists**: Added 17+ podcasts, expanded mainstream media, added financial/tech outlets

**Impact**:
- Mainstream media filter now shows only actual mainstream outlets
- Podcasts have their own category and filter
- More accurate analytics and distribution charts
- Better user experience in filtering and searching

### Before vs After Example

**Before**:
```
Search: "Blockstream" + Filter: "Mainstream media"
Results: 15 (mixed with crypto podcasts)
- Onramp (25 articles) ❌ crypto newsletter, not mainstream
- The Rage ❌ crypto newsletter, not mainstream  
- Forbes (10 articles) ✓ actual mainstream
```

**After**:
```
Search: "Blockstream" + Filter: "Mainstream media"  
Results: ~17 (only mainstream)
- Forbes (10 articles) ✓
- Bloomberg (1 article) ✓
- The Independent (1 article) ✓
- Newsweek (1 article) ✓
- NO crypto podcasts ✓
```

### Files Modified

1. `src/lib/utils/outlet-categorization.ts` - Centralized utility (enhanced)
2. `src/components/dashboard/pages/keyword-search.tsx` - Local implementation (fixed)

### Related Documentation

- [SOURCES_DIRECTORY.md](./data-pipeline/SOURCES_DIRECTORY.md) - Complete list of all 450+ tracked sources
- `/OUTLET_CATEGORIZATION_FIX.md` - Detailed fix documentation
- `/PODCASTS_CATEGORY_UPDATE.md` - Podcasts category implementation

---

## Best Practices

### DO:
✅ Use the centralized utility (`getOutletCategory`) whenever possible  
✅ Add new outlets to the appropriate category constant  
✅ Test categorization after adding new outlets  
✅ Consider URL patterns for more accurate detection  
✅ Keep the order of category checks (podcasts before crypto, etc.)  

### DON'T:
❌ Create duplicate categorization logic in components  
❌ Change the default category back to `'mainstream'`  
❌ Add podcasts to the crypto media list  
❌ Check crypto before podcasts (will miscategorize podcasts)  
❌ Hardcode outlet names in multiple places  

---

## Future Improvements

Potential enhancements to consider:

1. **Move outlet lists to JSON config**: Make it easier to update without code changes
2. **Add unit tests**: Test categorization logic
3. **Refactor remaining components**: Replace local implementations with centralized utility
4. **Add more categories**: Gaming media, regional news, etc.
5. **Improve detection**: Machine learning for outlet classification
6. **Add outlet metadata**: Country, language, political leaning, etc.

---

## Support

For questions or issues with the outlet categorization system:

1. Check this documentation first
2. Review the source code: `src/lib/utils/outlet-categorization.ts`
3. Check related documentation in `/OUTLET_CATEGORIZATION_FIX.md`
4. Create an issue with details about the miscategorization

---

**Last Updated**: 2025-12-17
**Version**: 2.1
**Maintainer**: Development Team
