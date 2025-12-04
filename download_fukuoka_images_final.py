import os
import requests
from pathlib import Path

# Directory
SAVE_DIR = Path(r"f:\genmini\japness\변환\fam\images\travel\fukuoka")
SAVE_DIR.mkdir(parents=True, exist_ok=True)

# URL Mapping
URLS = {
    "fuk_airport.jpg": "https://images.unsplash.com/photo-1571644787968-3f5e55e5f5e5?fm=jpg&q=60&w=800",
    "shinshin_ramen.jpg": "https://images.unsplash.com/photo-1635379511574-bc167ca085c8?fm=jpg&q=60&w=800",
    "daimyo_street.jpg": "https://images.unsplash.com/photo-1665844237720-a34398cd6aac?fm=jpg&q=60&w=800",
    "cafe_del_sol.jpg": "https://images.unsplash.com/photo-1581782408905-12a1a453b10f?fm=jpg&q=60&w=800",
    "ohori_park.jpg": "https://images.unsplash.com/photo-1698790473387-4e09197c7a38?fm=jpg&q=60&w=800",
    "motsunabe_rakutenchi.jpg": "https://images.unsplash.com/photo-1649477870301-0dac6b5500f2?fm=jpg&q=60&w=800",
    "don_quijote.jpg": "https://images.unsplash.com/photo-1718965106223-6abba0b89ee3?fm=jpg&q=60&w=800",
    "hakata_station.jpg": "https://images.unsplash.com/photo-1666292690086-2abaa533ab22?fm=jpg&q=60&w=800",
    "yufuin_yunotsubo.jpg": "https://images.unsplash.com/photo-1760243875175-064c835a0b40?fm=jpg&q=60&w=800",
    "yufumabushi_shin.jpg": "https://images.unsplash.com/photo-1682566509568-ded8649b26bb?fm=jpg&q=60&w=800",
    "kinrin_lake.jpg": "https://images.unsplash.com/photo-1632770464481-2644a3f65b5c?fm=jpg&q=60&w=800",
    "yufuin_onsen.jpg": "https://images.unsplash.com/photo-1655368973858-851fcadb6310?fm=jpg&q=60&w=800",
    "hakata_issou.jpg": "https://images.unsplash.com/photo-1635379511574-bc167ca085c8?fm=jpg&q=60&w=800",
    "sumiyoshi_shrine.jpg": "https://images.unsplash.com/photo-1695155391833-7b1d76345729?fm=jpg&q=60&w=800",
    "udon_taira.jpg": "https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?fm=jpg&q=60&w=800",
    "canal_city.jpg": "https://images.unsplash.com/photo-1667702659491-ad8845e968e4?fm=jpg&q=60&w=800",
    "kushida_shrine.jpg": "https://images.unsplash.com/photo-1627902314049-812a02602d22?fm=jpg&q=60&w=800",
    "nakasu_river.jpg": "https://images.unsplash.com/photo-1716386480181-4f54852e9f34?fm=jpg&q=60&w=800",
    "ichiran_head.jpg": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?fm=jpg&q=60&w=800",
    "ichiran_hq.jpg": "https://images.unsplash.com/photo-1591325418441-ff678baf78ef?fm=jpg&q=60&w=800",
    "yatai_nakasu.jpg": "https://images.unsplash.com/photo-1762674462373-9d60e536f580?fm=jpg&q=60&w=800",
    "nakasu_yatai.jpg": "https://images.unsplash.com/photo-1762674462373-9d60e536f580?fm=jpg&q=60&w=800",
    "tanya_hakata.jpg": "https://images.unsplash.com/photo-1678684279246-96e6afb970f2?fm=jpg&q=60&w=800",
    "amu_plaza.jpg": "https://images.unsplash.com/photo-1666292690086-2abaa533ab22?fm=jpg&q=60&w=800",
    "hakata_bento.jpg": "https://images.unsplash.com/photo-1696677049263-cc38af1c7681?fm=jpg&q=60&w=800",
    "placeholder.jpg": "https://images.unsplash.com/photo-1571644787968-3f5e55e5f5e5?fm=jpg&q=60&w=800"
}

def download_image(url, filename):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        with open(SAVE_DIR / filename, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded: {filename}")
    except Exception as e:
        print(f"Failed: {filename} - {e}")

if __name__ == "__main__":
    for filename, url in URLS.items():
        download_image(url, filename)
