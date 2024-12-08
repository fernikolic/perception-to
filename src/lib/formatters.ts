export const formatCurrency = (value: number): string => (
  `$${value.toLocaleString()}`
);

export const formatPercentage = (value: number): string => (
  `${value}%`
);

export const formatNumber = (value: number): string => (
  value.toLocaleString()
);

export const formatCompactNumber = (value: number): string => (
  Intl.NumberFormat('en', { notation: 'compact' }).format(value)
);