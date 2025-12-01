
// ==================== 데이터베이스 ====================
const placesDB = {
    // ================= [ 1일차: 오사카 도착 & 도톤보리 먹방 ] =================
    'airport_in': {
        name: '간사이 공항 (도착)',
        lat: 34.4320, lng: 135.2304,
        type: 'transport',
        rating: 4.2,
        desc: '먹다가 망한다는 오사카 여행 시작! ✈️',
        openHours: '24시간',
        tips: '💡 꿀팁: 난카이 라피트 특급열차 타면 난바역까지 34분! 미리 예매하면 QR코드로 바로 탑승 가능.',
        info: [
            { label: '이동', val: '난바까지 라피트 34분 / 공항급행 45분' },
            { label: '주유패스', val: '공항 인포센터에서 수령 가능' }
        ],
        links: [
            { name: '라피트 예약', url: 'https://www.howto-osaka.com/kr/ticket/rapit/' }
        ],
        recommend: [
            { name: '로손 편의점', type: '간식', desc: '도착하자마자 모찌롤 하나!', icon: '🍰' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1542649761-0c805c00d6b5?w=600'
        ]
    },

    'hotel_checkin': {
        name: '호텔 일쿠오레 난바 (숙소)',
        lat: 34.6640, lng: 135.4995,
        type: 'hotel',
        rating: 4.4,
        desc: '난바역 바로 앞! 가성비와 위치 깡패',
        openHours: '체크인 15:00 / 체크아웃 11:00',
        tips: '💡 꿀팁: 난바역 5번 출구에서 2분 거리. 도톤보리까지 걸어서 10분이라 밤늦게까지 놀기 좋음.',
        info: [
            { label: '위치', val: '난바역 도보 2분' },
            { label: '어메니티', val: '로비에서 자유롭게 가져갈 수 있음' }
        ],
        links: [
            { name: '호텔 정보', url: 'https://www.ilcuore-namba.com/kr/' }
        ],
        recommend: [
            { name: '다카시마야', type: '쇼핑', desc: '난바역 백화점, 손수건 선물 사기 좋음', icon: '🎁' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600'
        ]
    },

    'dotonbori': {
        name: '도톤보리 & 글리코상',
        lat: 34.6687, lng: 135.5013,
        type: 'tour',
        rating: 4.8,
        desc: '오사카의 심장! 화려한 네온사인과 글리코상 🏃',
        openHours: '24시간',
        tips: '💡 꿀팁: 글리코상 앞 에비스 다리는 사람 터짐. 다리 아래 산책로에서 찍으면 사람 없이 찍을 수 있음. 돈키호테 관람차도 타보세요.',
        info: [
            { label: '리버크루즈', val: '주유패스 있으면 무료 탑승' }
        ],
        links: [
            { name: '도톤보리 정보', url: 'http://www.dotonbori.or.jp/ko/' }
        ],
        recommend: [
            { name: '돈키호테', type: '쇼핑', desc: '관람차가 있는 돈키호테 도톤보리점', icon: '🐧' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1590559899731-a3828395a22c?w=600',
            'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600'
        ]
    },

    'dinner_okonomi': {
        name: '치보 (오코노미야키)',
        lat: 34.6690, lng: 135.5015,
        type: 'food',
        rating: 4.5,
        desc: '도톤보리 1등 오코노미야키 맛집 🥞',
        openHours: '11:00~23:00',
        priceRange: '1,500~2,500엔',
        tips: '💡 꿀팁: 도톤보리야키(믹스)가 베스트. 쉐프가 철판에서 화려하게 구워주는 퍼포먼스 구경 꿀잼.',
        info: [
            { label: '대기', val: '저녁 시간 30분~1시간' }
        ],
        menus: [
            { name: '도톤보리야키', price: '1,750엔', desc: '돼지고기, 새우, 오징어 다 들어간 믹스', photo: '🥞' },
            { name: '야키소바', price: '1,300엔', desc: '쫄깃한 면발과 짭짤한 소스', photo: '🍝' }
        ],
        links: [
            { name: '공식 홈페이지', url: 'https://www.chibo.com/' }
        ],
        recommend: [
            { name: '앗치치혼포', type: '간식', desc: '바로 옆 타코야키 맛집', icon: '🐙' }
        ],
        reviews: [
            { user: '오사카맛', text: '소스가 진하고 맛있어요. 맥주랑 찰떡궁합', score: 5 }
        ],
        photos: [
            'https://images.unsplash.com/photo-1582660416956-6a7593257b4c?w=600'
        ]
    },

    // ================= [ 2일차: 유니버셜 스튜디오 재팬 ] =================
    'usj': {
        name: '유니버셜 스튜디오 재팬 (USJ)',
        lat: 34.6654, lng: 135.4323,
        type: 'tour',
        rating: 4.9,
        desc: '해리포터와 닌텐도 월드가 있는 꿈의 나라 🌍',
        openHours: '09:00~20:00 (날짜별 상이)',
        tips: '💡 꿀팁: 닌텐도 월드는 확약권 필수! 오픈런 하거나 익스프레스 티켓 사야 함. 버터맥주는 호불호 갈림(논알콜).',
        info: [
            { label: '티켓', val: '미리 예매 필수 (가격 변동제)' },
            { label: '앱', val: 'USJ 공식 앱 설치 필수 (대기시간 확인)' }
        ],
        links: [
            { name: 'USJ 공식', url: 'https://www.usj.co.jp/web/ko/kr' }
        ],
        recommend: [
            { name: '마리오 카트', type: '어트랙션', desc: '닌텐도 월드 필수 코스', icon: '🏎️' },
            { name: '해리포터', type: '구역', desc: '호그와트 성 야경이 멋짐', icon: '🏰' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1624601573012-b34e5a4e04f9?w=600',
            'https://images.unsplash.com/photo-1524820197278-540916411e20?w=600'
        ]
    },

    'dinner_kushikatsu': {
        name: '쿠시카츠 다루마',
        lat: 34.6515, lng: 135.5065,
        type: 'food',
        rating: 4.4,
        desc: '소스 두 번 찍기 금지! 바삭한 꼬치 튀김 🍢',
        openHours: '11:00~22:30',
        priceRange: '2,000엔~',
        tips: '💡 꿀팁: "소스 두 번 찍기 금지"가 규칙(지금은 뿌려 먹는 곳도 많음). 양배추는 무료고 소화 잘 됨. 세트 메뉴 추천.',
        info: [
            { label: '위치', val: '신세카이 본점 추천' }
        ],
        menus: [
            { name: '신세카이 세트', price: '1,800엔', desc: '인기 꼬치 모듬', photo: '🍤' }
        ],
        links: [
            { name: '공식 홈페이지', url: 'https://www.kushikatu-daruma.com/' }
        ],
        recommend: [
            { name: '츠텐카쿠', type: '전망', desc: '신세카이의 상징 타워', icon: '🗼' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1615361200141-f45040f367be?w=600'
        ]
    },

    // ================= [ 3일차: 오사카 주유패스 뽕뽑기 ] =================
    'osaka_castle': {
        name: '오사카성 천수각',
        lat: 34.6873, lng: 135.5262,
        type: 'tour',
        rating: 4.6,
        desc: '오사카의 랜드마크, 웅장한 성과 공원 🏯',
        openHours: '09:00~17:00',
        tips: '💡 꿀팁: 천수각 올라가는 엘리베이터 줄이 길면 계단 이용 추천. 고자부네 놀잇배(주유패스 무료) 타면 성벽 구경하기 좋음.',
        info: [
            { label: '입장료', val: '600엔 (주유패스 무료)' }
        ],
        links: [
            { name: '오사카성 정보', url: 'https://www.osakacastle.net/' }
        ],
        recommend: [
            { name: '니시노마루 정원', type: '산책', desc: '벚꽃 명소, 성이 잘 보임', icon: '🌸' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1558862107-d49ef2a04d72?w=600',
            'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600'
        ]
    },

    'umeda_sky': {
        name: '우메다 스카이 빌딩',
        lat: 34.7053, lng: 135.4907,
        type: 'tour',
        rating: 4.7,
        desc: '공중정원 전망대, 360도 파노라마 야경 🌃',
        openHours: '09:30~22:30',
        tips: '💡 꿀팁: 해 질 녘에 가서 일몰과 야경 다 보세요. 바닥이 야광으로 빛나서 예쁨. 주유패스 무료 입장 시간 확인 필수(보통 16시까지).',
        info: [
            { label: '입장료', val: '1,500엔 (주유패스 무료/할인)' }
        ],
        links: [
            { name: '공식 홈페이지', url: 'https://www.skybldg.co.jp/' }
        ],
        recommend: [
            { name: '헵파이브 관람차', type: '액티비티', desc: '빨간 관람차, 우메다 랜드마크', icon: '🎡' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600'
        ]
    },

    'dinner_sushi': {
        name: '카메스시 총본점',
        lat: 34.7019, lng: 135.5005,
        type: 'food',
        rating: 4.6,
        desc: '우메다 가성비 스시, 두툼한 회가 일품 🍣',
        openHours: '11:30~22:30',
        priceRange: '2,000~4,000엔',
        tips: '💡 꿀팁: 한국어 메뉴판 있음. 도로(참치 뱃살)랑 우니(성게알)는 꼭 드세요. 현금 결제만 가능할 수 있으니 준비.',
        info: [
            { label: '위치', val: '우메다역 근처' }
        ],
        menus: [
            { name: '마구로(참치)', price: '400엔~', desc: '입에서 녹는 참치', photo: '🐟' }
        ],
        links: [
            { name: '구글맵', url: 'https://maps.app.goo.gl/kamesushi' }
        ],
        recommend: [
            { name: '한큐 백화점', type: '쇼핑', desc: '손수건, 디저트 쇼핑', icon: '🛍️' }
        ],
        reviews: [
            { user: '스시왕', text: '샤리(밥)는 적고 네타(회)는 커서 좋아요.', score: 5 }
        ],
        photos: [
            'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600'
        ]
    },

    // ================= [ 4일차: 쿠로몬 시장 & 귀국 ] =================
    'kuromon': {
        name: '쿠로몬 시장',
        lat: 34.6655, lng: 135.5065,
        type: 'food',
        rating: 4.3,
        desc: '오사카의 부엌, 해산물 길거리 음식 천국 🦀',
        openHours: '09:00~18:00',
        tips: '💡 꿀팁: 가리비 구이, 쭈꾸미 꼬치, 참치회 꼬치 추천. 가격은 좀 비싼 편이니 간식으로 즐기세요.',
        info: [
            { label: '위치', val: '닛폰바시역 근처' }
        ],
        menus: [
            { name: '가리비 버터구이', price: '800엔', desc: '즉석에서 구워주는 왕가리비', photo: '🐚' }
        ],
        links: [
            { name: '시장 정보', url: 'https://kuromon.com/kr/' }
        ],
        recommend: [
            { name: '덴덴타운', type: '쇼핑', desc: '오사카의 아키하바라, 피규어 거리', icon: '🤖' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1533050487297-09b450131914?w=600'
        ]
    },

    'airport_out': {
        name: '간사이 공항 (귀국)',
        lat: 34.4320, lng: 135.2304,
        type: 'transport',
        rating: 4.0,
        desc: '오사카 먹방 종료! 다음에 또 만나요 👋',
        openHours: '24시간',
        tips: '💡 꿀팁: 로이즈 초콜릿, 도쿄 바나나, 시로이 코이비토 다 있음. 남은 동전은 공항 가챠로 탕진!',
        info: [
            { label: '체크인', val: '2시간 전 도착 필수' }
        ],
        links: [
            { name: '면세점', url: 'https://www.kansai-airport.or.jp/kr/shops' }
        ],
        recommend: [
            { name: '551 호라이', type: '선물', desc: '냉동 만두 포장 가능', icon: '🥟' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600'
        ]
    }
};

// 일정표
const schedule = {
    1: {
        title: '1일차: 오사카 도착 & 도톤보리 🏃',
        items: ['airport_in', 'hotel_checkin', 'dotonbori', 'dinner_okonomi'],
        summary: '공항 도착 → 호텔 체크인 → 글리코상 인증샷 → 오코노미야키'
    },
    2: {
        title: '2일차: 유니버셜 스튜디오 재팬 🌍',
        items: ['usj', 'dinner_kushikatsu'],
        summary: '하루 종일 USJ (닌텐도/해리포터) → 신세카이 쿠시카츠'
    },
    3: {
        title: '3일차: 오사카 주유패스 투어 🏯',
        items: ['osaka_castle', 'umeda_sky', 'dinner_sushi'],
        summary: '오사카성 → 우메다 공중정원 → 스시 맛집'
    },
    4: {
        title: '4일차: 시장 투어 & 귀국 🦀',
        items: ['kuromon', 'airport_out'],
        summary: '쿠로몬 시장 먹방 → 공항 이동 → 귀국'
    }
};

let activeDay = 1;
let map, markers = [];
let directionsService, directionsRenderer;

// ==================== 초기화 ====================
function initOsakaTrip() {
    try {
        console.log('🐙 오사카 여행 가이드 시작!');
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
                    polylineOptions: { strokeColor: '#FF4500', strokeWeight: 5 } // 오사카는 주황색 테마
                });
            } catch (mapErr) {
                console.warn('Google Maps Init Failed:', mapErr);
            }
        } else {
            const mapEl = document.getElementById('map');
            if (mapEl) mapEl.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-100 text-gray-400">지도 로딩 중...</div>';
        }
    } catch (error) {
        console.error('Osaka Module Init Error:', error);
    }
}

function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    map = new google.maps.Map(mapElement, {
        center: { lat: 34.6697, lng: 135.5002 }, // 오사카 난바 중심
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
        `<button onclick="changeOsakaDay(${day})" 
                class="day-tab flex-shrink-0 px-3 py-2 rounded-lg border-2 text-xs font-bold transition-all duration-300 whitespace-nowrap ${day == activeDay
            ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white border-red-600 shadow-md scale-105'
            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
        }">
            ${day}일차
        </button>`
    ).join('');
}

function changeOsakaDay(day) {
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
    summaryDiv.className = "bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 mb-6 border-l-4 border-red-500";
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
        div.className = "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-red-300 mb-3";
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
    const override = localStorage.getItem(`osaka_place_${key}`);
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
    localStorage.setItem('osaka_place_hotel_checkin', JSON.stringify(data));
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
    const saved = localStorage.getItem('osaka_flight_info');
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
    localStorage.setItem('osaka_flight_info', JSON.stringify(flightInfo));
    updateFlightInfoUI();
}

// ==================== 전역 노출 ====================
window.initOsakaTrip = initOsakaTrip;
window.changeOsakaDay = changeOsakaDay;
window.toggleDetail = toggleDetail;
window.editFlightInfo = editFlightInfo;
window.toggleHotelSearch = toggleHotelSearch;

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initOsakaTrip === 'function') initOsakaTrip();
});
