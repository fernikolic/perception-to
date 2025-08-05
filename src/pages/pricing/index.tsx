import { PriceList } from '@/components/pricing/price-list';
import { FaqList } from '@/components/faq/faq-list';

export default function PricingPage() {
  return (
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
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/70 max-w-2xl mx-auto mb-4 sm:mb-6">
                  Start finding opportunities in minutes, not hours. 7-day free trial.
                </p>
                <div className="flex justify-center mb-4 sm:mb-6">
                  <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-800 backdrop-blur-sm border border-emerald-500/30">
                    Get competitive advantage or it's on us
                  </span>
                </div>
                <p className="text-sm text-black/60 italic">
                  Trusted by emerging finance leaders, strategists, and decision-makers in 27+ countries.
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
              <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-4">
                Choose your
                <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent font-light ml-2">
                  signal depth
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Pick the intelligence level that matches your research needs
              </p>
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
  );
}