from store_flights import save_to_csv, save_to_sqlite
import os
import json

# Mock API response format
mock_data = {
    "data": [
        {
            "price": {"total": "199.99"},
            "itineraries": [
                {
                    "duration": "PT8H30M",
                    "segments": [
                        {
                            "departure": {
                                "at": "2025-08-15T08:30:00"
                            },
                            "carrierCode": "AA"
                        }
                    ]
                }
            ]
        },
        {
            "price": {"total": "220.00"},
            "itineraries": [
                {
                    "duration": "PT9H15M",
                    "segments": [
                        {
                            "departure": {
                                "at": "2025-08-16T09:00:00"
                            },
                            "carrierCode": "DL"
                        }
                    ]
                }
            ]
        }
    ]
}

route_name = "JFK-LAX"


save_to_csv(mock_data, route_name)
print(f"{route_name}.csv created!")

save_to_sqlite(mock_data, route_name)
print(f"Data saved to SQLite for {route_name}!")
