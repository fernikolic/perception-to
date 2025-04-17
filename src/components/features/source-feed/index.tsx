import { Card, CardContent } from '@/components/ui/card';
import { BrowserFrame } from '../charts/browser-frame';
import { ChevronDown } from 'lucide-react';

const sourceTypes = [
  'All Sources',
  'Financial Media',
  'Social Media',
  'Crypto Media',
  'Legacy Media',
  'International Media',
  'Communities',
  'Bitcoin Repos'
];

const feedItems = [
  {
    title: "Bitcoin climbs while China's retaliatory tariffs push Nasdaq...",
    sentiment: 'Neutral',
    source: {
      name: 'CNBC',
      logo: 'https://download.logo.wine/logo/CNBC/CNBC-Logo.wine.png'
    },
    date: '2025-04-04 21:29:00 UTC'
  },
  {
    title: 'Why Tariffs Make Now A Strategic Time To Buy Bitcoin',
    sentiment: 'Positive',
    source: {
      name: 'Forbes',
      logo: 'https://1000marcas.net/wp-content/uploads/2020/03/logo-Forbes.png'
    },
    date: '2025-04-04 18:24:00 UTC'
  }
];

export function SourceFeed() {
  return (
    <Card className="overflow-hidden">
      <BrowserFrame url="app.perception.to/feed" />
      <CardContent className="border-none p-4">
        <div className="space-y-4">
          {/* Source Type Filters */}
          <div className="flex flex-wrap gap-1.5">
            {sourceTypes.map((type) => (
              <button
                key={type}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors
                  ${type === 'Financial Media' 
                    ? 'bg-white text-black border border-gray-200' 
                    : 'bg-black text-white'}`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Time Filter and Search */}
          <div className="flex gap-3">
            <button className="flex items-center gap-1.5 text-xs text-muted-foreground">
              Last 24 hours · 1283 items
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs">
              All Sentiments
              <ChevronDown className="h-3 w-3" />
            </button>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search content, title, or source..."
                className="w-full rounded-lg border px-3 py-1 text-xs"
              />
            </div>
          </div>

          {/* Table Container */}
          <div className="rounded-xl border">
            {/* Table Header */}
            <div className="grid grid-cols-[3fr,1fr,1fr,1fr] px-4 py-2 text-xs text-muted-foreground border-b">
              <div>Title</div>
              <div>Sentiment</div>
              <div>From</div>
              <div>Date</div>
            </div>

            {/* Feed Items */}
            <div>
              {feedItems.map((item) => (
                <div 
                  key={item.title}
                  className="grid grid-cols-[3fr,1fr,1fr,1fr] px-4 py-2 text-xs hover:bg-accent/5"
                >
                  <div>{item.title}</div>
                  <div className="flex items-center gap-1.5">
                    <div className={`h-1.5 w-1.5 rounded-full ${item.sentiment === 'Positive' ? 'bg-green-400' : 'bg-blue-400'}`} />
                    {item.sentiment}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-4 w-4 shrink-0">
                      <img
                        src={item.source.logo}
                        alt={`${item.source.name} logo`}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <span>{item.source.name}</span>
                  </div>
                  <div className="text-muted-foreground">{item.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 