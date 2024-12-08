import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
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
      className="relative isolate min-h-[80vh] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Gradient Background */}
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

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex flex-col items-center gap-4 sm:flex-row">
            <div className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/5 px-4 py-1.5 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/10 hover:ring-white/20">
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.1),transparent)]" />
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold leading-6">What's new</span>
            </div>
            <a 
              href="#" 
              className="group inline-flex items-center space-x-2 text-sm font-medium leading-6 text-white/60 transition-colors hover:text-white"
            >
              <span>Just shipped v1.0</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl gradient-text">
            Streamline Your Workflow with Our SaaS Solution
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-white/60">
            Transform your business operations with our innovative platform. Boost productivity,
            enhance collaboration, and drive growth with our comprehensive suite of tools.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-white/90 transition-all"
              onClick={() => window.location.href = 'https://app.perception.to/auth/signup'}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white/20 text-white hover:bg-white/10 group"
            >
              Learn more{' '}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}