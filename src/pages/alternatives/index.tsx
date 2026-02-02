import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AsciiBlob from '@/components/AsciiBlob';

interface Alternative {
  slug: string;
  name: string;
  tagline: string;
  description: string;
}

const alternatives: Alternative[] = [
  {
    slug: 'lunarcrush-alternative',
    name: 'LunarCrush',
    tagline: 'Social + Media Combined',
    description: 'LunarCrush tracks social only. Perception tracks social plus 650+ media sources, regulatory intel, and conference transcripts.',
  },
  {
    slug: 'santiment-alternative',
    name: 'Santiment',
    tagline: 'Industry Intelligence',
    description: 'Santiment tracks coins for traders. Perception tracks the industry for knowledge workers and professionals.',
  },
  {
    slug: 'alternative-me-alternative',
    name: 'Alternative.me',
    tagline: 'Real-Time Transparency',
    description: 'Alternative.me updates every 4 hours. Perception updates every 90 seconds with full source transparency.',
  },
];

export default function AlternativesIndexPage() {
  return (
    <>
      <SEO
        title="Perception Alternatives & Comparisons | How We Compare"
        description="See how Perception compares to LunarCrush, Santiment, and Alternative.me. Find the right crypto sentiment tool for your needs."
        keywords={[
          'Perception alternatives',
          'crypto sentiment tools comparison',
          'LunarCrush vs Perception',
          'Santiment vs Perception',
          'Alternative.me vs Perception'
        ]}
        url="https://perception.to/alternatives"
      />

      <div className="min-h-screen bg-[#F0EEE6]">
        {/* Hero Section - Split Layout */}
        <section className="pt-32 pb-24 px-6 sm:px-16 lg:px-32">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left - ASCII Art Visual */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-black">
                  <AsciiBlob />
                  {/* Overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-white">{alternatives.length}</div>
                          <div className="text-white/60 text-sm">Comparisons</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-orange-400">Find Your</div>
                          <div className="text-white/60 text-sm">Best Fit</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div className="w-full lg:w-1/2">
                <div className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-2 text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  Tool Comparisons
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-black mb-6">
                  How Perception{' '}
                  <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Compares</em>
                </h1>

                <p className="text-lg sm:text-xl text-black/70 font-light leading-relaxed mb-8">
                  Different tools serve different needs. See how Perception stacks up against other crypto sentiment platforms.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-black/90 rounded-2xl px-8 py-6 text-base font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a href="/book-a-call">
                      Book a Demo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/80 text-black hover:bg-white rounded-2xl px-8 py-6 text-base font-semibold border-2 border-black/20 hover:border-black/30 transition-all duration-300"
                    asChild
                  >
                    <Link to="/compare/best-crypto-sentiment-tools">
                      See Full Comparison
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Alternatives List - Black */}
        <section className="py-24 px-6 sm:px-16 lg:px-32 bg-black">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-medium text-white text-center mb-4">
              Perception vs{' '}
              <em className="text-white" style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Competitors</em>
            </h2>
            <p className="text-center text-white/60 mb-16 max-w-2xl mx-auto">
              Detailed comparisons to help you choose the right tool
            </p>

            <div className="space-y-6">
              {alternatives.map((alt) => (
                <Link
                  key={alt.slug}
                  to={`/alternatives/${alt.slug}`}
                  className="group block bg-white/5 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-medium text-orange-400 uppercase tracking-wide">
                          vs {alt.name}
                        </span>
                      </div>
                      <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                        {alt.tagline}
                      </h3>
                      <p className="text-white/60">
                        {alt.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center text-white font-medium group-hover:text-orange-400 transition-colors">
                        Compare
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Cream */}
        <section className="py-24 px-6 sm:px-16 lg:px-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-medium text-black mb-6">
              Ready to try{' '}
              <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Perception</em>?
            </h2>
            <p className="text-xl text-black/60 mb-10">
              450+ sources. 90-second updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-black/90 rounded-2xl px-8 py-6 text-lg font-semibold shadow-2xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <a href="/book-a-call">
                  Book a Demo
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/80 text-black hover:bg-white rounded-2xl px-8 py-6 text-lg font-semibold border-2 border-black/20 hover:border-black/30 transition-all duration-300"
                asChild
              >
                <Link to="/pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
