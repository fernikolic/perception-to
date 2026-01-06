/**
 * Fetch real news mentions for Bitcoin companies using Perception's hybridFeed API
 * Run with: node scripts/fetch-company-mentions.cjs
 */

const fs = require('fs');
const path = require('path');

// Use the hybridFeed API for real mention search
const HYBRID_FEED_API = 'https://us-central1-perception-app-3db34.cloudfunctions.net/hybridFeed/feed';

// Companies to fetch mentions for
const companies = [
  // Original companies
  { slug: 'strategy', name: 'Strategy (MicroStrategy)', keyword: 'MicroStrategy' },
  { slug: 'marathon-digital', name: 'Marathon Digital', keyword: 'Marathon Digital' },
  { slug: 'coinbase', name: 'Coinbase', keyword: 'Coinbase' },
  { slug: 'block', name: 'Block Inc', keyword: 'Block Inc' },
  { slug: 'tesla', name: 'Tesla Bitcoin', keyword: 'Tesla Bitcoin' },
  { slug: 'riot-platforms', name: 'Riot Platforms', keyword: 'Riot Platforms' },
  { slug: 'metaplanet', name: 'Metaplanet', keyword: 'Metaplanet' },
  { slug: 'blackrock', name: 'BlackRock', keyword: 'BlackRock Bitcoin' },
  { slug: 'fidelity', name: 'Fidelity', keyword: 'Fidelity Bitcoin' },
  { slug: 'strike', name: 'Strike', keyword: 'Strike Bitcoin' },
  { slug: 'tether', name: 'Tether', keyword: 'Tether' },
  { slug: 'bitcoin-magazine', name: 'Bitcoin Magazine', keyword: 'Bitcoin Magazine' },
  { slug: 'grayscale', name: 'Grayscale', keyword: 'Grayscale' },
  { slug: 'michael-saylor', name: 'Michael Saylor', keyword: 'Michael Saylor' },
  { slug: 'swan-bitcoin', name: 'Swan Bitcoin', keyword: 'Swan Bitcoin' },
  // Tier 1: Major Treasury & Mining Companies
  { slug: 'twenty-one-capital', name: 'Twenty One Capital', keyword: 'Twenty One Capital' },
  { slug: 'hut-8', name: 'Hut 8', keyword: 'Hut 8' },
  { slug: 'cleanspark', name: 'CleanSpark', keyword: 'CleanSpark' },
  { slug: 'gamestop', name: 'GameStop', keyword: 'GameStop Bitcoin' },
  { slug: 'galaxy-digital', name: 'Galaxy Digital', keyword: 'Galaxy Digital' },
  { slug: 'core-scientific', name: 'Core Scientific', keyword: 'Core Scientific' },
  { slug: 'semler-scientific', name: 'Semler Scientific', keyword: 'Semler Scientific' },
  { slug: 'fold', name: 'Fold', keyword: 'Fold Bitcoin' },
  // Tier 2: Infrastructure & Private Companies
  { slug: 'blockstream', name: 'Blockstream', keyword: 'Blockstream' },
  { slug: 'lightning-labs', name: 'Lightning Labs', keyword: 'Lightning Labs' },
  { slug: 'river', name: 'River', keyword: 'River Bitcoin' },
  { slug: 'unchained', name: 'Unchained', keyword: 'Unchained Bitcoin' },
  // Tier 3: Notable Miners
  { slug: 'bitdeer', name: 'Bitdeer', keyword: 'Bitdeer' },
  { slug: 'bitfarms', name: 'Bitfarms', keyword: 'Bitfarms' },
  { slug: 'cipher-mining', name: 'Cipher Mining', keyword: 'Cipher Mining' },
  { slug: 'hive-digital', name: 'HIVE Digital', keyword: 'HIVE Digital' },
  // Tier 4: Other Noteworthy Companies
  { slug: 'trump-media', name: 'Trump Media', keyword: 'Trump Media Bitcoin' },
  { slug: 'strive', name: 'Strive', keyword: 'Strive Bitcoin' },
  { slug: 'bullish', name: 'Bullish', keyword: 'Bullish exchange' },
  { slug: 'exodus', name: 'Exodus', keyword: 'Exodus wallet' }
];

// Map sentiment string to category
function getSentimentCategory(sentiment) {
  if (!sentiment) return 'neutral';
  const lower = sentiment.toLowerCase();
  if (lower === 'positive') return 'positive';
  if (lower === 'negative') return 'negative';
  return 'neutral';
}

// Format relative timestamp from date
function formatTimestamp(dateStr) {
  if (!dateStr) return 'Recently';

  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

async function fetchMentionsForCompany(company) {
  // Get articles from last 7 days
  const endDate = new Date().toISOString().split('T')[0];
  const startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const params = new URLSearchParams({
    keyword: company.keyword,
    startDate: startDate,
    endDate: endDate,
    pageSize: '200'  // Get all results
  });

  const url = `${HYBRID_FEED_API}?${params}`;

  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    const articles = result.data || [];
    const totalCount = result.meta?.total || articles.length;

    // Transform top 4 to our mention format
    const topMentions = articles.slice(0, 4).map(article => ({
      source: article.Outlet || article.outlet || 'Unknown',
      title: article.Title || article.title || '',
      url: article.URL || article.url || '#',
      timestamp: formatTimestamp(article.Date || article.date),
      sentiment: getSentimentCategory(article.Sentiment || article.sentiment),
      imageUrl: article.image_url || article.Image_URL || null
    }));

    return {
      mentions: topMentions,
      totalCount: totalCount
    };
  } catch (error) {
    console.error(`  Error fetching mentions for ${company.name}:`, error.message);
    return { mentions: [], totalCount: 0 };
  }
}

async function main() {
  console.log('Fetching real news mentions from Perception hybridFeed API...\n');
  console.log(`API: ${HYBRID_FEED_API}\n`);

  const allMentions = {};
  const mentionCounts = {};

  for (const company of companies) {
    process.stdout.write(`Fetching: ${company.name}...`);
    const result = await fetchMentionsForCompany(company);
    allMentions[company.slug] = result.mentions;
    mentionCounts[company.slug] = result.totalCount;
    console.log(` ${result.totalCount} mentions (showing ${result.mentions.length})`);

    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // Save mentions to JSON file
  const outputPath = path.join(__dirname, '../src/data/company-mentions.json');
  fs.writeFileSync(outputPath, JSON.stringify(allMentions, null, 2));
  console.log(`\nSaved mentions to ${outputPath}`);

  // Generate TypeScript file with mentions and counts
  const tsContent = `// Auto-generated company mentions data from Perception hybridFeed API
// Generated: ${new Date().toISOString()}
// Run: node scripts/fetch-company-mentions.cjs

export interface CompanyMention {
  source: string;
  title: string;
  url: string;
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  imageUrl: string | null;
}

export const companyMentions: Record<string, CompanyMention[]> = ${JSON.stringify(allMentions, null, 2)};

// Real mention counts from the past 7 days
export const companyMentionCounts: Record<string, number> = ${JSON.stringify(mentionCounts, null, 2)};

export const getCompanyMentions = (slug: string): CompanyMention[] => {
  return companyMentions[slug] || [];
};

export const getCompanyMentionCount = (slug: string): number => {
  return companyMentionCounts[slug] || 0;
};

// Total mentions across all tracked companies
export const getTotalMentionCount = (): number => {
  return Object.values(companyMentionCounts).reduce((sum, count) => sum + count, 0);
};
`;

  const tsOutputPath = path.join(__dirname, '../src/data/company-mentions.ts');
  fs.writeFileSync(tsOutputPath, tsContent);
  console.log(`Saved TypeScript file to ${tsOutputPath}`);

  // Print summary
  console.log('\nSummary:');
  let totalMentions = 0;
  for (const [slug, count] of Object.entries(mentionCounts)) {
    console.log(`  ${slug}: ${count} mentions`);
    totalMentions += count;
  }
  console.log(`\nTotal: ${totalMentions} mentions across ${Object.keys(allMentions).length} companies`);
}

main().catch(console.error);
