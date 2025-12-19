import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { Newspaper, Globe, Share2, Database, UserCheck, Tags, CheckCircle, XCircle, MinusCircle, ShieldCheck, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import Metamorphosis from "@/components/Metamorphosis";
import FlowingPattern from "@/components/FlowingPattern";
import DelicateAsciiDots from "@/components/DelicateAsciiDots";

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
  "Crónica", "El Nacional", "El Debate"
];

// Regulatory & Institutional Sources
const usRegulators = [
  "SEC (Securities and Exchange Commission)",
  "CFTC (Commodity Futures Trading Commission)",
  "Federal Reserve Board",
  "OCC (Office of the Comptroller of the Currency)",
  "FDIC (Federal Deposit Insurance Corporation)",
  "FINRA (Financial Industry Regulatory Authority)",
  "NFA (National Futures Association)",
  "FinCEN (Financial Crimes Enforcement Network)"
];

const europeanRegulators = [
  "ECB (European Central Bank)",
  "ESMA (European Securities and Markets Authority)",
  "EBA (European Banking Authority)",
  "FCA (Financial Conduct Authority)",
  "Bank of England",
  "BaFin (German Financial Regulator)",
  "European Commission"
];

const asiaPacificRegulators = [
  "HKMA (Hong Kong Monetary Authority)",
  "SFC (Securities and Futures Commission Hong Kong)",
  "MAS (Monetary Authority of Singapore)",
  "FSA Japan (Financial Services Agency)",
  "RBA (Reserve Bank of Australia)",
  "ASIC (Australian Securities and Investments Commission)"
];

const middleEastRegulators = [
  "DFSA (Dubai Financial Services Authority)",
  "VARA (Virtual Assets Regulatory Authority Dubai)",
  "ADGM (Abu Dhabi Global Market)",
  "Central Bank of UAE"
];

const internationalBodies = [
  "BIS (Bank for International Settlements)",
  "FSB (Financial Stability Board)",
  "IMF (International Monetary Fund)",
  "FATF (Financial Action Task Force)",
  "IOSCO (International Organization of Securities Commissions)"
];

export default function MethodologyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-black font-sans">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95 pt-16">
          {/* Base Gradient */}
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

          <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
            {/* Hero Card with Side-by-Side Layout */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row min-h-[600px]">
                {/* Metamorphosis - Left Side (50%) */}
                <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
                  <Metamorphosis />
                </div>

                {/* Content - Right Side (50%) */}
                <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16 flex flex-col justify-center" style={{ background: '#F0EEE6' }}>
                  <div className="mx-auto max-w-2xl">
                    <div className="mb-4 sm:mb-6 lg:mb-8 text-center lg:text-left">
                      <div className="group relative inline-flex items-center rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-semibold leading-6"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                        }}
                      >
                        <span className="relative flex items-center gap-2">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-40"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-400"></span>
                          </span>
                          <span className="relative font-bold text-black">TRANSPARENCY</span>
                        </span>
                        <span className="ml-2.5 text-black/80">Our approach</span>
                      </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-black mb-5 sm:mb-6 lg:mb-8 text-center lg:text-left">
                      What we monitor and{'\u00A0'}how
                    </h1>

                    <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                      <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/70 font-semibold mb-3">
                        650+ sources. Human analysts. Real-time{'\u00A0'}clustering.
                      </p>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                        From Bloomberg to Reddit. See what we track and how it powers your watchlists, <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>, and{'\u00A0'}<em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipes</em>.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-6">
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                        onClick={() => {
                          document.getElementById('methodology-content')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Explore our process
                      </Button>
                      <Button
                        size="lg"
                        className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-black hover:bg-white transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-black/20 hover:border-black/30 rounded-2xl"
                        asChild
                      >
                        <a href="https://app.perception.to/auth/sign-up">
                          Start free trial
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="methodology-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 max-w-6xl">

          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            <div className="py-8 sm:py-10 lg:py-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight !text-white mb-6 sm:mb-8 lg:mb-10">
                Mainstream media we monitor
              </h2>
              <div className="text-base sm:text-lg lg:text-xl text-white/70 space-y-4">
                <p>Bloomberg, Financial Times, Reuters, Wall Street Journal. The full spectrum of mainstream coverage. Every watchlist alert and <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipe</em> output pulls from these sources.</p>
                <div className="mt-6 sm:mt-8 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg !text-white mb-3 sm:mb-4 flex items-center">
                        <Globe className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                        North America
                      </h3>
                      <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base text-white/50">
                        {northAmericanOutlets.map((outlet) => (
                          <li key={outlet}>{outlet}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg !text-white mb-3 sm:mb-4 flex items-center">
                        <Globe className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                        Europe
                      </h3>
                      <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base text-white/50">
                        {europeanOutlets.map((outlet) => (
                          <li key={outlet}>{outlet}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg !text-white mb-3 sm:mb-4 flex items-center">
                        <Globe className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                        Latin America
                      </h3>
                      <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base text-white/50">
                        {latinAmericanOutlets.map((outlet) => (
                          <li key={outlet}>{outlet}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="py-8 sm:py-10 lg:py-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight !text-white mb-6 sm:mb-8 lg:mb-10">
                Where the conversation actually happens
              </h2>
              <div className="text-base sm:text-lg lg:text-xl text-white/70 space-y-4">
                <p>Reddit threads, X conversations, GitHub commits, YouTube analysis. Trends start here days before Bloomberg covers them. We track both.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
                  {[
                    { name: "Reddit", logo: "/logos/social/reddit.svg", desc: "Key subreddits where community sentiment shifts first.", invertLogo: false },
                    { name: "Twitter/X", logo: "/logos/social/x.svg", desc: "Influential voices and emerging narratives.", invertLogo: true },
                    { name: "GitHub", logo: "/logos/social/github.svg", desc: "Developer activity and technical discussions.", invertLogo: true },
                    { name: "YouTube", logo: "/logos/social/youtube.svg", desc: "Video analysis and commentary channels.", invertLogo: false }
                  ].map((platform) => (
                    <div key={platform.name} className="p-4 sm:p-6 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl flex items-start space-x-3 sm:space-x-4">
                      {platform.logo && <img src={platform.logo} alt={`${platform.name} logo`} className={`h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0 ${platform.invertLogo ? 'invert opacity-80' : 'opacity-60'}`} />}
                      <div>
                        <h4 className="font-semibold text-sm sm:text-base text-white mb-1">{platform.name}</h4>
                        <p className="text-xs sm:text-sm text-white/50">{platform.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 sm:pt-6">
                  <div className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl">
                    <h4 className="font-semibold text-base sm:text-lg !text-white mb-2">Crypto-Native Media</h4>
                    <p className="text-sm sm:text-base text-white/50">CoinDesk, Bitcoin Magazine, The Block, BeInCrypto, Blockworks, Decrypt. They break stories days before mainstream picks them up.</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Regulatory & Institutional Sources */}
            <div className="py-8 sm:py-10 lg:py-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight !text-white mb-6 sm:mb-8 lg:mb-10">
                Regulatory & institutional sources
              </h2>
              <div className="text-base sm:text-lg lg:text-xl text-white/70 space-y-4">
                <p>Central banks, financial regulators, and international bodies. Policy signals that move markets before they hit headlines. We monitor press releases, speeches, enforcement actions, and consultation papers.</p>
                <div className="mt-6 sm:mt-8 bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg !text-white mb-3 sm:mb-4 flex items-center">
                        <ShieldCheck className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                        US Regulators
                      </h3>
                      <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base text-white/50">
                        {usRegulators.map((regulator) => (
                          <li key={regulator}>{regulator}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg !text-white mb-3 sm:mb-4 flex items-center">
                        <ShieldCheck className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                        European Regulators
                      </h3>
                      <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base text-white/50">
                        {europeanRegulators.map((regulator) => (
                          <li key={regulator}>{regulator}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg !text-white mb-3 sm:mb-4 flex items-center">
                        <ShieldCheck className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                        Asia-Pacific Regulators
                      </h3>
                      <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base text-white/50">
                        {asiaPacificRegulators.map((regulator) => (
                          <li key={regulator}>{regulator}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg !text-white mb-3 sm:mb-4 flex items-center">
                        <ShieldCheck className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                        Middle East Regulators
                      </h3>
                      <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base text-white/50">
                        {middleEastRegulators.map((regulator) => (
                          <li key={regulator}>{regulator}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base sm:text-lg !text-white mb-3 sm:mb-4 flex items-center">
                        <Globe className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white/40" />
                        International Bodies
                      </h3>
                      <ul className="space-y-2 sm:space-y-2.5 text-sm sm:text-base text-white/50">
                        {internationalBodies.map((body) => (
                          <li key={body}>{body}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Grid Layout for Process Sections */}
            <div className="py-8 sm:py-10 lg:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
                {/* Data Collection Process */}
                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold !text-white mb-4 sm:mb-6">
                    Everything gets captured
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                    Every mention across 650+ sources. Dedicated coverage, social posts, passing references. This is what powers your watchlist alerts and the trend clustering in your <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>.
                  </p>
                  <div className="rounded-lg overflow-hidden border border-white/10 mt-4" style={{ height: '200px', filter: 'invert(1)' }}>
                    <FlowingPattern />
                  </div>
                </div>

                {/* Human Review and Analysis */}
                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold !text-white mb-4 sm:mb-6">
                    Human analysts, not just algorithms
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                    Our team reviews for context and sentiment. Is Bitcoin the story or a passing mention? What's the tone beyond keywords? This is why your <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipe</em> outputs are accurate.
                  </p>
                  <div className="rounded-lg overflow-hidden border border-white/10 mt-4" style={{ height: '200px', filter: 'invert(1)' }}>
                    <DelicateAsciiDots />
                  </div>
                </div>

                {/* Data Integrity and Accessibility */}
                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold !text-white mb-4 sm:mb-6">
                    Only public sources
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                    We track publicly available content only. No paywalled breaches. What you see in your watchlists and <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em> comes from legitimate, verifiable sources.
                  </p>
                  <div className="rounded-lg overflow-hidden border border-white/10 mt-4" style={{ height: '200px', filter: 'invert(1)' }}>
                    <Metamorphosis />
                  </div>
                </div>

                {/* Implications and Uses */}
                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold !text-white mb-4 sm:mb-6">
                    From monitoring to deliverables
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                    This monitoring powers your workflow. Create watchlists for what matters. Organize in <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em> by project. Generate deliverables with <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipes</em>. All backed by verified coverage.
                  </p>
                  <div className="rounded-lg overflow-hidden border border-white/10 mt-4" style={{ height: '200px', filter: 'invert(1)' }}>
                    <FlowingPattern />
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            {/* Labeling Criteria - Full Width */}
            <div className="py-8 sm:py-10 lg:py-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight !text-white mb-6 sm:mb-8 lg:mb-10">
                How we label sentiment
              </h2>
              <div className="text-base sm:text-lg lg:text-xl text-white/70 space-y-4">
                <p>We categorize by tone, context, and language. Not keywords—actual meaning. This is why the sentiment in your watchlists is reliable.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-6">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white/40 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base !text-white mb-1">Positive</h4>
                      <p className="text-xs sm:text-sm lg:text-base text-white/50">Content that portrays Bitcoin favorably or highlights its benefits.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white/40 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base !text-white mb-1">Negative</h4>
                      <p className="text-xs sm:text-sm lg:text-base text-white/50">Content that portrays Bitcoin unfavorably or highlights concerns.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <MinusCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white/40 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-sm sm:text-base !text-white mb-1">Balanced</h4>
                      <p className="text-xs sm:text-sm lg:text-base text-white/50">Content that presents both positive and negative aspects neutrally.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-white/10" />

            <div className="py-12 sm:py-16 lg:py-24">
              <div className="relative bg-black border border-white/20 rounded-2xl sm:rounded-3xl px-6 sm:px-12 lg:px-16 xl:px-24 py-12 sm:py-16 lg:py-24 xl:py-32">

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