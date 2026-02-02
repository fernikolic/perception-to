import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Clock, LucideIcon, BookOpen } from 'lucide-react';
import { ReactNode } from 'react';
import AsciiDiagonalPetals from '@/components/AsciiDiagonalPetals';

export interface TableOfContentsItem {
  id: string;
  title: string;
}

export interface RelatedArticle {
  slug: string;
  title: string;
  description: string;
}

export interface LearnArticleLayoutProps {
  // SEO
  title: string;
  metaTitle: string;
  description: string;
  keywords: string[];
  url: string;

  // Article meta
  category: string;
  categoryIcon: LucideIcon;
  readTime: string;

  // Content structure
  tableOfContents: TableOfContentsItem[];

  // Navigation
  nextArticle?: {
    slug: string;
    title: string;
  };
  relatedArticles: RelatedArticle[];

  // Schema
  additionalSchema?: object[];

  // Content
  children: ReactNode;
}

export function LearnArticleLayout({
  title,
  metaTitle,
  description,
  keywords,
  url,
  category,
  categoryIcon: CategoryIcon,
  readTime,
  tableOfContents,
  nextArticle,
  relatedArticles,
  additionalSchema = [],
  children,
}: LearnArticleLayoutProps) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
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

  // Split title for italic styling on key words
  const formatTitle = (titleText: string) => {
    const italicWords = ['Sentiment', 'Fear', 'Greed', 'Psychology', 'Narrative', 'Dominance', 'Social'];
    const words = titleText.split(' ');

    return words.map((word, index) => {
      const cleanWord = word.replace(/[?!.,]/g, '');
      const punctuation = word.match(/[?!.,]/g)?.join('') || '';

      if (italicWords.includes(cleanWord)) {
        return (
          <span key={index}>
            <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>{cleanWord}</em>
            {punctuation}{' '}
          </span>
        );
      }
      return word + ' ';
    });
  };

  return (
    <>
      <SEO
        title={metaTitle}
        description={description}
        keywords={keywords}
        url={url}
      >
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        {additionalSchema.map((schema, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </SEO>

      <div className="min-h-screen bg-[#F0EEE6]">
        {/* Article Header - Split Layout */}
        <section className="pt-32 pb-16 px-6 sm:px-16 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              {/* Left - ASCII Art Visual */}
              <div className="w-full lg:w-2/5 flex justify-center">
                <div className="relative w-full max-w-sm aspect-square rounded-3xl overflow-hidden bg-black">
                  <AsciiDiagonalPetals />
                  {/* Overlay with category info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-3">
                        <CategoryIcon className="w-5 h-5 text-orange-400" />
                        <div>
                          <div className="text-white font-medium text-sm">{category}</div>
                          <div className="flex items-center gap-1.5 text-white/50 text-xs">
                            <Clock className="w-3 h-3" />
                            {readTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div className="w-full lg:w-3/5">
                {/* Breadcrumb */}
                <nav className="mb-6">
                  <Link
                    to="/learn"
                    className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-2 text-sm font-medium text-black/70 hover:text-orange-600 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Learn Hub
                  </Link>
                </nav>

                {/* Title */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-black mb-6 leading-tight">
                  {formatTitle(title)}
                </h1>

                {/* Description */}
                <p className="text-lg sm:text-xl text-black/70 font-light leading-relaxed mb-8">
                  {description}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-black/90 rounded-2xl px-8 py-6 text-base font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a href="#article-content">
                      Start Reading
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

        {/* Table of Contents */}
        <section className="py-12 px-6 sm:px-16 lg:px-32 border-t border-black/10">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-black/10 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-5 h-5 text-orange-500" />
                  <h2 className="font-semibold text-black text-lg">In This Guide</h2>
                </div>
                <ul className="space-y-3">
                  {tableOfContents.map((item, index) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-black/60 hover:text-orange-600 transition-colors flex items-start gap-3 group"
                      >
                        <span className="text-orange-500 font-medium w-6">{index + 1}.</span>
                        <span className="group-hover:translate-x-1 transition-transform">{item.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article id="article-content" className="py-16 sm:py-20 px-6 sm:px-16 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto">
              {children}
            </div>
          </div>
        </article>

        {/* Article Footer */}
        <section className="py-12 px-6 sm:px-16 lg:px-32 border-t border-black/10">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-black/60 mb-3">Ready to track sentiment?</p>
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-black/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl rounded-2xl px-8 py-6 text-base font-semibold"
                    asChild
                  >
                    <a href="/book-a-call">
                      Book a Demo
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
                {nextArticle && (
                  <div className="text-center sm:text-right">
                    <p className="text-sm text-black/60 mb-2">Continue learning</p>
                    <Link
                      to={`/learn/${nextArticle.slug}`}
                      className="text-orange-600 hover:text-orange-700 font-medium transition-colors inline-flex items-center gap-1"
                    >
                      {nextArticle.title}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-24 px-6 sm:px-16 lg:px-32 bg-black">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-medium text-white text-center mb-4">
                Continue{' '}
                <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Learning</em>
              </h2>
              <p className="text-center text-white/60 mb-12 max-w-2xl mx-auto">
                Explore more guides to deepen your understanding of market sentiment
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {relatedArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/learn/${article.slug}`}
                    className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                  >
                    <h3 className="font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors text-lg">
                      {article.title}
                    </h3>
                    <p className="text-sm text-white/60">
                      {article.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-24 px-6 sm:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-black mb-6">
              Put{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>knowledge</em>{' '}
              into practice
            </h2>
            <p className="text-xl text-black/60 mb-10 max-w-2xl mx-auto">
              Start tracking real-time crypto sentiment with our intelligent analysis workspace.
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
                <Link to="/bitcoin-fear-greed-index">
                  View Live Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
