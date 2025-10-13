import { useState, useRef } from 'react';
import { format } from 'date-fns';
import { ExternalLink, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';
import type { Take } from '../../data/bitcoin-bad-takes/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TakeCardProps {
  take: Take;
  showShareButton?: boolean;
}

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-4 w-4"
    aria-hidden="true"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);


const getMediaUrl = (url: string) => {
  if (!url) return '';
  if (url.includes('storage.cloud.google.com')) {
    const bucket = 'btcp_bucket';
    const path = url.split('/Media/')[1];
    if (path) {
      return `https://storage.googleapis.com/${bucket}/Media/${path}`;
    }
  }
  return url;
};

export default function TakeCard({ take, showShareButton = false }: TakeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const location = useLocation();

  const handleShare = () => {
    const text = `Check out this terrible Bitcoin take from ${take.outlet}:\n\n"${take.headline || take.description}"\n\n`;
    const url = `${window.location.origin}/bitcoin-bad-takes/take/${take.slug}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const mediaUrl = getMediaUrl(take.media || '');
  const isVideo = mediaUrl.toLowerCase().endsWith('.mp4');
  const isDetailPage = location.pathname === `/bitcoin-bad-takes/take/${take.slug}`;

  return (
    <div
      className={cn(
        "w-full max-w-4xl mx-auto bg-background/60 backdrop-blur-xl rounded-3xl border border-border/10 shadow-2xl shadow-black/5 transition-all duration-500 hover:shadow-3xl hover:shadow-black/10 min-h-[600px] flex flex-col",
        isHovered && "scale-[1.01]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 sm:p-6 flex flex-col flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
          {!isDetailPage ? (
            <Link
              to={`/bitcoin-bad-takes/take/${take.slug}`}
              className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground/70 hover:text-foreground transition-all duration-300 font-bold"
            >
              <span>{format(new Date(take.date), 'MMM d, yyyy')}</span>
              <span className="w-1 h-1 bg-muted-foreground/40 rounded-full"></span>
              <span>{take.outlet}</span>
            </Link>
          ) : (
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground/70 font-bold">
              <span>{format(new Date(take.date), 'MMM d, yyyy')}</span>
              <span className="w-1 h-1 bg-muted-foreground/40 rounded-full"></span>
              <span>{take.outlet}</span>
            </div>
          )}
          <div className="flex items-center gap-3">
            {(showShareButton !== false) && (
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 backdrop-blur-sm border border-border/20 hover:bg-muted/50 hover:border-[#1DA1F2]/30 text-muted-foreground hover:text-[#1DA1F2] transition-all duration-300 text-sm font-bold"
              >
                <XIcon />
                <span className="hidden sm:inline">Share</span>
              </button>
            )}
            <a
              href={take.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted/30 backdrop-blur-sm border border-border/20 hover:bg-muted/50 hover:border-foreground/30 text-muted-foreground hover:text-foreground transition-all duration-300 group"
            >
              <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>
          </div>
        </div>

        {/* Adaptive media container */}
        <div className="relative rounded-2xl overflow-hidden bg-black/5 backdrop-blur-sm border border-border/10 mb-4 group flex items-center justify-center" style={{ height: isVideo ? 'auto' : '200px' }}>
          {mediaUrl ? (
            isVideo ? (
              <div className="relative w-full aspect-video">
                <video
                  ref={videoRef}
                  key={mediaUrl}
                  src={mediaUrl}
                  className="w-full h-full object-contain rounded-2xl"
                  autoPlay
                  loop
                  playsInline
                  muted={isMuted}
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={toggleMute}
                        className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md hover:bg-black/40 border border-white/10 transition-all duration-300 flex items-center justify-center text-white"
                      >
                        {isMuted ? (
                          <VolumeX className="h-4 w-4" />
                        ) : (
                          <Volume2 className="h-4 w-4" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isMuted ? 'Unmute video' : 'Mute video'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ) : (
              <img
                src={mediaUrl}
                alt={take.headline}
                className="w-full h-full object-contain"
              />
            )
          ) : (
            <div className="text-muted-foreground/40">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </div>

        <div className="relative flex-1 flex items-center">
          <div className="bg-gradient-to-br from-muted/20 to-muted/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-border/10 w-full">
            <blockquote className="text-base sm:text-lg leading-relaxed font-medium text-foreground/90 italic relative">
              <span className="absolute -top-1 -left-1 text-3xl text-muted-foreground/30 font-serif">"</span>
              {take.description}
              <span className="absolute -bottom-3 -right-1 text-3xl text-muted-foreground/30 font-serif">"</span>
            </blockquote>
          </div>
        </div>
      </div>

    </div>
  );
}