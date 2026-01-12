"""
claude_review.md 파일 감시 스크립트
10분마다 파일 변경을 확인하고 새 내용이 있으면 알림

사용법: python watch_review.py
"""

import os
import time
from datetime import datetime

REVIEW_FILE = "claude_review.md"
CHECK_INTERVAL = 600  # 10분 (초)

def get_file_info():
    """파일 수정 시간과 크기 반환"""
    if os.path.exists(REVIEW_FILE):
        stat = os.stat(REVIEW_FILE)
        return stat.st_mtime, stat.st_size
    return None, 0

def get_last_review():
    """마지막 리뷰 섹션 추출"""
    if not os.path.exists(REVIEW_FILE):
        return None
    
    with open(REVIEW_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 마지막 "---" 이후 내용
    sections = content.split('---')
    if len(sections) > 1:
        return sections[-1].strip()
    return content

def main():
    print("=" * 50)
    print("🔍 Claude Review 감시 시작")
    print(f"📁 대상 파일: {REVIEW_FILE}")
    print(f"⏰ 체크 간격: {CHECK_INTERVAL // 60}분")
    print("=" * 50)
    print()
    
    last_mtime, last_size = get_file_info()
    
    while True:
        time.sleep(CHECK_INTERVAL)
        
        current_mtime, current_size = get_file_info()
        now = datetime.now().strftime("%H:%M:%S")
        
        if current_mtime != last_mtime:
            print()
            print("🔔" * 20)
            print(f"⚡ [{now}] 새 리뷰 감지!")
            print()
            
            # 최신 리뷰 출력
            latest = get_last_review()
            if latest:
                print("📝 최신 리뷰 내용:")
                print("-" * 40)
                print(latest[:500])  # 처음 500자만
                if len(latest) > 500:
                    print("... (더 있음)")
                print("-" * 40)
            
            print()
            print("💡 Anti-Gravity에게 'claude_review.md 분석해줘' 라고 요청하세요!")
            print("🔔" * 20)
            print()
            
            last_mtime = current_mtime
            last_size = current_size
        else:
            print(f"[{now}] 변경 없음 - 다음 체크: 10분 후")

if __name__ == "__main__":
    main()
