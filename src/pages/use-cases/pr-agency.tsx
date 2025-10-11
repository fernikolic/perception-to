import { Button } from '@/components/ui/button';
import { ArrowRight, Check, BarChart3, Zap, Target } from 'lucide-react';
import SEO from '@/components/SEO';

export function PRAgencyPage() {
  return (
    <>
      <SEO
        title="PR Agency Intelligence - Perception"
        description="Stop guessing. Start targeting with data-driven precision. Track clients, generate pitch angles, and target reporters with intelligence."
        url="https://perception.to/use-cases/pr-agency"
        keywords={['PR agency tools', 'reporter intelligence', 'media monitoring', 'PR analytics', 'journalist targeting']}
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
                      PR Agency Intelligence & Opportunity Engine
                    </h1>
                    <p className="text-xl text-black/70">
                      Stop guessing. Start targeting with data-driven precision.
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
                You're drowning in manual research. Tracking client performance takes hours. Finding pitching angles feels like guesswork. You can't prove ROI beyond "here are your clips."
              </p>
            </div>
          </div>
        </section>

        {/* The Solution - Three Pillars */}
        <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="mb-16">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 block">The Solution</span>
                <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-6">
                  Your unfair PR advantage
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Client Performance Tracking */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-8 bg-white dark:bg-black">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-4">
                      <BarChart3 className="w-6 h-6 text-slate-900 dark:text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Client Performance Tracking
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="w-5 h-5 text-slate-900 dark:text-white flex-shrink-0" />
                      <span>Real-time dashboards</span>
                    </li>
                    <li className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="w-5 h-5 text-slate-900 dark:text-white flex-shrink-0" />
                      <span>Automated reporting</span>
                    </li>
                    <li className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="w-5 h-5 text-slate-900 dark:text-white flex-shrink-0" />
                      <span>Share of voice analysis</span>
                    </li>
                  </ul>
                </div>

                {/* Newsjacking */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-8 bg-white dark:bg-black">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-4">
                      <Zap className="w-6 h-6 text-slate-900 dark:text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                      Newsjacking & Pitch Angles
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="w-5 h-5 text-slate-900 dark:text-white flex-shrink-0" />
                      <span>Trend + client intersection</span>
                    </li>
                    <li className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="w-5 h-5 text-slate-900 dark:text-white flex-shrink-0" />
                      <span>AI-generated pitch angles</span>
                    </li>
                    <li className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Check className="w-5 h-5 text-slate-900 dark:text-white flex-shrink-0" />
                      <span>Real-time trending narratives</span>
                    </li>
                  </ul>
                </div>

                {/* Reporter Intelligence - Emphasized */}
                <div className="border-2 border-slate-900 dark:border-white rounded-2xl p-8 bg-slate-900 dark:bg-white">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-slate-800 mb-4">
                      <Target className="w-6 h-6 text-slate-900 dark:text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white dark:text-black mb-2">
                      Reporter Intelligence
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex gap-2 text-sm text-slate-300 dark:text-slate-700">
                      <Check className="w-5 h-5 text-white dark:text-black flex-shrink-0" />
                      <span>Track individual reporters</span>
                    </li>
                    <li className="flex gap-2 text-sm text-slate-300 dark:text-slate-700">
                      <Check className="w-5 h-5 text-white dark:text-black flex-shrink-0" />
                      <span>Sentiment per reporter</span>
                    </li>
                    <li className="flex gap-2 text-sm text-slate-300 dark:text-slate-700">
                      <Check className="w-5 h-5 text-white dark:text-black flex-shrink-0" />
                      <span>Coverage history analysis</span>
                    </li>
                    <li className="flex gap-2 text-sm text-slate-300 dark:text-slate-700">
                      <Check className="w-5 h-5 text-white dark:text-black flex-shrink-0" />
                      <span>Strategic targeting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example in Action */}
        <section className="py-24 sm:py-32 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 block">Example in Action</span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white mb-6">
                  Your client is a Bitcoin mining company. You want to pitch a sustainability story.
                </h2>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Bitcoin mining sustainability narrative is trending up 28% this week",
                  "12 reporters have covered mining in the past 30 days",
                  "4 of them have written positively about sustainability angles",
                  "Here are their contact details and coverage patterns",
                  "Here's your newsjacking angle based on this week's trends"
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 text-slate-600 dark:text-slate-400">
                    <Check className="w-5 h-5 text-slate-900 dark:text-white flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-xl font-light text-slate-900 dark:text-white text-center py-8 border-t border-b border-slate-200 dark:border-slate-800">
                That's not PR. That's intelligence-driven growth.
              </p>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="grid sm:grid-cols-3 gap-8">
                <div>
                  <div className="text-5xl font-semibold text-slate-900 dark:text-white mb-2">
                    15+
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    Hours saved per week
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-semibold text-slate-900 dark:text-white mb-2">
                    100%
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    Quantifiable ROI
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-semibold text-slate-900 dark:text-white mb-2">
                    3x
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    More targeted placements
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
                Transform your PR from guesswork to precision
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
                Start your 7-day free trial and experience intelligence-driven PR.
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
