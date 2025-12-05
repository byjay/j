
import subprocess
import time
import requests
import os
import json
import sys

# Configuration
BACKEND_DIR = r"f:\genmini\japness\변환\fam\backend"
DATA_DIR = os.path.join(BACKEND_DIR, "data")
API_URL = "http://127.0.0.1:8000/api/learning/progress"

def run_test():
    print("🚀 Starting Backend for Testing...")
    
    # 1. Start Uvicorn Server in Background
    server_process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000"],
        cwd=BACKEND_DIR,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )
    
    try:
        print("⏳ Waiting for server to boot (5s)...")
        time.sleep(5)
        
        # 2. Simulate Frontend Data (Dad studying)
        users_to_test = [
            {"userId": "dad", "module": "conversation", "progress": 50},
            {"userId": "mom", "module": "words", "progress": 80},
            {"userId": "sieun", "module": "kanji", "progress": 30}
        ]

        for user_data in users_to_test:
            print(f"📤 Sending Test Data for: {user_data['userId']}")
            try:
                response = requests.post(API_URL, json=user_data, timeout=2)
                if response.status_code == 200:
                    print(f"✅ API Success for {user_data['userId']}")
                else:
                    print(f"❌ API Failed for {user_data['userId']}: {response.text}")
            except Exception as e:
                print(f"❌ Connection Error: {e}")

        # 3. Verify File Creation
        for user in ["dad", "mom", "sieun"]:
            target_file = os.path.join(DATA_DIR, f"user_{user}.json")
            if os.path.exists(target_file):
                print(f"✅ SUCCESS: File created: user_{user}.json")
                with open(target_file, 'r', encoding='utf-8') as f:
                    print(f"   📄 Content: {json.load(f)}")
            else:
                print(f"❌ FAILURE: File not found: user_{user}.json")

    finally:
        print("🛑 Stopping Server...")
        server_process.terminate()
        # Clean up
        if os.path.exists(os.path.join(DATA_DIR, "user_dad.json")):
            os.remove(os.path.join(DATA_DIR, "user_dad.json"))
            print("🧹 Cleanup: Removed test file.")

if __name__ == "__main__":
    # Ensure dependencies are installed (simple check)
    try:
        import fastapi
        import uvicorn
        import requests
    except ImportError:
        print("⚠️ Missing modules. Installing...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], cwd=BACKEND_DIR)
        
    run_test()
