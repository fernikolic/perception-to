import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Feature {
  title: string;
  description: string;
  imageUrl: string;
  benefits: string[];
}

interface FeatureSectionProps {
  features: Feature[];
}

export function FeatureSection({ features }: FeatureSectionProps) {
  return (
    <section className="bg-muted/50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {features.map((feature, index) => (
          <div 
            key={feature.title}
            className={cn(
              "mb-24 flex flex-col gap-8 last:mb-0 lg:flex-row",
              index % 2 === 1 && "lg:flex-row-reverse"
            )}
          >
            <div className="flex-1">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={feature.imageUrl}
                    alt={feature.title}
                    className="h-[400px] w-full object-cover"
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-1 flex-col justify-center gap-6 lg:px-8">
              <h3 className="text-2xl font-bold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
              <div className="flex flex-wrap gap-2">
                {feature.benefits.map((benefit) => (
                  <Badge key={benefit} variant="secondary">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}