export function Logo({ white }: { white?: boolean }) {
  return (
    <div className="inline-flex items-center justify-center">
      <img
        src={white ? "/logos/perception-logo-light.png" : "/logos/perception-logo-dark.png"}
        alt="Perception Logo"
        className="h-8 w-auto"
      />
    </div>
  );
}