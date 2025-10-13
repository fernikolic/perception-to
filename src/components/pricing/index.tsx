import { PriceList } from './price-list';

export function Pricing() {
  return (
    <section id="pricing" className="pt-32 pb-40 sm:pt-40 sm:pb-48 !bg-black">
      <div className="mx-auto max-w-7xl px-8 lg:px-12">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.05] mb-10 sm:mb-12 !text-white">
            We monitor everything.
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent font-bold">
              You execute what matters.
            </span>
          </h2>
          <p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed !text-white/80 max-w-3xl mx-auto mb-8 font-light">
            From regulatory windows to narrative shifts to competitive moves - transformed into clear, executable opportunities. Daily.
          </p>
        </div>

        {/* Beta Pricing Lock-In Notice */}
        <div className="mx-auto mt-20 sm:mt-24 max-w-3xl">
          <div className="rounded-2xl p-8 sm:p-10 border-2 border-green-500/40 bg-green-500/5 backdrop-blur-sm text-center hover:border-green-500/60 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <span className="inline-flex items-center rounded-full bg-green-500/10 px-5 py-2 text-base sm:text-lg font-bold !text-white">
                🔒 Beta Pricing Lock-In
              </span>
            </div>
            <p className="text-lg sm:text-xl font-semibold !text-white mb-3">
              Lock in these beta prices now and keep them forever
            </p>
            <p className="text-base sm:text-lg !text-white/70 font-light">
              We guarantee your pricing will never increase, even after we exit beta and raise prices for new customers
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 sm:mt-20 max-w-7xl">
          <PriceList />
        </div>
      </div>
    </section>
  );
}