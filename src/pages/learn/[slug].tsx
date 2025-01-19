import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPost } from '@/lib/strapi';

interface Article {
  id: number;
  attributes: {
    documentId: string;
    title: string;
    description: string;
    content: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export function ArticlePage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log('Fetching article with slug:', slug);
        const response = await getBlogPost(slug as string);
        console.log('Article response:', response);
        
        if (!response.data) {
          setError('Article not found');
          setLoading(false);
          return;
        }

        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(err instanceof Error ? err.message : 'Failed to load article');
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background pt-20">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <div className="text-center text-red-500">
            {error || 'Article not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <article className="mx-auto max-w-3xl px-6 py-24">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            {article.attributes.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {article.attributes.description}
          </p>
          <time className="text-sm text-muted-foreground block mt-4">
            {new Date(article.attributes.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
        </header>
        
        <div className="prose prose-lg prose-invert max-w-none">
          {article.attributes.content}
        </div>
      </article>
    </div>
  );
} 