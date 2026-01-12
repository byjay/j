/**
 * ★ 후쿠오카 여행 POI 데이터 ★
 * OpenFreeMap + Leaflet 기반 Zero-Cost 지도 시스템용
 * 
 * 데이터 출처: Fukuoka_Travel_Plan JSON 파일들 통합
 * 생성일: 2026-01-05
 */

const FUKUOKA_POI = {
    // 메타 정보
    meta: {
        city: 'Fukuoka',
        country: 'Japan',
        total_count: 50, // 주요 POI
        center: [33.5897, 130.4207], // 하카타역 중심
        defaultZoom: 13
    },

    // ★ Day별 여정 POI ★
    itinerary: {
        day1: [
            { id: 'd1_1', name: '후쿠오카 공항', name_jp: '福岡空港', lat: 33.5902, lng: 130.4510, category: 'transport', icon: '✈️' },
            { id: 'd1_2', name: '하카타역', name_jp: '博多駅', lat: 33.5897, lng: 130.4207, category: 'transport', icon: '🚃' },
            { id: 'd1_3', name: '몬탄 하카타 호스텔', name_jp: 'ゲストハウス', lat: 33.5891, lng: 130.4187, category: 'hotel', icon: '🏨' },
            {
                id: 'd1_4', name: '캐널시티 하카타', name_jp: 'キャナルシティ博多', lat: 33.5892, lng: 130.4108, category: 'shopping', icon: '🛍️',
                summary: '분수 쇼와 다양한 식사 옵션을 즐길 수 있는 거대한 쇼핑 및 엔터테인먼트 복합 공간',
                hours: '10:00-21:00', rating: 4.2
            },
            {
                id: 'd1_5', name: '나카스 야타이', name_jp: '中洲屋台', lat: 33.5932, lng: 130.4058, category: 'food', icon: '🍜',
                summary: '후쿠오카 명물 포장마차 거리', rating: 4.5
            }
        ],
        day2: [
            { id: 'd2_1', name: '하카타역', name_jp: '博多駅', lat: 33.5897, lng: 130.4207, category: 'transport', icon: '🚃' },
            {
                id: 'd2_2', name: '다자이후 텐만구', name_jp: '太宰府天満宮', lat: 33.5199, lng: 130.5348, category: 'attraction', icon: '⛩️',
                summary: '학문의 신을 모시는 장엄한 신사, 매화나무가 아름다움',
                hours: '06:30-19:00', rating: 4.4
            },
            {
                id: 'd2_3', name: '규슈 국립박물관', name_jp: '九州国立博物館', lat: 33.5163, lng: 130.5401, category: 'attraction', icon: '🏛️',
                summary: '일본에서 4번째 국립박물관',
                hours: '09:30-17:00', rating: 4.3
            },
            {
                id: 'd2_4', name: '우메가에 모치', name_jp: '梅ヶ枝餅', lat: 33.5204, lng: 130.5315, category: 'food', icon: '🍡',
                summary: '다자이후 명물 매화꽃 모양 떡', rating: 4.6
            }
        ],
        day3: [
            {
                id: 'd3_1', name: '오호리 공원', name_jp: '大濠公園', lat: 33.5860, lng: 130.3779, category: 'attraction', icon: '🌳',
                summary: '후쿠오카 도심 속 휴식 오아시스. 버스로 하카타역에서 약 20분 소요.',
                hours: '24시간', rating: 4.5, image: 'images/travel/fukuoka/ohori_park.jpg'
            },
            {
                id: 'd3_bus_1', name: '🚌 버스 미션: 오호리 → 타워', category: 'transport', icon: '🚌',
                summary: '오호리 공원에서 302, 305번 버스 타고 타워로 이동!',
                details: '약 15분 소요, 니시테츠 버스 이용'
            },
            {
                id: 'd3_2', name: '후쿠오카 성터', name_jp: '福岡城跡', lat: 33.5840, lng: 130.3830, category: 'attraction', icon: '🏯',
                summary: '역사적 성터와 아름다운 공원. 후쿠오카의 역사를 느낄 수 있는 곳.',
                hours: '09:00-17:00', rating: 4.1, image: 'images/travel/fukuoka/placeholder.jpg'
            },
            {
                id: 'd3_3', name: '후쿠오카 타워', name_jp: '福岡タワー', lat: 33.5929, lng: 130.3513, category: 'attraction', icon: '🗼',
                summary: '후쿠오카 시내와 하카타 만의 숨막히는 전경',
                hours: '09:30-22:00', rating: 4.2, ticket: '성인 ¥800'
            },
            {
                id: 'd3_4', name: '모모치 해변', name_jp: 'ももち浜', lat: 33.5918, lng: 130.3582, category: 'attraction', icon: '🏖️',
                summary: '인공 해변, 야경 필수', rating: 4.0
            },
            { id: 'd3_5', name: '하카타역 (출발)', name_jp: '博多駅', lat: 33.5897, lng: 130.4207, category: 'transport', icon: '🚃' }
        ]
    },

    // ★ 카테고리별 POI ★
    restaurants: [
        {
            id: 'r1', name: '규카츠 모토무라', name_jp: '牛カツ京都勝牛', lat: 33.5905, lng: 130.3989, category: 'food', icon: '🥩',
            summary: '직접 구워먹는 규카츠 맛집', hours: '11:00-22:00', rating: 4.9, price: '¥1,500-2,600'
        },
        {
            id: 'r2', name: '하카타 잇소우', name_jp: '博多一双', lat: 33.5920, lng: 130.4270, category: 'food', icon: '🍜',
            summary: '크리미한 거품 돈코츠 라멘', hours: '11:00-24:00', rating: 4.2, price: '¥800-1,100'
        },
        {
            id: 'r3', name: '효탄 스시', name_jp: 'ひょうたん寿司', lat: 33.5905, lng: 130.4005, category: 'food', icon: '🍣',
            summary: '신선한 스시 현지 맛집', hours: '11:30-20:30', rating: 4.2, price: '¥2,000-3,000'
        },
        {
            id: 'r4', name: '텐푸라 히라오', name_jp: '天ぷらひらお', lat: 33.5689, lng: 130.4350, category: 'food', icon: '🍤',
            summary: '바삭한 튀김과 무한 양배추', hours: '10:30-20:00', rating: 4.4, price: '¥1,000-1,500'
        },
        {
            id: 'r5', name: '요시즈카 우나기야', name_jp: '吉塚うなぎ屋', lat: 33.5935, lng: 130.4095, category: 'food', icon: '🐟',
            summary: '전설적인 장어 전문점', hours: '10:00-21:00', rating: 4.4, price: '¥3,500-6,000'
        },
        {
            id: 'r6', name: '모츠나베 라쿠텐치', name_jp: '元祖もつ鍋楽天地', lat: 33.5900, lng: 130.3962, category: 'food', icon: '🍲',
            summary: '후쿠오카 명물 곱창 전골', hours: '11:00-22:00', rating: 4.7, price: '¥1,600-2,500'
        }
    ],

    shopping: [
        {
            id: 's1', name: '텐진 지하상가', name_jp: '天神地下街', lat: 33.5912, lng: 130.3987, category: 'shopping', icon: '🛒',
            summary: '거대한 지하 쇼핑 천국', hours: '10:00-20:00', rating: 4.2
        },
        {
            id: 's2', name: 'JR 하카타 시티', name_jp: 'JRはかたシティ', lat: 33.5897, lng: 130.4207, category: 'shopping', icon: '🛍️',
            summary: '하카타역 복합 쇼핑몰', hours: '10:00-21:00', rating: 4.4
        },
        {
            id: 's3', name: '라라포트 후쿠오카', name_jp: 'ららぽーと福岡', lat: 33.5750, lng: 130.4590, category: 'shopping', icon: '🤖',
            summary: '실물 크기 건담 동상!', hours: '10:00-21:00', rating: 4.3
        },
        {
            id: 's4', name: '돈키호테 텐진', name_jp: 'ドン・キホーテ天神', lat: 33.5902, lng: 130.4005, category: 'shopping', icon: '🎉',
            summary: '24시간 할인 쇼핑', hours: '24시간', rating: 4.0
        },
        {
            id: 's5', name: '마리노아 시티', name_jp: 'マリノアシティ', lat: 33.5601, lng: 130.3140, category: 'shopping', icon: '🎡',
            summary: '바닷가 아울렛 몰 + 관람차', hours: '10:00-21:00', rating: 4.0
        }
    ],

    cafes: [
        {
            id: 'c1', name: '블루보틀', name_jp: 'Blue Bottle Coffee', lat: 33.5920, lng: 130.3995, category: 'cafe', icon: '☕',
            summary: '미니멀한 디자인의 고품질 커피', hours: '08:00-20:00', rating: 4.5
        },
        {
            id: 'c2', name: 'REC 커피 하카타', name_jp: 'REC COFFEE', lat: 33.5897, lng: 130.4207, category: 'cafe', icon: '☕',
            summary: '하카타역 전망 카페', hours: '10:00-21:00', rating: 4.1
        },
        {
            id: 'c3', name: '후글렌', name_jp: 'Fuglen Fukuoka', lat: 33.5915, lng: 130.4280, category: 'cafe', icon: '☕',
            summary: '오슬로 스타일 스페셜티 커피', hours: '07:00-22:00', rating: 4.4
        }
    ],

    attractions: [
        {
            id: 'a1', name: '구시다 신사', name_jp: '櫛田神社', lat: 33.5913, lng: 130.4103, category: 'attraction', icon: '⛩️',
            summary: '하카타의 영적 심장, 야마카사 축제', hours: '09:00-17:00', rating: 4.4
        },
        {
            id: 'a2', name: '하카타 마치야 민속관', name_jp: '博多町家ふるさと館', lat: 33.5915, lng: 130.4090, category: 'attraction', icon: '🏠',
            summary: '전통 하카타 문화 체험', hours: '10:00-18:00', rating: 4.2, ticket: '¥200'
        }
    ],

    // ★ 교통 정보 ★
    transport: {
        subway: {
            kuko: { name: '공항선 (쿠코선)', color: '#F58220', stations: ['福岡空港', '博多', '祇園', '中洲川端', '天神'] },
            hakozaki: { name: '하코자키선', color: '#0072BC', stations: ['中洲川端', '呉服町', '千代県庁口', '箱崎宮前'] }
        },
        nishitetsu: {
            omuta: { name: '니시테츠 텐진오무타선', color: '#9E1B34', stations: ['福岡(天神)', '西鉄平尾', '大橋', '太宰府'] }
        }
    }
};

// ★ Export for Leaflet Map ★
if (typeof window !== 'undefined') {
    window.FUKUOKA_POI = FUKUOKA_POI;
}
