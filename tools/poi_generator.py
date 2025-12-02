
"""
poi_generator.py
Travel Data Generator for JAP-BONG Application
This script defines the high-fidelity data structure for travel spots and generates the corresponding JavaScript code.
"""

import json

# ==============================================================================
#  DATA DEFINITION (FUKUOKA)
# ==============================================================================
FUKUOKA_DATA = [
    {
        "id": "dazaifu",
        "name": "다자이후 텐만구",
        "lat": 33.5215,
        "lng": 130.5349,
        "type": "spot",
        "region": "suburb",
        "rating": 4.7,
        "desc": "학문의 신을 모시는 신사. 합격 기원과 매화 명소.",
        "photos": [
            "https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?w=800",
            "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800",
            "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800",
            "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=800",
            "https://images.unsplash.com/photo-1599940824399-b87987ce0799?w=800",
            "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800",
            "https://images.unsplash.com/photo-1536691881682-1df64599547d?w=800",
            "https://images.unsplash.com/photo-1553531384-cc64ac80f931?w=800",
            "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800",
            "https://images.unsplash.com/photo-1576788235839-55668b577366?w=800"
        ],
        "details": {
            "info": "학문의 신 '스가와라노 미치자네'를 모시는 곳으로, 매년 수많은 수험생이 찾습니다. 경내에는 6,000그루의 매화나무가 있어 2~3월에 절경을 이룹니다. 입구의 참배길에는 명물 '우메가에 모치(매화떡)' 가게와 독특한 디자인의 스타벅스가 있습니다.",
            "transport": '<p class="text-xs text-gray-600">🚆 <strong>니시테츠 전철:</strong> 텐진역에서 다자이후행 탑승 (약 25분)</p><p class="text-xs text-gray-600">🚌 <strong>버스:</strong> 하카타 버스터미널에서 다자이후 라이너 버스 (약 40분)</p>',
            "tips": "우메가에 모치는 갓 구운 것을 사서 바로 드세요. 스타벅스 컨셉스토어는 사진 명소이니 꼭 들러보세요. 본전 뒤편의 매화나무 '토비우메'가 가장 유명합니다."
        },
        "reviews": [
            {"user": "수험생맘", "date": "1주 전", "rating": 5, "text": "아이 합격 기원하러 다녀왔습니다. 분위기가 차분하고 좋네요. 매화떡도 맛있었어요."},
            {"user": "건축학도", "date": "2주 전", "rating": 5, "text": "쿠마 켄고가 디자인한 스타벅스는 정말 독특합니다. 나무를 엮은 구조가 인상적이에요."},
            {"user": "꽃놀이", "date": "1개월 전", "rating": 4, "text": "매화가 필 때 가면 정말 예쁩니다. 다만 사람이 너무 많아서 사진 찍기는 좀 힘들어요."}
        ]
    },
    {
        "id": "canal_city",
        "name": "캐널시티 하카타",
        "lat": 33.5897,
        "lng": 130.4108,
        "type": "spot",
        "region": "hakata",
        "rating": 4.5,
        "desc": "운하가 흐르는 거대한 복합 쇼핑몰. 분수쇼가 하이라이트.",
        "photos": [
            "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800",
            "https://images.unsplash.com/photo-1580442151529-343f2f6e0e27?w=800",
            "https://images.unsplash.com/photo-1553621042-f6e147245754?w=800",
            "https://images.unsplash.com/photo-1519708227418-c8fd9a3a2720?w=800",
            "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800",
            "https://images.unsplash.com/photo-1579623696562-b91c01995801?w=800",
            "https://images.unsplash.com/photo-1580225598739-44585c5d0459?w=800",
            "https://images.unsplash.com/photo-1535448033526-2729314bbc30?w=800",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
            "https://images.unsplash.com/photo-1548943487-a2e4e43b485c?w=800"
        ],
        "details": {
            "info": "호텔, 극장, 영화관, 상점, 레스토랑 등이 모인 대형 복합 시설입니다. 건물 사이로 인공 운하가 흐르며, 매시 정각과 30분마다 음악 분수쇼가 펼쳐집니다. 5층 라멘 스타디움에서는 전국의 유명 라멘을 맛볼 수 있습니다.",
            "transport": '<p class="text-xs text-gray-600">🚶 <strong>도보:</strong> 하카타역에서 도보 10분, 나카스카와바타역에서 도보 10분</p><p class="text-xs text-gray-600">🚌 <strong>100엔 버스:</strong> 캐널시티 하카타 마에 하차</p>',
            "tips": "분수쇼는 밤에 조명과 함께 볼 때 더 아름답습니다. 프랑프랑, 무인양품, 디즈니 스토어 등 쇼핑하기 좋습니다. 라멘 스타디움은 점심시간 피해서 가세요."
        },
        "reviews": [
            {"user": "쇼핑광", "date": "1주 전", "rating": 5, "text": "하루 종일 있어도 지루하지 않아요. 분수쇼 퀄리티가 생각보다 훨씬 좋습니다."},
            {"user": "라멘러버", "date": "3주 전", "rating": 4, "text": "라멘 스타디움에서 먹은 돈코츠 라멘이 맛있었습니다. 여러 가게를 비교해볼 수 있어 좋아요."},
            {"user": "가족여행", "date": "1개월 전", "rating": 5, "text": "아이들이 분수쇼를 너무 좋아해서 두 번이나 봤습니다. 쇼핑몰 구조가 좀 복잡해서 길 잃기 쉬워요."}
        ]
    },
    {
        "id": "fukuoka_tower",
        "name": "후쿠오카 타워",
        "lat": 33.5932,
        "lng": 130.3515,
        "type": "spot",
        "region": "momochi",
        "rating": 4.6,
        "desc": "8,000장의 반사 유리가 빛나는 해변의 랜드마크.",
        "photos": [
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
            "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
            "https://images.unsplash.com/photo-1585672660340-966e33004946?w=800",
            "https://images.unsplash.com/photo-1566982829230-a6e790949321?w=800",
            "https://images.unsplash.com/photo-1571211919320-1c953097f1a6?w=800",
            "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800",
            "https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=800",
            "https://images.unsplash.com/photo-1582967788606-a171f1080ca8?w=800",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
            "https://images.unsplash.com/photo-1580795479214-396813052e3e?w=800"
        ],
        "details": {
            "info": "높이 234m의 해변 타워로, 8,000장의 반사 유리가 덮여 있어 '미러 세일(Mirror Sail)'이라는 별명을 가지고 있습니다. 전망대에서는 후쿠오카 시내와 하카타 만을 360도로 조망할 수 있습니다. 야간 일루미네이션도 볼거리입니다.",
            "transport": '<p class="text-xs text-gray-600">🚌 <strong>버스:</strong> 하카타역/텐진에서 306번 등 탑승, 후쿠오카 타워 미나미구치 하차 (약 25분)</p>',
            "tips": "외국인 여권 제시 시 입장료 할인이 있습니다. 해질녘에 가서 석양과 야경을 모두 보는 것을 추천합니다. 바로 앞 모모치 해변공원도 산책하기 좋습니다."
        },
        "reviews": [
            {"user": "야경꾼", "date": "2주 전", "rating": 5, "text": "야경이 정말 끝내줍니다. 모모치 해변이랑 같이 묶어서 가면 딱이에요."},
            {"user": "커플", "date": "1개월 전", "rating": 5, "text": "사랑의 자물쇠 거는 곳이 있어서 데이트 코스로 좋습니다. 엘리베이터 안내원분들도 친절해요."},
            {"user": "가성비", "date": "3개월 전", "rating": 4, "text": "여권 할인 받으면 가격도 괜찮습니다. 날씨 좋은 날 가면 대마도까지 보인대요."}
        ]
    },
    {
        "id": "nakasu_yatai",
        "name": "나카스 포장마차 거리",
        "lat": 33.5924,
        "lng": 130.4046,
        "type": "food",
        "region": "nakasu",
        "rating": 4.3,
        "desc": "강변을 따라 늘어선 낭만적인 야타이(포장마차) 거리.",
        "photos": [
            "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800",
            "https://images.unsplash.com/photo-1582234033096-7c06834b97d7?w=800",
            "https://images.unsplash.com/photo-1548943487-a2e4e43b485c?w=800",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
            "https://images.unsplash.com/photo-1599354607478-6f363c473167?w=800",
            "https://images.unsplash.com/photo-1535448033526-2729314bbc30?w=800",
            "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
            "https://images.unsplash.com/photo-1552611052-33e04de081de?w=800",
            "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800",
            "https://images.unsplash.com/photo-1579623696562-b91c01995801?w=800"
        ],
        "details": {
            "info": "나카스 강변을 따라 저녁이 되면 들어서는 포장마차 거리입니다. 하카타 라멘, 오뎅, 꼬치구이(야키토리), 명란 계란말이 등 다양한 안주와 술을 즐길 수 있습니다. 현지인과 관광객이 어우러지는 활기찬 분위기가 특징입니다.",
            "transport": '<p class="text-xs text-gray-600">🚇 <strong>지하철:</strong> 나카스카와바타역 또는 텐진미나미역에서 도보 10분</p>',
            "tips": "가격이 조금 비쌀 수 있고, 현금 결제만 가능한 곳이 많습니다. 화장실 이용이 불편할 수 있으니 미리 다녀오세요. 분위기만 즐기고 식사는 다른 곳에서 하는 것도 방법입니다."
        },
        "reviews": [
            {"user": "낭만파", "date": "1주 전", "rating": 4, "text": "강물에 비친 네온사인을 보며 먹는 라멘 맛은 잊을 수 없습니다. 분위기가 다 했어요."},
            {"user": "솔직후기", "date": "2주 전", "rating": 3, "text": "사람이 너무 많고 자리가 좁습니다. 가격도 식당보다 비싼 편이에요. 경험 삼아 한 번쯤은 갈만합니다."},
            {"user": "애주가", "date": "1개월 전", "rating": 5, "text": "옆자리 사람이랑 말 트고 술 마시는 재미가 있습니다. 명란 구이 꼭 드세요."}
        ]
    },
    {
        "id": "ohori_park",
        "name": "오호리 공원",
        "lat": 33.5860,
        "lng": 130.3764,
        "type": "spot",
        "region": "tenjin",
        "rating": 4.6,
        "desc": "도심 속 거대한 호수 공원. 산책과 조깅의 명소.",
        "photos": [
            "https://images.unsplash.com/photo-1540206395-e8f80bb341cc?w=800",
            "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800",
            "https://images.unsplash.com/photo-1585672660340-966e33004946?w=800",
            "https://images.unsplash.com/photo-1566982829230-a6e790949321?w=800",
            "https://images.unsplash.com/photo-1571211919320-1c953097f1a6?w=800",
            "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800",
            "https://images.unsplash.com/photo-1560275619-4662e36fa65c?w=800",
            "https://images.unsplash.com/photo-1582967788606-a171f1080ca8?w=800",
            "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
            "https://images.unsplash.com/photo-1580795479214-396813052e3e?w=800"
        ],
        "details": {
            "info": "후쿠오카 성의 해자를 이용하여 만든 공원으로, 큰 호수를 중심으로 산책로가 잘 조성되어 있습니다. 호수 중앙의 섬들을 잇는 다리가 운치 있으며, 오리배를 탈 수도 있습니다. 공원 내 스타벅스는 호수 뷰가 훌륭하기로 유명합니다.",
            "transport": '<p class="text-xs text-gray-600">🚇 <strong>지하철:</strong> 오호리공원역 하차 바로 앞</p>',
            "tips": "자전거를 빌려서 한 바퀴 도는 것을 추천합니다. 근처에 후쿠오카 성터와 미술관도 있어 함께 둘러보기 좋습니다. 벚꽃 시즌과 불꽃놀이 축제 때 가장 붐빕니다."
        },
        "reviews": [
            {"user": "러너", "date": "1주 전", "rating": 5, "text": "조깅하기 최고의 코스입니다. 바닥이 고무로 되어 있어 무릎에 무리가 안 가요."},
            {"user": "힐링", "date": "3주 전", "rating": 5, "text": "스타벅스 창가 자리에 앉아 호수 멍 때리면 시간 가는 줄 모릅니다. 도심 속에 이런 곳이 있다니 놀라워요."},
            {"user": "커플", "date": "2개월 전", "rating": 4, "text": "오리배 탔는데 다리가 좀 아팠지만 재밌었습니다. 데이트하기 좋아요."}
        ]
    }
]

# ==============================================================================
#  CODE GENERATION FUNCTION
# ==============================================================================
def generate_js_file(city_name, city_data):
    js_template = f"""
function init{city_name.capitalize()}Trip() {{
    console.log('🍜 {city_name.capitalize()} App V5.0 Loaded [HIGH FIDELITY DATA]');

    // ==========================================================================
    //  🍜 HIGH FIDELITY DATABASE: {city_name.upper()}
    // ==========================================================================
    const POI_DATABASE = {json.dumps(city_data, indent=4, ensure_ascii=False)};

    // ==========================================================================
    //  🚀 CORE ENGINE (STATE MANAGEMENT & UI)
    // ==========================================================================
    let userItinerary = {{ 1: [], 2: [], 3: [] }};
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
        map = new google.maps.Map(mapEl, {{
            center: {{ lat: {city_data[0]['lat']}, lng: {city_data[0]['lng']} }},
            zoom: 12,
            mapTypeControl: false, streetViewControl: false, fullscreenControl: true
        }});
        
        // Route Helper 초기화
        if (window.initRouteHelper) window.initRouteHelper(map);
        
        updateMapMarkers();
    }}

    function renderHeader() {{
        const container = document.getElementById('day-tabs');
        if (!container) return;
        container.innerHTML = Object.keys(userItinerary).map(day =>
            `<button onclick="switchDay(${{day}})" 
                class="px-4 py-2 rounded-full text-sm font-bold transition-all border shadow-sm ${{day == activeDay
                ? 'bg-red-500 text-white scale-105 border-red-600'
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
            return `
                <div class="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 transition hover:shadow-md">
                    <div class="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0">
                        ${{idx + 1}}
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="font-bold text-gray-700 text-sm cursor-pointer hover:text-red-600 truncate" onclick="showDetail('${{item.id}}')">
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
            <div class="bg-red-50 p-4 rounded-xl mb-6 border border-red-100 shadow-inner">
                <div class="flex justify-between items-center mb-3">
                    <h3 class="font-bold text-red-800 flex items-center gap-2">📅 Day ${{activeDay}} 일정</h3>
                    <div class="flex gap-2">
                         <button onclick="verifyRoute()" class="text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-none px-3 py-1.5 rounded-full font-bold hover:scale-105 transition flex items-center gap-1 shadow-md animate-pulse">
                            <i class="fas fa-plane-departure"></i> 미리여행
                        </button>
                        <span class="text-xs text-red-600 bg-white px-2 py-1 rounded border border-red-200 font-bold">${{userItinerary[activeDay].length}}곳</span>
                    </div>
                </div>
                <div id="my-plan-list" class="space-y-2 min-h-[50px]">
                    ${{userItinerary[activeDay].length === 0 ? '<p class="text-center text-gray-400 text-xs py-6 border-2 border-dashed border-red-200 rounded-lg">아래 목록에서 [+] 버튼을 눌러<br>장소를 추가해보세요.</p>' : planList}}
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
            const isAdded = userItinerary[activeDay].includes(place.id);
            const btnClass = isAdded ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-red-600";
            const btnText = isAdded ? "✅ 일정 포함됨" : `<i class="fas fa-plus"></i> 일정에 담기`;
            const btnAction = isAdded ? "" : `onclick="addToPlan('${{place.id}}')"`;

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
                                <h4 class="font-bold text-gray-900 text-lg truncate cursor-pointer hover:text-red-600" onclick="showDetail('${{place.id}}')">${{place.name}}</h4>
                                <span class="text-[10px] font-bold px-2 py-0.5 rounded ${{place.type === 'food' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'}}">${{place.type.toUpperCase()}}</span>
                            </div>
                            <p class="text-sm text-gray-500 mt-1 line-clamp-2">${{place.desc}}</p>
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
        if (userItinerary[activeDay].includes(id)) return alert('이미 일정에 있습니다.');
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
        
        // 동선 업데이트 (자동)
        if (window.drawRoute) window.drawRoute(userItinerary[activeDay], POI_DATABASE);
    }}

    // --- 상세 모달 (기존과 동일 패턴) ---
    window.showDetail = function (id) {{
        const item = POI_DATABASE.find(p => p.id === id);
        if (!createModal()) return;
        if (map) {{ map.panTo({{ lat: item.lat, lng: item.lng }}); map.setZoom(16); }}
        const content = document.getElementById('modal-content');
        window.currentDetailTab = 'overview';
        function renderModalContent() {{
             const overviewClass = window.currentDetailTab === 'overview' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-400 hover:text-gray-600';
            const reviewsClass = window.currentDetailTab === 'reviews' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-400 hover:text-gray-600';
            const photosClass = window.currentDetailTab === 'photos' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-400 hover:text-gray-600';

            let tabContent = '';
            if (window.currentDetailTab === 'overview') {{
                tabContent = `<div class="space-y-8 animate-fade-in"><div><p class="text-gray-600 leading-relaxed text-lg">${{item.desc}}</p></div><div class="bg-gray-50 p-5 rounded-2xl border border-gray-100"><h3 class="font-bold text-gray-800 text-sm mb-3 flex items-center gap-2"><i class="fas fa-info-circle text-red-500"></i> 상세 정보</h3><div class="prose text-sm text-gray-600 leading-relaxed space-y-2"><p>${{item.details?.info || '정보 업데이트 중...'}}</p>${{item.details?.tips ? `<p class="text-xs bg-yellow-50 p-2 rounded text-yellow-800">💡 <strong>꿀팁:</strong> ${{item.details.tips}}</p>` : ''}}</div></div>${{item.details?.transport ? `<div class="space-y-3"><h3 class="font-bold text-gray-800 text-sm flex items-center gap-2"><i class="fas fa-subway text-purple-500"></i> 교통편</h3><div class="bg-purple-50 p-4 rounded-xl border border-purple-100">${{item.details.transport}}</div></div>` : ''}}<div class="flex gap-3"><button onclick="addToPlan('${{item.id}}'); closeModal();" class="flex-1 bg-red-500 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition shadow-lg flex items-center justify-center gap-2"><i class="fas fa-plus-circle"></i> 일정에 담기</button><a href="https://www.google.com/maps/search/?api=1&query=${{encodeURIComponent(item.name)}}" target="_blank" class="flex-1 bg-gray-800 text-white text-center py-4 rounded-xl font-bold hover:bg-gray-700 transition shadow-lg flex items-center justify-center gap-2"><i class="fas fa-map-marked-alt"></i> 구글맵</a></div></div>`;
            }} else if (window.currentDetailTab === 'reviews') {{
                tabContent = `<div class="space-y-4 animate-fade-in"><div class="flex items-center gap-4 mb-6 bg-red-50 p-4 rounded-xl"><div class="text-4xl font-black text-red-600">${{item.rating}}</div><div><div class="flex text-yellow-400 text-sm mb-1">${{'★'.repeat(Math.floor(item.rating))}}</div><p class="text-xs text-gray-500">구글맵/트립어드바이저 리뷰 기반</p></div></div><div class="space-y-4">${{item.reviews.map(r => `<div class="border-b border-gray-100 pb-4"><div class="flex justify-between mb-2"><span class="font-bold text-sm text-gray-800">${{r.user}}</span><span class="text-xs text-gray-400">${{r.date}}</span></div><p class="text-sm text-gray-600">${{r.text}}</p></div>`).join('')}}</div></div>`;
            }} else if (window.currentDetailTab === 'photos') {{
                tabContent = `<div class="grid grid-cols-2 gap-2 animate-fade-in">${{item.photos.map(p => `<div class="aspect-square rounded-lg overflow-hidden bg-gray-100"><img src="${{p}}" class="w-full h-full object-cover" onclick="window.open('${{p}}','_blank')"></div>`).join('')}}</div>`;
            }}

            content.innerHTML = `<div class="relative h-72 bg-gray-900 group"><img src="${{item.photos[0]}}" class="w-full h-full object-cover opacity-90"><button onclick="closeModal()" class="absolute top-4 right-4 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center">✕</button><div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 to-transparent p-6 pt-20"><h2 class="text-3xl font-black text-white mb-1">${{item.name}}</h2></div></div><div class="sticky top-0 bg-white z-10 flex border-b shadow-sm"><button class="flex-1 py-4 text-sm font-bold transition ${{overviewClass}}" onclick="window.switchDetailTab('overview')">개요</button><button class="flex-1 py-4 text-sm font-bold transition ${{reviewsClass}}" onclick="window.switchDetailTab('reviews')">리뷰</button><button class="flex-1 py-4 text-sm font-bold transition ${{photosClass}}" onclick="window.switchDetailTab('photos')">사진</button></div><div class="p-6 pb-24">${{tabContent}}</div>`;
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
    return js_template

# ==============================================================================
#  MAIN EXECUTION
# ==============================================================================
if __name__ == "__main__":
    # Generate Fukuoka JS
    fukuoka_js = generate_js_file("fukuoka", FUKUOKA_DATA)
    
    # In a real scenario, this would write to a file. 
    # For this environment, we print it to be captured by the agent or user.
    print(fukuoka_js)
