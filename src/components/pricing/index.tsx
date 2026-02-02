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
              Simple Pricing,<br />Powerful Intelligence
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed !text-white/60 font-light">
              For analysts, IR teams, and communications professionals. All plans include full platform{'\u00A0'}access.
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