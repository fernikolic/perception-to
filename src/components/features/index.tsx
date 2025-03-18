import { ComposedChart } from './charts/composed-chart';
import { TrendingTopics } from './trends';
import { XCircle, ChevronDown } from 'lucide-react';

const painPoints = [
  {
    problem: 'No real-time sentiment data available',
    consequence: 'Miss critical narrative shifts that drive price movements',
  },
  {
    problem: 'Manual tracking across social media',
    consequence: 'Waste hours reading Twitter and Reddit to gauge market sentiment',
  },
  {
    problem: 'Scattered market narratives',
    consequence: 'Lose track of how different stories impact market sentiment',
  },
  {
    problem: 'Multiple disconnected tools',
    consequence: 'Can\'t correlate sentiment with price movements effectively',
  },
  {
    problem: 'Limited historical sentiment data',
    consequence: 'Can\'t learn from past narrative-driven market moves',
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
            <span className="text-sm font-medium">Market Sentiment Challenges</span>
          </div>
          
          <h2 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Why Bitcoin market narratives are hard to track
          </h2>

          <p className="mt-6 text-xl text-muted-foreground">
            No platform offers real-time sentiment data. Hours spent scrolling through social media. Missed narrative shifts. Here's why tracking Bitcoin market sentiment is broken.
          </p>

          <div className="mt-8 flex justify-center">
            <ChevronDown className="h-8 w-8 animate-bounce text-muted-foreground" />
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid grid-cols-1 gap-8 sm:gap-12">
            {painPoints.map((point, index) => (
              <div 
                key={index}
                className="group relative flex items-start gap-6 rounded-xl border border-primary/10 bg-gradient-to-br from-blue-100/[0.5] via-blue-50/[0.3] to-transparent dark:from-blue-950/[0.05] dark:via-blue-950/[0.03] dark:to-transparent p-8 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Enhanced gradient overlay with glow effect */}
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-blue-200/[0.3] via-blue-100/[0.2] to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 dark:from-blue-400/[0.07] dark:via-blue-950/[0.05] dark:to-transparent" />
                <div className="absolute inset-0 -z-10 rounded-xl bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)] opacity-0 transition-all duration-500 group-hover:opacity-100" />

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
              The solution:
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
              Real-time Bitcoin market intelligence
            </span>
          </h2>

          <p className="mt-6 text-xl text-muted-foreground">
            Get actionable insights, spot trends early, and make informed decisions with confidence.
          </p>

          <div className="mt-8 flex justify-center">
            <ChevronDown className="h-8 w-8 animate-bounce text-muted-foreground" />
          </div>
        </div>
        
        <div className="mx-auto mt-8 grid grid-cols-1 gap-16">
          {/* First row - Sentiment & Price */}
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
            <div className="text-left lg:pr-8">
              <h3 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Track sentiment and price movements
              </h3>
              <p className="mt-4 text-xl text-muted-foreground">
                See how market sentiment correlates with price movements across social media, news, and community discussions.
              </p>
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
                Stay ahead of market trends
              </h3>
              <p className="mt-4 text-xl text-muted-foreground">
                Get real-time alerts on emerging narratives and market-moving trends, filtered from the noise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}