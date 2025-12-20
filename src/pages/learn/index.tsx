import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, TrendingUp, BarChart3, Brain, Newspaper, ArrowRight, Clock } from 'lucide-react';

interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  icon: React.ElementType;
  featured?: boolean;
}

const articles: Article[] = [
  {
    slug: 'what-is-crypto-sentiment-analysis',
    title: 'What is Crypto Sentiment Analysis?',
    description: 'A complete guide to understanding market sentiment, how it\'s measured, and why it matters for your crypto trading and investment decisions.',
    category: 'Fundamentals',
    readTime: '8 min read',
    icon: Brain,
    featured: true
  },
  {
    slug: 'how-to-read-fear-greed-index',
    title: 'How to Read the Fear & Greed Index',
    description: 'Learn to interpret the Bitcoin Fear & Greed Index, understand what each score means, and use sentiment data to inform your trading strategy.',
    category: 'Trading',
    readTime: '6 min read',
    icon: BarChart3,
    featured: true
  },
  {
    slug: 'bitcoin-market-psychology',
    title: 'Bitcoin Market Psychology Explained',
    description: 'Explore the psychological factors that drive Bitcoin price movements, from FOMO and FUD to institutional sentiment and narrative cycles.',
    category: 'Psychology',
    readTime: '10 min read',
    icon: TrendingUp
  },
  {
    slug: 'crypto-narrative-trading',
    title: 'Crypto Narrative Trading Guide',
    description: 'How to identify emerging narratives in crypto markets and position yourself before trends become mainstream.',
    category: 'Advanced',
    readTime: '12 min read',
    icon: Newspaper
  }
];

const categories = [
  { name: 'All', count: articles.length },
  { name: 'Fundamentals', count: articles.filter(a => a.category === 'Fundamentals').length },
  { name: 'Trading', count: articles.filter(a => a.category === 'Trading').length },
  { name: 'Psychology', count: articles.filter(a => a.category === 'Psychology').length },
  { name: 'Advanced', count: articles.filter(a => a.category === 'Advanced').length },
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

      <div className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full px-4 py-2 text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Free Educational Resources
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
                Learn Crypto Sentiment Analysis
              </h1>

              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Master the art of reading market emotions. Free guides on sentiment analysis,
                market psychology, and data-driven crypto trading.
              </p>
            </div>

            {/* Featured Articles */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {featuredArticles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/learn/${article.slug}`}
                  className="group bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/10 rounded-2xl p-8 border border-orange-200 dark:border-orange-800 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                      <article.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-orange-600 dark:text-orange-400 uppercase tracking-wide">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-orange-600 transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {article.description}
                  </p>

                  <span className="inline-flex items-center text-orange-600 font-medium group-hover:gap-2 transition-all">
                    Read Guide <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* All Articles */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
              All Guides
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/learn/${article.slug}`}
                  className="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30 transition-colors">
                      <article.icon className="w-5 h-5 text-slate-600 dark:text-slate-400 group-hover:text-orange-600 transition-colors" />
                    </div>
                    <div>
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-orange-600 transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {article.readTime}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-500 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Ready to Put Knowledge into Practice?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Start tracking real-time crypto sentiment with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-6 text-lg" asChild>
                <a href="https://app.perception.to/auth/sign-up">
                  Try Perception Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg" asChild>
                <Link to="/bitcoin-fear-greed-index">
                  View Live Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-8">
              Explore More Resources
            </h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link
                to="/bitcoin-fear-greed-index"
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-orange-300 transition-colors text-center"
              >
                <BarChart3 className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Fear & Greed Index</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Live sentiment tracking</p>
              </Link>
              <Link
                to="/bitcoin-market-sentiment"
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-orange-300 transition-colors text-center"
              >
                <TrendingUp className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Market Sentiment</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Daily analysis reports</p>
              </Link>
              <Link
                to="/compare/best-crypto-sentiment-tools"
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-orange-300 transition-colors text-center"
              >
                <Newspaper className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Tool Comparison</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Best sentiment tools</p>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
