import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { keywordMatrix } from '@/data/keywords';
import { generatePageContent, generateMetaDescription, generateSchemaData } from '@/lib/contentGenerator';
import { generateHeroContent, generateUseCases } from '@/components/seo/programmatic-seo';

export default function EnhancedSentimentPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const keyword = keywordMatrix.find(k => {
    const keywordSlug = k.fullKeyword
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    return keywordSlug === slug;
  });

  if (!keyword || (keyword.category !== 'sentiment' && keyword.templateType !== 'sentiment-dashboard')) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-zinc-400">The requested sentiment page could not be found.</p>
        </div>
      </div>
    );
  }

  const heroContent = generateHeroContent(keyword);
  const useCases = generateUseCases(keyword);
  const pageContent = generatePageContent(keyword);
  const metaDescription = generateMetaDescription(keyword);
  const schemaData = generateSchemaData(keyword);

  return (
    <>
      <Helmet>
        <title>{keyword.fullKeyword.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} - Real-time Bitcoin Market Intelligence | Perception.to</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${keyword.fullKeyword}, bitcoin sentiment, crypto market analysis, real-time data, Perception.to`} />
        <meta property="og:title" content={`${keyword.fullKeyword} - Bitcoin Market Intelligence`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`/api/og?keyword=${encodeURIComponent(keyword.fullKeyword)}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${keyword.fullKeyword} - Perception.to`} />
        <meta name="twitter:description" content={metaDescription} />
        <link rel="canonical" href={`https://perception.to/${keyword.category}/${slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-zinc-950 text-white">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {heroContent.headline}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto">
              {heroContent.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
                {heroContent.primaryCTA}
              </button>
              <button className="px-8 py-3 border border-zinc-600 hover:border-zinc-500 rounded-lg font-semibold transition-colors">
                {heroContent.secondaryCTA}
              </button>
            </div>
          </div>
        </section>

        {/* Real-time Dashboard Section */}
        <section className="py-16 px-4 bg-zinc-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Live {keyword.fullKeyword} Dashboard
            </h2>
            <div className="bg-zinc-800 rounded-xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">72</div>
                  <div className="text-zinc-400">Current Sentiment Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">+5.2%</div>
                  <div className="text-zinc-400">24h Change</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">1.2M</div>
                  <div className="text-zinc-400">Social Mentions</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">247</div>
                  <div className="text-zinc-400">Active Sources</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Sections */}
        {pageContent.sections.map((section, index) => (
          <section key={index} className={`py-16 px-4 ${index % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900'}`}>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">{section.heading}</h2>
              <div className="prose prose-lg prose-invert max-w-none">
                {section.content.split('\n\n').map((paragraph, pIndex) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={pIndex} className="text-xl font-semibold mb-4 mt-6 text-blue-400">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    );
                  }
                  if (paragraph.includes('**')) {
                    const parts = paragraph.split(/(\*\*.*?\*\*)/g);
                    return (
                      <p key={pIndex} className="mb-4 text-zinc-300 leading-relaxed">
                        {parts.map((part, partIndex) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return (
                              <strong key={partIndex} className="text-white font-semibold">
                                {part.replace(/\*\*/g, '')}
                              </strong>
                            );
                          }
                          return part;
                        })}
                      </p>
                    );
                  }
                  return (
                    <p key={pIndex} className="mb-4 text-zinc-300 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        {/* Use Cases Section */}
        <section className="py-16 px-4 bg-zinc-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Use Cases for {keyword.fullKeyword}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-zinc-300 mb-4">{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-zinc-400">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Start Tracking {keyword.fullKeyword} Today
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Join thousands of professionals who rely on our real-time sentiment data for critical decisions. 
              Get started with professional-grade {keyword.fullKeyword} analysis in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all">
                Get Started Free
              </button>
              <button className="px-8 py-3 border border-zinc-600 hover:border-zinc-500 rounded-lg font-semibold transition-colors">
                View Documentation
              </button>
            </div>
          </div>
        </section>

        {/* Word Count Display for Development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 right-4 bg-zinc-800 text-white p-2 rounded text-sm">
            Words: {pageContent.wordCount} | Uniqueness: {Math.round(pageContent.uniquenessScore * 100)}%
          </div>
        )}
      </div>
    </>
  );
}