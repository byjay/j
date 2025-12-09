import json
import os
from pathlib import Path

# JSON 파일 로드
json_path = Path(r"f:\genmini\japness\변환\fam\Fukuoka_Travel_Plan.json")
with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

pois = data.get('data', [])
print(f"총 POI 개수: {len(pois)}")

# 카테고리 분포 확인
categories = {}
for poi in pois:
    cat = poi.get('category', 'Unknown')
    categories[cat] = categories.get(cat, 0) + 1

print("\n카테고리 분포:")
for cat, count in sorted(categories.items()):
    print(f"  {cat}: {count}개")

# 이미지 폴더 경로 (images 폴더에 이미지가 있다고 가정)
IMAGE_BASE_URL = "images/fukuoka/"

# JS 형식으로 변환
def convert_to_js_poi(poi):
    # 카테고리 매핑
    cat = poi.get('category', '')
    if 'Sightseeing' in cat:
        poi_type = 'spot'
    elif 'Shopping' in cat:
        poi_type = 'shop'
    elif 'Ramen' in cat or 'Restaurant' in cat or 'Food' in cat or 'Cafe' in cat:
        poi_type = 'food'
    else:
        poi_type = 'spot'
    
    # 지역 추출 (location에서)
    location = poi.get('location', '')
    if 'Hakata' in location:
        region = 'hakata'
    elif 'Tenjin' in location or 'Chuo' in location:
        region = 'tenjin'
    elif 'Nakasu' in location:
        region = 'nakasu'
    else:
        region = 'hakata'
    
    # ID 생성 (name_en을 기반)
    name_en = poi.get('name_en', '')
    poi_id = name_en.lower().replace(' ', '_').replace("'", '').replace('-', '_')
    
    # 이미지 경로
    image_file = poi.get('imageFileName', '')
    if image_file:
        photo_url = f"{IMAGE_BASE_URL}{image_file}"
    else:
        photo_url = poi.get('photoSearchLink', '')
    
    result = {
        'id': poi_id,
        'name': poi.get('name_ko', poi.get('name_en', '')),
        'name_en': name_en,
        'lat': 33.5902,  # 기본 좌표 (후쿠오카 중심)
        'lng': 130.4017,
        'type': poi_type,
        'region': region,
        'rating': float(poi.get('rating', 4.0)),
        'desc': poi.get('summary_ko', ''),
        'photos': [photo_url] if photo_url else [],
        'details': {
            'address': poi.get('location', ''),
            'hours': poi.get('operatingHours', ''),
            'ticket': poi.get('ticketInfo', ''),
            'menu': poi.get('menuInfo', ''),
            'tips': poi.get('travelTips', ''),
            'mapLink': poi.get('mapLink', '')
        }
    }
    return result

# 변환 실행
js_pois = [convert_to_js_poi(poi) for poi in pois]

# JS 파일 출력
output_path = Path(r"f:\genmini\japness\변환\fam\js\travel\fukuoka_poi_data.js")
with open(output_path, 'w', encoding='utf-8') as f:
    f.write("// 자동 생성된 POI 데이터 - Fukuoka_Travel_Plan.json에서 변환\n")
    f.write(f"// 총 {len(js_pois)}개 POI\n\n")
    f.write("const POI_DATABASE = [\n")
    
    for i, poi in enumerate(js_pois):
        f.write("    {\n")
        f.write(f"        id: '{poi['id']}',\n")
        f.write(f"        name: '{poi['name']}',\n")
        f.write(f"        name_en: '{poi['name_en']}',\n")
        f.write(f"        lat: {poi['lat']},\n")
        f.write(f"        lng: {poi['lng']},\n")
        f.write(f"        type: '{poi['type']}',\n")
        f.write(f"        region: '{poi['region']}',\n")
        f.write(f"        rating: {poi['rating']},\n")
        
        # desc 이스케이프
        desc = poi['desc'].replace("'", "\\'").replace('\n', ' ')
        f.write(f"        desc: '{desc}',\n")
        
        # photos
        photos_str = ', '.join([f"'{p}'" for p in poi['photos']])
        f.write(f"        photos: [{photos_str}],\n")
        
        # details
        f.write("        details: {\n")
        for key, val in poi['details'].items():
            val_escaped = str(val).replace("'", "\\'").replace('\n', ' ')
            f.write(f"            {key}: '{val_escaped}',\n")
        f.write("        }\n")
        
        if i < len(js_pois) - 1:
            f.write("    },\n")
        else:
            f.write("    }\n")
    
    f.write("];\n\n")
    f.write("// 전역 노출\n")
    f.write("window.POI_DATABASE = POI_DATABASE;\n")

print(f"\n변환 완료: {output_path}")
print(f"총 {len(js_pois)}개 POI가 생성되었습니다.")
