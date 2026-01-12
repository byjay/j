
// Admin Dashboard Logic
function showAdminLogDashboard() {
    if (!window.currentUser || window.currentUser.id !== 'dad') {
        alert('관리자 전용 기능입니다.');
        return;
    }

    const logs = window.LoggingService ? LoggingService.getAllLogs() : [];

    const modal = document.createElement('div');
    modal.id = 'admin-log-modal';
    modal.className = 'fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col">
            <div class="bg-gradient-to-r from-red-600 to-red-500 p-4 text-white flex justify-between items-center">
                <h2 class="text-lg font-black"><i class="fas fa-chart-bar mr-2"></i>사용 로그 (${logs.length}건)</h2>
                <button onclick="this.closest('#admin-log-modal').remove()" class="text-white/80 hover:text-white">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="p-4 flex gap-2 border-b">
                <button onclick="filterAdminLogs('all')" class="px-3 py-1 bg-gray-200 rounded-lg text-sm font-bold hover:bg-gray-300">전체</button>
                <button onclick="filterAdminLogs('login')" class="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-bold hover:bg-blue-200">로그인</button>
                <button onclick="filterAdminLogs('tab_view')" class="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-bold hover:bg-green-200">탭 이동</button>
                <button onclick="filterAdminLogs('game')" class="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-bold hover:bg-purple-200">게임</button>
            </div>
            <div id="admin-log-list" class="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
                ${renderAdminLogList(logs)}
            </div>
            <div class="p-3 border-t bg-gray-100 flex justify-between">
                <button onclick="clearAdminLogs()" class="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-bold hover:bg-red-200">
                    <i class="fas fa-trash mr-1"></i>전체 삭제
                </button>
                <button onclick="exportAdminLogs()" class="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-bold hover:bg-blue-600">
                    <i class="fas fa-download mr-1"></i>다운로드
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function renderAdminLogList(logs) {
    if (!logs.length) return '<p class="text-gray-500 text-center py-8">로그가 없습니다.</p>';

    return logs.slice(0, 100).map(log => {
        const time = new Date(log.timestamp).toLocaleString('ko-KR');
        const actionColors = {
            login: 'bg-blue-100 text-blue-700',
            tab_view: 'bg-green-100 text-green-700',
            game_start: 'bg-purple-100 text-purple-700',
            quiz_complete: 'bg-amber-100 text-amber-700'
        };
        const color = actionColors[log.action] || 'bg-gray-100 text-gray-700';

        return `
            <div class="bg-white rounded-xl p-3 shadow-sm border flex items-start gap-3">
                <span class="text-2xl">${log.avatarEmoji || '👤'}</span>
                <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="font-bold text-gray-800">${log.userName || log.userId}</span>
                        <span class="px-2 py-0.5 rounded-full text-xs font-bold ${color}">${log.action}</span>
                    </div>
                    <p class="text-xs text-gray-500 mt-0.5">${time}</p>
                    <p class="text-xs text-gray-400 truncate">IP: ${log.ip || 'N/A'}</p>
                    ${log.details && Object.keys(log.details).length ? `<p class="text-xs text-gray-600 mt-1">${JSON.stringify(log.details)}</p>` : ''}
                </div>
            </div>
        `;
    }).join('');
}

function filterAdminLogs(type) {
    const logs = window.LoggingService ? LoggingService.getAllLogs() : [];
    const filtered = type === 'all' ? logs : logs.filter(l => l.action.includes(type));
    document.getElementById('admin-log-list').innerHTML = renderAdminLogList(filtered);
}

function clearAdminLogs() {
    if (confirm('정말 모든 로그를 삭제하시겠습니까?')) {
        if (window.LoggingService) LoggingService.clearLogs();
        document.getElementById('admin-log-list').innerHTML = '<p class="text-gray-500 text-center py-8">로그가 삭제되었습니다.</p>';
    }
}

function exportAdminLogs() {
    const logs = window.LoggingService ? LoggingService.getAllLogs() : [];
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jap_bong_logs_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// Expose functions globally
window.showAdminLogDashboard = showAdminLogDashboard;
window.renderAdminLogList = renderAdminLogList;
window.filterAdminLogs = filterAdminLogs;
window.clearAdminLogs = clearAdminLogs;
window.exportAdminLogs = exportAdminLogs;
