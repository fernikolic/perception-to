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
  { name: 'Block', logo: '/logos/Block logo.avif' },
  { name: 'Cointelegraph', logo: '/logos/Cointelegraph Logo.png' },
  { name: 'Forbes', logo: '/logos/forbes logo.png' },
  { name: 'CoinShares', logo: '/logos/CoinShares_Logo.jpg' },
  { name: 'Bitwise', logo: '/logos/bitwise logo.png' },
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
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src="/images/hero_image.avif"
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
              <div className="mx-auto max-w-4xl text-center">
            {/* Ultra-thin badge with color */}
            <div className="mb-8">
              <span className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm border border-gray-200 px-4 py-1.5 text-sm font-light tracking-wide text-gray-800">
                Join 1,500+ subscribers
              </span>
            </div>
            
            {/* Ultra-thin hero title with color accent */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tight text-white mb-12 leading-tight">
              Unlock insights into Bitcoin{' '}
              <span className="font-thin text-white">media trends</span> and bias
            </h1>
            
            {/* Signup Form Section */}
            <div className="mb-12">
              <div className="max-w-md mx-auto">
                <div
                  ref={heroSignupRef}
                  className="signup-form-container"
                  style={{ 
                    minHeight: '64px', 
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
            <div className="mb-8 max-w-4xl mx-auto">
              <p className="text-lg font-light leading-relaxed text-white/90 mb-4">
                Read by industry professionals from
              </p>
              {/* Single row - all companies with improved styling */}
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                {companies.map((company) => (
                  <div key={company.name} className="flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 min-h-[60px] min-w-[120px]">
                    <img 
                      src={company.logo} 
                      alt={`${company.name} logo`}
                      className="h-8 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity filter brightness-0 invert"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-sm font-light text-white/70">and many more</p>
            </div>

            {/* Author credentials with image */}
            <div className="mb-12 max-w-2xl mx-auto">
              <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-6">
                  <img 
                    src="https://pbs.twimg.com/profile_images/1956825197987631104/8qIKrlxw_400x400.jpg" 
                    alt="Fernando Nikolić"
                    className="w-16 h-16 rounded-full ring-2 ring-gray-100 shadow-sm flex-shrink-0"
                  />
                  <div className="text-left">
                    <p className="text-lg font-light leading-relaxed text-gray-700 mb-2">
                      From <span className="font-medium text-gray-900">Fernando Nikolić</span>, Founder
                    </p>
                    <p className="text-sm font-light leading-relaxed text-gray-600">
                      Former Universal Music during torrents' disruption of music.
                      <br />
                      Ex VP at Blockstream during Bitcoin's disruption of finance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimalist footer text */}
            <p className="text-sm font-light text-white/80 tracking-wide">
              Free newsletter · Weekly insights · Unsubscribe anytime
            </p>
            </div>
          </div>
        </div>
      </div>
      </section>


      {/* Tweet Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50/50 to-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-extralight tracking-tight text-gray-900 mb-6">
              What people are saying
            </h2>
            <p className="text-lg sm:text-xl font-light leading-relaxed text-gray-600">
              Bitcoin professionals and enthusiasts share their thoughts on our research.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {selectedTweets.map((testimonial, index) => (
              <div key={index} className="h-full">
                <TweetCard author={testimonial!.author} />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="relative py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-blue-100/40 to-transparent blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-100/40 to-transparent blur-3xl" />
        </div>
        
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-6xl font-extralight tracking-tight text-gray-900 mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Subscribe</span> now
            </h2>
            <p className="text-xl sm:text-2xl font-light leading-relaxed text-gray-600 mb-12 max-w-2xl mx-auto">
              Join our community of Bitcoin media researchers and stay informed 
              about the latest trends and insights.
            </p>
            
            {/* Enhanced Second Signup Form */}
            <div className="max-w-md mx-auto mb-8">
              <div
                ref={ctaSignupRef}
                className="flex justify-center [&>div]:!bg-white [&>div]:!border-gray-200 [&>div]:!rounded-xl [&>div]:!shadow-lg [&_input]:!border-0 [&_input]:!bg-gray-50/50 [&_input]:!rounded-lg [&_button]:!bg-black [&_button]:!rounded-lg [&_button]:!font-medium [&_button]:!px-8 [&_button]:hover:!bg-gray-800 [&_button]:!transition-colors"
                style={{ minHeight: '64px', maxWidth: '440px', margin: '0 auto', width: '100%' }}
              />
            </div>
            
            {/* Elegant call-to-action arrow */}
            <div className="flex items-center justify-center gap-2 text-sm font-light text-gray-500 tracking-wide">
              <span>Start receiving insights</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}