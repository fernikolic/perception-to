import { IntegrationCard } from "./integration-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const integrations = [
  // Social Media & Tech Platforms
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
    icon: "https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png",
  },
  {
    name: "YouTube",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/640px-YouTube_full-color_icon_%282017%29.svg.png",
  },
  {
    name: "Medium",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Medium_logo_Monogram.svg/1200px-Medium_logo_Monogram.svg.png",
  },
  {
    name: "Spotify",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/168px-Spotify_logo_without_text.svg.png",
  },
  {
    name: "Aftenposten",
    icon: "https://app.perception.to/logos/aftenposten%20logo.png",
  },
  {
    name: "Le Monde",
    icon: "https://app.perception.to/logos/Le-Monde-logo.webp",
  },

  // Mainstream Financial Media
  {
    name: "Bloomberg",
    icon: "https://app.perception.to/logos/Bloomberg.svg",
  },
  {
    name: "The Block",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDdyTfJe2gO4jnPxumJfbXhrxyAkuoaeOSdg&s",
  },
  {
    name: "CoinDesk",
    icon: "https://cloudfront-us-east-1.images.arcpublishing.com/coindesk/HIKBTSHOAFEFZNVVHQHMRCLVZA.jpg",
  },
  {
    name: "The Financial Times",
    icon: "https://seeklogo.com/images/F/financial-times-corporate-logo-1D9DF9C0BC-seeklogo.com.png",
  },
  {
    name: "Wall Street Journal",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYZxSs94SaRvElupvRZSChbVZiSNq_qVHLhQ&s",
  },
  {
    name: "Reuters",
    icon: "https://cdn.icon-icons.com/icons2/2699/PNG/512/reuters_logo_icon_170782.png",
  },
  {
    name: "CNBC",
    icon: "https://cdn.icon-icons.com/icons2/2699/PNG/512/cnbc_logo_icon_169378.png",
  },
  {
    name: "Yahoo Finance",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/yahoo.svg",
  },

  // Traditional News Media
  {
    name: "MSNBC",
    icon: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8109726-9708-48ac-b7ae-68e564aa6843/dfh3573-a1a61bac-92ea-48ce-8e88-61b458321bb1.png/v1/fill/w_1280,h_1280/msnbc_logo_by_zacktastic2006_dfh3573-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4MTA5NzI2LTk3MDgtNDhhYy1iN2FlLTY4ZTU2NGFhNjg0M1wvZGZoMzU3My1hMWE2MWJhYy05MmVhLTQ4Y2UtOGU4OC02MWI0NTgzMjFiYjEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.QbOiw0w6kCPpgK76cXzhxXjlV2VW4hwk81XSoYavAhE",
  },
  {
    name: "The Guardian",
    icon: "https://assets-legacy.floridarrc.com/2023/01/the-guardian-logo.jpeg",
  },
  {
    name: "CNN",
    icon: "https://app.perception.to/logos/CNN_International_logo.svg.png",
  },
  {
    name: "BBC",
    icon: "https://app.perception.to/logos/bbc-logo.jpg",
  },
  {
    name: "New York Times",
    icon: "https://media.licdn.com/dms/image/v2/C4E0BAQGjV8MPT_u6Jg/company-logo_200_200/company-logo_200_200/0/1630595948074/nytlive_logo?e=2147483647&v=beta&t=jIPKhXr3Io4bMkYRB7NulJA1aznBK8gJt3FoAS3CH5k",
  },
  {
    name: "Associated Press",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Associated_Press_logo_2012.svg/800px-Associated_Press_logo_2012.svg.png",
  },
  {
    name: "Fox News",
    icon: "https://app.perception.to/logos/Fox_News_Channel_logo.svg.png",
  },
  {
    name: "NPR",
    icon: "https://media.npr.org/assets/img/2019/06/17/npr-logo_sq-98c81a8c70711b4d8fb7aec62dae7a3d5b0a4e23.jpg",
  },

  // Tech & Crypto Media
  {
    name: "Decrypt",
    icon: "https://wp.decrypt.co/wp-content/uploads/2019/04/decrypt_logo-300x300.png",
  },
  {
    name: "Cointelegraph",
    icon: "https://media.licdn.com/dms/image/v2/C560BAQHvGx_kLN7HFg/company-logo_200_200/company-logo_200_200/0/1631432721352?e=2147483647&v=beta&t=uREYaN-A-Dw_6XcXwwxhvJIFhRWeeGDukPfLQO7IRp4",
  },
  {
    name: "Bitcoin Magazine",
    icon: "https://store.bitcoinmagazine.com/cdn/shop/files/Bitcoin_Magazine_Logos_1.png?v=1631070162",
  },
  {
    name: "BTC Times",
    icon: "https://pbs.twimg.com/profile_images/1805169646661976064/Hz1nqCXI_400x400.jpg",
  },
  {
    name: "TechCrunch",
    icon: "https://yt3.googleusercontent.com/ytc/AIdro_kCWnlG0S5KmFxBckuWUwXOaIsmZL7hBkuXa4CFY27vtk_y=s900-c-k-c0x00ffffff-no-rj",
  },
  {
    name: "Wired",
    icon: "https://thesohoagency.co.uk/wp-content/uploads/2024/04/wired-600.jpg",
  },
  {
    name: "Vice News",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Vice_News_logo.png",
  },
  {
    name: "Politico",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Politico_logo.svg/2560px-Politico_logo.svg.png",
  },

  // Additional News Sources
  {
    name: "Forbes",
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsCj05p4vyZ2N9M5ng1gQol10jzx78ePwMXQ&s",
  },
  {
    name: "Business Insider",
    icon: "https://play-lh.googleusercontent.com/rT_YtsKZEiH079xJnuq40Vb_EcejRWskCTkR9uDJKaPliY7gLCkiFRVUfd-bZT0slkcd",
  },
  {
    name: "The Economist",
    icon: "https://icon2.cleanpng.com/20180630/cjf/kisspng-the-economist-0-magazine-chief-executive-creativit-print-digital-5b3700e7c98b27.5315200115303313678255.jpg",
  },
  {
    name: "Bloomberg News",
    icon: "https://app.perception.to/logos/Bloomberg.svg",
  },
  {
    name: "The Hill",
    icon: "https://thehill.com/wp-content/themes/the-hill/images/the-hill-logo.png",
  },
  {
    name: "Rolling Stone",
    icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Rolling_Stone_logo.svg/2560px-Rolling_Stone_logo.svg.png",
  },
  {
    name: "NYDIG",
    icon: "https://app.perception.to/logos/nydig_logo.jpeg",
  },
  {
    name: "Stacker News",
    icon: "https://app.perception.to/logos/stacker-news-logo.png",
  }
];

// Create six unique rows
const rows = [
  integrations.slice(0, 8),      // First row: Social Media & Tech Platforms
  integrations.slice(8, 16),     // Second row: Mainstream Financial Media
  integrations.slice(16, 24),    // Third row: Traditional News Media
  integrations.slice(24, 32),    // Fourth row: Tech & Crypto Media
  integrations.slice(32, 40),    // Fifth row: Additional News Sources
  integrations.slice(40, 48),    // Sixth row: More News Sources
];

export function Integrations() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 !bg-black">
      {/* Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.05),transparent)]" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-extralight tracking-tight sm:text-5xl lg:text-6xl !text-white">
            Monitor sentiment across            <span className="bg-gradient-to-r from-orange-500 to-orange-800 inline-block text-transparent bg-clip-text">
              100+ channels
            </span>
          </h2>
          <p className="mt-6 text-lg leading-8 !text-white/80">
            From GitHub commits to Bloomberg, normalized into sentiment scores & trend clusters.
          </p>
          <div className="mt-6 flex justify-center">
            <Button 
              className="!bg-gray-800 !text-gray-200 hover:!bg-gray-700 !border-0 !shadow-none" 
              size="sm"
              asChild
            >
              <a href="/methodology">
                See the full list <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
        
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="scroll-container">
            <div className="scroll-mask-left" />
            <div className="scroll-mask-right" />
            <div className="flex flex-col gap-4">
              {rows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`scroll-track ${
                    rowIndex % 2 === 0 ? 'scroll-track-left' : 'scroll-track-right'
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
      </div>
    </section>
  );
}