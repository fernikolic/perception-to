import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface Position {
  title: string;
  department: string;
  location: string;
  type: string;
}

const openings: Position[] = [
  {
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Data Scientist',
    department: 'Analytics',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Technical Writer',
    department: 'Documentation',
    location: 'Remote',
    type: 'Contract',
  },
];

export function PositionsSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#F0EEE6]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">Open Positions</h2>
          <p className="mt-6 text-lg leading-8 text-black/60">
            Join our team and help shape the future of emerging finance intelligence.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-3xl divide-y divide-black/10">
          {openings.map((position) => (
            <div
              key={position.title}
              className="group flex items-center justify-between py-6"
            >
              <div>
                <h3 className="text-lg font-semibold text-black group-hover:text-orange-600">
                  {position.title}
                </h3>
                <div className="mt-2 flex gap-2">
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-600 text-xs font-semibold rounded-full">{position.department}</span>
                  <span className="px-3 py-1 bg-black/5 text-black/60 text-xs font-semibold rounded-full border border-black/10">{position.location}</span>
                  <span className="px-3 py-1 bg-black/5 text-black/60 text-xs font-semibold rounded-full border border-black/10">{position.type}</span>
                </div>
              </div>
              <Button className="bg-black text-white hover:bg-black/90 rounded-full px-6 group/button">
                Apply Now{' '}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}