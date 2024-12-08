import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface TrendData {
  name: string;
  volume: number;
  description: string;
}

interface TrendBarChartProps {
  data: TrendData[];
  description: string;
}

export function TrendBarChart({ data, description }: TrendBarChartProps) {
  return (
    <>
      <div className="mb-6">
        <h3 className="text-lg font-medium">Top Bitcoin Topics</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
          >
            <XAxis 
              type="number" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: 'hsl(var(--muted))' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              formatter={(value: number, _: string, props: any) => {
                return [
                  <>
                    <div className="font-medium">{`${(value / 1000).toFixed(1)}k mentions`}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{props.payload.description}</div>
                  </>,
                  'Volume'
                ];
              }}
            />
            <Bar
              dataKey="volume"
              fill="hsl(var(--primary))"
              radius={[0, 4, 4, 0]}
              barSize={20}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="hsl(var(--primary))"
                  opacity={1 - (index * 0.15)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}