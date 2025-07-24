from dotenv import load_dotenv
import os
import requests

load_dotenv()
key = os.environ.get("api-key")
secret = os.environ.get("api-secret")

print("Key", key)
print("Secret", secret)


def update_token():
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    data = f'grant_type=client_credentials&client_id={key}&client_secret={secret}'
    response = requests.post('https://test.api.amadeus.com/v1/security/oauth2/token', headers=headers, data=data).json()
    os.environ["token"] = response["access_token"]

def flight_destinations():
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
    print(flight_destinations()) #Currently receiving Response code 500. API may be down temporarily
    