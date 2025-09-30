export interface Take {
  id: string;
  outlet: string;
  description: string;
  date: string;
  media?: string;
  url: string;
  slug: string;
  headline?: string;
  contentType?: 'video' | 'image';
  category?: string;
  bitcoinPrice?: number;
}

export interface TakeOfTheDay extends Take {
  outcome: string;
}