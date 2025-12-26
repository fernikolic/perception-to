import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ValuesSection } from './components/values-section';
import { BenefitsSection } from './components/benefits-section';
import { PositionsSection } from './components/positions-section';

export function CareersPage() {
  return (
    <div className="min-h-screen bg-[#F0EEE6] pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 bg-black">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white">
              Join Our Mission
            </h1>
            <p className="mt-6 text-base sm:text-lg leading-8 text-white/60">
              Help us build the future of emerging finance intelligence. We are looking for passionate
              individuals who want to make a real impact in the blockchain space.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8">View Open Positions</Button>
              <Button variant="outline" size="lg" className="group border-white/20 hover:border-white/30 text-white rounded-full px-8">
                Learn About Culture{' '}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ValuesSection />
      <BenefitsSection />
      <PositionsSection />
    </div>
  );
}