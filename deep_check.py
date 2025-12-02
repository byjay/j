#!/usr/bin/env python3
"""
실제 일본어 문장 기준으로 모든 중복 찾기
"""
import json

with open(r'f:\genmini\japness\변환\JAP_BONG\js\conversation.js', 'r', encoding='utf-8') as f:
    content = f.read()

start = content.find('const conversationModuleData = ') + len('const conversationModuleData = ')
end = content.find(';\n\nlet currentConversationCategory')
data_str = content[start:end].strip()
data = json.loads(data_str)

print("🔍 일본어 문장 기준 전체 중복 검사\n")

# 모든 일본어 문장 수집
all_sentences = []
for cat_key, cat_data in data.items():
    for conv in cat_data.get('conversations', []):
        jp = conv['question']['jp']
        all_sentences.append((cat_key, jp))

# 중복 찾기
from collections import Counter
counter = Counter([s[1] for s in all_sentences])

duplicates = {jp: count for jp, count in counter.items() if count > 1}

if duplicates:
    print(f"❌ {len(duplicates)}개의 중복 문장 발견!\n")
    print(f"{'일본어 문장':<50} {'출현횟수':<10}")
    print("=" * 65)
    for jp, count in sorted(duplicates.items(), key=lambda x: -x[1])[:20]:
        print(f"{jp[:47]:<50} {count:<10}")
else:
    print("✅ 중복 없음!")

print(f"\n총 문장 수: {len(all_sentences)}")
print(f"유니크 문장 수: {len(counter)}")
