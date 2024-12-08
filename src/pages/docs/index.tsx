import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Book, Code, FileText, ArrowRight, Zap, Shield, LineChart } from 'lucide-react';

const guides = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of using our platform',
    icon: Book,
    href: '/docs/getting-started',
  },
  {
    title: 'API Reference',
    description: 'Complete API documentation for developers',
    icon: Code,
    href: '/docs/api',
  },
  {
    title: 'User Guides',
    description: 'Detailed guides for platform features',
    icon: FileText,
    href: '/docs/guides',
  },
];

const popularTopics = [
  {
    title: 'Quick Start Guide',
    description: 'Get up and running in under 5 minutes',
    icon: Zap,
  },
  {
    title: 'Authentication',
    description: 'Learn about our security features',
    icon: Shield,
  },
  {
    title: 'Data Analysis',
    description: 'Working with market data and charts',
    icon: LineChart,
  },
];

export function DocsPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(100,181,246,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Documentation
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Everything you need to get started with our platform. From basic concepts to advanced features.
            </p>
            
            {/* Search Bar */}
            <div className="mt-10 flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search documentation..."
                  className="w-full pl-10"
                />
              </div>
              <Button>Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Documentation Sections */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Card key={guide.title} className="group relative overflow-hidden hover:shadow-lg">
                <CardHeader>
                  <guide.icon className="h-8 w-8 text-primary" />
                  <CardTitle className="mt-4">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{guide.description}</p>
                  <Button 
                    variant="ghost" 
                    className="mt-4 group/button"
                  >
                    Learn more{' '}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="border-t py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Popular Topics</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {popularTopics.map((topic) => (
              <Card key={topic.title} className="group cursor-pointer hover:shadow-lg">
                <CardContent className="flex items-start gap-4 p-6">
                  <topic.icon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold">{topic.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {topic.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help & Support */}
      <section className="border-t py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold">Need Help?</h2>
            <p className="mt-4 text-muted-foreground">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <Button className="mt-6">Contact Support</Button>
          </div>
        </div>
      </section>
    </div>
  );
}