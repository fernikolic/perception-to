import { PriceCard } from './price-card';

const tiers = [
  {
    name: 'Pro Plan',
    id: 'pro',
    description: 'For journalists, content creators, and independent researchers.',
    price: '$99',
    perUser: true,
    features: [
      'Track emerging topics and narratives in real-time',
      'Get insights on Bitcoin coverage across media outlets',
      'Monitor discussions across 100+ channels including Reddit, X, and more',
    ],
    cta: 'Start Tracking Now',
    ctaLink: 'https://buy.stripe.com/4gw4jm8xP0Fa5u8aEH',
    microCopy: '7-day trial · no card',
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
      'Build custom views to track sentiment by outlet, topic, or region',
      'Analyze price movements in relation to narrative sentiment',
      'Access the real-time Perception Index™ fear and greed tracker',
      'Seamless upgrade path to Enterprise for deeper insights',
    ],
    featured: true,
    cta: 'Start Tracking Now',
    ctaLink: 'https://buy.stripe.com/8wMdTW7tLew03m0fZ2',
    microCopy: '7-day trial · no card',
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
      'Tailored research reports with deep narrative synthesis',
      'Dedicated research analyst for personalized insights',
      'API access for integration with your systems',
      'Strategic narrative consulting and competitor analysis',
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