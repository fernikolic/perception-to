import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';
import { BookDemoButton } from '@/components/calendar-modal';
import { ChevronDown } from 'lucide-react';

const sampleTemplates = [
  {
    title: 'Stakeholder Communications',
    description: 'Board-ready media briefings',
    url: '/sample-reports/stakeholder-communications'
  },
  {
    title: 'PR Pitch Intelligence',
    description: 'Journalist targeting & angles',
    url: '/sample-reports/pr-pitch-intelligence'
  },
  {
    title: 'Sector Deep Dive',
    description: 'Bloomberg-style comp analysis',
    url: '/sample-reports/sector-deep-dive'
  }
];

function SampleReportsDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = Math.min(Math.max(rect.width, 280), window.innerWidth - 32);
      const left = Math.min(rect.left, window.innerWidth - dropdownWidth - 16);
      setDropdownPosition({
        top: rect.bottom + 8,
        left: Math.max(16, left),
        width: dropdownWidth
      });
    }
  }, [isOpen]);

  const dropdown = isOpen && isMounted ? createPortal(
    <>
      <div
        className="fixed inset-0 z-[9998]"
        onClick={() => setIsOpen(false)}
      />
      <div
        className="fixed z-[9999] rounded-2xl shadow-2xl border border-black/10 overflow-hidden"
        style={{
          backgroundColor: '#FFFFFF',
          top: dropdownPosition.top,
          left: dropdownPosition.left,
          width: dropdownPosition.width
        }}
      >
        <div className="p-2" style={{ backgroundColor: '#FFFFFF' }}>
          {sampleTemplates.map((template, index) => (
            <a
              key={index}
              href={template.url}
              className="block p-4 rounded-xl hover:bg-gray-100 transition-colors"
              style={{ backgroundColor: 'transparent' }}
              onClick={() => setIsOpen(false)}
            >
              <div className="font-semibold text-black text-sm">{template.title}</div>
              <div className="text-gray-500 text-xs mt-0.5">{template.description}</div>
            </a>
          ))}
        </div>
      </div>
    </>,
    document.body
  ) : null;

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        size="lg"
        className="w-full sm:w-auto bg-white text-black hover:bg-gray-50 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-black/20 hover:border-black/30 rounded-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        See Sample Reports
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>
      {dropdown}
    </div>
  );
}

export function Hero() {
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Set initial states
    gsap.set([eyebrowRef.current, subtitleRef.current, ctaRef.current, statsRef.current], {
      opacity: 0,
      y: 30
    });

    // Animate in sequence
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8 })
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to(statsRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, []);


  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95 pt-16">
      {/* Base Gradient */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

      <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
        {/* Hero Card with Side-by-Side Layout */}
        <div className="relative">
          <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8 min-h-[200px] lg:min-h-[600px]">
            {/* ASCII Binary Flow - Left Side on Desktop, Bottom on Mobile (50%) */}
            <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[600px] hidden lg:block">
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#000000' }}>
                <DelicateAsciiDots />
                {/* Overlay text */}
                <div className="absolute inset-0 flex flex-col items-center justify-between pointer-events-none px-8 py-12">
                  {/* Title - centered in available space */}
                  <div className="flex-1 flex items-center justify-center">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight text-white text-center leading-snug">
                      Board Updates, Investor Briefs, Competitive Intel. Ready in{'\u00A0'}Minutes.
                    </h1>
                  </div>

                  {/* Sources & Delivery - at bottom */}
                  <div className="flex flex-col gap-6 w-full max-w-lg">
                    {/* Sources Row */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/70 mr-1 sm:mr-2 font-medium flex-shrink-0">From</span>
                      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
                        {/* X Logo */}
                        <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <img src="/source-logos/twitter-x.svg" alt="X" className="w-4 h-4 sm:w-5 sm:h-5 invert" />
                          </div>
                          <span className="text-[9px] sm:text-[10px] text-white/80 font-medium">X</span>
                        </div>
                        {/* Research */}
                        <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <img src="/source-logos/Galaxy_Logo_Black.png" alt="Research" className="w-5 h-5 sm:w-6 sm:h-6 object-contain invert" />
                          </div>
                          <span className="text-[9px] sm:text-[10px] text-white/80 font-medium">Research</span>
                        </div>
                        {/* CNBC Logo */}
                        <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <img src="/source-logos/CNBC_logo.svg" alt="CNBC" className="w-5 h-5 sm:w-6 sm:h-6 invert" />
                          </div>
                          <span className="text-[9px] sm:text-[10px] text-white/80 font-medium">News</span>
                        </div>
                        {/* Podcasts - Using a podcast brand logo */}
                        <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
                            <img src="/source-logos/podcast-logo.jpg" alt="Podcasts" className="w-8 h-8 sm:w-10 sm:h-10 object-cover" />
                          </div>
                          <span className="text-[9px] sm:text-[10px] text-white/80 font-medium">Podcasts</span>
                        </div>
                        {/* SEC Filings */}
                        <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <img src="/source-logos/sec-logo.png" alt="SEC" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                          </div>
                          <span className="text-[9px] sm:text-[10px] text-white/80 font-medium">Filings</span>
                        </div>
                        {/* Earnings Calls */}
                        <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                              <path d="M3 21h18v2H3z"/>
                            </svg>
                          </div>
                          <span className="text-[9px] sm:text-[10px] text-white/80 font-medium">Earnings</span>
                        </div>
                        {/* Conferences */}
                        <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          </div>
                          <span className="text-[9px] sm:text-[10px] text-white/80 font-medium">Conferences</span>
                        </div>
                      </div>
                      <span className="text-xs text-white/70 ml-1 sm:ml-2 font-medium flex-shrink-0 hidden sm:inline">+450 sources</span>
                    </div>

                    {/* Delivery Row */}
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs text-white/70 mr-1 sm:mr-2 font-medium flex-shrink-0">To</span>
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <img src="/source-logos/slack-color.svg" alt="Slack" className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <span className="text-[9px] sm:text-[10px] text-white/80 font-medium">Slack</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                            </svg>
                          </div>
                          <span className="text-[9px] sm:text-[10px] text-white/80 font-medium">Email</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                            </svg>
                          </div>
                          <span className="text-[9px] sm:text-[10px] text-white/80 font-medium">Dashboard</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 sm:gap-1.5 flex-shrink-0">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                            </svg>
                          </div>
                          <span className="text-[9px] sm:text-[10px] text-white/80 font-medium">API</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content - Right Side on Desktop, Top on Mobile (50%) */}
            <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:pl-12 lg:pr-12 py-10 sm:py-14 lg:py-20 flex flex-col justify-center items-center lg:items-start rounded-3xl shadow-2xl" style={{ background: '#F0EEE6' }}>
              <div className="w-full max-w-md lg:max-w-lg">
                <div ref={eyebrowRef} className="mb-6 sm:mb-8 text-center sm:text-left">
                  <a
                    href="https://x.com/BTCPerception/status/1877387322724909419"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-black/60 hover:text-black transition-colors group"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    Now in Beta
                    <span className="text-black/40 group-hover:text-black/60">Read the announcement</span>
                  </a>
                </div>

              <div ref={subtitleRef} className="mb-8 sm:mb-10 text-center sm:text-left">
                <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-black/70 font-light mb-4">
                  Get digital asset intelligence from 450+ sources across media, social, and earnings calls delivered to Slack, email, or your dashboard.
                </p>
                <p className="text-base sm:text-lg lg:text-xl font-medium text-black/90">
                  The research platform for professionals in digital assets, stablecoins, and tokenized{'\u00A0'}finance.
                </p>
              </div>

              <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <BookDemoButton className="px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base" />
                <SampleReportsDropdown />
              </div>

              {/* Stats Row */}
              <div ref={statsRef} className="mt-10 sm:mt-12">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-8">
                  <div className="flex flex-col items-center sm:items-start">
                    <span className="text-xl sm:text-3xl font-semibold text-black/90">700K+</span>
                    <span className="text-[10px] sm:text-sm text-black/50">data points indexed</span>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-black/10" />
                  <div className="flex flex-col items-center sm:items-start">
                    <span className="text-xl sm:text-3xl font-semibold text-black/90">450+</span>
                    <span className="text-[10px] sm:text-sm text-black/50">sources monitored</span>
                  </div>
                  <div className="hidden sm:block w-px h-10 bg-black/10" />
                  <div className="flex flex-col items-center sm:items-start">
                    <span className="text-xl sm:text-3xl font-semibold text-black/90">Real-time</span>
                    <span className="text-[10px] sm:text-sm text-black/50">updates</span>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Featured In */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <p className="text-sm sm:text-base font-medium tracking-wider text-black/50 mb-8 sm:mb-10 text-center uppercase">
          Data featured in
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 items-center justify-items-center gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-8 sm:gap-y-10">
          <a
            href="https://cointelegraph.com/news/bitcoin-legacy-media-sentiment-surged-2024"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center transition-all duration-300 hover:opacity-70"
          >
            <img
              className="w-32 sm:w-36 lg:w-40 h-auto object-contain transition-all duration-300 group-hover:scale-105 brightness-0"
              src="/logos/Cointelegraph Logo.png"
              alt="Cointelegraph"
              loading="lazy"
            />
          </a>
          <a
            href="https://www.coindesk.com/markets/2026/01/05/asia-morning-briefing-data-shows-legacy-media-took-a-more-balanced-view-of-bitcoin-in-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center transition-all duration-300 hover:opacity-70"
          >
            <img
              className="w-32 sm:w-36 lg:w-40 h-auto object-contain transition-all duration-300 group-hover:scale-105 brightness-0"
              src="/logos/coindesk-logo-white.png"
              alt="CoinDesk"
              loading="lazy"
            />
          </a>
          <a
            href="https://bitcoinmagazine.com/culture/left-leaning-outlets-amplify-their-anti-bitcoin-bias-following-trumps-endorsement-"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center transition-all duration-300 hover:opacity-70"
          >
            <img
              className="w-32 sm:w-36 lg:w-40 h-auto object-contain transition-all duration-300 group-hover:scale-105 brightness-0"
              src="/logos/BTC_Mag_Logo-removebg-preview.png"
              alt="Bitcoin Magazine"
              loading="lazy"
            />
          </a>
          <a
            href="https://web.archive.org/web/20240904132826/https://www.forbes.com/sites/digital-assets/2024/09/04/bbc-bitcoin-coverage-raises-concern-over-its-journalism-and-trust/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center transition-all duration-300 hover:opacity-70"
          >
            <img
              className="w-32 sm:w-36 lg:w-40 h-auto object-contain transition-all duration-300 group-hover:scale-105 brightness-0"
              src="/logos/Forbes-logo-white.png"
              alt="Forbes"
              loading="lazy"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
