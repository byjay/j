import os
import time
import subprocess
from datetime import datetime

# 🎯 Configuration
WATCH_DIRS = [".", "js", "js/travel", "data"]
EXTENSIONS = {".js", ".py", ".html", ".css", ".json"}
REVIEW_FILE = "claude_review.md"
DEBOUNCE_SECONDS = 2

# State
file_states = {}

def get_files_to_watch():
    files = []
    for d in WATCH_DIRS:
        if os.path.exists(d):
            for f in os.listdir(d):
                if any(f.endswith(ext) for ext in EXTENSIONS):
                    files.append(os.path.join(d, f))
    return files

def get_file_mtime(filepath):
    try:
        return os.stat(filepath).st_mtime
    except FileNotFoundError:
        return 0

def ask_claude(filepath):
    """Invokes the 'claude' CLI to review the file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        prompt = f"Analyze this changed file ({filepath}) and provide brief, critical feedback or approved status:\n\n{content[:5000]}" # Limit size
        
        # Call claude CLI
        result = subprocess.run(["claude", "-p", prompt], capture_output=True, text=True, encoding='utf-8')
        return result.stdout.strip()
    except Exception as e:
        return f"Error calling Claude: {e}"

def update_review_file(filepath, review_text):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    entry = f"\n\n---\n## ⚡ Update Detected: {filepath} ({timestamp})\n\n{review_text}\n"
    
    with open(REVIEW_FILE, 'a', encoding='utf-8') as f:
        f.write(entry)
    
    print(f"✅ Review added for {filepath}")

def main():
    print("👀 Active File Watcher & Claude Bridge Started...")
    print(f"📂 Watching: {WATCH_DIRS}")
    
    # Initialize state
    for f in get_files_to_watch():
        file_states[f] = get_file_mtime(f)

    while True:
        current_files = get_files_to_watch()
        
        for f in current_files:
            mtime = get_file_mtime(f)
            
            # New or Modified
            if f not in file_states or mtime > file_states[f]:
                # Debounce: wait to ensure write completes
                time.sleep(1) 
                
                print(f"\n🔄 detected change in: {f}")
                review = ask_claude(f)
                update_review_file(f, review)
                
                file_states[f] = mtime
                
        time.sleep(DEBOUNCE_SECONDS)

if __name__ == "__main__":
    main()
