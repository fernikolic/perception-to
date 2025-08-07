import { useEffect } from 'react';
import { FaqList } from '@/components/faq/faq-list';

export default function BookACallPage() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      document.body.removeChild(script);
    };
  }, []);
  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section (image card with overlay) */}
      <section className="relative overflow-hidden py-12 md:py-20">
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
            <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-10 sm:py-14 lg:py-16">
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal tracking-tight text-black mb-4">
                  Schedule a demo
                </h1>
                <p className="text-sm sm:text-base lg:text-lg leading-6 sm:leading-7 text-black/70 font-light max-w-2xl mx-auto">
                  This is not a sales call. The goal is to understand your needs and to check together on Perception's abilities and see if it is a perfect fit for you.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 lg:px-8 mt-12">
          {/* Calendly embed */}
          <div className="mb-16 bg-white rounded-xl shadow-xl border border-gray-200 p-6">
            <div 
              className="calendly-inline-widget rounded-lg overflow-hidden" 
              data-url="https://calendly.com/fernikolic/30min" 
              style={{ minWidth: '320px', height: '900px', width: '100%' }}
            />
          </div>
          
          {/* Email contact option */}
          <div className="text-center mb-20 bg-gray-50 rounded-xl p-8 border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Prefer email?
            </h3>
            <p className="text-base text-gray-600">
              Send any questions to{' '}
              <a 
                href="mailto:fernando@btcperception.com" 
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                fernando@btcperception.com
              </a>
              {' '}and we will get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative pb-16 md:pb-24 bg-gray-50/50">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="pt-16 md:pt-24">
            <h2 className="text-2xl md:text-3xl font-extralight text-center mb-10 md:mb-14">
              Frequently Asked Questions
            </h2>
            <FaqList />
          </div>
        </div>
      </section>
    </div>
  );
} 