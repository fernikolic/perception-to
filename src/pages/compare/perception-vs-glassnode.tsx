import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Check,
  X,
  ArrowRight,
  Newspaper,
  BarChart3,
  TrendingUp,
  Zap,
  Database,
  MessageSquare,
  DollarSign,
  Target,
  Clock
} from 'lucide-react';

export default function PerceptionVsGlassnodePage() {
  const comparisonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Perception vs Glassnode: Which Crypto Analytics Tool is Right for You?',
    description: 'Detailed comparison of Perception and Glassnode. One focuses on media sentiment, the other on on-chain data. Learn which tool fits your trading style.',
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
        name: 'What is the difference between Perception and Glassnode?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Perception focuses on media sentiment analysis, tracking 650+ news sources to measure market narrative and mood. Glassnode focuses on on-chain data, analyzing blockchain transactions to understand holder behavior, exchange flows, and network activity. They measure different aspects of the market and are often complementary.'
        }
      },
      {
        '@type': 'Question',
        name: 'Which is better for day trading?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Perception may be better for day traders due to its real-time sentiment updates (every 90 seconds) and focus on news-driven moves. Glassnode\'s on-chain data is typically more useful for longer-term position sizing and identifying accumulation/distribution patterns.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I use both Perception and Glassnode together?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, many professional traders use both tools together. Glassnode provides insight into what large holders are doing (behavior), while Perception shows what the market is thinking (sentiment). Combining both gives a more complete picture of market conditions.'
        }
      }
    ]
  };

  return (
    <>
      <SEO
        title="Perception vs Glassnode: Sentiment vs On-Chain Analytics Compared | 2025"
        description="Detailed comparison of Perception and Glassnode. Understand the difference between media sentiment analysis and on-chain data. Find the right tool for your trading style."
        keywords={[
          'perception vs glassnode',
          'glassnode alternative',
          'crypto sentiment vs on-chain',
          'glassnode comparison',
          'best crypto analytics tool',
          'on-chain analysis tools'
        ]}
        url="https://perception.to/compare/perception-vs-glassnode"
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

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-foreground mb-6">
                Perception vs Glassnode
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                <strong>Media sentiment</strong> vs <strong>on-chain analytics</strong>—two different
                approaches to understanding crypto markets. Which one is right for you?
              </p>
              <p className="text-base text-muted-foreground mb-8">
                Last updated: December 2025
              </p>
            </div>
          </div>
        </section>

        {/* Quick Verdict */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12">
              {/* Perception Card */}
              <div className="group relative rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-orange-500/20 via-slate-600/15 to-zinc-700/20 hover:from-orange-500/25 border border-white/10 hover:shadow-lg hover:shadow-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Newspaper className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">Perception</h3>
                    <p className="text-sm text-muted-foreground">Media Sentiment Platform</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Best for: <strong>Narrative tracking, news-driven trading, sentiment analysis</strong>
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> 650+ media sources monitored</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Real-time Fear & Greed Index</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> AI-powered narrative detection</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Starting at $49/month</li>
                </ul>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white" asChild>
                  <a href="https://app.perception.to/auth/sign-up">Try Perception Free <ArrowRight className="ml-2 w-4 h-4" /></a>
                </Button>
              </div>

              {/* Glassnode Card */}
              <div className="group relative rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-blue-500/20 via-slate-600/15 to-zinc-700/20 hover:from-blue-500/25 border border-white/10 hover:shadow-lg hover:shadow-white/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground">Glassnode</h3>
                    <p className="text-sm text-muted-foreground">On-Chain Analytics Platform</p>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  Best for: <strong>On-chain analysis, holder behavior, network metrics</strong>
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Comprehensive on-chain metrics</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Exchange flow tracking</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Long-term holder analysis</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-500" /> Starting at $39/month</li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://glassnode.com" target="_blank" rel="noopener noreferrer">Visit Glassnode <ArrowRight className="ml-2 w-4 h-4" /></a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Differences */}
        <section className="py-12 sm:py-16 lg:py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4">
              Key Differences Explained
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              These tools answer fundamentally different questions about the market
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-orange-500">Perception: "What is the market thinking?"</h3>
                <div className="space-y-4">
                  <div className="rounded-xl p-5 bg-gradient-to-br from-orange-500/10 via-slate-600/5 to-zinc-700/10 border border-white/10">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-orange-500" /> Sentiment Analysis
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Analyzes media coverage to determine if narratives are bullish, bearish, or neutral.
                      Tracks how sentiment changes over time.
                    </p>
                  </div>
                  <div className="rounded-xl p-5 bg-gradient-to-br from-orange-500/10 via-slate-600/5 to-zinc-700/10 border border-white/10">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-500" /> Real-Time Updates
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Fear & Greed Index updates every 90 seconds. Catch sentiment shifts as they happen,
                      before they fully impact price.
                    </p>
                  </div>
                  <div className="rounded-xl p-5 bg-gradient-to-br from-orange-500/10 via-slate-600/5 to-zinc-700/10 border border-white/10">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-orange-500" /> Narrative Tracking
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Identifies emerging themes and stories in the media. Know what topics are gaining
                      attention before they go mainstream.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-blue-500">Glassnode: "What is the market doing?"</h3>
                <div className="space-y-4">
                  <div className="rounded-xl p-5 bg-gradient-to-br from-blue-500/10 via-slate-600/5 to-zinc-700/10 border border-white/10">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Database className="w-5 h-5 text-blue-500" /> On-Chain Metrics
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Analyzes blockchain data to see actual holder behavior—accumulation, distribution,
                      exchange deposits/withdrawals.
                    </p>
                  </div>
                  <div className="rounded-xl p-5 bg-gradient-to-br from-blue-500/10 via-slate-600/5 to-zinc-700/10 border border-white/10">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-500" /> Holder Analysis
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Segments holders by age of coins (HODLers vs traders), wallet size (whales vs retail),
                      and behavior patterns.
                    </p>
                  </div>
                  <div className="rounded-xl p-5 bg-gradient-to-br from-blue-500/10 via-slate-600/5 to-zinc-700/10 border border-white/10">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-500" /> Network Health
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Tracks network activity, hash rate, active addresses, and transaction volume.
                      Understand the fundamental usage of the network.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-12 sm:py-16 lg:py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
              Feature Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-4 px-4 font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold text-orange-500">Perception</th>
                    <th className="text-center py-4 px-4 font-semibold text-blue-500">Glassnode</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-medium">Primary Focus</td>
                    <td className="py-4 px-4 text-center">Media Sentiment</td>
                    <td className="py-4 px-4 text-center">On-Chain Data</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-medium">Data Sources</td>
                    <td className="py-4 px-4 text-center">650+ news outlets</td>
                    <td className="py-4 px-4 text-center">Blockchain data</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-medium">Fear & Greed Index</td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-medium">On-Chain Metrics</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-medium">Exchange Flows</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-medium">Narrative Tracking</td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-medium">Whale Tracking</td>
                    <td className="py-4 px-4 text-center"><X className="w-5 h-5 text-red-400 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-medium">Update Frequency</td>
                    <td className="py-4 px-4 text-center">Every 90 seconds</td>
                    <td className="py-4 px-4 text-center">Hourly/Daily</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-medium">Free Tier</td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-medium">Starting Price</td>
                    <td className="py-4 px-4 text-center">$49/month</td>
                    <td className="py-4 px-4 text-center">$39/month</td>
                  </tr>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <td className="py-4 px-4 font-medium">API Access</td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                    <td className="py-4 px-4 text-center"><Check className="w-5 h-5 text-green-500 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* When to Use Which */}
        <section className="py-12 sm:py-16 lg:py-20 border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-12">
              When to Use Which Tool
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-orange-500/15 via-slate-600/10 to-zinc-700/15 border border-white/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  Choose Perception When...
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You trade based on news and market narratives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You want real-time sentiment data for day trading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You need to track media coverage for PR/communications</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You want contrarian signals based on sentiment extremes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You're a content creator or journalist covering crypto</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl sm:rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-blue-500/15 via-slate-600/10 to-zinc-700/15 border border-white/10">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-500" />
                  Choose Glassnode When...
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You want to understand what large holders are doing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You make longer-term investment decisions (weeks/months)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You need exchange flow data for position sizing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You analyze Bitcoin's fundamental network health</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>You want to identify accumulation/distribution phases</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 rounded-xl sm:rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-purple-500/15 via-slate-600/10 to-zinc-700/15 border border-white/10 text-center">
              <h3 className="text-xl font-bold mb-4">Best Approach: Use Both Together</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Many professional traders combine sentiment analysis (Perception) with on-chain data (Glassnode)
                for a complete market picture. Glassnode tells you what smart money is doing. Perception tells
                you what the market is thinking. Together, they provide powerful confirmation signals.
              </p>
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
                  q: 'What is the difference between Perception and Glassnode?',
                  a: 'Perception focuses on media sentiment analysis, tracking 650+ news sources to measure market narrative and mood. Glassnode focuses on on-chain data, analyzing blockchain transactions to understand holder behavior, exchange flows, and network activity. They measure different aspects of the market and are often complementary.'
                },
                {
                  q: 'Which is better for day trading?',
                  a: 'Perception may be better for day traders due to its real-time sentiment updates (every 90 seconds) and focus on news-driven moves. Glassnode\'s on-chain data is typically more useful for longer-term position sizing and identifying accumulation/distribution patterns.'
                },
                {
                  q: 'Can I use both Perception and Glassnode together?',
                  a: 'Yes, many professional traders use both tools together. Glassnode provides insight into what large holders are doing (behavior), while Perception shows what the market is thinking (sentiment). Combining both gives a more complete picture of market conditions.'
                },
                {
                  q: 'Which tool has better free features?',
                  a: 'Both offer free tiers. Glassnode\'s free tier includes basic on-chain metrics. Perception\'s free tier includes access to the Fear & Greed Index and basic sentiment data. For full features, both require paid subscriptions.'
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
              Try Perception Free
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start tracking crypto market sentiment today. See how media narratives
              impact prices in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg rounded-xl"
                asChild
              >
                <a href="https://app.perception.to/auth/sign-up">
                  Start Free Trial
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
            <h2 className="text-xl font-bold text-center mb-8">Related Comparisons</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link
                to="/compare/best-crypto-sentiment-tools"
                className="rounded-xl p-4 bg-gradient-to-br from-slate-500/10 to-zinc-700/10 border border-white/10 hover:border-orange-500/30 transition-colors text-center"
              >
                <p className="font-semibold text-foreground">All Sentiment Tools</p>
                <p className="text-sm text-muted-foreground">Complete comparison guide</p>
              </Link>
              <Link
                to="/alternatives/lunarcrush-alternative"
                className="rounded-xl p-4 bg-gradient-to-br from-slate-500/10 to-zinc-700/10 border border-white/10 hover:border-orange-500/30 transition-colors text-center"
              >
                <p className="font-semibold text-foreground">LunarCrush Alternative</p>
                <p className="text-sm text-muted-foreground">Social sentiment comparison</p>
              </Link>
              <Link
                to="/alternatives/santiment-alternative"
                className="rounded-xl p-4 bg-gradient-to-br from-slate-500/10 to-zinc-700/10 border border-white/10 hover:border-orange-500/30 transition-colors text-center"
              >
                <p className="font-semibold text-foreground">Santiment Alternative</p>
                <p className="text-sm text-muted-foreground">Multi-source comparison</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
