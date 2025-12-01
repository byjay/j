#!/usr/bin/env python3
"""
현재 conversation.js 파일의 중복 상태를 상세히 분석하는 스크립트
"""

import json
from pathlib import Path
from collections import defaultdict

def analyze_duplicates(file_path):
    """파일의 중복 상태를 분석"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # conversationModuleData 추출
    start_marker = 'const conversationModuleData = '
    end_marker = ';\n\nlet currentConversationCategory'
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx == -1 or end_idx == -1:
        print("❌ conversationModuleData를 찾을 수 없습니다")
        return
    
    data_str = content[start_idx + len(start_marker):end_idx].strip()
    data = json.loads(data_str)
    
    print(f"📊 파일 중복 분석 결과\n")
    print(f"총 카테고리 수: {len(data)}\n")
    
    # 각 카테고리별 중복 확인
    total_convs = 0
    total_duplicates = 0
    
    print(f"{'카테고리':<20} {'항목수':<10} {'유니크':<10} {'중복':<10} {'상태':<10}")
    print("=" * 70)
    
    for category_key, category_data in data.items():
        convs = category_data.get('conversations', [])
        total_convs += len(convs)
        
        # 일본어 문장으로 중복 검사
        seen = set()
        duplicates = []
        
        for i, conv in enumerate(convs):
            jp = conv['question']['jp']
            if jp in seen:
                duplicates.append((i, jp))
            else:
                seen.add(jp)
        
        unique_count = len(seen)
        dup_count = len(duplicates)
        total_duplicates += dup_count
        
        status = "✅ OK" if dup_count == 0 else f"⚠️ {dup_count}개"
        
        print(f"{category_key:<20} {len(convs):<10} {unique_count:<10} {dup_count:<10} {status:<10}")
        
        # 중복 항목 상세 표시 (처음 3개만)
        if duplicates and len(duplicates) > 0:
            print(f"  중복 예시:")
            for idx, (pos, jp_text) in enumerate(duplicates[:3]):
                print(f"    [{pos}] {jp_text[:40]}...")
            if len(duplicates) > 3:
                print(f"    ... 외 {len(duplicates) - 3}개 더")
    
    print("=" * 70)
    print(f"{'합계':<20} {total_convs:<10} {total_convs - total_duplicates:<10} {total_duplicates:<10}")
    print()
    
    if total_duplicates > 0:
        print(f"⚠️  여전히 {total_duplicates}개의 중복 항목이 발견되었습니다!")
        print(f"💡 deduplicate_conversations.py 스크립트를 다시 실행하세요.")
    else:
        print(f"✅ 중복 항목이 없습니다!")

if __name__ == '__main__':
    file_path = Path(r'f:\genmini\japness\변환\JAP_BONG\js\conversation.js')
    analyze_duplicates(file_path)
