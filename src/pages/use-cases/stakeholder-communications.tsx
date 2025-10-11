import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import SEO from '@/components/SEO';

export function StakeholderCommunicationsPage() {
  return (
    <>
      <SEO
        title="Stakeholder Communications - Perception"
        description="Automated weekly stakeholder reports for public companies. Keep shareholders informed with minimal effort."
        url="https://perception.to/use-cases/stakeholder-communications"
        keywords={['stakeholder communications', 'investor relations', 'shareholder reports', 'public company reporting']}
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
                      Stakeholder Communications
                    </h1>
                    <p className="text-xl text-black/70">
                      Automated weekly stakeholder reports for public companies
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
                Your shareholders and stakeholders want regular updates on your media presence, but your team wastes hours each week manually tracking mentions and compiling coverage summaries.
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
                  Automated weekly/monthly stakeholder reports
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  {
                    title: "One-Click Coverage Summaries",
                    description: "Every article, podcast, and mention about your company in your selected timeframe"
                  },
                  {
                    title: "Pre-Made Newsletter Templates",
                    description: "Professional formatting, ready to send to stakeholders"
                  },
                  {
                    title: "Perception Trends",
                    description: "Show stakeholders not just what was said, but how sentiment is trending over time"
                  },
                  {
                    title: "5-Minute Execution",
                    description: "From login to published newsletter"
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
                    4+ hours
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    Saved per week
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-semibold text-slate-900 dark:text-white mb-2">
                    5 min
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    From data to delivery
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
                Consistent communication without the burden
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
                Start your 7-day free trial and automate your stakeholder reporting.
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
