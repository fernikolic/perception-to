export interface Author {
  name: string;
  role: string;
  company: string;
  image?: string;
  tweetUrl: string;
}

export interface Testimonial {
  author: Author;
}

export const testimonials: Testimonial[] = [
  { 
    author: {
      name: "Sina",
      role: "Analyst",
      company: "Bitcoin",
      image: "/avatars/sina.jpg",
      tweetUrl: '1829897498065813883'
    }
  },
  { 
    author: {
      name: "Jameson Lopp",
      role: "CTO",
      company: "Casa",
      image: "/avatars/lopp.jpg",
      tweetUrl: '1840349046709289442'
    }
  },
  { 
    author: {
      name: "Tuur Demeester",
      role: "Analyst",
      company: "Bitcoin",
      image: "/avatars/tuur.jpg",
      tweetUrl: 'https://x.com/TuurDemeester/status/1749104052346999040'
    }
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
      role: "Publication",
      company: "Cointelegraph",
      image: "/avatars/cointelegraph.jpg",
      tweetUrl: '1864669668486570299'
    }
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
      role: "Publication",
      company: "Tales from the Crypt",
      image: "/avatars/tftc.jpg",
      tweetUrl: '1884708908608229649'
    }
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
      role: "Publication",
      company: "Bitcoin News",
      image: "/avatars/bitcoinnews.jpg",
      tweetUrl: '1790429744325919027'
    }
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