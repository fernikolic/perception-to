import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface HeroSectionProps {
  segment: 'journalist' | 'investor' | 'researcher' | 'companies';
  title: ReactNode;
  subtitle: string;
  ctaText: string;
  backgroundClass?: string;
}

export function HeroSection({ segment, title, subtitle, ctaText, backgroundClass }: HeroSectionProps) {
  return (
    <section className={`relative overflow-hidden py-12 sm:py-20 lg:py-28 border-b border-slate-200 dark:border-slate-800 ${backgroundClass || ''}`}>
      {/* Subtle radial background like homepage */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Hero Card with Background Image (matches homepage) */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/images/hero_image.avif"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-24">
            <div className="mx-auto max-w-5xl text-center">
              {/* Segment badge */}
              <div className="mb-4 sm:mb-6">
                <span className="inline-flex items-center rounded-full bg-transparent border border-black/30 px-3 sm:px-4 py-1 sm:py-1.5 text-xs font-medium text-black">
                  {segment === 'journalist' && 'For Content Creators'}
                  {segment === 'investor' && 'For Traders & Investors'}
                  {segment === 'researcher' && 'For Bitcoin Companies'}
                  {segment === 'companies' && 'For Bitcoin Companies'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight sm:leading-[0.95] text-black mb-6 sm:mb-10 lg:mb-14 px-2">
                {title}
              </h1>

              <p className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-light leading-relaxed text-black/70 max-w-4xl mx-auto mb-8 sm:mb-12 px-2">
                {subtitle}
              </p>

              <div className="flex items-center justify-center px-2">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-black text-white hover:bg-gray-900 transition-all duration-300 font-semibold px-8 sm:px-10 lg:px-12 py-6 sm:py-7 text-base sm:text-lg lg:text-xl shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                  asChild
                >
                  <a href="https://app.perception.to/auth/sign-up">
                    {ctaText}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}