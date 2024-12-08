import { HeroSection } from '../shared/hero-section';
import { ValuePropSection } from '../shared/value-prop-section';
import { FeatureSection } from '../shared/feature-section';
import { TestimonialSection } from '../shared/testimonial-section';
import { CTASection } from '../shared/cta-section';
import { Database, FileSearch, LineChart } from 'lucide-react';

export function ResearcherLanding() {
  const benefits = [
    {
      title: 'Comprehensive Ecosystem Insights',
      description: 'Analyze data from media, social platforms, and GitHub all in one place.',
      Icon: Database,
    },
    {
      title: 'Narrative Analysis Simplified',
      description: 'Spot long-term narrative trends across channels.',
      Icon: FileSearch,
    },
    {
      title: 'Exportable Insights',
      description: 'Tools to create reports with sentiment graphs, charts, and more.',
      Icon: LineChart,
    },
  ];

  const features = [
    {
      title: 'Multi-channel Trend Discovery',
      description: 'Track sentiment shifts across multiple data sources with our comprehensive trend analysis tools.',
      imageUrl: 'https://images.unsplash.com/photo-1642790551116-18e4f8f6c637?auto=format&fit=crop&q=80&w=800',
      benefits: [
        'Social Media Analysis',
        'News Sentiment',
        'GitHub Activity',
      ],
    },
    {
      title: 'Volume Analysis Tools',
      description: 'Understand narrative dominance and track how different topics gain traction over time.',
      imageUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=800',
      benefits: [
        'Topic Tracking',
        'Trend Analysis',
        'Historical Data',
      ],
    },
    {
      title: 'Report Generation',
      description: 'Create professional reports with our suite of data visualization and export tools.',
      imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
      benefits: [
        'Custom Charts',
        'PDF Export',
        'API Access',
      ],
    },
  ];

  const testimonials = [
    {
      content: "The trend analysis tools have transformed how we approach Bitcoin research. It's a game-changer for understanding the market narrative.",
      author: {
        name: "Dr. Sarah Johnson",
        role: "Lead Researcher",
        company: "Crypto Research Institute",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      },
    },
    {
      content: "The depth and breadth of data available has significantly improved our research capabilities.",
      author: {
        name: "Michael Chen",
        role: "Market Analyst",
        company: "Digital Asset Research",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
      },
    },
  ];

  const metrics = [
    { value: "10TB+", label: "Data Analyzed" },
    { value: "5M+", label: "Daily Data Points" },
    { value: "99.9%", label: "Data Accuracy" },
    { value: "100+", label: "Data Sources" },
  ];

  const logos = [
    { name: "Bloomberg", url: "https://www.bloomberg.com/logo.svg" },
    { name: "Reuters", url: "https://www.reuters.com/logo.svg" },
  ];

  return (
    <div>
      <HeroSection
        segment="researcher"
        title="Analyze Bitcoin Ecosystem Trends with Confidence"
        subtitle="Unlock multi-channel sentiment analysis, track narratives, and discover actionable insights to fuel your research."
        ctaText="Request a Demo and Explore the Insights"
        backgroundClass="bg-gradient-to-b from-purple-500/5 to-blue-500/5"
      />
      
      <ValuePropSection
        title="Everything You Need for Deep Market Analysis"
        subtitle="Access comprehensive tools and data for thorough crypto market research."
        benefits={benefits}
      />
      
      <FeatureSection features={features} />
      
      <TestimonialSection
        testimonials={testimonials}
        metrics={metrics}
        logos={logos}
      />
      
      <CTASection
        title="Start Your Research Today"
        subtitle="Join leading researchers and analysts who trust our platform for their market analysis."
        primaryCTA="Start Free Trial"
        secondaryCTA="Schedule Demo"
      />
    </div>
  );
}