import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { PainPoints } from '@/components/pain-points';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <PainPoints />
      <Features />
    </main>
  );
} 