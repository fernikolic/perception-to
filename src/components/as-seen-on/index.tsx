import { cn } from "@/lib/utils";

const publications = [
  {
    name: "Cointelegraph",
    logo: "/logos/Cointelegraph_Logo-removebg-preview.png",
    url: "https://cointelegraph.com/news/bitcoins-change-in-media-perception-from-0-to-100000-dollars",
  },
  {
    name: "Forbes",
    logo: "/logos/Forbes-logo-white.png",
    url: "https://web.archive.org/web/20240904132826/https://www.forbes.com/sites/digital-assets/2024/09/04/bbc-bitcoin-coverage-raises-concern-over-its-journalism-and-trust/",
  },
  {
    name: "Bitcoin Magazine",
    logo: "/logos/BTC_Mag_Logo-removebg-preview.png",
    url: "https://bitcoinmagazine.com/culture/left-leaning-outlets-amplify-their-anti-bitcoin-bias-following-trumps-endorsement-",
  },
  {
    name: "Binance",
    logo: "/logos/binance_square_logo-removebg-preview.png",
    url: "https://www.binance.com/en/square/post/17159960284914",
  },
];

export function AsSeenOn() {
  return (
    <section id="as-seen-on" className="relative border-t border-white/5 bg-black">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />
      
      {/* Radial gradients for depth */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,58,138,0.1),transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-8 lg:px-12 py-20 sm:py-24 lg:py-28">
        <p className="text-center text-base sm:text-lg lg:text-xl font-semibold tracking-wide text-muted-foreground/80 uppercase">
          As featured in
        </p>
        <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 items-center justify-items-center gap-x-8 sm:gap-x-10 lg:gap-x-16 gap-y-8 sm:gap-y-10 lg:gap-y-12">
          {publications.map((publication) => (
            <a
              key={publication.name}
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex h-24 sm:h-28 lg:h-32 w-full items-center justify-center",
                "transition-all duration-300",
                "hover:opacity-100"
              )}
            >
              {/* Hover effect */}
              <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-b from-blue-950/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <img
                className="h-auto w-auto max-h-16 sm:max-h-20 lg:max-h-28 max-w-[80%] object-contain transition-all duration-300 group-hover:scale-105"
                src={publication.logo}
                alt={publication.name}
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}