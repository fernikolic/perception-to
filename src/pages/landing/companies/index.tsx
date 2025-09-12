import { HeroSection } from '../shared/hero-section';
import { ValuePropSection } from '../shared/value-prop-section';
import { FeatureSection } from '../shared/feature-section';
import { TestimonialSection } from '../shared/testimonial-section';
import { CTASection } from '../shared/cta-section';
import { TrendingUp, LineChart, Users } from 'lucide-react';

export function CompaniesLanding() {
  const benefits = [
    {
      title: 'Track Real-Time Trends',
      description: 'Stay informed with live updates from 200+ top sources across 15 countries and 8 languages.',
      Icon: TrendingUp,
      gradient: 'from-blue-500/20 via-slate-600/20 to-zinc-700/30 hover:from-blue-500/30 hover:to-zinc-700/40',
    },
    {
      title: 'Analyze Sentiment',
      description: 'Track sentiment shifts in real time across social media, news outlets, and community discussions.',
      Icon: LineChart,
      gradient: 'from-slate-500/30 via-blue-600/20 to-neutral-700/30 hover:from-slate-500/40 hover:to-blue-600/30',
    },
    {
      title: 'Monitor Competition',
      description: 'Track unlimited companies and projects to see how they are perceived in the ecosystem.',
      Icon: Users,
      gradient: 'from-blue-400/20 via-zinc-600/20 to-slate-700/30 hover:from-blue-400/30 hover:to-slate-700/40',
    },
  ];

  const features = [
    {
      title: 'Real-Time Trend Discovery',
      description: 'Spot what is trending across the Bitcoin industry with early signals from media, social platforms, and communities.',
      imageUrl: 'https://images.unsplash.com/photo-1642790551116-18e4f8f6c637?auto=format&fit=crop&q=80&w=800',
      benefits: [
        'Live updates from 100+ sources',
        'Multi-language coverage',
        'High-signal data curation',
      ],
      gradient: 'from-blue-400/20 via-zinc-600/10 to-slate-800/20 hover:from-blue-400/30',
    },
    {
      title: 'Sentiment Analysis',
      description: 'Understand the narrative shaping Bitcoin and refine your messaging strategy.',
      imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=800',
      benefits: [
        'Real-time sentiment tracking',
        'Positive/negative analysis',
        'Strategic insights',
      ],
      gradient: 'from-slate-400/20 via-blue-600/10 to-neutral-800/20 hover:from-slate-400/30',
    },
    {
      title: 'Competitive Intelligence',
      description: 'Gain a competitive edge by tracking both competitors and your own presence in the ecosystem.',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
      benefits: [
        'Unlimited company tracking',
        'Self-analysis tools',
        'Benchmarking capabilities',
      ],
      gradient: 'from-blue-400/20 via-slate-600/10 to-zinc-800/20 hover:from-blue-400/30',
    },
  ];

  const metrics = [
    { value: "200+", label: "Data Sources", gradient: 'from-blue-400/30 to-zinc-700/30 hover:from-blue-400/40' },
    { value: "15", label: "Countries", gradient: 'from-slate-400/30 to-blue-700/30 hover:from-slate-400/40' },
    { value: "8", label: "Languages", gradient: 'from-blue-400/30 to-slate-700/30 hover:from-blue-400/40' },
    { value: "24/7", label: "Real-time Updates", gradient: 'from-slate-400/30 to-blue-700/30 hover:from-slate-400/40' },
  ];

  const logos = [
    {
      name: "Swan Bitcoin",
      url: "https://www.cryptometer.io/news/wp-content/uploads/2024/07/swan-bitcoin.jpg",
    },
    {
      name: "Unchained",
      url: "https://mms.businesswire.com/media/20230418005200/en/1764812/23/Unchained%E2%80%94Vertical-Logo%E2%80%94Full-Color%E2%80%94On_Light%402x_%281%29.jpg",
    },
    {
      name: "Galoy",
      url: "https://raw.githubusercontent.com/GaloyMoney/.github/main/img/galoy.png",
    },
    {
      name: "Cash App",
      url: "https://play-lh.googleusercontent.com/USZfMKL3L_6Gl61UumLdD7HxHkHxz408ySQufsBCpD7YWvbR7NFixt6oMb-neytMkIU",
    },
    {
      name: "Blockstream",
      url: "https://blockstream.com/img/img/blks_logo_1920x1080.png",
    },
    {
      name: "Jan3",
      url: "https://blog.liquid.net/content/images/2023/05/jan3_logo_sqaure-01.png",
    },
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
        segment="companies"
        title={<>Stay ahead in the <span className="whitespace-nowrap">Bitcoin industry</span></>}
        subtitle="Discover real-time trends, analyze sentiment, and track competitors with ease. Whether you're a decision-maker, researcher, or builder in the Bitcoin space, unlock the insights you need to drive your strategy"
        ctaText="Start Here"
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
          <div className="relative overflow-hidden">
            <div className="logo-container relative w-full">
              <div className="flex flex-wrap justify-center items-center gap-8 py-8">
                {logos.map((logo) => (
                  <div key={logo.name} className="flex items-center justify-center">
                    <img
                      className="h-24 w-auto object-contain mix-blend-lighten opacity-75 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 filter"
                      src={logo.url}
                      alt={logo.name}
                      width={200}
                      height={72}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-8 sm:space-y-12 mt-16 sm:mt-24">
        <ValuePropSection
          title="The insights you need to stay ahead"
          subtitle="Empower your decisions with a comprehensive intelligence platform designed for the Bitcoin industry"
          benefits={benefits}
        />

        <TestimonialSection
          metrics={metrics}
          logos={[]}
        />
        
        <div className="mt-16 sm:mt-20 space-y-16 sm:space-y-20">
          <FeatureSection features={features} />
          
          <CTASection
            title="Stay informed, stay competitive"
            subtitle="Don't get left behind in the fast-moving Bitcoin industry. Start using Perception to lead the conversation, track competitors, and identify key opportunities"
            primaryCTA="Start Here"
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