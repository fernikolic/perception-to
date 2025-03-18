import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const communities = [
  {
    name: 'Bitcoin Companies',
    image: 'https://storage.googleapis.com/btcp_bucket/marketing/researchers.png',
    description: 'Get real-time market intelligence that gives you a competitive edge. Track sentiment shifts, monitor competitors, and spot opportunities early.',
    buttonText: 'Join the Beta',
    href: 'https://app.perception.to/auth/sign-up',
  },
  {
    name: 'Journalists & Creators',
    image: 'https://storage.googleapis.com/btcp_bucket/marketing/journalists.png',
    description: 'Find the stories that matter. Our platform surfaces the most impactful trends and narratives across the Bitcoin ecosystem.',
    buttonText: 'Join the Beta',
    href: 'https://app.perception.to/auth/sign-up',
  },
  {
    name: 'Investors & VCs',
    image: 'https://storage.googleapis.com/btcp_bucket/marketing/investors.png',
    description: 'Get early signals, sentiment analysis, and trend insights to help you spot opportunities and avoid costly mistakes.',
    buttonText: 'Join the Beta',
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
            Your Bitcoin market intelligence command center
          </h2>
          
          <p className="mt-4 text-center text-xl text-muted-foreground">
            <span className="text-foreground">One platform</span> for{' '}
            <span className="text-foreground">all your Bitcoin insights</span>. Track trends, analyze sentiment, and stay informed with real-time data.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => (
            <Card
              key={community.name}
              className="group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:bg-card/60"
            >
              <CardContent className="p-0">
                <div className="relative h-[200px] w-full overflow-hidden">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-6 text-center bg-card/50">
                  <h3 className="text-xl font-semibold text-foreground">{community.name}</h3>
                  <p className="mt-2 text-muted-foreground">{community.description}</p>
                  <Button
                    className="mt-6 rounded-lg px-8 bg-blue-950 hover:bg-blue-900 text-white dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
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