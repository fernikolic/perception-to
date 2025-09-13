import { PriceList } from './price-list';

export function Pricing() {
  return (
    <section id="pricing" className="pt-20 pb-32 sm:pt-32 sm:pb-40 !bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extralight tracking-tight sm:text-5xl lg:text-6xl mb-8 !text-white">
            Choose your
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent font-light">
              signal depth
            </span>
          </h2>
          <p className="text-xl leading-relaxed !text-white/80 max-w-2xl mx-auto mb-6">
            See real-time sentiment shifts, rising institutional narratives, and breakout themes that shape capital, policy, and adoption.
          </p>
          <p className="text-lg !text-white/70">
            Start with a 7-day free trial.
          </p>
        </div>
        
        {/* Beta Pricing Lock-In Notice */}
        <div className="mx-auto mt-16 max-w-2xl">
          <div className="rounded-xl p-6 border border-green-500/40 text-center">
            <div className="flex items-center justify-center mb-2">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold !text-white">
                🔒 Beta Pricing Lock-In
              </span>
            </div>
            <p className="text-sm font-medium !text-white mb-2">
              Lock in these beta prices now and keep them forever
            </p>
            <p className="text-xs !text-white/70">
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