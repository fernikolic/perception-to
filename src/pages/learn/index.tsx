import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, BarChart3, Brain, Newspaper, ArrowRight, Clock, PieChart, MessageSquare } from 'lucide-react';

interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  icon: React.ElementType;
  featured?: boolean;
  gradient: string;
}

const articles: Article[] = [
  {
    slug: 'what-is-crypto-sentiment-analysis',
    title: 'What is Crypto Sentiment Analysis?',
    description: 'A complete guide to understanding market sentiment, how it\'s measured, and why it matters for your crypto trading and investment decisions.',
    category: 'Fundamentals',
    readTime: '8 min read',
    icon: Brain,
    featured: true,
    gradient: 'from-blue-500/20 via-slate-600/20 to-zinc-700/30 hover:from-blue-500/30 hover:to-zinc-700/40'
  },
  {
    slug: 'how-to-read-fear-greed-index',
    title: 'How to Read the Fear & Greed Index',
    description: 'Learn to interpret the Bitcoin Fear & Greed Index, understand what each score means, and use sentiment data to inform your trading strategy.',
    category: 'Trading',
    readTime: '6 min read',
    icon: BarChart3,
    featured: true,
    gradient: 'from-slate-500/30 via-blue-600/20 to-neutral-700/30 hover:from-slate-500/40 hover:to-blue-600/30'
  },
  {
    slug: 'bitcoin-market-psychology',
    title: 'Bitcoin Market Psychology Explained',
    description: 'Explore the psychological factors that drive Bitcoin price movements, from FOMO and FUD to institutional sentiment and narrative cycles.',
    category: 'Psychology',
    readTime: '10 min read',
    icon: TrendingUp,
    gradient: 'from-blue-400/20 via-zinc-600/20 to-slate-700/30 hover:from-blue-400/30 hover:to-slate-700/40'
  },
  {
    slug: 'crypto-narrative-trading',
    title: 'Crypto Narrative Trading Guide',
    description: 'How to identify emerging narratives in crypto markets and position yourself before trends become mainstream.',
    category: 'Advanced',
    readTime: '12 min read',
    icon: Newspaper,
    gradient: 'from-slate-400/20 via-blue-600/10 to-neutral-800/20 hover:from-slate-400/30'
  },
  {
    slug: 'understanding-bitcoin-dominance',
    title: 'Understanding Bitcoin Dominance',
    description: 'Learn what BTC dominance means, how to interpret changes, and use this metric for better market timing.',
    category: 'Fundamentals',
    readTime: '8 min read',
    icon: PieChart,
    gradient: 'from-purple-500/20 via-slate-600/15 to-zinc-700/25 hover:from-purple-500/30 hover:to-zinc-700/35'
  },
  {
    slug: 'crypto-social-sentiment',
    title: 'Understanding Crypto Social Sentiment',
    description: 'Analyze social media signals from Twitter, Reddit, and Telegram. Learn to separate signal from noise.',
    category: 'Research',
    readTime: '9 min read',
    icon: MessageSquare,
    gradient: 'from-green-500/20 via-slate-600/15 to-zinc-700/25 hover:from-green-500/30 hover:to-zinc-700/35'
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
        {/* Hero Section with Background Image */}
        <section className="relative overflow-hidden py-12 sm:py-20 lg:py-28 border-b border-black/10">

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            {/* Hero Card with Background Image */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src="/images/hero_image.avif"
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-24">
                <div className="mx-auto max-w-5xl text-center">
                  {/* Badge */}
                  <div className="mb-4 sm:mb-6">
                    <span className="inline-flex items-center gap-2 rounded-full bg-transparent border border-black/30 px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-medium text-black">
                      <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                      Free Educational Resources
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight sm:leading-[0.95] text-black mb-6 sm:mb-10 lg:mb-14 px-2">
                    Learn Crypto Sentiment Analysis
                  </h1>

                  <p className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-light leading-relaxed text-black/70 max-w-4xl mx-auto mb-8 sm:mb-12 px-2">
                    Master the art of reading market emotions. Free guides on sentiment analysis,
                    market psychology, and data-driven crypto trading.
                  </p>

                  <div className="flex items-center justify-center px-2">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-8 sm:px-10 lg:px-12 py-6 sm:py-7 text-base sm:text-lg lg:text-xl shadow-2xl hover:shadow-3xl hover:scale-105 rounded-full"
                      asChild
                    >
                      <a href="#featured-guides">
                        Start Learning
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Guides Section */}
        <section id="featured-guides" className="py-16 sm:py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-black">
                Featured Guides
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-black/60">
                Start with our most comprehensive resources for understanding market sentiment
              </p>
            </div>

            {/* Featured Cards */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              {featuredArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/learn/${article.slug}`}
                  className="group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 bg-white/50 hover:bg-white border border-black/10"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center">
                      <article.icon className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-black/50 mt-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-black group-hover:text-orange-600 transition-all">
                    {article.title}
                  </h3>

                  <p className="text-sm sm:text-base text-black/60 mb-6 sm:mb-8">
                    {article.description}
                  </p>

                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-black/90 transition-all shadow-lg hover:shadow-xl hover:scale-105 w-full text-sm sm:text-base py-5 sm:py-6 rounded-full"
                  >
                    Read Guide
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Guides Section */}
        <section className="py-16 sm:py-20 lg:py-28 bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
                All Guides
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white/60">
                Explore our complete library of sentiment analysis resources
              </p>
            </div>

            {/* All Guide Cards */}
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/learn/${article.slug}`}
                  className="group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 bg-white/5 hover:bg-white/10 border border-white/10"
                >
                  <div className="text-white/40 mb-3 sm:mb-4">
                    <article.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-orange-400 uppercase tracking-wide">
                      {article.category}
                    </span>
                    <span className="text-xs text-white/50 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-white group-hover:text-orange-400 transition-all">
                    {article.title}
                  </h3>

                  <p className="text-sm text-white/60 mb-4 line-clamp-2">
                    {article.description}
                  </p>

                  <span className="inline-flex items-center text-orange-400 font-medium text-sm group-hover:gap-2 transition-all">
                    Read Guide <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 lg:py-28 bg-[#F0EEE6]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4 sm:mb-6 text-black">
                Ready to Put Knowledge into Practice?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-black/60 mb-8 sm:mb-10 max-w-2xl mx-auto">
                Start tracking real-time crypto sentiment with our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-black/90 transition-all shadow-lg hover:shadow-xl hover:scale-105 px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold rounded-full"
                  asChild
                >
                  <a href="https://app.perception.to/auth/sign-up">
                    Try Perception Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg rounded-full border-black/20 hover:border-black/30"
                  asChild
                >
                  <Link to="/bitcoin-fear-greed-index">
                    View Live Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 sm:py-20 lg:py-28 bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
                Explore More Resources
              </h2>
              <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white/60">
                Put your knowledge into practice with our live tools
              </p>
            </div>

            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <Link
                to="/bitcoin-fear-greed-index"
                className="group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 bg-white/5 hover:bg-white/10 border border-white/10 text-center"
              >
                <div className="mx-auto w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mb-4">
                  <BarChart3 className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-orange-400 transition-all">
                  Fear & Greed Index
                </h3>
                <p className="text-sm sm:text-base text-white/60">
                  Live sentiment tracking updated every 90 seconds
                </p>
              </Link>

              <Link
                to="/bitcoin-market-sentiment"
                className="group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 bg-white/5 hover:bg-white/10 border border-white/10 text-center"
              >
                <div className="mx-auto w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mb-4">
                  <TrendingUp className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-orange-400 transition-all">
                  Market Sentiment
                </h3>
                <p className="text-sm sm:text-base text-white/60">
                  Daily analysis reports and insights
                </p>
              </Link>

              <Link
                to="/compare/best-crypto-sentiment-tools"
                className="group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 bg-white/5 hover:bg-white/10 border border-white/10 text-center"
              >
                <div className="mx-auto w-14 h-14 bg-orange-500/20 border border-orange-500/30 rounded-xl flex items-center justify-center mb-4">
                  <Newspaper className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-orange-400 transition-all">
                  Tool Comparison
                </h3>
                <p className="text-sm sm:text-base text-white/60">
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
