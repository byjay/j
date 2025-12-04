import os
import re
import requests
from pathlib import Path
import time

BASE_DIR = Path(__file__).parent
TRAVEL_JS_DIR = BASE_DIR / 'js' / 'travel'
IMAGES_DIR = BASE_DIR / 'images' / 'travel'

# Cities to process
CITIES = [
    'nagoya', 'kobe', 'nara', 'yokohama', 'hakone', 
    'sendai', 'sapporo', 'kanazawa', 'okinawa', 
    'hiroshima', 'nagasaki', 'nikko', 'kyoto', 'osaka'
]

def extract_photo_urls(js_file_path):
    """Extract all Unsplash photo URLs from a JS file"""
    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all Unsplash URLs
    pattern = r'https://images\.unsplash\.com/photo-[^"\']+\?w=800'
    urls = re.findall(pattern, content)
    return urls

def download_image(url, save_path):
    """Download image from URL to save_path"""
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        
        with open(save_path, 'wb') as f:
            f.write(response.content)
        print(f"✓ Downloaded: {save_path.name}")
        return True
    except Exception as e:
        print(f"✗ Failed: {save_path.name} - {e}")
        return False

def main():
    total_downloaded = 0
    total_failed = 0
    
    for city in CITIES:
        js_file = TRAVEL_JS_DIR / f'{city}.js'
        
        if not js_file.exists():
            print(f"⊘ Skipping {city}: JS file not found")
            continue
        
        print(f"\n{'='*60}")
        print(f"Processing: {city.upper()}")
        print(f"{'='*60}")
        
        # Extract URLs
        urls = extract_photo_urls(js_file)
        if not urls:
            print(f"⊘ No Unsplash URLs found in {city}.js")
            continue
        
        print(f"Found {len(urls)} photo URLs")
        
        # Create city folder
        city_folder = IMAGES_DIR / city
        city_folder.mkdir(parents=True, exist_ok=True)
        
        # Download each image
        for idx, url in enumerate(urls, 1):
            filename = f"{city}_{idx}.jpg"
            save_path = city_folder / filename
            
            # Skip if already exists
            if save_path.exists():
                print(f"○ Exists: {filename}")
                continue
            
            # Download
            if download_image(url, save_path):
                total_downloaded += 1
            else:
                total_failed += 1
            
            # Rate limiting
            time.sleep(0.5)
    
    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    print(f"✓ Downloaded: {total_downloaded} images")
    print(f"✗ Failed: {total_failed} images")
    print(f"📂 Location: {IMAGES_DIR}")

if __name__ == '__main__':
    main()
