import { useEffect, useState } from 'react';
import { 
  fetchGlossaryEntries, 
  GlossaryEntry, 
  getCategoryColor, 
  formatCategoryName 
} from '@/lib/payloadClient';
import { Search, BookOpen, ChevronRight, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function GlossaryPage() {
  const [entries, setEntries] = useState<GlossaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        setLoading(true);
        const response = await fetchGlossaryEntries({
          search: searchTerm || undefined,
          category: selectedCategory || undefined,
          limit: 50
        });
        setEntries(response.docs);
      } catch (err) {
        console.error('Error loading glossary entries:', err);
        setError('Failed to load glossary entries');
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, [searchTerm, selectedCategory]);

  // Get unique categories from entries
  const categories = Array.from(new Set(entries.map(entry => entry.category))).filter(Boolean);

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

      return (
      <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section - Apple-style clean */}
      <div className="relative bg-white dark:bg-black pt-20">
        <div className="mx-auto max-w-6xl px-6 pt-20 pb-32 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mx-auto max-w-4xl text-center"
          >
            <h1 className="text-6xl md:text-7xl font-light tracking-tight text-gray-900 dark:text-white leading-none mb-8">
              Decode the Language of the{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                Future of Finance
              </span>
            </h1>
                         <p className="mt-6 text-xl md:text-2xl font-light leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
               The essential glossary for Bitcoin, stablecoin and tokenized finance terminology, market mechanics, and policy concepts.
             </p>
            
            <div className="mt-16 flex items-center justify-center">
              <div className="relative w-full max-w-2xl">
                <div className="relative flex items-center bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300">
                  <Search className="ml-6 h-5 w-5 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search terms, definitions, or concepts..."
                    className="border-0 bg-transparent pl-4 text-lg placeholder:text-gray-400 focus-visible:ring-0 h-14"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories Filter - Apple-style */}
      <div className="bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-xl border-y border-gray-200/50 dark:border-gray-800/50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="scrollbar-hide -mx-6 flex space-x-3 overflow-x-auto px-6 py-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === null
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
              }`}
            >
              All Categories
            </button>
            
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category || null)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {formatCategoryName(category)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State - Apple-style */}
      {loading && (
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-900 dark:border-gray-700 dark:border-t-white"></div>
        </div>
      )}

      {/* Error State - Apple-style */}
      {error && (
        <div className="mx-auto max-w-6xl px-6 py-32 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
              <BookOpen className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Unable to load glossary</h3>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        </div>
      )}

      {/* Glossary Entries Grid - Apple-style */}
      {!loading && !error && (
        <section className="py-16 bg-white dark:bg-black">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            
            {/* Results Count - Apple-style */}
            <div className="mb-12 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-light text-gray-900 dark:text-white">
                  {entries.length} {entries.length === 1 ? 'term' : 'terms'}
                </span>
                {(searchTerm || selectedCategory) && (
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium">
                    {searchTerm && `"${searchTerm}"`}
                    {searchTerm && selectedCategory && ' in '}
                    {selectedCategory && formatCategoryName(selectedCategory)}
                  </span>
                )}
              </div>
              
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory(null);
                  }}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Empty State - Apple-style */}
            {entries.length === 0 && (
              <div className="text-center py-32">
                <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">No terms found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm || selectedCategory 
                    ? 'Try adjusting your search or filters' 
                    : 'No glossary entries have been published yet'}
                </p>
              </div>
            )}

            {/* Entries Grid - Apple-style */}
            {entries.length > 0 && (
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
              >
                {entries.map((entry) => (
                  <motion.div key={entry.id} variants={itemVariants}>
                    <Link to={`/glossary/${entry.slug}`}>
                      <div className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:-translate-y-1">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {entry.title}
                          </h3>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        
                        {entry.category && (
                          <div className="mb-4">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(entry.category)}`}>
                              {formatCategoryName(entry.category)}
                            </span>
                          </div>
                        )}
                        
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed mb-6">
                          {entry.description}
                        </p>
                        
                        {entry.updatedAt && (
                          <div className="flex items-center text-xs text-gray-400">
                            <Clock className="mr-1.5 h-3 w-3" />
                            <time>
                              Updated {new Date(entry.updatedAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </time>
                          </div>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default GlossaryPage; 