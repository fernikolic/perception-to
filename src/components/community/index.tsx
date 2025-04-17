import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const communities = [
  {
    name: 'Institutional Investors',
    image: 'https://storage.googleapis.com/btcp_bucket/marketing/investors.png',
    description: 'Correlate sentiment with flows, allocation, and risk',
    buttonText: 'Join the Beta',
    href: 'https://app.perception.to/auth/sign-up',
  },
  {
    name: 'Analysts & Researchers',
    image: 'https://storage.googleapis.com/btcp_bucket/marketing/researchers.png',
    description: 'Replace scattered tracking with a single intelligence layer',
    buttonText: 'Join the Beta',
    href: 'https://app.perception.to/auth/sign-up',
  },
  {
    name: 'Fintech Founders',
    image: '/images/fintech-founders.png',
    description: 'Understand narrative shifts shaping adoption',
    buttonText: 'Join the Beta',
    href: 'https://app.perception.to/auth/sign-up',
  },
  {
    name: 'VCs & Allocators',
    image: '/images/vc-allocators.png',
    description: 'Identify emerging themes before they hit traction',
    buttonText: 'Join the Beta',
    href: 'https://app.perception.to/auth/sign-up',
  },
  {
    name: 'Policy Experts',
    image: '/images/policy-experts.png',
    description: 'Monitor public discourse and regulatory momentum',
    buttonText: 'Join the Beta',
    href: 'https://app.perception.to/auth/sign-up',
  },
];

export function Community() {
  return (
    <section className="relative overflow-hidden bg-black py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.1),transparent)]" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1">
            <span className="text-sm font-medium text-white">Use Cases</span>
          </div>
          
          <h2 className="mt-4 text-center text-7xl font-thin tracking-tight text-white sm:text-8xl lg:text-9xl">
            Designed for the Strategic Class
          </h2>
          
          <p className="mt-4 text-center text-xl text-white/70">
            Perception is not for speculators.
            It's for those shaping capital, policy, and infrastructure.
          </p>
        </div>

        <div className="mt-16 space-y-8">
          {/* First row with 2 items */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {communities.slice(0, 2).map((community) => (
              <Card 
                key={community.name} 
                className="relative overflow-hidden border-white/20 bg-white/10 transition-colors hover:bg-white/20"
              >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.1),transparent)]" />
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="h-56 w-96 rounded-lg object-cover"
                    />
                    <h3 className="mt-6 text-3xl font-thin tracking-tight text-white">{community.name}</h3>
                    <p className="mt-2 text-sm text-white/70">{community.description}</p>
                    <Button 
                      className="mt-4 bg-black text-white hover:bg-gray-900 dark:bg-black dark:hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl"
                      asChild
                    >
                      <a href={community.href}>
                        Go to platform
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Second row with 3 items */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {communities.slice(2).map((community) => (
              <Card 
                key={community.name} 
                className="relative overflow-hidden border-white/20 bg-white/10 transition-colors hover:bg-white/20"
              >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.1),transparent)]" />
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={community.image}
                      alt={community.name}
                      className="h-56 w-96 rounded-lg object-cover"
                    />
                    <h3 className="mt-6 text-3xl font-thin tracking-tight text-white">{community.name}</h3>
                    <p className="mt-2 text-sm text-white/70">{community.description}</p>
                    <Button 
                      className="mt-4 bg-black text-white hover:bg-gray-900 dark:bg-black dark:hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl"
                      asChild
                    >
                      <a href={community.href}>
                        Go to platform
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}