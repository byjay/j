import requests
import re

filenames = [
    "Tsukiji_fish_market_(1).jpg",
    "GUNDAM@ODAIBA_-_Flickr_-_sun_summer.jpg",
    "Tokyo_disney_resort.jpg",
    "Universal_Studios_Japan.JPG",
    "Tokyo_Tower_M4854.jpg" 
]

print("Fetching Missing Wikimedia URLs...")
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
