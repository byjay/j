import os
import sys
import requests
from bs4 import BeautifulSoup

def get_image_urls(query):
    """
    Searches for images on Unsplash and returns a list of image URLs.
    """
    url = f"https://unsplash.com/s/photos/{query}"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        # Unsplash images are typically within <img> tags with srcset or src attributes
        # and sometimes have specific classes. We'll look for common patterns.
        img_tags = soup.find_all('img', srcset=True)
        urls = []
        for img in img_tags:
            # Prioritize high-resolution images from srcset if available
            if img.get('srcset'):
                # Split srcset and take the first (usually highest res) URL
                src_url = img['srcset'].split(',')[0].strip().split(' ')[0]
                urls.append(src_url)
            elif img.get('src'):
                urls.append(img['src'])
        
        # Filter out very small placeholder images or data URIs if any
        urls = [u for u in urls if not u.startswith('data:image') and '1x1.png' not in u]
        
        # Limit to unique URLs
        urls = list(dict.fromkeys(urls))
        return urls
    except requests.exceptions.RequestException as e:
        print(f"Error fetching image URLs for {query} from Unsplash: {e}")
        return []

def download_images(city, poi_id, poi_name, num_images=4):
    """
    Downloads images for a given POI and saves them to the correct directory.
    """
    # Create the directory if it doesn't exist
    save_dir = os.path.join(os.path.dirname(__file__), '..', 'images', 'travel', city)
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)

    # Get image URLs - adding "no face" to query to minimize faces
    query = f"{poi_name} {city} travel no face"
    image_urls = get_image_urls(query)

    if not image_urls:
        print(f"No images found for '{query}'. Skipping download for {city}/{poi_id}.")
        return

    # Download images
    downloaded_count = 0
    for i, url in enumerate(image_urls):
        if downloaded_count >= num_images:
            break
        try:
            # Ensure the URL is absolute and valid
            if not url.startswith('http'):
                print(f"Skipping invalid URL: {url}")
                continue

            response = requests.get(url, stream=True)
            response.raise_for_status()
            file_path = os.path.join(save_dir, f"{poi_id}_{downloaded_count+1}.jpg")
            with open(file_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            print(f"Successfully downloaded {file_path}")
            downloaded_count += 1
        except requests.exceptions.RequestException as e:
            print(f"Error downloading {url}: {e}")
        except Exception as e:
            print(f"An unexpected error occurred while downloading {url}: {e}")

    if downloaded_count == 0:
        print(f"Could not download any images for {city}/{poi_id} after searching for '{query}'.")
    elif downloaded_count < num_images:
        print(f"Warning: Only {downloaded_count} out of {num_images} images downloaded for {city}/{poi_id}.")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python download_images.py <city> <poi_id> <poi_name>")
        sys.exit(1)

    city = sys.argv[1]
    poi_id = sys.argv[2]
    poi_name = sys.argv[3]

    download_images(city, poi_id, poi_name)