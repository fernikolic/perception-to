import { useEffect, useState } from 'react';
import { 
  fetchLearnArticles, 
  LearnArticle, 
  getCategoryColor, 
  getDifficultyColor,
  formatCategoryName,
  formatDifficultyName 
} from '@/lib/learnClient';
import { Search, BookOpen, ChevronRight, Clock, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function CmsLearnPage() {
  const [articles, setArticles] = useState<LearnArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const response = await fetchLearnArticles({
          search: searchTerm || undefined,
          category: selectedCategory || undefined,
          difficulty: selectedDifficulty || undefined,
          limit: 50
        });
        setArticles(response.docs);
      } catch (err) {
        console.error('Error loading learn articles:', err);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  // Get unique categories and difficulties from articles
  const categories = Array.from(new Set(articles.map(article => article.category))).filter(Boolean);
  const difficulties = Array.from(new Set(articles.map(article => article.difficulty))).filter(Boolean);

  // Get featured articles
  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
          </motion.div>
        </div>
      </div>

      {/* Filters - Apple-style */}
      <div className="bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-xl border-y border-gray-200/50 dark:border-gray-800/50">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="py-6">
            {/* Categories */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Categories</h4>
              <div className="scrollbar-hide -mx-6 flex space-x-3 overflow-x-auto px-6">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-sm ${
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
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-sm ${
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

            {/* Difficulties */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Difficulty</h4>
              <div className="scrollbar-hide -mx-6 flex space-x-3 overflow-x-auto px-6">
                <button
                  onClick={() => setSelectedDifficulty(null)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                    selectedDifficulty === null
                      ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  All Levels
                </button>
                
                {difficulties.map(difficulty => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty || null)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-sm ${
                      selectedDifficulty === difficulty
                        ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {formatDifficultyName(difficulty)}
                  </button>
                ))}
              </div>
            </div>
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
            <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">Unable to load articles</h3>
            <p className="text-gray-600 dark:text-gray-400">{error}</p>
          </div>
        </div>
      )}

      {/* Articles Content */}
      {!loading && !error && (
        <>
          {/* Featured Articles Section */}
          {featuredArticles.length > 0 && (
            <section className="py-16 bg-white dark:bg-black">
              <div className="mx-auto max-w-6xl px-6 lg:px-8">
                <div className="mb-12">
                  <h2 className="text-3xl font-light text-gray-900 dark:text-white mb-4">Featured Articles</h2>
                  <p className="text-gray-600 dark:text-gray-400">Essential reading for understanding the evolving landscape</p>
                </div>

                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                  {featuredArticles.map((article) => (
                    <motion.div key={article.id} variants={itemVariants}>
                      <Link to={`/learn/${article.slug}`}>
                        <div className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:-translate-y-1">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">Featured</span>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-3">
                            {article.title}
                          </h3>
                          
                          <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed mb-6">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                              {formatCategoryName(article.category)}
                            </span>
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                              {formatDifficultyName(article.difficulty)}
                            </span>
                            <div className="flex items-center text-xs text-gray-400">
                              <Clock className="mr-1.5 h-3 w-3" />
                              {article.readTime} min read
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          )}

          {/* All Articles Section */}
          <section className="py-16 bg-white dark:bg-black">
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              
              {/* Results Count and Clear Filters */}
              <div className="mb-12 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-light text-gray-900 dark:text-white">
                    {articles.length} {articles.length === 1 ? 'article' : 'articles'}
                  </span>
                  {(searchTerm || selectedCategory || selectedDifficulty) && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium">
                      {searchTerm && `"${searchTerm}"`}
                      {searchTerm && (selectedCategory || selectedDifficulty) && ' • '}
                      {selectedCategory && formatCategoryName(selectedCategory)}
                      {selectedCategory && selectedDifficulty && ' • '}
                      {selectedDifficulty && formatDifficultyName(selectedDifficulty)}
                    </span>
                  )}
                </div>
                
                {(searchTerm || selectedCategory || selectedDifficulty) && (
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(null);
                      setSelectedDifficulty(null);
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              {/* Empty State */}
              {articles.length === 0 && (
                <div className="text-center py-32">
                  <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                    <BookOpen className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">No articles found</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {searchTerm || selectedCategory || selectedDifficulty 
                      ? 'Try adjusting your search or filters' 
                      : 'No articles have been published yet'}
                  </p>
                </div>
              )}

              {/* Articles Grid */}
              {articles.length > 0 && (
                <motion.div 
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                  {regularArticles.map((article) => (
                    <motion.div key={article.id} variants={itemVariants}>
                      <Link to={`/learn/${article.slug}`}>
                        <div className="group bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:-translate-y-1">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {article.title}
                            </h3>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed mb-6">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                              {formatCategoryName(article.category)}
                            </span>
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(article.difficulty)}`}>
                              {formatDifficultyName(article.difficulty)}
                            </span>
                            <div className="flex items-center text-xs text-gray-400">
                              <Clock className="mr-1.5 h-3 w-3" />
                              {article.readTime} min read
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default CmsLearnPage; 