'use client';

import { useState, useMemo } from 'react';
import { FlightOffer, FlightOfferDateEntry } from '@/types/flight';
import FlightSearch, { SearchParams, FilterOptions } from '@/components/flight-search';
import FlightCard from '@/components/flight-card';
import FlightDetails from '@/components/flight-details';
import FlightFilters from '@/components/flight-filters';
import { sampleFlights } from '@/data/sample-flights';
import { Star, Award, Shield, Loader2, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type ViewState = 'search' | 'results' | 'details' | 'booking';

const backend = process.env.BACKEND || "http://127.0.0.1:8000"

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
  const [allFlights, setAllFlights] = useState<FlightOffer[]>([]); // Store all flights from search
  const [selectedFlight, setSelectedFlight] = useState<FlightOffer | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<FilterOptions | null>(null);
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({
    maxPrice: null,
    sortBy: 'price-low',
    maxStops: null,
    airlines: [],
    departureTime: 'any'
  });
  const [isLoading, setIsLoading] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

    const handleSearch = async (params: SearchParams, filters: FilterOptions) => {
    setSearchParams(params);
    setAppliedFilters(filters);
    setCurrentFilters(filters); // Set current filters to match applied filters
    setIsLoading(true);
    
    try {
      // Send request to backend
      const searchResults = await searchFlights(params);
      
      // Store all flights for filtering
      setAllFlights(searchResults);
      
      // Apply initial filters
      const filteredFlights = applyFilters(searchResults, filters);
      setFlights(filteredFlights);
      setView('results');
    } catch (error) {
      console.error('Error during search:', error);
      // Fallback to sample flights
      setAllFlights(sampleFlights);
      const filteredFlights = applyFilters(sampleFlights, filters);
      setFlights(filteredFlights);
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

  // Function to apply filters to flights
  const applyFilters = (flightsToFilter: FlightOffer[], filtersToApply: FilterOptions): FlightOffer[] => {
    let filteredFlights = [...flightsToFilter];
    
    // Apply price filter
    if (filtersToApply.maxPrice !== null) {
      filteredFlights = filteredFlights.filter(flight => {
        const price = parseFloat(flight.price.total);
        return price <= filtersToApply.maxPrice!;
      });
    }

    // Apply stops filter
    if (filtersToApply.maxStops !== null) {
      filteredFlights = filteredFlights.filter(flight => {
        const maxStopsInItinerary = Math.max(...flight.itineraries.map(itinerary => 
          itinerary.segments.reduce((total, segment) => total + segment.numberOfStops, 0)
        ));
        return maxStopsInItinerary <= filtersToApply.maxStops!;
      });
    }

    // Apply airline filter
    if (filtersToApply.airlines.length > 0) {
      filteredFlights = filteredFlights.filter(flight => {
        const flightAirlines = flight.itineraries.flatMap(itinerary => 
          itinerary.segments.map(segment => segment.carrierCode)
        );
        return flightAirlines.some(airline => filtersToApply.airlines.includes(airline));
      });
    }

    // Apply departure time filter
    if (filtersToApply.departureTime !== 'any') {
      filteredFlights = filteredFlights.filter(flight => {
        const departureTime = new Date(flight.itineraries[0].segments[0].departure.at);
        const hour = departureTime.getHours();
        
        switch (filtersToApply.departureTime) {
          case 'morning': return hour >= 6 && hour < 12;
          case 'afternoon': return hour >= 12 && hour < 18;
          case 'evening': return hour >= 18 && hour < 22;
          case 'night': return hour >= 22 || hour < 6;
          default: return true;
        }
      });
    }
    
    // Apply sorting
    filteredFlights.sort((a, b) => {
      switch (filtersToApply.sortBy) {
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
    
    return filteredFlights;
  };

  // Handle filter changes from the filters component
  const handleFiltersChange = (newFilters: FilterOptions) => {
    setCurrentFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
    const filteredFlights = applyFilters(allFlights, newFilters);
    setFlights(filteredFlights);
  };

  // Clear all filters
  const handleClearAllFilters = () => {
    const defaultFilters: FilterOptions = {
      maxPrice: null,
      sortBy: 'price-low',
      maxStops: null,
      airlines: [],
      departureTime: 'any'
    };
    setCurrentFilters(defaultFilters);
    setCurrentPage(1); // Reset to first page
    setFlights(allFlights); // Show all flights without filtering
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

  // Pagination calculations
  const totalPages = Math.ceil(flights.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentFlights = flights.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
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
        {/* Header */}
        <div className="bg-card border-b border-border px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Flight Results</h1>
                <p className="text-muted-foreground">
                  {flights.length} flights found
                  {currentFilters.maxPrice !== null && ` • Max price: $${currentFilters.maxPrice}`}
                  {currentFilters.maxStops !== null && ` • Max stops: ${currentFilters.maxStops}`}
                  {currentFilters.airlines.length > 0 && ` • Airlines: ${currentFilters.airlines.join(', ')}`}
                  {currentFilters.departureTime !== 'any' && ` • Time: ${currentFilters.departureTime}`}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setView('search')}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Modify Search
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setView('search')}
                >
                  Back to Search
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <FlightFilters
                filters={currentFilters}
                onFiltersChange={handleFiltersChange}
                onClearAll={handleClearAllFilters}
              />
            </div>

            {/* Results */}
            <div className="lg:col-span-3">
              {flights.length === 0 ? (
                <Card className="p-8 text-center">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">No flights match your filters</h3>
                    <p className="text-muted-foreground">Try adjusting your search criteria or clearing all filters.</p>
                    <Button onClick={handleClearAllFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="space-y-4">
                  {/* Pagination Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      Showing {startIndex + 1}-{Math.min(endIndex, flights.length)} of {flights.length} flights
                    </span>
                    <div className="flex items-center gap-2">
                      <span>Show:</span>
                      <Select value={pageSize.toString()} onValueChange={(value) => {
                        setPageSize(parseInt(value));
                        setCurrentPage(1); // Reset to first page when changing page size
                      }}>
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                      </Select>
                      <span>per page</span>
                    </div>
                  </div>

                  {/* Flight Cards */}
                  <div className="space-y-4">
                    {currentFlights.map((flight) => (
                      <FlightCard
                        key={flight.id}
                        flight={flight}
                        onClick={() => {
                          setSelectedFlight(flight);
                          setView('details');
                        }}
                      />
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      
                      {/* Page Numbers */}
                      <div className="flex items-center gap-1">
                        {/* First page */}
                        {currentPage > 3 && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => goToPage(1)}
                              className="w-8 h-8"
                            >
                              1
                            </Button>
                            {currentPage > 4 && (
                              <span className="px-2 text-muted-foreground">...</span>
                            )}
                          </>
                        )}
                        
                        {/* Current page and surrounding pages */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const page = Math.max(1, Math.min(totalPages, currentPage - 2 + i));
                          if (page < 1 || page > totalPages) return null;
                          
                          return (
                            <Button
                              key={page}
                              variant={page === currentPage ? "default" : "outline"}
                              size="sm"
                              onClick={() => goToPage(page)}
                              className="w-8 h-8"
                            >
                              {page}
                            </Button>
                          );
                        })}
                        
                        {/* Last page */}
                        {currentPage < totalPages - 2 && (
                          <>
                            {currentPage < totalPages - 3 && (
                              <span className="px-2 text-muted-foreground">...</span>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => goToPage(totalPages)}
                              className="w-8 h-8"
                            >
                              {totalPages}
                            </Button>
                          </>
                        )}
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Button */}
        <Button
          className="fixed bottom-6 right-6 lg:hidden z-50 shadow-lg"
          size="lg"
          onClick={() => {
            const mobileFilterTrigger = document.querySelector('[data-mobile-filter-trigger]') as HTMLButtonElement;
            if (mobileFilterTrigger) {
              mobileFilterTrigger.click();
            }
          }}
        >
          <Filter className="h-5 w-5 mr-2" />
          Filters
        </Button>
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