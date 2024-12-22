import { PriceCard } from './price-card';

const tiers = [
  {
    name: 'Starter',
    id: 'starter',
    href: '#',
    description: 'For getting started with market intelligence',
    price: '$59',
    features: [
      'Real-time trend tracking',
      'Sentiment analysis',
      'Breaking insights',
      'Trend discovery',
      'Media Sentiment',
      'Real-time Feed',
    ],
  },
  {
    name: 'Pro',
    id: 'pro',
    href: '#',
    description: 'For market correlations and industry insights',
    price: '$149',
    features: [
      'Everything in Starter, plus:',
      'Price & Perception Analysis',
      'Bitcoin Proxies',
      'Industry Segments',
      'Company Tracker',
      'The most reliable, real-time Fear & Greed Index',
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
      'Custom API integrations',
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