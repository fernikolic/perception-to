import { TrendBarChart } from './trend-bar-chart';
import { useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { BrowserFrame } from '../charts/browser-frame';
import { useRef } from 'react';

export function TrendingTopics() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.1,
  });

  const trendingData = [
    {
      name: "Bitcoin ETF Approval",
      volume: 1200,
      description: "Growing discussion around potential SEC approval"
    },
    {
      name: "Layer 2 Scaling",
      volume: 950,
      description: "Increased focus on Bitcoin scaling solutions"
    },
    {
      name: "Institutional Adoption",
      volume: 800,
      description: "Major financial institutions entering the space"
    }
  ];

  return (
    <div>
      <Card className="overflow-hidden">
        <BrowserFrame url="app.perception.to" />
        <CardContent className="border-none p-6">
          <div ref={ref} className="h-[400px]">
            {isInView && <TrendBarChart data={trendingData} />}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <span>Mock data. </span>
        <a 
          href="https://app.perception.to" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Sign up to access real-time data
        </a>
      </div>
    </div>
  );
}