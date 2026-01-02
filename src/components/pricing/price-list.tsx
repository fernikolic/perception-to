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
      'Reclaim 10+ hours per week of manual research',
      'Track emerging narratives across 650+ sources in real time',
      'Monitor up to 3 saved topics with real-time alerts',
      'Real-time blind-spot and sentiment notifications',
      'Instant setup. No sales calls.',
    ],
    cta: 'Start 7-day free trial',
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
    badge: 'Most popular',
    features: [
      'Everything in Pro, plus:',
      'Monitor up to 20 saved topics with alerts',
      'Generate up to 20 custom deliverables from your data',
      'Advanced price-vs-narrative correlation tools',
      'Custom dashboards by outlet, topic, or region',
      'Auto-generated briefings—exportable in seconds',
      '1× annual onboarding and strategy call',
      'Priority email and chat support',
    ],
    featured: true,
    cta: 'Start 7-day free trial',
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
      'Unlimited saved topics and alerts',
      'Unlimited deliverable generation',
      'API access and custom integrations',
      'Competitive benchmarking and strategic positioning support',
      'White-label dashboards and reports',
      'Dedicated account team and quarterly strategy reviews',
      'Onboarding for internal comms, research, or IR teams',
    ],
    cta: 'Book a call',
    ctaLink: 'https://perception.to/book-a-call',
    dataplan: 'enterprise',
  },
];

export function PriceList() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Monthly/Annual Toggle */}
      <div className="flex justify-center mb-12 sm:mb-20">
        <div className="flex items-center space-x-1 sm:space-x-2 bg-gray-800 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 ring-2 ring-gray-400 shadow-lg">
          <Toggle
            pressed={!isAnnual}
            onPressedChange={() => setIsAnnual(false)}
            className={`px-4 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-lg font-bold ${
              !isAnnual
                ? 'bg-white text-black shadow-lg scale-105'
                : 'text-white hover:bg-gray-700'
            }`}
          >
            Monthly
          </Toggle>
          <Toggle
            pressed={isAnnual}
            onPressedChange={() => setIsAnnual(true)}
            className={`px-4 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-lg font-bold relative ${
              isAnnual
                ? 'bg-white text-black shadow-lg scale-105'
                : 'text-white hover:bg-gray-700'
            }`}
          >
            Annual
            <span className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 bg-gray-400 text-black text-xs sm:text-sm px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-bold shadow-lg">
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

      <div className="mt-20 text-center">
        <p className="text-base sm:text-lg !text-gray-400 font-light">
          Need 5+ users? <a href="https://perception.to/book-a-call" className="text-gray-300 hover:underline font-semibold">Contact sales</a> for volume pricing.
        </p>
      </div>
    </div>
  );
}