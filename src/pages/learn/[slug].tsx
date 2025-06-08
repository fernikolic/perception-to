import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchLearnArticle, LearnArticle } from '@/lib/payloadClient';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock } from 'lucide-react';
import Markdown from 'react-markdown';

export function LearnArticleDetailPage() {
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
        <h1 className="text-2xl font-bold mb-4">{error || "Article not found"}</h1>
        <Link to="/learn">
          <Button>Back to Learn</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <article className="mx-auto max-w-3xl px-6 py-24">
        <header className="mb-12">
          {article.category && (
            <div className="mb-4">
              <Badge variant="secondary" className="text-sm">
                {article.category}
              </Badge>
            </div>
          )}
          <h1 className="text-4xl font-extralight tracking-tight sm:text-5xl mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {article.excerpt}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <time>
              {article.publishedAt && new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {article.readTime && (
              <>
                <span>•</span>
                <span>{article.readTime} min read</span>
              </>
            )}
            {article.difficulty && (
              <>
                <span>•</span>
                <Badge variant="outline" className="text-xs">
                  {article.difficulty}
                </Badge>
              </>
            )}
          </div>
        </header>
        
        <div className="prose prose-lg prose-headings:text-black dark:prose-headings:text-white dark:prose-invert max-w-none">
          {article.content 
            ? <div className="markdown-body bg-slate-50 dark:bg-gray-900 p-8 rounded-xl shadow-md border border-slate-200 dark:border-gray-800 prose-h1:text-black prose-h2:text-black prose-h3:text-black prose-h4:text-black prose-h5:text-black prose-h6:text-black dark:prose-h1:text-white dark:prose-h2:text-white dark:prose-h3:text-white dark:prose-h4:text-white dark:prose-h5:text-white dark:prose-h6:text-white"><Markdown>{article.content}</Markdown></div>
            : <p>Coming soon — full write-up not published yet.</p>
          }
        </div>

        {Array.isArray(article.tags) && article.tags.length > 0 && (
          <div className="mt-12 border-t pt-6">
            <h2 className="text-xl font-bold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link key={tag} to={`/learn/tag/${tag}`}>
                  <Badge variant="secondary" className="text-sm">
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-12 flex justify-center">
          <Link to="/learn">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Learn
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
}

export const ArticlePage = LearnArticleDetailPage; 