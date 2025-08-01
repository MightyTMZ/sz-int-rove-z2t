import json

with open("api_data.json") as file:
    data = json.load(file)

    flight_offers = data["BOS-LAX"]["2025-08-23"]["data"]

    # print(flight_offers)

    cheapest_flight_index = 0
    cheapest_flight_price = float(flight_offers[0]["price"]["grandTotal"])

    for x in range(len(flight_offers)):
        flight = flight_offers[x]
        prices = flight["price"]
        grand_total = float(prices["grandTotal"])  # Convert to float here!

        if grand_total < cheapest_flight_price:
            cheapest_flight_price = grand_total  # Update this too!
            cheapest_flight_index = x

    print(f"The cheapest flight was found at index {cheapest_flight_index}")
    print(f"The cheapest flight was found at id of {cheapest_flight_index + 1}")
    print(f"Below is the flight information")
    print("------------------------------------------------------------")
    print(f"Price: {cheapest_flight_price}")
