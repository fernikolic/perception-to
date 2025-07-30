import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  TrendingUp, 
  Shield, 
  Users, 
  Globe, 
  Building, 
  Brain,
  Search,
  ArrowRight
} from 'lucide-react';

interface IntelligenceCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  articleCount: number;
  keyTopics: string[];
  slug: string;
}

interface IntelligenceNavProps {
  currentCategory?: string;
}

export function IntelligenceNav({ currentCategory }: IntelligenceNavProps) {
  const categories: IntelligenceCategory[] = [
    {
      id: 'opportunity-intelligence',
      name: 'Opportunity Intelligence',
      description: 'Identify opportunities 2-4 weeks before competitors discover them',
      icon: <Target className="h-5 w-5" />,
      color: 'from-purple-500 to-purple-700',
      articleCount: 1,
      keyTopics: ['Opportunity Identification', 'Market Windows', 'First-Mover Advantage', 'Signal Detection'],
      slug: 'opportunity-intelligence'
    },
    {
      id: 'competitive-intelligence',
      name: 'Competitive Intelligence',
      description: 'Systematic competitor analysis and strategic positioning',
      icon: <Search className="h-5 w-5" />,
      color: 'from-indigo-500 to-indigo-700',
      articleCount: 1,
      keyTopics: ['Competitor Analysis', 'Market Positioning', 'Strategic Moves', 'Early Warning'],
      slug: 'competitive-intelligence'
    },
    {
      id: 'market-timing',
      name: 'Market Timing',
      description: 'Perfect market entry timing and strategic execution',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'from-blue-500 to-blue-700',
      articleCount: 1,
      keyTopics: ['Market Entry', 'Timing Analysis', 'Launch Windows', 'Strategic Execution'],
      slug: 'market-timing'
    },
    {
      id: 'regulatory-intelligence',
      name: 'Regulatory Intelligence',
      description: 'Navigate regulatory landscapes and compliance opportunities',
      icon: <Shield className="h-5 w-5" />,
      color: 'from-red-500 to-red-700',
      articleCount: 1,
      keyTopics: ['Regulatory Monitoring', 'Compliance Strategy', 'Policy Analysis', 'Risk Management'],
      slug: 'regulatory-intelligence'
    },
    {
      id: 'partnership-intelligence',
      name: 'Partnership Intelligence',
      description: 'Strategic alliance opportunities and partnership optimization',
      icon: <Users className="h-5 w-5" />,
      color: 'from-teal-500 to-teal-700',
      articleCount: 1,
      keyTopics: ['Strategic Alliances', 'Partner Assessment', 'Collaboration Strategy', 'Network Effects'],
      slug: 'partnership-intelligence'
    },
    {
      id: 'geographic-intelligence',
      name: 'Geographic Intelligence',
      description: 'Regional market analysis and global expansion strategy',
      icon: <Globe className="h-5 w-5" />,
      color: 'from-cyan-500 to-cyan-700',
      articleCount: 1,
      keyTopics: ['Regional Analysis', 'Market Entry', 'Cross-Border Strategy', 'Local Partnerships'],
      slug: 'geographic-intelligence'
    },
    {
      id: 'sector-intelligence',
      name: 'Sector Intelligence',
      description: 'Industry vertical analysis and sector-specific strategies',
      icon: <Building className="h-5 w-5" />,
      color: 'from-pink-500 to-pink-700',
      articleCount: 1,
      keyTopics: ['Industry Analysis', 'Vertical Markets', 'Sector Trends', 'Customer Segments'],
      slug: 'sector-intelligence'
    },
    {
      id: 'strategic-frameworks',
      name: 'Strategic Frameworks',
      description: 'Decision-making frameworks and strategic analysis tools',
      icon: <Brain className="h-5 w-5" />,
      color: 'from-violet-500 to-violet-700',
      articleCount: 1,
      keyTopics: ['Decision Making', 'Strategic Analysis', 'Risk Assessment', 'Option Valuation'],
      slug: 'strategic-frameworks'
    }
  ];

  return (
    <section className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Intelligence Disciplines</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Master the eight core intelligence disciplines that give emerging finance leaders competitive advantage
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => {
          const isActive = currentCategory === category.id;
          
          return (
            <Card 
              key={category.id}
              className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${
                isActive ? 'ring-2 ring-primary/50 bg-primary/5' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} text-white`}>
                    {category.icon}
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs">
                      {category.articleCount} article{category.articleCount !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    <Link 
                      to={`/learn/category/${category.slug}`}
                      className="after:absolute after:inset-0"
                    >
                      {category.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Key Topics
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {category.keyTopics.slice(0, 2).map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs py-0">
                        {topic}
                      </Badge>
                    ))}
                    {category.keyTopics.length > 2 && (
                      <Badge variant="outline" className="text-xs py-0">
                        +{category.keyTopics.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Explore discipline</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          New to intelligence? Start with{' '}
          <Link 
            to="/learn/identify-emerging-finance-opportunities-before-competitors" 
            className="text-primary hover:underline font-medium"
          >
            Opportunity Intelligence fundamentals
          </Link>
          {' '}or explore our{' '}
          <Link 
            to="/learn#learning-paths" 
            className="text-primary hover:underline font-medium"
          >
            structured learning paths
          </Link>
        </p>
      </div>
    </section>
  );
}

export default IntelligenceNav;