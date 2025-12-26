# Bitcoin Search Suggestions Database

This document describes the search suggestions feature that provides autocomplete functionality in the Research page search field.

## Overview

The Bitcoin Search Suggestions database is a curated collection of 160+ entities in the Bitcoin ecosystem, including companies, public figures, technologies, exchanges, ETFs, and more. When users type in the search field, matching suggestions appear with logos, descriptions, and category badges.

## File Location

```
src/lib/data/bitcoin-search-suggestions.ts
```

## Data Structure

### SearchSuggestion Interface

```typescript
export interface SearchSuggestion {
  keyword: string;        // Primary search term (e.g., "MicroStrategy")
  description: string;    // One-liner description shown in dropdown
  category: Category;     // Categorization for visual badge
  logo: string;          // URL to logo image (required)
  aliases?: string[];    // Alternative search terms (optional)
}
```

### Categories

| Category | Color | Description |
|----------|-------|-------------|
| `company` | Blue | Bitcoin-focused or crypto companies |
| `person` | Purple | Industry figures, executives, analysts |
| `technology` | Green | Bitcoin protocols, upgrades, concepts |
| `exchange` | Orange | Cryptocurrency exchanges |
| `protocol` | Cyan | Layer 2s, sidechains, smart contract layers |
| `etf` | Amber | Bitcoin ETF products |
| `media` | Pink | News outlets, podcasts, research firms |
| `wallet` | Indigo | Hardware and software wallets |
| `mining` | Yellow | Mining companies, pools, hardware makers |
| `fund` | Emerald | Venture capital and investment funds |

## Current Entries by Category

### Companies (25+ entries)
- **Treasury Companies**: MicroStrategy, Tesla, Metaplanet, Semler Scientific
- **Financial Services**: BlackRock, Fidelity, Grayscale, Bitwise, Galaxy Digital
- **Bitcoin Infrastructure**: Blockstream, Lightning Labs, Spiral, NYDIG
- **Bitcoin-Only Platforms**: Swan Bitcoin, River Financial, Strike, Fold
- **Custody Providers**: Casa, Unchained, BitGo, Fireblocks, Anchorage

### Exchanges (15+ entries)
- **Major Exchanges**: Coinbase, Kraken, Binance, Gemini, Bitstamp
- **Derivatives**: Deribit, BitMEX, Bybit, CME Group
- **Other**: OKX, Crypto.com, eToro, Bakkt, Bullish

### Mining (18+ entries)
- **Public Miners**: Marathon Digital (MARA), Riot Platforms, CleanSpark, Hut 8
- **Hardware Makers**: Bitmain, MicroBT, Canaan
- **Mining Pools**: Foundry, F2Pool, AntPool, Braiins (Slush Pool)

### Hardware Wallets (8 entries)
- Ledger, Trezor, Coldcard, BitBox, Foundation Devices, Blockstream Jade, Keystone, SeedSigner

### ETFs (12 entries)
- IBIT (BlackRock), FBTC (Fidelity), GBTC (Grayscale), ARKB (ARK/21Shares)
- BITB (Bitwise), HODL (VanEck), BTCO (Invesco), and more

### Investment Funds (12 entries)
- ARK Invest, Pantera Capital, a16z Crypto, Paradigm
- Castle Island Ventures, Stillmark, Ten31, Ego Death Capital

### Public Figures (35+ entries)
- **Industry Leaders**: Michael Saylor, Jack Dorsey, Cathie Wood, Brian Armstrong
- **Bitcoin OGs**: Adam Back, Satoshi Nakamoto, Hal Finney (implied)
- **Analysts**: Willy Woo, PlanB, Lyn Alden
- **Educators**: Andreas Antonopoulos, Jimmy Song, Jameson Lopp
- **Podcasters**: Peter McCormack, Anthony Pompliano, Marty Bent
- **Regulators**: Gary Gensler, Cynthia Lummis, Nayib Bukele

### Technologies & Protocols (20+ entries)
- **Core Tech**: Lightning Network, Taproot, SegWit, Bitcoin Halving
- **Layer 2/Sidechains**: Liquid Network, Stacks, RSK, RGB Protocol
- **Privacy**: Fedimint, Cashu
- **Other**: Ordinals, Nostr, Stratum V2, OP_CAT

### Media (15 entries)
- **News**: CoinDesk, The Block, Cointelegraph, Bitcoin Magazine, Decrypt
- **Research**: Glassnode, Messari, Delphi Digital, CoinMetrics
- **Podcasts**: What Bitcoin Did, Bankless, Unchained Podcast

## Logo Sources

All logos use the **Clearbit Logo API** for consistency and reliability:

```
https://logo.clearbit.com/{domain}
```

Examples:
- `https://logo.clearbit.com/microstrategy.com`
- `https://logo.clearbit.com/coinbase.com`
- `https://logo.clearbit.com/bitcoin.org`

The Clearbit API automatically returns high-quality logos in a consistent format.

## Helper Functions

### searchSuggestions(query, limit)

Searches the database and returns matching suggestions.

```typescript
import { searchSuggestions } from '@/lib/data/bitcoin-search-suggestions';

// Returns up to 8 suggestions matching "micro"
const results = searchSuggestions('micro', 8);
// → [{ keyword: 'MicroStrategy', ... }, { keyword: 'MicroBT', ... }]
```

**Search Logic:**
1. Matches against `keyword` (primary term)
2. Matches against `description`
3. Matches against `aliases` array
4. Prioritizes exact/prefix matches over partial matches

### getCategoryColor(category)

Returns Tailwind CSS classes for category badge styling.

```typescript
import { getCategoryColor } from '@/lib/data/bitcoin-search-suggestions';

getCategoryColor('company');
// → 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
```

### getFeaturedSuggestions()

Returns a curated set of featured suggestions for empty state display.

```typescript
import { getFeaturedSuggestions } from '@/lib/data/bitcoin-search-suggestions';

const featured = getFeaturedSuggestions();
// → [MicroStrategy, BlackRock, Lightning Network, Bitcoin ETF, Michael Saylor, Coinbase]
```

## Adding New Entries

### Step 1: Choose the Right Category

Select the most appropriate category from the 10 available options.

### Step 2: Find a Reliable Logo

Use Clearbit's Logo API with the company's primary domain:
```
https://logo.clearbit.com/{company-domain.com}
```

Test the URL in a browser to verify the logo loads correctly.

### Step 3: Add the Entry

Add to the appropriate section in the file (entries are organized by category):

```typescript
{
  keyword: 'Company Name',
  description: 'Brief one-liner describing relevance to Bitcoin',
  category: 'company',
  logo: 'https://logo.clearbit.com/company.com',
  aliases: ['Alternative Name', 'Ticker Symbol', 'CEO Name']
},
```

### Guidelines

1. **Keywords**: Use the most commonly recognized name
2. **Descriptions**: Keep under 60 characters for display
3. **Aliases**: Include ticker symbols, CEO names, product names
4. **Logos**: All entries MUST have a logo (required field)
5. **Relevance**: Focus on Bitcoin-specific or Bitcoin-adjacent entities

## Usage in the App

The search suggestions are used in the Research page (`src/pages/unified-research.tsx`):

1. User types in the search field
2. `searchSuggestions()` filters matching entries
3. Dropdown appears with matching suggestions
4. Each suggestion shows: logo, keyword, description, category badge
5. User can navigate with arrow keys or click to select
6. Selection populates the search field and triggers search

## Maintenance

### Periodic Updates Needed

- **ETF flows**: Update descriptions if AUM changes significantly
- **Personnel changes**: Update when CEOs/executives change
- **New entities**: Add significant new players in the ecosystem
- **Defunct entities**: Remove or update entries for companies that shut down

### Quality Checks

- Verify all logos still load (Clearbit API is stable but domains change)
- Ensure descriptions remain accurate
- Check that aliases are comprehensive for discoverability

## Related Files

- `src/pages/unified-research.tsx` - Main consumer of this data
- `src/components/dashboard/pages/keyword-search.tsx` - Alternative search implementation

---

*Last updated: December 2025*
