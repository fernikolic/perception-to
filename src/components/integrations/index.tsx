import { IntegrationCard } from "./integration-card";

const integrations = [
  {
    name: "Reddit",
    icon: "https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png",
  },
  {
    name: "X",
    icon: "https://cdn.prod.website-files.com/5d66bdc65e51a0d114d15891/64cebc6c19c2fe31de94c78e_X-vector-logo-download.png",
  },
  {
    name: "GitHub",
    icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
  },
  {
    name: "Bloomberg",
    icon: "https://logos-world.net/wp-content/uploads/2022/01/Bloomberg-Logo.png",
  },
  {
    name: "The Block",
    icon: "https://getlogovector.com/wp-content/uploads/2022/09/the-block-crypto-simplified-logo-vector-2022.png",
  },
  {
    name: "CoinDesk",
    icon: "https://www.nasdaq.com/sites/acquia.prod/files/2022/11/09/coindesksquare.jpg",
  },
  {
    name: "MSNBC",
    icon: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8109726-9708-48ac-b7ae-68e564aa6843/dfh3573-a1a61bac-92ea-48ce-8e88-61b458321bb1.png/v1/fill/w_1280,h_1280/msnbc_logo_by_zacktastic2006_dfh3573-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4MTA5NzI2LTk3MDgtNDhhYy1iN2FlLTY4ZTU2NGFhNjg0M1wvZGZoMzU3My1hMWE2MWJhYy05MmVhLTQ4Y2UtOGU4OC02MWI0NTgzMjFiYjEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.QbOiw0w6kCPpgK76cXzhxXjlV2VW4hwk81XSoYavAhE",
  },
  {
    name: "The Financial Times",
    icon: "https://seeklogo.com/images/F/financial-times-corporate-logo-1D9DF9C0BC-seeklogo.com.png",
  },
  {
    name: "The Guardian",
    icon: "https://assets-legacy.floridarrc.com/2023/01/the-guardian-logo.jpeg",
  },
  {
    name: "CNN",
    icon: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Cnn_logo_red_background.png",
  },
  {
    name: "Forbes",
    icon: "https://logodownload.org/wp-content/uploads/2017/04/forbes-logo-0.png",
  },
  {
    name: "Reuters",
    icon: "https://cdn.icon-icons.com/icons2/2699/PNG/512/reuters_logo_icon_170782.png",
  },
  {
    name: "Wall Street Journal",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYZxSs94SaRvElupvRZSChbVZiSNq_qVHLhQ&s",
  },
  {
    name: "CNBC",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/cnbc.svg",
  },
  {
    name: "BBC",
    icon: "https://ichef.bbci.co.uk/images/ic/400x225/p09xtmrn.jpg",
  },
  {
    name: "Yahoo Finance",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/yahoo.svg",
  },
  {
    name: "Decrypt",
    icon: "https://wp.decrypt.co/wp-content/uploads/2019/04/decrypt_logo-300x300.png",
  },
  {
    name: "Cointelegraph",
    icon: "https://media.licdn.com/dms/image/v2/C560BAQHvGx_kLN7HFg/company-logo_200_200/company-logo_200_200/0/1631432721352?e=2147483647&v=beta&t=uREYaN-A-Dw_6XcXwwxhvJIFhRWeeGDukPfLQO7IRp4",
  },
];

// First, let's modify the rows creation to include more duplicates for smoother scrolling
const rows = [
  integrations.slice(0, 3),
  integrations.slice(3, 6),
  integrations.slice(6, 9),
  integrations.slice(9, 12),
  integrations.slice(12, 15),
  integrations.slice(15, 18),
];

export function Integrations() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.05),transparent)]" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Monitor sentiment across 200+ channels
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Quickly track positive, negative, or neutral sentiment in the media to understand how Bitcoin is being discussed globally.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="relative flex flex-col gap-4 mask-gradient">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex gap-4 py-4 animate-scroll ${
                  rowIndex % 2 === 0 ? 'animate-scroll-left' : 'animate-scroll-right'
                }`}
              >
                {/* Quadruple the items to ensure smooth infinite scroll */}
                {[...row, ...row, ...row, ...row].map((integration, index) => (
                  <div
                    key={`${integration.name}-${index}`}
                    className="w-[300px] flex-shrink-0"
                  >
                    <IntegrationCard {...integration} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}