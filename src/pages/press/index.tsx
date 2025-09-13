import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Link as LinkIcon } from 'lucide-react';

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
    tags: ['Company Launch', 'Bitcoin', 'Market Intelligence'],
    image: '/logos/BTC_Mag_Logo-removebg-preview.png',
  },
  {
    date: 'August 4, 2025',
    title: 'Blockstream VP Fernando Nikolic Departs After Four Years to Launch Market Intelligence Platform',
    description: 'Former Blockstream VP Fernando Nikolic announces departure to launch Perception, a comprehensive Bitcoin market intelligence platform designed for cryptocurrency professionals.',
    link: 'https://btctimes.com/blockstream-vp-fernando-nikolic-departs-after-four-years-to-launch-market-intelligence-platform/',
    tags: ['Leadership', 'Bitcoin', 'Analytics'],
    image: 'https://btctimes.com/content/images/size/w1200/2025/08/Blockstream-VP-Fernando-Nikolic-Departs-After-Four-Years-To-Launch-Market-Intelligence-Platform.jpeg',
  },
];

const mediaKit = [
  {
    title: 'Company Overview',
    description: 'Learn about our mission and team.',
    link: '#',
    disabled: false,
  },
  {
    title: 'Brand Assets',
    description: 'Download our logo, screenshots, and other brand materials.',
    link: '#',
    disabled: true,
    badge: 'Coming Soon',
  },
  {
    title: 'Media Contact',
    description: 'Get in touch with our communications team.',
    link: 'mailto:press@perception.to',
    disabled: false,
  },
];

export function PressPage() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section (image card with overlay) */}
      <section className="relative overflow-hidden py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-black">
                  Press Center
                </h1>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg xl:text-xl leading-6 sm:leading-7 lg:leading-8 text-black/70 font-light">
                  Get the latest news and updates about Perception's mission to make emerging finance intelligence accessible to everyone.
                </p>
                <div className="mt-8 sm:mt-10 flex items-center justify-center gap-x-6">
                  <Button size="lg" className="bg-black text-white hover:bg-black/90">Contact Press Team</Button>
                  <Button variant="outline" size="lg" className="group border-black/30 text-black hover:bg-black/5">
                    Download Media Kit{' '}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Press Releases */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin tracking-tight text-black mb-4">
              Latest News
            </h2>
            <p className="text-lg font-light text-gray-600">
              Recent coverage and announcements
            </p>
          </div>
          
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <div key={release.title} className="bg-white rounded-3xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row">
                  {release.image && (
                    <div className="lg:w-80 flex items-center justify-center bg-black p-8">
                      <img 
                        src={release.image} 
                        alt={release.title}
                        className={`w-full h-32 lg:h-40 ${
                          release.image.includes('/logos/') 
                            ? 'object-contain' 
                            : 'object-cover'
                        }`}
                      />
                    </div>
                  )}
                  <div className="flex-1 p-8 lg:p-12">
                    <div className="text-sm font-medium text-gray-500 mb-3">
                      {release.date}
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-light text-black leading-tight mb-4">
                      {release.title}
                    </h3>
                    <p className="text-lg font-light text-gray-600 leading-relaxed mb-6">
                      {release.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        {release.tags.map((tag) => (
                          <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a 
                        href={release.link} 
                        className="text-black text-sm font-medium hover:text-gray-600 transition-colors group inline-flex items-center gap-2"
                      >
                        Read article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Kit */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-thin tracking-tight text-black mb-4">
              Media Resources
            </h2>
            <p className="text-lg font-light text-gray-600">
              Everything you need to cover Perception
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {mediaKit.map((item) => (
              <div 
                key={item.title} 
                className={`relative bg-gray-50 rounded-3xl p-8 transition-all duration-300 ${
                  item.disabled 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:bg-gray-100 cursor-pointer'
                }`}
              >
                {item.badge && (
                  <span className="absolute top-6 right-6 px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                    {item.badge}
                  </span>
                )}
                
                <div className="mb-6">
                  <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center mb-4">
                    <LinkIcon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-light text-black mb-3">
                    {item.title}
                  </h3>
                  <p className="text-lg font-light text-gray-600 leading-relaxed">
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