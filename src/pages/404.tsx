import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import AsciiBlob from '@/components/AsciiBlob';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Perception</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Perception's Bitcoin sentiment analysis platform." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen bg-[#F0EEE6]">
        <section className="min-h-screen flex items-center px-6 sm:px-16 lg:px-32">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              {/* Left - ASCII Art Visual */}
              <div className="w-full lg:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden bg-black">
                  <AsciiBlob />
                  {/* Overlay with 404 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl sm:text-9xl font-bold text-white/20">404</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Content */}
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-black/5 rounded-full px-4 py-2 text-sm font-medium mb-6">
                  <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                  Page Not Found
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-black mb-6">
                  Lost in the{' '}
                  <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>noise</em>
                </h1>

                <p className="text-lg sm:text-xl text-black/70 font-light leading-relaxed mb-8">
                  The page you're looking for doesn't exist or has been moved. Let's get you back on track.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button
                    size="lg"
                    className="bg-black text-white hover:bg-black/90 rounded-2xl px-8 py-6 text-base font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <Link to="/">
                      Go Home
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/80 text-black hover:bg-white rounded-2xl px-8 py-6 text-base font-semibold border-2 border-black/20 hover:border-black/30 transition-all duration-300"
                    onClick={() => window.history.back()}
                  >
                    Go Back
                  </Button>
                </div>

                <div className="mt-12 pt-8 border-t border-black/10">
                  <p className="text-sm text-black/50 mb-4">Popular pages</p>
                  <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                    <Link to="/bitcoin-fear-greed-index" className="text-sm text-black/70 hover:text-orange-500 transition-colors">
                      Fear & Greed Index
                    </Link>
                    <Link to="/pricing" className="text-sm text-black/70 hover:text-orange-500 transition-colors">
                      Pricing
                    </Link>
                    <Link to="/learn" className="text-sm text-black/70 hover:text-orange-500 transition-colors">
                      Learn
                    </Link>
                    <Link to="/about" className="text-sm text-black/70 hover:text-orange-500 transition-colors">
                      About
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
