import { Helmet } from 'react-helmet-async';
import { keywordMatrix, highPriorityKeywords, generateSlug } from '@/data/keywords';

export default function KeywordTest() {
  console.log('=== Programmatic SEO Keyword Generation Test ===');
  console.log(`Total keywords generated: ${keywordMatrix.length}`);
  console.log(`High priority keywords: ${highPriorityKeywords.length}`);

  const sampleKeywords = highPriorityKeywords.slice(0, 10);
  
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Keyword Test - Development Only</title>
      </Helmet>
      <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Programmatic SEO Keywords Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Statistics</h2>
            <div className="space-y-2">
              <p>Total keywords: <span className="text-blue-400 font-bold">{keywordMatrix.length}</span></p>
              <p>High priority: <span className="text-green-400 font-bold">{highPriorityKeywords.length}</span></p>
              <p>Medium priority: <span className="text-yellow-400 font-bold">{keywordMatrix.filter(k => k.priority === 'medium').length}</span></p>
              <p>Low priority: <span className="text-red-400 font-bold">{keywordMatrix.filter(k => k.priority === 'low').length}</span></p>
            </div>
          </div>
          
          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Template Distribution</h2>
            <div className="space-y-2 text-sm">
              {Object.entries(
                keywordMatrix.reduce((acc, k) => {
                  acc[k.templateType] = (acc[k.templateType] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
              ).map(([template, count]) => (
                <p key={template}>
                  {template}: <span className="text-cyan-400 font-bold">{count}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Sample High Priority Keywords</h2>
          <div className="space-y-4">
            {sampleKeywords.map((keyword, index) => {
              const slug = generateSlug(keyword.fullKeyword);
              const url = `/${keyword.category}/${slug}`;
              
              return (
                <div key={index} className="border border-zinc-700 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-blue-400 mb-2">{keyword.fullKeyword}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-zinc-400">Category:</span>
                      <br />
                      <span className="text-green-400">{keyword.category}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400">Template:</span>
                      <br />
                      <span className="text-purple-400">{keyword.templateType}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400">Intent:</span>
                      <br />
                      <span className="text-orange-400">{keyword.intent}</span>
                    </div>
                    <div>
                      <span className="text-zinc-400">URL:</span>
                      <br />
                      <a href={url} className="text-cyan-400 hover:text-cyan-300 underline">
                        {url}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Category Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(
              keywordMatrix.reduce((acc, k) => {
                acc[k.category] = (acc[k.category] || 0) + 1;
                return acc;
              }, {} as Record<string, number>)
            ).map(([category, count]) => (
              <div key={category} className="bg-zinc-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">{count}</div>
                <div className="text-zinc-300 capitalize">{category} pages</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}