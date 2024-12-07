import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface PricingTier {
  name: string;
  description: string;
  price: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    description: 'Perfect for small teams getting started',
    price: '$29',
    features: [
      'Up to 5 team members',
      '5GB storage',
      'Basic analytics',
      'Basic integrations',
      'Email support',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Professional',
    description: 'For growing businesses and teams',
    price: '$99',
    features: [
      'Up to 20 team members',
      '50GB storage',
      'Advanced analytics',
      'All integrations',
      'Priority support',
      'Custom workflows',
    ],
    popular: true,
    cta: 'Get Started',
  },
  {
    name: 'Enterprise',
    description: 'Custom solutions for large organizations',
    price: 'Custom',
    features: [
      'Unlimited team members',
      'Unlimited storage',
      'Custom analytics',
      'Custom integrations',
      'Dedicated support',
      'Advanced security',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
  },
];

export function PricingPage() {
  const handleCTA = (tier: PricingTier) => {
    if (tier.cta === 'Contact Sales') {
      // Handle contact sales differently if needed
      return;
    }
    window.location.href = 'https://app.perception.to/auth/signup';
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(100,181,246,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Simple, transparent pricing
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Choose the perfect plan for your needs. All plans include a 14-day free trial.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier) => (
              <Card 
                key={tier.name}
                className={tier.popular ? 'border-primary shadow-lg' : ''}
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <p className="text-muted-foreground">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{tier.price}</span>
                    {tier.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
                  </div>
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={tier.popular ? 'default' : 'outline'}
                    onClick={() => handleCTA(tier)}
                  >
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}