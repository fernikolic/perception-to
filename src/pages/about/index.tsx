import { Linkedin } from 'lucide-react';
import SEO from '@/components/SEO';

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" 
      fill="currentColor"/>
  </svg>
);

const teamMembers = [
  {
    name: 'Fernando Nikolic',
    role: 'Founder',
    image: 'https://pbs.twimg.com/profile_images/1963063161327910912/YfHniRP3_400x400.jpg',
    bio: '15 years of experience in marketing and communications at leading tech and Bitcoin companies. Worked at Universal Music during torrents\' disruption of music | Ex VP at Blockstream during Bitcoin\'s disruption of finance.',
    social: {
      twitter: 'https://x.com/basedlayer',
      linkedin: 'https://www.linkedin.com/in/fernandonikolic/',
    },
  },
];

const milestones = [
  {
    year: '2024',
    title: 'Company Founded',
    description: 'Started with a vision to transform market intelligence into actionable opportunities for emerging finance leaders.',
  },
  {
    year: '2025',
    title: 'Beta Launch',
    description: 'Launched our beta platform, helping early users identify opportunities 2-4 weeks before competitors.',
  },
];

export function AboutPage() {
  return (
    <>
      <SEO 
        title="About - Perception | Intelligence Platform for Emerging Finance"
        description="Learn about Perception's mission to transform market intelligence into actionable opportunities for emerging finance leaders. Meet our team and discover our vision."
        url="https://perception.to/about"
        keywords={['about Perception', 'Bitcoin intelligence team', 'market intelligence company', 'emerging finance platform', 'crypto analytics team']}
      />
    <div className="min-h-screen bg-white">
      {/* Hero Section - Original with Apple styling */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src="/images/hero_image.avif"
                alt="Background"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="relative z-10 px-4 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-24">
              <div className="mx-auto max-w-5xl text-center">
                <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight sm:leading-[0.95] text-black mb-6 sm:mb-10 lg:mb-14 px-2">
                  The Intelligence Platform for Emerging Finance
                </h1>
                <p className="text-base sm:text-xl lg:text-2xl xl:text-3xl font-light leading-relaxed text-black/70 max-w-4xl mx-auto px-2">
                  Perception is an intelligence platform that transforms market signals into actionable opportunities for emerging finance founders, strategists, and decision-makers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Apple Style */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-4 sm:mb-6 px-2">
              Our Mission
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl leading-relaxed text-gray-700 font-light">
                <p>
                  We give emerging finance leaders a 2–4 week competitive advantage by identifying opportunities before they become mainstream.
                </p>
                <p>
                  From regulatory windows to narrative shifts, we deliver opportunities with clear next steps.
                </p>
                <p>
                  Our goal is simple: replace hours of manual research with minutes of strategic decision-making.
                </p>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="aspect-square rounded-2xl sm:rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-100 p-8 sm:p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl lg:text-7xl font-thin text-indigo-600 mb-3 sm:mb-4">2–4</div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-light text-gray-700">weeks ahead</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section - Apple Style */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-4 sm:mb-6 px-2">
              Meet Our Founder
            </h2>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light text-gray-600 max-w-3xl mx-auto px-2">
              Bringing deep expertise in emerging finance intelligence and strategic communications.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="p-6 sm:p-10 lg:p-12 text-center">
                <div className="relative inline-block mb-6 sm:mb-8">
                  <img
                    src={teamMembers[0].image}
                    alt={teamMembers[0].name}
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full object-cover"
                  />
                </div>

                <h3 className="text-2xl sm:text-3xl font-light text-black mb-2">
                  {teamMembers[0].name}
                </h3>
                <p className="text-base sm:text-lg font-light text-gray-500 mb-4 sm:mb-6">
                  {teamMembers[0].role}
                </p>
                <p className="text-base sm:text-lg font-light text-gray-700 leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto">
                  {teamMembers[0].bio}
                </p>
                
                <div className="flex justify-center gap-4">
                  <a 
                    href={teamMembers[0].social.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                  >
                    <XIcon />
                  </a>
                  <a 
                    href={teamMembers[0].social.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - Apple Style */}
      <section className="py-12 sm:py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-4 sm:mb-6 px-2">
              Our Journey
            </h2>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light text-gray-600 max-w-4xl mx-auto px-2">
              From founding to today, we've been dedicated to turning market intelligence into competitive advantage.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative">
                  <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black text-white mb-4 sm:mb-6">
                        <span className="text-xl sm:text-2xl font-light">{milestone.year}</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-light text-black mb-3 sm:mb-4">
                        {milestone.title}
                      </h3>
                      <p className="text-base sm:text-lg font-light text-gray-700 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Apple Style */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-black mb-6 sm:mb-8 px-2">
              Ready to get started?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto px-2">
              Join emerging finance leaders who are already 2–4 weeks ahead.
            </p>
            <a
              href="https://app.perception.to/auth/sign-up"
              className="inline-flex items-center justify-center px-8 sm:px-10 lg:px-12 py-6 sm:py-7 text-base sm:text-lg lg:text-xl font-semibold text-white bg-black rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Start here
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}