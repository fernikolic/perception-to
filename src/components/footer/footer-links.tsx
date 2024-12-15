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
      { label: 'Roadmap', href: '/roadmap', comingSoon: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about', comingSoon: true },
      { 
        label: 'Bitcoin Media Research', 
        href: 'https://bitcoinperception.com',
        className: 'text-orange-500 hover:text-orange-600'
      },
      { label: 'Careers', href: '/careers', comingSoon: true },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs', comingSoon: true },
      { label: 'API Reference', href: '/api', comingSoon: true },
      { label: 'Methodology', href: '/methodology' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

export function FooterLinks() {
  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
      {footerSections.map((section) => (
        <div key={section.title}>
          <h3 className="text-sm font-semibold">{section.title}</h3>
          <ul className="mt-6 space-y-4">
            {section.links.map((link) => (
              <li key={link.label}>
                {link.comingSoon ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground cursor-not-allowed">
                      {link.label}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                      Coming soon
                    </span>
                  </div>
                ) : (
                  <a
                    href={link.href}
                    className={`text-sm text-muted-foreground transition-colors hover:text-primary ${link.className || ''}`}
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