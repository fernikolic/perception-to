import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPost } from '@/lib/strapi';

interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: {
    url: string;
    alternativeText: string;
    formats: {
      large: {
        url: string;
      };
    };
  };
  author: {
    name: string;
  };
  category: {
    name: string;
    slug: string;
  };
  blocks: Array<{
    __component: string;
    id: number;
    body?: string;
    title?: string;
  }>;
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
        
        if (!response.data?.[0]) {
          setError('Article not found');
          setLoading(false);
          return;
        }

        setArticle(response.data[0]);
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
      {article.cover && (
        <div className="relative h-[40vh] overflow-hidden">
          <img
            src={article.cover.formats.large.url}
            alt={article.cover.alternativeText || article.title}
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
                {article.category.name}
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
              <span>By {article.author.name}</span>
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
        
        <div className="prose prose-lg prose-invert max-w-none">
          {article.blocks?.map((block) => {
            if (block.__component === 'shared.rich-text' && block.body) {
              return <div key={block.id} dangerouslySetInnerHTML={{ __html: block.body }} />;
            }
            if (block.__component === 'shared.quote' && block.body) {
              return (
                <blockquote key={block.id} className="not-italic">
                  <p>{block.body}</p>
                  {block.title && <cite>— {block.title}</cite>}
                </blockquote>
              );
            }
            return null;
          })}
        </div>
      </article>
    </div>
  );
} 