import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';

interface Announcement {
  date: string;
  content: string;
  tweetUrl: string;
  tags: string[];
}

const announcements: Announcement[] = [
  {
    date: 'March 15, 2024',
    content: 'Excited to announce the launch of our new Bitcoin sentiment analysis tools! Real-time market insights now available to all users. 🚀 #Bitcoin #Trading',
    tweetUrl: 'https://twitter.com/perception_dev/status/1234567890',
    tags: ['Product Update', 'Launch'],
  },
  {
    date: 'March 10, 2024',
    content: 'Join us next week for a deep dive into our latest market intelligence features. Live demo and Q&A session with our product team. 📊 #CryptoAnalytics',
    tweetUrl: 'https://twitter.com/perception_dev/status/1234567891',
    tags: ['Event', 'Demo'],
  },
  {
    date: 'March 5, 2024',
    content: 'New research report: "Understanding Bitcoin Market Cycles Through Sentiment Analysis" now available. Download it today! 📈 #BitcoinResearch',
    tweetUrl: 'https://twitter.com/perception_dev/status/1234567892',
    tags: ['Research', 'Report'],
  },
  {
    date: 'March 1, 2024',
    content: 'Milestone reached: Over 1 million data points analyzed daily! Thank you to our growing community for your trust and support. 🎉 #Growth',
    tweetUrl: 'https://twitter.com/perception_dev/status/1234567893',
    tags: ['Milestone', 'Community'],
  },
];

export function AnnouncementsPage() {
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
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal tracking-tight text-black">
                  Announcements
                </h1>
                <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg xl:text-xl leading-6 sm:leading-7 lg:leading-8 text-black/70 font-light">
                  Stay updated with the latest news, product updates, and insights from the Perception team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-8">
            {announcements.map((announcement) => (
              <a
                key={announcement.tweetUrl}
                href={announcement.tweetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-transform hover:-translate-y-1"
              >
                <Card className="overflow-hidden hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {announcement.date}
                    </div>
                    <p className="mt-4 text-lg">{announcement.content}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {announcement.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}