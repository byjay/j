/**
 * logging_service.js - 종합 로깅 서비스
 * IP 추적 및 모든 사용자 활동 기록
 * ★ 2026-01-08: IP 및 위치 추적 활성화 (아빠 요청)
 */

const LoggingService = {
    userIP: null,
    userLocation: null,
    logs: [],
    STORAGE_KEY: 'jap_bong_activity_logs',
    MAX_LOGS: 500, // 최근 500개만 유지

    async init() {
        console.log('[LoggingService] Initializing...');

        // ★ IP 및 위치 정보 가져오기 - 비동기로 백그라운드에서 실행 (블로킹 안함!)
        this.fetchIPInfo(); // await 제거 - 로딩 속도 개선

        // 기존 로그 로드
        this.loadLogs();

        console.log('[LoggingService] Initialized with', this.logs.length, 'existing logs');
        console.log('[LoggingService] IP will be fetched in background...');
    },

    /**
     * ★ IP 및 위치 정보 수집 (ipapi.co 무료 API 사용)
     */
    async fetchIPInfo() {
        try {
            // ipapi.co는 무료로 1000 requests/day 제공
            const response = await fetch('https://ipapi.co/json/', {
                timeout: 5000
            });

            if (response.ok) {
                const data = await response.json();
                this.userIP = data.ip || 'unknown';
                this.userLocation = {
                    city: data.city || 'unknown',
                    region: data.region || 'unknown',
                    country: data.country_name || 'unknown',
                    countryCode: data.country_code || 'unknown',
                    latitude: data.latitude || null,
                    longitude: data.longitude || null,
                    timezone: data.timezone || 'unknown',
                    org: data.org || 'unknown', // ISP/Organization
                    postal: data.postal || 'unknown'
                };
                console.log('[LoggingService] IP Info fetched successfully');
            } else {
                throw new Error('API response not OK');
            }
        } catch (e) {
            console.warn('[LoggingService] IP fetch failed, trying fallback:', e.message);

            // Fallback: ipify API (IP only)
            try {
                const fallback = await fetch('https://api.ipify.org?format=json');
                const data = await fallback.json();
                this.userIP = data.ip || 'unknown';
                this.userLocation = { city: 'unknown', country: 'unknown' };
            } catch (e2) {
                this.userIP = 'fetch_failed';
                this.userLocation = { city: 'unknown', country: 'unknown' };
            }
        }
    },

    loadLogs() {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                this.logs = JSON.parse(stored);
            }
        } catch (e) {
            console.error('[LoggingService] Failed to load logs:', e);
            this.logs = [];
        }
    },

    saveLogs() {
        try {
            // 최대 개수 제한
            if (this.logs.length > this.MAX_LOGS) {
                this.logs = this.logs.slice(-this.MAX_LOGS);
            }
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.logs));
        } catch (e) {
            console.error('[LoggingService] Failed to save logs:', e);
        }
    },

    /**
     * 활동 로그 기록
     * @param {string} action - 액션 타입 (login, tab_view, game_start, quiz_complete 등)
     * @param {object} details - 추가 상세 정보
     */
    log(action, details = {}) {
        const user = window.currentUser || { id: 'anonymous', name: '익명' };

        const logEntry = {
            id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString(),
            userId: user.id,
            userName: user.name || user.id,
            userAvatar: user.avatar || null,
            action: action,
            details: details,
            // ★ 추적 정보
            ip: this.userIP,
            location: this.userLocation,
            userAgent: navigator.userAgent,
            screenSize: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language,
            platform: navigator.platform,
            // [New] Contextual info
            referrer: document.referrer || 'direct',
            url: window.location.href,
            pageTitle: document.title
        };

        this.logs.push(logEntry);
        this.saveLogs();

        console.log('[LoggingService] Logged:', action, details);

        // Netlify Forms로도 전송 (선택적)
        this.submitToNetlify(logEntry);
    },

    /**
     * ★ 로그인 이벤트 전용 로깅 (더 많은 정보 수집)
     */
    logLogin(userId, userName, loginType = 'family') {
        this.log('login', {
            loginType: loginType, // 'family', 'guest'
            loginTime: new Date().toLocaleString('ko-KR'),
            device: this.getDeviceType()
        });
    },

    /**
     * 디바이스 타입 감지
     */
    getDeviceType() {
        const ua = navigator.userAgent;
        if (/tablet|ipad|playbook|silk/i.test(ua)) return 'Tablet';
        if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile/i.test(ua)) return 'Mobile';
        return 'Desktop';
    },

    submitToNetlify(logEntry) {
        // 숨겨진 폼을 통해 Netlify로 전송
        try {
            const form = document.querySelector('form[name="learning-logs"]');
            if (!form) return;

            form.querySelector('[name="user_id"]').value = logEntry.userId;
            form.querySelector('[name="action_type"]').value = logEntry.action;
            form.querySelector('[name="details"]').value = JSON.stringify({
                ...logEntry.details,
                ip: logEntry.ip,
                location: logEntry.location
            });
            form.querySelector('[name="timestamp"]').value = logEntry.timestamp;

            // 비동기 제출 (로컬 환경에서는 무시)
            if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
                console.log('[LoggingService] Skipped Netlify submit (Localhost)');
                return;
            }

            const formData = new FormData(form);
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            }).catch(e => console.warn('[LoggingService] Netlify submit failed (non-critical):', e));
        } catch (e) {
            console.warn('[LoggingService] Form submission error:', e);
        }
    },

    /**
     * 관리자용: 모든 로그 반환
     */
    getAllLogs() {
        return [...this.logs].reverse(); // 최신순
    },

    /**
     * 관리자용: 필터링된 로그 반환
     */
    getFilteredLogs(filters = {}) {
        let result = this.getAllLogs();

        if (filters.userId) {
            result = result.filter(log => log.userId === filters.userId);
        }
        if (filters.action) {
            result = result.filter(log => log.action === filters.action);
        }
        if (filters.date) {
            result = result.filter(log => log.timestamp.startsWith(filters.date));
        }

        return result;
    },

    /**
     * 관리자용: 로그 클리어
     */
    clearLogs() {
        this.logs = [];
        this.saveLogs();
        console.log('[LoggingService] All logs cleared');
    },

    /**
     * ★ 관리자용: 향상된 로그 대시보드 (IP/위치 표시)
     */
    showAdminLogDashboard() {
        const modal = document.createElement('div');
        modal.id = 'admin-log-modal';
        modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-[100]';

        let logHtml = this.getAllLogs().map(log => {
            const loc = log.location || {};
            const locationStr = loc.city && loc.country
                ? `${loc.city}, ${loc.country}`
                : 'Unknown';

            return `
            <div class="bg-white p-3 rounded-lg shadow mb-2 text-xs border-l-4 ${log.action === 'login' ? 'border-green-500' : 'border-blue-500'}">
                <div class="flex justify-between items-center">
                    <span class="font-bold text-gray-800">${log.userName || log.userId}</span>
                    <span class="px-2 py-0.5 rounded-full text-xs font-bold ${log.action === 'login' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}">${log.action}</span>
                </div>
                <div class="mt-1 flex flex-wrap gap-2 text-gray-500">
                    <span title="시간">🕐 ${log.timestamp.split('T')[1]?.split('.')[0] || log.timestamp}</span>
                    <span title="IP 주소">🌐 ${log.ip || 'N/A'}</span>
                    <span title="위치">📍 ${locationStr}</span>
                </div>
                <div class="mt-1 text-gray-400 text-[10px] truncate" title="${log.userAgent || ''}">
                    ${log.details.device || ''} ${log.details.loginType ? `(${log.details.loginType})` : ''}
                </div>
            </div>
        `}).join('');

        if (this.logs.length === 0) logHtml = '<div class="text-center p-4 text-gray-500">로그가 없습니다.</div>';

        modal.innerHTML = `
            <div class="bg-gray-100 w-full max-w-lg h-[85vh] rounded-xl flex flex-col shadow-2xl overflow-hidden">
                <div class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center shrink-0">
                    <div>
                        <h3 class="font-bold text-lg">📋 활동 로그 대시보드</h3>
                        <p class="text-xs text-white/80">${this.logs.length}건 기록 | IP/위치 추적 활성화</p>
                    </div>
                    <button onclick="document.getElementById('admin-log-modal').remove()" class="p-2 hover:bg-white/20 rounded-full">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>
                <!-- Filters -->
                <div class="bg-white p-2 flex gap-2 border-b overflow-x-auto shrink-0">
                    <button onclick="LoggingService.filterAdminLogs('all')" class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold whitespace-nowrap">전체</button>
                    <button onclick="LoggingService.filterAdminLogs('login')" class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold whitespace-nowrap">🔑 로그인</button>
                    <button onclick="LoggingService.filterAdminLogs('game')" class="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-bold whitespace-nowrap">🎮 게임</button>
                    <button onclick="LoggingService.filterAdminLogs('tab')" class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-bold whitespace-nowrap">📑 탭</button>
                </div>
                <!-- Current IP Info -->
                <div class="bg-indigo-50 p-2 text-xs border-b shrink-0">
                    <span class="font-bold text-indigo-700">현재 접속:</span>
                    <span class="text-gray-600">${this.userIP} | ${this.userLocation?.city || '?'}, ${this.userLocation?.country || '?'}</span>
                </div>
                <div id="admin-log-list" class="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
                    ${logHtml}
                </div>
                <div class="p-3 bg-white border-t shrink-0 flex justify-between">
                    <button onclick="if(confirm('전체 삭제하시겠습니까?')){LoggingService.clearLogs(); document.getElementById('admin-log-modal').remove();}" class="px-4 py-2 bg-red-100 text-red-600 rounded text-sm font-bold">🗑️ 전체 삭제</button>
                    <button onclick="LoggingService.exportLogs()" class="px-4 py-2 bg-green-100 text-green-600 rounded text-sm font-bold">📥 내보내기</button>
                    <button onclick="document.getElementById('admin-log-modal').remove()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm font-bold">닫기</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    },

    filterAdminLogs(type) {
        const listEl = document.getElementById('admin-log-list');
        if (!listEl) return;

        let filtered = this.getAllLogs();
        if (type !== 'all') {
            filtered = filtered.filter(l => l.action.includes(type));
        }

        listEl.innerHTML = filtered.map(log => {
            const loc = log.location || {};
            const locationStr = loc.city && loc.country
                ? `${loc.city}, ${loc.country}`
                : 'Unknown';

            return `
            <div class="bg-white p-3 rounded-lg shadow mb-2 text-xs border-l-4 ${log.action === 'login' ? 'border-green-500' : 'border-blue-500'}">
                <div class="flex justify-between items-center">
                    <span class="font-bold text-gray-800">${log.userName || log.userId}</span>
                    <span class="px-2 py-0.5 rounded-full text-xs font-bold ${log.action === 'login' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}">${log.action}</span>
                </div>
                <div class="mt-1 flex flex-wrap gap-2 text-gray-500">
                    <span>🕐 ${log.timestamp.split('T')[1]?.split('.')[0] || ''}</span>
                    <span>🌐 ${log.ip || 'N/A'}</span>
                    <span>📍 ${locationStr}</span>
                </div>
            </div>
        `}).join('');

        if (filtered.length === 0) listEl.innerHTML = '<div class="text-center p-4 text-gray-500">조건에 맞는 로그가 없습니다.</div>';
    },

    /**
     * ★ 로그 내보내기 (CSV)
     */
    exportLogs() {
        const headers = ['Timestamp', 'User', 'Action', 'IP', 'City', 'Country', 'Device', 'Details'];
        const rows = this.getAllLogs().map(log => {
            const loc = log.location || {};
            return [
                log.timestamp,
                log.userName || log.userId,
                log.action,
                log.ip || '',
                loc.city || '',
                loc.country || '',
                log.details?.device || '',
                JSON.stringify(log.details)
            ].map(v => `"${String(v).replace(/"/g, '""')}"`).join(',');
        });

        const csv = [headers.join(','), ...rows].join('\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `jap_bong_logs_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }
};

// 전역 노출
window.LoggingService = LoggingService;
// HTML에서 직접 호출할 수 있도록 window top-level에도 노출
window.showAdminLogDashboard = () => LoggingService.showAdminLogDashboard();
window.filterAdminLogs = (type) => LoggingService.filterAdminLogs(type);

// 자동 초기화
LoggingService.init();

console.log('logging_service.js loaded (IP/Location tracking enabled)');
