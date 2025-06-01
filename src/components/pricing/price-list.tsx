import { PriceCard } from './price-card';

const tiers = [
  {
    name: 'Pro Plan',
    id: 'pro',
    description: 'For journalists, content creators, and independent researchers.',
    price: '$99',
    perUser: true,
    features: [
      'Save 10+ hours weekly with unified crypto media monitoring',
      'Track emerging narratives across 200+ sources in real-time',
      'Get intelligent alerts when stories break—before they trend',
    ],
    cta: 'Start Tracking Now',
    ctaLink: 'https://buy.stripe.com/4gw4jm8xP0Fa5u8aEH',
    microCopy: 'Free access · no card',
    dataplan: 'pro',
  },
  {
    name: 'Premium Plan',
    id: 'premium',
    description: 'For analysts, market researchers, and strategic planners.',
    price: '$199',
    perUser: true,
    badge: 'Enhanced Tracking',
    features: [
      'Everything in Pro Plan, plus:',
      'Build custom dashboards to slice data by outlet, topic, or region',
      'Advanced correlation tools for price-vs-narrative analysis',
      'Professional-grade exports and API access for team workflows',
      'Priority support and strategic consultation calls',
    ],
    featured: true,
    cta: 'Start Tracking Now',
    ctaLink: 'https://buy.stripe.com/8wMdTW7tLew03m0fZ2',
    microCopy: 'Free access · no card',
    dataplan: 'premium',
  },
  {
    name: 'Enterprise Plan',
    id: 'enterprise',
    description: 'For institutions, funds, and high-stakes decision-makers.',
    price: 'Custom',
    perUser: false,
    features: [
      'Everything in Premium Plan, plus:',
      'Dedicated research analyst for custom intelligence reports',
      'White-label dashboard integration with your existing tools',
      'Real-time API with sub-60-second data delivery',
      'Strategic narrative consulting and competitive intelligence',
    ],
    cta: 'Contact Us to Learn More',
    ctaLink: 'mailto:fernando@btcperception.com?subject=Enterprise%20Plan%20Inquiry',
    dataplan: 'enterprise',
  },
];

export function PriceList() {
  return (
    <div className="flex flex-col">
      <div className="grid gap-8 md:grid-cols-3">
        {tiers.map((tier) => (
          <PriceCard key={tier.name} {...tier} />
        ))}
      </div>
      <div className="mt-8 text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600 font-medium">
          Need 5+ users? Volume pricing: <a href="mailto:fernando@btcperception.com?subject=Request%20for%205%2B%20Perception%20seats" className="text-orange-600 hover:underline">contact sales</a>.
        </p>
      </div>
    </div>
  );
}