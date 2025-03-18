import { HeroSection } from '../shared/hero-section';
import { ValuePropSection } from '../shared/value-prop-section';
import { FeatureSection } from '../shared/feature-section';
import { TestimonialSection } from '../shared/testimonial-section';
import { CTASection } from '../shared/cta-section';
import { LineChart, TrendingUp, Shield } from 'lucide-react';

export function InvestorLanding() {
  const benefits = [
    {
      title: 'Spot Opportunities First',
      description: 'Real-time sentiment shifts and market-moving trends at your fingertips.',
      Icon: TrendingUp,
      gradient: 'from-blue-500/20 via-slate-600/20 to-zinc-700/30 hover:from-blue-500/30 hover:to-zinc-700/40',
    },
    {
      title: 'Correlate Sentiment with Price',
      description: 'Advanced tools to identify how emotions drive price movements.',
      Icon: LineChart,
      gradient: 'from-slate-500/30 via-blue-600/20 to-neutral-700/30 hover:from-slate-500/40 hover:to-blue-600/30',
    },
    {
      title: 'Stay Ahead of the Market',
      description: 'Breaking trend insights keep you informed before the market reacts.',
      Icon: Shield,
      gradient: 'from-blue-400/20 via-zinc-600/20 to-slate-700/30 hover:from-blue-400/30 hover:to-slate-700/40',
    },
  ];

  const features = [
    {
      title: 'Real-time Sentiment Analysis',
      description: 'Track market sentiment in real-time with our advanced analytics dashboard.',
      imageUrl: 'https://images.unsplash.com/photo-1642790551116-18e4f8f6c637?auto=format&fit=crop&q=80&w=800',
      benefits: [
        'Live Sentiment Tracking',
        'Social Media Analysis',
        'News Sentiment',
      ],
      gradient: 'from-blue-400/20 via-zinc-600/10 to-slate-800/20 hover:from-blue-400/30',
    },
    {
      title: 'Price Correlation Tools',
      description: 'Understand how sentiment impacts price movements with our correlation analysis tools.',
      imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=800',
      benefits: [
        'Price Impact Analysis',
        'Correlation Metrics',
        'Historical Patterns',
      ],
      gradient: 'from-slate-400/20 via-blue-600/10 to-neutral-800/20 hover:from-slate-400/30',
    },
    {
      title: 'Advanced Trading Tools',
      description: 'Make informed decisions with our comprehensive suite of trading tools.',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
      benefits: [
        'Technical Analysis',
        'Risk Management',
        'Portfolio Tracking',
      ],
      gradient: 'from-blue-400/20 via-slate-600/10 to-zinc-800/20 hover:from-blue-400/30',
    },
  ];

  const tweets = [
    {
      id: '1760715258231005618',
      gradient: 'from-blue-500/10 via-purple-500/10 to-pink-500/10',
    },
    {
      id: '1760715258231005619',
      gradient: 'from-purple-500/10 via-pink-500/10 to-orange-500/10',
    },
  ];

  const metrics = [
    { value: "$2B+", label: "Assets Analyzed", gradient: 'from-blue-400/30 to-zinc-700/30 hover:from-blue-400/40' },
    { value: "150ms", label: "Avg. Response Time", gradient: 'from-slate-400/30 to-blue-700/30 hover:from-slate-400/40' },
    { value: "99.9%", label: "Uptime", gradient: 'from-blue-400/30 to-slate-700/30 hover:from-blue-400/40' },
    { value: "24/7", label: "Market Coverage", gradient: 'from-slate-400/30 to-blue-700/30 hover:from-slate-400/40' },
  ];

  const logos = [
    { name: "Binance", url: "https://www.binance.com/logo.svg" },
    { name: "Kraken", url: "https://www.kraken.com/logo.svg" },
  ];

  return (
    <div className="relative">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),rgba(59,130,246,0)_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(206,78,83,0.15),rgba(206,78,83,0)_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-background to-transparent" />
      </div>

      <HeroSection
        segment="investor"
        title="Make data-driven decisions: stay ahead of Bitcoin market trends"
        subtitle="Track real-time sentiment, discover emerging trends, and decode market psychology to gain the edge you need in Bitcoin trading"
        ctaText="Join the Beta"
        backgroundClass="bg-gradient-to-br from-blue-500/5 via-slate-600/5 to-neutral-700/5"
      />

      {/* Logos Section */}
      <div className="relative mt-4 sm:mt-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-sm text-muted-foreground">
                Trusted by
              </span>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 items-center gap-x-12 gap-y-16 sm:max-w-5xl sm:grid-cols-3 sm:gap-x-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {logos.map((logo) => (
              <img
                key={logo.name}
                className="col-span-1 max-h-24 w-full object-contain mix-blend-lighten opacity-75 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 filter"
                src={logo.url}
                alt={logo.name}
                width={316}
                height={96}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="space-y-8 sm:space-y-12 mt-16 sm:mt-24">
        <ValuePropSection
          title="Everything you need to trade smarter"
          subtitle="Make data-driven decisions with our comprehensive suite of trading tools"
          benefits={benefits}
        />

        <TestimonialSection
          tweets={tweets}
          metrics={metrics}
          logos={[]}
        />
        
        <div className="mt-16 sm:mt-20 space-y-16 sm:space-y-20">
          <FeatureSection features={features} />
          
          <CTASection
            title="Start trading with confidence"
            subtitle="Join professional traders who use our platform to gain a competitive edge"
            primaryCTA="Join the Beta"
            secondaryCTA=""
            backgroundClass="group"
          >
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(121,40,202,0.15),rgba(121,40,202,0)_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(206,78,83,0.15),rgba(206,78,83,0)_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </CTASection>
        </div>
      </div>
    </div>
  );
}