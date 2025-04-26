import { PriceCard } from './price-card';

const tiers = [
  {
    name: 'PRO',
    id: 'pro',
    description: 'For analysts & comms leads — no code.',
    price: '$299',
    perUser: true,
    features: [
      'Live Perception Index™ & heat-maps',
      'Trend Explorer dashboard (full history)',
      'Hourly Slack digests — up to 3 channels',
      'One-click PDF, CSV & image exports',
      'Email support (48 h SLA)',
    ],
    cta: 'Start 7-Day Pro Trial',
    ctaLink: 'https://buy.stripe.com/4gw4jm8xP0Fa5u8aEH',
    microCopy: '7-day trial · no card',
    dataplan: 'pro',
  },
  {
    name: 'PRO + DATA API & Excel',
    id: 'pro-data',
    description: 'For desks that need Perception inside their models.',
    price: '$499',
    perUser: true,
    badge: 'Real-time data',
    features: [
      'Real-time Perception Index™ & Trend API (≤ 60 s)',
      'Everything in Pro, plus:',
      <>Excel / Google-Sheets formula pack <img src="/logos/excel.jpeg" alt="Excel logo" className="inline-block h-4 w-4 ml-1" /> <img src="/logos/Google_Sheets_logo_(2014-2020).svg.png" alt="Google Sheets logo" className="inline-block h-4 w-4 ml-1" /></>,
      'Automated raw CSV & chart export',
      'Slack Connect support (24 h SLA)',
    ],
    featured: true,
    cta: 'Upgrade to Data & API',
    ctaLink: 'https://buy.stripe.com/cN28zC15n2NibSw9AC',
    microCopy: '7-day trial · no card',
    dataplan: 'data',
  },
];

export function PriceList() {
  return (
    <div className="flex flex-col">
      <div className="grid gap-8 md:grid-cols-2">
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