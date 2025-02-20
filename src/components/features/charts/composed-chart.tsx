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
import { Card, CardContent } from '@/components/ui/card';
import { BrowserFrame } from './browser-frame';

interface ChartData {
  month: string;
  price: number;
  sentiment: number;
}

interface ComposedChartProps {
  data: ChartData[];
}

const BaseAxis = {
  stroke: "hsl(var(--muted-foreground))",
  fontSize: 12,
  tickLine: false,
  axisLine: { stroke: 'hsl(var(--muted))' }
} as const;

function createYAxis({
  id,
  orientation = 'left',
  width = 80,
  formatter
}: {
  id: string;
  orientation?: 'left' | 'right';
  width?: number;
  formatter: (value: number) => string;
}) {
  return (
    <YAxis 
      {...BaseAxis}
      yAxisId={id}
      orientation={orientation}
      width={width}
      tickFormatter={formatter}
    />
  );
}

export function ComposedChart({ data }: ComposedChartProps) {
  return (
    <div>
      <Card className="overflow-hidden">
        <BrowserFrame url="app.perception.to" />
        <CardContent className="border-none p-6">
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
                  {...BaseAxis}
                  dataKey="month"
                />
                
                {createYAxis({
                  id: "price",
                  orientation: "left",
                  width: 80,
                  formatter: (value) => `$${value.toLocaleString()}`
                })}
                
                {createYAxis({
                  id: "sentiment",
                  orientation: "right",
                  width: 50,
                  formatter: (value) => `${value}%`
                })}
                
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
                  stroke="#f7931a"
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

      <div className="mt-4 text-center text-sm text-muted-foreground">
        <span>Mock data. </span>
        <a 
          href="https://app.perception.to" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Sign up to access real-time data
        </a>
      </div>
    </div>
  );
}