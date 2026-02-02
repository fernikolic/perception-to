import { Button } from '@/components/ui/button';

export function FinalCTA() {
  return (
    <section className="py-20 sm:py-28 lg:py-32 bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 text-center">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight mb-4">
          Ready to stop drowning in noise?
        </h2>
        <p className="text-lg sm:text-xl text-white/60 mb-10 sm:mb-12">
          Join the analysts, comms teams, and investors who've reclaimed their research time.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90 font-semibold px-8 py-6 rounded-2xl w-full sm:w-auto"
            asChild
          >
            <a href="/book-a-call">
              Book a Demo
            </a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-6 rounded-2xl w-full sm:w-auto"
            asChild
          >
            <a href="/product">
              See All Features
            </a>
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/40 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Enterprise-grade security</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}
