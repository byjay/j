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
    // 항상 지역 선택 화면으로 시작
    backToRegionSelection();
}

// 필수 어플 데이터
const essentialApps = [
    {
        name: "Google Maps",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Google_Maps_icon_%282020%29.svg/1200px-Google_Maps_icon_%282020%29.svg.png",
        desc: "일본 여행의 필수품! 길 찾기, 전철 시간표, 맛집 검색까지 모든 것을 해결해줍니다. 특히 복잡한 일본 지하철 환승 정보를 정확하게 알려주어 길을 잃을 걱정이 없습니다.",
        link: "https://play.google.com/store/apps/details?id=com.google.android.apps.maps"
    },
    {
        name: "Papago",
        icon: "https://play-lh.googleusercontent.com/M6yE-Wq-7Wq_pZ6-gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU=w240-h480-rw",
        desc: "네이버가 만든 AI 번역기. 텍스트 번역뿐만 아니라 이미지 번역 기능이 강력하여, 일본어 메뉴판이나 안내문을 사진 찍어 바로 한국어로 확인할 수 있습니다. 음성 대화 모드도 지원합니다.",
        link: "https://play.google.com/store/apps/details?id=com.naver.labs.translator"
    },
    {
        name: "Japan Transit Planner (Navitime)",
        icon: "https://play-lh.googleusercontent.com/M6yE-Wq-7Wq_pZ6-gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU=w240-h480-rw", // Placeholder
        desc: "일본 철도 여행의 최강자. JR 패스 사용자라면 필수! 정확한 열차 시간표와 플랫폼 번호, 지연 정보까지 실시간으로 확인할 수 있습니다. 외국인 관광객을 위한 재팬 레일 패스 옵션도 설정 가능합니다.",
        link: "https://play.google.com/store/apps/details?id=com.navitime.inbound.walk"
    },
    {
        name: "Payke",
        icon: "https://play-lh.googleusercontent.com/M6yE-Wq-7Wq_pZ6-gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU=w240-h480-rw", // Placeholder
        desc: "쇼핑 필수 앱! 드럭스토어나 마트에서 상품의 바코드를 스캔하면 한국어로 상세한 상품 정보를 보여줍니다. 화장품 성분이나 의약품 복용법을 확인할 때 매우 유용합니다.",
        link: "https://play.google.com/store/apps/details?id=jp.co.payke.payke"
    },
    {
        name: "XE Currency",
        icon: "https://play-lh.googleusercontent.com/M6yE-Wq-7Wq_pZ6-gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU=w240-h480-rw", // Placeholder
        desc: "실시간 환율 계산기. 엔화 가격을 입력하면 바로 원화로 얼마인지 계산해줍니다. 오프라인 모드도 지원하여 데이터가 없어도 대략적인 금액을 확인할 수 있습니다.",
        link: "https://play.google.com/store/apps/details?id=com.xe.currency"
    },
    {
        name: "Uber / GO",
        icon: "https://play-lh.googleusercontent.com/M6yE-Wq-7Wq_pZ6-gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU=w240-h480-rw", // Placeholder
        desc: "일본 택시 호출 앱. 일본 택시는 길에서 잡기 어려울 때가 많습니다. 카카오택시처럼 출발지와 목적지를 설정하여 택시를 부를 수 있고, 예상 요금도 미리 알 수 있어 바가지 요금 걱정이 없습니다.",
        link: "https://play.google.com/store/apps/details?id=com.ubercab"
    },
    {
        name: "Disney Resort / USJ App",
        icon: "https://play-lh.googleusercontent.com/M6yE-Wq-7Wq_pZ6-gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU=w240-h480-rw", // Placeholder
        desc: "테마파크 방문 예정이라면 필수! 대기 시간 확인, 쇼 스케줄, 지도, 그리고 DPA(유료 패스) 구매까지 앱 하나로 가능합니다. 도쿄 디즈니랜드나 오사카 유니버설 스튜디오 방문 시 꼭 설치하세요.",
        link: "https://play.google.com/store/apps/details?id=jp.co.usj.android.guide"
    },
    {
        name: "Tabelog (타베로그)",
        icon: "https://play-lh.googleusercontent.com/M6yE-Wq-7Wq_pZ6-gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU=w240-h480-rw", // Placeholder
        desc: "일본 현지인들이 쓰는 진짜 맛집 어플. 별점 3.5 이상이면 실패 없는 맛집입니다. 한국어 번역은 완벽하지 않지만, 현지 찐맛집을 찾고 싶다면 구글맵과 함께 교차 검증용으로 추천합니다.",
        link: "https://tabelog.com/"
    },
    {
        name: "Suica / Pasmo (Apple Wallet)",
        icon: "https://play-lh.googleusercontent.com/M6yE-Wq-7Wq_pZ6-gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU=w240-h480-rw", // Placeholder
        desc: "아이폰 사용자라면 지갑 앱에 교통카드를 넣어 다니세요. 실물 카드 없이 개찰구를 통과하고, 편의점이나 자판기에서도 결제할 수 있습니다. 잔액 확인과 충전도 폰에서 바로 가능합니다.",
        link: "https://www.jreast.co.jp/e/pass/suica.html"
    },
    {
        name: "Visit Japan Web",
        icon: "https://play-lh.googleusercontent.com/M6yE-Wq-7Wq_pZ6-gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU_gqU=w240-h480-rw", // Placeholder
        desc: "입국 수속을 빠르게! 일본 입국 시 필요한 검역, 입국 심사, 세관 신고를 미리 웹으로 등록하고 QR코드만 보여주면 됩니다. 공항에서의 대기 시간을 획기적으로 줄여줍니다.",
        link: "https://vjw-lp.digital.go.jp/en/"
    }
];

// 필수 어플 모달 열기
function showEssentialApps() {
    const modalHtml = `
        <div id="apps-modal" class="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 animate-fade-in p-4">
            <div class="bg-white rounded-3xl w-full max-w-4xl h-[90vh] flex flex-col relative overflow-hidden shadow-2xl">
                <!-- Header -->
                <div class="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex justify-between items-center shrink-0">
                    <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                            <i class="fas fa-mobile-alt text-2xl text-white"></i>
                        </div>
                        <div>
                            <h2 class="text-2xl font-black text-white">일본 여행 필수 앱 TOP 10</h2>
                            <p class="text-blue-100 text-sm">이것만 있으면 일본 여행 준비 끝!</p>
                        </div>
                    </div>
                    <button onclick="document.getElementById('apps-modal').remove()" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                        <i class="fas fa-times text-xl"></i>
                    </button>
                </div>

                <!-- Content -->
                <div class="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gray-50">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${essentialApps.map(app => `
                            <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all flex gap-4 group">
                                <div class="shrink-0">
                                    <div class="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden border border-gray-200 group-hover:border-blue-200 transition-colors">
                                        <!-- 실제 아이콘 대신 폰트어썸 사용하거나 이미지 URL 사용 -->
                                        <div class="w-full h-full flex items-center justify-center bg-white text-3xl text-gray-400">
                                            <i class="fas fa-cube"></i> 
                                        </div>
                                    </div>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h3 class="font-bold text-lg text-gray-800 mb-1 truncate">${app.name}</h3>
                                    <p class="text-xs text-gray-500 line-clamp-3 mb-3 leading-relaxed">${app.desc}</p>
                                    <a href="${app.link}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors">
                                        <i class="fab fa-google-play"></i> 설치하러 가기
                                    </a>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// 지역 선택 그리드 렌더링
function renderRegionSelection() {
    const container = document.getElementById('region-selection');
    if (!container) return;

    // 헤더 업데이트 (현재 위치 없음)
    updateTravelHeader('일본 여행 지역 선택');

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

// 헤더 업데이트 함수
function updateTravelHeader(title) {
    const headerTitle = document.querySelector('#japan_travel .header-title');
    if (headerTitle) headerTitle.textContent = title;
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
    updateTravelHeader(region.name); // 헤더 업데이트

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
    document.getElementById('region-selection').style.display = 'grid';
    document.getElementById('region-detail').style.display = 'none';
    currentRegion = null;
    renderRegionSelection();
}

// 전역 노출
window.initJapanTravel = initJapanTravel;
window.selectRegion = selectRegion;
window.backToRegionSelection = backToRegionSelection;
window.handleRegionClick = handleRegionClick;
window.closeLevelUpModal = closeLevelUpModal;
window.showEssentialApps = showEssentialApps;

console.log('japan_travel.js loaded');
