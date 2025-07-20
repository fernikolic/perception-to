import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { keywordMatrix } from '@/data/keywords';
import { generateMeta, generateHeroContent, generateFeatures, generateUseCases } from '@/components/seo/programmatic-seo';

export default function ToolsPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const keyword = keywordMatrix.find(k => {
    const keywordSlug = k.fullKeyword
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    return keywordSlug === slug;
  });

  if (!keyword || (keyword.category !== 'tools' && keyword.templateType !== 'tool-page')) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-zinc-400">The requested tool page could not be found.</p>
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-400 bg-clip-text text-transparent">
              {heroContent.headline}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto">
              {heroContent.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors">
                {heroContent.primaryCTA}
              </button>
              <button className="px-8 py-3 border border-zinc-600 hover:border-zinc-500 rounded-lg font-semibold transition-colors">
                {heroContent.secondaryCTA}
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Tool Demo */}
        <section className="py-16 px-4 bg-zinc-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Try the {keyword.fullKeyword} Tool
            </h2>
            <div className="bg-zinc-800 rounded-xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Tool Interface</h3>
                  <div className="bg-zinc-700 rounded-lg p-6 h-64 flex items-center justify-center">
                    <span className="text-zinc-400">Interactive Tool Preview</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Real-time Results</h3>
                  <div className="space-y-4">
                    <div className="bg-zinc-700 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span>Current Score</span>
                        <span className="text-green-400 font-bold">+24.5</span>
                      </div>
                    </div>
                    <div className="bg-zinc-700 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span>24h Change</span>
                        <span className="text-blue-400 font-bold">+3.2%</span>
                      </div>
                    </div>
                    <div className="bg-zinc-700 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span>Confidence</span>
                        <span className="text-purple-400 font-bold">87%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tool Features */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Tool Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-zinc-900 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-green-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-xl">🛠️</span>
                  </div>
                  <h3 className="font-semibold mb-2">{feature}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use */}
        <section className="py-16 px-4 bg-zinc-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              How to Use {keyword.fullKeyword}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Connect Your Data</h3>
                <p className="text-zinc-300">Link your accounts or input data sources for real-time analysis.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Configure Settings</h3>
                <p className="text-zinc-300">Customize parameters and preferences for your specific use case.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Get Insights</h3>
                <p className="text-zinc-300">Access real-time results and actionable insights from your data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Tool Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-zinc-900 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-zinc-300 mb-4">{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-zinc-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
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
              Start Using {keyword.fullKeyword} Now
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Join professionals who rely on our tools for accurate, real-time insights.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-lg font-semibold transition-all">
              Launch Tool
            </button>
          </div>
        </section>
      </div>
    </>
  );
}