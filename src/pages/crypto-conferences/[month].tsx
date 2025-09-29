import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, MapPinIcon, ArrowLeftIcon, ChevronRightIcon, UsersIcon } from 'lucide-react';

interface Conference {
  date: string;
  name: string;
  location: string;
  type: string;
  duration: string;
  monthYear: string;
  dateDisplay: string;
}

// Import the same conference data
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

const conferences: Conference[] = allConferences.filter(conf => {
  const lowerType = conf.type.toLowerCase();
  return !lowerType.includes('nft') &&
         !lowerType.includes('defi') &&
         !lowerType.includes('metaverse') &&
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

const monthNames = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
];

const monthDisplayNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function MonthlyConferencePage() {
  const { year, month } = useParams<{ year: string; month: string }>();

  if (!year || !month) {
    return <Navigate to="/crypto-conferences" replace />;
  }

  const monthIndex = monthNames.indexOf(month.toLowerCase());
  if (monthIndex === -1) {
    return <Navigate to="/crypto-conferences" replace />;
  }

  const monthDisplay = monthDisplayNames[monthIndex];
  const monthYear = `${monthDisplay} ${year}`;

  const monthlyConferences = useMemo(() => {
    return conferences
      .filter(conf => conf.monthYear === monthYear)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [monthYear]);

  if (monthlyConferences.length === 0) {
    return <Navigate to="/crypto-conferences" replace />;
  }

  // Get conference types for this month
  const monthlyTypes = useMemo(() => {
    const types = monthlyConferences.map(conf => conf.type);
    return [...new Set(types)];
  }, [monthlyConferences]);

  // Get locations for this month
  const monthlyLocations = useMemo(() => {
    const locations = monthlyConferences.map(conf => {
      const parts = conf.location.split(',');
      return parts[parts.length - 1].trim();
    });
    return [...new Set(locations)];
  }, [monthlyConferences]);

  // Get next and previous months
  const currentDate = new Date(`${year}-${(monthIndex + 1).toString().padStart(2, '0')}-01`);
  const nextMonth = new Date(currentDate);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const prevMonth = new Date(currentDate);
  prevMonth.setMonth(prevMonth.getMonth() - 1);

  const nextMonthConferences = conferences.some(conf =>
    conf.monthYear === `${monthDisplayNames[nextMonth.getMonth()]} ${nextMonth.getFullYear()}`
  );
  const prevMonthConferences = conferences.some(conf =>
    conf.monthYear === `${monthDisplayNames[prevMonth.getMonth()]} ${prevMonth.getFullYear()}`
  );

  return (
    <>
      <Helmet>
        <title>{monthDisplay} {year} Crypto Conferences | Comprehensive Event Calendar | Perception</title>
        <meta name="description" content={`Complete list of cryptocurrency and blockchain conferences in ${monthDisplay} ${year}. Find ${monthlyConferences.length} events including Bitcoin, blockchain, and digital asset conferences.`} />
        <meta property="og:title" content={`${monthDisplay} ${year} Crypto Conferences | Event Calendar`} />
        <meta property="og:description" content={`Complete list of cryptocurrency and blockchain conferences in ${monthDisplay} ${year}. Find ${monthlyConferences.length} events including Bitcoin, blockchain, and digital asset conferences.`} />
        <link rel="canonical" href={`https://perception.to/crypto-conferences/${year}/${month}`} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-7xl px-4 pt-24 pb-8 sm:px-6 lg:px-8">
          {/* Back Navigation - Apple Style */}
          <div className="mb-8">
            <Link
              to="/crypto-conferences"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:border-gray-300 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Conferences
            </Link>
          </div>

          {/* Hero Section */}
          <div className="relative rounded-2xl overflow-hidden mb-12">
            <div className="absolute inset-0">
              <img
                src="/images/hero_image.avif"
                alt="Crypto Conferences Background"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
            <div className="relative px-8 py-16 sm:px-12 sm:py-20 lg:px-16">
              <div className="max-w-4xl mx-auto text-center text-white">
                <h1
                  className="text-4xl font-bold sm:text-5xl lg:text-6xl mb-6"
                  style={{ color: 'white' }}
                >
                  {monthDisplay} {year}
                </h1>
                <p className="text-xl sm:text-2xl text-white/90 mb-8">
                  Crypto & Blockchain Conferences
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-lg">
                  <div className="flex items-center gap-2">
                    <UsersIcon className="h-5 w-5" />
                    <span>{monthlyConferences.length} Events</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-5 w-5" />
                    <span>{monthlyLocations.length} Countries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>{monthlyTypes.length} Categories</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Month Navigation */}
              <div className="flex justify-between items-center">
                <div>
                  {prevMonthConferences && (
                    <Button variant="outline" asChild>
                      <Link to={`/crypto-conferences/${prevMonth.getFullYear()}/${monthNames[prevMonth.getMonth()]}`}>
                        ← {monthDisplayNames[prevMonth.getMonth()]} {prevMonth.getFullYear()}
                      </Link>
                    </Button>
                  )}
                </div>
                <div>
                  {nextMonthConferences && (
                    <Button variant="outline" asChild>
                      <Link to={`/crypto-conferences/${nextMonth.getFullYear()}/${monthNames[nextMonth.getMonth()]}`}>
                        {monthDisplayNames[nextMonth.getMonth()]} {nextMonth.getFullYear()} →
                      </Link>
                    </Button>
                  )}
                </div>
              </div>

              {/* Conference List */}
              <div className="space-y-6">
                {monthlyConferences.map((conference, index) => {
                  const isUpcoming = new Date(conference.date) >= new Date('2025-09-13');

                  return (
                    <Card key={`${conference.date}-${conference.name}`} className="hover:shadow-lg transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge
                                variant={isUpcoming ? "default" : "secondary"}
                                className={isUpcoming ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600'}
                              >
                                {isUpcoming ? 'Upcoming' : 'Past'}
                              </Badge>
                              <Badge variant="outline">
                                {conference.type}
                              </Badge>
                            </div>

                            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary">
                              {conference.name}
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <CalendarIcon className="h-4 w-4" />
                                <span>{conference.dateDisplay}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPinIcon className="h-4 w-4" />
                                <span>{conference.location}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button asChild>
                              <Link to={generateConferenceUrl(conference)} className="flex items-center gap-2">
                                View Details
                                <ChevronRightIcon className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Month Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>{monthDisplay} {year} Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-2xl font-bold">{monthlyConferences.length}</div>
                    <div className="text-sm text-muted-foreground">Total Events</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{monthlyLocations.length}</div>
                    <div className="text-sm text-muted-foreground">Countries</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{monthlyTypes.length}</div>
                    <div className="text-sm text-muted-foreground">Categories</div>
                  </div>
                </CardContent>
              </Card>

              {/* Event Types */}
              <Card>
                <CardHeader>
                  <CardTitle>Event categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {monthlyTypes.map(type => {
                      const count = monthlyConferences.filter(conf => conf.type === type).length;
                      return (
                        <div key={type} className="flex justify-between items-center text-sm">
                          <span className="flex-1">{type}</span>
                          <Badge variant="secondary" className="ml-2">
                            {count}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Locations */}
              <Card>
                <CardHeader>
                  <CardTitle>Event locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {monthlyLocations.map(location => {
                      const count = monthlyConferences.filter(conf =>
                        conf.location.split(',').slice(-1)[0].trim() === location
                      ).length;
                      return (
                        <div key={location} className="flex justify-between items-center text-sm">
                          <span className="flex-1">{location}</span>
                          <Badge variant="secondary" className="ml-2">
                            {count}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Browse Other Months */}
              <Card>
                <CardHeader>
                  <CardTitle>Browse other months</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/crypto-conferences">
                      View All Conferences
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MonthlyConferencePage;