interface IntegrationCardProps {
  name: string;
  icon: string;
  description?: string;
}

export function IntegrationCard({ name, icon, description }: IntegrationCardProps) {
  return (
    <div className="group relative overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl !bg-gray-800/30 backdrop-blur-sm rounded-lg !border-0">
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 rounded-xl p-2 transition-transform group-hover:scale-110">
            <img
              src={icon}
              alt={name}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h3 className="font-semibold !text-white">{name}</h3>
            <p className="text-sm !text-white/70">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}