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
  annualPrice?: string;
  perUser?: boolean;
  features: (string | ReactNode)[];
  featured?: boolean;
  badge?: string;
  cta: string;
  ctaLink: string;
  annualCtaLink?: string;
  microCopy?: string;
  dataplan?: string;
  isAnnual?: boolean;
}

export function PriceCard({ 
  name, 
  description, 
  price, 
  annualPrice,
  perUser,
  features, 
  featured, 
  badge,
  cta, 
  ctaLink,
  annualCtaLink,
  microCopy,
  dataplan,
  isAnnual = false
}: PriceCardProps) {
  const currentPrice = isAnnual && annualPrice ? annualPrice : price;
  const currentLink = isAnnual && annualCtaLink ? annualCtaLink : ctaLink;
  const showAnnualSavings = isAnnual && annualPrice && dataplan !== 'enterprise';
  
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
    window.location.href = currentLink;
  };
  
  return (
    <Card className={`relative h-full flex flex-col border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
      featured 
        ? 'bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 dark:from-blue-900/20 dark:via-gray-800 dark:to-indigo-900/20 ring-1 ring-blue-200/50 dark:ring-blue-800/30' 
        : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm'
    }`}>
      <div className="relative">
        {badge && (
          <div className="absolute top-6 right-6">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-1 text-xs font-medium text-white shadow-sm">
              {badge}
            </span>
          </div>
        )}
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-light tracking-tight">{name}</CardTitle>
          <CardDescription className="text-base text-muted-foreground mt-2 leading-relaxed">{description}</CardDescription>
        </CardHeader>
      </div>
      
      <CardContent className="flex-grow pt-0">
        <div className="mb-10">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-extralight tracking-tight">{currentPrice}</span>
            {dataplan !== 'enterprise' && (
              <span className="text-lg text-muted-foreground font-light">
                {isAnnual ? '/year' : perUser ? ' per user / month' : '/month'}
              </span>
            )}
          </div>
          {showAnnualSavings && (
            <div className="mt-3">
              <span className="inline-flex items-center rounded-full bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Save 2 months
              </span>
            </div>
          )}
        </div>
        
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className={`text-base leading-relaxed ${
                String(feature).startsWith('Everything in') 
                  ? 'font-medium text-gray-900 dark:text-gray-100' 
                  : 'text-muted-foreground'
              }`}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="flex flex-col pt-8">
        <Button 
          className={`w-full py-4 text-base font-medium transition-all duration-200 ${
            featured 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl' 
              : dataplan === 'enterprise' 
                ? 'border-2 border-gray-900 dark:border-gray-100 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100'
                : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
          asChild
          data-plan={dataplan}
        >
          <a 
            href={currentLink} 
            onClick={handleButtonClick} 
            aria-label={`Subscribe to ${name} plan`}
          >
            {cta}
          </a>
        </Button>
        {microCopy && (
          <p className="text-xs text-muted-foreground mt-4 text-center">{microCopy}</p>
        )}
      </CardFooter>
    </Card>
  );
}