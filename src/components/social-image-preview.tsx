import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function SocialImagePreview() {
  const location = useLocation();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('dark');

  const generatePreview = async () => {
    setIsGenerating(true);
    const params = new URLSearchParams({
      title: customTitle || `Perception - ${location.pathname}`,
      description: customDescription || 'Track Bitcoin trends. Decode market sentiment. Uncover narratives.',
      path: location.pathname,
      theme: selectedTheme
    });
    
    // For development, use a simple data URL instead of the problematic server
    const isDevelopment = import.meta.env.DEV;
    
    if (isDevelopment) {
      // Generate a simple data URL for development
      const svg = generateSimpleSVG({
        title: params.get('title'),
        description: params.get('description'),
        path: params.get('path'),
        theme: selectedTheme
      });
      const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
      setPreviewUrl(dataUrl);
          } else {
        const imageUrl = `https://perception.to/api/og-image?${params.toString()}`;
        setPreviewUrl(imageUrl);
      }
    
    setIsGenerating(false);
  };

  const generateSimpleSVG = ({ title, description, path, theme }: {
    title: string | null;
    description: string | null;
    path: string | null;
    theme: string;
  }) => {
    const pageIcons = {
      '/': '📊',
      '/methodology': '🔬',
      '/journalist': '📰', 
      '/investor': '📈',
      '/researcher': '🎓',
      '/about': '🏢',
      '/pricing': '💰',
      '/docs': '📚',
      '/api': '⚡',
      '/learn': '🎯'
    };

    const pageIcon = pageIcons[path as keyof typeof pageIcons] || '📊';
    const colors = theme === 'dark' ? {
      background: '#0a0a0a',
      title: '#ffffff',
      description: '#a1a1aa',
      accent: '#f97316'
    } : {
      background: '#ffffff', 
      title: '#1a1a1a',
      description: '#52525b',
      accent: '#f97316'
    };

    return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.background};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${theme === 'dark' ? '#111111' : '#f8f9fa'};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.background};stop-opacity:1" />
        </linearGradient>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ff7f00;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ff4500;stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="subtleShadow">
          <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.1"/>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bgGradient)" />
      
      <!-- Subtle background elements -->
      <circle cx="950" cy="150" r="120" fill="${colors.accent}" opacity="0.03" />
      <circle cx="1100" cy="500" r="200" fill="${colors.accent}" opacity="0.02" />
      <circle cx="100" cy="400" r="150" fill="${colors.accent}" opacity="0.02" />
      
      <!-- Grid pattern overlay for Apple-like texture -->
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="${colors.accent}" stroke-width="0.3" opacity="0.05"/>
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#grid)" />
      
      <!-- Main content container with subtle border -->
      <rect x="60" y="60" width="1080" height="510" rx="24" fill="none" stroke="${colors.accent}" stroke-width="1" opacity="0.1" />
      
      <!-- Logo section -->
      <g transform="translate(100, 120)">
        <text x="0" y="16" font-family="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif" font-size="28" font-weight="600" fill="${colors.title}" filter="url(#subtleShadow)">Perception</text>
        <text x="0" y="32" font-family="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="400" fill="${colors.description}">Real-Time Sentiment &amp; Trend Intelligence for Bitcoin, Stablecoins &amp; Tokenized Finance</text>
      </g>
      
      <!-- Page icon with subtle background -->
      <g transform="translate(100, 220)">
        <circle cx="32" cy="32" r="32" fill="${colors.accent}" opacity="0.1" />
        <text x="32" y="42" font-family="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif" font-size="36" text-anchor="middle" fill="${colors.accent}">${pageIcon}</text>
      </g>
      
      <!-- Main title with improved typography -->
      <text x="200" y="240" font-family="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif" font-size="52" font-weight="700" fill="${colors.title}" filter="url(#subtleShadow)">
        ${(title?.slice(0, 45) || 'Perception').replace(/&/g, '&amp;')}
      </text>
      
      <!-- Description with better spacing -->
      <text x="200" y="285" font-family="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif" font-size="22" font-weight="400" fill="${colors.description}" opacity="0.8">
        ${(description?.slice(0, 75) || 'Track Bitcoin trends. Decode market sentiment.').replace(/&/g, '&amp;')}
      </text>
      
      <!-- Bottom section with refined styling -->
      <g transform="translate(100, 520)">
        <!-- Feature highlight -->
        <rect x="0" y="0" width="280" height="32" rx="16" fill="${colors.accent}" opacity="0.08" />
        <text x="12" y="21" font-family="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="500" fill="${colors.accent}">📊 Real-time Bitcoin Sentiment</text>
        
        <!-- Domain -->
        <text x="900" y="21" font-family="SF Mono, Monaco, monospace" font-size="16" font-weight="500" fill="${colors.description}" opacity="0.7">perception.to</text>
      </g>
      
      <!-- Subtle corner accent -->
      <path d="M 1140 60 Q 1140 60 1140 84 L 1140 108" stroke="${colors.accent}" stroke-width="2" fill="none" opacity="0.2" stroke-linecap="round" />
      <path d="M 60 570 Q 60 570 84 570 L 108 570" stroke="${colors.accent}" stroke-width="2" fill="none" opacity="0.2" stroke-linecap="round" />
    </svg>`;
  };

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://perception.to${location.pathname}`)}&text=${encodeURIComponent(customTitle || 'Check out Perception')}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://perception.to${location.pathname}`)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://perception.to${location.pathname}`)}`
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📱 Social Image Preview
          </CardTitle>
          <CardDescription>
            Test how your pages will look when shared on social media platforms
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Custom Title</Label>
              <Input
                id="title"
                placeholder="Enter custom title..."
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Custom Description</Label>
            <Textarea
              id="description"
              placeholder="Enter custom description..."
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={generatePreview}
              disabled={isGenerating}
              className="flex-1"
            >
              {isGenerating ? 'Generating...' : 'Generate Preview'}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {previewUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Social Image</CardTitle>
            <CardDescription>
              This is how your page will appear when shared on social media
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900">
                <img 
                  src={previewUrl} 
                  alt="Social media preview" 
                  className="w-full"
                  style={{ aspectRatio: '1200/630' }}
                />
              </div>
              
              {/* Social Media Preview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Twitter Card Preview */}
                <div className="border rounded-lg p-4 space-y-2 bg-white dark:bg-gray-800">
                  <div className="text-sm font-medium text-blue-500">Twitter Card</div>
                  <img 
                    src={previewUrl} 
                    alt="Twitter preview" 
                    className="w-full rounded"
                    style={{ aspectRatio: '1200/630' }}
                  />
                  <div className="space-y-1">
                    <div className="font-medium text-sm line-clamp-1">
                      {customTitle || 'Perception'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {customDescription || 'Track Bitcoin trends. Decode market sentiment.'}
                    </div>
                    <div className="text-xs text-gray-500">perception.to</div>
                  </div>
                </div>

                {/* Facebook Card Preview */}
                <div className="border rounded-lg p-4 space-y-2 bg-white dark:bg-gray-800">
                  <div className="text-sm font-medium text-blue-600">Facebook Card</div>
                  <img 
                    src={previewUrl} 
                    alt="Facebook preview" 
                    className="w-full rounded"
                    style={{ aspectRatio: '1200/630' }}
                  />
                  <div className="space-y-1">
                    <div className="font-medium text-sm line-clamp-1">
                      {customTitle || 'Perception'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {customDescription || 'Track Bitcoin trends. Decode market sentiment.'}
                    </div>
                    <div className="text-xs text-gray-500 uppercase">perception.to</div>
                  </div>
                </div>

                {/* LinkedIn Card Preview */}
                <div className="border rounded-lg p-4 space-y-2 bg-white dark:bg-gray-800">
                  <div className="text-sm font-medium text-blue-700">LinkedIn Card</div>
                  <img 
                    src={previewUrl} 
                    alt="LinkedIn preview" 
                    className="w-full rounded"
                    style={{ aspectRatio: '1200/630' }}
                  />
                  <div className="space-y-1">
                    <div className="font-medium text-sm line-clamp-1">
                      {customTitle || 'Perception'}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {customDescription || 'Track Bitcoin trends. Decode market sentiment.'}
                    </div>
                    <div className="text-xs text-gray-500">perception.to</div>
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm" asChild>
                  <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer">
                    Share on Twitter
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer">
                    Share on LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer">
                    Share on Facebook
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Testing Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Testing & Validation</CardTitle>
          <CardDescription>
            Use these tools to validate your social media cards
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" asChild>
              <a 
                href="https://cards-dev.twitter.com/validator" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center"
              >
                Twitter Card Validator
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a 
                href="https://developers.facebook.com/tools/debug/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center"
              >
                Facebook Debugger
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a 
                href="https://www.linkedin.com/post-inspector/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-center"
              >
                LinkedIn Inspector
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 