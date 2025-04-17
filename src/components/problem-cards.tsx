export function ProblemCards() {
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
              Know where sentiment<br />
              is headed
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Track the evolution of sentiment across social media, news, and institutional commentary.
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
              Know which narratives<br />
              are gaining traction
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Identify emerging themes and narratives that shape market perception and price action.
            </p>
          </div>

          {/* Market Actors Card */}
          <div className="flex flex-col bg-gray-50 rounded-xl p-4 sm:p-5">
            <div className="aspect-[3/2] relative overflow-hidden mb-4 bg-white rounded-xl">
              <img
                src="/images/How different market actors are reacting.png"
                alt="How different market actors are reacting visualization"
                className="absolute inset-0 w-full h-full object-contain transform scale-100 p-2"
              />
            </div>
            <h3 className="text-2xl sm:text-3xl font-extralight leading-tight">
              Know how market<br />
              actors are reacting
            </h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Monitor how different market participants are responding to news and events in real-time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 