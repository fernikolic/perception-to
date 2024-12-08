import { cn } from "@/lib/utils";

const publications = [
  {
    name: "CoinDesk",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/CoinDesk_logo.svg/792px-CoinDesk_logo.svg.png?20221224092106",
  },
  {
    name: "Forbes",
    logo: "https://www.cdnlogo.com/logos/f/75/forbes.svg",
  },
  {
    name: "Bitcoin Magazine",
    logo: "https://store.bitcoinmagazine.com/cdn/shop/files/Bitcoin_Magazine_Logos_1.png?v=1631070162",
  },
  {
    name: "BTC Times",
    logo: "https://pbs.twimg.com/profile_images/1214998240/btc_400x400.png",
  },
];

export function AsSeenOn() {
  return (
    <section className="border-t border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <p className="text-center text-sm font-semibold leading-8 text-muted-foreground">
          As featured in
        </p>
        <div className="mx-auto mt-6 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10">
          {publications.map((publication) => (
            <div
              key={publication.name}
              className={cn(
                "col-span-2 max-h-12 w-full object-contain lg:col-span-1",
                "transition-all duration-300 hover:opacity-100",
                "opacity-70 grayscale hover:grayscale-0"
              )}
            >
              <img
                className="h-full w-full object-contain"
                src={publication.logo}
                alt={publication.name}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}