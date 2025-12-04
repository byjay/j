import requests
import re

filenames = [
    "FUKAirport.JPG",
    "Hakata_Station.jpg",
    "Canal_City_Hakata_2011.jpg",
    "Ohori_Park,_Fukuoka.JPG",
    "Fukuoka_Tower.JPG",
    "Seaside-momochi.JPG",
    "DazaifuTenmangu.jpg",
    "Yatai_in_Car_park.JPG",
    "Motsunabe.jpg",
    "Hakata_ramen.JPG"
]

print("Fetching Fukuoka Wikimedia URLs...")
for name in filenames:
    wiki_url = f"https://commons.wikimedia.org/wiki/File:{name}"
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        r = requests.get(wiki_url, headers=headers, timeout=10)
        if r.status_code == 200:
            match = re.search(r'<meta property="og:image" content="(.*?)"', r.text)
            if match:
                print(f"{name}: {match.group(1)}")
            else:
                print(f"{name}: [NOT FOUND]")
        else:
            print(f"{name}: [HTTP {r.status_code}]")
    except Exception as e:
        print(f"{name}: [ERROR] {e}")
