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

    // For better social media compatibility, we'll return an HTML page that renders as an image
    // This works better with social crawlers than pure SVG
    const html = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=1200, height=630">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            width: 1200px; 
            height: 630px; 
            background: linear-gradient(135deg, ${colors.background} 0%, ${theme === 'dark' ? '#111111' : '#f8f9fa'} 50%, ${colors.background} 100%);
            font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
            color: ${colors.title};
            position: relative;
            overflow: hidden;
            padding: 60px;
          }
          .bg-element { 
            position: absolute; 
            border-radius: 50%; 
            opacity: 0.03; 
            background: ${colors.accent}; 
          }
          .bg-1 { top: 90px; right: 250px; width: 240px; height: 240px; }
          .bg-2 { bottom: 130px; right: 100px; width: 400px; height: 400px; opacity: 0.02; }
          .bg-3 { top: 250px; left: 40px; width: 300px; height: 300px; opacity: 0.02; }
          .container {
            border: 1px solid ${colors.accent}10;
            border-radius: 24px;
            padding: 40px;
            height: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 1;
          }
          .brand { margin-bottom: 60px; }
          .brand-title { font-size: 28px; font-weight: 600; margin-bottom: 4px; }
          .brand-subtitle { font-size: 13px; color: ${colors.description}; }
          .content { display: flex; align-items: flex-start; margin-bottom: 40px; flex: 1; }
          .icon { 
            width: 64px; 
            height: 64px; 
            border-radius: 32px; 
            background: ${colors.accent}10; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            margin-right: 32px; 
            font-size: 36px; 
          }
          .text { flex: 1; }
          .title { font-size: 52px; font-weight: 700; line-height: 1.1; margin-bottom: 16px; letter-spacing: -0.02em; }
          .description { font-size: 22px; color: ${colors.description}; line-height: 1.4; opacity: 0.8; }
          .footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
          .badge { 
            background: ${colors.accent}08; 
            padding: 8px 16px; 
            border-radius: 16px; 
            font-size: 14px; 
            color: ${colors.accent}; 
            font-weight: 500; 
          }
          .url { font-size: 16px; color: ${colors.description}; font-family: 'SF Mono', Monaco, monospace; opacity: 0.7; }
          .accent { position: absolute; background: ${colors.accent}; opacity: 0.2; }
          .accent-1 { top: 60px; right: 60px; width: 48px; height: 2px; }
          .accent-2 { top: 60px; right: 156px; width: 2px; height: 48px; }
          .accent-3 { bottom: 60px; left: 60px; width: 48px; height: 2px; }
          .accent-4 { bottom: 60px; left: 156px; width: 2px; height: 48px; }
        </style>
      </head>
      <body>
        <div class="bg-element bg-1"></div>
        <div class="bg-element bg-2"></div>
        <div class="bg-element bg-3"></div>
        
        <div class="container">
          <div class="brand">
            <div class="brand-title">Perception</div>
            <div class="brand-subtitle">Real-Time Sentiment & Trend Intelligence for Bitcoin, Stablecoins & Tokenized Finance</div>
          </div>
          
          <div class="content">
            <div class="icon">${pageIcon}</div>
            <div class="text">
              <div class="title">${title.slice(0, 45).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
              <div class="description">${description.slice(0, 75).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            </div>
          </div>

          <div class="footer">
            <div class="badge">📊 Real-time Sentiment Intelligence</div>
            <div class="url">perception.to</div>
          </div>
        </div>

        <div class="accent accent-1"></div>
        <div class="accent accent-2"></div>
        <div class="accent accent-3"></div>
        <div class="accent accent-4"></div>
      </body>
    </html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Error generating image', { status: 500 });
  }
} 