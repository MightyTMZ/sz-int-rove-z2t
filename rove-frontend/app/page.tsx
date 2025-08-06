'use client';

import { useState } from 'react';
import { FlightOffer } from '@/types/flight';
import FlightSearch, { SearchParams, FilterOptions } from '@/components/flight-search';
import FlightCard from '@/components/flight-card';
import FlightDetails from '@/components/flight-details';
import { sampleFlights } from '@/data/sample-flights';
import { Plane, Star, Award, Shield } from 'lucide-react';
import { Card } from '@/components/ui/card';

type ViewState = 'search' | 'results' | 'details' | 'booking';

export default function Home() {
  const [view, setView] = useState<ViewState>('search');
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions | null>(null);

  const handleSearch = (params: SearchParams, filters: FilterOptions) => {
    setSearchParams(params);
    setAppliedFilters(filters);
    
    // Simulate API call - in real app, this would fetch from API
    let filteredFlights = [...sampleFlights];
    
    // Apply price filter
    filteredFlights = filteredFlights.filter(flight => {
      const price = parseFloat(flight.price.total);
      return price >= filters.priceRange.min && price <= filters.priceRange.max;
    });
    
    // Apply sorting
    filteredFlights.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return parseFloat(a.price.total) - parseFloat(b.price.total);
        case 'price-high':
          return parseFloat(b.price.total) - parseFloat(a.price.total);
        case 'duration':
          const aDuration = a.itineraries[0].duration;
          const bDuration = b.itineraries[0].duration;
          const aMinutes = parseDuration(aDuration);
          const bMinutes = parseDuration(bDuration);
          return aMinutes - bMinutes;
        case 'departure':
          const aTime = new Date(a.itineraries[0].segments[0].departure.at).getTime();
          const bTime = new Date(b.itineraries[0].segments[0].departure.at).getTime();
          return aTime - bTime;
        default:
          return 0;
      }
    });
    
    setFlights(filteredFlights);
    setView('results');
  };

  // Helper function to parse duration string (PT6H30M) to minutes
  const parseDuration = (duration: string): number => {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    if (!match) return 0;
    
    const hours = match[1] ? parseInt(match[1].replace('H', '')) : 0;
    const minutes = match[2] ? parseInt(match[2].replace('M', '')) : 0;
    return hours * 60 + minutes;
  };

  const handleSelectFlight = (flight: FlightOffer) => {
    setSelectedFlight(flight);
    setView('details');
  };

  const handleBookFlight = (flight: FlightOffer) => {
    // In real app, this would initiate booking process
    alert(`Booking flight ${flight.id}. In a real app, this would redirect to booking form.`);
  };

  const handleBackToResults = () => {
    setView('results');
  };

  const handleBackToSearch = () => {
    setView('search');
  };

  const getSortLabel = (sortBy: string) => {
    switch (sortBy) {
      case 'price-low': return 'Price: Low to High';
      case 'price-high': return 'Price: High to Low';
      case 'duration': return 'Duration: Shortest First';
      case 'departure': return 'Departure: Earliest First';
      default: return 'Default';
    }
  };
  if (view === 'details' && selectedFlight) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <FlightDetails
            flight={selectedFlight}
            onBack={handleBackToResults}
            onBook={handleBookFlight}
          />
        </div>
      </div>
    );
  }

  if (view === 'results') {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleBackToSearch}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Back to Search
              </button>
              <div className="text-right">
                <div className="text-sm text-gray-400">
                  {searchParams?.from} → {searchParams?.to} • {(searchParams?.adults || 0) + (searchParams?.children || 0)} passenger{((searchParams?.adults || 0) + (searchParams?.children || 0)) !== 1 ? 's' : ''}
                </div>
                <div className="text-white font-semibold">
                  {flights.length} flights found
                </div>
              </div>
            </div>
            
            {/* Applied Filters Summary */}
            {appliedFilters && (
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                <span>Filters applied:</span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">
                  ${appliedFilters.priceRange.min} - ${appliedFilters.priceRange.max}
                </span>
                <span className="bg-gray-800 px-3 py-1 rounded-full">
                  {getSortLabel(appliedFilters.sortBy)}
                </span>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="space-y-4">
            {flights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onSelect={handleSelectFlight}
              />
            ))}
            
            {flights.length === 0 && (
              <Card className="p-8 bg-gray-900 border-gray-700 text-center">
                <div className="text-gray-400 mb-2">No flights found</div>
                <div className="text-sm text-gray-500">
                  Try adjusting your filters or search criteria
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="relative container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Rove
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover exceptional flights with premium service and unbeatable prices. 
              Your journey begins with the perfect flight.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto mb-16">
            <FlightSearch onSearch={handleSearch} />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-gray-900 border-gray-700 text-center">
              <Star className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Best Prices</h3>
              <p className="text-gray-400 text-sm">
                Compare millions of flights to find the best deals and save on your next trip.
              </p>
            </Card>
            
            <Card className="p-6 bg-gray-900 border-gray-700 text-center">
              <Award className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Premium Service</h3>
              <p className="text-gray-400 text-sm">
                Experience world-class service with our carefully selected airline partners.
              </p>
            </Card>
            
            <Card className="p-6 bg-gray-900 border-gray-700 text-center">
              <Shield className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Secure Booking</h3>
              <p className="text-gray-400 text-sm">
                Book with confidence using our secure platform and flexible cancellation.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}