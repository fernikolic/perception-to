import { Card, CardContent } from '@/components/ui/card';
import { BrowserFrame } from '../charts/browser-frame';
import { Bookmark, ArrowUpRight } from 'lucide-react';

const articles = [
  {
    title: 'Trump Family Backs Major Bitcoin Mining Venture',
    date: 'Mar 31',
    color: 'bg-green-100'
  },
  {
    title: 'Bitcoin and Trade Tariffs Affecting Market Sentiment',
    date: 'Mar 31',
    color: 'bg-blue-100'
  },
  {
    title: "MARA's $2 Billion Stock Sale for Bitcoin Acquisition",
    date: 'Mar 31',
    color: 'bg-green-100'
  },
  {
    title: 'Bitcoin Mining Centralization Concerns Resurface',
    date: 'Mar 31',
    color: 'bg-red-100'
  }
];

export function SavedViews() {
  return (
    <Card className="overflow-hidden">
      <BrowserFrame url="app.perception.to/news" />
      <CardContent className="border-none p-4">
        <div className="space-y-2">
          {articles.map((article) => (
            <div 
              key={article.title}
              className="group flex items-center justify-between gap-3 rounded-xl border border-border/40 bg-white p-2 hover:bg-accent/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-lg ${article.color}`} />
                <div>
                  <h3 className="font-medium text-sm leading-tight">{article.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{article.date}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="text-muted-foreground hover:text-foreground">
                  <Bookmark className="h-4 w-4" />
                </button>
                <button className="flex items-center gap-1 text-xs font-medium">
                  Read
                  <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 