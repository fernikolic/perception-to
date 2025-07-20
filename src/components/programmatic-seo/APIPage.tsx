import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { keywordMatrix } from '@/data/keywords';
import { generateMeta, generateHeroContent, generateUseCases } from '@/components/seo/programmatic-seo';

export default function APIPage() {
  const { slug } = useParams<{ slug: string }>();
  
  const keyword = keywordMatrix.find(k => {
    const keywordSlug = k.fullKeyword
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    return keywordSlug === slug;
  });

  if (!keyword || (keyword.category !== 'api' && keyword.templateType !== 'api-documentation')) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">API Documentation Not Found</h1>
          <p className="text-zinc-400">The requested API documentation could not be found.</p>
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 bg-clip-text text-transparent">
              {heroContent.headline}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto">
              {heroContent.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition-colors">
                {heroContent.primaryCTA}
              </button>
              <button className="px-8 py-3 border border-zinc-600 hover:border-zinc-500 rounded-lg font-semibold transition-colors">
                {heroContent.secondaryCTA}
              </button>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="py-16 px-4 bg-zinc-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Quick Start with {keyword.fullKeyword}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Authentication</h3>
                <div className="bg-zinc-800 rounded-lg p-4 mb-6">
                  <pre className="text-sm text-green-400 overflow-x-auto">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
     -H "Content-Type: application/json" \\
     https://api.perception.to/v1/sentiment`}
                  </pre>
                </div>
                <h3 className="text-xl font-bold mb-4">Response Format</h3>
                <div className="bg-zinc-800 rounded-lg p-4">
                  <pre className="text-sm text-cyan-400 overflow-x-auto">
{`{
  "sentiment": 72.5,
  "confidence": 0.87,
  "timestamp": "2025-07-19T10:30:00Z",
  "sources": 247
}`}
                  </pre>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Example Implementation</h3>
                <div className="bg-zinc-800 rounded-lg p-4 mb-6">
                  <pre className="text-sm text-blue-400 overflow-x-auto">
{`// JavaScript Example
const response = await fetch('/api/sentiment', {
  headers: {
    'Authorization': 'Bearer YOUR_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log('Sentiment:', data.sentiment);`}
                  </pre>
                </div>
                <div className="bg-cyan-900/20 border border-cyan-600 rounded-lg p-4">
                  <p className="text-cyan-300 text-sm">
                    💡 <strong>Pro Tip:</strong> Use webhooks for real-time updates instead of polling
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              API Endpoints
            </h2>
            <div className="space-y-6">
              <div className="bg-zinc-900 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold mr-4">GET</span>
                  <code className="text-cyan-400">/v1/sentiment/current</code>
                </div>
                <p className="text-zinc-300 mb-4">Get current Bitcoin sentiment score with real-time data</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">Parameters</h4>
                    <ul className="text-sm text-zinc-400 space-y-1">
                      <li><code>source</code> - Filter by data source</li>
                      <li><code>timeframe</code> - Analysis timeframe</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Response</h4>
                    <ul className="text-sm text-zinc-400 space-y-1">
                      <li>Real-time sentiment score</li>
                      <li>Confidence level and metadata</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-bold mr-4">GET</span>
                  <code className="text-cyan-400">/v1/sentiment/historical</code>
                </div>
                <p className="text-zinc-300 mb-4">Access historical sentiment data for trend analysis</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">Parameters</h4>
                    <ul className="text-sm text-zinc-400 space-y-1">
                      <li><code>start_date</code> - Start date for data</li>
                      <li><code>end_date</code> - End date for data</li>
                      <li><code>interval</code> - Data granularity</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Response</h4>
                    <ul className="text-sm text-zinc-400 space-y-1">
                      <li>Time-series sentiment data</li>
                      <li>Aggregated statistics</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold mr-4">POST</span>
                  <code className="text-cyan-400">/v1/webhooks</code>
                </div>
                <p className="text-zinc-300 mb-4">Set up real-time webhooks for sentiment updates</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-bold mb-2">Parameters</h4>
                    <ul className="text-sm text-zinc-400 space-y-1">
                      <li><code>url</code> - Your webhook endpoint</li>
                      <li><code>events</code> - Event types to monitor</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2">Response</h4>
                    <ul className="text-sm text-zinc-400 space-y-1">
                      <li>Webhook configuration ID</li>
                      <li>Verification token</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SDKs and Libraries */}
        <section className="py-16 px-4 bg-zinc-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              SDKs and Libraries
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['JavaScript', 'Python', 'Go', 'PHP'].map((lang, index) => (
                <div key={index} className="bg-zinc-800 rounded-lg p-6 text-center">
                  <div className="w-12 h-12 bg-cyan-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <span className="text-xl">📚</span>
                  </div>
                  <h3 className="font-semibold mb-2">{lang} SDK</h3>
                  <p className="text-zinc-400 text-sm mb-4">Official {lang} library with full API support</p>
                  <button className="text-cyan-400 hover:text-cyan-300 text-sm font-semibold">
                    View Docs →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">
              API Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-zinc-900 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-3">{useCase.title}</h3>
                  <p className="text-zinc-300 mb-4">{useCase.description}</p>
                  <ul className="space-y-2">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-zinc-400">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
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
              Start Building with {keyword.fullKeyword}
            </h2>
            <p className="text-xl text-zinc-300 mb-8">
              Get your API key and start integrating sentiment data in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-lg font-semibold transition-all">
                Get API Key
              </button>
              <button className="px-8 py-3 border border-zinc-600 hover:border-zinc-500 rounded-lg font-semibold transition-colors">
                View Examples
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}