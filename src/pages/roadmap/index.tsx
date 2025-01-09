import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, Circle } from 'lucide-react';

interface Milestone {
  quarter: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  features: string[];
}

const milestones: Milestone[] = [
  {
    quarter: 'Q1 2024',
    title: 'Enhanced Analytics',
    description: 'Expanding our analytics capabilities with new metrics and visualizations.',
    status: 'completed',
    features: [
      'Advanced sentiment analysis',
      'Custom chart indicators',
      'Real-time alerts system',
      'Portfolio tracking',
    ],
  },
  {
    quarter: 'Q2 2024',
    title: 'API Expansion',
    description: 'Major updates to our API infrastructure and capabilities.',
    status: 'in-progress',
    features: [
      'WebSocket support',
      'Enhanced historical data',
      'New API endpoints',
      'Improved documentation',
    ],
  },
  {
    quarter: 'Q3 2024',
    title: 'Machine Learning Integration',
    description: 'Introducing AI-powered features and predictions.',
    status: 'upcoming',
    features: [
      'Price prediction models',
      'Anomaly detection',
      'Pattern recognition',
      'Automated insights',
    ],
  },
  {
    quarter: 'Q4 2024',
    title: 'Enterprise Features',
    description: 'New features designed for institutional clients.',
    status: 'upcoming',
    features: [
      'Advanced access controls',
      'Custom reporting',
      'Dedicated infrastructure',
      'Premium support',
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
              to help you make better decisions in the crypto market.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button 
                size="lg"
                asChild
              >
                <a href="https://app.perception.to/auth/sign-up">
                  Join Early Adopter Program
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

      {/* Timeline Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border sm:left-1/2" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.quarter} className="relative">
                  <div className={`flex flex-col items-start gap-6 sm:flex-row ${
                    index % 2 === 0 ? 'sm:flex-row-reverse' : ''
                  }`}>
                    {/* Timeline Node */}
                    <div className="absolute left-8 -translate-x-1/2 sm:left-1/2">
                      {milestone.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                      ) : milestone.status === 'in-progress' ? (
                        <Circle className="h-4 w-4 text-primary animate-pulse" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>

                    {/* Content Card */}
                    <div className="w-full pl-12 sm:w-1/2 sm:pl-0 sm:pr-8">
                      <Card className="overflow-hidden">
                        <CardContent className="p-6">
                          <div className="mb-4 flex items-center justify-between">
                            <Badge variant={
                              milestone.status === 'completed' ? 'default' :
                              milestone.status === 'in-progress' ? 'secondary' :
                              'outline'
                            }>
                              {milestone.quarter}
                            </Badge>
                            <Badge variant={
                              milestone.status === 'completed' ? 'default' :
                              milestone.status === 'in-progress' ? 'secondary' :
                              'outline'
                            }>
                              {milestone.status}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-semibold">{milestone.title}</h3>
                          <p className="mt-2 text-muted-foreground">{milestone.description}</p>
                          <ul className="mt-4 space-y-2">
                            {milestone.features.map((feature) => (
                              <li key={feature} className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
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