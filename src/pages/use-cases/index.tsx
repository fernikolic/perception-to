import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Globe } from 'lucide-react';
import SEO from '@/components/SEO';

export function UseCasesLanding() {
  const useCases = [
    {
      persona: "PR & Comms Leads",
      title: "Newsjack stories before they hit the wires",
      image: (
        <div className="relative h-[70%] w-full overflow-hidden">
          <img src="/images/Newsjacking.gif" alt="Newsjacking" className="absolute inset-0 w-full h-full object-cover object-center rounded-t-2xl" />
        </div>
      ),
    },
    {
      persona: "Financial Institutions", 
      title: "Monitor the shift to Bitcoin, stablecoins, and tokenized assets with real-time sentiment analysis.",
      image: (
        <div className="relative h-[70%] w-full overflow-hidden">
          <img src="/images/Sentiment VS Price.gif" alt="Sentiment vs Price" className="absolute inset-0 w-full h-full object-cover object-center rounded-t-2xl" />
        </div>
      ),
    },
    {
      persona: "Fintech Founders",
      title: "Benchmark messaging and monitor industry perception to stay ahead of market-moving stories.",
      image: (
        <div className="h-[70%] w-full flex items-center justify-center">
          <Target className="w-full h-full max-h-40 max-w-40 text-orange-500 object-contain" />
        </div>
      ),
    },
    {
      persona: "Institutional Researchers",
      title: "Track sentiment shifts and emerging trends across traditional and social media sources.",
      image: (
        <div className="h-[70%] w-full flex items-center justify-center">
          <Globe className="w-full h-full max-h-40 max-w-40 text-slate-500 object-contain" />
        </div>
      ),
    }
  ];

  const stats = [
    { value: "200+", label: "Data Sources" },
    { value: "15+", label: "Hours Saved/Week" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Monitoring" }
  ];

  return (
    <>
      <SEO
        title="Bitcoin Use Cases & Success Stories - Perception"
        description="Discover practical applications of Bitcoin intelligence. From journalists to fund managers, see how Perception helps professionals track narratives before they move the market."
        url="https://perception.to/use-cases"
        keywords={['Bitcoin use cases', 'success stories', 'practical applications', 'implementation examples', 'Bitcoin intelligence', 'market narrative tracking', 'professional tools', 'industry applications']}
      />
      <div className="relative min-h-screen bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/grid-pattern.svg')`,
            backgroundSize: '100px 100px',
            backgroundRepeat: 'repeat'
          }}
        />
      </div>

      {/* Hero Section (image card with overlay like homepage) */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src="/images/hero_image.avif"
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
              <div className="mx-auto max-w-4xl text-center">
                <div className="mb-6 sm:mb-8 animate-fade-in">
                  <span className="inline-flex items-center rounded-full bg-transparent px-4 py-2 text-sm font-medium text-black ring-1 ring-inset ring-black/30">
                    Use Cases
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-black animate-slide-up leading-tight">
                  Track the narrative before it moves the market.
                </h1>

                <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg xl:text-xl leading-6 sm:leading-7 lg:leading-8 text-black/70 font-light max-w-3xl mx-auto animate-slide-up [animation-delay:200ms]">
                  From journalists to fund managers, Perception helps you surface what's being said — before it shapes sentiment.
                </p>

                <div className="mt-8 sm:mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up [animation-delay:400ms]">
                  <Button 
                    size="lg" 
                    className="group bg-black text-white hover:bg-black/90 transition-all duration-300 shadow-sm hover:shadow-md px-8 py-3"
                    asChild
                  >
                    <a href="https://app.perception.to/auth/sign-up" className="flex items-center gap-2">
                      Start Free Trial
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="transition-all duration-300 px-8 py-3 border-black/30 text-black hover:bg-black/5"
                    asChild
                  >
                    <a href="/pricing">See Plans</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-16 border-t border-foreground/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="text-3xl font-light text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Case Grid - 2x2 layout, perfect squares, no spacing, even larger cards */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-0 lg:px-0 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="aspect-square max-w-[440px] bg-white dark:bg-card rounded-none border border-foreground/10 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
                style={{ minWidth: 0, minHeight: 0 }}
              >
                <div className="flex-1 flex items-center justify-center" style={{ height: '70%' }}>
                  {useCase.image}
                </div>
                <div className="flex flex-col justify-end px-6 pb-6 pt-2" style={{ height: '30%' }}>
                  <div className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wide text-left">{useCase.persona}</div>
                  <h3 className="text-base font-semibold text-foreground leading-snug text-left">{useCase.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative py-24 sm:py-32 bg-foreground text-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xl text-background/80 mb-12 max-w-2xl mx-auto">
              Start your 7-day free trial.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button 
                size="lg" 
                className="group bg-white text-black hover:bg-white/90 transition-all duration-300 shadow-sm hover:shadow-md px-8 py-3"
                asChild
              >
                <a href="https://app.perception.to/auth/sign-up" className="flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
} 