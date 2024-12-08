import { XAxis, YAxis } from 'recharts';

interface BaseAxisProps {
  dataKey?: string;
  stroke?: string;
  fontSize?: number;
  tickLine?: boolean;
  axisLine?: { stroke: string };
  tickFormatter?: (value: any) => string;
  domain?: [string | number, string | number];
}

interface XAxisProps extends BaseAxisProps {
  orientation?: 'top' | 'bottom';
  padding?: { left?: number; right?: number };
}

interface YAxisProps extends BaseAxisProps {
  yAxisId?: string;
  width?: number;
  orientation?: 'left' | 'right';
}

const defaultAxisStyle = {
  stroke: 'hsl(var(--muted-foreground))',
  fontSize: 12,
  tickLine: false,
  axisLine: { stroke: 'hsl(var(--muted))' }
};

export function BaseXAxis({
  dataKey = 'month',
  stroke = defaultAxisStyle.stroke,
  fontSize = defaultAxisStyle.fontSize,
  tickLine = defaultAxisStyle.tickLine,
  axisLine = defaultAxisStyle.axisLine,
  padding = { left: 10, right: 10 },
  ...props
}: XAxisProps) {
  return (
    <XAxis
      dataKey={dataKey}
      stroke={stroke}
      fontSize={fontSize}
      tickLine={tickLine}
      axisLine={axisLine}
      padding={padding}
      {...props}
    />
  );
}

export function BaseYAxis({
  yAxisId,
  width = 45,
  orientation = 'left',
  stroke = defaultAxisStyle.stroke,
  fontSize = defaultAxisStyle.fontSize,
  tickLine = defaultAxisStyle.tickLine,
  axisLine = defaultAxisStyle.axisLine,
  ...props
}: YAxisProps) {
  return (
    <YAxis
      yAxisId={yAxisId}
      width={width}
      orientation={orientation}
      stroke={stroke}
      fontSize={fontSize}
      tickLine={tickLine}
      axisLine={axisLine}
      {...props}
    />
  );
}