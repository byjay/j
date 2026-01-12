import os
import subprocess
import re
from datetime import datetime

# Configuration
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INDEX_FILE = os.path.join(BASE_DIR, "index.html")
INTEGRITY_SCRIPT = os.path.join(BASE_DIR, "verify_project_integrity.py")

def run_integrity_check():
    print("🔍 Running integrity check...")
    try:
        subprocess.run([os.sys.executable, INTEGRITY_SCRIPT], check=True, capture_output=True, text=True)
        print("✅ Integrity Check Passed.")
        return True
    except subprocess.CalledProcessError as e:
        print("❌ INTEGRITY CHECK FAILED!")
        print(e.stdout)
        print(e.stderr)
        return False

def update_version():
    print("⏰ Updating timestamp/version in index.html...")
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    version_tag = f"1.0.{timestamp}"
    
    if not os.path.exists(INDEX_FILE):
        print(f"❌ {INDEX_FILE} not found.")
        return None

    with open(INDEX_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Update APP_VERSION
    new_content = re.sub(
        r"const APP_VERSION = ['\"].*?['\"]",
        f"const APP_VERSION = '{version_tag}'",
        content
    )
    
    # 2. Update Footer Version
    new_content = re.sub(
        r"VER: .*? \(",
        f"VER: {version_tag} (",
        new_content
    )

    # 3. Update Query Params for cache busting
    new_content = re.sub(
        r"(\.(js|css)\?v=)[a-zA-Z0-9_.-]+",
        f"\g<1>{timestamp}",  # Use simpler timestamp for params
        new_content
    )

    # 4. Service Worker
    new_content = re.sub(
        r"\./sw\.js\?v=[^\'\"]*",
        f"./sw.js?v={timestamp}",
        new_content
    )

    with open(INDEX_FILE, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    # 5. Update sw.js APP_VERSION to force strict cache refresh
    SW_FILE = os.path.join(BASE_DIR, "sw.js")
    if os.path.exists(SW_FILE):
        print("🔄 Updating sw.js version...")
        with open(SW_FILE, 'r', encoding='utf-8') as f:
            sw_content = f.read()
        
        # Replace const APP_VERSION = '...';
        # Pattern handles: const APP_VERSION = '...' or "..."
        new_sw_content = re.sub(
            r"const APP_VERSION = ['\"].*?['\"];",
            f"const APP_VERSION = '{version_tag}';",
            sw_content
        )
        
        with open(SW_FILE, 'w', encoding='utf-8') as f:
            f.write(new_sw_content)
    else:
        print("⚠️ sw.js not found, skipping version update.")
    
    print(f"✅ Version updated to {version_tag}")
    return version_tag

def git_deploy(version_tag):
    print("🚀 Pushing to Git...")
    try:
        subprocess.run(["git", "add", "."], check=True)
        msg = f"deploy: manual trigger {version_tag}"
        subprocess.run(["git", "commit", "-m", msg], check=True)
        subprocess.run(["git", "push", "origin", "main"], check=True)
        print("🎉 Deployment to origin/main successful!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Git Push Failed: {e}")

if __name__ == "__main__":
    if run_integrity_check():
        ver = update_version()
        if ver:
            git_deploy(ver)
