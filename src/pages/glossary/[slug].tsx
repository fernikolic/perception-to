import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  fetchGlossaryEntry, 
  GlossaryEntry, 
  getCategoryColor, 
  formatCategoryName 
} from '@/lib/payloadClient';

import { ArrowLeft, Clock, Share, BookOpen, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function GlossaryEntryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [entry, setEntry] = useState<GlossaryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadEntry = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);
        const entryData = await fetchGlossaryEntry(slug);
        if (entryData) {
          setEntry(entryData);
        } else {
          setError('Glossary entry not found');
        }
      } catch (err) {
        console.error('Error loading glossary entry:', err);
        setError('Failed to load glossary entry');
      } finally {
        setLoading(false);
      }
    };

    loadEntry();
  }, [slug]);

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: entry?.title,
          text: entry?.description,
          url: url,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.log('Error copying to clipboard:', err);
      }
    }
  };

  // Loading State - Apple-style
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="mx-auto max-w-4xl px-6 pt-32 lg:px-8">
          <div className="animate-pulse">
            <div className="mb-12">
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded-full mb-8"></div>
              <div className="h-16 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-2xl mb-6"></div>
              <div className="h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
            </div>
            <div className="space-y-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
              <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State - Apple-style
  if (error || !entry) {
    return (
      <div className="min-h-screen bg-white dark:bg-black">
        <div className="mx-auto max-w-4xl px-6 pt-32 lg:px-8">
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-8">
              <BookOpen className="h-10 w-10 text-gray-400" />
            </div>
            <h1 className="text-3xl font-light text-gray-900 dark:text-white mb-4">
              {error === 'Glossary entry not found' ? 'Term Not Found' : 'Unable to Load Term'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              {error === 'Glossary entry not found' 
                ? 'The glossary term you\'re looking for doesn\'t exist or has been removed.'
                : 'There was an error loading this glossary entry. Please try again later.'}
            </p>
            <Link to="/glossary">
              <button className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 rounded-full font-medium transition-all duration-300 inline-flex items-center gap-3">
                <ArrowLeft className="h-4 w-4" />
                Back to Glossary
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-4xl px-6 pt-32 pb-20 lg:px-8">
        
        {/* Breadcrumb Navigation - Apple-style */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12"
        >
          <Link 
            to="/glossary" 
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Glossary
          </Link>
        </motion.div>

        <article>
          {/* Header - Apple-style */}
          <motion.header 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-12"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl font-light tracking-tight text-gray-900 dark:text-white leading-tight mb-8">
                  {entry.title}
                </h1>
                
                <div className="flex items-center gap-6 flex-wrap">
                  {entry.category && (
                    <span className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(entry.category)}`}>
                      {formatCategoryName(entry.category)}
                    </span>
                  )}
                  
                  {entry.updatedAt && (
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Clock className="mr-2 h-4 w-4" />
                      <time className="font-medium">
                        Last updated {new Date(entry.updatedAt).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={handleShare}
                className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all duration-300 shrink-0"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Share className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
          </motion.header>

          {/* Content - Apple-style */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="prose prose-xl dark:prose-invert max-w-none"
          >
            <div className="text-xl md:text-2xl font-light leading-relaxed text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {entry.description}
            </div>
          </motion.div>

          {/* Footer - Apple-style */}
          <motion.footer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                Found this helpful? Share it with others.
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={handleShare}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 flex items-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy Link
                    </>
                  )}
                </button>
                
                <Link to="/glossary">
                  <button className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 rounded-full font-medium transition-all duration-300">
                    Browse More Terms
                  </button>
                </Link>
              </div>
            </div>
          </motion.footer>
        </article>
      </div>
    </div>
  );
}

export default GlossaryEntryPage; 