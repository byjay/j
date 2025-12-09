function initFukuokaTrip() {
    // ==========================================================================
    //  ✨ HIGH FIDELITY DATABASE: FUKUOKA (CLONED FROM GUIDE)
    // ==========================================================================
    const POI_DATABASE = [
        // Day 1: Arrival & City Tour
        {
            id: "fukuoka_airport",
            name: "후쿠오카 공항",
            lat: 33.5859,
            lng: 130.4501,
            type: "transport",
            region: "hakata",
            rating: 4.0,
            desc: "후쿠오카의 관문. 시내와 매우 가까워 이동이 편리합니다.",
            photos: ["https://images.unsplash.com/photo-1570697767926-9e66f1e3d970?w=800"],
            details: {
                info: "국제선 터미널에서 하카타역까지 버스나 지하철로 약 15분 소요됩니다.",
                transport: "지하철/버스",
                tips: "산큐패스를 미리 구매했다면 공항 카운터에서 도장을 받으세요."
            }
        },
        {
            id: "oriental_hotel",
            name: "오리엔탈 호텔 후쿠오카",
            lat: 33.5900,
            lng: 130.4200, // Approx
            type: "hotel",
            region: "hakata",
            rating: 4.5,
            desc: "하카타역 치쿠시구치 도보 1분 거리의 위치 최강 호텔.",
            photos: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"], // Placeholder hotel image
            details: {
                info: "체크인 전/후 짐 보관 서비스가 훌륭합니다. 로비가 넓고 쾌적해요.",
                transport: "하카타역 도보 1분",
                tips: "조식이 맛있기로 유명하니 꼭 신청하세요."
            }
        },
        {
            id: "shinshin_ramen",
            name: "하카타 라멘 신신",
            lat: 33.5910,
            lng: 130.4210, // Approx
            type: "food",
            region: "hakata",
            rating: 4.6,
            desc: "동방신기 등 유명 연예인들도 줄 서서 먹는다는 돈코츠 라멘 맛집.",
            photos: ["https://images.unsplash.com/photo-1580442151529-343f2f6e0e27?w=800"],
            details: {
                info: "진하지만 잡내 없는 깔끔한 국물이 특징입니다. 교자 세트를 추천해요.",
                transport: "하카타역 데이토스 2층",
                tips: "식사 시간에는 대기가 기니 오픈런을 추천합니다."
            }
        },
        {
            id: "ohori_park",
            name: "오호리 공원",
            lat: 33.5860,
            lng: 130.3764,
            type: "spot",
            region: "central",
            rating: 4.7,
            desc: "후쿠오카 시민들의 휴식처. 큰 호수를 끼고 산책하기 좋습니다.",
            photos: ["https://images.unsplash.com/photo-1624672666964-e49d7a4c4d58?w=800"],
            details: {
                info: "호수 가운데 섬들이 다리로 연결되어 있어 건너볼 수 있습니다. 스타벅스 컨셉스토어도 있어요.",
                transport: "지하철 오호리코엔역",
                tips: "해 질 녘에 방문하면 호수에 비친 노을이 정말 아름답습니다."
            }
        },
        {
            id: "momochi_seaside",
            name: "모모치 해변 공원",
            lat: 33.5930,
            lng: 130.3515,
            type: "spot",
            region: "bay",
            rating: 4.5,
            desc: "이국적인 분위기의 인공 해변. 후쿠오카 타워 바로 앞입니다.",
            photos: ["https://images.unsplash.com/photo-1605270960538-420032c2569f?w=800"],
            details: {
                info: "유럽풍 건물인 마리존 예식장이 있어 사진 명소로 유명합니다.",
                transport: "버스 (후쿠오카 타워 남구 하차)",
                tips: "해변 모래사장에서 후쿠오카 타워를 배경으로 사진을 찍어보세요."
            }
        },
        {
            id: "fukuoka_tower",
            name: "후쿠오카 타워",
            lat: 33.5932,
            lng: 130.3515,
            type: "spot",
            region: "bay",
            rating: 4.4,
            desc: "후쿠오카의 랜드마크. 234m 높이에서 시내와 바다를 조망할 수 있습니다.",
            photos: ["https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=800"],
            details: {
                info: "계절마다 바뀌는 일루미네이션이 볼거리입니다. 외국인 여권 제시 시 할인됩니다.",
                transport: "버스 (후쿠오카 타워 남구 하차)",
                tips: "야경도 멋지지만, 맑은 날 낮에 보는 바다 뷰도 환상적입니다."
            }
        },
        {
            id: "motsunabe_rakutenchi",
            name: "모츠나베 라쿠텐치",
            lat: 33.5920,
            lng: 130.4000, // Approx
            type: "food",
            region: "tenjin",
            rating: 4.3,
            desc: "후쿠오카 소울푸드 모츠나베(곱창전골)의 원조격 맛집.",
            photos: ["https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800"],
            details: {
                info: "산더미처럼 쌓아주는 부추가 인상적입니다. 짬뽕면 사리는 필수!",
                transport: "텐진역 도보 5분",
                tips: "국물이 졸아들면 육수 추가를 요청하세요."
            }
        },
        {
            id: "nakasu_yatai",
            name: "나카스 포장마차 거리",
            lat: 33.5915,
            lng: 130.4085,
            type: "spot",
            region: "nakasu",
            rating: 4.0,
            desc: "강변을 따라 늘어선 포장마차들이 낭만적인 분위기를 자아냅니다.",
            photos: ["https://images.unsplash.com/photo-1576675784201-0e142b423952?w=800"],
            details: {
                info: "라멘, 오뎅, 꼬치 등 다양한 안주를 팝니다. 현지인들과 어울리기 좋아요.",
                transport: "나카스카와바타역 도보 7분",
                tips: "가격이 조금 비쌀 수 있으니 메뉴판 가격을 잘 확인하세요. 분위기만 즐겨도 좋습니다."
            }
        },

        // Day 2: Yufuin Bus Tour
        {
            id: "yufuin_tour_start",
            name: "유후인 버스투어 집결",
            lat: 33.5900,
            lng: 130.4200,
            type: "transport",
            region: "hakata",
            rating: 0,
            desc: "하카타역 오리엔탈 호텔 1층 로손 편의점 앞 미팅.",
            photos: ["https://images.unsplash.com/photo-1540573133985-87b6da6dce60?w=800"],
            details: {
                info: "가이드님이 깃발을 들고 계십니다. 늦지 않게 도착해주세요.",
                transport: "하카타역 치쿠시구치",
                tips: "버스 이동 시간이 기니 멀미약을 챙기면 좋습니다."
            }
        },
        {
            id: "dazaifu",
            name: "다자이후 텐만구",
            lat: 33.5215,
            lng: 130.5349,
            type: "spot",
            region: "suburb",
            rating: 4.6,
            desc: "학문의 신을 모시는 신사. 합격 기원 명소로 유명합니다.",
            photos: ["https://images.unsplash.com/photo-1565597989343-424472289457?w=800"],
            details: {
                info: "입구의 '소 동상'을 만지면 머리가 좋아진다는 전설이 있습니다.",
                transport: "투어 버스 이용",
                tips: "참배길(오모테산도)에서 파는 '우메가에모치(매화떡)'를 꼭 드셔보세요."
            }
        },
        {
            id: "yufuin_village",
            name: "유후인 플로럴 빌리지",
            lat: 33.2650,
            lng: 131.3600,
            type: "spot",
            region: "suburb",
            rating: 4.4,
            desc: "동화 속 마을처럼 꾸며진 아기자기한 상점가.",
            photos: ["https://images.unsplash.com/photo-1549643276-fbc2bd5f5f56?w=800"],
            details: {
                info: "지브리 샵, 동물원 등 볼거리가 많습니다. 사진 찍기 정말 예뻐요.",
                transport: "투어 버스 이용",
                tips: "염소와 다람쥐 등 귀여운 동물들에게 먹이 주기 체험도 가능합니다."
            }
        },
        {
            id: "kinrin_lake",
            name: "긴린코 호수",
            lat: 33.2660,
            lng: 131.3650,
            type: "spot",
            region: "suburb",
            rating: 4.5,
            desc: "바닥에서 온천수와 지하수가 솟아나 안개가 자욱한 신비로운 호수.",
            photos: ["https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800"],
            details: {
                info: "호수 물고기 비늘이 석양에 금빛으로 빛난다고 해서 '긴린코'라 불립니다.",
                transport: "유후인역에서 도보 20분",
                tips: "이른 아침 물안개가 피어오를 때가 가장 아름답습니다."
            }
        },
        {
            id: "yufumabushi_shin",
            name: "유후마부시 신",
            lat: 33.2640,
            lng: 131.3580,
            type: "food",
            region: "suburb",
            rating: 4.7,
            desc: "유후인 최고의 맛집. 소고기, 장어, 닭고기 덮밥(마부시) 전문점.",
            photos: ["https://images.unsplash.com/photo-1553621042-f6e147245754?w=800"],
            details: {
                info: "뚝배기에 나오는 덮밥을 세 가지 방법(그냥, 양념, 육수)으로 즐겨보세요.",
                transport: "긴린코 호수 근처 본점",
                tips: "웨이팅이 엄청나니 투어 자유시간 시작하자마자 달려가세요!"
            }
        },
        {
            id: "kamado_jigoku",
            name: "벳푸 가마도 지옥",
            lat: 33.3150,
            lng: 131.4850,
            type: "spot",
            region: "suburb",
            rating: 4.3,
            desc: "펄펄 끓는 온천수가 솥(가마도)을 닮았다고 해서 붙여진 이름.",
            photos: ["https://images.unsplash.com/photo-1573126617899-41f1dff52502?w=800"],
            details: {
                info: "담배 연기를 불어넣으면 수증기가 폭발하는 쇼가 재미있습니다.",
                transport: "투어 버스 이용",
                tips: "온천 달걀과 라무네(사이다)는 필수 코스! 족욕 체험도 잊지 마세요."
            }
        },

        // Day 3: Hakata & Tenjin Shopping
        {
            id: "sumiyoshi_shrine",
            name: "스미요시 신사",
            lat: 33.5865,
            lng: 130.4135,
            type: "spot",
            region: "hakata",
            rating: 4.2,
            desc: "규슈 전체 스미요시 신사의 시조. 고즈넉한 산책 명소.",
            photos: ["https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=800"],
            details: {
                info: "도심 속에 있지만 숲이 우거져 있어 조용하고 평화롭습니다.",
                transport: "하카타역 도보 10분",
                tips: "아침 산책 코스로 추천합니다. 붉은색 본전 건물이 인상적이에요."
            }
        },
        {
            id: "canal_city",
            name: "캐널시티 하카타",
            lat: 33.5895,
            lng: 130.4110,
            type: "spot",
            region: "hakata",
            rating: 4.5,
            desc: "운하가 흐르는 거대한 복합 쇼핑몰. 쇼핑과 엔터테인먼트의 천국.",
            photos: ["https://images.unsplash.com/photo-1559067515-bf7d799b6d4d?w=800"],
            details: {
                info: "매 정시마다 열리는 분수쇼가 하이라이트입니다. 프랑프랑, 디즈니스토어 등이 있어요.",
                transport: "하카타역/텐진역 도보 10-15분",
                tips: "밤에는 분수쇼에 3D 매핑 영상이 더해져 더욱 화려합니다."
            }
        },
        {
            id: "beef_tongue_lunch",
            name: "우설 구이 정식",
            lat: 33.5895,
            lng: 130.4110, // In Canal City
            type: "food",
            region: "hakata",
            rating: 4.4,
            desc: "쫄깃하고 고소한 소 혀 구이. 후쿠오카의 별미.",
            photos: ["https://images.unsplash.com/photo-1594040291635-a88bd4854cd0?w=800"],
            details: {
                info: "얇게 썬 우설을 숯불에 구워 파와 함께 먹으면 꿀맛입니다.",
                transport: "캐널시티 내 식당가",
                tips: "밥 리필이 가능한 곳이 많으니 든든하게 드세요."
            }
        },
        {
            id: "kushida_shrine",
            name: "구시다 신사",
            lat: 33.5930,
            lng: 130.4105,
            type: "spot",
            region: "hakata",
            rating: 4.1,
            desc: "하카타의 수호신을 모시는 신사. 명성황후 시해 칼이 보관된 곳으로도 알려져 있습니다.",
            photos: ["https://images.unsplash.com/photo-1599579178553-527395634543?w=800"],
            details: {
                info: "7월 마츠리(축제) 때 사용되는 거대한 가마(야마카사)가 전시되어 있습니다.",
                transport: "캐널시티 바로 옆",
                tips: "역사적인 의미를 되새기며 둘러보시길 권합니다."
            }
        },
        {
            id: "yakiniku_dinner",
            name: "야키니쿠 타베호다이",
            lat: 33.5915,
            lng: 130.4010, // Near Tenjin
            type: "food",
            region: "tenjin",
            rating: 4.6,
            desc: "일본식 숯불 고기 구이 무한리필(타베호다이)로 배터지게!",
            photos: ["https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800"],
            details: {
                info: "와규를 포함한 다양한 부위를 마음껏 즐길 수 있습니다. 노미호다이(음료 무제한)도 추가 가능.",
                transport: "텐진역 주변",
                tips: "인기 맛집은 예약 필수입니다. 우설부터 시작해서 갈비, 로스 순으로 드세요."
            }
        },
        {
            id: "don_quijote",
            name: "돈키호테 나카스점",
            lat: 33.5935,
            lng: 130.4080,
            type: "spot",
            region: "nakasu",
            rating: 4.2,
            desc: "없는 게 없는 만물상. 일본 여행 쇼핑의 성지.",
            photos: ["https://images.unsplash.com/photo-1598556776374-2c6cb2060852?w=800"],
            details: {
                info: "의약품, 화장품, 간식, 캐릭터 굿즈 등 기념품 사기에 최적입니다. 24시간 영업.",
                transport: "나카스카와바타역",
                tips: "5,500엔 이상 구매 시 면세 혜택을 받을 수 있습니다. 여권을 꼭 챙기세요."
            }
        },

        // Day 4: Last Shopping & Departure
        {
            id: "tanya_hakata",
            name: "탄야 하카타",
            lat: 33.5900,
            lng: 130.4205,
            type: "food",
            region: "hakata",
            rating: 4.4,
            desc: "하카타역 지하 1번가의 가성비 최고의 우설 조식 맛집.",
            photos: ["https://images.unsplash.com/photo-1606509653193-4b6b69b2447e?w=800"],
            details: {
                info: "아침 한정 메뉴인 우설 정식이 저렴하고 맛있습니다. 밥과 국이 무한리필!",
                transport: "하카타역 지하 1번가",
                tips: "아침 7시 오픈인데 줄이 깁니다. 조금 서두르세요."
            }
        },
        {
            id: "amu_plaza",
            name: "아뮤 플라자 하카타",
            lat: 33.5900,
            lng: 130.4205,
            type: "spot",
            region: "hakata",
            rating: 4.5,
            desc: "하카타역과 연결된 대형 쇼핑몰. 마지막 쇼핑 찬스.",
            photos: ["https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800"],
            details: {
                info: "도큐핸즈, 포켓몬센터 등이 입점해 있습니다. 옥상 정원 전망도 좋아요.",
                transport: "하카타역 직결",
                tips: "1층 인포메이션에서 외국인 할인 쿠폰을 받을 수 있는지 확인해보세요."
            }
        },
        {
            id: "ekiben_lunch",
            name: "하카타역 에키벤",
            lat: 33.5900,
            lng: 130.4205,
            type: "food",
            region: "hakata",
            rating: 4.2,
            desc: "기차역 도시락(에키벤)을 사서 공항 가는 길이나 공항에서 즐기기.",
            photos: ["https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800"],
            details: {
                info: "명란 도시락, 스테이크 도시락 등 종류가 엄청납니다. 고르는 재미가 있어요.",
                transport: "하카타역 내 도시락 매장",
                tips: "인기 도시락은 금방 품절되니 미리 구매하세요."
            }
        },

        // =======================================
        // 🍽️ DETAILED FUKUOKA RESTAURANT DATA
        // =======================================
        {
            id: "gyukatsu_motomura",
            name: "규카츠 모토무라 후쿠오카 파르코점",
            name_en: "Gyukatsu Motomura Fukuoka Parco",
            lat: 33.5890, lng: 130.4010,
            type: "food", region: "tenjin", rating: 4.9,
            desc: "후쿠오카 파르코점 규카츠 모토무라는 환상적인 규카츠 경험을 선사합니다. 미디움레어로 제공되어 개인 화로에서 원하는 굽기로 조리할 수 있습니다.",
            photos: [
                "https://images.unsplash.com/photo-1544025162-d76978b8e4ca?w=800",
                "https://images.unsplash.com/photo-1504973960431-1c467e159aa4?w=800"
            ],
            details: {
                info: "부드럽고 풍미 가득한 소고기는 다양한 소스와 반찬과 어우러져 즐거운 미식 경험을 선사합니다.",
                transport: "후쿠오카 파르코 신관 B2F",
                tips: "피크 시간 대기줄 예상. 개인 화로에서 원하는 굽기로 조리 가능.",
                menu: "규카츠 130g 세트 ¥1,600 / 260g 세트 ¥2,600 / 마 추가 ¥100 / 명란 추가 ¥150",
                hours: "매일 11:00-22:00"
            }
        },
        {
            id: "mizutaki_toriden",
            name: "하카타 미즈타키 토리덴",
            name_en: "Hakata Mizutaki Toriden",
            lat: 33.5915, lng: 130.4082,
            type: "food", region: "nakasu", rating: 4.3,
            desc: "정통 하카타 미즈타키. 맑으면서도 놀랍도록 진한 닭 육수가 일품입니다. 부드러운 닭고기, 신선한 채소, 수제 닭 완자가 일품.",
            photos: [
                "https://images.unsplash.com/photo-1534938665420-4193effeacc4?w=800",
                "https://images.unsplash.com/photo-1547928576-a4a33237cbc3?w=800"
            ],
            details: {
                info: "우아한 분위기와 세심한 서비스. 후쿠오카 현지 요리를 맛보고 싶은 분들에게 추천.",
                transport: "시모카와바타마치, 하카타구",
                tips: "저녁 예약 필수. 마지막에 죽이나 짬뽕면 추가 주문.",
                menu: "미즈타키 코스 ¥4,000~/인 / 닭튀김 ¥800 / 잡채 ¥500 / 츠쿠네 ¥700",
                hours: "매일 11:30-23:00"
            }
        },
        {
            id: "hyotan_sushi",
            name: "효탄 스시",
            name_en: "Hyotan Sushi",
            lat: 33.5895, lng: 130.4012,
            type: "food", region: "tenjin", rating: 4.2,
            desc: "합리적인 가격에 신선하고 고품질의 스시로 유명. 정통 일본식 스시 경험을 카운터에서 즐길 수 있습니다.",
            photos: [
                "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800",
                "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800"
            ],
            details: {
                info: "숙련된 셰프의 솜씨로 섬세하게 만들어지는 스시. 런치 세트 추천.",
                transport: "텐진 신텐가쿠빌딩 2층",
                tips: "점심시간 대기 예상. 오픈 직후 방문 추천. 카운터석에서 셰프 관람 가능.",
                menu: "니기리 세트 ¥2,000~ / 사시미 모듬 ¥1,800~ / 테마키 ¥500~/개 / 생선구이 ¥1,500~",
                hours: "매일 11:30-14:30, 17:00-20:30"
            }
        },
        {
            id: "hakata_issou",
            name: "하카타 잇소우 본점",
            name_en: "Hakata Issou Honten",
            lat: 33.5908, lng: 130.4230,
            type: "food", region: "hakata", rating: 4.0,
            desc: "독특한 '거품' 돈코츠 육수로 유명. 믿을 수 없을 정도로 진하고 크리미한 맛이 일품인 하카타 라멘.",
            photos: [
                "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800",
                "https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=800"
            ],
            details: {
                info: "정통 돈코츠 특유의 진한 맛. 면 익힘 정도 선택 가능 (카타메=꼬들꼬들).",
                transport: "하카타역 히가시 3-1-6",
                tips: "현금 준비. 점심/저녁 대기 예상. 교자 추가 추천.",
                menu: "돈코츠라멘 ¥800 / 스페셜라멘 ¥1,100 / 교자 5개 ¥350 / 카에다마 ¥150",
                hours: "매일 11:00-24:00"
            }
        },
        {
            id: "tempura_hirao",
            name: "텐푸라 히라오 본점",
            name_en: "Tempura Hirao Honten",
            lat: 33.5750, lng: 130.4350,
            type: "food", region: "hakata", rating: 4.4,
            desc: "눈앞에서 바로 튀겨주는 신선한 튀김. 무료 절임 채소와 함께 최고의 바삭함을 즐길 수 있습니다.",
            photos: [
                "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800",
                "https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=800"
            ],
            details: {
                info: "갓 튀겨져 나오는 바삭한 튀김. 무료 매콤 갓절임 무한리필이 별미.",
                transport: "히가시히라오 2-4-1, 하카타구",
                tips: "현금만 가능. 식권자판기에서 구매 후 착석. 기다림 각오.",
                menu: "히라오세트 ¥1,100 / 새우튀김 ¥200/개 / 오징어튀김 ¥150/개 / 야채튀김 ¥100~/개",
                hours: "매일 10:30-20:00"
            }
        },
        {
            id: "yoshizuka_unagi",
            name: "요시즈카 우나기야",
            name_en: "Yoshizuka Unagiya",
            lat: 33.5922, lng: 130.4085,
            type: "food", region: "nakasu", rating: 4.4,
            desc: "부드럽게 구워진 장어는 달콤 짭짤한 소스와 완벽하게 어우러져 푹신한 밥 위에. 전통적인 일본식 분위기.",
            photos: [
                "https://images.unsplash.com/photo-1619221882220-947b3d3c8861?w=800",
                "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=800"
            ],
            details: {
                info: "진한 장어 풍미와 부드러운 식감. 세심하고 정중한 서비스.",
                transport: "나카스 2-8-27, 하카타구",
                tips: "현금만 가능! 점심/저녁 대기 예상. 인기 많음.",
                menu: "우나쥬 스탠다드 ¥3,000 / 우나쥬 디럭스 ¥4,500 / 시라야키 ¥2,800 / 키모야키 ¥800",
                hours: "월,목-일 10:00-21:00 / 화,수 휴무"
            }
        },
        {
            id: "sushi_kakujuan",
            name: "스시 카쿠쥬안",
            name_en: "Sushi Kakujuan",
            lat: 33.5930, lng: 130.4140,
            type: "food", region: "hakata", rating: 4.9,
            desc: "섬세하고 정통적인 스시 경험. 제철 재료와 완벽한 기술로 만들어진 스시 한 점이 예술 작품.",
            photos: [
                "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800",
                "https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800"
            ],
            details: {
                info: "고요하고 친밀한 분위기. 셰프와의 교감을 통한 오마카세 경험.",
                transport: "카미고후쿠마치 11-7, 하카타구",
                tips: "예약 필수! 제한된 좌석으로 인기 많음.",
                menu: "오마카세 ¥6,000~ / 니기리 모듬 ¥3,000 / 사시미 플레이트 ¥2,500",
                hours: "월-토 17:30-23:00 / 일요일 휴무"
            }
        },
        {
            id: "chikae",
            name: "치카에",
            name_en: "Chikae",
            lat: 33.5882, lng: 130.3975,
            type: "food", region: "tenjin", rating: 4.3,
            desc: "상징적인 중앙 수조가 돋보이는 웅장한 분위기의 해산물 레스토랑. 점심 정식 가성비 탁월.",
            photos: [
                "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=800",
                "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800"
            ],
            details: {
                info: "신선한 재료를 정교하게 준비. 섬세한 사시미부터 완벽한 생선구이까지.",
                transport: "다이묘 2-2-17, 츄오구",
                tips: "점심 정식(테이쇼쿠) 추천. 저녁은 예약 권장.",
                menu: "점심 정식 ¥2,000~3,000 / 카이세키 코스 ¥8,000~15,000 / 사시미 플래터 ¥5,000 / 튀김 모듬 ¥3,000",
                hours: "월-금 17:00-22:00 / 토,일 11:30-15:00, 17:00-22:00 (일요일은 21:00까지)"
            }
        },
        {
            id: "sushi_sakai",
            name: "스시 사카이",
            name_en: "Sushi Sakai",
            lat: 33.5925, lng: 130.4050,
            type: "food", region: "nakasu", rating: 4.7,
            desc: "일본 요리의 정수를 보여주는 특별한 오마카세 스시. 엄선된 제철 생선과 셰프의 장인정신이 깃든 예술 작품.",
            photos: [
                "https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=800",
                "https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800"
            ],
            details: {
                info: "고요하고 집중된 분위기. 셰프의 기술과 최상급 재료의 조화.",
                transport: "니시나카스 3-20, 츄오구 LANE라운드빌딩 2F",
                tips: "사전 예약 필수! 스마트 캐주얼 복장 권장.",
                menu: "오마카세 런치 ¥15,000~25,000 / 오마카세 디너 ¥30,000~45,000 / 사케 페어링 ¥8,000~15,000",
                hours: "화,금 18:00-22:30 / 수,목 11:00-15:30, 18:00-22:30 / 토 11:00-15:30, 17:00-21:30 / 월,일 휴무"
            }
        },
        {
            id: "monja_tamatoya",
            name: "츠키시마 몬자 타마토야 텐진",
            name_en: "Tsukishima Monja Tamatoya Tenjin",
            lat: 33.5905, lng: 130.4000,
            type: "food", region: "tenjin", rating: 4.8,
            desc: "맛있는 몬자야키와 상호작용적인 식사 경험. 테이블 그릴에서 직접 요리하는 즐거움.",
            photos: [
                "https://images.unsplash.com/photo-1534959545608-6d6619fdce34?w=800",
                "https://images.unsplash.com/photo-1521133573892-e44906baee46?w=800"
            ],
            details: {
                info: "활기찬 분위기. 친구나 가족과 즐기기 좋음. 친절한 직원이 요리법 안내.",
                transport: "텐진 1-11-11, 츄오구",
                tips: "처음이면 직원에게 요리법 문의. 맥주와 함께 추천.",
                menu: "명란 모치 치즈 몬자 ¥1,500 / 해산물 몬자 ¥1,800 / 돼지김치 몬자 ¥1,400 / 오코노미야키 ¥1,200 / 야끼소바 ¥1,000",
                hours: "매일 11:00-23:00"
            }
        },
        {
            id: "miyachiku_steak",
            name: "미야치쿠 스테이크",
            name_en: "Miyachiku Steak",
            lat: 33.5928, lng: 130.4098,
            type: "food", region: "nakasu", rating: 4.5,
            desc: "데판야키 스타일의 미야자키 소고기. 입안에서 녹아내리는 환상적인 마블링과 부드러움.",
            photos: [
                "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800",
                "https://images.unsplash.com/photo-1558030006-450675393462?w=800"
            ],
            details: {
                info: "숙련된 셰프의 철판 위 예술적 조리. 세련된 분위기와 완벽한 서비스.",
                transport: "나카스 5-2-1, 하카타구 제이파크나카스빌딩 2F",
                tips: "테판야키 카운터석 사전 예약 추천. 셰프의 쇼를 즐기세요.",
                menu: "미야자키규 런치 코스 ¥6,000~ / 디너 코스 ¥12,000~ / 안심 스테이크 ¥7,000~ / 등심 스테이크 ¥6,500~",
                hours: "매일 11:00-15:00, 17:00-22:00"
            }
        },
        {
            id: "imuri",
            name: "이무리",
            name_en: "Imuri",
            lat: 33.5850, lng: 130.3920,
            type: "food", region: "tenjin", rating: 4.4,
            desc: "창의적인 일본 요리와 테라스 도시 전망. 제철 식재료의 풍미가 섬세하게 살아있는 파인 다이닝.",
            photos: [
                "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=800",
                "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800"
            ],
            details: {
                info: "전통 일본 기술과 현대적 요리 예술의 융합. 특별한 날에 완벽.",
                transport: "타니 1-3-15, 츄오구",
                tips: "테라스석 요청 (특히 일몰 시간). 점심/저녁 모두 예약 필수.",
                menu: "시즌 오마카세 런치 ¥8,000~12,000 / 디너 ¥15,000~25,000 / 규슈 와규 스테이크 시가 / 계절 사시미 시가",
                hours: "월,수-토 11:30-14:30, 17:00-23:00 / 화 17:00-23:00 / 금-토 점심+17:00-24:00 / 일 11:30-14:30, 17:00-23:00"
            }
        },

        // =======================================
        // 🛍️ FUKUOKA SHOPPING CENTERS
        // =======================================
        {
            id: "canal_city_hakata",
            name: "캐널시티 하카타",
            name_en: "Canal City Hakata",
            lat: 33.5895, lng: 130.4110,
            type: "shopping", region: "hakata", rating: 4.5,
            desc: "중앙을 가로지르는 독특한 운하와 역동적인 분수 쇼로 유명한 활기찬 쇼핑 및 엔터테인먼트 복합 시설.",
            photos: [
                "https://images.unsplash.com/photo-1542931287-023b922fa89b?w=800",
                "https://images.unsplash.com/photo-1523475496153-3d6cc0f0bf19?w=800"
            ],
            details: {
                info: "인기 패션 브랜드부터 독특한 기념품 가게까지 다양한 상점. 라멘 스타디움에서 다양한 지역 라멘 맛보기.",
                transport: "스미요시 1-2-2, 하카타구",
                tips: "매 정시마다 열리는 역동적인 분수쇼 감상 필수! 평일 방문 추천.",
                menu: "일본 패션 브랜드, 국제 브랜드, 라멘 스타디움, 캐릭터 굿즈, 테마 카페",
                hours: "10:00-21:00"
            }
        },
        {
            id: "tenjin_underground",
            name: "텐진 지하상가",
            name_en: "Tenjin Underground Shopping Center",
            lat: 33.5915, lng: 130.4010,
            type: "shopping", region: "tenjin", rating: 4.2,
            desc: "주요 백화점과 지하철 노선을 연결하는 유럽풍 건축 디자인의 거대한 지하 쇼핑 공간.",
            photos: [
                "https://images.unsplash.com/photo-1519810755548-39cd217da494?w=800",
                "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800"
            ],
            details: {
                info: "최신 유행 패션부터 화장품, 기념품까지 150여 개 점포. 비 오는 날 쇼핑에 최적.",
                transport: "지하철 텐진역 직결",
                tips: "백화점과 지하철역을 직접 연결. 독특한 로컬 부티크와 카페 발견 가능.",
                menu: "여성패션 ¥2,000~15,000 / 액세서리 ¥1,000~8,000 / 화장품 ¥1,500~10,000",
                hours: "10:00-20:00"
            }
        },
        {
            id: "jr_hakata_city",
            name: "JR 하카타 시티 아뮤 플라자",
            name_en: "JR Hakata City Amu Plaza",
            lat: 33.5900, lng: 130.4205,
            type: "shopping", region: "hakata", rating: 4.4,
            desc: "하카타역과 연결된 대형 쇼핑 복합몰. 옥상 정원에서 파노라마 도시 전망 감상 가능.",
            photos: [
                "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800",
                "https://images.unsplash.com/photo-1519420573924-65fcd45245f8?w=800"
            ],
            details: {
                info: "패션, 전자제품, 전문점 등 다양한 상점. '쿠텐' 식당가에서 훌륭한 식사.",
                transport: "하카타역 직결",
                tips: "옥상 정원 '츠바메노모리 히로바'에서 야경 필수! 어린이 열차도 운행.",
                menu: "트렌드 패션 ¥4,000~25,000 / 전자기기 ¥5,000~50,000 / 기념품 ¥500~4,000",
                hours: "상점 10:00-21:00 / 식당 11:00-23:00"
            }
        },
        {
            id: "fukuoka_mitsukoshi",
            name: "후쿠오카 미츠코시",
            name_en: "Fukuoka Mitsukoshi",
            lat: 33.5910, lng: 130.4015,
            type: "shopping", region: "tenjin", rating: 4.1,
            desc: "텐진 중심부의 명문 백화점. 세련되고 고급스러운 쇼핑 경험. 지하 식품관 '데파치카' 필수.",
            photos: [
                "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800",
                "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800"
            ],
            details: {
                info: "고급 패션, 화장품, 정교한 생활용품. 일본 특유의 훌륭한 서비스.",
                transport: "텐진 2-1-1, 츄오구",
                tips: "지하 식품관(데파치카)은 장인의 디저트부터 고급 도시락까지 미식의 천국.",
                menu: "명품 의류 ¥10,000~200,000 / 디자이너백 ¥20,000~500,000 / 고급 화장품 ¥5,000~30,000",
                hours: "10:00-20:00"
            }
        },
        {
            id: "marinoa_city",
            name: "마리노아 시티 후쿠오카",
            name_en: "Marinoa City Fukuoka",
            lat: 33.5800, lng: 130.3200,
            type: "shopping", region: "bay", rating: 4.0,
            desc: "하카타만에 위치한 아울렛 몰. 도심에서 벗어나 바닷가 분위기에서 여유로운 쇼핑.",
            photos: [
                "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800",
                "https://images.unsplash.com/photo-1519420573924-65fcd45245f8?w=800"
            ],
            details: {
                info: "다양한 인기 브랜드 제품 할인 가격. 상징적인 관람차에서 멋진 파노라마 전망.",
                transport: "오도 2-12-30, 니시구",
                tips: "관람차 꼭 탑승! 하카타만과 도시 전망 환상적. 교통편 미리 확인.",
                menu: "아울렛 패션 ¥2,000~15,000 / 스포츠웨어 ¥3,000~10,000 / 홈굿즈 ¥1,000~8,000",
                hours: "상점 10:00-21:00 / 식당 11:00-23:00"
            }
        },
        {
            id: "lalaport_fukuoka",
            name: "라라포트 후쿠오카",
            name_en: "LaLaport Fukuoka",
            lat: 33.5910, lng: 130.4280,
            type: "shopping", region: "hakata", rating: 4.3,
            desc: "실물 크기의 건담 동상이 인상적인 현대적 쇼핑몰. 가족 단위 방문객에게 최적.",
            photos: [
                "https://images.unsplash.com/photo-1567449303078-57ad995bd329?w=800",
                "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800"
            ],
            details: {
                info: "패션부터 라이프스타일 용품까지 다양한 상점. 넓은 푸드코트.",
                transport: "나카 6-23-1, 하카타구",
                tips: "실물 크기 RX-93ff ν 건담 동상 필수 촬영! 정시마다 움직임/조명쇼.",
                menu: "의류 시가 / 라이프스타일 용품 시가 / 건담 모델킷 ¥2,000~10,000 / 푸드코트 ¥800~1,500",
                hours: "10:00-21:00"
            }
        },
        {
            id: "solaria_plaza",
            name: "솔라리아 플라자",
            name_en: "Solaria Plaza",
            lat: 33.5898, lng: 130.4005,
            type: "shopping", region: "tenjin", rating: 4.0,
            desc: "텐진 중심부의 세련된 9층 규모 쇼핑, 다이닝, 엔터테인먼트 복합 시설. 영화관도 완비.",
            photos: [
                "https://images.unsplash.com/photo-1519420573924-65fcd45245f8?w=800",
                "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800"
            ],
            details: {
                info: "국제 패션 브랜드와 독특한 일본 디자인. 캐주얼 카페부터 고급 레스토랑까지.",
                transport: "텐진 2-2-43, 츄오구",
                tips: "텐진 중심부에 위치해 접근성 뛰어남. 다른 쇼핑 지역과 연결.",
                menu: "국제 패션 브랜드 시가 / 일본 디자이너 아이템 시가 / 카페 음료 ¥500~900 / 영화 ¥1,500~2,000",
                hours: "월-금 11:00-20:00 / 토-일 10:00-20:00"
            }
        },

        // =======================================
        // ☕ FUKUOKA SPECIALTY CAFES
        // =======================================
        {
            id: "bluebottle_tenjin",
            name: "블루보틀 커피 후쿠오카 텐진",
            name_en: "Blue Bottle Coffee Fukuoka Tenjin",
            lat: 33.5892, lng: 130.3995,
            type: "cafe", region: "tenjin", rating: 4.5,
            desc: "미니멀한 디자인과 전문적으로 준비된 커피로 평온한 휴식 제공. 핸드드립 커피 필수.",
            photos: [
                "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
                "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"
            ],
            details: {
                info: "효율적이고 친절한 서비스. 브랜드의 높은 기준 유지. 야외 좌석에서 텐진 사람 구경.",
                transport: "텐진 2-2-20, 츄오구",
                tips: "이른 아침 방문 추천. 근처 케고 공원에서 테이크아웃 커피 즐기기.",
                menu: "드립커피 ¥550 / 라떼 ¥650 / 에스프레소 ¥500 / 와플 ¥450 / 피낭시에 ¥350",
                hours: "08:00-20:00"
            }
        },
        {
            id: "sora_coffee",
            name: "소라 커피",
            name_en: "SORA COFFEE",
            lat: 33.5920, lng: 130.4095,
            type: "cafe", region: "hakata", rating: 4.8,
            desc: "캐널시티 근처의 숨겨진 보석. 부드럽고 향긋한 드립 커피가 까다로운 입맛에도 완벽.",
            photos: [
                "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800",
                "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800"
            ],
            details: {
                info: "조용하고 매력적인 분위기. 개인적이고 따뜻한 서비스. 품질과 고요함을 찾는 분께 추천.",
                transport: "기온마치 8-13, 하카타구",
                tips: "캐널시티와 구시다 신사 근처. 관광 중 조용한 휴식처로 딱.",
                menu: "드립커피 ¥600 / 카페라떼 ¥650 / 아메리카노 ¥580 / 홈메이드 쿠키 ¥300 / 파운드케이크 ¥400",
                hours: "월-금 10:00-17:00 / 토 14:00-18:00 / 일 휴무"
            }
        },
        {
            id: "connect_coffee",
            name: "커넥트 커피",
            name_en: "CONNECT COFFEE",
            lat: 33.5880, lng: 130.3998,
            type: "cafe", region: "tenjin", rating: 4.5,
            desc: "텐진의 스페셜티 커피 명소. 현대적이고 매력적인 분위기에서 훌륭한 라떼와 핸드드립.",
            photos: [
                "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800",
                "https://images.unsplash.com/photo-1497515114889-3f227db71ea6?w=800"
            ],
            details: {
                info: "숙련된 바리스타. 잠깐 들르거나 오래 머물기에도 편안한 공간.",
                transport: "텐진 5-6-13, 츄오구",
                tips: "SNS 확인해서 계절 한정 메뉴 체크. 작업이나 독서에도 좋은 분위기.",
                menu: "에스프레소 ¥450 / 카페라떼 ¥580 / 핸드드립 ¥650 / 치즈케이크 ¥500 / 쿠키 ¥300",
                hours: "월,수-토 12:00-20:00 / 일 11:00-18:00 / 화 휴무"
            }
        },
        {
            id: "coffee_county",
            name: "커피카운티 후쿠오카",
            name_en: "Coffee County Fukuoka",
            lat: 33.5858, lng: 130.3945,
            type: "cafe", region: "tenjin", rating: 4.6,
            desc: "커피 애호가들의 진정한 안식처. 탁월한 싱글 오리진 원두와 뛰어난 추출 기술.",
            photos: [
                "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800",
                "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
            ],
            details: {
                info: "따뜻하고 매력적인 분위기. 바리스타들이 원두 선택 안내. 교육적인 커피 경험.",
                transport: "타카사고 1-21-21, 츄오구",
                tips: "원두 구매 가능. 집에서도 후쿠오카 커피 맛 재현. 커피 애호가 필수 방문.",
                menu: "싱글오리진 드립 ¥700 / 에스프레소 토닉 ¥680 / 카페라떼 ¥620 / 베이킹류 ¥350~500",
                hours: "월,화,목-일 10:00-18:30 / 수 휴무"
            }
        },
        {
            id: "manly_cafe",
            name: "맨리 카페",
            name_en: "Manly Cafe",
            lat: 33.5865, lng: 130.3985,
            type: "cafe", region: "tenjin", rating: 4.5,
            desc: "후쿠오카 한가운데서 호주 분위기. 리코타 팬케이크와 미트 파이가 인기.",
            photos: [
                "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800",
                "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=800"
            ],
            details: {
                info: "소박한 인테리어와 매력적인 야외 테이블. 따뜻하고 환영하는 직원.",
                transport: "이마이즈미 1-18-55, 츄오구",
                tips: "브런치로 인기. 주말 예약 추천. 반려견 동반 가능.",
                menu: "리코타 팬케이크 ¥1,200~1,500 / 에그베네딕트 ¥1,300~1,600 / 미트파이 ¥800~1,000 / 플랫화이트 ¥600",
                hours: "월-목,일 11:00-22:00 / 금-토 11:00-23:00"
            }
        },
        {
            id: "rec_coffee_hakata",
            name: "REC 커피 (하카타점)",
            name_en: "REC Coffee Hakata",
            lat: 33.5903, lng: 130.4203,
            type: "cafe", region: "hakata", rating: 4.1,
            desc: "하카타역 파노라마 전망과 함께하는 세련된 카페. 아름다운 라떼 아트와 숙련된 핸드드립.",
            photos: [
                "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
                "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800"
            ],
            details: {
                info: "키테 하카타 6층. 효율적이고 친절한 서비스. 치즈케이크와 함께 완벽한 오후.",
                transport: "하카타에키츄오가이 9-1, 6층",
                tips: "창가 좌석 추천! 쇼핑이나 열차 대기 중 휴식에 딱.",
                menu: "라떼아트 커피 ¥550~700 / 핸드드립 ¥600~900 / 에스프레소 ¥500 / 치즈케이크 ¥500~600",
                hours: "10:00-21:00"
            }
        },
        {
            id: "cafe_motito",
            name: "카페 모티토",
            name_en: "Cafe Motito",
            lat: 33.5890, lng: 130.4105,
            type: "cafe", region: "hakata", rating: 4.7,
            desc: "캐널시티 근처 4층에 숨겨진 보석. 유기농 커피와 홈메이드 케이크. 채식 옵션 풍부.",
            photos: [
                "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
                "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800"
            ],
            details: {
                info: "친절하고 세심한 직원. 따뜻하고 환영하는 분위기. 건강식을 찾는 여행객에게 추천.",
                transport: "스미요시 1-5-1, 하카타구, 선댄스빌딩 4층",
                tips: "금토 늦게까지 운영. 저녁 디저트나 조용한 음료에 좋음. 현금 전용!",
                menu: "유기농커피 ¥550~700 / 홈메이드케이크세트 ¥1,000~1,200 / 허브티 ¥600~800 / 채식런치 ¥1,200~1,500",
                hours: "월-목,일 11:45-23:00 / 금 12:00-02:00 / 토 11:00-23:00"
            }
        },
        {
            id: "fuglen_fukuoka",
            name: "후글렌 후쿠오카",
            name_en: "Fuglen Fukuoka",
            lat: 33.5908, lng: 130.4235,
            type: "cafe", region: "hakata", rating: 4.4,
            desc: "오슬로의 유명한 커피 문화를 하카타에 선보이는 세련되고 미니멀한 카페. 저녁엔 바로 변신.",
            photos: [
                "https://images.unsplash.com/photo-1497515114889-3f227db71ea6?w=800",
                "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800"
            ],
            details: {
                info: "완벽하게 추출된 필터 커피가 하이라이트. 활기차면서도 편안한 분위기.",
                transport: "하카타에키히가시 1-18-33, 하카타 이스트 테라스 1층",
                tips: "저녁에는 크래프트 맥주도 제공. 세계적 수준의 커피 문화 체험.",
                menu: "에스프레소 베이스 ¥550~750 / 필터커피 ¥650~900 / 노르웨이 와플 ¥600 / 크래프트맥주 ¥800~1,000",
                hours: "월-목 07:00-20:00 / 금 07:00-22:00 / 토-일 08:00-22:00"
            }
        },

        // =======================================
        // 🏛️ FUKUOKA SIGHTSEEING SPOTS
        // =======================================
        {
            id: "dazaifu_tenmangu",
            name: "다자이후 텐만구 신사",
            name_en: "Dazaifu Tenmangu Shrine",
            lat: 33.5215, lng: 130.5349,
            type: "temple", region: "suburb", rating: 4.4,
            desc: "학문의 신을 모시는 신사. 아름다운 매화나무와 고요한 연못이 어우러진 평화로운 분위기.",
            photos: [
                "https://images.unsplash.com/photo-1565597989343-424472289457?w=800",
                "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800"
            ],
            details: {
                info: "일본 전통과 건축미를 깊이 느낄 수 있는 곳. 영적 분위기와 역사적 중요성.",
                transport: "니시테츠 다자이후역에서 도보 5분",
                tips: "이른 아침 방문 추천. 신성한 소 동상 머리 만지면 지혜 상승! 우메가에모치(매화떡) 필수.",
                menu: "우메가에모치 ¥130~150 / 오마모리(부적) ¥500~2,000 / 에마(기원패) ¥500~1,000",
                hours: "06:30-19:00"
            }
        },
        {
            id: "ohori_park_castle",
            name: "오호리 공원 & 후쿠오카 성터",
            name_en: "Fukuoka Castle Ruins & Ohori Park",
            lat: 33.5860, lng: 130.3764,
            type: "spot", region: "central", rating: 4.3,
            desc: "자연의 아름다움과 역사적 흥미가 완벽하게 조화된 곳. 도심 속 평화로운 휴식처.",
            photos: [
                "https://images.unsplash.com/photo-1624672666964-e49d7a4c4d58?w=800",
                "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800"
            ],
            details: {
                info: "커다란 호수에서 산책, 조깅, 보트 타기. 인접한 성터에서 후쿠오카 과거 엿보기.",
                transport: "지하철 오호리코엔역",
                tips: "후쿠오카 미술관도 함께 방문 추천. 벚꽃 시즌(3월 말~4월 초) 방문 시 환상적.",
                menu: "보트 대여 ¥600~1,000/30분 / 미술관 ¥200~500 / 스타벅스 ¥400~600",
                hours: "공원 24시간 / 성터 09:00-17:00"
            }
        },
        {
            id: "kushida_shrine_yamakasa",
            name: "구시다 신사",
            name_en: "Kushida Shrine & Yamakasa Exhibition",
            lat: 33.5930, lng: 130.4105,
            type: "temple", region: "hakata", rating: 4.4,
            desc: "하카타의 영적인 심장. 화려한 야마카사 축제 장식 수레 상설 전시가 인상적.",
            photos: [
                "https://images.unsplash.com/photo-1599579178553-527395634543?w=800",
                "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800"
            ],
            details: {
                info: "정교한 조각과 화려한 장식. 하카타 기온 야마카사 축제(7월) 때 방문 추천.",
                transport: "카미카와바타마치 1-41, 하카타구",
                tips: "참배 전 테미즈야에서 손과 입 정화. 오미쿠지(운세뽑기) 체험.",
                menu: "오미쿠지 ¥100~200 / 오마모리 ¥500~2,000 / 주변 길거리음식 ¥200~500",
                hours: "신사 09:00-17:00 / 야마카사 전시 24시간 관람 가능"
            }
        },
        {
            id: "fukuoka_tower_view",
            name: "후쿠오카 타워",
            name_en: "Fukuoka Tower",
            lat: 33.5932, lng: 130.3515,
            type: "spot", region: "bay", rating: 4.4,
            desc: "234m 높이의 후쿠오카 랜드마크. 시내와 바다를 한눈에 조망할 수 있는 전망대.",
            photos: [
                "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=800",
                "https://images.unsplash.com/photo-1605270960538-420032c2569f?w=800"
            ],
            details: {
                info: "계절마다 바뀌는 일루미네이션. 외국인 여권 제시 시 할인.",
                transport: "버스 (후쿠오카 타워 남구 하차)",
                tips: "야경도 멋지지만 맑은 날 낮에 보는 바다 뷰도 환상적. 모모치 해변과 함께 방문 추천.",
                menu: "전망대 입장 ¥800 (외국인 할인 ¥640) / 기념품 시가",
                hours: "09:30-22:00 (입장 21:30까지)"
            }
        },
        {
            id: "momochi_beach",
            name: "모모치 해변 공원",
            name_en: "Momochi Seaside Park",
            lat: 33.5930, lng: 130.3515,
            type: "spot", region: "bay", rating: 4.5,
            desc: "이국적인 분위기의 인공 해변. 후쿠오카 타워 바로 앞에 위치. 마리존 예식장이 사진 명소.",
            photos: [
                "https://images.unsplash.com/photo-1605270960538-420032c2569f?w=800",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
            ],
            details: {
                info: "유럽풍 건물인 마리존 예식장이 있어 사진 찍기 좋은 명소.",
                transport: "버스 (후쿠오카 타워 남구 하차)",
                tips: "해변 모래사장에서 후쿠오카 타워를 배경으로 인생샷. 해질녘 특히 아름다움.",
                menu: "해변 카페 음료 시가 / 후쿠오카 타워와 함께 방문",
                hours: "24시간 (타워: 09:30-22:00)"
            }
        },

        // =======================================
        // 🍜 ADDITIONAL RESTAURANTS
        // =======================================
        {
            id: "motsunabe_rakutenchi_tenjin",
            name: "원조 모츠나베 라쿠텐치 텐진본점",
            name_en: "Ganso Motsunabe Rakutenchi Tenjin Honten",
            lat: 33.5920, lng: 130.4000,
            type: "food", region: "tenjin", rating: 4.7,
            desc: "후쿠오카 명물 모츠나베의 원조. 신선한 곱창과 채소가 어우러진 진한 국물 전골.",
            photos: [
                "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800",
                "https://images.unsplash.com/photo-1536768139911-e290a59011e4?w=800"
            ],
            details: {
                info: "북적이는 현지 분위기. 친구들과 함께 즐기기 좋음. 짬뽕면이나 죽 추가 필수.",
                transport: "텐진 1-1-1, 아크로스 후쿠오카 지하2층",
                tips: "간장/미소 중 국물 선택. 마지막에 짬뽕면이나 죽으로 국물까지 완벽히 즐기기.",
                menu: "모츠나베 ¥1,600/인 / 짬뽕면 추가 ¥400 / 죽 추가 ¥400 / 교자 ¥450",
                hours: "11:00-22:00"
            }
        },
        {
            id: "daitoen_yakiniku",
            name: "다이토엔 본점",
            name_en: "Daitoen Main Store",
            lat: 33.5935, lng: 130.4080,
            type: "food", region: "nakasu", rating: 4.3,
            desc: "프리미엄 야키니쿠 맛집. 세련된 공간에서 최상급 일본 와규 테이블 그릴 체험.",
            photos: [
                "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
                "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800"
            ],
            details: {
                info: "놀랍도록 부드럽고 풍미 가득한 고기. 세심하고 전문적인 서비스.",
                transport: "카미카와바타마치 1-1-1, 하카타구",
                tips: "저녁 예약 필수. 프라이빗룸 가능. 특별한 날에 추천.",
                menu: "프리미엄 와규 모듬 ¥7,500 / 스페셜 갈비 ¥2,200 / 하라미 ¥1,800 / 비빔밥 ¥1,200",
                hours: "월-금 11:30-14:00, 16:00-22:30 / 토-일 11:30-22:30"
            }
        },

        // =======================================
        // 🏯 ADDITIONAL SIGHTSEEING SPOTS
        // =======================================
        {
            id: "tochoji_temple",
            name: "동장사 (토초지)",
            name_en: "Tochoji Temple",
            lat: 33.5945, lng: 130.4120,
            type: "temple", region: "hakata", rating: 4.3,
            desc: "거대한 목조 불상인 후쿠오카 대불로 유명한 불교 사찰. 5층 목탑과 평화로운 경내가 인상적.",
            photos: [
                "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
                "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
                "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
                "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800"
            ],
            details: {
                info: "일본에서 가장 큰 목조 불상 중 하나인 '후쿠오카 대불'이 있습니다. 지옥 순례 체험도 가능.",
                transport: "지하철 기온역에서 도보 5분",
                tips: "대불 내부의 '지옥 순례' 터널은 어둠 속에서 극락왕생을 기원하는 독특한 체험. 무료 입장.",
                menu: "입장료 무료 / 지옥 순례 체험 무료",
                hours: "09:00-16:45"
            }
        },
        {
            id: "maizuru_park",
            name: "마이즈루 공원 (후쿠오카 성터)",
            name_en: "Maizuru Park (Fukuoka Castle Ruins)",
            lat: 33.5875, lng: 130.3838,
            type: "spot", region: "central", rating: 4.1,
            desc: "후쿠오카 성터를 품은 역사적인 공원. 벚꽃 명소로 유명하며 도시 전망이 뛰어남.",
            photos: [
                "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800",
                "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
                "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800",
                "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800"
            ],
            details: {
                info: "성벽과 망루 유적이 남아있으며, 봄에는 1000그루 이상의 벚꽃이 만개합니다.",
                transport: "지하철 아카사카역 또는 오호리코엔역에서 도보 8분",
                tips: "벚꽃 시즌(3월 말~4월 초) 방문 추천. 텐슈다이에서 도시 파노라마 전망 감상.",
                menu: "입장료 무료 / 벚꽃 축제 시 노점 ¥200~800",
                hours: "24시간 (성터 구역 09:00-17:00)"
            }
        },
        {
            id: "hakata_port_tower",
            name: "하카타 포트 타워",
            name_en: "Hakata Port Tower",
            lat: 33.6050, lng: 130.4015,
            type: "spot", region: "bay", rating: 4.0,
            desc: "하카타 항구의 상징. 전망대에서 현해탄과 시내를 한눈에 조망할 수 있는 무료 타워.",
            photos: [
                "https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=800",
                "https://images.unsplash.com/photo-1605270960538-420032c2569f?w=800",
                "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
                "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800"
            ],
            details: {
                info: "100m 높이의 빨간색 전망 타워. 현해탄과 후쿠오카 시내 전경을 무료로 감상.",
                transport: "지하철 나카스카와바타역에서 버스 15분",
                tips: "석양 무렵 방문하면 붉게 물든 바다를 배경으로 멋진 사진 촬영 가능.",
                menu: "입장료 무료",
                hours: "10:00-22:00"
            }
        },
        {
            id: "nokonoshima_island",
            name: "노코노시마 아일랜드 파크",
            name_en: "Nokonoshima Island Park",
            lat: 33.6550, lng: 130.3050,
            type: "spot", region: "island", rating: 4.5,
            desc: "하카타만에 떠있는 꽃 천국 섬. 계절마다 다른 꽃밭과 해변의 아름다운 풍경.",
            photos: [
                "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
                "https://images.unsplash.com/photo-1518882605630-8eb548e47bf0?w=800",
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
                "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800"
            ],
            details: {
                info: "코스모스, 유채꽃, 해바라기 등 사계절 꽃이 만발. 미니 동물원과 해변도 있음.",
                transport: "메이노하마 페리터미널에서 페리 10분",
                tips: "4월 유채꽃, 10월 코스모스가 최고 시즌. 페리 시간표 미리 확인 필수.",
                menu: "입장료 ¥1,200 (성인) / 페리 왕복 ¥460",
                hours: "09:00-17:30 (월요일 휴원, 시즌별 변동)"
            }
        },
        {
            id: "hakata_machiya",
            name: "하카타 전통공예관 ('카와카미 벳테이')",
            name_en: "Hakata Machiya Folk Museum",
            lat: 33.5935, lng: 130.4095,
            type: "museum", region: "hakata", rating: 4.2,
            desc: "하카타의 전통 문화와 생활상을 체험할 수 있는 박물관. 하카타 직조 체험 가능.",
            photos: [
                "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800",
                "https://images.unsplash.com/photo-1505069446780-4ef442b5207f?w=800",
                "https://images.unsplash.com/photo-1490122417551-6eee1baba52e?w=800",
                "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800"
            ],
            details: {
                info: "100년 이상 된 마키야(상가) 건물에서 하카타의 역사와 전통 공예를 배우는 곳.",
                transport: "구시다 신사 바로 옆",
                tips: "하카타 오리(직조) 체험은 사전 예약 권장. 영어 안내 팜플렛 있음.",
                menu: "입장료 ¥200 / 하카타 직조 체험 ¥1,500~",
                hours: "10:00-18:00 (화요일 휴관)"
            }
        },
        {
            id: "seaside_momochi",
            name: "시사이드 모모치",
            name_en: "Seaside Momochi",
            lat: 33.5935, lng: 130.3520,
            type: "spot", region: "bay", rating: 4.3,
            desc: "후쿠오카의 대표적인 워터프론트 지역. 후쿠오카 타워, 마리존, 인공해변이 모두 이곳에.",
            photos: [
                "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
                "https://images.unsplash.com/photo-1605270960538-420032c2569f?w=800",
                "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
                "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800"
            ],
            details: {
                info: "야경 맛집! 마리존의 이국적인 건물과 타워가 어우러진 로맨틱한 풍경.",
                transport: "버스 '후쿠오카 타워 남구' 하차",
                tips: "여름에는 해변가 카페와 비치발리볼 인기. 일몰 시간 맞춰 방문 추천.",
                menu: "해변 이용 무료 / 카페 음료 ¥400~800",
                hours: "24시간 (타워, 마리존 등은 별도 영업시간)"
            }
        },
        {
            id: "shofukuji_temple",
            name: "쇼후쿠지 (성복사)",
            name_en: "Shofukuji Temple",
            lat: 33.5953, lng: 130.4100,
            type: "temple", region: "hakata", rating: 4.0,
            desc: "일본 최초의 선종(禪宗) 사찰. 에이사이 선사가 창건한 역사 깊은 곳.",
            photos: [
                "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
                "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
                "https://images.unsplash.com/photo-1505069446780-4ef442b5207f?w=800",
                "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800"
            ],
            details: {
                info: "1195년 창건. 일본에 처음으로 차(茶)를 보급한 에이사이 선사의 절.",
                transport: "지하철 기온역에서 도보 5분",
                tips: "조용히 묵상하기 좋은 곳. 토초지와 함께 방문 추천. 내부 비공개구역 있음.",
                menu: "입장료 무료",
                hours: "경내 일출~일몰"
            }
        },
        {
            id: "acros_fukuoka",
            name: "아크로스 후쿠오카",
            name_en: "ACROS Fukuoka",
            lat: 33.5905, lng: 130.4055,
            type: "spot", region: "tenjin", rating: 4.1,
            desc: "거대한 계단식 정원이 건물 외벽을 덮은 친환경 랜드마크. 도심 속 녹색 오아시스.",
            photos: [
                "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?w=800",
                "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
                "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800",
                "https://images.unsplash.com/photo-1518882605630-8eb548e47bf0?w=800"
            ],
            details: {
                info: "5,400㎡ 면적의 옥상 정원에는 76종 37,000그루의 식물이 자랍니다.",
                transport: "지하철 텐진역 16번 출구 직결",
                tips: "옥상 정원(스텝 가든)은 무료 개방. 여름에는 시원한 피서지로 인기.",
                menu: "옥상 정원 무료 / 심포니 홀 공연 시가",
                hours: "정원 09:00-18:00 (동절기 17:00까지)"
            }
        },
        {
            id: "sumiyoshi_jinja",
            name: "스미요시 신사",
            name_en: "Sumiyoshi Shrine",
            lat: 33.5855, lng: 130.4160,
            type: "temple", region: "hakata", rating: 4.0,
            desc: "일본 3대 스미요시 신사 중 하나. 항해 안전의 신을 모시는 고대 신사.",
            photos: [
                "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800",
                "https://images.unsplash.com/photo-1599579178553-527395634543?w=800",
                "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800",
                "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800"
            ],
            details: {
                info: "1,800년 역사. 스미요시즈쿠리라는 독특한 신사 건축양식이 특징.",
                transport: "캐널시티 하카타에서 도보 5분",
                tips: "매년 10월 스모 축제가 열림. 조용한 분위기에서 참배하기 좋음.",
                menu: "입장료 무료 / 오마모리 ¥500~1,000",
                hours: "일출~일몰"
            }
        },
        {
            id: "river_side_nakasu",
            name: "나카스 리버사이드 야경",
            name_en: "Nakasu Riverside Night View",
            lat: 33.5915, lng: 130.4065,
            type: "spot", region: "nakasu", rating: 4.4,
            desc: "하카타 강변을 따라 펼쳐지는 화려한 네온 야경. 포장마차와 함께 즐기는 로맨틱한 밤.",
            photos: [
                "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800",
                "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
                "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
                "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800"
            ],
            details: {
                info: "일본 3대 유흥가 중 하나. 강변 산책과 야경 감상 후 야타이(포장마차)에서 식사.",
                transport: "지하철 나카스카와바타역 하차",
                tips: "해질 무렵부터 밤까지 가장 아름다움. 야타이는 보통 18:00부터 오픈.",
                menu: "야타이 음식 ¥500~2,000",
                hours: "24시간 (야타이: 18:00~03:00경)"
            }
        }
    ];

    // 4-Day Itinerary Structure
    let userItinerary = {
        "1": ["fukuoka_airport", "oriental_hotel", "shinshin_ramen", "ohori_park", "momochi_seaside", "fukuoka_tower", "motsunabe_rakutenchi", "nakasu_yatai"],
        "2": ["yufuin_tour_start", "dazaifu", "yufuin_village", "kinrin_lake", "yufumabushi_shin", "kamado_jigoku"],
        "3": ["sumiyoshi_shrine", "canal_city", "beef_tongue_lunch", "kushida_shrine", "tenjin_underground", "yakiniku_dinner", "don_quijote"],
        "4": ["tanya_hakata", "amu_plaza", "ekiben_lunch"]
    };

    let activeDay = 1;
    let map, markers = [];

    function initApp() {
        injectCSS();
        renderHeader();
        renderBuilderUI();
        setTimeout(initMap, 500);
    }

    function initMap() {
        const mapEl = document.getElementById('map');
        if (!mapEl) return;
        const centerSpot = POI_DATABASE.find(p => p.id === userItinerary[1][0]) || POI_DATABASE[0];
        map = new google.maps.Map(mapEl, {
            center: { lat: centerSpot.lat, lng: centerSpot.lng },
            zoom: 12,
            mapTypeControl: false, streetViewControl: false, fullscreenControl: true
        });
        if (window.initRouteHelper) window.initRouteHelper(map);
        updateMapMarkers();
    }

    function renderHeader() {
        const container = document.getElementById('day-tabs');
        if (!container) return;
        container.innerHTML = Object.keys(userItinerary).map(day =>
            `<button onclick="switchDay(${day})" 
                class="px-4 py-2 rounded-full text-sm font-bold transition-all border shadow-sm ${day == activeDay
                ? 'bg-blue-600 text-white scale-105 border-blue-700'
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }">
                Day ${day}
            </button>`
        ).join('');
    }

    function renderBuilderUI() {
        const container = document.getElementById('itinerary-content');
        if (!container) return;

        const planList = userItinerary[activeDay].map((id, idx) => {
            const item = POI_DATABASE.find(p => p.id === id);
            if (!item) return '';
            return `
                <div class="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 transition hover:shadow-md">
                    <div class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        ${idx + 1}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="font-bold text-gray-700 text-sm cursor-pointer hover:text-blue-600 truncate" onclick="showDetail('${item.id}')">
                            ${item.name}
                        </div>
                        <div class="text-[10px] text-gray-400">
                            ${item.region.toUpperCase()} • ${item.type}
                        </div>
                    </div>
                    <button onclick="removeFromPlan('${item.id}')" class="text-red-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition">
                        ⛔
                    </button>
                </div>`;
        }).join('');

        container.innerHTML = `
            <div class="bg-blue-50 p-4 rounded-xl mb-4 border border-blue-100 shadow-inner">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-bold text-blue-800 flex items-center gap-2">📅 Day ${activeDay} 일정</h3>
                    <div class="flex gap-2">
                         <button onclick="verifyRoute()" class="text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none px-3 py-1.5 rounded-full font-bold hover:scale-105 transition flex items-center gap-1 shadow-md animate-pulse">
                            <i class="fas fa-plane-departure"></i> 미리여행
                        </button>
                        <span class="text-xs text-blue-600 bg-white px-2 py-1 rounded border border-blue-200 font-bold">${userItinerary[activeDay].length}곳</span>
                    </div>
                </div>
                <div id="my-plan-list" class="space-y-2 min-h-[50px]">
                    ${userItinerary[activeDay].length === 0 ? '<p class="text-center text-gray-400 text-xs py-6 border-2 border-dashed border-blue-200 rounded-lg">아래 목록에서 [+] 버튼을 눌러<br>장소를 추가해보세요.</p>' : planList}
                </div>
            </div>

            <!-- 🔍 검색 바 -->
            <div class="mb-4">
                <div class="relative">
                    <input type="text" id="poi-search" placeholder="장소 검색... (예: 라멘, 타워)" 
                        class="w-full px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl text-sm focus:border-blue-500 focus:outline-none transition"
                        oninput="filterPOIs()">
                    <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
            </div>

            <!-- 🏷️ 카테고리 필터 -->
            <div class="flex gap-2 mb-4 overflow-x-auto scrollbar-hide pb-2">
                <button onclick="filterByCategory('all')" id="filter-all" class="category-btn active flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition bg-gray-900 text-white">
                    전체
                </button>
                <button onclick="filterByCategory('food')" id="filter-food" class="category-btn flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600">
                    🍜 맛집
                </button>
                <button onclick="filterByCategory('spot')" id="filter-spot" class="category-btn flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-600">
                    📍 관광지
                </button>
                <button onclick="filterByCategory('shopping')" id="filter-shopping" class="category-btn flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600">
                    🛍️ 쇼핑
                </button>
                <button onclick="filterByCategory('temple')" id="filter-temple" class="category-btn flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold transition bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600">
                    ⛩️ 신사/사찰
                </button>
            </div>

            <!-- 📊 결과 카운트 -->
            <div class="flex justify-between items-center mb-3">
                <span id="result-count" class="text-sm text-gray-500">총 ${POI_DATABASE.length}개 장소</span>
            </div>

            <div id="spot-pool" class="grid grid-cols-1 gap-4 pb-24"></div>`;

        window.currentCategory = 'all';
        window.searchQuery = '';
        renderSpotPool();
    }

    window.filterByCategory = function (category) {
        window.currentCategory = category;
        // 버튼 스타일 업데이트
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('bg-gray-900', 'text-white');
            btn.classList.add('bg-gray-100', 'text-gray-600');
        });
        const activeBtn = document.getElementById(`filter-${category}`);
        if (activeBtn) {
            activeBtn.classList.remove('bg-gray-100', 'text-gray-600');
            activeBtn.classList.add('bg-gray-900', 'text-white');
        }
        renderSpotPool();
    };

    window.filterPOIs = function () {
        window.searchQuery = document.getElementById('poi-search')?.value?.toLowerCase() || '';
        renderSpotPool();
    };

    window.verifyRoute = () => {
        if (window.startPreviewTravel) {
            window.startPreviewTravel(userItinerary[activeDay], POI_DATABASE);
        } else {
            alert('미리여행 기능을 로드하는 중입니다. 잠시 후 다시 시도해주세요.');
        }
    };

    window.renderSpotPool = function () {
        const pool = document.getElementById('spot-pool');
        if (!pool) return;

        const category = window.currentCategory || 'all';
        const query = window.searchQuery || '';

        // 필터링
        let filtered = POI_DATABASE;
        if (category !== 'all') {
            filtered = filtered.filter(p => p.type === category);
        }
        if (query) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.desc.toLowerCase().includes(query) ||
                (p.name_en && p.name_en.toLowerCase().includes(query)) ||
                (p.details?.menu && p.details.menu.toLowerCase().includes(query))
            );
        }

        // 결과 카운트 업데이트
        const countEl = document.getElementById('result-count');
        if (countEl) countEl.textContent = `검색 결과: ${filtered.length}개`;

        let htmlContent = filtered.map((place, idx) => {
            const isAdded = Object.values(userItinerary).flat().includes(place.id);
            const photos = place.photos || [];

            // 타입별 아이콘 & 색상
            const typeConfig = {
                food: { icon: '🍜', color: 'orange', label: '맛집' },
                spot: { icon: '📍', color: 'blue', label: '관광' },
                shopping: { icon: '🛍️', color: 'purple', label: '쇼핑' },
                temple: { icon: '⛩️', color: 'green', label: '신사' },
                museum: { icon: '🏛️', color: 'amber', label: '박물관' }
            };
            const config = typeConfig[place.type] || { icon: '📌', color: 'gray', label: place.type };

            // 사진 슬라이더 HTML 생성
            const sliderId = `slider-${place.id}`;
            const photoSlides = photos.map((p, i) => `
                <div class="slide w-full flex-shrink-0">
                    <img src="${p}" class="w-full h-full object-cover" 
                        onerror="this.src='https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800'" alt="${place.name}">
                </div>
            `).join('');

            // 영업시간에서 시간만 추출
            const hours = place.details?.hours || '';
            const menu = place.details?.menu || '';
            const transport = place.details?.transport || '';

            return `
            <div class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <!-- 📸 사진 슬라이더 영역 -->
                <div class="relative h-48 bg-gray-200 overflow-hidden group" onclick="showDetail('${place.id}')">
                    <div id="${sliderId}" class="flex h-full transition-transform duration-300 ease-out" style="width: ${photos.length * 100}%">
                        ${photoSlides || '<div class="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-4xl">📷</div>'}
                    </div>
                    
                    <!-- 사진 인디케이터 -->
                    ${photos.length > 1 ? `
                    <div class="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                        ${photos.map((_, i) => `<div class="slider-dot w-2 h-2 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/50'}" data-slider="${sliderId}" data-index="${i}"></div>`).join('')}
                    </div>
                    <button onclick="event.stopPropagation(); slidePhoto('${sliderId}', -1)" class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <i class="fas fa-chevron-left text-sm"></i>
                    </button>
                    <button onclick="event.stopPropagation(); slidePhoto('${sliderId}', 1)" class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <i class="fas fa-chevron-right text-sm"></i>
                    </button>
                    ` : ''}

                    <!-- 타입 뱃지 -->
                    <div class="absolute top-3 left-3 bg-${config.color}-500 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        ${config.icon} ${config.label}
                    </div>

                    <!-- 별점 뱃지 -->
                    <div class="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                        ⭐ ${place.rating}
                    </div>

                    <!-- 상세보기 오버레이 -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition flex items-end justify-center pb-4">
                        <span class="text-white font-bold text-sm bg-blue-600 px-4 py-2 rounded-full shadow-lg">
                            <i class="fas fa-eye mr-1"></i> 상세보기
                        </span>
                    </div>
                </div>

                <!-- 📄 정보 영역 -->
                <div class="p-4">
                    <h4 class="font-black text-lg text-gray-900 mb-1 line-clamp-1">${place.name}</h4>
                    ${place.name_en ? `<p class="text-xs text-gray-400 mb-2">${place.name_en}</p>` : ''}
                    <p class="text-sm text-gray-600 line-clamp-2 mb-3">${place.desc}</p>

                    <!-- 핵심 정보 그리드 -->
                    <div class="grid grid-cols-2 gap-2 text-xs mb-4">
                        ${hours ? `<div class="flex items-center gap-1.5 text-gray-500"><i class="far fa-clock text-blue-400"></i><span class="truncate">${hours}</span></div>` : ''}
                        ${transport ? `<div class="flex items-center gap-1.5 text-gray-500"><i class="fas fa-subway text-purple-400"></i><span class="truncate">${transport}</span></div>` : ''}
                    </div>

                    ${menu ? `<div class="bg-orange-50 px-3 py-2 rounded-lg text-xs text-orange-800 mb-4 line-clamp-1"><i class="fas fa-utensils mr-1"></i>${menu}</div>` : ''}

                    <!-- 액션 버튼 -->
                    <div class="flex gap-2">
                        ${isAdded ?
                    `<button class="flex-1 py-3 rounded-xl font-bold text-sm bg-gray-100 text-gray-400 cursor-not-allowed flex items-center justify-center gap-2">
                                <i class="fas fa-check-circle"></i> 일정 포함됨
                            </button>` :
                    `<button onclick="addToPlan('${place.id}')" class="flex-1 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg transition flex items-center justify-center gap-2 active:scale-95">
                                <i class="fas fa-plus-circle"></i> 일정에 담기
                            </button>`
                }
                        <button onclick="showDetail('${place.id}')" class="w-12 h-12 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition active:scale-95">
                            <i class="fas fa-info-circle text-lg"></i>
                        </button>
                    </div>
                </div>
            </div>`;
        }).join('');

        pool.innerHTML = htmlContent || '<p class="text-center text-gray-400 py-10">검색 결과가 없습니다.</p>';

        // 슬라이더 인덱스 초기화
        POI_DATABASE.forEach(p => {
            window[`sliderIndex_slider-${p.id}`] = 0;
        });
    };

    // 사진 슬라이더 함수
    window.slidePhoto = function (sliderId, direction) {
        const slider = document.getElementById(sliderId);
        if (!slider) return;

        const slideCount = slider.children.length;
        const indexKey = `sliderIndex_${sliderId}`;
        let index = window[indexKey] || 0;

        index += direction;
        if (index < 0) index = slideCount - 1;
        if (index >= slideCount) index = 0;

        window[indexKey] = index;
        slider.style.transform = `translateX(-${index * (100 / slideCount)}%)`;

        // 인디케이터 업데이트
        document.querySelectorAll(`[data-slider="${sliderId}"]`).forEach((dot, i) => {
            dot.classList.toggle('bg-white', i === index);
            dot.classList.toggle('bg-white/50', i !== index);
        });
    };

    window.addToPlan = (id) => {
        if (Object.values(userItinerary).flat().includes(id)) return alert('이미 일정에 있습니다.');
        userItinerary[activeDay].push(id);
        renderBuilderUI();
        updateMapMarkers();
    }

    window.removeFromPlan = (id) => {
        userItinerary[activeDay] = userItinerary[activeDay].filter(itemId => itemId !== id);
        renderBuilderUI();
        updateMapMarkers();
    }

    window.switchDay = (day) => {
        activeDay = day;
        renderHeader();
        renderBuilderUI();
        updateMapMarkers();
    }

    function updateMapMarkers() {
        if (!map) return;
        markers.forEach(m => m.setMap(null));
        markers = [];
        const bounds = new google.maps.LatLngBounds();
        userItinerary[activeDay].forEach((id, idx) => {
            const item = POI_DATABASE.find(p => p.id === id);
            if (item) {
                const marker = new google.maps.Marker({
                    position: { lat: item.lat, lng: item.lng },
                    map: map,
                    label: { text: (idx + 1).toString(), color: "white", fontWeight: 'bold' },
                    animation: google.maps.Animation.DROP
                });
                marker.addListener('click', () => showDetail(id));
                markers.push(marker);
                bounds.extend(marker.getPosition());
            }
        });
        if (markers.length > 0) map.fitBounds(bounds);
        if (window.drawRoute) window.drawRoute(userItinerary[activeDay], POI_DATABASE);
    }

    window.showDetail = function (id) {
        const item = POI_DATABASE.find(p => p.id === id);
        if (!createModal()) return;
        if (map) { map.panTo({ lat: item.lat, lng: item.lng }); map.setZoom(16); }
        const content = document.getElementById('modal-content');
        window.currentDetailTab = 'overview';

        function renderModalContent() {
            const overviewClass = window.currentDetailTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600';
            const reviewsClass = window.currentDetailTab === 'reviews' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600';
            const photosClass = window.currentDetailTab === 'photos' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600';

            let tabContent = '';
            if (window.currentDetailTab === 'overview') {
                const seasonalInfo = item.details.seasonal ? Object.entries(item.details.seasonal).map(([k, v]) => `<li class="text-xs text-gray-600"><span class="font-bold text-blue-500">${k.toUpperCase()}:</span> ${v}</li>`).join('') : '';
                const recommendTags = item.details.recommend ? item.details.recommend.map(r => `<span class="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold">#${r}</span>`).join('') : '';

                tabContent = `
                <div class="space-y-6 animate-fade-in">
                    <div>
                        <p class="text-gray-600 leading-relaxed text-lg">${item.desc}</p>
                        <div class="flex gap-2 mt-3">${recommendTags}</div>
                    </div>
                    
                    <div class="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                        <h3 class="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2"><i class="fas fa-info-circle text-blue-500"></i> 상세 정보</h3>
                        <div class="prose text-sm text-gray-600 leading-relaxed space-y-2">
                            <p>${item.details?.info || '정보 업데이트 중...'}</p>
                            ${item.details?.menu ? `<p class="text-xs bg-orange-50 p-2 rounded text-orange-800">🍽️ <strong>추천 메뉴:</strong> ${item.details.menu}</p>` : ''}
                            ${item.details?.tips ? `<p class="text-xs bg-yellow-50 p-2 rounded text-yellow-800">💡 <strong>꿀팁:</strong> ${item.details.tips}</p>` : ''}
                        </div>
                    </div>

                    ${seasonalInfo ? `
                    <div class="bg-green-50 p-5 rounded-2xl border border-green-100">
                        <h3 class="font-bold text-green-800 text-sm mb-2 flex items-center gap-2"><i class="fas fa-leaf"></i> 계절별 포인트</h3>
                        <ul class="space-y-1">${seasonalInfo}</ul>
                    </div>` : ''}

                    ${item.details?.transport ? `<div class="space-y-2"><h3 class="font-bold text-gray-800 text-sm flex items-center gap-2"><i class="fas fa-subway text-purple-500"></i> 교통편</h3><div class="bg-purple-50 p-3 rounded-xl border border-purple-100 text-xs">${item.details.transport}</div></div>` : ''}
                    
                    <div class="flex gap-3 pt-4">
                        <button onclick="addToPlan('${item.id}'); closeModal();" class="flex-1 bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg flex items-center justify-center gap-2"><i class="fas fa-plus-circle"></i> 일정에 담기</button>
                        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name)}" target="_blank" class="flex-1 bg-gray-800 text-white text-center py-4 rounded-xl font-bold hover:bg-gray-700 transition shadow-lg flex items-center justify-center gap-2"><i class="fas fa-map-marked-alt"></i> 구글맵</a>
                    </div>
                </div>`;
            } else if (window.currentDetailTab === 'reviews') {
                tabContent = `<div class="space-y-4 animate-fade-in"><div class="flex items-center gap-4 mb-6 bg-blue-50 p-4 rounded-xl"><div class="text-4xl font-black text-blue-600">${item.rating}</div><div><div class="flex text-yellow-400 text-sm mb-1">${'★'.repeat(Math.floor(item.rating))}</div><p class="text-xs text-gray-500">실제 여행객 리뷰 요약</p></div></div><div class="space-y-4">${item.reviews ? item.reviews.map(r => `<div class="border-b border-gray-100 pb-4"><div class="flex justify-between mb-2"><span class="font-bold text-sm text-gray-800">${r.user}</span><span class="text-xs text-gray-400">${r.date}</span></div><p class="text-sm text-gray-600">${r.text}</p></div>`).join('') : '<p class="text-sm text-gray-500">리뷰가 없습니다.</p>'}</div></div>`;
            } else if (window.currentDetailTab === 'photos') {
                tabContent = `<div class="grid grid-cols-2 gap-2 animate-fade-in">${item.photos.map(p => `<div class="aspect-square rounded-lg overflow-hidden bg-gray-100"><img src="${p}" class="w-full h-full object-cover" onclick="window.open('${p}','_blank')" onerror="this.src='images/travel/fukuoka/placeholder.jpg'"></div>`).join('')}</div>`;
            }

            content.innerHTML = `<div class="relative h-72 bg-gray-900 group"><img src="${item.photos[0]}" class="w-full h-full object-cover opacity-90" onerror="this.src='images/travel/fukuoka/placeholder.jpg'"><button onclick="closeModal()" class="absolute top-4 right-4 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center">✕</button><div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 pt-20"><h2 class="text-3xl font-black text-white mb-1">${item.name}</h2><div class="flex gap-2 mt-2">${item.details.themes ? item.details.themes.map(t => `<span class="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded backdrop-blur-sm">${t}</span>`).join('') : ''}</div></div></div><div class="sticky top-0 bg-white z-10 flex border-b shadow-sm"><button class="flex-1 py-4 text-sm font-bold transition ${overviewClass}" onclick="window.switchDetailTab('overview')">개요</button><button class="flex-1 py-4 text-sm font-bold transition ${reviewsClass}" onclick="window.switchDetailTab('reviews')">리뷰</button><button class="flex-1 py-4 text-sm font-bold transition ${photosClass}" onclick="window.switchDetailTab('photos')">사진</button></div><div class="p-6 pb-24">${tabContent}</div>`;
        }
        window.switchDetailTab = (tab) => { window.currentDetailTab = tab; renderModalContent(); };
        renderModalContent();
    }

    function createModal() {
        let m = document.getElementById('app-modal');
        if (!m) { m = document.createElement('div'); m.id = 'app-modal'; m.className = 'fixed inset-0 z-50 hidden'; m.innerHTML = `<div class="absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="closeModal()"></div><div class="absolute bottom-0 w-full md:w-[480px] md:right-0 md:top-0 h-[90vh] md:h-full bg-white rounded-t-2xl md:rounded-none flex flex-col overflow-hidden shadow-2xl"><div id="modal-content" class="flex-1 overflow-y-auto scrollbar-hide bg-white"></div></div>`; document.body.appendChild(m); }
        m.classList.remove('hidden'); return true;
    }
    window.closeModal = () => document.getElementById('app-modal').classList.add('hidden');
    function injectCSS() { const s = document.createElement('style'); s.textContent = `.scrollbar-hide::-webkit-scrollbar { display: none; } .animate-fade-in { animation: fadeIn 0.3s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }`; document.head.appendChild(s); }

    initApp();
}
window.initFukuokaTrip = initFukuokaTrip;
