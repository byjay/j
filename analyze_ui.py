
import re
import os

def parse_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex patterns
    # Capture (indentation), (tag), (attributes), (content) roughly
    # This is a simple line-based scanner for well-formatted HTML like this project looks like.
    
    elements = []
    
    # We'll just look for lines with id or onclick for simplicity and context using line numbers
    lines = content.split('\n')
    
    for i, line in enumerate(lines):
        line = line.strip()
        if not line: continue
        
        # Check for ID
        id_match = re.search(r'id=["\']([^"\']+)["\']', line)
        click_match = re.search(r'onclick=["\']([^"\']+)["\']', line)
        
        if id_match or click_match:
            el_type = "Element"
            if "<button" in line: el_type = "Button"
            elif "<div" in line: el_type = "Div"
            elif "<input" in line: el_type = "Input"
            elif "<a" in line: el_type = "Link"
            
            # clean tags
            clean_line = re.sub(r'<[^>]+>', '', line).strip()[:50]
            
            elements.append({
                'line': i + 1,
                'type': el_type,
                'id': id_match.group(1) if id_match else None,
                'onclick': click_match.group(1) if click_match else None,
                'text': clean_line
            })
            
    return elements

def generate_map(elements):
    markdown = "# JAP-BONG App Interaction Map\n\n"
    markdown += "| Line | Type | ID | Interaction (onclick) | Visual Text/Context |\n"
    markdown += "|------|------|----|-----------------------|---------------------|\n"
    
    for el in elements:
        eid = f"`{el['id']}`" if el['id'] else "-"
        eclick = f"`{el['onclick']}`" if el['onclick'] else "-"
        etext = el['text'] if el['text'] else "(Icon/Image)"
        
        markdown += f"| {el['line']} | {el['type']} | {eid} | {eclick} | {etext} |\n"
        
    return markdown

target = r'F:\genmini\japness\변환\fam\index.html'
if os.path.exists(target):
    els = parse_html(target)
    report = generate_map(els)
    
    with open(r'C:\Users\FREE\.gemini\antigravity\brain\9714cde9-3336-40a1-bec6-0c0163482e9d\test_map.md', 'w', encoding='utf-8') as f:
        f.write(report)
    print("Map generated at test_map.md")
else:
    print("File not found")
