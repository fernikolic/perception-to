import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { ValuesSection } from './components/values-section';
import { BenefitsSection } from './components/benefits-section';
import { PositionsSection } from './components/positions-section';

export function CareersPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(100,181,246,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extralight tracking-tight sm:text-6xl">
              Join Our Mission
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Help us build the future of emerging finance intelligence. We are looking for passionate
              individuals who want to make a real impact in the blockchain space.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg">View Open Positions</Button>
              <Button variant="outline" size="lg" className="group">
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