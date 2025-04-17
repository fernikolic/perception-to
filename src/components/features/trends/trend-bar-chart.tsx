import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BrowserFrame } from '../charts/browser-frame';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export interface TrendChartProps {
  data: {
    name: string;
    volume: number;
    description: string;
  }[];
}

const BaseAxis = {
  stroke: "#666",
  fontSize: 12,
  tickLine: false,
  axisLine: { stroke: '#333' }
} as const;

export function TrendBarChart({ data }: TrendChartProps) {
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
        <BrowserFrame url="app.perception.to/trends" />
        <CardContent className="border-none p-4">
          <motion.div 
            className="space-y-4"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            {/* Topic Selector */}
            <div className="flex items-center gap-2 px-4">
              <button className="flex items-center gap-2 rounded-full border border-gray-800 px-4 py-2 text-sm text-black hover:bg-gray-900/50">
                <span>Select topics...</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1.5">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-sm text-blue-400">Institutional Adoption</span>
                <button className="ml-1 rounded-full hover:bg-blue-500/20 p-0.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Chart */}
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 50, right: 30, left: 20, bottom: 35 }}
                >
                  <defs>
                    <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgba(100, 150, 255, 0.2)" />
                      <stop offset="95%" stopColor="rgba(100, 150, 255, 0.05)" />
                    </linearGradient>
                  </defs>

                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="#333" 
                    vertical={false}
                  />

                  {/* Reference Line with label for Bitcoin price milestone */}
                  <ReferenceLine 
                    x="Nov 2024" 
                    stroke="#f7931a" 
                    strokeWidth={1}
                    isFront={true}
                    label={({ viewBox }) => (
                      <g>
                        {/* Tooltip background */}
                        <rect
                          x={viewBox.x - 85}
                          y={viewBox.y - 35}
                          width={170}
                          height={24}
                          fill="rgba(0, 0, 0, 0.9)"
                          rx={4}
                          stroke="#333"
                          strokeWidth={1}
                        />
                        {/* Tooltip text */}
                        <text
                          x={viewBox.x}
                          y={viewBox.y - 20}
                          fill="#f7931a"
                          textAnchor="middle"
                          fontSize={12}
                          fontWeight="500"
                        >
                          Bitcoin surpasses $100,000
                        </text>
                      </g>
                    )}
                  />

                  <XAxis 
                    {...BaseAxis}
                    dataKey="date"
                    tickMargin={25}
                    interval={0}
                  />

                  <YAxis
                    {...BaseAxis}
                    tickFormatter={(value) => value.toLocaleString()}
                    width={80}
                  />

                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#000',
                      border: '1px solid #333',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      transition: 'all 0.2s ease-in-out',
                    }}
                    formatter={(value: number) => [`${value.toLocaleString()}`, 'Volume']}
                  />

                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="rgba(100, 150, 255, 1)"
                    strokeWidth={2}
                    fill="url(#trendFill)"
                    dot={false}
                    activeDot={{ r: 4 }}
                    animationDuration={1000}
                    animationEasing="ease-in-out"
                    isAnimationActive={inView}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}