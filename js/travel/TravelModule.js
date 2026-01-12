/**
 * TravelModule.js - 여행 가이드 공통 모듈
 * 
 * 모든 지역 여행 페이지(후쿠오카, 도쿄, 오사카 등)에서 공통으로 사용하는
 * UI 렌더링, 지도 관리, 데이터 처리 로직을 통합 관리합니다.
 * 
 * [UPDATE 2026-01-08]
 * - 이미지 경로를 로컬 우선으로 변경
 * - 모달 동작 수정
 * - POI 데이터 구조 호환성 개선
 */

class RegionalTravelGuide {
    constructor(config) {
        this.regionId = config.regionId;
        this.days = config.days || [];
        this.poiDatabase = config.poiDatabase || [];
        this.containerId = config.containerId || 'app-container';

        this.theme = config.theme || 'default'; // 'default', 'winter'
        this.layout = config.layout || 'list'; // 'list', 'flow'
        this.activeDay = 0; // 0-based index
        this.sliderStates = {}; // Tracking slider position for each POI
        this.map = null;
        this.markers = [];
        this.init();
    }

    async init() {
        console.log(`[TravelModule] Initializing ${this.regionId}... Theme: ${this.theme}, Layout: ${this.layout}`);

        if (this.theme === 'winter') {
            document.body.classList.add('theme-winter');
            this.startSnowEffect();
        }

        this.renderDayTabs();
        this.renderContent();

        // [Agent 1 Fix] Async Wait for Leaflet to prevent race condition
        try {
            await this.waitForLeaflet();
            this.initMap();
        } catch (e) {
            console.error('[TravelModule] Leaflet load timeout:', e);
        }

        // Global function mapping for legacy support
        window.switchDay = (dayIndex) => this.switchDay(dayIndex);
    }

    waitForLeaflet() {
        return new Promise((resolve, reject) => {
            if (typeof L !== 'undefined') return resolve();

            let retries = 0;
            const check = setInterval(() => {
                retries++;
                if (typeof L !== 'undefined') {
                    clearInterval(check);
                    resolve();
                } else if (retries > 50) { // 5 seconds max
                    clearInterval(check);
                    reject('Leaflet not loaded');
                }
            }, 100);
        });
    }

    startSnowEffect() {
        const snowflakeCount = 30;
        const container = document.body;
        for (let i = 0; i < snowflakeCount; i++) {
            const el = document.createElement('div');
            el.className = 'snowflake';
            el.innerHTML = '❄';
            el.style.left = Math.random() * 100 + 'vw';
            el.style.animationDuration = Math.random() * 3 + 2 + 's';
            el.style.animationDelay = Math.random() * 2 + 's';
            el.style.opacity = Math.random();
            el.style.fontSize = Math.random() * 1 + 0.5 + 'rem';
            container.appendChild(el);
        }
    }

    renderDayTabs() {
        const tabContainer = document.getElementById('day-tabs');
        if (!tabContainer) return;

        tabContainer.className = 'grid grid-cols-4 gap-2 w-full p-1 bg-slate-100/50 rounded-2xl border border-slate-200/50 backdrop-blur-md';

        tabContainer.innerHTML = this.days.map((day, index) => {
            const isActive = index === this.activeDay;
            let activeClass, inactiveClass;

            if (this.theme === 'dark' || true) { // Force premium dark/glass theme
                activeClass = 'bg-slate-900 text-white shadow-xl shadow-slate-200 scale-[1.03] z-10';
                inactiveClass = 'bg-transparent text-slate-400 hover:text-slate-600 hover:bg-white/50';
            }

            return `
                <button onclick="window.fukuokaGuide.switchDay(${index})" 
                    class="w-full py-2.5 rounded-xl text-[10px] font-black transition-all duration-300 transform active:scale-95 truncate ${isActive ? activeClass : inactiveClass}">
                    <span class="block opacity-50 text-[8px] mb-0.5 uppercase tracking-tighter">Day</span>
                    <span class="text-xs">${index + 1}</span>
                </button>
            `;
        }).join('');
    }

    switchDay(dayIndex) {
        if (this.activeDay === dayIndex && this.map) return; // Skip if same day already active

        console.log(`[TravelModule] Switching to Day ${dayIndex + 1}`);
        this.activeDay = dayIndex;
        this.renderDayTabs();
        this.renderContent();

        // Update map markers and routes
        if (typeof LeafletMap !== 'undefined' && LeafletMap.map) {
            this.map = LeafletMap.map; // Ensure sync
            // 탭 전환 등으로 인한 사이즈 깨짐 방지
            setTimeout(() => {
                LeafletMap.map.invalidateSize();
                this.updateMapRoute();
            }, 100);
        } else {
            console.log('[TravelModule] Map not initialized, attempting now...');
            this.initMap();
        }

        // Auto scroll to top when switching days
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    renderContent() {
        const contentContainer = document.getElementById('itinerary-content');
        if (!contentContainer) return;

        const dayData = this.days[this.activeDay];
        if (!dayData) {
            contentContainer.innerHTML = '<p class="text-center text-gray-500 py-8 col-span-2">일정 데이터를 불러올 수 없습니다.</p>';
            return;
        }

        const schedule = dayData.schedule || [];

        if (this.layout === 'grid') {
            this.renderGridContent(contentContainer, schedule);
        } else if (this.layout === 'flow') {
            this.renderFlowContent(contentContainer, schedule);
        } else {
            this.renderListContent(contentContainer, schedule);
        }

        // ★ 플로팅 이전/다음 Day 버튼 추가
        this.renderDayNavButtons();

        // Setup Intersection Observer for scroll tracking
        this.setupScrollObserver();
    }

    // ★ 이전/다음 Day 플로팅 네비게이션 버튼
    renderDayNavButtons() {
        const existingNav = document.getElementById('day-nav-floating');
        if (existingNav) existingNav.remove();

        const totalDays = this.days.length;
        const currentDay = this.activeDay;
        const hasPrev = currentDay > 0;
        const hasNext = currentDay < totalDays - 1;

        // Shrunken Navigation (user request: 상당히 줄임)
        const navHtml = `
            <div id="day-nav-floating" class="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40 flex gap-1.5 items-center bg-slate-900/40 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-xl">
                <button onclick="window.fukuokaGuide.switchDay(${currentDay - 1})" 
                    class="${hasPrev ? '' : 'opacity-10 pointer-events-none'} w-6 h-6 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all active:scale-90 border border-white/5">
                    <i class="fas fa-chevron-left text-[7px]"></i>
                </button>
                
                <div class="bg-white/90 text-slate-900 rounded-full px-3 py-0.5 font-black text-[7px] uppercase tracking-tighter flex items-center gap-1">
                    <span class="opacity-40 italic">D</span>
                    <span class="text-[8px] font-mono">${currentDay + 1}</span>
                </div>
 
                <button onclick="window.fukuokaGuide.switchDay(${currentDay + 1})" 
                    class="${hasNext ? '' : 'opacity-10 pointer-events-none'} w-6 h-6 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all active:scale-90 border border-white/5">
                    <i class="fas fa-chevron-right text-[7px]"></i>
                </button>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', navHtml);
    }

    setupScrollObserver() {
        if (this.scrollObserver) this.scrollObserver.disconnect();

        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const poiId = entry.target.dataset.poiId;
                    if (poiId) {
                        this.highlightStep(poiId, false); // false = don't scroll to it (user is already scrolling)
                    }
                }
            });
        }, {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // Activate when element is in the middle 20% of screen
            threshold: 0.1
        });

        document.querySelectorAll('.poi-card-item').forEach(el => this.scrollObserver.observe(el));
    }

    highlightStep(poiId, shouldScroll = true) {
        // Highlight logic separated from showDetail
        document.querySelectorAll('.dark-card').forEach(el => el.classList.remove('active-step'));

        const cardEl = document.getElementById(`card-${poiId}`);
        if (cardEl) {
            cardEl.classList.add('active-step');
            if (shouldScroll) {
                cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        // Update map marker highlight if supported
        // (Assuming LeafletMap has a method to highlight marker without full re-render or popup open)
    }

    renderGridContent(container, schedule) {
        if (schedule.length === 0) {
            container.innerHTML = '<p class="text-center text-slate-400 py-12 col-span-2 italic">No schedule planned for this day.</p>';
            return;
        }

        let html = `<div class="grid grid-cols-2 gap-3 pb-8">`;

        html += schedule.map((itemId, idx) => {
            const poi = this.poiDatabase.find(p => p.id === itemId);
            if (!poi) return '';
            const photos = poi.photos || [];
            const stepNum = (idx + 1).toString().padStart(2, '0');
            const color = poi.color || 'indigo';

            return `
                <div class="vocab-item bg-white p-2 rounded-[28px] shadow-xl shadow-slate-200/50 relative animate-fade-in-up group transition-all duration-500 hover:-translate-y-1 poi-card-item overflow-hidden cursor-pointer" 
                    data-poi-id="${poi.id}"
                    style="animation-delay: ${idx * 100}ms"
                    id="card-${poi.id}"
                    onclick="window.fukuokaGuide.showDetail('${poi.id}')">
                    
                    <!-- Premium Number Badge -->
                    <div class="absolute top-3 left-3 z-30 w-7 h-7 bg-slate-900/80 backdrop-blur-md text-white rounded-xl flex items-center justify-center font-black text-[10px] shadow-2xl border border-white/20 group-hover:scale-110 transition-transform">
                        ${stepNum}
                    </div>
                    
                    <div class="relative h-40 rounded-[22px] overflow-hidden mb-3">
                        <div class="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                        
                        <!-- Mini Photo Slider -->
                        <div class="h-full flex transition-transform duration-500 ease-out" id="slider-${poi.id}" style="width: ${Math.max(1, photos.length) * 100}%">
                            ${photos.length > 0 ? photos.map(photo => `
                                <div class="w-full h-full relative" style="width: ${100 / Math.max(1, photos.length)}%">
                                    <img src="${photo}" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='images/placeholder.jpg';">
                                </div>
                            `).join('') : `<div class="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300"><i class="fas fa-camera text-2xl"></i></div>`}
                        </div>

                        ${photos.length > 1 ? `
                            <!-- Tiny Slider Controls -->
                            <div class="absolute inset-y-0 inset-x-0 z-30 flex justify-between items-center px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onclick="event.stopPropagation(); window.fukuokaGuide.moveSlider('${poi.id}', -1)" class="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 border border-white/10 active:scale-90">
                                    <i class="fas fa-chevron-left text-[8px]"></i>
                                </button>
                                <button onclick="event.stopPropagation(); window.fukuokaGuide.moveSlider('${poi.id}', 1)" class="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/40 border border-white/10 active:scale-90">
                                    <i class="fas fa-chevron-right text-[8px]"></i>
                                </button>
                            </div>
                        ` : ''}

                        <div class="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-center">
                             <div class="flex items-center gap-1">
                                <span class="text-[8px] font-black py-0.5 px-2 bg-white/20 backdrop-blur-md text-white rounded-full uppercase tracking-tighter border border-white/20">${poi.type}</span>
                             </div>
                             <div class="flex items-center gap-0.5 bg-white/95 px-1.5 py-0.5 rounded-full shadow-lg scale-90">
                                 <i class="fas fa-star text-amber-500 text-[6px]"></i>
                                 <span class="text-[8px] font-black text-slate-800">${poi.rating || '4.8'}</span>
                             </div>
                        </div>
                    </div>

                    <div class="px-2 pb-2">
                        <h3 class="text-xs font-black text-slate-800 mb-0.5 leading-tight group-hover:text-red-600 transition-colors truncate">${poi.name}</h3>
                        <p class="text-[9px] text-slate-400 font-bold line-clamp-1 leading-relaxed">${poi.desc || 'Experience Fukuoka.'}</p>
                    </div>
                </div>
            `;
        }).join('');

        html += `</div>`;

        if (this.activeDay < this.days.length - 1) {
            html += `
                <div class="mt-4 px-2">
                    <button onclick="window.fukuokaGuide.switchDay(${this.activeDay + 1})" 
                        class="w-full py-4 bg-slate-900 text-white font-black rounded-[28px] shadow-2xl shadow-slate-300 hover:shadow-slate-400 transition-all active:scale-98 flex items-center justify-center gap-2 group">
                        <span class="text-sm italic">Next Adventure</span>
                        <div class="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                             <i class="fas fa-arrow-right text-[10px]"></i>
                        </div>
                    </button>
                </div>
            `;
        }

        container.innerHTML = html;
    }

    renderFlowContent(container, schedule) {
        if (schedule.length === 0) {
            container.innerHTML = '<p class="text-center text-gray-500 py-8">이 날의 일정이 없습니다.</p>';
            return;
        }

        let html = '<div class="horizontal-flow-container">';

        schedule.forEach((itemId, idx) => {
            const poi = this.poiDatabase.find(p => p.id === itemId);
            if (!poi) return;

            const photoUrl = (poi.photos && poi.photos.length > 0) ? poi.photos[0] : '';

            // Add connector if not first item
            if (idx > 0) {
                html += `
                    <div class="flow-connector">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                `;
            }

            html += `
                <div class="flow-card group" onclick="window.fukuokaGuide.showDetail('${poi.id}')">
                    <div class="h-40 relative overflow-hidden rounded-t-xl">
                        ${photoUrl
                    ? `<img src="${photoUrl}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.onerror=null;this.src='images/placeholder.jpg';">`
                    : `<div class="w-full h-full bg-blue-100 flex items-center justify-center"><i class="fas fa-image text-blue-300 text-3xl"></i></div>`
                }
                        <div class="absolute top-2 left-2 w-8 h-8 bg-cyan-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                            ${idx + 1}
                        </div>
                    </div>
                    <div class="p-4">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-md uppercase tracking-wide border border-blue-100">${poi.type}</span>
                        </div>
                        <h3 class="font-bold text-gray-800 text-lg mb-1 group-hover:text-cyan-600 transition-colors">${poi.name}</h3>
                        <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed">${poi.desc}</p>
                    </div>
                </div>
            `;
        });

        html += '</div>';
        container.innerHTML = html;
    }

    renderListContent(container, schedule) {
        // 기존 리스트 렌더링 로직 유지 (메소드로 분리)
        container.innerHTML = schedule.map((itemId, idx) => {
            const poi = this.poiDatabase.find(p => p.id === itemId);
            if (!poi) return '';
            const photoUrl = (poi.photos && poi.photos.length > 0) ? poi.photos[0] : '';
            return `
                <div class="bg-white rounded-xl shadow-sm p-4 mb-4 flex gap-4 cursor-pointer hover:shadow-md transition active:scale-[0.98]" 
                     onclick="window.fukuokaGuide.showDetail('${poi.id}')">
                    <div class="w-20 h-20 rounded-lg bg-gray-200 overflow-hidden shrink-0 relative">
                        ${photoUrl
                    ? `<img src="${photoUrl}" class="w-full h-full object-cover" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                               <div class="absolute inset-0 bg-gray-200 items-center justify-center hidden"><i class="fas fa-image text-gray-400"></i></div>`
                    : `<div class="w-full h-full flex items-center justify-center"><i class="fas fa-image text-gray-400"></i></div>`
                }
                        <div class="absolute top-0 left-0 w-6 h-6 bg-blue-600 text-white flex items-center justify-center text-xs font-bold rounded-br-lg">
                            ${idx + 1}
                        </div>
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-bold text-gray-800 truncate">${poi.name}</h3>
                        <p class="text-xs text-gray-500 mt-1">${poi.type.toUpperCase()}</p>
                        <p class="text-sm text-gray-600 mt-2 line-clamp-2">${poi.desc}</p>
                    </div>
                    <div class="flex items-center text-gray-300">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            `;
        }).join('');
    }

    initMap() {
        const mapEl = document.getElementById('map');
        if (!mapEl) return;

        if (typeof LeafletMap !== 'undefined') {
            // Check if already initialized to prevent L.map() error
            if (LeafletMap.map) {
                this.map = LeafletMap.map;
            } else {
                LeafletMap.init('map');
                this.map = LeafletMap.map;
            }
            LeafletMap.loadPOI(this.poiDatabase);
            this.updateMapRoute();
        }
    }

    updateMapRoute() {
        if (typeof LeafletMap === 'undefined') return;

        const dayData = this.days[this.activeDay];
        if (!dayData) return;

        const itinerary = dayData.schedule
            .map(id => this.poiDatabase.find(p => p.id === id))
            .filter(p => !!p);

        LeafletMap.showDayRoute(this.activeDay + 1, itinerary);
    }


    showDetail(poiId) {
        const poi = this.poiDatabase.find(p => p.id === poiId);
        if (!poi) return;

        // Highlight the card in the grid
        document.querySelectorAll('.dark-card').forEach(el => el.classList.remove('active-step'));
        const cardEl = document.getElementById(`card-${poiId}`);
        if (cardEl) {
            cardEl.classList.add('active-step');
            cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // 현재 일정상 위치 찾기 (다음 코스 네비게이션용)
        const currentSchedule = this.days[this.activeDay].schedule;
        const currentIndex = currentSchedule.indexOf(poiId);

        let nextPoiId = null;
        let isTransitionToNextDay = false;

        if (currentIndex >= 0 && currentIndex < currentSchedule.length - 1) {
            // Next item in current day
            nextPoiId = currentSchedule[currentIndex + 1];
        } else if (this.activeDay < this.days.length - 1) {
            // First item of next day
            const nextDaySchedule = this.days[this.activeDay + 1].schedule;
            if (nextDaySchedule && nextDaySchedule.length > 0) {
                nextPoiId = nextDaySchedule[0];
                isTransitionToNextDay = true;
            }
        }

        const nextPoi = nextPoiId ? this.poiDatabase.find(p => p.id === nextPoiId) : null;

        let modal = document.getElementById('app-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'app-modal';
            document.body.appendChild(modal);
        }

        const photos = poi.photos || [];
        const photoUrl = photos.length > 0 ? photos[0] : '';

        // Dark theme check
        const isDark = this.theme === 'dark';
        const modalBg = isDark ? 'bg-gray-900 border-gray-800' : 'bg-white';
        const modalTextColor = isDark ? 'text-white' : 'text-gray-900';
        const modalSubTextColor = isDark ? 'text-gray-400' : 'text-gray-600';
        const infoBg = isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-100';

        modal.className = 'fixed inset-0 z-[60] bg-slate-900/80 flex items-center justify-center p-4 backdrop-blur-xl overflow-hidden animate-fade-in';
        modal.innerHTML = `
            <div class="bg-white rounded-[48px] shadow-2xl max-w-[480px] w-full max-h-[90vh] overflow-hidden animate-fade-in-up flex flex-col border-4 border-white relative">
                
                <!-- Main Header Image -->
                <div class="relative shrink-0 h-64 overflow-hidden group/img">
                    ${photoUrl
                ? `<img id="main-modal-img" src="${photoUrl}" class="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110" onerror="this.onerror=null;this.src='images/placeholder.jpg';">`
                : `<div class="w-full h-full bg-slate-100 flex items-center justify-center text-slate-200"><i class="fas fa-map-marker-alt text-6xl"></i></div>`}
                    
                    <button onclick="document.getElementById('app-modal').classList.add('hidden')" 
                        class="absolute top-6 right-6 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full text-white flex items-center justify-center hover:bg-white/40 border border-white/30 transition-all active:scale-90 z-20">
                        <i class="fas fa-times text-xl"></i>
                    </button>

                    <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                    
                    <div class="absolute bottom-6 left-8 right-8 z-10">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-[0.2em] border border-white/20 shadow-lg">${poi.type}</span>
                            <div class="px-2 py-1 bg-amber-500 text-white text-[10px] font-black rounded-full flex items-center gap-1 shadow-lg">
                                <i class="fas fa-star text-[8px]"></i> ${poi.rating || '4.8'}
                            </div>
                        </div>
                        <h2 class="text-3xl font-black text-white leading-tight tracking-tighter drop-shadow-lg">${poi.name}</h2>
                    </div>
                </div>

                <!-- Content Area -->
                <div class="flex-1 overflow-y-auto p-8 pt-6 custom-scrollbar">
                    <div class="bg-slate-50/50 rounded-[32px] p-6 border border-slate-100 mb-8 relative">
                        <div class="absolute -top-3 -right-3 w-10 h-10 bg-white shadow-lg rounded-2xl flex items-center justify-center text-slate-300">
                             <i class="fas fa-quote-right text-xs"></i>
                        </div>
                        <p class="text-sm font-bold text-slate-600 leading-relaxed italic opacity-80">${poi.desc || 'Explore the unseen beauty and local culture at this destination.'}</p>
                    </div>

                    <div class="space-y-6">
                        ${poi.details ? Object.entries(poi.details).map(([key, value]) => `
                            <div class="flex items-start gap-5">
                                <div class="w-12 h-12 rounded-[22px] bg-slate-50 border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                                    <i class="fas ${key === 'hours' ? 'fa-clock text-blue-500' : key === 'tips' ? 'fa-magic text-red-500' : 'fa-info-circle text-slate-400'} text-lg"></i>
                                </div>
                                <div class="flex-1 pt-0.5">
                                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 font-mono">${key === 'hours' ? 'Opening Hours' : key === 'tips' ? 'Local Pro Tip' : key.replace(/g/g, ' ')}</p>
                                    <p class="text-slate-800 text-sm font-black leading-relaxed">${value}</p>
                                </div>
                            </div>
                        `).join('') : ''}
                    </div>

                    <!-- Enhanced Gallery -->
                    ${photos.length > 0 ? `
                    <div class="mt-10 mb-5">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4 text-center">Photo Explorer</p>
                        <div class="flex gap-4 overflow-x-auto pb-4 scrollbar-hide px-1">
                            ${photos.map((p, pIdx) => `
                                <div class="w-24 h-24 rounded-[28px] overflow-hidden shrink-0 border-2 border-slate-50 shadow-md active:scale-95 transition-all cursor-pointer group/thumb" 
                                     onclick="document.getElementById('main-modal-img').src='${p}'">
                                    <img src="${p}" class="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform">
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                </div>

                <!-- Footer Logic -->
                <div class="p-6 bg-slate-50/50 border-t border-slate-100">
                    ${nextPoi ? `
                    <button onclick="document.getElementById('app-modal').classList.add('hidden'); ${isTransitionToNextDay ? `window.fukuokaGuide.switchDay(${this.activeDay + 1});` : `window.fukuokaGuide.showDetail('${nextPoi.id}');`}" 
                        class="w-full h-16 bg-slate-900 hover:bg-black text-white font-black rounded-[32px] transition-all flex items-center justify-between px-8 active:scale-95 shadow-2xl shadow-slate-200 group">
                        <div class="text-left">
                            <p class="text-[9px] text-slate-400 uppercase tracking-widest mb-0.5 italic">Up Next</p>
                            <span class="text-sm truncate max-w-[200px] block">${isTransitionToNextDay ? 'Next Journey Awaits' : nextPoi.name}</span>
                        </div>
                        <div class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors">
                            <i class="fas fa-arrow-right text-xs"></i>
                        </div>
                    </button>
                    ` : `
                    <div class="w-full h-16 bg-white border border-slate-100 text-slate-400 font-black rounded-[32px] flex items-center justify-center gap-3 italic">
                        <i class="fas fa-flag-checkered text-slate-300"></i>
                         <span class="text-sm">Voyage Complete</span>
                    </div>
                    `}
                </div>
            </div>
        `;

        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        };
    }
    // Slider Move Logic
    moveSlider(poiId, direction) {
        const poi = this.poiDatabase.find(p => p.id === poiId);
        if (!poi || !poi.photos || poi.photos.length <= 1) return;

        if (!this.sliderStates[poiId]) this.sliderStates[poiId] = 0;

        let nextIndex = this.sliderStates[poiId] + direction;
        if (nextIndex < 0) nextIndex = poi.photos.length - 1;
        if (nextIndex >= poi.photos.length) nextIndex = 0;

        this.sliderStates[poiId] = nextIndex;

        const slider = document.getElementById(`slider-${poiId}`);
        if (slider) {
            const translateValue = -(nextIndex * (100 / poi.photos.length));
            slider.style.transform = `translateX(${translateValue}%)`;
        }
    }
}

window.RegionalTravelGuide = RegionalTravelGuide;
console.log('[TravelModule] Loaded.');
