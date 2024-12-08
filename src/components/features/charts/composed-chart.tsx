import { 
  ResponsiveContainer, 
  ComposedChart as RechartsComposedChart,
  Line, 
  Bar, 
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrowserFrame } from './browser-frame';

interface ChartData {
  month: string;
  price: number;
  sentiment: number;
}

interface ComposedChartProps {
  data: ChartData[];
}

export function ComposedChart({ data }: ComposedChartProps) {
  return (
    <Card className="overflow-hidden">
      <BrowserFrame url="app.perception.to" />
      <CardHeader>
        <CardTitle>Bitcoin Price & Market Sentiment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsComposedChart 
              data={data} 
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="sentimentFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--muted))" 
              />
              
              <XAxis 
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'hsl(var(--muted))' }}
              />
              
              <YAxis 
                yAxisId="price"
                orientation="left"
                width={80}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'hsl(var(--muted))' }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              
              <YAxis 
                yAxisId="sentiment"
                orientation="right"
                width={50}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: 'hsl(var(--muted))' }}
                tickFormatter={(value) => `${value}%`}
              />
              
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
                formatter={(value: number, name: string) => {
                  if (name === 'Bitcoin Price') return [`$${value.toLocaleString()}`, name];
                  return [`${value}%`, name];
                }}
              />
              
              <Legend />
              
              <Line
                type="monotone"
                dataKey="price"
                yAxisId="price"
                name="Bitcoin Price"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              
              <Bar 
                dataKey="sentiment"
                yAxisId="sentiment"
                name="Market Sentiment"
                fill="url(#sentimentFill)"
                radius={[4, 4, 0, 0]}
              />
            </RechartsComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}