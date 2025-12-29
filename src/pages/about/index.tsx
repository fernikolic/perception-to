import { Linkedin } from 'lucide-react';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import AsciiBlob from '@/components/AsciiBlob';

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" 
      fill="currentColor"/>
  </svg>
);

const teamMembers = [
  {
    name: 'Fernando Nikolic',
    role: 'Founder',
    image: 'https://pbs.twimg.com/profile_images/1963063161327910912/YfHniRP3_400x400.jpg',
    bio: '15 years of experience in marketing and communications at leading tech and Bitcoin companies. Worked at Universal Music during torrents\' disruption of music | Ex VP at Blockstream during Bitcoin\'s disruption of finance.',
    social: {
      twitter: 'https://x.com/basedlayer',
      linkedin: 'https://www.linkedin.com/in/fernandonikolic/',
    },
  },
];

const milestones = [
  {
    year: '2024',
    title: 'Company Founded',
    description: 'Started with a vision to stop professionals from rebuilding deliverables from scratch every single time.',
  },
  {
    year: '2025',
    title: 'Beta Launch',
    description: 'Launched the Intelligence Workspace with Watchlists, Spaces, and Recipes. Early users are turning weeks of monitoring into ready-to-send outputs.',
  },
];

export function AboutPage() {
  return (
    <>
      <SEO
        title="About - Perception | Intelligence Workspace for Bitcoin & Stablecoins"
        description="Intelligence Workspace for Bitcoin, stablecoins, and tokenized finance. Track with watchlists, organize in Spaces, generate deliverables with Recipes. Meet our team."
        url="https://perception.to/about"
        keywords={['about Perception', 'Bitcoin intelligence workspace', 'stablecoin intelligence', 'market intelligence workspace', 'crypto intelligence team']}
      />
    <div className="min-h-screen bg-[#F0EEE6]">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95 pt-16">
        {/* Base Gradient */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

        <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
          {/* Hero Cards - Side by Side */}
          <div className="relative">
            <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8 min-h-[200px] lg:min-h-[600px]">
              {/* ASCII Art - Left Card (Desktop only) */}
              <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[600px] hidden lg:block">
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#000000' }}>
                  <AsciiBlob />
                  {/* Overlay text */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-white text-center px-8 leading-tight">
                      Intelligence Workspace<br />for New Finance
                    </h1>
                  </div>
                </div>
              </div>

              {/* Content - Right Card */}
              <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:pl-8 lg:pr-12 py-8 sm:py-12 lg:py-16 flex flex-col justify-center rounded-3xl shadow-2xl" style={{ background: '#F0EEE6' }}>
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
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-40"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400"></span>
                        </span>
                        <span className="relative font-bold text-black">ABOUT US</span>
                      </span>
                      <span className="ml-2.5 text-black/80">Our story</span>
                    </div>
                  </div>

                  <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-black mb-4">
                      From monitoring to deliverables in one{'\u00A0'}workflow.
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                      Track with watchlists, organize in <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>, generate with <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipes</em>. Built for professionals who need to create deliverables{'\u00A0'}constantly.
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
                        document.getElementById('mission-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      See the workspace
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section - Apple Style */}
      <section id="mission-section" className="py-12 sm:py-16 lg:py-24 bg-black">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white mb-4 sm:mb-6 px-2">
              Our Mission
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl leading-relaxed text-white/70 font-light">
                <p>
                  Stop starting from scratch every time you need to create a deliverable. Your board wants competitive intel? It's already organized in a <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Space</em>. Generate it with a <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipe</em>.
                </p>
                <p>
                  We monitor 650+ sources automatically. You set up watchlists for what matters. Everything gets organized into <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em> by project or stakeholder. Then you generate professional deliverables with one click.
                </p>
                <p>
                  Our goal is simple: turn weeks of monitoring into ready-to-send outputs. Board updates, pitch intelligence, sector deep dives. All with full citations.
                </p>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="aspect-square rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl lg:text-7xl font-thin text-orange-400 mb-3 sm:mb-4">650+</div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-light text-white/70">sources monitored</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Apple Style */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-4 sm:mb-6 px-2">
              Meet Our Founder
            </h2>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light text-black/60 max-w-3xl mx-auto px-2">
              15 years in marketing and communications at leading tech and Bitcoin companies.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-black rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden">
              <div className="p-6 sm:p-10 lg:p-12 text-center">
                <div className="relative inline-block mb-6 sm:mb-8">
                  <img
                    src={teamMembers[0].image}
                    alt={teamMembers[0].name}
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover"
                  />
                </div>

                <h3 className="text-2xl sm:text-3xl font-light text-white mb-2">
                  {teamMembers[0].name}
                </h3>
                <p className="text-base sm:text-lg font-light text-white/60 mb-4 sm:mb-6">
                  {teamMembers[0].role}
                </p>
                <p className="text-base sm:text-lg font-light text-white/70 leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto">
                  {teamMembers[0].bio}
                </p>

                <div className="flex justify-center gap-4">
                  <a
                    href={teamMembers[0].social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 text-white"
                  >
                    <XIcon />
                  </a>
                  <a
                    href={teamMembers[0].social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-200 text-white"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Apple Style */}
      <section className="py-12 sm:py-16 lg:py-24 bg-black">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white mb-4 sm:mb-6 px-2">
              Our Journey
            </h2>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light text-white/60 max-w-4xl mx-auto px-2">
              From founding to beta launch, building the Intelligence Workspace professionals actually need.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative">
                  <div className="bg-white/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-orange-500 text-white mb-4 sm:mb-6">
                        <span className="text-xl sm:text-2xl font-light">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-light text-white mb-3 sm:mb-4">
                        {milestone.title}
                      </h3>
                      <p className="text-base sm:text-lg font-light text-white/70 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Apple Style */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-6 sm:mb-8 px-2">
              Ready to stop starting from scratch?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light text-black/60 mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
              Set up watchlists, organize in <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>, generate with <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipes</em>. 7-day free trial.
            </p>
            <a
              href="https://app.perception.to/auth/sign-up"
              className="inline-flex items-center justify-center px-8 sm:px-10 lg:px-12 py-6 sm:py-7 text-base sm:text-lg lg:text-xl font-semibold text-white bg-black rounded-full hover:bg-black/90 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Start free trial
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}