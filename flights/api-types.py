from dataclasses import dataclass
from typing import Dict, List


@dataclass
class AmenityProvider:
    name: str


@dataclass
class Amenity:
    description: str
    isChargeable: bool 
    amenityType: str
    amenityProvider: AmenityProvider


@dataclass
class IncludedBags:
    quantity: int


@dataclass
class FareDetailSegment:
    segmentId: str
    cabin: str
    fareBasis: str
    brandedFare: str
    brandedFareLabel: str
    class_: str  # 'class' is a reserved keyword in Python
    includedCheckedBags: IncludedBags
    includedCabinBags: IncludedBags
    amenities: List[Amenity]


@dataclass
class TravelerPrice:
    currency: str
    total: str
    base: str


@dataclass
class TravelerPricing:
    travelerId: str
    fareOption: str
    travelerType: str
    price: TravelerPrice
    fareDetailsBySegment: List[FareDetailSegment]


@dataclass
class Fee:
    amount: str
    type: str


@dataclass
class Price:
    currency: str
    total: str
    base: str
    fees: List[Fee]
    grandTotal: str


@dataclass
class PricingOptions:
    fareType: List[str]
    includedCheckBagsOnly: bool


@dataclass
class SegmentLocation:
    iataCode: str
    terminal: str
    at: str


@dataclass
class Aircraft:
    code: str


@dataclass
class OperatingCarrier:
    carrierCode: str


@dataclass
class Segment:
    departure: SegmentLocation
    arrival: SegmentLocation
    carrierCode: str
    number: int
    aircraft: Aircraft
    operating: OperatingCarrier
    duration: str
    id: str
    numberOfStops: int
    blacklistedInEU: bool


@dataclass
class Itinerary:
    duration: str
    segments: List[Segment]


@dataclass
class FlightOffer:
    type: str
    id: int
    source: str
    instantTicketingRequired: bool
    nonHomogenous: bool
    oneWay: bool
    isUpsellOffer: bool
    itineraries: List[Itinerary]
    price: Price
    pricingOptions: PricingOptions
    validatingAirlineCodes: List[str]
    travelerPricings: List[TravelerPricing]


@dataclass
class Meta:
    count: int
    links: Dict[str, str]


@dataclass
class FlightOfferDateEntry:
    meta: Meta
    data: List[FlightOffer]