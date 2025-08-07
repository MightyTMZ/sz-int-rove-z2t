from django.db import models


class FlightSearch(models.Model):

    SEARCH_STATUS_SUCCESS = "SUCCESS"
    SEARCH_STATUS_FAIL = "FAIL"
    SEARCH_STATUS_CHOICES = [
        (SEARCH_STATUS_SUCCESS, "Success"),
        (SEARCH_STATUS_FAIL, "Fail"),
    ]

    searched_at = models.DateTimeField(auto_now_add=True)
    origin_airport = models.CharField(max_length=255)
    destination_airport = models.CharField(max_length=255)
    departure_date = models.DateField(null=True, blank=True)
    return_date = models.DateField(null=True, blank=True)
    number_of_adults = models.PositiveSmallIntegerField(default=1)
    number_of_children = models.PositiveSmallIntegerField(default=0)
    number_of_infants_in_seat = models.PositiveSmallIntegerField(default=0)
    number_of_infants_on_lap = models.PositiveSmallIntegerField(default=0)
    cabin_class = models.CharField(max_length=255, default="ECONOMY")

    device = models.GenericIPAddressField()

    search_results = models.JSONField()

    status = models.CharField(
        max_length=10,
        choices=SEARCH_STATUS_CHOICES,
        default=SEARCH_STATUS_FAIL, 
        help_text="The outcome of the search operation."
    )

    def __str__(self):
        return f"{self.origin_airport} to {self.destination_airport}"
