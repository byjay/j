/**
 * progress.js - 학습 진도 및 그래프
 */

let progressChart = null;
let accuracyChart = null;
let dailyChart = null;

// 사용자 진도 로드
function loadUserProgress(userId) {
    const saved = localStorage.getItem(`progress_${userId}`);
    if (saved) {
        return JSON.parse(saved);
    }

    // 초기 데이터
    return {
        vocabulary: { completed: 0, total: 50 }, // 예시 총 개수
        conversation: { completed: 0, total: 20 },
        characterQuiz: { completed: 0, total: 46, accuracy: 0 },
        vocabularyQuiz: { completed: 0, total: 50, accuracy: 0 },
        dailyStudy: [] // { date: '2025-11-25', minutes: 30 }
    };
}

// 사용자 진도 저장
function saveUserProgress(userId, data) {
    localStorage.setItem(`progress_${userId}`, JSON.stringify(data));
    // UI 업데이트 (현재 탭이 progress라면)
    if (document.getElementById('progress-tab').classList.contains('active')) {
        renderProgressCharts();
    }
}

// 차트 렌더링
function renderProgressCharts() {
    if (!currentUser) return;

    const progress = loadUserProgress(currentUser.id);

    // 1. 진도율 차트
    const ctx1 = document.getElementById('progress-chart').getContext('2d');
    if (progressChart) progressChart.destroy();

    progressChart = new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['단어', '회화', '문자퀴즈', '단어퀴즈'],
            datasets: [{
                label: '진도율 (%)',
                data: [
                    Math.min(100, (progress.vocabulary.completed / progress.vocabulary.total * 100)),
                    Math.min(100, (progress.conversation.completed / progress.conversation.total * 100)),
                    Math.min(100, (progress.characterQuiz.completed / progress.characterQuiz.total * 100)),
                    Math.min(100, (progress.vocabularyQuiz.completed / progress.vocabularyQuiz.total * 100))
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // 2. 정답률 차트
    const ctx2 = document.getElementById('accuracy-chart').getContext('2d');
    if (accuracyChart) accuracyChart.destroy();

    accuracyChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['문자퀴즈', '단어퀴즈'],
            datasets: [{
                data: [
                    progress.characterQuiz.accuracy || 0,
                    progress.vocabularyQuiz.accuracy || 0
                ],
                backgroundColor: [
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ]
            }]
        },
        options: {
            responsive: true
        }
    });

    // 3. 일별 학습 그래프
    const ctx3 = document.getElementById('daily-chart').getContext('2d');
    if (dailyChart) dailyChart.destroy();

    // 최근 7일 데이터 준비
    const labels = progress.dailyStudy.slice(-7).map(d => d.date);
    const data = progress.dailyStudy.slice(-7).map(d => d.minutes);

    dailyChart = new Chart(ctx3, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '학습 시간 (분)',
                data: data,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

console.log('progress.js loaded');
