import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';
import { DemoModal, useDemoModal } from '@/components/demo-modal';

export function Hero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const { isOpen: isDemoOpen, openDemo, closeDemo } = useDemoModal();

  // Entrance animations
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Set initial states
    gsap.set([badgeRef.current, subtitleRef.current, ctaRef.current, imageRef.current], {
      opacity: 0,
      y: 30
    });

    // Animate in sequence
    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8 })
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to(imageRef.current, { opacity: 1, y: 0, duration: 1 }, '-=0.4');

    return () => {
      tl.kill();
    };
  }, []);


  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
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
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight text-white text-center px-6 leading-snug">
                    Board updates. Investor{'\u00A0'}briefs.<br />Competitive intel. Ready in{'\u00A0'}minutes.
                  </h1>
                  <div className="flex items-center gap-3 mt-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs sm:text-sm font-medium text-white/90">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
                      </svg>
                      Save 40+ hours/month
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs sm:text-sm font-medium text-white/90">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      $4,000+/month in consultant fees
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content - Right Side on Desktop, Top on Mobile (50%) */}
            <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:pl-12 lg:pr-12 py-10 sm:py-14 lg:py-20 flex flex-col justify-center items-center lg:items-start rounded-3xl shadow-2xl" style={{ background: '#F0EEE6' }}>
              <div className="w-full max-w-md lg:max-w-lg">
                <div ref={badgeRef} className="mb-6 sm:mb-8 text-center sm:text-left">
                <a
                  href="https://x.com/BTCPerception/status/1877387322724909419"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-black/60 hover:text-black/80 transition-colors"
                >
                  <span className="inline-flex items-center gap-1.5 bg-black/5 rounded px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-black/70 uppercase tracking-wide">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
                    Beta
                  </span>
                  <span>Now available</span>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              <div ref={subtitleRef} className="mb-8 sm:mb-10 text-center sm:text-left">
                <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-black/70 font-light">
                  Stop spending days assembling reports your stakeholders need tomorrow. Perception pulls from 650+ sources in Bitcoin, stablecoins, and tokenized finance, then generates fully cited deliverables on{'\u00A0'}demand.
                </p>
              </div>

              <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                  asChild
                >
                  <a href="https://app.perception.to/auth/sign-up">
                    Try it free
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="bg-white/80 backdrop-blur-sm text-black hover:bg-white transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-black/20 hover:border-black/30 rounded-2xl"
                  onClick={openDemo}
                >
                  Take the tour
                </Button>
              </div>

              {/* Sources to Delivery visual */}
              <div className="mt-10 sm:mt-12">
                <div className="flex items-center justify-center sm:justify-start gap-4 sm:gap-5">
                  {/* Source logos cluster */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex -space-x-2">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-black/10 flex items-center justify-center shadow-sm overflow-hidden">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/New_Bloomberg_Logo.svg/1200px-New_Bloomberg_Logo.svg.png" alt="Bloomberg" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                      </div>
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-black/10 flex items-center justify-center shadow-sm overflow-hidden">
                        <img src="https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/HIKBTSHOAFEFZNVVHQHMRCLVZA.jpg" alt="CoinDesk" className="w-5 h-5 sm:w-6 sm:h-6 object-cover rounded-full" />
                      </div>
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-black/10 flex items-center justify-center shadow-sm overflow-hidden">
                        <img src="https://cdn.icon-icons.com/icons2/2699/PNG/512/reuters_logo_icon_170782.png" alt="Reuters" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                      </div>
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white border border-black/10 flex items-center justify-center shadow-sm overflow-hidden">
                        <img src="https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png" alt="Reddit" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                      </div>
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/5 border border-black/10 flex items-center justify-center shadow-sm">
                        <span className="text-[10px] sm:text-xs font-semibold text-black/60">+646</span>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs text-black/50 font-medium">650+ sources</span>
                  </div>

                  {/* Arrow */}
                  <div className="flex items-center">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-black/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>

                  {/* Delivery icons with labels */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-white border border-black/10 shadow-sm">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
                          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
                          <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
                          <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
                          <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
                        </svg>
                      </div>
                      <span className="text-[10px] sm:text-xs text-black/50 font-medium">Slack</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-white border border-black/10 shadow-sm">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
                          <rect x="2" y="4" width="20" height="16" rx="2" fill="#0078D4"/>
                          <path d="M2 6l10 7 10-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="text-[10px] sm:text-xs text-black/50 font-medium">Email</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-xl bg-white border border-black/10 shadow-sm">
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="3" width="8" height="8" rx="2" fill="#F97316"/>
                          <rect x="13" y="3" width="8" height="8" rx="2" fill="#FB923C"/>
                          <rect x="3" y="13" width="8" height="8" rx="2" fill="#FDBA74"/>
                          <rect x="13" y="13" width="8" height="8" rx="2" fill="#F97316"/>
                        </svg>
                      </div>
                      <span className="text-[10px] sm:text-xs text-black/50 font-medium">App</span>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* As Featured In - Below the fold */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <p className="text-sm sm:text-base font-medium tracking-wider text-black/50 mb-8 sm:mb-10 text-center uppercase">
          As featured in
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 items-center justify-items-center gap-x-8 sm:gap-x-12 lg:gap-x-16 gap-y-8 sm:gap-y-10">
          <a
            href="https://cointelegraph.com/news/bitcoins-change-in-media-perception-from-0-to-100000-dollars"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 sm:h-14 lg:h-16 w-full items-center justify-center transition-all duration-300 hover:opacity-70"
          >
            <img
              className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-14 max-w-[95%] object-contain transition-all duration-300 group-hover:scale-105 brightness-0"
              src="/logos/Cointelegraph_Logo-removebg-preview.png"
              alt="Cointelegraph"
              loading="lazy"
            />
          </a>
          <a
            href="https://web.archive.org/web/20240904132826/https://www.forbes.com/sites/digital-assets/2024/09/04/bbc-bitcoin-coverage-raises-concern-over-its-journalism-and-trust/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 sm:h-14 lg:h-16 w-full items-center justify-center transition-all duration-300 hover:opacity-70"
          >
            <img
              className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-14 max-w-[95%] object-contain transition-all duration-300 group-hover:scale-105 brightness-0"
              src="/logos/Forbes-logo-white.png"
              alt="Forbes"
              loading="lazy"
            />
          </a>
          <a
            href="https://bitcoinmagazine.com/culture/left-leaning-outlets-amplify-their-anti-bitcoin-bias-following-trumps-endorsement-"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 sm:h-14 lg:h-16 w-full items-center justify-center transition-all duration-300 hover:opacity-70"
          >
            <img
              className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-14 max-w-[95%] object-contain transition-all duration-300 group-hover:scale-105 brightness-0"
              src="/logos/BTC_Mag_Logo-removebg-preview.png"
              alt="Bitcoin Magazine"
              loading="lazy"
            />
          </a>
          <a
            href="https://www.coindesk.com/markets/2026/01/05/asia-morning-briefing-data-shows-legacy-media-took-a-more-balanced-view-of-bitcoin-in-2025"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 sm:h-14 lg:h-16 w-full items-center justify-center transition-all duration-300 hover:opacity-70"
          >
            <img
              className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-14 max-w-[95%] object-contain transition-all duration-300 group-hover:scale-105 brightness-0"
              src="/logos/coindesk-logo-white.png"
              alt="CoinDesk"
              loading="lazy"
            />
          </a>
          <a
            href="https://youtu.be/UfJbn7nnPVw?t=5165"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 sm:h-14 lg:h-16 w-full items-center justify-center transition-all duration-300 hover:opacity-70"
          >
            <img
              className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-14 max-w-[95%] object-contain transition-all duration-300 group-hover:scale-105 rounded-md"
              src="/logos/petermccormack-logo.png"
              alt="The Peter McCormack Show"
              loading="lazy"
            />
          </a>
          <a
            href="https://youtu.be/AUf8gcPymyQ?si=_oAW-kZuS_MxiAT6"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 sm:h-14 lg:h-16 w-full items-center justify-center transition-all duration-300 hover:opacity-70"
          >
            <img
              className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-14 max-w-[95%] object-contain transition-all duration-300 group-hover:scale-105 rounded-md"
              src="/logos/roxomtv-logo.png"
              alt="RoxomTV"
              loading="lazy"
            />
          </a>
          <a
            href="https://www.youtube.com/watch?v=v-WFH0wctuM"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 sm:h-14 lg:h-16 w-full items-center justify-center transition-all duration-300 hover:opacity-70"
          >
            <img
              className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-14 max-w-[95%] object-contain transition-all duration-300 group-hover:scale-105 rounded-md"
              src="/logos/stephanlivera-logo.png"
              alt="Stephan Livera Podcast"
              loading="lazy"
            />
          </a>
          <a
            href="https://youtu.be/7mU5bi6Ho_I?si=pVOo_s-p01b7coX6"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 sm:h-14 lg:h-16 w-full items-center justify-center transition-all duration-300 hover:opacity-70"
          >
            <img
              className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-14 max-w-[95%] object-contain transition-all duration-300 group-hover:scale-105 rounded-md"
              src="/logos/bitcoinformillennials-logo.png"
              alt="Bitcoin for Millennials"
              loading="lazy"
            />
          </a>
          <a
            href="https://youtu.be/VDAl51v7BXU?t=139"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 sm:h-14 lg:h-16 w-full items-center justify-center transition-all duration-300 hover:opacity-70"
          >
            <img
              className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-14 max-w-[95%] object-contain transition-all duration-300 group-hover:scale-105 rounded-md"
              src="/logos/whatismoney-logo.png"
              alt="What is Money Show"
              loading="lazy"
            />
          </a>
          <a
            href="https://youtu.be/ybbAQdoxcTk?t=50"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex h-12 sm:h-14 lg:h-16 w-full items-center justify-center transition-all duration-300 hover:opacity-70"
          >
            <img
              className="h-auto w-auto max-h-10 sm:max-h-12 lg:max-h-14 max-w-[95%] object-contain transition-all duration-300 group-hover:scale-105 rounded-md"
              src="/logos/simplybitcoin-logo.png"
              alt="Simply Bitcoin"
              loading="lazy"
            />
          </a>
        </div>
      </div>

      {/* Demo Modal */}
      <DemoModal isOpen={isDemoOpen} onClose={closeDemo} />
    </div>
  );
}