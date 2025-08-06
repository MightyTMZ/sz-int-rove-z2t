'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calendar, MapPin, Users, ArrowLeftRight, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface FlightSearchProps {
  onSearch: (searchParams: SearchParams, filters: FilterOptions) => void;
}

export interface SearchParams {
  from: string;
  to: string;
  departDate: string;
  returnDate?: string;
  adults: number;
  children: number;
  tripType: 'oneway' | 'roundtrip';
}

export interface FilterOptions {
  priceRange: {
    min: number;
    max: number;
  };
  sortBy: 'price-low' | 'price-high' | 'duration' | 'departure';
}

export default function FlightSearch({ onSearch }: FlightSearchProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    from: 'JFK',
    to: 'LAX',
    departDate: '2024-03-15',
    returnDate: '2024-03-22',
    adults: 1,
    children: 0,
    tripType: 'roundtrip'
  });

  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: {
      min: 0,
      max: 2000
    },
    sortBy: 'price-low'
  });

  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    onSearch(searchParams, filters);
  };

  const swapAirports = () => {
    setSearchParams(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  return (
    <div className="space-y-4">
      <Card className="p-8 bg-gray-900 border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Trip Type */}
        <div className="col-span-full">
          <div className="flex space-x-4">
            <Button
              variant={searchParams.tripType === 'roundtrip' ? 'default' : 'outline'}
              onClick={() => setSearchParams(prev => ({ ...prev, tripType: 'roundtrip' }))}
              className="bg-blue-600 hover:bg-blue-700 text-white border-gray-600"
            >
              Round Trip
            </Button>
            <Button
              variant={searchParams.tripType === 'oneway' ? 'default' : 'outline'}
              onClick={() => setSearchParams(prev => ({ ...prev, tripType: 'oneway' }))}
              className="bg-blue-600 hover:bg-blue-700 text-white border-gray-600"
            >
              One Way
            </Button>
          </div>
        </div>

        {/* From/To */}
        <div className="col-span-full lg:col-span-2 flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                value={searchParams.from}
                onChange={(e) => setSearchParams(prev => ({ ...prev, from: e.target.value }))}
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                placeholder="JFK"
              />
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={swapAirports}
            className="mt-7 hover:bg-gray-700 text-gray-400"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                value={searchParams.to}
                onChange={(e) => setSearchParams(prev => ({ ...prev, to: e.target.value }))}
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                placeholder="LAX"
              />
            </div>
          </div>
        </div>

        {/* Departure Date */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Departure</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="date"
              value={searchParams.departDate}
              onChange={(e) => setSearchParams(prev => ({ ...prev, departDate: e.target.value }))}
              className="pl-10 bg-gray-800 border-gray-600 text-white"
            />
          </div>
        </div>

        {/* Return Date */}
        {searchParams.tripType === 'roundtrip' && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Return</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="date"
                value={searchParams.returnDate || ''}
                onChange={(e) => setSearchParams(prev => ({ ...prev, returnDate: e.target.value }))}
                className="pl-10 bg-gray-800 border-gray-600 text-white"
              />
            </div>
          </div>
        )}

        {/* Passengers */}
        <div className="col-span-full lg:col-span-2">
          <label className="block text-sm font-medium text-gray-300 mb-2">Passengers</label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Adults (18+)</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="number"
                  min="1"
                  max="9"
                  value={searchParams.adults}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, adults: parseInt(e.target.value) || 1 }))}
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Children (2-17)</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="number"
                  min="0"
                  max="8"
                  value={searchParams.children}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, children: parseInt(e.target.value) || 0 }))}
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <Button 
          onClick={handleSearch}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
          size="lg"
        >
          Search Flights
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
          size="lg"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>
    </Card>

    {/* Filters Panel */}
    {showFilters && (
      <Card className="p-6 bg-gray-900 border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">Filters & Sorting</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium text-gray-300 mb-3 block">Price Range (USD)</Label>
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-gray-400 mb-1 block">Minimum</Label>
                <Input
                  type="number"
                  min="0"
                  value={filters.priceRange.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, min: parseInt(e.target.value) || 0 }
                  }))}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="0"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-400 mb-1 block">Maximum</Label>
                <Input
                  type="number"
                  min="0"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, max: parseInt(e.target.value) || 2000 }
                  }))}
                  className="bg-gray-800 border-gray-600 text-white"
                  placeholder="2000"
                />
              </div>
            </div>
          {/* Sort By */}
          <div>
            <Label className="text-sm font-medium text-gray-300 mb-3 block">Sort By</Label>
            <Select
              value={filters.sortBy}
              onValueChange={(value: 'price-low' | 'price-high' | 'duration' | 'departure') => 
                setFilters(prev => ({ ...prev, sortBy: value }))
              }
            >
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="price-low" className="text-white hover:bg-gray-700">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high" className="text-white hover:bg-gray-700">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="duration" className="text-white hover:bg-gray-700">
                  Duration: Shortest First
                </SelectItem>
                <SelectItem value="departure" className="text-white hover:bg-gray-700">
                  Departure Time: Earliest First
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          </div>
          {/* Quick Price Filters */}
          <div>
            <Label className="text-sm font-medium text-gray-300 mb-3 block">Quick Filters</Label>
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, priceRange: { min: 0, max: 200 } }))}
                className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                Under $200
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, priceRange: { min: 200, max: 500 } }))}
                className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                $200 - $500
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFilters(prev => ({ ...prev, priceRange: { min: 500, max: 2000 } }))}
                className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                $500+
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )}
  </div>
  );
}