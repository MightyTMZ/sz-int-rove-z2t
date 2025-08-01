"""
Build recommendation tool - Design either a code option or a visual
diagram/outline for a working algorithm that recommends the best
redemption choice, given user's origin/destination, travel dates, and
number of miles.
"""

from random import shuffle
import datetime


# Simulated flight data: (origin, destination, date, miles_cost, cash_cost, availability)
# This is a simplified representation. Real data would be more complex.
simulated_flight_data = [
    ("BOS", "LAX", datetime.date(2025, 10, 15), 25000, 300, True),
    ("BOS", "LAX", datetime.date(2025, 10, 16), 20000, 280, True),
    ("BOS", "LAX", datetime.date(2025, 10, 17), 30000, 350, True),
    ("LAX", "HND", datetime.date(2025, 11, 1), 70000, 800, True),
    ("LAX", "HND", datetime.date(2025, 11, 2), 65000, 750, True),
    ("LAX", "HND", datetime.date(2025, 11, 3), 80000, 900, False), # Not available
    ("YYZ", "JFK", datetime.date(2025, 9, 20), 10000, 150, True),
    ("YYZ", "JFK", datetime.date(2025, 9, 21), 9000, 140, True),
    ("JFK", "CDG", datetime.date(2025, 12, 5), 60000, 700, True),
    ("JFK", "CDG", datetime.date(2025, 12, 6), 55000, 650, True),
    ("SFO", "SIN", datetime.date(2026, 1, 10), 90000, 1000, True),
    ("SFO", "SIN", datetime.date(2026, 1, 11), 85000, 950, True),
    ("ATL", "IST", datetime.date(2025, 10, 25), 50000, 600, True),
    ("ORD", "FRA", datetime.date(2025, 11, 15), 48000, 580, True),
    ("DEN", "PHX", datetime.date(2025, 9, 10), 12000, 180, True),
    ("SEA", "YVR", datetime.date(2025, 8, 30), 8000, 100, True),
]

# Simulated hotel data: (location, check_in_date, check_out_date, miles_cost, cash_cost, availability)
simulated_hotel_data = [
    ("LAX", datetime.date(2025, 10, 15), datetime.date(2025, 10, 18), 15000, 200, True),
    ("HND", datetime.date(2025, 11, 1), datetime.date(2025, 11, 5), 25000, 300, True),
    ("JFK", datetime.date(2025, 9, 20), datetime.date(2025, 9, 22), 10000, 120, True),
    ("CDG", datetime.date(2025, 12, 5), datetime.date(2025, 12, 8), 20000, 250, True),
    ("SIN", datetime.date(2026, 1, 10), datetime.date(2026, 1, 15), 30000, 400, True),
]

# Simulated car rental data: (location, pick_up_date, drop_off_date, miles_cost, cash_cost, availability)
simulated_car_rental_data = [
    ("LAX", datetime.date(2025, 10, 15), datetime.date(2025, 10, 18), 8000, 100, True),
    ("HND", datetime.date(2025, 11, 1), datetime.date(2025, 11, 5), 12000, 150, True),
    ("JFK", datetime.date(2025, 9, 20), datetime.date(2025, 9, 22), 7000, 90, True),
]


# --- Helper Functions ---

def parse_date(date_str):
    """Parses a date string (mm/dd/yyyy) into a datetime.date object."""
    try:
        return datetime.datetime.strptime(date_str, "%m/%d/%Y").date()
    except ValueError:
        return None

def calculate_value_per_mile(miles_cost, cash_cost):
    """Calculates the value (cents) per mile for a given redemption."""
    if miles_cost > 0:
        return (cash_cost / miles_cost) * 100 # Value in cents per mile
    return 0


def recommend_redemption(
    origin: str,
    destination: str,
    departure_date_str: str,
    return_date_str: str, # Added return date for hotel/car
    number_of_miles: int
):
    """
    Recommends the best redemption choices based on user input.

    Args:
        origin (str): User's origin airport code.
        destination (str): User's destination airport code.
        departure_date_str (str): Departure date in mm/dd/yyyy format.
        return_date_str (str): Return date in mm/dd/yyyy format (for multi-day redemptions).
        number_of_miles (int): User's available miles.

    Returns:
        list: A list of recommended redemption options, sorted by value per mile.
    """
    departure_date = parse_date(departure_date_str)
    return_date = parse_date(return_date_str)

    if not departure_date:
        return {"error": "Invalid departure date format. Please use mm/dd/yyyy."}
    if not return_date:
        return {"error": "Invalid return date format. Please use mm/dd/yyyy."}
    if departure_date > return_date:
        return {"error": "Departure date cannot be after return date."}

    recommendations = []

    # 1. Search for Flights
    for flight in simulated_flight_data:
        f_origin, f_destination, f_date, f_miles, f_cash, f_available = flight
        if (f_origin == origin and
            f_destination == destination and
            f_date == departure_date and
            f_miles <= number_of_miles and
            f_available):
            value_per_mile = calculate_value_per_mile(f_miles, f_cash)
            recommendations.append({
                "type": "Flight",
                "details": f"Flight from {f_origin} to {f_destination} on {f_date.strftime('%m/%d/%Y')}",
                "miles_cost": f_miles,
                "cash_value": f_cash,
                "value_per_mile": value_per_mile
            })

    # 2. Search for Hotels (at destination or origin for layovers/staycations)
    # For simplicity, we'll assume hotels at the destination for the travel dates.
    for hotel in simulated_hotel_data:
        h_location, h_check_in, h_check_out, h_miles, h_cash, h_available = hotel
        if (h_location == destination and
            h_check_in >= departure_date and # Check-in can be on or after departure
            h_check_out <= return_date and   # Check-out can be on or before return
            h_miles <= number_of_miles and
            h_available):
            value_per_mile = calculate_value_per_mile(h_miles, h_cash)
            recommendations.append({
                "type": "Hotel",
                "details": f"Hotel in {h_location} from {h_check_in.strftime('%m/%d/%Y')} to {h_check_out.strftime('%m/%d/%Y')}",
                "miles_cost": h_miles,
                "cash_value": h_cash,
                "value_per_mile": value_per_mile
            })

    # 3. Search for Car Rentals (at destination or origin)
    for car in simulated_car_rental_data:
        c_location, c_pick_up, c_drop_off, c_miles, c_cash, c_available = car
        if (c_location == destination and
            c_pick_up >= departure_date and
            c_drop_off <= return_date and
            c_miles <= number_of_miles and
            c_available):
            value_per_mile = calculate_value_per_mile(c_miles, c_cash)
            recommendations.append({
                "type": "Car Rental",
                "details": f"Car rental in {c_location} from {c_pick_up.strftime('%m/%d/%Y')} to {c_drop_off.strftime('%m/%d/%Y')}",
                "miles_cost": c_miles,
                "cash_value": c_cash,
                "value_per_mile": value_per_mile
            })

    # Sort recommendations by value per mile (highest first)
    recommendations.sort(key=lambda x: x["value_per_mile"], reverse=True)

    return recommendations

# --- Example Usage ---
if __name__ == "__main__":
    print("--- Flight Recommendation Example ---")
    user_origin = "BOS"
    user_destination = "LAX"
    user_departure_date = "10/16/2025"
    user_return_date = "10/18/2025" # Added for hotel/car
    user_miles = 25000

    flight_recs = recommend_redemption(
        user_origin,
        user_destination,
        user_departure_date,
        user_return_date,
        user_miles
    )

    if "error" in flight_recs:
        print(flight_recs["error"])
    elif flight_recs:
        print(f"Recommendations for {user_origin} to {user_destination} with {user_miles} miles:")
        for rec in flight_recs:
            print(f"- {rec['type']}: {rec['details']}")
            print(f"  Miles Cost: {rec['miles_cost']}, Cash Value: ${rec['cash_value']:.2f}")
            print(f"  Value per Mile: {rec['value_per_mile']:.2f} cents")
    else:
        print("No recommendations found for the given criteria.")

    print("\n--- Hotel/Car Recommendation Example (at destination) ---")
    user_origin_hotel = "LAX" # For context, not directly used by hotel/car search
    user_destination_hotel = "HND"
    user_departure_date_hotel = "11/01/2025"
    user_return_date_hotel = "11/05/2025"
    user_miles_hotel = 30000

    hotel_car_recs = recommend_redemption(
        user_origin_hotel,
        user_destination_hotel,
        user_departure_date_hotel,
        user_return_date_hotel,
        user_miles_hotel
    )

    if "error" in hotel_car_recs:
        print(hotel_car_recs["error"])
    elif hotel_car_recs:
        print(f"Recommendations for {user_destination_hotel} with {user_miles_hotel} miles:")
        for rec in hotel_car_recs:
            print(f"- {rec['type']}: {rec['details']}")
            print(f"  Miles Cost: {rec['miles_cost']}, Cash Value: ${rec['cash_value']:.2f}")
            print(f"  Value per Mile: {rec['value_per_mile']:.2f} cents")
    else:
        print("No recommendations found for the given criteria.")

    print("\n--- No Availability Example ---")
    user_origin_no_avail = "LAX"
    user_destination_no_avail = "HND"
    user_departure_date_no_avail = "11/03/2025" # This date is marked as unavailable
    user_return_date_no_avail = "11/05/2025"
    user_miles_no_avail = 80000

    no_avail_recs = recommend_redemption(
        user_origin_no_avail,
        user_destination_no_avail,
        user_departure_date_no_avail,
        user_return_date_no_avail,
        user_miles_no_avail
    )

    if "error" in no_avail_recs:
        print(no_avail_recs["error"])
    elif no_avail_recs:
        print(f"Recommendations for {user_origin_no_avail} to {user_destination_no_avail} with {user_miles_no_avail} miles:")
        for rec in no_avail_recs:
            print(f"- {rec['type']}: {rec['details']}")
            print(f"  Miles Cost: {rec['miles_cost']}, Cash Value: ${rec['cash_value']:.2f}")
            print(f"  Value per Mile: {rec['value_per_mile']:.2f} cents")
    else:
        print("No recommendations found for the given criteria.")
