# based on api_data.json
# we aim to see if any of the flights include 1 or more flights
# that means it will be a layover flight instead of a direct flight

import json

with open('api_data.json') as file:
    data = json.load(file)
    
    flight_offers = data['BOS-LAX']['2025-08-23']['data']

    # print(flight_offers)

    direct_flights = []

    for x in range(len(flight_offers)):

        flight = flight_offers[x]

        total_flights = len(flight['itineraries'][0]['segments']) 

        if total_flights == 1: 
            direct_flights.append(flight)

    print("Total direct flights:", len(direct_flights))


# ran it and it 