import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

interface Benefit {
  title: string;
  perks: string[];
}

const benefits: Benefit[] = [
  {
    title: 'Flexible Work',
    perks: ['Remote-first culture', 'Flexible hours', 'Work-life balance'],
  },
  {
    title: 'Health & Wellness',
    perks: ['Premium health insurance', 'Mental health support', 'Wellness stipend'],
  },
  {
    title: 'Growth',
    perks: ['Learning budget', 'Conference tickets', 'Career development'],
  },
  {
    title: 'Team Building',
    perks: ['Regular team retreats', 'Social events', 'Community initiatives'],
  },
];

export function BenefitsSection() {
  return (
    <section className="bg-muted/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Benefits</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            We believe in taking care of our team. Here is what you can expect when you join us.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <CardHeader>
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {benefit.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{perk}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}