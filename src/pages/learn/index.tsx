import { useEffect, useState } from 'react';
import { fetchLearnArticles, LearnArticle } from '@/lib/payloadClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Clock, BookOpen, ChevronRight, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function LearnPage() {
  const [posts, setPosts] = useState<LearnArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const featuredPost = posts.find(post => post.featured) || (posts.length > 0 ? posts[0] : null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const response = await fetchLearnArticles({
          search: searchTerm || undefined,
          category: selectedCategory || undefined,
          limit: 50
        });
        setPosts(response.docs);
      } catch (err) {
        console.error('Error loading articles:', err);
        setError('Failed to load articles');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [searchTerm, selectedCategory]);

  // Get unique categories
  const categories = Array.from(new Set(posts.map(post => post.category))).filter(Boolean);

  // Filter posts based on search term and category
  const filteredPosts = posts.filter(post => 
    (searchTerm === '' || 
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(post.tags) && post.tags.some(tag => 
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    ) && 
    (selectedCategory === null || post.category === selectedCategory)
  );

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/30 via-background to-background pt-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 pt-16 pb-24 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-4 px-4 py-1.5 text-sm font-medium">Bitcoin Knowledge</Badge>
            <h1 className="text-display font-h1 tracking-tight text-foreground">
              <span className="relative inline-block">
                <span className="absolute inset-x-0 bottom-0 h-3 bg-primary/20"></span>
                <span className="relative">Sharpen Your Narrative Edge</span>
              </span>
            </h1>
            <p className="mt-6 text-xl leading-8 text-muted-foreground">
              Curated guides, data primers, and playbooks that decode Bitcoin's discourse—so you out-think the market, not chase it.
            </p>
            
            <div className="mt-10 flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-primary/50 to-secondary/50 opacity-75 blur"></div>
                <div className="relative flex items-center rounded-lg bg-background">
                  <Search className="ml-4 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search articles, topics, or keywords..."
                    className="border-0 pl-3 shadow-none focus-visible:ring-0"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                  <Button size="sm" className="mr-1">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="border-b border-border/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="scrollbar-hide -mx-6 flex space-x-2 overflow-x-auto px-6 py-4">
            <Button 
              variant={selectedCategory === null ? "secondary" : "ghost"} 
              size="sm"
              onClick={() => setSelectedCategory(null)}
              className="whitespace-nowrap"
            >
              All Topics
            </Button>
            
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(category || null)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Article (if available) */}
      {!loading && !error && featuredPost && (
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden rounded-2xl bg-card shadow-lg"
            >
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="relative overflow-hidden">
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30">
                    <BookOpen className="h-16 w-16 text-primary" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-12">
                  <Badge className="mb-3 w-fit">{featuredPost.category || 'Featured'}</Badge>
                  <h2 className="mb-4 text-3xl font-h2 tracking-tight">{featuredPost.title || 'Untitled'}</h2>
                  <p className="mb-6 text-lg text-muted-foreground">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mb-8 flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <time>{featuredPost.publishedAt && new Date(featuredPost.publishedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</time>
                  </div>
                  <Link to={`/learn/${featuredPost.slug}`}>
                    <Button className="group w-fit">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-h2 tracking-tight">
              {selectedCategory ? `${selectedCategory} Articles` : 'Latest Articles'}
            </h2>
            {selectedCategory && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedCategory(null)}>
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>

          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="rounded-lg bg-destructive/10 p-6 text-center text-destructive">
              <p>{error}</p>
              <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="rounded-lg bg-muted p-8 text-center">
              <BookOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 text-xl font-h3">No articles found</h3>
              <p className="mb-6 text-muted-foreground">
                No articles match your current search or filter criteria.
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedCategory(null);
              }}>
                Clear filters
              </Button>
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredPosts.map((post, index) => post && (
                <motion.div key={post.id || index} variants={itemVariants}>
                  <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                    <div className="relative h-56 overflow-hidden bg-muted">
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                        <BookOpen className="h-12 w-12 text-muted-foreground" />
                      </div>
                      {post.category && (
                        <Badge className="absolute right-3 top-3 bg-background/80 backdrop-blur-sm">
                          {post.category}
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <time>{post.publishedAt && new Date(post.publishedAt).toLocaleDateString()}</time>
                      </div>
                      <CardTitle className="line-clamp-2 mt-2 transition-colors group-hover:text-primary">
                        {post.title || 'Untitled'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col">
                      <p className="line-clamp-3 flex-1 text-muted-foreground">
                        {post.excerpt}
                      </p>
                      
                      {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((tag: string, i: number) => (
                            <Badge key={i} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                      
                      <div className="mt-6 pt-4 border-t border-border/50">
                        <Link to={`/learn/${post.slug}`} className="inline-block w-full">
                          <Button variant="ghost" size="sm" className="w-full justify-between">
                            Read article
                            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Newsletter section */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-primary p-8 lg:p-12">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-soft-light"></div>
            <div className="absolute bottom-0 left-1/2 h-1/2 w-1/2 -translate-x-1/2 bg-white/10 blur-3xl"></div>
            
            <div className="relative mx-auto max-w-2xl text-center">
              <TrendingUp className="mx-auto mb-4 h-10 w-10 text-primary-foreground/80" />
              <h2 className="mb-4 text-3xl font-h2 tracking-tight text-primary-foreground">
                Stay updated with Bitcoin insights
              </h2>
              <p className="mb-8 text-lg text-primary-foreground/80">
                Join our newsletter to receive the latest articles and updates directly in your inbox.
              </p>
              
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 border-primary-foreground/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button size="lg" variant="secondary">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LearnPage; 