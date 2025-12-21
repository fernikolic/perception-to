import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Clock, LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

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

      <div className="min-h-screen bg-background">
        {/* Article Header */}
        <section className="relative overflow-hidden pt-24 pb-12 sm:pb-16 border-b border-slate-200 dark:border-slate-800">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.03),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_50%)]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              {/* Breadcrumb */}
              <nav className="mb-6 sm:mb-8">
                <Link
                  to="/learn"
                  className="inline-flex items-center text-sm text-orange-600 hover:text-orange-700 dark:text-orange-500 dark:hover:text-orange-400 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Learn
                </Link>
              </nav>

              {/* Meta badges */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <span className="inline-flex items-center gap-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium">
                  <CategoryIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  {category}
                </span>
                <span className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  {readTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-foreground mb-4 sm:mb-6">
                {title}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 sm:py-12 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700">
                <h2 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">In This Guide</h2>
                <ul className="space-y-2 sm:space-y-2.5">
                  {tableOfContents.map((item, index) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="text-sm sm:text-base text-muted-foreground hover:text-orange-600 dark:hover:text-orange-500 transition-colors flex items-start gap-2"
                      >
                        <span className="text-orange-500/70 font-medium">{index + 1}.</span>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              {children}
            </div>
          </div>
        </article>

        {/* Article Footer */}
        <section className="py-8 sm:py-12 border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-muted-foreground mb-3">Ready to track sentiment?</p>
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl rounded-xl px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold"
                    asChild
                  >
                    <a href="https://app.perception.to/auth/sign-up">
                      Try Perception Free
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
                {nextArticle && (
                  <div className="text-center sm:text-right">
                    <p className="text-sm text-muted-foreground mb-2">Continue learning</p>
                    <Link
                      to={`/learn/${nextArticle.slug}`}
                      className="text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 font-medium transition-colors inline-flex items-center gap-1"
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
          <section className="py-12 sm:py-16 lg:py-20 bg-slate-50 dark:bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-4xl">
                <h2 className="text-xl sm:text-2xl font-bold text-center text-foreground mb-6 sm:mb-8">
                  Continue Learning
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {relatedArticles.map((article) => (
                    <Link
                      key={article.slug}
                      to={`/learn/${article.slug}`}
                      className="group bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-orange-700 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg"
                    >
                      <h3 className="font-semibold text-foreground mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors text-base sm:text-lg">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {article.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4 sm:mb-6">
                Put Knowledge into Practice
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                Start tracking real-time crypto sentiment with our AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-blue-950 text-white hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl hover:scale-105 px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg font-semibold rounded-2xl"
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
                  className="px-8 sm:px-10 py-6 sm:py-7 text-base sm:text-lg rounded-2xl"
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
      </div>
    </>
  );
}
