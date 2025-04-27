import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchArticlesByCategory, Article } from '@/lib/googleSheetsClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CategoryPage() {
  const { slug } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      if (!slug) {
        setError("Category slug not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const fetchedArticles = await fetchArticlesByCategory(slug);
        setArticles(fetchedArticles);
      } catch (err) {
        console.error('Error loading category articles:', err);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mb-8">
          <Link to="/learn" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Articles
          </Link>
        </div>

        <div className="mx-auto max-w-2xl text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            {slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Category'}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {articles.length} {articles.length === 1 ? 'article' : 'articles'} in this category
          </p>
        </div>

        {error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : articles.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No articles found in this category.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <Card key={article.id} className="group relative overflow-hidden hover:shadow-lg">
                {article.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title || ''}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {article.category && (
                      <span className="capitalize">{article.category}</span>
                    )}
                    <span>•</span>
                    <time>{article.publishedAt && new Date(article.publishedAt).toLocaleDateString()}</time>
                  </div>
                  <CardTitle className="line-clamp-2 mt-2">{article.title || 'Untitled'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {article.description}
                  </p>
                  <div className="mt-6">
                    <Link to={`/learn/${article.slug}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Read more
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 