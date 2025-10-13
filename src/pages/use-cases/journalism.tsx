import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import SEO from '@/components/SEO';

export function JournalismPage() {
  return (
    <>
      <SEO
        title="Data-Backed Journalism - Perception"
        description="Turn insights into evidence with quantifiable media intelligence. Publish with data, not opinions."
        url="https://perception.to/use-cases/journalism"
        keywords={['data journalism', 'crypto journalism', 'Bitcoin journalism', 'media intelligence', 'journalism tools']}
      />
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Hero */}
        <section className="relative py-24 sm:py-32 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
                <div className="mx-auto max-w-3xl">
                  <a href="/use-cases" className="inline-flex items-center text-sm text-black/70 hover:text-black mb-8">
                    ← Back to Use Cases
                  </a>

                  <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-black mb-6">
                      Data-Backed Journalism
                    </h1>
                    <p className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-light text-black/70">
                      Turn insights into evidence with quantifiable media intelligence
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Challenge */}
        <section className="py-24 sm:py-32 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">The Challenge</span>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-slate-900 dark:text-white leading-relaxed">
                You're writing about a trend or controversy, but you need quantifiable data to back up your reporting. Traditional sentiment tools give you generic social media metrics, not media-specific intelligence.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 block">The Solution</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                  Turn insights into evidence
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  {
                    title: "Narrative Momentum Tracking",
                    description: "Is Bitcoin adoption actually trending up? Show readers the hard data"
                  },
                  {
                    title: "Spokesperson Reputation Analysis",
                    description: "Track how key figures are being portrayed across outlets (positive/negative sentiment shifts)"
                  },
                  {
                    title: "Trend Validation",
                    description: "Back up your investigative angle with coverage volume and sentiment analysis"
                  },
                  {
                    title: "Real-Time Intelligence",
                    description: "Report on what's happening now, not last week's data"
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center">
                        <Check className="w-4 h-4 text-white dark:text-black" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Edge */}
        <section className="py-24 sm:py-32 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 dark:text-white leading-relaxed">
                You publish with data.<br/>
                Your competitors publish with opinions.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
                Build authority through quantifiable insights
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
                Start your 7-day free trial and access journalist-grade intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-100 px-8"
                  asChild
                >
                  <a href="https://app.perception.to/auth/sign-up" className="flex items-center gap-2">
                    Start Free Trial
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-slate-300 dark:border-slate-700 px-8"
                  asChild
                >
                  <a href="/book-a-call">Book a Demo</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
