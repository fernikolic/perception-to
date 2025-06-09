import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchLearnArticle, LearnArticle, getCategoryColor, getDifficultyColor, formatCategoryName, formatDifficultyName } from '@/lib/learnClient';
import { ArrowLeft, Clock, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function LearnArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<LearnArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const fetchedArticle = await fetchLearnArticle(slug);
        setArticle(fetchedArticle);
        
        if (!fetchedArticle) {
          setError('Article not found');
        }
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug]);

  // Function to render rich text content from Payload
  const renderRichText = (content: any) => {
    if (!content) return null;

    // Handle different rich text formats from Payload
    if (Array.isArray(content)) {
      return content.map((node, index) => renderNode(node, index));
    }

    if (typeof content === 'string') {
      return <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">{content}</p>;
    }

    return renderNode(content, 0);
  };

  const renderNode = (node: any, index: number) => {
    if (!node) return null;

    const key = `node-${index}`;

    // Handle text nodes
    if (node.text !== undefined) {
      let element = <span key={key}>{node.text}</span>;
      
      if (node.bold) element = <strong key={key}>{element}</strong>;
      if (node.italic) element = <em key={key}>{element}</em>;
      if (node.underline) element = <u key={key}>{element}</u>;
      if (node.code) element = <code key={key} className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">{element}</code>;
      
      return element;
    }

    // Handle block elements
    switch (node.type) {
      case 'paragraph':
        return (
          <p key={key} className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </p>
        );
      
      case 'heading':
        const HeadingTag = `h${node.level || 2}` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          1: "text-4xl font-bold mb-8 mt-12 text-gray-900 dark:text-white",
          2: "text-3xl font-semibold mb-6 mt-10 text-gray-900 dark:text-white",
          3: "text-2xl font-semibold mb-4 mt-8 text-gray-900 dark:text-white",
          4: "text-xl font-semibold mb-4 mt-6 text-gray-900 dark:text-white",
          5: "text-lg font-semibold mb-3 mt-6 text-gray-900 dark:text-white",
          6: "text-base font-semibold mb-3 mt-4 text-gray-900 dark:text-white"
        };
        return (
          <HeadingTag key={key} className={headingClasses[node.level as keyof typeof headingClasses] || headingClasses[2]}>
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </HeadingTag>
        );
      
      case 'list':
        const ListTag = node.format === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={key} className={`mb-6 ${node.format === 'ordered' ? 'list-decimal' : 'list-disc'} list-inside space-y-2 text-lg text-gray-700 dark:text-gray-300`}>
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </ListTag>
        );
      
      case 'listItem':
        return (
          <li key={key} className="leading-relaxed">
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </li>
        );
      
      case 'quote':
        return (
          <blockquote key={key} className="border-l-4 border-blue-500 pl-6 mb-6 italic text-lg text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 py-4 rounded-r-lg">
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </blockquote>
        );
      
      case 'code':
        return (
          <pre key={key} className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-6 rounded-xl mb-6 overflow-x-auto">
            <code className="text-sm font-mono">
              {node.children?.map((child: any, i: number) => renderNode(child, i))}
            </code>
          </pre>
        );
      
      case 'link':
        return (
          <a 
            key={key} 
            href={node.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-blue-500/30 hover:decoration-blue-500 transition-colors"
          >
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </a>
        );
      
      default:
        // Fallback for unknown node types
        return (
          <div key={key}>
            {node.children?.map((child: any, i: number) => renderNode(child, i))}
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-900 dark:border-gray-700 dark:border-t-white"></div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            {error === 'Article not found' ? 'Article Not Found' : 'Error Loading Article'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{error}</p>
          <Link 
            to="/learn" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learn
          </Link>
        </div>
      </div>  
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Header with back button */}
      <div className="border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-xl sticky top-16 z-10">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <Link 
            to="/learn" 
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learn
          </Link>
        </div>
      </div>

      {/* Article content */}
      <article className="mx-auto max-w-4xl px-6 py-16 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Article meta */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                {formatCategoryName(article.category)}
              </span>
              <span className={`inline-flex px-4 py-2 rounded-full text-sm font-medium ${getDifficultyColor(article.difficulty)}`}>
                {formatDifficultyName(article.difficulty)}
              </span>
              {article.featured && (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800">
                  <Star className="h-3.5 w-3.5" />
                  Featured
                </span>
              )}
            </div>

            {/* Article title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Article excerpt */}
            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
              {article.excerpt}
            </p>

            {/* Article meta info */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pb-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {article.readTime} min read
              </div>
              {article.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time>
                    {new Date(article.publishedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              )}
              {article.updatedAt && article.updatedAt !== article.publishedAt && (
                <div className="text-xs text-gray-400">
                  Updated {new Date(article.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>

          {/* Article content */}
          <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
            {renderRichText(article.content)}
          </div>

          {/* Article tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tagObj, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {tagObj.tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </article>
    </div>
  );
}

export default LearnArticlePage; 