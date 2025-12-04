
function initFukuokaTrip() {
    // ==========================================================================
    //  ✨ HIGH FIDELITY DATABASE: FUKUOKA (CLONED FROM GUIDE)
    // ==========================================================================
    const POI_DATABASE = [
        // --- Day 1: Tenjin & Daimyo ---
        {
            "id": "fuk_airport",
            "name": "후쿠오카 공항 (FUK)",
            "lat": 33.5859,
            "lng": 130.4506,
            "type": "transport",
            "region": "hakata",
            "rating": 4.5,
            "desc": "도심에서 가장 가까운 공항.",
            "photos": ["images/travel/fukuoka/fuk_airport.jpg"],
            "details": {
                "info": "하카타역까지 지하철로 5분. 국제선 터미널에서 셔틀버스 이용.",
                "transport": "지하철 공항선"
            }
        },
        {
            "id": "shinshin_ramen",
            "name": "신신 라멘 텐진 본점",
            "lat": 33.5890,
            "lng": 130.3960,
            "type": "food",
            "region": "tenjin",
            "rating": 4.5,
            "desc": "동방신기 등 연예인들이 사랑한 라멘 맛집.",
            "photos": ["images/travel/fukuoka/shinshin_ramen.jpg"],
            "details": {
                "info": "진하지만 잡내 없는 돈코츠 국물과 얇은 면발이 특징. 벽면 가득한 싸인이 인상적.",
                "menu": "하카타 신신 라멘 760엔, 볶음밥 세트",
                "tips": "식사 시간에는 대기 줄이 깁니다. 오픈런 추천.",
                "transport": "텐진역 도보 5분"
            },
            "reviews": [
                { "user": "RamenLover", "date": "2024.01", "text": "국물이 정말 진국이고 면이 얇아서 호로록 넘어가요. 인생 라멘!" },
                { "user": "Traveler_K", "date": "2023.12", "text": "웨이팅이 있었지만 기다릴 가치가 충분했습니다. 볶음밥도 꼭 드세요." }
            ]
        },
        {
            "id": "daimyo_street",
            "name": "다이묘 거리",
            "lat": 33.5883,
            "lng": 130.3937,
            "type": "shop",
            "region": "tenjin",
            "rating": 4.6,
            "desc": "후쿠오카의 가로수길. 힙한 편집샵과 카페.",
            "photos": ["images/travel/fukuoka/daimyo_street.jpg"],
            "details": {
                "info": "슈프림, 베이프 등 스트릿 브랜드와 예쁜 카페가 모여있는 거리.",
                "transport": "텐진역 도보 7분"
            }
        },
        {
            "id": "cafe_del_sol",
            "name": "카페 델 솔",
            "lat": 33.5898,
            "lng": 130.3966,
            "type": "food",
            "region": "tenjin",
            "rating": 4.4,
            "desc": "폭신폭신한 수플레 팬케이크 맛집.",
            "photos": ["images/travel/fukuoka/cafe_del_sol.jpg"],
            "details": {
                "info": "입안에서 사르르 녹는 식감의 팬케이크. 라떼아트도 귀여움.",
                "menu": "수플레 팬케이크 1,100엔~",
                "transport": "다이묘 거리 내"
            }
        },
        {
            "id": "ohori_park",
            "name": "오호리 공원",
            "lat": 33.5860,
            "lng": 130.3764,
            "type": "spot",
            "region": "tenjin",
            "rating": 4.8,
            "desc": "도심 속 거대한 호수 공원.",
            "photos": ["images/travel/fukuoka/ohori_park.jpg"],
            "details": {
                "info": "현지인들의 휴식처. 스타벅스 컨셉스토어에서 호수 뷰를 즐기세요.",
                "transport": "오호리공원역"
            }
        },
        {
            "id": "motsunabe_rakutenchi",
            "name": "모츠나베 라쿠텐치 텐진 본점",
            "lat": 33.5915,
            "lng": 130.4025,
            "type": "food",
            "region": "tenjin",
            "rating": 4.5,
            "desc": "산더미처럼 쌓인 부추가 특징인 모츠나베.",
            "photos": ["images/travel/fukuoka/motsunabe_rakutenchi.jpg"],
            "details": {
                "info": "간장 베이스의 깔끔한 육수. 부추와 양배추가 푸짐함.",
                "menu": "모츠나베 1인 1,090엔~",
                "tips": "마무리는 짬뽕면 필수!",
                "transport": "텐진역 도보 3분"
            }
        },
        {
            "id": "don_quijote",
            "name": "돈키호테 텐진 본점",
            "lat": 33.5890,
            "lng": 130.4000,
            "type": "shop",
            "region": "tenjin",
            "rating": 4.3,
            "desc": "일본 여행 필수 쇼핑 코스.",
            "photos": ["images/travel/fukuoka/don_quijote.jpg"],
            "details": {
                "info": "화장품, 의약품, 간식 등 모든 것이 있는 잡화점. 24시간 영업.",
                "tips": "할인 쿠폰과 면세 혜택 꼭 챙기세요.",
                "transport": "텐진역 도보 5분"
            }
        },

        // --- Day 2: Yufuin & Hakata ---
        {
            "id": "hakata_station",
            "name": "하카타역 (출발)",
            "lat": 33.5902,
            "lng": 130.4207,
            "type": "transport",
            "region": "hakata",
            "rating": 4.7,
            "desc": "유후인노모리 열차 또는 버스 탑승.",
            "photos": ["images/travel/fukuoka/hakata_station.jpg"],
            "details": {
                "info": "크로와상 맛집 '일 포르노 델 미뇽'에서 간식 사기.",
                "transport": "JR 하카타역"
            }
        },
        {
            "id": "yufuin_yunotsubo",
            "name": "유노츠보 거리",
            "lat": 33.2650,
            "lng": 131.3600,
            "type": "spot",
            "region": "nearby",
            "rating": 4.6,
            "desc": "아기자기한 상점과 먹거리가 가득한 거리.",
            "photos": ["images/travel/fukuoka/yufuin_yunotsubo.jpg"],
            "details": {
                "info": "금상고로케, 스누피 차야, 미피 베이커리 등 구경거리 천국.",
                "transport": "유후인역 도보 10분"
            }
        },
        {
            "id": "yufumabushi_shin",
            "name": "유후마부시 신 (긴린코점)",
            "lat": 33.2672,
            "lng": 131.3678,
            "type": "food",
            "region": "nearby",
            "rating": 4.5,
            "desc": "유후인 명물 뚝배기 덮밥.",
            "photos": ["images/travel/fukuoka/yufumabushi_shin.jpg"],
            "details": {
                "info": "소고기(분고규), 장어, 닭고기 덮밥. 세 가지 방법으로 즐기는 맛.",
                "menu": "소고기 마부시 2,850엔~",
                "tips": "웨이팅이 기니 오픈 시간 맞춰 가세요.",
                "transport": "긴린코 호수 근처"
            }
        },
        {
            "id": "kinrin_lake",
            "name": "긴린코 호수",
            "lat": 33.2660,
            "lng": 131.3680,
            "type": "spot",
            "region": "nearby",
            "rating": 4.7,
            "desc": "물안개가 피어오르는 신비로운 호수.",
            "photos": ["images/travel/fukuoka/kinrin_lake.jpg"],
            "details": {
                "info": "온천수와 지하수가 만나 겨울 아침 물안개가 장관.",
                "transport": "유노츠보 거리 끝"
            }
        },
        {
            "id": "yufuin_onsen",
            "name": "유후인 온천 (무소엔)",
            "lat": 33.2580,
            "lng": 131.3500,
            "type": "spot",
            "region": "nearby",
            "rating": 4.8,
            "desc": "유후다케 산이 보이는 노천탕.",
            "photos": ["images/travel/fukuoka/yufuin_onsen.jpg"],
            "details": {
                "info": "당일 온천 가능. 탁 트인 전망이 일품.",
                "transport": "유후인역 택시 5분"
            }
        },
        {
            "id": "hakata_issou",
            "name": "하카타 잇소우 본점",
            "lat": 33.5900,
            "lng": 130.4250,
            "type": "food",
            "region": "hakata",
            "rating": 4.6,
            "desc": "'돈코츠 카푸치노'라 불리는 거품 가득 진한 라멘.",
            "photos": ["images/travel/fukuoka/hakata_issou.jpg"],
            "details": {
                "info": "현지인 줄이 가장 긴 라멘집 중 하나. 크리미하고 진한 국물.",
                "menu": "라멘 800엔~",
                "transport": "하카타역 도보 10분"
            }
        },

        // --- Day 3: Hakata & Nakasu ---
        {
            "id": "sumiyoshi_shrine",
            "name": "스미요시 신사",
            "lat": 33.5860,
            "lng": 130.4150,
            "type": "spot",
            "region": "hakata",
            "rating": 4.4,
            "desc": "규슈 최고의 역사를 자랑하는 신사.",
            "photos": ["images/travel/fukuoka/sumiyoshi_shrine.jpg"],
            "details": {
                "info": "도심 속 고즈넉한 산책 코스. 바다의 신을 모심.",
                "transport": "하카타역 도보 15분"
            }
        },
        {
            "id": "udon_taira",
            "name": "우동 타이라",
            "lat": 33.5880,
            "lng": 130.4180,
            "type": "food",
            "region": "hakata",
            "rating": 4.5,
            "desc": "오픈 전부터 줄 서는 고기 우엉튀김 우동.",
            "photos": ["images/travel/fukuoka/udon_taira.jpg"],
            "details": {
                "info": "직접 뽑는 쫄깃한 면발. 고기(니쿠)와 우엉(고보) 토핑 추천.",
                "menu": "니쿠고보 우동 700엔~",
                "transport": "캐널시티 근처"
            }
        },
        {
            "id": "canal_city",
            "name": "캐널시티 하카타",
            "lat": 33.5897,
            "lng": 130.4108,
            "type": "shop",
            "region": "hakata",
            "rating": 4.6,
            "desc": "운하가 흐르는 복합 쇼핑몰.",
            "photos": ["images/travel/fukuoka/canal_city.jpg"],
            "details": {
                "info": "매시 정각 분수쇼 관람. 프랑프랑, 디즈니스토어 쇼핑.",
                "transport": "하카타역/텐진역 도보 10분"
            }
        },
        {
            "id": "kushida_shrine",
            "name": "쿠시다 신사",
            "lat": 33.5930,
            "lng": 130.4110,
            "type": "spot",
            "region": "hakata",
            "rating": 4.5,
            "desc": "하카타의 수호신을 모시는 신사.",
            "photos": ["images/travel/fukuoka/kushida_shrine.jpg"],
            "details": {
                "info": "명성황후 시해 칼이 보관된 곳으로도 알려짐(비공개). 거대한 가마(야마카사) 전시.",
                "transport": "캐널시티 연결"
            }
        },
        {
            "id": "nakasu_river",
            "name": "나카스 강변 산책",
            "lat": 33.5920,
            "lng": 130.4080,
            "type": "spot",
            "region": "nakasu",
            "rating": 4.7,
            "desc": "네온사인이 비치는 아름다운 야경.",
            "photos": ["images/travel/fukuoka/nakasu_river.jpg"],
            "details": {
                "info": "강변을 따라 걸으며 버스킹 구경. 리버크루즈 탑승도 추천.",
                "transport": "나카스카와바타역"
            }
        },
        {
            "id": "ichiran_hq",
            "name": "이치란 라멘 본점",
            "lat": 33.5930,
            "lng": 130.4040,
            "type": "food",
            "region": "nakasu",
            "rating": 4.6,
            "desc": "건물 전체가 라멘집인 이치란의 총본산.",
            "photos": ["images/travel/fukuoka/ichiran_head.jpg"],
            "details": {
                "info": "24시간 영업. 독서실 좌석. 본점 한정 '가마다레 돈코츠' 라멘.",
                "transport": "나카스카와바타역"
            }
        },
        {
            "id": "nakasu_yatai",
            "name": "나카스 야타이 거리",
            "lat": 33.5910,
            "lng": 130.4080,
            "type": "food",
            "region": "nakasu",
            "rating": 4.3,
            "desc": "후쿠오카의 밤을 책임지는 포장마차 거리.",
            "photos": ["images/travel/fukuoka/yatai_nakasu.jpg"],
            "details": {
                "info": "강변 낭만. 오뎅, 꼬치, 라멘. 현금 준비 필수.",
                "transport": "나카스 강변"
            }
        },

        // --- Day 4: Return ---
        {
            "id": "tanya_hakata",
            "name": "탄야 하카타",
            "lat": 33.5898,
            "lng": 130.4207,
            "type": "food",
            "region": "hakata",
            "rating": 4.4,
            "desc": "하카타역 지하 1번가의 가성비 우설 조식.",
            "photos": ["images/travel/fukuoka/tanya_hakata.jpg"],
            "details": {
                "info": "아침 한정 우설 정식이 인기. 얇게 썬 우설 구이.",
                "menu": "우설 조식 정식 700엔~",
                "transport": "하카타역 지하 1번가"
            }
        },
        {
            "id": "amu_plaza",
            "name": "아뮤플라자 하카타",
            "lat": 33.5900,
            "lng": 130.4200,
            "type": "shop",
            "region": "hakata",
            "rating": 4.6,
            "desc": "마지막 쇼핑을 위한 대형 쇼핑몰.",
            "photos": ["images/travel/fukuoka/hakata_station.jpg"],
            "details": {
                "info": "도큐핸즈, 포켓몬센터, 무인양품. 옥상 정원 전망대.",
                "transport": "하카타역 직결"
            }
        },
        {
            "id": "hakata_bento",
            "name": "에키벤 (도시락)",
            "lat": 33.5902,
            "lng": 130.4207,
            "type": "food",
            "region": "hakata",
            "rating": 4.5,
            "desc": "기차/비행기 여행의 묘미.",
            "photos": ["images/travel/fukuoka/hakata_bento.jpg"],
            "details": {
                "info": "하카타역 내 '에키벤토'에서 다양한 도시락 구매 가능.",
                "transport": "하카타역"
            }
        }
    ];

    let userItinerary = {
        "1": ["fuk_airport", "shinshin_ramen", "daimyo_street", "cafe_del_sol", "ohori_park", "motsunabe_rakutenchi", "don_quijote"],
        "2": ["hakata_station", "yufuin_yunotsubo", "yufumabushi_shin", "kinrin_lake", "yufuin_onsen", "hakata_issou"],
        "3": ["sumiyoshi_shrine", "udon_taira", "canal_city", "kushida_shrine", "nakasu_river", "ichiran_hq", "nakasu_yatai"],
        "4": ["tanya_hakata", "amu_plaza", "hakata_bento", "fuk_airport"]
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
