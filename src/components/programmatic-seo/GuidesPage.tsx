import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { keywordMatrix } from '@/data/keywords';
import { generateMeta, generateHeroContent, generateUseCases } from '@/components/seo/programmatic-seo';

export default function GuidesPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const keyword = keywordMatrix.find(k => {
    const keywordSlug = k.fullKeyword
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    return keywordSlug === slug;
  });

  if (!keyword || (keyword.category !== 'guides' && keyword.templateType !== 'educational-guide')) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Guide Not Found</h1>
          <p className="text-zinc-400">The requested guide could not be found.</p>
        </div>
      </div>
    );
  }

  const meta = generateMeta(keyword);
  const heroContent = generateHeroContent(keyword);
  const useCases = generateUseCases(keyword);

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={meta.keywords} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:type" content={meta.ogType} />
        <meta property="og:image" content={meta.ogImage} />
        <meta name="twitter:card" content={meta.twitterCard} />
        <meta name="twitter:title" content={meta.twitterTitle} />
        <meta name="twitter:description" content={meta.twitterDescription} />
        <link rel="canonical" href={meta.canonical} />
        <script type="application/ld+json">
          {JSON.stringify(meta.schema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-zinc-950 text-white">
        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400 bg-clip-text text-transparent">
              {heroContent.headline}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto">
              {heroContent.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition-colors">
                {heroContent.primaryCTA}
              </button>
              <button className="px-8 py-3 border border-zinc-600 hover:border-zinc-500 rounded-lg font-semibold transition-colors">
                {heroContent.secondaryCTA}
              </button>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-16 px-4 bg-zinc-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Complete Guide to {keyword.fullKeyword}
            </h2>
            <div className="bg-zinc-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6">What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-orange-600 rounded-full text-sm flex items-center justify-center mr-3">1</span>
                    <span>Understanding {keyword.fullKeyword}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-orange-600 rounded-full text-sm flex items-center justify-center mr-3">2</span>
                    <span>Key concepts and methodology</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-orange-600 rounded-full text-sm flex items-center justify-center mr-3">3</span>
                    <span>Practical implementation</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-orange-600 rounded-full text-sm flex items-center justify-center mr-3">4</span>
                    <span>Best practices and tips</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-orange-600 rounded-full text-sm flex items-center justify-center mr-3">5</span>
                    <span>Common pitfalls to avoid</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-6 h-6 bg-orange-600 rounded-full text-sm flex items-center justify-center mr-3">6</span>
                    <span>Advanced techniques</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-invert max-w-none">
              <h2 className="text-3xl font-bold mb-6">Introduction to {keyword.fullKeyword}</h2>
              <p className="text-lg text-zinc-300 mb-8">
                {keyword.fullKeyword} is a crucial aspect of cryptocurrency market analysis that helps traders, 
                investors, and analysts make informed decisions. This comprehensive guide will walk you through 
                everything you need to know to effectively use and understand this powerful tool.
              </p>

              <h3 className="text-2xl font-bold mb-4 mt-12">Understanding the Basics</h3>
              <p className="text-zinc-300 mb-6">
                Before diving into advanced concepts, it's essential to understand the fundamental principles 
                behind {keyword.fullKeyword}. This section covers the core concepts that form the foundation 
                of effective sentiment analysis.
              </p>

              <div className="bg-zinc-900 rounded-lg p-6 mb-8">
                <h4 className="text-xl font-bold mb-4">Key Components</h4>
                <ul className="space-y-3 text-zinc-300">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Data collection from multiple sources including social media, news, and market data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Natural language processing and sentiment scoring algorithms</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span>Real-time aggregation and weighted scoring based on source credibility</span>
                  </li>
                </ul>
              </div>

              <h3 className="text-2xl font-bold mb-4 mt-12">Practical Implementation</h3>
              <p className="text-zinc-300 mb-6">
                Now that you understand the basics, let's explore how to practically implement {keyword.fullKeyword} 
                in your analysis workflow. These step-by-step instructions will help you get started immediately.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-zinc-900 rounded-lg p-6">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg mb-4 flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <h4 className="font-bold mb-2">Setup</h4>
                  <p className="text-zinc-300 text-sm">Configure your analysis parameters and data sources</p>
                </div>
                <div className="bg-zinc-900 rounded-lg p-6">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg mb-4 flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <h4 className="font-bold mb-2">Monitor</h4>
                  <p className="text-zinc-300 text-sm">Track real-time sentiment changes and trends</p>
                </div>
                <div className="bg-zinc-900 rounded-lg p-6">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg mb-4 flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <h4 className="font-bold mb-2">Act</h4>
                  <p className="text-zinc-300 text-sm">Make informed decisions based on sentiment insights</p>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 mt-12">Best Practices</h3>
              <p className="text-zinc-300 mb-6">
                To maximize the effectiveness of {keyword.fullKeyword}, follow these proven best practices 
                that have been developed through extensive testing and real-world application.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 px-4 bg-zinc-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Practical Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-zinc-300 mb-4">{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-zinc-400">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
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
              Ready to Apply {keyword.fullKeyword}?
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Put your newfound knowledge into practice with our professional tools and data.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-lg font-semibold transition-all">
              Try It Now
            </button>
          </div>
        </section>
      </div>
    </>
  );
}