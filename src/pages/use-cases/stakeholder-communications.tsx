import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import AsciiBlob from '@/components/AsciiBlob';

const features = [
  { title: 'Set Up Watchlists Once', description: 'Track your company across 450+ sources. We monitor everything automatically.' },
  { title: 'Organize in a Space', description: 'Create a "Stakeholder Comms" Space. All your coverage, sentiment data, and trend analysis lives there.' },
  { title: 'Generate with a Recipe', description: 'Click the Stakeholder Communications Recipe. Get a professional update with all mentions, sentiment trends, and full citations.' },
  { title: 'Send It Every Week', description: 'Next week? Same Space, click the Recipe again. Fresh coverage, same professional format.' }
];

export function StakeholderCommunicationsPage() {
  return (
    <>
      <SEO
        title="Stakeholder Communications - Perception | Intelligence Workspace"
        description="Weekly stakeholder updates generated from your monitoring, complete with citations. Track with watchlists, organize in Spaces, generate with Recipes."
        url="https://perception.to/use-cases/stakeholder-communications"
        keywords={['stakeholder communications platform', 'investor relations intelligence', 'shareholder update automation', 'IR communications tool']}
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
                    <AsciiBlob />
                    <div className="absolute inset-0 flex flex-col items-center justify-between pointer-events-none px-8 py-12">
                      <div className="flex-1 flex items-center justify-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-white text-center leading-tight">
                          Stakeholder Communications
                        </h1>
                      </div>
                      <div className="flex items-center gap-6 text-white/60 text-sm">
                        <span>Track</span>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span>Organize</span>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span>Generate</span>
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
                        <span className="ml-2.5 text-black/80">For IR Teams</span>
                      </div>
                    </div>

                    <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-black mb-4">
                        Weekly stakeholder updates, generated with one{'\u00A0'}click.
                      </h2>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                        Track your coverage in a <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Space</em>. Generate professional updates with the Stakeholder Communications <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipe</em>. Complete with{'\u00A0'}citations.
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
                  Shareholders want weekly updates. You spend 4+ hours tracking mentions across different sources, pulling them into a document, and formatting it. Every single week.
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
                The monitoring happens automatically. Just generate the update.
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
                    5 minutes
                  </div>
                  <div className="text-white/50 text-lg">
                    Instead of 4+ hours
                  </div>
                </div>
                <div className="bg-white/5 rounded-3xl p-10 border border-white/10 text-center">
                  <div className="text-5xl sm:text-6xl font-semibold text-white mb-4">
                    Every week
                  </div>
                  <div className="text-white/50 text-lg">
                    Consistent updates
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
              Ready to stop spending 4+ hours on weekly updates?
            </h2>
            <p className="text-xl text-black/50 mb-12 font-light">
              Track once, organize in a <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Space</em>, generate with a <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipe</em>.
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

export default StakeholderCommunicationsPage;
