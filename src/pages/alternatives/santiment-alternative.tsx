import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, BarChart3, Globe, Newspaper, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import AsciiBinaryFlow from '@/components/AsciiBinaryFlow';

const whatEachToolDoes = [
  {
    category: 'What Santiment Offers',
    items: ['All crypto coins coverage', 'Social & Telegram tracking', 'Trading-focused signals', 'Coin-specific sentiment'],
    isPerception: false
  },
  {
    category: 'What Perception Offers',
    items: ['Industry-wide intelligence', '650+ media sources', 'Mainstream news coverage', 'Knowledge worker focus'],
    isPerception: true
  }
];

const uniqueCapabilities = [
  {
    icon: Newspaper,
    title: 'Industry Intelligence',
    description: 'Santiment tracks individual coins for traders. Perception tracks the broader crypto industry for knowledge workers, researchers, and professionals.'
  },
  {
    icon: Globe,
    title: '650+ Media Sources',
    description: 'Monitor Bloomberg, Reuters, WSJ, CoinDesk, and 650+ outlets. Understand how the industry is being covered in mainstream and crypto media.'
  },
  {
    icon: Brain,
    title: 'Knowledge Worker Focus',
    description: 'Built for professionals who need industry context, not trading signals. Understand narratives, coverage trends, and media sentiment.'
  },
  {
    icon: BarChart3,
    title: 'Real-Time Transparency',
    description: 'Updates every 90 seconds. See exactly where sentiment is coming from with full source transparency.'
  },
];

const faqs = [
  {
    question: 'How is Perception different from Santiment?',
    answer: 'Santiment tracks all crypto coins across social media and Telegram - it\'s built for traders. Perception tracks the broader crypto industry through 650+ media sources - it\'s built for knowledge workers and professionals who need industry intelligence.'
  },
  {
    question: 'Which tool is better for trading?',
    answer: 'Santiment is designed for traders who want coin-specific sentiment signals. Perception is not a trading tool - it\'s an intelligence platform for understanding industry narratives and media coverage.'
  },
  {
    question: 'Does Perception cover individual cryptocurrencies?',
    answer: 'Perception focuses on industry-wide intelligence rather than coin-specific metrics. If you need sentiment for individual altcoins, Santiment is the better choice. Perception excels at understanding the broader narrative.'
  },
  {
    question: 'Can I use both Perception and Santiment?',
    answer: 'Yes, they serve different purposes. Use Santiment for coin-specific trading signals and social sentiment. Use Perception for industry intelligence and mainstream media coverage context.'
  },
];

export default function SantimentAlternativePage() {
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
        title="Santiment Alternative - Perception | Industry Intelligence Platform"
        description="Santiment vs Perception: Santiment is for traders tracking coins. Perception is for knowledge workers tracking the crypto industry through 650+ media sources."
        keywords={['Santiment alternative', 'Santiment competitor', 'crypto sentiment analysis', 'crypto media monitoring', 'industry intelligence']}
        url="https://perception.to/alternatives/santiment-alternative"
      >
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
                  <AsciiBinaryFlow />
                  {/* Overlay with comparison info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-white/60">For Traders</div>
                          <div className="text-lg font-bold text-white">Santiment</div>
                        </div>
                        <div className="text-2xl text-white/40">vs</div>
                        <div className="text-right">
                          <div className="text-sm text-orange-400/80">For Research</div>
                          <div className="text-lg font-bold text-orange-400">Perception</div>
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
                  Santiment Alternative
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-black mb-6">
                  Industry{' '}
                  <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Intelligence</em>
                </h1>

                <p className="text-lg sm:text-xl text-black/70 font-light leading-relaxed mb-8">
                  Santiment tracks coins for traders. Perception tracks the industry for knowledge workers. 650+ media sources, real-time updates, full transparency.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-black/90 rounded-2xl px-8 py-6 text-base font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a href="https://app.perception.to/auth/sign-up">
                      Start free trial
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/80 text-black hover:bg-white rounded-2xl px-8 py-6 text-base font-semibold border-2 border-black/20 hover:border-black/30 transition-all duration-300"
                    asChild
                  >
                    <Link to="/bitcoin-market-sentiment">
                      See Dashboard
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Each Tool Does - Black */}
        <section className="py-24 px-6 sm:px-16 lg:px-32 bg-black">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-medium text-white text-center mb-4">
              Different{' '}
              <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Purpose</em>
            </h2>
            <p className="text-center text-white/60 mb-16 max-w-2xl mx-auto">
              Santiment is for traders. Perception is for knowledge workers.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {whatEachToolDoes.map((section) => (
                <div
                  key={section.category}
                  className={`rounded-2xl p-8 ${
                    section.isPerception
                      ? 'bg-white/10 border-2 border-orange-400/30'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <h3 className={`text-xl font-semibold mb-6 ${
                    section.isPerception ? 'text-orange-400' : 'text-white'
                  }`}>
                    {section.category}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check className={`w-5 h-5 ${section.isPerception ? 'text-orange-400' : 'text-white/40'}`} />
                        <span className="text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Unique Capabilities - Black */}
        <section className="py-24 px-6 sm:px-16 lg:px-32 bg-black">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-medium text-white text-center mb-4">
              Why Choose{' '}
              <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Perception</em>
            </h2>
            <p className="text-center text-white/60 mb-16 max-w-2xl mx-auto">
              Built for professionals who need industry intelligence
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {uniqueCapabilities.map((capability) => (
                <div
                  key={capability.title}
                  className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                >
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
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

        {/* Stats Section - Cream */}
        <section className="py-24 px-6 sm:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-medium text-black mb-4">
              Industry{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Coverage</em>
            </h2>
            <p className="text-black/60 mb-16 text-lg">
              Comprehensive media intelligence for professionals
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-black rounded-2xl p-8">
                <div className="text-5xl font-bold text-orange-400 mb-2">650+</div>
                <div className="text-white/60">Media Sources</div>
              </div>
              <div className="bg-black rounded-2xl p-8">
                <div className="text-5xl font-bold text-orange-400 mb-2">90s</div>
                <div className="text-white/60">Real-Time Updates</div>
              </div>
              <div className="bg-black rounded-2xl p-8">
                <div className="text-5xl font-bold text-orange-400 mb-2">100%</div>
                <div className="text-white/60">Source Transparency</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Black */}
        <section className="py-24 px-6 sm:px-16 lg:px-32 bg-black">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-medium text-white text-center mb-4">
              Frequently Asked{' '}
              <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Questions</em>
            </h2>
            <p className="text-center text-white/60 mb-16">
              Common questions about Perception vs Santiment
            </p>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-white/70">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA - Cream */}
        <section className="py-24 px-6 sm:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-medium text-black mb-6">
              Industry{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>intelligence</em>{' '}
              for professionals
            </h2>
            <p className="text-xl text-black/60 mb-10">
              650+ sources. Real-time updates. 7-day free trial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-black/90 rounded-2xl px-8 py-6 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="https://app.perception.to/auth/sign-up">
                  Start free trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/80 text-black hover:bg-white rounded-2xl px-8 py-6 text-lg font-semibold border-2 border-black/20 hover:border-black/30 transition-all duration-300"
                asChild
              >
                <Link to="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Related Links - Cream */}
        <section className="py-16 px-6 sm:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-black text-center mb-8">
              More Comparisons
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Link
                to="/alternatives/lunarcrush-alternative"
                className="bg-white rounded-2xl p-6 border border-black/10 hover:border-black/30 transition-all duration-300 hover:shadow-lg group"
              >
                <h3 className="font-semibold text-black mb-2 group-hover:text-orange-500 transition-colors">Perception vs LunarCrush</h3>
                <p className="text-sm text-black/60">Social + media vs social only</p>
              </Link>
              <Link
                to="/alternatives/alternative-me-alternative"
                className="bg-white rounded-2xl p-6 border border-black/10 hover:border-black/30 transition-all duration-300 hover:shadow-lg group"
              >
                <h3 className="font-semibold text-black mb-2 group-hover:text-orange-500 transition-colors">Perception vs Alternative.me</h3>
                <p className="text-sm text-black/60">Real-time vs daily Fear & Greed updates</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
