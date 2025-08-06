'use client';

import { FlightOffer, Segment } from '@/types/flight';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Plane, Clock, Luggage, Utensils } from 'lucide-react';

interface FlightDetailsProps {
  flight: FlightOffer;
  onBack: () => void;
  onBook: (flight: FlightOffer) => void;
}

export default function FlightDetails({ flight, onBack, onBook }: FlightDetailsProps) {
  const formatTime = (datetime: string) => {
    return new Date(datetime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (datetime: string) => {
    return new Date(datetime).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDuration = (duration: string) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    if (!match) return duration;
    
    const hours = match[1] ? match[1].replace('H', 'h ') : '';
    const minutes = match[2] ? match[2].replace('M', 'm') : '';
    return `${hours}${minutes}`.trim();
  };

  const renderSegment = (segment: Segment, index: number, isLast: boolean) => {
    return (
      <div key={segment.id} className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-3">
              <div className="text-center">
                <div className="text-xl font-bold text-white">
                  {formatTime(segment.departure.at)}
                </div>
                <div className="text-sm text-gray-400">
                  {formatDate(segment.departure.at)}
                </div>
                <div className="text-sm text-gray-400">
                  {segment.departure.iataCode}
                </div>
                {segment.departure.terminal && (
                  <div className="text-xs text-gray-500">
                    Terminal {segment.departure.terminal}
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col items-center px-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Plane className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-300">
                    {segment.carrierCode} {segment.number}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  {formatDuration(segment.duration)}
                </div>
                <div className="w-full h-px bg-gray-600"></div>
                <div className="text-xs text-gray-500 mt-2">
                  {segment.aircraft.code}
                </div>
              </div>

              <div className="text-center">
                <div className="text-xl font-bold text-white">
                  {formatTime(segment.arrival.at)}
                </div>
                <div className="text-sm text-gray-400">
                  {formatDate(segment.arrival.at)}
                </div>
                <div className="text-sm text-gray-400">
                  {segment.arrival.iataCode}
                </div>
                {segment.arrival.terminal && (
                  <div className="text-xs text-gray-500">
                    Terminal {segment.arrival.terminal}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {!isLast && (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock className="h-4 w-4" />
              <span>Layover</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const travelerPricing = flight.travelerPricings[0];
  const fareDetails = travelerPricing?.fareDetailsBySegment[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Results
        </Button>
        <Badge variant="secondary" className="bg-gray-700 text-gray-300">
          Flight ID: {flight.id}
        </Badge>
      </div>

      {/* Flight Details */}
      <Card className="p-6 bg-gray-900 border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6">Flight Details</h2>
        
        {flight.itineraries.map((itinerary, itineraryIndex) => (
          <div key={itineraryIndex} className="space-y-6">
            {itineraryIndex > 0 && <Separator className="bg-gray-700 my-8" />}
            
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">
                {flight.oneWay ? 'Outbound' : itineraryIndex === 0 ? 'Outbound' : 'Return'}
              </h3>
              <span className="text-sm text-gray-400">
                Total Duration: {formatDuration(itinerary.duration)}
              </span>
            </div>

            {itinerary.segments.map((segment, segmentIndex) =>
              renderSegment(segment, segmentIndex, segmentIndex === itinerary.segments.length - 1)
            )}
          </div>
        ))}
      </Card>

      {/* Fare Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-gray-900 border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Fare Details</h3>
          <div className="space-y-3">
            {fareDetails && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cabin Class</span>
                  <span className="text-white">{fareDetails.cabin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Fare Basis</span>
                  <span className="text-white">{fareDetails.fareBasis}</span>
                </div>
                {fareDetails.brandedFareLabel && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fare Type</span>
                    <span className="text-white">{fareDetails.brandedFareLabel}</span>
                  </div>
                )}
              </>
            )}
            <Separator className="bg-gray-700" />
            <div className="flex justify-between">
              <span className="text-gray-400">Base Fare</span>
              <span className="text-white">{flight.price.currency} {flight.price.base}</span>
            </div>
            {flight.price.fees.map((fee, index) => (
              <div key={index} className="flex justify-between">
                <span className="text-gray-400">{fee.type}</span>
                <span className="text-white">{flight.price.currency} {fee.amount}</span>
              </div>
            ))}
            <Separator className="bg-gray-700" />
            <div className="flex justify-between font-semibold">
              <span className="text-white">Total</span>
              <span className="text-white">{flight.price.currency} {flight.price.total}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gray-900 border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Included Services</h3>
          <div className="space-y-3">
            {fareDetails && (
              <>
                <div className="flex items-center space-x-3">
                  <Luggage className="h-4 w-4 text-blue-400" />
                  <div>
                    <span className="text-white">Checked Baggage</span>
                    <div className="text-sm text-gray-400">
                      {fareDetails.includedCheckedBags.quantity} piece(s)
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Luggage className="h-4 w-4 text-blue-400" />
                  <div>
                    <span className="text-white">Cabin Baggage</span>
                    <div className="text-sm text-gray-400">
                      {fareDetails.includedCabinBags.quantity} piece(s)
                    </div>
                  </div>
                </div>

                {fareDetails.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Utensils className="h-4 w-4 text-blue-400" />
                    <div>
                      <span className="text-white">{amenity.amenityType}</span>
                      <div className="text-sm text-gray-400">
                        {amenity.description}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </Card>
      </div>

      {/* Book Button */}
      <Card className="p-6 bg-gray-900 border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white">Ready to book?</h3>
            <p className="text-gray-400">Complete your reservation for this flight</p>
          </div>
          <Button
            onClick={() => onBook(flight)}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Book Now - {flight.price.currency} {flight.price.total}
          </Button>
        </div>
      </Card>
    </div>
  );
}