import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, MapPinIcon, UsersIcon, SearchIcon, FilterIcon, ChevronRightIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Conference {
  date: string;
  name: string;
  location: string;
  type: string;
  duration: string;
  monthYear: string;
  dateDisplay: string;
}

// Updated comprehensive conference data
const allConferences: Conference[] = [
  { date: '2025-01-14', name: 'CfC St. Moritz', location: 'St. Moritz, Switzerland', type: 'Digital Assets/Institutional', duration: 'Jan 14-16', monthYear: 'January 2025', dateDisplay: 'Jan 14, 2025' },
  { date: '2025-01-21', name: 'Institutional Investor Summit: UK & Ireland', location: 'Bagshot, UK', type: 'Institutional Investment', duration: 'Jan 21', monthYear: 'January 2025', dateDisplay: 'Jan 21, 2025' },
  { date: '2025-03-14', name: 'Canadian Bitcoin Conference', location: 'Montreal, Canada', type: 'Bitcoin', duration: 'Mar 14', monthYear: 'March 2025', dateDisplay: 'Mar 14, 2025' },
  { date: '2025-03-19', name: 'Next Block Expo', location: 'Warsaw, Poland', type: 'Blockchain', duration: 'Mar 19-20', monthYear: 'March 2025', dateDisplay: 'Mar 19, 2025' },
  { date: '2025-03-26', name: 'DC Blockchain Summit', location: 'Washington, DC, USA', type: 'Blockchain Policy', duration: 'Mar 26', monthYear: 'March 2025', dateDisplay: 'Mar 26, 2025' },
  { date: '2025-03-26', name: 'Real World Crypto Symposium', location: 'Sofia, Bulgaria', type: 'Cryptography', duration: 'Mar 26-28', monthYear: 'March 2025', dateDisplay: 'Mar 26, 2025' },
  { date: '2025-04-04', name: 'MIT Bitcoin Hackathon', location: 'Cambridge, Massachusetts, USA', type: 'Bitcoin Technical', duration: 'Apr 04-06', monthYear: 'April 2025', dateDisplay: 'Apr 04, 2025' },
  { date: '2025-04-05', name: 'MIT Bitcoin Expo', location: 'Cambridge, Massachusetts, USA', type: 'Bitcoin Technical', duration: 'Apr 05-06', monthYear: 'April 2025', dateDisplay: 'Apr 05, 2025' },
  { date: '2025-04-08', name: 'Paris Blockchain Week', location: 'Paris, France', type: 'Blockchain', duration: 'Apr 08-11', monthYear: 'April 2025', dateDisplay: 'Apr 08, 2025' },
  { date: '2025-04-24', name: 'Bitcoin Standard Corporations Investor Day', location: 'New York City, USA', type: 'Corporate Bitcoin', duration: 'Apr 24', monthYear: 'April 2025', dateDisplay: 'Apr 24, 2025' },
  { date: '2025-04-24', name: 'AIMA Digital Assets Conference', location: 'New York City, USA', type: 'Institutional Digital Assets', duration: 'Apr 24', monthYear: 'April 2025', dateDisplay: 'Apr 24, 2025' },
  { date: '2025-04-25', name: 'Cornell Blockchain Conference', location: 'New York City, USA', type: 'Academic Blockchain', duration: 'Apr 25', monthYear: 'April 2025', dateDisplay: 'Apr 25, 2025' },
  { date: '2025-04-25', name: 'Harvard Blockchain Conference', location: 'Cambridge, USA', type: 'Academic Blockchain', duration: 'Apr 25', monthYear: 'April 2025', dateDisplay: 'Apr 25, 2025' },
  { date: '2025-04-25', name: 'ONCHAIN 2025 - Real World Assets Conference', location: 'Hong Kong', type: 'RWA/Traditional Finance', duration: 'Apr 25-26', monthYear: 'April 2025', dateDisplay: 'Apr 25, 2025' },
  { date: '2025-05-06', name: 'Bitcoin for Corporations', location: 'Orlando, Florida, USA', type: 'Bitcoin Corporate', duration: 'May 06-07', monthYear: 'May 2025', dateDisplay: 'May 06, 2025' },
  { date: '2025-05-07', name: 'Bitcoin++ Austin', location: 'Austin, Texas, USA', type: 'Bitcoin Technical', duration: 'May 07-08', monthYear: 'May 2025', dateDisplay: 'May 07, 2025' },
  { date: '2025-05-13', name: 'Blockchain Futurist Conference', location: 'Toronto, Canada', type: 'Blockchain', duration: 'May 13-14', monthYear: 'May 2025', dateDisplay: 'May 13, 2025' },
  { date: '2025-05-14', name: 'Consensus Toronto', location: 'Toronto, Canada', type: 'Blockchain/Institutional', duration: 'May 14-16', monthYear: 'May 2025', dateDisplay: 'May 14, 2025' },
  { date: '2025-05-14', name: 'HODL Summit', location: 'Dubai, UAE', type: 'Institutional Blockchain', duration: 'May 14-15', monthYear: 'May 2025', dateDisplay: 'May 14, 2025' },
  { date: '2025-05-26', name: 'Oslo Freedom Forum', location: 'Oslo, Norway', type: 'Bitcoin/Freedom', duration: 'May 26-28', monthYear: 'May 2025', dateDisplay: 'May 26, 2025' },
  { date: '2025-05-27', name: 'Bitcoin Conference 2025', location: 'Las Vegas, Nevada, USA', type: 'Bitcoin', duration: 'May 27-29', monthYear: 'May 2025', dateDisplay: 'May 27, 2025' },
  { date: '2025-06-02', name: 'ICBC 2025', location: 'Pisa, Italy', type: 'Academic Blockchain', duration: 'Jun 02-04', monthYear: 'June 2025', dateDisplay: 'Jun 02, 2025' },
  { date: '2025-06-02', name: 'Canadian Finance Summit', location: 'Toronto, Canada', type: 'Banking/FinTech', duration: 'Jun 02-03', monthYear: 'June 2025', dateDisplay: 'Jun 02, 2025' },
  { date: '2025-06-03', name: 'Money20/20 Europe', location: 'Amsterdam, Netherlands', type: 'FinTech/Payments', duration: 'Jun 03-05', monthYear: 'June 2025', dateDisplay: 'Jun 03, 2025' },
  { date: '2025-06-05', name: 'Crypto Valley Conference', location: 'Rotkreuz, Switzerland', type: 'Institutional Crypto', duration: 'Jun 05-06', monthYear: 'June 2025', dateDisplay: 'Jun 05, 2025' },
  { date: '2025-06-12', name: 'Blockchain Finance Summit', location: 'London, UK', type: 'Traditional Finance/Blockchain', duration: 'Jun 12', monthYear: 'June 2025', dateDisplay: 'Jun 12, 2025' },
  { date: '2025-06-19', name: 'BTC Prague', location: 'Prague, Czech Republic', type: 'Bitcoin', duration: 'Jun 19-21', monthYear: 'June 2025', dateDisplay: 'Jun 19, 2025' },
  { date: '2025-07-03', name: 'Blockchain Expo World', location: 'Istanbul, Turkey', type: 'Blockchain', duration: 'Jul 03-04', monthYear: 'July 2025', dateDisplay: 'Jul 03, 2025' },
  { date: '2025-07-07', name: 'UBC Blockchain Summer Institute', location: 'Vancouver, Canada', type: 'Academic Blockchain', duration: 'Jul 07-18', monthYear: 'July 2025', dateDisplay: 'Jul 07, 2025' },
  { date: '2025-07-24', name: 'Injective Summit: Bridging TradFi & Blockchain', location: 'New York City, USA', type: 'Traditional Finance/Blockchain', duration: 'Jul 24', monthYear: 'July 2025', dateDisplay: 'Jul 24, 2025' },
  { date: '2025-08-04', name: 'Science of Blockchain Conference', location: 'Berkeley, California, USA', type: 'Academic Blockchain', duration: 'Aug 04-06', monthYear: 'August 2025', dateDisplay: 'Aug 04, 2025' },
  { date: '2025-08-07', name: 'Bitcoin++ Riga', location: 'Riga, Latvia', type: 'Bitcoin Technical', duration: 'Aug 07-08', monthYear: 'August 2025', dateDisplay: 'Aug 07, 2025' },
  { date: '2025-08-07', name: 'BitBlockBoom', location: 'Fort Worth, Texas, USA', type: 'Bitcoin', duration: 'Aug 07-09', monthYear: 'August 2025', dateDisplay: 'Aug 07, 2025' },
  { date: '2025-08-09', name: 'Baltic Honeybadger', location: 'Riga, Latvia', type: 'Bitcoin', duration: 'Aug 09-10', monthYear: 'August 2025', dateDisplay: 'Aug 09, 2025' },
  { date: '2025-08-13', name: 'Blockchain Futurist Conference Toronto', location: 'Toronto, Canada', type: 'Blockchain', duration: 'Aug 13-14', monthYear: 'August 2025', dateDisplay: 'Aug 13, 2025' },
  { date: '2025-08-27', name: 'Stablecoin Conference Mexico', location: 'Mexico City, Mexico', type: 'Stablecoin', duration: 'Aug 27-28', monthYear: 'August 2025', dateDisplay: 'Aug 27, 2025' },
  { date: '2025-09-02', name: 'Finance & Crypto Day', location: 'London, UK', type: 'Traditional Finance/Crypto', duration: 'Sep 02', monthYear: 'September 2025', dateDisplay: 'Sep 02, 2025' },
  { date: '2025-09-03', name: 'CONF3RENCE', location: 'Dortmund, Germany', type: 'Blockchain', duration: 'Sep 03-04', monthYear: 'September 2025', dateDisplay: 'Sep 03, 2025' },
  { date: '2025-09-09', name: 'CBDC Conference', location: 'Nassau, Bahamas', type: 'CBDC/Institutional', duration: 'Sep 09-11', monthYear: 'September 2025', dateDisplay: 'Sep 09, 2025' },
  { date: '2025-09-16', name: 'Digital Assets and Blockchain Day', location: 'Toronto, Canada', type: 'Institutional Digital Assets', duration: 'Sep 16', monthYear: 'September 2025', dateDisplay: 'Sep 16, 2025' },
  { date: '2025-09-18', name: 'CBC Summit USA', location: 'Washington, DC, USA', type: 'Crypto Banking', duration: 'Sep 18', monthYear: 'September 2025', dateDisplay: 'Sep 18, 2025' },
  { date: '2025-09-22', name: 'Korea Blockchain Week', location: 'Seoul, South Korea', type: 'Blockchain', duration: 'Sep 22-27', monthYear: 'September 2025', dateDisplay: 'Sep 22, 2025' },
  { date: '2025-09-24', name: 'Global Blockchain & Crypto Symposium', location: 'London, UK', type: 'Institutional Blockchain', duration: 'Sep 24', monthYear: 'September 2025', dateDisplay: 'Sep 24, 2025' },
  { date: '2025-10-01', name: 'TOKEN2049 Singapore', location: 'Singapore', type: 'Institutional Crypto', duration: 'Oct 01-02', monthYear: 'October 2025', dateDisplay: 'Oct 01, 2025' },
  { date: '2025-10-07', name: 'Future of Asset Management North America', location: 'USA', type: 'Asset Management/Digital Assets', duration: 'Oct 07', monthYear: 'October 2025', dateDisplay: 'Oct 07, 2025' },
  { date: '2025-10-12', name: 'Future Blockchain Summit', location: 'Dubai, UAE', type: 'Blockchain/FinTech', duration: 'Oct 12-13', monthYear: 'October 2025', dateDisplay: 'Oct 12, 2025' },
  { date: '2025-10-13', name: 'TABConf', location: 'Georgia, USA', type: 'Bitcoin Technical', duration: 'Oct 13-16', monthYear: 'October 2025', dateDisplay: 'Oct 13, 2025' },
  { date: '2025-10-16', name: 'European Blockchain Convention', location: 'Barcelona, Spain', type: 'Blockchain', duration: 'Oct 16-17', monthYear: 'October 2025', dateDisplay: 'Oct 16, 2025' },
  { date: '2025-10-28', name: 'Blockchain Life', location: 'Dubai, UAE', type: 'Blockchain', duration: 'Oct 28-29', monthYear: 'October 2025', dateDisplay: 'Oct 28, 2025' },
  { date: '2025-10-30', name: 'Blockchain Africa Conference', location: 'Gauteng, South Africa', type: 'Blockchain', duration: 'Oct 30', monthYear: 'October 2025', dateDisplay: 'Oct 30, 2025' },
  { date: '2025-11-03', name: 'OMFIF Public Blockchain Working Group Report Launch', location: 'Virtual', type: 'Banking/Public Blockchain', duration: 'Nov 03', monthYear: 'November 2025', dateDisplay: 'Nov 03, 2025' },
  { date: '2025-11-05', name: 'Blockchain Futurist Conference Miami', location: 'Miami, Florida, USA', type: 'Blockchain', duration: 'Nov 05-06', monthYear: 'November 2025', dateDisplay: 'Nov 05, 2025' },
  { date: '2025-11-07', name: 'SatsConf', location: 'São Paulo, Brazil', type: 'Bitcoin', duration: 'Nov 07-08', monthYear: 'November 2025', dateDisplay: 'Nov 07, 2025' },
  { date: '2025-11-11', name: 'Mining Disrupt', location: 'Dallas, Texas, USA', type: 'Bitcoin Mining', duration: 'Nov 11-13', monthYear: 'November 2025', dateDisplay: 'Nov 11, 2025' },
  { date: '2025-11-13', name: 'Bitcoin Amsterdam', location: 'Amsterdam, Netherlands', type: 'Bitcoin', duration: 'Nov 13-14', monthYear: 'November 2025', dateDisplay: 'Nov 13, 2025' },
  { date: '2025-12-08', name: 'Blockchain Association Policy Summit', location: 'Washington, DC, USA', type: 'Policy/Regulation', duration: 'Dec 08', monthYear: 'December 2025', dateDisplay: 'Dec 08, 2025' },
  { date: '2025-12-08', name: 'Bitcoin Abu Dhabi', location: 'Abu Dhabi, UAE', type: 'Bitcoin', duration: 'Dec 08-09', monthYear: 'December 2025', dateDisplay: 'Dec 08, 2025' },
  { date: '2026-03-17', name: 'CBC Summit Europe', location: 'London, UK', type: 'Crypto Banking', duration: 'Mar 17', monthYear: 'March 2026', dateDisplay: 'Mar 17, 2026' },
  { date: '2026-04-27', name: 'Bitcoin Conference 2026', location: 'Las Vegas, Nevada, USA', type: 'Bitcoin', duration: 'Apr 27-29', monthYear: 'April 2026', dateDisplay: 'Apr 27, 2026' },
  { date: '2026-08-27', name: 'Bitcoin Hong Kong', location: 'Hong Kong', type: 'Bitcoin', duration: 'Aug 27-28', monthYear: 'August 2026', dateDisplay: 'Aug 27, 2026' },
  { date: '2026-09-09', name: 'Stablecon', location: 'Washington, DC, USA', type: 'Stablecoin', duration: 'Sep 09-11', monthYear: 'September 2026', dateDisplay: 'Sep 09, 2026' }
];

// Remove conferences with unwanted categories (only exact matches to avoid over-filtering)
const conferences: Conference[] = allConferences.filter(conf => {
  const lowerType = conf.type.toLowerCase();
  return !lowerType.includes('nft') &&
         !lowerType.includes('defi') &&
         !lowerType.includes('metaverse') &&
         // Keep conferences that have Web3 or Ethereum as secondary types
         !(lowerType === 'nft' || lowerType === 'defi' || lowerType === 'web3' ||
           lowerType === 'ethereum' || lowerType === 'metaverse')
});

// Generate URL slug from conference name
const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Generate URL from conference data
const generateConferenceUrl = (conference: Conference): string => {
  const year = new Date(conference.date).getFullYear();
  const slug = generateSlug(conference.name);
  return `/crypto-conferences/${year}/${slug}`;
};

// Generate URL for monthly page
const generateMonthUrl = (monthYear: string): string => {
  const [month, year] = monthYear.split(' ');
  return `/crypto-conferences/${year}/${month.toLowerCase()}`;
};

export function CryptoConferencesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  const conferenceTypes = useMemo(() => {
    const types = Array.from(new Set(conferences.map(conf => conf.type)));
    return types.sort();
  }, []);

  const locations = useMemo(() => {
    const locs = Array.from(new Set(conferences.map(conf => {
      const parts = conf.location.split(', ');
      return parts[parts.length - 1]; // Get country/region
    })));
    return locs.sort();
  }, []);

  const filteredConferences = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

    return conferences.filter(conference => {
      // Only show current and future events
      const conferenceDate = new Date(conference.date);
      const isFutureOrCurrent = conferenceDate >= today;

      const matchesSearch = conference.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           conference.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           conference.type.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType === 'all' || conference.type === selectedType;

      const matchesLocation = selectedLocation === 'all' ||
                            conference.location.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesTimeframe = selectedTimeframe === 'all' ||
                              (selectedTimeframe === '2025' && conference.date.startsWith('2025')) ||
                              (selectedTimeframe === '2026' && conference.date.startsWith('2026'));

      return isFutureOrCurrent && matchesSearch && matchesType && matchesLocation && matchesTimeframe;
    });
  }, [searchTerm, selectedType, selectedLocation, selectedTimeframe]);

  const upcomingConferences = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
    return conferences
      .filter(conf => new Date(conf.date) >= today)
      .slice(0, 6);
  }, []);

  const conferencesByMonth = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison
    const futureConferences = conferences.filter(conf => new Date(conf.date) >= today);

    const grouped = futureConferences.reduce((acc, conf) => {
      const month = conf.monthYear;
      if (!acc[month]) acc[month] = [];
      acc[month].push(conf);
      return acc;
    }, {} as Record<string, Conference[]>);
    return grouped;
  }, []);

  return (
    <>
      <Helmet>
        <title>Crypto Conferences 2025-2026 | Bitcoin, Blockchain & Web3 Events Calendar</title>
        <meta name="description" content="Comprehensive directory of 55+ crypto conferences 2025-2026 including Bitcoin meetups, blockchain summits, institutional events, and academic symposiums. Find cryptocurrency conferences by date, location, and type across 30+ global cities." />
        <meta name="keywords" content="crypto conferences 2025, bitcoin conferences 2026, blockchain events, institutional crypto summits, cryptocurrency conventions, bitcoin meetups, blockchain summits, digital asset conferences, TOKEN2049, Consensus, Bitcoin Conference, Paris Blockchain Week, Korea Blockchain Week, crypto events calendar" />
        <link rel="canonical" href="https://perception.to/crypto-conferences" />

        {/* Open Graph */}
        <meta property="og:title" content="Crypto Conferences 2025-2026 | Bitcoin, Blockchain & Institutional Events" />
        <meta property="og:description" content="Discover upcoming crypto conferences worldwide. Complete calendar of Bitcoin, blockchain, institutional, and academic events with dates, locations, and types." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://perception.to/crypto-conferences" />
        <meta property="og:image" content="https://perception.to/images/crypto-conferences-og.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Crypto Conferences 2025-2026 Calendar" />
        <meta name="twitter:description" content="Complete directory of Bitcoin and blockchain conferences worldwide" />

        {/* Structured Data - ItemList for directory pages */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Crypto Conferences 2025-2026",
            "description": "Global directory of cryptocurrency, Bitcoin, and blockchain conferences",
            "numberOfItems": conferences.length,
            "itemListElement": conferences.slice(0, 10).map((conf, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Event",
                "name": conf.name,
                "startDate": conf.date,
                "location": {
                  "@type": "Place",
                  "name": conf.location,
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": conf.location
                  }
                },
                "eventStatus": "https://schema.org/EventScheduled",
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "url": `https://perception.to${generateConferenceUrl(conf)}`
              }
            }))
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-[#F0EEE6]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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

                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />

                {/* Content */}
                <div className="relative px-4 sm:px-8 lg:px-16 py-12 sm:py-20 lg:py-32 text-center text-white">
                  <h1
                    className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 lg:mb-10 leading-tight sm:leading-[0.95] px-2"
                    style={{ color: 'white' }}
                  >
                    Bitcoin & Blockchain
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                      Conferences
                    </span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-10 sm:mb-12 lg:mb-16 max-w-4xl mx-auto leading-relaxed text-white/90 font-light px-2">
                    The definitive directory of cryptocurrency conferences, Bitcoin meetups, and blockchain summits.
                    Connecting the global crypto community across {conferences.length} events worldwide.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 lg:mt-16">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{conferences.length}</div>
                      <div className="text-xs sm:text-sm lg:text-base font-medium text-white/80">Global Events</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">30+</div>
                      <div className="text-xs sm:text-sm lg:text-base font-medium text-white/80">Countries</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">15+</div>
                      <div className="text-xs sm:text-sm lg:text-base font-medium text-white/80">Event Types</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">50+</div>
                      <div className="text-xs sm:text-sm lg:text-base font-medium text-white/80">Cities</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Search Section - Apple Style */}
          <section className="py-8 sm:py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <div className="relative mb-6 sm:mb-8">
                <SearchIcon className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
                <Input
                  placeholder="Search conferences, locations, or event types"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 sm:pl-12 h-12 sm:h-14 text-base sm:text-lg border-gray-200 rounded-xl sm:rounded-2xl bg-gray-50 focus:bg-white transition-all duration-200 focus:ring-0 focus:border-gray-300"
                />
              </div>

              {/* Refined Filters */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-auto min-w-[140px] h-11 rounded-full border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {conferenceTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-auto min-w-[140px] h-11 rounded-full border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-auto min-w-[100px] h-11 rounded-full border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2026">2026</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Results count */}
              <div className="text-center text-gray-600">
                {filteredConferences.length} conferences found
              </div>
            </div>
          </section>

          {/* Featured Upcoming Events - Apple Style */}
          <section className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-4 sm:mb-6 px-2">
                  Upcoming events
                </h2>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-black/60 font-light px-2">
                  Next major conferences and events
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingConferences.map((conference, index) => (
                  <Link
                    key={index}
                    to={generateConferenceUrl(conference)}
                    className="group rounded-2xl bg-black border border-white/10 hover:bg-black/90 transition-all duration-200 overflow-hidden block"
                  >
                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="inline-block px-3 py-1 text-sm font-medium bg-orange-500/20 text-orange-400 rounded-full">
                          {conference.type}
                        </span>
                        <span className="text-sm font-medium text-white">
                          {conference.dateDisplay}
                        </span>
                      </div>
                      <h3 className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                        {conference.name}
                      </h3>
                      <div className="flex items-center gap-2 text-white/70">
                        <MapPinIcon className="h-4 w-4 text-white/50" />
                        {conference.location}
                      </div>
                      <div className="flex items-center gap-2 text-white/70">
                        <CalendarIcon className="h-4 w-4 text-white/50" />
                        {conference.duration}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Main Conference Listing - Apple Style */}
          <section className="py-12 sm:py-16 lg:py-20 bg-black">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white mb-4 sm:mb-6 px-2">
                  All conferences
                </h2>
                <p className="text-base sm:text-lg lg:text-xl text-white/60 font-light max-w-3xl mx-auto px-2">
                  Browse the complete directory of Bitcoin and blockchain events worldwide.
                </p>
              </div>

              <Tabs defaultValue="grid" className="space-y-8">
                <div className="flex justify-center">
                  <TabsList className="bg-white/10 p-1 rounded-2xl border-0">
                    <TabsTrigger value="grid" className="rounded-xl px-6 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black text-white">
                      Grid
                    </TabsTrigger>
                    <TabsTrigger value="timeline" className="rounded-xl px-6 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black text-white">
                      Timeline
                    </TabsTrigger>
                    <TabsTrigger value="monthly" className="rounded-xl px-6 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-black text-white">
                      Monthly
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="grid" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredConferences.map((conference, index) => (
                      <Link
                        key={index}
                        to={generateConferenceUrl(conference)}
                        className="group rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 overflow-hidden block"
                      >
                        <div className="p-5 space-y-3">
                          <div className="flex justify-between items-start">
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-orange-500/20 text-orange-400 rounded">
                              {conference.type}
                            </span>
                            <span className="text-sm font-medium text-white">
                              {conference.dateDisplay}
                            </span>
                          </div>
                          <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                            {conference.name}
                          </h4>
                          <div className="space-y-2 text-sm text-white/70">
                            <div className="flex items-center gap-2">
                              <MapPinIcon className="h-4 w-4 text-white/50" />
                              {conference.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarIcon className="h-4 w-4 text-white/50" />
                              {conference.duration}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                <div className="max-w-4xl mx-auto space-y-3">
                  {filteredConferences.map((conference, index) => (
                    <Link
                      key={index}
                      to={generateConferenceUrl(conference)}
                      className="group relative rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 overflow-hidden block"
                    >
                      <div className="p-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                              <div className="text-sm font-medium text-white min-w-[80px]">
                                {conference.dateDisplay}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors mb-1">
                                  {conference.name}
                                </h4>
                                <p className="text-sm text-white/70 flex items-center gap-1">
                                  <MapPinIcon className="h-3 w-3 text-white/50" />
                                  {conference.location}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="inline-block px-2 py-1 text-xs bg-orange-500/20 text-orange-400 rounded whitespace-nowrap">
                              {conference.type}
                            </span>
                            <ChevronRightIcon className="h-4 w-4 text-white/50 group-hover:text-orange-400 transition-colors" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="monthly" className="space-y-12">
                {Object.entries(conferencesByMonth).map(([month, monthConferences]) => {
                  const filteredMonthConfs = monthConferences.filter(conf => filteredConferences.includes(conf));
                  if (filteredMonthConfs.length === 0) return null;

                  return (
                    <div key={month} className="space-y-6">
                      <div className="text-center">
                        <Link
                          to={generateMonthUrl(month)}
                          className="inline-block group hover:text-orange-400 transition-colors"
                        >
                          <h3 className="text-2xl font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
                            {month}
                          </h3>
                          <div className="w-12 h-0.5 bg-white/30 group-hover:bg-orange-400 transition-colors mx-auto"></div>
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredMonthConfs.map((conference, index) => (
                          <Link
                            key={index}
                            to={generateConferenceUrl(conference)}
                            className="group rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 overflow-hidden block"
                          >
                            <div className="p-5 space-y-3">
                              <div className="flex justify-between items-start">
                                <span className="inline-block px-2 py-1 text-xs font-medium bg-orange-500/20 text-orange-400 rounded">
                                  {conference.type}
                                </span>
                                <span className="text-sm font-medium text-white">
                                  {conference.dateDisplay}
                                </span>
                              </div>
                              <h4 className="font-semibold text-white group-hover:text-orange-400 transition-colors">
                                {conference.name}
                              </h4>
                              <div className="text-sm text-white/70 space-y-1">
                                <div className="flex items-center gap-2">
                                  <MapPinIcon className="h-3 w-3 text-white/50" />
                                  {conference.location}
                                </div>
                                <div className="flex items-center gap-2">
                                  <CalendarIcon className="h-3 w-3 text-white/50" />
                                  {conference.duration}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
            </Tabs>
            </div>
          </section>

          {/* Conference Types Guide - Apple Style */}
          <section className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-4 sm:mb-6 px-2">
                  Event categories
                </h2>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-black/60 font-light px-2">
                  Understanding different types of crypto events
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div className="rounded-2xl sm:rounded-3xl bg-black p-6 sm:p-8 border border-white/10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl sm:text-2xl">₿</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Bitcoin events</h3>
                  </div>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Pure Bitcoin conferences focusing on the original cryptocurrency, featuring technical discussions,
                    adoption strategies, and Lightning Network developments.
                  </p>
                </div>

                <div className="rounded-2xl sm:rounded-3xl bg-black p-6 sm:p-8 border border-white/10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl sm:text-2xl">🔗</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Blockchain technology</h3>
                  </div>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Technical conferences exploring blockchain infrastructure, consensus mechanisms,
                    scalability solutions, and enterprise blockchain applications.
                  </p>
                </div>

                <div className="rounded-2xl sm:rounded-3xl bg-black p-6 sm:p-8 border border-white/10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl sm:text-2xl">🏛️</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Institutional events</h3>
                  </div>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    High-level conferences for institutional investors, asset managers, and traditional
                    finance professionals entering the digital asset space.
                  </p>
                </div>

                <div className="rounded-2xl sm:rounded-3xl bg-black p-6 sm:p-8 border border-white/10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl sm:text-2xl">🎓</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Academic conferences</h3>
                  </div>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    University-hosted events featuring peer-reviewed research, academic papers,
                    and scholarly discussions on cryptography and blockchain technology.
                  </p>
                </div>

                <div className="rounded-2xl sm:rounded-3xl bg-black p-6 sm:p-8 border border-white/10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl sm:text-2xl">⚖️</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Policy & regulation</h3>
                  </div>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Government and regulatory-focused events discussing compliance, policy development,
                    and the intersection of crypto with traditional legal frameworks.
                  </p>
                </div>

                <div className="rounded-2xl sm:rounded-3xl bg-black p-6 sm:p-8 border border-white/10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl sm:text-2xl">🌐</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white">Global summits</h3>
                  </div>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Large-scale international conferences bringing together diverse stakeholders
                    from across the cryptocurrency and blockchain ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Geographic Distribution - Apple Style */}
          <section className="py-12 sm:py-16 lg:py-20 bg-black">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-white mb-4 sm:mb-6 px-2">
                  Global event distribution
                </h2>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-white/60 font-light px-2">
                  Conferences happening worldwide
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                <div className="text-center p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-1 sm:mb-2">🇺🇸</div>
                  <div className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-0.5 sm:mb-1">North America</div>
                  <div className="text-xs sm:text-sm text-white/60">Major hubs in USA & Canada</div>
                </div>
                <div className="text-center p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-1 sm:mb-2">🇪🇺</div>
                  <div className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-0.5 sm:mb-1">Europe</div>
                  <div className="text-xs sm:text-sm text-white/60">Leading crypto innovation regions</div>
                </div>
                <div className="text-center p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-1 sm:mb-2">🌏</div>
                  <div className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-0.5 sm:mb-1">Asia Pacific</div>
                  <div className="text-xs sm:text-sm text-white/60">Fast-growing crypto markets</div>
                </div>
                <div className="text-center p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-1 sm:mb-2">🌍</div>
                  <div className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-0.5 sm:mb-1">Global</div>
                  <div className="text-xs sm:text-sm text-white/60">Worldwide adoption events</div>
                </div>
              </div>
            </div>
          </section>

          {/* Related Resources */}
          <section className="py-12 sm:py-16 lg:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-4 sm:mb-6 px-2">
                  Related resources
                </h2>
                <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-black/60 font-light max-w-3xl mx-auto px-2">
                  Enhance your conference experience with market intelligence
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <Link
                to="/bitcoin-market-sentiment"
                className="bg-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:bg-black/90 transition-all duration-300 cursor-pointer group block"
              >
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-orange-400 transition-colors">
                    Bitcoin market sentiment
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Track Bitcoin sentiment trends and market perception analysis to time your conference attendance with market cycles.
                  </p>
                </div>
              </Link>

              <Link
                to="/bitcoin-fear-greed-index"
                className="bg-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:bg-black/90 transition-all duration-300 cursor-pointer group block"
              >
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-orange-400 transition-colors">
                    Fear & greed index
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Monitor crypto market emotions to understand the sentiment context during conference events.
                  </p>
                </div>
              </Link>

              <Link
                to="/bitcoin-media-research"
                className="bg-black rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 hover:bg-black/90 transition-all duration-300 cursor-pointer group block"
              >
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-orange-400 transition-colors">
                    Bitcoin media research
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    Stay updated on Bitcoin and crypto media coverage, including conference highlights and industry news.
                  </p>
                </div>
              </Link>
              </div>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

export default CryptoConferencesPage;