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
    <div className={cn("relative py-12 sm:py-16 lg:py-20", backgroundClass)}>
      {children}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight px-2">
            {title}
          </h2>
          <p className="mx-auto mt-4 sm:mt-6 max-w-3xl text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground px-2">
            {subtitle}
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-2">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-blue-950 text-white hover:bg-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all shadow-lg hover:shadow-xl hover:scale-105 px-8 sm:px-10 lg:px-12 py-6 sm:py-7 text-base sm:text-lg lg:text-xl font-semibold rounded-2xl"
              asChild
            >
              <a href="https://app.perception.to/auth/sign-up">
                {primaryCTA}
              </a>
            </Button>
            {secondaryCTA && (
              <Button
                variant="link"
                className="text-white hover:text-white/90 text-sm sm:text-base"
                asChild
              >
                <a href="/pricing#pricing">
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