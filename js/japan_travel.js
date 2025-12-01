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
        unlockCondition: 'characterQuiz100x3',
        description: '일본의 수도',
        scriptFile: 'js/tokyo.js',
        mission: '글자 퀴즈 100점 3회 달성'
    },
    kyoto: {
        id: 'kyoto',
        name: '교토',
        nameJp: '京都',
        icon: '⛩️',
        color: 'purple',
        unlockCondition: 'conversation10min7days',
        description: '전통과 문화의 도시',
        scriptFile: 'js/kyoto.js',
        mission: '회화 학습 10분 이상 7일 달성'
    },
    osaka: {
        id: 'osaka',
        name: '오사카',
        nameJp: '大阪',
        icon: '🍜',
        color: 'orange',
        unlockCondition: 'vocabularyQuiz100x3',
        description: '맛의 도시',
        scriptFile: 'js/osaka.js',
        mission: '단어 퀴즈 100점 3회 달성'
    },
    sapporo: {
        id: 'sapporo',
        name: '삿포로',
        nameJp: '札幌',
        icon: '⛷️',
        color: 'cyan',
        unlockCondition: 'conversation10min14days',
        description: '설경과 자연',
        scriptFile: 'js/sapporo.js',
        mission: '회화 학습 10분 이상 14일 달성'
    },
    okinawa: {
        id: 'okinawa',
        name: '오키나와',
        nameJp: '沖縄',
        icon: '🏖️',
        color: 'teal',
        unlockCondition: 'quizAverage90',
        description: '아열대 해변 리조트',
        scriptFile: 'js/okinawa.js',
        mission: '모든 퀴즈 평균 90점 이상'
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
        const onClick = `onclick="handleRegionClick('${region.id}')"`;

        html += `
            <div id="region-card-${region.id}" ${onClick} class="group bg-white p-6 rounded-2xl shadow-md border-2 border-transparent hover:border-${region.color}-400 flex flex-col items-center transition-all duration-200 transform ${cursor} ${opacity} relative overflow-hidden">
                <div class="text-5xl mb-3 transform transition-transform group-hover:scale-110">${lockIcon || region.icon}</div>
                <h3 class="text-xl font-bold text-gray-800 mb-1">${region.name}</h3>
                <p class="text-sm text-${region.color}-600 font-medium mb-1">${region.nameJp}</p>
                <p class="text-xs text-gray-500 text-center">${region.description}</p>
                ${!isUnlocked ? `<p class="text-xs text-red-500 mt-2 font-bold mission-text">🔒 ${region.mission}</p>` : ''}
                <div class="absolute inset-0 bg-${region.color}-500 opacity-0 group-hover:opacity-5 transition-opacity"></div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// 지역 클릭 핸들러
function handleRegionClick(regionId) {
    const region = japanRegions[regionId];
    const isUnlocked = checkRegionUnlock(region);

    if (isUnlocked) {
        // 이미 열려있으면 바로 이동
        selectRegion(regionId);
    } else {
        // 잠겨있으면 미션 달성 여부 재확인 (방금 달성했을 수도 있음)
        // 실제로는 checkRegionUnlock이 실시간 데이터를 확인하므로, 
        // 여기서 true가 나오면 "방금 해제됨"을 의미할 수 있음.
        // 하지만 UI상으로는 잠겨보이는데 클릭했으므로, 다시 체크해서 true면 해제 연출

        // 강제로 다시 체크 (데이터 갱신되었을 수 있음)
        if (checkRegionUnlock(region)) {
            // 미션 달성! 레벨업 연출
            playLevelUpEffect(region);
        } else {
            // 아직 미달성
            showUnlockRequirement(regionId);
        }
    }
}

// 레벨업 효과 (잠금 해제)
function playLevelUpEffect(region) {
    // 1. 사운드 재생 (성공음)
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'); // 예시 효과음
    audio.volume = 0.5;
    audio.play().catch(() => { }); // 자동재생 정책 등으로 실패시 무시

    // 2. 축하 모달 표시
    const modalHtml = `
        <div id="level-up-modal" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 animate-fade-in">
            <div class="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 text-center transform scale-0 animate-pop-in relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-b from-${region.color}-50 to-white -z-10"></div>
                <div class="text-6xl mb-4 animate-bounce">🎉</div>
                <h2 class="text-3xl font-black text-${region.color}-600 mb-2">LEVEL UP!</h2>
                <h3 class="text-xl font-bold text-gray-800 mb-4">${region.name} 지역 오픈!</h3>
                <p class="text-gray-600 mb-6">축하합니다! 미션을 달성하여<br>새로운 여행지가 열렸습니다.</p>
                <button onclick="closeLevelUpModal('${region.id}')" class="w-full py-3 bg-${region.color}-500 hover:bg-${region.color}-600 text-white font-bold rounded-xl shadow-lg transform transition-transform active:scale-95">
                    여행 떠나기 ✈️
                </button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // 3. 폭죽 효과 (Canvas Confetti)
    // CDN이 없으므로 간단한 CSS 파티클이나 이모지로 대체하거나, 
    // 만약 confetti 라이브러리가 있다면 사용. 여기서는 간단히 이모지 폭죽 효과 구현
    createEmojiConfetti();
}

function closeLevelUpModal(regionId) {
    const modal = document.getElementById('level-up-modal');
    if (modal) modal.remove();

    // UI 갱신 (잠금 아이콘 제거 등)
    renderRegionSelection();

    // 지역 이동
    selectRegion(regionId);
}

// 간단한 이모지 폭죽 효과
function createEmojiConfetti() {
    const emojis = ['🎉', '✨', '⭐', '🎈', '✈️'];
    for (let i = 0; i < 50; i++) {
        const el = document.createElement('div');
        el.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        el.style.position = 'fixed';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = '-50px';
        el.style.fontSize = (Math.random() * 20 + 20) + 'px';
        el.style.zIndex = '70';
        el.style.pointerEvents = 'none';
        el.style.transition = `top ${Math.random() * 2 + 1}s ease-in, transform ${Math.random() * 2 + 1}s linear`;

        document.body.appendChild(el);

        setTimeout(() => {
            el.style.top = '110vh';
            el.style.transform = `rotate(${Math.random() * 360}deg)`;
        }, 100);

        setTimeout(() => el.remove(), 3000);
    }
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
        case 'characterQuiz100x3':
            const perfectCharQuizDays = history.daily.filter(day =>
                day.characterQuiz.total > 0 &&
                day.characterQuiz.correct === day.characterQuiz.total
            ).length;
            return perfectCharQuizDays >= 3;

        case 'conversation10min7days':
            const convDays = history.daily.filter(day =>
                (day.conversation.minutes || 0) >= 10
            ).length;
            return convDays >= 7;

        case 'vocabularyQuiz100x3':
            const perfectVocabQuizDays = history.daily.filter(day =>
                day.vocabularyQuiz.total > 0 &&
                day.vocabularyQuiz.correct === day.vocabularyQuiz.total
            ).length;
            return perfectVocabQuizDays >= 3;

        case 'conversation10min14days':
            const convDays14 = history.daily.filter(day =>
                (day.conversation.minutes || 0) >= 10
            ).length;
            return convDays14 >= 14;

        case 'quizAverage90':
            const allQuizzes = history.daily.flatMap(day => [
                day.characterQuiz.total > 0 ? (day.characterQuiz.correct / day.characterQuiz.total * 100) : null,
                day.vocabularyQuiz.total > 0 ? (day.vocabularyQuiz.correct / day.vocabularyQuiz.total * 100) : null
            ]).filter(score => score !== null);

            if (allQuizzes.length === 0) return false;
            const average = allQuizzes.reduce((a, b) => a + b, 0) / allQuizzes.length;
            return average >= 90;

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

    // 여기서 체크하지 않고 handleRegionClick에서 처리했으므로 바로 진행
    // 하지만 안전을 위해 한번 더 체크 (아빠 계정 등 고려)
    if (!checkRegionUnlock(region) && !(currentUser && currentUser.id === 'dad')) {
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
        const initFuncName = `init${regionId.charAt(0).toUpperCase() + regionId.slice(1)}Trip`;
        if (typeof window[initFuncName] === 'function') {
            window[initFuncName]();
        } else {
            console.error(`Initialization function ${initFuncName} not found for ${regionId}`);
            // 후쿠오카는 예외적으로 initFukuokaTrip일 수 있음 (위에서 처리됨)
            if (regionId === 'fukuoka' && typeof initFukuokaTrip === 'function') {
                initFukuokaTrip();
            }
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
        script.onerror = () => {
            console.error(`Failed to load script: ${region.scriptFile}`);
            // 스크립트 로드 실패해도 UI는 띄워주되, 데이터가 없을 수 있음
            resolve();
        };
        document.head.appendChild(script);
    });
}

// 지역 선택으로 돌아가기
function backToRegionSelection() {
    if (currentRegion) {
        document.getElementById('region-selection').style.display = 'grid';
        document.getElementById('region-detail').style.display = 'none';
        currentRegion = null;
        // 돌아올 때 잠금 상태 갱신
        renderRegionSelection();
    }
}

// 전역 노출
window.initJapanTravel = initJapanTravel;
window.selectRegion = selectRegion;
window.backToRegionSelection = backToRegionSelection;
window.handleRegionClick = handleRegionClick;
window.closeLevelUpModal = closeLevelUpModal;

console.log('japan_travel.js loaded');
