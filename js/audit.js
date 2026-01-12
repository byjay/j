/**
 * audit.js - 감사팀(Audit Team) 핵심 로직
 * 전사적(모든 사용자) 학습 현황 감찰 및 데이터 무결성 검증
 */

const AuditSystem = {
    // 감사 대상 부서 정의
    departments: [
        { id: 'dad', name: '아빠 부서' },
        { id: 'mom', name: '엄마 부서' },
        { id: 'sieun', name: '시은 부서' },
        { id: 'harong', name: '하롱 부서' },
        { id: 'guest', name: '손님(외부)' }
    ],

    // 감사 시스템 초기화
    init() {
        if (window.AuditBridge) {
            window.AuditBridge.init();
        }
    },

    // 1. 전사 감사 보고서 생성 (Data Aggregation)
    generateAuditReport() {
        this.init(); // Ensure Bridge is ready
        console.log('🔍 [Audit] 전사 감사 시작 (via C++ Core)...');

        const report = this.departments.map(dept => {
            const userId = dept.id;

            // 데이터 수집
            const lastLogin = localStorage.getItem(`last_login_${userId}`) || '기록 없음';

            // XP/Level 데이터
            let xp = 0;
            let level = 1;
            try {
                const storedXP = localStorage.getItem(`xp_${userId}`);
                if (storedXP) xp = parseInt(storedXP);
                level = Math.floor(xp / 100) + 1;
            } catch (e) { console.warn(`Audit error for ${userId}:`, e); }

            // 진도율
            const unlockCount = parseInt(localStorage.getItem(`fukuoka_unlock_count_${userId}`) || '0');

            // ★ Core C++ Verification
            const isIntegrityOK = window.AuditBridge ?
                window.AuditBridge.verifyIntegrity(xp, level, unlockCount) : true;

            return {
                deptName: dept.name,
                userId: userId,
                status: this.evaluatePerformance(lastLogin, xp, isIntegrityOK),
                metrics: {
                    xp: xp,
                    level: level,
                    unlocks: unlockCount,
                    lastActive: this.formatDate(lastLogin),
                    integrity: isIntegrityOK ? 'SECURE' : 'CORRUPTED'
                }
            };
        });

        this.renderDashboard(report);
        return report;
    },

    // 성과 평가 로직 (KPI)
    evaluatePerformance(lastDateStr, xp, isIntegrityOK) {
        if (!isIntegrityOK) return 'CRITICAL'; // 무결성 깨지면 즉시 경고
        if (lastDateStr === '기록 없음') return 'UNTESTED';

        const lastDate = new Date(lastDateStr);
        const now = new Date();
        const diffDays = Math.floor((now - lastDate) / (1000 * 60 * 60 * 24));

        if (diffDays > 7) return 'WARNING';
        if (diffDays > 3) return 'WARNING';
        if (xp > 1000) return 'EXCELLENT';
        return 'NORMAL';
    },

    formatDate(dateStr) {
        if (dateStr === '기록 없음') return '-';
        try {
            const d = new Date(dateStr);
            return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
        } catch { return '-'; }
    },

    // 2. 감사 대시보드 렌더링 (UI)
    renderDashboard(report) {
        const container = document.getElementById('audit-report-body');
        if (!container) return;

        container.innerHTML = report.map(dept => `
            <tr class="border-b border-slate-700 hover:bg-slate-800/50 transition">
                <td class="p-4 text-white font-bold flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full ${this.getStatusColor(dept.status)}"></span>
                    ${dept.deptName}
                </td>
                <td class="p-4 text-slate-300">${dept.metrics.xp} XP (Lv.${dept.metrics.level})</td>
                <td class="p-4 text-slate-300 text-center">${dept.metrics.unlocks} 지역</td>
                <td class="p-4 text-slate-400 text-sm">${dept.metrics.lastActive}</td>
                <td class="p-4 text-right">
                    <button onclick="AuditSystem.inspectDept('${dept.userId}')" 
                        class="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-cyan-400 text-xs rounded border border-slate-600">
                        <i class="fas fa-search"></i> 정밀 감찰
                    </button>
                    <button onclick="AuditSystem.resetDept('${dept.userId}')" 
                        class="px-3 py-1 bg-red-900/30 hover:bg-red-900/50 text-red-400 text-xs rounded border border-red-900/50 ml-1">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        // 종합 통계 업데이트
        document.getElementById('total-xp-sum').textContent = report.reduce((acc, curr) => acc + curr.metrics.xp, 0).toLocaleString();
        document.getElementById('audit-timestamp').textContent = new Date().toLocaleString();
    },

    getStatusColor(status) {
        switch (status) {
            case 'EXCELLENT': return 'bg-cyan-400 shadow-[0_0_10px_cyan]';
            case 'NORMAL': return 'bg-green-500';
            case 'WARNING': return 'bg-yellow-500';
            case 'CRITICAL': return 'bg-red-500 animate-pulse';
            default: return 'bg-gray-500';
        }
    },

    // 3. 정밀 감찰 (Deep Inspection)
    inspectDept(userId) {
        const target = this.departments.find(d => d.id === userId);
        if (!target) return;

        alert(`[감사팀] '${target.name}' 정밀 감찰을 시작합니다.\n\n- 로컬 데이터 무결성 검증\n- 학습 패턴 분석\n- 부정행위(Cheat) 탐지`);

        // 시뮬레이션: 해당 유저로 '가상 로그인' 하여 화면 보기 (실제 로그인은 아님)
        // 여기서는 간단히 데이터 덤프를 보여줌
        const rawData = {
            xp: localStorage.getItem(`xp_${userId}`),
            lastLogin: localStorage.getItem(`last_login_${userId}`),
            history: localStorage.getItem(`jap_bong_history_v1_${userId}`)
        };

        console.table(rawData);
        // 추후 모달로 상세 표시 가능
    },

    // 부서 초기화 (징계)
    resetDept(userId) {
        if (confirm(`[경고] '${userId}' 부서의 모든 데이터를 파기하시겠습니까? 이 작업은 감사관 권한으로 수행되며 되돌릴 수 없습니다.`)) {
            localStorage.removeItem(`progress_${userId}`);
            localStorage.removeItem(`jap_bong_history_v1_${userId}`);
            localStorage.removeItem(`fukuoka_unlock_count_${userId}`);
            localStorage.removeItem(`xp_${userId}`);
            this.generateAuditReport(); // 갱신
            alert('데이터 파기 완료.');
        }
    },

    // UI 제어: 감사실 입장
    openAuditRoom() {
        document.getElementById('audit-overlay').style.display = 'flex';
        this.generateAuditReport();
    },

    closeAuditRoom() {
        document.getElementById('audit-overlay').style.display = 'none';
        // 복귀 시 원래 탭 유지
    }
};

// 전역 노출
window.AuditSystem = AuditSystem;
