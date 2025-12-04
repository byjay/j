
function initFukuokaTrip() {
    // ==========================================================================
    //  ✨ HIGH FIDELITY DATABASE: FUKUOKA
    // ==========================================================================
    const POI_DATABASE = [
        {
            "id": "fuk_airport",
            "name": "후쿠오카 공항 (FUK)",
            "lat": 33.5859,
            "lng": 130.4501,
            "type": "transport",
            "region": "airport",
            "rating": 4.6,
            "desc": "도심과 가장 가까운 공항.",
            "photos": [
                "https://images.unsplash.com/photo-1542349385-52e971371b13?w=800"
            ],
            "details": {
                "info": "시내 접근성 최고.",
                "transport": "지하철 5분"
            }
        },
        {
            "id": "hakata_station",
            "name": "JR 하카타역",
            "lat": 33.5897,
            "lng": 130.4207,
            "type": "spot",
            "region": "hakata",
            "rating": 4.5,
            "desc": "규슈 여행의 시작점.",
            "photos": [
                "https://images.unsplash.com/photo-1575443207716-419b48997232?w=800"
            ],
            "details": {
                "info": "쇼핑과 맛집의 중심.",
                "transport": "모든 열차의 허브"
            }
        },
        {
            "id": "hakata_illumination",
            "name": "하카타역 일루미네이션",
            "lat": 33.5897,
            "lng": 130.4207,
            "type": "spot",
            "region": "hakata",
            "rating": 4.8,
            "desc": "겨울 후쿠오카의 하이라이트. 빛의 거리.",
            "photos": [
                "https://images.unsplash.com/photo-1576686856384-2d0c2e6b2233?w=800"
            ],
            "details": {
                "info": "11월부터 1월까지 하카타역 광장이 80만 개의 전구로 빛납니다. 크리스마스 마켓도 함께 열려 핫와인과 소시지를 즐길 수 있습니다.",
                "transport": "JR 하카타역 하카타구치 광장",
                "seasonal": { "winter": "크리스마스 마켓 개최" }
            }
        },
        {
            "id": "motsunabe_ooyama",
            "name": "모츠나베 오오야마",
            "lat": 33.5890,
            "lng": 130.4200,
            "type": "food",
            "region": "hakata",
            "rating": 4.6,
            "desc": "후쿠오카 명물 대창 전골. 진한 된장 육수.",
            "photos": [
                "https://images.unsplash.com/photo-1580442151529-343f2f6e0e27?w=800"
            ],
            "details": {
                "info": "된장(미소) 맛이 가장 인기 있습니다. 1인분 주문도 가능합니다(런치). 마무리는 짬뽕면을 추천합니다.",
                "transport": "하카타역 킷테(KITTE) 9층",
                "tips": "예약 필수. 런치 세트가 가성비 좋습니다."
            }
        },
        {
            "id": "dazaifu",
            "name": "다자이푸 텐만구",
            "lat": 33.5215,
            "lng": 130.5349,
            "type": "spot",
            "region": "nearby",
            "rating": 4.6,
            "desc": "학문의 신과 매화가지떡.",
            "photos": [
                "https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?w=800"
            ],
            "details": {
                "info": "소 동상 뿔 만지기.",
                "transport": "버스 투어 또는 전철"
            }
        },
        {
            "id": "yufuin",
            "name": "유후인 온천 마을",
            "lat": 33.2655,
            "lng": 131.3556,
            "type": "spot",
            "region": "nearby",
            "rating": 4.8,
            "desc": "동화 속 마을 같은 온천지.",
            "photos": [
                "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=800"
            ],
            "details": {
                "info": "긴린코 호수 산책.",
                "transport": "버스 투어"
            }
        },
        {
            "id": "beppu",
            "name": "벳푸 가마솥 지옥",
            "lat": 33.3155,
            "lng": 131.4727,
            "type": "spot",
            "region": "nearby",
            "rating": 4.5,
            "desc": "지옥 온천 순례의 하이라이트.",
            "photos": [
                "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800"
            ],
            "details": {
                "info": "온천 달걀과 라무네.",
                "transport": "버스 투어"
            }
        },
        {
            "id": "momochi",
            "name": "모모치 해변",
            "lat": 33.5954,
            "lng": 130.3523,
            "type": "spot",
            "region": "seaside",
            "rating": 4.4,
            "desc": "이국적인 인공 해변.",
            "photos": [
                "https://images.unsplash.com/photo-1621847466023-40c354031175?w=800"
            ],
            "details": {
                "info": "석양이 아름다움.",
                "transport": "버스"
            }
        },
        {
            "id": "fukuoka_tower",
            "name": "후쿠오카 타워",
            "lat": 33.5933,
            "lng": 130.3515,
            "type": "spot",
            "region": "seaside",
            "rating": 4.5,
            "desc": "후쿠오카의 랜드마크.",
            "photos": [
                "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800"
            ],
            "details": {
                "info": "야경 명소.",
                "transport": "버스"
            }
        },
        {
            "id": "canal_city",
            "name": "캐널시티 하카타",
            "lat": 33.5892,
            "lng": 130.4107,
            "type": "spot",
            "region": "hakata",
            "rating": 4.4,
            "desc": "분수쇼가 있는 쇼핑몰.",
            "photos": [
                "https://images.unsplash.com/photo-1565578768782-b78904df9764?w=800"
            ],
            "details": {
                "info": "쇼핑과 엔터테인먼트.",
                "transport": "도보/버스"
            }
        },
        {
            "id": "nakasu_yatai",
            "name": "나카스 포장마차",
            "lat": 33.5924,
            "lng": 130.4037,
            "type": "food",
            "region": "hakata",
            "rating": 4.2,
            "desc": "강변의 낭만 포차.",
            "photos": [
                "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?w=800"
            ],
            "details": {
                "info": "라멘과 오뎅.",
                "transport": "도보"
            }
        },
        {
            "id": "ichiran_hq",
            "name": "이치란 본점",
            "lat": 33.593,
            "lng": 130.4045,
            "type": "food",
            "region": "hakata",
            "rating": 4.6,
            "desc": "돈코츠 라멘의 성지.",
            "photos": [
                "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800"
            ],
            "details": {
                "info": "24시간 영업.",
                "transport": "도보"
            }
        },
        {
            "id": "mizutaki_hanamidori",
            "name": "미즈타키 하나미도리",
            "lat": 33.5935,
            "lng": 130.4040,
            "type": "food",
            "region": "hakata",
            "rating": 4.5,
            "desc": "후쿠오카 전통 닭백숙 전골.",
            "photos": [
                "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800"
            ],
            "details": {
                "info": "뽀얀 닭 육수가 일품입니다. 폰즈 소스에 찍어 먹습니다. 죽으로 마무리하세요.",
                "transport": "나카스점 / 하카타역점",
                "tips": "점심 특선이 저렴합니다."
            }
        },
        {
            "id": "donki_nakasu",
            "name": "돈키호테 나카스점",
            "lat": 33.5935,
            "lng": 130.404,
            "type": "shop",
            "region": "hakata",
            "rating": 4.3,
            "desc": "24시간 쇼핑 천국.",
            "photos": [
                "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800"
            ],
            "details": {
                "info": "기념품 쇼핑.",
                "transport": "도보"
            }
        },
        {
            "id": "tenjin_christmas",
            "name": "텐진 크리스마스 마켓",
            "lat": 33.5889,
            "lng": 130.4017,
            "type": "spot",
            "region": "tenjin",
            "rating": 4.7,
            "desc": "유럽 감성의 겨울 축제.",
            "photos": [
                "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=800"
            ],
            "details": {
                "info": "텐진 시청 앞 광장에서 열립니다. 산타 인형 장식이 귀엽습니다. 핫초코 머그컵을 기념품으로 가져갈 수 있습니다.",
                "transport": "지하철 텐진역 도보 3분",
                "seasonal": { "winter": "11월 중순 ~ 12월 25일" }
            }
        }
    ];
    let userItinerary = { "1": ["fuk_airport", "hakata_station", "ichiran_hq", "canal_city", "nakasu_yatai"], "2": ["hakata_station", "dazaifu", "yufuin", "beppu", "hakata_station"], "3": ["momochi", "fukuoka_tower", "donki_nakasu"], "4": ["hakata_station", "fuk_airport"] };
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
        // Center map on the first spot of Day 1, or the first spot in DB
        const centerSpot = POI_DATABASE.find(p => p.id === userItinerary[1][0]) || POI_DATABASE[0];
        map = new google.maps.Map(mapEl, {
            center: { lat: centerSpot.lat, lng: centerSpot.lng },
            zoom: 12,
            mapTypeControl: false, streetViewControl: false, fullscreenControl: true
        });

        // Route Helper (Preview Travel)
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
            <!-- 1. 내 일정 -->
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

            <!-- 2. 장소 리스트 -->
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
                        <img src="${place.photos[0]}" class="w-full h-full object-cover transition group-hover:scale-110">
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

    // --- 인터랙션 로직 ---
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

    // --- 상세 모달 ---
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
                tabContent = `<div class="grid grid-cols-2 gap-2 animate-fade-in">${item.photos.map(p => `<div class="aspect-square rounded-lg overflow-hidden bg-gray-100"><img src="${p}" class="w-full h-full object-cover" onclick="window.open('${p}','_blank')"></div>`).join('')}</div>`;
            }

            content.innerHTML = `<div class="relative h-72 bg-gray-900 group"><img src="${item.photos[0]}" class="w-full h-full object-cover opacity-90"><button onclick="closeModal()" class="absolute top-4 right-4 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center">✕</button><div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 pt-20"><h2 class="text-3xl font-black text-white mb-1">${item.name}</h2><div class="flex gap-2 mt-2">${item.details.themes ? item.details.themes.map(t => `<span class="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded backdrop-blur-sm">${t}</span>`).join('') : ''}</div></div></div><div class="sticky top-0 bg-white z-10 flex border-b shadow-sm"><button class="flex-1 py-4 text-sm font-bold transition ${overviewClass}" onclick="window.switchDetailTab('overview')">개요</button><button class="flex-1 py-4 text-sm font-bold transition ${reviewsClass}" onclick="window.switchDetailTab('reviews')">리뷰</button><button class="flex-1 py-4 text-sm font-bold transition ${photosClass}" onclick="window.switchDetailTab('photos')">사진</button></div><div class="p-6 pb-24">${tabContent}</div>`;
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
