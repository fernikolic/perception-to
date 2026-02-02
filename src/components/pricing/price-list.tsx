import { useState } from 'react';
import { PriceCard } from './price-card';

const tiers = [
  {
    name: 'Analyst',
    id: 'analyst',
    description: 'For individual researchers and analysts',
    price: '$149',
    annualPrice: '$1,490',
    perUser: false,
    features: [
      'Full access to 450+ source database',
      'Track up to 5 companies/topics with alerts',
      'Generate up to 10 custom reports/month',
      'Earnings call summaries and analysis',
      'Email support',
    ],
    cta: 'Start 7-day free trial',
    ctaLink: 'https://app.perception.to/auth/sign-up',
    annualCtaLink: 'https://app.perception.to/auth/sign-up',
    dataplan: 'analyst',
  },
  {
    name: 'Professional',
    id: 'professional',
    description: 'For power users and small teams',
    price: '$299',
    annualPrice: '$2,990',
    perUser: false,
    badge: 'Most Popular',
    features: [
      'Everything in Analyst, plus:',
      'Track up to 20 companies/topics with alerts',
      'Generate up to 50 custom reports/month',
      'Advanced sentiment and narrative analysis',
      'Custom dashboards by outlet, topic, or region',
      'Competitive benchmarking tools',
      'Priority email and chat support',
      '1× onboarding call',
    ],
    featured: true,
    cta: 'Start 7-day free trial',
    ctaLink: 'https://app.perception.to/auth/sign-up',
    annualCtaLink: 'https://app.perception.to/auth/sign-up',
    dataplan: 'professional',
  },
  {
    name: 'Team',
    id: 'team',
    description: 'For organizations with multiple users',
    price: 'Custom pricing',
    perUser: false,
    features: [
      'Everything in Professional, plus:',
      'Unlimited tracking and reports',
      'Multi-seat access with shared dashboards',
      'API access for custom integrations',
      'White-label reports and exports',
      'Dedicated account manager',
      'Quarterly strategy reviews',
      'Custom onboarding for your team',
    ],
    cta: 'Book a Demo',
    ctaLink: '/book-a-call',
    dataplan: 'team',
  },
];

export function PriceList() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Monthly/Annual Toggle */}
      <div className="flex flex-col items-center gap-3 mb-12 sm:mb-20">
        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base font-semibold ${
              !isAnnual
                ? 'bg-white text-black shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-full transition-all duration-300 text-sm sm:text-base font-semibold ${
              isAnnual
                ? 'bg-white text-black shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Annual
          </button>
        </div>
        <span className="text-sm text-green-400 font-medium">
          Save 2 months with annual billing
        </span>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {tiers.map((tier) => (
          <PriceCard key={tier.name} {...tier} isAnnual={isAnnual} />
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="text-base sm:text-lg !text-gray-400 font-light">
          Need 5+ users? <a href="/book-a-call" className="text-gray-300 hover:underline font-semibold">Contact sales</a> for volume pricing.
        </p>
      </div>
    </div>
  );
}
