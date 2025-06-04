import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;
      
      const scrollPosition = window.scrollY;
      const tilt = Math.min(scrollPosition * 0.1, 3); // Max tilt of 3 degrees
      imageRef.current.style.transform = `perspective(1000px) rotateX(${tilt}deg)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
      {/* Base Gradient */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 sm:mb-8">
            <a 
              href="https://x.com/BTCPerception/status/1877387322724909419" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group inline-flex items-center rounded-full bg-blue-500/10 px-3 sm:px-4 py-1 text-sm font-medium leading-6 text-blue-500 ring-1 ring-inset ring-blue-500/20 hover:ring-blue-500/40 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <span className="relative">
                <span className="absolute -inset-1 rounded-full bg-blue-500/10 blur-sm group-hover:blur-md transition-all duration-300" />
                <span className="relative">NEW</span>
              </span>
              <span className="ml-2 text-blue-500/80 group-hover:text-blue-500 transition-colors duration-300">Announcing Beta</span>
              <svg className="ml-2 h-4 w-4 text-blue-500/60 group-hover:text-blue-500/80 transition-colors duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-normal tracking-tight text-foreground max-w-3xl mx-auto">
            Real-Time Sentiment & Trend Intelligence for Bitcoin, Stablecoins & Tokenized Finance
          </h1>
          
          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 text-foreground/60 font-light max-w-2xl mx-auto">
            Cut through the noise of fragmented media covering the future of finance. Get real-time intelligence from 200+ sources—all in one dashboard.{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600 font-medium">
              Save 3 hours daily
            </span>
            {' '}with narrative synthesis that professionals trust.
          </p>
          
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 transition-all font-normal px-6 sm:px-8"
              asChild
            >
              <a href="/pricing">
                Get Instant Access
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto border-foreground/20 text-foreground hover:bg-foreground/5 group font-normal"
              asChild
            >
              <a href="https://slack.com/oauth/v2/authorize?client_id=268627365575.8796942905360&scope=incoming-webhook,chat:write&redirect_uri=https://us-central1-triple-upgrade-245423.cloudfunctions.net/btcpApiFunction3-1/slack/oauth_redirect" target="_blank" rel="noopener noreferrer">
                Connect to Slack{' '}
                <img 
                  src="/logos/Slack_icon_2019.svg.png" 
                  alt="Slack logo" 
                  className="ml-2 h-5 w-5 inline-block"
                />
              </a>
            </Button>
          </div>
        </div>

        {/* Platform Image */}
        <div ref={imageRef} className="mt-12 sm:mt-16 lg:mt-24 relative w-screen -mx-4 sm:-mx-6 lg:-mx-32 transition-transform duration-300">
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src="/images/platform_interface.png"
              alt="Platform interface"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}