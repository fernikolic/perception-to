import { Button } from '@/components/ui/button';
import SEO from '@/components/SEO';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';

const features = [
  { title: 'Track Trends Automatically', description: 'Set up watchlists for topics, companies, or people. We monitor 450+ sources. You get the data.' },
  { title: 'Organize Your Research', description: 'Create a Space for each story. All your trend data, sentiment analysis, and coverage volume lives there.' },
  { title: 'Cite With Confidence', description: '"Bitcoin adoption coverage is up 340% this quarter." Full source attribution. Real numbers, not opinions.' },
  { title: 'Build Authority', description: 'You publish with data-backed reporting. Your competitors publish with hot takes. Readers know the difference.' }
];

export function JournalismPage() {
  return (
    <>
      <SEO
        title="Data-Backed Journalism - Perception | Intelligence Workspace"
        description="Back your stories with real sentiment data and trend analysis from 450+ sources. Track with watchlists, organize in Spaces, cite with confidence."
        url="https://perception.to/use-cases/journalism"
        keywords={['data journalism tools', 'Bitcoin journalism intelligence', 'crypto journalism data', 'media sentiment analysis', 'journalism research platform']}
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
                    <DelicateAsciiDots />
                    <div className="absolute inset-0 flex flex-col items-center justify-between pointer-events-none px-8 py-12">
                      <div className="flex-1 flex items-center justify-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-white text-center leading-tight">
                          Data-Backed Journalism
                        </h1>
                      </div>
                      <div className="flex items-center gap-6 text-white/60 text-sm">
                        <span>Research</span>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span>Data</span>
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span>Citations</span>
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
                        <span className="ml-2.5 text-black/80">For Journalists</span>
                      </div>
                    </div>

                    <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-black mb-4">
                        Back your stories with real data from 650+{'\u00A0'}sources.
                      </h2>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                        Track trends with watchlists. Organize research in <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>. Cite sentiment data and coverage volume with full source{'\u00A0'}attribution.
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
                  You're covering Bitcoin adoption or a controversy. Editors want data. You don't have time to manually track coverage across 450+ sources. Generic social media sentiment doesn't cut it for serious reporting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured In Publications */}
        <section className="py-24 sm:py-32 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.03),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.02),transparent_50%)]" />

          <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
            <div className="text-center mb-16 sm:mb-20">
              <span className="inline-flex items-center rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60 ring-1 ring-white/10 mb-6">
                As seen in
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Perception data in the press
              </h2>
              <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto">
                Leading crypto publications cite our data to back their reporting
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {/* CoinDesk Card */}
              <a
                href="https://www.coindesk.com/markets/2026/01/05/asia-morning-briefing-data-shows-legacy-media-took-a-more-balanced-view-of-bitcoin-in-2025"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="mb-8">
                    <img
                      src="/logos/coindesk-logo-white.png"
                      alt="CoinDesk"
                      className="h-7 sm:h-8 w-auto brightness-0 invert"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="text-5xl sm:text-6xl font-serif text-white/20 leading-none mb-2">"</div>
                    <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed -mt-6 pl-2">
                      According to research by crypto intelligence platform Perception, mainstream media coverage of Bitcoin shifted toward neutrality in 2025.
                    </p>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 leading-tight">
                    Data shows legacy media took a more balanced view of bitcoin in 2025
                  </h3>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-sm text-white/40">January 2026</span>
                    <span className="flex items-center gap-2 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                      Read article
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </a>

              {/* Cointelegraph Card */}
              <a
                href="https://cointelegraph.com/news/bitcoins-change-in-media-perception-from-0-to-100000-dollars"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-3xl p-8 sm:p-10 border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="mb-8 h-7 sm:h-8 flex items-center">
                    <img
                      src="/logos/Cointelegraph Logo.png"
                      alt="Cointelegraph"
                      className="h-auto w-48 sm:w-56 object-contain object-left"
                    />
                  </div>
                  <div className="mb-6">
                    <div className="text-5xl sm:text-6xl font-serif text-white/20 leading-none mb-2">"</div>
                    <p className="text-lg sm:text-xl text-white/80 font-light leading-relaxed -mt-6 pl-2">
                      The article examines mainstream media's changing attitudes toward Bitcoin as it reaches the $100,000 milestone.
                    </p>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 leading-tight">
                    Bitcoin at $100K: How the media's perception has shifted since 2009
                  </h3>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-sm text-white/40">December 2024</span>
                    <span className="flex items-center gap-2 text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                      Read article
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </a>
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
                The data you need is already tracked. Just cite it.
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

        {/* Competitive Edge */}
        <section className="py-24 sm:py-32 bg-black">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
              <div className="bg-gradient-to-br from-white/[0.08] to-white/[0.02] rounded-3xl p-12 border border-white/10 text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-relaxed">
                  You publish with data.<br/>
                  Your competitors publish with hot takes.<br/>
                  <span className="text-white/50">Readers know the difference.</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 bg-[#F0EEE6]">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-black mb-6">
              Ready to back your stories with real data?
            </h2>
            <p className="text-xl text-black/50 mb-12 font-light">
              Track with watchlists, organize in <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>, cite with confidence.
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

export default JournalismPage;
