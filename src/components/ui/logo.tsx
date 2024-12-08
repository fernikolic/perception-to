import { Brain } from 'lucide-react';

export function Logo() {
  return (
    <div className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20">
      <Brain className="h-6 w-6 text-primary" />
    </div>
  );
}