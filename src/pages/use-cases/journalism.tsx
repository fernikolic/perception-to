import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import SEO from '@/components/SEO';
import KaleidoscopeVariation3 from '@/components/KaleidoscopeVariation3';

export function JournalismPage() {
  return (
    <>
      <SEO
        title="Data-Backed Journalism - Perception | Intelligence Workspace"
        description="Back your stories with real sentiment data and trend analysis from 650+ sources. Track with watchlists, organize in Spaces, cite with confidence."
        url="https://perception.to/use-cases/journalism"
        keywords={['data journalism tools', 'Bitcoin journalism intelligence', 'crypto journalism data', 'media sentiment analysis', 'journalism research platform']}
      />
      <div className="min-h-screen bg-[#F0EEE6]">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95 pt-16">
          {/* Base Gradient */}
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

          <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
            {/* Hero Card with Side-by-Side Layout */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex flex-col-reverse lg:flex-row min-h-[200px] lg:min-h-[600px]">
                {/* Kaleidoscope Variation 3 - Left Side on Desktop, Hidden on Mobile (50%) */}
                <div className="w-full lg:w-1/2 relative min-h-[200px] lg:min-h-[600px] hidden lg:block">
                  <KaleidoscopeVariation3 />
                </div>

                {/* Content - Right Side on Desktop, Top on Mobile (50%) */}
                <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:pl-2 lg:pr-56 py-8 sm:py-12 lg:py-16 flex flex-col justify-center" style={{ background: '#F0EEE6' }}>
                  <div className="w-full max-w-2xl">
                    <div className="mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                      <a href="/use-cases" className="flex items-center text-sm text-black/70 hover:text-black mb-4">
                        ← Back to Use Cases
                      </a>
                      <div className="group relative inline-flex items-center rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold leading-6"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <span className="relative flex items-center gap-2">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-40"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400"></span>
                          </span>
                          <span className="relative font-bold text-black">USE CASE</span>
                        </span>
                        <span className="ml-2.5 text-black/80">For Journalists</span>
                      </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-black mb-5 sm:mb-6 lg:mb-8 text-center lg:text-left">
                      Data-Backed{'\u00A0'}Journalism
                    </h1>

                    <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                      <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/70 font-semibold mb-3">
                        Back your stories with real data from 650+{'\u00A0'}sources.
                      </p>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                        Track trends with watchlists. Organize research in <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>. Cite sentiment data and coverage volume with full source{'\u00A0'}attribution.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-6">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 rounded-full"
                        asChild
                      >
                        <a href="https://app.perception.to/auth/sign-up">
                          Start free trial
                        </a>
                      </Button>
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-black hover:bg-white transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-black/20 hover:border-black/30 rounded-full"
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
                You're covering Bitcoin adoption or a controversy. Editors want data. You don't have time to manually track coverage across 650+ sources. Generic social media sentiment doesn't cut it for serious reporting.
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
                  The data you need is already tracked. Just cite it.
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  {
                    title: "Track Trends Automatically",
                    description: "Set up watchlists for topics, companies, or people. We monitor 650+ sources. You get the data."
                  },
                  {
                    title: "Organize Your Research",
                    description: "Create a Space for each story. All your trend data, sentiment analysis, and coverage volume lives there."
                  },
                  {
                    title: "Cite With Confidence",
                    description: "\"Bitcoin adoption coverage is up 340% this quarter.\" Full source attribution. Real numbers, not opinions."
                  },
                  {
                    title: "Build Authority",
                    description: "You publish with data-backed reporting. Your competitors publish with hot takes. Readers know the difference."
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

        {/* Competitive Edge */}
        <section className="py-24 sm:py-32 border-b border-white/10 bg-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-relaxed">
                You publish with data.<br/>
                Your competitors publish with hot takes.<br/>
                Readers know the difference.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 bg-[#F0EEE6]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6">
                Ready to back your stories with real data?
              </h2>
              <p className="text-lg text-black/60 mb-10">
                Track with watchlists, organize in <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>, cite with confidence. 7-day free trial.
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
