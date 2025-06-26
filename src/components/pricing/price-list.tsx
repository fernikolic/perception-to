import { useState } from 'react';
import { PriceCard } from './price-card';
import { Toggle } from '@/components/ui/toggle';

const tiers = [
  {
    name: 'Pro',
    id: 'pro',
    description: 'For journalists, content creators, and independent researchers.',
    price: '$49',
    annualPrice: '$495',
    perUser: false,
    features: [
      'Save 10+ hours per week of manual research',
      'Track emerging narratives across 200+ sources in real time',
      'Up to 5 custom keyword/topic alerts',
      'Real-time blind-spot & sentiment notifications',
      'Self-serve setup & community support',
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
    description: 'For analysts, market researchers, and strategic planners.',
    price: '$99',
    annualPrice: '$999',
    perUser: false,
    badge: 'Most Popular',
    features: [
      'Everything in Pro, plus:',
      'Unlimited keyword/entity/industry alerts',
      'Custom dashboards by outlet, topic, or region',
      'Advanced price-vs-narrative correlation tools',
      'Unlimited "Generate My Brief" exports (saves 2+ hours per report)',
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
    description: 'For institutions, funds, and high-stakes decision-makers.',
    price: 'Custom',
    perUser: false,
    features: [
      'Everything in Premium, plus:',
      'API access & data integrations',
      'Custom intelligence reports & dashboards',
      'Strategic narrative consulting & competitive intelligence',
      'Dedicated account team & quarterly reviews',
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
        <div className="flex items-center space-x-1 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-1 ring-1 ring-gray-200/50 dark:ring-gray-700/50">
          <Toggle
            pressed={!isAnnual}
            onPressedChange={() => setIsAnnual(false)}
            className={`px-6 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
              !isAnnual 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm ring-1 ring-gray-200/50 dark:ring-gray-600/50' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Monthly
          </Toggle>
          <Toggle
            pressed={isAnnual}
            onPressedChange={() => setIsAnnual(true)}
            className={`px-6 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
              isAnnual 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm ring-1 ring-gray-200/50 dark:ring-gray-600/50' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Annual
          </Toggle>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {tiers.map((tier) => (
          <PriceCard key={tier.name} {...tier} isAnnual={isAnnual} />
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-sm text-muted-foreground">
          Need 5+ users? <a href="https://perception.to/book-a-call" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">Contact sales</a> for volume pricing.
        </p>
      </div>
    </div>
  );
}