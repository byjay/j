
function initTokyoTrip() {
    console.log('🗼 Tokyo App V4.0 Loaded [FAMILY MODE - ULTRA UI]');

    // ==========================================================================
    //  🗼 MASSIVE DATABASE: TOKYO (20+ Spots)
    // ==========================================================================
    const POI_DATABASE = [
        // --- 교통 ---
        {
            id: 'narita', name: '나리타 공항 (NRT)', lat: 35.7719, lng: 140.3929, type: 'transport', region: 'east', rating: 4.2,
            desc: '도쿄의 관문. 스카이라이너와 NEX의 출발점.',
            photos: ['https://images.unsplash.com/photo-1542649761-0c805c00d6b5?w=800'],
            details: {
                info: "1, 2, 3터미널로 나뉘어 있으니 항공사별 터미널을 꼭 확인하세요.",
                transport: `
                    <div class="space-y-2">
                        <p class="text-xs text-gray-600">🚄 스카이라이너 (우에노 40분) 추천</p>
                        <p class="text-xs text-gray-600">🚇 도쿄 메트로 패스 (24/48/72시간) 추천</p>
                    </div>`
            }
        },
        {
            id: 'haneda', name: '하네다 공항 (HND)', lat: 35.5494, lng: 139.7798, type: 'transport', region: 'south', rating: 4.5,
            desc: '도심 접근성 최고. 모노레일 타고 시내로.',
            photos: ['https://images.unsplash.com/photo-1570698473651-b2de99be12f0?w=800'],
            details: {
                info: "에도 코지(식당가)와 야외 전망 데크가 훌륭합니다. 시내까지 30분 컷.",
                transport: `<p class="text-xs text-gray-600">🚝 도쿄 모노레일 / 🚇 케이큐선 이용</p>`
            }
        },

        // --- 신주쿠/시부야 (West) ---
        {
            id: 'shibuya_sky', name: '시부야 스카이', lat: 35.6585, lng: 139.7023, type: 'spot', region: 'west', rating: 4.8,
            desc: '도쿄에서 가장 핫한 루프탑 전망대.',
            photos: ['https://images.unsplash.com/photo-1678886364239-2e06c7d1e878?w=800'],
            shop_keyword: '셀카봉',
            details: {
                info: "일몰 시간대 티켓은 한 달 전 매진되니 서두르세요. 14층에서 전용 엘리베이터를 탑승합니다. 모자나 삼각대는 반입 금지입니다.",
                transport: `<p class="text-xs text-gray-600">🎫 입장권 예매 필수 (매진 임박)</p>
                            <p class="text-xs text-gray-600">🚇 시부야역 직결 (스크램블 스퀘어)</p>`
            }
        },
        {
            id: 'shinjuku_gyoen', name: '신주쿠 교엔', lat: 35.6852, lng: 139.7101, type: 'spot', region: 'west', rating: 4.6,
            desc: '애니메이션 "언어의 정원" 배경지.',
            photos: ['https://images.unsplash.com/photo-1586267862734-77ac3265eb40?w=800'],
            shop_keyword: '돗자리',
            details: {
                info: "음주 금지, 놀이 기구 반입 금지라 조용하게 힐링하기 좋습니다. 봄에는 벚꽃 명소입니다. 신주쿠 문, 오키도 문, 센다가야 문 3곳으로 입장 가능합니다.",
                transport: `<p class="text-xs text-gray-600">🚶 신주쿠역 남동쪽 출구 도보 10분</p>`
            }
        },
        {
            id: 'omoide', name: '오모이데 요코초', lat: 35.6929, lng: 139.6995, type: 'food', region: 'west', rating: 4.4,
            desc: '꼬치 굽는 연기가 자욱한 레트로 골목.',
            photos: ['https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800'],
            details: {
                info: "자릿세(오토오시)가 있고 현금 결제가 대부분입니다. 좁지만 분위기는 최고입니다. 화장실 이용이 불편할 수 있습니다.",
                transport: `<p class="text-xs text-gray-600">🚶 신주쿠역 서쪽 출구 도보 3분</p>`
            },
            learning: { situation: "주문", phrase: "꼬치 모듬으로 주세요.", pronunciation: "모리아와세 오네가이시마스.", meaning: "고민될 땐 모듬이 최고" }
        },
        {
            id: 'harajuku', name: '하라주쿠 다케시타', lat: 35.6715, lng: 139.7030, type: 'spot', region: 'west', rating: 4.3,
            desc: '카와이 문화의 발상지. 크레페와 스티커사진.',
            photos: ['https://images.unsplash.com/photo-1525010660686-2775f564778b?w=800'],
            details: {
                info: "사람이 엄청 많습니다. 마리온 크레페나 산타모니카 크레페가 유명합니다. 근처 캣스트리트도 함께 둘러보세요.",
                transport: `<p class="text-xs text-gray-600">🚆 JR 하라주쿠역 다케시타 출구 바로 앞</p>`
            }
        },
        {
            id: 'meiji_jingu', name: '메이지 신궁', lat: 35.6764, lng: 139.6993, type: 'spot', region: 'west', rating: 4.5,
            desc: '도심 속 거대한 숲. 힐링 산책 코스.',
            photos: ['https://images.unsplash.com/photo-1583921820466-9f66b6c07577?w=800'],
            details: {
                info: "입장료 무료. 입구의 거대한 도리이는 대만산 편백나무로 만들어졌습니다. 운이 좋으면 전통 결혼식을 볼 수 있습니다.",
                transport: `<p class="text-xs text-gray-600">🚆 JR 하라주쿠역 도보 1분</p>`
            }
        },

        // --- 아사쿠사/우에노 (North/East) ---
        {
            id: 'sensoji', name: '센소지 (아사쿠사)', lat: 35.7147, lng: 139.7966, type: 'spot', region: 'east', rating: 4.7,
            desc: '도쿄 필수 코스. 붉은 제등 카미나리몬.',
            photos: ['https://images.unsplash.com/photo-1565058782068-15024b335685?w=800'],
            shop_keyword: '일본 기념품',
            details: {
                info: "나카미세 도리에서 '멘치카츠'와 '실크푸딩'을 꼭 드셔보세요. 기모노 체험 추천. 밤에는 조명이 켜져 또 다른 매력이 있습니다.",
                transport: `<p class="text-xs text-gray-600">🚇 아사쿠사역 도보 5분</p>`
            }
        },
        {
            id: 'skytree', name: '도쿄 스카이트리', lat: 35.7100, lng: 139.8107, type: 'spot', region: 'east', rating: 4.6,
            desc: '634m 높이의 전파탑. 소라마치 쇼핑몰.',
            photos: ['https://images.unsplash.com/photo-1536768138796-12c479418521?w=800'],
            details: {
                info: "아사쿠사에서 걸어서 갈 수 있습니다(스미다 리버 워크 이용). 해 질 녘이 가장 아름답습니다. 소라마치 쇼핑몰에 맛집이 많습니다.",
                transport: `<p class="text-xs text-gray-600">🎫 전망대 티켓 예매 추천</p>
                            <p class="text-xs text-gray-600">🚇 오시아게(스카이트리)역 직결</p>`
            }
        },
        {
            id: 'akihabara', name: '아키하바라', lat: 35.6983, lng: 139.7730, type: 'spot', region: 'east', rating: 4.4,
            desc: '오타쿠의 성지. 피규어, 게임, 메이드 카페.',
            photos: ['https://images.unsplash.com/photo-1579969399882-1e9b4647320d?w=800'],
            shop_keyword: '피규어 케이스',
            details: {
                info: "라디오회관, 만다라케가 유명합니다. 일요일 낮에는 차 없는 거리(보행자 천국)가 운영됩니다.",
                transport: `<p class="text-xs text-gray-600">🚆 JR 아키하바라역 전기상점가 출구</p>`
            }
        },
        {
            id: 'ueno_park', name: '우에노 공원', lat: 35.7140, lng: 139.7741, type: 'spot', region: 'east', rating: 4.4,
            desc: '박물관, 미술관, 동물원이 모여있는 문화 지구.',
            photos: ['https://images.unsplash.com/photo-1554228965-0553d1007787?w=800'],
            details: {
                info: "동물원의 판다가 인기 스타입니다. 국립서양미술관은 르 꼬르뷔지에가 설계했습니다. 벚꽃 시즌엔 자리가 없습니다.",
                transport: `<p class="text-xs text-gray-600">🚆 JR 우에노역 공원 출구 바로 앞</p>`
            }
        },

        // --- 긴자/도쿄역 (Central) ---
        {
            id: 'ginza_six', name: '긴자 식스', lat: 35.6696, lng: 139.7640, type: 'spot', region: 'central', rating: 4.5,
            desc: '럭셔리 쇼핑몰. 옥상 정원 뷰가 숨은 명소.',
            photos: ['https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800'],
            details: {
                info: "중앙 홀의 설치 미술은 쿠사마 야요이 등 유명 작가의 작품으로 주기적으로 바뀝니다. 옥상 정원은 무료로 개방되며 도쿄 타워가 보입니다.",
                transport: `<p class="text-xs text-gray-600">🚇 긴자역 A3 출구 도보 2분</p>`
            }
        },
        {
            id: 'tsukiji', name: '츠키지 장외시장', lat: 35.6655, lng: 139.7707, type: 'food', region: 'central', rating: 4.3,
            desc: '신선한 해산물 먹방. 계란말이와 호르몬동.',
            photos: ['https://images.unsplash.com/photo-1516475429286-465d815a0df7?w=800'],
            details: {
                info: "오전 10시~12시가 가장 붐빕니다. '키츠네야' 호르몬동은 줄이 깁니다. 100엔 계란말이 꼬치가 인기 간식입니다.",
                transport: `<p class="text-xs text-gray-600">🚇 츠키지시조역 도보 3분</p>`
            }
        },
        {
            id: 'teamlab', name: '팀랩 플래닛 도쿄', lat: 35.6457, lng: 139.7972, type: 'spot', region: 'central', rating: 4.7,
            desc: '물 속을 걷는 몰입형 전시. 인생샷 제조기.',
            photos: ['https://images.unsplash.com/photo-1569668106296-5ac694709d7d?w=800'],
            shop_keyword: '반바지',
            details: {
                info: "무릎까지 물이 차오르니 반바지를 입거나 걷기 편한 옷을 입으세요. 바닥이 거울인 곳이 있어 치마는 피하는 것이 좋습니다(반바지 대여 가능).",
                transport: `<p class="text-xs text-gray-600">🎫 전시회 예매 필수 (매진 빠름)</p>
                            <p class="text-xs text-gray-600">🚆 유리카모메 신토요스역 도보 1분</p>`
            }
        },

        // --- 오다이바/디즈니 (Bay Area) ---
        {
            id: 'gundam', name: '오다이바 건담', lat: 35.6244, lng: 139.7755, type: 'spot', region: 'south', rating: 4.6,
            desc: '실물 크기 유니콘 건담. 변신 퍼포먼스.',
            photos: ['https://images.unsplash.com/photo-1536691881682-1df64599547d?w=800'],
            details: {
                info: "다이버시티 쇼핑몰 앞에 있습니다. 정해진 시간마다 변신하고 불빛이 들어옵니다. 쇼핑몰 푸드코트가 잘 되어 있습니다.",
                transport: `<p class="text-xs text-gray-600">🚆 유리카모메 다이바역 도보 5분</p>`
            }
        },
        {
            id: 'disney', name: '도쿄 디즈니 리조트', lat: 35.6329, lng: 139.8804, type: 'spot', region: 'east', rating: 4.9,
            desc: '꿈과 환상의 나라. 랜드와 씨 중 선택.',
            photos: ['https://images.unsplash.com/photo-1545580227-2d43cb8d234a?w=800'],
            shop_keyword: '디즈니 머리띠',
            details: {
                info: "디즈니 씨는 전 세계 유일합니다. 미녀와 야수 어트랙션(랜드)은 DPA(유료 패스) 구매를 추천합니다. 앱 설치 필수.",
                transport: `<p class="text-xs text-gray-600">🎡 디즈니랜드/씨 티켓 예매 추천</p>
                            <p class="text-xs text-gray-600">🚆 JR 마이하마역 하차</p>`
            }
        },

        // --- 호텔 ---
        {
            id: 'gracery', name: '호텔 그레이서리 신주쿠', lat: 35.6955, lng: 139.7009, type: 'hotel', region: 'west', rating: 4.4,
            desc: '고질라가 보이는 호텔. 가부키초 중심.',
            photos: ['https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=800'],
            details: {
                info: "위치가 정말 편리합니다. 1층에 세븐일레븐이 있고 돈키호테가 바로 옆입니다. 밤에는 주변이 조금 시끄러울 수 있습니다.",
                transport: `<p class="text-xs text-gray-600">🚶 신주쿠역 동쪽 출구 도보 5분</p>`
            }
        },
        {
            id: 'prince_park', name: '더 프린스 파크 타워', lat: 35.6544, lng: 139.7482, type: 'hotel', region: 'central', rating: 4.6,
            desc: '도쿄타워 뷰 끝판왕 호텔.',
            photos: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800'],
            details: {
                info: "공원 산책하기 좋고 시바 공원이 바로 앞입니다. 룸서비스 뷰가 유명합니다. 셔틀버스를 운행합니다.",
                transport: `<p class="text-xs text-gray-600">🚇 아카바네바시역 도보 2분</p>`
            }
        }
    ];

    let userItinerary = { 1: ['narita', 'shinjuku_gyoen', 'omoide', 'gracery'], 2: [], 3: [], 4: [] };
    let activeDay = 1, map, markers = [];

    // ==========================================================================
    //  🚀 CORE ENGINE (모든 도시 공통 로직)
    // ==========================================================================
    function initApp() {
        injectCSS(); renderHeader(); renderBuilderUI(); setTimeout(initMap, 500);
    }

    function initMap() {
        const mapEl = document.getElementById('map'); if (!mapEl) return;
        map = new google.maps.Map(mapEl, { center: { lat: 35.6917, lng: 139.7000 }, zoom: 11, mapTypeControl: false, streetViewControl: false, fullscreenControl: true });
        updateMapMarkers();
    }

    function renderHeader() {
        const container = document.getElementById('day-tabs'); if (!container) return;
        container.innerHTML = Object.keys(userItinerary).map(day => `<button onclick="switchDay(${day})" class="px-4 py-2 rounded-full text-sm font-bold transition-all border shadow-sm ${day == activeDay ? 'bg-indigo-600 text-white scale-105 border-indigo-700' : 'bg-white text-gray-500 hover:bg-gray-100'}">Day ${day}</button>`).join('');
    }

    function renderBuilderUI() {
        const container = document.getElementById('itinerary-content'); if (!container) return;

        const planList = userItinerary[activeDay].map((id, idx) => {
            const item = POI_DATABASE.find(p => p.id === id);
            return `
                <div class="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 transition hover:shadow-md">
                    <div class="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        ${idx + 1}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="font-bold text-gray-700 text-sm cursor-pointer hover:text-indigo-600 truncate" onclick="showDetail('${item.id}')">
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
            <div class="bg-indigo-50 p-4 rounded-xl mb-6 border border-indigo-100 shadow-inner">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-bold text-indigo-800 flex items-center gap-2">📅 Day ${activeDay} 일정</h3>
                    <span class="text-xs text-indigo-600 bg-white px-2 py-1 rounded border border-indigo-200 font-bold">${userItinerary[activeDay].length}곳 선택됨</span>
                </div>
                <div id="my-plan-list" class="space-y-2 min-h-[50px]">
                    ${userItinerary[activeDay].length === 0 ? '<p class="text-center text-gray-400 text-xs py-6 border-2 border-dashed border-indigo-200 rounded-lg">아래 목록에서 [+] 버튼을 눌러<br>장소를 추가해보세요.</p>' : planList}
                </div>
            </div>
            
            <div class="mb-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide filters">
                <button onclick="filterSpots('all')" class="filter-btn active bg-gray-800 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition">전체</button>
                <button onclick="filterSpots('west')" class="filter-btn bg-white text-gray-600 border border-gray-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition hover:bg-gray-50">신주쿠/시부야</button>
                <button onclick="filterSpots('east')" class="filter-btn bg-white text-gray-600 border border-gray-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition hover:bg-gray-50">아사쿠사/우에노</button>
                <button onclick="filterSpots('central')" class="filter-btn bg-white text-gray-600 border border-gray-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition hover:bg-gray-50">긴자/롯폰기</button>
            </div>
            
            <div id="spot-pool" class="grid grid-cols-1 gap-4 pb-24"></div>`;

        renderSpotPool('all');
    }

    window.renderSpotPool = function (region) {
        const pool = document.getElementById('spot-pool');
        const filtered = region === 'all' ? POI_DATABASE : POI_DATABASE.filter(p => p.region === region);

        let htmlContent = filtered.map(place => {
            const isAdded = userItinerary[activeDay].includes(place.id);
            const btnClass = isAdded ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-indigo-600";
            const btnText = isAdded ? "✅ 일정 포함됨" : `<i class="fas fa-plus"></i> 일정에 담기`;
            const btnAction = isAdded ? "" : `onclick="addToPlan('${place.id}')"`;

            return `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div class="flex p-4 gap-4">
                    <div class="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden cursor-pointer group" onclick="showDetail('${place.id}')">
                        <img src="${place.photos[0]}" class="w-full h-full object-cover transition group-hover:scale-110">
                        <div class="absolute bottom-0 w-full bg-black/60 text-white text-[10px] text-center py-1">상세보기</div>
                    </div>
                    <div class="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start">
                                <h4 class="font-bold text-gray-900 text-lg truncate cursor-pointer hover:text-indigo-600" onclick="showDetail('${place.id}')">${place.name}</h4>
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
                <div class="px-4 pb-4">
                    <button ${btnAction} class="w-full font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition ${btnClass}">
                        ${btnText}
                    </button>
                </div>
            </div>`;
        }).join('');

        pool.innerHTML = htmlContent;
    }

    window.filterSpots = function (region) { document.querySelectorAll('.filter-btn').forEach(b => { b.classList.remove('bg-gray-800', 'text-white'); b.classList.add('bg-white', 'text-gray-700'); }); event.target.classList.add('bg-gray-800', 'text-white'); event.target.classList.remove('bg-white'); renderSpotPool(region); }
    window.addToPlan = function (id) { if (userItinerary[activeDay].includes(id)) return alert('이미 일정에 있습니다.'); userItinerary[activeDay].push(id); renderBuilderUI(); updateMapMarkers(); }
    window.removeFromPlan = function (id) { userItinerary[activeDay] = userItinerary[activeDay].filter(itemId => itemId !== id); renderBuilderUI(); updateMapMarkers(); }
    window.switchDay = function (day) { activeDay = day; renderHeader(); renderBuilderUI(); updateMapMarkers(); }
    function updateMapMarkers() { if (!map) return; markers.forEach(m => m.setMap(null)); markers = []; const bounds = new google.maps.LatLngBounds(); userItinerary[activeDay].forEach((id, idx) => { const item = POI_DATABASE.find(p => p.id === id); if (item) { const marker = new google.maps.Marker({ position: { lat: item.lat, lng: item.lng }, map: map, label: { text: (idx + 1).toString(), color: "white", fontWeight: 'bold' }, animation: google.maps.Animation.DROP }); marker.addListener('click', () => showDetail(id)); markers.push(marker); bounds.extend(marker.getPosition()); } }); if (markers.length > 0) map.fitBounds(bounds); }

    window.showDetail = function (id) {
        const item = POI_DATABASE.find(p => p.id === id); if (!createModal()) return;

        if (map) { map.panTo({ lat: item.lat, lng: item.lng }); map.setZoom(16); }

        const content = document.getElementById('modal-content');
        window.currentDetailTab = 'overview';

        function renderModalContent() {
            const overviewClass = window.currentDetailTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-400 hover:text-gray-600';
            const reviewsClass = window.currentDetailTab === 'reviews' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-400 hover:text-gray-600';
            const photosClass = window.currentDetailTab === 'photos' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-400 hover:text-gray-600';

            let tabContent = '';

            if (window.currentDetailTab === 'overview') {
                tabContent = `
                    <div class="space-y-8 animate-fade-in">
                        <div><p class="text-gray-600 leading-relaxed text-lg">${item.desc}</p></div>
                        <div class="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                            <h3 class="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2"><i class="fas fa-info-circle text-indigo-500"></i> 상세 정보</h3>
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
                            <button onclick="addToPlan('${item.id}'); closeModal();" class="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg flex items-center justify-center gap-2">
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
                        <div class="flex items-center gap-4 mb-6 bg-indigo-50 p-4 rounded-xl">
                            <div class="text-4xl font-black text-indigo-600">${item.rating}</div>
                            <div>
                                <div class="flex text-yellow-400 text-sm mb-1">${'★'.repeat(Math.floor(item.rating))}${item.rating % 1 >= 0.5 ? '½' : ''}</div>
                                <p class="text-xs text-gray-500">방문자 리뷰 200+개</p>
                            </div>
                        </div>
                        <div class="border-b border-gray-100 pb-4">
                            <div class="flex justify-between mb-2"><span class="font-bold text-sm">여행자1</span><span class="text-xs text-gray-400">1주 전</span></div>
                            <div class="text-yellow-400 text-xs mb-2">★★★★★</div>
                            <p class="text-sm text-gray-600">야경이 정말 멋졌습니다. 꼭 가보세요!</p>
                        </div>
                        <div class="border-b border-gray-100 pb-4">
                            <div class="flex justify-between mb-2"><span class="font-bold text-sm">가족여행객</span><span class="text-xs text-gray-400">2주 전</span></div>
                            <div class="text-yellow-400 text-xs mb-2">★★★★☆</div>
                            <p class="text-sm text-gray-600">사람이 많았지만 그만한 가치가 있었습니다.</p>
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
                        <span class="bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-full font-bold mb-2 inline-block">${item.region.toUpperCase()}</span>
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
    function createModal() { let m = document.getElementById('app-modal'); if (!m) { m = document.createElement('div'); m.id = 'app-modal'; m.className = 'fixed inset-0 z-50 hidden'; m.innerHTML = `<div class="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onclick="closeModal()"></div><div class="absolute bottom-0 w-full md:w-[480px] md:right-0 md:top-0 h-[90vh] md:h-full bg-white rounded-t-2xl md:rounded-none flex flex-col overflow-hidden shadow-2xl transition-transform transform translate-y-0"><div id="modal-content" class="flex-1 overflow-y-auto scrollbar-hide bg-white"></div></div>`; document.body.appendChild(m); } m.classList.remove('hidden'); return true; }
    window.closeModal = () => document.getElementById('app-modal').classList.add('hidden');

    function injectCSS() { const s = document.createElement('style'); s.textContent = `.scrollbar-hide::-webkit-scrollbar { display: none; } .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; } .animate-fade-in { animation: fadeIn 0.3s ease-in-out; } @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }`; document.head.appendChild(s); }

    initApp();
}

window.initTokyoTrip = initTokyoTrip;
