from dotenv import load_dotenv
import os
import requests
import json
from datetime import date, timedelta
from store_flights import save_to_csv, save_to_sqlite

print("script started")

load_dotenv()
key = os.getenv("API_KEY")
secret = os.getenv("API_SECRET")

def update_token():
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    data = f'grant_type=client_credentials&client_id={key}&client_secret={secret}'
    response = requests.post('https://test.api.amadeus.com/v1/security/oauth2/token', headers=headers, data=data).json()
    os.environ["TOKEN"] = response["access_token"]

def fetch_flight_data(city_pair, departure_date):
    headers = {
    'Authorization': f'Bearer {os.environ.get("TOKEN")}',
    }
    params = {
        'originLocationCode': f'{city_pair[0]}',
        'destinationLocationCode': f'{city_pair[1]}',
        'departureDate': f'{departure_date}',
        'adults': '1'
    }
    response = requests.get('https://test.api.amadeus.com/v2/shopping/flight-offers', params=params, headers=headers)
    return response


if __name__ == "__main__":
    if os.environ.get("TOKEN") == None:
        update_token()
    
    city_pairs = [('BOS', 'LAX'), ('HND', 'ATL'), ('ORD', 'HKG'), ('JFK', 'HNL'), ('PAE', 'PVD')]
    city_pairs_data = {'BOS-LAX': None, 'HND-ATL': None, 'ORD-HKG': None, 'JFK-HNL': None, 'PAE-PVD': None}

    #flight_data = fetch_flight_data()
    for pair in city_pairs:
        tdy = date.today()
        for x in range(30):
            tdelta = timedelta(days=x)
            pair_data = {}
            flight_data = fetch_flight_data(pair, tdy + tdelta)
            pair_data[str(tdy + tdelta)] = flight_data.json()
        
        city_pairs_data[pair[0] + '-' + pair[1]] = pair_data

    with open("api_data.json", "w", encoding="utf-8") as f:
        json.dump(city_pairs_data, f, indent=4)

    # wrap the execution of a block with methods defined by a context manager

for route, date_data in city_pairs_data.items():
    for day, daily_response in date_data.items():
        save_to_sqlite(daily_response, route)