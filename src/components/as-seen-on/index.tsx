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
    <section className="border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <p className="text-center text-sm font-semibold leading-8 text-muted-foreground">
          As featured in
        </p>
        <div className="mx-auto mt-12 flex flex-wrap items-center justify-center gap-x-16 gap-y-10">
          {publications.map((publication) => (
            <a
              key={publication.name}
              href={publication.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex h-24 w-48 flex-shrink-0 items-center justify-center",
                "transition-all duration-300",
                "opacity-90 hover:opacity-100"
              )}
            >
              <img
                className="max-h-20 w-auto max-w-[12rem] object-contain"
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