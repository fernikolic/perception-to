import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const sections = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '#introduction' },
      { title: 'Quick Start', href: '#quick-start' },
      { title: 'Installation', href: '#installation' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Authentication', href: '#authentication' },
      { title: 'Authorization', href: '#authorization' },
      { title: 'Data Model', href: '#data-model' },
    ],
  },
  // Add more sections as needed
];

export function DocSidebar() {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)] w-64 border-r">
      <div className="p-4">
        {sections.map((section) => (
          <div key={section.title} className="mb-6">
            <h4 className="mb-2 text-sm font-semibold">{section.title}</h4>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <a href={item.href}>{item.title}</a>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}