import { TweetCard } from './tweet-card';

export function Testimonials() {
  const testimonials = [
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
        tweetUrl: '1749104052346999040'
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

  return (
    <section id="testimonials" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            The best in Bitcoin
            <br />
            <span className="bg-gradient-to-r from-orange-500 to-orange-800 inline-block text-transparent bg-clip-text">
              trusts the data
            </span>
          </h2>
        </div>
        <div className="mx-auto mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index}>
              <TweetCard author={testimonial.author} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}