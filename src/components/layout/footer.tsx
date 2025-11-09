import { Logo } from '@/components/ui/logo';

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <a href="/" className="flex items-center">
              <Logo white={true} />
            </a>
          </div>
          {/* Add footer columns here */}
        </div>
      </div>
    </footer>
  );
} 