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
      className="relative isolate overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Glow Background */}
      <div 
        className="absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(
              1200px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(255,255,255,0.06),
              transparent 40%
            )
          `,
        }}
      />

      {/* Base Gradient */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8">
            <a 
              href="https://x.com/BTCPerception/status/1840527608863232426" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center space-x-2"
            >
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-semibold leading-6 text-gray-900 dark:text-white ring-1 ring-inset ring-white/20">
                What's new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600 dark:text-white/60">
                <span>Early Adopter Program now open</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl gradient-text">
            Track Bitcoin trends. Decode market sentiment. Uncover narratives. All in one place.

          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white/60">
            Save HOURS staying ahead of the Bitcoin market.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button 
              size="lg" 
              className="bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-white/90 transition-all"
              asChild
            >
              <a href="https://getformly.app/MoHB6K">
                Get started
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-gray-200 dark:border-white/20 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 group"
              asChild
            >
              <a href="/about">
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