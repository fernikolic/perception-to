import { PriceList } from '@/components/pricing/price-list';
import { FaqList } from '@/components/faq/faq-list';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Pricing | Perception"
        description="Simple pricing for serious research. Plans start at $149/month. No per-seat games, no feature walls."
        url="https://perception.to/pricing"
        keywords={['intelligence platform pricing', 'Bitcoin intelligence cost', 'market intelligence subscription', 'crypto intelligence pricing', 'research platform plans']}
      />
    <div className="min-h-screen bg-background pt-28">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
        {/* Base Gradient */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

        <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
          {/* Hero Cards - Side by Side */}
          <div className="relative">
            <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8 min-h-[200px] lg:min-h-[600px]">
              {/* ASCII Art - Left Card (Desktop only) */}
              <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[600px] hidden lg:block">
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#000000' }}>
                  <DelicateAsciiDots />
                  {/* Overlay text */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-white text-center px-8 leading-tight">
                      Simple pricing for serious research
                    </h1>
                  </div>
                </div>
              </div>

              {/* Content - Right Card */}
              <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:pl-8 lg:pr-12 py-8 sm:py-12 lg:py-16 flex flex-col justify-center rounded-3xl shadow-2xl" style={{ background: '#F0EEE6' }}>
                <div className="w-full max-w-2xl">
                  <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-black mb-4">
                      No per-seat games. No feature walls. Just the intelligence you{'\u00A0'}need.
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                      Plans for individual analysts, small teams, and enterprises. Annual plans include 2 months{'\u00A0'}free.
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
                      See plans
                    </Button>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-black hover:bg-white transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-black/20 hover:border-black/30 rounded-2xl"
                      asChild
                    >
                      <a href="/book-a-call">
                        Book a Demo
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
            <PriceList />
          </div>

          {/* Compare Tools Section */}
          <div className="mt-16 sm:mt-24 lg:mt-32">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-4 sm:mb-6">
                How Does Perception Compare?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
                See how Perception stacks up against other crypto sentiment tools in the market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-5 text-sm sm:text-base"
                  asChild
                >
                  <a href="/compare/best-crypto-sentiment-tools">
                    Compare All Tools
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-5 text-sm sm:text-base"
                  asChild
                >
                  <a href="/compare/perception-vs-glassnode">
                    Perception vs Glassnode
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-5 text-sm sm:text-base"
                  asChild
                >
                  <a href="/alternatives/lunarcrush-alternative">
                    LunarCrush Alternative
                  </a>
                </Button>
              </div>
            </div>
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
