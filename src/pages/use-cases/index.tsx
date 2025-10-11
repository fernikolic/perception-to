import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Newspaper, Target, TrendingUp } from 'lucide-react';
import SEO from '@/components/SEO';

export function UseCasesLanding() {
  const useCases = [
    {
      title: "Executive Intelligence",
      description: "Board-ready competitive intelligence reports in minutes",
      icon: BarChart3,
      href: "/use-cases/executive-intelligence",
      stats: "3 days → 15 minutes"
    },
    {
      title: "Stakeholder Communications",
      description: "Automated weekly stakeholder reports for public companies",
      icon: Newspaper,
      href: "/use-cases/stakeholder-communications",
      stats: "4+ hours/week → 5 minutes"
    },
    {
      title: "Data-Backed Journalism",
      description: "Turn insights into evidence with quantifiable intelligence",
      icon: TrendingUp,
      href: "/use-cases/journalism",
      stats: "Authority through data"
    },
    {
      title: "PR Agency Intelligence",
      description: "Data-driven precision for client performance and reporter targeting",
      icon: Target,
      href: "/use-cases/pr-agency",
      stats: "15+ hours saved/week"
    }
  ];

  return (
    <>
      <SEO
        title="Use Cases - Perception | Intelligence for Modern Professionals"
        description="See how executives, journalists, and PR professionals use Perception for data-backed intelligence. Save 15+ hours/week with crypto-specific insights."
        url="https://perception.to/use-cases"
        keywords={['crypto PR intelligence', 'Bitcoin sentiment analysis', 'executive intelligence reporting', 'stakeholder communications', 'PR agency tools', 'crypto journalism data']}
      />
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 sm:py-32 border-b border-slate-200 dark:border-slate-800">
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
                <div className="mx-auto max-w-3xl text-center">
                  <div className="mb-6">
                    <span className="inline-flex items-center rounded-full border border-black/30 bg-transparent px-4 py-1.5 text-xs font-medium text-black">
                      Use Cases
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-black mb-6">
                    Intelligence for information professionals
                  </h1>

                  <p className="text-lg sm:text-xl text-black/70 max-w-2xl mx-auto mb-10">
                    One platform. Four powerful applications. Built for those who turn data into decisions.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      className="bg-black text-white hover:bg-gray-900 px-8"
                      asChild
                    >
                      <a href="https://app.perception.to/auth/sign-up">
                        Start Free Trial
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-black/30 text-black hover:bg-black/5 px-8"
                      asChild
                    >
                      <a href="/book-a-call">Book a Demo</a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {useCases.map((useCase, index) => (
                <a
                  key={index}
                  href={useCase.href}
                  className="group relative bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 hover:border-slate-900 dark:hover:border-slate-100 transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <useCase.icon className="w-6 h-6 text-slate-900 dark:text-white" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">
                      {useCase.title}
                    </h3>

                    <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                      {useCase.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        {useCase.stats}
                      </span>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-white mb-6">
                Ready to get started?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10">
                Start your 7-day free trial. No credit card required.
              </p>
              <Button
                size="lg"
                className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-100 px-8"
                asChild
              >
                <a href="https://app.perception.to/auth/sign-up">
                  Start Free Trial
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
