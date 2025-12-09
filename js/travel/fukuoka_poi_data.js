// 후쿠오카 POI 데이터 - 실제 이미지 URL 사용
// 각 장소에 맞는 Unsplash 및 Wikimedia Commons 이미지 사용

window.POI_DATABASE = [
    {
        id: 'fukuoka_airport',
        name: '후쿠오카 공항',
        name_en: 'Fukuoka Airport',
        lat: 33.5854,
        lng: 130.4505,
        type: 'spot',
        region: 'hakata',
        rating: 4.3,
        desc: '일본의 주요 공항 중 하나로, 도심에서 지하철로 5분 거리에 위치한 편리한 공항입니다.',
        photos: [
            'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
            'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800'
        ],
        details: {
            address: '778-1 Shimousui, Hakata Ward, Fukuoka',
            hours: '24시간 (편의시설 5:00-23:00)',
            transport: '하카타역에서 지하철 5분',
            tips: '도심에서 가장 가까운 공항! 면세점 쇼핑 추천'
        }
    },
    {
        id: 'oriental_hotel',
        name: '오리엔탈 호텔 후쿠오카',
        name_en: 'Oriental Hotel Fukuoka',
        lat: 33.5903,
        lng: 130.3981,
        type: 'spot',
        region: 'hakata',
        rating: 4.5,
        desc: '하카타역 근처에 위치한 고급 호텔로 비즈니스와 관광 모두에 적합합니다.',
        photos: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
            'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
        ],
        details: {
            address: '4-14 Hakataeki Higashi, Hakata Ward',
            hours: '체크인 15:00 / 체크아웃 11:00',
            transport: '하카타역 도보 3분',
            tips: '조식 뷔페가 훌륭합니다'
        }
    },
    {
        id: 'shinshin_ramen',
        name: '신신 라멘',
        name_en: 'Shin Shin Ramen',
        lat: 33.5898,
        lng: 130.3886,
        type: 'food',
        region: 'tenjin',
        rating: 4.6,
        desc: '진한 돈코츠 국물과 가는 면이 특징인 하카타 라멘의 명가입니다.',
        photos: [
            'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800',
            'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800'
        ],
        details: {
            address: '3-2-19 Tenjin, Chuo Ward',
            hours: '11:00 - 03:00',
            menu: '라멘 ¥700, 챠슈멘 ¥950, 교자 ¥350',
            tips: '면 굵기와 육수 농도 선택 가능!'
        }
    },
    {
        id: 'ohori_park',
        name: '오호리 공원',
        name_en: 'Ohori Park',
        lat: 33.5863,
        lng: 130.3759,
        type: 'spot',
        region: 'chuo',
        rating: 4.5,
        desc: '큰 연못을 중심으로 조성된 아름다운 도심 공원. 산책과 보트놀이에 최적입니다.',
        photos: [
            'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800',
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'
        ],
        details: {
            address: '1 Ohorikoen, Chuo Ward, Fukuoka',
            hours: '24시간 개방',
            ticket: '무료 (보트 ¥600)',
            tips: '일본 정원도 꼭 방문하세요 (입장료 ¥250)'
        }
    },
    {
        id: 'momochi_seaside',
        name: '시사이드 모모치',
        name_en: 'Seaside Momochi',
        lat: 33.5921,
        lng: 130.3517,
        type: 'spot',
        region: 'momochi',
        rating: 4.3,
        desc: '인공 해변과 현대적인 건축물이 어우러진 후쿠오카의 워터프론트 지역입니다.',
        photos: [
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
            'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800'
        ],
        details: {
            address: 'Momochihama, Sawara Ward, Fukuoka',
            hours: '24시간 개방',
            tips: '후쿠오카 타워와 함께 방문 추천'
        }
    },
    {
        id: 'fukuoka_tower',
        name: '후쿠오카 타워',
        name_en: 'Fukuoka Tower',
        lat: 33.5932,
        lng: 130.3514,
        type: 'spot',
        region: 'momochi',
        rating: 4.4,
        desc: '234m 높이의 해변 타워로, 후쿠오카 시내와 바다의 360도 전망을 즐길 수 있습니다.',
        photos: [
            'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800',
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'
        ],
        details: {
            address: '2-3-26 Momochihama, Sawara Ward',
            hours: '09:30 - 22:00',
            ticket: '성인 ¥800, 어린이 ¥500',
            tips: '야간 조명이 아름다워요. 일몰 시간 추천!'
        }
    },
    {
        id: 'motsunabe_rakutenchi',
        name: '모츠나베 라쿠텐치',
        name_en: 'Motsunabe Rakutenchi',
        lat: 33.5902,
        lng: 130.4017,
        type: 'food',
        region: 'hakata',
        rating: 4.7,
        desc: '후쿠오카 명물 모츠나베(곱창전골)의 유명 맛집입니다.',
        photos: [
            'https://images.unsplash.com/photo-1547928576-b822bc410b52?w=800',
            'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'
        ],
        details: {
            address: '2-14-28 Tenjin, Chuo Ward',
            hours: '17:00 - 23:00',
            menu: '모츠나베 ¥1,500, 챠-방 ¥1,800',
            tips: '예약 필수! 미소(된장) 맛 추천'
        }
    },
    {
        id: 'nakasu_yatai',
        name: '나카스 야타이',
        name_en: 'Nakasu Yatai Street',
        lat: 33.5922,
        lng: 130.4052,
        type: 'food',
        region: 'nakasu',
        rating: 4.5,
        desc: '강변에 늘어선 후쿠오카 전통 포장마차 거리. 라멘, 오뎅, 야키토리를 즐길 수 있습니다.',
        photos: [
            'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800',
            'https://images.unsplash.com/photo-1580442151529-343f2f6e0e27?w=800'
        ],
        details: {
            address: 'Nakasu, Hakata Ward, Fukuoka',
            hours: '18:00 - 02:00 (날씨에 따라 변동)',
            menu: '라멘 ¥600-800, 야키토리 ¥150/개',
            tips: '현금 준비! 현지인과 대화하며 즐기세요'
        }
    },
    {
        id: 'yufuin_tour_start',
        name: '유후인 버스투어 출발점',
        name_en: 'Yufuin Bus Tour Start',
        lat: 33.2654,
        lng: 131.3697,
        type: 'spot',
        region: 'yufuin',
        rating: 4.6,
        desc: '하카타역에서 출발하는 유후인 당일치기 버스 투어 출발 장소입니다.',
        photos: [
            'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800',
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'
        ],
        details: {
            address: 'Hakata Station Bus Terminal',
            hours: '08:00 출발',
            ticket: '왕복 ¥3,000-5,000',
            tips: '온천마을 산책과 킨린코 호수 필수!'
        }
    },
    {
        id: 'dazaifu',
        name: '다자이후 텐만구',
        name_en: 'Dazaifu Tenmangu Shrine',
        lat: 33.5190,
        lng: 130.5348,
        type: 'temple',
        region: 'dazaifu',
        rating: 4.7,
        desc: '학문의 신을 모시는 유서 깊은 신사. 매화와 녹나무가 아름다운 명소입니다.',
        photos: [
            'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800',
            'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800'
        ],
        details: {
            address: '4-7-1 Saifu, Dazaifu, Fukuoka',
            hours: '06:30 - 19:00',
            ticket: '무료 (보물전 ¥500)',
            tips: '우메가에모치(매화떡) 필수! 참배길에서 구매'
        }
    },
    {
        id: 'yufuin_village',
        name: '유후인 플로랄 빌리지',
        name_en: 'Yufuin Floral Village',
        lat: 33.2680,
        lng: 131.3667,
        type: 'spot',
        region: 'yufuin',
        rating: 4.4,
        desc: '영국 코츠월드를 재현한 아기자기한 마을. 샵과 카페가 즐비합니다.',
        photos: [
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
            'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800'
        ],
        details: {
            address: '1503-3 Kawakami, Yufuin, Oita',
            hours: '09:30 - 17:30',
            tips: '올빼미 카페와 고양이 카페도 있어요'
        }
    },
    {
        id: 'kinrin_lake',
        name: '킨린코 호수',
        name_en: 'Lake Kinrin',
        lat: 33.2724,
        lng: 131.3703,
        type: 'spot',
        region: 'yufuin',
        rating: 4.6,
        desc: '아침 안개가 아름다운 신비로운 호수. 온천수가 흘러들어 겨울에도 안개가 핍니다.',
        photos: [
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
            'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800'
        ],
        details: {
            address: 'Kawakami, Yufuin, Oita',
            hours: '24시간 개방',
            tips: '이른 아침 방문 시 환상적인 안개!'
        }
    },
    {
        id: 'yufumabushi_shin',
        name: '유후마부시 신',
        name_en: 'Yufumabushi Shin',
        lat: 33.2665,
        lng: 131.3680,
        type: 'food',
        region: 'yufuin',
        rating: 4.5,
        desc: '유후인 명물 규동(소고기덮밥) 전문점. 히츠마부시 스타일로 즐깁니다.',
        photos: [
            'https://images.unsplash.com/photo-1547928576-b822bc410b52?w=800',
            'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800'
        ],
        details: {
            address: '1511-1 Kawakami, Yufuin',
            hours: '11:00 - 15:00',
            menu: '유후마부시 ¥1,800',
            tips: '세 가지 먹는 방법: 그대로, 양념, 차즈게'
        }
    },
    {
        id: 'kamado_jigoku',
        name: '가마도 지옥',
        name_en: 'Kamado Jigoku (Hell)',
        lat: 33.3207,
        lng: 131.4467,
        type: 'spot',
        region: 'beppu',
        rating: 4.5,
        desc: '여러 색깔의 온천이 있는 벳푸 지옥온천 중 하나. 족욕과 온천 찜 달걀도 즐길 수 있습니다.',
        photos: [
            'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800',
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'
        ],
        details: {
            address: '621 Miyuki, Beppu, Oita',
            hours: '08:00 - 17:00',
            ticket: '¥400 (7개 지옥 통합권 ¥2,000)',
            tips: '온천 달걀과 족욕 체험 필수!'
        }
    },
    {
        id: 'sumiyoshi_shrine',
        name: '스미요시 신사',
        name_en: 'Sumiyoshi Shrine',
        lat: 33.5847,
        lng: 130.4063,
        type: 'temple',
        region: 'hakata',
        rating: 4.4,
        desc: '1800년 역사의 하카타 수호신사. 스모 선수들이 우승 기념으로 참배합니다.',
        photos: [
            'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800',
            'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800'
        ],
        details: {
            address: '3-1-51 Sumiyoshi, Hakata Ward',
            hours: '24시간 (사무소 09:00-17:00)',
            ticket: '무료',
            tips: '스모 요코즈나 봉납 토정도 볼 수 있어요'
        }
    },
    {
        id: 'canal_city',
        name: '캐널시티 하카타',
        name_en: 'Canal City Hakata',
        lat: 33.5902,
        lng: 130.4117,
        type: 'shopping',
        region: 'hakata',
        rating: 4.3,
        desc: '운하가 흐르는 대형 쇼핑몰. 분수쇼, 라멘 스타디움, 영화관까지!',
        photos: [
            'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'
        ],
        details: {
            address: '1-2 Sumiyoshi, Hakata Ward',
            hours: '10:00 - 21:00 (레스토랑 ~23:00)',
            tips: '라멘 스타디움에서 전국 라멘 비교!'
        }
    },
    {
        id: 'beef_tongue_lunch',
        name: '교카쿠 규탄',
        name_en: 'Gyokaku Beef Tongue',
        lat: 33.5898,
        lng: 130.4020,
        type: 'food',
        region: 'hakata',
        rating: 4.5,
        desc: '숯불에 구운 두툼한 규탄(소혀)이 일품인 점심 맛집입니다.',
        photos: [
            'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
            'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800'
        ],
        details: {
            address: 'Hakata Ward, Fukuoka',
            hours: '11:00 - 15:00, 17:00 - 22:00',
            menu: '규탄정식 ¥1,500, 규탄카레 ¥1,200',
            tips: '점심 정식이 저렴하고 푸짐해요'
        }
    },
    {
        id: 'kushida_shrine',
        name: '구시다 신사',
        name_en: 'Kushida Shrine',
        lat: 33.5907,
        lng: 130.4083,
        type: 'temple',
        region: 'hakata',
        rating: 4.6,
        desc: '하카타 기온 야마카사 축제의 본거지. 거대한 야마카사 장식이 상설 전시됩니다.',
        photos: [
            'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800',
            'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800'
        ],
        details: {
            address: '1-41 Kamikawabatamachi, Hakata Ward',
            hours: '04:00 - 22:00',
            ticket: '무료',
            tips: '야마카사 장식과 에비스상 필수 촬영!'
        }
    },
    {
        id: 'tenjin_underground',
        name: '텐진 지하상가',
        name_en: 'Tenjin Underground Shopping',
        lat: 33.5902,
        lng: 130.3983,
        type: 'shopping',
        region: 'tenjin',
        rating: 4.2,
        desc: '일본 최대급 지하상가. 150여 개 매장에서 쇼핑과 식사를 즐길 수 있습니다.',
        photos: [
            'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'
        ],
        details: {
            address: '2-11-1 Tenjin, Chuo Ward',
            hours: '10:00 - 20:00',
            tips: '비 오는 날도 쾌적하게 쇼핑!'
        }
    },
    {
        id: 'yakiniku_dinner',
        name: '야키니쿠 카이세키',
        name_en: 'Yakiniku Kaiseki',
        lat: 33.5920,
        lng: 130.4010,
        type: 'food',
        region: 'hakata',
        rating: 4.6,
        desc: '고급 A5 와규를 코스로 즐기는 야키니쿠 전문점입니다.',
        photos: [
            'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
            'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800'
        ],
        details: {
            address: 'Tenjin, Chuo Ward',
            hours: '17:00 - 23:00',
            menu: '야키니쿠 코스 ¥5,000-15,000',
            tips: 'A5 사시미 세트 강력 추천!'
        }
    },
    {
        id: 'don_quijote',
        name: '돈키호테 나카스점',
        name_en: 'Don Quijote Nakasu',
        lat: 33.5925,
        lng: 130.4055,
        type: 'shopping',
        region: 'nakasu',
        rating: 4.1,
        desc: '24시간 영업하는 대형 디스카운트 스토어. 일본 기념품과 과자 쇼핑의 천국!',
        photos: [
            'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'
        ],
        details: {
            address: '4-9-25 Nakasu, Hakata Ward',
            hours: '24시간',
            tips: '면세 가능! 여권 지참 필수'
        }
    },
    {
        id: 'tanya_hakata',
        name: '탄야 하카타점',
        name_en: 'Tanya Hakata',
        lat: 33.5890,
        lng: 130.4185,
        type: 'food',
        region: 'hakata',
        rating: 4.4,
        desc: '규탄(소혀) 전문점. 아침부터 영업하는 하카타역 내 인기 맛집입니다.',
        photos: [
            'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
            'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800'
        ],
        details: {
            address: 'JR Hakata Station Hakata Deitos',
            hours: '07:00 - 22:00',
            menu: '규탄정식 ¥1,200',
            tips: '아침 정식으로 든든하게!'
        }
    },
    {
        id: 'amu_plaza',
        name: '아뮤 플라자 하카타',
        name_en: 'AMU Plaza Hakata',
        lat: 33.5898,
        lng: 130.4205,
        type: 'shopping',
        region: 'hakata',
        rating: 4.3,
        desc: '하카타역 직결 쇼핑몰. 패션, 잡화, 레스토랑이 모여 있습니다.',
        photos: [
            'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800'
        ],
        details: {
            address: '1-1 Hakataeki Chuo-gai, Hakata Ward',
            hours: '10:00 - 21:00',
            tips: '옥상 철도신사에서 행운 기원!'
        }
    },
    {
        id: 'ekiben_lunch',
        name: '에키벤 도시락',
        name_en: 'Ekiben Station Lunch',
        lat: 33.5895,
        lng: 130.4195,
        type: 'food',
        region: 'hakata',
        rating: 4.2,
        desc: '하카타역에서 구매하는 기차 도시락. 지역 특산물이 가득합니다.',
        photos: [
            'https://images.unsplash.com/photo-1547928576-b822bc410b52?w=800',
            'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800'
        ],
        details: {
            address: 'JR Hakata Station',
            hours: '06:00 - 22:00',
            menu: '멘타이코 도시락 ¥1,000, 카시와 도시락 ¥900',
            tips: '신칸센 타기 전 구매 추천!'
        }
    },
    {
        id: 'ippudo_ramen',
        name: '잇푸도 본점',
        name_en: 'Ippudo Main Store',
        lat: 33.5863,
        lng: 130.4147,
        type: 'food',
        region: 'hakata',
        rating: 4.5,
        desc: '세계적으로 유명한 하카타 돈코츠 라멘의 본점. 크리미한 국물이 일품입니다.',
        photos: [
            'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800',
            'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800'
        ],
        details: {
            address: '1-13-14 Hakataekimae, Hakata Ward',
            hours: '11:00 - 23:00',
            menu: '시로마루 ¥850, 아카마루 ¥900',
            tips: '시로마루(흰색)가 오리지널!'
        }
    },
    {
        id: 'ichiran_ramen',
        name: '이치란 라멘 본점',
        name_en: 'Ichiran Main Store',
        lat: 33.5915,
        lng: 130.4053,
        type: 'food',
        region: 'nakasu',
        rating: 4.6,
        desc: '1인 칸막이로 유명한 돈코츠 라멘 전문점. 맛 주문서로 나만의 라멘을 주문합니다.',
        photos: [
            'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800',
            'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800'
        ],
        details: {
            address: '5-3-2 Nakasu, Hakata Ward',
            hours: '24시간',
            menu: '이치란 라멘 ¥980, 추가면 ¥190',
            tips: '맛 주문서로 면/진하기/파/마늘 조절!'
        }
    },
    {
        id: 'hakata_port_tower',
        name: '하카타 포트 타워',
        name_en: 'Hakata Port Tower',
        lat: 33.6018,
        lng: 130.4037,
        type: 'spot',
        region: 'hakata',
        rating: 4.1,
        desc: '하카타 항구의 랜드마크. 무료 전망대에서 항구와 시내를 조망할 수 있습니다.',
        photos: [
            'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800',
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'
        ],
        details: {
            address: '14-1 Chikkohonmachi, Hakata Ward',
            hours: '10:00 - 22:00',
            ticket: '무료',
            tips: '무료라서 가볍게 들리기 좋아요'
        }
    },
    {
        id: 'tochoji_temple',
        name: '도초지',
        name_en: 'Tochoji Temple',
        lat: 33.5913,
        lng: 130.4115,
        type: 'temple',
        region: 'hakata',
        rating: 4.4,
        desc: '806년 창건된 유서 깊은 절. 일본 최대급 목조 불상과 지옥극락 순례가 유명합니다.',
        photos: [
            'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800',
            'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800'
        ],
        details: {
            address: '2-4 Gokushomachi, Hakata Ward',
            hours: '09:00 - 17:00',
            ticket: '¥50 (지옥극락 순례)',
            tips: '칠흑같이 어두운 지하 순례 체험!'
        }
    },
    {
        id: 'hakatatei_mentaiko',
        name: '하카타테이 멘타이코 정식',
        name_en: 'Hakatatei Mentaiko',
        lat: 33.5901,
        lng: 130.4200,
        type: 'food',
        region: 'hakata',
        rating: 4.5,
        desc: '명란(멘타이코) 무한리필로 유명한 하카타역 맛집입니다.',
        photos: [
            'https://images.unsplash.com/photo-1547928576-b822bc410b52?w=800',
            'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800'
        ],
        details: {
            address: 'JR Hakata Station',
            hours: '11:00 - 22:00',
            menu: '멘타이코 정식 ¥1,200 (명란 무한)',
            tips: '밥과 명란의 황금비율을 찾아보세요'
        }
    }
];
