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
}

export function PriceCard({ name, description, price, features, popular }: PriceCardProps) {
  return (
    <Card className={popular ? 'border-primary shadow-lg' : ''}>
      <CardHeader>
        <CardTitle className="text-2xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <span className="text-4xl font-bold">{price}</span>
          {price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
        </div>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={popular ? 'default' : 'outline'}
          asChild
        >
          <a href="https://app.perception.to/auth/sign-up">
            Join the Beta
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}