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
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(100,181,246,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-extralight tracking-tight sm:text-6xl mb-6">
              Schedule a demo
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              This is not a sales call.<br />
              The goal is to understand your needs and to check together on Perception's abilities and see if it is a perfect fit for you.
            </p>
          </div>
          
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