import { FooterLinks } from './footer-links';
import { FooterSocial } from './footer-social';
import { Logo } from '@/components/ui/logo';
import { useRef, useState } from 'react';

export function Footer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLDivElement>(null);

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
          <p className="mt-4 max-w-md text-sm text-white/60">
            Cut through crypto media chaos. Perception aggregates intelligence from 200+ sources into one professional dashboard, saving you hours daily while keeping you ahead of breaking narratives.
          </p>
        </div>
        
        <FooterLinks />
        
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