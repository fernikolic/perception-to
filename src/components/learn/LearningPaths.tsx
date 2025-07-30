import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Target, Users, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  articles: {
    title: string;
    slug: string;
    category: string;
    readTime: number;
    completed?: boolean;
  }[];
  color: string;
}

interface LearningPathsProps {
  currentArticleSlug?: string;
}

export function LearningPaths({ currentArticleSlug }: LearningPathsProps) {
  const learningPaths: LearningPath[] = [
    {
      id: 'intelligence-fundamentals',
      title: 'Intelligence Fundamentals',
      description: 'Master the core concepts of strategic intelligence for emerging finance leaders',
      icon: <BookOpen className="h-5 w-5" />,
      difficulty: 'beginner',
      estimatedTime: '2-3 hours',
      color: 'from-blue-500 to-blue-700',
      articles: [
        {
          title: 'How to Identify Emerging Finance Opportunities Before Competitors',
          slug: 'identify-emerging-finance-opportunities-before-competitors',
          category: 'opportunity-intelligence',
          readTime: 12
        },
        {
          title: 'Strategic Decision-Making Frameworks for Emerging Finance Leaders',
          slug: 'strategic-decision-making-frameworks-emerging-finance-leaders',
          category: 'strategic-frameworks',
          readTime: 16
        },
        {
          title: 'Building a Regulatory Intelligence System for Emerging Finance',
          slug: 'regulatory-intelligence-system-emerging-finance',
          category: 'regulatory-intelligence',
          readTime: 13
        }
      ]
    },
    {
      id: 'competitive-advantage',
      title: 'Competitive Advantage Mastery',
      description: 'Build systematic competitive intelligence and market timing capabilities',
      icon: <Target className="h-5 w-5" />,
      difficulty: 'intermediate',
      estimatedTime: '3-4 hours',
      color: 'from-purple-500 to-purple-700',
      articles: [
        {
          title: 'The Complete Guide to Competitive Intelligence in Emerging Finance',
          slug: 'competitive-intelligence-emerging-finance-complete-guide',
          category: 'competitive-intelligence',
          readTime: 15
        },
        {
          title: 'Strategic Market Timing for Emerging Finance Opportunities',
          slug: 'strategic-market-timing-emerging-finance-opportunities',
          category: 'market-timing',
          readTime: 14
        },
        {
          title: 'Partnership Intelligence: Strategic Alliance Opportunities',
          slug: 'partnership-intelligence-strategic-alliance-opportunities',
          category: 'partnership-intelligence',
          readTime: 11
        }
      ]
    },
    {
      id: 'global-expansion',
      title: 'Global Expansion Strategy',
      description: 'Navigate international markets with geographic and sector intelligence',
      icon: <Users className="h-5 w-5" />,
      difficulty: 'advanced',
      estimatedTime: '2-3 hours',
      color: 'from-emerald-500 to-emerald-700',
      articles: [
        {
          title: 'Geographic Intelligence: Regional Opportunities in Emerging Finance',
          slug: 'geographic-intelligence-regional-opportunities-emerging-finance',
          category: 'geographic-intelligence',
          readTime: 10
        },
        {
          title: 'Sector Intelligence: Industry Vertical Analysis for Emerging Finance',
          slug: 'sector-intelligence-industry-vertical-analysis-emerging-finance',
          category: 'sector-intelligence',
          readTime: 12
        }
      ]
    }
  ];

  // Check if current article is part of any path
  const currentPath = learningPaths.find(path => 
    path.articles.some(article => article.slug === currentArticleSlug)
  );

  const getCurrentArticleIndex = (path: LearningPath) => {
    return path.articles.findIndex(article => article.slug === currentArticleSlug);
  };

  const getNextArticleInPath = (path: LearningPath) => {
    const currentIndex = getCurrentArticleIndex(path);
    if (currentIndex !== -1 && currentIndex < path.articles.length - 1) {
      return path.articles[currentIndex + 1];
    }
    return null;
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Strategic Learning Paths</h2>
      </div>
      
      {currentPath && (
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">You're following:</span>
          </div>
          <h3 className="font-semibold mb-1">{currentPath.title}</h3>
          <p className="text-sm text-muted-foreground mb-3">{currentPath.description}</p>
          
          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${currentPath.color}`}
                style={{ 
                  width: `${((getCurrentArticleIndex(currentPath) + 1) / currentPath.articles.length) * 100}%` 
                }}
              />
            </div>
            <span className="text-xs text-muted-foreground">
              {getCurrentArticleIndex(currentPath) + 1} of {currentPath.articles.length}
            </span>
          </div>
          
          {/* Next article suggestion */}
          {(() => {
            const nextArticle = getNextArticleInPath(currentPath);
            return nextArticle ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Continue with:</p>
                  <p className="text-sm text-muted-foreground">{nextArticle.title}</p>
                </div>
                <Button size="sm" asChild>
                  <Link to={`/learn/${nextArticle.slug}`}>
                    Next <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-600">🎉 Path completed!</p>
                  <p className="text-sm text-muted-foreground">Explore other learning paths below</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {learningPaths.map((path) => {
          const isCurrentPath = path.id === currentPath?.id;
          
          return (
            <Card 
              key={path.id} 
              className={`group hover:shadow-lg transition-all duration-300 ${
                isCurrentPath ? 'ring-2 ring-primary/20 bg-primary/5' : ''
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${path.color} text-white`}>
                    {path.icon}
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs mb-1">
                      {path.difficulty}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{path.estimatedTime}</p>
                  </div>
                </div>
                <CardTitle className="text-lg">{path.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{path.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-4">
                  {path.articles.map((article, index) => {
                    const isCurrentArticle = article.slug === currentArticleSlug;
                    const isCompleted = isCurrentPath && index <= getCurrentArticleIndex(currentPath);
                    
                    return (
                      <div 
                        key={article.slug}
                        className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                          isCurrentArticle ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
                          isCompleted 
                            ? 'bg-primary border-primary text-white' 
                            : 'border-muted-foreground/30'
                        }`}>
                          {isCompleted ? <CheckCircle className="h-3 w-3" /> : index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link 
                            to={`/learn/${article.slug}`}
                            className={`block text-sm font-medium hover:text-primary transition-colors ${
                              isCurrentArticle ? 'text-primary' : ''
                            }`}
                          >
                            {article.title}
                          </Link>
                          <p className="text-xs text-muted-foreground">
                            {article.readTime}m read
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {!isCurrentPath && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                    asChild
                  >
                    <Link to={`/learn/${path.articles[0].slug}`}>
                      Start Path <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default LearningPaths;