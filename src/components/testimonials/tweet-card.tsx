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

  useEffect(() => {
    // Check if Twitter script is already loaded
    const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
      script.setAttribute('async', 'true');
      document.head.appendChild(script);
    }

    // Function to render tweet
    const renderTweet = () => {
      if (window.twttr && tweetRef.current) {
        // Clear previous content
        tweetRef.current.innerHTML = '';
        
        window.twttr.widgets.createTweet(author.tweetUrl, tweetRef.current, {
          theme: 'dark', // or 'light'
          conversation: 'none', // Hide the conversation thread
          dnt: true // Do Not Track
        });
      }
    };

    // If Twitter widget is already loaded
    if (window.twttr) {
      renderTweet();
    } else {
      // Wait for Twitter widget to load
      window.addEventListener('load', renderTweet);
    }

    return () => {
      window.removeEventListener('load', renderTweet);
    };
  }, [author.tweetUrl]);

  return (
    <Card className="relative overflow-hidden border-none bg-gradient-to-b from-white/[0.12] to-transparent p-1">
      <div ref={tweetRef} />
    </Card>
  );
} 