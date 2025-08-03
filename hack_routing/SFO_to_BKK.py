
import json

filename = "hack_routing/SFO_to_BKK.json"

print("SFO to BKK")
print("For 1 adults and 0 children")
print("From 2025-09-17 to 2025-09-20")
print("------------------------------------------------------------------\n")

with open(filename) as file:
    data = json.load(file) # loads entire JSON object in the file

    number_of_points = 50000

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

    # Number of flights where both flights are layovers

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

    print() # Line break
    print() # Line break
    print() # Line break
    print() # Line break

    def get_price(flight):
        return float(flight["price"]["total"])

    # Sort flights based on price
    sorted_all = sorted(flight_offers, key=get_price)
    sorted_one_overlay = sorted(trips_with_one_overlay, key=get_price)
    sorted_two_overlay = sorted(trips_with_two_overlay, key=get_price)
    sorted_whole_round = sorted(whole_round_trips, key=get_price)

    def to_proper_vpm_string(val):
        display = round(val, 2)
        if val < 1:
            display = round(val * 100, 2)
            return f"{display}¢ per mile"

        return f"${display} per mile"

    

    # Print top 3 from each category
    def print_top_flights(title, flights):
        print(f"Top 3 {title}:")
        for i, flight in enumerate(flights[:3]):
            price = flight["price"]["total"]

            value_per_mile = float(price) / number_of_points

            print(f"{i+1}. Price: ${price} --> {to_proper_vpm_string(value_per_mile)}")

    print_top_flights("overall cheapest flights", sorted_all)
    print_top_flights("flights with overlay on EITHER leg", sorted_one_overlay)
    print_top_flights("flights with overlay on BOTH legs", sorted_two_overlay)
    print_top_flights("direct round trips", sorted_whole_round)

    print(f"You said you wanted to spend 50000 points")

    # we don't want layovers here since the layover hub is already determined
    # therefore, we want to see the price of a direct flight
    if whole_round_trips:
        total_price_direct = sum([get_price(f) for f in whole_round_trips])
        avg_price_direct = total_price_direct / len(whole_round_trips)
        print(f"Average price of direct round trips: ${avg_price_direct:.2f}")

    else:
        print("No direct round trips to calculate average from.")

    