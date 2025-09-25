import { FearGreedIndex } from '@/components/fear-greed-index';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SEO from '@/components/SEO';
import { useState, useEffect } from 'react';

export default function FearGreedIndexPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <SEO
        title="Bitcoin Fear & Greed Index - Real-Time Market Sentiment Analysis"
        description="Track Bitcoin market sentiment with our real-time Fear & Greed Index. Get instant alerts, API access, and detailed analysis of market psychology from 0 (extreme fear) to 100 (extreme greed)."
        keywords={["Bitcoin Fear & Greed Index", "market sentiment", "crypto sentiment analysis", "Bitcoin price prediction", "market psychology", "trading signals"]}
        url="https://perception.to/bitcoin-fear-greed-index"
        image="/images/bitcoin.png"
      />
      
      <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white">
        {/* Hero Section with Original Card Design */}
        <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
          {/* Subtle radial background like homepage */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_50%)]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Hero Card with Background Image (matches homepage) */}
            <div className={`relative rounded-2xl overflow-hidden transform transition-all duration-1000 ease-out ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src="/images/hero_image.avif"
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-3xl text-center">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight text-black max-w-4xl mx-auto mb-6 sm:mb-8">
                    Bitcoin fear & greed index
                  </h1>
                  
                  <p className="text-sm sm:text-base lg:text-lg xl:text-xl leading-6 sm:leading-7 lg:leading-8 text-black/70 font-light max-w-3xl mx-auto mb-8">
                    Track market sentiment with real-time data from multiple sources including social media, volatility, market momentum, and more.
                  </p>

                  <div className="flex justify-center">
                    <a
                      href="https://app.perception.to/auth/sign-up"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white hover:bg-black/90 transition-all font-normal px-6 lg:px-8 text-sm sm:text-base shadow-lg hover:shadow-xl py-3 lg:py-4 rounded-lg"
                    >
                      Start free
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fear & Greed Index Component */}
        <div className="relative">
          <FearGreedIndex />
        </div>

        {/* Detailed Content Section */}
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 py-32 space-y-40">
            
            {/* What Is Section */}
            <section className="text-center">
              <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                  <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/50 rounded-full px-6 py-2 text-sm text-slate-600 dark:text-slate-300 mb-8">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Market Psychology Decoded</span>
                  </div>
                  
                  <h2 className="text-5xl font-bold mb-8 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                    What is the bitcoin fear & greed index?
                  </h2>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                  <div className="text-left">
                    <p className="text-xl leading-relaxed text-slate-600 dark:text-white/70 mb-8 font-light">
                      The Bitcoin Fear & Greed Index is a quantitative gauge that measures the prevailing sentiment in the cryptocurrency market. 
                      By aggregating multiple data sources—social media chatter, on-chain transaction volumes, Google Trends, sentiment analysis on news headlines, and market volatility—it distills complex market dynamics into a single score from 0 (extreme fear) to 100 (extreme greed).
                    </p>
                    <p className="text-xl leading-relaxed text-slate-600 dark:text-white/70 font-light">
                      This powerful tool helps people understand market psychology and identify potential market trends based on crowd sentiment rather than just price movements.
                    </p>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900/50 dark:to-slate-800/30 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-700 dark:bg-slate-600 rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-slate-900 dark:text-white">100+ Premium Sources</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Institutional reports, social media, news sentiment</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-600 dark:bg-slate-500 rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-slate-900 dark:text-white">90-Second Updates</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Real-time sentiment processing</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-500 dark:bg-slate-400 rounded-2xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <h3 className="font-semibold text-slate-900 dark:text-white">Predictive Intelligence</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Sentiment velocity analysis</p>
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
                <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/50 rounded-full px-6 py-2 text-sm text-slate-600 dark:text-slate-300 mb-8">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3-3h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="font-medium">Advanced Algorithm</span>
                </div>
                
                <h3 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">How it's calculated</h3>
                <p className="text-xl text-slate-600 dark:text-white/70 font-light max-w-4xl mx-auto">
                  Unlike traditional metrics that rely on simple price data, our Fear & Greed Index uses advanced sentiment analysis 
                  from over 100+ sources, weighted by influence and velocity, to capture the true market psychology.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-20">
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-white via-slate-50 to-blue-50/50 dark:from-white/5 dark:via-white/10 dark:to-blue-900/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-10 shadow-2xl">
                    <h4 className="text-2xl lg:text-3xl font-light text-slate-900 dark:text-white mb-8 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                      Sentiment Intelligence Engine
                    </h4>
                    
                    <div className="space-y-6">
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">1</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Multi-Source Aggregation</h5>
                          <p className="text-slate-600 dark:text-white/70 leading-relaxed">
                            Continuously ingests sentiment from institutional reports, social platforms, news outlets, and on-chain activity—each weighted by credibility and market impact.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">2</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Velocity Analysis</h5>
                          <p className="text-slate-600 dark:text-white/70 leading-relaxed">
                            Tracks sentiment acceleration and deceleration patterns, identifying market shifts hours or days before price movements.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-white text-sm font-bold">3</span>
                        </div>
                        <div>
                          <h5 className="font-semibold text-slate-900 dark:text-white mb-2">Predictive Scoring</h5>
                          <p className="text-slate-600 dark:text-white/70 leading-relaxed">
                            Converts complex sentiment patterns into a simple 0-100 fear-to-greed scale, updated every 90 seconds with sub-latency alerts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/20 dark:to-slate-700/10 border border-slate-200 dark:border-slate-700/30 rounded-2xl p-6">
                    <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm uppercase tracking-wide">Premium Sources</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-200">
                        <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                        <span>Bloomberg, Reuters, WSJ</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-200">
                        <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                        <span>CoinDesk, CoinTelegraph</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-200">
                        <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                        <span>Twitter, Reddit, Telegram</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/20 dark:to-slate-700/10 border border-slate-200 dark:border-slate-700/30 rounded-2xl p-6">
                    <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm uppercase tracking-wide">Update Frequency</h5>
                    <div className="text-2xl font-light text-slate-800 dark:text-slate-200 mb-1">90 seconds</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">Real-time processing</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-800/20 dark:to-slate-700/10 border border-slate-200 dark:border-slate-700/30 rounded-2xl p-6">
                    <h5 className="font-semibold text-slate-700 dark:text-slate-300 mb-3 text-sm uppercase tracking-wide">Accuracy Rate</h5>
                    <div className="text-2xl font-light text-slate-800 dark:text-slate-200 mb-1">94.3%</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300">Directional prediction</div>
                  </div>
                </div>
              </div>


              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 shadow-2xl relative overflow-hidden mb-16">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <h4 className="text-3xl font-light !text-white mb-8 text-center bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                    Competitive Intelligence Advantage
                  </h4>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                      </div>
                      <h5 className="text-lg font-semibold !text-white mb-3">Traditional Metrics</h5>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Reactive indicators show what already happened. Price volatility, market cap ratios, and search trends lag behind market psychology.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h5 className="text-lg font-semibold !text-white mb-3">Sentiment Velocity</h5>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Predictive signals identify market shifts hours or days before price movements through advanced sentiment acceleration analysis.
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h5 className="text-lg font-semibold !text-white mb-3">Institutional Grade</h5>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Multi-dimensional analysis reduces false signals and provides reliable market sentiment indicators for better decision-making.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-2xl font-medium text-slate-900 dark:text-white mb-6">The Science Behind the Score</h4>
                <p className="text-lg text-slate-600 dark:text-white/70 font-light max-w-3xl mx-auto leading-relaxed">
                  Our algorithm uses natural language processing and machine learning to analyze sentiment across multiple dimensions: 
                  tone, context, source credibility, and temporal patterns. This creates a comprehensive view of market psychology 
                  that traditional metrics simply cannot provide.
                </p>
              </div>
            </section>

            {/* Why It Matters - Premium Section */}
            <section>
              <div className="text-center mb-20">
                <div className="inline-flex items-center gap-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800/50 rounded-full px-6 py-2 text-sm text-slate-600 dark:text-slate-300 mb-8">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  <span className="font-medium">Market Psychology Intelligence</span>
                </div>
                
                <h3 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">Why it matters</h3>
                <p className="text-xl text-slate-600 dark:text-white/70 font-light max-w-3xl mx-auto">
                  Emotions drive markets. When fear grips the market, people may sell in a panic, creating price dips. When greed takes over, irrational exuberance can inflate bubbles. 
                  The Fear & Greed Index helps anyone interested in Bitcoin understand market sentiment and spot potential market turning points.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-8 mb-16">
                <div className="group relative">
                  <div className="absolute inset-0 bg-slate-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105" />
                  
                  <div className="relative bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/20 dark:to-slate-800/10 border border-slate-200 dark:border-slate-700/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-xl">
                    <div className="w-16 h-16 bg-slate-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                    
                    <h4 className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-4">Extreme Fear (0–25)</h4>
                    
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      Potential buying opportunity as prices may be undervalued. Market sentiment is extremely negative, often indicating a bottom.
                    </p>
                    
                    <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-slate-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105" />
                  
                  <div className="relative bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/20 dark:to-slate-800/10 border border-slate-200 dark:border-slate-700/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-xl">
                    <div className="w-16 h-16 bg-slate-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      </svg>
                    </div>
                    
                    <h4 className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-4">Neutral (26–74)</h4>
                    
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      Market balance—trend continuation likely. Sentiment is balanced, suggesting stable market conditions.
                    </p>
                    
                    <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    </div>
                  </div>
                </div>

                <div className="group relative">
                  <div className="absolute inset-0 bg-slate-600/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105" />
                  
                  <div className="relative bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-slate-900/20 dark:to-slate-800/10 border border-slate-200 dark:border-slate-700/30 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 backdrop-blur-xl">
                    <div className="w-16 h-16 bg-slate-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    </div>
                    
                    <h4 className="text-xl font-medium text-slate-800 dark:text-slate-200 mb-4">Extreme Greed (75–100)</h4>
                    
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
                      Caution warranted; signs of overbought conditions. Market may be due for a correction.
                    </p>
                    
                    <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Related Resources */}
            <section className="py-16">
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                  Related Bitcoin Analysis Tools
                </h3>
                <p className="text-xl text-slate-600 dark:text-white/70 max-w-3xl mx-auto mb-12">
                  Enhance your Bitcoin analysis with our comprehensive suite of research and sentiment tools
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-white/5 dark:to-white/10 rounded-3xl p-8 border border-slate-200 dark:border-white/10 backdrop-blur-xl hover:shadow-lg transition-all">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    <a href="/bitcoin-market-sentiment" className="hover:text-orange-500 transition-colors">
                      Bitcoin Market Sentiment
                    </a>
                  </h4>
                  <p className="text-slate-600 dark:text-white/60 mb-6">
                    Monthly and daily sentiment analysis tracking Bitcoin market psychology and investor emotions over time.
                  </p>
                  <a href="/bitcoin-market-sentiment" className="text-orange-500 hover:text-orange-600 font-medium">
                    View Sentiment Analysis →
                  </a>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-white/5 dark:to-white/10 rounded-3xl p-8 border border-slate-200 dark:border-white/10 backdrop-blur-xl hover:shadow-lg transition-all">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    <a href="/crypto-conferences" className="hover:text-orange-500 transition-colors">
                      Crypto Conferences 2025-2026
                    </a>
                  </h4>
                  <p className="text-slate-600 dark:text-white/60 mb-6">
                    Stay connected with the crypto community at Bitcoin, blockchain, and Web3 conferences worldwide.
                  </p>
                  <a href="/crypto-conferences" className="text-orange-500 hover:text-orange-600 font-medium">
                    View Conference Calendar →
                  </a>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-white/5 dark:to-white/10 rounded-3xl p-8 border border-slate-200 dark:border-white/10 backdrop-blur-xl hover:shadow-lg transition-all">
                  <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                    <a href="/bitcoin-media-research" className="hover:text-orange-500 transition-colors">
                      Bitcoin Media Research
                    </a>
                  </h4>
                  <p className="text-slate-600 dark:text-white/60 mb-6">
                    Weekly research analyzing Bitcoin media coverage and narrative trends from 100+ news sources.
                  </p>
                  <a href="/bitcoin-media-research" className="text-orange-500 hover:text-orange-600 font-medium">
                    Subscribe to Research →
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
      {/* Premium Disclaimer Section */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 dark:from-white/5 dark:to-white/10 backdrop-blur-xl border border-slate-200/60 dark:border-white/10 rounded-2xl p-8 text-center shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-slate-800 dark:text-white/90">Important Disclosure</h4>
          </div>
          
          <p className="text-slate-600 dark:text-white/70 leading-relaxed">
            The Bitcoin Fear & Greed Index provides market sentiment analysis for informational purposes only and does not constitute financial, investment, or trading advice. 
            <span className="font-medium">Past performance does not guarantee future results.</span> Always conduct your own research and consider consulting with qualified financial professionals before making investment decisions. 
            Cryptocurrency investments carry significant risk and may result in substantial losses.
          </p>
        </div>
      </div>
    </>
  );
} 