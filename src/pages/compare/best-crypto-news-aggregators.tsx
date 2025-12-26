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
    description: 'AI-powered media intelligence platform that goes beyond aggregation to provide sentiment analysis, narrative tracking, and Fear & Greed Index.',
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
        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 sm:py-20 lg:py-28 border-b border-black/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <Link to="/compare/best-crypto-sentiment-tools" className="text-sm text-orange-600 hover:text-orange-700">
                  ← Back to Tool Comparisons
                </Link>
              </nav>

              <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-600 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Newspaper className="w-4 h-4" />
                Updated December 2025
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-6">
                Best Crypto News Aggregators & Sources
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-black/60 mb-8 max-w-3xl mx-auto">
                Compare the top platforms for crypto news, from simple aggregators to
                AI-powered sentiment analysis tools.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Comparison */}
        <section className="py-12 sm:py-16 lg:py-20 bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-white">
              Quick Comparison
            </h2>
            <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
              Here's how the top crypto news platforms stack up
            </p>

            <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-2xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-4 px-4 font-semibold text-white">Platform</th>
                    <th className="text-left py-4 px-4 font-semibold text-white">Best For</th>
                    <th className="text-center py-4 px-4 font-semibold text-white">Sources</th>
                    <th className="text-center py-4 px-4 font-semibold text-white">Sentiment</th>
                    <th className="text-center py-4 px-4 font-semibold text-white">Alerts</th>
                    <th className="text-center py-4 px-4 font-semibold text-white">Pricing</th>
                  </tr>
                </thead>
                <tbody className="text-white/60">
                  <tr className="border-b border-white/10 bg-orange-500/10">
                    <td className="py-4 px-4 font-semibold text-orange-400">Perception</td>
                    <td className="py-4 px-4">Sentiment trading</td>
                    <td className="py-4 px-4 text-center">650+</td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-orange-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-orange-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free / $49+</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 font-semibold text-white">CryptoPanic</td>
                    <td className="py-4 px-4">Quick scanning</td>
                    <td className="py-4 px-4 text-center">100+</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-white/30 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-orange-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free / $8+</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 font-semibold text-white">CoinDesk</td>
                    <td className="py-4 px-4">Deep journalism</td>
                    <td className="py-4 px-4 text-center">Original</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-white/30 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-orange-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 font-semibold text-white">The Block</td>
                    <td className="py-4 px-4">Research/Data</td>
                    <td className="py-4 px-4 text-center">Original</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-white/30 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-orange-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free / $199+</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 font-semibold text-white">Cointelegraph</td>
                    <td className="py-4 px-4">High volume</td>
                    <td className="py-4 px-4 text-center">Original</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-white/30 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-orange-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free</td>
                  </tr>
                  <tr className="border-b border-white/10">
                    <td className="py-4 px-4 font-semibold text-white">Decrypt</td>
                    <td className="py-4 px-4">Beginners</td>
                    <td className="py-4 px-4 text-center">Original</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-white/30 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-orange-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Detailed Reviews */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#F0EEE6]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-black">
              Detailed Reviews
            </h2>
            <p className="text-black/60 text-center mb-12 max-w-2xl mx-auto">
              In-depth look at each platform's strengths and weaknesses
            </p>

            <div className="space-y-8">
              {aggregators.map((agg, index) => (
                <div
                  key={agg.name}
                  className={`rounded-2xl p-6 sm:p-8 ${
                    index === 0
                      ? 'bg-orange-500/10 border-2 border-orange-500/30'
                      : 'bg-white/50 border border-black/10'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-black">{agg.name}</h3>
                        {index === 0 && (
                          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            Editor's Choice
                          </span>
                        )}
                        <div className="flex items-center gap-1 ml-auto">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < agg.rating ? 'text-orange-500 fill-orange-500' : 'text-black/20'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-black/60 mb-4">{agg.description}</p>

                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="w-4 h-4 text-black/40" />
                          <span className="text-black/60">Sources: {agg.sources}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-black/40" />
                          <span className="text-black/60">{agg.pricing}</span>
                        </div>
                      </div>

                      <p className="text-sm mb-4">
                        <strong className="text-black">Best for:</strong>{' '}
                        <span className="text-black/60">{agg.bestFor}</span>
                      </p>
                    </div>

                    <div className="lg:w-80 space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-orange-600 mb-2 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Strengths
                        </h4>
                        <ul className="text-sm text-black/60 space-y-1">
                          {agg.features.slice(0, 4).map((f, i) => (
                            <li key={i}>• {f}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-black/50 mb-2 flex items-center gap-1">
                          <X className="w-4 h-4" /> Limitations
                        </h4>
                        <ul className="text-sm text-black/60 space-y-1">
                          {agg.limitations.map((l, i) => (
                            <li key={i}>• {l}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-black/10 flex flex-col sm:flex-row gap-4">
                    {index === 0 ? (
                      <Button className="bg-black hover:bg-black/90 text-white rounded-full" asChild>
                        <a href="https://app.perception.to/auth/sign-up">
                          Try Free <ArrowRight className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" className="rounded-full border-black/20 hover:border-black/30" asChild>
                        <a href={agg.website} target="_blank" rel="noopener noreferrer">
                          Visit {agg.name} <ArrowRight className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Types of Users */}
        <section className="py-12 sm:py-16 lg:py-20 bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 text-white">
              Which Platform is Right for You?
            </h2>
            <p className="text-white/60 text-center mb-12 max-w-2xl mx-auto">
              Different platforms serve different needs
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">Active Traders</h3>
                <p className="text-sm text-white/60 mb-4">
                  Need real-time sentiment data and alerts for market-moving news.
                </p>
                <p className="text-sm font-medium text-orange-400">Recommended: Perception</p>
              </div>

              <div className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white/70" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">Casual Investors</h3>
                <p className="text-sm text-white/60 mb-4">
                  Want to stay informed without spending hours reading news.
                </p>
                <p className="text-sm font-medium text-white/70">Recommended: CryptoPanic</p>
              </div>

              <div className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Filter className="w-6 h-6 text-white/70" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">Researchers</h3>
                <p className="text-sm text-white/60 mb-4">
                  Need deep analysis, data, and institutional-grade research.
                </p>
                <p className="text-sm font-medium text-white/70">Recommended: The Block</p>
              </div>

              <div className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mb-4">
                  <Newspaper className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">Journalists</h3>
                <p className="text-sm text-white/60 mb-4">
                  Need comprehensive coverage and narrative tracking for stories.
                </p>
                <p className="text-sm font-medium text-orange-400">Recommended: Perception + CoinDesk</p>
              </div>

              <div className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white/70" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">Beginners</h3>
                <p className="text-sm text-white/60 mb-4">
                  New to crypto and need accessible, educational content.
                </p>
                <p className="text-sm font-medium text-white/70">Recommended: Decrypt</p>
              </div>

              <div className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-white/70" />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">Maximizers</h3>
                <p className="text-sm text-white/60 mb-4">
                  Want to consume as much news as possible from multiple sources.
                </p>
                <p className="text-sm font-medium text-white/70">Recommended: Cointelegraph + others</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#F0EEE6]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12 text-black">
              Frequently Asked Questions
            </h2>

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
                  a: 'Yes, using multiple sources can give you a more complete picture. However, a good aggregator like Perception already pulls from 650+ sources, so you get comprehensive coverage in one place.'
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="rounded-2xl p-5 sm:p-6 bg-white/50 border border-black/10"
                >
                  <h3 className="font-bold mb-2 text-black">{faq.q}</h3>
                  <p className="text-black/60 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 lg:py-20 bg-black">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
              Go Beyond News Aggregation
            </h2>
            <p className="text-lg text-white/60 mb-8 max-w-2xl mx-auto">
              See how AI-powered sentiment analysis can give you an edge that simple
              news reading can't provide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white hover:bg-white/90 text-black px-8 py-6 text-lg rounded-full"
                asChild
              >
                <a href="https://app.perception.to/auth/sign-up">
                  Try Perception Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg rounded-full border-white/20 text-white hover:bg-white/10"
                asChild
              >
                <Link to="/bitcoin-fear-greed-index">
                  View Live Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-12 sm:py-16 bg-[#F0EEE6]">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-center mb-8 text-black">Related Resources</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                to="/compare/best-crypto-sentiment-tools"
                className="rounded-xl p-4 bg-white/50 border border-black/10 hover:border-orange-500/30 transition-colors text-center"
              >
                <p className="font-semibold text-black">Sentiment Tools</p>
                <p className="text-sm text-black/60">Compare analysis platforms</p>
              </Link>
              <Link
                to="/learn/what-is-crypto-sentiment-analysis"
                className="rounded-xl p-4 bg-white/50 border border-black/10 hover:border-orange-500/30 transition-colors text-center"
              >
                <p className="font-semibold text-black">Sentiment Guide</p>
                <p className="text-sm text-black/60">Learn the fundamentals</p>
              </Link>
              <Link
                to="/bitcoin-media-research"
                className="rounded-xl p-4 bg-white/50 border border-black/10 hover:border-orange-500/30 transition-colors text-center"
              >
                <p className="font-semibold text-black">Media Research</p>
                <p className="text-sm text-black/60">Explore media coverage</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
