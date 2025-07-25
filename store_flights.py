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

def save_to_sqlite(data, route_name):
    c.execute(f'''
        CREATE TABLE IF NOT EXISTS {route_name.replace('-', '_')} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            airline TEXT,
            flight_time TEXT,
            price REAL
        )
    ''')

    for offer in data.get('data', []):
        price = float(offer['price']['total'])
        for itinerary in offer['itineraries']:
            duration = itinerary['duration']
            for segment in itinerary['segments']:
                date_ = segment['departure']['at']
                airline = segment['carrierCode']
                c.execute(f'''
                    INSERT INTO {route_name.replace('-', '_')} (date, airline, flight_time, price)
                    VALUES (?, ?, ?, ?)
                ''', (date_, airline, duration, price))

    conn.commit()
    conn.close()
