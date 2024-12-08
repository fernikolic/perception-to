import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TestimonialCardProps {
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    image: string;
    tweetUrl: string;
  };
}

export function TestimonialCard({ content, author }: TestimonialCardProps) {
  return (
    <a
      href={author.tweetUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block transition-transform hover:-translate-y-1"
    >
      <Card className="relative overflow-hidden border-none bg-gradient-to-b from-white/[0.12] to-transparent shadow-xl hover:shadow-2xl dark:from-white/[0.07]">
        <CardContent className="relative p-6">
          <div className="relative">
            <svg
              className="absolute -top-6 -left-6 h-12 w-12 text-primary/10"
              fill="currentColor"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
            </svg>
            <p className="text-lg leading-8 text-foreground/80">{content}</p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-x-4">
              <Avatar className="ring-2 ring-primary/10">
                <AvatarImage src={author.image} alt={author.name} />
                <AvatarFallback>{author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-foreground">{author.name}</div>
                <div className="text-sm text-muted-foreground">
                  {author.role} at {author.company}
                </div>
              </div>
            </div>
            <svg 
              viewBox="0 0 24 24" 
              className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
              aria-hidden="true"
            >
              <path 
                fill="currentColor"
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" 
              />
            </svg>
          </div>
        </CardContent>
      </Card>
    </a>
  );
}