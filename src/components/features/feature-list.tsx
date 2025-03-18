import { 
  Zap, 
  Shield, 
  BarChart, 
  Users,
  Clock,
  Cloud,
  Workflow,
  GitBranch,
  Layers
} from 'lucide-react';
import { FeatureCard } from './feature-card';

const features = [
  {
    title: 'Real-Time Analysis',
    description: 'Get market insights instantly with our optimized infrastructure.',
    Icon: Zap,
  },
  {
    title: 'Enterprise Security',
    description: 'Your data is protected with industry-standard encryption and security protocols.',
    Icon: Shield,
  },
  {
    title: 'Market Analytics',
    description: 'Access comprehensive tools for market analysis and trend tracking.',
    Icon: BarChart,
  },
  {
    title: 'Team Collaboration',
    description: 'Work together with your team on market insights in real-time.',
    Icon: Users,
  },
  {
    title: 'Smart Workflows',
    description: 'Automate routine tasks and focus on high-impact analysis.',
    Icon: Clock,
  },
  {
    title: 'Cloud Integration',
    description: 'Connect with your existing tools and services seamlessly.',
    Icon: Cloud,
  },
  {
    title: 'Custom Workflows',
    description: 'Build workflows that match your trading strategy.',
    Icon: Workflow,
  },
  {
    title: 'Version Control',
    description: 'Track changes and maintain analysis history.',
    Icon: GitBranch,
  },
  {
    title: 'API Access',
    description: 'Integrate with your existing trading systems via API.',
    Icon: Layers,
  },
];

export function FeatureList() {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </div>
  );
}