price = 200 # in dollars
points = 25_000 # in points
tax_rate = 13 # 13% based in Toronto
fees = [
    10, # booking fee
    5, # service fee
]

total_fees = sum(fees)
subtotal = price
tax = price * tax_rate/100
total_price = price + tax + total_fees
unit = ""

value_per_mile = subtotal / points

def to_proper_vpm_string(val):
    display = round(val, 2)
    if val < 1:
        display = round(value_per_mile * 100, 2)
        return f"{display}¢ per mile"

    return f"${display} per mile"

display_string = to_proper_vpm_string(value_per_mile)


print("Hotel booking")
print("------------------------------------------------\n")
print(f"Subtotal: ${round(subtotal, 2)}")
print(f"Tax: ${round(tax, 2)}")
print(f"Fees: ${round(total_fees, 2)}")
print(f"Total: ${round(total_price, 2)}")
print(f"Points Equilvalent: {points} points")
print(f"Value per mile: {display_string}")
print()