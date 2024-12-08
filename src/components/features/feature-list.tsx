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
    title: 'Lightning Fast',
    description: 'Experience blazing-fast performance with our optimized infrastructure.',
    Icon: Zap,
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-grade security ensuring your data is always protected.',
    Icon: Shield,
  },
  {
    title: 'Advanced Analytics',
    description: 'Gain deep insights with our powerful analytics tools.',
    Icon: BarChart,
  },
  {
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team in real-time.',
    Icon: Users,
  },
  {
    title: 'Smart Automation',
    description: 'Save time with intelligent automation features.',
    Icon: Clock,
  },
  {
    title: 'Cloud Integration',
    description: 'Seamlessly integrate with your favorite cloud services.',
    Icon: Cloud,
  },
  {
    title: 'Workflow Builder',
    description: 'Create custom workflows that match your business needs.',
    Icon: Workflow,
  },
  {
    title: 'Version Control',
    description: 'Track changes and manage versions with ease.',
    Icon: GitBranch,
  },
  {
    title: 'API Access',
    description: 'Full API access for custom integrations and extensions.',
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