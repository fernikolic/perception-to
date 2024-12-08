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
    },
    {
      title: 'Correlate Sentiment with Price',
      description: 'Advanced tools to identify how emotions drive price movements.',
      Icon: LineChart,
    },
    {
      title: 'Stay Ahead of the Market',
      description: 'Breaking trend insights keep you informed before the market reacts.',
      Icon: Shield,
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
    },
  ];

  const testimonials = [
    {
      content: "This platform is my secret weapon for spotting early Bitcoin trends and making informed trades.",
      author: {
        name: "Michael Chen",
        role: "Senior Trader",
        company: "Crypto Capital",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      },
    },
    {
      content: "The sentiment analysis tools have given me a significant edge in identifying market trends early.",
      author: {
        name: "Sarah Kim",
        role: "Portfolio Manager",
        company: "Digital Assets Fund",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      },
    },
  ];

  const metrics = [
    { value: "$2B+", label: "Assets Analyzed" },
    { value: "150ms", label: "Avg. Response Time" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Market Coverage" },
  ];

  const logos = [
    { name: "Binance", url: "https://www.binance.com/logo.svg" },
    { name: "Kraken", url: "https://www.kraken.com/logo.svg" },
  ];

  return (
    <div>
      <HeroSection
        segment="investor"
        title="Make Data-Driven Decisions: Stay Ahead of Bitcoin Market Trends"
        subtitle="Track real-time sentiment, discover emerging trends, and decode market psychology to gain the edge you need in Bitcoin trading."
        ctaText="Start Your Free Trial Today and Trade Smarter"
        backgroundClass="bg-gradient-to-b from-green-500/5 to-blue-500/5"
      />
      
      <ValuePropSection
        title="Everything You Need to Trade Smarter"
        subtitle="Make data-driven decisions with our comprehensive suite of trading tools."
        benefits={benefits}
      />
      
      <FeatureSection features={features} />
      
      <TestimonialSection
        testimonials={testimonials}
        metrics={metrics}
        logos={logos}
      />
      
      <CTASection
        title="Start Trading with Confidence"
        subtitle="Join professional traders who use our platform to gain a competitive edge."
        primaryCTA="Start Free Trial"
        secondaryCTA="View Pricing"
      />
    </div>
  );
}