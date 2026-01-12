import os
import shutil
import sys

# 🛠️ Antigravity Setup Installer
# This script installs the Real-time Claude Collaboration Suite into the current directory.

FILES_TO_CREATE = {
    "sync_claude.py": r'''import os
import time
import subprocess
from datetime import datetime

# 🎯 Configuration
WATCH_DIRS = [".", "js", "data", "src", "public"]
EXTENSIONS = {".js", ".py", ".html", ".css", ".json", ".ts", ".tsx"}
REVIEW_FILE = "claude_review.md"
DEBOUNCE_SECONDS = 2

# State
file_states = {}

def get_files_to_watch():
    files = []
    for d in WATCH_DIRS:
        if os.path.exists(d):
            if d == ".":
                for f in os.listdir(d):
                    if any(f.endswith(ext) for ext in EXTENSIONS):
                        files.append(f)
            else:
                for root, _, filenames in os.walk(d):
                    for f in filenames:
                        if any(f.endswith(ext) for ext in EXTENSIONS):
                            files.append(os.path.join(root, f))
    return files

def get_file_mtime(filepath):
    try:
        return os.stat(filepath).st_mtime
    except FileNotFoundError:
        return 0

def ask_claude(filepath):
    """Invokes the 'claude' CLI to review the file."""
    try:
        # Check if 'claude' command exists (mock check)
        # In real usage, this calls the actual CLI
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        prompt = f"Analyze this changed file ({filepath}) and provide brief, critical feedback or approved status:\n\n{content[:5000]}"
        
        # Call claude CLI
        result = subprocess.run(["claude", "-p", prompt], capture_output=True, text=True, encoding='utf-8', shell=True)
        return result.stdout.strip() if result.stdout else (result.stderr.strip() if result.stderr else "No output from Claude CLI")
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

    print("🚀 Ready! Edit any file to trigger Claude.")

    while True:
        current_files = get_files_to_watch()
        
        for f in current_files:
            mtime = get_file_mtime(f)
            
            # New or Modified
            if f not in file_states or mtime > file_states[f]:
                time.sleep(1) # Debounce
                
                print(f"\n🔄 detected change in: {f}")
                review = ask_claude(f)
                update_review_file(f, review)
                
                file_states[f] = mtime
                
        time.sleep(DEBOUNCE_SECONDS)

if __name__ == "__main__":
    main()
''',
    "start_collaboration.bat": r'''@echo off
echo ===========================================
echo 🚀 Antigravity Real-Time Collaboration
echo ===========================================
echo 1. Watching files for changes...
echo 2. Syncing with Claude CLI...
echo 3. Logging reviews to claude_review.md...
echo ===========================================
python sync_claude.py
pause
'''
}

def install():
    print("📦 Installing Antigravity Tools...")
    
    for filename, content in FILES_TO_CREATE.items():
        if not os.path.exists(filename):
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"   ✅ Created {filename}")
        else:
            print(f"   ⚠️  Skipped {filename} (Already exists)")
            
    # Initialize review file
    if not os.path.exists("claude_review.md"):
        with open("claude_review.md", "w", encoding='utf-8') as f:
            f.write("# 🤖 Claude Collaboration Log\n\n> System initialized.\n")
        print("   ✅ Created claude_review.md")

    print("\n🎉 Installation Complete!")
    print("run 'start_collaboration.bat' to begin.")

if __name__ == "__main__":
    install()
