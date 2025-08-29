import React from 'react';
import TakeCard from '../../components/bitcoin-bad-takes/TakeCard';
import { useTakes } from '../../hooks/useTakes';
import { Video, Newspaper } from 'lucide-react';
import SEO from '../../components/bitcoin-bad-takes/SEO';
import { useParams } from 'react-router-dom';

export default function Home() {
  const { takes, loading, error } = useTakes();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [contentType, setContentType] = React.useState<'video' | 'image'>('video');
  const { slug } = useParams();

  // Filter takes by content type
  const filteredTakes = takes.filter(take => 
    take.contentType === contentType || !take.contentType
  );

  const currentTake = filteredTakes[currentIndex] || null;


  const handleNext = () => {
    if (currentIndex < filteredTakes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Initialize from URL slug on first load only
  React.useEffect(() => {
    if (filteredTakes.length > 0 && slug && currentIndex === 0) {
      const index = filteredTakes.findIndex(take => take.slug === slug);
      if (index >= 0) {
        setCurrentIndex(index);
      }
    }
  }, [slug, filteredTakes]);

  // Reset when content type changes
  React.useEffect(() => {
    setCurrentIndex(0);
  }, [contentType]);

  return (
    <div>
      <SEO 
        title={currentTake ? `"${currentTake.description}" - Horrible Bitcoin Takes` : "Horrible Bitcoin Takes"}
        description={currentTake ? `${currentTake.outlet} on ${new Date(currentTake.date).toLocaleDateString()}: "${currentTake.description}"` : "A curated collection of the most misguided predictions and commentary about Bitcoin from media outlets and financial experts."}
        image={`${window.location.origin}/images/social-graph.png`}
        type="article"
        publishedTime={currentTake?.date}
        author={currentTake?.outlet}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-white font-light">Loading content...</p>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <p className="text-red-400 font-medium mb-2">Unable to load content</p>
            <p className="text-white/80 text-sm">{error}</p>
          </div>
        </div>
      ) : currentTake ? (
        <div className="relative max-w-5xl mx-auto px-8">
          <div className="relative flex items-start justify-center min-h-[600px]">
            {/* Left Navigation with Content Type Selector */}
            <div className="fixed left-8 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-4">
              {/* Content Type Selector - Vertical */}
              <div className="flex flex-col bg-muted/30 backdrop-blur-md rounded-2xl p-1 border border-border/20">
                <button
                  onClick={() => setContentType('video')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    contentType === 'video' 
                      ? 'bg-black shadow-lg text-white' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  <Video className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setContentType('image')}
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    contentType === 'image' 
                      ? 'bg-black shadow-lg text-white' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  <Newspaper className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Button */}
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/20 shadow-lg hover:shadow-xl hover:bg-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-background/80 group"
              >
                <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Progress indicator */}
              {filteredTakes.length > 0 && (
                <div className="flex flex-col items-center gap-1 bg-black/20 backdrop-blur-md rounded-xl px-3 py-2 border border-white/10">
                  <span className="text-xs text-white font-medium">
                    {currentIndex + 1}/{filteredTakes.length}
                  </span>
                  <span className="text-xs text-white/80 capitalize">
                    {contentType === 'video' ? 'Videos' : 'Headlines'}
                  </span>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-3xl">
              <TakeCard 
                take={currentTake}
                showShareButton={true}
              />
            </div>

            {/* Right Navigation */}
            <button
              onClick={handleNext}
              disabled={currentIndex === filteredTakes.length - 1}
              className="fixed right-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border/20 shadow-lg hover:shadow-xl hover:bg-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-background/80 group"
            >
              <svg className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center mx-auto mb-6">
              {contentType === 'video' ? 
                <Video className="w-8 h-8 text-white" /> : 
                <Newspaper className="w-8 h-8 text-white" />
              }
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              No {contentType === 'video' ? 'videos' : 'headlines'} available
            </h3>
            <p className="text-white/80 text-sm mb-6">
              Be the first to contribute to this collection.
            </p>
            <a 
              href="/bitcoin-bad-takes/submit" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-black font-medium hover:bg-white/90 transition-all duration-300 hover:scale-105"
            >
              Submit a take
            </a>
          </div>
        </div>
      )}
    </div>
  );
}