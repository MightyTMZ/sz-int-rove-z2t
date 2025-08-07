from django.shortcuts import render
from rest_framework import viewsets
from .models import FlightSearch
from .serializers import FlightSearchListSerializer, FlightSearchDetailSerializer


class FlightSearchViewset(viewsets.ModelViewSet):
    queryset = FlightSearch.objects.all()
    ordering_fields = ["-searched_at"]

    def get_serializer_class(self):
        if self.action == 'list':
            return FlightSearchListSerializer
        elif self.action == 'retrieve':
            return FlightSearchDetailSerializer
        return FlightSearchListSerializer
