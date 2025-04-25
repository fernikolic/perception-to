import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { NetworkAnimation } from './network-animation';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<NetworkAnimation>();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (!canvasRef.current) return;
    
    animationRef.current = new NetworkAnimation(canvasRef.current);

    const handleResize = () => {
      if (canvasRef.current && animationRef.current) {
        animationRef.current.resize(canvasRef.current);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      animationRef.current?.destroy();
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative isolate min-h-[80vh] overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          opacity: 0.7,
          background: 'transparent',
        }}
      />
      
      <div 
        className="absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(
              1200px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(255,255,255,0.12),
              transparent 10%
            )
          `,
        }}
      />

      <div className="w-full px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          <div className="flex flex-col items-start w-full lg:w-1/2">
            <div className="mb-8 flex flex-col sm:flex-row items-start gap-4">
              <div className="relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/10 hover:ring-white/20">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.12),transparent)]" />
                <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-semibold leading-6">Limited Time</span>
              </div>
              <a 
                href="#" 
                className="group inline-flex items-center space-x-2 text-sm font-medium leading-6 text-white/60 transition-colors hover:text-white"
              >
                <span>Early Adopter Program - Join Now</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            
            <h1 className="text-4xl font-extralight tracking-tight sm:text-hero gradient-text">
              Unlock the Power of Bitcoin Market Intelligence
            </h1>
            
            <p className="mt-6 text-lg leading-8 text-white/60">
              <span className="text-blue-950 font-semibold dark:text-blue-400">Save 10+ hours weekly</span> with AI-powered insights that help you make smarter decisions in Bitcoin.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Button 
                size="lg" 
                asChild
                className="bg-white text-black hover:bg-white/90 transition-all"
              >
                <a href="/pricing">
                  Get Early Access
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/20 text-white hover:bg-white/10 group"
              >
                See How It Works{' '}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            {/* Right side content will go here */}
          </div>
        </div>
      </div>
    </div>
  );
}