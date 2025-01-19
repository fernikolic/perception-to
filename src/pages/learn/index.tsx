import { useEffect, useState } from 'react';
import { getBlogPosts } from '@/lib/strapi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

interface Post {
  id: number;
  attributes: {
    documentId: string;
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export function LearnPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts...');
        const response = await getBlogPosts();
        console.log('Raw API Response:', JSON.stringify(response, null, 2));
        
        if (!response.data) {
          console.error('No data in response:', response);
          setError('No data received from API');
          setLoading(false);
          return;
        }

        // Log the first post to see its structure
        if (response.data.length > 0) {
          console.log('First post structure:', JSON.stringify(response.data[0], null, 2));
        }
        
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(err instanceof Error ? err.message : 'Failed to load posts');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(100,181,246,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Learn Bitcoin
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Discover insights, analysis, and the latest trends in Bitcoin markets and technology.
            </p>
            
            {/* Search Bar */}
            <div className="mt-10 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="w-full pl-10"
                />
              </div>
              <Button>Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : posts.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No articles found. Create some content in your Strapi admin panel.
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Card key={post.id} className="group relative overflow-hidden hover:shadow-lg">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.attributes.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {post.attributes.description}
                    </p>
                    <Button variant="ghost" className="group/button" asChild>
                      <Link to={`/learn/${post.attributes.slug}`}>
                        Read more{' '}
                        <span className="ml-2 transition-transform group-hover/button:translate-x-1">
                          →
                        </span>
                      </Link>
                    </Button>
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