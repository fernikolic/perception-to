import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface Milestone {
  title: string;
  description: string;
  status: 'idea' | 'in-progress' | 'completed';
  features: string[];
}

const milestones: Milestone[] = [
  {
    title: 'Light Mode',
    description: 'Added light theme support for better daytime visibility and user preference.',
    status: 'completed',
    features: [
      'Light color scheme',
      'Theme toggle',
      'System preference detection',
      'Persistent theme selection',
    ],
  },
  {
    title: 'Trends Bookmarking',
    description: 'Save and organize important trends for later reference.',
    status: 'completed',
    features: [
      'Bookmark favorite trends',
      'Organize bookmarks into collections',
      'Quick access to saved items',
      'Sync across devices',
    ],
  },
  {
    title: 'Mobile Responsiveness',
    description: 'Optimizing the platform for seamless mobile experience.',
    status: 'completed',
    features: [
      'Responsive layouts',
      'Touch-friendly controls',
      'Mobile-optimized charts',
      'Progressive web app features',
    ],
  },
  {
    title: 'Performance Optimization',
    description: 'Improving chart rendering speed and overall application performance.',
    status: 'in-progress',
    features: [
      'Chart rendering optimization',
      'Data loading improvements',
      'Caching enhancements',
      'Reduced load times',
    ],
  },
  {
    title: 'Research Hub',
    description: 'Dedicated section for high-impact, low-frequency market events.',
    status: 'in-progress',
    features: [
      'Critical event detection',
      'Deep-dive analysis reports',
      'Custom research filters',
      'Important event notifications',
    ],
  },
  {
    title: 'Technical Analysis Integration',
    description: 'Adding advanced technical indicators to complement sentiment analysis.',
    status: 'idea',
    features: [
      'RSI (Relative Strength Index)',
      'Moving averages',
      'Volume analysis',
      'Custom indicator settings',
    ],
  },
  {
    title: 'On-Chain Analytics Enhancement',
    description: 'Expanding our on-chain data analysis capabilities.',
    status: 'idea',
    features: [
      'Whale wallet tracking',
      'Network health metrics',
      'Smart contract interactions',
      'Cross-chain analytics',
    ],
  },
  {
    title: 'Multi-Channel Price Predictions',
    description: 'Comprehensive price forecasting across different data sources.',
    status: 'idea',
    features: [
      'Social sentiment prediction',
      'Technical analysis forecasts',
      'On-chain metrics prediction',
      'Combined prediction models',
    ],
  },
];

export function RoadmapPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(100,181,246,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Product Roadmap
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Explore our vision for the future. See what we're building and what's coming next
              to help you make better decisions in emerging finance.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <a href="https://app.perception.to/auth/sign-up">
                  Start Finding Opportunities
                </a>
              </Button>
              <Button variant="outline" size="lg" className="group">
                View Features{' '}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Gantt Chart Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            {/* Ideas Column */}
            <div className="space-y-4">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-center">Ideas</h2>
                <div className="mt-1 h-1 bg-muted rounded-full" />
              </div>
              {milestones.filter(m => m.status === 'idea').map((milestone) => (
                <Card key={milestone.title} className="group hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">{milestone.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{milestone.description}</p>
                    <div className="mt-4 pt-4 border-t">
                      <ul className="space-y-2">
                        {milestone.features.map((feature) => (
                          <li key={feature} className="text-sm flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-muted" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* In Progress Column */}
            <div className="space-y-4">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-center">In Progress</h2>
                <div className="mt-1 h-1 bg-primary rounded-full" />
              </div>
              {milestones.filter(m => m.status === 'in-progress').map((milestone) => (
                <Card key={milestone.title} className="group hover:shadow-lg transition-all border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">{milestone.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{milestone.description}</p>
                    <div className="mt-4 pt-4 border-t">
                      <ul className="space-y-2">
                        {milestone.features.map((feature) => (
                          <li key={feature} className="text-sm flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Completed Column */}
            <div className="space-y-4">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-center">Completed</h2>
                <div className="mt-1 h-1 bg-green-500 rounded-full" />
              </div>
              {milestones.filter(m => m.status === 'completed').map((milestone) => (
                <Card key={milestone.title} className="group hover:shadow-lg transition-all border-green-500/20">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold">{milestone.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{milestone.description}</p>
                    <div className="mt-4 pt-4 border-t">
                      <ul className="space-y-2">
                        {milestone.features.map((feature) => (
                          <li key={feature} className="text-sm flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">Shape Our Future</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Have suggestions for our roadmap? We'd love to hear from you.
              Your feedback helps us build better features.
            </p>
            <div className="mt-8">
              <Button size="lg">Submit Feedback</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RoadmapPage;