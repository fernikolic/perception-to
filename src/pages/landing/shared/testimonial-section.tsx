import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

interface Testimonial {
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    image: string;
  };
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
  metrics: Array<{
    value: string;
    label: string;
  }>;
  logos: Array<{
    name: string;
    url: string;
  }>;
}

export function TestimonialSection({ testimonials, metrics, logos }: TestimonialSectionProps) {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Success Metrics */}
        <div className="mb-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-3xl font-bold text-primary">{metric.value}</div>
              <div className="mt-2 text-sm text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.author.name} className="relative">
              <CardContent className="p-6">
                <Quote className="absolute right-6 top-6 h-6 w-6 text-primary/20" />
                <p className="mb-6 text-muted-foreground">{testimonial.content}</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.author.image} />
                    <AvatarFallback>{testimonial.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.author.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.author.role} at {testimonial.author.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client Logos */}
        <div className="mt-16">
          <div className="text-center text-sm font-semibold text-muted-foreground">
            Trusted by industry leaders
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {logos.map((logo) => (
              <img
                key={logo.name}
                src={logo.url}
                alt={logo.name}
                className="h-8 object-contain grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}