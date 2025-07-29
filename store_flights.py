import csv
import sqlite3
import os

db_path="data.db"
conn = sqlite3.connect(db_path)
c = conn.cursor()

def save_to_csv(data, route_name):
    filename = f"{route_name}.csv"
    with open(filename, mode='w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['Date', 'Airline', 'Flight Time', 'Price'])  # header

        for offer in data.get('data', []):
            price = offer['price']['total']
            for itinerary in offer['itineraries']:
                duration = itinerary['duration']
                for segment in itinerary['segments']:
                    date = segment['departure']['at']
                    airline = segment['carrierCode']
                    writer.writerow([date, airline, duration, price])

def save_to_sqlite(flight_json, route, conn):
    c = conn.cursor()

    # Create table if not exists
    c.execute('''
        CREATE TABLE IF NOT EXISTS flights (
            route TEXT,
            departure_date TEXT,
            price REAL,
            carrier TEXT
        )
    ''')

    # Extract data
    try:
        for offer in flight_json.get("data", []):
            price = float(offer["price"]["total"])
            carrier = offer["validatingAirlineCodes"][0]
            departure_date = offer["itineraries"][0]["segments"][0]["departure"]["at"].split("T")[0]

            c.execute('''
                INSERT INTO flights (route, departure_date, price, carrier)
                VALUES (?, ?, ?, ?)
            ''', (route, departure_date, price, carrier))
    except Exception as e:
        print(f"Error saving route {route}: {e}")
