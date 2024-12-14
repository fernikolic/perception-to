import { PriceCard } from './price-card';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for journalists, VCs, and content creators',
    price: '$69',
    features: [
      'Real-time trend discovery',
      'Daily market insights',
      'Sentiment analysis',
      'Email reports',
    ],
  },
  {
    name: 'Pro',
    description: 'For investors, traders, and researchers',
    price: '$179',
    features: [
      'Everything in Starter, plus:',
      'Price correlation analysis',
      'Market metrics integration',
      'Industry insights dashboard',
      'Advanced sentiment metrics',
      'Custom alerts (coming soon)',
      'Priority support',
    ],
    popular: true,
  },
  {
    name: 'API',
    description: 'Enterprise-grade data solutions',
    price: 'Custom',
    features: [
      'Full API access',
      'Custom data integrations',
      'Historical data access',
      'Custom metrics',
      'Dedicated support',
      'Custom reporting',
    ],
  },
];

export function PriceList() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <PriceCard key={plan.name} {...plan} />
      ))}
    </div>
  );
}