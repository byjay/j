
import os
import time
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, WebDriverException

# Configuration
DRIVER_PATH = './chromedriver.exe'  # Path to your ChromeDriver or geckodriver.exe
                                    # Make sure it's in the same directory as this script
                                    # or in your system's PATH.
MAX_IMAGES_PER_POI = 4
SCROLL_PAUSE_TIME = 1.0

def setup_driver():
    """Sets up the Selenium WebDriver."""
    try:
        options = webdriver.ChromeOptions()
        # options.add_argument('--headless')  # Run Chrome in headless mode (no UI) - can cause issues with some sites
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument(f"user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
        
        # Suppress "DevTools listening on ws://..." messages
        options.add_experimental_option('excludeSwitches', ['enable-logging'])
        
        service = webdriver.chrome.service.Service(DRIVER_PATH)
        driver = webdriver.Chrome(service=service, options=options)
        return driver
    except WebDriverException as e:
        print(f"WebDriver setup failed. Please ensure '{DRIVER_PATH}' is correct and compatible with your Chrome browser version.")
        print(f"Error: {e}")
        return None

def get_image_urls_google(driver, query):
    """
    Searches Google Images and extracts image URLs.
    """
    search_url = f"https://www.google.com/search?tbm=isch&q={query}"
    driver.get(search_url)

    image_urls = []
    
    # Scroll down to load more images
    last_height = driver.execute_script("return document.body.scrollHeight")
    while len(image_urls) < MAX_IMAGES_PER_POI * 5: # Scroll enough to get more than needed
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(SCROLL_PAUSE_TIME)
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height

    try:
        # Wait for image elements to be present
        WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, 'img.Q4LuWd')) # This selector might change!
        )
        
        img_elements = driver.find_elements(By.CSS_SELECTOR, 'img.Q4LuWd')

        for img in img_elements:
            if img.get_attribute('src') and not img.get_attribute('src').startswith('data:image'):
                image_urls.append(img.get_attribute('src'))
            if len(image_urls) >= MAX_IMAGES_PER_POI:
                break
    except TimeoutException:
        print(f"Timed out waiting for images to load for query: {query}")
    except Exception as e:
        print(f"An error occurred while extracting image URLs: {e}")
        
    return image_urls

def download_image(url, save_path):
    """Downloads a single image from a URL."""
    try:
        response = requests.get(url, stream=True, timeout=10)
        response.raise_for_status()
        with open(save_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        return True
    except requests.exceptions.RequestException as e:
        print(f"Error downloading {url}: {e}")
        return False

def download_images_for_poi(city, poi_id, poi_name, driver):
    """
    Downloads images for a given POI and saves them to the correct directory.
    """
    # Create the directory if it doesn't exist
    base_dir = os.path.dirname(os.path.abspath(__file__))
    save_dir = os.path.join(base_dir, '..', 'images', 'travel', city)
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)

    # Get image URLs - adding "no face" and "architecture" or "landscape" to query to minimize faces
    # Adjust query dynamically based on POI type (e.g., 'food' POIs might not need 'architecture')
    if "공항" in poi_name or "역" in poi_name or "타워" in poi_name or "빌딩" in poi_name or "성" in poi_name or "다리" in poi_name:
        query_terms = f"{poi_name} {city} architecture exterior no face"
    elif "공원" in poi_name or "해변" in poi_name or "호수" in poi_name or "대나무숲" in poi_name or "폭포" in poi_name or "신사" in poi_name or "정원" in poi_name or "테라스" in poi_name or "수족관" in poi_name:
        query_terms = f"{poi_name} {city} landscape scenery no face"
    elif "시장" in poi_name or "거리" in poi_name or "상점가" in poi_name:
        query_terms = f"{poi_name} {city} street view no face"
    elif "미술관" in poi_name or "박물관" in poi_name or "테마파크" in poi_name:
        query_terms = f"{poi_name} {city} interior exterior no face"
    elif "라멘" in poi_name or "모츠나베" in poi_name or "우동" in poi_name or "스테이크" in poi_name or "요리" in poi_name or "모찌" in poi_name or "규탄" in poi_name or "히츠마부시" in poi_name:
        query_terms = f"{poi_name} {city} food dish no face"
    elif "호텔" in poi_name:
        query_terms = f"{poi_name} {city} hotel exterior interior no face"
    else:
        query_terms = f"{poi_name} {city} travel no face"
        
    print(f"Searching for images for: {query_terms}")
    image_urls = get_image_urls_google(driver, query_terms)

    if not image_urls:
        print(f"No usable image URLs found for '{query_terms}'. Skipping download for {city}/{poi_id}.")
        return

    # Download images
    downloaded_count = 0
    for i, url in enumerate(image_urls):
        if downloaded_count >= MAX_IMAGES_PER_POI:
            break
        
        # Simple heuristic to avoid very small thumbnails or non-image files from generic search
        if not url.endswith(('.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp')) or 'encrypted-tbn0.gstatic.com' in url:
            print(f"Skipping potentially low-quality or non-image URL: {url}")
            continue

        file_path = os.path.join(save_dir, f"{poi_id}_{downloaded_count+1}.jpg")
        if download_image(url, file_path):
            print(f"Successfully downloaded {file_path}")
            downloaded_count += 1
        else:
            print(f"Failed to download image from {url}")

    if downloaded_count == 0:
        print(f"Could not download any suitable images for {city}/{poi_id} after searching for '{query_terms}'.")
    elif downloaded_count < MAX_IMAGES_PER_POI:
        print(f"Warning: Only {downloaded_count} out of {MAX_IMAGES_PER_POI} images downloaded for {city}/{poi_id}.")

if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python google_image_downloader.py <city> <poi_id> <poi_name>")
        sys.exit(1)

    city = sys.argv[1]
    poi_id = sys.argv[2]
    poi_name = sys.argv[3]

    driver_instance = setup_driver()
    if driver_instance:
        download_images_for_poi(city, poi_id, poi_name, driver_instance)
        driver_instance.quit()
    else:
        print("Failed to initialize WebDriver. Image download aborted.")
