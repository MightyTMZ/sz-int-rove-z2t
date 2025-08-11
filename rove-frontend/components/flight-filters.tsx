'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FilterOptions } from './flight-search';

interface FlightFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearAll: () => void;
  className?: string;
}

export default function FlightFilters({ 
  filters, 
  onFiltersChange, 
  onClearAll,
  className = "" 
}: FlightFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOverlayOpen, setIsMobileOverlayOpen] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const hasActiveFilters = filters.maxPrice !== null || 
                          filters.maxStops !== null || 
                          filters.airlines.length > 0 || 
                          filters.departureTime !== 'any' ||
                          filters.minValuePerMile !== null;

  return (
    <Card className={`bg-card border-border ${className}`}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Filters</h3>
            {hasActiveFilters && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                Active
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileOverlayOpen(true)}
              className="text-muted-foreground hover:text-foreground lg:hidden"
              data-mobile-filter-trigger
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Active Filters Display */}
        {hasActiveFilters && !isExpanded && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.maxPrice !== null && (
              <span className="bg-blue-50 text-blue-700 text-sm px-3 py-1 rounded-full border border-blue-200">
                Under ${filters.maxPrice}
              </span>
            )}
            {filters.maxStops !== null && (
              <span className="bg-green-50 text-green-700 text-sm px-3 py-1 rounded-full border border-green-200">
                Max {filters.maxStops} stop{filters.maxStops !== 1 ? 's' : ''}
              </span>
            )}
            {filters.airlines.length > 0 && (
              <span className="bg-purple-50 text-purple-700 text-sm px-3 py-1 rounded-full border border-purple-200">
                {filters.airlines.length} airline{filters.airlines.length !== 1 ? 's' : ''}
              </span>
            )}
            {filters.departureTime !== 'any' && (
              <span className="bg-orange-50 text-orange-700 text-sm px-3 py-1 rounded-full border border-orange-200">
                {filters.departureTime.charAt(0).toUpperCase() + filters.departureTime.slice(1)}
              </span>
            )}
            {filters.minValuePerMile !== null && (
              <span className="bg-yellow-50 text-yellow-700 text-sm px-3 py-1 rounded-full border border-yellow-200">
                Min ${filters.minValuePerMile}/mile
              </span>
            )}
            <span className="bg-gray-50 text-gray-700 text-sm px-3 py-1 rounded-full border border-gray-200">
              {filters.sortBy === 'price-low' ? 'Price: Low to High' :
               filters.sortBy === 'price-high' ? 'Price: High to Low' :
               filters.sortBy === 'duration' ? 'Duration: Shortest First' :
               filters.sortBy === 'departure' ? 'Departure: Earliest First' :
               filters.sortBy === 'value-per-mile' ? 'Best Value per Mile' : 'Default'}
            </span>
          </div>
        )}

        {/* Expanded Filters */}
        <div className={`space-y-6 pt-4 border-t border-border ${isExpanded ? 'block' : 'hidden lg:block'}`}>
            {/* Maximum Price */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Maximum Price (USD)
              </Label>
              <div className="space-y-3">
                <Input
                  type="number"
                  min="0"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', 
                    e.target.value ? parseInt(e.target.value) : null
                  )}
                  className="bg-background border-border text-foreground"
                  placeholder="No limit"
                />
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFilterChange('maxPrice', null)}
                    className="text-xs border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    No Limit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFilterChange('maxPrice', 200)}
                    className="text-xs border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Under $200
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFilterChange('maxPrice', 500)}
                    className="text-xs border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Under $500
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleFilterChange('maxPrice', 1000)}
                    className="text-xs border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Under $1,000
                  </Button>
                </div>
              </div>
            </div>

            {/* Minimum Value per Mile Filter */}
            <div>
              <Label htmlFor="minValuePerMile">Minimum Value per Mile</Label>
              <Input
                id="minValuePerMile"
                type="number"
                placeholder="No limit"
                value={filters.minValuePerMile || ''}
                onChange={(e) => handleFilterChange('minValuePerMile', e.target.value ? parseFloat(e.target.value) : null)}
                min="0"
                step="0.01"
              />
              <p className="text-xs text-muted-foreground">
                Only show flights that provide at least this value per Rove Mile
              </p>
            </div>

            {/* Sort By */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Sort By
              </Label>
              <Select
                value={filters.sortBy}
                onValueChange={(value: 'price-low' | 'price-high' | 'duration' | 'departure' | 'value-per-mile') => 
                  handleFilterChange('sortBy', value)
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
                  <SelectItem value="value-per-mile" className="text-foreground hover:bg-accent">
                    Best Value per Mile
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Max Stops */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Maximum Stops
              </Label>
              <div className="space-y-2">
                <Button
                  variant={filters.maxStops === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('maxStops', null)}
                  className="w-full justify-start border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Any
                </Button>
                <Button
                  variant={filters.maxStops === 0 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('maxStops', 0)}
                  className="w-full justify-start border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Direct flights only
                </Button>
                <Button
                  variant={filters.maxStops === 1 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('maxStops', 1)}
                  className="w-full justify-start border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Max 1 stop
                </Button>
                <Button
                  variant={filters.maxStops === 2 ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('maxStops', 2)}
                  className="w-full justify-start border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  Max 2 stops
                </Button>
              </div>
            </div>

            {/* Departure Time */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Departure Time
              </Label>
              <Select
                value={filters.departureTime}
                onValueChange={(value: 'any' | 'morning' | 'afternoon' | 'evening' | 'night') => 
                  handleFilterChange('departureTime', value)
                }
              >
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="any" className="text-foreground hover:bg-accent">
                    Any time
                  </SelectItem>
                  <SelectItem value="morning" className="text-foreground hover:bg-accent">
                    Morning (6 AM - 12 PM)
                  </SelectItem>
                  <SelectItem value="afternoon" className="text-foreground hover:bg-accent">
                    Afternoon (12 PM - 6 PM)
                  </SelectItem>
                  <SelectItem value="evening" className="text-foreground hover:bg-accent">
                    Evening (6 PM - 10 PM)
                  </SelectItem>
                  <SelectItem value="night" className="text-foreground hover:bg-accent">
                    Night (10 PM - 6 AM)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Airlines */}
            <div>
              <Label className="text-sm font-medium text-foreground mb-3 block">
                Airlines (comma-separated codes)
              </Label>
              <div className="space-y-3">
                <Input
                  value={filters.airlines.join(', ')}
                  onChange={(e) => {
                    const airlineCodes = e.target.value
                      .split(',')
                      .map(code => code.trim().toUpperCase())
                      .filter(code => code.length > 0);
                    handleFilterChange('airlines', airlineCodes);
                  }}
                  className="bg-background border-border text-foreground"
                  placeholder="e.g., AA, DL, UA"
                />
                <div className="text-xs text-muted-foreground">
                  Leave empty for all airlines. Use airline codes like AA, DL, UA
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* Mobile Filter Overlay */}
      {isMobileOverlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background border-l border-border overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileOverlayOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Mobile Filter Content */}
              <div className="space-y-6">
                {/* Maximum Price */}
                <div>
                  <Label className="text-sm font-medium text-foreground mb-3 block">
                    Maximum Price (USD)
                  </Label>
                  <div className="space-y-3">
                    <Input
                      type="number"
                      min="0"
                      value={filters.maxPrice || ''}
                      onChange={(e) => handleFilterChange('maxPrice', 
                        e.target.value ? parseInt(e.target.value) : null
                      )}
                      className="bg-background border-border text-foreground"
                      placeholder="No limit"
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFilterChange('maxPrice', null)}
                        className="text-xs border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        No Limit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFilterChange('maxPrice', 200)}
                        className="text-xs border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        Under $200
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFilterChange('maxPrice', 500)}
                        className="text-xs border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        Under $500
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFilterChange('maxPrice', 1000)}
                        className="text-xs border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        Under $1,000
                      </Button>
                    </div>
                  </div>
                </div>









                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={onClearAll}
                    className="flex-1 border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Clear All
                  </Button>
                  <Button
                    onClick={() => setIsMobileOverlayOpen(false)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
