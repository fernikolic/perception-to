import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, BookOpen, Clock, BarChart3, MessageSquare, Newspaper, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

export default function WhatIsCryptoSentimentAnalysisPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'What is Crypto Sentiment Analysis? A Complete Guide',
    description: 'Learn what crypto sentiment analysis is, how it works, and why it matters for trading and investment decisions.',
    author: {
      '@type': 'Organization',
      name: 'Perception'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Perception',
      url: 'https://perception.to'
    },
    datePublished: '2025-01-01',
    dateModified: new Date().toISOString().split('T')[0]
  };

  return (
    <>
      <SEO
        title="What is Crypto Sentiment Analysis? Complete Guide 2025 | Perception"
        description="Learn what crypto sentiment analysis is, how it's measured, the different types of sentiment data, and how to use sentiment for better trading decisions."
        keywords={[
          'what is crypto sentiment analysis',
          'crypto sentiment explained',
          'bitcoin sentiment analysis',
          'market sentiment crypto',
          'sentiment trading crypto'
        ]}
        url="https://perception.to/learn/what-is-crypto-sentiment-analysis"
      >
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </SEO>

      <div className="min-h-screen bg-white dark:bg-black">
        {/* Article Header */}
        <article className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8">
              <Link to="/learn" className="inline-flex items-center text-sm text-orange-600 hover:text-orange-700">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Learn
              </Link>
            </nav>

            {/* Meta */}
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full px-3 py-1 text-sm font-medium">
                <BookOpen className="w-3 h-3" />
                Fundamentals
              </span>
              <span className="text-sm text-slate-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                8 min read
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
              What is Crypto Sentiment Analysis?
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
              A complete guide to understanding market sentiment, how it's measured,
              and why it matters for your crypto trading and investment decisions.
            </p>

            {/* Table of Contents */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 mb-12 border border-slate-200 dark:border-slate-700">
              <h2 className="font-semibold text-slate-900 dark:text-white mb-4">In This Guide</h2>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li><a href="#what-is-sentiment" className="hover:text-orange-600">1. What is Crypto Sentiment Analysis?</a></li>
                <li><a href="#why-it-matters" className="hover:text-orange-600">2. Why Sentiment Analysis Matters</a></li>
                <li><a href="#types-of-sentiment" className="hover:text-orange-600">3. Types of Sentiment Data</a></li>
                <li><a href="#how-its-measured" className="hover:text-orange-600">4. How Sentiment is Measured</a></li>
                <li><a href="#using-sentiment" className="hover:text-orange-600">5. Using Sentiment in Your Strategy</a></li>
                <li><a href="#tools" className="hover:text-orange-600">6. Best Sentiment Analysis Tools</a></li>
              </ul>
            </div>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">

              <section id="what-is-sentiment" className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  What is Crypto Sentiment Analysis?
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  <strong>Crypto sentiment analysis</strong> is the process of measuring and interpreting the collective mood,
                  emotions, and opinions of market participants toward cryptocurrencies. It answers the question:
                  <em> "What does the market feel about Bitcoin right now?"</em>
                </p>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Unlike technical analysis (which looks at price charts) or fundamental analysis (which examines
                  underlying value), sentiment analysis focuses on <strong>market psychology</strong>—the fear,
                  greed, optimism, and pessimism that drive buying and selling decisions.
                </p>
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-6 my-6">
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Key Insight</h3>
                  <p className="text-orange-700 dark:text-orange-300 text-sm">
                    Markets are driven by emotions. Fear causes panic selling. Greed inflates bubbles.
                    Sentiment analysis helps you understand these emotional cycles and make better-informed decisions.
                  </p>
                </div>
              </section>

              <section id="why-it-matters" className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Why Sentiment Analysis Matters
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  In traditional finance, legendary investors like Warren Buffett have long advised to
                  "be fearful when others are greedy and greedy when others are fearful." Sentiment analysis
                  gives you the data to actually measure when others are fearful or greedy.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 my-6">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
                    <CheckCircle className="w-6 h-6 text-green-600 mb-3" />
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">What Sentiment Shows</h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>Market extremes (fear/greed peaks)</li>
                      <li>Sentiment shifts before price moves</li>
                      <li>Narrative momentum and trends</li>
                      <li>Contrarian opportunities</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border border-red-200 dark:border-red-800">
                    <AlertCircle className="w-6 h-6 text-red-600 mb-3" />
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">What It Doesn't Show</h4>
                    <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                      <li>Guaranteed price direction</li>
                      <li>Exact entry/exit points</li>
                      <li>Long-term fundamental value</li>
                      <li>Black swan events</li>
                    </ul>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-400">
                  Crypto markets are particularly sentiment-driven because they trade 24/7, attract retail investors,
                  and are heavily influenced by social media. A single tweet can move markets. Understanding
                  sentiment gives you an edge in this environment.
                </p>
              </section>

              <section id="types-of-sentiment" className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Types of Sentiment Data
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Not all sentiment data is created equal. Different sources tell you different things
                  about different market participants.
                </p>

                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                      <MessageSquare className="w-6 h-6 text-blue-500" />
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Social Sentiment</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-3">
                      What retail traders are saying on Twitter, Reddit, Telegram, and Discord.
                    </p>
                    <ul className="text-sm text-slate-500 space-y-1">
                      <li><strong>Pros:</strong> High volume, real-time, shows retail mood</li>
                      <li><strong>Cons:</strong> Noisy, bot activity, echo chambers</li>
                      <li><strong>Best tools:</strong> LunarCrush, Santiment</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                      <Newspaper className="w-6 h-6 text-orange-500" />
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Media Sentiment</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-3">
                      What journalists, analysts, and publications are reporting—from Bloomberg to CoinDesk.
                    </p>
                    <ul className="text-sm text-slate-500 space-y-1">
                      <li><strong>Pros:</strong> Higher signal quality, institutional focus, narrative tracking</li>
                      <li><strong>Cons:</strong> Slower than social, requires AI to process at scale</li>
                      <li><strong>Best tools:</strong> Perception (650+ sources)</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                      <BarChart3 className="w-6 h-6 text-purple-500" />
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">On-Chain Sentiment</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-3">
                      What blockchain data reveals about holder behavior—accumulation, distribution, whale movements.
                    </p>
                    <ul className="text-sm text-slate-500 space-y-1">
                      <li><strong>Pros:</strong> Shows actual behavior, not just talk</li>
                      <li><strong>Cons:</strong> Complex to interpret, lagging indicator</li>
                      <li><strong>Best tools:</strong> Santiment, Glassnode</li>
                    </ul>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="w-6 h-6 text-green-500" />
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Composite Indices</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 mb-3">
                      Aggregated scores like the Fear & Greed Index that combine multiple sentiment signals.
                    </p>
                    <ul className="text-sm text-slate-500 space-y-1">
                      <li><strong>Pros:</strong> Easy to understand, single score</li>
                      <li><strong>Cons:</strong> Loses nuance, methodology varies</li>
                      <li><strong>Best tools:</strong> Perception, Alternative.me</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section id="how-its-measured" className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  How Sentiment is Measured
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Modern sentiment analysis uses a combination of techniques to process vast amounts of data:
                </p>

                <ol className="space-y-4 text-slate-600 dark:text-slate-400">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white">Data Collection</strong>
                      <p className="mt-1">Crawling social media, news sites, forums, and other sources to gather text data.
                      Tools like Perception monitor 650+ media sources in real-time.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white">Natural Language Processing (NLP)</strong>
                      <p className="mt-1">AI models analyze text to understand context, tone, and meaning. Is a tweet positive,
                      negative, or neutral? Is an article bullish or bearish?</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white">Scoring & Weighting</strong>
                      <p className="mt-1">Not all sources are equal. A Bloomberg article carries more weight than a random tweet.
                      Professional tools weight sources by credibility and reach.</p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</span>
                    <div>
                      <strong className="text-slate-900 dark:text-white">Index Calculation</strong>
                      <p className="mt-1">Individual sentiment scores are aggregated into indices like Fear & Greed (0-100).
                      Velocity metrics show how fast sentiment is changing.</p>
                    </div>
                  </li>
                </ol>
              </section>

              <section id="using-sentiment" className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Using Sentiment in Your Strategy
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Sentiment data is most powerful when combined with other analysis. Here's how traders use it:
                </p>

                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Contrarian Signals</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Extreme fear often precedes bottoms. Extreme greed often precedes tops. Use sentiment
                      extremes as contrarian indicators, but always confirm with price action.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Sentiment Divergence</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      When price is rising but sentiment is falling (or vice versa), a reversal may be coming.
                      This divergence can signal that the current trend is losing steam.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Narrative Tracking</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Identify emerging narratives before they go mainstream. If media coverage of a topic
                      is accelerating, related assets may follow. Early narrative detection = early positioning.
                    </p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Risk Management</h4>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Extreme greed = time to reduce position size or take profits. Extreme fear = time to
                      look for opportunities, but don't catch falling knives without confirmation.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 my-6">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Important Warning</h3>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    Sentiment analysis is one tool among many. It should never be your only decision factor.
                    Markets can remain irrational longer than you can remain solvent. Always use proper risk management.
                  </p>
                </div>
              </section>

              <section id="tools" className="mb-12">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Best Sentiment Analysis Tools
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Different tools excel at different types of sentiment data. Here's how to choose:
                </p>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Tool</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Best For</th>
                        <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Price</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600 dark:text-slate-400">
                      <tr className="border-b border-slate-200 dark:border-slate-700 bg-orange-50 dark:bg-orange-900/10">
                        <td className="py-3 px-4 font-semibold">Perception</td>
                        <td className="py-3 px-4">Media sentiment, narrative tracking</td>
                        <td className="py-3 px-4">From $49/mo</td>
                      </tr>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <td className="py-3 px-4">LunarCrush</td>
                        <td className="py-3 px-4">Social media metrics</td>
                        <td className="py-3 px-4">From $99/mo</td>
                      </tr>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <td className="py-3 px-4">Santiment</td>
                        <td className="py-3 px-4">On-chain + social data</td>
                        <td className="py-3 px-4">From $49/mo</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Alternative.me</td>
                        <td className="py-3 px-4">Free basic Fear & Greed</td>
                        <td className="py-3 px-4">Free</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-slate-600 dark:text-slate-400">
                  For a complete comparison, see our <Link to="/compare/best-crypto-sentiment-tools" className="text-orange-600 hover:text-orange-700">Best Crypto Sentiment Tools guide</Link>.
                </p>
              </section>

            </div>

            {/* Article Footer */}
            <div className="border-t border-slate-200 dark:border-slate-700 pt-8 mt-12">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-2">Ready to start tracking sentiment?</p>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white" asChild>
                    <a href="https://app.perception.to/auth/sign-up">
                      Try Perception Free
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-sm text-slate-500 mb-2">Continue learning</p>
                  <Link to="/learn/how-to-read-fear-greed-index" className="text-orange-600 hover:text-orange-700 font-medium">
                    How to Read the Fear & Greed Index →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
              Continue Learning
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Link
                to="/learn/how-to-read-fear-greed-index"
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-orange-300 transition-colors"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">How to Read the Fear & Greed Index</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Learn to interpret each score range and use it in your trading.</p>
              </Link>
              <Link
                to="/bitcoin-fear-greed-index"
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-orange-300 transition-colors"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Live Fear & Greed Dashboard</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">See real-time Bitcoin sentiment updated every 90 seconds.</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
