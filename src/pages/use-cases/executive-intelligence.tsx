import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import AsciiDiagonalPetals from '@/components/AsciiDiagonalPetals';

const features = [
  { title: 'Set Up Watchlists Once', description: 'Track your company and top 3 competitors. We monitor 450+ sources automatically.' },
  { title: 'Organize in a Space', description: 'Create a "Board Prep" Space. All your competitive intel, sentiment data, and trend analysis lives there.' },
  { title: 'Generate with a Recipe', description: 'Click the Board Update Recipe. Get a ready-to-send report with competitive benchmarking, sentiment analysis, and full citations.' },
  { title: 'Update It Anytime', description: 'Next quarter? Same Space, click the Recipe again. Fresh data, same professional format.' }
];

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
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95 pt-28">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

          <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
            {/* Back Button - Above Cards */}
            <a href="/use-cases" className="inline-flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors mb-6 group bg-white/50 hover:bg-white px-4 py-2 rounded-full border border-black/10">
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
              <span>Back to Use Cases</span>
            </a>

            <div className="relative">
              <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8 min-h-[200px] lg:min-h-[600px]">
                {/* ASCII Art - Left Card */}
                <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[600px] hidden lg:block">
                  <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#000000' }}>
                    <AsciiDiagonalPetals />
                    <div className="absolute inset-0 flex flex-col items-center justify-between pointer-events-none px-8 py-12">
                      <div className="flex-1 flex items-center justify-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-white text-center leading-tight">
                          Executive Intelligence
                        </h1>
                      </div>
                      <div className="flex items-center gap-6 text-white/60 text-sm">
                        <span>Watchlists</span>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span>Spaces</span>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span>Recipes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content - Right Card */}
                <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:pl-8 lg:pr-12 py-8 sm:py-12 lg:py-16 flex flex-col justify-center rounded-3xl shadow-2xl" style={{ background: '#F0EEE6' }}>
                  <div className="w-full max-w-2xl">
                    <div className="mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                      <div className="inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
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
                        className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                        asChild
                      >
                        <a href="/book-a-call">
                          Book a Demo
                        </a>
                      </Button>
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-black hover:bg-white transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-black/20 hover:border-black/30 rounded-2xl"
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
        <section className="py-24 sm:py-32 bg-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-12">
                The challenge
              </h2>
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-3xl p-10 border border-white/10">
                <p className="text-xl sm:text-2xl md:text-3xl font-light text-white leading-relaxed">
                  Board meeting next week. They want competitive intel. You spend 3 days pulling coverage from different sources, building a deck from scratch, and it's outdated by the time you present it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section id="solution-section" className="py-24 sm:py-32 bg-[#F0EEE6]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-black mb-8">
                The solution
              </h2>
              <p className="text-xl text-black/60 leading-relaxed mb-16 font-light">
                Your intel is already organized. Just generate the report.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 border border-black/5 hover:shadow-lg transition-all duration-300">
                    <span className="text-5xl font-light text-black/10 block mb-4">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="text-xl font-semibold text-black mb-3">{feature.title}</h3>
                    <p className="text-black/60 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="py-24 sm:py-32 bg-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="bg-white/5 rounded-3xl p-10 border border-white/10 text-center">
                  <div className="text-5xl sm:text-6xl font-semibold text-white mb-4">
                    One click
                  </div>
                  <div className="text-white/50 text-lg">
                    Instead of 3 days
                  </div>
                </div>
                <div className="bg-white/5 rounded-3xl p-10 border border-white/10 text-center">
                  <div className="text-5xl sm:text-6xl font-semibold text-white mb-4">
                    Always fresh
                  </div>
                  <div className="text-white/50 text-lg">
                    Never outdated
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 bg-[#F0EEE6]">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-black mb-6">
              Ready to stop rebuilding board decks from scratch?
            </h2>
            <p className="text-xl text-black/50 mb-12 font-light">
              Set up watchlists once. Organize in a <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Space</em>. Generate reports with <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipes</em>.
            </p>
            <Button
              size="lg"
              className="bg-black text-white hover:bg-black/90 font-semibold px-10 py-7 text-lg rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
              asChild
            >
              <a href="/book-a-call">
                Book a Demo →
              </a>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}

export default ExecutiveIntelligencePage;
