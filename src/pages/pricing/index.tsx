import { PriceList } from '@/components/pricing/price-list';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(100,181,246,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Perception is your narrative edge.
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Track what matters before the market catches on.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Built for institutional thinkers, comms teams, researchers, and strategic founders in Bitcoin and emerging finance.
              Choose the plan that fits your workflow — or contact us to build something custom.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <PriceList />
          <div className="mt-16 text-center">
            <p className="text-lg text-muted-foreground">
              🎟️ Founding Cohort Offer: Join as one of our first 5 clients and lock in lifetime discounted pricing — plus early access to features and strategy input.
              Founding Partner tier starts at €2,500/month through July 2025.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}