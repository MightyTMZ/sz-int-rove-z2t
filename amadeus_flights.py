from dotenv import load_dotenv
import os
import requests
import json


load_dotenv()
key = os.getenv("API_KEY")
secret = os.getenv("API_SECRET")

print("Key", key)
print("Secret", secret)


def update_token():
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    data = f'grant_type=client_credentials&client_id={key}&client_secret={secret}'
    response = requests.post('https://test.api.amadeus.com/v1/security/oauth2/token', headers=headers, data=data).json()
    os.environ["token"] = response["access_token"]


def search_flight_offers(origin, destination, departure_date, return_date=None, adults=1, max_price=None, currency_code='USD'):
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
        'max': 50  # Limit results to 50 offers
    }
    
    if return_date:
        params['returnDate'] = return_date
    
    if max_price:
        params['maxPrice'] = max_price
    
    response = requests.get('https://test.api.amadeus.com/v2/shopping/flight-offers', params=params, headers=headers)
    return response


def search_cheapest_flights(origin, destination, departure_date, return_date=None):
    """
    Search for the cheapest flights for a route
    
    Args:
        origin (str): Origin airport code
        destination (str): Destination airport code  
        departure_date (str): Departure date in YYYY-MM-DD format
        return_date (str): Return date (optional)
    """
    headers = {
        'Authorization': f'Bearer {os.environ.get("token")}',
    }
    params = {
        'origin': origin,
        'destination': destination,
        'departureDate': departure_date,
    }
    
    if return_date:
        params['returnDate'] = return_date
    
    response = requests.get('https://test.api.amadeus.com/v1/shopping/flight-dates', params=params, headers=headers)
    return response


def get_flight_inspiration(origin, max_price=None, departure_date=None):
    """
    Get flight inspiration - discover destinations from an origin
    Similar to your original flight destinations function but with more options
    
    Args:
        origin (str): Origin airport code
        max_price (int): Maximum price filter (optional)
        departure_date (str): Departure date in YYYY-MM-DD format (optional)
    """
    headers = {
        'Authorization': f'Bearer {os.environ.get("token")}',
    }
    params = {
        'origin': origin,
    }
    
    if max_price:
        params['maxPrice'] = max_price
    
    if departure_date:
        params['departureDate'] = departure_date
    
    response = requests.get('https://test.api.amadeus.com/v1/shopping/flight-destinations', params=params, headers=headers)
    return response


def get_airline_routes(airline_code):
    """
    Get routes operated by a specific airline
    
    Args:
        airline_code (str): IATA airline code (e.g., 'BA' for British Airways)
    """
    headers = {
        'Authorization': f'Bearer {os.environ.get("token")}',
    }
    params = {
        'airlineCode': airline_code,
    }
    
    response = requests.get('https://test.api.amadeus.com/v1/airline/destinations', params=params, headers=headers)
    return response


def get_flight_delay_predictions(origin, destination, departure_date, departure_time, arrival_date, arrival_time, airline_code, flight_number):
    """
    Get flight delay predictions
    
    Args:
        origin (str): Origin airport code
        destination (str): Destination airport code
        departure_date (str): Departure date in YYYY-MM-DD format
        departure_time (str): Departure time in HH:MM:SS format
        arrival_date (str): Arrival date in YYYY-MM-DD format  
        arrival_time (str): Arrival time in HH:MM:SS format
        airline_code (str): IATA airline code
        flight_number (str): Flight number
    """
    headers = {
        'Authorization': f'Bearer {os.environ.get("token")}',
    }
    params = {
        'originLocationCode': origin,
        'destinationLocationCode': destination,
        'departureDate': departure_date,
        'departureTime': departure_time,
        'arrivalDate': arrival_date,
        'arrivalTime': arrival_time,
        'aircraftCode': airline_code,
        'carrierCode': airline_code,
        'flightNumber': flight_number,
    }
    
    response = requests.get('https://test.api.amadeus.com/v1/travel/predictions/flight-delay', params=params, headers=headers)
    return response


if __name__ == "__main__":
    if os.environ.get("token") == None:
        update_token()

    print("=== FLIGHT SEARCH EXAMPLES ===\n")
    
    # Example 1: Search for specific route flights
    print("1. Searching for flights from JFK to LAX...")
    flight_offers = search_flight_offers(
        origin='JFK',
        destination='LAX', 
        departure_date='2025-09-01',
        return_date='2025-09-05',
        adults=1,
        max_price=800
    )
    
    with open("api_data/flight_offers_jfk_lax.json", "w", encoding="utf-8") as f:
        json.dump(flight_offers.json(), f, indent=4)
    
    print(f"Flight offers response status: {flight_offers.status_code}")
    if flight_offers.status_code == 200:
        data = flight_offers.json()
        if 'data' in data:
            print(f"Found {len(data['data'])} flight offers")
        else:
            print("No flight offers found")
    
    print("\n" + "="*50 + "\n")
    
    # Example 2: Search for cheapest flights
    print("2. Searching for cheapest flights from PAR to NYC...")
    cheapest_flights = search_cheapest_flights(
        origin='PAR',
        destination='NYC',
        departure_date='2025-09-01' # one way trip
    )
    
    with open("api_data/cheapest_flights_par_nyc.json", "w", encoding="utf-8") as f:
        json.dump(cheapest_flights.json(), f, indent=4)
    
    print(f"Cheapest flights response status: {cheapest_flights.status_code}")
    
    print("\n" + "="*50 + "\n")
    
    # Example 3: Get flight inspiration from London
    print("3. Getting flight inspiration from London (LHR)...")
    inspiration = get_flight_inspiration(
        origin='LHR',
        max_price=500
    )
    
    with open("api_data/flight_inspiration_lhr.json", "w", encoding="utf-8") as f:
        json.dump(inspiration.json(), f, indent=4)
    
    print(f"Flight inspiration response status: {inspiration.status_code}")
    
    print("\n" + "="*50 + "\n")
    
    # Example 4: Get British Airways routes
    print("4. Getting British Airways routes...")
    ba_routes = get_airline_routes('BA')
    
    with open("api_data/british_airways_routes.json", "w", encoding="utf-8") as f:
        json.dump(ba_routes.json(), f, indent=4)
    
    print(f"Airline routes response status: {ba_routes.status_code}")
    
    print("\nAll flight data saved to JSON files.")