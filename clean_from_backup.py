#!/usr/bin/env python3
"""
원본 백업에서 완전히 새로 중복 제거
"""
import json
from pathlib import Path

# 원본 백업 파일 사용
backup_file = Path(r'f:\genmini\japness\변환\JAP_BONG\js\conversation.js.backup')
output_file = Path(r'f:\genmini\japness\변환\JAP_BONG\js\conversation_NEW_CLEAN.js')

print(f"📖 원본 백업 파일 읽기...")
print(f"   파일: {backup_file}")
print(f"   크기: {backup_file.stat().st_size:,} bytes")

with open(backup_file, 'r', encoding='utf-8') as f:
    content = f.read()

# conversationModuleData 추출
start_marker = 'const conversationModuleData = '
end_marker = ';\n\nlet currentConversationCategory'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print("❌ 데이터 추출 실패")
    exit(1)

data_str = content[start_idx + len(start_marker):end_idx].strip()
styles_part = content[:start_idx]
functions_part = content[end_idx:]

# JSON 파싱
data = json.loads(data_str)

print(f"✅ 데이터 로드 완료")
print(f"   카테고리: {len(data)}개\n")

# 중복 제거
print("🔍 중복 제거 시작...\n")
print(f"{'카테고리':<20} {'원본':<10} {'유니크':<10} {'제거':<10}")
print("=" * 55)

total_before = 0
total_after = 0

for cat_key, cat_data in data.items():
    convs = cat_data.get('conversations', [])
    before_count = len(convs)
    total_before += before_count
    
    # 일본어 문장으로 중복 제거
    seen = {}
    unique_convs = []
    
    for conv in convs:
        jp = conv['question']['jp']
        if jp not in seen:
            seen[jp] = True
            unique_convs.append(conv)
    
    cat_data['conversations'] = unique_convs
    after_count = len(unique_convs)
    total_after += after_count
    removed = before_count - after_count
    
    print(f"{cat_key:<20} {before_count:<10} {after_count:<10} {removed:<10}")

print("=" * 55)
print(f"{'합계':<20} {total_before:<10} {total_after:<10} {total_before - total_after:<10}")

#보존 제거된 데이터 저장
cleaned_data_str = json.dumps(data, ensure_ascii=False, indent=4)
final_content = styles_part + 'const conversationModuleData = ' + cleaned_data_str + functions_part

with open(output_file, 'w', encoding='utf-8') as f:
    f.write(final_content)

print(f"\n✅ 저장 완료: {output_file.name}")
print(f"   원본: {backup_file.stat().st_size:,} bytes")
print(f"   정리후: {output_file.stat().st_size:,} bytes")
print(f"   감소: {((backup_file.stat().st_size - output_file.stat().st_size) / backup_file.stat().st_size * 100):.1f}%")
