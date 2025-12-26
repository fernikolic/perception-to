import { FearGreedIndex } from '@/components/fear-greed-index';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SEO from '@/components/SEO';
import { useState, useEffect } from 'react';
import VortexParticleSystemExact from '@/components/VortexParticleSystemExact';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// FAQ data for schema and rendering
const faqs = [
  {
    question: 'What is the Bitcoin Fear & Greed Index?',
    answer: 'The Bitcoin Fear & Greed Index is a market sentiment indicator that measures investor emotions on a scale from 0 (extreme fear) to 100 (extreme greed). It aggregates data from 650+ sources including social media, news coverage, volatility, and market momentum to provide a real-time snapshot of market psychology.'
  },
  {
    question: 'How is the Fear & Greed Index calculated?',
    answer: 'Our index analyzes multiple data sources: social media sentiment from Twitter, Reddit, and Telegram; news coverage from 650+ media outlets including Bloomberg, Reuters, and crypto-native publications; market volatility; trading volume; and momentum indicators. Each source is weighted by credibility and processed using natural language processing and machine learning algorithms.'
  },
  {
    question: 'How often is the Bitcoin Fear & Greed Index updated?',
    answer: 'Unlike other fear and greed indices that update once daily, the Perception Fear & Greed Index updates every 90 seconds. This real-time tracking allows you to catch sentiment shifts as they happen, not hours after the fact.'
  },
  {
    question: 'What does extreme fear (0-25) indicate?',
    answer: 'Extreme fear typically indicates that investors are very worried, which can be a buying opportunity. When fear is extreme, it often means the market has oversold and prices may be undervalued. Historical data shows that extreme fear periods have often preceded market recoveries.'
  },
  {
    question: 'What does extreme greed (75-100) indicate?',
    answer: 'Extreme greed suggests the market may be due for a correction. When greed is extreme, investors are overly optimistic and prices may be overvalued. This is often when smart money starts taking profits, as euphoria can precede market tops.'
  },
  {
    question: 'Should I buy when there is extreme fear?',
    answer: 'While extreme fear has historically presented buying opportunities, the Fear & Greed Index should not be used as the sole basis for investment decisions. It is one of many tools to understand market sentiment. Always conduct your own research and consider consulting with a financial advisor.'
  },
  {
    question: 'How is Perception different from Alternative.me Fear & Greed Index?',
    answer: 'Perception tracks 650+ media sources compared to Alternative.me\'s 5-6 indicators. We update every 90 seconds versus daily updates. Our AI analyzes actual news content and narratives, not just counts and volumes. Perception shows you WHY sentiment is changing, not just that it changed.'
  },
  {
    question: 'Can I get alerts when sentiment changes?',
    answer: 'Yes! Perception offers real-time alerts via Slack, email, and webhooks. You can set custom thresholds to be notified when the index crosses into extreme fear or extreme greed territory, or when sentiment velocity indicates a rapid shift is occurring.'
  },
  {
    question: 'Is there an API for the Fear & Greed Index?',
    answer: 'Yes, Perception offers a full REST API for accessing Fear & Greed Index data. You can integrate real-time sentiment scores into your trading systems, dashboards, or applications. API access is available on Professional and Enterprise plans.'
  },
  {
    question: 'What is sentiment velocity?',
    answer: 'Sentiment velocity measures how quickly market sentiment is changing. A high positive velocity means sentiment is rapidly becoming more bullish, while high negative velocity indicates rapidly increasing fear. Velocity can be a leading indicator, showing momentum shifts before they fully manifest in the index score.'
  }
];

// Score interpretation data
const scoreRanges = [
  {
    range: '0–24',
    label: 'Extreme Fear',
    color: 'bg-red-600',
    textColor: 'text-red-600',
    description: 'The market is in panic mode. Investors are extremely worried and selling aggressively. Historically, these periods have often been good buying opportunities for long-term investors.',
    signals: ['Potential market bottom', 'High volatility likely', 'Consider dollar-cost averaging'],
    historical: 'Bitcoin has recovered an average of 47% within 90 days of extreme fear readings.'
  },
  {
    range: '25–44',
    label: 'Fear',
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
    description: 'Investors are cautious and worried. Negative news dominates headlines. The market may still decline, but fear is not at extreme levels.',
    signals: ['Below-average sentiment', 'News sentiment negative', 'Watch for capitulation'],
    historical: 'Fear periods typically last 2-4 weeks before transitioning to neutral or extreme fear.'
  },
  {
    range: '45–55',
    label: 'Neutral',
    color: 'bg-yellow-500',
    textColor: 'text-yellow-500',
    description: 'Market sentiment is balanced. Neither fear nor greed dominates. Often occurs during consolidation phases or when the market is waiting for a catalyst.',
    signals: ['Trend continuation likely', 'Watch for breakout direction', 'Moderate volatility'],
    historical: 'Neutral readings often precede significant moves in either direction within 2-3 weeks.'
  },
  {
    range: '56–74',
    label: 'Greed',
    color: 'bg-lime-500',
    textColor: 'text-lime-500',
    description: 'Investors are becoming optimistic. Positive news flow and rising prices attract more buyers. The trend is bullish but watch for signs of overheating.',
    signals: ['Bullish momentum', 'FOMO increasing', 'Consider taking some profits'],
    historical: 'Greed periods can extend for weeks or months during bull markets.'
  },
  {
    range: '75–100',
    label: 'Extreme Greed',
    color: 'bg-green-600',
    textColor: 'text-green-600',
    description: 'Maximum optimism and euphoria. Everyone is buying, prices are surging, and caution is thrown to the wind. Historically, these periods have preceded corrections.',
    signals: ['Potential market top', 'High risk of correction', 'Smart money selling'],
    historical: 'Extreme greed readings have preceded an average 23% drawdown within 60 days.'
  }
];

export default function FearGreedIndexPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Generate FAQ schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <SEO
        title="Bitcoin Fear & Greed Index - Real-Time Market Sentiment Analysis"
        description="Track Bitcoin market sentiment with our real-time Fear & Greed Index. Updated every 90 seconds from 650+ sources. Get instant alerts, API access, and detailed analysis of market psychology."
        keywords={["Bitcoin Fear & Greed Index", "crypto fear and greed index", "bitcoin sentiment", "market sentiment analysis", "bitcoin fear greed today", "crypto market psychology"]}
        url="https://perception.to/bitcoin-fear-greed-index"
        image="/images/bitcoin.png"
      >
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </SEO>
      
      <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95 pt-16">
          {/* Base Gradient */}
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

          <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
            {/* Hero Card with Side-by-Side Layout */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row min-h-[600px]">
                {/* Vortex Particle System - Left Side (50%) */}
                <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
                  <VortexParticleSystemExact />
                </div>

                {/* Content - Right Side (50%) */}
                <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16 flex flex-col justify-center" style={{ background: '#F0EEE6' }}>
                  <div className="mx-auto max-w-2xl">
                    <div className="mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                      <div className="group relative inline-flex items-center rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold leading-6"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <span className="relative flex items-center gap-2">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-40"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-400"></span>
                          </span>
                          <span className="relative font-bold text-black">REAL-TIME TRACKING</span>
                        </span>
                      </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-black mb-5 sm:mb-6 lg:mb-8 text-center lg:text-left">
                      Bitcoin Fear & Greed Index
                    </h1>

                    <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                      <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/70 font-semibold mb-3">
                        Market sentiment from 650+{'\u00A0'}sources.
                      </p>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                        Social media, news coverage, volatility. Updated every 90{'\u00A0'}seconds.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-6">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                        asChild
                      >
                        <a href="https://app.perception.to/auth/sign-up">
                          Start free trial
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fear & Greed Index Component */}
        <div className="relative">
          <FearGreedIndex />
        </div>

        {/* Detailed Content Section */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32 space-y-16 sm:space-y-24 lg:space-y-40">
            
            {/* What Is Section */}
            <section className="text-center">
              <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                  <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800/50 rounded-full px-6 py-2 text-sm text-slate-700 dark:text-slate-300 mb-8">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Market Psychology Decoded</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 tracking-tight text-slate-900 dark:text-white px-2">
                    What is the Bitcoin Fear & Greed Index?
                  </h2>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-12 sm:mb-16">
                  <div className="text-left">
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 font-light">
                      A single score from 0 (extreme fear) to 100 (extreme greed) that captures market sentiment.
                      We aggregate social media, news headlines, volatility, and market momentum from 650+ sources.
                    </p>
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-slate-600 dark:text-slate-400 font-light">
                      Track market psychology, not just price. See what the crowd is feeling before it shows up in{'\u00A0'}charts.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="bg-slate-50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-300 dark:border-slate-700/50 rounded-3xl p-8 shadow-lg">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-800 dark:bg-slate-700 rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-slate-900 dark:text-white">650+ Premium Sources</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Institutional reports, social media, news sentiment</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-700 dark:bg-slate-600 rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-slate-900 dark:text-white">90-Second Updates</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Real-time sentiment processing</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-600 dark:bg-slate-500 rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-slate-900 dark:text-white">Predictive Intelligence</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Sentiment velocity analysis</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* How It's Calculated */}
            <section>
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800/50 rounded-full px-6 py-2 text-sm text-slate-700 dark:text-slate-300 mb-8">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3-3h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-medium">Advanced Algorithm</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 tracking-tight text-slate-900 dark:text-white px-2">How it's calculated</h3>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 font-light max-w-4xl mx-auto px-2">
                  We track sentiment across 650+ sources, weighted by credibility and velocity. Not just price data—actual market psychology.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-20">
                <div className="lg:col-span-2">
                  <div className="bg-slate-50 dark:bg-slate-900/50 backdrop-blur-xl border border-slate-300 dark:border-slate-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-lg">
                    <h4 className="text-xl sm:text-2xl lg:text-3xl font-light text-slate-900 dark:text-white mb-6 sm:mb-8">
                      Sentiment Intelligence Engine
                    </h4>

                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex gap-3 sm:gap-4">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-700 dark:bg-slate-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-xs sm:text-sm font-bold">1</span>
                        </div>
                        <div>
                          <h5 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-1 sm:mb-2">Multi-source aggregation</h5>
                          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            Sentiment from news, social platforms, and market data. Each source weighted by credibility.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 sm:gap-4">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-700 dark:bg-slate-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-xs sm:text-sm font-bold">2</span>
                        </div>
                        <div>
                          <h5 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-1 sm:mb-2">Velocity analysis</h5>
                          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            Track sentiment acceleration. Spot shifts hours or days before price moves.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3 sm:gap-4">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-slate-700 dark:bg-slate-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-xs sm:text-sm font-bold">3</span>
                        </div>
                        <div>
                          <h5 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-1 sm:mb-2">Predictive scoring</h5>
                          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                            Complex patterns distilled into one score. 0 to 100. Updated every 90 seconds.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-300 dark:border-slate-700/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm uppercase tracking-wide">Premium Sources</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                        <span>Bloomberg, Reuters, WSJ</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                        <span>CoinDesk, CoinTelegraph</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <div className="w-2 h-2 bg-slate-700 rounded-full"></div>
                        <span>Twitter, Reddit, Telegram</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-300 dark:border-slate-700/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wide">Update Frequency</h5>
                    <div className="text-xl sm:text-2xl font-light text-slate-800 dark:text-slate-200 mb-1">90 seconds</div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Real-time processing</div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-300 dark:border-slate-700/30 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                    <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wide">Accuracy Rate</h5>
                    <div className="text-xl sm:text-2xl font-light text-slate-800 dark:text-slate-200 mb-1">94.3%</div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">Directional prediction</div>
                  </div>
                </div>
              </div>


              <div className="bg-slate-900 dark:bg-slate-950 rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-xl border border-slate-800 dark:border-slate-800/50 relative overflow-hidden mb-12 sm:mb-16">
                <div className="relative z-10">
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-light !text-white mb-6 sm:mb-8 text-center px-2">
                    Competitive Intelligence Advantage
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-slate-700 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                      </div>
                      <h5 className="text-lg font-semibold !text-white mb-3">Traditional Metrics</h5>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Reactive indicators show what already happened. Price volatility, market cap ratios, and search trends lag behind market psychology.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-slate-700 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h5 className="text-lg font-semibold !text-white mb-3">Sentiment Velocity</h5>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Predictive signals identify market shifts hours or days before price movements through advanced sentiment acceleration analysis.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-slate-700 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h5 className="text-lg font-semibold !text-white mb-3">Institutional Grade</h5>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Multi-dimensional analysis reduces false signals and provides reliable market sentiment indicators for better decision-making.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-xl sm:text-2xl font-medium text-slate-900 dark:text-white mb-4 sm:mb-6 px-2">The Science Behind the Score</h4>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-light max-w-3xl mx-auto leading-relaxed px-2">
                  Our algorithm uses natural language processing and machine learning to analyze sentiment across multiple dimensions:
                  tone, context, source credibility, and temporal patterns. This creates a comprehensive view of market psychology
                  that traditional metrics simply cannot provide.
                </p>
              </div>
            </section>

            {/* Why It Matters - Premium Section */}
            <section>
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800/50 rounded-full px-6 py-2 text-sm text-slate-700 dark:text-slate-300 mb-8">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="font-medium">Market Psychology Intelligence</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 tracking-tight text-slate-900 dark:text-white px-2">Why it matters</h3>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 font-light max-w-3xl mx-auto px-2">
                  Emotions drive markets. Fear triggers panic selling. Greed inflates bubbles.
                  Track sentiment to spot turning points before they show up in price.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                <div className="group relative">
                  <div className="relative bg-slate-50 dark:bg-slate-900/30 border border-slate-300 dark:border-slate-700/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>

                    <h4 className="text-lg sm:text-xl font-medium text-slate-900 dark:text-slate-200 mb-3 sm:mb-4">Extreme Fear (0–25)</h4>

                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      Potential buying opportunity. Extremely negative sentiment often signals a bottom.
                    </p>
                  </div>
                </div>

                <div className="group relative">
                  <div className="relative bg-slate-50 dark:bg-slate-900/30 border border-slate-300 dark:border-slate-700/30 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 bg-yellow-500 rounded-2xl flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      </svg>
                    </div>

                    <h4 className="text-xl font-medium text-slate-900 dark:text-slate-200 mb-4">Neutral (26–74)</h4>

                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Balanced sentiment. Trend continuation likely.
                    </p>
                  </div>
                </div>

                <div className="group relative">
                  <div className="relative bg-slate-50 dark:bg-slate-900/30 border border-slate-300 dark:border-slate-700/30 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </div>

                    <h4 className="text-xl font-medium text-slate-900 dark:text-slate-200 mb-4">Extreme Greed (75–100)</h4>

                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      Overbought territory. Correction likely.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Detailed Score Guide */}
            <section>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800/50 rounded-full px-6 py-2 text-sm text-slate-700 dark:text-slate-300 mb-8">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-medium">Complete Score Guide</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 tracking-tight text-slate-900 dark:text-white px-2">
                  What Each Score Means
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 font-light max-w-3xl mx-auto px-2">
                  Understanding the index helps you interpret market sentiment and make informed decisions
                </p>
              </div>

              <div className="space-y-6">
                {scoreRanges.map((range) => (
                  <div
                    key={range.range}
                    className="bg-slate-50 dark:bg-slate-900/30 border border-slate-300 dark:border-slate-700/30 rounded-2xl p-6 sm:p-8"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Score Badge */}
                      <div className="flex-shrink-0">
                        <div className={`${range.color} text-white rounded-xl px-4 py-2 inline-flex items-center gap-2`}>
                          <span className="font-bold text-lg">{range.range}</span>
                          <span className="text-sm opacity-90">|</span>
                          <span className="font-medium">{range.label}</span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                          {range.description}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* Signals */}
                          <div>
                            <h5 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Key Signals</h5>
                            <ul className="space-y-1">
                              {range.signals.map((signal, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                  <div className={`w-1.5 h-1.5 ${range.color} rounded-full`}></div>
                                  {signal}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Historical */}
                          <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-4">
                            <h5 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">Historical Context</h5>
                            <p className="text-sm text-slate-600 dark:text-slate-400">
                              {range.historical}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800/50 rounded-full px-6 py-2 text-sm text-slate-700 dark:text-slate-300 mb-8">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium">Frequently Asked Questions</span>
                </div>

                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 tracking-tight text-slate-900 dark:text-white px-2">
                  Bitcoin Fear & Greed Index FAQ
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 font-light max-w-3xl mx-auto px-2">
                  Common questions about the index and how to use it
                </p>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-slate-50 dark:bg-slate-900/30 border border-slate-300 dark:border-slate-700/30 rounded-xl p-6"
                  >
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                      {faq.question}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-8">
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-center">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Get Real-Time Sentiment Alerts
                </h3>
                <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
                  Never miss a sentiment shift. Get alerts when the index enters extreme fear or greed,
                  track sentiment velocity, and access our full API.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-6 text-lg"
                    asChild
                  >
                    <a href="https://app.perception.to/auth/sign-up">
                      Start free trial
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg"
                    asChild
                  >
                    <Link to="/api">
                      View API Docs
                    </Link>
                  </Button>
                </div>
              </div>
            </section>

            {/* Related Resources */}
            <section className="py-16">
              <div className="text-center mb-12 sm:mb-16">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-slate-900 dark:text-white px-2">
                  Related Bitcoin Analysis Tools
                </h3>
                <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
                  Enhance your Bitcoin analysis with our comprehensive suite of research and sentiment tools
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
                <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-300 dark:border-slate-700/30 hover:shadow-lg transition-all">
                  <h4 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">
                    <Link to="/bitcoin-market-sentiment" className="hover:text-orange-500 transition-colors">
                      Bitcoin Market Sentiment
                    </Link>
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-6">
                    Monthly and daily sentiment analysis tracking Bitcoin market psychology and investor emotions over time.
                  </p>
                  <Link to="/bitcoin-market-sentiment" className="text-orange-500 hover:text-orange-600 font-medium">
                    View Sentiment Analysis →
                  </Link>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-300 dark:border-slate-700/30 hover:shadow-lg transition-all">
                  <h4 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">
                    <Link to="/learn/what-is-crypto-sentiment-analysis" className="hover:text-orange-500 transition-colors">
                      What is Sentiment Analysis?
                    </Link>
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-6">
                    Learn how crypto sentiment analysis works, how it's measured, and how to use it in your trading strategy.
                  </p>
                  <Link to="/learn/what-is-crypto-sentiment-analysis" className="text-orange-500 hover:text-orange-600 font-medium">
                    Read the Guide →
                  </Link>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-300 dark:border-slate-700/30 hover:shadow-lg transition-all">
                  <h4 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">
                    <Link to="/compare/best-crypto-sentiment-tools" className="hover:text-orange-500 transition-colors">
                      Best Sentiment Tools Compared
                    </Link>
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-6">
                    Compare Perception, LunarCrush, Santiment, and other leading crypto sentiment analysis platforms.
                  </p>
                  <Link to="/compare/best-crypto-sentiment-tools" className="text-orange-500 hover:text-orange-600 font-medium">
                    Compare Tools →
                  </Link>
                </div>
              </div>

              {/* Additional Resources Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-300 dark:border-slate-700/30 hover:shadow-lg transition-all">
                  <h4 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">
                    <Link to="/crypto-conferences" className="hover:text-orange-500 transition-colors">
                      Crypto Conferences 2025-2026
                    </Link>
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-6">
                    Stay connected with the crypto community at Bitcoin, blockchain, and Web3 conferences worldwide.
                  </p>
                  <Link to="/crypto-conferences" className="text-orange-500 hover:text-orange-600 font-medium">
                    View Conference Calendar →
                  </Link>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-slate-300 dark:border-slate-700/30 hover:shadow-lg transition-all">
                  <h4 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white mb-3 sm:mb-4">
                    <Link to="/alternatives/alternative-me-alternative" className="hover:text-orange-500 transition-colors">
                      Perception vs Alternative.me
                    </Link>
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-4 sm:mb-6">
                    Compare our Fear & Greed Index with Alternative.me. See why 650+ sources beats 5 indicators.
                  </p>
                  <Link to="/alternatives/alternative-me-alternative" className="text-orange-500 hover:text-orange-600 font-medium">
                    See Comparison →
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
      {/* Premium Disclaimer Section */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-300 dark:border-slate-700/30 rounded-2xl p-8 text-center shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-slate-700 rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-slate-900 dark:text-white">Important Disclosure</h4>
          </div>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            The Bitcoin Fear & Greed Index provides market sentiment analysis for informational purposes only and does not constitute financial, investment, or trading advice.
            <span className="font-medium">Past performance does not guarantee future results.</span> Always conduct your own research and consider consulting with qualified financial professionals before making investment decisions.
            Cryptocurrency investments carry significant risk and may result in substantial losses.
          </p>
        </div>
      </div>
    </>
  );
} 