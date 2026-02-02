import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';
import AsciiBinaryFlow from '@/components/AsciiBinaryFlow';

interface HeroSectionProps {
  segment: 'journalist' | 'investor' | 'researcher' | 'companies';
  title: ReactNode;
  subtitle: string;
  ctaText: string;
  backgroundClass?: string;
}

export function HeroSection({ segment, title, subtitle, ctaText, backgroundClass }: HeroSectionProps) {
  const segmentLabels = {
    journalist: 'For Content Creators',
    investor: 'For Traders & Investors',
    researcher: 'For Bitcoin Companies',
    companies: 'For Bitcoin Companies',
  };

  return (
    <section className={`relative overflow-hidden py-12 sm:py-20 lg:py-28 ${backgroundClass || ''}`}>
      {/* Subtle radial background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_50%)]" />

      <div className="mx-auto max-w-[1800px] px-6 sm:px-8 lg:px-12">
        {/* Hero Cards - Side by Side */}
        <div className="relative">
          <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8 min-h-[200px] lg:min-h-[600px]">
            {/* ASCII Art - Left Card (Desktop only) */}
            <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[600px] hidden lg:block">
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#000000' }}>
                <AsciiBinaryFlow />
                {/* Overlay text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-8">
                  <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-white text-center leading-tight">
                    {title}
                  </h1>
                </div>
              </div>
            </div>

            {/* Content - Right Card */}
            <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:pl-8 lg:pr-12 py-8 sm:py-12 lg:py-16 flex flex-col justify-center rounded-3xl shadow-2xl" style={{ background: '#F0EEE6' }}>
              <div className="w-full max-w-2xl">
                {/* Segment badge */}
                <div className="mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                  <div
                    className="inline-flex items-center rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold leading-6"
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
                      <span className="font-bold text-black">{segmentLabels[segment]}</span>
                    </span>
                  </div>
                </div>

                {/* Subtitle as heading */}
                <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-black mb-4">
                    {subtitle}
                  </h2>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-6">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                    asChild
                  >
                    <a href="/book-a-call">
                      {ctaText}
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
    </section>
  );
}