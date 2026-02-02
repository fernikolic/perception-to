import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Newspaper, Clock, Globe, Eye, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import AsciiDiagonalPetals from '@/components/AsciiDiagonalPetals';

const comparisonPoints = [
  { label: 'Data Sources', alternative: '5-6 indicators', perception: '450+ sources' },
  { label: 'Update Speed', alternative: 'Every 4 hours', perception: 'Every 90 seconds' },
  { label: 'Source Transparency', alternative: 'Limited', perception: 'Full transparency' },
  { label: 'Media Coverage', alternative: 'None', perception: 'Comprehensive' },
  { label: 'Historical Data', alternative: 'Basic chart', perception: 'Full analytics' },
  { label: 'API Access', alternative: 'Limited', perception: 'Full REST API' },
];

const uniqueCapabilities = [
  {
    icon: Eye,
    title: 'Full Transparency',
    description: 'See exactly where sentiment data comes from. Every source is visible. No black box algorithms hiding behind a single number.'
  },
  {
    icon: Clock,
    title: '90-Second Updates',
    description: 'Alternative.me updates every 4 hours. Perception updates every 90 seconds. In fast-moving markets, hours-old data is already stale.'
  },
  {
    icon: Newspaper,
    title: '650+ Media Sources',
    description: 'Real news coverage from Bloomberg, Reuters, CoinDesk, and hundreds more. Understand the actual media landscape, not just derived metrics.'
  },
  {
    icon: Globe,
    title: 'Mainstream + Crypto',
    description: 'Track when crypto stories break into mainstream media. Know what Bloomberg and WSJ are saying, not just crypto Twitter.'
  },
];

const faqs = [
  {
    question: 'Should I use Perception instead of Alternative.me?',
    answer: 'They serve different purposes. Alternative.me provides a quick, free Fear & Greed Index for casual reference. Perception offers real-time updates, 450+ sources, and full transparency into where sentiment data comes from.'
  },
  {
    question: 'What makes Perception\'s Fear & Greed Index different?',
    answer: 'Three things: transparency (you see every source), speed (90-second updates vs every 4 hours), and depth (650+ media sources vs 5-6 indicators). You understand what\'s driving sentiment, not just the number.'
  },
  {
    question: 'Is Perception free like Alternative.me?',
    answer: 'Perception offers paid plans with real-time updates, 450+ sources, API access, and full source transparency. Book a demo to see it in action. Alternative.me is free but updates every 4 hours.'
  },
  {
    question: 'Why does update speed matter?',
    answer: 'Markets move fast. When major news breaks, sentiment shifts within minutes. A 4-hour update can miss critical movements. 90-second updates show you what\'s happening now.'
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
        title="Alternative.me Alternative - Perception | Real-Time Fear & Greed"
        description="Go beyond 4-hour updates. Perception offers 90-second updates, 650+ media sources, and full source transparency. See what's really driving crypto sentiment."
        keywords={['Alternative.me alternative', 'Fear and Greed Index alternative', 'crypto sentiment analysis', 'bitcoin fear greed', 'real-time sentiment']}
        url="https://perception.to/alternatives/alternative-me-alternative"
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
                  <AsciiDiagonalPetals />
                  {/* Overlay with comparison info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">650+</div>
                          <div className="text-white/60 text-sm">vs 5-6 sources</div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-400">90s</div>
                          <div className="text-white/60 text-sm">vs 4-hour updates</div>
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
                  Alternative.me Alternative
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-black mb-6">
                  Real-Time{' '}
                  <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Transparency</em>
                </h1>

                <p className="text-lg sm:text-xl text-black/70 font-light leading-relaxed mb-8">
                  4-hour updates miss the action. Get 90-second updates, 650+ media sources, and full transparency into where sentiment comes from.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-black/90 rounded-2xl px-8 py-6 text-base font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a href="/book-a-call">
                      Book a Demo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/80 text-black hover:bg-white rounded-2xl px-8 py-6 text-base font-semibold border-2 border-black/20 hover:border-black/30 transition-all duration-300"
                    asChild
                  >
                    <Link to="/bitcoin-fear-greed-index">
                      See our Fear & Greed
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Comparison - Black */}
        <section className="py-24 px-6 sm:px-16 lg:px-32 bg-black">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-medium text-white text-center mb-4">
              Feature{' '}
              <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Comparison</em>
            </h2>
            <p className="text-center text-white/60 mb-16 max-w-2xl mx-auto">
              4-hour updates vs real-time intelligence
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
                  className={`grid grid-cols-3 p-4 items-center ${index % 2 === 0 ? 'bg-white/5' : 'bg-transparent'}`}
                >
                  <div className="font-medium text-white">
                    {point.label}
                  </div>
                  <div className="text-center flex items-center justify-center gap-2">
                    <X className="w-4 h-4 text-white/30" />
                    <span className="text-sm text-white/50">
                      {point.alternative}
                    </span>
                  </div>
                  <div className="text-center flex items-center justify-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm text-orange-400 font-medium">
                      {point.perception}
                    </span>
                  </div>
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
              Real-time updates with full source transparency
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
              Real-Time{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Intelligence</em>
            </h2>
            <p className="text-black/60 mb-16 text-lg">
              Speed, depth, and transparency
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-black rounded-2xl p-8">
                <div className="text-5xl font-bold text-orange-400 mb-2">650+</div>
                <div className="text-white/60">Media Sources</div>
              </div>
              <div className="bg-black rounded-2xl p-8">
                <div className="text-5xl font-bold text-orange-400 mb-2">90s</div>
                <div className="text-white/60">Update Speed</div>
              </div>
              <div className="bg-black rounded-2xl p-8">
                <div className="text-5xl font-bold text-orange-400 mb-2">100%</div>
                <div className="text-white/60">Transparent</div>
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
              Common questions about Perception vs Alternative.me
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
              Real-time{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>transparency</em>
            </h2>
            <p className="text-xl text-black/60 mb-10">
              450+ sources. 90-second updates. Book a demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-black/90 rounded-2xl px-8 py-6 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="/book-a-call">
                  Book a Demo
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
                to="/alternatives/santiment-alternative"
                className="bg-white rounded-2xl p-6 border border-black/10 hover:border-black/30 transition-all duration-300 hover:shadow-lg group"
              >
                <h3 className="font-semibold text-black mb-2 group-hover:text-orange-500 transition-colors">Perception vs Santiment</h3>
                <p className="text-sm text-black/60">Industry intelligence vs trading signals</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
