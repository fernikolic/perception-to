import { useState } from 'react';
import { PriceCard } from './price-card';
import { Toggle } from '@/components/ui/toggle';

const tiers = [
  {
    name: 'Pro',
    id: 'pro',
    description: '',
    price: '$49',
    annualPrice: '$495',
    perUser: false,
    features: [
      'Save 10+ hours per week of manual research',
      'Track emerging narratives across 100+ sources in real time (Reddit, Bloomberg, X, GitHub, and more)',
      'Monitor up to 3 saved topics with real-time alerts',
      'Real-time blind-spot & sentiment notifications',
      'Instant setup. No sales calls.',
      'Trusted by 100+ independent creators',
    ],
    cta: 'Start 7-Day Free Trial',
    ctaLink: 'https://buy.stripe.com/aFa3cvaVw9IBbbCfvW63K05',
    annualCtaLink: 'https://buy.stripe.com/aFa3cvaVw9IBbbCfvW63K05', // TODO: Replace with actual annual link
    dataplan: 'pro',
  },
  {
    name: 'Premium',
    id: 'premium',
    description: '',
    price: '$99',
    annualPrice: '$999',
    perUser: false,
    badge: 'Most Popular',
    features: [
      'Everything in Pro, plus:',
      'Monitor up to 20 saved topics/keywords/entities with alerts',
      'Generate up to 20 custom reports from your data',
      'Advanced price-vs-narrative correlation tools',
      'Custom dashboards by outlet, topic, or region',
      'Auto-generated narrative briefings — exportable in seconds',
      '1× annual onboarding & strategy call',
      'Priority email & chat support',
    ],
    featured: true,
    cta: 'Start 7-Day Free Trial',
    ctaLink: 'https://buy.stripe.com/8wMdTW7tLew03m0fZ2',
    annualCtaLink: 'https://buy.stripe.com/8wMdTW7tLew03m0fZ2', // TODO: Replace with actual annual link
    dataplan: 'premium',
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    description: '',
    price: 'Custom pricing',
    perUser: false,
    features: [
      'Everything in Premium, plus:',
      'Unlimited saved topics & alerts',
      'Unlimited report generation',
      'API access & custom data integrations',
      'Competitive narrative benchmarking & strategic positioning support',
      'White-label dashboards & intelligence reports',
      'Dedicated account team & quarterly strategy reviews',
      'Includes onboarding for internal comms, research, or IR teams',
    ],
    cta: 'Contact Sales',
    ctaLink: 'https://perception.to/book-a-call',
    dataplan: 'enterprise',
  },
];

export function PriceList() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Monthly/Annual Toggle */}
      <div className="flex justify-center mb-16">
        <div className="flex items-center space-x-1 bg-gray-800 rounded-2xl p-1 ring-1 ring-gray-600 shadow-sm">
          <Toggle
            pressed={!isAnnual}
            onPressedChange={() => setIsAnnual(false)}
            className={`px-6 py-3 rounded-xl transition-all duration-200 text-sm font-semibold ${
              !isAnnual 
                ? 'bg-white text-black shadow-sm' 
                : 'text-white hover:bg-gray-700'
            }`}
          >
            Monthly
          </Toggle>
          <Toggle
            pressed={isAnnual}
            onPressedChange={() => setIsAnnual(true)}
            className={`px-6 py-3 rounded-xl transition-all duration-200 text-sm font-semibold relative ${
              isAnnual 
                ? 'bg-white text-black shadow-sm' 
                : 'text-white hover:bg-gray-700'
            }`}
          >
            Annual
            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
              Save 17%
            </span>
          </Toggle>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {tiers.map((tier) => (
          <PriceCard key={tier.name} {...tier} isAnnual={isAnnual} />
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-sm !text-gray-400">
          Need 5+ users? <a href="https://perception.to/book-a-call" className="text-blue-400 hover:underline font-medium">Contact sales</a> for volume pricing.
        </p>
      </div>
    </div>
  );
}