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
    <section className={`relative overflow-hidden py-16 sm:py-24 lg:py-32 ${backgroundClass || ''}`}>
      {/* Subtle radial background like homepage */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_50%)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Card with Background Image (matches homepage) */}
        <div className="relative rounded-2xl overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="/images/hero_image.avif"
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-3xl text-center">
              {/* Segment badge */}
              <div className="mb-6 sm:mb-8">
                <span className="inline-flex items-center rounded-full bg-transparent px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium leading-6 text-black ring-1 ring-inset ring-black/30 hover:ring-black/50 transition-all duration-300">
                  {segment === 'journalist' && 'For Content Creators'}
                  {segment === 'investor' && 'For Traders & Investors'}
                  {segment === 'researcher' && 'For Bitcoin Companies'}
                  {segment === 'companies' && 'For Bitcoin Companies'}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight text-black max-w-4xl mx-auto">
                {title}
              </h1>
              
              <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg xl:text-xl leading-6 sm:leading-7 lg:leading-8 text-black/70 font-light max-w-3xl mx-auto">
                {subtitle}
              </p>

              <div className="mt-6 sm:mt-8 lg:mt-10 flex items-center justify-center">
                <Button 
                  size="lg" 
                  className="bg-black text-white hover:bg-black/90 transition-all font-normal px-6 lg:px-8 text-sm sm:text-base shadow-lg hover:shadow-xl"
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