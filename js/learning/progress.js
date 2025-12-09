/**
 * progress.js - 학습 현황 대시보드 (Chart.js 활용)
 */

function showProgressDashboard() {
    const container = document.getElementById('progress');
    if (!container) return;

    // 사용자 체크
    if (!currentUser) {
        container.innerHTML = `
            <div class="flex flex-col items-center justify-center h-full p-8 text-center">
                <div class="text-6xl mb-4">🔒</div>
                <h2 class="text-xl font-bold text-gray-800 mb-2">로그인이 필요해요!</h2>
                <p class="text-gray-500 mb-6">학습 기록을 보려면 먼저 로그인해주세요.</p>
                <button onclick="showLoginModal()" class="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-600 transition">
                    로그인하기
                </button>
            </div>
        `;
        return;
    }

    // 데이터 로드
    const historyKey = `jap_bong_history_v1_${currentUser.id}`;
    const history = JSON.parse(localStorage.getItem(historyKey) || '[]');
    const gamificationState = Gamification.state;

    // HTML 구조 생성
    container.innerHTML = `
        <div class="p-4 pb-24 space-y-6 max-w-md mx-auto">
            <!-- 헤더 -->
            <div class="bg-white rounded-3xl p-6 shadow-lg">
                <div class="flex items-center gap-4 mb-4">
                    <img src="${currentUser.avatar}" class="w-16 h-16 rounded-full border-2 border-blue-100">
                    <div>
                        <h2 class="text-2xl font-black text-gray-800">${currentUser.name}의 학습 현황</h2>
                        <p class="text-sm text-gray-500">오늘도 열심히 공부했네요! 🔥</p>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2 text-center">
                    <div class="bg-orange-50 rounded-xl p-3">
                        <div class="text-2xl font-black text-orange-500">${gamificationState.streak}일</div>
                        <div class="text-xs text-gray-500">연속 학습</div>
                    </div>
                    <div class="bg-blue-50 rounded-xl p-3">
                        <div class="text-2xl font-black text-blue-500">${gamificationState.level}</div>
                        <div class="text-xs text-gray-500">현재 레벨</div>
                    </div>
                    <div class="bg-purple-50 rounded-xl p-3">
                        <div class="text-2xl font-black text-purple-500">${gamificationState.totalXP}</div>
                        <div class="text-xs text-gray-500">총 XP</div>
                    </div>
                </div>
            </div>

            <!-- 주간 학습 차트 -->
            <div class="bg-white rounded-3xl p-6 shadow-lg">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i class="fas fa-chart-bar text-blue-500"></i> 주간 학습량
                </h3>
                <canvas id="weeklyChart"></canvas>
            </div>

            <!-- 최근 퀴즈 성적 -->
            <div class="bg-white rounded-3xl p-6 shadow-lg">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i class="fas fa-trophy text-yellow-500"></i> 최근 퀴즈 성적
                </h3>
                <canvas id="quizChart"></canvas>
            </div>
            <!-- 용돈 청구 섹션 (아이들용) - 상세 진행률 표시 -->
            ${(currentUser.id === 'sieun' || currentUser.id === 'harong') ? (() => {
            // 진행률 계산
            const trackerKey = `learning_history_${currentUser.id}`;
            const trackerHistory = JSON.parse(localStorage.getItem(trackerKey) || '{"daily":[]}');
            let totalMinutes = 0;
            trackerHistory.daily.forEach(day => {
                totalMinutes += (day.conversation?.minutes || 0) + (day.vocabulary?.minutes || 0) + (day.characters?.minutes || 0);
            });

            const detailHistoryKey = `jap_bong_history_v1_${currentUser.id}`;
            const detailHistory = JSON.parse(localStorage.getItem(detailHistoryKey) || '[]');
            const perfectQuizCount = detailHistory.filter(h => h.type === 'quiz_score' && h.score === 100).length;

            const nextXP = (Math.floor(gamificationState.totalXP / 1000) + 1) * 1000;
            const xpProgress = (gamificationState.totalXP % 1000) / 10; // 0-100%
            const timeProgress = Math.min((totalMinutes / 180) * 100, 100);
            const quizProgress = Math.min((perfectQuizCount / 3) * 100, 100);

            const canClaim = gamificationState.totalXP >= 1000 && totalMinutes >= 180 && perfectQuizCount >= 3;

            return `
                <div class="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-6 shadow-lg text-white">
                    <h3 class="text-xl font-bold mb-4 text-center">💰 용돈 모으기 미션</h3>
                    
                    <div class="space-y-3 mb-6 text-sm">
                        <!-- 1. XP -->
                        <div>
                            <div class="flex justify-between mb-1">
                                <span>1. 포인트 (${gamificationState.totalXP % 1000}/1000 XP)</span>
                                <span>${Math.round(xpProgress)}%</span>
                            </div>
                            <div class="bg-white/20 rounded-full h-2 overflow-hidden">
                                <div class="bg-white h-full transition-all" style="width: ${xpProgress}%"></div>
                            </div>
                        </div>
                        <!-- 2. 학습 시간 -->
                        <div>
                            <div class="flex justify-between mb-1">
                                <span>2. 총 공부 시간 (${totalMinutes}/180분)</span>
                                <span>${Math.round(timeProgress)}%</span>
                            </div>
                            <div class="bg-white/20 rounded-full h-2 overflow-hidden">
                                <div class="bg-white h-full transition-all" style="width: ${timeProgress}%"></div>
                            </div>
                        </div>
                        <!-- 3. 퀴즈 만점 -->
                        <div>
                            <div class="flex justify-between mb-1">
                                <span>3. 퀴즈 100점 (${perfectQuizCount}/3회)</span>
                                <span>${Math.round(quizProgress)}%</span>
                            </div>
                            <div class="bg-white/20 rounded-full h-2 overflow-hidden">
                                <div class="bg-white h-full transition-all" style="width: ${quizProgress}%"></div>
                            </div>
                        </div>
                    </div>

                    <button onclick="Gamification.claimAllowance()" class="w-full bg-white ${canClaim ? 'text-orange-600' : 'text-gray-400'} font-bold py-3 rounded-xl shadow hover:bg-gray-50 transition active:scale-95">
                        💸 2만원 용돈 청구하기
                    </button>
                </div>
                `;
        })() : ''}

            <!-- 용돈 관리 섹션 (아빠용) -->
            ${currentUser.id === 'dad' ? `
            <div class="bg-white rounded-3xl p-6 shadow-lg border-2 border-yellow-400">
                <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i class="fas fa-money-bill-wave text-green-500"></i> 용돈 청구 내역
                </h3>
                <div id="allowance-list" class="space-y-3">
                    ${getAllowanceListHTML()}
                </div>
            </div>
            ` : ''}
        </div>
    `;

    // 차트 렌더링
    renderWeeklyChart(history);
    renderQuizChart(history);
}

function renderWeeklyChart(history) {
    const canvas = document.getElementById('weeklyChart');
    if (!canvas || typeof Chart === 'undefined') {
        console.warn('Chart.js or weeklyChart canvas not available');
        return;
    }
    const ctx = canvas.getContext('2d');

    // 최근 7일 날짜 생성
    const labels = [];
    const data = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toISOString().split('T')[0];
        labels.push(dateStr.slice(5).replace('-', '/')); // MM/DD

        // 해당 날짜의 로그 수 계산
        const count = history.filter(h => h.date === dateStr).length;
        data.push(count);
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '학습 활동',
                data: data,
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                borderColor: 'rgb(59, 130, 246)',
                borderWidth: 1,
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, ticks: { stepSize: 1 } }
            },
            plugins: { legend: { display: false } }
        }
    });
}

function renderQuizChart(history) {
    const canvas = document.getElementById('quizChart');
    if (!canvas || typeof Chart === 'undefined') {
        console.warn('Chart.js or quizChart canvas not available');
        return;
    }
    const ctx = canvas.getContext('2d');

    // 퀴즈 로그만 필터링 (최근 10개)
    const quizLogs = history.filter(h => h.type === 'quiz_score').slice(-10);

    if (quizLogs.length === 0) {
        ctx.font = "14px Arial";
        ctx.textAlign = "center";
        ctx.fillText("아직 퀴즈 기록이 없습니다.", ctx.canvas.width / 2, ctx.canvas.height / 2);
        return;
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: quizLogs.map((_, i) => `${i + 1}회`),
            datasets: [{
                label: '점수',
                data: quizLogs.map(h => h.score),
                borderColor: 'rgb(245, 158, 11)',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { min: 0, max: 100 }
            },
            plugins: { legend: { display: false } }
        }
    });
}

// 용돈 내역 HTML 생성
function getAllowanceListHTML() {
    const claims = JSON.parse(localStorage.getItem('allowance_claims') || '[]');
    if (claims.length === 0) return '<p class="text-gray-400 text-center text-sm">청구 내역이 없습니다.</p>';

    return claims.reverse().map(claim => `
        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
            <div>
                <div class="font-bold text-gray-800">${claim.userName}</div>
                <div class="text-xs text-gray-500">${new Date(claim.date).toLocaleDateString()} - ${claim.amount.toLocaleString()}원</div>
            </div>
            <div>
                ${claim.status === 'pending'
            ? `<button onclick="approveAllowance(${claim.id})" class="bg-green-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-green-600">승인</button>`
            : `<span class="text-green-600 text-xs font-bold">지급완료</span>`}
            </div>
        </div>
    `).join('');
}

// 용돈 승인 처리
window.approveAllowance = function (claimId) {
    const claims = JSON.parse(localStorage.getItem('allowance_claims') || '[]');
    const target = claims.find(c => c.id === claimId);
    if (target) {
        target.status = 'approved';
        localStorage.setItem('allowance_claims', JSON.stringify(claims));
        showProgressDashboard(); // UI 갱신
        alert(`${target.userName}의 용돈 청구를 승인했습니다!`);
    }
};

// 전역 노출
window.showProgressDashboard = showProgressDashboard;
