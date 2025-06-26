import { useEffect, useState } from 'react';

export function ProblemCards() {
  const [currentDate, setCurrentDate] = useState('');
  const [tomorrowDate, setTomorrowDate] = useState('');
  
  useEffect(() => {
    // Format current date as YYYY-MM-DD
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    setCurrentDate(formattedToday);
    
    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedTomorrow = tomorrow.toISOString().split('T')[0];
    setTomorrowDate(formattedTomorrow);
  }, []);

  return (
    <section className="relative py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-4xl text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight text-gray-900 dark:text-gray-100 mb-8 leading-tight">
            Information fragmentation is costing
            <br />
            professionals{' '}
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent font-light">
              time and clarity
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Our research shows that decision-makers spend 3+ hours daily trying to identify key market signals and trends.
          </p>
        </div>

        {/* Feature Cards - Stacked Vertically */}
        <div className="space-y-16">
          {/* Sentiment Card */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 order-2 lg:order-1">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-tight text-gray-900 dark:text-gray-100 mb-6">
                Quantify the mood
              </h3>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                Live intelligence feeds and multi-channel analytics dashboard that transforms scattered sentiment data into actionable insights.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <span>Real-time sentiment tracking</span>
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2">
              <div className="aspect-[4/3] relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
                <img
                  src="/images/Where sentiment is headed.png"
                  alt="Where sentiment is headed visualization"
                  className="absolute inset-0 w-full h-full object-contain p-6"
                />
              </div>
            </div>
          </div>

          {/* Narratives Card */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            <div className="flex-1">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-tight text-gray-900 dark:text-gray-100 mb-6">
                Spot pivots early
              </h3>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                Trend clusters surface narrative shifts in real time, giving you the edge to anticipate market movements before they become mainstream.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Emerging narrative detection</span>
              </div>
            </div>
            <div className="flex-1">
              <div className="aspect-[4/3] relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-2xl">
                <img
                  src="/images/Which narratives are gaining traction.png"
                  alt="Which narratives are gaining traction visualization"
                  className="absolute inset-0 w-full h-full object-contain p-6"
                />
              </div>
            </div>
          </div>

          {/* Market Actors Card */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 order-2 lg:order-1">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extralight tracking-tight text-gray-900 dark:text-gray-100 mb-6">
                Drop it where you work
              </h3>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
                Hourly Slack digests, rich dashboard, or API & Excel formulas - integrate intelligence seamlessly into your existing workflow.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Seamless workflow integration</span>
              </div>
            </div>
            <div className="flex-1 order-1 lg:order-2">
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-900 dark:bg-gray-800 rounded-2xl shadow-2xl">
                <div className="absolute inset-0 w-full h-full p-6 overflow-auto font-mono text-sm">
                  <pre className="text-emerald-400">
                    <code>
{`{
  "${currentDate}": {
    "Research": [
      { "sentiment": "Positive", "total_entries": 120, "percentage": 60.0 },
      { "sentiment": "Neutral", "total_entries": 50, "percentage": 25.0 },
      { "sentiment": "Negative", "total_entries": 30, "percentage": 15.0 }
    ],
    "Tech Media": [
      { "sentiment": "Positive", "total_entries": 80, "percentage": 40.0 },
      { "sentiment": "Neutral", "total_entries": 70, "percentage": 35.0 },
      { "sentiment": "Negative", "total_entries": 50, "percentage": 25.0 }
    ]
  },
  "${tomorrowDate}": { "...": "..." }
}`}
                    </code>
                  </pre>
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-900 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 