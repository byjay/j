import re
import json
import os

def extract_js_object(file_path, var_name, output_path):
    print(f"Reading {file_path}...")
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: File not found {file_path}")
        return

    # Regex to find the variable definition
    # We look for "const varName = {" and assume valid JSON-like structure follows until the end of the object
    # Since these are huge objects, a simple regex for matching braces might be tricky with nested braces.
    # However, the structure seems clean.
    
    # Strategy: Find the start index, then count braces to find the end.
    start_marker = f"const {var_name} = {{"
    start_index = content.find(start_marker)
    
    if start_index == -1:
        # try let or var
        start_marker = f"let {var_name} = {{"
        start_index = content.find(start_marker)
        if start_index == -1:
            print(f"Error: Variable {var_name} not found.")
            return

    # Move index to the opening brace of the object
    start_index += len(start_marker) - 1 
    
    brace_count = 0
    end_index = -1
    
    for i in range(start_index, len(content)):
        char = content[i]
        if char == '{':
            brace_count += 1
        elif char == '}':
            brace_count -= 1
            if brace_count == 0:
                end_index = i + 1
                break
    
    if end_index == -1:
        print("Error: Could not find closing brace.")
        return

    json_str_content = content[start_index:end_index]
    
    # Initial cleanup to make it standard JSON
    # 1. Quote keys that aren't quoted. (Most seem quoted in conversation.js, verifying word_study.js)
    # 2. comments removal
    
    # Remove single line comments //
    json_str_content = re.sub(r'//.*', '', json_str_content)
    # Remove multi line comments /* */
    json_str_content = re.sub(r'/\*[\s\S]*?\*/', '', json_str_content)

    # Convert JS object key literals to quoted strings
    # Keys like:  title: '...'  ->  "title": '...'
    # BUT conversation.js keys are already quoted "family":
    # word_study.js keys: 'immigration': {  <- single quotes!
    # And properties: title: '...'
    
    # Replace single quotes with double quotes? risky if text contains single quotes.
    # But it is JS.
    
    try:
        # JS: true -> Python: True
        py_content = json_str_content.replace("true", "True").replace("false", "False").replace("null", "None")
        
        # KEY FIX: Quote unquoted keys
        # pattern: word followed by colon, not already quoted
        # We need to be careful not to match inside strings.
        # But for this simple file structure, a simple regex on the start of lines or simple properties usually works.
        # title: -> "title":
        # id: -> "id":
        
        # Regex: Find identifiers used as keys
        # (?<=\{)\s*([a-zA-Z_]\w*)\s*:  (matches { key:)
        # (?<=,)\s*([a-zA-Z_]\w*)\s*:   (matches , key:)
        
        # Simpler approach since the structure is remarkably consistent (one property per line mostly):
        # Match "key: value" where key is just alpha-num.
        
        py_content = re.sub(r'([a-zA-Z_]\w*)\s*:', r'"\1":', py_content)
        
        # Now handle the single quotes used as values or previously quoted keys
        # The regex above might double quote already quoted keys if not careful? 
        # No, "key": has a quote before it. [a-zA-Z_] won't match the quote.
        # But 'key': ? 
        # 'immigration':  <- valid string in python if key.
        
        import ast
        data = ast.literal_eval(py_content)
        
        # Save as JSON
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"Successfully saved to {output_path}")
        
    except Exception as e:
        print(f"Failed to parse via AST even after regex. Error: {e}")
        print("Saving raw extract for manual inspection...")
        with open(output_path + ".raw", 'w', encoding='utf-8') as f:
            f.write(json_str_content)

# Run extraction
extract_js_object('js/learning/conversation.js', 'conversationModuleData', 'backend/data/conversations.json')
extract_js_object('js/learning/word_study.js', 'wordData', 'backend/data/words.json')
