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
        <section className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
          {/* Subtle radial background like homepage */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.06),transparent_50%)]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Hero Card with Background Image (matches homepage) */}
            <div className="relative rounded-2xl overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src="/images/hero_image.avif"
                  alt="Background"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="relative z-10 px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-3xl text-center">
                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight text-black max-w-4xl mx-auto">
                    Our Methodology
                  </h1>
                  
                  <p className="mt-4 sm:mt-5 lg:mt-6 text-sm sm:text-base lg:text-lg xl:text-xl leading-6 sm:leading-7 lg:leading-8 text-black/70 font-light max-w-3xl mx-auto">
                    A comprehensive and transparent approach to tracking and analyzing Bitcoin's presence in global media and online platforms.
                  </p>

                  <div className="mt-6 sm:mt-8 lg:mt-10 flex items-center justify-center">
                    <button 
                      className="bg-black text-white hover:bg-black/90 transition-all font-normal px-6 lg:px-8 text-sm sm:text-base shadow-lg hover:shadow-xl py-3 lg:py-4 rounded-lg"
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

        <div id="methodology-content" className="container mx-auto px-4 py-24 max-w-5xl">
          
          <div className="space-y-8">
            <div className="py-12">
              <h2 className="text-3xl font-light text-gray-800 mb-6">
                Media Outlets Tracked
              </h2>
              <div className="text-lg text-gray-600 space-y-4">
                <p>We monitor a curated list of influential media outlets across the globe to capture a broad spectrum of reporting on Bitcoin.</p>
                <div className="mt-8 bg-white rounded-2xl shadow-sm p-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                        <Globe className="mr-2 h-5 w-5 text-blue-500" />
                        North America
                      </h3>
                      <ul className="space-y-2.5 text-base text-gray-500">
                        {northAmericanOutlets.map((outlet) => (
                          <li key={outlet}>{outlet}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                        <Globe className="mr-2 h-5 w-5 text-green-500" />
                        Europe
                      </h3>
                      <ul className="space-y-2.5 text-base text-gray-500">
                        {europeanOutlets.map((outlet) => (
                          <li key={outlet}>{outlet}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-4 flex items-center">
                        <Globe className="mr-2 h-5 w-5 text-orange-500" />
                        Latin America
                      </h3>
                      <ul className="space-y-2.5 text-base text-gray-500">
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

            <div className="py-12">
              <h2 className="text-3xl font-light text-gray-800 mb-6">
                Expanded Social and Web Metrics
              </h2>
              <div className="text-lg text-gray-600 space-y-4">
                <p>In addition to traditional media, we track influential sources across social and web platforms to provide a more holistic view of Bitcoin's market perception.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                  {[
                    { name: "Reddit", logo: "/logos/social/reddit.svg", desc: "Monitoring discussions and trends in key Bitcoin subreddits." },
                    { name: "Twitter/X", logo: "/logos/social/x.svg", desc: "Tracking tweets from influential accounts." },
                    { name: "GitHub", logo: "/logos/social/github.svg", desc: "Monitoring activity and discussions in the Bitcoin repository." },
                    { name: "YouTube", logo: "/logos/social/youtube.svg", desc: "Tracking popular videos and channels discussing Bitcoin." }
                  ].map((platform) => (
                    <div key={platform.name} className="p-6 bg-white rounded-2xl shadow-sm flex items-center space-x-4">
                      {platform.logo && <img src={platform.logo} alt={`${platform.name} logo`} className="h-8 w-8" />}
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">{platform.name}</h4>
                        <p className="text-sm text-gray-500">{platform.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-6">
                  <div className="p-8 bg-white rounded-2xl shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">Crypto Outlets</h4>
                    <p className="text-base text-gray-500">Including leading sources like Cointelegraph, CoinDesk, Bitcoin Magazine, CryptoSlate, The Defiant, Crypto News, The Block, BeInCrypto, Blockworks, and Decrypt.</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="py-12">
              <h2 className="text-3xl font-light text-gray-800 mb-6">
                Data Collection Process
              </h2>
              <div className="text-lg text-gray-600 space-y-4">
                <p>Every mention of Bitcoin across these platforms and media outlets is included in our analysis. This approach ensures a holistic view of Bitcoin's presence in both traditional and modern media, capturing dedicated articles, social media posts, and incidental mentions.</p>
              </div>
            </div>

            <Separator />

            <div className="py-12">
              <h2 className="text-3xl font-light text-gray-800 mb-6">
                Human Review and Analysis
              </h2>
              <div className="text-lg text-gray-600 space-y-4">
                <p>A team of expert analysts reviews each piece of content. They delve into the context and sentiment of the Bitcoin mentions, whether it's the focal point or a peripheral mention. This human element is crucial for an accurate and nuanced understanding of Bitcoin's portrayal across different platforms.</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="py-12">
              <h2 className="text-3xl font-light text-gray-800 mb-6">
                Labeling Criteria
              </h2>
              <div className="text-lg text-gray-600 space-y-4">
                <p>Content is categorized based on a detailed assessment of its tone, context, and specific language. This comprehensive review allows for a more refined and accurate categorization than purely automated systems.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                  <div className="flex items-start space-x-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Positive</h4>
                      <p className="text-base text-gray-500">Content that portrays Bitcoin favorably or highlights its benefits.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <XCircle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Negative</h4>
                      <p className="text-base text-gray-500">Content that portrays Bitcoin unfavorably or highlights concerns.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MinusCircle className="h-6 w-6 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Balanced</h4>
                      <p className="text-base text-gray-500">Content that presents both positive and negative aspects neutrally.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="py-12">
              <h2 className="text-3xl font-light text-gray-800 mb-6">
                Data Integrity and Accessibility
              </h2>
              <div className="text-lg text-gray-600 space-y-4">
                <p>Our commitment to ethical data practices is exemplified by our reliance on publicly available sources. We do not use invasive data scraping, ensuring respect for both data integrity and content creators. The collected data is made freely accessible for transparent insight into Bitcoin's media and social portrayal.</p>
              </div>
            </div>

            <Separator />

            <div className="py-12">
              <h2 className="text-3xl font-light text-gray-800 mb-6">
                Implications and Uses of the Data
              </h2>
              <div className="text-lg text-gray-600 space-y-4">
                <p>The data from Bitcoin Perception serves as a valuable resource for businesses, researchers, and enthusiasts. It offers a window into public sentiment and media trends surrounding Bitcoin, helping stakeholders make informed decisions and gain a deeper understanding of the ecosystem.</p>
              </div>
            </div>

            <Separator />

            <div className="py-24">
              <div className="relative bg-black rounded-3xl px-8 sm:px-12 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24 xl:py-32">
                
                <div className="max-w-7xl mx-auto">
                  {/* Minimal header */}
                  <div className="mb-16 sm:mb-20 lg:mb-24">
                    <p className="text-sm font-light !text-white/60 mb-6">What perception tracks</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-thin !text-white tracking-tight leading-tight">
                      Intelligence across the<br />emerging finance ecosystem
                    </h2>
                  </div>

                  {/* Clean grid layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
                    {/* Bitcoin */}
                    <div className="bg-black p-8 sm:p-10 lg:p-12 xl:p-16 hover:bg-white/5 transition-all duration-500 group">
                      <div className="flex flex-col h-full min-h-[280px]">
                        <div className="mb-8">
                          <h3 className="text-2xl sm:text-3xl font-thin !text-white mb-4">Bitcoin</h3>
                          <p className="text-sm sm:text-base !text-white/60 font-light leading-relaxed">
                            The base layer. Institutional commentary,<br />
                            developer activity, regulatory narratives.
                          </p>
                        </div>
                        <div className="mt-auto">
                          <img 
                            src="/images/bitcoin.png" 
                            alt="Bitcoin" 
                            className="w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Stablecoins */}
                    <div className="bg-black p-8 sm:p-10 lg:p-12 xl:p-16 hover:bg-white/5 transition-all duration-500 group">
                      <div className="flex flex-col h-full min-h-[280px]">
                        <div className="mb-8">
                          <h3 className="text-2xl sm:text-3xl font-thin !text-white mb-4">Stablecoins</h3>
                          <p className="text-sm sm:text-base !text-white/60 font-light leading-relaxed">
                            Adoption trends, issuer movements,<br />
                            regional policy shifts.
                          </p>
                        </div>
                        <div className="mt-auto">
                          <img 
                            src="/images/stablecoins.png" 
                            alt="Stablecoins" 
                            className="w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Tokenized assets */}
                    <div className="bg-black p-8 sm:p-10 lg:p-12 xl:p-16 hover:bg-white/5 transition-all duration-500 group">
                      <div className="flex flex-col h-full min-h-[280px]">
                        <div className="mb-8">
                          <h3 className="text-2xl sm:text-3xl font-thin !text-white mb-4">Tokenized assets</h3>
                          <p className="text-sm sm:text-base !text-white/60 font-light leading-relaxed">
                            Real-world asset tokenization,<br />
                            market developments, regulatory frameworks.
                          </p>
                        </div>
                        <div className="mt-auto">
                          <img 
                            src="/images/tokenized assets.png" 
                            alt="Tokenized assets" 
                            className="w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-40 group-hover:opacity-60 transition-opacity duration-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Macro catalysts */}
                    <div className="bg-black p-8 sm:p-10 lg:p-12 xl:p-16 hover:bg-white/5 transition-all duration-500 group">
                      <div className="flex flex-col h-full min-h-[280px]">
                        <div className="mb-8">
                          <h3 className="text-2xl sm:text-3xl font-thin !text-white mb-4">Macro catalysts</h3>
                          <p className="text-sm sm:text-base !text-white/60 font-light leading-relaxed">
                            Rate moves, FX flows, capital controls,<br />
                            and other drivers of digital asset narratives.
                          </p>
                        </div>
                        <div className="mt-auto">
                          <img 
                            src="/images/macro catalysts.png" 
                            alt="Macro catalysts" 
                            className="w-24 h-24 sm:w-32 sm:h-32 object-contain opacity-40 group-hover:opacity-60 transition-opacity duration-500"
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