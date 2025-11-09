import { PriceList } from '@/components/pricing/price-list';
import { FaqList } from '@/components/faq/faq-list';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import LayeredSineWaves from '@/components/LayeredSineWaves';

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Pricing - Perception | Intelligence Workspace Plans"
        description="Track with watchlists, organize in Spaces, generate with Recipes. $49 and $99/month. 7-day free trial. Lock in beta pricing forever."
        url="https://perception.to/pricing"
        keywords={['intelligence workspace pricing', 'Bitcoin intelligence platform cost', 'market intelligence subscription', 'crypto intelligence pricing', 'intelligence platform plans']}
      />
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
        {/* Base Gradient */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

        <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
          {/* Hero Card with Side-by-Side Layout */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Layered Sine Waves - Left Side (50%) */}
              <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
                <LayeredSineWaves />
              </div>

              {/* Content - Right Side (50%) */}
              <div className="w-full lg:w-1/2 pl-6 sm:pl-8 lg:pl-2 pr-6 sm:pr-8 lg:pr-56 py-8 sm:py-12 lg:py-16 flex flex-col justify-center" style={{ background: '#F0EEE6' }}>
                <div className="w-full max-w-2xl">
                  <div className="mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                    <div className="group relative inline-flex items-center rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold leading-6"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <span className="relative flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                        </span>
                        <span className="relative font-bold text-black">BETA PRICING</span>
                      </span>
                      <span className="ml-2.5 text-black/80">Lock in forever</span>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-black mb-5 sm:mb-6 lg:mb-8 text-center lg:text-left">
                    Simple pricing for your Intelligence{'\u00A0'}Workspace
                  </h1>

                  <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/70 font-semibold mb-3">
                      Track with watchlists. Organize in <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>. Generate with{'\u00A0'}<em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipes</em>.
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                      7-day free trial. Lock in beta pricing forever. Even when we raise prices for new{'\u00A0'}customers.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-6">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                      onClick={() => {
                        document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      View pricing
                    </Button>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-black hover:bg-white transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-black/20 hover:border-black/30 rounded-2xl"
                      asChild
                    >
                      <a href="https://app.perception.to/auth/sign-up">
                        Start free trial
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section id="pricing-section" className="relative pb-12 sm:pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Pricing Section with Clear Background */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 p-6 sm:p-8 md:p-12">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              {/* Beta Pricing Lock-In Notice */}
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-950/30 dark:to-emerald-900/20 rounded-xl p-4 sm:p-6 border border-emerald-200/50 dark:border-emerald-800/30 max-w-2xl mx-auto">
                <div className="flex items-center justify-center mb-2">
                  <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                    🔒 Beta Pricing Lock-In
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-emerald-900 dark:text-emerald-100 mb-1 sm:mb-2">
                  Sign up now and lock in beta pricing forever
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Your price never increases. Even after we exit beta and raise prices for new customers.
                </p>
              </div>
            </div>
            <PriceList />
          </div>

          <div className="mt-16 sm:mt-24 lg:mt-32">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-center mb-12 sm:mb-16 px-2">
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