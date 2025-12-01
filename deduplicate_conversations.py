#!/usr/bin/env python3
"""
conversation.js 중복 제거 스크립트
- conversation.js 파일에서 conversationModuleData 객체를 파싱
- 각 카테고리별로 중복된 대화 항목 제거
- 정리된 파일을 다시 생성
"""

import re
import json
from pathlib import Path
from collections import OrderedDict

def extract_data_object(file_path):
    """conversation.js 파일에서 conversationModuleData 객체 추출"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # conversationModuleData 객체의 시작과 끝 찾기
    start_marker = 'const conversationModuleData = {'
    end_marker = ';\n\nlet currentConversationCategory'
    
    start_idx = content.find(start_marker)
    end_idx = content.find(end_marker)
    
    if start_idx == -1 or end_idx == -1:
        raise ValueError("conversationModuleData 객체를 찾을 수 없습니다")
    
    # 데이터 부분만 추출
    data_str = content[start_idx + len('const conversationModuleData = '):end_idx].strip()
    
    # 함수 부분 추출 (데이터 이후의 모든 코드)
    functions_part = content[end_idx:]
    
    # 스타일 부분 추출 (데이터 이전의 코드)
    styles_part = content[:start_idx]
    
    return data_str, styles_part, functions_part

def deduplicate_conversations(data):
    """각 카테고리의 대화 항목에서 중복 제거"""
    stats = {}
    
    for category_key, category_data in data.items():
        if 'conversations' not in category_data:
            continue
        
        conversations = category_data['conversations']
        original_count = len(conversations)
        
        # 중복 제거를 위한 세트 (일본어 문장을 키로 사용)
        seen = {}
        unique_conversations = []
        
        for conv in conversations:
            # question.jp를 고유 식별자로 사용
            jp_key = conv['question']['jp']
            
            if jp_key not in seen:
                seen[jp_key] = True
                unique_conversations.append(conv)
        
        # 중복 제거된 리스트로 교체
        category_data['conversations'] = unique_conversations
        
        removed_count = original_count - len(unique_conversations)
        stats[category_key] = {
            'original': original_count,
            'unique': len(unique_conversations),
            'removed': removed_count
        }
    
    return data, stats

def main():
    # 파일 경로
    input_file = Path(r'f:\genmini\japness\변환\JAP_BONG\js\conversation.js')
    output_file = Path(r'f:\genmini\japness\변환\JAP_BONG\js\conversation_cleaned.js')
    
    print(f"📖 파일 읽기: {input_file}")
    print(f"   파일 크기: {input_file.stat().st_size:,} bytes")
    
    # 1. 데이터 추출
    try:
        data_str, styles_part, functions_part = extract_data_object(input_file)
        print(f"✅ conversationModuleData 객체 추출 완료")
    except Exception as e:
        print(f"❌ 오류: {e}")
        return
    
    # 2. JSON 파싱
    try:
        # JavaScript 객체를 JSON으로 변환하기 위한 전처리
        # 작은따옴표를 큰따옴표로, trailing comma 제거 등
        data = json.loads(data_str)
        print(f"✅ JSON 파싱 완료")
        print(f"   카테고리 수: {len(data)}")
    except Exception as e:
        print(f"❌ JSON 파싱 실패: {e}")
        return
    
    # 3. 중복 제거
    print(f"\n🔍 중복 항목 제거 중...")
    cleaned_data, stats = deduplicate_conversations(data)
    
    # 4. 통계 출력
    print(f"\n📊 중복 제거 통계:")
    print(f"{'카테고리':<20} {'원본':<10} {'유니크':<10} {'제거됨':<10}")
    print("=" * 60)
    
    total_original = 0
    total_unique = 0
    total_removed = 0
    
    for category, stat in stats.items():
        print(f"{category:<20} {stat['original']:<10} {stat['unique']:<10} {stat['removed']:<10}")
        total_original += stat['original']
        total_unique += stat['unique']
        total_removed += stat['removed']
    
    print("=" * 60)
    print(f"{'합계':<20} {total_original:<10} {total_unique:<10} {total_removed:<10}")
    
    # 5. 파일 저장
    print(f"\n💾 정리된 파일 생성 중...")
    
    # JSON을 JavaScript 객체 문자열로 변환
    cleaned_data_str = json.dumps(cleaned_data, ensure_ascii=False, indent=4)
    
    # 최종 파일 내용 조합
    final_content = (
        styles_part +
        'const conversationModuleData = ' +
        cleaned_data_str +
        functions_part
    )
    
    # 파일 저장
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    output_size = output_file.stat().st_size
    original_size = input_file.stat().st_size
    reduction = ((original_size - output_size) / original_size) * 100
    
    print(f"✅ 저장 완료: {output_file}")
    print(f"   원본 크기: {original_size:,} bytes")
    print(f"   정리 후: {output_size:,} bytes")
    print(f"   감소율: {reduction:.1f}%")
    
    print(f"\n⚠️  백업 권장: 원본 파일을 백업한 후 정리된 파일로 교체하세요.")

if __name__ == '__main__':
    main()
