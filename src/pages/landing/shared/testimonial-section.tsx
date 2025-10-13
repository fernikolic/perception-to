interface Tweet {
  id: string;
  gradient?: string;
}

interface Metric {
  value: string;
  label: string;
  gradient?: string;
}

interface Logo {
  name: string;
  url: string;
}

interface TestimonialSectionProps {
  tweets?: Tweet[];
  metrics: Metric[];
  logos: Logo[];
}

export function TestimonialSection({ tweets = [], metrics, logos }: TestimonialSectionProps) {
  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {tweets.length > 0 && (
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2 mb-8 sm:mb-12">
            {tweets.map((tweet) => (
              <div
                key={tweet.id}
                className={`group relative rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${tweet.gradient || 'from-white/5 to-white/10'} hover:shadow-lg hover:shadow-white/5 border border-white/10`}
              >
                <blockquote className="twitter-tweet" data-theme="dark">
                  <a href={`https://twitter.com/x/status/${tweet.id}`}></a>
                </blockquote>
              </div>
            ))}
          </div>
        )}

        <div className="mx-auto grid max-w-2xl grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-8">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className={`group relative rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${metric.gradient || 'from-white/5 to-white/10'} hover:shadow-lg hover:shadow-white/5 border border-white/10`}
            >
              <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                {metric.label}
              </p>
              <p className="mt-1 sm:mt-2 flex items-baseline gap-x-2">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  {metric.value}
                </span>
              </p>
            </div>
          ))}
        </div>

        {logos.length > 0 && (
          <div className="relative mt-12 sm:mt-16">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs sm:text-sm text-muted-foreground">
                Trusted by
              </span>
            </div>
            <div className="mx-auto mt-8 sm:mt-12 lg:mt-16 grid max-w-4xl grid-cols-2 items-center gap-x-8 gap-y-10 sm:gap-x-12 sm:gap-y-16 sm:max-w-5xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {logos.map((logo) => (
                <img
                  key={logo.name}
                  className="col-span-1 max-h-16 sm:max-h-20 lg:max-h-24 w-full object-contain mix-blend-lighten opacity-75 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 filter"
                  src={logo.url}
                  alt={logo.name}
                  width={316}
                  height={96}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}