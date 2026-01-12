import json
import os
import re

DATA_PATH = r"F:\genmini\japness\JAP_BONG_fam\data\fukuoka_poi.json"
JS_PATH = r"F:\genmini\japness\JAP_BONG_fam\js\travel\fukuoka.js"
PROJECT_ROOT = r"F:\genmini\japness\JAP_BONG_fam"

def verify_data():
    print("🔍 Verifying Fukuoka Travel Data...")
    
    # 1. Load POI Data
    try:
        with open(DATA_PATH, 'r', encoding='utf-8') as f:
            poi_data = json.load(f)
            poi_map = {item['id']: item for item in poi_data}
            print(f"✅ Loaded {len(poi_data)} POIs from JSON.")
    except Exception as e:
        print(f"❌ Failed to load JSON: {e}")
        return

    # 2. Extract Scheduled IDs from JS
    scheduled_ids = []
    try:
        with open(JS_PATH, 'r', encoding='utf-8') as f:
            content = f.read()
            # Crude regex to find strings in the schedule arrays
            # Assuming format: "poi_id", // comment
            matches = re.findall(r'"([a-z0-9_]+)",?\s*//', content)
            scheduled_ids = matches
            print(f"✅ Found {len(scheduled_ids)} scheduled items in JS.")
    except Exception as e:
        print(f"❌ Failed to load JS: {e}")
        return

    # 3. Check Schedule Integrity
    missing_pois = []
    for pid in scheduled_ids:
        if pid not in poi_map:
            missing_pois.append(pid)
    
    if missing_pois:
        print(f"❌ MISSING POI DEFINITIONS ({len(missing_pois)}):")
        for pid in missing_pois:
            print(f"  - {pid}")
    else:
        print("✅ All scheduled POIs are defined in JSON.")

    # 4. Check Image Paths
    broken_images = []
    for item in poi_data:
        photos = item.get('photos', [])
        for photo in photos:
            if photo.startswith('http'): continue
            
            full_path = os.path.join(PROJECT_ROOT, photo.replace('/', os.sep))
            if not os.path.exists(full_path):
                broken_images.append((item['id'], photo))
    
    if broken_images:
        print(f"❌ BROKEN IMAGE LINKS ({len(broken_images)}):")
        for pid, path in broken_images:
            print(f"  - POI: {pid} -> {path}")
    else:
        print("✅ All local image paths are valid.")

if __name__ == "__main__":
    verify_data()
