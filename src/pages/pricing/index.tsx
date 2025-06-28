import { PriceList } from '@/components/pricing/price-list';
import { FaqList } from '@/components/faq/faq-list';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <section id="pricing" className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(100,181,246,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight sm:text-6xl mb-8">
              Choose your
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent font-light">
                signal depth
              </span>
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground max-w-xl mx-auto mb-6">
              Start with a 7-day free trial. Cancel anytime.
            </p>
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Save 10+ hours per week or it's on us
              </span>
            </div>
            <p className="text-sm text-muted-foreground italic">
              Trusted by Bitcoin pros, journalists, and fintech teams in 27+ countries.
            </p>
          </div>
        </div>
      </section>

      <section className="relative pb-20 md:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PriceList />
          
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