// Note: @vercel/og is not compatible with Cloudflare Workers
// We'll create a simple SVG-based approach instead

const PAGE_ICONS = {
  '/': '📊',
  '/methodology': '🔬',
  '/journalist': '📰', 
  '/investor': '📈',
  '/researcher': '🎓',
  '/about': '🏢',
  '/pricing': '💰',
  '/docs': '📚',
  '/api': '⚡',
  '/learn': '🎯',
  '/careers': '💼',
  '/press': '📢',
  '/announcements': '📣',
  '/roadmap': '🗺️',
  '/privacy': '🔒',
  '/terms': '📄',
  '/testimonials': '⭐'
};

export async function onRequest(context) {
  try {
    const { request } = context;
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title') || 'Perception';
    const description = searchParams.get('description') || 'Real-Time Sentiment & Trend Intelligence for Bitcoin, Stablecoins & Tokenized Finance';
    const path = searchParams.get('path') || '/';
    const theme = searchParams.get('theme') || 'dark';

    const pageIcon = PAGE_ICONS[path] || '📊';
    
    const colors = theme === 'dark' ? {
      background: '#0a0a0a',
      gradient: '#1a1a1a',
      title: '#ffffff',
      description: '#a1a1aa',
      accent: '#f97316'
    } : {
      background: '#ffffff', 
      gradient: '#f8f9fa',
      title: '#1a1a1a',
      description: '#52525b',
      accent: '#f97316'
    };

    // Generate SVG-based social image for Cloudflare Workers
    const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${colors.background};stop-opacity:1" />
          <stop offset="50%" style="stop-color:${theme === 'dark' ? '#111111' : '#f8f9fa'};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${colors.background};stop-opacity:1" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bgGradient)" />
      
      <!-- Subtle background elements -->
      <circle cx="950" cy="150" r="120" fill="${colors.accent}" opacity="0.03" />
      <circle cx="1100" cy="500" r="200" fill="${colors.accent}" opacity="0.02" />
      <circle cx="100" cy="400" r="150" fill="${colors.accent}" opacity="0.02" />
      
      <!-- Main content container -->
      <rect x="60" y="60" width="1080" height="510" rx="24" fill="none" stroke="${colors.accent}" stroke-width="1" opacity="0.1" />
      
      <!-- Branding -->
      <text x="100" y="140" font-family="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif" font-size="28" font-weight="600" fill="${colors.title}">Perception</text>
      <text x="100" y="160" font-family="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="400" fill="${colors.description}">Real-Time Sentiment &amp; Trend Intelligence for Bitcoin, Stablecoins &amp; Tokenized Finance</text>
      
      <!-- Page icon -->
      <circle cx="132" cy="220" r="32" fill="${colors.accent}" opacity="0.1" />
      <text x="132" y="230" font-family="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif" font-size="36" text-anchor="middle" fill="${colors.accent}">${pageIcon}</text>
      
      <!-- Title -->
      <text x="200" y="240" font-family="SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif" font-size="52" font-weight="700" fill="${colors.title}">
        ${title.slice(0, 45).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
      </text>
      
      <!-- Description -->
      <text x="200" y="285" font-family="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif" font-size="22" font-weight="400" fill="${colors.description}" opacity="0.8">
        ${description.slice(0, 75).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
      </text>
      
      <!-- Bottom section -->
      <rect x="100" y="520" width="280" height="32" rx="16" fill="${colors.accent}" opacity="0.08" />
      <text x="112" y="541" font-family="SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="500" fill="${colors.accent}">📊 Real-time Sentiment Intelligence</text>
      
      <text x="1000" y="541" font-family="SF Mono, Monaco, monospace" font-size="16" font-weight="500" fill="${colors.description}" opacity="0.7">perception.to</text>
      
      <!-- Corner accents -->
      <rect x="1140" y="60" width="48" height="2" fill="${colors.accent}" opacity="0.2" rx="1" />
      <rect x="1186" y="60" width="2" height="48" fill="${colors.accent}" opacity="0.2" rx="1" />
      <rect x="60" y="568" width="48" height="2" fill="${colors.accent}" opacity="0.2" rx="1" />
      <rect x="60" y="522" width="2" height="48" fill="${colors.accent}" opacity="0.2" rx="1" />
    </svg>`;

    return new Response(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
} 