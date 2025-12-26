import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, SignalIcon, ArrowRightIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { TrackedConference } from '@/data/tracked-conferences';

interface TrackedConferenceCardProps {
  conference: TrackedConference;
  variant?: 'default' | 'compact' | 'featured';
}

const typeColors: Record<string, string> = {
  Bitcoin: 'bg-orange-100 text-orange-700',
  Blockchain: 'bg-blue-100 text-blue-700',
  Freedom: 'bg-purple-100 text-purple-700',
  Mining: 'bg-yellow-100 text-yellow-700',
  Institutional: 'bg-green-100 text-green-700',
  Developer: 'bg-indigo-100 text-indigo-700',
  Tech: 'bg-cyan-100 text-cyan-700',
  Regional: 'bg-pink-100 text-pink-700'
};

export function TrackedConferenceCard({ conference, variant = 'default' }: TrackedConferenceCardProps) {
  const typeColorClass = typeColors[conference.type] || 'bg-gray-100 text-gray-700';

  if (variant === 'compact') {
    return (
      <Link
        to={`/crypto-conferences/${conference.id}`}
        className="group flex items-center justify-between p-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
      >
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
            {conference.name}
          </h4>
          <p className="text-sm text-gray-500 truncate">
            {conference.location.city}, {conference.location.country}
          </p>
        </div>
        <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" />
      </Link>
    );
  }

  if (variant === 'featured') {
    return (
      <Link
        to={`/crypto-conferences/${conference.id}`}
        className="group relative rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 overflow-hidden block"
      >
        <div className="p-6 space-y-4">
          {/* Header with type and status */}
          <div className="flex justify-between items-start">
            <Badge className={typeColorClass}>
              {conference.type}
            </Badge>
            {conference.feedStatus === 'Active' && (
              <div className="flex items-center gap-1 text-green-600">
                <SignalIcon className="h-3 w-3" />
                <span className="text-xs font-medium">Live Feed</span>
              </div>
            )}
          </div>

          {/* Conference name */}
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {conference.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {conference.description}
          </p>

          {/* Details */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPinIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
              <span>{conference.location.city}, {conference.location.country}</span>
            </div>
            {conference.nextEvent && (
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span>{conference.nextEvent.displayDate}</span>
              </div>
            )}
          </div>

          {/* Attendees */}
          {conference.expectedAttendees && (
            <div className="pt-2 border-t border-gray-100">
              <span className="text-sm font-medium text-gray-900">
                {conference.expectedAttendees}
              </span>
              <span className="text-sm text-gray-500"> expected attendees</span>
            </div>
          )}
        </div>
      </Link>
    );
  }

  // Default variant
  return (
    <Link
      to={`/crypto-conferences/${conference.id}`}
      className="group rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 overflow-hidden block"
    >
      <div className="p-5 space-y-3">
        {/* Header */}
        <div className="flex justify-between items-start">
          <Badge className={`text-xs ${typeColorClass}`}>
            {conference.type}
          </Badge>
          {conference.feedStatus === 'Active' && (
            <div className="flex items-center gap-1 text-green-600">
              <SignalIcon className="h-3 w-3" />
              <span className="text-xs">Live</span>
            </div>
          )}
        </div>

        {/* Name */}
        <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {conference.name}
        </h4>

        {/* Location and date */}
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <MapPinIcon className="h-3 w-3 text-gray-400" />
            <span>{conference.location.city}, {conference.location.country}</span>
          </div>
          {conference.nextEvent && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-3 w-3 text-gray-400" />
              <span>{conference.nextEvent.displayDate}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default TrackedConferenceCard;
