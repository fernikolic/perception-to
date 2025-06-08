import { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function CmsLearnPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section - Apple-style clean */}
      <div className="relative bg-white dark:bg-black pt-20">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-32 lg:px-8">
                  <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-6xl md:text-7xl font-light tracking-tight text-gray-900 dark:text-white leading-none mb-8">
              Learn
            </h1>
            <p className="mt-6 text-xl md:text-2xl font-light leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              In-depth guides, market analysis, and educational content to help you navigate Bitcoin, DeFi, and the evolving financial landscape.
            </p>
            
            <div className="mt-16 flex items-center justify-center">
              <div className="relative w-full max-w-2xl">
                <div className="relative flex items-center bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                  <Search className="ml-6 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search articles, guides, or topics..."
                    className="border-0 bg-transparent pl-4 text-lg placeholder:text-gray-400 focus-visible:ring-0 h-14"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learn Articles Section */}
      <section className="py-16 bg-white dark:bg-black">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center py-32">
            <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Coming Soon</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Educational articles and guides will be available here once content is added to the CMS.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CmsLearnPage; 