import { PriceList } from './price-list';

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Choose your insight level
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            From trend discovery to deep market analysis, we have the right plan for you.          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
          <PriceList />
        </div>
      </div>
    </section>
  );
}