import { FooterLinks } from './footer-links';
import { FooterSocial } from './footer-social';
import { Logo } from '@/components/ui/logo';
import { useRef, useState, useEffect } from 'react';

export function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLDivElement>(null);
  const ghostFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ghostFormRef.current) {
      // Remove any previous script
      ghostFormRef.current.innerHTML = '';
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/ghost/signup-form@~0.2/umd/signup-form.min.js';
      script.async = true;
      script.setAttribute('data-button-color', '#000000');
      script.setAttribute('data-button-text-color', '#FFFFFF');
      script.setAttribute('data-site', 'https://bitcoinperception.com/');
      script.setAttribute('data-locale', 'en');
      ghostFormRef.current.appendChild(script);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-black border-t border-white/10 relative isolate overflow-hidden" 
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Gradient Background */}
      <div 
        className="absolute inset-0 -z-10 transition-opacity duration-300"
        style={{
          background: `
            radial-gradient(
              1200px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(255,255,255,0.1),
              transparent 40%
            )
          `,
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-12">
          <a href="/" className="flex items-center gap-2">
            <Logo white={true} />
            <span className="text-2xl font-bold text-white">Perception</span>
          </a>
        </div>
        
        <FooterLinks />
        
        {/* Newsletter Signup */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold !text-white text-white mb-2">Stay Updated</h3>
            <p className="text-sm !text-white/60 text-white/60 mb-4">
              Unlock Insights Into Bitcoin Media Trends & Bias 📈
            </p>
            <div
              ref={ghostFormRef}
              style={{ minHeight: '58px', maxWidth: '440px', margin: '0 auto', width: '100%' }}
            />
          </div>
        </div>
        
        <div className="mt-12 flex flex-col items-center justify-between border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Perception. All rights reserved.
          </p>
          <FooterSocial />
        </div>
      </div>
    </footer>
  );
}