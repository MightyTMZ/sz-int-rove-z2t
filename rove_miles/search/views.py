from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import FlightSearch
from .serializers import FlightSearchListSerializer, FlightSearchDetailSerializer
from .search_flights import search_flight_offers


class FlightSearchViewset(viewsets.ModelViewSet):
    queryset = FlightSearch.objects.all()
    ordering_fields = ["-searched_at"]

    def get_serializer_class(self):
        if self.action == "list":
            return FlightSearchListSerializer
        elif self.action == "retrieve":
            return FlightSearchDetailSerializer
        return FlightSearchListSerializer

# E.g.
"""
{
    "origin_airport": "YYZ",
    "destination_airport": "LGA",
    "departure_date": "2025-09-17",
    "return_date": "2025-09-20",
    "currency": "CAD",
    "number_of_adults": 1,
    "number_of_children": 0,
    "number_of_infants_in_seat": 0,
    "number_of_infants_on_lap": 0,
    "cabin_class": "BUSINESS"
}
"""

@api_view(["POST"])
def create_new_flight_search(request):
    print(request.data)

    _origin_airport = request.data.get("origin_airport")
    _destination_airport = request.data.get("destination_airport")
    _departure_date = request.data.get("departure_date")
    _return_date = request.data.get("return_date")
    _currency = request.data.get("currency")
    _number_of_adults = request.data.get("number_of_adults")
    _number_of_children = request.data.get("number_of_children")
    _number_of_infants_in_seat = request.data.get(
        "number_of_infants_in_seat"
    )  # Currently only reading and not calculating anything with it yet
    _number_of_infants_on_lap = request.data.get(
        "number_of_infants_on_lap"
    )  # Currently only reading and not calculating anything with it yet
    _cabin_class = request.data.get("cabin_class")

    _device = request.META.get("REMOTE_ADDR")  # ip address of the request

    new_flight_search = FlightSearch.objects.create(
        origin_airport=_origin_airport,
        destination_airport=_destination_airport,
        departure_date=_departure_date,
        return_date=_return_date,
        number_of_adults=_number_of_adults,
        number_of_children=_number_of_children,
        number_of_infants_in_seat=_number_of_infants_in_seat,
        number_of_infants_on_lap=_number_of_infants_on_lap,
        device=_device,
        currency=_currency,
    )

    if not _return_date:
        print("One-way trip")
        response = search_flight_offers(
            origin=_origin_airport,
            destination=_destination_airport,
            departure_date=_departure_date,
            currency_code=_currency,
            # no return date here
            adults=_number_of_adults,
            children=_number_of_children,
            traveler_class=_cabin_class,
        )
    else:
        print("Two-way trip")
        response = search_flight_offers(
            origin=_origin_airport,
            destination=_destination_airport,
            departure_date=_departure_date,
            currency_code=_currency,
            return_date=_return_date,
            adults=_number_of_adults,
            children=_number_of_children,
            traveler_class=_cabin_class,
        )

    print(response.status_code)
    if response.status_code == 200:
        new_flight_search.status = "SUCCESS"
        new_flight_search.search_results = response.json()

    else:
        new_flight_search.status = "FAIL"

    new_flight_search.save()

    print(str(response.json())[:1000])

    return Response(response.json())  # back to the client application
