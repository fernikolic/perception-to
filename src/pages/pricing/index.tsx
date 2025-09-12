import { PriceList } from '@/components/pricing/price-list';
import { FaqList } from '@/components/faq/faq-list';
import SEO from '@/components/SEO';

export default function PricingPage() {
  return (
    <>
      <SEO 
        title="Pricing - Perception | Bitcoin Intelligence Platform"
        description="Choose your intelligence level. Save 10+ hours per week with real-time Bitcoin market sentiment analysis. 7-day free trial. Beta pricing lock-in guarantee."
        url="https://perception.to/pricing"
        keywords={['Bitcoin pricing', 'sentiment analysis pricing', 'market intelligence pricing', 'Bitcoin analytics cost', 'crypto intelligence platform']}
      />
    <div className="min-h-screen bg-background pt-16">
      <section id="pricing" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(100,181,246,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero Card with Background Image */}
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src="/images/hero_image.avif"
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight tracking-tight text-black mb-6 sm:mb-8">
                  Choose your
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent font-light">
                    intelligence level
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/70 max-w-2xl mx-auto">
                  Start finding opportunities in minutes, not hours. 7-day free trial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-20 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Pricing Section with Clear Background */}
          <div className="relative rounded-3xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-8 md:p-12">
            <div className="text-center mb-12">
              {/* Beta Pricing Lock-In Notice */}
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 rounded-xl p-6 border border-emerald-200/50 dark:border-emerald-800/30 max-w-2xl mx-auto">
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
            <PriceList />
          </div>
          
          <div className="mt-32 md:mt-40">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-center mb-16">
              Frequently Asked Questions
            </h2>
            <FaqList />
          </div>
        </div>
      </section>
    </div>
    </>
  );
}