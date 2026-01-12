import json
import os

# Load POI data
try:
    with open('data/fukuoka_poi.json', 'r', encoding='utf-8') as f:
        pois = json.load(f)
except Exception as e:
    print(f"Error loading JSON: {e}")
    exit(1)

# Base directory for images
base_dir = os.getcwd()
missing_images = []

print(f"Checking {len(pois)} POIs for image references...")

for poi in pois:
    if 'photos' in poi:
        for photo_path in poi['photos']:
            # Construct full path
            full_path = os.path.join(base_dir, photo_path)
            # Check if file exists
            if not os.path.exists(full_path):
                missing_images.append(photo_path)
            # else:
            #     print(f"OK: {photo_path}")

if missing_images:
    print(f"Found {len(missing_images)} missing images:")
    for img in missing_images:
        print(img)
else:
    print("All image references are valid! No missing files found.")
