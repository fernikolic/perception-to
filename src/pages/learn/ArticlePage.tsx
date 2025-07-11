import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleBySlug, Article } from '@/lib/googleSheetsClient';
import SEO from '@/components/SEO';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { marked } from 'marked';

// Simple HTML sanitizer to prevent XSS attacks
function sanitizeHtml(html: string): string {
  // Remove script tags and their content
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove javascript: URLs
  html = html.replace(/javascript:/gi, '');
  
  // Remove on* event handlers
  html = html.replace(/\son\w+\s*=\s*[^>]*/gi, '');
  
  // Remove style attributes that could contain javascript
  html = html.replace(/style\s*=\s*[^>]*expression\s*\([^>]*\)/gi, '');
  
  // Remove data URIs that could contain javascript
  html = html.replace(/data:\s*text\/html/gi, 'data:text/plain');
  
  return html;
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true);
        if (!slug) return;
        
        const articleData = await fetchArticleBySlug(slug);
        setArticle(articleData);
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Failed to load the article. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p>{error || 'The article you are looking for does not exist.'}</p>
          <a 
            href="/learn" 
            className="inline-block mt-4 px-4 py-2 rounded bg-primary text-white"
          >
            Back to Learn
          </a>
        </div>
        <Footer />
      </div>
    );
  }

  // Parse the content as Markdown and sanitize it to prevent XSS
  const rawHtml = typeof marked(article.content) === 'string' ? marked(article.content) as string : '';
  const htmlContent = sanitizeHtml(rawHtml);

  return (
    <>
      <SEO
        title={article.title}
        description={article.description}
        image={article.imageUrl}
        url={`https://perception.to/learn/${article.slug}`}
        type="article"
        article={{
          publishedTime: article.publishedAt,
          modifiedTime: article.updatedAt,
          author: article.author,
          tags: Array.isArray(article.tags) ? article.tags : [],
        }}
        keywords={Array.isArray(article.tags) ? article.tags : []}
      />

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 py-16">
          <article>
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                {article.title}
              </h1>
              
              <div className="flex items-center text-muted-foreground mb-4">
                <span className="mr-4">{new Date(article.publishedAt).toLocaleDateString()}</span>
                <span>By {article.author}</span>
              </div>
              
              {article.imageUrl && (
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-auto rounded-lg object-cover mb-6"
                />
              )}
              
              <p className="text-xl text-foreground/80 leading-relaxed">
                {article.description}
              </p>
            </header>
            
            <div 
              className="prose prose-lg prose-headings:text-black dark:prose-headings:text-white prose-h1:text-black prose-h2:text-black prose-h3:text-black prose-h4:text-black prose-h5:text-black prose-h6:text-black dark:prose-h1:text-white dark:prose-h2:text-white dark:prose-h3:text-white dark:prose-h4:text-white dark:prose-h5:text-white dark:prose-h6:text-white max-w-none markdown-body bg-slate-50 dark:bg-gray-900 p-8 rounded-xl shadow-md border border-slate-200 dark:border-gray-800"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
            
            <div className="mt-12 pt-6 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {Array.isArray(article.tags) && article.tags.map(tag => (
                  <a 
                    key={tag}
                    href={`/learn/tags/${tag}`}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 transition-colors"
                  >
                    {tag}
                  </a>
                ))}
              </div>
            </div>
          </article>
        </main>
        
        <Footer />
      </div>
    </>
  );
} 