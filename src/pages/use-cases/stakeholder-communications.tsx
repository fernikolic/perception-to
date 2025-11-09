import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';
import SEO from '@/components/SEO';
import PineconeDelicate from '@/components/PineconeDelicate';

export function StakeholderCommunicationsPage() {
  return (
    <>
      <SEO
        title="Stakeholder Communications - Perception | Intelligence Workspace"
        description="Weekly stakeholder updates generated from your monitoring, complete with citations. Track with watchlists, organize in Spaces, generate with Recipes."
        url="https://perception.to/use-cases/stakeholder-communications"
        keywords={['stakeholder communications platform', 'investor relations intelligence', 'shareholder update automation', 'IR communications tool']}
      />
      <div className="min-h-screen bg-white dark:bg-black">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95 pt-16">
          {/* Base Gradient */}
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

          <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
            {/* Hero Card with Side-by-Side Layout */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row min-h-[600px]">
                {/* Pinecone Delicate - Left Side (50%) */}
                <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
                  <PineconeDelicate />
                </div>

                {/* Content - Right Side (50%) */}
                <div className="w-full lg:w-1/2 pl-6 sm:pl-8 lg:pl-2 pr-6 sm:pr-8 lg:pr-56 py-8 sm:py-12 lg:py-16 flex flex-col justify-center" style={{ background: '#F0EEE6' }}>
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
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-40"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-400"></span>
                          </span>
                          <span className="relative font-bold text-black">USE CASE</span>
                        </span>
                        <span className="ml-2.5 text-black/80">For IR Teams</span>
                      </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-black mb-5 sm:mb-6 lg:mb-8 text-center lg:text-left">
                      Stakeholder{'\u00A0'}Communications
                    </h1>

                    <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                      <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/70 font-semibold mb-3">
                        Weekly stakeholder updates, generated with one{'\u00A0'}click.
                      </p>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                        Track your coverage in a <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Space</em>. Generate professional updates with the Stakeholder Communications <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipe</em>. Complete with{'\u00A0'}citations.
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
        <section className="py-24 sm:py-32 border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">The Challenge</span>
              </div>
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-900 leading-relaxed">
                Shareholders want weekly updates. You spend 4+ hours tracking mentions across different sources, pulling them into a document, and formatting it. Every single week.
              </p>
            </div>
          </div>
        </section>

        {/* The Solution */}
        <section id="solution-section" className="py-24 sm:py-32 bg-gray-50 border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="mb-12">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4 block">The Solution</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  The monitoring happens automatically. Just generate the update.
                </h2>
              </div>

              <div className="space-y-8">
                {[
                  {
                    title: "Set Up Watchlists Once",
                    description: "Track your company across 100+ sources. We monitor everything automatically."
                  },
                  {
                    title: "Organize in a Space",
                    description: "Create a \"Stakeholder Comms\" Space. All your coverage, sentiment data, and trend analysis lives there."
                  },
                  {
                    title: "Generate with a Recipe",
                    description: "Click the Stakeholder Communications Recipe. Get a professional update with all mentions, sentiment trends, and full citations."
                  },
                  {
                    title: "Send It Every Week",
                    description: "Next week? Same Space, click the Recipe again. Fresh coverage, same professional format. 5 minutes instead of 4 hours."
                  }
                ].map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
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
        <section className="py-24 sm:py-32 border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <div className="text-5xl font-semibold text-gray-900 mb-2">
                    5 minutes
                  </div>
                  <div className="text-gray-600">
                    Instead of 4+ hours
                  </div>
                </div>
                <div>
                  <div className="text-5xl font-semibold text-gray-900 mb-2">
                    Every week
                  </div>
                  <div className="text-gray-600">
                    Consistent updates
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
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Ready to stop spending 4+ hours on weekly updates?
              </h2>
              <p className="text-lg text-gray-600 mb-10">
                Track once, organize in a <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Space</em>, generate with a <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipe</em>. 7-day free trial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-900 px-8"
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
                  className="border-gray-300 px-8"
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
