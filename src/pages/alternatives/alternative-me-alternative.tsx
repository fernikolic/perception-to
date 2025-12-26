import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, BarChart3, Globe, Newspaper, Brain, Plus, Zap, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const whatPerceptionAdds = [
  {
    category: 'What Alternative.me Offers',
    items: ['Basic Fear & Greed Index', 'Daily updates', '5-6 data sources', 'Simple visualization'],
    color: 'slate'
  },
  {
    category: 'What Perception Adds',
    items: ['650+ media & news sources', '90-second updates', 'AI narrative tracking', 'Mainstream media coverage'],
    color: 'green'
  }
];

const uniqueCapabilities = [
  {
    icon: Newspaper,
    title: 'Media-Powered Sentiment',
    description: 'Alternative.me uses volatility, volume, and social trends. Perception reads 650+ actual news articles and media sources. Understand the narrative behind the number.'
  },
  {
    icon: Clock,
    title: '90-Second Updates',
    description: 'Alternative.me updates once daily. Perception updates every 90 seconds. In fast-moving markets, daily data is already old.'
  },
  {
    icon: Brain,
    title: 'AI Narrative Detection',
    description: 'Our AI identifies emerging stories across all media. See what narratives are driving sentiment - not just that sentiment changed, but why.'
  },
  {
    icon: Globe,
    title: 'Mainstream + Crypto Coverage',
    description: 'Track when crypto stories hit Bloomberg, Reuters, WSJ. Know when Bitcoin is making mainstream news before it affects the index.'
  },
];

const comparisonPoints = [
  { label: 'Data Sources', alternative: '5-6 indicators', perception: '650+ sources' },
  { label: 'Update Speed', alternative: 'Daily', perception: 'Every 90 seconds' },
  { label: 'Media Coverage', alternative: 'None', perception: 'Comprehensive' },
  { label: 'Narrative Tracking', alternative: 'None', perception: 'AI-powered' },
  { label: 'Historical Data', alternative: 'Basic chart', perception: 'Full analytics' },
  { label: 'API Access', alternative: 'Limited', perception: 'Full REST API' },
];

const faqs = [
  {
    question: 'Should I use Perception instead of Alternative.me?',
    answer: 'They serve different purposes. Alternative.me provides a quick, free Fear & Greed Index for casual reference. Perception offers deep media intelligence for professional research and trading. If you need to understand WHY sentiment is changing, add Perception.'
  },
  {
    question: 'What makes Perception\'s Fear & Greed Index different?',
    answer: 'Our index is powered by 650+ media sources, not just 5-6 indicators. We analyze actual news content and media coverage to understand narrative context. Plus, we update every 90 seconds vs daily.'
  },
  {
    question: 'Is Perception free like Alternative.me?',
    answer: 'Perception offers a 14-day free trial with full access. Our paid plans include features far beyond a simple index: narrative tracking, media monitoring, API access, and alerts. Alternative.me is free for basic index viewing.'
  },
  {
    question: 'Can I use both Alternative.me and Perception?',
    answer: 'Absolutely. Many users check Alternative.me for a quick daily reference and use Perception for deeper analysis. Perception shows you the media context behind sentiment changes that a simple index can\'t capture.'
  },
  {
    question: 'Why are the sentiment scores sometimes different?',
    answer: 'Different methodologies. Alternative.me uses volatility, volume, social media, dominance, and trends. Perception analyzes 650+ media sources with AI to understand narrative context. We\'re measuring related but distinct signals.'
  },
];

export default function AlternativeMeAlternativePage() {
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
        title="Alternative.me Alternative - Perception | Advanced Fear & Greed Analysis"
        description="Go beyond the basic Fear & Greed Index. Perception offers 650+ media sources, 90-second updates, and AI narrative tracking. See what's really driving crypto sentiment."
        keywords={['Alternative.me alternative', 'Fear and Greed Index alternative', 'crypto sentiment analysis', 'bitcoin fear greed', 'advanced sentiment tool']}
        url="https://perception.to/alternatives/alternative-me-alternative"
      >
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </SEO>

      <div className="min-h-screen bg-[#F0EEE6]">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-600 rounded-full px-4 py-2 text-sm font-medium mb-8">
              <Plus className="w-4 h-4" />
              Alternative.me Alternative
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight">
              Like the Fear & Greed Index?<br />
              <span className="text-orange-500">Go Deeper</span>
            </h1>

            <p className="text-xl text-black/60 max-w-3xl mx-auto mb-10">
              Alternative.me shows you a number. Perception shows you why.
              650+ media sources, 90-second updates, and AI narrative tracking.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black hover:bg-black/90 text-white px-8 py-6 text-lg rounded-full" asChild>
                <a href="https://app.perception.to/auth/sign-up">
                  Try Free for 14 Days
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full border-black/20 hover:border-black/30" asChild>
                <Link to="/bitcoin-fear-greed-index">
                  See Our Fear & Greed Index
                </Link>
              </Button>
            </div>

            <p className="text-sm text-black/50 mt-4">
              No credit card required. Get the full picture.
            </p>
          </div>
        </section>

        {/* Quick Comparison */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-4">
              Basic Index vs. Full Intelligence
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Alternative.me is a starting point. Perception is the complete picture.
            </p>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 bg-white/10 p-4 font-semibold text-white">
                <div>Feature</div>
                <div className="text-center">Alternative.me</div>
                <div className="text-center text-orange-400">Perception</div>
              </div>

              {comparisonPoints.map((point, index) => (
                <div
                  key={point.label}
                  className={`grid grid-cols-3 p-4 ${index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}`}
                >
                  <div className="font-medium text-white">
                    {point.label}
                  </div>
                  <div className="text-center text-sm text-white/50">
                    {point.alternative}
                  </div>
                  <div className="text-center flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 text-orange-400" />
                    <span className="text-sm text-orange-400 font-medium">
                      {point.perception}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Each Offers */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F0EEE6]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-black mb-4">
              Free Index vs. Full Intelligence
            </h2>
            <p className="text-center text-black/60 mb-12 max-w-2xl mx-auto">
              Alternative.me is great for a quick check. Perception is for serious research.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {whatPerceptionAdds.map((section) => (
                <div
                  key={section.category}
                  className={`rounded-2xl p-8 ${
                    section.color === 'green'
                      ? 'bg-orange-500/10 border-2 border-orange-500/30'
                      : 'bg-white/50 border border-black/10'
                  }`}
                >
                  <h3 className={`text-xl font-semibold mb-6 ${
                    section.color === 'green' ? 'text-orange-600' : 'text-black'
                  }`}>
                    {section.category}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check className={`w-5 h-5 ${section.color === 'green' ? 'text-orange-500' : 'text-black/40'}`} />
                        <span className="text-black/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Unique Capabilities Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-4">
              What Only Perception Offers
            </h2>
            <p className="text-center text-white/60 mb-16 max-w-2xl mx-auto">
              Go beyond a simple number
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {uniqueCapabilities.map((capability) => (
                <div
                  key={capability.title}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mb-6">
                    <capability.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {capability.title}
                  </h3>
                  <p className="text-white/60">
                    {capability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F0EEE6]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-black">
              The Complete Sentiment Picture
            </h2>
            <p className="text-black/60 mb-12 text-lg">
              Understand what's really driving market sentiment
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">650+</div>
                <div className="text-black/60">Media Sources</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">90s</div>
                <div className="text-black/60">vs Daily Updates</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-500 mb-2">AI</div>
                <div className="text-black/60">Narrative Detection</div>
              </div>
            </div>
            <Button size="lg" className="bg-black hover:bg-black/90 text-white px-8 py-6 text-lg rounded-full" asChild>
              <a href="https://app.perception.to/auth/sign-up">
                Get the Full Picture
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-white/60 mb-12">
              Common questions about Perception vs Alternative.me
            </p>

            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-white/5 border border-white/10 rounded-xl p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-white/60">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F0EEE6]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-black">
              Ready to Go Beyond the Index?
            </h2>
            <p className="text-xl mb-10 text-black/60">
              Understand what's driving crypto sentiment. 14 days free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black text-white hover:bg-black/90 px-8 py-6 text-lg rounded-full" asChild>
                <a href="https://app.perception.to/auth/sign-up">
                  Try Perception Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-black/20 hover:border-black/30 px-8 py-6 text-lg rounded-full" asChild>
                <Link to="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
