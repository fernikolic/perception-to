import { cn } from "@/lib/utils";

const publications = [
  {
    name: "Cointelegraph",
    logo: "https://downloadr2.apkmirror.com/wp-content/uploads/2024/05/57/6659dbea9743a_cointelegraph.com.png",
    url: "https://cointelegraph.com/news/bitcoins-change-in-media-perception-from-0-to-100000-dollars",
  },
  {
    name: "Forbes",
    logo: "https://www.cdnlogo.com/logos/f/75/forbes.svg",
    url: "https://web.archive.org/web/20240904132826/https://www.forbes.com/sites/digital-assets/2024/09/04/bbc-bitcoin-coverage-raises-concern-over-its-journalism-and-trust/",
  },
  {
    name: "Bitcoin Magazine",
    logo: "https://store.bitcoinmagazine.com/cdn/shop/files/Bitcoin_Magazine_Logos_1.png?v=1631070162",
    url: "https://bitcoinmagazine.com/culture/left-leaning-outlets-amplify-their-anti-bitcoin-bias-following-trumps-endorsement-",
  },
  {
    name: "BTC Times",
    logo: "https://pbs.twimg.com/profile_images/1805169646661976064/Hz1nqCXI_400x400.jpg",
    url: "https://btctimes.com/bitcoin-perception-releases-report-on-mainstream-medias-reaction-to-el-salvadors-bitcoin-journey/",
  },
  {
    name: "Binance",
    logo: "https://public.bnbstatic.com/image/pgc/202310/4f74b69ed53c1d3c0f3d6d30f54155bb.png",
    url: "https://www.binance.com/en/square/post/17159960284914",
  },
];

export function AsSeenOn() {
  return (
    <section id="as-seen-on" className="relative border-t border-white/5">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/5 via-slate-900/5 to-transparent" />
      
      {/* Radial gradients for depth */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(30,58,138,0.05),transparent_50%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <p className="text-center text-base font-medium tracking-wider text-muted-foreground/80">
          As featured in
        </p>
        <div className="mx-auto mt-16 grid grid-cols-2 items-center gap-x-12 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {publications.map((publication) => (
            <a
              key={publication.name}
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group relative flex h-28 items-center justify-center",
                "transition-all duration-300",
                "hover:opacity-100"
              )}
            >
              {/* Hover effect */}
              <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-b from-blue-950/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <img
                className="max-h-20 w-auto max-w-[14.5rem] object-contain transition-all duration-300 group-hover:scale-105"
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