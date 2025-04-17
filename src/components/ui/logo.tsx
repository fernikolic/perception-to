export function Logo({ white }: { white?: boolean }) {
  return (
    <div className="inline-flex items-center justify-center">
      <img
        src="/logos/Perception Logo.svg"
        alt="Perception Logo"
        className={`h-8 w-auto ${!white ? 'invert' : ''}`}
      />
    </div>
  );
}