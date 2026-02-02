import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AsciiDiagonalPetals from '@/components/AsciiDiagonalPetals';

interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    slug: 'what-is-crypto-sentiment-analysis',
    title: 'What is Crypto Sentiment Analysis?',
    description: 'A complete guide to understanding market sentiment, how it\'s measured, and why it matters for your crypto trading and investment decisions.',
    category: 'Fundamentals',
    readTime: '8 min read',
    featured: true,
  },
  {
    slug: 'how-to-read-fear-greed-index',
    title: 'How to Read the Fear & Greed Index',
    description: 'Learn to interpret the Bitcoin Fear & Greed Index, understand what each score means, and use sentiment data to inform your trading strategy.',
    category: 'Trading',
    readTime: '6 min read',
    featured: true,
  },
  {
    slug: 'bitcoin-market-psychology',
    title: 'Bitcoin Market Psychology Explained',
    description: 'Explore the psychological factors that drive Bitcoin price movements, from FOMO and FUD to institutional sentiment and narrative cycles.',
    category: 'Psychology',
    readTime: '10 min read',
  },
  {
    slug: 'crypto-narrative-trading',
    title: 'Crypto Narrative Trading Guide',
    description: 'How to identify emerging narratives in crypto markets and position yourself before trends become mainstream.',
    category: 'Advanced',
    readTime: '12 min read',
  },
  {
    slug: 'understanding-bitcoin-dominance',
    title: 'Understanding Bitcoin Dominance',
    description: 'Learn what BTC dominance means, how to interpret changes, and use this metric for better market timing.',
    category: 'Fundamentals',
    readTime: '8 min read',
  },
  {
    slug: 'crypto-social-sentiment',
    title: 'Understanding Crypto Social Sentiment',
    description: 'Analyze social media signals from Twitter, Reddit, and Telegram. Learn to separate signal from noise.',
    category: 'Research',
    readTime: '9 min read',
  }
];

export default function LearnIndexPage() {
  const featuredArticles = articles.filter(a => a.featured);
  const regularArticles = articles.filter(a => !a.featured);

  return (
    <>
      <SEO
        title="Learn Crypto Sentiment Analysis - Guides & Tutorials | Perception"
        description="Free guides on crypto sentiment analysis, Fear & Greed Index interpretation, market psychology, and narrative trading. Learn to read market emotions."
        keywords={[
          'crypto sentiment analysis guide',
          'fear and greed index tutorial',
          'bitcoin market psychology',
          'crypto trading education',
          'sentiment trading guide'
        ]}
        url="https://perception.to/learn"
      />

      <div className="min-h-screen bg-[#F0EEE6]">
        {/* Hero Section - Split Layout */}
        <section className="pt-32 pb-24 px-6 sm:px-16 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left - ASCII Art Visual */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-black">
                  <AsciiDiagonalPetals />
                  {/* Overlay with guide count */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">{articles.length}</div>
                          <div className="text-white/60 text-sm">Free Guides</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-orange-400">Sentiment</div>
                          <div className="text-white/60 text-sm">Analysis</div>
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
                  Free Educational Resources
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-black mb-6">
                  Learn{' '}
                  <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Sentiment</em>{' '}
                  Analysis
                </h1>

                <p className="text-lg sm:text-xl text-black/70 font-light leading-relaxed mb-8">
                  Master the art of reading market emotions. Free guides on sentiment analysis, market psychology, and data-driven crypto trading.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-black/90 rounded-2xl px-8 py-6 text-base font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a href="#featured-guides">
                      Start Learning
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
                      See Live Data
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Guides Section - Black */}
        <section id="featured-guides" className="py-24 px-6 sm:px-16 lg:px-32 bg-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-medium text-white text-center mb-4">
              Featured{' '}
              <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Guides</em>
            </h2>
            <p className="text-center text-white/60 mb-16 max-w-2xl mx-auto">
              Start with our most comprehensive resources for understanding market sentiment
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/learn/${article.slug}`}
                  className="group bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium text-orange-400 uppercase tracking-wide">
                      {article.category}
                    </span>
                    <span className="text-xs text-white/50">
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-white/60 mb-6">
                    {article.description}
                  </p>

                  <span className="inline-flex items-center text-white font-medium group-hover:text-orange-400 transition-colors">
                    Read Guide
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Guides Section - Cream with black cards */}
        <section className="py-24 px-6 sm:px-16 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-medium text-black text-center mb-4">
              All{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Guides</em>
            </h2>
            <p className="text-center text-black/60 mb-16 max-w-2xl mx-auto">
              Explore our complete library of sentiment analysis resources
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/learn/${article.slug}`}
                  className="group bg-black rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-medium text-orange-400 uppercase tracking-wide">
                      {article.category}
                    </span>
                    <span className="text-xs text-white/50 ml-auto">
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-white/60 line-clamp-2">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Black */}
        <section className="py-24 px-6 sm:px-16 lg:px-32 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-medium text-white mb-6">
              Ready to put{' '}
              <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>knowledge</em>{' '}
              into practice?
            </h2>
            <p className="text-xl text-white/60 mb-10">
              Start tracking real-time crypto sentiment with our intelligent analysis workspace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 rounded-2xl px-8 py-6 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105"
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
                className="bg-transparent border-white text-white hover:bg-white/10 rounded-2xl px-8 py-6 text-lg font-semibold transition-all duration-300"
                asChild
              >
                <Link to="/bitcoin-fear-greed-index">
                  View Live Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Related Resources - Cream */}
        <section className="py-24 px-6 sm:px-16 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-medium text-black text-center mb-4">
              Explore More{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Resources</em>
            </h2>
            <p className="text-center text-black/60 mb-16 max-w-2xl mx-auto">
              Put your knowledge into practice with our live tools
            </p>

            <div className="grid sm:grid-cols-3 gap-6">
              <Link
                to="/bitcoin-fear-greed-index"
                className="group bg-black rounded-2xl p-8 transition-all duration-300 text-center hover:scale-[1.02]"
              >
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  Fear & Greed Index
                </h3>
                <p className="text-sm text-white/60">
                  Live sentiment tracking updated every 90 seconds
                </p>
              </Link>

              <Link
                to="/bitcoin-market-sentiment"
                className="group bg-black rounded-2xl p-8 transition-all duration-300 text-center hover:scale-[1.02]"
              >
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  Market Sentiment
                </h3>
                <p className="text-sm text-white/60">
                  Daily analysis reports and insights
                </p>
              </Link>

              <Link
                to="/compare/best-crypto-sentiment-tools"
                className="group bg-black rounded-2xl p-8 transition-all duration-300 text-center hover:scale-[1.02]"
              >
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  Tool Comparison
                </h3>
                <p className="text-sm text-white/60">
                  Best sentiment analysis tools compared
                </p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
