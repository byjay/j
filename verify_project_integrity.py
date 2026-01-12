import os
import re
import sys

# 설정
ROOT_DIR = r"F:\genmini\japness\JAP_BONG_fam"
INDEX_FILE = os.path.join(ROOT_DIR, "index.html")

def get_all_js_functions(root_dir):
    """모든 JS 파일을 스캔하여 정의된 함수(function abc(), window.abc =, const abc =) 이름을 추출"""
    definitions = set()
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith(".js"):
                path = os.path.join(root, file)
                try:
                    with open(path, "r", encoding="utf-8", errors="ignore") as f:
                        content = f.read()
                        # 1. function name()
                        matches = re.findall(r'function\s+([a-zA-Z0-9_]+)\s*\(', content)
                        definitions.update(matches)
                        # 2. window.name =
                        matches = re.findall(r'window\.([a-zA-Z0-9_]+)\s*=', content)
                        definitions.update(matches)
                        # 3. const name = () =>
                        matches = re.findall(r'(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>', content)
                        definitions.update(matches)
                        # 4. class methods (simple heuristic)
                        matches = re.findall(r'^\s*([a-zA-Z0-9_]+)\s*\(', content, re.MULTILINE)
                        # definitions.update(matches) # 클래스 메소드는 전역이 아니므로 제외 (위험)
                except Exception as e:
                    print(f"⚠️ Error reading {file}: {e}")
    # Built-ins additions
    definitions.update(['alert', 'confirm', 'prompt', 'console.log', 'location.reload', 'history.back', 'history.pushState'])
    return definitions

def check_file_existence(index_path, root_dir):
    """HTML 내 src, href 링크가 실제 파일로 존재하는지 확인"""
    missing_files = []
    try:
        with open(index_path, "r", encoding="utf-8") as f:
            content = f.read()
            
            # Extract src=""" and href="""
            # Ignore absolute URLs (http, //)
            links = re.findall(r'(?:src|href)=["\']([^"\'#]+)["\']', content)
            
            for link in links:
                if link.startswith("http") or link.startswith("//") or link.startswith("data:"):
                    continue
                
                # Ignore JS template literals
                if "${" in link:
                    continue

                # Remove query params (?v=...)
                clean_link = link.split('?')[0]
                
                # Construct local path
                # Assuming index.html is at ROOT_DIR
                full_path = os.path.normpath(os.path.join(root_dir, clean_link))
                
                if not os.path.exists(full_path):
                    missing_files.append(clean_link)
    except Exception as e:
        print(f"❌ Error parsing index.html: {e}")
        return []
        
    return missing_files

def check_event_handlers(index_path, defined_funcs):
    """HTML 내 onclick 핸들러가 defined_funcs에 존재하는지 확인"""
    undefined_calls = []
    try:
        with open(index_path, "r", encoding="utf-8") as f:
            lines = f.readlines()
            for i, line in enumerate(lines):
                # pattern: onclick="funcName(..." (simple check)
                matches = re.findall(r'onclick=["\']([a-zA-Z0-9_]+)\(', line)
                for func_name in matches:
                    if func_name == 'if': continue # simple inline if check exclusion
                    if func_name not in defined_funcs:
                        undefined_calls.append((i + 1, func_name, line.strip()))
    except Exception as e:
        return []
    return undefined_calls

def main():
    print("[Integrity] Starting Comprehensive Integrity Check...\n")
    
    # 1. File Existence Check
    print("Checking Referenced Files...")
    missing = check_file_existence(INDEX_FILE, ROOT_DIR)
    if missing:
        print(f"[FAIL] MISSING FILES FOUND ({len(missing)}):")
        for m in missing:
            print(f"  - {m}")
    else:
        print("[PASS] All referenced local files exist.")
        
    print("-" * 30)

    # 2. Event Handler Check
    print("Checking JS Event Handlers...")
    defined_funcs = get_all_js_functions(ROOT_DIR)
    print(f"  (Found {len(defined_funcs)} defined JS functions/variables)")
    
    undefined = check_event_handlers(INDEX_FILE, defined_funcs)
    if undefined:
        print(f"[FAIL] UNDEFINED FUNCTIONS CALLED ({len(undefined)}):")
        for line_num, func, context in undefined:
            print(f"  Line {line_num}: {func}() NOT FOUND")
            # print(f"    Code: {context[:50]}...")
    else:
        print("[PASS] All onclick handlers map to existing functions.")
        
    print("-" * 30)
    
    # Final Verdict
    if not missing and not undefined:
        print("[SUCCESS] INTEGRITY CHECK PASSED: The project is structurally sound locally.")
        sys.exit(0)
    else:
        print("[CRITICAL] INTEGRITY CHECK FAILED: Please fix the issues above.")
        sys.exit(1)

if __name__ == "__main__":
    main()