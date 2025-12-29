import { Button } from '@/components/ui/button';
import { ArrowRight, Check, BarChart3, Zap, Target } from 'lucide-react';
import SEO from '@/components/SEO';
import WavyYinYangNoDots from '@/components/WavyYinYangNoDots';

export function PRAgencyPage() {
  return (
    <>
      <SEO
        title="PR Agency Intelligence - Perception | Intelligence Workspace"
        description="Track client coverage, monitor competitors, generate pitch intelligence for reporters. All clients, one workspace. Organize in Spaces, generate with Recipes."
        url="https://perception.to/use-cases/pr-agency"
        keywords={['PR agency intelligence platform', 'reporter targeting tools', 'PR client monitoring', 'pitch intelligence', 'PR analytics workspace']}
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
                    <WavyYinYangNoDots />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-white text-center px-8 leading-tight">
                        PR Agency<br />Intelligence
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
                        <span className="ml-2.5 text-black/80">For PR Agencies</span>
                      </div>
                    </div>

                    <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-black mb-4">
                        All clients, one{'\u00A0'}workspace.
                      </h2>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                        Track client coverage in <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>. Monitor competitors. Generate pitch intelligence with <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipes</em>. Show ROI with{'\u00A0'}data.
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
                Client A wants coverage tracking. Client B needs competitive intel. Client C wants pitch angles. You're rebuilding decks from scratch for each one. Hours of manual research. ROI reports that say "here are your clips."
              </p>
            </div>
          </div>
        </section>

        {/* The Solution - Three Pillars */}
        <section id="solution-section" className="py-24 sm:py-32 bg-[#F0EEE6]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
              <div className="mb-16">
                <span className="text-xs font-semibold uppercase tracking-wider text-black/50 mb-4 block">The Solution</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
                  One workspace. All clients. All deliverables.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Track All Clients */}
                <div className="border border-black/10 rounded-2xl p-8 bg-white/50">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 mb-4">
                      <BarChart3 className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Track All Clients
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex gap-2 text-sm text-black/60">
                      <Check className="w-5 h-5 text-black flex-shrink-0" />
                      <span>Create a Space per client</span>
                    </li>
                    <li className="flex gap-2 text-sm text-black/60">
                      <Check className="w-5 h-5 text-black flex-shrink-0" />
                      <span>Monitor coverage automatically</span>
                    </li>
                    <li className="flex gap-2 text-sm text-black/60">
                      <Check className="w-5 h-5 text-black flex-shrink-0" />
                      <span>Track vs. competitors</span>
                    </li>
                  </ul>
                </div>

                {/* Generate Pitch Intelligence */}
                <div className="border border-black/10 rounded-2xl p-8 bg-white/50">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-500/30 mb-4">
                      <Zap className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Generate Pitch Intelligence
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex gap-2 text-sm text-black/60">
                      <Check className="w-5 h-5 text-black flex-shrink-0" />
                      <span>What reporters are covering</span>
                    </li>
                    <li className="flex gap-2 text-sm text-black/60">
                      <Check className="w-5 h-5 text-black flex-shrink-0" />
                      <span>What trends are heating up</span>
                    </li>
                    <li className="flex gap-2 text-sm text-black/60">
                      <Check className="w-5 h-5 text-black flex-shrink-0" />
                      <span>Where your client fits</span>
                    </li>
                  </ul>
                </div>

                {/* Show ROI with Data - Emphasized */}
                <div className="border-2 border-black rounded-2xl p-8 bg-black [&_*]:!text-white">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 border border-white/20 mb-4">
                      <Target className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Show ROI with Data
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex gap-2 text-sm">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>Coverage volume over time</span>
                    </li>
                    <li className="flex gap-2 text-sm">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>Sentiment analysis</span>
                    </li>
                    <li className="flex gap-2 text-sm">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>Competitive benchmarking</span>
                    </li>
                    <li className="flex gap-2 text-sm">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>Generate reports with Recipes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example in Action */}
        <section className="py-24 sm:py-32 border-b border-white/10 bg-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-4 block">Example</span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6">
                  Client wants coverage on sustainability. You need pitch angles.
                </h2>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  "Create a \"Bitcoin Mining Sustainability\" watchlist",
                  "We track coverage across 650+ sources automatically",
                  "See which reporters are covering it (with sentiment data)",
                  "Generate Pitch Intelligence Recipe for top reporters",
                  "Get angles based on what's actually trending this week"
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 text-white/70">
                    <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-xl font-light text-white text-center py-8 border-t border-b border-white/10">
                Same workspace. Every client. Every deliverable.
              </p>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="py-24 sm:py-32 bg-[#F0EEE6]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div>
                  <div className="text-5xl font-semibold text-black mb-2">
                    One workspace
                  </div>
                  <div className="text-black/60">
                    All clients
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-semibold text-black mb-2">
                    Real data
                  </div>
                  <div className="text-black/60">
                    Not "here are your clips"
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-semibold text-black mb-2">
                    One click
                  </div>
                  <div className="text-black/60">
                    Generated deliverables
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 bg-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to manage all clients in one workspace?
              </h2>
              <p className="text-lg text-white/60 mb-10">
                Track coverage in <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>, generate deliverables with <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipes</em>, show ROI with data. 7-day free trial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 px-8 rounded-full"
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
                  className="border-white/20 hover:border-white/30 text-white px-8 rounded-full"
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
