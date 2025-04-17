import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface PriceCardProps {
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
  cta: string;
  ctaLink: string;
}

export function PriceCard({ name, description, price, features, popular, cta, ctaLink }: PriceCardProps) {
  return (
    <Card className={`h-full flex flex-col ${popular ? 'border-primary shadow-lg' : ''}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">{name}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="mb-6">
          <span className="text-3xl font-bold">{price}</span>
          {price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
        </div>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary flex-shrink-0" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button 
          className="w-full bg-black text-white hover:bg-gray-900 dark:bg-black dark:hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl"
          asChild
        >
          <a href={ctaLink}>
            {cta}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}