import { ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XAxis, YAxis } from './chart-axis';
import { chartDefaults } from './chart-utils';

interface MainChartProps {
  data: Array<{
    month: string;
    value: number;
  }>;
}

export function MainChart({ data }: MainChartProps) {
  return (
    <Card className="col-span-3 shadow-lg">
      <CardHeader>
        <CardTitle>Platform Growth Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={chartDefaults.margin}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid {...chartDefaults.gridStyle} />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <Tooltip contentStyle={chartDefaults.tooltipStyle} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                dot={{ stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}