import requests

HOTELBEDS_API_KEY = "c7074b5cc67f1396375dcda18c1c8d05"
HOTELBEDS_API_SECRET = "257c2c1fef"

endpoint = "https://api.test.hotelbeds.com"
secure_endpoint = "https://api-secure.test.hotelbeds.com"

response = requests.get(f"{endpoint}")

print(response.status_code)