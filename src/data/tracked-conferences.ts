/**
 * Tracked Conferences - These are conferences that are actively tracked
 * as outlets in the Perception data pipeline with content feeds.
 *
 * Data sourced from: docs/data-pipeline/SOURCES_DIRECTORY.md
 * Last updated: December 2025
 */

export type ConferenceType =
  | 'Bitcoin'
  | 'Blockchain'
  | 'Freedom'
  | 'Mining'
  | 'Institutional'
  | 'Developer'
  | 'Tech'
  | 'Regional';

export interface TrackedConference {
  // Identification
  id: string;                    // URL-safe slug
  name: string;                  // Display name
  outletName: string;            // Exact outlet name for API queries

  // Location
  location: {
    city: string;
    country: string;
    countryCode: string;
    venue?: string;
  };

  // Timing
  typicalMonth: string;
  nextEvent?: {
    startDate: string;
    endDate: string;
    displayDate: string;
    year: number;
  };

  // Content
  description: string;
  longDescription: string;
  website: string;
  type: ConferenceType;
  focusAreas: string[];
  expectedAttendees?: string;
  firstHeld?: number;

  // SEO
  keywords: string[];

  // Data Pipeline Status
  feedStatus: 'Active' | 'Low activity';

  // Internal Linking
  relatedConferences: string[];
}

export const trackedConferences: TrackedConference[] = [
  {
    id: 'btc-prague',
    name: 'BTC Prague',
    outletName: 'BTCPrague',
    location: {
      city: 'Prague',
      country: 'Czech Republic',
      countryCode: 'CZ',
      venue: 'PVA Expo Centre'
    },
    typicalMonth: 'June',
    nextEvent: {
      startDate: '2025-06-19',
      endDate: '2025-06-21',
      displayDate: 'Jun 19-21, 2025',
      year: 2025
    },
    description: "Europe's largest and most influential Bitcoin-only conference, bringing together 10,000+ global attendees including entrepreneurs, developers, investors, and educators.",
    longDescription: "BTC Prague is Europe's premier Bitcoin-only conference, now in its third edition. The event offers an immersive three-day program of keynotes, panels, debates, and networking across four main stages, alongside Europe's largest Bitcoin expo featuring around 100 companies. With over 200 speakers and live translation in 60+ languages, BTC Prague serves as the definitive gathering for the European Bitcoin community.",
    website: 'https://btcprague.com',
    type: 'Bitcoin',
    focusAreas: ['Bitcoin', 'Lightning Network', 'European Adoption', 'Technical Development'],
    expectedAttendees: '10,000+',
    firstHeld: 2023,
    keywords: ['BTC Prague', 'Bitcoin conference Prague', 'European Bitcoin conference', 'Czech Republic Bitcoin', 'Bitcoin Prague 2025'],
    feedStatus: 'Active',
    relatedConferences: ['the-bitcoin-conference', 'bitcoin-plusplus', 'tabconf', 'lugano-plan-b']
  },
  {
    id: 'the-bitcoin-conference',
    name: 'The Bitcoin Conference',
    outletName: 'The Bitcoin Conference',
    location: {
      city: 'Las Vegas',
      country: 'USA',
      countryCode: 'US',
      venue: 'The Venetian'
    },
    typicalMonth: 'May',
    nextEvent: {
      startDate: '2025-05-27',
      endDate: '2025-05-29',
      displayDate: 'May 27-29, 2025',
      year: 2025
    },
    description: "The world's largest and most influential Bitcoin gathering, bringing together 30,000+ attendees, industry leaders, and policymakers to shape the future of Bitcoin.",
    longDescription: "The Bitcoin Conference is the world's largest and most influential gathering of cryptocurrency enthusiasts, professionals, and thought leaders. Founded in 2019, the conference has grown into a global phenomenon, attracting attendees from across the world. The 2025 edition at The Venetian in Las Vegas features 300+ speakers, 300+ exhibitors, and exclusive events including Code & Country on Industry Day, bringing together policy, tech, and industry.",
    website: 'https://b.tc/conference',
    type: 'Bitcoin',
    focusAreas: ['Bitcoin', 'Institutional Adoption', 'Policy', 'Technology', 'Mining'],
    expectedAttendees: '30,000+',
    firstHeld: 2019,
    keywords: ['Bitcoin Conference', 'Bitcoin 2025', 'Las Vegas Bitcoin', 'Bitcoin Magazine conference', 'largest Bitcoin conference'],
    feedStatus: 'Active',
    relatedConferences: ['btc-prague', 'mining-disrupt', 'adopting-bitcoin', 'oslo-freedom-forum']
  },
  {
    id: 'oslo-freedom-forum',
    name: 'Oslo Freedom Forum',
    outletName: 'Oslo Freedom Forum',
    location: {
      city: 'Oslo',
      country: 'Norway',
      countryCode: 'NO',
      venue: 'Various venues in Oslo'
    },
    typicalMonth: 'May',
    nextEvent: {
      startDate: '2026-06-01',
      endDate: '2026-06-03',
      displayDate: 'Jun 1-3, 2026',
      year: 2026
    },
    description: "A global gathering of human rights defenders, journalists, artists, and technologists, exploring how Bitcoin enables financial freedom and fights authoritarianism.",
    longDescription: "The Oslo Freedom Forum (OFF) is hosted by the Human Rights Foundation (HRF) and celebrates stories of courage and creativity while exploring bold ideas to advance freedom and unleash human potential. Founded in 2009, OFF brings together a community united by a single vision: a world free from tyranny. The forum has become a critical platform for discussing Bitcoin's role in enabling financial freedom for people living under authoritarian regimes.",
    website: 'https://oslofreedomforum.com',
    type: 'Freedom',
    focusAreas: ['Human Rights', 'Financial Freedom', 'Bitcoin for Freedom', 'Censorship Resistance'],
    expectedAttendees: '1,500+',
    firstHeld: 2009,
    keywords: ['Oslo Freedom Forum', 'Human Rights Foundation', 'Bitcoin human rights', 'financial freedom conference', 'HRF Bitcoin'],
    feedStatus: 'Active',
    relatedConferences: ['the-bitcoin-conference', 'adopting-bitcoin', 'lugano-plan-b']
  },
  {
    id: 'adopting-bitcoin',
    name: 'Adopting Bitcoin',
    outletName: 'Adopting Bitcoin',
    location: {
      city: 'San Salvador',
      country: 'El Salvador',
      countryCode: 'SV',
      venue: 'Crowne Plaza San Salvador'
    },
    typicalMonth: 'November',
    nextEvent: {
      startDate: '2025-11-14',
      endDate: '2025-11-15',
      displayDate: 'Nov 14-15, 2025',
      year: 2025
    },
    description: "A high-signal Bitcoin conference for builders, held in El Salvador celebrating Bitcoin adoption and the network effect of hyperbitcoinization.",
    longDescription: "Adopting Bitcoin is a developer and builder-focused conference held in El Salvador, the first country to adopt Bitcoin as legal tender. Now celebrating its 5th anniversary, the conference embraces the 'Network Effect' theme, bringing together builders, innovators, and doers committed to advancing Bitcoin's role as a tool for freedom, financial empowerment, and global change. The event focuses on practical adoption at every level.",
    website: 'https://adoptingbitcoin.org',
    type: 'Bitcoin',
    focusAreas: ['Bitcoin Adoption', 'Lightning Network', 'El Salvador', 'Builder Community', 'Hyperbitcoinization'],
    expectedAttendees: '1,000+',
    firstHeld: 2021,
    keywords: ['Adopting Bitcoin', 'El Salvador Bitcoin conference', 'Bitcoin adoption conference', 'Lightning conference'],
    feedStatus: 'Active',
    relatedConferences: ['the-bitcoin-conference', 'oslo-freedom-forum', 'tabconf', 'bitcoin-plusplus']
  },
  {
    id: 'africa-bitcoin-conference',
    name: 'Africa Bitcoin Conference',
    outletName: 'Africa Bitcoin Conference',
    location: {
      city: 'Port Louis',
      country: 'Mauritius',
      countryCode: 'MU',
      venue: 'Caudan Arts Centre'
    },
    typicalMonth: 'December',
    nextEvent: {
      startDate: '2025-12-03',
      endDate: '2025-12-05',
      displayDate: 'Dec 3-5, 2025',
      year: 2025
    },
    description: "The first Pan-African Bitcoin Conference, now in its 4th edition, uniting the African Bitcoin community to drive adoption across the continent.",
    longDescription: "The Africa Bitcoin Conference is the premier Pan-African Bitcoin gathering, bringing together developers, entrepreneurs, educators, and enthusiasts from across the African continent. Now in its 4th edition, the conference has moved from its original home in Accra, Ghana to Mauritius for 2025. The event focuses on Bitcoin adoption strategies specific to African markets, mobile payments, remittances, and building local Bitcoin communities.",
    website: 'https://afrobitcoin.org',
    type: 'Regional',
    focusAreas: ['African Adoption', 'Mobile Payments', 'Remittances', 'Community Building', 'Financial Inclusion'],
    expectedAttendees: '1,000+',
    firstHeld: 2022,
    keywords: ['Africa Bitcoin Conference', 'African Bitcoin', 'Bitcoin Africa', 'Pan-African Bitcoin', 'Afrobitcoin'],
    feedStatus: 'Active',
    relatedConferences: ['adopting-bitcoin', 'the-bitcoin-conference', 'oslo-freedom-forum']
  },
  {
    id: 'bitcoin-plusplus',
    name: 'bitcoin++',
    outletName: 'bitcoin++',
    location: {
      city: 'Austin',
      country: 'USA',
      countryCode: 'US',
      venue: 'Palmer Events Center'
    },
    typicalMonth: 'May',
    nextEvent: {
      startDate: '2025-05-07',
      endDate: '2025-05-09',
      displayDate: 'May 7-9, 2025',
      year: 2025
    },
    description: "A developer-focused conference series advancing Bitcoin technology through in-depth lectures and hands-on workshops with focused audiences.",
    longDescription: "bitcoin++ is a developer-focused conference series dedicated to advancing Bitcoin technology. Since its inception in June 2022, bitcoin++ has hosted events in global tech hubs including Austin, Mexico City, Berlin, Buenos Aires, Riga, and Istanbul. The conference emphasizes small, focused audiences to foster deep dives into cutting-edge Bitcoin developments. Each edition has a unique theme such as Privacy, Scaling, or Lightning.",
    website: 'https://btcplusplus.dev',
    type: 'Developer',
    focusAreas: ['Bitcoin Development', 'Protocol Development', 'Privacy', 'Scaling', 'Lightning Network'],
    expectedAttendees: '500+',
    firstHeld: 2022,
    keywords: ['bitcoin++', 'btcplusplus', 'Bitcoin developer conference', 'Bitcoin technical conference', 'Bitcoin workshop'],
    feedStatus: 'Low activity',
    relatedConferences: ['tabconf', 'adopting-bitcoin', 'btc-prague']
  },
  {
    id: 'tabconf',
    name: 'TABConf',
    outletName: 'TABConf',
    location: {
      city: 'Atlanta',
      country: 'USA',
      countryCode: 'US',
      venue: 'Georgia Tech Exhibition Hall'
    },
    typicalMonth: 'October',
    nextEvent: {
      startDate: '2025-10-13',
      endDate: '2025-10-16',
      displayDate: 'Oct 13-16, 2025',
      year: 2025
    },
    description: "The Atlanta Bitcoin Conference - a 100% open source technical conference bringing together Bitcoin core devs and builders for workshops and builder days.",
    longDescription: "TABConf (The Atlanta Bitcoin Conference) is a technical Bitcoin conference bringing together the best minds in Bitcoin for insights, knowledge sharing, and collaboration. Now in its 7th edition, TABConf stands out as 100% open source - including the conference schedule itself hosted on GitHub. The event features solo talks, panel discussions, workshops, and builder day projects, all open for community submission. TABConf is meant to ensure the Technical Accessible Bitcoin Community is Open source, Novel, and Fun.",
    website: 'https://7.tabconf.com',
    type: 'Developer',
    focusAreas: ['Bitcoin Core', 'Open Source', 'Technical Development', 'Workshops', 'Builder Community'],
    expectedAttendees: '500+',
    firstHeld: 2019,
    keywords: ['TABConf', 'Atlanta Bitcoin Conference', 'Bitcoin developer conference', 'Bitcoin technical conference', 'Bitcoin open source'],
    feedStatus: 'Active',
    relatedConferences: ['bitcoin-plusplus', 'adopting-bitcoin', 'btc-prague']
  },
  {
    id: 'token2049',
    name: 'TOKEN2049',
    outletName: 'TOKEN2049',
    location: {
      city: 'Singapore',
      country: 'Singapore',
      countryCode: 'SG',
      venue: 'Marina Bay Sands'
    },
    typicalMonth: 'October',
    nextEvent: {
      startDate: '2025-10-01',
      endDate: '2025-10-02',
      displayDate: 'Oct 1-2, 2025',
      year: 2025
    },
    description: "Asia's largest crypto conference bringing together 25,000+ attendees, 300+ speakers, and 500+ exhibitors at Marina Bay Sands in Singapore.",
    longDescription: "TOKEN2049 is Asia's premier crypto event held annually at Marina Bay Sands in Singapore. The conference spans all five floors of the venue, featuring 300+ speakers and 7,000+ companies. TOKEN2049 Week runs September 29 - October 5, 2025, turning Singapore into a global blockchain capital with over 500 side events including networking dinners, parties, workshops, and investor meetups.",
    website: 'https://www.asia.token2049.com',
    type: 'Institutional',
    focusAreas: ['Institutional Crypto', 'Web3', 'DeFi', 'Asian Markets', 'Investment'],
    expectedAttendees: '25,000+',
    firstHeld: 2018,
    keywords: ['TOKEN2049', 'Singapore crypto conference', 'Asia blockchain conference', 'TOKEN2049 Singapore', 'crypto conference Asia'],
    feedStatus: 'Active',
    relatedConferences: ['korea-blockchain-week', 'european-blockchain-convention', 'paris-blockchain-week']
  },
  {
    id: 'mining-disrupt',
    name: 'Mining Disrupt',
    outletName: 'Mining Disrupt',
    location: {
      city: 'Dallas',
      country: 'USA',
      countryCode: 'US',
      venue: 'Irving Convention Center'
    },
    typicalMonth: 'November',
    nextEvent: {
      startDate: '2025-11-11',
      endDate: '2025-11-13',
      displayDate: 'Nov 11-13, 2025',
      year: 2025
    },
    description: "The world's largest Bitcoin Mining Expo & Conference, now in its 8th year, bringing together the global mining industry for networking and deal-making.",
    longDescription: "Mining Disrupt has been the ultimate hub for learning, exhibiting, transacting, and growing within the Bitcoin mining industry since 2019. The 2025 Texas/Dallas edition marks the conference's first-ever Texas edition, expanding from their flagship Miami location. The event features influential speakers from major mining companies including Bitmain, Hut8, and Digital Shovel, making it essential for professionals involved in Bitcoin mining.",
    website: 'https://miningdisrupt.com',
    type: 'Mining',
    focusAreas: ['Bitcoin Mining', 'Mining Hardware', 'Energy', 'Mining Operations', 'Mining Investment'],
    expectedAttendees: '3,000+',
    firstHeld: 2019,
    keywords: ['Mining Disrupt', 'Bitcoin mining conference', 'Bitcoin mining expo', 'crypto mining conference', 'mining industry'],
    feedStatus: 'Active',
    relatedConferences: ['the-bitcoin-conference', 'btc-prague']
  },
  {
    id: 'lugano-plan-b',
    name: 'Lugano Plan B Forum',
    outletName: 'Lugano Plan B',
    location: {
      city: 'Lugano',
      country: 'Switzerland',
      countryCode: 'CH',
      venue: 'Palazzo dei Congressi'
    },
    typicalMonth: 'October',
    nextEvent: {
      startDate: '2025-10-24',
      endDate: '2025-10-25',
      displayDate: 'Oct 24-25, 2025',
      year: 2025
    },
    description: "Europe's premier Bitcoin and freedom tech conference organized by the City of Lugano in collaboration with Tether, attracting 2,500+ global attendees.",
    longDescription: "The Lugano Plan B Forum is organized by the City of Lugano in collaboration with Tether as part of Lugano's broader Plan B initiative to make the city a European Bitcoin hub. Now in its fourth edition, the forum features over 100 world-renowned speakers including Tether CEO Paolo Ardoino, Lightning Labs founder Elizabeth Stark, and industry leaders. Plan B Week (Oct 20-23) precedes the main forum with workshops and side events.",
    website: 'https://planb.lugano.ch',
    type: 'Bitcoin',
    focusAreas: ['Bitcoin Adoption', 'City Adoption', 'Freedom Tech', 'Lightning Network', 'Stablecoins'],
    expectedAttendees: '2,500+',
    firstHeld: 2022,
    keywords: ['Lugano Plan B', 'Plan B Forum', 'Lugano Bitcoin', 'Switzerland Bitcoin conference', 'Tether conference'],
    feedStatus: 'Active',
    relatedConferences: ['btc-prague', 'oslo-freedom-forum', 'crypto-valley']
  },
  {
    id: 'paris-blockchain-week',
    name: 'Paris Blockchain Week',
    outletName: 'Paris Blockchain Week',
    location: {
      city: 'Paris',
      country: 'France',
      countryCode: 'FR',
      venue: 'Carrousel du Louvre'
    },
    typicalMonth: 'April',
    nextEvent: {
      startDate: '2026-04-15',
      endDate: '2026-04-16',
      displayDate: 'Apr 15-16, 2026',
      year: 2026
    },
    description: "One of Europe's most significant blockchain events, bringing together 10,000+ attendees and 420+ speakers from 85+ countries at the iconic Carrousel du Louvre.",
    longDescription: "Paris Blockchain Week (PBW) is recognized as one of the most significant blockchain and Web3 events globally. Held at the iconic Carrousel du Louvre, PBW brings together industry leaders, investors, developers, policymakers, and innovators to discuss trends in blockchain, AI, tokenization, digital assets, and DeFi. Over 70% of attendees are C-level executives, unmatched by any global competitor.",
    website: 'https://www.parisblockchainweek.com',
    type: 'Blockchain',
    focusAreas: ['Web3', 'DeFi', 'Tokenization', 'Enterprise Blockchain', 'Regulation'],
    expectedAttendees: '10,000+',
    firstHeld: 2019,
    keywords: ['Paris Blockchain Week', 'PBW', 'France blockchain conference', 'European Web3 conference', 'Louvre blockchain'],
    feedStatus: 'Low activity',
    relatedConferences: ['european-blockchain-convention', 'token2049', 'crypto-valley']
  },
  {
    id: 'european-blockchain-convention',
    name: 'European Blockchain Convention',
    outletName: 'European Blockchain Convention',
    location: {
      city: 'Barcelona',
      country: 'Spain',
      countryCode: 'ES',
      venue: 'Fira Barcelona Montjuic'
    },
    typicalMonth: 'October',
    nextEvent: {
      startDate: '2025-10-16',
      endDate: '2025-10-17',
      displayDate: 'Oct 16-17, 2025',
      year: 2025
    },
    description: "Europe's most incredible festival of blockchain, crypto, and Web3, bringing together 6,000 attendees and 300+ speakers since 2018.",
    longDescription: "The European Blockchain Convention is the must-attend event for professionals who want to connect, learn, and influence the future of blockchain, digital assets, and Web3. Now in its 11th edition, EBC features 300+ speakers across three stages, an expanded expo floor, startup battles, VIP gatherings, and Europe's largest crypto meetings program enabling 10,000+ app-powered meetings.",
    website: 'https://eblockchainconvention.com',
    type: 'Blockchain',
    focusAreas: ['Web3', 'Digital Assets', 'Startups', 'Investment', 'European Ecosystem'],
    expectedAttendees: '6,000+',
    firstHeld: 2018,
    keywords: ['European Blockchain Convention', 'EBC', 'Barcelona blockchain conference', 'European crypto conference', 'Web3 Europe'],
    feedStatus: 'Active',
    relatedConferences: ['paris-blockchain-week', 'token2049', 'crypto-valley']
  },
  {
    id: 'crypto-valley',
    name: 'Crypto Valley Conference',
    outletName: 'Crypto Valley',
    location: {
      city: 'Rotkreuz',
      country: 'Switzerland',
      countryCode: 'CH',
      venue: 'Hochschule Luzern'
    },
    typicalMonth: 'June',
    nextEvent: {
      startDate: '2025-06-05',
      endDate: '2025-06-06',
      displayDate: 'Jun 5-6, 2025',
      year: 2025
    },
    description: "Switzerland's premier blockchain and crypto gathering organized by the Crypto Valley Association and Lucerne University, welcoming 1,600+ attendees.",
    longDescription: "The Crypto Valley Conference (CVC) is organized by Lucerne University and the Crypto Valley Association. Now in its 7th edition, CVC25 welcomes over 1,600 attendees representing startups, corporates, academia, and government. The conference features 60+ industry expert speakers from organizations like Kraken, Ripple, Cardano Foundation, and Sygnum Bank. The event concludes with a networking boat cruise on Lake Zug.",
    website: 'https://www.cryptovalleyconference.com',
    type: 'Institutional',
    focusAreas: ['Swiss Blockchain', 'Tokenization', 'Regulation', 'Enterprise', 'Academic Research'],
    expectedAttendees: '1,600+',
    firstHeld: 2017,
    keywords: ['Crypto Valley Conference', 'CVC', 'Switzerland blockchain', 'Zug crypto', 'Swiss crypto conference'],
    feedStatus: 'Active',
    relatedConferences: ['lugano-plan-b', 'european-blockchain-convention', 'paris-blockchain-week']
  },
  {
    id: 'korea-blockchain-week',
    name: 'Korea Blockchain Week',
    outletName: 'Korea Blockchain Week',
    location: {
      city: 'Seoul',
      country: 'South Korea',
      countryCode: 'KR',
      venue: 'Grand Walkerhill Seoul'
    },
    typicalMonth: 'September',
    nextEvent: {
      startDate: '2025-09-22',
      endDate: '2025-09-28',
      displayDate: 'Sep 22-28, 2025',
      year: 2025
    },
    description: "One of Asia's longest-running and most influential blockchain conferences, founded in 2018, with the main IMPACT conference on Sep 23-24.",
    longDescription: "Korea Blockchain Week (KBW) was founded by FACTBLOCK in 2018 and is now in its eighth year. The 2025 edition is co-hosted by Bithumb, Korea's leading cryptocurrency exchange. KBW has become a critical platform for dialogue on blockchain's most pressing topics, including AI integration, real-world asset (RWA) tokenization, L1/L2 scalability, and the intersection of geopolitics and Web3. The main IMPACT conference runs Sep 23-24.",
    website: 'https://koreablockchainweek.com',
    type: 'Regional',
    focusAreas: ['Korean Market', 'Asian Web3', 'RWA Tokenization', 'AI Integration', 'Exchange Industry'],
    expectedAttendees: '5,000+',
    firstHeld: 2018,
    keywords: ['Korea Blockchain Week', 'KBW', 'Seoul blockchain conference', 'Korean crypto conference', 'Asia blockchain'],
    feedStatus: 'Low activity',
    relatedConferences: ['token2049', 'european-blockchain-convention']
  },
  {
    id: 'web-summit',
    name: 'Web Summit',
    outletName: 'Web Summit',
    location: {
      city: 'Lisbon',
      country: 'Portugal',
      countryCode: 'PT',
      venue: 'MEO Arena & Lisbon Congress Centre'
    },
    typicalMonth: 'November',
    nextEvent: {
      startDate: '2025-11-10',
      endDate: '2025-11-13',
      displayDate: 'Nov 10-13, 2025',
      year: 2025
    },
    description: "One of the world's largest annual technology conferences with 70,000+ attendees, featuring significant blockchain and crypto tracks.",
    longDescription: "Web Summit is one of the world's largest annual technology conferences, held in Lisbon, Portugal. With 70,000+ attendees from 160+ countries, 1,000+ speakers, 2,300+ startups, and 1,000+ investors, Web Summit has become a critical platform for the tech industry. The conference features significant blockchain, crypto, and Web3 content alongside broader technology topics. Night Summit events offer informal networking at venues around Lisbon.",
    website: 'https://websummit.com',
    type: 'Tech',
    focusAreas: ['Technology', 'Startups', 'Investment', 'Web3', 'Innovation'],
    expectedAttendees: '70,000+',
    firstHeld: 2010,
    keywords: ['Web Summit', 'Lisbon tech conference', 'Web Summit crypto', 'technology conference', 'startup conference'],
    feedStatus: 'Active',
    relatedConferences: ['european-blockchain-convention', 'paris-blockchain-week']
  },
  {
    id: 'digital-assets-association',
    name: 'Digital Assets Summit',
    outletName: 'Digital Assets Association',
    location: {
      city: 'Singapore',
      country: 'Singapore',
      countryCode: 'SG',
      venue: 'Various'
    },
    typicalMonth: 'Various',
    description: "Digital assets focused summits bringing together researchers, business leaders, policymakers, and entrepreneurs to discuss the future of digital assets.",
    longDescription: "The Digital Assets Association hosts summits focused on digital assets research, policy, and business applications. The events bring together digital assets researchers, business leaders, policymakers, entrepreneurs, students, and anyone interested in the future of digital assets and its impact on society. The association works to advance understanding and adoption of digital assets globally.",
    website: 'https://summit.digitalassetsassociation.org',
    type: 'Institutional',
    focusAreas: ['Digital Assets', 'Policy', 'Research', 'Institutional Adoption'],
    keywords: ['Digital Assets Association', 'digital assets conference', 'institutional crypto'],
    feedStatus: 'Low activity',
    relatedConferences: ['token2049', 'crypto-valley']
  }
];

// Helper function to find conference by ID
export function getConferenceById(id: string): TrackedConference | undefined {
  return trackedConferences.find(conf => conf.id === id);
}

// Helper function to find conference by outlet name
export function getConferenceByOutletName(outletName: string): TrackedConference | undefined {
  return trackedConferences.find(conf =>
    conf.outletName.toLowerCase() === outletName.toLowerCase()
  );
}

// Get related conferences
export function getRelatedConferences(conferenceId: string): TrackedConference[] {
  const conference = getConferenceById(conferenceId);
  if (!conference) return [];

  return conference.relatedConferences
    .map(id => getConferenceById(id))
    .filter((conf): conf is TrackedConference => conf !== undefined);
}

// Get conferences by type
export function getConferencesByType(type: ConferenceType): TrackedConference[] {
  return trackedConferences.filter(conf => conf.type === type);
}

// Get upcoming conferences (sorted by next event date)
export function getUpcomingConferences(): TrackedConference[] {
  const now = new Date();
  return trackedConferences
    .filter(conf => conf.nextEvent && new Date(conf.nextEvent.startDate) >= now)
    .sort((a, b) => {
      if (!a.nextEvent || !b.nextEvent) return 0;
      return new Date(a.nextEvent.startDate).getTime() - new Date(b.nextEvent.startDate).getTime();
    });
}

// Get active feed conferences
export function getActiveConferences(): TrackedConference[] {
  return trackedConferences.filter(conf => conf.feedStatus === 'Active');
}
