from dotenv import load_dotenv
import requests
import os


load_dotenv()
key = os.getenv("API_KEY")
secret = os.getenv("API_SECRET")


def update_token():
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    data = f"grant_type=client_credentials&client_id={key}&client_secret={secret}"
    response = requests.post(
        "https://test.api.amadeus.com/v1/security/oauth2/token",
        headers=headers,
        data=data,
    ).json()
    os.environ["token"] = response["access_token"]


def search_flight_offers(
    origin,
    destination,
    departure_date,
    return_date=None,
    adults=1,
    children=None,
    max_price=None,
    currency_code="USD",
    traveler_class=None,
):
    if os.environ.get("token") == None:
        update_token()

    """
    Search for flight offers for a specific route (two way)
    """
    headers = {
        "Authorization": f'Bearer {os.environ.get("token")}',
    }
    params = {
        "originLocationCode": origin,
        "destinationLocationCode": destination,
        "departureDate": departure_date,
        "departureDate": departure_date,
        "adults": adults,
        "currencyCode": currency_code,
    }

    if return_date:
        params["returnDate"] = return_date

    if max_price:
        params["maxPrice"] = max_price

    if children:
        params["children"] = children

    if traveler_class:
        params["travelClass"] = traveler_class

    response = requests.get(
        "https://test.api.amadeus.com/v2/shopping/flight-offers",
        params=params,
        headers=headers,
    )
    return response
