// Bitcoin Companies Data - Focus on Narrative Intelligence
// These are major Bitcoin industry companies tracked by Perception

export interface RecentMention {
  source: string;
  title: string;
  url: string;
  timestamp: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  imageUrl?: string;
}

export interface BitcoinCompany {
  id: string;
  name: string;
  slug: string;
  ticker?: string;
  exchange?: string;
  logoUrl?: string;
  description: string;
  shortDescription: string;
  sector: 'treasury' | 'mining' | 'exchange' | 'infrastructure' | 'payments' | 'etf' | 'media' | 'custody';
  sectorLabel: string;
  country: string;
  countryCode: string;
  founded?: number;
  ceo?: string;
  website?: string;

  // Narrative Intelligence (what Perception tracks)
  narrativeScore: number;
  narrativeLabel: 'Very Bullish' | 'Bullish' | 'Neutral' | 'Bearish' | 'Very Bearish';
  weeklyMentions: number;
  trendDirection: 'up' | 'down' | 'stable';
  trendPercentage: number;
  topNarratives: string[];
  recentMentions: RecentMention[];
  lastUpdated: string;

  // For treasury companies only
  btcHoldings?: number;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export const generateCompanySlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const getNarrativeColor = (score: number): string => {
  if (score >= 60) return '#22c55e';  // Green for Bullish+
  if (score >= 45) return '#6b7280';  // Gray for Neutral (45-59)
  return '#ef4444';                    // Red for Bearish (<45)
};

export const getNarrativeLabel = (score: number): BitcoinCompany['narrativeLabel'] => {
  if (score >= 75) return 'Very Bullish';
  if (score >= 60) return 'Bullish';
  if (score >= 45) return 'Neutral';
  if (score >= 30) return 'Bearish';
  return 'Very Bearish';
};

export const bitcoinCompanies: BitcoinCompany[] = [
  {
    id: 'strategy',
    name: 'Strategy',
    slug: 'strategy',
    ticker: 'MSTR',
    exchange: 'NASDAQ',
    logoUrl: 'https://www.google.com/s2/favicons?domain=strategy.com&sz=128',
    description: 'Strategy (formerly MicroStrategy) pioneered the corporate Bitcoin treasury model under Michael Saylor\'s leadership. The company\'s Bitcoin strategy generates significant media coverage and shapes institutional adoption narratives across the industry.',
    shortDescription: 'The company that started the corporate Bitcoin treasury movement.',
    sector: 'treasury',
    sectorLabel: 'Corporate Treasury',
    country: 'United States',
    countryCode: 'US',
    founded: 1989,
    ceo: 'Phong Le',
    website: 'https://www.strategy.com',
    narrativeScore: 78,
    narrativeLabel: 'Very Bullish',
    weeklyMentions: 4280,
    trendDirection: 'up',
    trendPercentage: 12,
    topNarratives: ['Bitcoin accumulation strategy', 'Institutional adoption leader', 'Michael Saylor influence', 'Treasury management model'],
    recentMentions: [
      { source: 'Bloomberg', title: 'Strategy Adds Another 15,000 Bitcoin to Treasury Holdings', url: 'https://www.bloomberg.com/news/articles/strategy-bitcoin-treasury', timestamp: '2 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop' },
      { source: 'CoinDesk', title: 'MSTR Stock Hits New High as Bitcoin Rally Continues', url: 'https://www.coindesk.com/markets/mstr-stock-bitcoin-rally', timestamp: '5 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=300&fit=crop' },
      { source: 'The Block', title: 'Strategy\'s Bitcoin Strategy: A Year in Review', url: 'https://www.theblock.co/post/strategy-bitcoin-review', timestamp: '8 hours ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop' },
      { source: 'Bitcoin Magazine', title: 'Michael Saylor on Corporate Bitcoin Adoption at Bitcoin 2025', url: 'https://bitcoinmagazine.com/business/michael-saylor-bitcoin-2025', timestamp: '1 day ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop' }
    ],
    btcHoldings: 660624,
    lastUpdated: '2026-01-06',
    metaTitle: 'Strategy (MSTR) - Narrative Intelligence & Sentiment Analysis',
    metaDescription: 'Track what people are saying about Strategy (MicroStrategy). Real-time sentiment analysis, news coverage, and narrative trends from 650+ sources.',
    keywords: ['MicroStrategy sentiment', 'MSTR news', 'Michael Saylor coverage', 'Strategy Bitcoin narrative']
  },
  {
    id: 'marathon-digital',
    name: 'Marathon Digital',
    slug: 'marathon-digital',
    ticker: 'MARA',
    exchange: 'NASDAQ',
    logoUrl: 'https://www.google.com/s2/favicons?domain=mara.com&sz=128',
    description: 'Marathon Digital Holdings is one of the largest Bitcoin mining companies in North America. Mining operations, hash rate growth, and sustainability initiatives drive significant coverage in Bitcoin media.',
    shortDescription: 'Leading Bitcoin miner with major media presence.',
    sector: 'mining',
    sectorLabel: 'Bitcoin Mining',
    country: 'United States',
    countryCode: 'US',
    founded: 2010,
    ceo: 'Fred Thiel',
    website: 'https://www.mara.com',
    narrativeScore: 65,
    narrativeLabel: 'Bullish',
    weeklyMentions: 1840,
    trendDirection: 'up',
    trendPercentage: 8,
    topNarratives: ['Hash rate expansion', 'Mining economics', 'Energy sustainability', 'Bitcoin treasury growth'],
    recentMentions: [
      { source: 'Reuters', title: 'Marathon Digital Reports Record Hash Rate in Q4', url: 'https://www.reuters.com/technology/marathon-digital-record-hash-rate', timestamp: '3 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=400&h=300&fit=crop' },
      { source: 'CoinDesk', title: 'Bitcoin Miners Face Profitability Pressure After Halving', url: 'https://www.coindesk.com/markets/bitcoin-miners-halving-profitability', timestamp: '6 hours ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop' },
      { source: 'The Block', title: 'MARA Expands Texas Mining Operations', url: 'https://www.theblock.co/post/mara-texas-mining-expansion', timestamp: '1 day ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=300&fit=crop' }
    ],
    btcHoldings: 53250,
    lastUpdated: '2026-01-06',
    metaTitle: 'Marathon Digital (MARA) - News & Sentiment Tracking',
    metaDescription: 'Monitor Marathon Digital coverage across 650+ sources. Real-time sentiment analysis and narrative intelligence for MARA.',
    keywords: ['Marathon Digital news', 'MARA sentiment', 'Bitcoin mining coverage']
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    slug: 'coinbase',
    ticker: 'COIN',
    exchange: 'NASDAQ',
    logoUrl: 'https://www.google.com/s2/favicons?domain=coinbase.com&sz=128',
    description: 'Coinbase is the largest cryptocurrency exchange in the United States. As a publicly traded company and major crypto infrastructure provider, it generates extensive coverage on regulatory developments, product launches, and market trends.',
    shortDescription: 'America\'s largest crypto exchange and regulatory bellwether.',
    sector: 'exchange',
    sectorLabel: 'Exchange',
    country: 'United States',
    countryCode: 'US',
    founded: 2012,
    ceo: 'Brian Armstrong',
    website: 'https://www.coinbase.com',
    narrativeScore: 58,
    narrativeLabel: 'Neutral',
    weeklyMentions: 3650,
    trendDirection: 'stable',
    trendPercentage: 2,
    topNarratives: ['SEC regulatory battles', 'Base L2 ecosystem', 'Institutional custody', 'Brian Armstrong policy advocacy'],
    recentMentions: [
      { source: 'Wall Street Journal', title: 'Coinbase Expands Institutional Custody Services', url: 'https://www.wsj.com/articles/coinbase-institutional-custody', timestamp: '4 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop' },
      { source: 'The Block', title: 'Base Network TVL Surpasses $10 Billion', url: 'https://www.theblock.co/post/base-network-tvl-10-billion', timestamp: '7 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop' },
      { source: 'Bloomberg', title: 'Coinbase CEO Meets with SEC Officials on Crypto Regulation', url: 'https://www.bloomberg.com/news/articles/coinbase-sec-regulation', timestamp: '1 day ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop' }
    ],
    lastUpdated: '2026-01-06',
    metaTitle: 'Coinbase (COIN) - Real-Time Narrative Intelligence',
    metaDescription: 'Track Coinbase sentiment and news coverage. Monitor regulatory developments and market narratives from 650+ curated sources.',
    keywords: ['Coinbase news', 'COIN sentiment', 'Brian Armstrong', 'crypto regulation']
  },
  {
    id: 'block-inc',
    name: 'Block',
    slug: 'block',
    ticker: 'SQ',
    exchange: 'NYSE',
    logoUrl: 'https://www.google.com/s2/favicons?domain=block.xyz&sz=128',
    description: 'Block Inc. (formerly Square) is a financial services and digital payments company led by Jack Dorsey. The company\'s Bitcoin initiatives through Cash App and hardware development generate significant industry discussion.',
    shortDescription: 'Jack Dorsey\'s Bitcoin-focused payments company.',
    sector: 'payments',
    sectorLabel: 'Payments',
    country: 'United States',
    countryCode: 'US',
    founded: 2009,
    ceo: 'Jack Dorsey',
    website: 'https://block.xyz',
    narrativeScore: 72,
    narrativeLabel: 'Bullish',
    weeklyMentions: 2180,
    trendDirection: 'up',
    trendPercentage: 15,
    topNarratives: ['Bitcoin hardware wallet', 'Cash App Bitcoin', 'Jack Dorsey leadership', 'Bitcoin-only focus'],
    recentMentions: [
      { source: 'TechCrunch', title: 'Block\'s Bitkey Wallet Sees Strong Adoption in First Year', url: 'https://techcrunch.com/block-bitkey-wallet-adoption', timestamp: '2 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop' },
      { source: 'Bitcoin Magazine', title: 'Jack Dorsey: Bitcoin is the Native Currency of the Internet', url: 'https://bitcoinmagazine.com/culture/jack-dorsey-bitcoin-internet-currency', timestamp: '6 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop' },
      { source: 'CoinDesk', title: 'Cash App Bitcoin Revenue Grows 25% Year-Over-Year', url: 'https://www.coindesk.com/business/cash-app-bitcoin-revenue', timestamp: '1 day ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=300&fit=crop' }
    ],
    btcHoldings: 8485,
    lastUpdated: '2026-01-06',
    metaTitle: 'Block Inc. (SQ) - Sentiment & Narrative Analysis',
    metaDescription: 'Monitor Block Inc. coverage and Jack Dorsey\'s Bitcoin initiatives. Real-time sentiment tracking from 650+ sources.',
    keywords: ['Block Inc news', 'Jack Dorsey Bitcoin', 'Cash App sentiment', 'Square crypto']
  },
  {
    id: 'tesla',
    name: 'Tesla',
    slug: 'tesla',
    ticker: 'TSLA',
    exchange: 'NASDAQ',
    logoUrl: 'https://www.google.com/s2/favicons?domain=tesla.com&sz=128',
    description: 'Tesla made waves in 2021 with its Bitcoin purchase and continues to generate discussion around Elon Musk\'s cryptocurrency commentary and the company\'s Bitcoin holdings.',
    shortDescription: 'Elon Musk\'s EV company with Bitcoin treasury.',
    sector: 'treasury',
    sectorLabel: 'Corporate Treasury',
    country: 'United States',
    countryCode: 'US',
    founded: 2003,
    ceo: 'Elon Musk',
    website: 'https://www.tesla.com',
    narrativeScore: 52,
    narrativeLabel: 'Neutral',
    weeklyMentions: 1420,
    trendDirection: 'down',
    trendPercentage: 5,
    topNarratives: ['Bitcoin treasury status', 'Elon Musk crypto tweets', 'EV + Bitcoin intersection', 'Corporate adoption signal'],
    recentMentions: [
      { source: 'CNBC', title: 'Tesla Q4 Earnings: Bitcoin Holdings Remain Unchanged', url: 'https://www.cnbc.com/tesla-q4-earnings-bitcoin', timestamp: '1 day ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1617704548623-340376564e68?w=400&h=300&fit=crop' },
      { source: 'CoinDesk', title: 'Elon Musk Comments on Bitcoin Energy Debate', url: 'https://www.coindesk.com/business/elon-musk-bitcoin-energy', timestamp: '2 days ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop' },
      { source: 'Bloomberg', title: 'Tesla\'s Bitcoin Bet: Four Years Later', url: 'https://www.bloomberg.com/news/features/tesla-bitcoin-bet', timestamp: '3 days ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop' }
    ],
    btcHoldings: 11509,
    lastUpdated: '2026-01-06',
    metaTitle: 'Tesla (TSLA) Bitcoin - News & Sentiment Tracking',
    metaDescription: 'Track Tesla Bitcoin coverage and Elon Musk crypto sentiment. Real-time narrative intelligence from 650+ sources.',
    keywords: ['Tesla Bitcoin news', 'Elon Musk crypto', 'TSLA Bitcoin sentiment']
  },
  {
    id: 'riot-platforms',
    name: 'Riot Platforms',
    slug: 'riot-platforms',
    ticker: 'RIOT',
    exchange: 'NASDAQ',
    logoUrl: 'https://www.google.com/s2/favicons?domain=riotplatforms.com&sz=128',
    description: 'Riot Platforms is one of the largest Bitcoin mining companies in North America, operating massive facilities in Texas. Mining capacity and operational efficiency dominate coverage.',
    shortDescription: 'Major Bitcoin miner with Texas operations.',
    sector: 'mining',
    sectorLabel: 'Bitcoin Mining',
    country: 'United States',
    countryCode: 'US',
    founded: 2000,
    ceo: 'Jason Les',
    website: 'https://www.riotplatforms.com',
    narrativeScore: 61,
    narrativeLabel: 'Bullish',
    weeklyMentions: 980,
    trendDirection: 'up',
    trendPercentage: 6,
    topNarratives: ['Texas mining operations', 'Hash rate growth', 'Mining profitability', 'Energy grid participation'],
    recentMentions: [
      { source: 'The Block', title: 'Riot Platforms Achieves 30 EH/s Hash Rate Milestone', url: 'https://www.theblock.co/post/riot-platforms-hash-rate-milestone', timestamp: '5 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?w=400&h=300&fit=crop' },
      { source: 'Reuters', title: 'Texas Bitcoin Miners Provide Grid Stability During Winter Storm', url: 'https://www.reuters.com/technology/texas-bitcoin-miners-grid-stability', timestamp: '1 day ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?w=400&h=300&fit=crop' },
      { source: 'CoinDesk', title: 'Riot vs Marathon: Comparing the Mining Giants', url: 'https://www.coindesk.com/business/riot-marathon-mining-comparison', timestamp: '2 days ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop' }
    ],
    btcHoldings: 18692,
    lastUpdated: '2026-01-06',
    metaTitle: 'Riot Platforms (RIOT) - Mining News & Sentiment',
    metaDescription: 'Monitor Riot Platforms coverage and Bitcoin mining sentiment. Track narratives from 650+ industry sources.',
    keywords: ['Riot Platforms news', 'RIOT sentiment', 'Bitcoin mining Texas']
  },
  {
    id: 'metaplanet',
    name: 'Metaplanet',
    slug: 'metaplanet',
    ticker: '3350',
    exchange: 'TYO',
    logoUrl: 'https://www.google.com/s2/favicons?domain=metaplanet.jp&sz=128',
    description: 'Metaplanet is a Tokyo-listed company that has adopted a Bitcoin treasury strategy, earning it the nickname "Asia\'s MicroStrategy." Their aggressive accumulation generates significant coverage in Asian and global Bitcoin media.',
    shortDescription: 'Asia\'s leading Bitcoin treasury company.',
    sector: 'treasury',
    sectorLabel: 'Corporate Treasury',
    country: 'Japan',
    countryCode: 'JP',
    founded: 1999,
    ceo: 'Simon Gerovich',
    website: 'https://metaplanet.jp',
    narrativeScore: 74,
    narrativeLabel: 'Bullish',
    weeklyMentions: 1650,
    trendDirection: 'up',
    trendPercentage: 28,
    topNarratives: ['Asia MicroStrategy', 'Japanese Bitcoin adoption', 'Corporate treasury model', 'Aggressive accumulation'],
    recentMentions: [
      { source: 'Bitcoin Magazine', title: 'Metaplanet Announces ¥10 Billion Bitcoin Purchase', url: 'https://bitcoinmagazine.com/business/metaplanet-10-billion-yen-bitcoin', timestamp: '3 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop' },
      { source: 'Nikkei Asia', title: 'Japanese Firms Follow Metaplanet\'s Bitcoin Strategy', url: 'https://asia.nikkei.com/Business/metaplanet-bitcoin-strategy', timestamp: '8 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop' },
      { source: 'CoinDesk', title: 'Asia\'s MicroStrategy: Metaplanet\'s Rapid Rise', url: 'https://www.coindesk.com/business/metaplanet-asia-microstrategy', timestamp: '1 day ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=300&fit=crop' }
    ],
    btcHoldings: 30823,
    lastUpdated: '2026-01-06',
    metaTitle: 'Metaplanet - Japan Bitcoin Treasury Sentiment',
    metaDescription: 'Track Metaplanet news and sentiment. Monitor Asia\'s leading Bitcoin treasury company across 650+ sources.',
    keywords: ['Metaplanet Bitcoin', 'Japan Bitcoin company', 'Asia MicroStrategy']
  },
  {
    id: 'blackrock',
    name: 'BlackRock',
    slug: 'blackrock',
    ticker: 'BLK',
    exchange: 'NYSE',
    logoUrl: 'https://www.google.com/s2/favicons?domain=blackrock.com&sz=128',
    description: 'BlackRock, the world\'s largest asset manager, has become a major force in Bitcoin through its iShares Bitcoin Trust (IBIT). Their institutional adoption narrative significantly influences market sentiment.',
    shortDescription: 'World\'s largest asset manager with Bitcoin ETF.',
    sector: 'etf',
    sectorLabel: 'Asset Management',
    country: 'United States',
    countryCode: 'US',
    founded: 1988,
    ceo: 'Larry Fink',
    website: 'https://www.blackrock.com',
    narrativeScore: 68,
    narrativeLabel: 'Bullish',
    weeklyMentions: 2890,
    trendDirection: 'up',
    trendPercentage: 10,
    topNarratives: ['IBIT ETF flows', 'Larry Fink Bitcoin commentary', 'Institutional validation', 'TradFi adoption signal'],
    recentMentions: [
      { source: 'Bloomberg', title: 'BlackRock\'s IBIT Sees Record Weekly Inflows', url: 'https://www.bloomberg.com/news/articles/blackrock-ibit-record-inflows', timestamp: '2 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop' },
      { source: 'Wall Street Journal', title: 'Larry Fink: Bitcoin is Becoming a Legitimate Asset Class', url: 'https://www.wsj.com/articles/larry-fink-bitcoin-asset-class', timestamp: '6 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop' },
      { source: 'Financial Times', title: 'BlackRock Bitcoin ETF Approaches $50 Billion AUM', url: 'https://www.ft.com/content/blackrock-bitcoin-etf-50-billion', timestamp: '1 day ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop' }
    ],
    lastUpdated: '2026-01-06',
    metaTitle: 'BlackRock Bitcoin - ETF News & Sentiment',
    metaDescription: 'Monitor BlackRock Bitcoin coverage and IBIT ETF sentiment. Track institutional adoption narratives from 650+ sources.',
    keywords: ['BlackRock Bitcoin', 'IBIT ETF news', 'Larry Fink crypto', 'institutional Bitcoin']
  },
  {
    id: 'fidelity',
    name: 'Fidelity Digital Assets',
    slug: 'fidelity',
    logoUrl: 'https://www.google.com/s2/favicons?domain=fidelity.com&sz=128',
    description: 'Fidelity was an early institutional player in Bitcoin, offering custody and trading services since 2018. Their Bitcoin ETF (FBTC) and research contribute significantly to institutional narratives.',
    shortDescription: 'Legacy finance pioneer in Bitcoin services.',
    sector: 'custody',
    sectorLabel: 'Custody & ETF',
    country: 'United States',
    countryCode: 'US',
    founded: 1946,
    website: 'https://www.fidelitydigitalassets.com',
    narrativeScore: 66,
    narrativeLabel: 'Bullish',
    weeklyMentions: 1580,
    trendDirection: 'stable',
    trendPercentage: 3,
    topNarratives: ['FBTC ETF performance', 'Institutional custody', 'Bitcoin research reports', 'Retirement account access'],
    recentMentions: [
      { source: 'CNBC', title: 'Fidelity Expands Bitcoin Offering to Retirement Accounts', url: 'https://www.cnbc.com/fidelity-bitcoin-retirement-accounts', timestamp: '4 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=300&fit=crop' },
      { source: 'The Block', title: 'Fidelity Digital Assets Research: Bitcoin in 2026', url: 'https://www.theblock.co/post/fidelity-bitcoin-research-2026', timestamp: '1 day ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop' },
      { source: 'CoinDesk', title: 'FBTC Competes with IBIT for ETF Market Share', url: 'https://www.coindesk.com/markets/fbtc-ibit-etf-competition', timestamp: '2 days ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop' }
    ],
    lastUpdated: '2026-01-06',
    metaTitle: 'Fidelity Bitcoin - News & Sentiment Analysis',
    metaDescription: 'Track Fidelity Digital Assets coverage and FBTC sentiment. Monitor institutional Bitcoin narratives from 650+ sources.',
    keywords: ['Fidelity Bitcoin', 'FBTC ETF', 'institutional crypto custody']
  },
  {
    id: 'strike',
    name: 'Strike',
    slug: 'strike',
    logoUrl: 'https://www.google.com/s2/favicons?domain=strike.me&sz=128',
    description: 'Strike, led by Jack Mallers, is a Bitcoin payments company known for its Lightning Network integration and international remittance services. Mallers\' advocacy generates significant Bitcoin community engagement.',
    shortDescription: 'Lightning-powered Bitcoin payments platform.',
    sector: 'payments',
    sectorLabel: 'Payments',
    country: 'United States',
    countryCode: 'US',
    founded: 2019,
    ceo: 'Jack Mallers',
    website: 'https://strike.me',
    narrativeScore: 76,
    narrativeLabel: 'Very Bullish',
    weeklyMentions: 1240,
    trendDirection: 'up',
    trendPercentage: 18,
    topNarratives: ['Lightning Network adoption', 'Bitcoin remittances', 'Jack Mallers advocacy', 'El Salvador partnership'],
    recentMentions: [
      { source: 'Bitcoin Magazine', title: 'Strike Launches in 5 New Countries', url: 'https://bitcoinmagazine.com/business/strike-launches-5-new-countries', timestamp: '3 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop' },
      { source: 'Forbes', title: 'Jack Mallers on Making Bitcoin Payments Mainstream', url: 'https://www.forbes.com/sites/digital-assets/jack-mallers-bitcoin-payments', timestamp: '1 day ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop' },
      { source: 'CoinDesk', title: 'Strike\'s Lightning Volume Hits All-Time High', url: 'https://www.coindesk.com/tech/strike-lightning-volume-record', timestamp: '2 days ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop' }
    ],
    lastUpdated: '2026-01-06',
    metaTitle: 'Strike - Bitcoin Payments News & Sentiment',
    metaDescription: 'Monitor Strike and Jack Mallers coverage. Track Lightning Network and Bitcoin payments narratives from 650+ sources.',
    keywords: ['Strike Bitcoin', 'Jack Mallers', 'Lightning Network news', 'Bitcoin payments']
  },
  {
    id: 'tether',
    name: 'Tether',
    slug: 'tether',
    logoUrl: 'https://www.google.com/s2/favicons?domain=tether.to&sz=128',
    description: 'Tether operates the largest stablecoin (USDT) and has become a major Bitcoin holder. Coverage focuses on reserves transparency, regulatory scrutiny, and market infrastructure role.',
    shortDescription: 'Largest stablecoin issuer and Bitcoin holder.',
    sector: 'infrastructure',
    sectorLabel: 'Stablecoin',
    country: 'British Virgin Islands',
    countryCode: 'VG',
    founded: 2014,
    ceo: 'Paolo Ardoino',
    website: 'https://tether.to',
    narrativeScore: 48,
    narrativeLabel: 'Neutral',
    weeklyMentions: 2450,
    trendDirection: 'down',
    trendPercentage: 4,
    topNarratives: ['USDT reserves', 'Regulatory scrutiny', 'Bitcoin treasury', 'Market infrastructure'],
    recentMentions: [
      { source: 'The Block', title: 'Tether Releases Q4 Attestation Report', url: 'https://www.theblock.co/post/tether-q4-attestation-report', timestamp: '5 hours ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop' },
      { source: 'Reuters', title: 'US Lawmakers Question Tether\'s Reserve Practices', url: 'https://www.reuters.com/technology/us-lawmakers-tether-reserves', timestamp: '1 day ago', sentiment: 'negative', imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop' },
      { source: 'CoinDesk', title: 'USDT Market Cap Reaches New High Despite Scrutiny', url: 'https://www.coindesk.com/markets/usdt-market-cap-high', timestamp: '2 days ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=300&fit=crop' }
    ],
    lastUpdated: '2026-01-06',
    metaTitle: 'Tether (USDT) - News & Sentiment Intelligence',
    metaDescription: 'Track Tether coverage and USDT sentiment. Monitor stablecoin narratives and regulatory news from 650+ sources.',
    keywords: ['Tether news', 'USDT sentiment', 'stablecoin regulation']
  },
  {
    id: 'bitcoin-magazine',
    name: 'Bitcoin Magazine',
    slug: 'bitcoin-magazine',
    logoUrl: 'https://www.google.com/s2/favicons?domain=bitcoinmagazine.com&sz=128',
    description: 'Bitcoin Magazine is the oldest and one of the most influential Bitcoin-focused media outlets. Their coverage, events (Bitcoin Conference), and editorial positions shape industry narratives.',
    shortDescription: 'The original Bitcoin media company.',
    sector: 'media',
    sectorLabel: 'Media',
    country: 'United States',
    countryCode: 'US',
    founded: 2012,
    website: 'https://bitcoinmagazine.com',
    narrativeScore: 82,
    narrativeLabel: 'Very Bullish',
    weeklyMentions: 890,
    trendDirection: 'up',
    trendPercentage: 7,
    topNarratives: ['Bitcoin Conference coverage', 'Industry news', 'Bitcoin maximalism', 'Educational content'],
    recentMentions: [
      { source: 'CoinDesk', title: 'Bitcoin Magazine Announces Bitcoin 2026 Conference Details', url: 'https://www.coindesk.com/business/bitcoin-magazine-conference-2026', timestamp: '4 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop' },
      { source: 'The Block', title: 'Bitcoin Media Landscape: Who Shapes the Narrative?', url: 'https://www.theblock.co/post/bitcoin-media-landscape', timestamp: '1 day ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop' },
      { source: 'Decrypt', title: 'Bitcoin Magazine\'s Influence on Industry Discourse', url: 'https://decrypt.co/bitcoin-magazine-influence', timestamp: '3 days ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop' }
    ],
    lastUpdated: '2026-01-06',
    metaTitle: 'Bitcoin Magazine - Coverage & Sentiment Analysis',
    metaDescription: 'Track Bitcoin Magazine influence and coverage trends. Monitor Bitcoin media narratives from 650+ sources.',
    keywords: ['Bitcoin Magazine', 'Bitcoin Conference', 'Bitcoin news media']
  },
  {
    id: 'grayscale',
    name: 'Grayscale',
    slug: 'grayscale',
    logoUrl: 'https://www.google.com/s2/favicons?domain=grayscale.com&sz=128',
    description: 'Grayscale operates the first SEC-approved Bitcoin spot ETF (converted from GBTC trust). Their products and market commentary influence institutional Bitcoin sentiment.',
    shortDescription: 'Pioneer Bitcoin investment products.',
    sector: 'etf',
    sectorLabel: 'Asset Management',
    country: 'United States',
    countryCode: 'US',
    founded: 2013,
    ceo: 'Michael Sonnenshein',
    website: 'https://www.grayscale.com',
    narrativeScore: 55,
    narrativeLabel: 'Neutral',
    weeklyMentions: 1320,
    trendDirection: 'down',
    trendPercentage: 8,
    topNarratives: ['GBTC outflows', 'ETF competition', 'Institutional products', 'Market research'],
    recentMentions: [
      { source: 'Bloomberg', title: 'Grayscale GBTC Outflows Slow as Market Stabilizes', url: 'https://www.bloomberg.com/news/articles/grayscale-gbtc-outflows', timestamp: '3 hours ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop' },
      { source: 'The Block', title: 'Grayscale Launches New Mini Bitcoin ETF', url: 'https://www.theblock.co/post/grayscale-mini-bitcoin-etf', timestamp: '1 day ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=300&fit=crop' },
      { source: 'CoinDesk', title: 'GBTC vs IBIT: The ETF Fee War Continues', url: 'https://www.coindesk.com/markets/gbtc-ibit-etf-fee-war', timestamp: '2 days ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop' }
    ],
    lastUpdated: '2026-01-06',
    metaTitle: 'Grayscale (GBTC) - ETF News & Sentiment',
    metaDescription: 'Track Grayscale coverage and GBTC sentiment. Monitor Bitcoin ETF narratives from 650+ sources.',
    keywords: ['Grayscale news', 'GBTC sentiment', 'Bitcoin ETF']
  },
  {
    id: 'michael-saylor',
    name: 'Michael Saylor',
    slug: 'michael-saylor',
    logoUrl: 'https://www.google.com/s2/favicons?domain=saylor.org&sz=128',
    description: 'Michael Saylor, Executive Chairman of Strategy, is one of the most influential voices in Bitcoin. His social media presence, interviews, and advocacy significantly shape market narratives.',
    shortDescription: 'Bitcoin\'s most vocal corporate champion.',
    sector: 'treasury',
    sectorLabel: 'Thought Leader',
    country: 'United States',
    countryCode: 'US',
    website: 'https://www.michael.com',
    narrativeScore: 85,
    narrativeLabel: 'Very Bullish',
    weeklyMentions: 3150,
    trendDirection: 'up',
    trendPercentage: 9,
    topNarratives: ['Bitcoin advocacy', 'Corporate treasury education', 'Price predictions', 'Macro economic commentary'],
    recentMentions: [
      { source: 'Bloomberg', title: 'Michael Saylor: Bitcoin Will Reach $500,000 by 2030', url: 'https://www.bloomberg.com/news/articles/michael-saylor-bitcoin-500000', timestamp: '2 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop' },
      { source: 'CNBC', title: 'Saylor\'s Strategy Playbook Inspires Corporate Bitcoin Adoption', url: 'https://www.cnbc.com/saylor-strategy-corporate-bitcoin', timestamp: '8 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop' },
      { source: 'Bitcoin Magazine', title: 'Michael Saylor Interview: The Future of Corporate Bitcoin', url: 'https://bitcoinmagazine.com/culture/michael-saylor-interview-corporate-bitcoin', timestamp: '1 day ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop' }
    ],
    lastUpdated: '2026-01-06',
    metaTitle: 'Michael Saylor - Bitcoin Sentiment & Coverage',
    metaDescription: 'Track Michael Saylor\'s Bitcoin coverage and influence. Monitor his impact on market narratives from 650+ sources.',
    keywords: ['Michael Saylor Bitcoin', 'Saylor sentiment', 'Bitcoin advocacy']
  },
  {
    id: 'swan-bitcoin',
    name: 'Swan Bitcoin',
    slug: 'swan-bitcoin',
    logoUrl: 'https://www.google.com/s2/favicons?domain=swanbitcoin.com&sz=128',
    description: 'Swan Bitcoin is a Bitcoin-only financial services company focused on accumulation plans and IRA products. Their educational content and Bitcoin-only philosophy generate community engagement.',
    shortDescription: 'Bitcoin-only accumulation platform.',
    sector: 'infrastructure',
    sectorLabel: 'Financial Services',
    country: 'United States',
    countryCode: 'US',
    founded: 2019,
    ceo: 'Cory Klippsten',
    website: 'https://www.swanbitcoin.com',
    narrativeScore: 71,
    narrativeLabel: 'Bullish',
    weeklyMentions: 680,
    trendDirection: 'stable',
    trendPercentage: 2,
    topNarratives: ['Bitcoin IRA products', 'DCA strategy', 'Bitcoin maximalism', 'Educational content'],
    recentMentions: [
      { source: 'Bitcoin Magazine', title: 'Swan Bitcoin Surpasses $5 Billion in Client Assets', url: 'https://bitcoinmagazine.com/business/swan-bitcoin-5-billion-assets', timestamp: '6 hours ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=400&h=300&fit=crop' },
      { source: 'The Block', title: 'Bitcoin IRA Market Heats Up as Swan Expands Offerings', url: 'https://www.theblock.co/post/bitcoin-ira-market-swan', timestamp: '1 day ago', sentiment: 'positive', imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=300&fit=crop' },
      { source: 'Decrypt', title: 'Cory Klippsten on Bitcoin-Only Business Strategy', url: 'https://decrypt.co/cory-klippsten-bitcoin-only-strategy', timestamp: '3 days ago', sentiment: 'neutral', imageUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop' }
    ],
    lastUpdated: '2026-01-06',
    metaTitle: 'Swan Bitcoin - News & Community Sentiment',
    metaDescription: 'Track Swan Bitcoin coverage and community sentiment. Monitor Bitcoin-only financial services narratives.',
    keywords: ['Swan Bitcoin', 'Cory Klippsten', 'Bitcoin IRA', 'Bitcoin accumulation']
  }
];

// Helper functions
export const getCompanyBySlug = (slug: string): BitcoinCompany | undefined => {
  return bitcoinCompanies.find(company => company.slug === slug);
};

export const getCompaniesBySector = (sector: BitcoinCompany['sector']): BitcoinCompany[] => {
  return bitcoinCompanies.filter(company => company.sector === sector);
};

export const getTopCompaniesByMentions = (limit: number = 10): BitcoinCompany[] => {
  return [...bitcoinCompanies].sort((a, b) => b.weeklyMentions - a.weeklyMentions).slice(0, limit);
};

export const getTopCompaniesByNarrative = (limit: number = 10): BitcoinCompany[] => {
  return [...bitcoinCompanies].sort((a, b) => b.narrativeScore - a.narrativeScore).slice(0, limit);
};

export const getTrendingCompanies = (limit: number = 5): BitcoinCompany[] => {
  return [...bitcoinCompanies]
    .filter(c => c.trendDirection === 'up')
    .sort((a, b) => b.trendPercentage - a.trendPercentage)
    .slice(0, limit);
};

export const getTotalWeeklyMentions = (): number => {
  return bitcoinCompanies.reduce((sum, company) => sum + company.weeklyMentions, 0);
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

export const getCountryFlag = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};
