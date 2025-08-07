import requests
from dotenv import load_dotenv
import os
import requests
import json


load_dotenv()
key = os.getenv("API_KEY")
secret = os.getenv("API_SECRET")


def update_token():
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    data = f'grant_type=client_credentials&client_id={key}&client_secret={secret}'
    response = requests.post('https://test.api.amadeus.com/v1/security/oauth2/token', headers=headers, data=data).json()
    os.environ["token"] = response["access_token"]


def search_flight_offers(origin, destination, departure_date, return_date=None, adults=1, children=None, max_price=None, currency_code='USD', travel_class=None):
    """
    Search for flight offers for a specific route
    
    Args:
        origin (str): Origin airport code (e.g., 'JFK', 'CDG')
        destination (str): Destination airport code (e.g., 'LAX', 'LHR')
        departure_date (str): Departure date in YYYY-MM-DD format
        return_date (str): Return date in YYYY-MM-DD format (optional, for round trip)
        adults (int): Number of adult passengers (default: 1)
        max_price (int): Maximum price filter (optional)
        currency_code (str): Currency code (default: 'USD')
    """
    headers = {
        'Authorization': f'Bearer {os.environ.get("token")}',
    }
    params = {
        'originLocationCode': origin,
        'destinationLocationCode': destination,
        'departureDate': departure_date,
        'adults': adults,
        'currencyCode': currency_code,
    }
    
    if return_date:
        params['returnDate'] = return_date
    
    if max_price:
        params['maxPrice'] = max_price

    if children:
        params['children'] = children

    if travel_class:
        params['travelClass'] = travel_class
    
    response = requests.get('https://test.api.amadeus.com/v2/shopping/flight-offers', params=params, headers=headers)
    return response


if __name__ == "__main__":
    if os.environ.get("token") == None:
        update_token()

    print("=== FLIGHT SEARCH ===\n")

    origin_airport_code = input("ORIGIN AIRPORT: ")
    destination_airport_code = input("DESTINATION AIRPORT: ")
    number_of_adults = int(input("Enter the number of adults: "))
    number_of_children = int(input("Enter the number of children: "))
    departure_date = input('(yyyy-mm-dd) Enter departure date: ')
    return_date = input('(yyyy-mm-dd) Enter return date: ')
    cabin_class = input("Cabin class (""): ")
    number_of_points = int(input("Number of points: "))
    
    # Example 1: Search for specific route flights
    flight_offers = search_flight_offers(
        origin=origin_airport_code,
        destination=destination_airport_code, 
        departure_date=departure_date,
        return_date=return_date,
        adults=number_of_adults,
        children=number_of_children,
        travel_class=cabin_class
    )
    
    with open(f"api_data/flight_searches/{origin_airport_code}_to_{destination_airport_code}.json", "w", encoding="utf-8") as f:
        json.dump(flight_offers.json(), f, indent=4)
    
    print(f"Flight offers response status: {flight_offers.status_code}")
    if flight_offers.status_code == 200:
        data = flight_offers.json()
        if 'data' in data:
            print(f"Found {len(data['data'])} flight offers")
        else:
            print("No flight offers found")

    py_filename = f"api_data/flight_searches/{origin_airport_code}_to_{destination_airport_code}.py"

    with open(py_filename, "w", encoding="utf-8") as py_file:
        py_file.write(f'''
import json

filename = "api_data/flight_searches/{origin_airport_code}_to_{destination_airport_code}.json"

print("{origin_airport_code} to {destination_airport_code}")
print("For {number_of_adults} adults and {number_of_children} children")
print("From {departure_date} to {return_date}")
print("------------------------------------------------------------------\\n")

with open(filename) as file:
    data = json.load(file) # loads entire JSON object in the file

    number_of_points = {number_of_points}

    flight_offers = data['data']

    # Number of flights
    print(f"Number of flights: {{len(flight_offers)}}")

    # Number of round trips
    round_trips = []

    for x in range(len(flight_offers)):

        flight = flight_offers[x]

        is_round_trip = len(flight['itineraries']) == 2

        if is_round_trip == 1: 
            round_trips.append(flight)

    print(f"Number of round trips: {{len(round_trips)}}")

    # Number of flights where both flights are direct (to and from)

    whole_round_trips = []
    whole_round_trips_ids = []

    for y in range(len(flight_offers)):

        flight = flight_offers[y]

        is_full_round_trip = len(flight['itineraries'][0]['segments']) == 1 and len(flight['itineraries'][1]['segments']) == 1

        if is_full_round_trip: 
            whole_round_trips.append(flight)
            whole_round_trips_ids.append(y + 1)

    print(f"Number of trips with direct flights on both (origin -> destination) AND (destination -> origin) round trips: {{len(whole_round_trips)}}")
    # print(f"Trip IDs: {{whole_round_trips_ids}}")

    # Number of flights where both flights are layovers

    trips_with_two_overlay = []
    trips_with_two_overlay_ids = []

    for y in range(len(flight_offers)):

        flight = flight_offers[y]

        contains_overlay = len(flight['itineraries'][0]['segments']) > 1 and len(flight['itineraries'][1]['segments']) > 1

        if contains_overlay: 
            trips_with_two_overlay.append(flight)
            trips_with_two_overlay_ids.append(y + 1)

    print(f"Number of trips with overlay on BOTH (origin -> destination) AND (destinaton -> origin): {{len(trips_with_two_overlay)}}")
    # print(f"Trip IDs: {{trips_with_two_overlay_ids}}")

    trips_with_one_overlay = []
    trips_with_one_overlay_ids = []


    for z in range(len(flight_offers)):

        flight = flight_offers[z]

        contains_overlay = len(flight['itineraries'][0]['segments']) > 1 or len(flight['itineraries'][1]['segments']) > 1

        if contains_overlay: 
            trips_with_one_overlay.append(flight)
            trips_with_one_overlay_ids.append(z + 1)

    print(f"Number of trips with overlay on EITHER (origin -> destination) OR (destinaton -> origin): {{len(trips_with_one_overlay)}}")
    # print(f"Trip IDs: {{trips_with_one_overlay_ids}}")

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
            return f"{{display}}¢ per mile"

        return f"${{display}} per mile"

    

    # Print top 3 from each category
    def print_top_flights(title, flights):
        print(f"Top 3 {{title}}:")
        for i, flight in enumerate(flights[:3]):
            price = flight["price"]["total"]

            value_per_mile = float(price) / number_of_points

            print(f"{{i+1}}. Price: ${{price}} --> {{to_proper_vpm_string(value_per_mile)}}")

    print_top_flights("overall cheapest flights", sorted_all)
    print_top_flights("flights with overlay on EITHER leg", sorted_one_overlay)
    print_top_flights("flights with overlay on BOTH legs", sorted_two_overlay)
    print_top_flights("direct round trips", sorted_whole_round)

    print(f"You said you wanted to spend {number_of_points} points")

    ''')

    print("\n" + "="*50 + "\n")
    
    