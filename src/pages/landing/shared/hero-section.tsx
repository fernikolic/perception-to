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
    <div className={`relative min-h-[70vh] overflow-hidden ${backgroundClass}`}>
      {/* Interactive Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(100,181,246,0.1),transparent_50%)]" />
      
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary ring-1 ring-inset ring-primary/20">
              {segment === 'journalist' && 'For Content Creators'}
              {segment === 'investor' && 'For Traders & Investors'}
              {segment === 'researcher' && 'For Bitcoin Companies'}
              {segment === 'companies' && 'For Bitcoin Companies'}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl gradient-text">
            {title}
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {subtitle}
          </p>
          
          <div className="mt-10 flex items-center justify-center">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
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
  );
}