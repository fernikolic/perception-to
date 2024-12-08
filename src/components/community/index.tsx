import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const platforms = [
  {
    name: 'Twitter Community',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Stay updated with tips, announcements, and general info about the latest features and updates.',
    buttonText: 'Join Twitter',
    href: '#',
  },
  {
    name: 'GitHub Developers',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Report bugs, request features and contribute to the project. Join our open-source community.',
    buttonText: 'Join GitHub',
    href: '#',
  },
  {
    name: 'Discord Chat',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&h=300&q=80',
    description: 'Join the community, ask questions, and share tips. Connect with developers worldwide.',
    buttonText: 'Join Discord',
    href: '#',
  },
];

export function Community() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,rgba(255,255,255,0.05),transparent)]" />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="text-sm font-medium">Community</span>
          </div>
          
          <h2 className="mt-4 text-center text-4xl font-bold tracking-tight sm:text-5xl">
            Join our community
          </h2>
          
          <p className="mt-4 text-center text-xl text-muted-foreground">
            <span className="text-foreground">Connect</span>,{' '}
            <span className="text-foreground">learn</span>, and{' '}
            <span className="text-foreground">grow</span> with fellow designers and developers.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform) => (
            <Card
              key={platform.name}
              className="group relative overflow-hidden border-white/5 bg-black/20 transition-all duration-300 hover:border-white/10 hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <div className="relative h-[200px] w-full overflow-hidden">
                  <img
                    src={platform.image}
                    alt={platform.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold">{platform.name}</h3>
                  <p className="mt-2 text-muted-foreground">{platform.description}</p>
                  <Button
                    className="mt-6 rounded-full bg-white/10 px-8 hover:bg-white/20"
                    asChild
                  >
                    <a 
                      href={platform.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      {platform.buttonText}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-12 text-center text-muted-foreground">
          Be part of a community that connects, learns, and grows together.
        </p>
      </div>
    </section>
  );
}