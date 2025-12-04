import os
import re

BASE_DIR = r"f:\genmini\japness\변환\fam"
JS_DIR = os.path.join(BASE_DIR, "js", "travel")
IMG_DIR = os.path.join(BASE_DIR, "images", "travel")

def verify_local_images():
    print("Verifying local images...")
    broken_links = []
    
    for js_file in ["tokyo.js", "osaka.js", "fukuoka.js"]:
        js_path = os.path.join(JS_DIR, js_file)
        print(f"Checking {js_file}...")
        
        with open(js_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Find all photo paths
        # Matches: "photos": [ "path" ]
        matches = re.findall(r'["\']?photos["\']?:\s*\[\s*["\']([^"\']+)["\']\s*\]', content)
        
        for path in matches:
            # Path in JS is relative to index.html, e.g. "images/travel/tokyo/file.jpg"
            # We need to check if this file exists relative to BASE_DIR
            
            # Remove any leading ./ or /
            clean_path = path.lstrip("./").lstrip("/")
            
            abs_path = os.path.join(BASE_DIR, clean_path)
            
            if os.path.exists(abs_path):
                # print(f"  [OK] {path}")
                pass
            else:
                print(f"  [MISSING] {path} -> {abs_path}")
                broken_links.append((js_file, path))

    print("\nSummary:")
    if broken_links:
        print(f"Found {len(broken_links)} missing local files.")
    else:
        print("All local image references are valid!")

if __name__ == "__main__":
    verify_local_images()
