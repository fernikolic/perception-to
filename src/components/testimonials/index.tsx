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