import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import {
  bitcoinCompanies,
  getCompanyBySlug,
  getNarrativeColor,
  formatNumber,
  getCountryFlag
} from '@/data/bitcoin-companies';
import { getCompanyMentions } from '@/data/company-mentions';

// Company Logo component with fallback
function CompanyLogo({ company, size = 'md' }: { company: { name: string; logoUrl?: string }; size?: 'sm' | 'md' | 'lg' }) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-16 h-16 text-xl',
    lg: 'w-24 h-24 text-3xl'
  };

  const fallback = (
    <div className={`${sizeClasses[size]} rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-semibold text-slate-600 dark:text-slate-400`}>
      {company.name.charAt(0)}
    </div>
  );

  if (!company.logoUrl || imgError) {
    return fallback;
  }

  return (
    <img
      src={company.logoUrl}
      alt={`${company.name} logo`}
      className={`${sizeClasses[size]} rounded-2xl object-contain bg-white dark:bg-slate-800 p-2 border border-slate-200 dark:border-slate-700`}
      onError={() => setImgError(true)}
    />
  );
}

// Gated content component
function GatedSection({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="blur-sm pointer-events-none select-none opacity-60">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-[2px] rounded-2xl">
        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400 text-center max-w-xs mb-6">
          {description}
        </p>
        <Link to="/pricing">
          <Button size="sm" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-full px-6">
            Start Free Trial
          </Button>
        </Link>
      </div>
    </div>
  );
}

// Trend indicator component (text only, no icons)
function TrendIndicator({ direction, percentage, size = 'sm' }: { direction: 'up' | 'down' | 'stable'; percentage: number; size?: 'sm' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'text-4xl font-bold' : 'text-sm font-medium';

  if (direction === 'up') {
    return (
      <span className={`text-green-600 dark:text-green-400 ${sizeClass}`}>
        +{percentage}%
      </span>
    );
  }
  if (direction === 'down') {
    return (
      <span className={`text-red-500 dark:text-red-400 ${sizeClass}`}>
        -{percentage}%
      </span>
    );
  }
  return (
    <span className={`text-slate-500 dark:text-slate-400 ${sizeClass}`}>
      {percentage}%
    </span>
  );
}

// Sentiment badge for mentions
function SentimentBadge({ sentiment }: { sentiment: 'positive' | 'neutral' | 'negative' }) {
  const colors = {
    positive: 'text-green-600 dark:text-green-400',
    neutral: 'text-slate-500 dark:text-slate-400',
    negative: 'text-red-500 dark:text-red-400'
  };

  return (
    <span className={`text-xs font-medium ${colors[sentiment]} capitalize`}>
      {sentiment}
    </span>
  );
}

// Source logo component
function SourceLogo({ source }: { source: string }) {
  const [imgError, setImgError] = useState(false);

  // Map source names to their domains
  const sourceDomains: Record<string, string> = {
    'Bloomberg': 'bloomberg.com',
    'CoinDesk': 'coindesk.com',
    'The Block': 'theblock.co',
    'Bitcoin Magazine': 'bitcoinmagazine.com',
    'Reuters': 'reuters.com',
    'Wall Street Journal': 'wsj.com',
    'CNBC': 'cnbc.com',
    'TechCrunch': 'techcrunch.com',
    'Forbes': 'forbes.com',
    'Financial Times': 'ft.com',
    'Nikkei Asia': 'asia.nikkei.com',
    'Decrypt': 'decrypt.co',
    'Cointelegraph': 'cointelegraph.com',
    'CryptoNews': 'cryptonews.com',
    'CryptoSlate': 'cryptoslate.com',
    'BeInCrypto': 'beincrypto.com',
    'Yahoo Finance': 'finance.yahoo.com',
    'Benzinga': 'benzinga.com',
    'The Motley Fool': 'fool.com',
    'Business Insider': 'businessinsider.com',
    'Watcher Guru': 'watcher.guru',
    'The Defiant': 'thedefiant.io',
    'X': 'x.com',
    'Reddit': 'reddit.com',
    'Electronic Payments International': 'electronicpaymentsinternational.com',
    'Grayscale': 'grayscale.com'
  };

  const domain = sourceDomains[source] || `${source.toLowerCase().replace(/\s+/g, '')}.com`;
  const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  if (imgError) {
    return (
      <div className="w-5 h-5 rounded bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-[10px] font-semibold text-slate-500">
        {source.charAt(0)}
      </div>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={source}
      className="w-5 h-5 rounded"
      onError={() => setImgError(true)}
    />
  );
}

export default function BitcoinCompanyPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/bitcoin-companies" replace />;
  }

  const company = getCompanyBySlug(slug);

  if (!company) {
    return <Navigate to="/bitcoin-companies" replace />;
  }

  // Get related companies (same sector)
  const relatedCompanies = bitcoinCompanies
    .filter(c => c.id !== company.id && c.sector === company.sector)
    .slice(0, 3);

  const narrativeColor = getNarrativeColor(company.narrativeScore);

  // Get real mentions from API data only - don't use fake placeholder URLs
  const apiMentions = getCompanyMentions(company.slug);

  // Filter to only include mentions with real URLs (not placeholders)
  const isRealUrl = (url: string) => {
    if (!url || url === '#') return false;
    // Real URLs typically have specific article paths, not generic patterns
    if (url.includes('/news/articles/') && !url.includes('2026')) return false; // Fake Bloomberg pattern
    if (url.includes('/markets/') && url.split('/').length < 5) return false; // Too short = fake
    return url.startsWith('http');
  };

  const recentMentions = apiMentions.filter(m => isRealUrl(m.url));

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": company.name,
    "description": company.description,
    "url": company.website,
    ...(company.founded && { "foundingDate": company.founded.toString() }),
    "address": {
      "@type": "PostalAddress",
      "addressCountry": company.country
    }
  };

  return (
    <>
      <Helmet>
        <title>{company.metaTitle || `${company.name} - Bitcoin Narrative Intelligence | Perception`}</title>
        <meta
          name="description"
          content={company.metaDescription || `Track ${company.name} coverage, sentiment, and narratives across 650+ sources. ${company.shortDescription}`}
        />
        <meta property="og:title" content={`${company.name} - Narrative Intelligence | Perception`} />
        <meta property="og:description" content={company.shortDescription} />
        <link rel="canonical" href={`https://perception.to/bitcoin-companies/${company.slug}`} />
        {company.keywords && <meta name="keywords" content={company.keywords.join(', ')} />}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 py-24">
          {/* Back Navigation */}
          <div className="mb-12">
            <Link
              to="/bitcoin-companies"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
            >
              <span>←</span>
              <span>All Companies</span>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="mb-20">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-12">
              {/* Company Info */}
              <div className="flex-1">
                <div className="flex items-start gap-6 mb-8">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    <CompanyLogo company={company} size="lg" />
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400">
                        {company.sectorLabel}
                      </span>
                      {company.ticker && (
                        <span className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800 text-xs font-mono font-medium text-slate-600 dark:text-slate-400">
                          {company.ticker}:{company.exchange}
                        </span>
                      )}
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {getCountryFlag(company.countryCode)} {company.country}
                      </span>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4">
                      {company.name}
                    </h1>

                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                      {company.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <Link to="/pricing">
                    <Button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 rounded-full px-8">
                      Track This Company
                    </Button>
                  </Link>
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    >
                      Visit Website →
                    </a>
                  )}
                </div>
              </div>

              {/* Narrative Score Card */}
              <div className="lg:w-80">
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 border border-slate-200 dark:border-slate-700">
                  <div className="text-center">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wide">
                      Current Sentiment
                    </div>
                    <div
                      className="text-7xl font-bold mb-2"
                      style={{ color: narrativeColor }}
                    >
                      {company.narrativeScore}
                    </div>
                    <div
                      className="text-lg font-semibold mb-6"
                      style={{ color: narrativeColor }}
                    >
                      {company.narrativeLabel}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
                      <TrendIndicator direction={company.trendDirection} percentage={company.trendPercentage} />
                      <span className="text-sm">vs last week</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
                Weekly Mentions
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white">
                {formatNumber(company.weeklyMentions)}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
                Popularity Trend
              </div>
              <div>
                <TrendIndicator direction={company.trendDirection} percentage={company.trendPercentage} size="lg" />
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">vs last week</div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
                Sources Tracked
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white">650+</div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-200 dark:border-slate-700">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3 uppercase tracking-wide">
                Coverage
              </div>
              <div className="text-4xl font-bold text-slate-900 dark:text-white">15</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">countries</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">About</h2>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg mb-8">
                  {company.description}
                </p>
                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-200 dark:border-slate-700">
                  {company.founded && (
                    <div>
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Founded</div>
                      <div className="text-lg font-medium text-slate-900 dark:text-white">{company.founded}</div>
                    </div>
                  )}
                  {company.ceo && (
                    <div>
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">CEO</div>
                      <div className="text-lg font-medium text-slate-900 dark:text-white">{company.ceo}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Current Narratives */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Current Narratives</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  Key themes being discussed about {company.name} across news, social media, and podcasts.
                </p>
                <div className="flex flex-wrap gap-3">
                  {company.topNarratives.map((narrative, index) => (
                    <span
                      key={index}
                      className="px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      {narrative}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recent Mentions - Using Real Data */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recent Mentions</h2>
                    {recentMentions.length > 0 && (
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Live Data</span>
                    )}
                  </div>

                  {/* Placeholder mentions when empty - show gated content */}
                  {recentMentions.length === 0 && (
                    <GatedSection
                      title="Unlock Media Feed"
                      description="Get real-time mentions from 650+ curated sources"
                    >
                      <div className="space-y-3">
                        {/* Placeholder mention cards */}
                        {[1, 2].map((i) => (
                          <div key={i} className="rounded-xl bg-slate-50 dark:bg-slate-700/50 overflow-hidden">
                            <div className="aspect-[3/1] w-full bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700" />
                            <div className="p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-4 h-4 rounded bg-slate-300 dark:bg-slate-600" />
                                <div className="h-2.5 w-16 bg-slate-300 dark:bg-slate-600 rounded" />
                              </div>
                              <div className="h-4 w-full bg-slate-300 dark:bg-slate-600 rounded mb-1" />
                              <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </GatedSection>
                  )}

                  {/* First visible mention from real data with featured image */}
                  {recentMentions[0] && (
                    <a
                      href={recentMentions[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl bg-slate-50 dark:bg-slate-700/50 overflow-hidden mb-4 hover:shadow-lg transition-shadow group"
                    >
                      {/* Featured Image */}
                      {recentMentions[0].imageUrl && (
                        <div className="aspect-[2/1] w-full overflow-hidden">
                          <img
                            src={recentMentions[0].imageUrl}
                            alt={recentMentions[0].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-xs">
                            <SourceLogo source={recentMentions[0].source} />
                            <span className="font-semibold text-slate-900 dark:text-white">{recentMentions[0].source}</span>
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500 dark:text-slate-400">{recentMentions[0].timestamp}</span>
                          </div>
                          <SentimentBadge sentiment={recentMentions[0].sentiment} />
                        </div>
                        <p className="font-medium text-slate-900 dark:text-white text-sm leading-snug group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors line-clamp-2">
                          {recentMentions[0].title}
                        </p>
                        <span className="inline-block mt-2 text-xs text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200">
                          Read article →
                        </span>
                      </div>
                    </a>
                  )}

                  {/* Gated additional mentions - show real content behind blur */}
                  {recentMentions.length > 1 && (
                    <GatedSection
                      title="Unlock Full Feed"
                      description="Get real-time mentions from 650+ curated sources"
                    >
                      <div className="space-y-3">
                        {recentMentions.slice(1, 3).map((mention, index) => (
                          <div key={index} className="rounded-xl bg-slate-50 dark:bg-slate-700/50 overflow-hidden">
                            <div className="p-3">
                              <div className="flex items-center gap-2 text-xs mb-1">
                                <SourceLogo source={mention.source} />
                                <span className="font-semibold text-slate-900 dark:text-white">{mention.source}</span>
                                <span className="text-slate-400">•</span>
                                <span className="text-slate-500 dark:text-slate-400">{mention.timestamp}</span>
                              </div>
                              <p className="font-medium text-slate-900 dark:text-white text-sm leading-snug line-clamp-2">
                                {mention.title}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </GatedSection>
                  )}
                </div>

              {/* Historical Sentiment - Gated */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-10 border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Sentiment History</h2>
                  <GatedSection
                    title="Unlock Historical Data"
                    description="Track how sentiment has evolved over time"
                  >
                    <div className="space-y-4">
                      {/* Chart visualization */}
                      <div className="h-40 flex items-end justify-between gap-1 px-1">
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, i) => {
                          const height = 35 + Math.sin(i * 0.8) * 25 + Math.random() * 20;
                          const isPositive = height > 50;
                          return (
                            <div key={month} className="flex-1 flex flex-col items-center gap-1">
                              <div
                                className={`w-full rounded-t transition-all ${isPositive ? 'bg-green-500' : 'bg-amber-500'}`}
                                style={{ height: `${height}%` }}
                              />
                              <span className="text-[9px] text-slate-400">{month.slice(0, 1)}</span>
                            </div>
                          );
                        })}
                      </div>
                      {/* Legend */}
                      <div className="flex items-center justify-center gap-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-sm bg-green-500" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">Bullish</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-sm bg-amber-500" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">Neutral</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-sm bg-red-500" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">Bearish</span>
                        </div>
                      </div>
                    </div>
                </GatedSection>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-10 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-3">Full Intelligence</h3>
                <p className="text-slate-400 mb-8">
                  Get real-time alerts, historical data, and AI-powered insights for {company.name}.
                </p>
                <Link to="/pricing">
                  <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 rounded-full py-6">
                    Start Free Trial
                  </Button>
                </Link>
              </div>

              {/* Related Companies */}
              {relatedCompanies.length > 0 && (
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                    Similar Companies
                  </h3>
                  <div className="space-y-4">
                    {relatedCompanies.map((related) => (
                      <Link
                        key={related.id}
                        to={`/bitcoin-companies/${related.slug}`}
                        className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <CompanyLogo company={related} size="sm" />
                          <div>
                            <div className="font-medium text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                              {related.name}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                              {formatNumber(related.weeklyMentions)} mentions
                            </div>
                          </div>
                        </div>
                        <div
                          className="text-sm font-semibold"
                          style={{ color: getNarrativeColor(related.narrativeScore) }}
                        >
                          {related.narrativeScore}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
                  Explore More
                </h3>
                <div className="space-y-2">
                  <Link
                    to="/bitcoin-companies"
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    <span>All Companies</span>
                    <span>→</span>
                  </Link>
                  <Link
                    to="/bitcoin-market-sentiment"
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    <span>Market Sentiment</span>
                    <span>→</span>
                  </Link>
                  <Link
                    to="/bitcoin-media-research"
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    <span>Media Research</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
