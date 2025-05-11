import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleBySlug, Article } from '@/lib/googleSheetsClient';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Markdown from 'react-markdown';

export function ArticlePage() {
  const { slug, category } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) {
        setError("Article slug not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log(`Loading article with slug: ${slug}, category: ${category || 'none'}`);
        const fetchedArticle = await fetchArticleBySlug(slug);
        
        if (!fetchedArticle) {
          setError("Article not found");
        } else {
          setArticle(fetchedArticle);
        }
      } catch (err) {
        console.error('Error loading article:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [slug, category]);

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
      {article.imageUrl && (
        <div className="relative h-[40vh] overflow-hidden">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
      )}
      
      <article className="mx-auto max-w-3xl px-6 py-24">
        <header className="mb-12">
          {article.category && (
            <div className="mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                {article.category}
              </span>
            </div>
          )}
          <h1 className="text-4xl font-extralight tracking-tight sm:text-5xl mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {article.description}
          </p>
          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            {article.author && (
              <span>By {article.author}</span>
            )}
            <time>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
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
                  <span className="rounded-full bg-secondary px-3 py-1 text-sm">
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-12 flex justify-center">
          <Link to="/learn">
            <Button variant="outline">
              ← Back to Learn
            </Button>
          </Link>
        </div>
      </article>
    </div>
  );
} 