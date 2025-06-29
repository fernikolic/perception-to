import { Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = [
  {
    Icon: () => (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: 'https://x.com/BTCPerception',
    label: 'X (Twitter)'
  },
  { 
    Icon: Linkedin, 
    href: 'https://www.linkedin.com/company/bitcoinperception/', 
    label: 'LinkedIn' 
  },
];

export function FooterSocial() {
  return (
    <div className="flex space-x-4">
      {socialLinks.map(({ Icon, href, label }) => (
        <Button
          key={label}
          variant="ghost"
          size="icon"
          asChild
          className="text-white/60 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-200"
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <Icon className="h-4 w-4" />
          </a>
        </Button>
      ))}
    </div>
  );
}