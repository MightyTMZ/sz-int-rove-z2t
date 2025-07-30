from random import shuffle


airports = [
    "BOS",  # Boston, United States
    "LAX",  # Los Angeles, United States
    "HND",  # Tokyo, Japan
    "ATL",  # Atlanta, United States
    "ORD",  # Chicago, United States
    "HKG",  # Hong Kong
    "YYZ",  # Toronto, Canada
    "JFK",  # New York City (John F. Kennedy), United States
    "LGA",  # New York City (LaGuardia), United States
    "DFW",  # Dallas, United States
    "IAH",  # Houston, United States
    "SFO",  # San Francisco, United States
    "PHX",  # Phoenix, Arizona
    "SEA",  # Seattle, United States
    "YVR",  # Vancouver, Canada
    "DEN",  # Denver, United States
    "IST",  # Istanbul, Turkey
    "PVG",  # Shanghai, China
    "CAN",  # Guanzhou, China
    "ICN",  # Seoul, South Korea
    "SIN",  # Singapore
    "SZX",  # Shenzhen, China
    "FRA",  # Frankfurt, Germany
    "CDG",  # Paris. France
]

print(shuffle(airports))


def get_proper_airport_pair():
    shuffle(airports)
    return airports[:2]


for x in range(10):
    pair = get_proper_airport_pair()
    print(pair)
