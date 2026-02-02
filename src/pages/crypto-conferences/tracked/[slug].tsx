import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  MapPinIcon,
  CalendarIcon,
  ExternalLinkIcon,
  UsersIcon,
  GlobeIcon,
  SignalIcon,
  TagIcon,
  ClockIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SEO from '@/components/SEO';
import { ConferenceContentFeed } from '@/components/conference';
import { getConferenceById, getRelatedConferences, type TrackedConference } from '@/data/tracked-conferences';

// ASCII art components for rotation
import AsciiBlob from '@/components/AsciiBlob';
import AsciiBinaryFlow from '@/components/AsciiBinaryFlow';
import AsciiDiagonalPetals from '@/components/AsciiDiagonalPetals';
import WaterAscii from '@/components/WaterAscii';
import DelicateAsciiDots from '@/components/DelicateAsciiDots';

// Array of ASCII components to rotate through
const asciiComponents = [
  AsciiBlob,
  AsciiBinaryFlow,
  AsciiDiagonalPetals,
  WaterAscii,
  DelicateAsciiDots
];

// Get a deterministic ASCII component based on conference ID
function getAsciiComponent(conferenceId: string): React.ComponentType {
  // Simple hash function to get consistent index from conference ID
  let hash = 0;
  for (let i = 0; i < conferenceId.length; i++) {
    hash = ((hash << 5) - hash) + conferenceId.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  const index = Math.abs(hash) % asciiComponents.length;
  return asciiComponents[index];
}

function generateEventSchema(conference: TrackedConference) {
  if (!conference.nextEvent) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: conference.name,
    description: conference.description,
    startDate: conference.nextEvent.startDate,
    endDate: conference.nextEvent.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: conference.location.venue || conference.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: conference.location.city,
        addressCountry: conference.location.countryCode
      }
    },
    organizer: {
      '@type': 'Organization',
      name: conference.name,
      url: conference.website
    },
    performer: {
      '@type': 'Organization',
      name: conference.name
    },
    offers: {
      '@type': 'Offer',
      url: conference.website,
      availability: 'https://schema.org/InStock'
    },
    url: conference.website,
    image: [
      'https://perception.to/logos/Perception-logo-social-og.png',
      'https://perception.to/images/hero_image.avif'
    ]
  };
}

export function TrackedConferencePage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <Navigate to="/crypto-conferences" replace />;
  }

  const conference = getConferenceById(slug);

  if (!conference) {
    return <Navigate to="/crypto-conferences" replace />;
  }

  const relatedConferences = getRelatedConferences(conference.id).slice(0, 3);
  const eventSchema = generateEventSchema(conference);
  const isUpcoming = conference.nextEvent
    ? new Date(conference.nextEvent.startDate) >= new Date()
    : false;

  // Get the ASCII component for this conference
  const AsciiComponent = getAsciiComponent(conference.id);

  return (
    <>
      <SEO
        title={`${conference.name} - Conference Coverage & Media Analysis`}
        description={conference.longDescription || conference.description}
        url={`https://perception.to/crypto-conferences/${conference.id}`}
        keywords={conference.keywords}
      >
        {eventSchema && (
          <script type="application/ld+json">
            {JSON.stringify(eventSchema)}
          </script>
        )}
      </SEO>

      <div className="min-h-screen bg-background pt-28">
        {/* Hero Section - matching homepage design */}
        <div className="relative isolate overflow-hidden bg-gradient-to-b from-background via-background to-background/95">
          <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_120%,rgba(30,58,138,0.1),rgba(255,255,255,0))]" />

          <div className="mx-auto max-w-[1800px] px-6 sm:px-8 py-8 sm:py-12 lg:py-16 lg:px-12">
            {/* Back Navigation */}
            <div className="mb-6">
              <Link
                to="/crypto-conferences"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-white hover:border-gray-300 transition-all duration-200 text-sm font-medium text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-md"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Back to Conferences
              </Link>
            </div>

            {/* Hero Card with Side-by-Side Layout */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row min-h-[500px] lg:min-h-[550px]">
                {/* ASCII Art - Left Side (50%) - rotates based on conference */}
                <div className="w-full lg:w-1/2 relative min-h-[250px] lg:min-h-[550px]">
                  <AsciiComponent />
                </div>

                {/* Content - Right Side (50%) */}
                <div className="w-full lg:w-1/2 px-6 sm:px-8 lg:px-16 py-8 sm:py-12 lg:py-16 flex flex-col justify-center" style={{ background: '#F0EEE6' }}>
                  <div className="w-full max-w-2xl">
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6 justify-center lg:justify-start">
                      <div
                        className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <span className="text-black">{conference.type}</span>
                      </div>
                      {conference.feedStatus === 'Active' && (
                        <div className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold bg-green-100 text-green-700">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-40"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                          </span>
                          Live Feed
                        </div>
                      )}
                      {isUpcoming && (
                        <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold bg-orange-100 text-orange-700">
                          Upcoming
                        </div>
                      )}
                    </div>

                    {/* Conference Name */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-tight text-black mb-5 sm:mb-6 text-center lg:text-left">
                      {conference.name}
                    </h1>

                    {/* Description */}
                    <div className="mb-6 sm:mb-8 text-center lg:text-left">
                      <p className="text-base sm:text-lg leading-relaxed text-black/70 font-light">
                        {conference.description}
                      </p>
                    </div>

                    {/* Key Details */}
                    <div className="space-y-3 mb-8 text-center lg:text-left">
                      <div className="flex items-center gap-3 justify-center lg:justify-start text-black/80">
                        <MapPinIcon className="h-5 w-5 text-black/50" />
                        <span className="font-medium">{conference.location.city}, {conference.location.country}</span>
                      </div>
                      {conference.nextEvent && (
                        <div className="flex items-center gap-3 justify-center lg:justify-start text-black/80">
                          <CalendarIcon className="h-5 w-5 text-black/50" />
                          <span className="font-medium">{conference.nextEvent.displayDate}</span>
                        </div>
                      )}
                      {conference.expectedAttendees && (
                        <div className="flex items-center gap-3 justify-center lg:justify-start text-black/80">
                          <UsersIcon className="h-5 w-5 text-black/50" />
                          <span className="font-medium">{conference.expectedAttendees} attendees</span>
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                      <Button
                        asChild
                        size="lg"
                        className="w-full sm:w-auto bg-black text-white hover:bg-black/90 transition-all duration-300 font-semibold px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base shadow-2xl hover:shadow-3xl hover:scale-105 rounded-2xl"
                      >
                        <a
                          href={conference.website}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLinkIcon className="h-4 w-4 mr-2" />
                          Visit Official Website
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <section className="py-12 sm:py-16 lg:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* About Section */}
                  <Card className="rounded-2xl border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <UsersIcon className="h-5 w-5 text-gray-400" />
                        About {conference.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-gray-600 leading-relaxed">
                        {conference.longDescription || conference.description}
                      </p>

                      {/* Focus Areas */}
                      {conference.focusAreas.length > 0 && (
                        <div className="pt-4 border-t border-gray-100">
                          <h4 className="font-semibold text-sm text-gray-500 mb-3">FOCUS AREAS</h4>
                          <div className="flex flex-wrap gap-2">
                            {conference.focusAreas.map((area) => (
                              <span
                                key={area}
                                className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                              >
                                {area}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Media Coverage Feed */}
                  <Card className="rounded-2xl border-gray-200">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <SignalIcon className="h-5 w-5 text-gray-400" />
                        Media Coverage
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ConferenceContentFeed
                        outletName={conference.outletName}
                        conferenceName={conference.name}
                        limit={10}
                        showStats={true}
                      />
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Sidebar */}
                <div className="space-y-6">
                  {/* Quick Info Card */}
                  <Card className="rounded-2xl border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg">Conference Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-500 mb-1">LOCATION</h4>
                        <p className="text-gray-900">{conference.location.city}, {conference.location.country}</p>
                        {conference.location.venue && (
                          <p className="text-sm text-gray-600">{conference.location.venue}</p>
                        )}
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm text-gray-500 mb-1">TYPICAL TIME</h4>
                        <p className="text-gray-900">{conference.typicalMonth}</p>
                      </div>

                      {conference.nextEvent && (
                        <div>
                          <h4 className="font-semibold text-sm text-gray-500 mb-1">NEXT EVENT</h4>
                          <p className="text-gray-900">{conference.nextEvent.displayDate}</p>
                        </div>
                      )}

                      {conference.expectedAttendees && (
                        <div>
                          <h4 className="font-semibold text-sm text-gray-500 mb-1">EXPECTED ATTENDEES</h4>
                          <p className="text-gray-900">{conference.expectedAttendees}</p>
                        </div>
                      )}

                      {conference.firstHeld && (
                        <div>
                          <h4 className="font-semibold text-sm text-gray-500 mb-1">FIRST HELD</h4>
                          <p className="text-gray-900">{conference.firstHeld}</p>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold text-sm text-gray-500 mb-1">TYPE</h4>
                        <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                          {conference.type}
                        </span>
                      </div>

                      <div className="pt-4 border-t border-gray-100">
                        <Button asChild className="w-full rounded-xl">
                          <a
                            href={conference.website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <GlobeIcon className="h-4 w-4 mr-2" />
                            Official Website
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Related Conferences */}
                  {relatedConferences.length > 0 && (
                    <Card className="rounded-2xl border-gray-200">
                      <CardHeader>
                        <CardTitle className="text-lg">Related Conferences</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {relatedConferences.map((related) => (
                          <Link
                            key={related.id}
                            to={`/crypto-conferences/${related.id}`}
                            className="block p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <h4 className="font-medium text-gray-900 mb-1">{related.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <MapPinIcon className="h-3 w-3 text-gray-400" />
                              <span>{related.location.city}, {related.location.country}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                              <CalendarIcon className="h-3 w-3 text-gray-400" />
                              <span>{related.typicalMonth}</span>
                            </div>
                          </Link>
                        ))}

                        <Link
                          to="/crypto-conferences"
                          className="block text-center text-blue-600 hover:text-blue-700 font-medium text-sm pt-2"
                        >
                          View all conferences →
                        </Link>
                      </CardContent>
                    </Card>
                  )}

                  {/* Browse All */}
                  <Card className="rounded-2xl border-gray-200">
                    <CardContent className="pt-6">
                      <Link
                        to="/crypto-conferences"
                        className="block p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-center"
                      >
                        <h4 className="font-medium text-gray-900 mb-1">Browse All Conferences</h4>
                        <p className="text-sm text-gray-600">
                          Explore 16 tracked Bitcoin & crypto conferences
                        </p>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default TrackedConferencePage;
