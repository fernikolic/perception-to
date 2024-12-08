import { ComposedChart } from './charts/composed-chart';
import { TrendingTopics } from './trends';

// Generate mock data for the last 12 months
const generateMockData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2023, i).toLocaleString('default', { month: 'short' }),
    price: Math.floor(20000 + Math.random() * 30000 + i * 2000),
    sentiment: Math.floor(40 + Math.random() * 60),
  }));
};

const chartData = generateMockData();

export function Features() {
  return (
    <section id="features" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.05),transparent)]" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="text-sm font-medium">Market Analysis</span>
          </div>
          
          <h2 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
            Real-Time Crypto Insights
          </h2>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Track Bitcoin price movements and market sentiment with our advanced analytics.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ComposedChart data={chartData} />
          <TrendingTopics />
        </div>
      </div>
    </section>
  );
}