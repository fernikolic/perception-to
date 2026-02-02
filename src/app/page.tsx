import { Hero } from '@/components/hero';
import { ProblemSolution } from '@/components/problem-solution';
import { PersonaCards } from '@/components/persona-cards';
import { ValueProps } from '@/components/value-props';
import { EarningsSection } from '@/components/earnings-section';
import { HowItWorks } from '@/components/how-it-works';
import { FinalCTA } from '@/components/final-cta';
import SEO from '@/components/SEO';

export default function Home() {
  return (
    <>
      <SEO
        title="Perception | Board Updates, Investor Briefs, Competitive Intel"
        description="Board updates, investor briefs, and competitive intel ready in minutes. Advanced sentiment analysis, earnings insights, and cited intelligence briefs from 450+ sources."
        url="https://perception.to"
        keywords={['digital asset intelligence', 'crypto sentiment analysis', 'stablecoin research', 'tokenized finance', 'Bitcoin company analysis', 'crypto media monitoring', 'board updates', 'investor briefs', 'competitive intel']}
      />
      <main className="relative">
        <Hero />
        <ProblemSolution />
        <PersonaCards />
        <ValueProps />
        <EarningsSection />
        <HowItWorks />
        <FinalCTA />
      </main>
    </>
  );
}
