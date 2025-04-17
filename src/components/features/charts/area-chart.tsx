import { ResponsiveContainer, AreaChart, Area, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { XAxis, YAxis } from './chart-axis';
import { chartDefaults } from './chart-utils';
import { BrowserFrame } from './browser-frame';

interface AreaChartProps {
  data: Array<{
    month: string;
    value: number;
  }>;
}

export function AreaChartComponent({ data }: AreaChartProps) {
  return (
    <Card className="overflow-hidden">
      <BrowserFrame url="app.perception.to/companies" />
      <CardHeader>
        <CardTitle>Resource Usage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={chartDefaults.margin}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid {...chartDefaults.gridStyle} />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <Tooltip contentStyle={chartDefaults.tooltipStyle} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                fill="url(#areaGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}