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
          <p className="text-lg text-muted-foreground/80">
            Start with a 7-day free trial.
          </p>
        </div>
        
        {/* Beta Pricing Lock-In Notice */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 rounded-xl p-6 border border-emerald-200/50 dark:border-emerald-800/30 text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                🔒 Beta Pricing Lock-In
              </span>
            </div>
            <p className="text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-2">
              Lock in these beta prices now and keep them forever
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              We guarantee your pricing will never increase, even after we exit beta and raise prices for new customers
            </p>
          </div>
        </div>
        
        <div className="mx-auto mt-12 max-w-7xl">
          <PriceList />
        </div>
      </div>
    </section>
  );
}