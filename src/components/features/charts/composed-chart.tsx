import { 
  ResponsiveContainer, 
  ComposedChart as RechartsComposedChart,
  Line, 
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { BrowserFrame } from './browser-frame';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ChartData {
  date: string;
  bitcoin: number;
  perception: number;
}

interface ComposedChartProps {
  data: ChartData[];
}

const BaseAxis = {
  stroke: "#666",
  fontSize: 12,
  tickLine: false,
  axisLine: { stroke: '#333' }
} as const;

function createYAxis({
  id,
  orientation = 'left',
  width = 80,
  formatter,
  domain,
  ticks
}: {
  id: string;
  orientation?: 'left' | 'right';
  width?: number;
  formatter: (value: number) => string;
  domain?: [number, number];
  ticks?: number[];
}) {
  return (
    <YAxis 
      {...BaseAxis}
      yAxisId={id}
      orientation={orientation}
      width={width}
      tickFormatter={formatter}
      domain={domain}
      ticks={ticks}
    />
  );
}

const CustomLegend = (props: any) => {
  const { payload } = props;
  return (
    <div className="flex justify-center gap-6 mt-2">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          {entry.dataKey === 'bitcoin' ? (
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#f7931a' }} 
            />
          ) : (
            <div className="w-8 h-[2px] relative">
              <div 
                className="absolute inset-0"
                style={{ 
                  borderTop: '2px dotted rgb(100, 150, 255)',
                }} 
              />
            </div>
          )}
          <span className="text-sm text-gray-400">
            {entry.dataKey === 'bitcoin' ? 'Bitcoin Price' : 'Perception Index'}
          </span>
        </div>
      ))}
    </div>
  );
};

export function ComposedChart({ data }: ComposedChartProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="overflow-hidden">
        <BrowserFrame url="app.perception.to/index" />
        <CardContent className="border-none p-6">
          <motion.div 
            className="h-[400px]"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsComposedChart 
                data={data} 
                margin={{ top: 20, right: 30, left: 20, bottom: 35 }}
              >
                <defs>
                  <linearGradient id="perceptionFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="rgba(100, 150, 255, 0.2)" />
                    <stop offset="95%" stopColor="rgba(100, 150, 255, 0.05)" />
                  </linearGradient>
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#333" 
                  vertical={false}
                />
                
                <XAxis 
                  {...BaseAxis}
                  dataKey="date"
                  tickMargin={25}
                />
                
                {createYAxis({
                  id: "bitcoin",
                  orientation: "left",
                  width: 80,
                  formatter: (value) => `$${value.toLocaleString()}`,
                  domain: [60000, 100000],
                  ticks: [60000, 70000, 80000, 90000, 100000]
                })}
                
                {createYAxis({
                  id: "perception",
                  orientation: "right",
                  width: 50,
                  formatter: (value) => `${value}`,
                  domain: [43, 70],
                  ticks: [43, 50, 57, 63, 70]
                })}
                
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#000',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    transition: 'all 0.2s ease-in-out',
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === 'Bitcoin Price') return [`$${value.toLocaleString()}`, name];
                    return [`${value}`, 'Perception Index'];
                  }}
                />
                
                <Legend 
                  content={CustomLegend}
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ bottom: 0 }}
                />
                
                <Area
                  type="monotone"
                  dataKey="perception"
                  yAxisId="perception"
                  stroke="rgba(100, 150, 255, 1)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fill="url(#perceptionFill)"
                  dot={false}
                  activeDot={{ r: 4 }}
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                  isAnimationActive={inView}
                />
                
                <Line
                  type="monotone"
                  dataKey="bitcoin"
                  yAxisId="bitcoin"
                  name="Bitcoin Price"
                  stroke="#f7931a"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  fill="rgba(247, 147, 26, 0.1)"
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                  isAnimationActive={inView}
                />
              </RechartsComposedChart>
            </ResponsiveContainer>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}