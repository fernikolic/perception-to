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
    <div className="rounded-2xl bg-white p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border border-black/5">
      <blockquote
        className="twitter-tweet"
        data-theme="light"
        data-width="100%"
        data-conversation={isTuurTweet ? "none" : undefined}
      >
        <a href={`https://twitter.com/x/status/${tweetId}`}></a>
      </blockquote>
    </div>
  );
}
