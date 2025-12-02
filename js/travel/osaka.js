
function initOsakaTrip() {
    console.log('🐙 Osaka App V4.0 Loaded [FAMILY MODE - ULTRA UI]');

    // ==========================================================================
    //  🐙 MASSIVE DATABASE: OSAKA (20+ Spots)
    // ==========================================================================
    const POI_DATABASE = [
        // --- 교통 ---
        {
            id: 'kix', name: '간사이 공항 (KIX)', lat: 34.4320, lng: 135.2304, type: 'transport', region: 'airport', rating: 4.1,
            desc: '오사카 여행의 시작. 라피트 탑승.',
            photos: ['https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800'],
            details: {
                info: "라피트는 전석 지정석입니다. 미리 예매하면 QR로 바로 탑승 가능합니다.",
                transport: `
                    <div class="space-y-2">
                        <p class="text-xs text-gray-600">🚄 라피트 왕복권 최저가 추천</p>
                        <p class="text-xs text-gray-600">🎫 오사카 주유패스 (필수템) 추천</p>
                    </div>`
            }
        },

        // --- 난바/도톤보리 ---
        {
            id: 'dotonbori', name: '도톤보리', lat: 34.6687, lng: 135.5013, type: 'spot', region: 'minami', rating: 4.7,
            desc: '오사카의 부엌. 글리코상과 먹거리 천국.',
            photos: ['https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800'],
            shop_keyword: '소화제',
            details: { info: "돈키호테 관람차도 타보세요. 다리 밑으로 내려가면 글리코상과 조용히 사진 찍기 좋습니다." }
        },
        {
            id: 'ichiran', name: '이치란 라멘', lat: 34.6690, lng: 135.5020, type: 'food', region: 'minami', rating: 4.5,
            desc: '한국인이 사랑하는 돈코츠 라멘.',
            photos: ['https://images.unsplash.com/photo-1552611052-33e04de081de?w=800'],
            details: { info: "별관이 본관보다 줄이 짧을 때가 많습니다. 비밀 소스는 4~5배 추천!" }
        },
        {
            id: 'shinsekai', name: '신세카이 & 츠텐카쿠', lat: 34.6520, lng: 135.5063, type: 'spot', region: 'minami', rating: 4.4,
            desc: '레트로 오사카. 쿠시카츠의 성지.',
            photos: ['https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800'],
            details: { info: "밤에 화려한 간판들이 사진 찍기 좋습니다. 쿠시카츠 다루마가 유명합니다." }
        },
        {
            id: 'kuromon', name: '구로몬 시장', lat: 34.6654, lng: 135.5065, type: 'food', region: 'minami', rating: 4.2,
            desc: '해산물 꼬치와 와규를 즉석에서.',
            photos: ['https://images.unsplash.com/photo-1579623696562-b91c01995801?w=800'],
            details: { info: "가격대가 좀 있지만 신선도는 최고입니다. 참치회 추천." }
        },

        // --- 우메다/오사카성 ---
        {
            id: 'osaka_castle', name: '오사카 성', lat: 34.6873, lng: 135.5262, type: 'spot', region: 'kita', rating: 4.6,
            desc: '오사카의 상징. 웅장한 천수각.',
            photos: ['https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800'],
            shop_keyword: '양산',
            details: { info: "천수각 내부는 박물관입니다. 주유패스로 고자부네 놀잇배를 무료로 탈 수 있습니다." }
        },
        {
            id: 'umeda_sky', name: '우메다 공중정원', lat: 34.7053, lng: 135.4896, type: 'spot', region: 'kita', rating: 4.6,
            desc: '360도 파노라마 야경 명소.',
            photos: ['https://images.unsplash.com/photo-1599666668706-03708d728617?w=800'],
            shop_keyword: '삼각대',
            details: {
                info: "주유패스 무료 입장 시간이 오후 4시(변동가능)까지니 시간 확인 필수입니다.",
                transport: `<p class="text-xs text-gray-600">🎫 입장권 예매 추천</p>`
            }
        },
        {
            id: 'hep_five', name: '햅파이브 관람차', lat: 34.7041, lng: 135.5002, type: 'spot', region: 'kita', rating: 4.3,
            desc: '도심 한복판의 빨간 관람차.',
            photos: ['https://images.unsplash.com/photo-1590253230538-a26118d7e5c5?w=800'],
            details: { info: "내부에 블루투스 스피커가 있어 음악을 들으며 야경을 즐길 수 있습니다." }
        },

        // --- 베이 에어리어 ---
        {
            id: 'usj', name: '유니버설 스튜디오 재팬', lat: 34.6654, lng: 135.4323, type: 'spot', region: 'bay', rating: 4.9,
            desc: '닌텐도 월드와 해리포터.',
            photos: ['https://images.unsplash.com/photo-1624601573012-7b319f772c74?w=800'],
            shop_keyword: 'USJ 머리띠',
            details: {
                info: "오픈런 필수. 닌텐도 월드 확약권(정리권) 없으면 입장 불가할 수 있습니다.",
                transport: `<p class="text-xs text-gray-600">🎡 입장권 & 익스프레스 예매 추천</p>`
            }
        },
        {
            id: 'kaiyukan', name: '가이유칸 수족관', lat: 34.6545, lng: 135.4290, type: 'spot', region: 'bay', rating: 4.7,
            desc: '세계 최대급 수족관. 고래상어.',
            photos: ['https://images.unsplash.com/photo-1585672660340-966e33004946?w=800'],
            details: { info: "위에서부터 아래로 내려오며 관람하는 구조입니다. 오후 5시 이후엔 조명이 어두워져 분위기 있습니다." }
        },

        // --- 호텔 ---
        {
            id: 'swissotel', name: '스위소텔 난카이', lat: 34.6633, lng: 135.5019, type: 'hotel', region: 'minami', rating: 4.6,
            desc: '난바역 직결. 최고의 위치.',
            photos: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
            details: { info: "라피트 내리면 바로 엘리베이터 타고 로비로 갈 수 있어 비 안 맞고 이동 가능합니다." }
        },
        {
            id: 'hotel_universal', name: '더 파크 프론트 호텔', lat: 34.6675, lng: 135.4370, type: 'hotel', region: 'bay', rating: 4.5,
            desc: 'USJ 바로 앞. 파크 뷰 객실.',
            photos: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800'],
            details: { info: "놀다가 지치면 들어와서 쉴 수 있는 최적의 위치입니다." }
        }
    ];

    let userItinerary = { 1: ['kix', 'dotonbori', 'ichiran', 'swissotel'], 2: [], 3: [], 4: [] };
    let activeDay = 1, map, markers = [];

    // ==========================================================================
    //  🚀 CORE ENGINE
    // ==========================================================================
    function initApp() {
        injectCSS(); renderHeader(); renderBuilderUI(); setTimeout(initMap, 500);
    }

    function initMap() {
        const mapEl = document.getElementById('map'); if (!mapEl) return;
        map = new google.maps.Map(mapEl, { center: { lat: 34.6937, lng: 135.5023 }, zoom: 11, mapTypeControl: false, streetViewControl: false, fullscreenControl: true });
        updateMapMarkers();
    }

    function renderHeader() {
        const container = document.getElementById('day-tabs'); if (!container) return;
        container.innerHTML = Object.keys(userItinerary).map(day => `<button onclick="switchDay(${day})" class="px-4 py-2 rounded-full text-sm font-bold transition-all border shadow-sm ${day == activeDay ? 'bg-pink-500 text-white scale-105 border-pink-600' : 'bg-white text-gray-500 hover:bg-gray-100'}">Day ${day}</button>`).join('');
    }

    function renderBuilderUI() {
        const container = document.getElementById('itinerary-content'); if (!container) return;

        const planList = userItinerary[activeDay].map((id, idx) => {
            const item = POI_DATABASE.find(p => p.id === id);
            return `
                <div class="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 transition hover:shadow-md">
                    <div class="w-6 h-6 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        ${idx + 1}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="font-bold text-gray-700 text-sm cursor-pointer hover:text-pink-600 truncate" onclick="showDetail('${item.id}')">
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
            <div class="bg-pink-50 p-4 rounded-xl mb-6 border border-pink-100 shadow-inner">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-bold text-pink-800 flex items-center gap-2">📅 Day ${activeDay} 일정</h3>
                    <span class="text-xs text-pink-600 bg-white px-2 py-1 rounded border border-pink-200 font-bold">${userItinerary[activeDay].length}곳 선택됨</span>
                </div>
                <div id="my-plan-list" class="space-y-2 min-h-[50px]">
                    ${userItinerary[activeDay].length === 0 ? '<p class="text-center text-gray-400 text-xs py-6 border-2 border-dashed border-pink-200 rounded-lg">아래 목록에서 [+] 버튼을 눌러<br>장소를 추가해보세요.</p>' : planList}
                </div>
            </div>
            
            <div class="mb-3 flex gap-2 overflow-x-auto pb-2 scrollbar-hide filters">
                <button onclick="filterSpots('all')" class="filter-btn active bg-gray-800 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition">전체</button>
                <button onclick="filterSpots('minami')" class="filter-btn bg-white text-gray-600 border border-gray-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition hover:bg-gray-50">난바/신세카이</button>
                <button onclick="filterSpots('kita')" class="filter-btn bg-white text-gray-600 border border-gray-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition hover:bg-gray-50">우메다/오사카성</button>
                <button onclick="filterSpots('bay')" class="filter-btn bg-white text-gray-600 border border-gray-300 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm whitespace-nowrap transition hover:bg-gray-50">USJ/베이</button>
            </div>
            
            <div id="spot-pool" class="grid grid-cols-1 gap-4 pb-24"></div>`;

        renderSpotPool('all');
    }

    window.renderSpotPool = function (region) {
        const pool = document.getElementById('spot-pool');
        const filtered = region === 'all' ? POI_DATABASE : POI_DATABASE.filter(p => p.region === region);

        let htmlContent = filtered.map(place => `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div class="flex p-4 gap-4">
                    <div class="w-24 h-24 flex-shrink-0 relative rounded-lg overflow-hidden cursor-pointer group" onclick="showDetail('${place.id}')">
                        <img src="${place.photos[0]}" class="w-full h-full object-cover transition group-hover:scale-110">
                        <div class="absolute bottom-0 w-full bg-black/60 text-white text-[10px] text-center py-1">상세보기</div>
                    </div>
                    <div class="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start">
                                <h4 class="font-bold text-gray-900 text-lg truncate cursor-pointer hover:text-pink-600" onclick="showDetail('${place.id}')">${place.name}</h4>
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
                    <button onclick="addToPlan('${place.id}')" class="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition">
                        <i class="fas fa-plus"></i> 일정에 담기
                    </button>
                </div>
            </div>`).join('');

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

        content.innerHTML = `
            <div class="relative h-72 bg-gray-900 group">
                <img src="${item.photos[0]}" class="w-full h-full object-cover opacity-90 transition group-hover:opacity-100 duration-700">
                <button onclick="closeModal()" class="absolute top-4 right-4 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center backdrop-blur hover:bg-black/70 transition z-20">✕</button>
                <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-20">
                    <span class="bg-pink-600 text-white text-[10px] px-2 py-1 rounded-full font-bold mb-2 inline-block">${item.region.toUpperCase()}</span>
                    <h2 class="text-3xl font-black text-white leading-tight mb-1">${item.name}</h2>
                    <div class="flex items-center gap-2 text-white/90 text-sm">
                        <span class="text-yellow-400">★ ${item.rating}</span>
                        <span>•</span>
                        <span>${item.type.toUpperCase()}</span>
                    </div>
                </div>
            </div>
            
            <div class="sticky top-0 bg-white z-10 flex border-b shadow-sm">
                <button class="flex-1 py-4 text-sm font-bold text-pink-600 border-b-2 border-pink-600 transition">개요</button>
                <button class="flex-1 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition" onclick="alert('준비중입니다.')">리뷰 (128)</button>
                <button class="flex-1 py-4 text-sm font-bold text-gray-400 hover:text-gray-600 transition" onclick="alert('준비중입니다.')">사진</button>
            </div>

            <div class="p-6 pb-24 space-y-8">
                <div><p class="text-gray-600 leading-relaxed text-lg">${item.desc}</p></div>
                <div class="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <h3 class="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2"><i class="fas fa-info-circle text-pink-500"></i> 상세 정보</h3>
                    <div class="prose text-sm text-gray-600 leading-relaxed">${item.details?.info || '정보 업데이트 중...'}</div>
                </div>
                ${item.details?.transport ? `<div class="space-y-3"><h3 class="font-bold text-gray-800 text-sm flex items-center gap-2"><i class="fas fa-ticket-alt text-purple-500"></i> 티켓 & 교통</h3><div class="bg-purple-50 p-4 rounded-xl border border-purple-100">${item.details.transport}</div></div>` : ''}
                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name)}" target="_blank" class="block w-full bg-gray-800 text-white text-center py-4 rounded-xl font-bold hover:bg-gray-700 transition shadow-lg flex items-center justify-center gap-2"><i class="fas fa-map-marked-alt"></i> 구글맵에서 실제 위치 보기</a>
            </div>`;
    }

    // --- Helpers ---
    function createModal() { let m = document.getElementById('app-modal'); if (!m) { m = document.createElement('div'); m.id = 'app-modal'; m.className = 'fixed inset-0 z-50 hidden'; m.innerHTML = `<div class="absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="closeModal()"></div><div class="absolute bottom-0 w-full md:w-[480px] md:right-0 md:top-0 h-[90vh] md:h-full bg-white rounded-t-2xl md:rounded-none flex flex-col overflow-hidden shadow-2xl transition-transform"><div id="modal-content" class="flex-1 overflow-y-auto scrollbar-hide"></div></div>`; document.body.appendChild(m); } m.classList.remove('hidden'); return true; }
    window.closeModal = () => document.getElementById('app-modal').classList.add('hidden');

    function injectCSS() { const s = document.createElement('style'); s.textContent = `.scrollbar-hide::-webkit-scrollbar { display: none; } .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }`; document.head.appendChild(s); }

    initApp();
}

window.initOsakaTrip = initOsakaTrip;
