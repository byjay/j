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
            id: "tenjin_underground",
            name: "텐진 지하상가",
            lat: 33.5915,
            lng: 130.4010,
            type: "spot",
            region: "tenjin",
            rating: 4.3,
            desc: "19세기 유럽 거리를 모티브로 한 규슈 최대의 지하 쇼핑가.",
            photos: ["https://images.unsplash.com/photo-1519810755548-39cd217da494?w=800"],
            details: {
                info: "패션, 잡화, 카페 등 150여 개의 점포가 길게 늘어서 있습니다.",
                transport: "지하철 텐진역 직결",
                tips: "유명한 '베이크 치즈 타르트'나 '링고 애플파이'를 간식으로 드셔보세요."
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
            <div class="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-100 shadow-inner">
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
            <div id="spot-pool" class="grid grid-cols-1 gap-4 pb-24"></div>`;

        renderSpotPool('all');
    }

    window.verifyRoute = () => {
        if (window.startPreviewTravel) {
            window.startPreviewTravel(userItinerary[activeDay], POI_DATABASE);
        } else {
            alert('미리여행 기능을 로드하는 중입니다. 잠시 후 다시 시도해주세요.');
        }
    };

    window.renderSpotPool = function (region) {
        const pool = document.getElementById('spot-pool');
        const filtered = region === 'all' ? POI_DATABASE : POI_DATABASE.filter(p => p.region === region);

        let htmlContent = filtered.map(place => {
            const isAdded = Object.values(userItinerary).flat().includes(place.id);
            const btnClass = isAdded ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-blue-600";
            const btnText = isAdded ? "✅ 일정 포함됨" : `<i class="fas fa-plus"></i> 일정에 담기`;
            const btnAction = isAdded ? "" : `onclick="addToPlan('${place.id}')"`;
            const themeTags = place.details.themes ? place.details.themes.map(t => `<span class="text-[9px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">${t}</span>`).join('') : '';

            return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div class="flex p-4 gap-4">
                    <div class="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden cursor-pointer group" onclick="showDetail('${place.id}')">
                        <img src="${place.photos[0]}" class="w-full h-full object-cover transition group-hover:scale-110" onerror="this.src='images/travel/fukuoka/placeholder.jpg'">
                        <div class="absolute bottom-0 w-full bg-black/60 text-white text-[10px] text-center py-1">상세보기</div>
                    </div>
                    <div class="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start">
                                <h4 class="font-bold text-gray-900 text-lg truncate cursor-pointer hover:text-blue-600" onclick="showDetail('${place.id}')">${place.name}</h4>
                                <span class="text-[10px] font-bold px-2 py-0.5 rounded ${place.type === 'food' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}">${place.type.toUpperCase()}</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1 line-clamp-2">${place.desc}</p>
                            <div class="flex flex-wrap gap-1 mt-2">${themeTags}</div>
                            <div class="flex items-center gap-1 mt-2">
                                <span class="text-yellow-400 text-xs">★</span>
                                <span class="text-xs font-bold text-gray-700">${place.rating}</span>
                                <span class="text-[10px] text-gray-400 ml-1">(${place.reviews ? place.reviews.length * 123 : 0})</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="px-4 pb-4">
                    <button ${btnAction} class="w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition ${btnClass}">
                        ${btnText}
                    </button>
                </div>
            </div>`;
        }).join('');

        pool.innerHTML = htmlContent;
    }

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
