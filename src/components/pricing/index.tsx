import { PriceList } from './price-list';

export function Pricing() {
  return (
    <section id="pricing" className="pt-20 pb-32 sm:pt-32 sm:pb-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extralight tracking-tight sm:text-5xl lg:text-6xl mb-8">
            Choose your
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent font-light">
              signal depth.
            </span>
          </h2>
          <p className="text-xl leading-relaxed text-muted-foreground max-w-2xl mx-auto mb-6">
            See real-time sentiment shifts, rising institutional narratives, and breakout themes that shape capital, policy, and adoption.
          </p>
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              10-hour time savings guarantee or cancel
            </span>
          </div>
          <p className="text-lg text-muted-foreground/80">
            Start with a 7-day free trial.
          </p>
        </div>
        <div className="mx-auto mt-20 max-w-7xl">
          <PriceList />
        </div>
      </div>
    </section>
  );
}