import { TrendBarChart } from './trend-bar-chart';
import { Card, CardContent } from '@/components/ui/card';
import { BrowserFrame } from '../charts/browser-frame';

const trendingData = [
  {
    name: 'Layer 2 Solutions',
    volume: 48500,
    description: 'Growing adoption of Lightning Network and other Layer 2 scaling solutions.',
  },
  {
    name: 'Mining Difficulty',
    volume: 42000,
    description: 'Bitcoin mining difficulty reaches all-time high as hash rate surges.',
  },
  {
    name: 'Hardware Wallets',
    volume: 35000,
    description: 'Increased focus on self-custody solutions and hardware security.',
  },
  {
    name: 'Regulation Updates',
    volume: 28000,
    description: 'New regulatory frameworks being discussed in major markets.',
  },
  {
    name: 'Price Predictions',
    volume: 22000,
    description: 'Analysis of long-term Bitcoin price movements and market cycles.',
  },
].sort((a, b) => b.volume - a.volume);

export function TrendingTopics() {
  return (
    <Card className="overflow-hidden">
      <BrowserFrame url="app.perception.to" />
      <CardContent className="border-none">
        <div className="h-[400px]">
          <TrendBarChart 
            data={trendingData} 
            description=""
          />
        </div>
      </CardContent>
    </Card>
  );
}