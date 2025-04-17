import { PriceList } from './price-list';

export function Pricing() {
  return (
    <section id="pricing" className="pt-8 pb-24 sm:pt-16 sm:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl font-thin tracking-tight sm:text-6xl lg:text-7xl pb-4">
            Narratives move markets.
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-800 inline-block text-transparent bg-clip-text leading-relaxed">
              Perception tells you where they're going.
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Be first in line to get the sentiment shifts, institutional moves, and emerging themes <br /> that shape capital, policy, and adoption.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-7xl">
          <PriceList />
        </div>
      </div>
    </section>
  );
}