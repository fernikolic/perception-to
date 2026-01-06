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
              Your competitors are still reading. You're already executing.
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/60">
              Every morning, your rivals spend 3 hours connecting dots across 650+ sources. You spend 10 minutes acting on opportunities we've already identified.
            </p>

            <p className="mt-4 text-xl font-semibold text-white">
              The intelligence platform that replaces your entire research team.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Button 
                size="lg" 
                asChild
                className="bg-white text-black hover:bg-white/90 transition-all"
              >
                <a href="https://app.perception.to/auth/sign-up">
                  Start 7-day trial
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/20 text-white hover:bg-white/10 group"
              >
                See actual opportunities{' '}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            {/* As Seen On section integrated into hero */}
            <div className="mt-16 sm:mt-20">
              <div className="text-center">
                <p className="text-sm font-medium tracking-wider text-white/60 mb-8">
                  As featured in
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-5 items-center justify-items-center gap-x-4 sm:gap-x-6 lg:gap-x-8 gap-y-4 sm:gap-y-6 lg:gap-y-8 max-w-5xl mx-auto">
                  <a
                    href="https://cointelegraph.com/news/bitcoins-change-in-media-perception-from-0-to-100000-dollars"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-14 sm:h-16 lg:h-20 w-full items-center justify-center transition-all duration-300 hover:opacity-100"
                  >
                    <img
                      className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-16 max-w-[90%] object-contain transition-all duration-300 group-hover:scale-105"
                      src="/logos/Cointelegraph_Logo-removebg-preview.png"
                      alt="Cointelegraph"
                      loading="lazy"
                    />
                  </a>
                  <a
                    href="https://web.archive.org/web/20240904132826/https://www.forbes.com/sites/digital-assets/2024/09/04/bbc-bitcoin-coverage-raises-concern-over-its-journalism-and-trust/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-14 sm:h-16 lg:h-20 w-full items-center justify-center transition-all duration-300 hover:opacity-100"
                  >
                    <img
                      className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-16 max-w-[90%] object-contain transition-all duration-300 group-hover:scale-105"
                      src="/logos/Forbes-logo-white.png"
                      alt="Forbes"
                      loading="lazy"
                    />
                  </a>
                  <a
                    href="https://bitcoinmagazine.com/culture/left-leaning-outlets-amplify-their-anti-bitcoin-bias-following-trumps-endorsement-"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-14 sm:h-16 lg:h-20 w-full items-center justify-center transition-all duration-300 hover:opacity-100"
                  >
                    <img
                      className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-16 max-w-[90%] object-contain transition-all duration-300 group-hover:scale-105"
                      src="/logos/BTC_Mag_Logo-removebg-preview.png"
                      alt="Bitcoin Magazine"
                      loading="lazy"
                    />
                  </a>
                  <a
                    href="https://www.coindesk.com/markets/2026/01/05/asia-morning-briefing-data-shows-legacy-media-took-a-more-balanced-view-of-bitcoin-in-2025"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-14 sm:h-16 lg:h-20 w-full items-center justify-center transition-all duration-300 hover:opacity-100"
                  >
                    <img
                      className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-16 max-w-[90%] object-contain transition-all duration-300 group-hover:scale-105"
                      src="/logos/coindesk-logo-white.png"
                      alt="CoinDesk"
                      loading="lazy"
                    />
                  </a>
                  <a
                    href="https://youtu.be/UfJbn7nnPVw?t=5165"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-14 sm:h-16 lg:h-20 w-full items-center justify-center transition-all duration-300 hover:opacity-100"
                  >
                    <img
                      className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-16 max-w-[90%] object-contain transition-all duration-300 group-hover:scale-105 rounded-lg"
                      src="/logos/petermccormack-logo.png"
                      alt="The Peter McCormack Show"
                      loading="lazy"
                    />
                  </a>
                  <a
                    href="https://youtu.be/AUf8gcPymyQ?si=_oAW-kZuS_MxiAT6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-14 sm:h-16 lg:h-20 w-full items-center justify-center transition-all duration-300 hover:opacity-100"
                  >
                    <img
                      className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-16 max-w-[90%] object-contain transition-all duration-300 group-hover:scale-105 rounded-lg"
                      src="/logos/roxomtv-logo.png"
                      alt="RoxomTV"
                      loading="lazy"
                    />
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=v-WFH0wctuM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-14 sm:h-16 lg:h-20 w-full items-center justify-center transition-all duration-300 hover:opacity-100"
                  >
                    <img
                      className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-16 max-w-[90%] object-contain transition-all duration-300 group-hover:scale-105 rounded-lg"
                      src="/logos/stephanlivera-logo.png"
                      alt="Stephan Livera Podcast"
                      loading="lazy"
                    />
                  </a>
                  <a
                    href="https://www.youtube.com/watch?v=7mU5bi6Ho_I"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-14 sm:h-16 lg:h-20 w-full items-center justify-center transition-all duration-300 hover:opacity-100"
                  >
                    <img
                      className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-16 max-w-[90%] object-contain transition-all duration-300 group-hover:scale-105 rounded-lg"
                      src="/logos/bitcoinformillennials-logo.png"
                      alt="Bitcoin for Millennials"
                      loading="lazy"
                    />
                  </a>
                  <a
                    href="https://youtu.be/VDAl51v7BXU?si=m3KmnypOJnUyH2H3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-14 sm:h-16 lg:h-20 w-full items-center justify-center transition-all duration-300 hover:opacity-100"
                  >
                    <img
                      className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-16 max-w-[90%] object-contain transition-all duration-300 group-hover:scale-105 rounded-lg"
                      src="/logos/whatismoney-logo.png"
                      alt="What is Money Show"
                      loading="lazy"
                    />
                  </a>
                  <a
                    href="https://www.youtube.com/@SimplyBitcoin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-14 sm:h-16 lg:h-20 w-full items-center justify-center transition-all duration-300 hover:opacity-100"
                  >
                    <img
                      className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-16 max-w-[90%] object-contain transition-all duration-300 group-hover:scale-105 rounded-lg"
                      src="/logos/simplybitcoin-logo.png"
                      alt="Simply Bitcoin"
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>
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