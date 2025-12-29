import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import SEO from '@/components/SEO';
import BouncingPointCloud from '@/components/BouncingPointCloud';

export function ExecutiveIntelligencePage() {
  return (
    <>
      <SEO
        title="Executive Intelligence Briefings - Perception | Intelligence Workspace"
        description="Board wants competitive intel? Generate it from your Space with the Board Update Recipe. Track with watchlists, organize in Spaces, deliver with one click."
        url="https://perception.to/use-cases/executive-intelligence"
        keywords={['executive intelligence workspace', 'board intelligence reports', 'competitive intelligence platform', 'executive deliverables', 'board update automation']}
      />
      <div className="min-h-screen bg-[#F0EEE6]">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95 pt-16">
          {/* Base Gradient */}
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

          <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
            <div className="relative">
              <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8 min-h-[200px] lg:min-h-[600px]">
                {/* ASCII Art - Left Card (Desktop only) */}
                <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[600px] hidden lg:block">
                  <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#000000' }}>
                    <BouncingPointCloud />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-white text-center px-8 leading-tight">
                        Executive<br />Intelligence
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Content - Right Card */}
                <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:pl-8 lg:pr-12 py-8 sm:py-12 lg:py-16 flex flex-col justify-center rounded-3xl shadow-2xl" style={{ background: '#F0EEE6' }}>
                  <div className="w-full max-w-2xl">
                    <div className="mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                      <a href="/use-cases" className="flex items-center text-sm text-black/70 hover:text-black mb-4">
                        ← Back to Use Cases
                      </a>
                      <div className="inline-flex items-center rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold leading-6"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-40"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400"></span>
                          </span>
                          <span className="font-bold text-black">USE CASE</span>
                        </span>
                        <span className="ml-2.5 text-black/80">For Executives</span>
                      </div>
                    </div>

                    <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-black mb-4">
                        Board wants competitive intel? It's already in your{'\u00A0'}<em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Space</em>.
                      </h2>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                        Set up watchlists for your company and competitors. Organize everything in a <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Space</em>. Generate board-ready reports with the Board Update{'\u00A0'}<em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipe</em>.
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
                        onClick={() => {
                          document.getElementById('solution-section')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Learn more
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* The Challenge */}
        <section className="py-24 sm:py-32 border-b border-white/10 bg-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50">The Challenge</span>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-white leading-relaxed">
                Board meeting next week. They want competitive intel. You spend 3 days pulling coverage from different sources, building a deck from scratch, and it's outdated by the time you present it.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section id="solution-section" className="py-24 sm:py-32 bg-[#F0EEE6]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12">
                <span className="text-xs font-semibold uppercase tracking-wider text-black/50 mb-4 block">The Solution</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
                  Your intel is already organized. Just generate the report.
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  {
                    title: "Set Up Watchlists Once",
                    description: "Track your company and top 3 competitors. We monitor 650+ sources automatically."
                  },
                  {
                    title: "Organize in a Space",
                    description: "Create a \"Board Prep\" Space. All your competitive intel, sentiment data, and trend analysis lives there."
                  },
                  {
                    title: "Generate with a Recipe",
                    description: "Click the Board Update Recipe. Get a ready-to-send report with competitive benchmarking, sentiment analysis, and full citations."
                  },
                  {
                    title: "Update It Anytime",
                    description: "Next quarter? Same Space, click the Recipe again. Fresh data, same professional format."
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-black/60">
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
        <section className="py-24 sm:py-32 border-b border-white/10 bg-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <div className="text-5xl font-semibold text-white mb-2">
                    One click
                  </div>
                  <div className="text-white/60">
                    Instead of 3 days
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-semibold text-white mb-2">
                    Always fresh
                  </div>
                  <div className="text-white/60">
                    Never outdated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 bg-[#F0EEE6]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
                Ready to stop rebuilding board decks from scratch?
              </h2>
              <p className="text-lg text-black/60 mb-10">
                Set up watchlists once. Organize in a <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Space</em>. Generate reports with <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipes</em>. 7-day free trial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-black/90 px-8 rounded-full"
                  asChild
                >
                  <a href="https://app.perception.to/auth/sign-up" className="flex items-center gap-2">
                    Start free trial
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-black/20 hover:border-black/30 px-8 rounded-full"
                  asChild
                >
                  <a href="/book-a-call">Book a demo</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
