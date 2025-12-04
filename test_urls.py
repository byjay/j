import requests

ids = {
    "Sensoji": "v9Qc46g0n4Q",
    "Skytree": "9-v-qjJ-n0g",
    "Tsutenkaku": "7L-Nf5U4GvQ",
    "Osaka Castle": "hB723qW_y5A",
    "Dotonbori": "b-c-v-C-R4VHM",
    "Shibuya": "MhI4C3_w-9Q",
    "Tokyo Tower": "8s4tS520L7M"
}

print("Testing Short IDs...")
for name, id in ids.items():
    url = f"https://images.unsplash.com/photo-{id}?w=800"
    try:
        r = requests.head(url, timeout=5)
        if r.status_code != 200:
             r = requests.get(url, timeout=5, stream=True)
             r.close()
        print(f"{name}: {url} -> {r.status_code}")
    except Exception as e:
        print(f"{name}: {url} -> Error {e}")
