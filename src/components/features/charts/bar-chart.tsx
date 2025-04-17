import { ResponsiveContainer, BarChart, Bar, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XAxis, YAxis } from './chart-axis';
import { chartDefaults } from './chart-utils';
import { BrowserFrame } from './browser-frame';

interface BarChartProps {
  data: Array<{
    month: string;
    value: number;
  }>;
}

export function BarChartComponent({ data }: BarChartProps) {
  return (
    <Card className="overflow-hidden">
      <BrowserFrame url="app.perception.to/bookmarks" />
      <CardHeader>
        <CardTitle>Monthly Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={chartDefaults.margin}>
              <CartesianGrid {...chartDefaults.gridStyle} />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <Tooltip contentStyle={chartDefaults.tooltipStyle} />
              <Bar
                yAxisId="left"
                dataKey="value"
                fill="hsl(var(--primary))"
                opacity={0.8}
                radius={[4, 4, 0, 0]}
                animationDuration={1000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}