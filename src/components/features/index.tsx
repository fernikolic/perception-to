import { ComposedChart } from './charts/composed-chart';
import { TrendingTopics } from './trends';
import { XCircle, ChevronDown } from 'lucide-react';

const painPoints = [
  {
    problem: 'Manual sentiment analysis across multiple platforms',
    consequence: 'Delayed response to market shifts',
  },
  {
    problem: 'Information overload from unstructured data sources',
    consequence: 'Reduced analytical effectiveness',
  },
  {
    problem: 'Fragmented market intelligence',
    consequence: 'Missed strategic opportunities',
  },
  {
    problem: 'Multiple disconnected analysis tools',
    consequence: 'Inefficient workflow and decision-making',
  },
  {
    problem: 'Limited access to comprehensive market data',
    consequence: 'Incomplete market understanding',
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
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1">
            <span className="text-sm font-medium">Market Analysis Challenges</span>
          </div>
          
          <h2 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Critical Challenges in Bitcoin Market Analysis
          </h2>

          <div className="mt-8 flex justify-center">
            <ChevronDown className="h-8 w-8 animate-bounce text-muted-foreground" />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid grid-cols-1 gap-8 sm:gap-12">
            {painPoints.map((point, index) => (
              <div 
                key={index}
                className="group relative flex items-start gap-6 rounded-xl border border-primary/10 bg-blue-950/[0.03] dark:bg-card p-8 shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Subtle gradient overlay that appears on hover */}
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-b from-blue-950/[0.07] to-blue-950/[0.03] opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-500/5 dark:to-transparent" />

                {/* Card content wrapper */}
                <div className="relative flex items-start gap-6 w-full">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-500/10 transition-colors duration-300 group-hover:bg-red-500/20">
                    <XCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-xl font-semibold leading-7 tracking-tight">
                      {point.problem}
                    </p>
                    <p className="text-base text-muted-foreground/90">
                      Result: {point.consequence}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Solution Section */}
        <div className="mx-auto mt-32 max-w-2xl text-center">
          <h2 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl flex flex-col gap-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              There is a better way:
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              Decode Bitcoin market sentiment in one place
            </span>
          </h2>

          <div className="mt-8 flex justify-center">
            <ChevronDown className="h-8 w-8 animate-bounce text-muted-foreground" />
          </div>
        </div>
        
        <div className="mx-auto mt-8 grid grid-cols-1 gap-16">
          {/* First row - Sentiment & Price */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            <div className="text-left lg:pr-8">
              <h3 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Correlate sentiment with price movements
              </h3>
            </div>
            <div className="w-full">
              <ComposedChart data={chartData} />
            </div>
          </div>
          
          {/* Second row - Breaking Trends */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            <div className="w-full order-last lg:order-first">
              <TrendingTopics />
            </div>
            <div className="text-left lg:text-right lg:pl-8">
              <h3 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Track breaking trends without the noise
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}