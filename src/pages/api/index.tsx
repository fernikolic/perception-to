import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Zap, Shield, Webhook, Database, Terminal } from 'lucide-react';

const endpoints = [
  {
    category: 'Market Data',
    items: [
      { method: 'GET', path: '/v1/prices', description: 'Get real-time cryptocurrency prices' },
      { method: 'GET', path: '/v1/markets', description: 'Get market statistics and trading volume' },
      { method: 'GET', path: '/v1/pairs', description: 'Get trading pair information' },
    ],
  },
  {
    category: 'Sentiment',
    items: [
      { method: 'GET', path: '/v1/sentiment', description: 'Get market sentiment indicators' },
      { method: 'GET', path: '/v1/trends', description: 'Get trending topics and keywords' },
      { method: 'GET', path: '/v1/social', description: 'Get social media metrics' },
    ],
  },
];

const features = [
  {
    title: 'Fast & Reliable',
    description: 'Sub-100ms response times with 99.9% uptime SLA.',
    icon: Zap,
  },
  {
    title: 'Secure by Default',
    description: 'Enterprise-grade security with API key authentication.',
    icon: Shield,
  },
  {
    title: 'Webhooks',
    description: 'Real-time updates for price and sentiment changes.',
    icon: Webhook,
  },
  {
    title: 'Comprehensive Data',
    description: 'Access to historical and real-time market data.',
    icon: Database,
  },
];

const codeExamples = {
  curl: `curl -X GET "https://api.perception.dev/v1/prices" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  python: `import requests

api_key = "YOUR_API_KEY"
headers = {"Authorization": f"Bearer {api_key}"}

response = requests.get(
    "https://api.perception.dev/v1/prices",
    headers=headers
)

print(response.json())`,
  javascript: `const response = await fetch('https://api.perception.dev/v1/prices', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

const data = await response.json();
console.log(data);`,
};

export function ApiPage() {
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
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-black">
                  API Reference
                </h1>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg xl:text-xl leading-6 sm:leading-7 lg:leading-8 text-black/70 font-light">
                  Integrate real-time crypto market data and sentiment analysis into your applications with our powerful REST API.
                </p>
                
                {/* Search Bar */}
                <div className="mt-8 sm:mt-10 flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/60" />
                    <Input
                      type="search"
                      placeholder="Search API documentation..."
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

      {/* Features Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="group relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="border-t py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold">Quick Start</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get started with our API in minutes. Here's a simple example to fetch cryptocurrency prices:
            </p>
            
            <Card className="mt-8">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Terminal className="h-5 w-5" />
                  <CardTitle>Example Request</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="curl">
                  <TabsList>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  </TabsList>
                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang}>
                      <pre className="overflow-x-auto rounded-lg bg-muted p-4">
                        <code>{code}</code>
                      </pre>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="border-t py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold">API Endpoints</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our comprehensive API endpoints for market data and sentiment analysis.
            </p>
            
            <div className="mt-8 space-y-8">
              {endpoints.map((category) => (
                <div key={category.category}>
                  <h3 className="mb-4 text-xl font-semibold">{category.category}</h3>
                  <div className="space-y-4">
                    {category.items.map((endpoint) => (
                      <Card key={endpoint.path}>
                        <CardContent className="flex items-start gap-4 p-4">
                          <code className="rounded bg-primary/10 px-2 py-1 text-sm text-primary">
                            {endpoint.method}
                          </code>
                          <div>
                            <code className="text-sm">{endpoint.path}</code>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {endpoint.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
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
            <h2 className="text-3xl font-extralight">Ready to Get Started?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Sign up for a free API key and start building with our powerful API.
            </p>
            <div className="mt-8">
              <Button size="lg">Get Your API Key</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}