import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { generateHighPriorityPages, analyzeContentQuality } from '@/scripts/generatePages';

export default function ContentShowcase() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'live' | 'template-only'>('all');
  
  const allPages = generateHighPriorityPages();
  const pages = statusFilter === 'all' ? allPages : allPages.filter(page => page.status === statusFilter);
  const metrics = analyzeContentQuality();
  
  const livePages = allPages.filter(page => page.isPublished);
  const templateOnlyPages = allPages.filter(page => !page.isPublished);

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>Content Production Showcase - Development Only</title>
      </Helmet>
      
      <div className="min-h-screen bg-zinc-950 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Content Production Showcase
          </h1>
          
          {/* Production Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
            <div className="bg-zinc-900 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{livePages.length}</div>
              <div className="text-zinc-300">Live Pages</div>
            </div>
            <div className="bg-zinc-900 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{templateOnlyPages.length}</div>
              <div className="text-zinc-300">Template Only</div>
            </div>
            <div className="bg-zinc-900 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">{metrics.averageWordCount}</div>
              <div className="text-zinc-300">Avg Word Count</div>
            </div>
            <div className="bg-zinc-900 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{metrics.averageUniqueness}%</div>
              <div className="text-zinc-300">Avg Uniqueness</div>
            </div>
            <div className="bg-zinc-900 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">{Math.round((livePages.length / allPages.length) * 100)}%</div>
              <div className="text-zinc-300">Published Rate</div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="bg-zinc-900 rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Generated Pages</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    statusFilter === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                  }`}
                >
                  All ({allPages.length})
                </button>
                <button
                  onClick={() => setStatusFilter('live')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    statusFilter === 'live'
                      ? 'bg-green-600 text-white'
                      : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                  }`}
                >
                  Live ({livePages.length})
                </button>
                <button
                  onClick={() => setStatusFilter('template-only')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    statusFilter === 'template-only'
                      ? 'bg-orange-600 text-white'
                      : 'bg-zinc-700 text-zinc-300 hover:bg-zinc-600'
                  }`}
                >
                  Template Only ({templateOnlyPages.length})
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pages.slice(0, 20).map((page, index) => (
                <div key={index} className={`bg-zinc-800 rounded-lg p-4 border ${page.isPublished ? 'border-green-600' : 'border-orange-600'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-blue-400">{page.keyword}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      page.isPublished 
                        ? 'bg-green-600 text-white' 
                        : 'bg-orange-600 text-white'
                    }`}>
                      {page.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-sm space-y-1">
                    <div><span className="text-zinc-400">URL:</span> <code className="text-green-400">{page.url}</code></div>
                    <div><span className="text-zinc-400">Category:</span> <span className="text-purple-400">{page.category}</span></div>
                    <div><span className="text-zinc-400">Template:</span> <span className="text-orange-400">{page.templateType}</span></div>
                    <div><span className="text-zinc-400">Intent:</span> <span className="text-cyan-400">{page.intent}</span></div>
                    <div><span className="text-zinc-400">Words:</span> <span className="text-yellow-400">{page.wordCount}</span></div>
                  </div>
                  {page.isPublished ? (
                    <a 
                      href={page.url} 
                      className="inline-block mt-2 text-green-400 hover:text-green-300 text-sm underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Live Page →
                    </a>
                  ) : (
                    <span className="inline-block mt-2 text-orange-400 text-sm">
                      Template exists, not routed
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Content Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-zinc-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Category Distribution</h3>
              <div className="space-y-2">
                {Object.entries(metrics.categoryDistribution).map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center">
                    <span className="capitalize text-zinc-300">{category}</span>
                    <span className="text-green-400 font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Template Types</h3>
              <div className="space-y-2">
                {Object.entries(metrics.templateDistribution).map(([template, count]) => (
                  <div key={template} className="flex justify-between items-center">
                    <span className="text-zinc-300 text-sm">{template}</span>
                    <span className="text-blue-400 font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Search Intent</h3>
              <div className="space-y-2">
                {Object.entries(metrics.intentDistribution).map(([intent, count]) => (
                  <div key={intent} className="flex justify-between items-center">
                    <span className="capitalize text-zinc-300">{intent}</span>
                    <span className="text-purple-400 font-bold">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sample Content Preview */}
          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Sample Content Preview</h2>
            {pages.slice(0, 3).map((page, index) => (
              <div key={index} className="border border-zinc-700 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-blue-400">{page.keyword}</h3>
                    <p className="text-zinc-400 text-sm mt-1">{page.metaDescription}</p>
                  </div>
                  <div className="text-right text-sm text-zinc-500">
                    <div>{page.wordCount} words</div>
                    <div>{Math.round(page.uniquenessScore * 100)}% unique</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {page.sections.slice(0, 2).map((section, sIndex) => (
                    <div key={sIndex}>
                      <h4 className="font-semibold text-green-400 mb-2">{section.heading}</h4>
                      <p className="text-zinc-300 text-sm line-clamp-3">
                        {section.content.split('\n\n')[0].substring(0, 200)}...
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-zinc-700 flex justify-between text-sm">
                  <span className="text-zinc-400">Template: {page.templateType}</span>
                  <span className="text-zinc-400">Intent: {page.intent}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Content Quality Metrics */}
          <div className="bg-zinc-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Content Quality Analysis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-green-400">Quality Standards Met</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    800+ words per page (avg: {metrics.averageWordCount})
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    70%+ content uniqueness (avg: {metrics.averageUniqueness}%)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Dynamic meta descriptions per page
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Schema markup for enhanced SEO
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Intent-based content optimization
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-400">SEO Features</h3>
                <ul className="space-y-2 text-zinc-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Keyword-optimized H1/H2/H3 structure
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Canonical URLs and meta tags
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Open Graph and Twitter Cards
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Structured data (JSON-LD)
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                    Mobile-responsive design
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}