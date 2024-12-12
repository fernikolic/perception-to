import { ComposedChart } from './charts/composed-chart';
import { TrendingTopics } from './trends';
import { XCircle } from 'lucide-react';

const painPoints = [
  {
    problem: 'Tracking sentiment across Twitter, Reddit, and the news manually',
    consequence: 'Missed critical shifts 😟',
  },
  {
    problem: 'Scanning endless articles and threads for trends',
    consequence: 'Drowning in noise 🌊',
  },
  {
    problem: 'Missing key market-moving developments',
    consequence: 'Missed trading opportunities 💸',
  },
  {
    problem: 'Switching between dozens of tools for sentiment, price analysis, and news',
    consequence: 'Burnt out 🔥',
  },
  {
    problem: 'Trying to predict trends without data',
    consequence: 'Flying blind 🕶️',
  },
];

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
        {/* Pain Points Section */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="text-sm font-medium">Current Workflow</span>
          </div>
          
          <h2 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
            Stop letting your workflow look like this:
          </h2>
        </div>

        <div className="mx-auto mt-16 max-w-2xl">
          <div className="space-y-8">
            {painPoints.map((point, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/[0.07]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                  <XCircle className="h-6 w-6 text-red-500" />
                </div>
                
                <div>
                  <p className="text-base font-medium leading-7">
                    {point.problem}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    → {point.consequence}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Section */}
        <div className="mx-auto mt-32 max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="text-sm font-medium">Market Analysis</span>
          </div>
          
          <h2 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
            There is a better way: Decode Bitcoin market sentiment in one place
          </h2>
          
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Get instant updates on Bitcoin market psychology with our sentiment pulse. Spot sentiment shifts before they impact price.
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