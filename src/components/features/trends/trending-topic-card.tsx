import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

interface TrendingTopicCardProps {
  topic: string;
  description: string;
  percentageIncrease: number;
  hashtags: string[];
}

export function TrendingTopicCard({ topic, description, percentageIncrease, hashtags }: TrendingTopicCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute right-4 top-4">
        <Badge variant="secondary" className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          +{percentageIncrease}%
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{topic}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-primary">
              #{tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}