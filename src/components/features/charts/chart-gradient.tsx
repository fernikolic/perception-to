import { type ReactElement } from 'react';

interface ChartGradientProps {
  id: string;
  color: string;
  startOpacity?: number;
  endOpacity?: number;
}

export function ChartGradient({ 
  id, 
  color, 
  startOpacity = 0.3, 
  endOpacity = 0.1 
}: ChartGradientProps): ReactElement {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop 
          offset="5%" 
          stopColor={`hsl(var(--${color}))`} 
          stopOpacity={startOpacity}
        />
        <stop 
          offset="95%" 
          stopColor={`hsl(var(--${color}))`} 
          stopOpacity={endOpacity}
        />
      </linearGradient>
    </defs>
  );
}