/**
 * japan_travel.js - 일본 여행 지역 관리 및 잠금 시스템
 */

// 일본 여행 지역 정보
const japanRegions = {
    fukuoka: {
        id: 'fukuoka',
        name: '후쿠오카',
        nameJp: '福岡',
        icon: '🏯',
        color: 'red',
        unlockCondition: 'default', // 기본 오픈
        description: '규슈 최대 도시',
        scriptFile: 'js/fukuoka.js'
    },
    tokyo: {
        id: 'tokyo',
        name: '도쿄',
        nameJp: '東京',
        icon: '🗼',
        color: 'blue',
        unlockCondition: 'characterQuiz100',
        description: '일본의 수도',
        scriptFile: 'js/tokyo.js',
        mission: '글자 퀴즈 100점 달성'
    },
    kyoto: {
        id: 'kyoto',
        name: '교토',
        nameJp: '京都',
        icon: '⛩️',
        color: 'purple',
        unlockCondition: 'conversation10min',
        description: '전통과 문화의 도시',
        scriptFile: 'js/kyoto.js',
        mission: '회화 학습 10분 이상'
    },
    osaka: {
        id: 'osaka',
        name: '오사카',
        nameJp: '大阪',
        icon: '🍜',
        color: 'orange',
        unlockCondition: 'vocabularyQuiz90',
        description: '맛의 도시',
        scriptFile: 'js/osaka.js',
        mission: '단어 퀴즈 90점 이상'
    },
    sapporo: {
        id: 'sapporo',
        name: '삿포로',
        nameJp: '札幌',
        icon: '⛷️',
        color: 'cyan',
        unlockCondition: 'conversation20min',
        description: '설경과 자연',
        scriptFile: 'js/sapporo.js',
        mission: '회화 학습 20분 이상'
    },
    okinawa: {
        id: 'okinawa',
        name: '오키나와',
        nameJp: '沖縄',
        icon: '🏖️',
        color: 'teal',
        unlockCondition: 'quizAverage85',
        description: '아열대 해변 리조트',
        scriptFile: 'js/okinawa.js',
        mission: '모든 퀴즈 평균 85점 이상'
    }
};

let currentRegion = null;
let loadedScripts = {};

// 일본 여행 초기화
function initJapanTravel() {
    renderRegionSelection();
}

// 지역 선택 그리드 렌더링
function renderRegionSelection() {
    const container = document.getElementById('region-selection');
    if (!container) return;

    let html = '';

    Object.values(japanRegions).forEach(region => {
        const isUnlocked = checkRegionUnlock(region);
        const lockIcon = isUnlocked ? '' : '<i class="fas fa-lock text-3xl text-gray-300 mb-2"></i>';
        const opacity = isUnlocked ? '' : 'opacity-50';
        const cursor = isUnlocked ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed';
        const onClick = isUnlocked ? `onclick="selectRegion('${region.id}')"` : `onclick="showUnlockRequirement('${region.id}')"`;

        html += `
            <div ${onClick} class="group bg-white p-6 rounded-2xl shadow-md border-2 border-transparent hover:border-${region.color}-400 flex flex-col items-center transition-all duration-200 transform ${cursor} ${opacity}">
                <div class="text-5xl mb-3">${lockIcon || region.icon}</div>
                <h3 class="text-xl font-bold text-gray-800 mb-1">${region.name}</h3>
                <p class="text-sm text-${region.color}-600 font-medium mb-1">${region.nameJp}</p>
                <p class="text-xs text-gray-500 text-center">${region.description}</p>
                ${!isUnlocked ? `<p class="text-xs text-red-500 mt-2 font-bold">🔒 ${region.mission}</p>` : ''}
            </div>
        `;
    });

    container.innerHTML = html;
}

// 지역 잠금 해제 체크
function checkRegionUnlock(region) {
    // 아빠는 모든 지역 접근 가능
    if (currentUser && currentUser.id === 'dad') {
        return true;
    }

    // 후쿠오카는 기본 오픈
    if (region.unlockCondition === 'default') {
        return true;
    }

    if (!currentUser) return false;

    const history = JSON.parse(
        localStorage.getItem(`learning_history_${currentUser.id}`) || '{"daily":[]}'
    );

    switch (region.unlockCondition) {
        case 'characterQuiz100':
            // 글자 퀴즈 100점 달성
            return history.daily.some(day =>
                day.characterQuiz.total > 0 &&
                (day.characterQuiz.correct / day.characterQuiz.total * 100) === 100
            );

        case 'conversation10min':
            // 회화 학습 누적 10분 이상
            const totalConvMinutes = history.daily.reduce((sum, day) =>
                sum + (day.conversation.minutes || 0), 0
            );
            return totalConvMinutes >= 10;

        case 'vocabularyQuiz90':
            // 단어 퀴즈 90점 이상
            return history.daily.some(day =>
                day.vocabularyQuiz.total > 0 &&
                (day.vocabularyQuiz.correct / day.vocabularyQuiz.total * 100) >= 90
            );

        case 'conversation20min':
            // 회화 학습 누적 20분 이상
            const totalConvMinutes20 = history.daily.reduce((sum, day) =>
                sum + (day.conversation.minutes || 0), 0
            );
            return totalConvMinutes20 >= 20;

        case 'quizAverage85':
            // 모든 퀴즈 평균 85점 이상
            const allQuizzes = history.daily.flatMap(day => [
                day.characterQuiz.total > 0 ? (day.characterQuiz.correct / day.characterQuiz.total * 100) : null,
                day.vocabularyQuiz.total > 0 ? (day.vocabularyQuiz.correct / day.vocabularyQuiz.total * 100) : null
            ]).filter(score => score !== null);

            if (allQuizzes.length === 0) return false;
            const average = allQuizzes.reduce((a, b) => a + b, 0) / allQuizzes.length;
            return average >= 85;

        default:
            return false;
    }
}

// 잠금 해제 조건 표시
function showUnlockRequirement(regionId) {
    const region = japanRegions[regionId];
    alert(`🔒 ${region.name}은(는) 잠겨있습니다!\n\n미션: ${region.mission}\n\n미션을 완료하면 이 지역을 방문할 수 있습니다!`);
}

// 지역 선택
function selectRegion(regionId) {
    const region = japanRegions[regionId];

    if (!checkRegionUnlock(region)) {
        showUnlockRequirement(regionId);
        return;
    }

    currentRegion = regionId;

    // 지역 스크립트 로드
    loadRegionScript(region).then(() => {
        // 지역 선택 숨기고 상세 정보 표시
        document.getElementById('region-selection').style.display = 'none';
        document.getElementById('region-detail').style.display = 'block';

        // 해당 지역 초기화 함수 호출
        if (regionId === 'fukuoka' && typeof initFukuokaTrip === 'function') {
            initFukuokaTrip();
        } else if (typeof window[`init${regionId.charAt(0).toUpperCase() + regionId.slice(1)}Trip`] === 'function') {
            window[`init${regionId.charAt(0).toUpperCase() + regionId.slice(1)}Trip`]();
        }
    });
}

// 지역 스크립트 동적 로드
function loadRegionScript(region) {
    return new Promise((resolve, reject) => {
        if (loadedScripts[region.id]) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = region.scriptFile;
        script.onload = () => {
            loadedScripts[region.id] = true;
            resolve();
        };
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 지역 선택으로 돌아가기
function backToRegionSelection() {
    if (currentRegion) {
        document.getElementById('region-selection').style.display = 'grid';
        document.getElementById('region-detail').style.display = 'none';
        currentRegion = null;
    }
}

// 전역 노출
window.initJapanTravel = initJapanTravel;
window.selectRegion = selectRegion;
window.backToRegionSelection = backToRegionSelection;

console.log('japan_travel.js loaded');
