import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const communities = [
  {
    name: 'Bitcoin Companies',
    image: 'https://storage.googleapis.com/btcp_bucket/marketing/researchers.png',
    description: 'Track market sentiment, monitor competitors, and stay ahead of industry trends with real-time intelligence.',
    buttonText: 'Join Early Adopter Program',
    href: 'https://app.perception.to/auth/sign-up',
  },
  {
    name: 'Journalists & Creators',
    image: 'https://storage.googleapis.com/btcp_bucket/marketing/journalists.png',
    description: 'Instantly spot emerging trends and find what matters most across the Bitcoin ecosystem. Spend less time searching and more time creating.',
    buttonText: 'Join Early Adopter Program',
    href: 'https://app.perception.to/auth/sign-up',
  },
  {
    name: 'Investors & VCs',
    image: 'https://storage.googleapis.com/btcp_bucket/marketing/investors.png',
    description: 'Spot trends before they go mainstream. Get real-time signals, early insights, and sentiment analysis to make smarter decisions.',
    buttonText: 'Join Early Adopter Program',
    href: 'https://app.perception.to/auth/sign-up',
  },
];

export function Community() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.05),transparent)]" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="text-sm font-medium">Use Cases</span>
          </div>
          
          <h2 className="mt-4 text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Your all-in-one Bitcoin intelligence platform
          </h2>
          
          <p className="mt-4 text-center text-xl text-muted-foreground">
            <span className="text-foreground">No more</span>{' '}
            <span className="text-foreground">switching</span> between{' '}
            <span className="text-foreground">tools or wasting time</span>. From trend discovery to price analysis, everything you need is here.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => (
            <Card
              key={community.name}
              className="group relative overflow-hidden border-white/5 bg-black/20 transition-all duration-300 hover:border-white/10 hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <div className="relative h-[200px] w-full overflow-hidden">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold">{community.name}</h3>
                  <p className="mt-2 text-muted-foreground">{community.description}</p>
                  <Button
                    className="mt-6 rounded-full bg-white/10 px-8 hover:bg-white/20"
                    asChild
                  >
                    <a 
                      href={community.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      {community.buttonText}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}