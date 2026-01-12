/**
 * leaflet_map.js - 제로 코스트 지도 시스템
 * Leaflet + OpenFreeMap 기반 완전 무료 지도 구현
 * 
 * 기능:
 * - OpenFreeMap 타일 레이어 (무료)
 * - POI 마커 표시
 * - 여행 동선 Polyline
 * - Day별 코스 전환
 * - Haversine 거리 계산
 */

const LeafletMap = {
    map: null,
    markers: [],
    polylines: [],
    currentDay: 1,
    poiData: [],

    // ========== 초기화 ==========
    init(containerId, options = {}) {
        const defaultCenter = options.center || [33.5902, 130.4017]; // 후쿠오카 기본
        const defaultZoom = options.zoom || 12;

        // Leaflet 지도 초기화
        this.map = L.map(containerId, {
            zoomControl: false, // 커스텀 위치로 이동
            attributionControl: true
        }).setView(defaultCenter, defaultZoom);

        // 줌 컨트롤 우측 하단 배치
        L.control.zoom({ position: 'bottomright' }).addTo(this.map);

        // ★ OpenStreetMap 표준 타일 (100% 무료, 안정적) ★
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(this.map);

        console.log('[LeafletMap] Initialized with OpenStreetMap tiles');
        window.LeafletMap = this; // Expose instance globally
        return this;
    },

    // ========== POI 데이터 로드 ==========
    loadPOI(poiArray) {
        this.poiData = poiArray;
        console.log(`[LeafletMap] Loaded ${poiArray.length} POIs`);
    },

    // ========== 마커 표시 (개선) ==========
    showMarkers(filterFn = null, orderedItinerary = null) {
        this.clearMarkers();

        let filtered = [];
        if (orderedItinerary) {
            // 순서가 있는 일정이 들어오면 해당 순서대로 마커 생성
            filtered = orderedItinerary.map(item => {
                const dbPoi = this.poiData.find(p => p.id === item.id);
                return dbPoi ? dbPoi : item;
            });
        } else {
            filtered = filterFn ? this.poiData.filter(filterFn) : this.poiData;
        }

        filtered.forEach((poi, index) => {
            const marker = L.marker([poi.lat, poi.lng], {
                icon: this.createCustomIcon(poi.type || 'default', index + 1)
            }).addTo(this.map);

            // 팝업 설정
            marker.bindPopup(this.createPopupContent(poi));

            // 클릭 시 상세 정보 모달 표시 (TravelModule 연동)
            marker.on('click', () => {
                if (window.fukuokaGuide) {
                    window.fukuokaGuide.showDetail(poi.id);
                }
            });

            this.markers.push(marker);
        });

        // 모든 마커가 보이도록 줌 조정 (orderedItinerary가 없을 때만 자동 조정)
        if (this.markers.length > 0 && !orderedItinerary) {
            const group = L.featureGroup(this.markers);
            this.map.fitBounds(group.getBounds().pad(0.1));
        }
    },

    // ========== 커스텀 아이콘 생성 ==========
    createCustomIcon(category, number) {
        const colors = {
            'food': '#f97316',      // 음식점: 주황
            'shopping': '#ec4899',  // 쇼핑: 핑크
            'attraction': '#3b82f6',// 관광지: 파랑
            'spot': '#0ea5e9',      // 일반 스팟: 하늘색
            'transport': '#10b981', // 교통: 초록
            'hotel': '#6366f1',     // 숙소: 인디고
            'default': '#ef4444'    // 기본: 빨강
        };

        const color = colors[category] || colors.default;

        return L.divIcon({
            className: 'custom-marker',
            html: `
                <div style="
                    background: ${color};
                    width: 32px;
                    height: 32px;
                    border-radius: 50% 50% 50% 0;
                    transform: rotate(-45deg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 3px solid white;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                ">
                    <span style="
                        transform: rotate(45deg);
                        color: white;
                        font-weight: bold;
                        font-size: 12px;
                    ">${number}</span>
                </div>
            `,
            iconSize: [32, 40],
            iconAnchor: [16, 40],
            popupAnchor: [0, -40]
        });
    },

    // ========== 팝업 콘텐츠 생성 ==========
    createPopupContent(poi) {
        return `
            <div style="min-width: 180px; font-family: 'Noto Sans KR', sans-serif;">
                <h3 style="font-weight: bold; margin: 0 0 4px 0; font-size: 14px;">${poi.name}</h3>
                ${poi.name_jp ? `<p style="color: #666; font-size: 11px; margin: 0 0 8px 0;">${poi.name_jp}</p>` : ''}
                ${poi.description ? `<p style="font-size: 12px; color: #333; margin: 0 0 8px 0;">${poi.description}</p>` : ''}
                <button onclick="LeafletMap.launchNavigation(${poi.lat}, ${poi.lng}, '${encodeURIComponent(poi.name)}')"
                    style="
                        width: 100%;
                        padding: 8px;
                        background: linear-gradient(135deg, #3b82f6, #2563eb);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-weight: bold;
                        font-size: 12px;
                        cursor: pointer;
                    ">
                    🧭 내비게이션 시작
                </button>
            </div>
        `;
    },

    // ========== Day별 경로 표시 ==========
    async showDayRoute(day, itinerary) {
        this.currentDay = day;
        this.clearPolylines();

        if (!itinerary || itinerary.length < 2) {
            this.showMarkers(null, itinerary);
            return;
        }

        const coords = itinerary.map(poi => [poi.lat, poi.lng]);

        // "길따라 선" (Road-following) 구현 (OSRM API 사용)
        try {
            const roadCoords = await this.fetchRouteForRoads(itinerary);
            if (roadCoords && roadCoords.length > 0) {
                this.drawStyledPolyline(roadCoords);
            } else {
                this.drawStyledPolyline(coords); // 폴백: 직선
            }
        } catch (e) {
            console.error('[LeafletMap] Routing failed:', e);
            this.drawStyledPolyline(coords);
        }

        // 마커 업데이트 (순서 번호 포함)
        this.showMarkers(null, itinerary);
    },

    async fetchRouteForRoads(itinerary) {
        const coordsString = itinerary.map(p => `${p.lng},${p.lat}`).join(';');
        const url = `https://router.project-osrm.org/route/v1/driving/${coordsString}?overview=full&geometries=geojson`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.code === 'Ok' && data.routes.length > 0) {
                return data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
            }
        } catch (e) {
            return null;
        }
        return null;
    },

    drawStyledPolyline(coords) {
        // 메인 경로 (Glow effect)
        const polylineGlow = L.polyline(coords, {
            color: '#6366f1',
            weight: 8,
            opacity: 0.2,
            lineJoin: 'round'
        }).addTo(this.map);

        // 실제 경로 선 (점선 효과)
        const polyline = L.polyline(coords, {
            color: '#818cf8',
            weight: 4,
            opacity: 0.9,
            dashArray: '1, 10',
            lineJoin: 'round'
        }).addTo(this.map);

        this.polylines.push(polylineGlow, polyline);
        this.map.fitBounds(polyline.getBounds().pad(0.2));

        let offset = 0;
        const animate = () => {
            if (this.polylines.includes(polyline)) {
                offset -= 0.5;
                polyline.setStyle({ dashOffset: offset });
                requestAnimationFrame(animate);
            }
        };
        animate();
    },

    // ========== 거리 계산 (Haversine) ==========
    haversineDistance(lat1, lng1, lat2, lng2) {
        const R = 6371; // 지구 반경 (km)
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLng = (lng2 - lng1) * Math.PI / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    },

    calculateTotalDistance(itinerary) {
        let total = 0;
        for (let i = 0; i < itinerary.length - 1; i++) {
            total += this.haversineDistance(
                itinerary[i].lat, itinerary[i].lng,
                itinerary[i + 1].lat, itinerary[i + 1].lng
            );
        }
        return total;
    },

    // ========== 내비게이션 앱 연동 (URL 스킴) ==========
    launchNavigation(lat, lng, name) {
        const decodedName = decodeURIComponent(name);

        // 플랫폼 감지
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);

        // 네이버 지도 우선 (한국 사용자 기준)
        const naverUrl = `nmap://route/public?dlat=${lat}&dlng=${lng}&dname=${encodeURIComponent(decodedName)}&appname=com.japbong`;

        // 카카오맵
        const kakaoUrl = `kakaomap://route?ep=${lat},${lng}&by=PUBLICTRANSIT`;

        // 구글맵 (글로벌 폴백)
        const googleUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=transit`;

        // 앱 선택 모달 표시
        this.showAppSelectModal(decodedName, naverUrl, kakaoUrl, googleUrl);
    },

    showAppSelectModal(placeName, naverUrl, kakaoUrl, googleUrl) {
        // 기존 모달 제거
        const existing = document.getElementById('nav-select-modal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'nav-select-modal';
        modal.className = 'fixed inset-0 z-[500] bg-black/70 backdrop-blur-sm flex items-end justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-t-3xl w-full max-w-md pb-8 animate-slide-up">
                <div class="p-4 border-b text-center">
                    <h3 class="font-bold text-gray-800">${placeName}</h3>
                    <p class="text-sm text-gray-500">어떤 앱으로 길안내를 받으시겠어요?</p>
                </div>
                <div class="p-4 space-y-3">
                    <a href="${naverUrl}" class="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition">
                        <div class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <span class="text-white font-bold text-lg">N</span>
                        </div>
                        <div>
                            <p class="font-bold text-green-700">네이버 지도</p>
                            <p class="text-xs text-gray-500">국내 대중교통 최적화</p>
                        </div>
                    </a>
                    <a href="${kakaoUrl}" class="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl hover:bg-yellow-100 transition">
                        <div class="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                            <span class="text-black font-bold text-lg">K</span>
                        </div>
                        <div>
                            <p class="font-bold text-yellow-700">카카오맵</p>
                            <p class="text-xs text-gray-500">카카오T 연동</p>
                        </div>
                    </a>
                    <a href="${googleUrl}" target="_blank" class="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition">
                        <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <span class="text-white font-bold text-lg">G</span>
                        </div>
                        <div>
                            <p class="font-bold text-blue-700">Google Maps</p>
                            <p class="text-xs text-gray-500">해외 여행 최적화</p>
                        </div>
                    </a>
                </div>
                <button onclick="this.closest('#nav-select-modal').remove()" 
                    class="w-full py-3 text-gray-500 font-bold hover:text-gray-700 transition">
                    취소
                </button>
            </div>
        `;
        document.body.appendChild(modal);

        // 배경 클릭 시 닫기
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    },

    showNavOptions(poi) {
        // 팝업에서 버튼 클릭으로 처리하므로 별도 구현 불필요
    },

    // ========== 클리어 함수 ==========
    clearMarkers() {
        this.markers.forEach(m => m.remove());
        this.markers = [];
    },

    clearPolylines() {
        this.polylines.forEach(p => p.remove());
        this.polylines = [];
    },

    clearAll() {
        this.clearMarkers();
        this.clearPolylines();
    },

    // ========== GPX 내보내기 ==========
    exportGPX(itinerary, fileName = 'travel_route') {
        let gpx = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="JAP-BONG Travel App">
    <trk>
        <name>${fileName}</name>
        <trkseg>
`;
        itinerary.forEach(poi => {
            gpx += `            <trkpt lat="${poi.lat}" lon="${poi.lng}"><name>${poi.name}</name></trkpt>\n`;
        });
        gpx += `        </trkseg>
    </trk>
</gpx>`;

        const blob = new Blob([gpx], { type: 'application/gpx+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.gpx`;
        a.click();
        URL.revokeObjectURL(url);
    }
};

// 전역 노출
window.LeafletMap = LeafletMap;

console.log('leaflet_map.js loaded - Zero-Cost Map System Ready');
