import { ImageResponse } from '@vercel/og';

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
    const title = searchParams.get('title') || 'Bitcoin Perception';
    const description = searchParams.get('description') || 'AI-powered Bitcoin sentiment analysis';
    const path = searchParams.get('path') || '/';
    const theme = searchParams.get('theme') || 'dark';

    const pageIcon = PAGE_ICONS[path] || '📊';
    
    const colors = theme === 'dark' ? {
      background: '#0a0a0a',
      gradient: '#1a1a1a',
      title: '#ffffff',
      description: '#a1a1aa',
      accent: '#f97316', // Bitcoin orange
      secondary: '#facc15' // Bitcoin yellow
    } : {
      background: '#ffffff', 
      gradient: '#f8f9fa',
      title: '#1a1a1a',
      description: '#52525b',
      accent: '#f97316',
      secondary: '#facc15'
    };

    return new ImageResponse(
      (
        <div
          style={{
            background: `linear-gradient(135deg, ${colors.background} 0%, ${theme === 'dark' ? '#111111' : '#f8f9fa'} 50%, ${colors.background} 100%)`,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '60px',
            color: colors.title,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle background elements */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              backgroundImage: `radial-gradient(circle at 79% 24%, ${colors.accent}03 0%, transparent 50%), radial-gradient(circle at 92% 79%, ${colors.accent}02 0%, transparent 50%), radial-gradient(circle at 8% 63%, ${colors.accent}02 0%, transparent 50%)`,
            }}
          />

          {/* Main content container */}
          <div style={{
            border: `1px solid ${colors.accent}10`,
            borderRadius: '24px',
            padding: '40px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 1
          }}>
            
            {/* Logo/Branding */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '60px' }}>
              <div>
                <div style={{ 
                  fontSize: '28px', 
                  fontWeight: '600',
                  color: colors.title,
                  lineHeight: 1,
                  marginBottom: '4px'
                }}>
                  Perception
                </div>
                <div style={{ 
                  fontSize: '13px', 
                  color: colors.description,
                  fontWeight: '400'
                }}>
                  Real-Time Sentiment & Trend Intelligence for Bitcoin, Stablecoins & Tokenized Finance
                </div>
              </div>
            </div>
            
            {/* Page Content */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              marginBottom: '40px',
              flex: 1
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '32px',
                background: `${colors.accent}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '32px',
                fontSize: '36px'
              }}>
                {pageIcon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontSize: '52px', 
                  fontWeight: '700', 
                  color: colors.title,
                  lineHeight: 1.1,
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}>
                  {title.slice(0, 45)}
                </div>
                <div style={{ 
                  fontSize: '22px', 
                  color: colors.description,
                  lineHeight: 1.4,
                  opacity: 0.8,
                  fontWeight: '400'
                }}>
                  {description.slice(0, 75)}
                </div>
              </div>
            </div>

            {/* Bottom section */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 'auto'
            }}>
              <div style={{
                background: `${colors.accent}08`,
                padding: '8px 16px',
                borderRadius: '16px',
                fontSize: '14px',
                color: colors.accent,
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center'
              }}>
                📊 Real-time Bitcoin Sentiment
              </div>
              <div style={{
                fontSize: '16px',
                color: colors.description,
                fontWeight: '500',
                fontFamily: 'SF Mono, Monaco, monospace',
                opacity: 0.7
              }}>
                perception.to
              </div>
            </div>
          </div>

          {/* Corner accents */}
          <div style={{
            position: 'absolute',
            top: '60px',
            right: '60px',
            width: '48px',
            height: '2px',
            background: colors.accent,
            opacity: 0.2,
            borderRadius: '1px'
          }} />
          <div style={{
            position: 'absolute',
            top: '60px',
            right: '156px',
            width: '2px',
            height: '48px',
            background: colors.accent,
            opacity: 0.2,
            borderRadius: '1px'
          }} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    return new Response(`Failed to generate image: ${error.message}`, {
      status: 500,
    });
  }
} 