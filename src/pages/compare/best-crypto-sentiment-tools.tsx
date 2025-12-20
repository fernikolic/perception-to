import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, X, ArrowRight, Star, Zap, Globe, BarChart3, MessageSquare, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Tool {
  name: string;
  logo: string;
  description: string;
  bestFor: string;
  pricing: string;
  pricingNote: string;
  rating: number;
  features: {
    socialSentiment: boolean;
    mediaCoverage: boolean;
    realTimeAlerts: boolean;
    api: boolean;
    narrativeTracking: boolean;
    onChainData: boolean;
  };
  pros: string[];
  cons: string[];
  url: string;
  isPerception?: boolean;
}

const tools: Tool[] = [
  {
    name: 'Perception',
    logo: '/images/logo.png',
    description: 'AI-powered media intelligence platform tracking 650+ news sources for crypto sentiment, narrative detection, and market psychology analysis.',
    bestFor: 'Media monitoring, narrative tracking, PR teams',
    pricing: 'From $49/mo',
    pricingNote: '14-day free trial',
    rating: 4.9,
    features: {
      socialSentiment: true,
      mediaCoverage: true,
      realTimeAlerts: true,
      api: true,
      narrativeTracking: true,
      onChainData: false,
    },
    pros: [
      '650+ media sources including Bloomberg, Reuters, WSJ',
      'Real-time updates every 90 seconds',
      'AI-powered narrative detection',
      'Slack integration for alerts',
      'Fear & Greed Index with velocity tracking'
    ],
    cons: [
      'Focused on media, not on-chain data',
      'Newer platform (launched 2024)'
    ],
    url: 'https://app.perception.to/auth/sign-up',
    isPerception: true
  },
  {
    name: 'LunarCrush',
    logo: '/images/competitors/lunarcrush.png',
    description: 'Social intelligence platform focused on crypto social media metrics, Galaxy Score, and influencer tracking across Twitter, Reddit, and other platforms.',
    bestFor: 'Social media sentiment, influencer tracking',
    pricing: 'From $99/mo',
    pricingNote: 'Free tier available',
    rating: 4.5,
    features: {
      socialSentiment: true,
      mediaCoverage: false,
      realTimeAlerts: true,
      api: true,
      narrativeTracking: false,
      onChainData: false,
    },
    pros: [
      'Comprehensive social media tracking',
      'Galaxy Score for quick sentiment',
      'Influencer identification',
      'Good mobile app'
    ],
    cons: [
      'No news/media coverage',
      'Social-only focus',
      'Can be noisy with bot activity'
    ],
    url: 'https://lunarcrush.com'
  },
  {
    name: 'Santiment',
    logo: '/images/competitors/santiment.png',
    description: 'On-chain and social analytics platform combining blockchain data with social metrics for comprehensive crypto market analysis.',
    bestFor: 'On-chain analysis, trading signals',
    pricing: 'From $49/mo',
    pricingNote: 'Limited free tier',
    rating: 4.4,
    features: {
      socialSentiment: true,
      mediaCoverage: false,
      realTimeAlerts: true,
      api: true,
      narrativeTracking: false,
      onChainData: true,
    },
    pros: [
      'Strong on-chain metrics',
      'Social volume tracking',
      'Developer activity monitoring',
      'Trading-focused insights'
    ],
    cons: [
      'Steep learning curve',
      'No mainstream media coverage',
      'Complex for beginners'
    ],
    url: 'https://santiment.net'
  },
  {
    name: 'Alternative.me Fear & Greed',
    logo: '/images/competitors/alternative-me.png',
    description: 'Free Bitcoin Fear & Greed Index based on volatility, market momentum, social media, and Google Trends data.',
    bestFor: 'Quick sentiment check, free access',
    pricing: 'Free',
    pricingNote: 'No paid tiers',
    rating: 4.0,
    features: {
      socialSentiment: true,
      mediaCoverage: false,
      realTimeAlerts: false,
      api: false,
      narrativeTracking: false,
      onChainData: false,
    },
    pros: [
      'Completely free',
      'Simple to understand',
      'Long history of data',
      'Well-known benchmark'
    ],
    cons: [
      'Updates only once daily',
      'Limited data sources',
      'No API or alerts',
      'No context on WHY sentiment changed'
    ],
    url: 'https://alternative.me/crypto/fear-and-greed-index/'
  },
  {
    name: 'The TIE',
    logo: '/images/competitors/the-tie.png',
    description: 'Enterprise-grade crypto data platform providing sentiment analysis, news aggregation, and market intelligence for institutional clients.',
    bestFor: 'Institutional investors, hedge funds',
    pricing: 'Custom pricing',
    pricingNote: 'Enterprise only',
    rating: 4.6,
    features: {
      socialSentiment: true,
      mediaCoverage: true,
      realTimeAlerts: true,
      api: true,
      narrativeTracking: true,
      onChainData: false,
    },
    pros: [
      'Institutional-grade data',
      'Comprehensive coverage',
      'Strong API',
      'Regulatory compliance features'
    ],
    cons: [
      'Very expensive',
      'Enterprise sales process',
      'Not accessible for individuals',
      'No public pricing'
    ],
    url: 'https://thetie.io'
  },
  {
    name: 'Messari',
    logo: '/images/competitors/messari.png',
    description: 'Crypto research and data platform offering market intelligence, research reports, and portfolio tracking tools.',
    bestFor: 'Research reports, fundamental analysis',
    pricing: 'From $29/mo',
    pricingNote: 'Free tier available',
    rating: 4.5,
    features: {
      socialSentiment: false,
      mediaCoverage: true,
      realTimeAlerts: true,
      api: true,
      narrativeTracking: false,
      onChainData: false,
    },
    pros: [
      'High-quality research reports',
      'Strong fundamentals data',
      'Good for due diligence',
      'Screener tools'
    ],
    cons: [
      'Limited real-time sentiment',
      'Research-focused, not trading',
      'No social sentiment tracking'
    ],
    url: 'https://messari.io'
  }
];

const faqs = [
  {
    question: 'Which crypto sentiment tool is best for beginners?',
    answer: 'For beginners, Alternative.me Fear & Greed Index is a good free starting point. For more comprehensive insights without complexity, Perception offers an intuitive interface with AI-powered analysis that explains WHY sentiment is changing, not just showing numbers.'
  },
  {
    question: 'What\'s the difference between social sentiment and media sentiment?',
    answer: 'Social sentiment tracks Twitter, Reddit, and Telegram discussions - what retail traders are saying. Media sentiment tracks news coverage from Bloomberg, Reuters, CoinDesk and hundreds of publications - what journalists and institutions are reporting. Professional teams track both.'
  },
  {
    question: 'Do I need to pay for crypto sentiment tools?',
    answer: 'Free tools like Alternative.me provide basic insights. Paid tools offer real-time updates, API access, alerts, and deeper analysis. If you\'re making serious investment decisions or managing client funds, professional tools typically pay for themselves through better-informed decisions.'
  },
  {
    question: 'Which tool is best for trading?',
    answer: 'For trading, you want real-time updates and alerts. LunarCrush is popular for social-driven trading. Santiment combines social with on-chain data. Perception is best if you trade on news and narratives rather than social volume.'
  },
  {
    question: 'Can I use multiple sentiment tools together?',
    answer: 'Yes, and many professional teams do exactly this. A common stack: LunarCrush for social signals + Perception for media intelligence + Santiment for on-chain data. Each tool has different strengths that complement each other.'
  }
];

const FeatureIcon = ({ available }: { available: boolean }) => (
  available ? (
    <Check className="w-5 h-5 text-green-500" />
  ) : (
    <X className="w-5 h-5 text-slate-300 dark:text-slate-600" />
  )
);

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${
          star <= rating
            ? 'text-yellow-400 fill-yellow-400'
            : star <= rating + 0.5
            ? 'text-yellow-400 fill-yellow-400/50'
            : 'text-slate-300'
        }`}
      />
    ))}
    <span className="ml-1 text-sm text-slate-600 dark:text-slate-400">{rating}</span>
  </div>
);

export default function BestCryptoSentimentToolsPage() {
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

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Best Crypto Sentiment Analysis Tools 2025 - Complete Comparison',
    description: 'Compare the top crypto sentiment analysis tools including Perception, LunarCrush, Santiment, and more. Find the best tool for your trading and research needs.',
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
        title="Best Crypto Sentiment Analysis Tools 2025 - Complete Comparison"
        description="Compare the top 6 crypto sentiment tools: Perception, LunarCrush, Santiment, Alternative.me, The TIE, and Messari. Features, pricing, and which is best for you."
        keywords={[
          'best crypto sentiment tools',
          'crypto sentiment analysis',
          'bitcoin sentiment tools',
          'LunarCrush vs Santiment',
          'crypto market sentiment',
          'fear and greed index tools'
        ]}
        url="https://perception.to/compare/best-crypto-sentiment-tools"
      >
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </SEO>

      <div className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <BarChart3 className="w-4 h-4" />
                Updated December 2025
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                Best Crypto Sentiment Tools<br />
                <span className="text-orange-500">Compared for 2025</span>
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                We analyzed 6 leading crypto sentiment platforms. Here's how they compare
                on features, pricing, and which one is right for your needs.
              </p>
            </div>

            {/* Quick Summary */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 mb-16">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Picks</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <div className="text-sm text-slate-500 mb-1">Best Overall</div>
                  <div className="font-semibold text-slate-900 dark:text-white">Perception</div>
                  <div className="text-xs text-orange-500">650+ media sources</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <div className="text-sm text-slate-500 mb-1">Best for Social</div>
                  <div className="font-semibold text-slate-900 dark:text-white">LunarCrush</div>
                  <div className="text-xs text-slate-500">Galaxy Score</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <div className="text-sm text-slate-500 mb-1">Best for On-Chain</div>
                  <div className="font-semibold text-slate-900 dark:text-white">Santiment</div>
                  <div className="text-xs text-slate-500">Blockchain data</div>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <div className="text-sm text-slate-500 mb-1">Best Free Option</div>
                  <div className="font-semibold text-slate-900 dark:text-white">Alternative.me</div>
                  <div className="text-xs text-slate-500">Basic F&G Index</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
              Feature Comparison
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Tool</th>
                    <th className="text-center py-4 px-3 font-semibold text-slate-900 dark:text-white">Social</th>
                    <th className="text-center py-4 px-3 font-semibold text-slate-900 dark:text-white">Media</th>
                    <th className="text-center py-4 px-3 font-semibold text-slate-900 dark:text-white">Alerts</th>
                    <th className="text-center py-4 px-3 font-semibold text-slate-900 dark:text-white">API</th>
                    <th className="text-center py-4 px-3 font-semibold text-slate-900 dark:text-white">Narratives</th>
                    <th className="text-center py-4 px-3 font-semibold text-slate-900 dark:text-white">On-Chain</th>
                    <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Pricing</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map((tool) => (
                    <tr
                      key={tool.name}
                      className={`border-b border-slate-200 dark:border-slate-700 ${
                        tool.isPerception ? 'bg-orange-50 dark:bg-orange-900/10' : ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {tool.name}
                            {tool.isPerception && (
                              <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded">Our Pick</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-4 px-3"><FeatureIcon available={tool.features.socialSentiment} /></td>
                      <td className="text-center py-4 px-3"><FeatureIcon available={tool.features.mediaCoverage} /></td>
                      <td className="text-center py-4 px-3"><FeatureIcon available={tool.features.realTimeAlerts} /></td>
                      <td className="text-center py-4 px-3"><FeatureIcon available={tool.features.api} /></td>
                      <td className="text-center py-4 px-3"><FeatureIcon available={tool.features.narrativeTracking} /></td>
                      <td className="text-center py-4 px-3"><FeatureIcon available={tool.features.onChainData} /></td>
                      <td className="py-4 px-4 text-slate-600 dark:text-slate-400">{tool.pricing}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Detailed Reviews */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">
              Detailed Tool Reviews
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">
              In-depth look at each platform's strengths and weaknesses
            </p>

            <div className="space-y-8">
              {tools.map((tool, index) => (
                <div
                  key={tool.name}
                  id={tool.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}
                  className={`rounded-2xl p-6 sm:p-8 border ${
                    tool.isPerception
                      ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                              {index + 1}. {tool.name}
                            </h3>
                            {tool.isPerception && (
                              <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">Editor's Choice</span>
                            )}
                          </div>
                          <StarRating rating={tool.rating} />
                        </div>
                      </div>

                      <p className="text-slate-600 dark:text-slate-400 mb-4">
                        {tool.description}
                      </p>

                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-600 dark:text-slate-400">Best for: {tool.bestFor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="w-4 h-4 text-slate-500" />
                          <span className="text-slate-600 dark:text-slate-400">{tool.pricing}</span>
                          <span className="text-xs text-slate-500">({tool.pricingNote})</span>
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                            <Check className="w-4 h-4" /> Pros
                          </h4>
                          <ul className="space-y-2">
                            {tool.pros.map((pro) => (
                              <li key={pro} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-500 mb-3 flex items-center gap-2">
                            <X className="w-4 h-4" /> Cons
                          </h4>
                          <ul className="space-y-2">
                            {tool.cons.map((con) => (
                              <li key={con} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                                <X className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - CTA */}
                    <div className="lg:w-64 flex-shrink-0">
                      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 text-center">
                        <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{tool.pricing}</div>
                        <div className="text-sm text-slate-500 mb-4">{tool.pricingNote}</div>
                        <Button
                          className={`w-full ${
                            tool.isPerception
                              ? 'bg-orange-500 hover:bg-orange-600 text-white'
                              : 'bg-slate-800 hover:bg-slate-700 text-white dark:bg-slate-600'
                          }`}
                          asChild
                        >
                          <a href={tool.url} target={tool.isPerception ? undefined : '_blank'} rel={tool.isPerception ? undefined : 'noopener noreferrer'}>
                            {tool.isPerception ? 'Try Free' : 'Visit Site'}
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

        {/* How to Choose Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">
              How to Choose the Right Tool
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
              The best tool depends on your use case
            </p>

            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  For Social Media Traders
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  If you trade based on Twitter trends and Reddit sentiment, <strong>LunarCrush</strong> is your best bet.
                  Their Galaxy Score and social volume metrics are industry-leading.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-orange-500" />
                  For News & Narrative Tracking
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  If you need to know what Bloomberg, Reuters, and crypto publications are reporting,
                  <strong> Perception</strong> is the only tool monitoring 650+ media sources with AI-powered narrative detection.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  For On-Chain Analysis
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-3">
                  If blockchain data matters to your strategy, <strong>Santiment</strong> combines on-chain metrics
                  with social data for a comprehensive view of market activity.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-500" />
                  For Complete Market Coverage
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Many professional teams use multiple tools: <strong>LunarCrush</strong> for social +
                  <strong> Perception</strong> for media + <strong>Santiment</strong> for on-chain.
                  This gives you the complete picture of market sentiment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
              Common questions about crypto sentiment tools
            </p>

            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700"
                >
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-800">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Add Media Intelligence?
            </h2>
            <p className="text-xl mb-10 text-slate-300">
              Try Perception free for 14 days. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 px-8 py-6 text-lg" asChild>
                <a href="https://app.perception.to/auth/sign-up">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-700 px-8 py-6 text-lg" asChild>
                <Link to="/bitcoin-fear-greed-index">
                  See Live Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
              Related Comparisons
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link
                to="/alternatives/lunarcrush-alternative"
                className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-orange-300 transition-colors"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Perception vs LunarCrush</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Detailed comparison of social vs media intelligence</p>
              </Link>
              <Link
                to="/alternatives/santiment-alternative"
                className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-orange-300 transition-colors"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Perception vs Santiment</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Media coverage vs on-chain data focus</p>
              </Link>
              <Link
                to="/alternatives/alternative-me-alternative"
                className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-orange-300 transition-colors"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Perception vs Alternative.me</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Free vs professional Fear & Greed tools</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
