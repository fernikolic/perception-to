import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Logo } from '@/components/ui/logo';
import { Play, Clock, ChevronRight, Compass, Users, LayoutDashboard, Signal, Lightbulb, FileSearch, TrendingUp, Eye, FolderOpen, FileText } from 'lucide-react';

// Declare YouTube API types
declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string | HTMLElement,
        config: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  mute: () => void;
  unMute: () => void;
  destroy: () => void;
}

// Load YouTube IFrame API
const loadYouTubeAPI = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }

    const existingScript = document.getElementById('youtube-iframe-api');
    if (existingScript) {
      // Script already loading, wait for it
      const checkYT = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkYT);
          resolve();
        }
      }, 100);
      return;
    }

    const script = document.createElement('script');
    script.id = 'youtube-iframe-api';
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;

    window.onYouTubeIframeAPIReady = () => {
      resolve();
    };

    document.body.appendChild(script);
  });
};

const DEMO_CONFIG = {
  videoId: 'OTedJvx3i3g',
  totalDuration: '42 min',

  sections: [
    {
      id: 'intro',
      title: 'Introduction',
      description: 'Overview of what Perception does for you',
      duration: '1 min',
      timestamp: 0,
      icon: Compass,
    },
    {
      id: 'competitor-setup',
      title: 'Competitor Tracking',
      description: 'Setting up and exploring competitor insights',
      duration: '3 min',
      timestamp: 53, // 00:53
      icon: Users,
    },
    {
      id: 'preferences',
      title: 'Tracking Preferences',
      description: 'Customizing your monitoring settings',
      duration: '1 min',
      timestamp: 248, // 04:08
      icon: Signal,
    },
    {
      id: 'homepage',
      title: 'Intelligence Homepage',
      description: 'Navigating signals, strengths and trends',
      duration: '2 min',
      timestamp: 318, // 05:18
      icon: LayoutDashboard,
    },
    {
      id: 'insights',
      title: 'Actionable Insights',
      description: 'Generating intelligence you can act on',
      duration: '1 min',
      timestamp: 451, // 07:31
      icon: Lightbulb,
    },
    {
      id: 'research',
      title: 'Research & Media',
      description: 'Deep dive into research and media pages',
      duration: '10 min',
      timestamp: 522, // 08:42
      icon: FileSearch,
    },
    {
      id: 'trends',
      title: 'Trends Page',
      description: 'Understanding and utilizing trend data',
      duration: '5 min',
      timestamp: 1135, // 18:55
      icon: TrendingUp,
    },
    {
      id: 'watchlist',
      title: 'Watch List',
      description: 'Leveraging watch lists and competitor analysis',
      duration: '6 min',
      timestamp: 1454, // 24:14
      icon: Eye,
    },
    {
      id: 'spaces',
      title: 'Spaces & Reports',
      description: 'Creating and organizing reports with Spaces',
      duration: '7 min',
      timestamp: 1800, // 30:00
      icon: FolderOpen,
    },
    {
      id: 'reports',
      title: 'Report Generation',
      description: 'Generating comprehensive intelligence reports',
      duration: '4 min',
      timestamp: 2246, // 37:26
      icon: FileText,
    },
  ],
};

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [initialTimestamp, setInitialTimestamp] = useState(0);
  const playerRef = useRef<YTPlayer | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  // Initialize YouTube player when video starts playing
  useEffect(() => {
    if (!isPlaying) return;

    let player: YTPlayer | null = null;
    let mounted = true;

    const initPlayer = async () => {
      await loadYouTubeAPI();

      // Wait for the container to be available after render
      const waitForContainer = (): Promise<HTMLDivElement> => {
        return new Promise((resolve) => {
          const check = () => {
            if (playerContainerRef.current && mounted) {
              resolve(playerContainerRef.current);
            } else if (mounted) {
              requestAnimationFrame(check);
            }
          };
          check();
        });
      };

      const container = await waitForContainer();
      if (!mounted) return;

      // Clear any existing content
      container.innerHTML = '';

      // Create a div for the player
      const playerDiv = document.createElement('div');
      playerDiv.id = 'yt-player-' + Date.now();
      container.appendChild(playerDiv);

      player = new window.YT.Player(playerDiv, {
        videoId: DEMO_CONFIG.videoId,
        playerVars: {
          autoplay: 1,
          mute: 1,
          start: initialTimestamp,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            if (mounted) {
              event.target.playVideo();
              playerRef.current = event.target;
            }
          },
        },
      });
    };

    initPlayer();

    return () => {
      mounted = false;
      if (player) {
        try {
          player.destroy();
        } catch (e) {
          // Player might already be destroyed
        }
      }
      playerRef.current = null;
    };
  }, [isPlaying, initialTimestamp]);

  const handleSectionClick = useCallback((sectionId: string, timestamp: number) => {
    setSelectedSection(sectionId);
    if (isPlaying && playerRef.current) {
      // Already playing, just seek to the new timestamp
      playerRef.current.seekTo(timestamp, true);
    } else {
      // Not playing yet, set initial timestamp and start playing
      setInitialTimestamp(timestamp);
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const handleWatchFull = () => {
    setSelectedSection(null);
    setInitialTimestamp(0);
    setIsPlaying(true);
  };

  const handleBack = () => {
    setIsPlaying(false);
    setSelectedSection(null);
    setInitialTimestamp(0);
  };

  const handleClose = () => {
    setIsPlaying(false);
    setSelectedSection(null);
    setInitialTimestamp(0);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`p-0 border-0 gap-0 overflow-hidden block ${
          isPlaying
            ? 'sm:max-w-[90vw] lg:max-w-[80vw] xl:max-w-6xl bg-black'
            : 'sm:max-w-5xl bg-[#F0EEE6]'
        }`}
      >
        <DialogTitle className="sr-only">Platform Demo</DialogTitle>
        <DialogDescription className="sr-only">
          Explore the Perception platform through guided demo sections
        </DialogDescription>

        {!isPlaying ? (
          // Section Selection View
          <div className="relative">
            {/* Header with Logo */}
            <div className="px-8 pt-8 pb-6 text-center">
              {/* Perception Logo */}
              <div className="flex justify-center items-center gap-2.5 mb-6">
                <Logo />
                <span className="text-2xl font-semibold text-black tracking-tight">Perception</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-black tracking-tight mb-2">
                Explore the Platform
              </h2>
              <p className="text-sm text-black/60">
                Choose a section or watch the complete walkthrough
              </p>
            </div>

            {/* Section Grid */}
            <div className="px-8 pb-6 max-h-[55vh] overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {DEMO_CONFIG.sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id, section.timestamp)}
                      className="group relative bg-white rounded-xl p-5 text-left transition-all duration-200 hover:shadow-md hover:scale-[1.02] border border-black/5 hover:border-black/10"
                    >
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-lg bg-black/5 flex items-center justify-center mb-3 group-hover:bg-black transition-colors">
                        <IconComponent className="w-5 h-5 text-black/60 group-hover:text-white transition-colors" />
                      </div>

                      {/* Title */}
                      <h3 className="font-semibold text-black text-sm leading-snug mb-2">
                        {section.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-black/50 mb-3 leading-relaxed min-h-[2.5rem]">
                        {section.description}
                      </p>

                      {/* Duration */}
                      <div className="flex items-center gap-1.5 text-black/40">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs font-medium">{section.duration}</span>
                      </div>

                      {/* Hover Play Indicator */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-4 h-4 text-black/40 fill-black/40" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div className="px-8 py-2">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-black/10" />
                <span className="text-xs text-black/40 font-medium">or</span>
                <div className="flex-1 h-px bg-black/10" />
              </div>
            </div>

            {/* Watch Full Demo Button */}
            <div className="px-6 pb-8">
              <button
                onClick={handleWatchFull}
                className="w-full group flex items-center justify-center gap-3 bg-black text-white rounded-2xl py-4 px-6 font-semibold transition-all duration-200 hover:bg-black/90 hover:scale-[1.01]"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Watch Complete Demo</span>
                <span className="text-white/60">({DEMO_CONFIG.totalDuration})</span>
                <ChevronRight className="w-4 h-4 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
              </button>
            </div>
          </div>
        ) : (
          // Video Player View
          <>
            {/* Video Container - proper 16:9 aspect ratio */}
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              {/* Back Button */}
              <button
                onClick={handleBack}
                className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-black/70 hover:bg-black/90 text-white text-sm font-medium rounded-full transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back
              </button>

              {/* YouTube Player Container */}
              <div
                ref={playerContainerRef}
                className="absolute top-0 left-0 w-full h-full [&>div]:w-full [&>div]:h-full [&_iframe]:w-full [&_iframe]:h-full"
              />
            </div>

            {/* Section Navigation Bar */}
            <div className="bg-[#F0EEE6] px-4 py-3 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {DEMO_CONFIG.sections.map((section) => {
                  const IconComponent = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id, section.timestamp)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                        selectedSection === section.id
                          ? 'bg-black text-white'
                          : 'bg-black/5 text-black/70 hover:bg-black/10'
                      }`}
                    >
                      <IconComponent className="w-3.5 h-3.5" />
                      <span>{section.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Hook for easy usage
export function useDemoModal() {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    openDemo: () => setIsOpen(true),
    closeDemo: () => setIsOpen(false),
  };
}
