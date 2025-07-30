import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchLearnArticles, LearnArticle, getCategoryColor, formatCategoryName } from '@/lib/payloadClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowRight, TrendingUp } from 'lucide-react';

interface RelatedArticlesProps {
  currentArticle: LearnArticle;
  maxResults?: number;
}

export function RelatedArticles({ currentArticle, maxResults = 6 }: RelatedArticlesProps) {
  const [relatedArticles, setRelatedArticles] = useState<LearnArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        setLoading(true);
        
        // Strategy 1: Use explicitly related articles if available
        if (currentArticle.relatedArticles && currentArticle.relatedArticles.length > 0) {
          setRelatedArticles(currentArticle.relatedArticles.slice(0, maxResults));
          return;
        }
        
        // Strategy 2: Find articles by category and tags
        const response = await fetchLearnArticles({ 
          limit: 50 // Get more to filter from
        });
        
        const candidates = response.docs.filter(article => 
          article.id !== currentArticle.id && article.published
        );
        
        // Scoring algorithm for relevance
        const scoredArticles = candidates.map(article => {
          let score = 0;
          
          // Same category gets high score
          if (article.category === currentArticle.category) {
            score += 10;
          }
          
          // Strategic intelligence categories get cross-linking bonus
          const intelligenceCategories = [
            'opportunity-intelligence',
            'competitive-intelligence', 
            'market-timing',
            'regulatory-intelligence',
            'partnership-intelligence',
            'geographic-intelligence',
            'sector-intelligence',
            'strategic-frameworks'
          ];
          
          if (intelligenceCategories.includes(currentArticle.category || '') && 
              intelligenceCategories.includes(article.category || '')) {
            score += 7;
          }
          
          // Shared tags increase score
          if (currentArticle.tags && article.tags) {
            const sharedTags = currentArticle.tags.filter(tag => 
              article.tags?.includes(tag)
            );
            score += sharedTags.length * 3;
          }
          
          // Strategic value match
          if (article.strategicValue === currentArticle.strategicValue) {
            score += 2;
          }
          
          // Difficulty progression (same or one level up/down)
          const difficultyOrder = ['beginner', 'intermediate', 'advanced'];
          const currentIndex = difficultyOrder.indexOf(currentArticle.difficulty || 'intermediate');
          const articleIndex = difficultyOrder.indexOf(article.difficulty || 'intermediate');
          
          if (Math.abs(currentIndex - articleIndex) <= 1) {
            score += 1;
          }
          
          return { article, score };
        });
        
        // Sort by score and take top results
        const topArticles = scoredArticles
          .sort((a, b) => b.score - a.score)
          .slice(0, maxResults)
          .map(item => item.article);
        
        setRelatedArticles(topArticles);
        
      } catch (error) {
        console.error('Error fetching related articles:', error);
        setRelatedArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedArticles();
  }, [currentArticle, maxResults]);

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Continue Your Intelligence Journey</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedArticles.map((article) => (
          <Card key={article.id} className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                {article.category && (
                  <Badge 
                    variant="secondary" 
                    className={getCategoryColor(article.category)}
                  >
                    {formatCategoryName(article.category)}
                  </Badge>
                )}
                {article.readTime && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime}m
                  </div>
                )}
              </div>
              <CardTitle className="text-lg leading-snug group-hover:text-primary transition-colors">
                <Link to={`/learn/${article.slug}`} className="after:absolute after:inset-0">
                  {article.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between">
                {article.difficulty && (
                  <Badge variant="outline" className="text-xs">
                    {article.difficulty}
                  </Badge>
                )}
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default RelatedArticles;