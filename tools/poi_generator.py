
import json
import os

# ==============================================================================
#  🏙️ DEEP TRAVEL DATA REPOSITORY (11 CITIES)
# ==============================================================================
CITIES_DATA = {
    "fukuoka": {
        "spots": [
            # --- 교통 ---
            {"id": "fuk_airport", "name": "후쿠오카 공항 (FUK)", "lat": 33.5859, "lng": 130.4501, "type": "transport", "region": "airport", "rating": 4.6, "desc": "도심과 가장 가까운 공항.", "photos": ["https://images.unsplash.com/photo-1542349385-52e971371b13?w=800"], "details": {"info": "시내 접근성 최고.", "transport": "지하철 5분"}},
            {"id": "hakata_station", "name": "JR 하카타역", "lat": 33.5897, "lng": 130.4207, "type": "spot", "region": "hakata", "rating": 4.5, "desc": "규슈 여행의 시작점.", "photos": ["https://images.unsplash.com/photo-1575443207716-419b48997232?w=800"], "details": {"info": "쇼핑과 맛집의 중심.", "transport": "모든 열차의 허브"}},
            # --- 관광 ---
            {"id": "dazaifu", "name": "다자이푸 텐만구", "lat": 33.5215, "lng": 130.5349, "type": "spot", "region": "nearby", "rating": 4.6, "desc": "학문의 신과 매화가지떡.", "photos": ["https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?w=800"], "details": {"info": "소 동상 뿔 만지기.", "transport": "버스 투어 또는 전철"}},
            {"id": "yufuin", "name": "유후인 온천 마을", "lat": 33.2655, "lng": 131.3556, "type": "spot", "region": "nearby", "rating": 4.8, "desc": "동화 속 마을 같은 온천지.", "photos": ["https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800"], "details": {"info": "긴린코 호수 산책.", "transport": "버스 투어"}},
            {"id": "beppu", "name": "벳푸 가마솥 지옥", "lat": 33.3155, "lng": 131.4727, "type": "spot", "region": "nearby", "rating": 4.5, "desc": "지옥 온천 순례의 하이라이트.", "photos": ["https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800"], "details": {"info": "온천 달걀과 라무네.", "transport": "버스 투어"}},
            {"id": "momochi", "name": "모모치 해변", "lat": 33.5954, "lng": 130.3523, "type": "spot", "region": "seaside", "rating": 4.4, "desc": "이국적인 인공 해변.", "photos": ["https://images.unsplash.com/photo-1621847466023-40c354031175?w=800"], "details": {"info": "석양이 아름다움.", "transport": "버스"}},
            {"id": "fukuoka_tower", "name": "후쿠오카 타워", "lat": 33.5933, "lng": 130.3515, "type": "spot", "region": "seaside", "rating": 4.5, "desc": "후쿠오카의 랜드마크.", "photos": ["https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800"], "details": {"info": "야경 명소.", "transport": "버스"}},
            {"id": "canal_city", "name": "캐널시티 하카타", "lat": 33.5892, "lng": 130.4107, "type": "spot", "region": "hakata", "rating": 4.4, "desc": "분수쇼가 있는 쇼핑몰.", "photos": ["https://images.unsplash.com/photo-1565578768782-b78904df9764?w=800"], "details": {"info": "쇼핑과 엔터테인먼트.", "transport": "도보/버스"}},
            {"id": "nakasu_yatai", "name": "나카스 포장마차", "lat": 33.5924, "lng": 130.4037, "type": "food", "region": "hakata", "rating": 4.2, "desc": "강변의 낭만 포차.", "photos": ["https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?w=800"], "details": {"info": "라멘과 오뎅.", "transport": "도보"}},
            {"id": "ichiran_hq", "name": "이치란 본점", "lat": 33.5930, "lng": 130.4045, "type": "food", "region": "hakata", "rating": 4.6, "desc": "돈코츠 라멘의 성지.", "photos": ["https://images.unsplash.com/photo-1552611052-33e04de081de?w=800"], "details": {"info": "24시간 영업.", "transport": "도보"}},
             {"id": "donki_nakasu", "name": "돈키호테 나카스점", "lat": 33.5935, "lng": 130.4040, "type": "shop", "region": "hakata", "rating": 4.3, "desc": "24시간 쇼핑 천국.", "photos": ["https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800"], "details": {"info": "기념품 쇼핑.", "transport": "도보"}}
        ],
        "default_plan": {
            "1": ["fuk_airport", "hakata_station", "ichiran_hq", "canal_city", "nakasu_yatai"],
            "2": ["hakata_station", "dazaifu", "yufuin", "beppu", "hakata_station"], # Leica Bus Tour Route
            "3": ["momochi", "fukuoka_tower", "donki_nakasu"],
            "4": ["hakata_station", "fuk_airport"]
        }
    },
    "nagoya": {
        "spots": [
            {"id": "nagoya_castle", "name": "나고야 성", "lat": 35.1848, "lng": 136.9004, "type": "spot", "region": "central", "rating": 4.6, "desc": "황금 샤치호코의 위엄.", "photos": ["https://images.unsplash.com/photo-1624326887226-0e862363e00d?w=800"], "details": {"info": "혼마루어전 복원.", "transport": "지하철 시청역"}},
            {"id": "ghibli_park", "name": "지브리 파크", "lat": 35.1726, "lng": 137.0908, "type": "spot", "region": "suburb", "rating": 4.8, "desc": "지브리의 꿈이 현실로.", "photos": ["https://images.unsplash.com/photo-1516475429286-465d815a0df7?w=800"], "details": {"info": "예약 필수.", "transport": "리니모"}},
            {"id": "hitsumabushi", "name": "아츠타 호라이켄", "lat": 35.1225, "lng": 136.9066, "type": "food", "region": "central", "rating": 4.7, "desc": "장어덮밥의 원조.", "photos": ["https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800"], "details": {"info": "3가지 맛으로 즐기기.", "transport": "지하철 덴마초"}},
            {"id": "osu_kannon", "name": "오스 칸논 & 상점가", "lat": 35.1598, "lng": 136.9019, "type": "spot", "region": "central", "rating": 4.4, "desc": "활기찬 서민적인 상점가.", "photos": ["https://images.unsplash.com/photo-1580442151529-343f2f6e0e27?w=800"], "details": {"info": "빈티지샵과 길거리 음식.", "transport": "지하철 오스칸논"}},
            {"id": "mirai_tower", "name": "미라이 타워", "lat": 35.1723, "lng": 136.9083, "type": "spot", "region": "central", "rating": 4.5, "desc": "나고야의 에펠탑.", "photos": ["https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800"], "details": {"info": "야경 명소.", "transport": "지하철 사카에"}},
            {"id": "lego_land", "name": "레고랜드 재팬", "lat": 35.0507, "lng": 136.8430, "type": "spot", "region": "bay", "rating": 4.5, "desc": "아이들의 천국.", "photos": ["https://images.unsplash.com/photo-1560964645-c5d9454526d3?w=800"], "details": {"info": "가족 여행 추천.", "transport": "아오나미선"}}
        ],
        "default_plan": {
            "1": ["nagoya_castle", "mirai_tower", "hitsumabushi"],
            "2": ["ghibli_park"],
            "3": ["lego_land", "osu_kannon"],
            "4": ["nagoya_castle"] # Leaving Day 4 simple
        }
    },
    "yokohama": {
        "spots": [
            {"id": "minato_mirai", "name": "미나토 미라이 21", "lat": 35.4560, "lng": 139.6306, "type": "spot", "region": "bay", "rating": 4.7, "desc": "미래형 항구 도시.", "photos": ["https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800"], "details": {"info": "야경과 쇼핑.", "transport": "미나토미라이선"}},
            {"id": "chinatown", "name": "차이나타운", "lat": 35.4430, "lng": 139.6460, "type": "food", "region": "central", "rating": 4.4, "desc": "일본 최대 차이나타운.", "photos": ["https://images.unsplash.com/photo-1582234033096-7c06834b97d7?w=800"], "details": {"info": "길거리 음식 천국.", "transport": "미나토미라이선"}},
            {"id": "cupnoodle_museum", "name": "컵라면 박물관", "lat": 35.4554, "lng": 139.6389, "type": "spot", "region": "bay", "rating": 4.6, "desc": "나만의 컵라면 만들기.", "photos": ["https://images.unsplash.com/photo-1624326887226-0e862363e00d?w=800"], "details": {"info": "체험형 박물관.", "transport": "도보"}},
            {"id": "yamashita_park", "name": "야마시타 공원", "lat": 35.4459, "lng": 139.6496, "type": "spot", "region": "bay", "rating": 4.6, "desc": "바다를 보며 산책하기 좋은 공원.", "photos": ["https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800"], "details": {"info": "장미 정원이 유명.", "transport": "도보"}},
            {"id": "red_brick", "name": "아카렌가 창고", "lat": 35.4526, "lng": 139.6429, "type": "spot", "region": "bay", "rating": 4.5, "desc": "붉은 벽돌의 감성 쇼핑몰.", "photos": ["https://images.unsplash.com/photo-1572569878853-4632c0215850?w=800"], "details": {"info": "이벤트가 자주 열림.", "transport": "도보"}}
        ],
        "default_plan": {
            "1": ["minato_mirai", "cupnoodle_museum", "red_brick"],
            "2": ["yamashita_park", "chinatown"],
            "3": ["minato_mirai"],
            "4": ["chinatown"]
        }
    },
    "kobe": {
        "spots": [
            {"id": "harborland", "name": "고베 하버랜드", "lat": 34.6795, "lng": 135.1840, "type": "spot", "region": "bay", "rating": 4.6, "desc": "고베의 낭만 야경.", "photos": ["https://images.unsplash.com/photo-1572569878853-4632c0215850?w=800"], "details": {"info": "포트타워 뷰.", "transport": "JR 고베역"}},
            {"id": "kitano_ijinkan", "name": "키타노 이진칸", "lat": 34.7024, "lng": 135.1907, "type": "spot", "region": "hill", "rating": 4.3, "desc": "이국적인 서양식 저택 거리.", "photos": ["https://images.unsplash.com/photo-1582234033096-7c06834b97d7?w=800"], "details": {"info": "사진 명소.", "transport": "산노미야역"}},
            {"id": "arima_onsen", "name": "아리마 온천", "lat": 34.7969, "lng": 135.2478, "type": "spot", "region": "suburb", "rating": 4.7, "desc": "일본 3대 고탕.", "photos": ["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"], "details": {"info": "금탕과 은탕.", "transport": "버스/전철"}},
            {"id": "kobe_beef", "name": "고베규 스테이크", "lat": 34.6925, "lng": 135.1956, "type": "food", "region": "central", "rating": 4.8, "desc": "입에서 녹는 최고급 소고기.", "photos": ["https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800"], "details": {"info": "런치 세트 추천.", "transport": "산노미야역"}},
            {"id": "nunobiki", "name": "누노비키 허브원", "lat": 34.7167, "lng": 135.1925, "type": "spot", "region": "mountain", "rating": 4.6, "desc": "로프웨이 타고 가는 허브 정원.", "photos": ["https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800"], "details": {"info": "고베 시내 전망.", "transport": "신고베역"}}
        ],
        "default_plan": {
            "1": ["kitano_ijinkan", "kobe_beef", "nunobiki"],
            "2": ["arima_onsen"],
            "3": ["harborland"],
            "4": ["kobe_beef"]
        }
    },
    "nara": {
        "spots": [
            {"id": "nara_park", "name": "나라 공원", "lat": 34.6850, "lng": 135.8430, "type": "spot", "region": "central", "rating": 4.8, "desc": "사슴들의 천국.", "photos": ["https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800"], "details": {"info": "사슴 센베이 주기.", "transport": "긴테츠 나라역"}},
            {"id": "todaiji", "name": "도다이지", "lat": 34.6890, "lng": 135.8398, "type": "spot", "region": "central", "rating": 4.7, "desc": "압도적인 대불.", "photos": ["https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=800"], "details": {"info": "세계 최대 목조 건물.", "transport": "도보"}},
            {"id": "kasuga_taisha", "name": "카스가 타이샤", "lat": 34.6813, "lng": 135.8484, "type": "spot", "region": "central", "rating": 4.6, "desc": "수천 개의 석등이 있는 신사.", "photos": ["https://images.unsplash.com/photo-1599940824399-b87987ce0799?w=800"], "details": {"info": "신비로운 분위기.", "transport": "도보"}},
            {"id": "mochi", "name": "나카타니도 모찌", "lat": 34.6820, "lng": 135.8280, "type": "food", "region": "central", "rating": 4.5, "desc": "고속 떡치기 퍼포먼스.", "photos": ["https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800"], "details": {"info": "쑥떡 맛집.", "transport": "도보"}},
            {"id": "higashimuki", "name": "히가시무키 상점가", "lat": 34.6830, "lng": 135.8285, "type": "shop", "region": "central", "rating": 4.3, "desc": "나라의 중심 상점가.", "photos": ["https://images.unsplash.com/photo-1580442151529-343f2f6e0e27?w=800"], "details": {"info": "기념품과 맛집.", "transport": "긴테츠 나라역"}}
        ],
        "default_plan": {
            "1": ["nara_park", "todaiji", "mochi"],
            "2": ["kasuga_taisha", "higashimuki"],
            "3": ["nara_park"],
            "4": ["higashimuki"]
        }
    },
    "hiroshima": {
        "spots": [
            {"id": "peace_memorial", "name": "평화 기념 공원", "lat": 34.3929, "lng": 132.4526, "type": "spot", "region": "central", "rating": 4.8, "desc": "평화의 소중함.", "photos": ["https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800"], "details": {"info": "원폭 돔.", "transport": "노면전차"}},
            {"id": "miyajima", "name": "미야지마", "lat": 34.2960, "lng": 132.3198, "type": "spot", "region": "island", "rating": 4.9, "desc": "바다 위의 붉은 토리이.", "photos": ["https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=800"], "details": {"info": "일본 3대 절경.", "transport": "페리"}},
            {"id": "okonomiyaki", "name": "오코노미무라", "lat": 34.3915, "lng": 132.4615, "type": "food", "region": "central", "rating": 4.5, "desc": "히로시마풍 오코노미야키.", "photos": ["https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=800"], "details": {"info": "면이 들어간 스타일.", "transport": "도보"}},
            {"id": "shukkeien", "name": "슈케이엔", "lat": 34.4005, "lng": 132.4677, "type": "spot", "region": "central", "rating": 4.4, "desc": "아름다운 일본 정원.", "photos": ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"], "details": {"info": "도심 속 힐링.", "transport": "도보"}},
            {"id": "hondori", "name": "혼도리 상점가", "lat": 34.3935, "lng": 132.4580, "type": "shop", "region": "central", "rating": 4.3, "desc": "최대 번화가.", "photos": ["https://images.unsplash.com/photo-1588821949320-e222f771746c?w=800"], "details": {"info": "쇼핑과 식사.", "transport": "도보"}}
        ],
        "default_plan": {
            "1": ["peace_memorial", "okonomiyaki", "hondori"],
            "2": ["miyajima"],
            "3": ["shukkeien"],
            "4": ["hondori"]
        }
    },
    "hakone": {
        "spots": [
            {"id": "open_air_museum", "name": "조각의 숲 미술관", "lat": 35.2447, "lng": 139.0516, "type": "spot", "region": "mountain", "rating": 4.6, "desc": "자연과 예술의 조화.", "photos": ["https://images.unsplash.com/photo-1576788235839-55668b577366?w=800"], "details": {"info": "야외 조각 공원.", "transport": "등산철도"}},
            {"id": "owakudani", "name": "오와쿠다니", "lat": 35.2425, "lng": 139.0194, "type": "spot", "region": "mountain", "rating": 4.5, "desc": "살아있는 화산.", "photos": ["https://images.unsplash.com/photo-1599354607478-6f363c473167?w=800"], "details": {"info": "검은 달걀.", "transport": "로프웨이"}},
            {"id": "lake_ashi", "name": "아시노코 호수", "lat": 35.2055, "lng": 139.0070, "type": "spot", "region": "nature", "rating": 4.6, "desc": "후지산이 보이는 호수.", "photos": ["https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800"], "details": {"info": "해적선 유람선.", "transport": "버스/로프웨이"}},
            {"id": "hakone_shrine", "name": "하코네 신사", "lat": 35.2048, "lng": 139.0255, "type": "spot", "region": "nature", "rating": 4.5, "desc": "호수 위의 평화의 토리이.", "photos": ["https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=800"], "details": {"info": "인생샷 명소.", "transport": "도보"}},
            {"id": "yunessun", "name": "유넷상", "lat": 35.2385, "lng": 139.0450, "type": "spot", "region": "mountain", "rating": 4.4, "desc": "와인탕, 커피탕 테마파크.", "photos": ["https://images.unsplash.com/photo-1566982829230-a6e790949321?w=800"], "details": {"info": "수영복 입고 즐기는 온천.", "transport": "버스"}}
        ],
        "default_plan": {
            "1": ["hakone_shrine", "lake_ashi"],
            "2": ["owakudani", "open_air_museum"],
            "3": ["yunessun"],
            "4": ["open_air_museum"]
        }
    },
    "kanazawa": {
        "spots": [
            {"id": "kenrokuen", "name": "겐로쿠엔", "lat": 36.5621, "lng": 136.6627, "type": "spot", "region": "central", "rating": 4.7, "desc": "일본 3대 정원.", "photos": ["https://images.unsplash.com/photo-1572569878853-4632c0215850?w=800"], "details": {"info": "사계절 아름다운 정원.", "transport": "버스"}},
            {"id": "higashi_chaya", "name": "히가시 차야", "lat": 36.5724, "lng": 136.6664, "type": "spot", "region": "oldtown", "rating": 4.5, "desc": "전통 찻집 거리.", "photos": ["https://images.unsplash.com/photo-1582234033096-7c06834b97d7?w=800"], "details": {"info": "금박 아이스크림.", "transport": "버스"}},
            {"id": "21st_museum", "name": "21세기 미술관", "lat": 36.5609, "lng": 136.6582, "type": "spot", "region": "central", "rating": 4.6, "desc": "현대 미술의 중심.", "photos": ["https://images.unsplash.com/photo-1518998053901-5348d3969105?w=800"], "details": {"info": "수영장 작품.", "transport": "버스"}},
            {"id": "omicho_market", "name": "오미초 시장", "lat": 36.5705, "lng": 136.6555, "type": "food", "region": "central", "rating": 4.5, "desc": "가나자와의 부엌.", "photos": ["https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800"], "details": {"info": "신선한 해산물 덮밥.", "transport": "도보"}},
            {"id": "kanazawa_castle", "name": "가나자와 성", "lat": 36.5650, "lng": 136.6595, "type": "spot", "region": "central", "rating": 4.4, "desc": "우아한 성곽.", "photos": ["https://images.unsplash.com/photo-1624326887226-0e862363e00d?w=800"], "details": {"info": "겐로쿠엔 바로 옆.", "transport": "도보"}}
        ],
        "default_plan": {
            "1": ["kenrokuen", "kanazawa_castle", "higashi_chaya"],
            "2": ["21st_museum", "omicho_market"],
            "3": ["kenrokuen"],
            "4": ["omicho_market"]
        }
    },
    "nikko": {
        "spots": [
            {"id": "toshogu", "name": "닛코 도쇼구", "lat": 36.7581, "lng": 139.5989, "type": "spot", "region": "mountain", "rating": 4.7, "desc": "화려한 세계유산.", "photos": ["https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800"], "details": {"info": "세 원숭이 조각.", "transport": "버스"}},
            {"id": "kegon_falls", "name": "게곤 폭포", "lat": 36.7383, "lng": 139.5023, "type": "spot", "region": "nature", "rating": 4.6, "desc": "압도적인 낙차.", "photos": ["https://images.unsplash.com/photo-1580225598739-44585c5d0459?w=800"], "details": {"info": "엘리베이터 관람.", "transport": "버스"}},
            {"id": "chuzenji_lake", "name": "주젠지 호수", "lat": 36.7435, "lng": 139.4800, "type": "spot", "region": "nature", "rating": 4.5, "desc": "산 위의 거대한 호수.", "photos": ["https://images.unsplash.com/photo-1535448033526-2729314bbc30?w=800"], "details": {"info": "유람선.", "transport": "버스"}},
            {"id": "edo_wonderland", "name": "에도 원더랜드", "lat": 36.7910, "lng": 139.6970, "type": "spot", "region": "theme", "rating": 4.5, "desc": "에도 시대 테마파크.", "photos": ["https://images.unsplash.com/photo-1552611052-33e04de081de?w=800"], "details": {"info": "닌자 쇼.", "transport": "버스"}},
            {"id": "shinkyo", "name": "신쿄 (신성한 다리)", "lat": 36.7530, "lng": 139.6030, "type": "spot", "region": "entrance", "rating": 4.3, "desc": "아름다운 붉은 다리.", "photos": ["https://images.unsplash.com/photo-1579623696562-b91c01995801?w=800"], "details": {"info": "닛코의 관문.", "transport": "도보"}}
        ],
        "default_plan": {
            "1": ["shinkyo", "toshogu"],
            "2": ["kegon_falls", "chuzenji_lake"],
            "3": ["edo_wonderland"],
            "4": ["toshogu"]
        }
    },
    "sendai": {
        "spots": [
            {"id": "zuihoden", "name": "즈이호전", "lat": 38.2524, "lng": 140.8686, "type": "spot", "region": "central", "rating": 4.5, "desc": "화려한 영묘.", "photos": ["https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800"], "details": {"info": "다테 마사무네.", "transport": "루플 센다이 버스"}},
            {"id": "matsushima", "name": "마츠시마", "lat": 38.3716, "lng": 141.0667, "type": "spot", "region": "coast", "rating": 4.6, "desc": "일본 3대 절경.", "photos": ["https://images.unsplash.com/photo-1552611052-33e04de081de?w=800"], "details": {"info": "유람선과 굴 구이.", "transport": "JR 센석선"}},
            {"id": "gyutan", "name": "규탄 (우설) 거리", "lat": 38.2601, "lng": 140.8824, "type": "food", "region": "central", "rating": 4.7, "desc": "센다이 명물 우설 구이.", "photos": ["https://images.unsplash.com/photo-1541544744-5e3a01994119?w=800"], "details": {"info": "두툼한 식감.", "transport": "센다이역"}},
            {"id": "sendai_castle", "name": "센다이 성터", "lat": 38.2530, "lng": 140.8560, "type": "spot", "region": "hill", "rating": 4.4, "desc": "시내를 내려다보는 전망.", "photos": ["https://images.unsplash.com/photo-1548943487-a2e4e43b485c?w=800"], "details": {"info": "기마상.", "transport": "루플 센다이 버스"}},
            {"id": "jozenji", "name": "조젠지 거리", "lat": 38.2635, "lng": 140.8700, "type": "spot", "region": "central", "rating": 4.5, "desc": "느티나무 가로수길.", "photos": ["https://images.unsplash.com/photo-1588821949320-e222f771746c?w=800"], "details": {"info": "겨울 일루미네이션.", "transport": "지하철"}}
        ],
        "default_plan": {
            "1": ["sendai_castle", "zuihoden", "gyutan"],
            "2": ["matsushima"],
            "3": ["jozenji", "gyutan"],
            "4": ["gyutan"]
        }
    },
    "nagasaki": {
        "spots": [
            {"id": "glover_garden", "name": "글로버 정원", "lat": 32.7340, "lng": 129.8696, "type": "spot", "region": "hill", "rating": 4.6, "desc": "항구 뷰 서양식 저택.", "photos": ["https://images.unsplash.com/photo-1579623696562-b91c01995801?w=800"], "details": {"info": "하트 돌 찾기.", "transport": "노면전차"}},
            {"id": "mt_inasa", "name": "이나사야마 전망대", "lat": 32.7525, "lng": 129.8496, "type": "spot", "region": "mountain", "rating": 4.8, "desc": "세계 3대 야경.", "photos": ["https://images.unsplash.com/photo-1535448033526-2729314bbc30?w=800"], "details": {"info": "1000만불짜리 야경.", "transport": "로프웨이"}},
            {"id": "peace_park", "name": "평화 공원", "lat": 32.7765, "lng": 129.8635, "type": "spot", "region": "north", "rating": 4.5, "desc": "평화 기원상.", "photos": ["https://images.unsplash.com/photo-1580225598739-44585c5d0459?w=800"], "details": {"info": "원폭 낙하 중심지.", "transport": "노면전차"}},
            {"id": "champon", "name": "시카이로 (짬뽕)", "lat": 32.7350, "lng": 129.8700, "type": "food", "region": "hill", "rating": 4.4, "desc": "나가사키 짬뽕 원조.", "photos": ["https://images.unsplash.com/photo-1569937756447-e19164275f30?w=800"], "details": {"info": "진한 국물.", "transport": "글로버 정원 앞"}},
            {"id": "megane_bridge", "name": "메가네바시 (안경다리)", "lat": 32.7470, "lng": 129.8800, "type": "spot", "region": "central", "rating": 4.3, "desc": "물에 비친 모습이 안경 모양.", "photos": ["https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800"], "details": {"info": "사진 명소.", "transport": "노면전차"}}
        ],
        "default_plan": {
            "1": ["glover_garden", "champon", "mt_inasa"],
            "2": ["peace_park", "megane_bridge"],
            "3": ["glover_garden"],
            "4": ["champon"]
        }
    }
}

# ==============================================================================
#  CODE GENERATION FUNCTION
# ==============================================================================
def generate_js_file(city_name, city_data):
    spots = city_data.get('spots', [])
    default_plan = city_data.get('default_plan', {1: [], 2: [], 3: [], 4: []})
    
    # Generate JS content
    js_content = f"""
function init{city_name.capitalize()}Trip() {{
    console.log('✨ {city_name.capitalize()} App V6.0 Loaded [DEEP DATA]');

    // ==========================================================================
    //  ✨ HIGH FIDELITY DATABASE: {city_name.upper()}
    // ==========================================================================
    const POI_DATABASE = {json.dumps(spots, indent=4, ensure_ascii=False)};

    // ==========================================================================
    //  🚀 CORE ENGINE (STATE MANAGEMENT & UI)
    // ==========================================================================
    let userItinerary = {json.dumps(default_plan, ensure_ascii=False)};
    let activeDay = 1;
    let map, markers = [];

    function initApp() {{
        injectCSS();
        renderHeader();
        renderBuilderUI();
        setTimeout(initMap, 500);
    }}

    function initMap() {{
        const mapEl = document.getElementById('map');
        if (!mapEl) return;
        // Center map on the first spot of Day 1, or the first spot in DB
        const centerSpot = POI_DATABASE.find(p => p.id === userItinerary[1][0]) || POI_DATABASE[0];
        map = new google.maps.Map(mapEl, {{
            center: {{ lat: centerSpot.lat, lng: centerSpot.lng }},
            zoom: 12,
            mapTypeControl: false, streetViewControl: false, fullscreenControl: true
        }});
        
        // Route Helper (Preview Travel)
        if (window.initRouteHelper) window.initRouteHelper(map);
        
        updateMapMarkers();
    }}

    function renderHeader() {{
        const container = document.getElementById('day-tabs');
        if (!container) return;
        container.innerHTML = Object.keys(userItinerary).map(day =>
            `<button onclick="switchDay(${{day}})" 
                class="px-4 py-2 rounded-full text-sm font-bold transition-all border shadow-sm ${{day == activeDay
                ? 'bg-blue-600 text-white scale-105 border-blue-700'
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }}">
                Day ${{day}}
            </button>`
        ).join('');
    }}

    function renderBuilderUI() {{
        const container = document.getElementById('itinerary-content');
        if (!container) return;

        const planList = userItinerary[activeDay].map((id, idx) => {{
            const item = POI_DATABASE.find(p => p.id === id);
            if (!item) return '';
            return `
                <div class="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 transition hover:shadow-md">
                    <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        ${{idx + 1}}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="font-bold text-gray-700 text-sm cursor-pointer hover:text-blue-600 truncate" onclick="showDetail('${{item.id}}')">
                            ${{item.name}}
                        </div>
                        <div class="text-[10px] text-gray-400">
                            ${{item.region.toUpperCase()}} • ${{item.type}}
                        </div>
                    </div>
                    <button onclick="removeFromPlan('${{item.id}}')" class="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition">
                        ⛔
                    </button>
                </div>`;
        }}).join('');

        container.innerHTML = `
            <!-- 1. 내 일정 -->
            <div class="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-100 shadow-inner">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-bold text-blue-800 flex items-center gap-2">📅 Day ${{activeDay}} 일정</h3>
                    <div class="flex gap-2">
                         <button onclick="verifyRoute()" class="text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none px-3 py-1.5 rounded-full font-bold hover:scale-105 transition flex items-center gap-1 shadow-md animate-pulse">
                            <i class="fas fa-plane-departure"></i> 미리여행
                        </button>
                        <span class="text-xs text-blue-600 bg-white px-2 py-1 rounded border border-blue-200 font-bold">${{userItinerary[activeDay].length}}곳</span>
                    </div>
                </div>
                <div id="my-plan-list" class="space-y-2 min-h-[50px]">
                    ${{userItinerary[activeDay].length === 0 ? '<p class="text-center text-gray-400 text-xs py-6 border-2 border-dashed border-blue-200 rounded-lg">아래 목록에서 [+] 버튼을 눌러<br>장소를 추가해보세요.</p>' : planList}}
                </div>
            </div>

            <!-- 2. 장소 리스트 -->
            <div id="spot-pool" class="grid grid-cols-1 gap-4 pb-24"></div>`;

        renderSpotPool('all');
    }}

    window.verifyRoute = () => {{
        if (window.startPreviewTravel) {{
            window.startPreviewTravel(userItinerary[activeDay], POI_DATABASE);
        }} else {{
            alert('미리여행 기능을 로드하는 중입니다. 잠시 후 다시 시도해주세요.');
        }}
    }};

    window.renderSpotPool = function (region) {{
        const pool = document.getElementById('spot-pool');
        const filtered = region === 'all' ? POI_DATABASE : POI_DATABASE.filter(p => p.region === region);

        let htmlContent = filtered.map(place => {{
            const isAdded = Object.values(userItinerary).flat().includes(place.id);
            const btnClass = isAdded ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-blue-600";
            const btnText = isAdded ? "✅ 일정 포함됨" : `<i class="fas fa-plus"></i> 일정에 담기`;
            const btnAction = isAdded ? "" : `onclick="addToPlan('${{place.id}}')"`;
            
            const themeTags = place.details.themes ? place.details.themes.map(t => `<span class="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">${{t}}</span>`).join('') : '';

            return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div class="flex p-4 gap-4">
                    <div class="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden cursor-pointer group" onclick="showDetail('${{place.id}}')">
                        <img src="${{place.photos[0]}}" class="w-full h-full object-cover transition group-hover:scale-110">
                        <div class="absolute bottom-0 w-full bg-black/60 text-white text-[10px] text-center py-1">상세보기</div>
                    </div>
                    <div class="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start">
                                <h4 class="font-bold text-gray-900 text-lg truncate cursor-pointer hover:text-blue-600" onclick="showDetail('${{place.id}}')">${{place.name}}</h4>
                                <span class="text-[10px] font-bold px-2 py-0.5 rounded ${{place.type === 'food' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}}">${{place.type.toUpperCase()}}</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1 line-clamp-2">${{place.desc}}</p>
                            <div class="flex flex-wrap gap-1 mt-2">${{themeTags}}</div>
                            <div class="flex items-center gap-1 mt-2">
                                <span class="text-yellow-400 text-xs">★</span>
                                <span class="text-xs font-bold text-gray-700">${{place.rating}}</span>
                                <span class="text-[10px] text-gray-400 ml-1">(${{place.reviews ? place.reviews.length * 123 : 0}})</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 pb-4">
                    <button ${{btnAction}} class="w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition ${{btnClass}}">
                        ${{btnText}}
                    </button>
                </div>
            </div>`;
        }}).join('');

        pool.innerHTML = htmlContent;
    }}

    // --- 인터랙션 로직 ---
    window.addToPlan = (id) => {{
        if (Object.values(userItinerary).flat().includes(id)) return alert('이미 일정에 있습니다.');
        userItinerary[activeDay].push(id);
        renderBuilderUI();
        updateMapMarkers();
    }}

    window.removeFromPlan = (id) => {{
        userItinerary[activeDay] = userItinerary[activeDay].filter(itemId => itemId !== id);
        renderBuilderUI();
        updateMapMarkers();
    }}

    window.switchDay = (day) => {{
        activeDay = day;
        renderHeader();
        renderBuilderUI();
        updateMapMarkers();
    }}

    function updateMapMarkers() {{
        if (!map) return;
        markers.forEach(m => m.setMap(null));
        markers = [];
        const bounds = new google.maps.LatLngBounds();

        userItinerary[activeDay].forEach((id, idx) => {{
            const item = POI_DATABASE.find(p => p.id === id);
            if (item) {{
                const marker = new google.maps.Marker({{
                    position: {{ lat: item.lat, lng: item.lng }},
                    map: map,
                    label: {{ text: (idx + 1).toString(), color: "white", fontWeight: 'bold' }},
                    animation: google.maps.Animation.DROP
                }});
                marker.addListener('click', () => showDetail(id));
                markers.push(marker);
                bounds.extend(marker.getPosition());
            }}
        }});

        if (markers.length > 0) map.fitBounds(bounds);
        if (window.drawRoute) window.drawRoute(userItinerary[activeDay], POI_DATABASE);
    }}

    // --- 상세 모달 ---
    window.showDetail = function (id) {{
        const item = POI_DATABASE.find(p => p.id === id);
        if (!createModal()) return;
        if (map) {{ map.panTo({{ lat: item.lat, lng: item.lng }}); map.setZoom(16); }}
        const content = document.getElementById('modal-content');
        window.currentDetailTab = 'overview';
        
        function renderModalContent() {{
            const overviewClass = window.currentDetailTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600';
            const reviewsClass = window.currentDetailTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600';
            const photosClass = window.currentDetailTab === 'photos' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600';

            let tabContent = '';
            if (window.currentDetailTab === 'overview') {{
                const seasonalInfo = item.details.seasonal ? Object.entries(item.details.seasonal).map(([k, v]) => `<li class="text-xs text-gray-600"><span class="font-bold text-blue-500">${{k.toUpperCase()}}:</span> ${{v}}</li>`).join('') : '';
                const recommendTags = item.details.recommend ? item.details.recommend.map(r => `<span class="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold">#${{r}}</span>`).join('') : '';

                tabContent = `
                <div class="space-y-6 animate-fade-in">
                    <div>
                        <p class="text-gray-600 leading-relaxed text-lg">${{item.desc}}</p>
                        <div class="flex gap-2 mt-3">${{recommendTags}}</div>
                    </div>
                    
                    <div class="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <h3 class="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2"><i class="fas fa-info-circle text-blue-500"></i> 상세 정보</h3>
                        <div class="prose text-sm text-gray-600 leading-relaxed space-y-2">
                            <p>${{item.details?.info || '정보 업데이트 중...'}}</p>
                            ${{item.details?.tips ? `<p class="text-xs bg-yellow-50 p-2 rounded text-yellow-800">💡 <strong>꿀팁:</strong> ${{item.details.tips}}</p>` : ''}}
                        </div>
                    </div>

                    ${{seasonalInfo ? `
                    <div class="bg-green-50 p-5 rounded-2xl border border-green-100">
                        <h3 class="font-bold text-green-800 text-sm mb-2 flex items-center gap-2"><i class="fas fa-leaf"></i> 계절별 포인트</h3>
                        <ul class="space-y-1">${{seasonalInfo}}</ul>
                    </div>` : ''}}

                    ${{item.details?.transport ? `<div class="space-y-2"><h3 class="font-bold text-gray-800 text-sm flex items-center gap-2"><i class="fas fa-subway text-purple-500"></i> 교통편</h3><div class="bg-purple-50 p-3 rounded-xl border border-purple-100 text-xs">${{item.details.transport}}</div></div>` : ''}}
                    
                    <div class="flex gap-3 pt-4">
                        <button onclick="addToPlan('${{item.id}}'); closeModal();" class="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2"><i class="fas fa-plus-circle"></i> 일정에 담기</button>
                        <a href="https://www.google.com/maps/search/?api=1&query=${{encodeURIComponent(item.name)}}" target="_blank" class="flex-1 bg-gray-800 text-white text-center py-4 rounded-xl font-bold hover:bg-gray-700 transition shadow-lg flex items-center justify-center gap-2"><i class="fas fa-map-marked-alt"></i> 구글맵</a>
                    </div>
                </div>`;
            }} else if (window.currentDetailTab === 'reviews') {{
                tabContent = `<div class="space-y-4 animate-fade-in"><div class="flex items-center gap-4 mb-6 bg-blue-50 p-4 rounded-xl"><div class="text-4xl font-black text-blue-600">${{item.rating}}</div><div><div class="flex text-yellow-400 text-sm mb-1">${{'★'.repeat(Math.floor(item.rating))}}</div><p class="text-xs text-gray-500">실제 여행객 리뷰 요약</p></div></div><div class="space-y-4">${{item.reviews ? item.reviews.map(r => `<div class="border-b border-gray-100 pb-4"><div class="flex justify-between mb-2"><span class="font-bold text-sm text-gray-800">${{r.user}}</span><span class="text-xs text-gray-400">${{r.date}}</span></div><p class="text-sm text-gray-600">${{r.text}}</p></div>`).join('') : '<p class="text-sm text-gray-500">리뷰가 없습니다.</p>'}}</div></div>`;
            }} else if (window.currentDetailTab === 'photos') {{
                tabContent = `<div class="grid grid-cols-2 gap-2 animate-fade-in">${{item.photos.map(p => `<div class="aspect-square rounded-lg overflow-hidden bg-gray-100"><img src="${{p}}" class="w-full h-full object-cover" onclick="window.open('${{p}}','_blank')"></div>`).join('')}}</div>`;
            }}

            content.innerHTML = `<div class="relative h-72 bg-gray-900 group"><img src="${{item.photos[0]}}" class="w-full h-full object-cover opacity-90"><button onclick="closeModal()" class="absolute top-4 right-4 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center">✕</button><div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 pt-20"><h2 class="text-3xl font-black text-white mb-1">${{item.name}}</h2><div class="flex gap-2 mt-2">${{item.details.themes ? item.details.themes.map(t => `<span class="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded backdrop-blur-sm">${{t}}</span>`).join('') : ''}}</div></div></div><div class="sticky top-0 bg-white z-10 flex border-b shadow-sm"><button class="flex-1 py-4 text-sm font-bold transition ${{overviewClass}}" onclick="window.switchDetailTab('overview')">개요</button><button class="flex-1 py-4 text-sm font-bold transition ${{reviewsClass}}" onclick="window.switchDetailTab('reviews')">리뷰</button><button class="flex-1 py-4 text-sm font-bold transition ${{photosClass}}" onclick="window.switchDetailTab('photos')">사진</button></div><div class="p-6 pb-24">${{tabContent}}</div>`;
        }}
        window.switchDetailTab = (tab) => {{ window.currentDetailTab = tab; renderModalContent(); }};
        renderModalContent();
    }}

    function createModal() {{
        let m = document.getElementById('app-modal');
        if (!m) {{ m = document.createElement('div'); m.id = 'app-modal'; m.className = 'fixed inset-0 z-50 hidden'; m.innerHTML = `<div class="absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="closeModal()"></div><div class="absolute bottom-0 w-full md:w-[480px] md:right-0 md:top-0 h-[90vh] md:h-full bg-white rounded-t-2xl md:rounded-none flex flex-col overflow-hidden shadow-2xl"><div id="modal-content" class="flex-1 overflow-y-auto scrollbar-hide bg-white"></div></div>`; document.body.appendChild(m); }}
        m.classList.remove('hidden'); return true;
    }}
    window.closeModal = () => document.getElementById('app-modal').classList.add('hidden');
    function injectCSS() {{ const s = document.createElement('style'); s.textContent = `.scrollbar-hide::-webkit-scrollbar {{ display: none; }} .animate-fade-in {{ animation: fadeIn 0.3s ease-in-out; }} @keyframes fadeIn {{ from {{ opacity: 0; transform: translateY(5px); }} to {{ opacity: 1; transform: translateY(0); }} }}`; document.head.appendChild(s); }}

    initApp();
}}
window.init{city_name.capitalize()}Trip = init{city_name.capitalize()}Trip;
    """
    return js_content

# ==============================================================================
#  MAIN EXECUTION
# ==============================================================================
if __name__ == "__main__":
    output_dir = "f:/genmini/japness/변환/fam/js/travel/"
    
    for city, data in CITIES_DATA.items():
        file_name = f"{city}.js"
        full_path = os.path.join(output_dir, file_name)
        
        print(f"Generating {{file_name}}...")
        js_code = generate_js_file(city, data)
        
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(js_code)
            
    print("All 11 city files generated successfully!")
