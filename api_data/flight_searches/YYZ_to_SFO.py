import json

filename = "api_data/flight_searches/YYZ_to_SFO.json"

print("YYZ to SFO")
print("------------------------------------------------------------------\n")

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
    whole_round_trips_ids = []

    for y in range(len(flight_offers)):

        flight = flight_offers[y]

        is_full_round_trip = len(flight['itineraries'][0]['segments']) == 1 and len(flight['itineraries'][1]['segments']) == 1

        if is_full_round_trip: 
            whole_round_trips.append(flight)
            whole_round_trips_ids.append(y + 1)

    print(f"Number of trips with direct flights on both (origin -> destination) AND (destination -> origin) round trips: {len(whole_round_trips)}")
    # print(f"Trip IDs: {whole_round_trips_ids}")

    # Number of flights where both flights are direct (to and from)

    trips_with_two_overlay = []
    trips_with_two_overlay_ids = []

    for y in range(len(flight_offers)):

        flight = flight_offers[y]

        contains_overlay = len(flight['itineraries'][0]['segments']) > 1 and len(flight['itineraries'][1]['segments']) > 1

        if contains_overlay: 
            trips_with_two_overlay.append(flight)
            trips_with_two_overlay_ids.append(y + 1)

    print(f"Number of trips with overlay on BOTH (origin -> destination) AND (destinaton -> origin): {len(trips_with_two_overlay)}")
    # print(f"Trip IDs: {trips_with_two_overlay_ids}")

    trips_with_one_overlay = []
    trips_with_one_overlay_ids = []


    for z in range(len(flight_offers)):

        flight = flight_offers[z]

        contains_overlay = len(flight['itineraries'][0]['segments']) > 1 or len(flight['itineraries'][1]['segments']) > 1

        if contains_overlay: 
            trips_with_one_overlay.append(flight)
            trips_with_one_overlay_ids.append(z + 1)

    print(f"Number of trips with overlay on EITHER (origin -> destination) OR (destinaton -> origin): {len(trips_with_one_overlay)}")
    # print(f"Trip IDs: {trips_with_one_overlay_ids}")
