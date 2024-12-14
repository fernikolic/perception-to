export default function Nav() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a href="/" className="flex items-center">
            <img
              src="/logos/Perception Logo.svg"
              alt="Perception Logo"
              className="h-8 w-auto"
            />
          </a>
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation items */}
          </div>
        </div>
      </div>
    </nav>
  );
} 