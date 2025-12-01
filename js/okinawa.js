
// ==================== 데이터베이스 ====================
const placesDB = {
    // ================= [ 1일차: 오키나와 도착 & 국제거리 ] =================
    'airport_in': {
        name: '나하 공항 (도착)',
        lat: 26.2048, lng: 127.6458,
        type: 'transport',
        rating: 4.3,
        desc: '동양의 하와이, 오키나와 도착! 🌺',
        openHours: '24시간',
        tips: '💡 꿀팁: 공항에서 유이레일(모노레일) 타고 시내로 이동. 렌트카는 공항 픽업보다 셔틀 타고 지점으로 이동해서 받는 게 일반적.',
        info: [
            { label: '이동', val: '국제거리까지 유이레일 15분' },
            { label: '렌트카', val: '사전 예약 필수 (국제면허증 지참)' }
        ],
        links: [
            { name: '공항 정보', url: 'https://www.naha-airport.co.jp/ko/' }
        ],
        recommend: [
            { name: '포크 타마고 오니기리', type: '간식', desc: '공항점, 스팸 계란 주먹밥 맛집', icon: '🍙' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1542649761-0c805c00d6b5?w=600'
        ]
    },

    'hotel_checkin': {
        name: '하얏트 리젠시 나하 (숙소)',
        lat: 26.2144, lng: 127.6896,
        type: 'hotel',
        rating: 4.7,
        desc: '국제거리 도보 3분, 럭셔리 시티 호텔',
        openHours: '체크인 15:00 / 체크아웃 11:00',
        tips: '💡 꿀팁: 국제거리와 가까우면서도 조용함. 야외 수영장 있음. 조식이 맛있기로 유명.',
        info: [
            { label: '위치', val: '마키시역 도보 7분' },
            { label: '주차', val: '발렛 파킹 가능 (유료)' }
        ],
        links: [
            { name: '호텔 예약', url: 'https://www.hyatt.com/' }
        ],
        recommend: [
            { name: '돈키호테', type: '쇼핑', desc: '국제거리점, 24시간 영업', icon: '🐧' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1571896349842-6e5c48dc52e3?w=600'
        ]
    },

    'kokusai_dori': {
        name: '국제거리 (고쿠사이도리)',
        lat: 26.2150, lng: 127.6850,
        type: 'tour',
        rating: 4.4,
        desc: '오키나와 쇼핑과 미식의 중심지 🌴',
        openHours: '상점별 상이 (보통 22시까지)',
        tips: '💡 꿀팁: 일요일 낮에는 차량 통제해서 걷기 좋음. 포장마차 거리(야타이무라)에서 오리온 맥주 한잔 필수!',
        info: [
            { label: '쇼핑', val: '자색고구마 타르트, 시사(사자상) 기념품' }
        ],
        links: [
            { name: '거리 가이드', url: 'https://naha-kokusaidori.okinawa/kr/' }
        ],
        recommend: [
            { name: '블루씰 아이스크림', type: '디저트', desc: '소금우유맛(친스코) 추천', icon: '🍦' },
            { name: '칼비 플러스', type: '간식', desc: '갓 튀긴 자가리코 감자튀김', icon: '🍟' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1589463349208-94ae039535d4?w=600'
        ]
    },

    'dinner_steak': {
        name: '88 스테이크 (국제거리점)',
        lat: 26.2160, lng: 127.6880,
        type: 'food',
        rating: 4.3,
        desc: '미군 문화의 영향, 가성비 스테이크 🥩',
        openHours: '11:00~23:00',
        priceRange: '2,000~4,000엔',
        tips: '💡 꿀팁: 오키나와는 "마무리 스테이크" 문화가 있음. 텐더로인 스테이크가 부드럽고 맛있음. A1 소스 뿌려 드세요.',
        info: [
            { label: '샐러드바', val: '스프, 샐러드 무제한' }
        ],
        menus: [
            { name: '텐더로인 스테이크', price: '2,800엔', desc: '부드러운 안심 스테이크', photo: '🥩' }
        ],
        links: [
            { name: '공식 홈페이지', url: 'http://s88.co.jp/' }
        ],
        recommend: [
            { name: '샘스 스테이크', type: '식당', desc: '철판 쇼를 보여주는 또 다른 맛집', icon: '🔥' }
        ],
        reviews: [
            { user: '고기러버', text: '투박하지만 맛있는 미국 맛. 가성비 좋아요.', score: 4.5 }
        ],
        photos: [
            'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600'
        ]
    },

    // ================= [ 2일차: 북부 투어 (츄라우미) ] =================
    'churaumi': {
        name: '츄라우미 수족관',
        lat: 26.6943, lng: 127.8779,
        type: 'tour',
        rating: 4.9,
        desc: '세계 최대급 수조, 고래상어의 유영 🐋',
        openHours: '08:30~18:30',
        tips: '💡 꿀팁: 오후 4시 이후 입장하면 티켓 할인! 오키짱 극장(돌고래쇼)은 무료니까 시간 맞춰서 꼭 보세요.',
        info: [
            { label: '입장료', val: '성인 2,180엔' },
            { label: '돌고래쇼', val: '10:30 / 11:30 / 13:00 / 15:00 / 17:00' }
        ],
        links: [
            { name: '공식 홈페이지', url: 'https://churaumi.okinawa/kr/' }
        ],
        recommend: [
            { name: '에메랄드 비치', type: '해변', desc: '수족관 바로 옆 인공 해변', icon: '🏖️' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1582967788606-a171f1080ca8?w=600',
            'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600'
        ]
    },

    'kouri_island': {
        name: '코우리 대교 & 쉬림프 웨건',
        lat: 26.6960, lng: 128.0220,
        type: 'tour',
        rating: 4.7,
        desc: '에메랄드빛 바다 위를 달리는 드라이브 코스 🍤',
        openHours: '24시간',
        tips: '💡 꿀팁: 다리 건너자마자 있는 "쉬림프 웨건" 갈릭 새우 꼭 먹기. 하트 바위(하트락)도 포토존.',
        info: [
            { label: '주차', val: '무료 주차장 있음' }
        ],
        menus: [
            { name: '갈릭 쉬림프', price: '1,400엔', desc: '하와이안 스타일 새우 요리', photo: '🍤' }
        ],
        links: [
            { name: '관광 정보', url: 'https://kourijima.info/' }
        ],
        recommend: [
            { name: '코우리 오션 타워', type: '전망대', desc: '카트 타고 올라가는 전망대', icon: '🗼' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600'
        ]
    },

    // ================= [ 3일차: 중부 투어 (아메리칸 빌리지) ] =================
    'manzamo': {
        name: '만자모',
        lat: 26.5050, lng: 127.8510,
        type: 'tour',
        rating: 4.5,
        desc: '코끼리 모양 절벽, 만 명이 앉을 수 있는 들판 🐘',
        openHours: '08:00~19:00',
        tips: '💡 꿀팁: 바람이 많이 부니 모자 조심. 산책로는 20분이면 충분. 드라마 "괜찮아 사랑이야" 촬영지.',
        info: [
            { label: '입장료', val: '100엔' }
        ],
        links: [
            { name: '관광 정보', url: 'https://www.manzamo.jp/' }
        ],
        recommend: [
            { name: '나카무라 소바', type: '맛집', desc: '근처 오키나와 소바 맛집', icon: '🍜' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1590559899731-a3828395a22c?w=600'
        ]
    },

    'american_village': {
        name: '아메리칸 빌리지',
        lat: 26.3160, lng: 127.7570,
        type: 'tour',
        rating: 4.6,
        desc: '미국 서부 느낌 물씬! 쇼핑과 일몰 명소 🎡',
        openHours: '10:00~22:00',
        tips: '💡 꿀팁: 선셋 비치에서 일몰 보고 관람차 야경 즐기기. 포케제닉(포토존)이 많아서 사진 찍기 좋음.',
        info: [
            { label: '분위기', val: '이국적, 힙함, 야경 예쁨' }
        ],
        links: [
            { name: '공식 홈페이지', url: 'https://www.okinawa-americanvillage.com/' }
        ],
        recommend: [
            { name: '타코라이스', type: '음식', desc: '키지무나 타코라이스 추천', icon: '🌮' },
            { name: '블루씰', type: '디저트', desc: '여기 매장이 특히 예쁨', icon: '🍦' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1552423318-6f1e097072fa?w=600'
        ]
    },

    'dinner_sushi_hama': {
        name: '하마스시 (차탄점)',
        lat: 26.3130, lng: 127.7550,
        type: 'food',
        rating: 4.4,
        desc: '아메리칸 빌리지 근처 가성비 회전초밥 🍣',
        openHours: '11:00~23:00',
        priceRange: '1,500엔~',
        tips: '💡 꿀팁: 100엔 스시의 행복. 페퍼퍼(Pepper) 로봇이 안내해줌. 앱으로 미리 예약하면 대기 줄임.',
        info: [
            { label: '주문', val: '터치패널 (한국어 지원)' }
        ],
        menus: [
            { name: '연어 초밥', price: '110엔', desc: '가성비 최고', photo: '🍣' }
        ],
        links: [
            { name: '예약', url: 'https://www.hama-sushi.co.jp/' }
        ],
        recommend: [
            { name: '이온몰 라이카무', type: '쇼핑', desc: '차로 10분 거리 초대형 쇼핑몰', icon: '🛍️' }
        ],
        reviews: [
            { user: '초밥러', text: '싸고 맛있어요. 종류도 엄청 많음', score: 4.5 }
        ],
        photos: [
            'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600'
        ]
    },

    // ================= [ 4일차: 우미가지 테라스 & 귀국 ] =================
    'umikaji': {
        name: '우미가지 테라스',
        lat: 26.1760, lng: 127.6430,
        type: 'tour',
        rating: 4.7,
        desc: '오키나와의 산토리니! 공항 근처 하얀 테라스 🌊',
        openHours: '10:00~21:00',
        tips: '💡 꿀팁: 공항이랑 가까워서 마지막 날 코스로 딱. 비행기 이착륙하는 거 보면서 팬케이크 먹기.',
        info: [
            { label: '위치', val: '세나가섬 (공항 차로 15분)' }
        ],
        menus: [
            { name: '시아와세 팬케이크', price: '1,200엔', desc: '폭신폭신 수플레 팬케이크', photo: '🥞' }
        ],
        links: [
            { name: '공식 홈페이지', url: 'https://www.umikajiterrace.com/' }
        ],
        recommend: [
            { name: '류큐 온천', type: '온천', desc: '세나가섬 호텔 온천 (일일 입욕 가능)', icon: '♨️' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1621929239828-569429440665?w=600'
        ]
    },

    'airport_out': {
        name: '나하 공항 (귀국)',
        lat: 26.2048, lng: 127.6458,
        type: 'transport',
        rating: 4.3,
        desc: '다시 만나요 오키나와! 🌺',
        openHours: '24시간',
        tips: '💡 꿀팁: 국내선 터미널 상점이 훨씬 많고 큼. 자색고구마 타르트, 친스코(소금과자), 새우 센베이 구매.',
        info: [
            { label: '체크인', val: '2시간 전 도착' }
        ],
        links: [
            { name: '면세점', url: 'https://www.naha-airport.co.jp/ko/shops/' }
        ],
        recommend: [
            { name: '베니이모 타르트', type: '선물', desc: '자색고구마 타르트, 선물 1순위', icon: '🍠' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?w=600'
        ]
    }
};

// 일정표
const schedule = {
    1: {
        title: '1일차: 오키나와 도착 & 국제거리 🌴',
        items: ['airport_in', 'hotel_checkin', 'kokusai_dori', 'dinner_steak'],
        summary: '공항 도착 → 호텔 체크인 → 국제거리 쇼핑 → 스테이크 저녁'
    },
    2: {
        title: '2일차: 북부 투어 (츄라우미 & 코우리) 🐋',
        items: ['churaumi', 'kouri_island'],
        summary: '츄라우미 수족관 고래상어 → 코우리 대교 드라이브'
    },
    3: {
        title: '3일차: 중부 투어 (만자모 & 아메리칸 빌리지) 🎡',
        items: ['manzamo', 'american_village', 'dinner_sushi_hama'],
        summary: '만자모 절벽 → 아메리칸 빌리지 일몰 → 회전초밥'
    },
    4: {
        title: '4일차: 오키나와의 산토리니 & 귀국 🥞',
        items: ['umikaji', 'airport_out'],
        summary: '우미가지 테라스 브런치 → 공항 이동 → 귀국'
    }
};

let activeDay = 1;
let map, markers = [];
let directionsService, directionsRenderer;

// ==================== 초기화 ====================
function initOkinawaTrip() {
    try {
        console.log('🌺 오키나와 여행 가이드 시작!');
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
                    polylineOptions: { strokeColor: '#FF69B4', strokeWeight: 5 } // 오키나와는 핑크/트로피컬 테마
                });
            } catch (mapErr) {
                console.warn('Google Maps Init Failed:', mapErr);
            }
        } else {
            const mapEl = document.getElementById('map');
            if (mapEl) mapEl.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-100 text-gray-400">지도 로딩 중...</div>';
        }
    } catch (error) {
        console.error('Okinawa Module Init Error:', error);
    }
}

function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    map = new google.maps.Map(mapElement, {
        center: { lat: 26.4900, lng: 127.8500 }, // 오키나와 중부 중심
        zoom: 10,
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
        `<button onclick="changeOkinawaDay(${day})" 
                class="day-tab flex-shrink-0 px-3 py-2 rounded-lg border-2 text-xs font-bold transition-all duration-300 whitespace-nowrap ${day == activeDay
            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white border-pink-600 shadow-md scale-105'
            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
        }">
            ${day}일차
        </button>`
    ).join('');
}

function changeOkinawaDay(day) {
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
    summaryDiv.className = "bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 mb-6 border-l-4 border-pink-500";
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
        div.className = "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:border-pink-300 mb-3";
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
    const override = localStorage.getItem(`okinawa_place_${key}`);
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
    localStorage.setItem('okinawa_place_hotel_checkin', JSON.stringify(data));
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
    const saved = localStorage.getItem('okinawa_flight_info');
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
    localStorage.setItem('okinawa_flight_info', JSON.stringify(flightInfo));
    updateFlightInfoUI();
}

// ==================== 전역 노출 ====================
window.initOkinawaTrip = initOkinawaTrip;
window.changeOkinawaDay = changeOkinawaDay;
window.toggleDetail = toggleDetail;
window.editFlightInfo = editFlightInfo;
window.toggleHotelSearch = toggleHotelSearch;

document.addEventListener('DOMContentLoaded', () => {
    if (typeof initOkinawaTrip === 'function') initOkinawaTrip();
});
