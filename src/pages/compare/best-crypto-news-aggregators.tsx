import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Check,
  X,
  ArrowRight,
  Newspaper,
  Zap,
  Globe,
  Filter,
  Bell,
  BarChart3,
  Star,
  Clock,
  DollarSign
} from 'lucide-react';
import AsciiBlob from '@/components/AsciiBlob';

interface Aggregator {
  name: string;
  description: string;
  bestFor: string;
  sources: string;
  features: string[];
  limitations: string[];
  pricing: string;
  website: string;
  rating: number;
}

const aggregators: Aggregator[] = [
  {
    name: 'Perception',
    description: 'Advanced media intelligence platform that goes beyond aggregation to provide sentiment analysis, narrative tracking, and Fear & Greed Index.',
    bestFor: 'Traders who want sentiment analysis with their news',
    sources: '650+ crypto media sources',
    features: [
      'Real-time Fear & Greed Index',
      'AI sentiment analysis on every article',
      'Narrative and trend detection',
      'Custom alerts for sentiment shifts',
      'Historical sentiment data',
      'Media research tools',
    ],
    limitations: [
      'Focused on crypto/Bitcoin only',
      'Premium features require subscription',
    ],
    pricing: 'Free tier available, Pro from $49/mo',
    website: 'https://perception.to',
    rating: 5,
  },
  {
    name: 'CryptoPanic',
    description: 'Popular news aggregator with social voting on articles. Community-driven approach to surfacing important news.',
    bestFor: 'Quick news scanning with community input',
    sources: '100+ news sources',
    features: [
      'Community voting on articles',
      'Portfolio-based news filtering',
      'Free API access',
      'Mobile app available',
      'Price impact indicators',
    ],
    limitations: [
      'No sentiment analysis',
      'Quality varies with community votes',
      'Limited filtering options',
    ],
    pricing: 'Free with ads, Pro from $8/mo',
    website: 'https://cryptopanic.com',
    rating: 4,
  },
  {
    name: 'CoinDesk',
    description: 'Leading crypto news publication with original journalism, market data, and events coverage.',
    bestFor: 'In-depth journalism and analysis',
    sources: 'Original content + wire services',
    features: [
      'Original investigative journalism',
      'Consensus conference coverage',
      'Market data integration',
      'Newsletter options',
      'Podcast content',
    ],
    limitations: [
      'Not a true aggregator (mostly original)',
      'Can be slower than aggregators',
      'Premium content paywalled',
    ],
    pricing: 'Free with premium options',
    website: 'https://coindesk.com',
    rating: 4,
  },
  {
    name: 'The Block',
    description: 'Research-focused crypto publication with data dashboards, market analysis, and breaking news.',
    bestFor: 'Institutional-grade research and data',
    sources: 'Original content + curated sources',
    features: [
      'Data dashboards',
      'Research reports',
      'Breaking news alerts',
      'Market analysis',
      'Funding/M&A tracking',
    ],
    limitations: [
      'Research behind paywall',
      'More institutional focus',
      'Not a traditional aggregator',
    ],
    pricing: 'Free tier, Research from $199/mo',
    website: 'https://theblock.co',
    rating: 4,
  },
  {
    name: 'Cointelegraph',
    description: 'High-volume crypto news site with broad coverage across all crypto topics and markets.',
    bestFor: 'Comprehensive crypto news coverage',
    sources: 'Original content + staff writers',
    features: [
      'High article volume',
      'Multiple language support',
      'Magazine publication',
      'Video content',
      'Price data integration',
    ],
    limitations: [
      'Quality can be inconsistent',
      'Heavy ad presence',
      'Not an aggregator',
    ],
    pricing: 'Free',
    website: 'https://cointelegraph.com',
    rating: 3,
  },
  {
    name: 'Decrypt',
    description: 'Accessible crypto news for mainstream audiences with educational focus and clear explanations.',
    bestFor: 'Beginners and mainstream readers',
    sources: 'Original content',
    features: [
      'Beginner-friendly explanations',
      'Learn section for education',
      'Clean reading experience',
      'Newsletter options',
      'Web3 app coverage',
    ],
    limitations: [
      'Less technical depth',
      'Not an aggregator',
      'Fewer breaking news',
    ],
    pricing: 'Free',
    website: 'https://decrypt.co',
    rating: 4,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${
          star <= rating
            ? 'text-orange-400 fill-orange-400'
            : 'text-black/20'
        }`}
      />
    ))}
  </div>
);

export default function BestCryptoNewsAggregatorsPage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Crypto News Aggregators & Sources 2025',
    description: 'Compare the best crypto news aggregators and sources. Find the right platform for breaking news, sentiment analysis, and market intelligence.',
    author: {
      '@type': 'Organization',
      name: 'Perception'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Perception',
      url: 'https://perception.to'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a crypto news aggregator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A crypto news aggregator is a platform that collects and displays news from multiple cryptocurrency news sources in one place. This saves time compared to visiting individual news sites and helps you stay informed about market-moving events.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which crypto news aggregator is best for trading?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For trading, Perception is recommended because it combines news aggregation with AI sentiment analysis, showing you not just what news is happening but how it is affecting market sentiment in real-time.'
        }
      },
      {
        '@type': 'Question',
        name: 'Are crypto news aggregators free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most crypto news aggregators offer free tiers with basic features. Premium features like sentiment analysis, custom alerts, and API access typically require paid subscriptions ranging from $8 to $200+ per month depending on the platform.'
        }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Best Crypto News Aggregators & Sources 2025 | Complete Comparison"
        description="Compare the best crypto news aggregators for traders and investors. Find platforms with real-time news, sentiment analysis, and custom alerts."
        keywords={[
          'best crypto news aggregator',
          'crypto news sources',
          'bitcoin news aggregator',
          'cryptocurrency news sites',
          'crypto news app',
          'best crypto news site'
        ]}
        url="https://perception.to/compare/best-crypto-news-aggregators"
      >
        <script type="application/ld+json">
          {JSON.stringify(comparisonSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </SEO>

      <div className="min-h-screen bg-[#F0EEE6]">
        {/* Hero Section - Split Layout */}
        <section className="pt-32 pb-24 px-6 sm:px-16 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left - ASCII Art Visual */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden">
                  <AsciiBlob />
                  {/* Overlay with comparison info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl font-bold text-white">6</div>
                          <div className="text-white/60 text-sm">Platforms Compared</div>
                        </div>
                        <div className="flex gap-2">
                          <Newspaper className="w-4 h-4 text-orange-400" />
                          <Globe className="w-4 h-4 text-orange-400" />
                          <Zap className="w-4 h-4 text-orange-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div className="w-full lg:w-1/2">
                <div className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-2 text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  Updated January 2025
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-black mb-6">
                  Best Crypto{' '}
                  <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>News</em>{' '}
                  Aggregators
                </h1>

                <p className="text-lg sm:text-xl text-black/70 font-light leading-relaxed mb-8">
                  Compare the top platforms for crypto news, from simple aggregators to
                  Advanced sentiment analysis tools.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-black/90 rounded-2xl px-8 py-6 text-base font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a href="/book-a-call">
                      Book a Demo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/80 text-black hover:bg-white rounded-2xl px-8 py-6 text-base font-semibold border-2 border-black/20 hover:border-black/30 transition-all duration-300"
                    asChild
                  >
                    <a href="#comparison">
                      See comparison
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Picks */}
        <section className="py-16 px-6 sm:px-16 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-black mb-8 text-center">Quick Picks</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black rounded-2xl p-6 text-white">
                <div className="text-sm text-white/60 mb-2">Best Overall</div>
                <div className="font-semibold text-xl mb-1">Perception</div>
                <div className="text-sm text-orange-400">650+ media sources + AI</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-black/10">
                <div className="text-sm text-black/60 mb-2">Best Free Option</div>
                <div className="font-semibold text-xl text-black mb-1">CryptoPanic</div>
                <div className="text-sm text-black/50">Community voting</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-black/10">
                <div className="text-sm text-black/60 mb-2">Best for Research</div>
                <div className="font-semibold text-xl text-black mb-1">The Block</div>
                <div className="text-sm text-black/50">Data dashboards</div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-black/10">
                <div className="text-sm text-black/60 mb-2">Best for Beginners</div>
                <div className="font-semibold text-xl text-black mb-1">Decrypt</div>
                <div className="text-sm text-black/50">Educational content</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Comparison Table - Black Section */}
        <section id="comparison" className="py-24 px-6 sm:px-16 lg:px-32 bg-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-medium text-white text-center mb-4">
              Feature{' '}
              <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Comparison</em>
            </h2>
            <p className="text-center text-white/60 mb-16 max-w-2xl mx-auto">
              Side-by-side comparison of what each platform offers
            </p>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 px-4 font-semibold text-white">Platform</th>
                    <th className="text-left py-4 px-4 font-semibold text-white">Best For</th>
                    <th className="text-center py-4 px-4 font-semibold text-white">Sources</th>
                    <th className="text-center py-4 px-4 font-semibold text-white">Sentiment</th>
                    <th className="text-center py-4 px-4 font-semibold text-white">Alerts</th>
                    <th className="text-center py-4 px-4 font-semibold text-white">Pricing</th>
                  </tr>
                </thead>
                <tbody className="text-white/60">
                  <tr className="border-b border-white/10 bg-white/5">
                    <td className="py-4 px-4">
                      <span className="font-semibold text-orange-400">Perception</span>
                      <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">Our Pick</span>
                    </td>
                    <td className="py-4 px-4">Sentiment trading</td>
                    <td className="py-4 px-4 text-center">650+</td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free / $49+</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 font-semibold text-white">CryptoPanic</td>
                    <td className="py-4 px-4">Quick scanning</td>
                    <td className="py-4 px-4 text-center">100+</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-white/30 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free / $8+</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 font-semibold text-white">CoinDesk</td>
                    <td className="py-4 px-4">Deep journalism</td>
                    <td className="py-4 px-4 text-center">Original</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-white/30 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 font-semibold text-white">The Block</td>
                    <td className="py-4 px-4">Research/Data</td>
                    <td className="py-4 px-4 text-center">Original</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-white/30 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free / $199+</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 font-semibold text-white">Cointelegraph</td>
                    <td className="py-4 px-4">High volume</td>
                    <td className="py-4 px-4 text-center">Original</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-white/30 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 font-semibold text-white">Decrypt</td>
                    <td className="py-4 px-4">Beginners</td>
                    <td className="py-4 px-4 text-center">Original</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-white/30 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-emerald-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Detailed Reviews - Cream Section */}
        <section className="py-24 px-6 sm:px-16 lg:px-32">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-medium text-black text-center mb-4">
              Detailed{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Reviews</em>
            </h2>
            <p className="text-center text-black/60 mb-16 max-w-2xl mx-auto">
              In-depth look at each platform's strengths and weaknesses
            </p>

            <div className="space-y-8">
              {aggregators.map((agg, index) => (
                <div
                  key={agg.name}
                  className={`rounded-2xl p-8 ${
                    index === 0
                      ? 'bg-black text-white'
                      : 'bg-white border border-black/10'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`text-2xl font-semibold ${index === 0 ? 'text-white' : 'text-black'}`}>
                              {index + 1}. {agg.name}
                            </h3>
                            {index === 0 && (
                              <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">Editor's Choice</span>
                            )}
                          </div>
                          <StarRating rating={agg.rating} />
                        </div>
                      </div>

                      <p className={`mb-6 ${index === 0 ? 'text-white/70' : 'text-black/70'}`}>
                        {agg.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className={`w-4 h-4 ${index === 0 ? 'text-white/60' : 'text-black/40'}`} />
                          <span className={index === 0 ? 'text-white/70' : 'text-black/70'}>Sources: {agg.sources}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className={`w-4 h-4 ${index === 0 ? 'text-white/60' : 'text-black/40'}`} />
                          <span className={index === 0 ? 'text-white/70' : 'text-black/70'}>{agg.pricing}</span>
                        </div>
                      </div>

                      <p className="text-sm mb-6">
                        <strong className={index === 0 ? 'text-white' : 'text-black'}>Best for:</strong>{' '}
                        <span className={index === 0 ? 'text-white/70' : 'text-black/70'}>{agg.bestFor}</span>
                      </p>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <h4 className={`font-semibold mb-3 flex items-center gap-2 ${index === 0 ? 'text-emerald-400' : 'text-emerald-600'}`}>
                            <Check className="w-4 h-4" /> Strengths
                          </h4>
                          <ul className="space-y-2">
                            {agg.features.slice(0, 4).map((f) => (
                              <li key={f} className={`text-sm flex items-start gap-2 ${index === 0 ? 'text-white/70' : 'text-black/70'}`}>
                                <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${index === 0 ? 'text-emerald-400' : 'text-emerald-500'}`} />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className={`font-semibold mb-3 flex items-center gap-2 ${index === 0 ? 'text-white/60' : 'text-black/50'}`}>
                            <X className="w-4 h-4" /> Limitations
                          </h4>
                          <ul className="space-y-2">
                            {agg.limitations.map((l) => (
                              <li key={l} className={`text-sm flex items-start gap-2 ${index === 0 ? 'text-white/60' : 'text-black/60'}`}>
                                <X className={`w-4 h-4 flex-shrink-0 mt-0.5 ${index === 0 ? 'text-white/40' : 'text-black/30'}`} />
                                {l}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - CTA */}
                    <div className="lg:w-64 flex-shrink-0">
                      <div className={`rounded-xl p-6 text-center ${index === 0 ? 'bg-white/10' : 'bg-black/5'}`}>
                        <div className={`text-2xl font-bold mb-1 ${index === 0 ? 'text-white' : 'text-black'}`}>
                          {agg.pricing.split(',')[0]}
                        </div>
                        <div className={`text-sm mb-4 ${index === 0 ? 'text-white/60' : 'text-black/60'}`}>
                          {agg.pricing.includes(',') ? agg.pricing.split(',')[1].trim() : ''}
                        </div>
                        <Button
                          className={`w-full rounded-xl ${
                            index === 0
                              ? 'bg-white text-black hover:bg-white/90'
                              : 'bg-black text-white hover:bg-black/90'
                          }`}
                          asChild
                        >
                          <a href={index === 0 ? '/book-a-call' : agg.website} target={index === 0 ? undefined : '_blank'} rel={index === 0 ? undefined : 'noopener noreferrer'}>
                            {index === 0 ? 'Try Free' : 'Visit Site'}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Which Platform is Right - Black Section */}
        <section className="py-24 px-6 sm:px-16 lg:px-32 bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-medium text-white text-center mb-4">
              Which Platform is{' '}
              <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Right</em>{' '}
              for You?
            </h2>
            <p className="text-center text-white/60 mb-16">
              The best tool depends on your use case
            </p>

            <div className="space-y-6">
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="font-semibold text-white text-lg mb-3 flex items-center gap-3">
                  <BarChart3 className="w-6 h-6 text-orange-400" />
                  Active Traders
                </h3>
                <p className="text-white/70">
                  Need real-time sentiment data and alerts for market-moving news.
                  <strong className="text-white"> Recommended: Perception</strong> for Advanced sentiment analysis.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="font-semibold text-white text-lg mb-3 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-orange-400" />
                  Casual Investors
                </h3>
                <p className="text-white/70">
                  Want to stay informed without spending hours reading news.
                  <strong className="text-white"> Recommended: CryptoPanic</strong> for quick community-curated updates.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="font-semibold text-white text-lg mb-3 flex items-center gap-3">
                  <Filter className="w-6 h-6 text-orange-400" />
                  Researchers
                </h3>
                <p className="text-white/70">
                  Need deep analysis, data, and institutional-grade research.
                  <strong className="text-white"> Recommended: The Block</strong> for comprehensive data dashboards.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="font-semibold text-white text-lg mb-3 flex items-center gap-3">
                  <Newspaper className="w-6 h-6 text-orange-400" />
                  Journalists
                </h3>
                <p className="text-white/70">
                  Need comprehensive coverage and narrative tracking for stories.
                  <strong className="text-white"> Recommended: Perception + CoinDesk</strong> for full market context.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="font-semibold text-white text-lg mb-3 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-orange-400" />
                  Beginners
                </h3>
                <p className="text-white/70">
                  New to crypto and need accessible, educational content.
                  <strong className="text-white"> Recommended: Decrypt</strong> for beginner-friendly explanations.
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="font-semibold text-white text-lg mb-3 flex items-center gap-3">
                  <Bell className="w-6 h-6 text-orange-400" />
                  News Maximizers
                </h3>
                <p className="text-white/70">
                  Want to consume as much news as possible from multiple sources.
                  <strong className="text-white"> Recommended: Cointelegraph</strong> for high-volume coverage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ - Cream Section */}
        <section className="py-24 px-6 sm:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-medium text-black text-center mb-4">
              Frequently Asked{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Questions</em>
            </h2>
            <p className="text-center text-black/60 mb-16">
              Common questions about crypto news aggregators
            </p>

            <div className="space-y-4">
              {[
                {
                  q: 'What is a crypto news aggregator?',
                  a: 'A crypto news aggregator is a platform that collects and displays news from multiple cryptocurrency news sources in one place. This saves time compared to visiting individual news sites and helps you stay informed about market-moving events.'
                },
                {
                  q: 'Which crypto news aggregator is best for trading?',
                  a: 'For trading, Perception is recommended because it combines news aggregation with AI sentiment analysis, showing you not just what news is happening but how it is affecting market sentiment in real-time.'
                },
                {
                  q: 'Are crypto news aggregators free?',
                  a: 'Most crypto news aggregators offer free tiers with basic features. Premium features like sentiment analysis, custom alerts, and API access typically require paid subscriptions ranging from $8 to $200+ per month depending on the platform.'
                },
                {
                  q: 'How do I know if news is positive or negative for price?',
                  a: 'This is where sentiment analysis tools like Perception help. They use AI to analyze news content and determine whether it is bullish, bearish, or neutral. This saves you from having to interpret every article yourself.'
                },
                {
                  q: 'Should I use multiple news sources?',
                  a: 'Yes, using multiple sources can give you a more complete picture. However, a good aggregator like Perception already pulls from 450+ sources, so you get comprehensive coverage in one place.'
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="bg-white rounded-2xl p-6 border border-black/10"
                >
                  <h3 className="text-lg font-semibold text-black mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-black/70">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Black Section */}
        <section className="py-24 px-6 sm:px-16 lg:px-32 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-medium text-white mb-6">
              Go beyond{' '}
              <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>news aggregation</em>
            </h2>
            <p className="text-xl text-white/60 mb-10">
              See how Advanced sentiment analysis can give you an edge that simple
              news reading can't provide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 rounded-2xl px-8 py-6 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="/book-a-call">
                  Book a Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-300"
                asChild
              >
                <Link to="/bitcoin-fear-greed-index">
                  See Live Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Related Links - Cream Section */}
        <section className="py-16 px-6 sm:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-black text-center mb-8">
              Related Comparisons
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link
                to="/compare/best-crypto-sentiment-tools"
                className="bg-white rounded-2xl p-6 border border-black/10 hover:border-black/30 transition-all duration-300 hover:shadow-lg group"
              >
                <h3 className="font-semibold text-black mb-2 group-hover:text-orange-500 transition-colors">Sentiment Tools</h3>
                <p className="text-sm text-black/60">Compare analysis platforms</p>
              </Link>
              <Link
                to="/learn/what-is-crypto-sentiment-analysis"
                className="bg-white rounded-2xl p-6 border border-black/10 hover:border-black/30 transition-all duration-300 hover:shadow-lg group"
              >
                <h3 className="font-semibold text-black mb-2 group-hover:text-orange-500 transition-colors">Sentiment Guide</h3>
                <p className="text-sm text-black/60">Learn the fundamentals</p>
              </Link>
              <Link
                to="/bitcoin-media-research"
                className="bg-white rounded-2xl p-6 border border-black/10 hover:border-black/30 transition-all duration-300 hover:shadow-lg group"
              >
                <h3 className="font-semibold text-black mb-2 group-hover:text-orange-500 transition-colors">Media Research</h3>
                <p className="text-sm text-black/60">Explore media coverage</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
