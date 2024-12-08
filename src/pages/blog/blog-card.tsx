import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    image: string;
  };
  slug: string;
}

export function BlogCard({ title, excerpt, date, author, slug }: BlogCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <img
            src={author.image}
            alt={author.name}
            className="h-6 w-6 rounded-full"
          />
          <span>{author.name}</span>
          <span>•</span>
          <time>{date}</time>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{excerpt}</p>
        <Button variant="ghost" className="group" asChild>
          <a href={`/blog/${slug}`}>
            Read more{' '}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}