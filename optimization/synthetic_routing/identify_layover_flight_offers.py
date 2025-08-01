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

        if len(flight['itineraries'][0]['segments']) > 1: 
            '''
            This is a bit weird
            The iteneraries object is present as a list but with only one object (could have very well been an object and not a list)
            When I worked with identify_direct_flight_offers.py it I used the logic
            that if the length of the itineraries list was equal to 1, then it was a direct flight. 
            Turns out it, it was true that all 60 flights had their intineraries length as 1
            
            '''

            layover_flights.append(flight)
    
    print("Total layover flights:", len(layover_flights))


'''
Ran it and it returned:

Total layover flights: 56

Therefore, there are 56 flights that are 

'''