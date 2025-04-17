import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CTASectionProps {
  title: string;
  subtitle: string;
  primaryCTA: string;
  secondaryCTA?: string;
  backgroundClass?: string;
  children?: React.ReactNode;
}

export function CTASection({ title, subtitle, primaryCTA, secondaryCTA, backgroundClass, children }: CTASectionProps) {
  return (
    <div className={cn("relative py-24 sm:py-32", backgroundClass)}>
      {children}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extralight tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            {subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button 
              className="bg-blue-950 text-white hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl"
              asChild
            >
              <a href="https://app.perception.to/auth/sign-up">
                {primaryCTA}
              </a>
            </Button>
            {secondaryCTA && (
              <Button 
                variant="link" 
                className="text-white hover:text-white/90"
                asChild
              >
                <a href="/pricing">
                  {secondaryCTA}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}