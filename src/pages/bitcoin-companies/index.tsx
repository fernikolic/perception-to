import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';
import {
  bitcoinCompanies,
  getNarrativeColor,
  formatNumber,
  getTrendingCompanies,
  getCountryFlag,
  type BitcoinCompany
} from '@/data/bitcoin-companies';
import { getCompanyMentionCount, getTotalMentionCount } from '@/data/company-mentions';

type SortField = 'weeklyMentions' | 'narrativeScore' | 'name' | 'trendPercentage';
type SectorFilter = 'all' | BitcoinCompany['sector'];

// Company Logo component with fallback
function CompanyLogo({ company, size = 'sm' }: { company: { name: string; logoUrl?: string }; size?: 'xs' | 'sm' | 'md' }) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-base'
  };

  const fallback = (
    <div className={`${sizeClasses[size]} rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-semibold text-slate-500 dark:text-slate-400`}>
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
      className={`${sizeClasses[size]} rounded-xl object-contain bg-white dark:bg-slate-700 p-1.5 border border-slate-200 dark:border-slate-600`}
      onError={() => setImgError(true)}
    />
  );
}

// Trend indicator (text only)
function TrendBadge({ direction, percentage }: { direction: 'up' | 'down' | 'stable'; percentage: number }) {
  if (direction === 'up') {
    return (
      <span className="px-2.5 py-1 rounded-full bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium">
        +{percentage}%
      </span>
    );
  }
  if (direction === 'down') {
    return (
      <span className="px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 text-xs font-medium">
        -{percentage}%
      </span>
    );
  }
  return (
    <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-xs font-medium">
      {percentage}%
    </span>
  );
}

export default function BitcoinCompaniesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState<SectorFilter>('all');
  const [sortField, setSortField] = useState<SortField>('weeklyMentions');

  const totalMentions = getTotalMentionCount();
  const trendingCompanies = getTrendingCompanies(5);

  const sectors: { value: SectorFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'treasury', label: 'Treasury' },
    { value: 'mining', label: 'Mining' },
    { value: 'exchange', label: 'Exchange' },
    { value: 'payments', label: 'Payments' },
    { value: 'etf', label: 'ETF' },
    { value: 'infrastructure', label: 'Infrastructure' },
    { value: 'media', label: 'Media' },
    { value: 'custody', label: 'Custody' }
  ];

  const filteredCompanies = useMemo(() => {
    let result = [...bitcoinCompanies];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        c => c.name.toLowerCase().includes(query) ||
             c.ticker?.toLowerCase().includes(query) ||
             c.sectorLabel.toLowerCase().includes(query)
      );
    }

    if (sectorFilter !== 'all') {
      result = result.filter(c => c.sector === sectorFilter);
    }

    result.sort((a, b) => {
      switch (sortField) {
        case 'weeklyMentions': return b.weeklyMentions - a.weeklyMentions;
        case 'narrativeScore': return b.narrativeScore - a.narrativeScore;
        case 'trendPercentage': return b.trendPercentage - a.trendPercentage;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

    return result;
  }, [searchQuery, sectorFilter, sortField]);

  // Structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Bitcoin Industry Companies - Narrative Intelligence",
    "description": "Track sentiment and coverage for major Bitcoin industry companies",
    "numberOfItems": bitcoinCompanies.length,
    "itemListElement": bitcoinCompanies.slice(0, 10).map((company, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Organization",
        "name": company.name,
        "description": company.shortDescription,
        "url": `https://perception.to/bitcoin-companies/${company.slug}`
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>Bitcoin Companies - Narrative Intelligence & Sentiment Tracking | Perception</title>
        <meta
          name="description"
          content={`Track sentiment, news coverage, and narratives for ${bitcoinCompanies.length}+ Bitcoin industry companies. Real-time intelligence from 450+ sources.`}
        />
        <meta property="og:title" content="Bitcoin Companies - Narrative Intelligence | Perception" />
        <meta property="og:description" content="Track what people are saying about Bitcoin industry companies. Real-time sentiment and narrative analysis." />
        <link rel="canonical" href="https://perception.to/bitcoin-companies" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
          {/* Hero Bento Grid */}
          <div className="grid lg:grid-cols-3 gap-4 mb-12">
            {/* Main Title Card with ASCII Art */}
            <div className="lg:col-span-2 relative rounded-3xl overflow-hidden min-h-[280px]" style={{ background: '#000000' }}>
              {/* ASCII Art Background */}
              <div className="absolute inset-0 opacity-30">
                <DelicateAsciiDots />
              </div>
              {/* Content Overlay */}
              <div className="relative z-10 p-10 h-full flex flex-col justify-between text-white">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                    Bitcoin Companies
                  </h1>
                  <p className="text-lg text-slate-300 max-w-lg">
                    The most talked about companies in the Bitcoin space right now.
                  </p>
                </div>
                <div className="flex flex-wrap gap-6 mt-8">
                  <div>
                    <div className="text-3xl font-bold">{formatNumber(totalMentions)}</div>
                    <div className="text-sm text-slate-400">Weekly mentions</div>
                  </div>
                  <div className="w-px bg-slate-700" />
                  <div>
                    <div className="text-3xl font-bold">{bitcoinCompanies.length}+</div>
                    <div className="text-sm text-slate-400">Companies</div>
                  </div>
                  <div className="w-px bg-slate-700" />
                  <div>
                    <div className="text-3xl font-bold">650+</div>
                    <div className="text-sm text-slate-400">Sources</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Trending Card */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-4">
                #1 Trending
              </div>
              {trendingCompanies[0] && (
                <Link to={`/bitcoin-companies/${trendingCompanies[0].slug}`} className="block group">
                  <div className="flex items-center gap-4 mb-4">
                    <CompanyLogo company={trendingCompanies[0]} size="md" />
                    <div>
                      <div className="font-semibold text-lg text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                        {trendingCompanies[0].name}
                      </div>
                      <div className="text-sm text-slate-500">{trendingCompanies[0].sectorLabel}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {getCompanyMentionCount(trendingCompanies[0].slug)}
                      </div>
                      <div className="text-xs text-slate-500">mentions this week</div>
                    </div>
                    <TrendBadge direction={trendingCompanies[0].trendDirection} percentage={trendingCompanies[0].trendPercentage} />
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Trending Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {trendingCompanies.slice(1, 5).map((company, index) => (
              <Link
                key={company.id}
                to={`/bitcoin-companies/${company.slug}`}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md transition-all group"
              >
                <div className="text-xs font-medium text-slate-400 mb-3">#{index + 2} Trending</div>
                <div className="flex items-center gap-3 mb-3">
                  <CompanyLogo company={company} size="sm" />
                  <span className="font-medium text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">{company.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {getCompanyMentionCount(company.slug)} mentions
                  </span>
                  <TrendBadge direction={company.trendDirection} percentage={company.trendPercentage} />
                </div>
              </Link>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Input
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 pl-4"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {sectors.map((sector) => (
                <button
                  key={sector.value}
                  onClick={() => setSectorFilter(sector.value)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    sectorFilter === sector.value
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                >
                  {sector.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 mb-8 text-sm">
            <span className="text-slate-500 dark:text-slate-400">Sort by:</span>
            <button
              onClick={() => setSortField('weeklyMentions')}
              className={`px-3 py-1.5 rounded-full ${sortField === 'weeklyMentions' ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Mentions
            </button>
            <button
              onClick={() => setSortField('narrativeScore')}
              className={`px-3 py-1.5 rounded-full ${sortField === 'narrativeScore' ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Sentiment
            </button>
            <button
              onClick={() => setSortField('trendPercentage')}
              className={`px-3 py-1.5 rounded-full ${sortField === 'trendPercentage' ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
            >
              Trending
            </button>
          </div>

          {/* Results count */}
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-6">
            {filteredCompanies.length} companies
          </div>

          {/* Companies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {filteredCompanies.map((company) => (
              <Link
                key={company.id}
                to={`/bitcoin-companies/${company.slug}`}
                className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <CompanyLogo company={company} size="md" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
                          {company.name}
                        </h3>
                        {company.ticker && (
                          <span className="text-xs font-mono text-slate-400">
                            {company.ticker}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <span>{company.sectorLabel}</span>
                        <span className="text-slate-300 dark:text-slate-600">|</span>
                        <span>{getCountryFlag(company.countryCode)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-2xl font-bold"
                      style={{ color: getNarrativeColor(company.narrativeScore) }}
                    >
                      {company.narrativeScore}
                    </div>
                    <div className="text-xs text-slate-400">sentiment</div>
                  </div>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 mb-5 line-clamp-2">
                  {company.shortDescription}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-700">
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {getCompanyMentionCount(company.slug)} mentions
                  </div>
                  <TrendBadge direction={company.trendDirection} percentage={company.trendPercentage} />
                </div>
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-slate-900 dark:bg-slate-800 rounded-3xl p-16 text-center border border-slate-700">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Track Any Company
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
              Get real-time alerts, historical sentiment data, and intelligent insights
              for the companies that matter to you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/pricing">
                <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 rounded-full px-10">
                  Book a Demo
                </Button>
              </Link>
              <Link to="/book-a-call">
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 rounded-full px-10">
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* SEO Content */}
          <div className="mt-20 max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Bitcoin Industry Narrative Intelligence
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              Understanding what people are saying about Bitcoin companies is crucial for investors,
              journalists, and industry professionals. Perception tracks coverage and sentiment across
              650+ curated sources including news outlets, social media, podcasts, and research reports.
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Our narrative intelligence platform monitors discussions around {bitcoinCompanies.length}+ companies
              including corporate treasury leaders like Strategy and Tesla, mining operations like Marathon
              and Riot, exchanges like Coinbase, payment companies like Block and Strike, and ETF providers
              like BlackRock and Fidelity.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
