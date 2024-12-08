import { Tooltip } from 'recharts';

export function ChartTooltip() {
  return (
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
  );
}