import os
import time
import subprocess
import re
from datetime import datetime

# ==========================================
# 설정 (Configuration)
# ==========================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
WATCH_DIRS = [os.path.join(BASE_DIR, "js"), os.path.join(BASE_DIR, "css"), BASE_DIR]
WATCH_EXTS = [".js", ".css", ".html"]
INDEX_FILE = os.path.join(BASE_DIR, "index.html")
INTEGRITY_SCRIPT = os.path.join(BASE_DIR, "verify_project_integrity.py")
CLEANUP_AUDIT_SCRIPT = os.path.join(BASE_DIR, "project_cleanup_audit.py")
CLEANUP_EXEC_SCRIPT = os.path.join(BASE_DIR, "clean_files.py")
POLL_INTERVAL = 2

print("👀 [Auto-Deploy] Started watching for file changes...")
print(f"   Targets: {WATCH_DIRS}")

def get_last_modified_time():
    """감시 대상 파일들 중 가장 최근 수정 시간을 반환"""
    max_mtime = 0
    changed_file = ""
    for directory in WATCH_DIRS:
        if not os.path.exists(directory):
            continue
        for root, _, files in os.walk(directory):
            if any(part.startswith('.') or part == 'trash_bin' for part in root.split(os.sep)):
                continue

            for file in files:
                if any(file.endswith(ext) for ext in WATCH_EXTS):
                    path = os.path.join(root, file)
                    try:
                        mtime = os.path.getmtime(path)
                        if mtime > max_mtime:
                            max_mtime = mtime
                            changed_file = path
                    except OSError:
                        continue
    return max_mtime, changed_file

def perform_deep_cleanup():
    """청소 스크립트 실행 (Audit -> Clean)"""
    print("\n🧹 [Deep Cleanup] Starting powerful cleanup...")
    try:
        # 1. Audit 실행하여 clean_files.py 생성
        print("   Running cleanup audit...")
        subprocess.run([os.sys.executable, CLEANUP_AUDIT_SCRIPT], check=True, capture_output=True)
        
        # 2. Cleanup 실행
        if os.path.exists(CLEANUP_EXEC_SCRIPT):
            print("   Executing file cleanup...")
            subprocess.run([os.sys.executable, CLEANUP_EXEC_SCRIPT], check=True, capture_output=True)
            print("   ✨ Cleanup complete.")
    except Exception as e:
        print(f"   ⚠️ Cleanup warning: {e}")

def update_version_in_html(version_tag):
    """index.html의 APP_VERSION과 스크립트 쿼리를 업데이트"""
    if not os.path.exists(INDEX_FILE):
        return False
    try:
        with open(INDEX_FILE, 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. APP_VERSION 상수 업데이트
        new_content = re.sub(
            r"const APP_VERSION = ['\"].*?['\"]",
            f"const APP_VERSION = '{version_tag}';",
            content
        )

        # 2. Footer Version 업데이트
        new_content = re.sub(
            r"VER: .*? \(",
            f"VER: {version_tag} (",
            new_content
        )

        # 3. Script/CSS Query Params 업데이트 (?v=...)
        new_content = re.sub(
            r"(\.(js|css)\?v=)[a-zA-Z0-9_.-]+",
            f"\g<1>{version_tag}",
            new_content
        )

        # 4. Service Worker Registration Version
        new_content = re.sub(
            r"navigator.serviceWorker.register\('\./sw.js\?v=.*?'\)",
            f"navigator.serviceWorker.register('./sw.js?v={version_tag}')",
            new_content
        )

        if content != new_content:
            with open(INDEX_FILE, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
        return False
    except Exception as e:
        print(f"❌ Failed to update HTML: {e}")
        return False

def run_integrity_check():
    """무결성 검사 스크립트 실행"""
    print("   Running integrity check...")
    try:
        result = subprocess.run([os.sys.executable, INTEGRITY_SCRIPT], check=True, capture_output=True, text=True)
        print("   ✅ Integrity Check Passed.")
        return True
    except subprocess.CalledProcessError as e:
        print("\n" + "="*40)
        print("   ❌ INTEGRITY CHECK FAILED! Deployment Aborted.")
        print(e.stdout)
        print("="*40 + "\n")
        return False

def git_push(version_tag, changed_file):
    """Git commit & push"""
    print(f"   🚀 Pushing to Git ({version_tag})...")
    try:
        subprocess.run(["git", "add", "."], check=True)
        msg = f"auto-deploy: clean update {os.path.basename(changed_file)} to {version_tag}"
        subprocess.run(["git", "commit", "-m", msg], check=True)
        subprocess.run(["git", "push", "origin", "main"], check=True)
        print("   🎉 Deployment Complete!")
    except subprocess.CalledProcessError as e:
        print(f"   ❌ Git Push Failed: {e}")

def main():
    last_mtime, _ = get_last_modified_time()

    # 실행 시 최초 1회 강력 청소
    perform_deep_cleanup()

    while True:
        try:
            time.sleep(POLL_INTERVAL)
            current_mtime, changed_file = get_last_modified_time()

            if current_mtime > last_mtime:
                print(f"\n⚡ Change detected in: {changed_file}")

                # 1. 강력 청소 (변경 감지 시마다 수행)
                perform_deep_cleanup()

                # 2. 무결성 검사
                if not run_integrity_check():
                    last_mtime = current_mtime
                    continue

                # 3. 버전 생성
                timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                version_tag = f"1.0.{timestamp}"

                # 4. HTML 업데이트
                updated = update_version_in_html(version_tag)

                if updated:
                    print(f"   Updated version to {version_tag}")
                    git_push(version_tag, changed_file)
                else:
                    # HTML 업데이트가 없더라도 코드가 바뀌었으면 푸시
                    git_push(version_tag, changed_file)

                # 자신이 수정한 파일의 mtime을 반영
                last_mtime, _ = get_last_modified_time()

        except KeyboardInterrupt:
            print("\n👋 Auto-Deploy stopped.")
            break
        except Exception as e:
            print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()