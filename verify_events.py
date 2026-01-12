import re
import os

def get_defined_functions(js_dir, html_file):
    functions = set()
    
    # 1. HTML 내 인라인 스크립트 파싱
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
        matches = re.findall(r'function\s+([a-zA-Z0-9_]+)\s*\(', content)
        functions.update(matches)
        # window.func = ... 패턴
        matches = re.findall(r'window\.([a-zA-Z0-9_]+)\s*=', content)
        functions.update(matches)

    # 2. JS 파일 파싱
    for root, _, files in os.walk(js_dir):
        for file in files:
            if not file.endswith('.js'): continue
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                # function foo()
                matches = re.findall(r'function\s+([a-zA-Z0-9_]+)\s*\(', content)
                functions.update(matches)
                # window.foo =
                matches = re.findall(r'window\.([a-zA-Z0-9_]+)\s*=', content)
                functions.update(matches)
                # const foo = () =>
                matches = re.findall(r'(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[a-zA-Z0-9_]+)\s*=>', content)
                functions.update(matches)
    
    return functions

def check_html_onclicks(html_file, defined_funcs):
    missing = []
    with open(html_file, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f):
            match = re.search(r'onclick=["\']([a-zA-Z0-9_]+)\(', line)
            if match:
                func_name = match.group(1)
                if func_name not in defined_funcs:
                    # 예외: alert, console 등 내장 함수
                    if func_name in ['alert', 'console', 'location', 'window', 'history']: continue
                    missing.append((i + 1, func_name, line.strip()))
    return missing

if __name__ == "__main__":
    print("Scanning for defined functions...")
    funcs = get_defined_functions('js', 'index.html')
    print(f"Found {len(funcs)} functions.")
    
    print("Checking onclick handlers in index.html...")
    missing_handlers = check_html_onclicks('index.html', funcs)
    
    if missing_handlers:
        print("❌ CRITICAL: Undefined functions called in HTML!")
        for line_num, func, code in missing_handlers:
            print(f"  Line {line_num}: {func}() - Function NOT FOUND")
    else:
        print("✅ ALL onclick handlers are valid. (Static Check Passed)")
