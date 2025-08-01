# based on api_data.json
# we aim to see if any of the flights include 1 or more flights
# that means it will be a layover flight instead of a direct flight

import json

with open('api_data.json') as file:
    data = json.load(file)
    
    flight_offers = data['BOS-LAX']['2025-08-23']['data']

    # print(flight_offers)

    layover_flights = []

    for x in range(len(flight_offers)):

        flight = flight_offers[x]

        if len(flight['itineraries']) > 1: # MORE than 1 thing in the itinararies
            layover_flights.append(flight)
    
    print("Total layover flights:", len(layover_flights))


# ran it and it 