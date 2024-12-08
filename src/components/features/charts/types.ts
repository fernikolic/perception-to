import type { CSSProperties } from 'react';

export interface ChartDataPoint {
  month: string;
  value: number;
}

export interface AxisProps {
  dataKey?: string;
  stroke?: string;
  fontSize?: number;
  tickLine?: boolean;
  axisLine?: {
    stroke: string;
  };
  padding?: {
    left?: number;
    right?: number;
  };
  width?: number;
  orientation?: 'left' | 'right';
  tickFormatter?: (value: any) => string;
  domain?: [number | string, number | string];
  [key: string]: any;
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

export interface TooltipStyleProps {
  contentStyle?: CSSProperties;
  formatter?: (value: number) => [string, string];
}