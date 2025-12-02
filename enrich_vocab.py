#!/usr/bin/env python3
"""
conversation의 vocab을 words_data.js 사전을 사용해 자동 확장
"""
import json
import re

print("📖 데이터 로딩 중...")

# 1. words_data.js에서 단어 사전 생성 (간단한 정규식 파싱)
with open(r'f:\genmini\japness\변환\JAP_BONG\js\words_data.js', 'r', encoding='utf-8') as f:
   words_content = f.read()

# 간단하게 japanese_word, reading, korean_meaning 패턴 매칭
pattern = r'japanese_word:\s*"([^"]+)",\s*reading:\s*"([^"]+)",.*?korean_meaning:\s*"([^"]+)"'
matches = re.findall(pattern, words_content, re.DOTALL)

word_dict = {}
for jp, reading, kr in matches:
    word_dict[jp] = {
        'word': jp,
        'read': reading,
        'mean': kr,
        'type': '핵심단어'
    }

print(f"✅ {len(word_dict)}개 단어 로드 완료\n")

# 2. conversation.js 로드
with open(r'f:\genmini\japness\변환\JAP_BONG\js\conversation.js', 'r', encoding='utf-8') as f:
    conv_content = f.read()

start = conv_content.find('const conversationModuleData = ') + len('const conversationModuleData = ')
end = conv_content.find(';\n\nlet currentConversationCategory')
data_str = conv_content[start:end].strip()
conv_data = json.loads(data_str)

styles_part = conv_content[:conv_content.find('const conversationModuleData = ')]
functions_part = conv_content[end:]

print("🔍 Vocab 확장 중...")

stats = {'total': 0, 'expanded': 0, 'added_words': 0}

# 3. 각 대화의 vocab 확장
for cat_key, cat_data in conv_data.items():
    for conv in cat_data.get('conversations', []):
        stats['total'] += 1
        jp_sentence = conv['question']['jp']
        original_vocab_count = len(conv['question']['vocab'])
        
        # 문장에서 사전에 있는 모든 단어 찾기
        found_words = []
        for word_jp, word_info in word_dict.items():
            if word_jp in jp_sentence:
                # 이미 vocab에 있는지 확인
                already_exists = any(v['word'] == word_jp for v in conv['question']['vocab'])
                if not already_exists:
                    found_words.append(word_info.copy())
        
        if found_words:
            # 기존 vocab에 추가
            conv['question']['vocab'].extend(found_words)
            stats['expanded'] += 1
            stats['added_words'] += len(found_words)

print(f"\n📊 결과:")
print(f"  총 대화: {stats['total']}개")
print(f"  vocab 확장된 대화: {stats['expanded']}개")
print(f"  추가된 단어: {stats['added_words']}개")

# 4. 파일 저장
print(f"\n💾 저장 중...")
cleaned_data_str = json.dumps(conv_data, ensure_ascii=False, indent=4)
final_content = styles_part + 'const conversationModuleData = ' + cleaned_data_str + functions_part

output_file = r'f:\genmini\japness\변환\JAP_BONG\js\conversation_ENRICHED.js'
with open(output_file, 'w', encoding='utf-8') as f:
    f.write(final_content)

print(f"✅ 저장 완료: conversation_ENRICHED.js")
print(f"\n⚠️  확인 후 conversation.js로 교체하세요")
