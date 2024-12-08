export interface ChartDataPoint {
  month: string;
  value: number;
}

export interface ChartProps {
  data: ChartDataPoint[];
  height?: number;
  margin?: {
    top: number;
    right: number;
    left: number;
    bottom: number;
  };
}

export interface TooltipProps {
  contentStyle?: React.CSSProperties;
  formatter?: (value: number, name: string) => [string, string];
}

export interface AxisProps {
  dataKey?: string;
  orientation?: 'left' | 'right';
  width?: number;
  tickFormatter?: (value: number) => string;
  [key: string]: any;
}