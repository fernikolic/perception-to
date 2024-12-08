import { Circle } from 'lucide-react';

interface BrowserFrameProps {
  url: string;
}

export function BrowserFrame({ url }: BrowserFrameProps) {
  return (
    <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2">
      <div className="flex gap-1.5">
        <Circle className="h-3 w-3 fill-rose-500 text-rose-500" />
        <Circle className="h-3 w-3 fill-yellow-500 text-yellow-500" />
        <Circle className="h-3 w-3 fill-green-500 text-green-500" />
      </div>
      <div className="flex-1 text-center">
        <div className="inline-flex items-center rounded-lg bg-background/50 px-3 py-1 text-xs text-muted-foreground">
          {url}
        </div>
      </div>
    </div>
  );
}