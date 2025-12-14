import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Logo } from '@/components/ui/logo';
import { Play, Clock, ChevronRight, Compass, Users, LayoutDashboard, Signal, Lightbulb, FileSearch, TrendingUp, Eye, FolderOpen, FileText } from 'lucide-react';

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

  const handleSectionClick = (sectionId: string, timestamp: number) => {
    setSelectedSection(sectionId);
    setIsPlaying(true);
  };

  const handleWatchFull = () => {
    setSelectedSection(null);
    setIsPlaying(true);
  };

  const handleBack = () => {
    setIsPlaying(false);
    setSelectedSection(null);
  };

  const handleClose = () => {
    setIsPlaying(false);
    setSelectedSection(null);
    onClose();
  };

  const getTimestamp = () => {
    if (!selectedSection) return 0;
    const section = DEMO_CONFIG.sections.find(s => s.id === selectedSection);
    return section?.timestamp || 0;
  };

  const timestamp = getTimestamp();

  // YouTube embed URL - no autoplay to avoid browser blocking
  const videoUrl = `https://www.youtube.com/embed/${DEMO_CONFIG.videoId}?start=${timestamp}&rel=0&modestbranding=1`;

  // Key includes timestamp to force iframe reload when section changes
  const videoKey = `video-${timestamp}`;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className={`p-0 border-0 gap-0 ${
          isPlaying
            ? 'sm:max-w-6xl bg-black'
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
          <div className="flex flex-col w-full">
            {/* Video Container - proper 16:9 aspect ratio */}
            <div className="relative w-full bg-black" style={{ aspectRatio: '16/9' }}>
              {/* Back Button */}
              <button
                onClick={handleBack}
                className="absolute top-4 left-4 z-10 flex items-center gap-2 px-4 py-2 bg-black/70 hover:bg-black/90 text-white text-sm font-medium rounded-full transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back
              </button>

              <iframe
                key={videoKey}
                src={videoUrl}
                className="w-full h-full"
                style={{ border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title="Perception Platform Demo"
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
          </div>
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
