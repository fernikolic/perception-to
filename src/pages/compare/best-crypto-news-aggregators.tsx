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

      <div className="min-h-screen bg-background relative">
        {/* Background gradients */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),rgba(59,130,246,0)_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),rgba(249,115,22,0)_50%)]" />
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-12 sm:py-20 lg:py-28 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <Link to="/compare/best-crypto-sentiment-tools" className="text-sm text-orange-600 hover:text-orange-700 dark:text-orange-500">
                  ← Back to Tool Comparisons
                </Link>
              </nav>

              <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <Newspaper className="w-4 h-4" />
                Updated December 2025
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-foreground mb-6">
                Best Crypto News Aggregators & Sources
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Compare the top platforms for crypto news, from simple aggregators to
                AI-powered sentiment analysis tools.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Comparison */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
              Quick Comparison
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Here's how the top crypto news platforms stack up
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-4 px-4 font-semibold">Platform</th>
                    <th className="text-left py-4 px-4 font-semibold">Best For</th>
                    <th className="text-center py-4 px-4 font-semibold">Sources</th>
                    <th className="text-center py-4 px-4 font-semibold">Sentiment</th>
                    <th className="text-center py-4 px-4 font-semibold">Alerts</th>
                    <th className="text-center py-4 px-4 font-semibold">Pricing</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-slate-200 dark:border-slate-700 bg-orange-500/5">
                    <td className="py-4 px-4 font-semibold text-foreground">Perception</td>
                    <td className="py-4 px-4">Sentiment trading</td>
                    <td className="py-4 px-4 text-center">650+</td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free / $49+</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-semibold text-foreground">CryptoPanic</td>
                    <td className="py-4 px-4">Quick scanning</td>
                    <td className="py-4 px-4 text-center">100+</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free / $8+</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-semibold text-foreground">CoinDesk</td>
                    <td className="py-4 px-4">Deep journalism</td>
                    <td className="py-4 px-4 text-center">Original</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-semibold text-foreground">The Block</td>
                    <td className="py-4 px-4">Research/Data</td>
                    <td className="py-4 px-4 text-center">Original</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free / $199+</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-semibold text-foreground">Cointelegraph</td>
                    <td className="py-4 px-4">High volume</td>
                    <td className="py-4 px-4 text-center">Original</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-semibold text-foreground">Decrypt</td>
                    <td className="py-4 px-4">Beginners</td>
                    <td className="py-4 px-4 text-center">Original</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center">Free</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Detailed Reviews */}
        <section className="py-12 sm:py-16 lg:py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
              Detailed Reviews
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              In-depth look at each platform's strengths and weaknesses
            </p>

            <div className="space-y-8">
              {aggregators.map((agg, index) => (
                <div
                  key={agg.name}
                  className={`rounded-xl sm:rounded-2xl p-6 sm:p-8 bg-gradient-to-br ${
                    index === 0
                      ? 'from-orange-500/15 via-slate-600/10 to-zinc-700/15 border-orange-500/30'
                      : 'from-slate-500/10 via-blue-600/5 to-neutral-700/10'
                  } border border-white/10`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">{agg.name}</h3>
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
                                i < agg.rating ? 'text-yellow-500 fill-yellow-500' : 'text-slate-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">{agg.description}</p>

                      <div className="grid sm:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Sources: {agg.sources}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{agg.pricing}</span>
                        </div>
                      </div>

                      <p className="text-sm mb-4">
                        <strong className="text-foreground">Best for:</strong>{' '}
                        <span className="text-muted-foreground">{agg.bestFor}</span>
                      </p>
                    </div>

                    <div className="lg:w-80 space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-green-600 dark:text-green-400 mb-2 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Strengths
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {agg.features.slice(0, 4).map((f, i) => (
                            <li key={i}>• {f}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-red-600 dark:text-red-400 mb-2 flex items-center gap-1">
                          <X className="w-4 h-4" /> Limitations
                        </h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {agg.limitations.map((l, i) => (
                            <li key={i}>• {l}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                    {index === 0 ? (
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
                        <a href="https://app.perception.to/auth/sign-up">
                          Try Free <ArrowRight className="ml-2 w-4 h-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" asChild>
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
        <section className="py-12 sm:py-16 lg:py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
              Which Platform is Right for You?
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Different platforms serve different needs
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-xl sm:rounded-2xl p-6 bg-gradient-to-br from-orange-500/15 via-slate-600/10 to-zinc-700/15 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Active Traders</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Need real-time sentiment data and alerts for market-moving news.
                </p>
                <p className="text-sm font-medium text-orange-500">Recommended: Perception</p>
              </div>

              <div className="rounded-xl sm:rounded-2xl p-6 bg-gradient-to-br from-blue-500/15 via-slate-600/10 to-zinc-700/15 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Casual Investors</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Want to stay informed without spending hours reading news.
                </p>
                <p className="text-sm font-medium text-blue-500">Recommended: CryptoPanic</p>
              </div>

              <div className="rounded-xl sm:rounded-2xl p-6 bg-gradient-to-br from-purple-500/15 via-slate-600/10 to-zinc-700/15 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Filter className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Researchers</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Need deep analysis, data, and institutional-grade research.
                </p>
                <p className="text-sm font-medium text-purple-500">Recommended: The Block</p>
              </div>

              <div className="rounded-xl sm:rounded-2xl p-6 bg-gradient-to-br from-green-500/15 via-slate-600/10 to-zinc-700/15 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Newspaper className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Journalists</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Need comprehensive coverage and narrative tracking for stories.
                </p>
                <p className="text-sm font-medium text-green-500">Recommended: Perception + CoinDesk</p>
              </div>

              <div className="rounded-xl sm:rounded-2xl p-6 bg-gradient-to-br from-yellow-500/15 via-slate-600/10 to-zinc-700/15 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Beginners</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  New to crypto and need accessible, educational content.
                </p>
                <p className="text-sm font-medium text-yellow-600">Recommended: Decrypt</p>
              </div>

              <div className="rounded-xl sm:rounded-2xl p-6 bg-gradient-to-br from-slate-500/15 via-slate-600/10 to-zinc-700/15 border border-white/10">
                <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Maximizers</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Want to consume as much news as possible from multiple sources.
                </p>
                <p className="text-sm font-medium text-slate-400">Recommended: Cointelegraph + others</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 sm:py-16 lg:py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
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
                  className="rounded-xl sm:rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-slate-500/10 via-blue-600/5 to-neutral-700/10 border border-white/10"
                >
                  <h3 className="font-bold mb-2 text-foreground">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 sm:py-16 lg:py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Go Beyond News Aggregation
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              See how AI-powered sentiment analysis can give you an edge that simple
              news reading can't provide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl"
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
                className="px-8 py-6 text-lg rounded-xl"
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
        <section className="py-12 sm:py-16 border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-center mb-8">Related Resources</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                to="/compare/best-crypto-sentiment-tools"
                className="rounded-xl p-4 bg-gradient-to-br from-slate-500/10 to-zinc-700/10 border border-white/10 hover:border-orange-500/30 transition-colors text-center"
              >
                <p className="font-semibold text-foreground">Sentiment Tools</p>
                <p className="text-sm text-muted-foreground">Compare analysis platforms</p>
              </Link>
              <Link
                to="/learn/what-is-crypto-sentiment-analysis"
                className="rounded-xl p-4 bg-gradient-to-br from-slate-500/10 to-zinc-700/10 border border-white/10 hover:border-orange-500/30 transition-colors text-center"
              >
                <p className="font-semibold text-foreground">Sentiment Guide</p>
                <p className="text-sm text-muted-foreground">Learn the fundamentals</p>
              </Link>
              <Link
                to="/bitcoin-media-research"
                className="rounded-xl p-4 bg-gradient-to-br from-slate-500/10 to-zinc-700/10 border border-white/10 hover:border-orange-500/30 transition-colors text-center"
              >
                <p className="font-semibold text-foreground">Media Research</p>
                <p className="text-sm text-muted-foreground">Explore media coverage</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
