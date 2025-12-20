import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight, Zap, BarChart3, Globe, MessageSquare, TrendingUp, Plus, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';

const whatPerceptionAdds = [
  {
    category: 'What LunarCrush Does Well',
    items: ['Social media metrics', 'Galaxy Score', 'Influencer tracking', 'Social volume data'],
    color: 'slate'
  },
  {
    category: 'What Perception Adds',
    items: ['650+ news & media sources', 'Narrative tracking across media', 'Institutional report monitoring', 'Mainstream media coverage'],
    color: 'orange'
  }
];

const uniqueCapabilities = [
  {
    icon: Newspaper,
    title: 'Media Intelligence Layer',
    description: 'LunarCrush tracks social. Perception tracks media. Monitor how Bloomberg, Reuters, WSJ, and 650+ outlets cover crypto. See narratives form in news before they trend on Twitter.'
  },
  {
    icon: Globe,
    title: 'Mainstream + Crypto Coverage',
    description: 'Track both crypto-native publications (CoinDesk, The Block) and mainstream financial media. Understand when Bitcoin stories cross into mainstream consciousness.'
  },
  {
    icon: Zap,
    title: 'Narrative Detection',
    description: 'Our AI identifies emerging narratives across all media. See what stories are gaining traction, which outlets are covering them, and how sentiment is shifting.'
  },
  {
    icon: BarChart3,
    title: 'Institutional Signals',
    description: 'Track institutional research reports, regulatory filings, and professional analyst coverage. See what smart money is reading.'
  },
];

const faqs = [
  {
    question: 'Should I use Perception instead of LunarCrush?',
    answer: 'They serve different purposes. LunarCrush excels at social media metrics and the Galaxy Score. Perception specializes in media intelligence - tracking 650+ news sources, narrative detection, and mainstream coverage. Many teams use both: LunarCrush for social signals, Perception for media intelligence.'
  },
  {
    question: 'What does Perception track that LunarCrush doesn\'t?',
    answer: 'Perception monitors 650+ media sources including Bloomberg, Reuters, WSJ, Financial Times, CoinDesk, The Block, institutional research reports, and regulatory filings. We specialize in narrative tracking across media - understanding how stories develop and spread through news outlets, not just social media.'
  },
  {
    question: 'Can I use both Perception and LunarCrush together?',
    answer: 'Absolutely - this is what many professional teams do. Use LunarCrush for social sentiment and influencer tracking. Add Perception for media monitoring and narrative intelligence. The combination gives you complete market coverage.'
  },
  {
    question: 'How is the sentiment calculated differently?',
    answer: 'LunarCrush focuses on social engagement metrics. Perception analyzes media content - the actual articles, reports, and coverage. Our AI reads and understands the narrative context, not just counts and volumes.'
  },
  {
    question: 'Do I get anything I can\'t get elsewhere?',
    answer: 'Yes. No other tool monitors 650+ crypto and financial media sources with AI-powered narrative tracking. If you want to know how the media is covering crypto - from Bloomberg to CoinDesk - Perception is the only comprehensive solution.'
  },
];

export default function LunarCrushAlternativePage() {
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
        title="LunarCrush Alternative - Perception | Better Crypto Sentiment Analysis"
        description="Looking for a LunarCrush alternative? Perception offers 650+ data sources, real-time media monitoring, and AI-powered narrative tracking. Start your free trial."
        keywords={['LunarCrush alternative', 'LunarCrush competitor', 'crypto sentiment tool', 'Galaxy Score alternative', 'social sentiment analysis']}
        url="https://perception.to/alternatives/lunarcrush-alternative"
      >
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </SEO>

      <div className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full px-4 py-2 text-sm font-medium mb-8">
              <Plus className="w-4 h-4" />
              LunarCrush Alternative
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              Already Using LunarCrush?<br />
              <span className="text-orange-500">Add Media Intelligence</span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10">
              LunarCrush tracks social. Perception tracks media. Get the complete picture
              by adding 650+ news sources, narrative detection, and mainstream coverage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg" asChild>
                <a href="https://app.perception.to/auth/sign-up">
                  Try Free for 14 Days
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg" asChild>
                <Link to="/bitcoin-market-sentiment">
                  See Media Dashboard
                </Link>
              </Button>
            </div>

            <p className="text-sm text-slate-500 mt-4">
              No credit card required. Works alongside your existing tools.
            </p>
          </div>
        </section>

        {/* What Each Tool Does */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">
              Different Tools, Different Data
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
              LunarCrush and Perception aren't competitors - they're complements
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {whatPerceptionAdds.map((section) => (
                <div
                  key={section.category}
                  className={`rounded-2xl p-8 ${
                    section.color === 'orange'
                      ? 'bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <h3 className={`text-xl font-semibold mb-6 ${
                    section.color === 'orange' ? 'text-orange-700 dark:text-orange-300' : 'text-slate-900 dark:text-white'
                  }`}>
                    {section.category}
                  </h3>
                  <ul className="space-y-3">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <Check className={`w-5 h-5 ${section.color === 'orange' ? 'text-orange-500' : 'text-slate-400'}`} />
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-600 dark:text-slate-400 text-lg">
                <span className="font-semibold text-slate-900 dark:text-white">Best approach:</span> Use LunarCrush for social signals + Perception for media intelligence
              </p>
            </div>
          </div>
        </section>

        {/* Unique Capabilities Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">
              What Only Perception Offers
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-16 max-w-2xl mx-auto">
              Capabilities you won't find in social-focused tools
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {uniqueCapabilities.map((capability) => (
                <div
                  key={capability.title}
                  className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700"
                >
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-6">
                    <capability.icon className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {capability.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {capability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              The Media Layer for Crypto
            </h2>
            <p className="text-slate-400 mb-12 text-lg">
              Complete your market intelligence stack
            </p>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div>
                <div className="text-4xl font-bold text-orange-400 mb-2">650+</div>
                <div className="text-slate-400">Media Sources</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400 mb-2">90s</div>
                <div className="text-slate-400">Update Speed</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-400 mb-2">24/7</div>
                <div className="text-slate-400">Narrative Tracking</div>
              </div>
            </div>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 px-8 py-6 text-lg" asChild>
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
            <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-12">
              Common questions about switching from LunarCrush to Perception
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
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-500 to-orange-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Complete Your Market Intelligence
            </h2>
            <p className="text-xl mb-10 text-orange-100">
              Add the media layer to your crypto research. 14 days free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-6 text-lg" asChild>
                <a href="https://app.perception.to/auth/sign-up">
                  Try Perception Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg" asChild>
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
