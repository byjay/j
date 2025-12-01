
// ==================== 데이터베이스 ====================
const placesDB = {
    // ================= [ 1일차: 교토 도착 & 붉은 도리이 ] =================
    'airport_in': {
        name: '간사이 공항 (도착)',
        lat: 34.4320, lng: 135.2304,
        type: 'transport',
        rating: 4.2,
        desc: '교토 여행의 관문! 하루카 특급열차 탑승',
        openHours: '24시간',
        tips: '💡 꿀팁: 하루카 티켓은 한국에서 미리 사면 반값! 헬로키티 하루카 열차를 찾아보세요.',
        info: [
            { label: '이동', val: '하루카 특급열차로 교토역까지 75분' },
            { label: '패스', val: '이코카 & 하루카 패스 추천' }
        ],
        links: [
            { name: '하루카 시간표', url: 'https://www.westjr.co.jp/global/kr/timetable/' }
        ],
        recommend: [
            { name: '551 호라이', type: '간식', desc: '공항점, 오사카 명물 돼지고기 만두', icon: '🥟' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1542649761-0c805c00d6b5?w=600'
        ]
    },

    'hotel_checkin': {
        name: '호텔 그란비아 교토 (숙소)',
        lat: 34.9858, lng: 135.7588,
        type: 'hotel',
        rating: 4.6,
        desc: '교토역 직결! 최고의 위치와 럭셔리함',
        openHours: '체크인 15:00 / 체크아웃 12:00',
        tips: '💡 꿀팁: 교토역 안에 있어서 비 와도 우산 필요 없음. 버스 터미널이 바로 앞이라 관광지 이동 최적.',
        info: [
            { label: '위치', val: '교토역 건물 내' },
            { label: '조식', val: '일식/양식 뷔페 퀄리티 높음' }
        ],
        links: [
            { name: '호텔 예약', url: 'https://www.granviakyoto.com/kr/' }
        ],
        recommend: [
            { name: '교토 타워', type: '전망', desc: '호텔 바로 앞, 교토 랜드마크', icon: '🗼' },
            { name: '이세탄 백화점', type: '쇼핑', desc: '호텔과 연결됨', icon: '🛍️' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'
        ]
    },

    'fushimi_inari': {
        name: '후시미 이나리 신사',
        lat: 34.9671, lng: 135.7727,
        type: 'tour',
        rating: 4.8,
        desc: '천 개의 붉은 도리이 길, 영화 게이샤의 추억 촬영지 ⛩️',
        openHours: '24시간 개방',
        tips: '💡 꿀팁: 사람 없는 인생샷을 원한다면 아침 7시나 해 질 녘 추천. 정상까지는 1시간 걸리니 중간까지만 가도 충분.',
        info: [
            { label: '입장료', val: '무료' },
            { label: '소요시간', val: '약 1시간 30분' }
        ],
        links: [
            { name: '신사 정보', url: 'http://inari.jp/ko/' }
        ],
        recommend: [
            { name: '여우 가면', type: '기념품', desc: '상점가에서 파는 여우 가면', icon: '🦊' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600',
            'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600'
        ]
    },

    'dinner_kyoto': {
        name: '가츠규 (교토역점)',
        lat: 34.9865, lng: 135.7590,
        type: 'food',
        rating: 4.5,
        desc: '살치살 규카츠의 원조! 겉바속촉의 정석 🥩',
        openHours: '11:00~22:00',
        priceRange: '1,500~2,500엔',
        tips: '💡 꿀팁: 와사비 간장에 찍어 먹는 게 베스트. 수란(온센타마고) 추가해서 찍어 드세요.',
        info: [
            { label: '대기', val: '식사 시간 30분 이상' }
        ],
        menus: [
            { name: '살치살 규카츠 정식', price: '1,680엔', desc: '미디엄 레어로 튀겨낸 소고기', photo: '🥩' }
        ],
        links: [
            { name: '메뉴 보기', url: 'https://gyukatsu-kyotokatsugyu.com/' }
        ],
        recommend: [
            { name: '교토역 스카이웨이', type: '야경', desc: '무료 공중 통로 야경', icon: '🌃' }
        ],
        reviews: [
            { user: '고기러버', text: '입에서 살살 녹아요. 양배추 리필 가능!', score: 5 }
        ],
        photos: [
            'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600'
        ]
    },

    // ================= [ 2일차: 금빛 사찰과 대나무 숲 ] =================
    'kinkakuji': {
        name: '킨카쿠지 (금각사)',
        lat: 35.0394, lng: 135.7292,
        type: 'tour',
        rating: 4.6,
        desc: '화려함의 극치! 금박으로 덮인 사찰 ✨',
        openHours: '09:00~17:00',
        tips: '💡 꿀팁: 맑은 날 연못에 비친 금각사가 진짜 예쁨. 입장권이 부적처럼 생겨서 기념품으로 좋아요.',
        info: [
            { label: '입장료', val: '400엔' }
        ],
        links: [
            { name: '공식 정보', url: 'https://www.shokoku-ji.jp/kinkakuji/' }
        ],
        recommend: [
            { name: '금박 아이스크림', type: '간식', desc: '금박을 입힌 말차 소프트', icon: '🍦' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600',
            'https://images.unsplash.com/photo-1576487503401-173fea862428?w=600'
        ]
    },

    'arashiyama': {
        name: '아라시야마 대나무 숲 (치쿠린)',
        lat: 35.0094, lng: 135.6670,
        type: 'tour',
        rating: 4.7,
        desc: '바람 소리가 들리는 신비로운 대나무 터널 🎋',
        openHours: '24시간',
        tips: '💡 꿀팁: 도게츠교 건너면서 뒤돌아보면 안 된다는 전설이 있음. % 아라비카 커피(응커피) 라떼 한잔 들고 산책하세요.',
        info: [
            { label: '교통', val: '란덴 열차 타고 가는 것 추천' }
        ],
        menus: [
            { name: '% 아라비카 라떼', price: '550엔', desc: '인생 라떼 맛집', photo: '☕' }
        ],
        links: [
            { name: '관광 정보', url: 'https://www.kyoto-kankou.or.jp/' }
        ],
        recommend: [
            { name: '텐류지', type: '사찰', desc: '세계문화유산 정원', icon: '🏯' },
            { name: '사가노 토로코 열차', type: '액티비티', desc: '협곡을 달리는 관광 열차', icon: '🚂' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1505337147969-08de68547196?w=600',
            'https://images.unsplash.com/photo-1490761668535-35497054764d?w=600'
        ]
    },

    // ================= [ 3일차: 교토의 정수, 기요미즈데라 ] =================
    'kiyomizu': {
        name: '기요미즈데라 (청수사)',
        lat: 34.9949, lng: 135.7850,
        type: 'tour',
        rating: 4.8,
        desc: '절벽 위에 세워진 목조 사찰, 교토 1위 명소 🍁',
        openHours: '06:00~18:00',
        tips: '💡 꿀팁: 니넨자카, 산넨자카 돌계단 길로 올라가세요. 넘어지면 3년 안에 죽는다는 전설 조심! (액땜 호리병 팔아요)',
        info: [
            { label: '입장료', val: '400엔' },
            { label: '공사', val: '본당 지붕 공사 완료됨' }
        ],
        links: [
            { name: '공식 홈페이지', url: 'https://www.kiyomizudera.or.jp/' }
        ],
        recommend: [
            { name: '니넨자카 스타벅스', type: '카페', desc: '다다미방이 있는 전통 가옥 스타벅스', icon: '☕' },
            { name: '동구리 공화국', type: '쇼핑', desc: '지브리 샵', icon: '🌱' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1590559899731-a3828395a22c?w=600',
            'https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=600'
        ]
    },

    'gion': {
        name: '기온 거리',
        lat: 35.0037, lng: 135.7778,
        type: 'tour',
        rating: 4.5,
        desc: '게이샤를 만날 수 있는 전통 거리 👘',
        openHours: '24시간',
        tips: '💡 꿀팁: 운 좋으면 마이코(게이샤 연습생)를 볼 수 있음. 사진 촬영 금지 구역이 있으니 표지판 잘 보세요.',
        info: [
            { label: '분위기', val: '고즈넉함, 전통 가옥 보존 지구' }
        ],
        links: [
            { name: '기온 정보', url: 'https://www.gion.or.jp/' }
        ],
        recommend: [
            { name: '요지야 카페', type: '카페', desc: '기름종이로 유명한 요지야의 말차 카푸치노', icon: '🍵' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1528360983277-13d9b152c6d1?w=600'
        ]
    },

    'dinner_udon': {
        name: '오멘 (우동)',
        lat: 35.0264, lng: 135.7954,
        type: 'food',
        rating: 4.4,
        desc: '찍어 먹는 츠케우동 맛집, 면발이 예술 🍜',
        openHours: '11:00~21:00',
        priceRange: '1,200엔~',
        tips: '💡 꿀팁: 각종 채소와 깨를 국물에 넣어 면을 찍어 드세요. 덴푸라(튀김) 세트 추천.',
        info: [
            { label: '위치', val: '긴카쿠지(은각사) 근처 본점' }
        ],
        menus: [
            { name: '오멘 우동', price: '1,200엔', desc: '시그니처 츠케우동', photo: '🍜' }
        ],
        links: [
            { name: '공식 홈페이지', url: 'https://www.omen.co.jp/' }
        ],
        recommend: [
            { name: '철학의 길', type: '산책', desc: '식사 후 걷기 좋은 산책로', icon: '🚶' }
        ],
        reviews: [
            { user: '면식수행', text: '면이 쫄깃하고 채소가 신선해요. 건강한 맛!', score: 4.5 }
        ],
        photos: [
            'https://images.unsplash.com/photo-1618841557871-b9a1c1b8a8d4?w=600'
        ]
    },

    // ================= [ 4일차: 난젠지 & 귀국 ] =================
    'nanzenji': {
        name: '난젠지 & 수로각',
        lat: 35.0113, lng: 135.7938,
        type: 'tour',
        rating: 4.7,
        desc: '붉은 벽돌 수로각이 있는 고즈넉한 사찰 🧱',
        openHours: '08:40~17:00',
        tips: '💡 꿀팁: 수로각 아치 아래가 최고의 포토존! 블루보틀 교토점이 바로 근처에 있어요.',
        info: [
            { label: '입장료', val: '경내 무료 (방장 정원 유료)' }
        ],
        links: [
            { name: '공식 홈페이지', url: 'https://nanzenji.or.jp/' }
        ],
        recommend: [
            { name: '블루보틀 교토', type: '카페', desc: '한옥(마치야)을 개조한 힙한 카페', icon: '☕' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1590559899731-a3828395a22c?w=600'
        ]
    },

    'airport_out': {
        name: '간사이 공항 (귀국)',
        lat: 34.4320, lng: 135.2304,
        type: 'transport',
        rating: 4.0,
        desc: '교토의 추억을 안고 집으로 ✈️',
        openHours: '24시간',
        tips: '💡 꿀팁: 교토역에서 하루카 타고 공항으로 직행. 551 호라이 만두 냉동 포장 가능!',
        info: [
            { label: '체크인', val: '2시간 전 도착 필수' }
        ],
        links: [
            { name: '공항 정보', url: 'https://www.kansai-airport.or.jp/kr/' }
        ],
        recommend: [
            { name: '로이즈 감자칩', type: '선물', desc: '단짠단짠 최고봉', icon: '🥔' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600'
        ]
    }
};

// 일정표
const schedule = {
    1: {
        title: '1일차: 교토 도착 & 여우 신사 ⛩️',
        items: ['airport_in', 'hotel_checkin', 'fushimi_inari', 'dinner_kyoto'],
        summary: '공항 도착 → 호텔 체크인 → 후시미 이나리 → 규카츠 저녁'
    },
    2: {
        title: '2일차: 금빛 사찰과 대나무 숲 🎋',
        items: ['kinkakuji', 'arashiyama'],
        summary: '금각사 관람 → 아라시야마 치쿠린 산책 → 텐류지'
    },
    3: {
        title: '3일차: 천년 고도 산책 (청수사&기온) 👘',
        items: ['kiyomizu', 'gion', 'dinner_udon'],
        summary: '기요미즈데라 → 니넨자카/산넨자카 → 기온 거리 → 우동 맛집'
    },
    4: {
        title: '4일차: 힐링 & 귀국 ☕',
        items: ['nanzenji', 'airport_out'],
        summary: '난젠지 수로각 → 블루보틀 → 공항 이동 → 귀국'
    }
};

let activeDay = 1;
let map, markers = [];
let directionsService, directionsRenderer;

// ==================== 초기화 ====================
function initKyotoTrip() {
    try {
        console.log('⛩️ 교토 여행 가이드 시작!');
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
                    polylineOptions: { strokeColor: '#8B4513', strokeWeight: 5 } // 교토는 갈색 테마
                });
            } catch (mapErr) {
                console.warn('Google Maps Init Failed:', mapErr);
            }
        } else {
            const mapEl = document.getElementById('map');
            if (mapEl) mapEl.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-100 text-gray-400">지도 로딩 중...</div>';
        }
    } catch (error) {
        console.error('Kyoto Module Init Error:', error);
    }
}

function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    map = new google.maps.Map(mapElement, {
        center: { lat: 35.0116, lng: 135.7681 }, // 교토 중심
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
        `<button onclick="changeKyotoDay(${day})" 
                class="day-tab flex-shrink-0 px-3 py-2 rounded-lg border-2 text-xs font-bold transition-all duration-300 whitespace-nowrap ${day == activeDay
            ? 'bg-gradient-to-r from-orange-700 to-amber-600 text-white border-orange-800 shadow-md scale-105'
            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
        }">
            ${day}일차
        </button>`
    ).join('');
}

function changeKyotoDay(day) {
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
    summaryDiv.className = "bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 mb-6 border-l-4 border-orange-500";
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
        div.className = "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-orange-300 mb-3";
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
    const override = localStorage.getItem(`kyoto_place_${key}`);
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
    localStorage.setItem('kyoto_place_hotel_checkin', JSON.stringify(data));
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
    const saved = localStorage.getItem('kyoto_flight_info');
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
    localStorage.setItem('kyoto_flight_info', JSON.stringify(flightInfo));
    updateFlightInfoUI();
}

// ==================== 전역 노출 ====================
window.initKyotoTrip = initKyotoTrip;
window.changeKyotoDay = changeKyotoDay;
window.toggleDetail = toggleDetail;
window.editFlightInfo = editFlightInfo;
window.toggleHotelSearch = toggleHotelSearch;

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initKyotoTrip === 'function') initKyotoTrip();
});
