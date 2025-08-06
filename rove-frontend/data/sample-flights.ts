import { FlightOffer } from '@/types/flight';

export const sampleFlights: FlightOffer[] = [
  {
    type: "flight-offer",
    id: 1,
    source: "GDS",
    instantTicketingRequired: false,
    nonHomogenous: false,
    oneWay: false,
    isUpsellOffer: false,
    itineraries: [
      {
        duration: "PT6H30M",
        segments: [
          {
            departure: {
              iataCode: "JFK",
              terminal: "4",
              at: "2024-03-15T08:00:00"
            },
            arrival: {
              iataCode: "LAX",
              terminal: "7",
              at: "2024-03-15T11:30:00"
            },
            carrierCode: "AA",
            number: 123,
            aircraft: {
              code: "321"
            },
            operating: {
              carrierCode: "AA"
            },
            duration: "PT6H30M",
            id: "1",
            numberOfStops: 0,
            blacklistedInEU: false
          }
        ]
      }
    ],
    price: {
      currency: "USD",
      total: "299.99",
      base: "250.00",
      fees: [
        {
          amount: "49.99",
          type: "SUPPLIER"
        }
      ],
      grandTotal: "299.99"
    },
    pricingOptions: {
      fareType: ["PUBLISHED"],
      includedCheckBagsOnly: true
    },
    validatingAirlineCodes: ["AA"],
    travelerPricings: [
      {
        travelerId: "1",
        fareOption: "STANDARD",
        travelerType: "ADULT",
        price: {
          currency: "USD",
          total: "299.99",
          base: "250.00"
        },
        fareDetailsBySegment: [
          {
            segmentId: "1",
            cabin: "PREMIUM_ECONOMY",
            fareBasis: "Y1NXOW",
            brandedFare: "MAIN_CABIN",
            brandedFareLabel: "Main Cabin",
            class: "Y",
            includedCheckedBags: {
              quantity: 1
            },
            includedCabinBags: {
              quantity: 1
            },
            amenities: [
              {
                description: "Meal included",
                isChargeable: false,
                amenityType: "MEAL",
                amenityProvider: {
                  name: "American Airlines"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: "flight-offer",
    id: 2,
    source: "GDS",
    instantTicketingRequired: false,
    nonHomogenous: false,
    oneWay: false,
    isUpsellOffer: false,
    itineraries: [
      {
        duration: "PT8H15M",
        segments: [
          {
            departure: {
              iataCode: "JFK",
              terminal: "2",
              at: "2024-03-15T10:30:00"
            },
            arrival: {
              iataCode: "ORD",
              terminal: "1",
              at: "2024-03-15T12:45:00"
            },
            carrierCode: "UA",
            number: 456,
            aircraft: {
              code: "737"
            },
            operating: {
              carrierCode: "UA"
            },
            duration: "PT2H15M",
            id: "2",
            numberOfStops: 0,
            blacklistedInEU: false
          },
          {
            departure: {
              iataCode: "ORD",
              terminal: "1",
              at: "2024-03-15T14:30:00"
            },
            arrival: {
              iataCode: "LAX",
              terminal: "7",
              at: "2024-03-15T17:45:00"
            },
            carrierCode: "UA",
            number: 789,
            aircraft: {
              code: "787"
            },
            operating: {
              carrierCode: "UA"
            },
            duration: "PT4H15M",
            id: "3",
            numberOfStops: 0,
            blacklistedInEU: false
          }
        ]
      }
    ],
    price: {
      currency: "USD",
      total: "259.99",
      base: "220.00",
      fees: [
        {
          amount: "39.99",
          type: "SUPPLIER"
        }
      ],
      grandTotal: "259.99"
    },
    pricingOptions: {
      fareType: ["PUBLISHED"],
      includedCheckBagsOnly: false
    },
    validatingAirlineCodes: ["UA"],
    travelerPricings: [
      {
        travelerId: "1",
        fareOption: "STANDARD",
        travelerType: "ADULT",
        price: {
          currency: "USD",
          total: "259.99",
          base: "220.00"
        },
        fareDetailsBySegment: [
          {
            segmentId: "2",
            cabin: "ECONOMY",
            fareBasis: "N1NXOW",
            brandedFare: "BASIC_ECONOMY",
            brandedFareLabel: "Basic Economy",
            class: "N",
            includedCheckedBags: {
              quantity: 0
            },
            includedCabinBags: {
              quantity: 1
            },
            amenities: [
              {
                description: "Snack included",
                isChargeable: false,
                amenityType: "REFRESHMENT",
                amenityProvider: {
                  name: "United Airlines"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    type: "flight-offer",
    id: 3,
    source: "GDS",
    instantTicketingRequired: false,
    nonHomogenous: false,
    oneWay: false,
    isUpsellOffer: false,
    itineraries: [
      {
        duration: "PT5H45M",
        segments: [
          {
            departure: {
              iataCode: "JFK",
              terminal: "5",
              at: "2024-03-15T14:15:00"
            },
            arrival: {
              iataCode: "LAX",
              terminal: "6",
              at: "2024-03-15T17:00:00"
            },
            carrierCode: "B6",
            number: 615,
            aircraft: {
              code: "A321"
            },
            operating: {
              carrierCode: "B6"
            },
            duration: "PT5H45M",
            id: "4",
            numberOfStops: 0,
            blacklistedInEU: false
          }
        ]
      }
    ],
    price: {
      currency: "USD",
      total: "179.99",
      base: "150.00",
      fees: [
        {
          amount: "29.99",
          type: "SUPPLIER"
        }
      ],
      grandTotal: "179.99"
    },
    pricingOptions: {
      fareType: ["PUBLISHED"],
      includedCheckBagsOnly: true
    },
    validatingAirlineCodes: ["B6"],
    travelerPricings: [
      {
        travelerId: "1",
        fareOption: "STANDARD",
        travelerType: "ADULT",
        price: {
          currency: "USD",
          total: "179.99",
          base: "150.00"
        },
        fareDetailsBySegment: [
          {
            segmentId: "4",
            cabin: "ECONOMY",
            fareBasis: "T1NXOW",
            brandedFare: "BLUE",
            brandedFareLabel: "Blue",
            class: "T",
            includedCheckedBags: {
              quantity: 1
            },
            includedCabinBags: {
              quantity: 1
            },
            amenities: [
              {
                description: "Free WiFi",
                isChargeable: false,
                amenityType: "WIFI",
                amenityProvider: {
                  name: "JetBlue Airways"
                }
              },
              {
                description: "Snacks and beverages",
                isChargeable: false,
                amenityType: "MEAL",
                amenityProvider: {
                  name: "JetBlue Airways"
                }
              }
            ]
          }
        ]
      }
    ]
  }
];