import React from 'react';
import { Link } from 'react-router-dom';
import { MapPinIcon, CalendarIcon, ArrowRightIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getRelatedConferences, type TrackedConference } from '@/data/tracked-conferences';

interface RelatedConferencesProps {
  conferenceId: string;
  title?: string;
  limit?: number;
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

function RelatedConferenceCard({ conference }: { conference: TrackedConference }) {
  const typeColorClass = typeColors[conference.type] || 'bg-gray-100 text-gray-700';

  return (
    <Link
      to={`/crypto-conferences/${conference.id}`}
      className="group block p-4 rounded-xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
    >
      <div className="space-y-2">
        {/* Type badge */}
        <Badge className={`text-xs ${typeColorClass}`}>
          {conference.type}
        </Badge>

        {/* Name */}
        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
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

export function RelatedConferences({
  conferenceId,
  title = 'Related Conferences',
  limit = 4
}: RelatedConferencesProps) {
  const relatedConferences = getRelatedConferences(conferenceId).slice(0, limit);

  if (relatedConferences.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <Link
          to="/crypto-conferences"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          View all
          <ArrowRightIcon className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {relatedConferences.map((conference) => (
          <RelatedConferenceCard key={conference.id} conference={conference} />
        ))}
      </div>
    </div>
  );
}

export default RelatedConferences;
