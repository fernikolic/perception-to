import { PriceCard } from './price-card';

const plans = [
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