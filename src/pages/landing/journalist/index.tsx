import { HeroSection } from '../shared/hero-section';
import { ValuePropSection } from '../shared/value-prop-section';
import { FeatureSection } from '../shared/feature-section';
import { TestimonialSection } from '../shared/testimonial-section';
import { CTASection } from '../shared/cta-section';
import { FileText, TrendingUp, Bell } from 'lucide-react';
import SEO from '@/components/SEO';

export function JournalistLanding() {
  const benefits = [
    {
      title: 'Find the Next Big Story',
      description: 'Track breaking news and trends from top publications and platforms.',
      Icon: TrendingUp,
      gradient: 'from-blue-500/20 via-slate-600/20 to-zinc-700/30 hover:from-blue-500/30 hover:to-zinc-700/40',
    },
    {
      title: 'Data-Driven Storytelling',
      description: 'Visualize sentiment and trends to add depth to your content.',
      Icon: FileText,
      gradient: 'from-slate-500/30 via-blue-600/20 to-neutral-700/30 hover:from-slate-500/40 hover:to-blue-600/30',
    },
    {
      title: 'Stay Ahead of the Narrative',
      description: 'Real-time alerts for sentiment shifts and key developments.',
      Icon: Bell,
      gradient: 'from-blue-400/20 via-zinc-600/20 to-slate-700/30 hover:from-blue-400/30 hover:to-slate-700/40',
    },
  ];

  const features = [
    {
      title: 'Real-time Trend Detection',
      description: 'Stay ahead of the curve with our AI-powered trend detection system that analyzes millions of data points across social media, news, and blockchain data.',
      imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=800',
      benefits: [
        'Breaking News Alerts',
        'Social Sentiment',
        'Volume Analysis',
      ],
      gradient: 'from-blue-400/20 via-zinc-600/10 to-slate-800/20 hover:from-blue-400/30',
    },
    {
      title: 'Professional Grade Charts',
      description: 'Create stunning visualizations with our comprehensive charting tools. Export high-resolution images ready for publication.',
      imageUrl: 'https://images.unsplash.com/photo-1642790551116-18e4f8f6c637?auto=format&fit=crop&q=80&w=800',
      benefits: [
        'Custom Themes',
        'Multiple Formats',
        'Interactive Data',
      ],
      gradient: 'from-slate-400/20 via-blue-600/10 to-neutral-800/20 hover:from-slate-400/30',
    },
    {
      title: 'Content Creation Tools',
      description: 'Access a suite of tools designed to help you create compelling crypto content that resonates with your audience.',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
      benefits: [
        'Data Visualization',
        'Export Options',
        'Trend Analysis',
      ],
      gradient: 'from-blue-400/20 via-slate-600/10 to-zinc-800/20 hover:from-blue-400/30',
    },
  ];

  const metrics = [
    { value: "2M+", label: "Articles Published", gradient: 'from-blue-400/30 to-zinc-700/30 hover:from-blue-400/40' },
    { value: "150K", label: "Daily Readers", gradient: 'from-slate-400/30 to-blue-700/30 hover:from-slate-400/40' },
    { value: "98%", label: "Accuracy Rate", gradient: 'from-blue-400/30 to-slate-700/30 hover:from-blue-400/40' },
    { value: "24/7", label: "Real-time Updates", gradient: 'from-slate-400/30 to-blue-700/30 hover:from-slate-400/40' },
  ];

  const logos = [
    { name: "CoinDesk", url: "https://www.coindesk.com/logo.svg" },
    { name: "CryptoNews", url: "https://cryptonews.com/logo.svg" },
  ];

  return (
    <>
      <SEO
        title="Bitcoin Journalism & Story Discovery - Perception"
        description="Discover emerging trends, decode sentiment, and create data-backed Bitcoin stories. Track breaking news and trends from top publications with tools built for content creators."
        url="https://perception.to/landing/journalist"
        keywords={['Bitcoin journalism', 'cryptocurrency news', 'media research', 'story discovery', 'Bitcoin trends', 'crypto content creation', 'data journalism', 'market sentiment']}
      />
      <div className="relative">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),rgba(59,130,246,0)_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(206,78,83,0.15),rgba(206,78,83,0)_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-background to-transparent" />
      </div>

      <HeroSection
        segment="journalist"
        title="Uncover the stories that matter in Bitcoin"
        subtitle="Discover emerging trends, decode sentiment, and create data-backed stories with tools built for the fast-paced world of content creation"
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
          title="Everything you need to create engaging crypto content"
          subtitle="Transform complex market data into compelling stories that your audience will love"
          benefits={benefits}
        />

        <TestimonialSection
          metrics={metrics}
          logos={[]}
        />
        
        <div className="mt-16 sm:mt-20 space-y-16 sm:space-y-20">
          <FeatureSection features={features} />
          
          <CTASection
            title="Start creating data-driven content today"
            subtitle="Join thousands of content creators who use our platform to stay ahead of the crypto narrative"
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
    </>
  );
}