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


def fetch_hotel_offers(hotel_ids, check_in_date, check_out_date, adults=1):
    """
    Fetch hotel offers for specific hotels
    
    Args:
        hotel_ids (list): List of hotel IDs (get these from fetch_hotels_by_city first)
        check_in_date (str): Check-in date in YYYY-MM-DD format
        check_out_date (str): Check-out date in YYYY-MM-DD format
        adults (int): Number of adults (default: 1)
    """
    headers = {
        'Authorization': f'Bearer {os.environ.get("token")}',
    }
    params = {
        'hotelIds': ','.join(hotel_ids),
        'checkInDate': check_in_date,
        'checkOutDate': check_out_date,
        'adults': adults,
    }
    
    response = requests.get('https://test.api.amadeus.com/v3/shopping/hotel-offers', params=params, headers=headers)
    return response


def get_hotel_ids_from_city(city_code, limit=5):
    """
    Helper function to get hotel IDs from city data
    
    Args:
        city_code (str): IATA city code (e.g., 'PAR' for Paris)
        limit (int): Maximum number of hotel IDs to return
    """
    hotels_response = fetch_hotels_by_city(city_code)
    
    if hotels_response.status_code == 200:
        hotels_data = hotels_response.json()
        hotel_ids = []
        
        if 'data' in hotels_data:
            for hotel in hotels_data['data'][:limit]:
                if 'hotelId' in hotel:
                    hotel_ids.append(hotel['hotelId'])
        
        return hotel_ids
    else:
        print(f"Error fetching hotels: {hotels_response.status_code}")
        return []


def fetch_hotels_by_geocode(latitude, longitude, radius=5):
    """
    Fetch hotels by geographic coordinates
    
    Args:
        latitude (float): Latitude coordinate
        longitude (float): Longitude coordinate  
        radius (int): Search radius in kilometers (default: 5)
    """
    headers = {
        'Authorization': f'Bearer {os.environ.get("token")}',
    }
    params = {
        'latitude': latitude,
        'longitude': longitude,
        'radius': radius,
    }
    
    response = requests.get('https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode', params=params, headers=headers)
    return response


def fetch_hotels_by_city(city_code):
    """
    Fetch all hotels in a specific city
    
    Args:
        city_code (str): IATA city code (e.g., 'PAR' for Paris)
    """
    headers = {
        'Authorization': f'Bearer {os.environ.get("token")}',
    }
    params = {
        'cityCode': city_code,
    }
    
    response = requests.get('https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city', params=params, headers=headers)
    return response


if __name__ == "__main__":
    if os.environ.get("token") == None:
        update_token()

    # First, get hotels by city to retrieve hotel IDs
    print("Fetching hotels in Paris...")
    hotels_in_city = fetch_hotels_by_city('PAR')
    
    # Save hotels by city data
    with open("api_data/hotels_by_city_data.json", "w", encoding="utf-8") as f:
        json.dump(hotels_in_city.json(), f, indent=4)
    
    print(f"Hotels by city response status: {hotels_in_city.status_code}")
    
    if hotels_in_city.status_code == 200:
        # Get hotel IDs from the city data
        hotel_ids = get_hotel_ids_from_city('PAR', limit=3)
        print(f"Found {len(hotel_ids)} hotel IDs: {hotel_ids}")
        
        if hotel_ids:
            # Now search for hotel offers using the hotel IDs
            print("Fetching hotel offers...")
            hotel_offers = fetch_hotel_offers(
                hotel_ids=hotel_ids,
                check_in_date='2025-09-17',
                check_out_date='2025-09-20',
                adults=2
            )

            # Save hotel offers data
            with open("api_data/hotel_offers_data.json", "w", encoding="utf-8") as f:
                json.dump(hotel_offers.json(), f, indent=4)
            
            print(f"Hotel offers response status: {hotel_offers.status_code}")
        else:
            print("No hotel IDs found to search for offers")
    else:
        print("Failed to fetch hotels by city")