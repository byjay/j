
// ==================== 데이터베이스 ====================
const placesDB = {
    // ================= [ 1일차: 삿포로 도착 & 징기스칸 ] =================
    'airport_in': {
        name: '신치토세 공항 (도착)',
        lat: 42.7933, lng: 141.6795,
        type: 'transport',
        rating: 4.5,
        desc: '먹거리와 온천이 있는 최고의 공항 ✈️',
        openHours: '24시간',
        tips: '💡 꿀팁: 공항 내 "로이즈 초콜릿 월드"와 "도라에몽 파크" 구경 필수! 공항 온천도 있어서 피로 풀기 좋음.',
        info: [
            { label: '이동', val: 'JR 쾌속 에어포트로 삿포로역까지 37분' },
            { label: '맛집', val: '라멘 도장 (유명 라멘집 집결)' }
        ],
        links: [
            { name: '공항 정보', url: 'https://www.new-chitose-airport.jp/ko/' }
        ],
        recommend: [
            { name: '키노토야 치즈타르트', type: '간식', desc: '공항 한정 갓 구운 타르트', icon: '🧀' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=600'
        ]
    },

    'hotel_checkin': {
        name: 'JR 타워 호텔 닛코 삿포로 (숙소)',
        lat: 43.0686, lng: 141.3508,
        type: 'hotel',
        rating: 4.6,
        desc: '삿포로역 직결, 뷰가 끝내주는 호텔',
        openHours: '체크인 15:00 / 체크아웃 11:00',
        tips: '💡 꿀팁: 고층 객실 뷰가 예술. 조식 뷔페 "SKY J"는 35층이라 삿포로 시내가 한눈에 보임.',
        info: [
            { label: '위치', val: '삿포로역 남쪽 출구 직결' },
            { label: '온천', val: '22층 스카이 리조트 스파 (유료/할인)' }
        ],
        links: [
            { name: '호텔 예약', url: 'https://www.jrhotels.co.jp/tower/kr/' }
        ],
        recommend: [
            { name: '다이마루 백화점', type: '쇼핑', desc: '호텔 바로 옆, 식품관 추천', icon: '🛍️' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600'
        ]
    },

    'sapporo_tv_tower': {
        name: '삿포로 TV 타워 & 오도리 공원',
        lat: 43.0611, lng: 141.3564,
        type: 'tour',
        rating: 4.4,
        desc: '삿포로의 상징, 계절마다 축제가 열리는 공원 🗼',
        openHours: '09:00~22:00',
        tips: '💡 꿀팁: 겨울엔 화이트 일루미네이션과 눈축제, 여름엔 맥주 축제! 타워 전망대에서 보는 야경도 멋짐.',
        info: [
            { label: '입장료', val: '타워 전망대 1,000엔' }
        ],
        links: [
            { name: 'TV 타워 정보', url: 'https://www.tv-tower.co.jp/kr/' }
        ],
        recommend: [
            { name: '옥수수 구이', type: '간식', desc: '여름~가을 공원 명물', icon: '🌽' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1548588627-f978862b85e1?w=600'
        ]
    },

    'dinner_jingisukan': {
        name: '징기스칸 다루마 (본점)',
        lat: 43.0552, lng: 141.3536,
        type: 'food',
        rating: 4.5,
        desc: '삿포로 소울푸드 양고기 구이, 웨이팅 필수 🥩',
        openHours: '17:00~03:00',
        priceRange: '3,000엔~',
        tips: '💡 꿀팁: 본점 줄이 길면 근처 4.4점이나 5.5점으로 가세요. 맛 똑같음. 양파 많이 달라고 하세요(무료).',
        info: [
            { label: '대기', val: '기본 1시간 (오픈런 추천)' }
        ],
        menus: [
            { name: '징기스칸 (양고기)', price: '1,280엔', desc: '잡내 없는 신선한 양고기', photo: '🥩' }
        ],
        links: [
            { name: '다루마 정보', url: 'https://sapporo-jingisukan.info/' }
        ],
        recommend: [
            { name: '스스키노 거리', type: '관광', desc: '니카상 간판 앞에서 사진 찍기', icon: '🥃' }
        ],
        reviews: [
            { user: '양고기신세계', text: '양고기 냄새 하나도 안 나고 너무 부드러워요.', score: 5 }
        ],
        photos: [
            'https://images.unsplash.com/photo-1544025162-d76694265947?w=600'
        ]
    },

    // ================= [ 2일차: 비에이 & 후라노 버스투어 ] =================
    'biei_tour': {
        name: '비에이 & 후라노 투어 (집결)',
        lat: 43.0686, lng: 141.3508,
        type: 'tour',
        rating: 4.8,
        desc: '홋카이도의 대자연! 패치워크 로드와 청의 호수 🌲',
        openHours: '08:00 집결 (투어마다 다름)',
        tips: '💡 꿀팁: 렌트카 없으면 버스투어 강추. 여름엔 라벤더(팜도미타), 겨울엔 크리스마스 나무가 하이라이트. 준페이 새우튀김덮밥 예약 필수.',
        info: [
            { label: '코스', val: '패치워크 로드 → 청의 호수 → 흰수염 폭포 → 닝구르 테라스' },
            { label: '준비물', val: '편한 신발, 보조배터리' }
        ],
        links: [
            { name: '투어 예약', url: 'https://www.klook.com/' }
        ],
        recommend: [
            { name: '라벤더 아이스크림', type: '간식', desc: '팜도미타 보라색 아이스크림', icon: '🍦' },
            { name: '비에이 우유', type: '간식', desc: '진하고 고소한 병우유', icon: '🥛' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1532651398036-679c6769d389?w=600',
            'https://images.unsplash.com/photo-1490761668535-35497054764d?w=600'
        ]
    },

    'junpei': {
        name: '준페이 (에비동)',
        lat: 43.5905, lng: 142.4608,
        type: 'food',
        rating: 4.7,
        desc: '비에이 필수 맛집, 인생 새우튀김 덮밥 🍤',
        openHours: '11:00~15:00 (재료 소진 시 마감)',
        priceRange: '1,500엔~',
        tips: '💡 꿀팁: 투어 가이드 통해서 예약하거나 오픈런 필수. 새우 3마리/4마리 선택 가능.',
        info: [
            { label: '메뉴', val: '에비동(새우튀김덮밥)이 진리' }
        ],
        menus: [
            { name: '에비동 (4마리)', price: '1,600엔', desc: '바삭하고 탱글한 새우튀김', photo: '🍤' }
        ],
        links: [
            { name: '구글맵', url: 'https://maps.app.goo.gl/junpei' }
        ],
        recommend: [
            { name: '비에이역', type: '포토존', desc: '감성적인 시골 기차역', icon: '🚉' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=600'
        ]
    },

    // ================= [ 3일차: 오타루 낭만 여행 ] =================
    'otaru_canal': {
        name: '오타루 운하',
        lat: 43.1994, lng: 141.0016,
        type: 'tour',
        rating: 4.6,
        desc: '영화 "러브레터"의 촬영지, 로맨틱한 운하 ❄️',
        openHours: '24시간',
        tips: '💡 꿀팁: 해 질 녘 가스등 켜질 때가 제일 예쁨. 운하 크루즈 타면 설명도 해줌. 오르골당까지 걸어가면서 구경하세요.',
        info: [
            { label: '이동', val: '삿포로역에서 JR로 30분' }
        ],
        links: [
            { name: '오타루 관광', url: 'https://otaru.gr.jp/kr/' }
        ],
        recommend: [
            { name: '르타오 본점', type: '디저트', desc: '더블 프로마쥬 치즈케이크 시식', icon: '🍰' },
            { name: '오르골당', type: '쇼핑', desc: '세계 최대 규모 오르골 상점', icon: '🎵' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1548588681-adf41d474533?w=600',
            'https://images.unsplash.com/photo-1518610532653-ac47c32c2537?w=600'
        ]
    },

    'dinner_sushi_otaru': {
        name: '마사즈시 (오타루)',
        lat: 43.1955, lng: 140.9935,
        type: 'food',
        rating: 4.5,
        desc: '미스터 초밥왕의 배경! 오타루 스시 거리 🍣',
        openHours: '11:00~21:00',
        priceRange: '3,000~6,000엔',
        tips: '💡 꿀팁: 예약 필수. 카운터석에서 장인이 쥐어주는 스시 구경. 오타루 맥주랑 같이 드세요.',
        info: [
            { label: '위치', val: '스시야도리(스시 거리) 내' }
        ],
        menus: [
            { name: '오마카세 니기리', price: '5,500엔', desc: '홋카이도 제철 해산물', photo: '🍣' }
        ],
        links: [
            { name: '공식 홈페이지', url: 'https://www.masazushi.co.jp/' }
        ],
        recommend: [
            { name: '카마에이 어묵', type: '간식', desc: '빵롤(팡로루) 꼭 드세요', icon: '🍥' }
        ],
        reviews: [
            { user: '초밥왕', text: '비린내 1도 없고 우니가 달아요.', score: 5 }
        ],
        photos: [
            'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600'
        ]
    },

    // ================= [ 4일차: 니조시장 & 귀국 ] =================
    'nijo_market': {
        name: '니조시장',
        lat: 43.0575, lng: 141.3580,
        type: 'food',
        rating: 4.2,
        desc: '삿포로의 아침을 여는 해산물 시장 🦀',
        openHours: '07:00~17:00',
        tips: '💡 꿀팁: 아침 식사로 카이센동(해산물 덮밥) 추천. "오이소"나 "돈부리차야"가 유명. 유바리 멜론 한 조각 후식으로!',
        info: [
            { label: '위치', val: '오도리 공원 근처' }
        ],
        menus: [
            { name: '카이센동', price: '2,500엔~', desc: '연어알, 성게알, 게살 듬뿍', photo: '🍚' },
            { name: '유바리 멜론', price: '500엔', desc: '세상에서 제일 달콤한 멜론', photo: '🍈' }
        ],
        links: [
            { name: '시장 정보', url: 'https://nijomarket.com/' }
        ],
        recommend: [
            { name: '바리스타트 커피', type: '카페', desc: '홋카이도 우유로 만든 라떼', icon: '☕' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600'
        ]
    },

    'airport_out': {
        name: '신치토세 공항 (귀국)',
        lat: 42.7933, lng: 141.6795,
        type: 'transport',
        rating: 4.5,
        desc: '홋카이도 안녕! 양손 가득 기념품 🎁',
        openHours: '24시간',
        tips: '💡 꿀팁: 르타오 치즈케이크, 시로이 코이비토, 롯카테이 버터샌드, 옥수수 과자 등 살 게 너무 많음. 보냉백 필수!',
        info: [
            { label: '체크인', val: '국제선 터미널 이동 시간 고려 (셔틀/도보)' }
        ],
        links: [
            { name: '면세점', url: 'https://www.new-chitose-airport.jp/ko/spend/shop/buy/' }
        ],
        recommend: [
            { name: '자가포쿠루', type: '선물', desc: '감자튀김 과자, 맥주 안주 최고', icon: '🍟' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?w=600'
        ]
    }
};

// 일정표
const schedule = {
    1: {
        title: '1일차: 삿포로 도착 & 징기스칸 🥩',
        items: ['airport_in', 'hotel_checkin', 'sapporo_tv_tower', 'dinner_jingisukan'],
        summary: '공항 도착 → 호텔 체크인 → TV 타워 야경 → 양고기 파티'
    },
    2: {
        title: '2일차: 비에이 & 후라노 버스투어 🌲',
        items: ['biei_tour', 'junpei'],
        summary: '패치워크 로드 → 청의 호수 → 닝구르 테라스 → 에비동 맛집'
    },
    3: {
        title: '3일차: 오타루 낭만 산책 ❄️',
        items: ['otaru_canal', 'dinner_sushi_otaru'],
        summary: '오타루 운하 → 오르골당 → 스시 거리'
    },
    4: {
        title: '4일차: 카이센동 & 귀국 🦀',
        items: ['nijo_market', 'airport_out'],
        summary: '니조시장 아침식사 → 공항 쇼핑 → 귀국'
    }
};

let activeDay = 1;
let map, markers = [];
let directionsService, directionsRenderer;

// ==================== 초기화 ====================
function initSapporoTrip() {
    try {
        console.log('❄️ 삿포로 여행 가이드 시작!');
        renderTabs();
        renderSchedule(activeDay);
        loadFlightInfo();
        loadAccommodation();
        initHotelSearch();

        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
            try {
                initMap();
                directionsService = new google.maps.DirectionsService();
                directionsRenderer = new google.maps.DirectionsRenderer({
                    map: map,
                    suppressMarkers: true,
                    polylineOptions: { strokeColor: '#00BFFF', strokeWeight: 5 } // 삿포로는 하늘색/눈색 테마
                });
            } catch (mapErr) {
                console.warn('Google Maps Init Failed:', mapErr);
            }
        } else {
            const mapEl = document.getElementById('map');
            if (mapEl) mapEl.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-100 text-gray-400">지도 로딩 중...</div>';
        }
    } catch (error) {
        console.error('Sapporo Module Init Error:', error);
    }
}

function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    map = new google.maps.Map(mapElement, {
        center: { lat: 43.0618, lng: 141.3545 }, // 삿포로 오도리 공원 중심
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true
    });

    updateMarkers(activeDay);
}

// ==================== UI 렌더링 ====================
function renderTabs() {
    const container = document.getElementById('day-tabs');
    if (!container) return;

    container.innerHTML = Object.keys(schedule).map(day =>
        `<button onclick="changeSapporoDay(${day})" 
                class="day-tab flex-shrink-0 px-3 py-2 rounded-lg border-2 text-xs font-bold transition-all duration-300 whitespace-nowrap ${day == activeDay
            ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-white border-cyan-600 shadow-md scale-105'
            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
        }">
            ${day}일차
        </button>`
    ).join('');
}

function changeSapporoDay(day) {
    activeDay = day;
    renderTabs();
    renderSchedule(day);
    if (map) updateMarkers(day);
    if (directionsRenderer) directionsRenderer.setDirections({ routes: [] });
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateMarkers(day) {
    if (!map || typeof google === 'undefined') return;

    markers.forEach(m => m.setMap(null));
    markers = [];
    const bounds = new google.maps.LatLngBounds();

    schedule[day].items.forEach((key, idx) => {
        const item = getPlace(key);
        if (!item) return;

        const marker = new google.maps.Marker({
            position: { lat: item.lat, lng: item.lng },
            map: map,
            label: { text: (idx + 1).toString(), color: "white", fontWeight: "bold" },
            title: item.name,
            animation: google.maps.Animation.DROP
        });

        marker.addListener('click', () => {
            const listElement = document.getElementById(`place-item-${idx}`);
            if (listElement) {
                listElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const panel = document.getElementById(`detail-${idx}`);
                if (panel && panel.classList.contains('hidden')) toggleDetail(idx, item.lat, item.lng);
            }
        });

        markers.push(marker);
        bounds.extend(marker.getPosition());
    });

    if (markers.length > 0) {
        map.fitBounds(bounds);
    }
}

function renderSchedule(day) {
    const container = document.getElementById('itinerary-content');
    if (!container) return;

    const summaryDiv = document.createElement('div');
    summaryDiv.className = "bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-4 mb-6 border-l-4 border-cyan-500";
    summaryDiv.innerHTML = `
        <h3 class="font-bold text-lg text-gray-800 mb-2">📍 ${schedule[day].title}</h3>
        <p class="text-sm text-gray-600">${schedule[day].summary}</p>
    `;
    container.innerHTML = '';
    container.appendChild(summaryDiv);

    schedule[day].items.forEach((key, idx) => {
        const item = getPlace(key);
        if (!item) return;

        let iconClass = 'fa-map-marker-alt';
        let typeColor = 'text-gray-400';
        let bgColor = 'bg-gray-50';

        if (item.type === 'food') { iconClass = 'fa-utensils'; typeColor = 'text-orange-500'; bgColor = 'bg-orange-50'; }
        if (item.type === 'hotel') { iconClass = 'fa-bed'; typeColor = 'text-blue-500'; bgColor = 'bg-blue-50'; }
        if (item.type === 'transport') { iconClass = 'fa-plane'; typeColor = 'text-purple-500'; bgColor = 'bg-purple-50'; }
        if (item.type === 'tour') { iconClass = 'fa-camera'; typeColor = 'text-green-500'; bgColor = 'bg-green-50'; }

        const div = document.createElement('div');
        div.id = `place-item-${idx}`;
        div.className = "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-cyan-300 mb-3";
        div.innerHTML = `
            <div class="click-trigger p-3 cursor-pointer flex items-center justify-between hover:bg-gray-50 transition" onclick="toggleDetail(${idx}, ${item.lat}, ${item.lng})">
                <div class="flex items-center gap-2 overflow-hidden flex-1">
                    <span class="flex-none w-8 h-8 rounded-full ${bgColor} ${typeColor} flex items-center justify-center font-bold text-sm border border-current">${idx + 1}</span>
                    <div class="flex flex-col min-w-0 flex-1">
                        <h4 class="font-bold text-gray-800 text-sm break-words line-clamp-2">${item.name}</h4>
                        <div class="flex items-center gap-1.5 mt-0.5">
                            <i class="fas ${iconClass} ${typeColor} text-xs"></i>
                            <span class="text-xs text-gray-500 truncate">${item.desc}</span>
                        </div>
                    </div>
                </div>
                <div class="flex-none ml-2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-100">
                     <i id="chevron-${idx}" class="fas fa-chevron-down ${typeColor} text-xs transition-transform duration-300"></i>
                </div>
            </div>
            <div id="detail-${idx}" class="hidden border-t-2 border-gray-100 bg-gradient-to-b from-gray-50 to-white">
                ${generateDetailHTML(item, idx)}
            </div>
        `;
        container.appendChild(div);
    });
}

function generateDetailHTML(item, idx) {
    // (fukuoka.js와 동일한 로직)
    const photosHTML = item.photos ? `<div class="grid grid-cols-2 gap-2 p-4">${item.photos.slice(0, 2).map(url => `<div class="aspect-video rounded-xl overflow-hidden shadow-md"><img src="${url}" class="w-full h-full object-cover"></div>`).join('')}</div>` : '';

    return `
        ${photosHTML}
        <div class="px-4 mb-4">
            <p class="text-sm text-gray-700">${item.tips || ''}</p>
        </div>
        <div class="px-4 pb-6">
             <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name)}" target="_blank" class="block w-full bg-gray-800 text-white text-center py-3 rounded-xl font-bold">구글맵 보기</a>
        </div>
    `;
}

// ==================== 인터랙션 & 유틸리티 ====================
function toggleDetail(idx, lat, lng) {
    const detailPanel = document.getElementById(`detail-${idx}`);
    const chevron = document.getElementById(`chevron-${idx}`);
    if (detailPanel.classList.contains('hidden')) {
        detailPanel.classList.remove('hidden');
        chevron.classList.add('rotate-180');
        if (map) { map.panTo({ lat, lng }); map.setZoom(15); }
    } else {
        detailPanel.classList.add('hidden');
        chevron.classList.remove('rotate-180');
    }
}

function getPlace(key) {
    const override = localStorage.getItem(`sapporo_place_${key}`);
    return override ? { ...placesDB[key], ...JSON.parse(override) } : placesDB[key];
}

// ==================== 사용자 입력 (호텔/항공) ====================
let hotelAutocomplete;
function initHotelSearch() {
    const input = document.getElementById('hotel-search-input');
    if (!input || typeof google === 'undefined') return;
    hotelAutocomplete = new google.maps.places.Autocomplete(input, { types: ['lodging'] });
    hotelAutocomplete.addListener('place_changed', () => {
        const place = hotelAutocomplete.getPlace();
        if (!place.geometry) return alert("장소 정보 없음");
        updateAccommodation(place);
    });
}

function toggleHotelSearch() {
    const input = document.getElementById('hotel-search-input');
    const btn = document.getElementById('hotel-edit-btn');
    if (input.classList.contains('hidden')) {
        input.classList.remove('hidden');
        input.focus();
        btn.innerHTML = '취소';
        initHotelSearch();
    } else {
        input.classList.add('hidden');
        btn.innerHTML = '숙소 변경';
    }
}

function updateAccommodation(place) {
    const data = { name: place.name, lat: place.geometry.location.lat(), lng: place.geometry.location.lng(), desc: place.formatted_address };
    localStorage.setItem('sapporo_place_hotel_checkin', JSON.stringify(data));
    loadAccommodation();
    toggleHotelSearch();
    if (activeDay == 1) { renderSchedule(activeDay); updateMarkers(activeDay); }
}

function loadAccommodation() {
    const item = getPlace('hotel_checkin');
    const display = document.getElementById('hotel-info-display');
    if (display && item) display.innerHTML = `<span class="font-bold">${item.name}</span><br><span class="text-xs">${item.desc}</span>`;
}

let flightInfo = { departure: '', arrival: '', number: '' };
function loadFlightInfo() {
    const saved = localStorage.getItem('sapporo_flight_info');
    if (saved) { flightInfo = JSON.parse(saved); updateFlightInfoUI(); }
}

function updateFlightInfoUI() {
    const display = document.getElementById('flight-info-display');
    const btn = document.getElementById('flight-edit-btn');
    if (!display) return;
    if (flightInfo.departure) {
        display.innerHTML = `🛫 ${flightInfo.departure} <br> 🛬 ${flightInfo.arrival}`;
        display.classList.remove('hidden');
        btn.innerHTML = '정보 수정';
    } else {
        display.classList.add('hidden');
        btn.innerHTML = '항공권 정보 입력';
    }
}

function editFlightInfo() {
    const dep = prompt("가는편 (예: 11/25 09:00)", flightInfo.departure);
    if (!dep) return;
    const arr = prompt("오는편 (예: 11/28 18:00)", flightInfo.arrival);
    const num = prompt("편명", flightInfo.number);
    flightInfo = { departure: dep, arrival: arr, number: num };
    localStorage.setItem('sapporo_flight_info', JSON.stringify(flightInfo));
    updateFlightInfoUI();
}

// ==================== 전역 노출 ====================
window.initSapporoTrip = initSapporoTrip;
window.changeSapporoDay = changeSapporoDay;
window.toggleDetail = toggleDetail;
window.editFlightInfo = editFlightInfo;
window.toggleHotelSearch = toggleHotelSearch;

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initSapporoTrip === 'function') initSapporoTrip();
});
