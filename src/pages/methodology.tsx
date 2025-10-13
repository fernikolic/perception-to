import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { Newspaper, Globe, Share2, Database, UserCheck, Tags, CheckCircle, XCircle, MinusCircle, ShieldCheck, Lightbulb } from "lucide-react";

const northAmericanOutlets = [
  "CBS News", "Vice", "NBC News", "CNBC", "The Wall Street Journal",
  "Barron's", "Rolling Stone", "The New Yorker", "Fortune",
  "The New York Times", "Los Angeles Times", "The Atlantic", "CNN",
  "Bloomberg", "Vox", "The Boston Globe", "Fox News", "Fox Business",
  "Politico", "Time", "New York Post", "Forbes", "Newsweek",
  "ABC News", "Associated Press", "MSNBC", "NPR", "PBS",
  "Vanity Fair", "Chicago Tribune", "Globe and Mail", "The National", "CTV News", "CBC"
];

const europeanOutlets = [
  "Daily Mail", "The Economist", "Reuters", "Financial Times", 
  "The Guardian", "The Telegraph", "BBC", 
  "Frankfurter Allgemeine Zeitung", "Corriere della Sera", 
  "La Repubblica", "Agence France-Presse", "Le Figaro", 
  "France Télévisions", "Le Monde", "ZDF", "Al Jazeera", 
  "El País", "La Sexta", "ABC", "El Periódico", "La Vanguardia", 
  "El Mundo", "Antena 3", "RTVE", "Telecinco",
  "Verdens Gang", "Norwegian Broadcasting Corporation (NRK)", 
  "TV 2 Denmark", "TV 2 Norway", "Finans (Denmark)",
  "Danish Broadcasting Corporation (DR)", "Politiken", "Jyllands-Posten", 
  "Nyheter24", "Sydsvenskan", "Sveriges Television (SVT)", 
  "Aftonbladet", "Expressen", "Aftenposten", "Dagbladet",
  "Dagens Næringsliv", "Bergens Tidende", "E24",
  "Morgenbladet", "Finansavisen"
];

const latinAmericanOutlets = [
  "Milenio", "TV Azteca", "El Financiero", "El Comercio",
  "Página/12", "Clarín", "El Tiempo", "La Nación",
  "El Universal", "Todo Noticias", "Excélsior", "Reforma",
  "Crónica", "El Universal", "El Nacional", "El Debate"
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section with Card Design */}
        <section className="relative overflow-hidden py-12 sm:py-20 lg:py-28">
          {/* Subtle radial background like homepage */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_50%)]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
            {/* Hero Card with Background Image (matches homepage) */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src="/images/hero_image.avif"
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-24">
                <div className="mx-auto max-w-5xl text-center">
                  <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight sm:leading-[0.95] text-black mb-6 sm:mb-10 lg:mb-14 max-w-4xl mx-auto px-2">
                    Our Methodology
                  </h1>

                  <p className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-light leading-relaxed text-black/70 max-w-3xl mx-auto mb-8 sm:mb-12 px-2">
                    A comprehensive and transparent approach to tracking and analyzing Bitcoin's presence in global media and online{'  '}platforms.
                  </p>

                  <div className="flex items-center justify-center">
                    <button
                      className="bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-8 sm:px-10 lg:px-12 py-6 sm:py-7 text-base sm:text-lg lg:text-xl shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                      onClick={() => document.querySelector('#methodology-content')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                      Explore Our Process
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="methodology-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 max-w-6xl">

          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            <div className="py-8 sm:py-10 lg:py-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 mb-6 sm:mb-8 lg:mb-10">
                Media Outlets Tracked
              </h2>
              <div className="text-base sm:text-lg lg:text-xl text-gray-600 space-y-4">
                <p>We monitor a curated list of influential media outlets across the globe to capture a broad spectrum of reporting on Bitcoin.</p>
                <div className="mt-6 sm:mt-8 bg-white rounded-xl sm:rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg text-gray-700 mb-3 sm:mb-4 flex items-center">
                        <Globe className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                        North America
                      </h3>
                      <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base text-gray-500">
                        {northAmericanOutlets.map((outlet) => (
                          <li key={outlet}>{outlet}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg text-gray-700 mb-3 sm:mb-4 flex items-center">
                        <Globe className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                        Europe
                      </h3>
                      <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base text-gray-500">
                        {europeanOutlets.map((outlet) => (
                          <li key={outlet}>{outlet}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg text-gray-700 mb-3 sm:mb-4 flex items-center">
                        <Globe className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                        Latin America
                      </h3>
                      <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base text-gray-500">
                        {latinAmericanOutlets.map((outlet) => (
                          <li key={outlet}>{outlet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="py-8 sm:py-10 lg:py-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 mb-6 sm:mb-8 lg:mb-10">
                Expanded Social and Web Metrics
              </h2>
              <div className="text-base sm:text-lg lg:text-xl text-gray-600 space-y-4">
                <p>In addition to traditional media, we track influential sources across social and web platforms to provide a more holistic view of Bitcoin's market perception.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
                  {[
                    { name: "Reddit", logo: "/logos/social/reddit.svg", desc: "Monitoring discussions and trends in key Bitcoin subreddits." },
                    { name: "Twitter/X", logo: "/logos/social/x.svg", desc: "Tracking tweets from influential accounts." },
                    { name: "GitHub", logo: "/logos/social/github.svg", desc: "Monitoring activity and discussions in the Bitcoin repository." },
                    { name: "YouTube", logo: "/logos/social/youtube.svg", desc: "Tracking popular videos and channels discussing Bitcoin." }
                  ].map((platform) => (
                    <div key={platform.name} className="p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm flex items-start space-x-3 sm:space-x-4">
                      {platform.logo && <img src={platform.logo} alt={`${platform.name} logo`} className="h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0" />}
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">{platform.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-500">{platform.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 sm:pt-6">
                  <div className="p-6 sm:p-8 bg-white rounded-xl sm:rounded-2xl shadow-sm">
                    <h4 className="font-semibold text-base sm:text-lg text-gray-800 mb-2">Crypto Outlets</h4>
                    <p className="text-sm sm:text-base text-gray-500">Including leading sources like Cointelegraph, CoinDesk, Bitcoin Magazine, CryptoSlate, The Defiant, Crypto News, The Block, BeInCrypto, Blockworks, and Decrypt.</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="py-8 sm:py-10 lg:py-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 mb-6 sm:mb-8 lg:mb-10">
                Data Collection Process
              </h2>
              <div className="text-base sm:text-lg lg:text-xl text-gray-600 space-y-4">
                <p>Every mention of Bitcoin across these platforms and media outlets is included in our analysis. This approach ensures a holistic view of Bitcoin's presence in both traditional and modern media, capturing dedicated articles, social media posts, and incidental mentions.</p>
              </div>
            </div>

            <Separator />

            <div className="py-8 sm:py-10 lg:py-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 mb-6 sm:mb-8 lg:mb-10">
                Human Review and Analysis
              </h2>
              <div className="text-base sm:text-lg lg:text-xl text-gray-600 space-y-4">
                <p>A team of expert analysts reviews each piece of content. They delve into the context and sentiment of the Bitcoin mentions, whether it's the focal point or a peripheral mention. This human element is crucial for an accurate and nuanced understanding of Bitcoin's portrayal across different platforms.</p>
              </div>
            </div>

            <Separator />

            <div className="py-8 sm:py-10 lg:py-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 mb-6 sm:mb-8 lg:mb-10">
                Labeling Criteria
              </h2>
              <div className="text-base sm:text-lg lg:text-xl text-gray-600 space-y-4">
                <p>Content is categorized based on a detailed assessment of its tone, context, and specific language. This comprehensive review allows for a more refined and accurate categorization than purely automated systems.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">Positive</h4>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-500">Content that portrays Bitcoin favorably or highlights its benefits.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">Negative</h4>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-500">Content that portrays Bitcoin unfavorably or highlights concerns.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <MinusCircle className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base text-gray-800 mb-1">Balanced</h4>
                      <p className="text-xs sm:text-sm lg:text-base text-gray-500">Content that presents both positive and negative aspects neutrally.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="py-8 sm:py-10 lg:py-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 mb-6 sm:mb-8 lg:mb-10">
                Data Integrity and Accessibility
              </h2>
              <div className="text-base sm:text-lg lg:text-xl text-gray-600 space-y-4">
                <p>Our commitment to ethical data practices is exemplified by our reliance on publicly available sources. We do not use invasive data scraping, ensuring respect for both data integrity and content creators. The collected data is made freely accessible for transparent insight into Bitcoin's media and social portrayal.</p>
              </div>
            </div>

            <Separator />

            <div className="py-8 sm:py-10 lg:py-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-900 mb-6 sm:mb-8 lg:mb-10">
                Implications and Uses of the Data
              </h2>
              <div className="text-base sm:text-lg lg:text-xl text-gray-600 space-y-4">
                <p>The data from Bitcoin Perception serves as a valuable resource for businesses, researchers, and enthusiasts. It offers a window into public sentiment and media trends surrounding Bitcoin, helping stakeholders make informed decisions and gain a deeper understanding of the ecosystem.</p>
              </div>
            </div>

            <Separator />

            <div className="py-12 sm:py-16 lg:py-24">
              <div className="relative bg-black rounded-2xl sm:rounded-3xl px-6 sm:px-12 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-24 xl:py-32">

                <div className="max-w-7xl mx-auto">
                  {/* Minimal header */}
                  <div className="mb-12 sm:mb-16 lg:mb-24">
                    <p className="text-xs sm:text-sm font-light !text-white/60 mb-4 sm:mb-6">What perception tracks</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-thin !text-white tracking-tight leading-tight">
                      Intelligence across the<br />emerging finance ecosystem
                    </h2>
                  </div>

                  {/* Clean grid layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
                    {/* Bitcoin */}
                    <div className="bg-black p-6 sm:p-8 lg:p-12 xl:p-16 hover:bg-white/5 transition-all duration-500 group">
                      <div className="flex flex-col h-full min-h-[240px] sm:min-h-[280px]">
                        <div className="mb-6 sm:mb-8">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-thin !text-white mb-3 sm:mb-4">Bitcoin</h3>
                          <p className="text-xs sm:text-sm lg:text-base !text-white/60 font-light leading-relaxed">
                            The base layer. Institutional commentary,<br className="hidden sm:block" />
                            <span className="sm:hidden"> </span>developer activity, regulatory narratives.
                          </p>
                        </div>
                        <div className="mt-auto">
                          <img
                            src="/images/bitcoin.png"
                            alt="Bitcoin"
                            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stablecoins */}
                    <div className="bg-black p-6 sm:p-8 lg:p-12 xl:p-16 hover:bg-white/5 transition-all duration-500 group">
                      <div className="flex flex-col h-full min-h-[240px] sm:min-h-[280px]">
                        <div className="mb-6 sm:mb-8">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-thin !text-white mb-3 sm:mb-4">Stablecoins</h3>
                          <p className="text-xs sm:text-sm lg:text-base !text-white/60 font-light leading-relaxed">
                            Adoption trends, issuer movements,<br className="hidden sm:block" />
                            <span className="sm:hidden"> </span>regional policy shifts.
                          </p>
                        </div>
                        <div className="mt-auto">
                          <img
                            src="/images/stablecoins.png"
                            alt="Stablecoins"
                            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tokenized assets */}
                    <div className="bg-black p-6 sm:p-8 lg:p-12 xl:p-16 hover:bg-white/5 transition-all duration-500 group">
                      <div className="flex flex-col h-full min-h-[240px] sm:min-h-[280px]">
                        <div className="mb-6 sm:mb-8">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-thin !text-white mb-3 sm:mb-4">Tokenized assets</h3>
                          <p className="text-xs sm:text-sm lg:text-base !text-white/60 font-light leading-relaxed">
                            Real-world asset tokenization,<br className="hidden sm:block" />
                            <span className="sm:hidden"> </span>market developments, regulatory frameworks.
                          </p>
                        </div>
                        <div className="mt-auto">
                          <img
                            src="/images/tokenized assets.png"
                            alt="Tokenized assets"
                            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Macro catalysts */}
                    <div className="bg-black p-6 sm:p-8 lg:p-12 xl:p-16 hover:bg-white/5 transition-all duration-500 group">
                      <div className="flex flex-col h-full min-h-[240px] sm:min-h-[280px]">
                        <div className="mb-6 sm:mb-8">
                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-thin !text-white mb-3 sm:mb-4">Macro catalysts</h3>
                          <p className="text-xs sm:text-sm lg:text-base !text-white/60 font-light leading-relaxed">
                            Rate moves, FX flows, capital controls,<br className="hidden sm:block" />
                            <span className="sm:hidden"> </span>and other drivers of digital asset narratives.
                          </p>
                        </div>
                        <div className="mt-auto">
                          <img
                            src="/images/macro catalysts.png"
                            alt="Macro catalysts"
                            className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 object-contain opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 