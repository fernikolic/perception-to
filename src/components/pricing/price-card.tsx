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
import { ReactNode } from 'react';

// Add a type declaration for the analytics property on the window object
declare global {
  interface Window {
    analytics?: {
      track: (event: string, properties?: any) => void;
    };
  }
}

interface PriceCardProps {
  name: string;
  description: string;
  price: string;
  perUser?: boolean;
  features: (string | ReactNode)[];
  featured?: boolean;
  badge?: string;
  cta: string;
  ctaLink: string;
  microCopy?: string;
  dataplan?: string;
}

export function PriceCard({ 
  name, 
  description, 
  price, 
  perUser,
  features, 
  featured, 
  badge,
  cta, 
  ctaLink,
  microCopy,
  dataplan
}: PriceCardProps) {
  const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // Track the click event based on the plan
    if (dataplan === 'pro') {
      // Fire analytics event
      if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track('click_pricing_pro_trial');
      }
      // You can also use GA or other analytics providers here
      console.log('Pro plan click tracked');
    } else if (dataplan === 'data') {
      // Fire analytics event
      if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track('click_pricing_data_trial');
      }
      console.log('Data plan click tracked');
    }
    
    // Redirect to the Stripe checkout URL after tracking
    window.location.href = ctaLink;
  };
  
  return (
    <Card className={`plan-card h-full flex flex-col ${featured ? 'featured border-orange-500 shadow-lg' : ''}`}>
      <div className="relative">
        {badge && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center rounded-full bg-orange-100 px-2.5 py-0.5 text-xs font-medium text-orange-800">
              {badge}
            </span>
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{name}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
      </div>
      <CardContent className="flex-grow">
        <div className="mb-6">
          <span className="price text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">{perUser ? ' per user / month' : '/month'}</span>
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button 
          className={`w-full transition-all ${
            featured 
              ? 'bg-orange-600 hover:bg-orange-700 text-white hover:shadow-md focus:ring-2 focus:ring-orange-300' 
              : 'bg-orange-50 hover:bg-orange-100 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:underline focus:ring-2 focus:ring-orange-200'
          }`}
          asChild
          data-plan={dataplan}
        >
          <a 
            href={ctaLink} 
            onClick={handleButtonClick} 
            aria-label={`Subscribe to ${name} plan`}
            className="py-3 font-medium"
          >
            {cta}
          </a>
        </Button>
        {microCopy && (
          <p className="text-xs text-muted-foreground mt-2 text-center">{microCopy}</p>
        )}
      </CardFooter>
    </Card>
  );
}