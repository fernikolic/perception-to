import { useEffect, useState } from 'react';
import { fetchArticles, Article } from '@/lib/googleSheetsClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

export function LearnPage() {
  const [posts, setPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const articles = await fetchArticles();
        setPosts(articles);
      } catch (err) {
        console.error('Error loading articles:', err);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  // Filter posts based on search term
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (Array.isArray(post.tags) && post.tags.some(tag => 
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="mx-auto max-w-7xl px-6 pt-10 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Learn Bitcoin Perception
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Explore articles, tutorials, and insights about Bitcoin perception.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No articles found matching your search.
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => post && (
                <Card key={post.id} className="group relative overflow-hidden hover:shadow-lg">
                  {post.imageUrl && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title || ''}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {post.category && (
                        <span className="capitalize">{post.category}</span>
                      )}
                      <span>•</span>
                      <time>{post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}</time>
                    </div>
                    <CardTitle className="line-clamp-2 mt-2">{post.title || 'Untitled'}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {post.description}
                    </p>
                    <div className="mt-6">
                      <Link to={`/learn/${post.slug}`}>
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
      </section>
    </div>
  );
}

export default LearnPage; 