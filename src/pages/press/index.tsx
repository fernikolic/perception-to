import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Link as LinkIcon } from 'lucide-react';
import FlowingPattern from '@/components/FlowingPattern';

interface PressRelease {
  date: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  image?: string;
}

const pressReleases: PressRelease[] = [
  {
    date: 'August 4, 2025',
    title: 'Blockstream VP Fernando Nikolic Leaves To Launch Perception, A Bitcoin Market Intelligence Platform',
    description: 'After four years at Blockstream, Fernando Nikolic steps down to start Perception, a platform aimed at addressing fragmented information in the Bitcoin and digital asset space.',
    link: 'https://bitcoinmagazine.com/news/blockstream-vp-fernando-nikolic-leaves-to-launch-perception-a-bitcoin-market-intelligence-platform',
    tags: ['Bitcoin Magazine'],
    image: '/logos/BTC_Mag_Logo-removebg-preview.png',
  },
  {
    date: 'August 4, 2025',
    title: 'Blockstream VP Fernando Nikolic Departs After Four Years to Launch Market Intelligence Platform',
    description: 'Former Blockstream VP Fernando Nikolic announces departure to launch Perception, a comprehensive Bitcoin market intelligence platform designed for cryptocurrency professionals.',
    link: 'https://btctimes.com/blockstream-vp-fernando-nikolic-departs-after-four-years-to-launch-market-intelligence-platform/',
    tags: ['BTC Times'],
    image: 'https://btctimes.com/content/images/size/w1200/2025/08/Blockstream-VP-Fernando-Nikolic-Departs-After-Four-Years-To-Launch-Market-Intelligence-Platform.jpeg',
  },
  {
    date: 'July 9, 2025',
    title: 'Mainstream Financial Publications Largely Ignored Bitcoin in Q2, Report Reveals',
    description: 'According to a new report by market intelligence firm Bitcoin Perception, mainstream media coverage remained strikingly sparse and divided.',
    link: 'https://beincrypto.com/bitcoin-media-coverage-q2-2025/',
    tags: ['BeInCrypto'],
    image: 'https://beincrypto.com/_mfes/post/_next/image/?url=https%3A%2F%2Fbeincrypto.com%2Fwp-content%2Fuploads%2F2023%2F07%2Fbic_Bitcoin_etf_ETFs_General_4-covers_neutral.png&w=1920&q=75',
  },
  {
    date: 'July 9, 2025',
    title: 'Bitcoin lacked mass media coverage in Q2: Report',
    description: 'Major news outlets The Wall Street Journal, the Financial Times and The New York Times published just 13 articles on Bitcoin in Q2, according to research from Perception.',
    link: 'https://cointelegraph.com/news/bitcoin-lacked-coverage-mass-media-q2-report',
    tags: ['Cointelegraph'],
    image: 'https://images.cointelegraph.com/cdn-cgi/image/format=auto,onerror=redirect,quality=90,width=717/https://s3.cointelegraph.com/uploads/2025-07/0197ecff-0c82-7883-b261-5a2176d22dbb',
  },
  {
    date: 'December 5, 2024',
    title: 'Bitcoin at $100K: How the media\'s perception has shifted since 2009',
    description: 'The ratio of positive Bitcoin stories has increased as Bitcoin soared to new highs and became more institutionalized in the early 2020s, according to Bitcoin Perception data shared exclusively with Cointelegraph.',
    link: 'https://cointelegraph.com/news/bitcoins-change-in-media-perception-from-0-to-100000-dollars',
    tags: ['Cointelegraph'],
    image: 'https://images.cointelegraph.com/cdn-cgi/image/format=auto,onerror=redirect,quality=90,width=717/https://s3.cointelegraph.com/uploads/2024-11/0193477d-2339-770b-9f14-aa63749d849f',
  },
];

const mediaKit = [
  {
    title: 'Company Overview',
    description: 'Learn about the Intelligence Workspace and our team.',
    link: '/about',
    disabled: false,
  },
  {
    title: 'Brand Assets',
    description: 'Logo, screenshots, and brand materials.',
    link: '#',
    disabled: true,
    badge: 'Coming Soon',
  },
  {
    title: 'Media Contact',
    description: 'Get in touch with our press team.',
    link: 'mailto:press@perception.to',
    disabled: false,
  },
];

export function PressPage() {
  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
        {/* Base Gradient */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

        <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
          {/* Hero Card with Side-by-Side Layout */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row min-h-[600px]">
              {/* Flowing Pattern - Left Side (50%) */}
              <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[600px]">
                <FlowingPattern />
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
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-40"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-400"></span>
                        </span>
                        <span className="relative font-bold text-black">PRESS</span>
                      </span>
                      <span className="ml-2.5 text-black/80">News & Media</span>
                    </div>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-black mb-5 sm:mb-6 lg:mb-8 text-center lg:text-left">
                    Press{'\u00A0'}Center
                  </h1>

                  <div className="mb-6 sm:mb-8 lg:mb-10 text-center lg:text-left">
                    <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/70 font-semibold mb-3">
                      Latest news and coverage about{'\u00A0'}Perception.
                    </p>
                    <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-black/60 font-light">
                      The Intelligence Workspace for Bitcoin, stablecoins, and tokenized finance. Track with watchlists, organize in <em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Spaces</em>, generate with{'\u00A0'}<em style={{ fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>Recipes</em>.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 sm:gap-6">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                      asChild
                    >
                      <a href="mailto:press@perception.to">
                        Contact press team
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white/80 backdrop-blur-sm text-black hover:bg-white transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base lg:text-lg shadow-2xl hover:shadow-3xl hover:scale-105 border-2 border-black/20 hover:border-black/30 rounded-2xl"
                      onClick={() => {
                        document.getElementById('latest-news')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      View news
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Press Releases */}
      <section id="latest-news" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-4 sm:mb-6 px-2">
              Latest News
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-light text-gray-600 px-2">
              Recent coverage and announcements
            </p>
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            {pressReleases.map((release) => (
              <a
                key={release.title}
                href={release.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row h-full">
                  {release.image && (
                    <div className="md:w-72 h-48 sm:h-56 md:h-auto relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                      <img
                        src={release.image}
                        alt={release.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        {release.tags.map((tag) => (
                          <span key={tag} className="px-2 sm:px-3 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-md border border-orange-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 leading-snug mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors">
                        {release.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                        {release.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
                      <div className="text-xs sm:text-sm text-gray-500 font-medium">
                        {release.date}
                      </div>
                      <div className="text-orange-600 text-xs sm:text-sm font-semibold inline-flex items-center gap-1 sm:gap-2">
                        Read article
                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-4 sm:mb-6 px-2">
              Media Resources
            </h2>
            <p className="text-base sm:text-lg lg:text-xl font-light text-gray-600 px-2">
              Everything you need to cover Perception
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3">
            {mediaKit.map((item) => (
              <div
                key={item.title}
                className={`relative bg-gray-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 ${
                  item.disabled
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:bg-gray-100 cursor-pointer'
                }`}
              >
                {item.badge && (
                  <span className="absolute top-4 sm:top-6 right-4 sm:right-6 px-2 sm:px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                    {item.badge}
                  </span>
                )}

                <div className="mb-4 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                    <LinkIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-light text-black mb-2 sm:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-base sm:text-lg font-light text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.disabled ? (
                  <div className="text-sm font-medium text-gray-400">
                    Access
                  </div>
                ) : (
                  <a
                    href={item.link}
                    className="text-black text-sm font-medium hover:text-gray-600 transition-colors group inline-flex items-center gap-2"
                  >
                    Access
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}