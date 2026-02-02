import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CALENDLY_URL = 'https://calendly.com/fernikolic/30min';

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CalendarModal({ isOpen, onClose }: CalendarModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);
  const [widgetKey, setWidgetKey] = useState(0);
  const calendlyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load Calendly script when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');

    if (existingScript) {
      setIsCalendlyLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setIsCalendlyLoaded(true);
    document.head.appendChild(script);
  }, [isOpen]);

  // Initialize Calendly widget when script is loaded
  useEffect(() => {
    if (!isOpen || !isCalendlyLoaded || !calendlyContainerRef.current) return;

    // Clear existing children safely
    while (calendlyContainerRef.current.firstChild) {
      calendlyContainerRef.current.removeChild(calendlyContainerRef.current.firstChild);
    }

    // Use Calendly's inline widget
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: calendlyContainerRef.current,
        prefill: {},
        utm: {}
      });
    }
  }, [isOpen, isCalendlyLoaded, widgetKey]);

  // Reset widget when modal reopens
  useEffect(() => {
    if (isOpen) {
      setWidgetKey(prev => prev + 1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isMounted || !isOpen) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Context */}
          <div className="lg:w-2/5 p-8 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-100">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 lg:hidden p-2 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Schedule a Demo</h2>
            <p className="text-gray-600 mb-6">
              See how Perception can help your team with media intelligence, competitive analysis, and stakeholder communications.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0 mt-1.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">30 minute call</p>
                  <p className="text-xs text-gray-500">Quick intro and platform walkthrough</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Google Meet</p>
                  <p className="text-xs text-gray-500">Link sent after booking</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-1.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">No sales pressure</p>
                  <p className="text-xs text-gray-500">We want to understand your needs first</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-400">
                Questions? Email us at{' '}
                <a href="mailto:hello@perception.to" className="text-gray-600 hover:text-gray-900">
                  hello@perception.to
                </a>
              </p>
            </div>
          </div>

          {/* Right side - Calendly Embed */}
          <div className="lg:w-3/5 relative">
            <button
              onClick={onClose}
              className="hidden lg:block absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
            <div
              key={widgetKey}
              ref={calendlyContainerRef}
              className="w-full h-[500px] lg:h-[600px]"
              style={{ minWidth: '320px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Use portal to render at document body level, avoiding navbar stacking context issues
  return createPortal(modalContent, document.body);
}

// Type declaration for Calendly
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, unknown>;
        utm?: Record<string, unknown>;
      }) => void;
    };
  }
}

// Hook for managing calendar modal state
export function useCalendarModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openCalendar = () => setIsOpen(true);
  const closeCalendar = () => setIsOpen(false);

  return {
    isOpen,
    openCalendar,
    closeCalendar,
  };
}

// Standalone button that opens calendar modal
interface BookDemoButtonProps {
  className?: string;
  children?: React.ReactNode;
  size?: 'default' | 'sm' | 'lg';
  variant?: 'default' | 'outline';
}

export function BookDemoButton({
  className = '',
  children = 'Book a Demo',
  size = 'lg',
  variant = 'default',
}: BookDemoButtonProps) {
  const { isOpen, openCalendar, closeCalendar } = useCalendarModal();

  const baseClass = variant === 'default'
    ? 'bg-black text-white hover:bg-black/90'
    : 'bg-white/80 backdrop-blur-sm text-black hover:bg-white border-2 border-black/20 hover:border-black/30';

  return (
    <>
      <Button
        size={size}
        className={`${baseClass} transition-all duration-300 font-semibold shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl ${className}`}
        onClick={openCalendar}
      >
        {children}
      </Button>
      <CalendarModal isOpen={isOpen} onClose={closeCalendar} />
    </>
  );
}
