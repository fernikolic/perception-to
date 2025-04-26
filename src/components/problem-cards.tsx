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
    <section className="relative bg-gray-50 py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight text-gray-900 mb-4">
              Information fragmentation is costing professionals time and clarity
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Our research shows that decision-makers spend 3+ hours daily trying to identify key market signals and trends.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Sentiment Card */}
          <div className="flex flex-col bg-gray-50 rounded-xl p-4 sm:p-5">
            <div className="aspect-[3/2] relative overflow-hidden mb-4 bg-white rounded-xl">
              <img
                src="/images/Where sentiment is headed.png"
                alt="Where sentiment is headed visualization"
                className="absolute inset-0 w-full h-full object-contain transform scale-100 p-2"
              />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extralight leading-tight">
              Quantify the mood
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Live Perception Index™ and multi-channel heat-maps
            </p>
          </div>

          {/* Narratives Card */}
          <div className="flex flex-col bg-gray-50 rounded-xl p-4 sm:p-5">
            <div className="aspect-[3/2] relative overflow-hidden mb-4 bg-white rounded-xl">
              <img
                src="/images/Which narratives are gaining traction.png"
                alt="Which narratives are gaining traction visualization"
                className="absolute inset-0 w-full h-full object-contain transform scale-100 p-2"
              />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extralight leading-tight">
              Spot pivots early
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Trend clusters surface narrative shifts in real time
            </p>
          </div>

          {/* Market Actors Card */}
          <div className="flex flex-col bg-gray-50 rounded-xl p-4 sm:p-5">
            <div className="aspect-[3/2] relative overflow-hidden mb-4 bg-white rounded-xl">
              <div className="absolute inset-0 w-full h-full p-2 overflow-auto font-mono text-xs sm:text-sm" style={{ background: "#1e293b" }}>
                <pre className="text-green-400 p-2">
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
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#1e293b] to-transparent"></div>
              </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extralight leading-tight">
              Drop it where you work
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Hourly Slack digests, rich dashboard, or API & Excel formulas
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 