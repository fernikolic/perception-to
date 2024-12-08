import { XAxis as RechartsXAxis, YAxis as RechartsYAxis } from 'recharts';

interface BaseAxisProps {
  stroke?: string;
  fontSize?: number;
  tickLine?: boolean;
  axisLine?: {
    stroke: string;
  };
}

interface XAxisProps extends BaseAxisProps {
  dataKey: string;
  padding?: {
    left: number;
    right: number;
  };
}

interface YAxisProps extends BaseAxisProps {
  yAxisId: string;
  orientation?: 'left' | 'right';
  width?: number;
  tickFormatter?: (value: number) => string;
}

const defaultProps = {
  stroke: "hsl(var(--muted-foreground))",
  fontSize: 12,
  tickLine: false,
  axisLine: { stroke: "hsl(var(--muted))" }
};

export const XAxis = ({ dataKey, ...props }: XAxisProps) => (
  <RechartsXAxis
    dataKey={dataKey}
    {...defaultProps}
    {...props}
  />
);

export const YAxis = ({ 
  yAxisId,
  orientation = 'left',
  width = 45,
  tickFormatter,
  ...props 
}: YAxisProps) => (
  <RechartsYAxis
    yAxisId={yAxisId}
    orientation={orientation}
    width={width}
    tickFormatter={tickFormatter}
    {...defaultProps}
    {...props}
  />
);