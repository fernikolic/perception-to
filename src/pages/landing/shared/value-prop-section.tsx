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
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extralight tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          {subtitle}
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {benefits.map((benefit) => {
          const Icon = benefit.Icon;
          return (
            <div
              key={benefit.title}
              className={`group relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${benefit.gradient || 'from-white/5 to-white/10'} hover:shadow-lg hover:shadow-white/5 border border-white/10`}
            >
              <div className="text-muted-foreground/50 mb-4">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground mb-8">
                {benefit.description}
              </p>
              <Button 
                className="bg-blue-950 text-white hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl w-full"
                asChild
              >
                <a href="https://app.perception.to/auth/sign-up">
                  Start here
                </a>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}