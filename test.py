import json
from store_flights import save_to_csv, save_to_sqlite
import sqlite3

# Load data from file
with open("api_data.json", "r") as f:
    city_pairs_data = json.load(f)

# Open SQLite connection
conn = sqlite3.connect("data.db")

# Loop and insert
for route, date_data in city_pairs_data.items():
    for day, daily_response in date_data.items():
        # Make sure this is a dict (JSON response, not string)
        save_to_sqlite(daily_response, route, conn)
        # Optionally: save_to_csv(daily_response, route)

conn.close()