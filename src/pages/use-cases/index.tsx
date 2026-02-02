import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { BookDemoButton } from '@/components/calendar-modal';
import { ArrowUpRight, BarChart3, Building2, Users, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';

// Hook to detect when element is in viewport
function useInView<T extends Element = HTMLDivElement>(threshold = 0.1) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Animated stat component with scroll trigger
function AnimatedStat({ value, suffix }: { value: number, suffix: string }) {
  const { ref, isInView } = useInView<HTMLSpanElement>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / 1500, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    const timeout = setTimeout(() => {
      animationFrame = requestAnimationFrame(animate);
    }, 100);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, value]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
}

const useCases = [
  {
    icon: BarChart3,
    title: 'Fund Analysts',
    description: 'The narrative moves before the price. See which stories are accelerating across 450+ sources and generate cited briefs for your investment committee.',
    href: '/use-cases/fund-analysts',
    stat: 'Updated every 90s',
  },
  {
    icon: Building2,
    title: 'IR & Communications',
    description: 'Know about coverage before your CEO asks. Track every mention, monitor competitors, and generate the weekly board brief automatically.',
    href: '/use-cases/ir-communications',
    stat: 'Real-time alerts',
  },
  {
    icon: Users,
    title: 'Family Offices',
    description: 'Stay informed on your digital asset allocation without reading 50 newsletters. One intelligence brief, once a week, with everything that matters.',
    href: '/use-cases/family-offices',
    stat: 'Weekly briefs',
  },
  {
    icon: Newspaper,
    title: 'Financial Journalists',
    description: 'Your competitors are watching the same feeds. See what stories are accelerating before they peak—research any company in minutes, not hours.',
    href: '/use-cases/journalists',
    stat: 'Full citations',
  },
];

export function UseCasesLanding() {
  return (
    <>
      <SEO
        title="Use Cases | Perception - Bitcoin Intelligence Platform"
        description="See how fund analysts, IR teams, family offices, and financial journalists use Perception to research digital asset companies faster. Intelligence from 450+ sources."
        url="https://perception.to/use-cases"
        keywords={['Bitcoin research', 'fund analyst tools', 'IR communications', 'Bitcoin family office', 'crypto journalism']}
      />

      <div className="min-h-screen bg-[#FAFAFA]">
        {/* Hero */}
        <section className="pt-28 pb-16 sm:pt-36 sm:pb-20 bg-white border-b border-black/5">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-5">
                <p className="text-sm font-medium text-black/40 mb-4 tracking-wide uppercase">Use cases</p>
                <h1 className="text-4xl sm:text-5xl font-medium tracking-tight text-black leading-[1.1] mb-6">
                  One platform. Four ways to use it.
                </h1>
                <p className="text-lg text-black/60 leading-relaxed mb-8">
                  Fund analysts use it for due diligence. IR teams use it for media monitoring. Family offices get weekly briefs. Journalists find stories first. Same data, different outcomes.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <BookDemoButton className="h-12 px-8 rounded-full" />
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-black/60 hover:text-black hover:bg-black/5 h-12 px-6 rounded-full font-medium"
                    asChild
                  >
                    <Link to="/sample-reports/stakeholder-communications">
                      See a sample report
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: Stacked cards with ASCII background */}
              <div className="lg:col-span-7">
                <div className="relative h-[400px] sm:h-[450px]">
                  {/* ASCII background */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-black">
                      <DelicateAsciiDots />
                    </div>
                    <div className="absolute inset-0 bg-black/40" />
                  </div>

                  {/* Floating cards */}
                  <div className="relative h-full p-6 sm:p-8">
                    {/* Top row */}
                    <div className="flex gap-4 mb-4">
                      {/* Fund Analysts card */}
                      <div className="flex-1 bg-gradient-to-br from-white to-zinc-100 rounded-2xl p-5 shadow-xl border border-white/20 group hover:scale-[1.02] transition-transform">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <span className="text-[10px] font-mono text-black/40 tracking-wider">01</span>
                            <h3 className="font-semibold text-black text-lg">Fund Analysts</h3>
                          </div>
                          <span className="text-4xl font-black text-black/10">FA</span>
                        </div>
                        <p className="text-sm text-black/60 leading-relaxed">Due diligence briefs with full citations</p>
                      </div>

                      {/* IR Teams card */}
                      <div className="flex-1 bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-5 shadow-xl border border-white/10 group hover:scale-[1.02] transition-transform">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <span className="text-[10px] font-mono text-white/40 tracking-wider">02</span>
                            <h3 className="font-semibold text-white text-lg">IR Teams</h3>
                          </div>
                          <span className="text-4xl font-black text-white/10">IR</span>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed">Real-time media monitoring & alerts</p>
                      </div>
                    </div>

                    {/* Center stat */}
                    <div className="flex justify-center my-5">
                      <div className="bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-sm rounded-full px-8 py-3 border border-white/10">
                        <span className="text-white font-medium text-sm tracking-wide">450+ sources <span className="text-white/40 mx-2">→</span> 1 platform</span>
                      </div>
                    </div>

                    {/* Bottom row */}
                    <div className="flex gap-4">
                      {/* Journalists card */}
                      <div className="flex-1 bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-5 shadow-xl border border-white/10 group hover:scale-[1.02] transition-transform">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <span className="text-[10px] font-mono text-white/40 tracking-wider">03</span>
                            <h3 className="font-semibold text-white text-lg">Journalists</h3>
                          </div>
                          <span className="text-4xl font-black text-white/10">FJ</span>
                        </div>
                        <p className="text-sm text-white/60 leading-relaxed">Find stories before they peak</p>
                      </div>

                      {/* Family Offices card */}
                      <div className="flex-1 bg-gradient-to-br from-white to-zinc-100 rounded-2xl p-5 shadow-xl border border-white/20 group hover:scale-[1.02] transition-transform">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <span className="text-[10px] font-mono text-black/40 tracking-wider">04</span>
                            <h3 className="font-semibold text-black text-lg">Family Offices</h3>
                          </div>
                          <span className="text-4xl font-black text-black/10">FO</span>
                        </div>
                        <p className="text-sm text-black/60 leading-relaxed">Weekly intelligence briefs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Fund Analysts */}
              <Link
                to="/use-cases/fund-analysts"
                className="group relative rounded-2xl bg-gradient-to-br from-white to-zinc-100 border border-black/[0.06] p-8 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-black/40 tracking-wider">01</span>
                    <h3 className="text-2xl font-semibold text-black">Fund Analysts</h3>
                  </div>
                  <span className="text-6xl font-black text-black/[0.06] group-hover:text-black/10 transition-colors">FA</span>
                </div>
                <p className="text-black/60 leading-relaxed mb-6 max-w-sm">
                  The narrative moves before the price. See which stories are accelerating across 450+ sources and generate cited briefs for your investment committee.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-600/70 bg-blue-500/10 px-3 py-1.5 rounded-full">Updated every 90s</span>
                  <div className="flex items-center gap-2 text-sm font-medium text-black group-hover:gap-3 transition-all">
                    Learn more
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>

              {/* IR Teams */}
              <Link
                to="/use-cases/ir-communications"
                className="group relative rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 tracking-wider">02</span>
                    <h3 className="text-2xl font-semibold text-white">IR & Communications</h3>
                  </div>
                  <span className="text-6xl font-black text-white/[0.06] group-hover:text-white/10 transition-colors">IR</span>
                </div>
                <p className="text-white/60 leading-relaxed mb-6 max-w-sm">
                  Know about coverage before your CEO asks. Track every mention, monitor competitors, and generate the weekly board brief automatically.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-emerald-400/90 bg-emerald-500/15 px-3 py-1.5 rounded-full">Real-time alerts</span>
                  <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                    Learn more
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>

              {/* Family Offices */}
              <Link
                to="/use-cases/family-offices"
                className="group relative rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 p-8 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-white/40 tracking-wider">03</span>
                    <h3 className="text-2xl font-semibold text-white">Family Offices</h3>
                  </div>
                  <span className="text-6xl font-black text-white/[0.06] group-hover:text-white/10 transition-colors">FO</span>
                </div>
                <p className="text-white/60 leading-relaxed mb-6 max-w-sm">
                  Stay informed on your digital asset allocation without reading 50 newsletters. One intelligence brief, once a week, with everything that matters.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-violet-400/90 bg-violet-500/15 px-3 py-1.5 rounded-full">Weekly briefs</span>
                  <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
                    Learn more
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>

              {/* Journalists */}
              <Link
                to="/use-cases/journalists"
                className="group relative rounded-2xl bg-gradient-to-br from-white to-zinc-100 border border-black/[0.06] p-8 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="text-[10px] font-mono text-black/40 tracking-wider">04</span>
                    <h3 className="text-2xl font-semibold text-black">Financial Journalists</h3>
                  </div>
                  <span className="text-6xl font-black text-black/[0.06] group-hover:text-black/10 transition-colors">FJ</span>
                </div>
                <p className="text-black/60 leading-relaxed mb-6 max-w-sm">
                  Your competitors are watching the same feeds. See what stories are accelerating before they peak—research any company in minutes, not hours.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-amber-600/70 bg-amber-500/10 px-3 py-1.5 rounded-full">Full citations</span>
                  <div className="flex items-center gap-2 text-sm font-medium text-black group-hover:gap-3 transition-all">
                    Learn more
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-black">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-white tracking-tight"><AnimatedStat value={450} suffix="+" /></p>
                <p className="text-sm text-white/40 mt-3">Sources tracked</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-white tracking-tight"><AnimatedStat value={90} suffix="s" /></p>
                <p className="text-sm text-white/40 mt-3">Update frequency</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-white tracking-tight"><AnimatedStat value={2} suffix="M+" /></p>
                <p className="text-sm text-white/40 mt-3">Articles indexed</p>
              </div>
              <div className="text-center">
                <p className="text-5xl sm:text-6xl font-semibold text-white tracking-tight">24/7</p>
                <p className="text-sm text-white/40 mt-3">Coverage</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 sm:py-32 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="rounded-2xl bg-black p-12 sm:p-16">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white mb-5">
                  See it with your data
                </h2>
                <p className="text-lg text-white/60 mb-8">
                  15-minute demo. Tell us what you're tracking and we'll show you the narrative.
                </p>
                <BookDemoButton
                  variant="outline"
                  className="h-12 px-8 rounded-full"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default UseCasesLanding;
