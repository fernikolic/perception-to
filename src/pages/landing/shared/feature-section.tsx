import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Feature {
  title: string;
  description: string;
  imageUrl: string;
  benefits: string[];
  gradient?: string;
}

interface FeatureSectionProps {
  features: Feature[];
}

export function FeatureSection({ features }: FeatureSectionProps) {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto space-y-32">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={cn(
                "group relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center",
                index % 2 === 1 && "lg:grid-flow-col-dense"
              )}
            >
              <div className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-2xl",
                index % 2 === 1 && "lg:col-start-2"
              )}>
                <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-black/10 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-slate-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                <div className="absolute -inset-x-24 -inset-y-12 z-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 opacity-0 group-hover:opacity-100 animate-shimmer" />
                <img
                  src={feature.imageUrl}
                  alt={feature.title}
                  className="h-full w-full object-cover transition-all duration-700 scale-[1.01] group-hover:scale-105"
                />
              </div>
              
              <div className={cn(
                "relative",
                index % 2 === 1 && "lg:col-start-1"
              )}>
                <div className={cn(
                  "relative rounded-2xl p-8 transition-all duration-300",
                  "bg-gradient-to-br border border-white/10",
                  feature.gradient || 'from-white/5 to-white/10'
                )}>
                  <h3 className="text-2xl font-semibold leading-7 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-lg leading-7 text-muted-foreground mb-8">
                    {feature.description}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {feature.benefits.map((benefit) => (
                      <li 
                        key={benefit}
                        className="flex items-center gap-3 text-sm text-muted-foreground"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="bg-blue-950 text-white hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl w-full"
                    asChild
                  >
                    <a href="https://app.perception.to/auth/sign-up">
                      Start Finding Opportunities
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}