import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { ProblemSolution } from '@/components/problem-solution';
import { ValueProps } from '@/components/value-props';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <ProblemSolution />
      <ValueProps />
      <Features />
    </main>
  );
} 