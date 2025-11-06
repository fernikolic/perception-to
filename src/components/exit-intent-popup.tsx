import { useEffect, useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Logo } from '@/components/ui/logo';

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const signupRef = useRef<HTMLDivElement>(null);

  // Debug: Log when component mounts
  useEffect(() => {
    console.log('ExitIntentPopup component mounted');
    console.log('Current sessionStorage exitIntentShown:', sessionStorage.getItem('exitIntentShown'));

    // For testing: expose functions to control popup
    // @ts-ignore
    window.triggerExitPopup = () => {
      sessionStorage.removeItem('exitIntentShown');
      setHasShown(false);
      setIsOpen(true);
      console.log('Manually triggered exit popup - isOpen:', true);
    };

    // @ts-ignore
    window.resetExitPopup = () => {
      localStorage.removeItem('exitIntentLastShown');
      setHasShown(false);
      setIsOpen(false);
      console.log('Exit popup reset - ready to trigger again');
    };

    // @ts-ignore
    window.showExitPopupNow = () => {
      setIsOpen(true);
      console.log('Showing exit popup immediately for testing');
    };

    return () => {
      console.log('ExitIntentPopup component unmounted');
    };
  }, []);

  useEffect(() => {
    // Check if popup has already been shown recently (24 hour cooldown)
    const lastShownTime = localStorage.getItem('exitIntentLastShown');
    const now = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    if (lastShownTime) {
      const timeSinceLastShown = now - parseInt(lastShownTime);
      if (timeSinceLastShown < twentyFourHours) {
        console.log('Exit popup shown recently, cooldown active for', Math.round((twentyFourHours - timeSinceLastShown) / 1000 / 60), 'more minutes');
        setHasShown(true);
        return;
      } else {
        console.log('24 hour cooldown expired, popup ready to show again');
        localStorage.removeItem('exitIntentLastShown');
      }
    }

    console.log('Setting up exit intent listeners');

    const triggerExitIntent = () => {
      if (!hasShown && !isOpen) {
        console.log('Exit intent triggered!');
        setIsOpen(true);
        setHasShown(true);
        // Store timestamp instead of just 'true'
        localStorage.setItem('exitIntentLastShown', Date.now().toString());
      }
    };


    // Track mouse position
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseY = e.clientY;
    };

    const handleMouseLeave = (e: MouseEvent) => {
      console.log('Mouse leave detected - Y:', e.clientY, 'mouseY:', mouseY);

      // Trigger if mouse leaves from top 50px of screen
      if (e.clientY <= 50 || mouseY <= 50) {
        console.log('Exit intent detected - mouse left from top');
        triggerExitIntent();
      }
    };

    // Alternative method: detect when mouse leaves document
    const handleDocumentMouseLeave = (e: MouseEvent) => {
      console.log('Document mouse leave - Y:', e.clientY, 'target:', e.target);

      // If mouse is moving upward and leaves document
      if (e.clientY <= 0) {
        console.log('Exit intent detected - mouse left document from top');
        triggerExitIntent();
      }
    };

    // Detect visibility change (tab switching, minimizing)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log('Page became hidden - potential exit intent');
        // Small delay to avoid false positives from quick tab switches
        setTimeout(() => {
          if (document.hidden && !hasShown && !isOpen) {
            console.log('Exit intent detected - page hidden');
            triggerExitIntent();
          }
        }, 1000);
      }
    };

    // Test trigger for development
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        console.log('Exit intent triggered via Escape key (test)');
        triggerExitIntent();
      }
    };

    // Add multiple event listeners for better coverage
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseout', handleMouseLeave);
    document.addEventListener('mouseleave', handleDocumentMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseLeave);
      document.removeEventListener('mouseleave', handleDocumentMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [hasShown, isOpen]);

  // Initialize Ghost signup form when dialog opens - copied from footer
  useEffect(() => {
    if (!isOpen) return;

    let script: HTMLScriptElement | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const initializeSignupForm = () => {
      if (!signupRef.current) return;

      try {
        // Clear any existing content
        signupRef.current.innerHTML = '';

        // Create and configure the script
        script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/ghost/signup-form@~0.2/umd/signup-form.min.js';
        script.async = true;
        script.setAttribute('data-button-color', '#000000');
        script.setAttribute('data-button-text-color', '#FFFFFF');
        script.setAttribute('data-site', 'https://bitcoinperception.com/');
        script.setAttribute('data-locale', 'en');

        // Add error handling for the script
        script.onerror = () => {
          console.warn('Failed to load Ghost signup form script');
        };

        // Ensure the parent element still exists before appending
        if (signupRef.current && signupRef.current.parentNode) {
          signupRef.current.appendChild(script);
        }
      } catch (error) {
        console.warn('Error initializing Ghost signup form:', error);
      }
    };

    // Use a small delay to ensure DOM is ready and avoid React StrictMode conflicts
    timeoutId = setTimeout(initializeSignupForm, 100);

    return () => {
      // Cleanup function
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (script && script.parentNode) {
        try {
          script.parentNode.removeChild(script);
        } catch (error) {
          // Ignore cleanup errors
        }
      }

      // Clear the signup container if it still exists
      if (signupRef.current) {
        try {
          signupRef.current.innerHTML = '';
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    };
  }, [isOpen]);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden border-0 bg-gradient-to-b from-white to-gray-50/50">
        {/* Hidden DialogTitle and DialogDescription for accessibility */}
        <DialogTitle className="sr-only">Newsletter Signup</DialogTitle>
        <DialogDescription className="sr-only">
          Join our newsletter to get Bitcoin insights and market analysis
        </DialogDescription>

        {/* Hero Section with Gradient Background */}
        <div className="relative">
          {/* Subtle gradient orb */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-orange-200/20 via-amber-200/20 to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-tr from-orange-100/20 via-yellow-100/20 to-transparent rounded-full blur-3xl" />

          <div className="relative px-8 pt-8 pb-6">

            {/* Perception Logo */}
            <div className="flex justify-center items-center gap-2 mb-6">
              <Logo />
              <span className="text-2xl font-semibold text-gray-900">Perception</span>
            </div>

            {/* Main Heading - SF Pro Display style */}
            <h2 className="text-center text-3xl font-semibold tracking-tight text-gray-900 mb-3">
              One more thing<br />
              worth your time
            </h2>
            <p className="text-center text-lg text-gray-600 font-light">
              Join 2,000+ industry professionals
            </p>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="px-8 pb-6">
          {/* Company Logos */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-center min-w-[100px]">
                <img
                  src="/logos/Swan Logo.webp"
                  alt="Swan"
                  className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-center min-w-[100px]">
                <img
                  src="/logos/Block logo.png"
                  alt="Block"
                  className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
              <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-center min-w-[100px]">
                <img
                  src="/logos/forbes logo.png"
                  alt="Forbes"
                  className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity grayscale"
                />
              </div>
              <div className="bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-center min-w-[100px]">
                <img
                  src="/logos/fidelity-logo-PNG.webp"
                  alt="Fidelity"
                  className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>

          {/* Newsletter Signup Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Get your weekly intelligence report
              </h3>
              <p className="text-xs text-gray-500">
                Curated insights delivered to your inbox every Monday.
              </p>
            </div>

            <div
              ref={signupRef}
              style={{
                minHeight: '58px',
                maxWidth: '440px',
                margin: '0 auto',
                width: '100%'
              }}
            />
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6L4.5 8.5L10 3" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs text-gray-600">2,000+ subscribers</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#10B981" strokeWidth="1.5"/>
                <path d="M4 6L5.5 7.5L8 4.5" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-xs text-gray-600">No spam</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 2V10M6 2V10M9 2V10" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="text-xs text-gray-600">100+ sources analyzed</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}