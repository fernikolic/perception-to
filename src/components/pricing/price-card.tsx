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
    } else if (dataplan === 'premium') {
      // Fire analytics event
      if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track('click_pricing_premium_trial');
      }
      console.log('Premium plan click tracked');
    } else if (dataplan === 'enterprise') {
      // Fire analytics event
      if (typeof window !== 'undefined' && window.analytics) {
        window.analytics.track('click_pricing_enterprise_inquiry');
      }
      console.log('Enterprise plan click tracked');
    }
    
    // Redirect to the Stripe checkout URL after tracking
    window.location.href = ctaLink;
  };
  
  return (
    <Card className={`plan-card h-full flex flex-col ${featured ? 'featured border-orange-500 shadow-lg dark:shadow-orange-900/20' : 'shadow-sm hover:shadow-md transition-shadow duration-200'}`}>
      <div className="relative">
        {badge && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
              {badge}
            </span>
          </div>
        )}
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          <CardDescription className="text-base mt-1">{description}</CardDescription>
        </CardHeader>
      </div>
      <CardContent className="flex-grow pt-0">
        <div className="mb-8">
          <span className="price text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground ml-1">{perUser ? ' per user / month' : '/month'}</span>
        </div>
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <span className={`text-base ${String(feature).startsWith('Everything in') ? 'font-medium text-orange-600 dark:text-orange-400' : 'text-gray-700 dark:text-gray-300'}`}>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col pt-6">
        <Button 
          className={`w-full transition-all py-6 text-base ${
            featured 
              ? 'bg-orange-600 hover:bg-orange-700 text-white hover:shadow-md focus:ring-2 focus:ring-orange-300' 
              : dataplan === 'enterprise' 
                ? 'border-2 border-orange-600 bg-transparent hover:bg-orange-50 text-orange-600 hover:text-orange-700 focus:ring-2 focus:ring-orange-200'
                : 'bg-orange-50 hover:bg-orange-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white focus:ring-2 focus:ring-orange-200'
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
          <p className="text-xs text-muted-foreground mt-3 text-center">{microCopy}</p>
        )}
      </CardFooter>
    </Card>
  );
}