import os
import json
import re
import ast

def extract_js_object(js_path, var_name, output_path):
    """
    JS ????癒??餓λ ?    肉 Python 餓λ嚥?癰?     JSON ?嚥??怨?몃??
    """
    if not os.path.exists(js_path):
        print(f"Error: {js_path} not found.")
        return

    with open(js_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # ?癒??鈺곕 ?? (const, let, var ???
    pattern = rf"(?:const|let|var)\s+{var_name}\s*=\s*\{{"
    match = re.search(pattern, content)

    if not match:
        print(f"Error: Variable {var_name} not found.")
        return

    start_index = match.start() + content[match.start():].find('{')

    # 餓λ??筌꿸以 揶밴 ??筌≪
    brace_count = 0
    end_index = -1
    for i in range(start_index, len(content)):
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                end_index = i + 1
                break

    if end_index == -1:
        print("Error: Could not find closing brace.")
        return

    js_obj_str = content[start_index:end_index]

    # ?袁⑹? 雅깃 ?援

    js_obj_str = re.sub(r'//.*', '', js_obj_str)
    js_obj_str = re.sub(r'/\*[\s\S]*?\*/', '', js_obj_str)

    try:
        # JS ?諭??揶れ Python??筌苡 癰野?
        py_str = js_obj_str.replace("true", "True").replace("false", "False").replace("null", "None")

        # ?怨???용 ?쇰 ?怨??븐疫?(?類???揶苑)
        # { key: ?癒 , key: ?쉘 筌쇰Ф
        py_str = re.sub(r'([{,]\s*)([a-zA-Z_]\w*)(\s*:)', r'\1"\2"\3', py_str)

        # AST???                    肉 ??                              苡 ????類ㅻ嚥?癰??
        data = ast.literal_eval(py_str)

        # JSON ???
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"??Successfully migrated to {output_path}")

    except Exception as e:
        print(f"??Failed to parse {var_name}. Error: {e}")
        # ?쎈 ??브쑴苑???袁る 곕뗄㎬????
        raw_path = output_path + ".raw_extract"
        with open(raw_path, 'w', encoding='utf-8') as f:
            f.write(js_obj_str)
        print(f"   Raw extract saved to {raw_path} for inspection.")

if __name__ == "__main__":
    # ?怨? 野以 ?
    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

    extract_js_object(
        os.path.join(BASE_DIR, 'js', 'learning', 'conversation.js'),
        'conversationModuleData',
        os.path.join(BASE_DIR, 'backend', 'data', 'conversations.json')
    )
    extract_js_object(
        os.path.join(BASE_DIR, 'js', 'learning', 'word_study.js'),
        'wordData',
        os.path.join(BASE_DIR, 'backend', 'data', 'words.json')
    )