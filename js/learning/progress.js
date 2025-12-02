/**
 * progress.js - 학습 진도 대시보드
 */

let conversationChart = null;
let vocabularyChart = null;
let characterChart = null;
let characterQuizChart = null;
let vocabularyQuizChart = null;

// 학습현황 탭 표시
function showProgressDashboard() {
    if (!currentUser) return;

    // 아빠 계정이면 사용자 선택 드롭다운 표시
    const adminSelector = document.getElementById('admin-user-selector');
    const adminReset = document.getElementById('admin-reset-user');

    if (currentUser.id === 'dad') {
        if (adminSelector) adminSelector.style.display = 'block';
        if (adminReset) adminReset.style.display = 'block';
    } else {
        if (adminSelector) adminSelector.style.display = 'none';
        if (adminReset) adminReset.style.display = 'none';
    }

    renderProgressCharts(currentUser.id);
}

// 사용자 선택 변경 (아빠 전용)
function changeProgressUser() {
    const select = document.getElementById('progress-user-select');
    if (select) {
        renderProgressCharts(select.value);
    }
}

// 개별 사용자 진도 리셋 (아빠 전용)
function resetUserProgress() {
    const select = document.getElementById('progress-user-select');
    const userId = select ? select.value : currentUser.id;
    const userName = { 'dad': '아빠', 'mom': '엄마', 'sieun': '시으니', 'harong': '하롱이' }[userId];

    if (confirm(`⚠️ ${userName}의 학습 진도를 리셋하시겠습니까?`)) {
        const password = prompt('비밀번호(1435):');
        if (password === '1435') {
            localStorage.removeItem(`learning_history_${userId}`);
            alert('✅ 리셋 완료!');
            renderProgressCharts(userId);
        } else if (password !== null) {
            alert('❌ 비밀번호가 틀렸습니다!');
        }
    }
}

// 차트 렌더링
function renderProgressCharts(userId) {
    const history = JSON.parse(localStorage.getItem(`learning_history_${userId}`) || '{"daily":[]}');
    const last7Days = history.daily.slice(-7);

    // 데이터가 없으면 빈 데이터 생성
    if (last7Days.length === 0) {
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            last7Days.push({
                date: date.toISOString().split('T')[0],
                conversation: { count: 0, minutes: 0 },
                vocabulary: { count: 0, minutes: 0 },
                characters: { count: 0, minutes: 0 },
                characterQuiz: { count: 0, correct: 0, total: 0 },
                vocabularyQuiz: { count: 0, correct: 0, total: 0 }
            });
        }
    }

    const dates = last7Days.map(d => {
        const [year, month, day] = d.date.split('-');
        return `${month}/${day}`;
    });

    // 요약 통계 업데이트
    updateSummaryStats(history);

    // 회화 그래프
    renderLineChart('conversation-chart', '일별 회화 학습',
        dates, last7Days.map(d => d.conversation.count), '#3b82f6');

    // 단어 그래프
    renderLineChart('vocabulary-chart', '일별 단어 학습',
        dates, last7Days.map(d => d.vocabulary.count), '#10b981');

    // 글자 그래프
    renderLineChart('character-chart', '일별 글자 연습',
        dates, last7Days.map(d => d.characters.count), '#8b5cf6');

    // 문자 퀴즈 정답률 그래프
    renderLineChart('character-quiz-chart', '일별 문자 퀴즈 정답률 (%)',
        dates,
        last7Days.map(d => d.characterQuiz.total > 0
            ? (d.characterQuiz.correct / d.characterQuiz.total * 100).toFixed(1)
            : 0),
        '#f59e0b',
        true);

    // 단어 퀴즈 정답률 그래프
    renderLineChart('vocabulary-quiz-chart', '일별 단어 퀴즈 정답률 (%)',
        dates,
        last7Days.map(d => d.vocabularyQuiz.total > 0
            ? (d.vocabularyQuiz.correct / d.vocabularyQuiz.total * 100).toFixed(1)
            : 0),
        '#ef4444',
        true);
}

// 라인 차트 렌더링
function renderLineChart(canvasId, title, labels, data, color, isPercentage = false) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // 기존 차트 제거
    const chartVar = canvasId.replace('-chart', 'Chart').replace(/-./g, x => x[1].toUpperCase());
    if (window[chartVar]) {
        window[chartVar].destroy();
    }

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: title,
                data: data,
                borderColor: color,
                backgroundColor: color + '20',
                tension: 0.4,
                fill: true,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: title,
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: isPercentage ? 100 : undefined,
                    ticks: {
                        callback: function (value) {
                            return isPercentage ? value + '%' : value;
                        }
                    }
                }
            }
        }
    });

    window[chartVar] = chart;
}

// 요약 통계 업데이트
function updateSummaryStats(history) {
    const total = {
        conversation: 0,
        vocabulary: 0,
        characters: 0,
        characterQuiz: { count: 0, correct: 0, total: 0 },
        vocabularyQuiz: { count: 0, correct: 0, total: 0 }
    };

    history.daily.forEach(day => {
        total.conversation += day.conversation.count;
        total.vocabulary += day.vocabulary.count;
        total.characters += day.characters.count;
        total.characterQuiz.count += day.characterQuiz.count;
        total.characterQuiz.correct += day.characterQuiz.correct;
        total.characterQuiz.total += day.characterQuiz.total;
        total.vocabularyQuiz.count += day.vocabularyQuiz.count;
        total.vocabularyQuiz.correct += day.vocabularyQuiz.correct;
        total.vocabularyQuiz.total += day.vocabularyQuiz.total;
    });

    // UI 업데이트
    const summary = document.getElementById('progress-summary');
    if (summary) {
        const charQuizAccuracy = total.characterQuiz.total > 0
            ? (total.characterQuiz.correct / total.characterQuiz.total * 100).toFixed(1)
            : 0;
        const vocabQuizAccuracy = total.vocabularyQuiz.total > 0
            ? (total.vocabularyQuiz.correct / total.vocabularyQuiz.total * 100).toFixed(1)
            : 0;

        summary.innerHTML = `
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div class="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <div class="text-blue-600 text-sm font-bold mb-1">회화</div>
                    <div class="text-2xl font-black text-blue-700">${total.conversation}</div>
                </div>
                <div class="bg-green-50 p-4 rounded-xl border border-green-200">
                    <div class="text-green-600 text-sm font-bold mb-1">단어</div>
                    <div class="text-2xl font-black text-green-700">${total.vocabulary}</div>
                </div>
                <div class="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <div class="text-purple-600 text-sm font-bold mb-1">글자</div>
                    <div class="text-2xl font-black text-purple-700">${total.characters}</div>
                </div>
                <div class="bg-orange-50 p-4 rounded-xl border border-orange-200">
                    <div class="text-orange-600 text-sm font-bold mb-1">문자퀴즈</div>
                    <div class="text-2xl font-black text-orange-700">${charQuizAccuracy}%</div>
                </div>
                <div class="bg-red-50 p-4 rounded-xl border border-red-200">
                    <div class="text-red-600 text-sm font-bold mb-1">단어퀴즈</div>
                    <div class="text-2xl font-black text-red-700">${vocabQuizAccuracy}%</div>
                </div>
            </div>
        `;
    }
}

console.log('progress.js loaded');
