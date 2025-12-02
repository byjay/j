
function initSapporoTrip() {
    console.log('❄️ Sapporo App V4.0 Loaded [FAMILY MODE - ULTRA UI]');

    // ==========================================================================
    //  ❄️ MASSIVE DATABASE: SAPPORO (30+ Spots)
    // ==========================================================================
    const POI_DATABASE = [
        // --- 교통 ---
        {
            id: 'cts_airport', name: '신치토세 공항 (CTS)', lat: 42.7874, lng: 141.6813, type: 'transport', region: 'airport', rating: 4.5,
            desc: '온천과 영화관이 있는 테마파크형 공항.',
            photos: ['https://images.unsplash.com/photo-1580225598739-44585c5d0459?w=800'],
            details: {
                info: "국내선 청사 3층 라멘 도장과 로이즈 초콜릿 월드는 필수 코스입니다. 공항 내 온천에서 여행의 피로를 풀 수 있습니다.",
                transport: `
                    <div class="space-y-2">
                        <p class="text-xs text-gray-600">🚆 JR 쾌속 에어포트 (삿포로역 37분) 추천</p>
                        <p class="text-xs text-gray-600">🚌 공항 리무진 버스 (스스키노/오도리 직통)</p>
                    </div>`
            },
            learning: { situation: "렌트카", phrase: "스노우 타이어 장착되어 있나요?", pronunciation: "스노-타이야와 츠이테 마스카?", meaning: "겨울 운전 시 필수 질문." }
        },

        // --- 삿포로 시내 ---
        {
            id: 'odori_park', name: '오도리 공원', lat: 43.0600, lng: 141.3500, type: 'spot', region: 'central', rating: 4.4,
            desc: '눈축제와 맥주축제의 메인 무대.',
            photos: ['https://images.unsplash.com/photo-1542931287-023b922fa89b?w=800'],
            shop_keyword: '핫팩',
            details: {
                info: "겨울엔 눈축제(2월), 여름엔 맥주축제(7-8월)가 열립니다. 명물 구운 옥수수와 감자를 꼭 드셔보세요.",
                transport: `<p class="text-xs text-gray-600">🚇 오도리역 바로 앞</p>`
            }
        },
        {
            id: 'tv_tower', name: '삿포로 TV타워', lat: 43.0611, lng: 141.3564, type: 'spot', region: 'central', rating: 4.3,
            desc: '오도리 공원이 한눈에 보이는 랜드마크.',
            photos: ['https://images.unsplash.com/photo-1579262963363-22246759c22d?w=800'],
            details: {
                info: "밤에 타워에 조명이 켜지면 공원에서 바라보는 뷰가 환상적입니다. 전망대에서 보는 오도리 공원의 야경이 일품입니다.",
                transport: `<p class="text-xs text-gray-600">🎫 전망대 입장권 할인 추천</p>`
            }
        },
        {
            id: 'susukino', name: '스스키노 거리', lat: 43.0555, lng: 141.3533, type: 'spot', region: 'central', rating: 4.5,
            desc: '화려한 네온사인. 니카상 간판.',
            photos: ['https://images.unsplash.com/photo-1535448033526-2729314bbc30?w=800'],
            details: {
                info: "니카상 배경 사진은 교차로 건너편 건물 2층에서 찍으면 잘 나옵니다. 삿포로 최대의 유흥가이자 맛집 밀집 지역입니다.",
                transport: `<p class="text-xs text-gray-600">🚇 스스키노역 바로 연결</p>`
            }
        },
        {
            id: 'clock_tower', name: '삿포로 시계탑', lat: 43.0626, lng: 141.3537, type: 'spot', region: 'central', rating: 3.8,
            desc: '일본 최고(最古)의 시계탑.',
            photos: ['https://images.unsplash.com/photo-1612347366838-89c025076639?w=800'],
            details: { info: "내부 관람보다는 외부에서 사진만 찍고 이동하는 것을 추천합니다. 밤에 조명이 켜지면 더 예쁩니다." }
        },
        {
            id: 'akarenga', name: '구 본청사 (아카렌가)', lat: 43.0639, lng: 141.3478, type: 'spot', region: 'central', rating: 4.4,
            desc: '붉은 벽돌의 고풍스러운 건물.',
            photos: ['https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800'],
            details: { info: "정원이 예뻐서 산책하기 좋습니다. 내부는 무료로 관람 가능하며 홋카이도의 역사를 볼 수 있습니다." }
        },
        {
            id: 'beer_museum', name: '삿포로 맥주 박물관', lat: 43.0713, lng: 141.3695, type: 'spot', region: 'central', rating: 4.6,
            desc: '갓 만든 삿포로 클래식 생맥주.',
            photos: ['https://images.unsplash.com/photo-1629125306979-43c223c60447?w=800'],
            details: {
                info: "1층 스타홀에서 유료 시음(3종 샘플러)은 필수입니다. 징기스칸 식당은 예약해야 합니다. 삿포로 클래식은 홋카이도 한정입니다.",
                transport: `<p class="text-xs text-gray-600">🚌 삿포로역 북쪽 출구에서 직행 버스 (188번)</p>
                            <p class="text-xs text-gray-600">🚌 팩토리 라인 순환 버스 (88번)</p>`
            }
        },
        {
            id: 'nijo_market', name: '니조 시장', lat: 43.0575, lng: 141.3582, type: 'food', region: 'central', rating: 4.2,
            desc: '아침 식사 가능한 해산물 시장.',
            photos: ['https://images.unsplash.com/photo-1579623696562-b91c01995801?w=800'],
            details: {
                info: "오전 7시부터 영업. 우니(성게알) 덮밥과 털게가 유명합니다. 오도리 공원에서 걸어서 갈 수 있습니다.",
                transport: `<p class="text-xs text-gray-600">🚇 버스센터마에역 도보 3분</p>`
            }
        },
        {
            id: 'tanukikoji', name: '다누키코지 상점가', lat: 43.0565, lng: 141.3540, type: 'spot', region: 'central', rating: 4.3,
            desc: '비 오는 날도 OK. 거대 아케이드.',
            photos: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'],
            shop_keyword: '드럭스토어',
            details: { info: "메가 돈키호테가 있습니다. 기념품 쇼핑의 최적 장소. 1초메부터 7초메까지 이어집니다." }
        },
        {
            id: 'nakajima_park', name: '나카지마 공원', lat: 43.0445, lng: 141.3556, type: 'spot', region: 'central', rating: 4.5,
            desc: '도심 속 호수 공원. 단풍 명소.',
            photos: ['https://images.unsplash.com/photo-1576788235839-55668b577366?w=800'],
            details: { info: "스스키노에서 도보로 갈 수 있습니다. 조용하게 산책하기 좋습니다. 보트도 탈 수 있습니다." }
        },

        // --- 서부 ---
        {
            id: 'shiroi', name: '시로이 코이비토 파크', lat: 43.0886, lng: 141.2706, type: 'spot', region: 'west', rating: 4.5,
            desc: '동화 속 과자 공장.',
            photos: ['https://images.unsplash.com/photo-1516475429286-465d815a0df7?w=800'],
            shop_keyword: '쿠키 선물세트',
            details: {
                info: "정원은 무료 개방. 유료 구역에선 쿠키 만들기 체험이 가능합니다. 아이들과 가기 좋은 곳입니다.",
                transport: `<p class="text-xs text-gray-600">🚇 도자이선 미야노사와역 도보 7분</p>`
            }
        },
        {
            id: 'hokkaido_shrine', name: '홋카이도 신궁', lat: 43.0537, lng: 141.3076, type: 'spot', region: 'west', rating: 4.4,
            desc: '울창한 숲 속의 신사. 벚꽃 명소.',
            photos: ['https://images.unsplash.com/photo-1589539120894-35d9472e3995?w=800'],
            details: { info: "마루야마 공원 안에 위치합니다. 리락쿠마 에마(소원판)가 귀엽습니다. 운세를 뽑아보세요." }
        },
        {
            id: 'maruyama_zoo', name: '마루야마 동물원', lat: 43.0515, lng: 141.3015, type: 'spot', region: 'west', rating: 4.3,
            desc: '북극곰을 볼 수 있는 동물원.',
            photos: ['https://images.unsplash.com/photo-1570649237648-512c58902521?w=800'],
            details: { info: "홋카이도 신궁 바로 옆입니다. 아이들과 가기 좋습니다. 래서판다도 인기입니다." }
        },
        {
            id: 'moiwa', name: '모이와야마 전망대', lat: 43.0236, lng: 141.3197, type: 'spot', region: 'west', rating: 4.7,
            desc: '일본 신 3대 야경. 로프웨이.',
            photos: ['https://images.unsplash.com/photo-1612347366838-89c025076639?w=800'],
            details: {
                info: "삿포로 시내가 보석처럼 빛납니다. 정상은 바람이 많이 부니 따뜻하게 입으세요. 로프웨이와 미니 케이블카를 타고 올라갑니다.",
                transport: `<p class="text-xs text-gray-600">🚃 노면전차 '로프웨이 이리구치' 하차 후 셔틀버스</p>`
            }
        },

        // --- 오타루 ---
        {
            id: 'otaru_canal', name: '오타루 운하', lat: 43.1994, lng: 141.0016, type: 'spot', region: 'otaru', rating: 4.7,
            desc: '영화 러브레터의 그곳.',
            photos: ['https://images.unsplash.com/photo-1548834764-d8d475545a4d?w=800'],
            shop_keyword: '장갑',
            details: {
                info: "해 질 녘 가스등이 켜질 때가 가장 아름답습니다. 운하 크루즈를 타면 색다른 뷰를 볼 수 있습니다.",
                transport: `<p class="text-xs text-gray-600">🚆 삿포로역에서 JR 쾌속 에어포트 (35분)</p>`
            }
        },
        {
            id: 'orgel_doh', name: '오르골당 본관', lat: 43.1906, lng: 141.0075, type: 'spot', region: 'otaru', rating: 4.6,
            desc: '세계 최대 규모 오르골 상점.',
            photos: ['https://images.unsplash.com/photo-1610961805527-33a927774213?w=800'],
            details: { info: "입구 앞 증기 시계는 15분마다 소리를 냅니다. 내부가 매우 아름답고 다양한 오르골을 구경할 수 있습니다." }
        },
        {
            id: 'letao', name: '르타오 본점', lat: 43.1912, lng: 141.0080, type: 'food', region: 'otaru', rating: 4.7,
            desc: '더블 프로마쥬 치즈케이크.',
            photos: ['https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800'],
            details: { info: "2층 카페에서 티 타임을 즐기세요. 3층 전망대 무료 개방. 시식도 많이 줍니다." }
        },
        {
            id: 'kitaichi', name: '키타이치 가라스관', lat: 43.1925, lng: 141.0083, type: 'spot', region: 'otaru', rating: 4.4,
            desc: '석유 램프가 켜진 환상적인 카페.',
            photos: ['https://images.unsplash.com/photo-1554797589-7241bb691973?w=800'],
            details: { info: "3호관 카페는 전기가 아닌 167개의 석유 램프로만 조명을 밝힙니다. 분위기가 정말 좋습니다." }
        },
        {
            id: 'kamaei', name: '카마에이 어묵 공장', lat: 43.1950, lng: 141.0050, type: 'food', region: 'otaru', rating: 4.3,
            desc: '갓 튀긴 빵롤(판로르) 어묵.',
            photos: ['https://images.unsplash.com/photo-1516475429286-465d815a0df7?w=800'],
            details: { info: "공장 견학 무료. 빵롤은 여기서만 먹을 수 있는 별미입니다. 간식으로 딱입니다." }
        },

        // --- 비에이/후라노 (Tour) ---
        {
            id: 'biei_tour', name: '비에이 패치워크 로드', lat: 43.5902, lng: 142.4674, type: 'spot', region: 'tour', rating: 4.9,
            desc: '켄과 메리의 나무, 세븐스타 나무.',
            photos: ['https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800'],
            shop_keyword: '방한 부츠',
            details: {
                info: "대중교통으로 가기 어렵습니다. 렌트카나 버스 투어를 이용하세요. 겨울엔 온통 하얀 설경이 펼쳐집니다.",
                transport: `<p class="text-xs text-gray-600">🚌 비에이/후라노 일일 투어 예약 추천</p>
                            <p class="text-xs text-gray-600">🚗 렌트카 이용 시 스노우 타이어 필수</p>`
            }
        },
        {
            id: 'blue_pond', name: '청의 호수 (아오이이케)', lat: 43.4938, lng: 142.6143, type: 'spot', region: 'tour', rating: 4.7,
            desc: '신비로운 푸른 물빛의 호수.',
            photos: ['https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=800'],
            details: { info: "날씨에 따라 물색이 다릅니다. 겨울엔 라이트업 행사를 합니다. 주차장이 잘 되어 있습니다." }
        },
        {
            id: 'shirahige', name: '흰수염 폭포', lat: 43.4750, lng: 142.6375, type: 'spot', region: 'tour', rating: 4.6,
            desc: '얼지 않는 푸른 폭포.',
            photos: ['https://images.unsplash.com/photo-1536691881682-1df64599547d?w=800'],
            details: { info: "청의 호수 근처입니다. 다리 위에서 내려다보는 뷰가 장관입니다. 온천수가 섞여 있어 겨울에도 얼지 않습니다." }
        },
        {
            id: 'ningle', name: '닝구르 테라스', lat: 43.3235, lng: 142.3556, type: 'spot', region: 'tour', rating: 4.5,
            desc: '요정이 살 것 같은 통나무 집 마을.',
            photos: ['https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800'],
            details: { info: "밤에 조명이 켜지면 훨씬 예쁩니다. 수공예품을 팝니다. 신후라노 프린스 호텔 주차장을 이용하세요." }
        },
        {
            id: 'noboribetsu', name: '노보리베츠 온천', lat: 42.4959, lng: 141.1466, type: 'spot', region: 'tour', rating: 4.6,
            desc: '지옥 계곡이 있는 홋카이도 대표 온천 마을.',
            photos: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'],
            details: {
                info: "유황 냄새가 강하게 납니다. 지옥 계곡 산책로를 걷고 족욕탕에서 발을 담그세요. 곰 목장도 근처에 있습니다.",
                transport: `<p class="text-xs text-gray-600">🚌 삿포로역에서 고속버스 (약 100분)</p>`
            }
        },

        // --- 맛집 (Food) ---
        {
            id: 'daruma', name: '징기스칸 다루마', lat: 43.0538, lng: 141.3530, type: 'food', region: 'central', rating: 4.3,
            desc: '삿포로 양고기의 전설.',
            photos: ['https://images.unsplash.com/photo-1582234033096-7c06834b97d7?w=800'],
            details: { info: "웨이팅이 깁니다. 4.4점, 5.5점 등 지점이 많으니 분산해서 가세요. 옷에 냄새가 많이 배니 주의하세요." }
        },
        {
            id: 'suage', name: '스프카레 스아게+', lat: 43.0552, lng: 141.3536, type: 'food', region: 'central', rating: 4.6,
            desc: '튀긴 야채가 맛있는 스프카레.',
            photos: ['https://images.unsplash.com/photo-1548943487-a2e4e43b485c?w=800'],
            details: { info: "치즈 밥을 꼭 추가하세요. 브로콜리 토핑도 인기입니다. 맵기 조절이 가능합니다." }
        },
        {
            id: 'garaku', name: '스프카레 가라쿠', lat: 43.0560, lng: 141.3540, type: 'food', region: 'central', rating: 4.5,
            desc: '진한 국물의 스프카레 맛집.',
            photos: ['https://images.unsplash.com/photo-1599354607478-6f363c473167?w=800'],
            details: { info: "대기표를 뽑고 오도리 공원을 산책하고 오면 좋습니다. 국물이 진하고 감칠맛이 납니다." }
        },
        {
            id: 'shingen', name: '라멘 신겐', lat: 43.0522, lng: 141.3468, type: 'food', region: 'central', rating: 4.4,
            desc: '현지인이 사랑하는 미소 라멘.',
            photos: ['https://images.unsplash.com/photo-1552611052-33e04de081de?w=800'],
            details: { info: "국물이 부드럽고 볶음밥(차한)이 정말 맛있습니다. 하프 사이즈 라멘도 있습니다." }
        },
        {
            id: 'kani_honke', name: '카니혼케', lat: 43.0652, lng: 141.3518, type: 'food', region: 'central', rating: 4.2,
            desc: '대게 코스 요리 전문점.',
            photos: ['https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800'],
            details: { info: "점심 특선을 이용하면 합리적인 가격에 게 요리를 즐길 수 있습니다. 예약 필수." }
        },

        // --- 호텔 (Hotel) ---
        {
            id: 'the_knot', name: '더 놋 삿포로', lat: 43.0568, lng: 141.3535, type: 'hotel', region: 'central', rating: 4.5,
            desc: '지하상가 연결. 힙한 감성.',
            photos: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
            details: { info: "스스키노와 오도리 공원 사이라 위치가 최고입니다. 1층에 세이코마트가 있습니다." }
        },
        {
            id: 'nikko', name: 'JR 타워 호텔 닛코', lat: 43.0686, lng: 141.3508, type: 'hotel', region: 'central', rating: 4.7,
            desc: '삿포로역 직결. 최고의 뷰.',
            photos: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'],
            details: { info: "가장 높은 곳에서 삿포로 시내를 내려다볼 수 있습니다. 스파 시설도 훌륭합니다." }
        }
    ];

    // ==========================================================================
    //  🚀 CORE ENGINE (STATE MANAGEMENT & UI)
    // ==========================================================================
    let userItinerary = { 1: ['cts_airport', 'the_knot', 'susukino', 'daruma'], 2: [], 3: [], 4: [] };
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
        map = new google.maps.Map(mapEl, {
            center: { lat: 43.0618, lng: 141.3545 },
            zoom: 12,
            mapTypeControl: false, streetViewControl: false, fullscreenControl: true
        });
        updateMapMarkers();
    }

    function renderHeader() {
        const container = document.getElementById('day-tabs');
        if (!container) return;
        container.innerHTML = Object.keys(userItinerary).map(day =>
            `<button onclick="switchDay(${day})" 
                class="px-4 py-2 rounded-full text-sm font-bold transition-all border shadow-sm ${day == activeDay
                ? 'bg-cyan-600 text-white scale-105 border-cyan-700'
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
            return `
                <div class="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 transition hover:shadow-md">
                    <div class="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        ${idx + 1}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="font-bold text-gray-700 text-sm cursor-pointer hover:text-cyan-600 truncate" onclick="showDetail('${item.id}')">
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
            <!-- 1. 내 일정 -->
            <div class="bg-cyan-50 p-4 rounded-xl mb-6 border border-cyan-100 shadow-inner">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-bold text-cyan-800 flex items-center gap-2">📅 Day ${activeDay} 일정</h3>
                    <span class="text-xs text-cyan-600 bg-white px-2 py-1 rounded border border-cyan-200 font-bold">${userItinerary[activeDay].length}곳 선택됨</span>
                </div>
                <div id="my-plan-list" class="space-y-2 min-h-[50px]">
                    ${userItinerary[activeDay].length === 0 ? '<p class="text-center text-gray-400 text-xs py-6 border-2 border-dashed border-cyan-200 rounded-lg">아래 목록에서 [+] 버튼을 눌러<br>장소를 추가해보세요.</p>' : planList}
                </div>
            </div>

            <!-- 2. 필터 버튼 -->
            <div class="mb-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide filters">
                <button onclick="filterSpots('all')" class="filter-btn active bg-gray-800 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition">전체</button>
                <button onclick="filterSpots('central')" class="filter-btn bg-white text-gray-600 border border-gray-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition hover:bg-gray-50">삿포로 시내</button>
                <button onclick="filterSpots('otaru')" class="filter-btn bg-white text-gray-600 border border-gray-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition hover:bg-gray-50">오타루</button>
                <button onclick="filterSpots('tour')" class="filter-btn bg-white text-gray-600 border border-gray-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition hover:bg-gray-50">비에이/투어</button>
            </div>

            <!-- 3. 장소 리스트 -->
            <div id="spot-pool" class="grid grid-cols-1 gap-4 pb-24"></div>`;

        renderSpotPool('all');
    }

    window.renderSpotPool = function (region) {
        const pool = document.getElementById('spot-pool');
        const filtered = region === 'all' ? POI_DATABASE : POI_DATABASE.filter(p => p.region === region);

        let htmlContent = filtered.map(place => {
            const isAdded = userItinerary[activeDay].includes(place.id);
            const btnClass = isAdded ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-cyan-600";
            const btnText = isAdded ? "✅ 일정 포함됨" : `<i class="fas fa-plus"></i> 일정에 담기`;
            const btnAction = isAdded ? "" : `onclick="addToPlan('${place.id}')"`;

            return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div class="flex p-4 gap-4">
                    <!-- Image Section -->
                    <div class="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden cursor-pointer group" onclick="showDetail('${place.id}')">
                        <img src="${place.photos[0]}" class="w-full h-full object-cover transition group-hover:scale-110">
                        <div class="absolute bottom-0 w-full bg-black/60 text-white text-[10px] text-center py-1">상세보기</div>
                    </div>
                    
                    <!-- Content Section -->
                    <div class="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start">
                                <h4 class="font-bold text-gray-900 text-lg truncate cursor-pointer hover:text-cyan-600" onclick="showDetail('${place.id}')">${place.name}</h4>
                                <span class="text-[10px] font-bold px-2 py-0.5 rounded ${place.type === 'food' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}">${place.type.toUpperCase()}</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1 line-clamp-2">${place.desc}</p>
                            <div class="flex items-center gap-1 mt-2">
                                <span class="text-yellow-400 text-xs">★</span>
                                <span class="text-xs font-bold text-gray-700">${place.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Action Button -->
                <div class="px-4 pb-4">
                    <button ${btnAction} class="w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition ${btnClass}">
                        ${btnText}
                    </button>
                </div>
            </div>`;
        }).join('');

        pool.innerHTML = htmlContent;
    }

    // --- 인터랙션 로직 ---
    window.filterSpots = (region) => {
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('bg-gray-800', 'text-white');
            b.classList.add('bg-white', 'text-gray-600');
        });
        event.target.classList.add('bg-gray-800', 'text-white');
        event.target.classList.remove('bg-white', 'text-gray-600');
        renderSpotPool(region);
    }

    window.addToPlan = (id) => {
        if (userItinerary[activeDay].includes(id)) return alert('이미 일정에 있습니다.');
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
    }

    // --- 상세 모달 (구글맵 스타일 시뮬레이션) ---
    window.showDetail = function (id) {
        const item = POI_DATABASE.find(p => p.id === id);
        if (!createModal()) return;

        // 지도 이동 시뮬레이션
        if (map) {
            map.panTo({ lat: item.lat, lng: item.lng });
            map.setZoom(16);
        }

        const content = document.getElementById('modal-content');
        window.currentDetailTab = 'overview';

        function renderModalContent() {
            const overviewClass = window.currentDetailTab === 'overview' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-400 hover:text-gray-600';
            const reviewsClass = window.currentDetailTab === 'reviews' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-400 hover:text-gray-600';
            const photosClass = window.currentDetailTab === 'photos' ? 'text-cyan-600 border-b-2 border-cyan-600' : 'text-gray-400 hover:text-gray-600';

            let tabContent = '';

            if (window.currentDetailTab === 'overview') {
                tabContent = `
                    <div class="space-y-8 animate-fade-in">
                        <div><p class="text-gray-600 leading-relaxed text-lg">${item.desc}</p></div>
                        <div class="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <h3 class="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2"><i class="fas fa-info-circle text-cyan-500"></i> 상세 정보</h3>
                            <div class="prose text-sm text-gray-600 leading-relaxed">${item.details?.info || '정보 업데이트 중...'}</div>
                        </div>
                        ${item.learning ? `
                        <div class="bg-yellow-50 p-5 rounded-2xl border border-yellow-200 relative overflow-hidden">
                            <div class="absolute top-0 right-0 p-4 opacity-10 text-6xl">🇯🇵</div>
                            <h3 class="font-bold text-yellow-800 text-sm mb-3">실전 일본어 (${item.learning.situation})</h3>
                            <p class="text-xl font-black text-gray-800 mb-1">"${item.learning.phrase}"</p>
                            <p class="text-sm text-gray-500 font-mono bg-white/50 inline-block px-2 rounded mb-2">${item.learning.pronunciation}</p>
                            <p class="text-sm text-gray-600">${item.learning.meaning}</p>
                        </div>` : ''}
                        ${item.details?.transport ? `<div class="space-y-3"><h3 class="font-bold text-gray-800 text-sm flex items-center gap-2"><i class="fas fa-ticket-alt text-purple-500"></i> 티켓 & 교통</h3><div class="bg-purple-50 p-4 rounded-xl border border-purple-100">${item.details.transport}</div></div>` : ''}
                        <div class="flex gap-3">
                            <button onclick="addToPlan('${item.id}'); closeModal();" class="flex-1 bg-cyan-600 text-white py-4 rounded-xl font-bold hover:bg-cyan-700 transition shadow-lg flex items-center justify-center gap-2">
                                <i class="fas fa-plus-circle"></i> 일정에 담기
                            </button>
                            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name)}" target="_blank" class="flex-1 bg-gray-800 text-white text-center py-4 rounded-xl font-bold hover:bg-gray-700 transition shadow-lg flex items-center justify-center gap-2">
                                <i class="fas fa-map-marked-alt"></i> 구글맵
                            </a>
                        </div>
                    </div>`;
            } else if (window.currentDetailTab === 'reviews') {
                tabContent = `
                    <div class="space-y-4 animate-fade-in">
                        <div class="flex items-center gap-4 mb-6 bg-cyan-50 p-4 rounded-xl">
                            <div class="text-4xl font-black text-cyan-600">${item.rating}</div>
                            <div>
                                <div class="flex text-yellow-400 text-sm mb-1">${'★'.repeat(Math.floor(item.rating))}${item.rating % 1 >= 0.5 ? '½' : ''}</div>
                                <p class="text-xs text-gray-500">방문자 리뷰 400+개</p>
                            </div>
                        </div>
                        <div class="border-b border-gray-100 pb-4">
                            <div class="flex justify-between mb-2"><span class="font-bold text-sm">눈사람</span><span class="text-xs text-gray-400">2일 전</span></div>
                            <div class="text-yellow-400 text-xs mb-2">★★★★★</div>
                            <p class="text-sm text-gray-600">겨울 왕국 그 자체입니다. 너무 아름다워요.</p>
                        </div>
                        <div class="border-b border-gray-100 pb-4">
                            <div class="flex justify-between mb-2"><span class="font-bold text-sm">미식가</span><span class="text-xs text-gray-400">5일 전</span></div>
                            <div class="text-yellow-400 text-xs mb-2">★★★★☆</div>
                            <p class="text-sm text-gray-600">음식이 정말 맛있습니다. 특히 해산물!</p>
                        </div>
                    </div>`;
            } else if (window.currentDetailTab === 'photos') {
                tabContent = `
                    <div class="grid grid-cols-2 gap-2 animate-fade-in">
                        ${item.photos.map(photo => `<div class="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition"><img src="${photo}" class="w-full h-full object-cover" onclick="window.open('${photo}', '_blank')"></div>`).join('')}
                        <div class="aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center text-gray-400"><i class="fas fa-camera text-2xl"></i></div>
                    </div>`;
            }

            content.innerHTML = `
                <div class="relative h-72 bg-gray-900 group">
                    <img src="${item.photos[0]}" class="w-full h-full object-cover opacity-90 transition group-hover:opacity-100 duration-700">
                    <button onclick="closeModal()" class="absolute top-4 right-4 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center backdrop-blur hover:bg-black/70 transition z-20">✕</button>
                    <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-20">
                        <span class="bg-cyan-600 text-white text-[10px] px-2 py-1 rounded-full font-bold mb-2 inline-block">${item.region.toUpperCase()}</span>
                        <h2 class="text-3xl font-black text-white leading-tight mb-1">${item.name}</h2>
                        <div class="flex items-center gap-2 text-white/90 text-sm">
                            <span class="text-yellow-400">★ ${item.rating}</span>
                            <span>•</span>
                            <span>${item.type.toUpperCase()}</span>
                        </div>
                    </div>
                </div>
                
                <div class="sticky top-0 bg-white z-10 flex border-b shadow-sm">
                    <button class="flex-1 py-4 text-sm font-bold transition ${overviewClass}" onclick="window.switchDetailTab('overview')">개요</button>
                    <button class="flex-1 py-4 text-sm font-bold transition ${reviewsClass}" onclick="window.switchDetailTab('reviews')">리뷰</button>
                    <button class="flex-1 py-4 text-sm font-bold transition ${photosClass}" onclick="window.switchDetailTab('photos')">사진</button>
                </div>

                <div class="p-6 pb-24">
                    ${tabContent}
                </div>`;
        }

        window.switchDetailTab = function (tab) {
            window.currentDetailTab = tab;
            renderModalContent();
        };

        renderModalContent();
    }

    // --- Helpers ---
    function createModal() {
        let m = document.getElementById('app-modal');
        if (!m) {
            m = document.createElement('div');
            m.id = 'app-modal';
            m.className = 'fixed inset-0 z-50 hidden';
            m.innerHTML = `<div class="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onclick="closeModal()"></div><div class="absolute bottom-0 w-full md:w-[480px] md:right-0 md:top-0 h-[90vh] md:h-full bg-white rounded-t-2xl md:rounded-none flex flex-col overflow-hidden shadow-2xl transition-transform transform translate-y-0"><div id="modal-content" class="flex-1 overflow-y-auto scrollbar-hide bg-white"></div></div>`;
            document.body.appendChild(m);
        }
        m.classList.remove('hidden');
        return true;
    }

    window.closeModal = () => document.getElementById('app-modal').classList.add('hidden');

    function injectCSS() {
        const s = document.createElement('style');
        s.textContent = `.scrollbar-hide::-webkit-scrollbar { display: none; } .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; } .animate-fade-in { animation: fadeIn 0.3s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }`;
        document.head.appendChild(s);
    }

    initApp();
}

window.initSapporoTrip = initSapporoTrip;
