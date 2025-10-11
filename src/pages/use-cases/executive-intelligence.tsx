import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import SEO from '@/components/SEO';

export function ExecutiveIntelligencePage() {
  return (
    <>
      <SEO
        title="Executive Intelligence Briefings - Perception"
        description="Generate board-ready competitive intelligence reports in minutes. Track your market performance with data-backed insights for C-Suite and board members."
        url="https://perception.to/use-cases/executive-intelligence"
        keywords={['executive intelligence', 'competitive intelligence', 'board reports', 'market analysis', 'C-suite intelligence']}
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
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-black mb-6">
                      Executive Intelligence Briefings
                    </h1>
                    <p className="text-xl text-black/70">
                      Generate board-ready competitive intelligence reports in minutes, not days
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
              <p className="text-2xl sm:text-3xl font-light text-slate-900 dark:text-white leading-relaxed">
                Your executive team asks "How are we performing in the market?" and you spend 3 days pulling fragmented coverage data into a deck that's outdated by the time you present it.
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
                <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-6">
                  Generate comprehensive executive reports in minutes
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  {
                    title: "Competitive Benchmarking",
                    description: "Your coverage volume vs. top 3 competitors across any date range"
                  },
                  {
                    title: "Sentiment Analysis",
                    description: "Who's winning the perception battle? Track positive/negative coverage ratios"
                  },
                  {
                    title: "Industry Narrative Tracking",
                    description: "Monitor how your entire sector is being portrayed (Bitcoin mining sentiment down 15%, treasury narrative up 23%)"
                  },
                  {
                    title: "Board-Ready Deliverables",
                    description: "Export polished reports that answer \"How are we perceived?\" with hard data"
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

        {/* Impact */}
        <section className="py-24 sm:py-32 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <div className="text-5xl font-semibold text-slate-900 dark:text-white mb-2">
                    3 days
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    Reduced to 15 minutes
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-semibold text-slate-900 dark:text-white mb-2">
                    100%
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    Data-backed decisions
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-6">
                Ready to transform your executive reporting?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
                Start your 7-day free trial and see the difference data-backed intelligence makes.
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
