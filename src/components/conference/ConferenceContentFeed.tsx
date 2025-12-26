import React from 'react';
import { ExternalLinkIcon, CalendarIcon, RefreshCwIcon, AlertCircleIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useConferenceContent, type ConferenceArticle } from '@/hooks/useConferenceContent';

interface ConferenceContentFeedProps {
  outletName: string;
  conferenceName: string;
  limit?: number;
  showStats?: boolean;
}

const sentimentColors = {
  Positive: 'bg-green-100 text-green-700',
  Neutral: 'bg-gray-100 text-gray-600',
  Negative: 'bg-red-100 text-red-700'
};

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateString;
  }
}

// Extract YouTube video ID from various YouTube URL formats
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;

  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return null;
}

function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-900">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}

function ArticleCard({ article }: { article: ConferenceArticle }) {
  const youtubeId = getYouTubeVideoId(article.url);

  // If it's a YouTube video, show embedded player
  if (youtubeId) {
    return (
      <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
        <YouTubeEmbed videoId={youtubeId} title={article.title} />
        <div className="p-4 space-y-2">
          <h4 className="font-medium text-gray-900 line-clamp-2">
            {article.title}
          </h4>
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Badge className={`text-xs ${sentimentColors[article.sentiment]}`}>
              {article.sentiment}
            </Badge>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              <span>{formatDate(article.date)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For non-YouTube articles, show as link card
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block p-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
    >
      <div className="flex gap-4">
        {/* Article image */}
        {article.imageUrl && (
          <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={article.imageUrl}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Article content */}
        <div className="flex-1 min-w-0 space-y-2">
          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {article.title}
          </h4>

          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <Badge className={`text-xs ${sentimentColors[article.sentiment]}`}>
              {article.sentiment}
            </Badge>
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              <span>{formatDate(article.date)}</span>
            </div>
            {article.author && (
              <span className="text-gray-400">by {article.author}</span>
            )}
          </div>
        </div>

        {/* External link icon */}
        <div className="flex-shrink-0">
          <ExternalLinkIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
      </div>
    </a>
  );
}

function SentimentStats({
  stats
}: {
  stats: { positive: number; neutral: number; negative: number };
}) {
  const total = stats.positive + stats.neutral + stats.negative;
  if (total === 0) return null;

  const positivePercent = Math.round((stats.positive / total) * 100);
  const neutralPercent = Math.round((stats.neutral / total) * 100);
  const negativePercent = Math.round((stats.negative / total) * 100);

  return (
    <div className="rounded-xl bg-gray-50 p-4 space-y-3">
      <h4 className="font-medium text-gray-700 text-sm">Sentiment Breakdown</h4>

      {/* Visual bar */}
      <div className="flex h-2 rounded-full overflow-hidden bg-gray-200">
        {positivePercent > 0 && (
          <div
            className="bg-green-500"
            style={{ width: `${positivePercent}%` }}
          />
        )}
        {neutralPercent > 0 && (
          <div
            className="bg-gray-400"
            style={{ width: `${neutralPercent}%` }}
          />
        )}
        {negativePercent > 0 && (
          <div
            className="bg-red-500"
            style={{ width: `${negativePercent}%` }}
          />
        )}
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span>Positive ({positivePercent}%)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-400" />
          <span>Neutral ({neutralPercent}%)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500" />
          <span>Negative ({negativePercent}%)</span>
        </div>
      </div>
    </div>
  );
}

export function ConferenceContentFeed({
  outletName,
  conferenceName,
  limit = 10,
  showStats = true
}: ConferenceContentFeedProps) {
  const { articles, stats, loading, error, lastUpdated, refetch } = useConferenceContent(outletName);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 rounded-xl bg-gray-100">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-xl bg-red-50 border border-red-200 text-center">
        <AlertCircleIcon className="h-8 w-8 text-red-400 mx-auto mb-2" />
        <p className="text-red-700 font-medium">Failed to load content</p>
        <p className="text-red-600 text-sm mt-1">{error}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={refetch}
          className="mt-4"
        >
          <RefreshCwIcon className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="p-8 rounded-xl bg-gray-50 border border-gray-200 text-center">
        <p className="text-gray-600">No recent content found for {conferenceName}</p>
        <p className="text-gray-500 text-sm mt-1">
          Check back later for new articles and coverage
        </p>
      </div>
    );
  }

  const displayedArticles = articles.slice(0, limit);

  return (
    <div className="space-y-4">
      {/* Stats */}
      {showStats && stats.totalArticles > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{stats.totalArticles}</span>{' '}
              articles in the last 90 days
            </p>
            {lastUpdated && (
              <p className="text-xs text-gray-500 mt-1">
                Updated {formatDate(lastUpdated.toISOString())}
              </p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={refetch}
            className="self-start"
          >
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      )}

      {/* Sentiment stats */}
      {showStats && (
        <SentimentStats stats={stats.sentimentBreakdown} />
      )}

      {/* Articles */}
      <div className="space-y-3">
        {displayedArticles.map((article, index) => (
          <ArticleCard key={`${article.url}-${index}`} article={article} />
        ))}
      </div>

      {/* Show more */}
      {articles.length > limit && (
        <p className="text-center text-sm text-gray-500 pt-2">
          Showing {limit} of {articles.length} articles
        </p>
      )}
    </div>
  );
}

export default ConferenceContentFeed;
