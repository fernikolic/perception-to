import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, BarChart3, Globe, Newspaper, Brain, Plus, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const whatEachToolDoes = [
  {
    category: 'What Santiment Does Well',
    items: ['On-chain analytics', 'Developer activity tracking', 'Whale movements', 'Token metrics'],
    color: 'slate'
  },
  {
    category: 'What Perception Adds',
    items: ['650+ news & media sources', 'AI narrative detection', 'Mainstream media coverage', 'Real-time media sentiment'],
    color: 'blue'
  }
];

const uniqueCapabilities = [
  {
    icon: Newspaper,
    title: 'Media Intelligence Layer',
    description: 'Santiment tracks on-chain. Perception tracks media. Monitor how Bloomberg, Reuters, CoinDesk, and 650+ outlets cover crypto. Understand narrative context that on-chain data can\'t show.'
  },
  {
    icon: TrendingUp,
    title: 'Narrative Before On-Chain',
    description: 'Media narratives often precede on-chain movements. Catch the story developing in news before it shows up in wallet activity. Media + on-chain = complete picture.'
  },
  {
    icon: Brain,
    title: 'AI-Powered Story Detection',
    description: 'Our AI reads and understands content across 650+ sources. See what narratives are emerging, which outlets are covering them, and how stories spread through media.'
  },
  {
    icon: Globe,
    title: 'Mainstream + Crypto Media',
    description: 'Track both crypto-native outlets and mainstream financial media. Know when Bitcoin stories cross into Bloomberg, WSJ, and Reuters.'
  },
];

const faqs = [
  {
    question: 'Should I replace Santiment with Perception?',
    answer: 'No - they do different things. Santiment excels at on-chain analytics and developer metrics. Perception specializes in media intelligence and narrative tracking. Many professional teams use both: Santiment for on-chain data, Perception for media coverage.'
  },
  {
    question: 'What does Perception track that Santiment doesn\'t?',
    answer: 'Perception monitors 650+ media sources including Bloomberg, Reuters, WSJ, CoinDesk, The Block, and institutional reports. We specialize in understanding how narratives develop and spread through news media - something on-chain data can\'t capture.'
  },
  {
    question: 'How do media signals complement on-chain data?',
    answer: 'Media narratives often precede or explain on-chain movements. When you see unusual on-chain activity in Santiment, Perception can show you the media context - the news driving those movements. Together they provide complete market intelligence.'
  },
  {
    question: 'Is Perception easier to use than Santiment?',
    answer: 'Perception is designed for quick insights with an intuitive interface. Santiment is powerful but technical. If you need media intelligence without a learning curve, Perception delivers insights in minutes.'
  },
  {
    question: 'Can I use Perception and Santiment together?',
    answer: 'Absolutely - this is the recommended approach for serious researchers and traders. Use Santiment for on-chain analytics and Perception for media intelligence. The combination gives you both what\'s happening on-chain AND why it\'s happening.'
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
        title="Santiment Alternative - Perception | Crypto Media Intelligence"
        description="Looking for a Santiment alternative? Perception offers 650+ media sources, faster updates, and simpler UX. Best for media monitoring and narrative tracking."
        keywords={['Santiment alternative', 'Santiment competitor', 'crypto sentiment analysis', 'on-chain alternative', 'crypto media monitoring']}
        url="https://perception.to/alternatives/santiment-alternative"
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
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              Santiment Alternative
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 tracking-tight">
              Already Using Santiment?<br />
              <span className="text-orange-500">Add Media Intelligence</span>
            </h1>

            <p className="text-xl text-black/60 max-w-3xl mx-auto mb-10">
              Santiment shows what's happening on-chain. Perception shows why.
              Add 650+ media sources, narrative tracking, and mainstream coverage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black text-white hover:bg-black/90 px-8 py-6 text-lg rounded-full" asChild>
                <a href="https://app.perception.to/auth/sign-up">
                  Try Free for 14 Days
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-full border-black/20 hover:border-black/30" asChild>
                <Link to="/bitcoin-market-sentiment">
                  See Media Dashboard
                </Link>
              </Button>
            </div>

            <p className="text-sm text-black/50 mt-4">
              No credit card required. Works alongside your on-chain tools.
            </p>
          </div>
        </section>

        {/* What Each Tool Does */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-4">
              On-Chain + Media = Complete Picture
            </h2>
            <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
              Santiment and Perception track different signals - use both
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {whatEachToolDoes.map((section) => (
                <div
                  key={section.category}
                  className={`rounded-2xl p-8 ${
                    section.color === 'blue'
                      ? 'bg-white/10 border-2 border-orange-400/30'
                      : 'bg-white/5 border border-white/10'
                  }`}
                >
                  <h3 className={`text-xl font-semibold mb-6 ${
                    section.color === 'blue' ? 'text-orange-400' : 'text-white'
                  }`}>
                    {section.category}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check className={`w-5 h-5 ${section.color === 'blue' ? 'text-orange-400' : 'text-gray-400'}`} />
                        <span className="text-white/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/60 text-lg">
                <span className="font-semibold text-white">Best approach:</span> Use Santiment for on-chain analytics + Perception for media intelligence
              </p>
            </div>
          </div>
        </section>

        {/* Unique Capabilities Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-black mb-4">
              What Only Perception Offers
            </h2>
            <p className="text-center text-black/60 mb-16 max-w-2xl mx-auto">
              Capabilities that on-chain tools can't provide
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {uniqueCapabilities.map((capability) => (
                <div
                  key={capability.title}
                  className="bg-black rounded-2xl p-8 border border-white/10"
                >
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-6">
                    <capability.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {capability.title}
                  </h3>
                  <p className="text-white/70">
                    {capability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              The Media Layer for Crypto
            </h2>
            <p className="text-white/60 mb-12 text-lg">
              Understand the "why" behind on-chain movements
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div>
                <div className="text-4xl font-bold text-orange-400 mb-2">650+</div>
                <div className="text-white/60">Media Sources</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400 mb-2">90s</div>
                <div className="text-white/60">Update Speed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400 mb-2">24/7</div>
                <div className="text-white/60">Narrative Tracking</div>
              </div>
            </div>
            <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8 py-6 text-lg rounded-full" asChild>
              <a href="https://app.perception.to/auth/sign-up">
                Add Perception to Your Stack
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-black/60 mb-12">
              Common questions about Perception vs Santiment
            </p>

            <div className="space-y-6">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="bg-black rounded-xl p-6 border border-white/10"
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

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Complete Your Market Intelligence
            </h2>
            <p className="text-xl mb-10 text-white/60">
              Add the media layer to your on-chain research. 14 days free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 px-8 py-6 text-lg rounded-full" asChild>
                <a href="https://app.perception.to/auth/sign-up">
                  Try Perception Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full" asChild>
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
