# based on api_data.json
# we aim to see if any of the flights include 1 or more flights
# that means it will be a layover flight instead of a direct flight

import json

filename = "api_data/flight_offers_jfk_lax.json"

with open(filename) as file:
    data = json.load(file) # loads entire JSON object in the file

    # Entire document looks like it is resembling a round trip
    
    flight_offers = data['data']

    # Number of flights
    print(f"Number of flights: {len(flight_offers)}")

    # Number of round trips
    round_trips = []

    for x in range(len(flight_offers)):

        flight = flight_offers[x]

        is_round_trip = len(flight['itineraries']) == 2

        if is_round_trip == 1: 
            round_trips.append(flight)

    print(f"Number of round trips: {len(round_trips)}")

    # Number of flights where both flights are direct (to and from)

    whole_round_trips = []

    for y in range(len(flight_offers)):

        flight = flight_offers[y]

        is_full_round_trip = len(flight['itineraries'][0]['segments']) == 1 and len(flight['itineraries'][1]['segments']) == 1

        if is_full_round_trip == 1: 
            whole_round_trips.append(flight)

    print(f"Number of WHOLE round trips: {len(whole_round_trips)}")


    # Number of flights where both flights are direct (to and from)

    trips_with_overlay = []

    for y in range(len(flight_offers)):

        flight = flight_offers[y]

        contains_overlay = len(flight['itineraries'][0]['segments']) > 1 and len(flight['itineraries'][1]['segments']) > 1

        if contains_overlay == 1: 
            trips_with_overlay.append(flight)

    print(f"Number of trips with overlay: {len(trips_with_overlay)}")