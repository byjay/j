import os
import re
import requests

def verify_images(directory):
    print(f"Scanning directory: {directory}")
    broken_links = []
    
    for root, dirs, files in os.walk(directory):
        # Skip backup directories
        if "backup" in root or "old" in root:
            continue
            
        for file in files:
            if file.endswith(".js") and file in ["fukuoka.js", "tokyo.js", "osaka.js"]:
                file_path = os.path.join(root, file)
                print(f"Checking {file}...")
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Extract photos array content
                # Matches: "photos": [ ... ] or photos: [ ... ] (handling multi-line)
                matches = re.findall(r"['\"]?photos['\"]?:\s*\[(.*?)\]", content, re.DOTALL)
                
                count = 0
                for match in matches:
                    # Extract individual URLs from the array content
                    # Matches strings inside quotes
                    urls = re.findall(r"['\"](https?://[^'\"]+)['\"]", match)
                    for url in urls:
                        count += 1
                        # print(f"  Checking: {url}")
                        try:
                            # Use a proper user agent to avoid 403s from some servers (like Wikimedia)
                            headers = {'User-Agent': 'Mozilla/5.0'}
                            response = requests.head(url, headers=headers, timeout=5)
                            if response.status_code != 200:
                                # Try GET if HEAD fails
                                response = requests.get(url, headers=headers, timeout=5, stream=True)
                                response.close()
                            
                            if response.status_code != 200:
                                print(f"  [BROKEN] {response.status_code} - {url}")
                                broken_links.append((file, url, response.status_code))
                            else:
                                # print(f"  [OK] {url}")
                                pass
                        except Exception as e:
                            print(f"  [ERROR] {e} - {url}")
                            broken_links.append((file, url, str(e)))
                print(f"  Found {count} images.")

    print("\nSummary:")
    if broken_links:
        print(f"Found {len(broken_links)} broken links.")
        for file, url, status in broken_links:
            print(f"{file}: {status} - {url}")
    else:
        print("All image links are valid!")

if __name__ == "__main__":
    verify_images(r"f:\genmini\japness\변환\fam\js\travel")
