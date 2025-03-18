import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useRef, useState } from 'react';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div 
      ref={heroRef}
      className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Glow Background */}
      <div 
        className="absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(
              1200px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(30, 58, 138, 0.08),
              transparent 40%
            )
          `,
        }}
      />

      {/* Base Gradient */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8">
            <a 
              href="https://x.com/BTCPerception/status/1877387322724909419" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex flex-col sm:flex-row items-center gap-3"
            >
              <span className="inline-flex items-center rounded-full bg-blue-950/10 px-3 py-1 text-sm font-semibold leading-6 text-blue-950 ring-1 ring-inset ring-blue-950/20">
                What's new
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-medium leading-6 text-foreground/60 group">
                <span>Beta now open</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-foreground">
            Track Bitcoin trends.
            <br />
            Decode market sentiment.
            <br />
            Uncover narratives.
            <br />
            All in one place.
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-foreground/60">
            <span className="text-blue-950 font-semibold dark:text-blue-400">Save hours</span> staying ahead of the Bitcoin market.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-blue-950 text-white hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all"
              asChild
            >
              <a href="https://app.perception.to/auth/sign-up">
                Join the Beta
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-blue-950/20 text-blue-950 hover:bg-blue-950/5 dark:border-blue-400/20 dark:text-blue-400 dark:hover:bg-blue-400/10 group"
              asChild
            >
              <a href="https://x.com/BTCPerception/status/1877387322724909419" target="_blank" rel="noopener noreferrer">
                Learn more{' '}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}