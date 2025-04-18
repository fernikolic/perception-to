import { PriceCard } from './price-card';

const tiers = [
  {
    name: 'Analyst',
    id: 'analyst',
    href: '#',
    description: 'For researchers, analysts, and comms pros who want real-time signal.',
    price: '$99',
    features: [
      'Perception Weekly Pro reports',
      'Sentiment heatmaps (X, Reddit, media, more)',
      'Access to market snapshot dashboard',
      'High-signal trend alerts',
    ],
    cta: 'Save 15+ Hours Per Week',
    ctaLink: 'https://buy.stripe.com/4gw4jm8xP0Fa5u8aEH',
  },
  {
    name: 'Institutional',
    id: 'institutional',
    href: '#',
    description: 'For teams who need fast insight, clean dashboards, and internal narrative alignment.',
    price: '$499',
    features: [
      'All Analyst features',
      'Full access to trend + sentiment dashboards',
      'Saved views for strategic themes',
      'Export CSVs + charts for internal use',
      'Multi-channel topic filters',
      'Early access to API by request',
    ],
    cta: 'Get Instant Access',
    ctaLink: 'https://buy.stripe.com/cN28zC15n2NibSw9AC',
  },
  {
    name: 'Founding Partner',
    id: 'founding-partner',
    href: '#',
    description: 'For funds, Bitcoin companies, and institutional teams who want Perception tailored to them.',
    price: '$2,500',
    features: [
      'Everything in Institutional',
      'Monthly narrative briefing reports (customized)',
      'Advisory call + media sentiment consulting',
      'Custom dashboard filters or entity tracking',
      'Priority access to enterprise API by request',
      'Includes up to 3 users',
      'White-glove onboarding',
    ],
    cta: 'Book a Strategy Call',
    ctaLink: 'https://calendly.com/fernikolic/30min',
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