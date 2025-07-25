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

def fetch_flight_destinations():
    headers = {
    'Authorization': f'Bearer {os.environ.get("token")}',
    }
    params = {
        'origin': 'PAR',
        'maxPrice': '200',
    }
    response = requests.get('https://test.api.amadeus.com/v1/shopping/flight-destinations', params=params, headers=headers)
    return response

if __name__ == "__main__":
    if os.environ.get("token") == None:
        update_token()

    flight_destinations = fetch_flight_destinations()

    # wrap the execution of a block with methods defined by a context manager
    with open("api_data.json", "w", encoding="utf-8") as f:
            json.dump(flight_destinations.json(), f, indent=4)        