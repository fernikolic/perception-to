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
      {/* Hero Section (image card with overlay) */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src="/images/hero_image.avif"
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-black">
                  Documentation
                </h1>
                <p className="mt-4 sm:mt-6 text-base sm:text-xl lg:text-2xl xl:text-3xl leading-6 sm:leading-7 lg:leading-8 text-black/70 font-light">
                  Everything you need to get started with our platform. From basic concepts to advanced features.
                </p>
                
                {/* Search Bar */}
                <div className="mt-8 sm:mt-10 flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/60" />
                    <Input
                      type="search"
                      placeholder="Search documentation..."
                      className="w-full pl-10 border-black/30"
                    />
                  </div>
                  <Button className="bg-black text-white hover:bg-black/90">Search</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Documentation Sections */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
          <h2 className="text-xl sm:text-2xl font-bold">Popular Topics</h2>
          <div className="mt-8 grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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