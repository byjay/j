import requests
import re
from urllib.parse import quote

filenames = [
    "Tokyo_Tower_M4854.jpg",
    "Shibuya-crossing.jpg",
    "Osaka_Castle_in_Osaka,_Japan.jpg",
    "Dotonbori,_Osaka,_at_night,_November_2016.jpg",
    "Narita.JPG",
    "Haneda_airport_6.jpg",
    "Akihabara_Night.jpg",
    "Meiji-Jingu-Shrine-01.jpg",
    "Ueno_Park.jpg",
    "Tsukiji_fish_market_(1).jpg",
    "GUNDAM@ODAIBA_-_Flickr_-_sun_summer.jpg",
    "Tokyo_disney_resort.jpg",
    "Universal_Studios_Japan.JPG",
    "Monjayaki.jpg",
    "Oden_001.jpg",
    "Fugu_sashimi.jpg",
    "Kitsune_Udon.jpg",
    "Umeda_Sky_Building.jpg",
    "Tsutenkaku.jpg",
    "Kuromon_Market_-_panoramio.jpg",
    "Shinsekai_and_Tsutenkaku_at_night_2019-04-12.jpg"
]

print("Fetching Wikimedia URLs...")
for name in filenames:
    # Construct Wiki Page URL
    wiki_url = f"https://commons.wikimedia.org/wiki/File:{name}"
    try:
        # We need a user agent to avoid 403
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        r = requests.get(wiki_url, headers=headers, timeout=10)
        
        if r.status_code == 200:
            # Extract og:image which is usually the preview or full image
            match = re.search(r'<meta property="og:image" content="(.*?)"', r.text)
            if match:
                img_url = match.group(1)
                print(f"{name}: {img_url}")
            else:
                # Fallback: look for the full resolution link
                # <a href="//upload.wikimedia.org/wikipedia/commons/..." class="internal"
                match2 = re.search(r'href="//(upload\.wikimedia\.org/wikipedia/commons/[^"]+)" class="internal"', r.text)
                if match2:
                    print(f"{name}: https://{match2.group(1)}")
                else:
                    print(f"{name}: [NOT FOUND IN HTML]")
        else:
            print(f"{name}: [HTTP {r.status_code}]")
            
    except Exception as e:
        print(f"{name}: [ERROR] {e}")
