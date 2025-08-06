'use client';

import { FlightOffer, Segment } from '@/types/flight';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Clock, MapPin } from 'lucide-react';

interface FlightCardProps {
  flight: FlightOffer;
  onSelect: (flight: FlightOffer) => void;
}

export default function FlightCard({ flight, onSelect }: FlightCardProps) {
  const itinerary = flight.itineraries[0];
  const firstSegment = itinerary.segments[0];
  const lastSegment = itinerary.segments[itinerary.segments.length - 1];
  
  const formatTime = (datetime: string) => {
    return new Date(datetime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDuration = (duration: string) => {
    // Convert PT4H30M to 4h 30m
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    if (!match) return duration;
    
    const hours = match[1] ? match[1].replace('H', 'h ') : '';
    const minutes = match[2] ? match[2].replace('M', 'm') : '';
    return `${hours}${minutes}`.trim();
  };

  const getStopsText = () => {
    const totalStops = itinerary.segments.reduce((acc, segment) => acc + segment.numberOfStops, 0);
    if (totalStops === 0) return 'Direct';
    return `${totalStops} stop${totalStops > 1 ? 's' : ''}`;
  };

  return (
    <Card className="p-6 bg-gray-900 border-gray-700 hover:bg-gray-800 transition-colors">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Flight Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {formatTime(firstSegment.departure.at)}
                </div>
                <div className="text-sm text-gray-400">{firstSegment.departure.iataCode}</div>
              </div>
              
              <div className="flex-1 flex flex-col items-center px-4">
                <div className="flex items-center space-x-2 mb-1">
                  <Plane className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    {formatDuration(itinerary.duration)}
                  </span>
                </div>
                <div className="w-full h-px bg-gray-600 relative">
                  <div className="absolute inset-0 flex justify-center">
                    <span className="bg-gray-900 px-2 text-xs text-gray-400">
                      {getStopsText()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {formatTime(lastSegment.arrival.at)}
                </div>
                <div className="text-sm text-gray-400">{lastSegment.arrival.iataCode}</div>
              </div>
            </div>
          </div>

          {/* Airline Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>{flight.validatingAirlineCodes[0]}</span>
            <span>•</span>
            <span>{itinerary.segments.length > 1 ? `${itinerary.segments.length} segments` : 'Direct flight'}</span>
            {flight.pricingOptions.fareType.length > 0 && (
              <>
                <span>•</span>
                <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                  {flight.pricingOptions.fareType[0]}
                </Badge>
              </>
            )}
          </div>
        </div>

        {/* Price & Select */}
        <div className="text-right">
          <div className="mb-2">
            <span className="text-sm text-gray-400">from</span>
            <div className="text-3xl font-bold text-white">
              {flight.price.currency} {flight.price.total}
            </div>
            <div className="text-sm text-gray-400">per person</div>
          </div>
          
          <Button 
            onClick={() => onSelect(flight)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Select Flight
          </Button>
        </div>
      </div>
    </Card>
  );
}