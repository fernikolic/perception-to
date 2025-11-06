import { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { TweetCard } from '@/components/testimonials/tweet-card';
import { testimonials } from '@/components/testimonials/testimonials-data';

// TypeScript declarations for GhostSignupForm
declare global {
  interface Window {
    GhostSignupForm?: {
      init: (config: {
        site: string;
        elementId: string;
        buttonColor: string;
        buttonTextColor: string;
        locale: string;
      }) => void;
    };
  }
}


const companies = [
  { name: 'Swan', logo: '/logos/Swan Logo.webp' },
  { name: 'Block', logo: '/logos/Block logo.png' },
  { name: 'Cointelegraph', logo: '/logos/Cointelegraph Logo.png' },
  { name: 'Forbes', logo: '/logos/forbes logo.png' },
  { name: 'CoinShares', logo: '/logos/CoinShares_Logo.webp' },
  { name: 'Fidelity', logo: '/logos/fidelity-logo-PNG.webp' }
];

// Select a few key tweets for the testimonials
const selectedTweets = [
  testimonials.find(t => t.author.name === "Jameson Lopp"),
  testimonials.find(t => t.author.name === "Tuur Demeester"),
  testimonials.find(t => t.author.name === "Cointelegraph")
].filter(Boolean);

export function BitcoinMediaResearchPage() {
  const heroSignupRef = useRef<HTMLDivElement>(null);
  const ctaSignupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scripts: HTMLScriptElement[] = [];
    let timeoutId: NodeJS.Timeout | null = null;

    const initializeSignupForms = () => {
      const initializeForm = (ref: React.RefObject<HTMLDivElement>) => {
        if (!ref.current) return;
        
        try {
          // Clear any existing content
          ref.current.innerHTML = '';
          
          // Create and configure the script
          const formScript = document.createElement('script');
          formScript.src = 'https://cdn.jsdelivr.net/ghost/signup-form@~0.2/umd/signup-form.min.js';
          formScript.async = true;
          formScript.setAttribute('data-button-color', '#000000');
          formScript.setAttribute('data-button-text-color', '#FFFFFF');
          formScript.setAttribute('data-site', 'https://bitcoinperception.com/');
          formScript.setAttribute('data-locale', 'en');
          
          // Add error handling for the script
          formScript.onerror = () => {
            console.warn('Failed to load Ghost signup form script');
          };
          
          // Ensure the parent element still exists before appending
          if (ref.current && ref.current.parentNode) {
            ref.current.appendChild(formScript);
            scripts.push(formScript);
          }
        } catch (error) {
          console.warn('Error initializing Ghost signup form:', error);
        }
      };

      initializeForm(heroSignupRef);
      initializeForm(ctaSignupRef);
    };

    // Use a small delay to ensure DOM is ready and avoid React StrictMode conflicts
    timeoutId = setTimeout(initializeSignupForms, 100);

    return () => {
      // Cleanup function
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      scripts.forEach(script => {
        if (script?.parentNode) {
          try {
            script.parentNode.removeChild(script);
          } catch (error) {
            // Ignore cleanup errors
          }
        }
      });
      
      // Clear the signup containers if they still exist
      [heroSignupRef, ctaSignupRef].forEach(ref => {
        if (ref.current) {
          try {
            ref.current.innerHTML = '';
          } catch (error) {
            // Ignore cleanup errors
          }
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section with Background Image Card */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="/images/hero_image.avif"
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-24">
              <div className="mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="mb-4 sm:mb-6 lg:mb-10">
              <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold tracking-wide text-gray-800">
                Join 2,000+ subscribers
              </span>
            </div>

            {/* Bold hero title */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight sm:leading-[0.95] text-white mb-6 sm:mb-10 lg:mb-14 max-w-4xl mx-auto px-2">
              Unlock insights into Bitcoin media{'\u00A0'}trends and{'\u00A0'}bias
            </h1>
            
            {/* Signup Form Section */}
            <div className="mb-8 sm:mb-12">
              <div className="max-w-md mx-auto px-2">
                <div
                  ref={heroSignupRef}
                  className="signup-form-container [&_input]:!text-sm [&_input]:sm:!text-base [&_button]:!text-sm [&_button]:sm:!text-base [&_button]:!px-4 [&_button]:sm:!px-8"
                  style={{
                    minHeight: '56px',
                    maxWidth: '440px',
                    margin: '0 auto',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                />
              </div>
            </div>

            {/* Company list as subtitle */}
            <div className="mb-8 sm:mb-10 lg:mb-12 max-w-5xl mx-auto">
              <p className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-light leading-relaxed text-white/90 mb-4 sm:mb-6 px-2">
                Read by industry professionals from
              </p>
              {/* Carousel - all companies with improved styling */}
              <div className="relative overflow-hidden">
                <div className="flex items-center gap-x-2 sm:gap-x-4" style={{
                  animation: 'scroll-seamless 20s linear infinite'
                }}>
                  {/* First set of logos */}
                  {companies.map((company) => (
                    <div key={`${company.name}-1`} className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 sm:py-3 min-h-[50px] sm:min-h-[70px] min-w-[90px] sm:min-w-[120px] flex-shrink-0">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className={`${
                          company.name === 'Fidelity'
                            ? 'h-6 sm:h-10'
                            : 'h-8 sm:h-14'
                        } w-auto object-contain opacity-90 hover:opacity-100 transition-opacity ${
                          company.name === 'Block' || company.name === 'CoinShares' || company.name === 'Fidelity' || company.name === 'Swan'
                            ? 'filter-none'
                            : 'filter brightness-0 invert'
                        }`}
                      />
                    </div>
                  ))}
                  {/* Second set of logos for seamless loop */}
                  {companies.map((company) => (
                    <div key={`${company.name}-2`} className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 sm:py-3 min-h-[50px] sm:min-h-[70px] min-w-[90px] sm:min-w-[120px] flex-shrink-0">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className={`${
                          company.name === 'Fidelity'
                            ? 'h-6 sm:h-10'
                            : 'h-8 sm:h-14'
                        } w-auto object-contain opacity-90 hover:opacity-100 transition-opacity ${
                          company.name === 'Block' || company.name === 'CoinShares' || company.name === 'Fidelity' || company.name === 'Swan'
                            ? 'filter-none'
                            : 'filter brightness-0 invert'
                        }`}
                      />
                    </div>
                  ))}
                  {/* Third set of logos for extra smooth transition */}
                  {companies.map((company) => (
                    <div key={`${company.name}-3`} className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-4 py-2 sm:py-3 min-h-[50px] sm:min-h-[70px] min-w-[90px] sm:min-w-[120px] flex-shrink-0">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className={`${
                          company.name === 'Fidelity'
                            ? 'h-6 sm:h-10'
                            : 'h-8 sm:h-14'
                        } w-auto object-contain opacity-90 hover:opacity-100 transition-opacity ${
                          company.name === 'Block' || company.name === 'CoinShares' || company.name === 'Fidelity' || company.name === 'Swan'
                            ? 'filter-none'
                            : 'filter brightness-0 invert'
                        }`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Add CSS for the scrolling animation */}
              <style dangerouslySetInnerHTML={{
                __html: `
                  @keyframes scroll-seamless {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(calc(-100% / 3));
                    }
                  }
                `
              }} />
              <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg font-light text-white/70">and many more</p>
            </div>

            {/* Author credentials with image */}
            <div className="mb-8 sm:mb-12 lg:mb-16 max-w-3xl mx-auto px-2">
              <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-8 lg:p-10 shadow-lg">
                <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 lg:gap-8">
                  <img
                    src="/images/Fernando Nikolic.png"
                    alt="Fernando Nikolić"
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full ring-2 ring-gray-100 shadow-md flex-shrink-0"
                  />
                  <div className="text-center sm:text-left">
                    <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light leading-relaxed text-gray-700 mb-1 sm:mb-2">
                      From <span className="font-semibold text-gray-900">Fernando Nikolić</span>, Founder
                    </p>
                    <p className="text-xs sm:text-sm lg:text-base xl:text-lg font-light leading-relaxed text-gray-600">
                      Former Universal Music during torrents' disruption of music.
                      <br className="hidden sm:block" />
                      <span className="sm:hidden"> </span>
                      Ex VP at Blockstream during Bitcoin's disruption of finance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            </div>
          </div>
        </div>
      </div>
      </section>


      {/* Tweet Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-br from-gray-50/50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="mx-auto max-w-4xl text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight sm:leading-[1.05] text-gray-900 mb-4 sm:mb-6 lg:mb-10 px-2">
              What people are saying
            </h2>
            <p className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-light leading-relaxed text-gray-600 px-2">
              Bitcoin professionals and enthusiasts share their thoughts on our research.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {selectedTweets.map((testimonial, index) => (
              <div key={index} className="h-full">
                <TweetCard author={testimonial!.author} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 sm:py-24 lg:py-40 bg-black">
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-12">
          <div className="text-center">
            <h2 style={{ color: '#ffffff' }} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight sm:leading-[1.05] mb-6 sm:mb-10 lg:mb-12 !text-white px-2">
              Stay ahead of Bitcoin's coverage
            </h2>
            <p className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-light leading-relaxed text-white/80 mb-8 sm:mb-12 lg:mb-16 max-w-3xl mx-auto px-2">
              Get cutting-edge research and analyses that can transform your understanding of the Bitcoin media landscape.
            </p>

            {/* Enhanced Second Signup Form */}
            <div
              ref={ctaSignupRef}
              className="flex justify-center [&>div]:!bg-transparent [&>div]:!border-0 [&>div]:!shadow-none [&>div]:!p-0 [&_input]:!border-0 [&_input]:!bg-gray-50/50 [&_input]:!rounded-lg [&_input]:!text-sm [&_input]:sm:!text-base [&_button]:!bg-black [&_button]:!rounded-lg [&_button]:!font-medium [&_button]:!px-4 [&_button]:sm:!px-8 [&_button]:!text-sm [&_button]:sm:!text-base [&_button]:hover:!bg-gray-800 [&_button]:!transition-colors [&_p]:!hidden [&_.message]:!hidden [&_.success-message]:!hidden [&_.error-message]:!hidden"
              style={{ minHeight: '56px', maxWidth: '440px', margin: '0 auto', width: '100%', padding: '0 16px' }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}