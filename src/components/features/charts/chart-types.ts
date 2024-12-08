import { CSSProperties } from 'react';

export interface ChartDataPoint {
  month: string;
  value: number;
}

export interface ChartDefaults {
  margin: {
    top: number;
    right: number;
    left: number;
    bottom: number;
  };
  tooltipStyle: CSSProperties;
  gridProps: {
    strokeDasharray: string;
    stroke: string;
  };
  axisProps: {
    stroke: string;
    fontSize: number;
    tickLine: boolean;
    axisLine: {
      stroke: string;
    };
  };
}

export interface AxisProps {
  dataKey?: string;
  xAxisId?: string;
  yAxisId?: string;
  tickFormatter?: (value: any) => string;
  width?: number;
  orientation?: 'left' | 'right';
  domain?: [number | string, number | string];
  [key: string]: any;
}