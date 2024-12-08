import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowRight, Github, Twitter } from 'lucide-react';

const teamMembers = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Co-founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    bio: 'Former VP of Product at leading fintech companies, passionate about democratizing access to financial data.',
    social: {
      twitter: '#',
      github: '#',
    },
  },
  {
    name: 'Michael Chen',
    role: 'CTO & Co-founder',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    bio: '15 years of experience in scaling cloud infrastructure and building secure systems.',
    social: {
      twitter: '#',
      github: '#',
    },
  },
  {
    name: 'Emma Rodriguez',
    role: 'Head of Research',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80',
    bio: 'PhD in Data Science, specializing in market sentiment analysis and predictive modeling.',
    social: {
      twitter: '#',
      github: '#',
    },
  },
];

const milestones = [
  {
    year: '2021',
    title: 'Company Founded',
    description: 'Started with a vision to make crypto market data accessible to everyone.',
  },
  {
    year: '2022',
    title: 'Series A Funding',
    description: 'Raised $10M to expand our data analytics capabilities.',
  },
  {
    year: '2023',
    title: 'Global Expansion',
    description: 'Launched in 30+ countries with support for multiple languages.',
  },
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(100,181,246,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Making Crypto Data Accessible
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We're on a mission to democratize access to cryptocurrency market data and analytics,
              enabling everyone to make informed decisions in the digital asset space.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg">Join Our Team</Button>
              <Button variant="outline" size="lg" className="group">
                Read Our Story <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet Our Team</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We're a diverse team of experts passionate about making cryptocurrency data more accessible and actionable.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                    <p className="mt-4 text-sm text-muted-foreground">{member.bio}</p>
                    <div className="mt-6 flex gap-4">
                      <Button variant="ghost" size="icon" asChild>
                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
              From our founding to today, we've been dedicated to innovation and excellence in crypto data analytics.
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
    </div>
  );
}