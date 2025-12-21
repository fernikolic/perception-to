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
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4 sm:mb-6">
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
    <p className={cn("text-base sm:text-lg leading-relaxed text-muted-foreground mb-4 sm:mb-6", className)}>
      {children}
    </p>
  );
}

// =============================================================================
// CALLOUT - Highlighted info/warning/tip boxes
// =============================================================================
type CalloutType = 'insight' | 'warning' | 'tip' | 'info';

const calloutGradients: Record<CalloutType, string> = {
  insight: 'from-orange-500/15 via-slate-600/10 to-zinc-700/15 hover:from-orange-500/20',
  warning: 'from-yellow-500/15 via-slate-600/10 to-zinc-700/15 hover:from-yellow-500/20',
  tip: 'from-blue-500/15 via-slate-600/10 to-zinc-700/15 hover:from-blue-500/20',
  info: 'from-slate-500/15 via-slate-600/10 to-zinc-700/15 hover:from-slate-500/20',
};

const calloutIconColors: Record<CalloutType, string> = {
  insight: 'from-orange-500 to-orange-600',
  warning: 'from-yellow-500 to-yellow-600',
  tip: 'from-blue-500 to-blue-600',
  info: 'from-slate-500 to-slate-600',
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

  return (
    <div className={cn(
      "group relative rounded-xl sm:rounded-2xl p-5 sm:p-6 my-6 sm:my-8 transition-all duration-300",
      "bg-gradient-to-br border border-white/10",
      calloutGradients[type]
    )}>
      <div className="flex items-center gap-3 mb-3">
        <div className={cn("w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shadow-lg bg-gradient-to-br", calloutIconColors[type])}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <h3 className="font-bold text-sm sm:text-base bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">{title}</h3>
      </div>
      <div className="text-sm sm:text-base text-muted-foreground pl-11 sm:pl-13">
        {children}
      </div>
    </div>
  );
}

// =============================================================================
// INFO CARD - Card with gradient background like ValuePropSection
// =============================================================================
interface InfoCardProps {
  title: string;
  icon?: LucideIcon;
  gradient?: string;
  children: ReactNode;
  className?: string;
}

export function InfoCard({ title, icon: Icon, gradient, children, className }: InfoCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1",
        "bg-gradient-to-br border border-white/10",
        "hover:shadow-lg hover:shadow-white/5",
        gradient || 'from-blue-500/10 via-slate-600/10 to-zinc-700/15 hover:from-blue-500/15 hover:to-zinc-700/20 dark:from-slate-900/50 dark:via-slate-800/40 dark:to-slate-900/50',
        className
      )}
    >
      {Icon && (
        <div className="text-muted-foreground/50 mb-3 sm:mb-4">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
        </div>
      )}
      <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
        {title}
      </h4>
      <div className="text-sm sm:text-base text-muted-foreground">{children}</div>
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
// STEP LIST - Numbered steps like FeatureSection
// =============================================================================
interface Step {
  title: string;
  description: string;
}

interface StepListProps {
  steps: Step[];
  accentColor?: string;
}

export function StepList({ steps, accentColor = 'bg-orange-500' }: StepListProps) {
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
            <strong className="text-foreground text-sm sm:text-base">{step.title}</strong>
            <p className="mt-1 text-sm sm:text-base text-muted-foreground">{step.description}</p>
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
        <li key={index} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground">
          <div className="h-1.5 w-1.5 rounded-full bg-orange-500/70 mt-2 flex-shrink-0" />
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
        <li key={index} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-muted-foreground">
          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mt-0.5 flex-shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

// =============================================================================
// SCORE CARD - For displaying Fear & Greed score ranges
// =============================================================================
interface ScoreCardProps {
  range: string;
  label: string;
  icon?: LucideIcon;
  color: 'red' | 'orange' | 'slate' | 'lime' | 'green';
  description: string;
  note?: string;
}

const scoreColorStyles = {
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    rangeBg: 'bg-red-500',
    labelColor: 'text-red-800 dark:text-red-200',
    textColor: 'text-red-700 dark:text-red-300',
    noteBg: 'bg-red-100 dark:bg-red-900/40',
    noteColor: 'text-red-800 dark:text-red-300',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-800',
    rangeBg: 'bg-orange-500',
    labelColor: 'text-orange-800 dark:text-orange-200',
    textColor: 'text-orange-700 dark:text-orange-300',
    noteBg: 'bg-orange-100 dark:bg-orange-900/40',
    noteColor: 'text-orange-800 dark:text-orange-300',
  },
  slate: {
    bg: 'bg-slate-100 dark:bg-slate-800',
    border: 'border-slate-200 dark:border-slate-700',
    rangeBg: 'bg-slate-500',
    labelColor: 'text-slate-800 dark:text-slate-200',
    textColor: 'text-slate-600 dark:text-slate-400',
    noteBg: 'bg-slate-200 dark:bg-slate-700',
    noteColor: 'text-slate-700 dark:text-slate-300',
  },
  lime: {
    bg: 'bg-lime-50 dark:bg-lime-900/20',
    border: 'border-lime-200 dark:border-lime-800',
    rangeBg: 'bg-lime-500',
    labelColor: 'text-lime-800 dark:text-lime-200',
    textColor: 'text-lime-700 dark:text-lime-300',
    noteBg: 'bg-lime-100 dark:bg-lime-900/40',
    noteColor: 'text-lime-800 dark:text-lime-300',
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    rangeBg: 'bg-green-500',
    labelColor: 'text-green-800 dark:text-green-200',
    textColor: 'text-green-700 dark:text-green-300',
    noteBg: 'bg-green-100 dark:bg-green-900/40',
    noteColor: 'text-green-800 dark:text-green-300',
  },
};

const scoreGradients = {
  red: 'from-red-500/15 via-slate-600/10 to-zinc-700/15 hover:from-red-500/25',
  orange: 'from-orange-500/15 via-slate-600/10 to-zinc-700/15 hover:from-orange-500/25',
  slate: 'from-slate-500/15 via-slate-600/10 to-zinc-700/15 hover:from-slate-500/25',
  lime: 'from-lime-500/15 via-slate-600/10 to-zinc-700/15 hover:from-lime-500/25',
  green: 'from-green-500/15 via-slate-600/10 to-zinc-700/15 hover:from-green-500/25',
};

export function ScoreCard({ range, label, icon: Icon, color, description, note }: ScoreCardProps) {
  const styles = scoreColorStyles[color];

  return (
    <div className={cn(
      "group relative rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1",
      "bg-gradient-to-br border border-white/10 hover:shadow-lg hover:shadow-white/5",
      scoreGradients[color]
    )}>
      <div className="flex items-start gap-3 sm:gap-4">
        <div className={cn("w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0 shadow-lg", styles.rangeBg)}>
          {range}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            {Icon && <Icon className={cn("w-4 h-4 sm:w-5 sm:h-5", styles.labelColor)} />}
            <h4 className="text-base sm:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">{label}</h4>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground mb-2 sm:mb-3">
            {description}
          </p>
          {note && (
            <div className="rounded-lg p-2 sm:p-3 bg-white/5 border border-white/10">
              <p className="text-xs sm:text-sm text-muted-foreground/80">{note}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// COMPARISON GRID - Side by side comparison
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

const comparisonColors = {
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    title: 'text-green-800 dark:text-green-200',
    text: 'text-green-700 dark:text-green-300',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    title: 'text-blue-800 dark:text-blue-200',
    text: 'text-blue-700 dark:text-blue-300',
  },
  red: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    title: 'text-red-800 dark:text-red-200',
    text: 'text-red-700 dark:text-red-300',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    title: 'text-orange-800 dark:text-orange-200',
    text: 'text-orange-700 dark:text-orange-300',
  },
};

export function ComparisonGrid({ left, right, leftColor = 'green', rightColor = 'red' }: ComparisonGridProps) {
  const leftStyles = comparisonColors[leftColor];
  const rightStyles = comparisonColors[rightColor];

  return (
    <div className="grid sm:grid-cols-2 gap-4 my-6 sm:my-8">
      <div className={cn("rounded-xl sm:rounded-2xl p-5 border border-slate-200 dark:border-slate-700", leftStyles.bg)}>
        <h4 className={cn("font-semibold mb-3 text-sm sm:text-base", leftStyles.title)}>{left.title}</h4>
        <ul className={cn("text-sm space-y-1.5", leftStyles.text)}>
          {left.items.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>
      <div className={cn("rounded-xl sm:rounded-2xl p-5 border border-slate-200 dark:border-slate-700", rightStyles.bg)}>
        <h4 className={cn("font-semibold mb-3 text-sm sm:text-base", rightStyles.title)}>{right.title}</h4>
        <ul className={cn("text-sm space-y-1.5", rightStyles.text)}>
          {right.items.map((item, i) => (
            <li key={i}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// =============================================================================
// PHASE CARD - For market cycle phases, narrative lifecycle, etc.
// =============================================================================
interface PhaseCardProps {
  number: number;
  title: string;
  description: string;
  signal?: string;
  color: 'slate' | 'blue' | 'green' | 'lime' | 'yellow' | 'orange' | 'red';
  icon?: LucideIcon;
}

const phaseGradients = {
  slate: 'from-slate-500/15 via-slate-600/10 to-zinc-700/15 hover:from-slate-500/20',
  blue: 'from-blue-500/15 via-slate-600/10 to-zinc-700/15 hover:from-blue-500/20',
  green: 'from-green-500/15 via-slate-600/10 to-zinc-700/15 hover:from-green-500/20',
  lime: 'from-lime-500/15 via-slate-600/10 to-zinc-700/15 hover:from-lime-500/20',
  yellow: 'from-yellow-500/15 via-slate-600/10 to-zinc-700/15 hover:from-yellow-500/20',
  orange: 'from-orange-500/15 via-slate-600/10 to-zinc-700/15 hover:from-orange-500/20',
  red: 'from-red-500/15 via-slate-600/10 to-zinc-700/15 hover:from-red-500/20',
};

const phaseNumberColors = {
  slate: 'bg-slate-500',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  lime: 'bg-lime-500',
  yellow: 'bg-yellow-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
};

export function PhaseCard({ number, title, description, signal, color, icon: Icon }: PhaseCardProps) {
  return (
    <div className={cn(
      "group relative rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:-translate-y-0.5",
      "bg-gradient-to-br border border-white/10 hover:shadow-lg hover:shadow-white/5",
      phaseGradients[color]
    )}>
      <div className="flex items-center gap-3 mb-2 sm:mb-3">
        <span className={cn(
          "flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm text-white shadow-lg",
          phaseNumberColors[color]
        )}>
          {number}
        </span>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground/70" />}
          <h4 className="font-bold text-sm sm:text-base bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
            {title}
          </h4>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mb-2 pl-10 sm:pl-11">
        {description}
      </p>
      {signal && (
        <p className="text-xs text-muted-foreground/70 pl-10 sm:pl-11">
          <strong className="text-muted-foreground">Signal:</strong> {signal}
        </p>
      )}
    </div>
  );
}

// =============================================================================
// STRATEGY CARD - For trading strategies with colored accent
// =============================================================================
interface StrategyCardProps {
  title: string;
  icon: LucideIcon;
  color: 'green' | 'blue' | 'purple' | 'orange';
  description: string;
  children?: ReactNode;
}

const strategyGradients = {
  green: 'from-green-500/15 via-slate-600/10 to-zinc-700/20 hover:from-green-500/25 hover:to-zinc-700/30',
  blue: 'from-blue-500/15 via-slate-600/10 to-zinc-700/20 hover:from-blue-500/25 hover:to-zinc-700/30',
  purple: 'from-purple-500/15 via-slate-600/10 to-zinc-700/20 hover:from-purple-500/25 hover:to-zinc-700/30',
  orange: 'from-orange-500/15 via-slate-600/10 to-zinc-700/20 hover:from-orange-500/25 hover:to-zinc-700/30',
};

const strategyIconBgs = {
  green: 'from-green-500 to-green-600',
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600',
};

export function StrategyCard({ title, icon: Icon, color, description, children }: StrategyCardProps) {
  return (
    <div className={cn(
      "group relative rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1",
      "bg-gradient-to-br border border-white/10",
      "hover:shadow-lg hover:shadow-white/5",
      strategyGradients[color]
    )}>
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className={cn("w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br", strategyIconBgs[color])}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
        <h4 className="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
          {title}
        </h4>
      </div>
      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5">
        {description}
      </p>
      {children && <div className="text-muted-foreground">{children}</div>}
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
    <div className={cn(
      "group relative rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1",
      "bg-gradient-to-br from-slate-500/10 via-blue-600/5 to-neutral-700/10 hover:from-slate-500/15 hover:to-blue-600/10",
      "border border-white/10 hover:shadow-lg hover:shadow-white/5"
    )}>
      <h3 className="font-bold text-foreground mb-2 sm:mb-3 text-base sm:text-lg bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
        {question}
      </h3>
      <div className="text-sm sm:text-base text-muted-foreground">
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
    <Link to={to} className="text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400 hover:underline transition-colors">
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
