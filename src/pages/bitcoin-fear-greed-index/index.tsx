import { FearGreedIndex } from '@/components/fear-greed-index';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SEO from '@/components/SEO';

export default function FearGreedIndexPage() {
  return (
    <>
      <SEO 
        title="Bitcoin Fear & Greed Index - Real-Time Market Sentiment Analysis"
        description="Track Bitcoin market sentiment with our real-time Fear & Greed Index. Get instant alerts, API access, and detailed analysis of market psychology from 0 (extreme fear) to 100 (extreme greed)."
        keywords={["Bitcoin Fear & Greed Index", "market sentiment", "crypto sentiment analysis", "Bitcoin price prediction", "market psychology", "trading signals"]}
        image="/images/bitcoin.png"
      />
      
      <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-white">
        {/* Hero Section with Card Design */}
        <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
          {/* Subtle radial background like homepage */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_50%)]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Hero Card with Background Image (matches homepage) */}
            <div className="relative rounded-2xl overflow-hidden">
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
                  {/* Segment badge */}
                  <div className="mb-6 sm:mb-8">
                    <span className="inline-flex items-center rounded-full bg-transparent px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium leading-6 text-black ring-1 ring-inset ring-black/30 hover:ring-black/50 transition-all duration-300">
                      For Traders & Investors
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight text-black max-w-4xl mx-auto">
                    Bitcoin Fear & Greed Index
                  </h1>
                  
                  <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg xl:text-xl leading-6 sm:leading-7 lg:leading-8 text-black/70 font-light max-w-3xl mx-auto">
                    Real-time market sentiment analysis with our advanced Fear & Greed Index. Get instant alerts, API access, and detailed analysis of market psychology.
                  </p>

                  <div className="mt-6 sm:mt-8 lg:mt-10 flex items-center justify-center">
                    <a
                      href="https://app.perception.to/auth/sign-up"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white hover:bg-black/90 transition-all font-normal px-6 lg:px-8 text-sm sm:text-base shadow-lg hover:shadow-xl py-3 lg:py-4 rounded-lg"
                    >
                      Start Free
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
          <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">
            
            {/* What Is Section */}
            <section className="text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-5xl font-bold mb-8 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
                  What Is the Bitcoin Fear & Greed Index?
                </h2>
                <p className="text-xl leading-relaxed text-slate-600 dark:text-white/70 mb-8 font-light">
                  The Bitcoin Fear & Greed Index is a quantitative gauge that measures the prevailing sentiment in the cryptocurrency market. 
                  By aggregating multiple data sources—social media chatter, on-chain transaction volumes, Google Trends, sentiment analysis on news headlines, and market volatility—it distills complex market dynamics into a single score from 0 (extreme fear) to 100 (extreme greed).
                </p>
                <p className="text-xl leading-relaxed text-slate-600 dark:text-white/70 font-light">
                  This powerful tool helps traders, investors, and analysts understand market psychology and identify potential buying or selling opportunities based on crowd sentiment rather than just price action.
                </p>
              </div>
            </section>

            {/* How It's Calculated */}
            <section>
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">How It's Calculated</h3>
                <p className="text-xl text-slate-600 dark:text-white/70 font-light max-w-4xl mx-auto">
                  Unlike traditional metrics that rely on simple price data, our Fear & Greed Index uses advanced sentiment analysis 
                  from over 100+ sources, weighted by influence and velocity, to capture the true market psychology.
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
                <div>
                  <h4 className="text-2xl font-medium text-slate-900 mb-6">Advanced Sentiment Analysis</h4>
                  <p className="text-lg text-slate-600 leading-relaxed mb-6">
                    Our proprietary algorithm analyzes sentiment from 100+ diverse sources including major financial publications, 
                    social media platforms, crypto forums, and institutional reports. Each source is weighted based on its influence 
                    and reach, ensuring that high-impact outlets have appropriate representation in the final score.
                  </p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    We track sentiment velocity—how quickly market sentiment changes—which often precedes price movements by hours 
                    or even days. This gives traders a crucial early warning system for market shifts.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 border border-blue-100">
                  <h5 className="text-lg font-medium text-slate-900 mb-4">Source Categories</h5>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-slate-700">Major Financial Publications (Bloomberg, Reuters, CNBC)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span className="text-slate-700">Crypto-Specific Media (CoinDesk, Cointelegraph)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-slate-700">Social Media Platforms (Twitter, Reddit, Telegram)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-slate-700">Developer Forums & GitHub Activity</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-slate-700">Institutional Reports & Analyst Notes</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                <Card className="border-0 shadow-lg bg-white/80 dark:bg-white/5 dark:border-white/10 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="url(#iconGradient)" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="iconGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#222" stopOpacity="0.9" />
                              <stop offset="1" stopColor="#7f8cff" stopOpacity="0.3" />
                            </linearGradient>
                          </defs>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" fill="url(#iconGradient)" />
                        </svg>
                      </div>
                      <CardTitle className="text-lg font-medium text-slate-900">Weighted Influence</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">
                      Each source is weighted by its reach, credibility, and market impact. Major publications carry more weight 
                      than individual social media posts, but viral sentiment can quickly shift the balance.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 dark:bg-white/5 dark:border-white/10 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="url(#iconGradient)" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="iconGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#222" stopOpacity="0.9" />
                              <stop offset="1" stopColor="#7f8cff" stopOpacity="0.3" />
                            </linearGradient>
                          </defs>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" fill="url(#iconGradient)" />
                        </svg>
                      </div>
                      <CardTitle className="text-lg font-medium text-slate-900">Sentiment Velocity</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">
                      We track how quickly sentiment changes across sources. Rapid shifts often signal major market moves before 
                      they appear in price data, giving traders a crucial early warning system.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 dark:bg-white/5 dark:border-white/10 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-neutral-100 rounded-2xl flex items-center justify-center">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="url(#iconGradient)" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <linearGradient id="iconGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#222" stopOpacity="0.9" />
                              <stop offset="1" stopColor="#7f8cff" stopOpacity="0.3" />
                            </linearGradient>
                          </defs>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" fill="url(#iconGradient)" />
                        </svg>
                      </div>
                      <CardTitle className="text-lg font-medium text-slate-900">Real-Time Processing</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">
                      Our system processes new sentiment data every 90 seconds, ensuring you get the most current market psychology 
                      before it's reflected in traditional metrics.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-white/5 dark:to-white/5 rounded-3xl p-12 border border-slate-200/50 dark:border-white/10 mb-16">
                <h4 className="text-2xl font-medium text-slate-900 mb-8 text-center">Why This Beats Traditional Metrics</h4>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="text-lg font-medium text-slate-900 mb-4">Beyond Simple Price Data</h5>
                    <p className="text-slate-600 dark:text-white/70 leading-relaxed mb-4">
                      Traditional metrics like volatility and dominance only tell you what happened. Our sentiment analysis tells you 
                      what's about to happen by capturing the psychological drivers behind market movements.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Volatility: Reactive, shows past price swings</li>
                      <li>• Dominance: Limited to market cap ratios</li>
                      <li>• Google Trends: Lagging indicator of public interest</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-lg font-medium text-slate-900 mb-4">Predictive Power</h5>
                    <p className="text-slate-600 dark:text-white/70 leading-relaxed mb-4">
                      By analyzing sentiment velocity and weighted influence, we can identify market shifts before they appear in 
                      price data, giving you a significant trading advantage.
                    </p>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• Sentiment Velocity: Predicts price movements</li>
                      <li>• Weighted Analysis: Captures true market psychology</li>
                      <li>• Multi-Source: Reduces noise and false signals</li>
                    </ul>
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

            {/* Why It Matters */}
            <section>
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">Why It Matters</h3>
                <p className="text-xl text-slate-600 dark:text-white/70 font-light max-w-3xl mx-auto">
                  Emotions drive markets. When fear grips investors, they may sell off in a panic, creating price dips. When greed takes over, irrational exuberance can inflate bubbles. 
                  The Fear & Greed Index helps traders, institutions, and crypto-savvy individuals identify contrarian entry or exit points.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-red-100/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium text-red-800">Extreme Fear (0–25)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-700 leading-relaxed">
                      Potential buying opportunity as prices may be undervalued. Market sentiment is extremely negative, often indicating a bottom.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium text-yellow-800">Neutral (26–74)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-yellow-700 leading-relaxed">
                      Market balance—trend continuation likely. Sentiment is balanced, suggesting stable market conditions.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium text-green-800">Extreme Greed (75–100)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-700 leading-relaxed">
                      Caution warranted; signs of overbought conditions. Market may be due for a correction.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Use Cases */}
            <section>
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">Use Cases for Investors & Analysts</h3>
                <p className="text-lg text-slate-600 dark:text-white/70 font-light">Transform market sentiment into actionable insights</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium text-slate-900">Risk Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">
                      Adjust your position size or hedge exposure when sentiment reaches extremes. Use the index to time your risk management strategies.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium text-slate-900">Entry/Exit Signals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">
                      Combine the Index with technical analysis for precise timing. Extreme fear often signals buying opportunities, while extreme greed suggests caution.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium text-slate-900">Portfolio Diversification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">
                      Rebalance or rotate into other assets when greed spikes in Bitcoin. Use sentiment as a contrarian indicator for asset allocation.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl font-medium text-slate-900">Macro Correlation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 leading-relaxed">
                      Compare fear-greed swings against macro events like Fed announcements, regulatory news, or large-scale liquidations.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* API Access */}
            <section>
              <div className="text-center mb-16">
                <h3 className="text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-white/80 bg-clip-text text-transparent">Real-Time Alerts & API Access</h3>
                <p className="text-xl text-slate-600 dark:text-white/70 font-light max-w-3xl mx-auto">
                  Our Signal API delivers Fear & Greed scores with sub-90-second latency and can push alerts to Slack or MS Teams. 
                  Whether you're a developer building trading bots or an analyst monitoring risk dashboards, seamless integration means you never miss a market-sentiment shift.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-3xl p-12 border border-slate-200/50">
                <h4 className="text-2xl font-medium text-slate-900 dark:text-white mb-8 text-center">API Features</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700 dark:text-white/80">REST & WebSocket endpoints with ≤90s latency</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700 dark:text-white/80">Customizable alert rules (volume shocks, sentiment swings)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700 dark:text-white/80">Deep-links into our web viewer for detailed timelines</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700 dark:text-white/80">Historical data access for backtesting</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700 dark:text-white/80">Multiple data formats (JSON, CSV)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-slate-700 dark:text-white/80">Real-time sentiment analysis</span>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center">
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-16 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <h3 className="text-4xl font-bold !text-white mb-6 tracking-tight">Start Using the Bitcoin Fear & Greed Index Today</h3>
                  <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
                    Join leading institutions and traders who rely on real-time narrative signals to outpace the market.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <a
                      href="https://app.perception.to/auth/sign-up"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-slate-700 to-slate-500 hover:from-slate-800 hover:to-slate-600 text-white px-8 py-4 text-lg font-medium rounded-full shadow-2xl shadow-slate-500/25 transition-all duration-300"
                    >
                      Start Free
                    </a>
                    <a
                      href="https://perception.to/book-a-call"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-slate-300 dark:border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg font-medium rounded-full backdrop-blur-xl transition-all duration-300"
                    >
                      Get API Access
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* Disclaimer Section */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        <div className="bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-white/60 text-xs rounded-xl p-6 text-center border border-slate-200/60 dark:border-white/10">
          Disclaimer: The Bitcoin Fear & Greed Index is provided for informational purposes only and does not constitute financial advice. Always do your own research before making investment decisions.
        </div>
      </div>
    </>
  );
} 