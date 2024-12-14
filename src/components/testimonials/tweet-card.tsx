import { Card } from '@/components/ui/card';
import { useEffect, useRef } from 'react';

interface TweetCardProps {
  author: {
    name: string;
    role: string;
    company: string;
    image: string;
    tweetUrl: string;
  };
}

export function TweetCard({ author }: TweetCardProps) {
  const tweetRef = useRef<HTMLDivElement>(null);
  const isRendered = useRef(false);

  useEffect(() => {
    // Function to render tweet
    const renderTweet = () => {
      if (window.twttr && tweetRef.current && !isRendered.current) {
        isRendered.current = true;
        
        window.twttr.widgets.createTweet(author.tweetUrl, tweetRef.current, {
          theme: 'dark',
          conversation: 'none',
          dnt: true,
          cards: 'hidden',
          align: 'center',
          width: '100%',
          backgroundColor: '#000000'
        });
      }
    };

    // Load Twitter script if not already loaded
    if (!window.twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        window.twttr.ready(renderTweet);
      };
    } else {
      window.twttr.ready(renderTweet);
    }

    // Cleanup function
    return () => {
      isRendered.current = false;
    };
  }, [author.tweetUrl]);

  return (
    <Card className="relative overflow-hidden border-none bg-black p-1">
      <div ref={tweetRef} className="[&>iframe]:!bg-black" />
    </Card>
  );
} 