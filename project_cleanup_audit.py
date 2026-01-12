import os
import re
import datetime

# 설정
PROJECT_ROOT = "."
OUTPUT_REPORT = "cleanup_report.md"
OUTPUT_SCRIPT = "clean_files.py"

# 무시할 디렉토리 (검사 대상에서 제외하지 않음, 참조 검색에서만 제외하거나 로직 조정)
IGNORE_DIRS = {'.git', '.gemini', '__pycache__', 'node_modules', '.idea', '.vscode'}

# 삭제 후보 패턴 (파일명에 포함되면 의심)
SUSPICIOUS_NAMES = ['old', 'backup', 'temp', 'tmp', 'test_', 'copy', 'v1', 'v2', 'dummy']
# 제외할 확장자 (삭제하지 않을 파일)
SAFE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.mp3', '.wav', '.ico']

def get_all_files(root_dir):
    file_list = []
    for root, dirs, files in os.walk(root_dir):
        # 무시할 폴더 건너뛰기
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, root_dir).replace("\\", "/")
            file_list.append(rel_path)
    return file_list

def find_references(file_list, root_dir):
    # 파일 내용을 읽어서 다른 파일의 이름이 등장하는지 체크
    # 키: 파일 경로, 값: 참조 횟수
    ref_counts = {f: 0 for f in file_list}
    
    # 소스 코드 파일만 읽어서 검색 (이미지, 바이너리 제외)
    source_exts = {'.html', '.js', '.css', '.py', '.json', '.md'}
    
    for scanner_path in file_list:
        ext = os.path.splitext(scanner_path)[1].lower()
        if ext not in source_exts:
            continue
            
        try:
            with open(os.path.join(root_dir, scanner_path), 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                
            for target_file in file_list:
                if scanner_path == target_file: continue # 자기 자신 제외
                
                # 파일명만 추출 (예: "utils.js")
                basename = os.path.basename(target_file)
                # 경로 없는 파일명 검색 (단순 포함 여부)
                if basename in content:
                    ref_counts[target_file] += 1
                    
        except Exception as e:
            print(f"Error reading {scanner_path}: {e}")
            
    return ref_counts

def analyze_file_role(path):
    # 경로 기반 역할 추론
    if path.startswith("js/travel"): return "여행 관련 로직"
    if path.startswith("js/learning"): return "학습/교육 모듈"
    if path.startswith("js/games"): return "게임 로직"
    if path.startswith("js/shopping"): return "쇼핑 정보 로직"
    if path.startswith("backend"): return "백엔드/API 서버 코드"
    if path.startswith("data"): return "정적 데이터 (JSON)"
    if path.startswith("images"): return "이미지 자산"
    if path.startswith("css"): return "스타일시트"
    if path.startswith("elementary"): return "초등학교 모듈 (구조 개선 필요)"
    if "index.html" in path: return "메인 엔트리 포인트 (핵심)"
    if path.startswith("sw.js") or "service-worker" in path: return "PWA 서비스 워커"
    
    ext = os.path.splitext(path)[1]
    if ext == '.py': return "Python 스크립트/유틸리티"
    if ext == '.md': return "문서/가이드"
    
    return "기타/일반 파일"

def generate_report_and_script(file_list, ref_counts):
    report_lines = []
    report_lines.append("# 프로젝트 파일 구조 점검 및 정리 리포트")
    report_lines.append(f"**생성일:** {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
    
    report_lines.append("## 1. 정리 대상 후보 (삭제/이동 권장)")
    report_lines.append("| 상태 | 파일 경로 | 설명/이유 | 삭제 스크립트 포함 여부 |")
    report_lines.append("|---|---|---|---|")
    
    delete_commands = []
    move_commands = []
    
    # 1. 의심스러운 파일 (이름 기반) 또는 미사용 파일
    suspicious_files = []
    unused_code_files = []
    
    for f in file_list:
        is_suspicious = any(s in f.lower() for s in SUSPICIOUS_NAMES)
        is_unused = ref_counts[f] == 0
        file_role = analyze_file_role(f)
        ext = os.path.splitext(f)[1].lower()
        
        # 이미지나 비코드는 참조 0이어도 삭제 조심 (동적 로딩 가능성)
        is_safe_asset = ext in SAFE_EXTENSIONS or f.startswith("images")
        
        status = ""
        action = "-"
        
        if is_suspicious:
            status = "🔴 **삭제 권장**"
            reason = f"파일명 패턴 감지 ({[s for s in SUSPICIOUS_NAMES if s in f.lower()][0]})"
            delete_commands.append(f)
            action = "YES"
        elif is_unused and not is_safe_asset and ext in ['.js', '.css', '.html']:
            status = "🟡 **검토 필요**"
            reason = "코드 내 명시적 참조 없음 (동적 로딩 확인 필요)"
            # 바로 삭제하지 않고 old 폴더로 이동 제안
            move_commands.append(f)
            action = "Move to old/"
        else:
            continue
            
        report_lines.append(f"| {status} | `{f}` | {reason} | {action} |")

    report_lines.append("\n## 2. 전체 파일 구조 및 역할 정의")
    report_lines.append("| 경로 | 역할 | 참조 횟수 |")
    report_lines.append("|---|---|---|")
    
    # 폴더별 정렬
    sorted_files = sorted(file_list)
    for f in sorted_files:
        role = analyze_file_role(f)
        # 중요 파일 강조
        if "index.html" in f or "main.py" in f:
            role = f"**{role}**"
        
        count = ref_counts[f]
        count_str = str(count) if count > 0 else "<span style='color:red'>0</span>"
        report_lines.append(f"| `{f}` | {role} | {count_str} |")

    # 리포트 저장
    with open(OUTPUT_REPORT, 'w', encoding='utf-8') as f:
        f.write('\n'.join(report_lines))
        
    # 정리 스크립트 작성 (Python)
    script_content = """import os
import shutil

# 안전을 위해 trash/old 폴더로 이동
TRASH_DIR = "trash_bin"
if not os.path.exists(TRASH_DIR):
    os.makedirs(TRASH_DIR)

files_to_delete = [
"""
    for f in delete_commands:
        script_content += f"    '{f}',\n"
    
    script_content += """]

files_to_move = [
"""
    for f in move_commands:
        script_content += f"    '{f}',\n"

    script_content += """]

print(f"Moving {len(files_to_delete)} suspicious files to {TRASH_DIR}...")
for f in files_to_delete:
    if os.path.exists(f):
        try:
            # 경로 유지하며 이동
            dest = os.path.join(TRASH_DIR, f)
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            shutil.move(f, dest)
            print(f"[MOVED] {f} -> {dest}")
        except Exception as e:
            print(f"[ERROR] {f}: {e}")

print(f"Moving {len(files_to_move)} unused code files to {TRASH_DIR}/unused...")
for f in files_to_move:
    if os.path.exists(f):
        try:
            dest = os.path.join(TRASH_DIR, "unused", f)
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            shutil.move(f, dest)
            print(f"[MOVED] {f} -> {dest}")
        except Exception as e:
            print(f"[ERROR] {f}: {e}")
            
print("Cleanup complete. Please check 'trash_bin' folder before final deletion.")
"""
    with open(OUTPUT_SCRIPT, 'w', encoding='utf-8') as f:
        f.write(script_content)

    return len(delete_commands), len(move_commands)

if __name__ == "__main__":
    print("Scanning project structure...")
    files = get_all_files(PROJECT_ROOT)
    print(f"Found {len(files)} files.")
    
    print("Analyzing references (this may take a moment)...")
    refs = find_references(files, PROJECT_ROOT)
    
    del_count, move_count = generate_report_and_script(files, refs)
    print(f"Analysis complete.")
    print(f"- Report: {OUTPUT_REPORT}")
    print(f"- Cleanup Script: {OUTPUT_SCRIPT}")
    print(f"- Suspicious files: {del_count}")
    print(f"- Unused code candidates: {move_count}")
