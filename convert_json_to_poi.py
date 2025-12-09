"""
Fukuoka_Travel_Plan.json → fukuoka_poi_data.js 변환 스크립트
JSON의 모든 상세정보를 포함, Wikimedia Commons 공개 이미지 사용
"""

import json
import re

# 특정 장소별 Wikimedia Commons 이미지 URL (공개 도메인/CC 라이선스)
SPECIFIC_PLACE_IMAGES = {
    'fukuoka tower': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Fukuoka_Tower.JPG/800px-Fukuoka_Tower.JPG',
    'canal city hakata': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Canal_city_hakata_fukuoka3.jpg/800px-Canal_city_hakata_fukuoka3.jpg',
    'kushida shrine': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Kushida_hakata01.jpg/800px-Kushida_hakata01.jpg',
    'ohori park': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Ohori_Koen.jpg/800px-Ohori_Koen.jpg',
    'dazaifu tenmangu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Dazaifu_Tenman-gu_%E5%A4%AA%E5%AE%B0%E5%BA%9C%E5%A4%A9%E6%BB%A1%E5%AE%AE_-_panoramio.jpg/800px-Dazaifu_Tenman-gu_%E5%A4%AA%E5%AE%B0%E5%BA%9C%E5%A4%A9%E6%BB%A1%E5%AE%AE_-_panoramio.jpg',
    'hakata station': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Hakata_Station_Building.jpg/800px-Hakata_Station_Building.jpg',
    'nakasu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Nakasu_Yatai.jpg/800px-Nakasu_Yatai.jpg',
    'tochoji temple': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Tochoji_Fukuoka.jpg/800px-Tochoji_Fukuoka.jpg',
    'momochi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Momochi_beach_from_the_sea.jpg/800px-Momochi_beach_from_the_sea.jpg',
    'yufuin': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/YufuinKinrinko.JPG/800px-YufuinKinrinko.JPG',
    'beppu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Beppu_Umi_Jigoku01n4272.jpg/800px-Beppu_Umi_Jigoku01n4272.jpg',
}

# 카테고리별 기본 Unsplash 이미지 URL
CATEGORY_IMAGES = {
    'Restaurants': [
        'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800',  # 라멘
        'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',  # 일본 음식
        'https://images.unsplash.com/photo-1547928576-b822bc410b52?w=800',  # 고기
    ],
    'Shopping': [
        'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    ],
    'Sightseeing': [
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
        'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
        'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800',
    ],
    'Temple': [
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800',
        'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800',
    ]
}

def get_category_type(category):
    """카테고리를 POI type으로 변환"""
    cat_lower = category.lower()
    if 'restaurant' in cat_lower or '맛집' in cat_lower:
        return 'food'
    elif 'shopping' in cat_lower or '쇼핑' in cat_lower:
        return 'shopping'
    elif 'sightseeing' in cat_lower or '관광' in cat_lower:
        return 'spot'
    else:
        return 'spot'

def get_unsplash_images(category, name_en, index):
    """카테고리와 이름에 맞는 이미지 URL 반환 - Wikimedia 우선"""
    name_lower = name_en.lower()
    
    # 1. 특정 장소 Wikimedia 이미지 우선 사용
    for key, url in SPECIFIC_PLACE_IMAGES.items():
        if key in name_lower:
            return [url, CATEGORY_IMAGES['Sightseeing'][0]]
    
    # 2. 특수 키워드별 이미지
    if 'shrine' in name_lower or 'temple' in name_lower or '신사' in name_lower:
        return CATEGORY_IMAGES['Temple']
    elif 'ramen' in name_lower or 'noodle' in name_lower:
        return CATEGORY_IMAGES['Restaurants'][:2]
    elif 'tower' in name_lower:
        return ['https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800', 
                'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800']
    elif 'park' in name_lower or 'garden' in name_lower:
        return ['https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
                'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800']
    elif 'beach' in name_lower or 'seaside' in name_lower:
        return ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
                'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800']
    elif 'airport' in name_lower:
        return ['https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
                'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800']
    elif 'hotel' in name_lower:
        return ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800']
    elif 'yakiniku' in name_lower or 'beef' in name_lower or 'meat' in name_lower:
        return ['https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
                'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800']
    elif 'yatai' in name_lower:
        return ['https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800',
                'https://images.unsplash.com/photo-1580442151529-343f2f6e0e27?w=800']
    
    # 일반 카테고리별 이미지
    cat_key = None
    for key in CATEGORY_IMAGES:
        if key.lower() in category.lower():
            cat_key = key
            break
    
    if cat_key:
        images = CATEGORY_IMAGES[cat_key]
        # 인덱스를 사용해 다른 이미지 선택
        start = index % len(images)
        return [images[start], images[(start + 1) % len(images)]]
    
    return CATEGORY_IMAGES['Sightseeing'][:2]

def make_id(name_en):
    """영문 이름을 ID로 변환"""
    return re.sub(r'[^a-z0-9]+', '_', name_en.lower()).strip('_')

def convert_json_to_poi():
    # JSON 파일 읽기
    with open('Fukuoka_Travel_Plan (1).json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    poi_list = []
    
    for idx, item in enumerate(data['data']):
        poi = {
            'id': make_id(item['name_en']),
            'name': item['name_ko'],
            'name_en': item['name_en'],
            'lat': 33.5902 + (idx % 10) * 0.005,  # 기본 좌표 (실제 좌표 없음)
            'lng': 130.4017 + (idx % 10) * 0.005,
            'type': get_category_type(item['category']),
            'region': 'fukuoka',
            'rating': float(item['rating']) if item['rating'] else 4.0,
            'desc': item['summary_ko'],
            'photos': get_unsplash_images(item['category'], item['name_en'], idx),
            'details': {
                'address': item.get('location', ''),
                'hours': item.get('operatingHours', ''),
                'ticket': item.get('ticketInfo', ''),
                'menu': item.get('menuInfo', ''),
                'tips': item.get('travelTips', ''),
                'essentials': item.get('essentialItems', ''),
                'mapLink': item.get('mapLink', ''),
                'photoLink': item.get('photoSearchLink', '')
            }
        }
        poi_list.append(poi)
    
    # JavaScript 파일로 저장
    js_content = "// 자동 생성된 POI 데이터 - Fukuoka_Travel_Plan.json에서 변환\n"
    js_content += f"// 총 {len(poi_list)}개 POI - 모든 상세정보 포함\n\n"
    js_content += "window.POI_DATABASE = [\n"
    
    for poi in poi_list:
        js_content += "    {\n"
        js_content += f"        id: '{poi['id']}',\n"
        js_content += f"        name: '{poi['name']}',\n"
        js_content += f"        name_en: '{poi['name_en']}',\n"
        js_content += f"        lat: {poi['lat']},\n"
        js_content += f"        lng: {poi['lng']},\n"
        js_content += f"        type: '{poi['type']}',\n"
        js_content += f"        region: '{poi['region']}',\n"
        js_content += f"        rating: {poi['rating']},\n"
        # 설명에서 따옴표 이스케이프
        desc = poi['desc'].replace("'", "\\'").replace('"', '\\"')
        js_content += f"        desc: '{desc}',\n"
        js_content += f"        photos: {json.dumps(poi['photos'])},\n"
        js_content += "        details: {\n"
        for key, value in poi['details'].items():
            if value:
                val = str(value).replace("'", "\\'").replace('"', '\\"')
                js_content += f"            {key}: '{val}',\n"
        js_content += "        }\n"
        js_content += "    },\n"
    
    js_content += "];\n"
    
    with open('js/travel/fukuoka_poi_data.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print(f"변환 완료! 총 {len(poi_list)}개 POI 생성")
    
    # 카테고리별 통계
    categories = {}
    for poi in poi_list:
        cat = poi['type']
        categories[cat] = categories.get(cat, 0) + 1
    
    for cat, count in categories.items():
        print(f"  {cat}: {count}개")

if __name__ == '__main__':
    convert_json_to_poi()
