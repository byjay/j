/**
 * learning_tracker.js - 학습 활동 추적
 */

const LearningTracker = {
    recordActivity(type, count = 1, correct = 0, total = 0) {
        if (!currentUser) return;

        const today = new Date().toISOString().split('T')[0];
        const key = `learning_history_${currentUser.id}`;
        const history = JSON.parse(localStorage.getItem(key) || '{"daily":[]}');

        // 오늘 데이터 찾기 또는 생성
        let todayData = history.daily.find(d => d.date === today);
        if (!todayData) {
            todayData = {
                date: today,
                conversation: { count: 0, minutes: 0 },
                vocabulary: { count: 0, minutes: 0 },
                characters: { count: 0, minutes: 0 },
                characterQuiz: { count: 0, correct: 0, total: 0 },
                vocabularyQuiz: { count: 0, correct: 0, total: 0 }
            };
            history.daily.push(todayData);
        }

        // 활동 기록
        if (type === 'characterQuiz' || type === 'vocabularyQuiz') {
            todayData[type].count += 1;
            todayData[type].correct += correct;
            todayData[type].total += total;
        } else {
            todayData[type].count += count;
            todayData[type].minutes += 1;
        }

        // 최대 30일만 유지
        if (history.daily.length > 30) {
            history.daily = history.daily.slice(-30);
        }

        localStorage.setItem(key, JSON.stringify(history));
    }
};

console.log('learning_tracker.js loaded');
