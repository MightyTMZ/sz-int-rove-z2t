from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(f"flight-searches", views.FlightSearchViewset)


urlpatterns = [
   path("", include(router.urls)),
   path('create-new-search/', views.create_new_flight_search, name="create_new_flight_search")
]