import { useRef, useEffect } from 'react';
import WaterAscii from '@/components/WaterAscii';

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


export function BitcoinMediaResearchPage() {
  const heroSignupRef = useRef<HTMLDivElement>(null);

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
      
      // Clear the signup container if it still exists
      if (heroSignupRef.current) {
        try {
          heroSignupRef.current.innerHTML = '';
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
        {/* Base Gradient */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

        <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
          {/* Hero Card with Side-by-Side Layout */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Water ASCII - Left Side (50%) */}
              <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
                <WaterAscii />
              </div>

              {/* Content - Right Side (50%) */}
              <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16 flex flex-col justify-center" style={{ background: '#F0EEE6' }}>
                <div className="mx-auto max-w-2xl">
                  <div className="mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                    <div className="group relative inline-flex items-center rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold leading-6"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <span className="relative flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-40"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-purple-400"></span>
                        </span>
                        <span className="relative font-bold text-black">NEWSLETTER</span>
                      </span>
                      <span className="ml-2.5 text-black/80">Join 2,000+ readers</span>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-black mb-5 sm:mb-6 lg:mb-8 text-center lg:text-left">
                    Unlock insights into Bitcoin media{'\u00A0'}trends
                  </h1>

                  <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/70 font-semibold mb-3">
                      Get cutting-edge research and analyses delivered to{'\u00A0'}your{'\u00A0'}inbox.
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                      Read by professionals at Swan, Block, Cointelegraph, Forbes, CoinShares, Fidelity, and{'\u00A0'}more.
                    </p>
                  </div>

                  {/* Signup Form */}
                  <div className="mb-6 text-center lg:text-left">
                    <div
                      ref={heroSignupRef}
                      className="signup-form-container [&_input]:!text-sm [&_input]:sm:!text-base [&_button]:!text-sm [&_button]:sm:!text-base [&_button]:!px-4 [&_button]:sm:!px-8 [&_button]:!bg-black [&_button]:hover:!bg-black/90"
                      style={{
                        minHeight: '56px',
                        maxWidth: '440px',
                        margin: '0 auto',
                        width: '100%'
                      }}
                    />
                  </div>

                  {/* Author credentials */}
                  <div className="pt-4 border-t border-black/10">
                    <div className="flex items-center gap-3 justify-center lg:justify-start">
                      <img
                        src="/images/Fernando Nikolic.png"
                        alt="Fernando Nikolić"
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-black/5 flex-shrink-0"
                      />
                      <div className="text-left">
                        <p className="text-xs sm:text-sm font-semibold text-black">
                          Fernando Nikolić
                        </p>
                        <p className="text-xs text-black/60">
                          Ex Universal Music, Ex Blockstream VP
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BitcoinMediaResearchPage;