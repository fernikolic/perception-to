import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon, CheckCircle, AlertTriangle, Lightbulb, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

// =============================================================================
// SECTION - Main content section with ID for anchor links
// =============================================================================
interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, title, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("mb-12 sm:mb-16 scroll-mt-24", className)}>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight text-black mb-4 sm:mb-6">
        {title}
      </h2>
      {children}
    </section>
  );
}

// =============================================================================
// PARAGRAPH - Standard body text
// =============================================================================
interface ParagraphProps {
  children: ReactNode;
  className?: string;
}

export function Paragraph({ children, className }: ParagraphProps) {
  return (
    <p className={cn("text-base sm:text-lg leading-relaxed text-black/70 mb-4 sm:mb-6", className)}>
      {children}
    </p>
  );
}

// =============================================================================
// CALLOUT - Highlighted info/warning/tip boxes (subtle, not colorful)
// =============================================================================
type CalloutType = 'insight' | 'warning' | 'tip' | 'info';

const calloutStyles: Record<CalloutType, { iconBg: string; iconColor: string }> = {
  insight: { iconBg: 'bg-orange-500', iconColor: 'text-white' },
  warning: { iconBg: 'bg-yellow-500', iconColor: 'text-white' },
  tip: { iconBg: 'bg-black', iconColor: 'text-white' },
  info: { iconBg: 'bg-black/10', iconColor: 'text-black' },
};

const calloutIcons: Record<CalloutType, LucideIcon> = {
  insight: Lightbulb,
  warning: AlertTriangle,
  tip: Info,
  info: Info,
};

interface CalloutProps {
  type: CalloutType;
  title: string;
  children: ReactNode;
}

export function Callout({ type, title, children }: CalloutProps) {
  const Icon = calloutIcons[type];
  const styles = calloutStyles[type];

  return (
    <div className="rounded-2xl p-5 sm:p-6 my-6 sm:my-8 bg-white border border-black/10">
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center", styles.iconBg)}>
          <Icon className={cn("w-4 h-4 sm:w-5 sm:h-5", styles.iconColor)} />
        </div>
        <h3 className="font-semibold text-sm sm:text-base text-black">{title}</h3>
      </div>
      <div className="text-sm sm:text-base text-black/70 pl-11 sm:pl-13">
        {children}
      </div>
    </div>
  );
}

// =============================================================================
// INFO CARD - Clean white card
// =============================================================================
interface InfoCardProps {
  title: string;
  icon?: LucideIcon;
  gradient?: string;
  children: ReactNode;
  className?: string;
}

export function InfoCard({ title, icon: Icon, children, className }: InfoCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 bg-white border border-black/10 hover:border-black/20 hover:shadow-lg",
        className
      )}
    >
      {Icon && (
        <div className="text-black/40 mb-3 sm:mb-4">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
      )}
      <h4 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-black">
        {title}
      </h4>
      <div className="text-sm sm:text-base text-black/70">{children}</div>
    </div>
  );
}

// =============================================================================
// CARD GRID - Grid layout for InfoCards
// =============================================================================
interface CardGridProps {
  columns?: 2 | 3 | 4;
  children: ReactNode;
  className?: string;
}

export function CardGrid({ columns = 2, children, className }: CardGridProps) {
  const colClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn("grid gap-4 sm:gap-6 my-6 sm:my-8", colClasses[columns], className)}>
      {children}
    </div>
  );
}

// =============================================================================
// STEP LIST - Numbered steps
// =============================================================================
interface Step {
  title: string;
  description: string;
}

interface StepListProps {
  steps: Step[];
  accentColor?: string;
}

export function StepList({ steps, accentColor = 'bg-black' }: StepListProps) {
  return (
    <ol className="space-y-4 sm:space-y-6 my-6 sm:my-8">
      {steps.map((step, index) => (
        <li key={index} className="flex gap-3 sm:gap-4">
          <span
            className={cn(
              "flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm text-white",
              accentColor
            )}
          >
            {index + 1}
          </span>
          <div className="pt-0.5">
            <strong className="text-black text-sm sm:text-base">{step.title}</strong>
            <p className="mt-1 text-sm sm:text-base text-black/70">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

// =============================================================================
// BULLET LIST - Styled bullet list
// =============================================================================
interface BulletListProps {
  items: (string | ReactNode)[];
  className?: string;
}

export function BulletList({ items, className }: BulletListProps) {
  return (
    <ul className={cn("space-y-2 sm:space-y-3 my-4 sm:my-6", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-black/70">
          <div className="h-1.5 w-1.5 rounded-full bg-black/40 mt-2 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// =============================================================================
// CHECK LIST - List with checkmarks
// =============================================================================
interface CheckListProps {
  items: (string | ReactNode)[];
  className?: string;
}

export function CheckList({ items, className }: CheckListProps) {
  return (
    <ul className={cn("space-y-2 sm:space-y-3 my-4 sm:my-6", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-black/70">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-black/40 mt-0.5 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// =============================================================================
// SCORE CARD - For displaying Fear & Greed score ranges (minimal color)
// =============================================================================
interface ScoreCardProps {
  range: string;
  label: string;
  icon?: LucideIcon;
  color: 'red' | 'orange' | 'slate' | 'lime' | 'green';
  description: string;
  note?: string;
}

const scoreRangeBgColors = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  slate: 'bg-slate-500',
  lime: 'bg-lime-500',
  green: 'bg-green-500',
};

export function ScoreCard({ range, label, icon: Icon, color, description, note }: ScoreCardProps) {
  return (
    <div className="rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 bg-white border border-black/10 hover:border-black/20 hover:shadow-lg">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className={cn("w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0", scoreRangeBgColors[color])}>
          {range}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-black/40" />}
            <h4 className="text-base sm:text-lg font-semibold text-black">{label}</h4>
          </div>
          <p className="text-sm sm:text-base text-black/70 mb-2 sm:mb-3">
            {description}
          </p>
          {note && (
            <div className="rounded-lg p-2 sm:p-3 bg-black/5">
              <p className="text-xs sm:text-sm text-black/60">{note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// COMPARISON GRID - Side by side comparison (minimal color)
// =============================================================================
interface ComparisonItem {
  title: string;
  items: string[];
}

interface ComparisonGridProps {
  left: ComparisonItem;
  right: ComparisonItem;
  leftColor?: 'green' | 'blue';
  rightColor?: 'red' | 'orange';
}

export function ComparisonGrid({ left, right }: ComparisonGridProps) {
  return (
    <div className="grid sm:grid-cols-2 gap-4 my-6 sm:my-8">
      <div className="rounded-2xl p-5 bg-white border border-black/10">
        <h4 className="font-semibold mb-3 text-sm sm:text-base text-black flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-black/40" />
          {left.title}
        </h4>
        <ul className="text-sm space-y-1.5 text-black/70">
          {left.items.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>
      <div className="rounded-2xl p-5 bg-white border border-black/10">
        <h4 className="font-semibold mb-3 text-sm sm:text-base text-black flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-black/40" />
          {right.title}
        </h4>
        <ul className="text-sm space-y-1.5 text-black/70">
          {right.items.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// =============================================================================
// PHASE CARD - For market cycle phases (minimal color)
// =============================================================================
interface PhaseCardProps {
  number: number;
  title: string;
  description: string;
  signal?: string;
  color: 'slate' | 'blue' | 'green' | 'lime' | 'yellow' | 'orange' | 'red';
  icon?: LucideIcon;
}

export function PhaseCard({ number, title, description, signal, icon: Icon }: PhaseCardProps) {
  return (
    <div className="rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5 bg-white border border-black/10 hover:border-black/20 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-2 sm:mb-3">
        <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm text-white bg-black">
          {number}
        </span>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-black/40" />}
          <h4 className="font-semibold text-sm sm:text-base text-black">
            {title}
          </h4>
        </div>
      </div>
      <p className="text-sm text-black/70 mb-2 pl-10 sm:pl-11">
        {description}
      </p>
      {signal && (
        <p className="text-xs text-black/50 pl-10 sm:pl-11">
          <strong className="text-black/70">Signal:</strong> {signal}
        </p>
      )}
    </div>
  );
}

// =============================================================================
// STRATEGY CARD - For trading strategies (minimal color)
// =============================================================================
interface StrategyCardProps {
  title: string;
  icon: LucideIcon;
  color: 'green' | 'blue' | 'purple' | 'orange';
  description: string;
  children?: ReactNode;
}

export function StrategyCard({ title, icon: Icon, description, children }: StrategyCardProps) {
  return (
    <div className="rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 bg-white border border-black/10 hover:border-black/20 hover:shadow-lg">
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-black">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h4 className="text-lg sm:text-xl font-semibold text-black">
          {title}
        </h4>
      </div>
      <p className="text-sm sm:text-base text-black/70 mb-4 sm:mb-5">
        {description}
      </p>
      {children && <div className="text-black/70">{children}</div>}
    </div>
  );
}

// =============================================================================
// FAQ ITEM - For FAQ sections
// =============================================================================
interface FAQItemProps {
  question: string;
  children: ReactNode;
}

export function FAQItem({ question, children }: FAQItemProps) {
  return (
    <div className="rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 bg-white border border-black/10 hover:border-black/20 hover:shadow-lg">
      <h3 className="font-semibold text-black mb-2 sm:mb-3 text-base sm:text-lg">
        {question}
      </h3>
      <div className="text-sm sm:text-base text-black/70">
        {children}
      </div>
    </div>
  );
}

// =============================================================================
// INTERNAL LINK - Styled link to other pages
// =============================================================================
interface InternalLinkProps {
  to: string;
  children: ReactNode;
}

export function InternalLink({ to, children }: InternalLinkProps) {
  return (
    <Link to={to} className="text-orange-600 hover:text-orange-700 hover:underline transition-colors">
      {children}
    </Link>
  );
}

// =============================================================================
// STACK - Vertical spacing utility
// =============================================================================
interface StackProps {
  gap?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  className?: string;
}

export function Stack({ gap = 'md', children, className }: StackProps) {
  const gapClasses = {
    sm: 'space-y-3 sm:space-y-4',
    md: 'space-y-4 sm:space-y-6',
    lg: 'space-y-6 sm:space-y-8',
  };

  return <div className={cn(gapClasses[gap], className)}>{children}</div>;
}
