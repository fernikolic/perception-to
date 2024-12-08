import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { ChartWrapper } from './chart-wrapper';

interface MetricCardProps {
  title: string;
  description: string;
  data: Array<{
    month: string;
    value: number;
  }>;
  valuePrefix?: string;
  valueSuffix?: string;
  color: string;
}

export function MetricCard({ 
  title, 
  description, 
  data, 
  valuePrefix = '', 
  valueSuffix = '',
  color 
}: MetricCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="inline-flex items-center justify-center rounded-full p-1 hover:bg-primary/10">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">More information</span>
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ChartWrapper
            data={data}
            valuePrefix={valuePrefix}
            valueSuffix={valueSuffix}
            color={color}
          />
        </div>
      </CardContent>
    </Card>
  );
}