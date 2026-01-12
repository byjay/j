import os
import glob
import json
from PIL import Image

# Configuration
IMAGE_DIR = 'images'
DATA_FILE = 'data/fukuoka_poi.json'

print("🚀 OpenCode: Starting 8K Image Optimization...")

converted_map = {} # old_path -> new_path

# 1. Convert Images
# Recursive glob for images
types = ('**/*.png', '**/*.jpg', '**/*.jpeg')
files = []
for files_type in types:
    files.extend(glob.glob(os.path.join(IMAGE_DIR, files_type), recursive=True))

print(f"Found {len(files)} images to optimize.")

for filepath in files:
    try:
        filename, ext = os.path.splitext(filepath)
        # Skip if already webp (though glob shouldn't find them)
        if ext.lower() == '.webp': continue

        new_filepath = filename + '.webp'
        
        # Open and save as WebP
        with Image.open(filepath) as img:
            # Handle RGBA for PNG
            if img.mode in ('RGBA', 'LA'):
                background = Image.new(img.mode[:-1], img.size, (255, 255, 255))
                background.paste(img, img.split()[-1])
                img = background.convert('RGB') # WebP supports transparency but JPG conversion often needs RGB
            
            # Simple conversion
            img.save(new_filepath, 'webp', quality=85)
        
        # Store for path replacement (normalize slashes to standard forward slash for web)
        old_key = filepath.replace('\\', '/')
        new_key = new_filepath.replace('\\', '/')
        converted_map[old_key] = new_key
        
        print(f"✅ Converted: {filepath} -> {new_filepath}")
        
    except Exception as e:
        print(f"❌ Error converting {filepath}: {e}")

# 2. Update JSON Data
if os.path.exists(DATA_FILE):
    print(f"Updating references in {DATA_FILE}...")
    try:
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            data_str = f.read()
            
        # Naive string replacement is fast and effective for full paths
        update_count = 0
        for old_path, new_path in converted_map.items():
            if old_path in data_str:
                data_str = data_str.replace(old_path, new_path)
                update_count += 1
                
        with open(DATA_FILE, 'w', encoding='utf-8') as f:
            f.write(data_str)
            
        print(f"✅ Updated {update_count} image references in JSON.")
        
    except Exception as e:
        print(f"❌ Error updating JSON: {e}")
else:
    print(f"⚠️ Data file {DATA_FILE} not found. Skipped reference update.")

print("✨ Optimization Complete.")
