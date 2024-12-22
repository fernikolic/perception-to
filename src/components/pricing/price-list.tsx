import { PriceCard } from './price-card';

const tiers = [
  {
    name: 'Starter',
    id: 'starter',
    href: '#',
    description: 'For companies getting started with market intelligence',
    price: '$79',
    features: [
      'Real-time trend tracking',
      'Basic sentiment analysis',
      'Up to 3 competitor tracking',
      'Daily email reports',
      'Basic data export',
    ],
  },
  {
    name: 'Pro',
    id: 'pro',
    href: '#',
    description: 'For growing Bitcoin companies and teams',
    price: '$179',
    features: [
      'Everything in Starter, plus:',
      'Advanced sentiment metrics',
      'Unlimited competitor tracking',
      'Custom alerts',
      'API access',
      'Priority support',
    ],
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    href: '#',
    description: 'For large organizations needing advanced features',
    price: 'Custom',
    features: [
      'Everything in Pro, plus:',
      'Custom integrations',
      'Dedicated account manager',
      'Custom reporting',
      'SLA & support',
      'Training & onboarding',
    ],
  },
];

export function PriceList() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {tiers.map((tier) => (
        <PriceCard key={tier.name} {...tier} />
      ))}
    </div>
  );
}