import os
import re
import requests
import time

# Configuration
BASE_DIR = r"f:\genmini\japness\변환\fam"
JS_DIR = os.path.join(BASE_DIR, "js", "travel")
IMG_DIR = os.path.join(BASE_DIR, "images", "travel")

# Sensoji fix
SENSOJI_WIKI_FILE = "Pagoda at Sensōji in Asakusa, Tokyo, 2019 - 452.jpg"

def get_wiki_image_url(filename):
    """Scrapes the direct image URL from a Wikimedia Commons file page."""
    url = f"https://commons.wikimedia.org/wiki/File:{filename}"
    try:
        headers = {'User-Agent': 'Mozilla/5.0'}
        r = requests.get(url, headers=headers, timeout=10)
        if r.status_code == 200:
            # Try og:image first
            match = re.search(r'<meta property="og:image" content="(.*?)"', r.text)
            if match:
                return match.group(1)
            # Fallback to internal link
            match2 = re.search(r'href="//(upload\.wikimedia\.org/wikipedia/commons/[^"]+)" class="internal"', r.text)
            if match2:
                return f"https://{match2.group(1)}"
    except Exception as e:
        print(f"Error fetching Wiki URL for {filename}: {e}")
    return None

def download_image(url, save_path):
    """Downloads an image from a URL to a local path."""
    if os.path.exists(save_path):
        print(f"    Skipping (already exists): {save_path}")
        return True
        
    retries = 3
    for i in range(retries):
        try:
            headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            r = requests.get(url, headers=headers, stream=True, timeout=15)
            
            if r.status_code == 200:
                os.makedirs(os.path.dirname(save_path), exist_ok=True)
                with open(save_path, 'wb') as f:
                    for chunk in r.iter_content(1024):
                        f.write(chunk)
                time.sleep(1.5) # Be polite
                return True
            elif r.status_code == 429:
                wait_time = (i + 1) * 5
                print(f"    Rate limited (429). Waiting {wait_time}s...")
                time.sleep(wait_time)
            else:
                print(f"    Failed to download {url}: HTTP {r.status_code}")
                return False
        except Exception as e:
            print(f"    Error downloading {url}: {e}")
            time.sleep(2)
            
    return False

def process_city(city_name, js_filename):
    print(f"\nProcessing {city_name}...")
    js_path = os.path.join(JS_DIR, js_filename)
    
    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all POI objects
    # This regex matches the content between { and } for each item in the array
    # It assumes standard formatting as seen in the files
    poi_blocks = re.finditer(r'\{\s*"id":\s*"(?P<id>[^"]+)",.*?"photos":\s*\[\s*"(?P<url>[^"]+)"\s*\].*?\}', content, re.DOTALL)
    
    new_content = content
    
    for match in poi_blocks:
        poi_id = match.group("id")
        original_url = match.group("url")
        
        print(f"  Found POI: {poi_id}")
        
        # Skip if already local
        if not original_url.startswith("http"):
            print(f"    Skipping (already local): {original_url}")
            continue

        # Determine URL to download
        download_url = original_url
        if poi_id == "sensoji" and city_name == "tokyo":
            print("    Fixing broken Sensoji link...")
            fixed_url = get_wiki_image_url(SENSOJI_WIKI_FILE)
            if fixed_url:
                download_url = fixed_url
                print(f"    New URL: {download_url}")
            else:
                print("    Could not find replacement for Sensoji!")
                continue

        # Define local path
        # images/travel/tokyo/sensoji.jpg
        ext = ".jpg" # Default to jpg
        if ".png" in download_url.lower():
            ext = ".png"
        
        local_filename = f"{poi_id}{ext}"
        local_rel_path = f"images/travel/{city_name}/{local_filename}"
        local_abs_path = os.path.join(BASE_DIR, "images", "travel", city_name, local_filename)
        
        # Download
        if download_image(download_url, local_abs_path):
            print(f"    Downloaded to {local_rel_path}")
            
            # Update content in memory
            # We replace the EXACT original URL string with the new local relative path
            # Be careful to replace only the specific occurrence if possible, but URLs are likely unique enough
            # However, to be safe, we can replace the whole block or just the URL
            
            # Since we are iterating matches, the original_url is what we found.
            # We need to be careful if multiple POIs share the same URL (which they shouldn't, but might)
            # If they share, replacing all occurrences is fine as they will all point to the same local file (if we named it generically)
            # BUT we named the file based on POI ID.
            # If multiple POIs use the same URL, we might download it multiple times to different IDs.
            # That's acceptable for "having the data".
            
            # Issue: If we just replace `original_url` globally, we might affect other POIs using the same URL.
            # But `replace` on string does that.
            # Let's check if we have duplicates.
            # Actually, for this task, if two POIs use the same image, it's better they have their own local copy 
            # OR we accept they point to the same file.
            # But my naming convention is `poi_id.jpg`.
            # So if I replace the URL, I should replace it ONLY for this POI.
            
            # Robust replacement:
            # Construct the exact string to replace: "photos": [ "URL" ]
            # This is safer.
            target_str = f'"{original_url}"'
            replacement_str = f'"../../{local_rel_path}"' # JS files are in js/travel, images are in images/travel. 
            # Wait, path relative to index.html?
            # The JS loads the data, but the `img src` is resolved relative to the HTML file (index.html) usually.
            # `index.html` is in `f:\genmini\japness\변환\fam`.
            # `images` is in `f:\genmini\japness\변환\fam\images`.
            # So the path should be `images/travel/city/file.jpg`.
            
            replacement_str = f'"{local_rel_path}"'
            
            # We need to replace only the instance for this ID.
            # But `content.replace` replaces all.
            # Let's do a localized replace using the match span?
            # No, because `new_content` changes size.
            
            # Alternative: Just replace the URL. If duplicates exist, the first one processed wins the URL replacement?
            # No, if I replace `http://.../A.jpg` with `images/tokyo/A.jpg`, 
            # and another POI uses `http://.../A.jpg`, it will now point to `images/tokyo/A.jpg`.
            # This is actually fine! It just means the second POI will use the first POI's image file.
            # But wait, I want `images/tokyo/B.jpg` for the second POI.
            # If I replace globally, I lose the chance to give B its own file.
            # However, looking at the data, most URLs are unique or generic placeholders.
            # The user wants "project data".
            # I will stick to global replacement for simplicity, assuming unique URLs or acceptable sharing.
            # BUT, to be safer, I will use the `id` in the regex to ensure I'm replacing the right block?
            # No, that's complex with string manipulation.
            
            # Let's trust that URLs are mostly unique or it doesn't matter if they share.
            # EXCEPT for the Sensoji fix.
            
            if poi_id == "sensoji" and city_name == "tokyo":
                 # Special handling because the URL in file is broken and might not match what we want to replace if we used the NEW url to download
                 # We need to replace the BROKEN url.
                 target_str = f'"{original_url}"'
            
            new_content = new_content.replace(target_str, replacement_str)
            
        else:
            print(f"    FAILED to download!")

    # Write back
    with open(js_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {js_filename}")

def main():
    process_city("tokyo", "tokyo.js")
    process_city("osaka", "osaka.js")
    process_city("fukuoka", "fukuoka.js")

if __name__ == "__main__":
    main()
