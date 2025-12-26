import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, Zap, Heart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: Zap,
    title: 'Move Fast',
    description: 'We believe in rapid iteration and continuous deployment. Every team member has the autonomy to make decisions and drive impact.',
  },
  {
    icon: Users,
    title: 'Collaborate',
    description: 'Success comes from diverse perspectives. We foster an environment where every voice is heard and valued.',
  },
  {
    icon: Building2,
    title: 'Build at Scale',
    description: 'We are tackling complex challenges in the crypto space. Our solutions need to be robust, scalable, and innovative.',
  },
  {
    icon: Heart,
    title: 'User First',
    description: 'Everything we build starts with understanding our users needs. Their success is our success.',
  },
];

export function ValuesSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#F0EEE6]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-black">Our Values</h2>
          <p className="mt-6 text-lg leading-8 text-black/60">
            These core principles guide everything we do and help us create an environment
            where great work happens.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg gap-8 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="group relative overflow-hidden bg-white/50 border border-black/10 rounded-2xl p-6 hover:bg-white transition-all duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/20 ring-1 ring-orange-500/30">
                <value.icon className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-black">{value.title}</h3>
              <p className="text-black/60">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}