interface FooterLink {
  label: string;
  href: string;
  comingSoon?: boolean;
  className?: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Book a Demo', href: '/book-a-call' },
      { label: 'Methodology', href: '/methodology' },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        label: 'Bitcoin Media Research',
        href: '/bitcoin-media-research',
        className: 'text-orange-500 hover:text-orange-600'
      },
      { label: 'Bitcoin Fear & Greed Index', href: '/bitcoin-fear-greed-index' },
      { label: 'Bitcoin Market Sentiment', href: '/bitcoin-market-sentiment' },
      { label: 'Bitcoin Influence Index', href: '/bitcoin-social-media-sentiment-leaderboard' },
      { label: 'Learn Hub', href: '/learn' },
      { label: 'Compare Tools', href: '/compare/best-crypto-sentiment-tools' },
    ],
  },
  {
    title: 'Developer',
    links: [
      { label: 'Documentation', href: '/documentation' },
      { label: 'API Reference', href: '/api', comingSoon: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Press', href: '/press' },
      { label: 'Advisory', href: '/advisory', comingSoon: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export function FooterLinks() {
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
      {footerSections.map((section) => (
        <div key={section.title}>
          <h3 className="text-sm font-semibold !text-white text-white">{section.title}</h3>
          <ul className="mt-6 space-y-4">
            {section.links.map((link) => (
              <li key={link.label}>
                {link.comingSoon ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm !text-white/40 text-white/40 cursor-not-allowed">
                      {link.label}
                    </span>
                    <span className="inline-flex items-center rounded-md bg-white/10 px-1.5 py-0.5 text-[10px] font-medium !text-white/60 text-white/60">
                      Coming soon
                    </span>
                  </div>
                ) : (
                  <a
                    href={link.href}
                    className={`text-sm !text-white/60 text-white/60 transition-colors hover:!text-white hover:text-white ${link.className || ''}`}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}