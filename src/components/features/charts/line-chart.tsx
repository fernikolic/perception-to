import { ResponsiveContainer, LineChart, Line, CartesianGrid, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BaseXAxis, BaseYAxis } from './base-axis';
import { Circle } from 'lucide-react';
import type { ChartProps } from './types';

export function CustomLineChart({ 
  data, 
  height = 300,
  margin = { top: 20, right: 30, left: 20, bottom: 20 }
}: ChartProps) {
  return (
    <Card className="overflow-hidden">
      {/* Browser Window Header */}
      <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2">
        <div className="flex gap-1.5">
          <Circle className="h-3 w-3 fill-rose-500 text-rose-500" />
          <Circle className="h-3 w-3 fill-yellow-500 text-yellow-500" />
          <Circle className="h-3 w-3 fill-green-500 text-green-500" />
        </div>
        <div className="flex-1 text-center">
          <div className="inline-flex items-center rounded-lg bg-background/50 px-3 py-1 text-xs text-muted-foreground">
            analytics.perception.dev
          </div>
        </div>
      </div>

      <CardHeader>
        <CardTitle>Growth Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={margin}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
              <BaseXAxis />
              <BaseYAxis />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}