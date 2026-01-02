import { PriceList } from './price-list';
import FlowingRibbons from '@/components/FlowingRibbons';

export function Pricing() {
  return (
    <section id="pricing" className="pt-32 pb-40 sm:pt-40 sm:pb-48 !bg-black">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header Section - Side by Side Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-24 sm:mb-32">

          {/* FlowingRibbons Animation - Left Side */}
          <div className="w-full lg:w-1/2 h-64 sm:h-80 md:h-96 lg:h-[500px]">
            <FlowingRibbons />
          </div>

          {/* Text Content - Right Side */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.15] mb-8 sm:mb-10 !text-white">
              Your Organization's Collective<br />Market Intelligence
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed !text-white/60 font-light">
              Single source of truth. Unifying product, sales, and{'\u00A0'}marketing.
            </p>
          </div>
        </div>

        {/* Beta Pricing Lock-In Notice */}
        <div className="mx-auto mt-20 sm:mt-24 max-w-3xl">
          <div className="rounded-2xl p-8 sm:p-10 border-2 border-gray-400/40 bg-gray-400/5 backdrop-blur-sm text-center hover:border-gray-400/60 transition-all duration-300">
            <div className="flex items-center justify-center mb-4">
              <span className="inline-flex items-center rounded-full bg-gray-400/10 px-5 py-2 text-base sm:text-lg font-bold !text-white">
                🔒 Beta Pricing Lock-In
              </span>
            </div>
            <p className="text-lg sm:text-xl font-semibold !text-white mb-3">
              Lock in these prices now. Keep them forever.
            </p>
            <p className="text-base sm:text-lg !text-white/70 font-light">
              Your pricing will never increase—even after beta ends and prices go up for new users.
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