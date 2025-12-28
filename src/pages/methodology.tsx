import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";
import { Newspaper, Globe, Database, Tags, CheckCircle, XCircle, MinusCircle, ShieldCheck, Lightbulb, GitBranch, Users, Radio, Mic, FileText, Search, MessageSquare, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Metamorphosis from "@/components/Metamorphosis";
import FlowingPattern from "@/components/FlowingPattern";
import DelicateAsciiDots from "@/components/DelicateAsciiDots";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// =============================================================================
// COMPLETE SOURCE DIRECTORY
// Organized by category - matches our data pipeline categorization
// =============================================================================

const sourceCategories = [
  {
    id: "repositories",
    name: "Repositories",
    icon: "GitBranch",
    description: "Bitcoin Core, Lightning implementations, and key protocol development",
    sources: [
      "/bitcoin/bitcoin",
      "ACINQ/eclair",
      "ElementsProject/elements",
      "ElementsProject/lightning",
      "btcpayserver/btcpayserver",
      "fedimint/fedimint",
      "lightningnetwork/lnd",
      "rsksmart/rskj"
    ]
  },
  {
    id: "communities",
    name: "Communities",
    icon: "Users",
    description: "Forums, discussion platforms, and community-driven content",
    sources: [
      "Hacker News",
      "Medium",
      "Reddit",
      "Stacker News",
      "Substack"
    ]
  },
  {
    id: "crypto-media",
    name: "Crypto Media",
    icon: "Radio",
    description: "Crypto-native publications covering digital assets and blockchain",
    sources: [
      "Bankless",
      "BeInCrypto",
      "Bitbo",
      "Bitcoin Magazine",
      "Bitcoin News Aggregator",
      "Blockspace",
      "Blockworks",
      "CoinCentral",
      "CoinDesk",
      "CoinSpeaker",
      "Cointelegraph",
      "CryptoNews",
      "CryptoPotato",
      "CryptoSlate",
      "DL News",
      "Decrypt",
      "Lightning News",
      "Protos",
      "Rekt.News",
      "Swan Bitcoin",
      "The Block",
      "The Defiant",
      "Watcher Guru",
      "ZyCrypto"
    ]
  },
  {
    id: "financial-media",
    name: "Financial Media",
    icon: "Newspaper",
    description: "Traditional finance publications and market-focused outlets",
    sources: [
      "American Banker",
      "Banking Dive",
      "Barron's",
      "Benzinga",
      "Bloomberg",
      "Business Insider",
      "CFO Dive",
      "CNBC",
      "ETF Trends",
      "Electronic Payments International",
      "FT Partners",
      "FXStreet",
      "Finance Magnates",
      "Financial Times",
      "Forbes",
      "Fortune",
      "Fox Business",
      "Investing Live",
      "Investopedia",
      "Kiplinger",
      "Kitco NEWS",
      "MarketWatch",
      "Nasdaq",
      "Payments Dive",
      "RTTNews",
      "Real Vision",
      "Reuters",
      "Robinhood",
      "Seeking Alpha",
      "Sherwood News",
      "The Daily Upside",
      "The Motley Fool",
      "TheStreet",
      "This Is Money",
      "Wall Street Journal",
      "Wealth Management",
      "Yahoo Finance",
      "Zacks"
    ]
  },
  {
    id: "mainstream-media",
    name: "Mainstream Media",
    icon: "Globe",
    description: "Global news outlets and broadcast networks across regions",
    sources: [
      "9News",
      "ABC Australia",
      "ABC News",
      "ABC Nyheter",
      "ABC (Spain)",
      "AFP",
      "AP News",
      "Adresseavisen",
      "Affärsvärlden",
      "Aftenposten",
      "Aftonbladet",
      "Al Jazeera",
      "Antena 3",
      "Avisen.dk",
      "BBC",
      "BT",
      "Bergens Tidende",
      "Berlingske",
      "Børsen",
      "CBC",
      "CBS Mornings",
      "CBS News",
      "CNN",
      "CTV News",
      "Channel 4",
      "Chicago Tribune",
      "Clarín",
      "Corriere Della Sera",
      "Crónica",
      "DR",
      "Dagbladet",
      "Dagens Nyheter",
      "Dagens Næringsliv",
      "Dagsavisen",
      "Daily Mail",
      "E24",
      "El Comercio",
      "El Financiero",
      "El Mundo",
      "El Nacional",
      "El País",
      "El Periódico",
      "El Tiempo",
      "El Universal Mexico",
      "El Universal Venezuela",
      "Excélsior",
      "Expressen",
      "Finans",
      "Finansavisen",
      "Fox News",
      "Franceinfo",
      "Frankfurter Allgemeine Zeitung",
      "Global News",
      "GlobeNewswire",
      "Google News",
      "Göteborgs-Posten",
      "Herald Sun",
      "Huffington Post",
      "ITV",
      "Jyllands-Posten",
      "LA Times",
      "La Nación",
      "La Repubblica",
      "La Vanguardia",
      "Le Figaro",
      "Le Monde",
      "MSNBC",
      "Mediaset",
      "Milenio",
      "Mirror",
      "Montreal Gazette",
      "Morgenbladet",
      "NBC News",
      "NPR",
      "NRK",
      "National Post",
      "Nettavisen",
      "New York Post",
      "News.com.au",
      "Newsweek",
      "Nyheter24",
      "Ottawa Citizen",
      "PBS",
      "Page Six",
      "Politico",
      "Politiken",
      "Página 12",
      "RAI",
      "RTVE",
      "Radio-Canada",
      "Reforma",
      "Rolling Stone",
      "SBS",
      "SVT",
      "Sky News",
      "Sky News Australia",
      "Sky TG24",
      "Süddeutsche Zeitung",
      "Svenska Dagbladet",
      "Sveriges Radio",
      "Sydney Morning Herald",
      "Sydsvenskan",
      "TV 2 Norge",
      "TV 2 Nyheder",
      "TV Azteca",
      "TGCom24",
      "Telecinco",
      "The Age",
      "The Atlantic",
      "The Australian",
      "The Boston Globe",
      "The Economist",
      "The Globe and Mail",
      "The Guardian",
      "The Independent",
      "The New York Times",
      "The New Yorker",
      "The Sun",
      "The Telegraph",
      "The Times",
      "Time",
      "Todo Noticias",
      "Toronto Star",
      "USA Today",
      "Vancouver Sun",
      "Vanity Fair",
      "Verdens Gang",
      "Vice",
      "Vox",
      "Washington Post",
      "ZDF",
      "laSexta"
    ]
  },
  {
    id: "podcasts",
    name: "Podcasts",
    icon: "Mic",
    description: "Audio content and interviews from Bitcoin and crypto voices",
    sources: [
      "Anthony Pompliano",
      "Bitcoin Audible",
      "Bitcoin Capital Podcast",
      "Bitcoin Explained",
      "Bitcoin Fixes This",
      "Bitcoin For Millennials",
      "Bitcoin Optech",
      "Bitcoin Review",
      "Bitcoin Takeover",
      "Blockstream Talk",
      "Citadel Dispatch",
      "Coin Stories",
      "Onramp",
      "Rabbit Hole Recap",
      "Robin Seyr Podcast",
      "Simply Bitcoin",
      "Stephan Livera Podcast",
      "TFTC",
      "THE Bitcoin Podcast",
      "The Bitcoin Frontier",
      "The Bitcoin Layer",
      "The Bitcoin Standard Podcast",
      "The Jack Mallers Show",
      "The Mining Pod",
      "The Rage",
      "The Wolf Of All Streets",
      "Unchained",
      "What Bitcoin Did"
    ]
  },
  {
    id: "press-releases",
    name: "Press Releases",
    icon: "FileText",
    description: "Official announcements and corporate communications",
    sources: [
      "Business Wire",
      "Chainwire",
      "Stock Titan"
    ]
  },
  {
    id: "research",
    name: "Research",
    icon: "Search",
    description: "Institutional research, on-chain analytics, and industry reports",
    sources: [
      "a16z Crypto",
      "Arca",
      "ARK Invest",
      "BitGo",
      "BitMEX",
      "Bitcoin Dev Mailing List",
      "Bitcoin Magazine Pro",
      "Bitwise",
      "Blockstream Research",
      "Boston Consulting Group",
      "Brave New Coin",
      "CMC Research",
      "Capriole",
      "Castle Island Ventures",
      "Chainalysis",
      "Coin Metrics",
      "Coin Snacks",
      "CoinShares",
      "Deloitte UK",
      "Deribit",
      "Ecoinometrics",
      "Ego Death Capital",
      "Finovate",
      "Galaxy Research",
      "Glassnode",
      "Harvard Business Review",
      "McKinsey",
      "Messari",
      "NYDIG",
      "Nikkei Asia",
      "Pantera Capital",
      "VanEck"
    ]
  },
  {
    id: "social-media",
    name: "Social Media",
    icon: "MessageSquare",
    description: "Key voices and accounts we track on X and YouTube",
    sources: [
      // X Accounts - Industry Leaders & Executives
      "Michael Saylor",
      "Jack Mallers",
      "Brian Armstrong",
      "Paolo Ardoino",
      "Caitlin Long",
      "David Bailey",
      "David Marcus",
      "Adam Back",
      "Elisabeth Stark",
      "Samson Mow",
      "Jeff Booth",
      "Cory Klippsten",
      "Fred Thiel",
      "Jason Les (Riot)",
      "Zach Bradford (CleanSpark)",
      "Joseph Kelly (Unchained)",
      "Tyler Winklevoss",
      "Cameron Winklevoss",
      "Arthur Hayes",
      "Jihan Wu",
      // X Accounts - Analysts & Researchers
      "Lyn Alden",
      "Nic Carter",
      "Willy Woo",
      "Plan B",
      "Alex Thorn",
      "Jamie Coutts",
      "Checkmatey",
      "The Rational Root",
      "Preston Pysh",
      "Tuur Demeester",
      "James Lavish",
      "Nik Bhatia",
      "Eric Yakes",
      "Jesse Myers (Croesus)",
      "Sam Callahan",
      "Matt Hougan",
      "Sina (21st Capital)",
      // X Accounts - Developers & Technical
      "Luke Dashjr",
      "Lopp",
      "Pierre Rochard",
      "Shinobi",
      "Ruben Somsen",
      "Antoine Poinsot",
      "Alex Bosworth",
      "Lisa Neigut",
      "Casey Rodarmor",
      "Aaron van Wirdum",
      "R0ckstardev",
      "Eric Sirion",
      "Nicolas Burtey",
      "Rijndael",
      "Snyke",
      // X Accounts - Advocates & Commentators
      "Gladstein",
      "Stephan Livera",
      "Francis Pouliot",
      "Matthew Pines",
      "Alyse Killeen",
      "Leishman",
      "Tim Kotzman",
      "Will Foxley",
      "Colin Harper",
      "Abubakar Nur Khalil",
      "Bitcoin Q&A",
      "Wicked",
      "Steve Barbour",
      "Mike Colyer",
      // X Accounts - Politicians & Policy
      "Cynthia Lummis",
      // X Accounts - Companies & Organizations
      "Strike",
      "Blockstream",
      "Bitcoin Magazine",
      "Bitcoin Mag Pro",
      "Riot Platforms",
      "Marathon Digital",
      "CleanSpark",
      "Hut 8",
      "Bitfarms",
      "Core Scientific",
      "HIVE Digital",
      "Cathedra Bitcoin",
      "Giga Energy",
      "Luxor Mining",
      "Foundry",
      "Ocean Mining",
      "Blockware",
      "Whatsminer",
      "Lightning Ventures",
      "a16z Crypto",
      "Galaxy Research",
      "Glassnode",
      "K33 Research",
      "BTC Policy Institute",
      "OpenSats",
      "Spiral",
      "Brink",
      "Ark Labs",
      "BitcoinForCorps",
      "Bitcoin Office (El Salvador)",
      "Blockspace Media",
      "Simply Bitcoin",
      "BTC Archive",
      "Bitcoin News",
      "Bitcoin Merges"
    ]
  },
  {
    id: "tech-media",
    name: "Tech Media",
    icon: "Cpu",
    description: "Technology publications covering innovation and digital trends",
    sources: [
      "Anthropic",
      "Ars Technica",
      "Engadget",
      "Fast Company",
      "Gizmodo",
      "Inc.",
      "Mashable",
      "Quartz",
      "TechCrunch",
      "The Verge",
      "Wired"
    ]
  },
  {
    id: "regulatory-intel",
    name: "Regulatory Intel",
    icon: "ShieldCheck",
    description: "Regulators, central banks, and policy bodies worldwide",
    sources: [
      // US Regulators
      "SEC",
      "CFTC",
      "Federal Reserve",
      "Federal Reserve (San Francisco)",
      "Federal Reserve (New York)",
      "Federal Reserve (Chicago)",
      "Federal Reserve (Atlanta)",
      "Federal Reserve (Dallas)",
      "Federal Reserve (Cleveland)",
      "Federal Reserve (Philadelphia)",
      "Federal Reserve (Boston)",
      "Federal Reserve (Richmond)",
      "Federal Reserve (St. Louis)",
      "Federal Reserve (Minneapolis)",
      "Federal Reserve (Kansas City)",
      "OCC",
      "FDIC",
      "FINRA",
      "NFA",
      "FinCEN",
      "US Treasury",
      "Federal Register",
      "US Congress",
      "White House",
      "DOJ",
      "FTC",
      // European Regulators
      "ECB",
      "ECB Banking Supervision",
      "ESMA",
      "EBA",
      "European Commission",
      "EU",
      "EUR-Lex",
      "European Parliament",
      "FCA",
      "Bank of England",
      "UK Government",
      "UK Legislation",
      "BaFin",
      "Bundesbank",
      "AMF France",
      "Banque de France",
      "FINMA",
      "Swiss National Bank",
      "De Nederlandsche Bank",
      "AFM Netherlands",
      "Central Bank of Ireland",
      "Banca d'Italia",
      // Asia-Pacific Regulators
      "HKMA",
      "SFC Hong Kong",
      "HKEX",
      "MAS Singapore",
      "SGX",
      "FSA Japan",
      "Bank of Japan",
      "Japan Exchange Group",
      "RBA",
      "ASIC",
      "APRA",
      "ASX",
      "PBOC",
      "CSRC China",
      "CBIRC China",
      "FSC Korea",
      "Bank of Korea",
      "RBI India",
      "SEBI India",
      // Middle East Regulators
      "DFSA",
      "VARA Dubai",
      "ADGM",
      "Central Bank of UAE",
      "SCA UAE",
      "SAMA Saudi Arabia",
      "CMA Saudi Arabia",
      "Central Bank of Bahrain",
      // International Bodies
      "BIS",
      "FSB",
      "IMF",
      "World Bank",
      "FATF",
      "IOSCO",
      "OECD",
      "BCBS",
      "CPMI",
      // Canada Regulators
      "Bank of Canada",
      "OSFI Canada",
      "OSC Ontario",
      "AMF Quebec",
      "FINTRAC",
      // Latin America Regulators
      "Central Bank of Brazil",
      "CVM Brazil",
      "Banxico Mexico",
      "CNBV Mexico",
      // Industry Associations & Advocacy
      "SIFMA",
      "ISDA",
      "IIF",
      "GFMA",
      "FIA",
      "Blockchain Association",
      "Coin Center",
      "Digital Chamber",
      "Central Banking",
      "GovDelivery"
    ]
  }
];

// Helper to get icon component
const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: React.ComponentType<{ className?: string }> } = {
    GitBranch,
    Users,
    Radio,
    Newspaper,
    Globe,
    Mic,
    FileText,
    Search,
    MessageSquare,
    Cpu,
    ShieldCheck
  };
  return icons[iconName] || Globe;
};

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
                        Curated sources. Organized intelligence. Real-time{'\u00A0'}clustering.
                      </p>
                      <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                        See what we track and how it powers your watchlists, <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>, and{'\u00A0'}<em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipes</em>.
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

            {/* Complete Source Directory */}
            <div className="py-8 sm:py-10 lg:py-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight !text-white mb-6 sm:mb-8 lg:mb-10">
                Complete source directory
              </h2>
              <div className="text-base sm:text-lg lg:text-xl text-white/70 space-y-4 mb-8">
                <p>Every source we monitor, organized by category. 650+ sources across {sourceCategories.length} categories. Click to expand any category.</p>
              </div>

              {/* Category Overview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
                {sourceCategories.map((category) => {
                  const IconComponent = getIconComponent(category.icon);
                  return (
                    <div
                      key={category.id}
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
                    >
                      <IconComponent className="h-5 w-5 mx-auto mb-2 text-white/40" />
                      <div className="text-sm font-medium text-white mb-1">{category.name}</div>
                      <div className="text-2xl font-bold text-white">{category.sources.length}</div>
                    </div>
                  );
                })}
              </div>

              {/* Expandable Accordions */}
              <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden">
                <Accordion type="multiple" className="w-full">
                  {sourceCategories.map((category) => {
                    const IconComponent = getIconComponent(category.icon);
                    return (
                      <AccordionItem
                        key={category.id}
                        value={category.id}
                        className="border-b border-white/10 last:border-b-0"
                      >
                        <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-white/5 transition-colors [&>svg]:text-white/40">
                          <div className="flex items-center gap-4 text-left">
                            <IconComponent className="h-5 w-5 text-white/40 flex-shrink-0" />
                            <div>
                              <div className="text-base sm:text-lg font-semibold text-white flex items-center gap-3">
                                {category.name}
                                <span className="text-xs font-normal px-2 py-0.5 bg-white/10 rounded-full text-white/60">
                                  {category.sources.length} sources
                                </span>
                              </div>
                              <div className="text-sm text-white/50 mt-1">
                                {category.description}
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 pt-2">
                            {category.sources.map((source) => (
                              <div
                                key={source}
                                className="text-sm text-white/60 py-1.5 px-3 bg-white/5 rounded-lg truncate hover:bg-white/10 transition-colors"
                                title={source}
                              >
                                {source}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
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

                {/* Curated Sources */}
                <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 overflow-hidden">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold !text-white mb-4 sm:mb-6">
                    Curated, not scraped
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed mb-6">
                    Every source is intentionally selected. We build and maintain a curated list of outlets, voices, and institutions that matter for Bitcoin intelligence. No noise, no content farms.
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
              <div className="text-base sm:text-lg lg:text-xl text-white/70 space-y-4 mb-8">
                <p>We categorize by tone, context, and language. Not keywords—actual meaning. This is why the sentiment in your watchlists is reliable.</p>
              </div>

              {/* Sentiment Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    <h4 className="font-semibold text-lg !text-white">Positive</h4>
                  </div>
                  <p className="text-sm text-white/60 mb-4">Content that portrays Bitcoin favorably or highlights its benefits, adoption, or potential.</p>
                  <div className="space-y-2 text-xs text-white/40">
                    <p><span className="text-white/60">Signals:</span> Endorsements, adoption announcements, bullish analysis, success stories, institutional support</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <h4 className="font-semibold text-lg !text-white">Negative</h4>
                  </div>
                  <p className="text-sm text-white/60 mb-4">Content that portrays Bitcoin unfavorably, highlights risks, or expresses skepticism.</p>
                  <div className="space-y-2 text-xs text-white/40">
                    <p><span className="text-white/60">Signals:</span> Criticism, regulatory warnings, security concerns, environmental arguments, scam associations</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    <h4 className="font-semibold text-lg !text-white">Balanced</h4>
                  </div>
                  <p className="text-sm text-white/60 mb-4">Content that presents multiple perspectives neutrally without advocating for a particular view.</p>
                  <div className="space-y-2 text-xs text-white/40">
                    <p><span className="text-white/60">Signals:</span> Factual reporting, educational content, both-sides analysis, price updates without commentary</p>
                  </div>
                </div>
              </div>

              {/* Detailed Methodology Accordions */}
              <div className="bg-white/5 border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden">
                <Accordion type="multiple" className="w-full">

                  {/* Detailed Criteria */}
                  <AccordionItem value="criteria" className="border-b border-white/10">
                    <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-white/5 transition-colors [&>svg]:text-white/40">
                      <div className="flex items-center gap-4 text-left">
                        <Tags className="h-5 w-5 text-white/40 flex-shrink-0" />
                        <div>
                          <div className="text-base sm:text-lg font-semibold text-white">Detailed labeling criteria</div>
                          <div className="text-sm text-white/50 mt-1">What signals we look for in each category</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-6 pt-2">
                        <div>
                          <h5 className="text-sm font-semibold text-emerald-400 mb-3">Positive Indicators</h5>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/60">
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-500/60 mt-0.5 flex-shrink-0" />Explicit endorsement or recommendation</li>
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-500/60 mt-0.5 flex-shrink-0" />Institutional adoption announcements</li>
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-500/60 mt-0.5 flex-shrink-0" />Technical milestones or upgrades</li>
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-500/60 mt-0.5 flex-shrink-0" />Favorable regulatory developments</li>
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-500/60 mt-0.5 flex-shrink-0" />Success stories and real-world use cases</li>
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-500/60 mt-0.5 flex-shrink-0" />Bullish price analysis with conviction</li>
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-500/60 mt-0.5 flex-shrink-0" />Defense against criticism</li>
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-500/60 mt-0.5 flex-shrink-0" />Comparisons favoring Bitcoin over alternatives</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-red-400 mb-3">Negative Indicators</h5>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/60">
                            <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />Explicit criticism or dismissal</li>
                            <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />Regulatory crackdowns or bans</li>
                            <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />Security breaches or vulnerabilities</li>
                            <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />Environmental criticism</li>
                            <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />Association with scams or criminal activity</li>
                            <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />Bearish analysis with conviction</li>
                            <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />Institutional rejection or divestment</li>
                            <li className="flex items-start gap-2"><XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />Comparisons favoring alternatives over Bitcoin</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-gray-400 mb-3">Balanced Indicators</h5>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/60">
                            <li className="flex items-start gap-2"><MinusCircle className="h-4 w-4 text-gray-500/60 mt-0.5 flex-shrink-0" />Factual reporting without editorial tone</li>
                            <li className="flex items-start gap-2"><MinusCircle className="h-4 w-4 text-gray-500/60 mt-0.5 flex-shrink-0" />Educational or explainer content</li>
                            <li className="flex items-start gap-2"><MinusCircle className="h-4 w-4 text-gray-500/60 mt-0.5 flex-shrink-0" />Price updates without directional commentary</li>
                            <li className="flex items-start gap-2"><MinusCircle className="h-4 w-4 text-gray-500/60 mt-0.5 flex-shrink-0" />Both-sides journalism</li>
                            <li className="flex items-start gap-2"><MinusCircle className="h-4 w-4 text-gray-500/60 mt-0.5 flex-shrink-0" />Technical analysis without strong conviction</li>
                            <li className="flex items-start gap-2"><MinusCircle className="h-4 w-4 text-gray-500/60 mt-0.5 flex-shrink-0" />Regulatory updates presented neutrally</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Real Examples */}
                  <AccordionItem value="examples" className="border-b border-white/10">
                    <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-white/5 transition-colors [&>svg]:text-white/40">
                      <div className="flex items-center gap-4 text-left">
                        <Lightbulb className="h-5 w-5 text-white/40 flex-shrink-0" />
                        <div>
                          <div className="text-base sm:text-lg font-semibold text-white">Real-world examples</div>
                          <div className="text-sm text-white/50 mt-1">How we'd label actual headlines</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4 pt-2">
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-xs font-medium text-emerald-400">POSITIVE</span>
                          </div>
                          <p className="text-sm text-white/80 italic mb-2">"BlackRock CEO Larry Fink calls Bitcoin 'digital gold' and legitimate asset class"</p>
                          <p className="text-xs text-white/50">Why: Explicit endorsement from major institution, favorable framing</p>
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-xs font-medium text-emerald-400">POSITIVE</span>
                          </div>
                          <p className="text-sm text-white/80 italic mb-2">"El Salvador's Bitcoin bonds oversubscribed as demand exceeds expectations"</p>
                          <p className="text-xs text-white/50">Why: Success story, adoption milestone, positive market signal</p>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-xs font-medium text-red-400">NEGATIVE</span>
                          </div>
                          <p className="text-sm text-white/80 italic mb-2">"ECB official warns Bitcoin is 'speculative bubble' with no intrinsic value"</p>
                          <p className="text-xs text-white/50">Why: Explicit criticism from authority figure, dismissive language</p>
                        </div>
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-xs font-medium text-red-400">NEGATIVE</span>
                          </div>
                          <p className="text-sm text-white/80 italic mb-2">"Bitcoin mining consumes more energy than entire countries, study finds"</p>
                          <p className="text-xs text-white/50">Why: Environmental criticism, negative framing of resource usage</p>
                        </div>
                        <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                            <span className="text-xs font-medium text-gray-400">BALANCED</span>
                          </div>
                          <p className="text-sm text-white/80 italic mb-2">"Bitcoin falls 5% to $42,000 amid broader market selloff"</p>
                          <p className="text-xs text-white/50">Why: Factual price reporting, no editorial tone or prediction</p>
                        </div>
                        <div className="bg-gray-500/10 border border-gray-500/20 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                            <span className="text-xs font-medium text-gray-400">BALANCED</span>
                          </div>
                          <p className="text-sm text-white/80 italic mb-2">"What is Bitcoin? A beginner's guide to cryptocurrency"</p>
                          <p className="text-xs text-white/50">Why: Educational content, explanatory without advocacy</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Edge Cases */}
                  <AccordionItem value="edge-cases" className="border-b border-white/10">
                    <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-white/5 transition-colors [&>svg]:text-white/40">
                      <div className="flex items-center gap-4 text-left">
                        <Database className="h-5 w-5 text-white/40 flex-shrink-0" />
                        <div>
                          <div className="text-base sm:text-lg font-semibold text-white">Edge cases & ambiguity</div>
                          <div className="text-sm text-white/50 mt-1">How we handle tricky content</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-6 pt-2">
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-3">Sarcasm & Irony</h5>
                          <p className="text-sm text-white/60 mb-2">We read for intended meaning, not literal text. "Bitcoin is totally going to zero this time" from a known advocate is labeled based on the sarcastic intent, not the surface words.</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-3">Mixed Sentiment</h5>
                          <p className="text-sm text-white/60 mb-2">When content contains both positive and negative elements, we label based on the <strong className="text-white">dominant tone</strong> and <strong className="text-white">conclusion</strong>. "Bitcoin has risks, but the opportunity outweighs them" → Positive. "Bitcoin has potential, but current risks are too high" → Negative.</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-3">Headline vs. Body Conflict</h5>
                          <p className="text-sm text-white/60 mb-2">Clickbait headlines often misrepresent article content. We label based on the <strong className="text-white">full content</strong>, not just the headline. A sensational negative headline with a balanced article body = Balanced.</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-3">Quoting Others</h5>
                          <p className="text-sm text-white/60 mb-2">When an outlet quotes someone else's opinion, we consider whether the outlet is endorsing, challenging, or neutrally reporting the view. "Buffett slams Bitcoin" reported neutrally = Balanced. Same quote with "and he's right" = Negative.</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-3">Price-Based Sentiment</h5>
                          <p className="text-sm text-white/60 mb-2">Price movements alone don't determine sentiment. "Bitcoin crashes 20%" with no commentary = Balanced. "Bitcoin crashes 20% proving critics right" = Negative. "Bitcoin dips 20% creating buying opportunity" = Positive.</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-3">Technical Content</h5>
                          <p className="text-sm text-white/60 mb-2">Developer discussions, protocol upgrades, and technical analysis are typically Balanced unless they include explicit value judgments about Bitcoin's future or worth.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Classification Process */}
                  <AccordionItem value="process" className="border-b border-white/10">
                    <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-white/5 transition-colors [&>svg]:text-white/40">
                      <div className="flex items-center gap-4 text-left">
                        <Database className="h-5 w-5 text-white/40 flex-shrink-0" />
                        <div>
                          <div className="text-base sm:text-lg font-semibold text-white">The classification process</div>
                          <div className="text-sm text-white/50 mt-1">How content flows through our pipeline</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-6 pt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="bg-white/5 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-white mb-1">1</div>
                            <div className="text-sm font-medium text-white mb-2">Ingestion</div>
                            <p className="text-xs text-white/50">Content collected from curated sources in real-time</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-white mb-1">2</div>
                            <div className="text-sm font-medium text-white mb-2">Classification</div>
                            <p className="text-xs text-white/50">Automated sentiment analysis based on defined criteria</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-4 text-center">
                            <div className="text-2xl font-bold text-white mb-1">3</div>
                            <div className="text-sm font-medium text-white mb-2">Delivery</div>
                            <p className="text-xs text-white/50">Structured data powers your watchlists, Spaces, and Recipes</p>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-3">Quality through curation</h5>
                          <ul className="space-y-2 text-sm text-white/60">
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-white/40 mt-0.5 flex-shrink-0" /><strong className="text-white">Source selection:</strong> Only trusted, relevant sources make it into the pipeline</li>
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-white/40 mt-0.5 flex-shrink-0" /><strong className="text-white">Defined criteria:</strong> Clear rules for positive, negative, and balanced classification</li>
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-white/40 mt-0.5 flex-shrink-0" /><strong className="text-white">Periodic review:</strong> Regular quality checks to refine classification accuracy</li>
                            <li className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-white/40 mt-0.5 flex-shrink-0" /><strong className="text-white">Continuous improvement:</strong> Source list and criteria updated as the landscape evolves</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Context Considerations */}
                  <AccordionItem value="context" className="border-b border-white/10">
                    <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-white/5 transition-colors [&>svg]:text-white/40">
                      <div className="flex items-center gap-4 text-left">
                        <Globe className="h-5 w-5 text-white/40 flex-shrink-0" />
                        <div>
                          <div className="text-base sm:text-lg font-semibold text-white">Context considerations</div>
                          <div className="text-sm text-white/50 mt-1">How source type and author affect interpretation</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-6 pt-2">
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-3">Source Type Matters</h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div className="bg-white/5 rounded-lg p-3">
                              <div className="font-medium text-white mb-1">Mainstream Media</div>
                              <p className="text-white/50 text-xs">Generally aims for balanced reporting. Sentiment often reflects editorial stance or quoted sources.</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                              <div className="font-medium text-white mb-1">Crypto-Native Media</div>
                              <p className="text-white/50 text-xs">Industry knowledge but potential bias. We account for outlet's historical positioning.</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                              <div className="font-medium text-white mb-1">Regulatory Sources</div>
                              <p className="text-white/50 text-xs">Official statements carry weight. Tone of guidance or enforcement matters.</p>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3">
                              <div className="font-medium text-white mb-1">Social Media</div>
                              <p className="text-white/50 text-xs">Author's track record and reach considered. Thread context matters for individual posts.</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-3">Author Reputation</h5>
                          <p className="text-sm text-white/60">A critical take from a known Bitcoin advocate is weighted differently than the same words from a consistent critic. We don't change the sentiment label, but we note when content is surprising given the source.</p>
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-white mb-3">Geographic Context</h5>
                          <p className="text-sm text-white/60">Regulatory sentiment is region-specific. A "ban" in one country and "approval" in another both get accurate labels even when covering the same underlying story.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* What's NOT Labeled */}
                  <AccordionItem value="exclusions" className="border-b-0">
                    <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-white/5 transition-colors [&>svg]:text-white/40">
                      <div className="flex items-center gap-4 text-left">
                        <XCircle className="h-5 w-5 text-white/40 flex-shrink-0" />
                        <div>
                          <div className="text-base sm:text-lg font-semibold text-white">What we don't label</div>
                          <div className="text-sm text-white/50 mt-1">Content excluded from sentiment analysis</div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4 pt-2">
                        <p className="text-sm text-white/60">Not all Bitcoin-related content receives a sentiment label. We exclude:</p>
                        <ul className="space-y-3 text-sm text-white/60">
                          <li className="flex items-start gap-3">
                            <XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />
                            <div><strong className="text-white">Duplicate content:</strong> Syndicated articles or wire stories are labeled once, not per outlet</div>
                          </li>
                          <li className="flex items-start gap-3">
                            <XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />
                            <div><strong className="text-white">Tangential mentions:</strong> "Bitcoin" appearing in unrelated context (e.g., "worth its weight in Bitcoin" as figure of speech)</div>
                          </li>
                          <li className="flex items-start gap-3">
                            <XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />
                            <div><strong className="text-white">Spam and low-quality content:</strong> Bot-generated content, obvious pump schemes, or content farms</div>
                          </li>
                          <li className="flex items-start gap-3">
                            <XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />
                            <div><strong className="text-white">Pure price tickers:</strong> Automated price feeds without any editorial content</div>
                          </li>
                          <li className="flex items-start gap-3">
                            <XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />
                            <div><strong className="text-white">Paywalled content:</strong> If we can't access the full text, we don't guess at sentiment</div>
                          </li>
                          <li className="flex items-start gap-3">
                            <XCircle className="h-4 w-4 text-red-500/60 mt-0.5 flex-shrink-0" />
                            <div><strong className="text-white">Non-English content without translation:</strong> We only label content we can accurately interpret</div>
                          </li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                </Accordion>
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