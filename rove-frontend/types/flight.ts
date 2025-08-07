export interface FlightOfferList {
  [route: string]: {
    [date: string]: FlightOfferDateEntry;
  };
}

// Cabin class options for the dropdown
export type CabinClass = 'ECONOMY' | 'PREMIUM_ECONOMY' | 'BUSINESS' | 'FIRST';

interface Meta {
  count: number;
  links: {
    self: string;
  };
}

interface FlightOfferDateEntry {
  meta: Meta;
  data: FlightOffer[];
}

export interface FlightOffer {
  type: string;
  id: number;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogenous: boolean;
  oneWay: boolean;
  isUpsellOffer: boolean;
  itineraries: Itinerary[];
  price: {
    currency: string;
    total: string; // number displayed COERCED into a string
    base: string; // number displayed COERCED into a string
    fees: Fee[];
    grandTotal: string; // number displayed COERCED into a string
  };
  pricingOptions: {
    fareType: string[];
    includedCheckBagsOnly: boolean;
  };
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

interface TravelerPricing {
  travelerId: string; // number displayed COERCED into a string
  fareOption: string;
  travelerType: string;
  price: {
    currency: string;
    total: string; // number displayed COERCED into a string
    base: string; // number displayed COERCED into a string
  };
  fareDetailsBySegment: FareDetailSegment[];
}

interface FareDetailSegment {
  segmentId: string; // number displayed COERCED into a string
  cabin: string;
  fareBasis: string;
  brandedFare: string;
  brandedFareLabel: string;
  class: string;
  includedCheckedBags: {
    quantity: number;
  };
  includedCabinBags: {
    quantity: number;
  };
  amenities: Amenity[];
}

interface Amenity {
  description: string;
  isChargeable: false;
  amenityType: string;
  amenityProvider: {
    name: string;
  };
}

interface Fee {
  amount: string; // number displayed COERCED into a string
  type: string;
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  departure: {
    iataCode: string;
    terminal: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    terminal: string;
    at: string;
  };
  carrierCode: string;
  number: number;
  aircraft: {
    code: string;
  };
  operating: {
    carrierCode: string;
  };
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}