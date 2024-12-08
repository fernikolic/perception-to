import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Link as LinkIcon } from 'lucide-react';

interface PressRelease {
  date: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
}

const pressReleases: PressRelease[] = [
  {
    date: 'March 15, 2024',
    title: 'Perception Launches Advanced Bitcoin Market Intelligence Platform',
    description: 'New platform provides real-time sentiment analysis and market trends for Bitcoin investors and researchers.',
    link: '#',
    tags: ['Product Launch', 'Bitcoin'],
  },
  {
    date: 'February 28, 2024',
    title: 'Perception Raises Series A Funding to Expand Crypto Analytics Platform',
    description: 'Investment will accelerate development of advanced market intelligence tools and expand global reach.',
    link: '#',
    tags: ['Funding', 'Growth'],
  },
  {
    date: 'January 10, 2024',
    title: 'Perception Partners with Leading Crypto Research Firms',
    description: 'Strategic partnerships enhance data coverage and analysis capabilities for institutional clients.',
    link: '#',
    tags: ['Partnership', 'Research'],
  },
];

const mediaKit = [
  {
    title: 'Company Overview',
    description: 'Learn about our mission, team, and impact in the crypto space.',
    link: '#',
  },
  {
    title: 'Brand Assets',
    description: 'Download our logo, screenshots, and other brand materials.',
    link: '#',
  },
  {
    title: 'Media Contact',
    description: 'Get in touch with our communications team.',
    link: 'mailto:press@perception.to',
  },
];

export function PressPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(100,181,246,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Press Center
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Get the latest news and updates about Perception's mission to make crypto market intelligence accessible to everyone.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg">Contact Press Team</Button>
              <Button variant="outline" size="lg" className="group">
                Download Media Kit{' '}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Latest News</h2>
          <div className="mt-8 space-y-8">
            {pressReleases.map((release) => (
              <Card key={release.title} className="overflow-hidden transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {release.date}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold">{release.title}</h3>
                  <p className="mt-2 text-muted-foreground">{release.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-2">
                      {release.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="ghost" className="group" asChild>
                      <a href={release.link} className="inline-flex items-center gap-2">
                        Read More
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="border-t py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Media Resources</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {mediaKit.map((item) => (
              <Card key={item.title} className="group relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                    <LinkIcon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                  <Button 
                    variant="ghost" 
                    className="mt-4 group/button" 
                    asChild
                  >
                    <a href={item.link} className="inline-flex items-center gap-2">
                      Access
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}