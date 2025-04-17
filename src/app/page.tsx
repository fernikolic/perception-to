import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { ProblemSolution } from '@/components/problem-solution';

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <ProblemSolution />
      <Features />
    </main>
  );
} 