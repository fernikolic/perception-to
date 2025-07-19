import { Link } from 'react-router-dom';
import { ChevronRight, Home, Calendar, Clock } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface SentimentBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function SentimentBreadcrumbs({ items, className = '' }: SentimentBreadcrumbsProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link
        to="/"
        className="flex items-center gap-2 text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white/70 transition-colors duration-200"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>
      
      <ChevronRight className="w-4 h-4 text-slate-400 dark:text-white/40" />
      
      <Link
        to="/bitcoin-market-sentiment"
        className="text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white/70 transition-colors duration-200"
      >
        Bitcoin Market Sentiment
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-slate-400 dark:text-white/40" />
          {item.href ? (
            <Link
              to={item.href}
              className="flex items-center gap-2 text-slate-500 dark:text-white/50 hover:text-slate-700 dark:hover:text-white/70 transition-colors duration-200"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ) : (
            <span className="flex items-center gap-2 text-slate-700 dark:text-white/80 font-medium">
              {item.icon}
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}

// Convenience components for specific sentiment page types
interface MonthlyBreadcrumbsProps {
  month: string;
  year: string;
  className?: string;
}

export function MonthlyBreadcrumbs({ month, year, className }: MonthlyBreadcrumbsProps) {
  return (
    <SentimentBreadcrumbs
      className={className}
      items={[
        {
          label: `${month} ${year}`,
          icon: <Calendar className="w-4 h-4" />
        }
      ]}
    />
  );
}

interface DailyBreadcrumbsProps {
  date: string;
  formattedDate: string;
  className?: string;
}

export function DailyBreadcrumbs({ date, formattedDate, className }: DailyBreadcrumbsProps) {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleDateString('en-US', { month: 'long' });
  const year = dateObj.getFullYear().toString();
  
  return (
    <SentimentBreadcrumbs
      className={className}
      items={[
        {
          label: `${month} ${year}`,
          href: `/bitcoin-market-sentiment/${year}/${month.toLowerCase()}`,
          icon: <Calendar className="w-4 h-4" />
        },
        {
          label: formattedDate,
          icon: <Clock className="w-4 h-4" />
        }
      ]}
    />
  );
}