import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ValueProp {
  title: string;
  description: string;
  Icon: LucideIcon;
  gradient?: string;
}

interface ValuePropSectionProps {
  title: string;
  subtitle: string;
  benefits: ValueProp[];
}

export function ValuePropSection({ title, subtitle, benefits }: ValuePropSectionProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight px-2">
          {title}
        </h2>
        <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground px-2">
          {subtitle}
        </p>
      </div>
      <div className="mx-auto mt-12 sm:mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {benefits.map((benefit) => {
          const Icon = benefit.Icon;
          return (
            <div
              key={benefit.title}
              className={`group relative rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${benefit.gradient || 'from-white/5 to-white/10'} hover:shadow-lg hover:shadow-white/5 border border-white/10`}
            >
              <div className="text-muted-foreground/50 mb-3 sm:mb-4">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                {benefit.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
                {benefit.description}
              </p>
              <Button
                size="lg"
                className="bg-blue-950 text-white hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl hover:scale-105 w-full text-sm sm:text-base py-5 sm:py-6 rounded-xl"
                asChild
              >
                <a href="/book-a-call">
                  Book a Demo
                </a>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}