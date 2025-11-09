import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart3, Newspaper, Target, TrendingUp } from 'lucide-react';
import SEO from '@/components/SEO';
import KaleidoscopeVariation3 from '@/components/KaleidoscopeVariation3';

export function UseCasesLanding() {
  const useCases = [
    {
      title: "Executive Intelligence",
      description: "Board wants competitive intel? Generate it from your Space with the Board Update Recipe",
      icon: BarChart3,
      href: "/use-cases/executive-intelligence",
      stats: "Ready-to-send reports"
    },
    {
      title: "Stakeholder Communications",
      description: "Weekly stakeholder updates generated from your monitoring, complete with citations",
      icon: Newspaper,
      href: "/use-cases/stakeholder-communications",
      stats: "One-click generation"
    },
    {
      title: "Data-Backed Journalism",
      description: "Back your stories with real sentiment data and trend analysis from 100+ sources",
      icon: TrendingUp,
      href: "/use-cases/journalism",
      stats: "Full source citations"
    },
    {
      title: "PR Agency Intelligence",
      description: "Track client coverage, monitor competitors, generate pitch intelligence for reporters",
      icon: Target,
      href: "/use-cases/pr-agency",
      stats: "All clients, one workspace"
    }
  ];

  return (
    <>
      <SEO
        title="Use Cases - Perception | Intelligence Workspace Applications"
        description="See how professionals use Perception's Intelligence Workspace. Track with watchlists, organize in Spaces, generate deliverables with Recipes. Executive intel, stakeholder comms, journalism, PR."
        url="https://perception.to/use-cases"
        keywords={['Bitcoin intelligence workspace', 'executive intelligence platform', 'stakeholder communications tool', 'PR intelligence platform', 'crypto journalism tools']}
      />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95 pt-16">
          {/* Base Gradient */}
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

          <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
            {/* Hero Card with Side-by-Side Layout */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row min-h-[600px]">
                {/* ASCII Art - Left Side (50%) */}
                <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
                  <KaleidoscopeVariation3 />
                </div>

                {/* Content - Right Side (50%) */}
                <div className="w-full lg:w-1/2 pl-6 sm:pl-8 lg:pl-2 pr-6 sm:pr-8 lg:pr-32 py-8 sm:py-12 lg:py-16 flex flex-col justify-center" style={{ background: '#F0EEE6' }}>
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
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-40"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-400"></span>
                          </span>
                          <span className="relative font-bold text-black">USE CASES</span>
                        </span>
                        <span className="ml-2.5 text-black/80">How it works</span>
                      </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-black mb-5 sm:mb-6 lg:mb-8 text-center lg:text-left">
                      Intelligence Workspace for Every{'\u00A0'}Professional
                    </h1>

                    <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                      <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/70 font-semibold mb-3">
                        Same workflow, different{'\u00A0'}deliverables.
                      </p>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                        Executives need board updates. PR teams need pitch intelligence. Journalists need data. Everyone uses the same Intelligence Workspace: watchlists, <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>, and{'\u00A0'}<em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipes</em>.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-6">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                        asChild
                      >
                        <a href="https://app.perception.to/auth/sign-up">
                          Start free trial
                        </a>
                      </Button>
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-black hover:bg-white transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-black/20 hover:border-black/30 rounded-2xl"
                        asChild
                      >
                        <a href="/book-a-call">Book a demo</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases Grid */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
              {useCases.map((useCase, index) => (
                <a
                  key={index}
                  href={useCase.href}
                  className="group relative bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-gray-900 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-4 sm:mb-6">
                      <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-100 border border-gray-200">
                        <useCase.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                      {useCase.title}
                    </h3>

                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 flex-grow">
                      {useCase.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200">
                      <span className="text-xs sm:text-sm font-semibold text-gray-900">
                        {useCase.stats}
                      </span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black mb-4 sm:mb-6 px-2">
                Ready to try the Intelligence Workspace?
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-10 px-2">
                7-day free trial. Set up watchlists, organize in <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>, generate with <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipes</em>.
              </p>
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-900 px-8 sm:px-10 lg:px-12 py-6 sm:py-7 text-base sm:text-lg lg:text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="https://app.perception.to/auth/sign-up">
                  Start free trial
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
