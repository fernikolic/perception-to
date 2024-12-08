export const chartDefaults = {
  margin: {
    top: 20,
    right: 30,
    left: 20,
    bottom: 20,
  },
  tooltipStyle: {
    backgroundColor: 'hsl(var(--background))',
    border: '1px solid hsl(var(--border))',
    borderRadius: '8px',
    padding: '8px 12px',
  },
  axisStyle: {
    stroke: 'hsl(var(--muted-foreground))',
    fontSize: 12,
    tickLine: false,
    axisLine: {
      stroke: 'hsl(var(--muted))',
    },
  },
  gridStyle: {
    strokeDasharray: '3 3',
    stroke: 'hsl(var(--muted))',
  },
};

export const generateMockData = (length: number = 12) => {
  return Array.from({ length }, (_, i) => ({
    month: new Date(2023, i).toLocaleString('default', { month: 'short' }),
    price: Math.floor(20000 + Math.random() * 30000 + i * 2000),
    sentiment: Math.floor(40 + Math.random() * 60),
  }));
};