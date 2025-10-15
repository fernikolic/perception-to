import { useEffect } from 'react';

interface TweetCardProps {
  author: {
    name: string;
    role: string;
    company: string;
    image?: string;
    tweetUrl: string;
  };
}

export function TweetCard({ author }: TweetCardProps) {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script');
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Extract tweet ID from URL if it's a full URL
  const tweetId = author.tweetUrl.includes('x.com')
    ? author.tweetUrl.split('/').pop()
    : author.tweetUrl;

  // Add data-conversation="none" for Tuur Demeester's tweet
  const isTuurTweet = author.name === "Tuur Demeester";

  return (
    <div className="rounded-xl bg-card p-6 h-full">
      <blockquote
        className="twitter-tweet"
        data-theme="dark"
        data-width="100%"
        data-conversation={isTuurTweet ? "none" : undefined}
      >
        <a href={`https://twitter.com/x/status/${tweetId}`}></a>
      </blockquote>
    </div>
  );
}
