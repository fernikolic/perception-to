import { HeroSection } from '../shared/hero-section';
import { ValuePropSection } from '../shared/value-prop-section';
import { FeatureSection } from '../shared/feature-section';
import { TestimonialSection } from '../shared/testimonial-section';
import { CTASection } from '../shared/cta-section';
import { FileText, TrendingUp, Bell } from 'lucide-react';

export function JournalistLanding() {
  const benefits = [
    {
      title: 'Find the Next Big Story',
      description: 'Track breaking news and trends from top publications and platforms.',
      Icon: TrendingUp,
    },
    {
      title: 'Data-Driven Storytelling',
      description: 'Visualize sentiment and trends to add depth to your content.',
      Icon: FileText,
    },
    {
      title: 'Stay Ahead of the Narrative',
      description: 'Real-time alerts for sentiment shifts and key developments.',
      Icon: Bell,
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
    },
  ];

  const testimonials = [
    {
      content: "This platform helped me uncover trends that shaped some of my most-read articles. A must-have for journalists covering Bitcoin.",
      author: {
        name: "Sarah Chen",
        role: "Senior Crypto Reporter",
        company: "CryptoNews Daily",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      },
    },
    {
      content: "The data visualization tools have transformed how I present complex crypto concepts to my audience.",
      author: {
        name: "Michael Torres",
        role: "Content Creator",
        company: "Crypto Insights",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      },
    },
  ];

  const metrics = [
    { value: "2M+", label: "Articles Published" },
    { value: "150K", label: "Daily Readers" },
    { value: "98%", label: "Accuracy Rate" },
    { value: "24/7", label: "Real-time Updates" },
  ];

  const logos = [
    { name: "CoinDesk", url: "https://www.coindesk.com/logo.svg" },
    { name: "CryptoNews", url: "https://cryptonews.com/logo.svg" },
  ];

  return (
    <div>
      <HeroSection
        segment="journalist"
        title="Uncover the Stories That Matter in Bitcoin"
        subtitle="Discover emerging trends, decode sentiment, and create data-backed stories with tools built for the fast-paced world of content creation."
        ctaText="Sign Up Now and Start Building Data-Backed Stories"
        backgroundClass="bg-gradient-to-b from-blue-500/5 to-purple-500/5"
      />
      
      <ValuePropSection
        title="Everything You Need to Create Engaging Crypto Content"
        subtitle="Transform complex market data into compelling stories that your audience will love."
        benefits={benefits}
      />
      
      <FeatureSection features={features} />
      
      <TestimonialSection
        testimonials={testimonials}
        metrics={metrics}
        logos={logos}
      />
      
      <CTASection
        title="Start Creating Data-Driven Content Today"
        subtitle="Join thousands of content creators who use our platform to stay ahead of the crypto narrative."
        primaryCTA="Start Free Trial"
        secondaryCTA="Schedule Demo"
      />
    </div>
  );
}