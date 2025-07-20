import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { keywordMatrix } from '@/data/keywords';
import { generateMeta, generateHeroContent, generateFeatures, generateUseCases } from '@/components/seo/programmatic-seo';

export default function AnalyticsPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const keyword = keywordMatrix.find(k => {
    const keywordSlug = k.fullKeyword
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    return keywordSlug === slug;
  });

  if (!keyword || (keyword.category !== 'analytics' && keyword.templateType !== 'analytics-page')) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-zinc-400">The requested analytics page could not be found.</p>
        </div>
      </div>
    );
  }

  const meta = generateMeta(keyword);
  const heroContent = generateHeroContent(keyword);
  const features = generateFeatures(keyword);
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
              {heroContent.headline}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto">
              {heroContent.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors">
                {heroContent.primaryCTA}
              </button>
              <button className="px-8 py-3 border border-zinc-600 hover:border-zinc-500 rounded-lg font-semibold transition-colors">
                {heroContent.secondaryCTA}
              </button>
            </div>
          </div>
        </section>

        {/* Analytics Overview */}
        <section className="py-16 px-4 bg-zinc-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Advanced {keyword.fullKeyword} Analytics
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-zinc-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Trend Analysis</h3>
                <div className="h-48 bg-zinc-700 rounded-lg flex items-center justify-center">
                  <span className="text-zinc-400">Interactive Chart Placeholder</span>
                </div>
              </div>
              <div className="bg-zinc-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Correlation Matrix</h3>
                <div className="h-48 bg-zinc-700 rounded-lg flex items-center justify-center">
                  <span className="text-zinc-400">Correlation Heatmap Placeholder</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Key Analytics Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-zinc-900 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-purple-400 mb-3">98.7%</div>
                <div className="text-zinc-300 font-semibold mb-2">Accuracy Rate</div>
                <div className="text-zinc-500 text-sm">Based on historical backtesting</div>
              </div>
              <div className="bg-zinc-900 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-blue-400 mb-3">200+</div>
                <div className="text-zinc-300 font-semibold mb-2">Data Sources</div>
                <div className="text-zinc-500 text-sm">Real-time aggregation</div>
              </div>
              <div className="bg-zinc-900 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-green-400 mb-3">5min</div>
                <div className="text-zinc-300 font-semibold mb-2">Update Frequency</div>
                <div className="text-zinc-500 text-sm">Real-time processing</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 bg-zinc-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Analytics Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-xl">📈</span>
                  </div>
                  <h3 className="font-semibold mb-2">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Analytics Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-zinc-900 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-zinc-300 mb-4">{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-zinc-400">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
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
        <section className="py-16 px-4 bg-zinc-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Unlock Advanced {keyword.fullKeyword}
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Get institutional-grade analytics and insights that drive better decisions.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-semibold transition-all">
              Start Advanced Analytics
            </button>
          </div>
        </section>
      </div>
    </>
  );
}