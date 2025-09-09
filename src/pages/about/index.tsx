import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Linkedin } from 'lucide-react';

// Add custom X icon component
const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" 
      fill="currentColor"/>
  </svg>
);

const teamMembers = [
  {
    name: 'Fernando Nikolic',
    role: 'Founder',
    image: 'https://pbs.twimg.com/profile_images/1963063161327910912/YfHniRP3_400x400.jpg',
    bio: '15 years of experience in marketing and communications at leading tech and Bitcoin companies.',
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
    title: 'Intelligence Platform Launch',
    description: 'Launched our intelligence platform, helping leaders identify opportunities 2-4 weeks before competitors.',
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
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
              <div className="mx-auto max-w-3xl text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-black">
                  Intelligence Platform for Emerging Finance Leaders
                </h1>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg xl:text-xl leading-6 sm:leading-7 lg:leading-8 text-black/70 font-light max-w-3xl mx-auto">
                  Perception is an intelligence platform that transforms market signals into actionable opportunities for emerging finance founders, strategists, and decision-makers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Mission Section */}
      <section className="py-24 bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">Our Mission</h2>
            <div className="space-y-6 text-lg leading-8 text-muted-foreground">
              <p>
                Our mission is to give emerging finance leaders a 2-4 week competitive advantage by identifying opportunities before they become mainstream.
              </p>
              <p>
                We transform market noise into strategic signals, helping founders, corporate strategists, and investors act on opportunities while competitors are still discovering them.
              </p>
              <p>
                From regulatory windows and partnership opportunities to narrative shifts and market timing, we deliver pre-qualified opportunities with clear next steps.
              </p>
              <p>
                Our goal is to replace hours of manual research with minutes of strategic decision-making, turning intelligence into competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet Our Founder</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Bringing deep expertise in emerging finance intelligence and strategic communications.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-sm">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={teamMembers[0].image} alt={teamMembers[0].name} />
                    <AvatarFallback>{teamMembers[0].name[0]}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-lg font-semibold">{teamMembers[0].name}</h3>
                  <p className="text-sm text-muted-foreground">{teamMembers[0].role}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{teamMembers[0].bio}</p>
                  <div className="mt-6 flex gap-4">
                    <Button variant="ghost" size="icon" asChild>
                      <a href={teamMembers[0].social.twitter} target="_blank" rel="noopener noreferrer">
                        <XIcon />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href={teamMembers[0].social.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,rgba(100,181,246,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Journey</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              From our founding to today, we've been dedicated to turning market intelligence into competitive advantage for emerging finance leaders.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative pl-8">
                  <div className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 ring-2 ring-primary">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  {index !== milestones.length - 1 && (
                    <div className="absolute left-3 top-6 h-full w-px bg-border" />
                  )}
                  <div className="py-2">
                    <span className="text-sm text-primary">{milestone.year}</span>
                    <h3 className="mt-2 text-lg font-semibold">{milestone.title}</h3>
                    <p className="mt-2 text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Button */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Button 
              asChild
              className="bg-primary text-white hover:bg-primary-focus"
            >
              <a href="https://app.perception.to/auth/sign-up">
                Start Here
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}