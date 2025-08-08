'use client';

import { useState } from 'react';
import { FlightOffer, FlightOfferDateEntry } from '@/types/flight';
import FlightSearch, { SearchParams, FilterOptions } from '@/components/flight-search';
import FlightCard from '@/components/flight-card';
import FlightDetails from '@/components/flight-details';
import { sampleFlights } from '@/data/sample-flights';
import { Star, Award, Shield, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

type ViewState = 'search' | 'results' | 'details' | 'booking';

// const backend = process.env.BACKEND || "http://127.0.0.1:8000"
const backend = process.env.BACKEND

// API function to send flight search request
async function searchFlights(searchParams: SearchParams): Promise<FlightOffer[]> {
  try {
    const payload = {
      origin_airport: searchParams.from,
      destination_airport: searchParams.to,
      departure_date: searchParams.departDate,
      return_date: searchParams.returnDate || null,
      number_of_adults: searchParams.adults,
      number_of_children: searchParams.children,
      number_of_infants_in_seat: 0,
      number_of_infants_on_lap: 0,
      cabin_class: searchParams.cabinClass,
      currency: "USD" // hardcoded for now
    };

    console.log('Sending search request:', payload);

    const response = await fetch(`${backend}/searches/create-new-search/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const flightData: FlightOfferDateEntry = await response.json();
    console.log('Received flight data:', flightData);
    
    const flightOffers = flightData.data;
    
    const flights: FlightOffer[] = flightOffers;    

    return flights;
  } catch (error) {
    console.error('Error searching flights:', error);
    // Return sample flights as fallback
    return sampleFlights;
  }
}

export default function Home() {
  const [view, setView] = useState<ViewState>('search');
  const [flights, setFlights] = useState<FlightOffer[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (params: SearchParams, filters: FilterOptions) => {
    setSearchParams(params);
    setAppliedFilters(filters);
    setIsLoading(true);
    
    try {
      // Send request to backend
      const searchResults = await searchFlights(params);
      
      // Apply filters to the results
      let filteredFlights = searchResults;
      
      // Apply price filter
      filteredFlights = filteredFlights.filter(flight => {
        const price = parseFloat(flight.price.total);
        // Only apply max price filter if it's set (not null)
        if (filters.maxPrice !== null) {
          return price <= filters.maxPrice;
        }
        return true; // No price limit
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
    } catch (error) {
      console.error('Error during search:', error);
      // Fallback to sample flights
      setFlights(sampleFlights);
      setView('results');
    } finally {
      setIsLoading(false);
    }
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
      <div className="min-h-screen bg-background">
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
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleBackToSearch}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back to Search
              </button>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">
                  {searchParams?.from} → {searchParams?.to} • {(searchParams?.adults || 0) + (searchParams?.children || 0)} passenger{((searchParams?.adults || 0) + (searchParams?.children || 0)) !== 1 ? 's' : ''}
                </div>
                <div className="text-foreground font-semibold">
                  {isLoading ? 'Searching...' : `${flights.length} flights found`}
                </div>
              </div>
            </div>
            
            {/* Applied Filters Summary */}
            {appliedFilters && (
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                <span>Filters applied:</span>
                {appliedFilters.maxPrice !== null && (
                  <span className="bg-card border border-border px-3 py-1 rounded-full">
                    Under ${appliedFilters.maxPrice}
                  </span>
                )}
                <span className="bg-card border border-border px-3 py-1 rounded-full">
                  {getSortLabel(appliedFilters.sortBy)}
                </span>
                {searchParams?.cabinClass && (
                  <span className="bg-card border border-border px-3 py-1 rounded-full">
                    {searchParams.cabinClass === 'ECONOMY' ? 'Economy' :
                     searchParams.cabinClass === 'PREMIUM_ECONOMY' ? 'Premium Economy' :
                     searchParams.cabinClass === 'BUSINESS' ? 'Business' :
                     searchParams.cabinClass === 'FIRST' ? 'First Class' : searchParams.cabinClass}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="space-y-4">
            {isLoading ? (
              <Card className="p-8 bg-card border-border text-center">
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                  <div className="text-foreground">Searching for flights...</div>
                </div>
              </Card>
            ) : flights.length > 0 ? (
              flights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  onSelect={handleSelectFlight}
                />
              ))
            ) : (
              <Card className="p-8 bg-card border-border text-center">
                <div className="text-muted-foreground mb-2">No flights found</div>
                <div className="text-sm text-muted-foreground">
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-card via-background to-card"></div>
        <div className="relative container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Rove
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover exceptional flights with premium service and unbeatable prices. 
              Your journey begins with the perfect flight.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto mb-16">
            <FlightSearch onSearch={handleSearch} isLoading={isLoading} />
          </div>

          {/* Features */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 bg-card border-border text-center">
              <Star className="h-8 w-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Best Prices</h3>
              <p className="text-muted-foreground text-sm">
                Compare millions of flights to find the best deals and save on your next trip.
              </p>
            </Card>
            
            <Card className="p-6 bg-card border-border text-center">
              <Award className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Premium Service</h3>
              <p className="text-muted-foreground text-sm">
                Experience world-class service with our carefully selected airline partners.
              </p>
            </Card>
            
            <Card className="p-6 bg-card border-border text-center">
              <Shield className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Secure Booking</h3>
              <p className="text-muted-foreground text-sm">
                Book with confidence using our secure platform and flexible cancellation.
              </p>
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
}