'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, Users, ArrowLeftRight, Filter, Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { CabinClass } from '@/types/flight';
import { inOneMonth, threeDaysLater } from './next-date';

interface FlightSearchProps {
  onSearch: (searchParams: SearchParams, filters: FilterOptions) => void;
  isLoading?: boolean;
}

export interface SearchParams {
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  tripType: 'oneway' | 'roundtrip';
  cabinClass: CabinClass;
  roveMiles?: number; // New field for Rove Miles
}

export interface FilterOptions {
  maxPrice: number | null; // null means no limit
  sortBy: 'price-low' | 'price-high' | 'duration' | 'departure' | 'value-per-mile';
  maxStops: number | null; // null means no limit
  airlines: string[]; // empty array means all airlines
  departureTime: 'any' | 'morning' | 'afternoon' | 'evening' | 'night';
  minValuePerMile: number | null; // null means no limit
}

export default function FlightSearch({ onSearch, isLoading = false }: FlightSearchProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: 'JFK',
    to: 'LAX',
    departDate: inOneMonth,
    returnDate: threeDaysLater,
    adults: 1,
    children: 0,
    tripType: 'roundtrip',
    cabinClass: 'ECONOMY',
    roveMiles: undefined, // Initialize Rove Miles
  });

  const [filters, setFilters] = useState<FilterOptions>({
    maxPrice: null,
    sortBy: 'price-low',
    maxStops: null,
    airlines: [],
    departureTime: 'any',
    minValuePerMile: null
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    if (!isLoading) {
      onSearch(searchParams, filters);
    }
  };

  const swapAirports = () => {
    setSearchParams(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  // Cabin class options with friendly display names
  const cabinClassOptions = [
    { value: 'ECONOMY' as CabinClass, label: 'Economy' },
    { value: 'PREMIUM_ECONOMY' as CabinClass, label: 'Premium Economy' },
    { value: 'BUSINESS' as CabinClass, label: 'Business' },
    { value: 'FIRST' as CabinClass, label: 'First Class' }
  ];

  return (
    <div className="space-y-4">
      <Card className="p-8 bg-card border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Trip Type */}
        <div className="col-span-full">
          <div className="flex space-x-4">
            <Button
              variant={searchParams.tripType === 'roundtrip' ? 'default' : 'outline'}
              onClick={() => setSearchParams(prev => ({ ...prev, tripType: 'roundtrip' }))}
              className="bg-blue-600 hover:bg-blue-700 text-white border-border"
            >
              Round Trip
            </Button>
            <Button
              variant={searchParams.tripType === 'oneway' ? 'default' : 'outline'}
              onClick={() => setSearchParams(prev => ({ ...prev, tripType: 'oneway', returnDate: undefined }))}
              className="bg-blue-600 hover:bg-blue-700 text-white border-border"
            >
              One Way
            </Button>
          </div>
        </div>

        {/* From/To */}
        <div className="col-span-full lg:col-span-2 flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                value={searchParams.from}
                onChange={(e) => setSearchParams(prev => ({ ...prev, from: e.target.value }))}
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
                placeholder="JFK"
              />
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={swapAirports}
            className="mt-7 hover:bg-accent text-muted-foreground"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                value={searchParams.to}
                onChange={(e) => setSearchParams(prev => ({ ...prev, to: e.target.value }))}
                className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground"
                placeholder="LAX"
              />
            </div>
          </div>
        </div>

        {/* Departure Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Departure</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="date"
              value={searchParams.departDate}
              onChange={(e) => setSearchParams(prev => ({ ...prev, departDate: e.target.value }))}
              className="pl-10 bg-background border-border text-foreground"
            />
          </div>
        </div>

        {/* Return Date */}
        {searchParams.tripType === 'roundtrip' && (
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Return</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="date"
                value={searchParams.returnDate || ''}
                onChange={(e) => setSearchParams(prev => ({ ...prev, returnDate: e.target.value }))}
                className="pl-10 bg-background border-border text-foreground"
              />
            </div>
          </div>
        )}

        {/* Cabin Class */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Cabin Class</label>
          <Select
            value={searchParams.cabinClass}
            onValueChange={(value: CabinClass) => setSearchParams(prev => ({ ...prev, cabinClass: value }))}
          >
            <SelectTrigger className="bg-background border-border text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-background border-border">
              {cabinClassOptions.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value} 
                  className="text-foreground hover:bg-accent"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Passengers */}
        <div className="col-span-full lg:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">Passengers</label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Adults (18+)</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="number"
                  min="1"
                  max="9"
                  value={searchParams.adults}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, adults: parseInt(e.target.value) || 1 }))}
                  className="pl-10 bg-background border-border text-foreground"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Children (2-17)</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="number"
                  min="0"
                  max="8"
                  value={searchParams.children}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, children: parseInt(e.target.value) || 0 }))}
                  className="pl-10 bg-background border-border text-foreground"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Rove Miles */}
        <div className="col-span-full lg:col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">Rove Miles (Optional)</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="number"
              min="0"
              value={searchParams.roveMiles || ''}
              onChange={(e) => setSearchParams(prev => ({ ...prev, roveMiles: e.target.value ? parseInt(e.target.value) : undefined }))}
              className="pl-10 bg-background border-border text-foreground"
              placeholder="Enter miles you want to spend"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Enter the number of Rove Miles you want to spend to see value per mile calculations
          </p>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button 
          onClick={handleSearch}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            'Search Flights'
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="border-border text-foreground hover:bg-accent hover:text-accent-foreground"
          size="lg"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
    </Card>

    {/* Filters Panel */}
    {showFilters && (
      <Card className="p-6 bg-card border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Filters & Sorting</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Maximum Price */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">Maximum Price (USD)</Label>
            <div className="space-y-3">
              <div>
                <Input
                  type="number"
                  min="0"
                  value={filters.maxPrice || ''}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    maxPrice: e.target.value ? parseInt(e.target.value) : null
                  }))}
                  className="bg-background border-border text-foreground"
                  placeholder="No limit"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, maxPrice: null }))}
                className="w-full justify-start border-border text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Clear Price Limit
              </Button>
            </div>
          </div>
          {/* Sort By */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">Sort By</Label>
            <Select
              value={filters.sortBy}
              onValueChange={(value: 'price-low' | 'price-high' | 'duration' | 'departure' | 'value-per-mile') => 
                setFilters(prev => ({ ...prev, sortBy: value }))
              }
            >
              <SelectTrigger className="bg-background border-border text-foreground">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-border">
                <SelectItem value="price-low" className="text-foreground hover:bg-accent">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high" className="text-foreground hover:bg-accent">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="duration" className="text-foreground hover:bg-accent">
                  Duration: Shortest First
                </SelectItem>
                <SelectItem value="departure" className="text-foreground hover:bg-accent">
                  Departure Time: Earliest First
                </SelectItem>
                {searchParams.roveMiles && (
                  <SelectItem value="value-per-mile" className="text-foreground hover:bg-accent">
                    Best Value per Mile
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          {/* Quick Price Filters */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">Quick Filters</Label>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, maxPrice: null }))}
                className="w-full justify-start border-border text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                No Price Limit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, maxPrice: 200 }))}
                className="w-full justify-start border-border text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Under $200
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, maxPrice: 500 }))}
                className="w-full justify-start border-border text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Under $500
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, maxPrice: 1000 }))}
                className="w-full justify-start border-border text-foreground hover:bg-accent hover:text-accent-foreground"
              >
                Under $1,000
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )}
  </div>
  );
}