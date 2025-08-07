from .models import FlightSearch
from rest_framework import serializers


class FlightSearchListSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightSearch
        fields = [
            "status",
            "searched_at",
            "origin_airport",
            "destination_airport",
            "departure_date",
            "return_date",
            "currency",
            "number_of_adults",
            "number_of_children",
            "number_of_infants_in_seat",
            "number_of_infants_on_lap",
            "cabin_class",
        ]


class FlightSearchDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightSearch
        fields = [
            "status",
            "searched_at",
            "origin_airport",
            "destination_airport",
            "departure_date",
            "return_date",
            "currency",
            "number_of_adults",
            "number_of_children",
            "number_of_infants_in_seat",
            "number_of_infants_on_lap",
            "cabin_class",
            "search_results",  # This is a huge field. So we don't want to show it in a list view
        ]


class FlightSearchCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FlightSearch
        fields = [
            "origin_airport",
            "destination_airport",
            "departure_date",
            "return_date",
            "number_of_adults",
            "number_of_children",
            "number_of_infants_in_seat",
            "number_of_infants_on_lap",
            "cabin_class",
        ]
