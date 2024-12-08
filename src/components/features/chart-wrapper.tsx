import { ReactNode } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

interface ChartWrapperProps {
  data: Array<{
    month: string;
    value: number;
  }>;
  valuePrefix?: string;
  valueSuffix?: string;
  color: string;
  children?: ReactNode;
}

export function ChartWrapper({ data, valuePrefix = '', valueSuffix = '', color }: ChartWrapperProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-md">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">
            {valuePrefix}{payload[0].value.toFixed(2)}{valueSuffix}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomXAxis = ({ ...props }) => (
    <XAxis
      {...props}
      stroke="hsl(var(--muted-foreground))"
      fontSize={12}
      tickLine={false}
      axisLine={{ stroke: 'hsl(var(--muted))' }}
      padding={{ left: 10, right: 10 }}
    />
  );

  const CustomYAxis = ({ ...props }) => (
    <YAxis
      {...props}
      stroke="hsl(var(--muted-foreground))"
      fontSize={12}
      tickLine={false}
      axisLine={{ stroke: 'hsl(var(--muted))' }}
      tickFormatter={(value) => `${valuePrefix}${value.toFixed(2)}${valueSuffix}`}
      width={45}
    />
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
        <CustomXAxis dataKey="month" />
        <CustomYAxis />
        <Tooltip content={CustomTooltip} />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}