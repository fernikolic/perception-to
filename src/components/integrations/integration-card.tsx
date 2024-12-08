import { Card, CardContent } from "@/components/ui/card";

interface IntegrationCardProps {
  name: string;
  icon: string;
  description: string;
}

export function IntegrationCard({ name, icon, description }: IntegrationCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-xl bg-neutral-900 p-2 shadow-lg transition-transform group-hover:scale-110">
            <img
              src={icon}
              alt={name}
              className="h-full w-full object-contain"
            />
            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/10"></div>
          </div>
          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}