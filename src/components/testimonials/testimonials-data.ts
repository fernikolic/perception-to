export interface Author {
  name: string;
  handle: string;
  role: string;
  company: string;
  image?: string;
  tweetUrl: string;
}

export interface Testimonial {
  author: Author;
  content: string;
  date?: string;
}

export const testimonials: Testimonial[] = [
  {
    author: {
      name: "Sina",
      handle: "@Sino_Isdead",
      role: "Analyst",
      company: "Bitcoin",
      image: "/avatars/sina.jpg",
      tweetUrl: '1829897498065813883'
    },
    content: "Extremely useful tool for tracking Bitcoin narrative and sentiment shifts across different regions and communities.",
    date: "Aug 31, 2024"
  },
  {
    author: {
      name: "Jameson Lopp",
      handle: "@lopp",
      role: "CTO",
      company: "Casa",
      image: "/avatars/lopp.jpg",
      tweetUrl: '1840349046709289442'
    },
    content: "Finally, a comprehensive way to track what's actually happening in Bitcoin beyond the noise.",
    date: "Sep 29, 2024"
  },
  {
    author: {
      name: "Tuur Demeester",
      handle: "@TuurDemeester",
      role: "Analyst",
      company: "Bitcoin",
      image: "/avatars/tuur.jpg",
      tweetUrl: 'https://x.com/TuurDemeester/status/1749104052346999040'
    },
    content: "This is exactly what the industry needs - real signal extraction from the constant stream of information.",
    date: "Jan 21, 2024"
  },
  { 
    author: {
      name: "gladstein",
      role: "Analyst",
      company: "Bitcoin",
      image: "/avatars/gladstein.jpg",
      tweetUrl: '1803507915556606200'
    }
  },
  { 
    author: {
      name: "DSBatten",
      role: "Analyst",
      company: "Bitcoin",
      image: "/avatars/dsbatten.jpg",
      tweetUrl: '1760053088143208818'
    }
  },
  { 
    author: {
      name: "hodlonaut",
      role: "Analyst",
      company: "Bitcoin",
      image: "/avatars/hodlonaut.jpg",
      tweetUrl: '1756673204297363860'
    }
  },
  { 
    author: {
      name: "bramk",
      role: "Analyst",
      company: "Bitcoin",
      image: "/avatars/bramk.jpg",
      tweetUrl: '1787471860906520726'
    }
  },
  { 
    author: {
      name: "phil_geiger",
      role: "Analyst",
      company: "Bitcoin",
      image: "/avatars/phil_geiger.jpg",
      tweetUrl: '1756093576545443918'
    }
  },
  { 
    author: {
      name: "JoeConsorti",
      role: "Analyst",
      company: "Bitcoin",
      image: "/avatars/joeconsorti.jpg",
      tweetUrl: '1755711589234188433'
    }
  },
  { 
    author: {
      name: "BitcoinMagazine",
      role: "Publication",
      company: "Bitcoin Magazine",
      image: "/avatars/bitcoinmagazine.jpg",
      tweetUrl: '1841099680350040548'
    }
  },
  { 
    author: {
      name: "DocumentingBTC",
      role: "Analyst",
      company: "Bitcoin",
      image: "/avatars/documentingbtc.jpg",
      tweetUrl: '1841170799192277013'
    }
  },
  { 
    author: {
      name: "BitcoinEcon",
      role: "Analyst",
      company: "Bitcoin",
      image: "/avatars/bitcoinecon.jpg",
      tweetUrl: '1841056431766446473'
    }
  },
  {
    author: {
      name: "Cointelegraph",
      handle: "@Cointelegraph",
      role: "Publication",
      company: "Cointelegraph",
      image: "/avatars/cointelegraph.jpg",
      tweetUrl: '1864669668486570299'
    },
    content: "Bitcoin Perception provides invaluable insights into market sentiment and emerging trends.",
    date: "Dec 5, 2024"
  },
  { 
    author: {
      name: "DecentraSuze",
      role: "Analyst",
      company: "Bitcoin",
      image: "/avatars/decentrasuze.jpg",
      tweetUrl: '1831274055309136058'
    }
  },
  {
    author: {
      name: "TFTC",
      handle: "@TFTC21",
      role: "Publication",
      company: "Tales from the Crypt",
      image: "/avatars/tftc.jpg",
      tweetUrl: '1884708908608229649'
    },
    content: "Essential resource for anyone serious about understanding Bitcoin's global impact.",
    date: "Jan 29, 2025"
  },
  { 
    author: {
      name: "La__Cuen",
      role: "Journalist",
      company: "Bitcoin",
      image: "/avatars/lacuen.jpg",
      tweetUrl: '1706680030795841806'
    }
  },
  {
    author: {
      name: "BitcoinNewsCom",
      handle: "@BitcoinNewsCom",
      role: "Publication",
      company: "Bitcoin News",
      image: "/avatars/bitcoinnews.jpg",
      tweetUrl: '1790429744325919027'
    },
    content: "Game-changing platform for tracking Bitcoin adoption and sentiment across the globe.",
    date: "May 14, 2024"
  },
  { 
    author: {
      name: "JAN3",
      role: "Company",
      company: "JAN3",
      tweetUrl: '1897738823293190589'
    }
  },
  { 
    author: {
      name: "Stephan Livera",
      role: "Podcast Host",
      company: "Bitcoin",
      tweetUrl: '1894962511192965184'
    }
  }
]; 