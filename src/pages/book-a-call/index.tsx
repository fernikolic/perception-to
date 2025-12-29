import { Button } from '@/components/ui/button';
import AsciiDiagonalPetals from '@/components/AsciiDiagonalPetals';

export default function BookACallPage() {

  return (
    <div className="min-h-screen bg-background pt-16">
      {/* Hero Section with ASCII Art */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

        <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
          <div className="relative">
            <div className="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8 min-h-[200px] lg:min-h-[600px]">
              {/* ASCII Art - Left Card (Desktop only) */}
              <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-[600px] hidden lg:block">
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl" style={{ background: '#000000' }}>
                  <AsciiDiagonalPetals />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-white text-center px-8 leading-tight">
                      Schedule<br />a Demo
                    </h1>
                  </div>
                </div>
              </div>

              {/* Content - Right Card */}
              <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:pl-8 lg:pr-12 py-8 sm:py-12 lg:py-16 flex flex-col justify-center rounded-3xl shadow-2xl" style={{ background: '#F0EEE6' }}>
                <div className="w-full max-w-2xl">
                  <div className="mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                    <div className="inline-flex items-center rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold leading-6"
                      style={{
                        background: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-40"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-400"></span>
                        </span>
                        <span className="font-bold text-black">DEMO</span>
                      </span>
                      <span className="ml-2.5 text-black/80">Book a call</span>
                    </div>
                  </div>

                  <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight leading-tight text-black mb-4">
                      This is not a sales call.
                    </h2>
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