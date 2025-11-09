import { Button } from '@/components/ui/button';
import WaterAscii from '@/components/WaterAscii';

export default function BookACallPage() {

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section with ASCII Art */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
        {/* Base Gradient */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

        <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
          {/* Hero Card with Side-by-Side Layout */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* ASCII Water Animation - Left Side (50%) */}
              <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
                <WaterAscii />
              </div>

              {/* Content - Right Side (50%) */}
              <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16 flex flex-col justify-center" style={{ background: '#F0EEE6' }}>
                <div className="mx-auto max-w-2xl">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-black mb-5 sm:mb-6 lg:mb-8 text-center lg:text-left">
                    Schedule a demo
                  </h1>

                  <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/70 font-semibold mb-3">
                      This is not a sales call.
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                      The goal is to understand your needs and see if Perception is a perfect fit for{'\u00A0'}you.
                    </p>
                  </div>

                  <div className="flex justify-center lg:justify-start">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                      asChild
                    >
                      <a href="https://calendar.app.google/Ta211CSAN4doLgPLA" target="_blank" rel="noopener noreferrer">
                        Pick a time
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 