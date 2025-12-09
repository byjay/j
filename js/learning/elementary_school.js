/**
 * elementary_school.js - 일본 초등학교 입학하기 학습 모듈
 * 
 * 1학년~6학년 단계별 미션 기반 학습 시스템
 * - 각 학년별 한자, 어휘, 문법 학습
 * - 미션 클리어 방식으로 다음 단계 해금
 * - 진도 저장 및 성취도 표시
 */

// ==========================================
// 전역 변수
// ==========================================
let elementaryData = {
    grade1: null,
    grade2: null,
    grade3: null,
    grade4: null,
    grade5: null,
    grade6: null
};

let currentGrade = 1;
let currentMission = 0;
let currentMissionWords = [];
let currentMissionIndex = 0;
let elementaryProgress = {};

// ==========================================
// 데이터 로드
// ==========================================
async function loadElementaryData() {
    try {
        // 각 학년 데이터 로드 (이미 window에 노출되어 있다고 가정)
        if (typeof grade1_data !== 'undefined') elementaryData.grade1 = grade1_data;
        if (typeof grade2_data !== 'undefined') elementaryData.grade2 = grade2_data;
        if (typeof grade3_data !== 'undefined') elementaryData.grade3 = grade3_data;
        if (typeof grade4_data !== 'undefined') elementaryData.grade4 = grade4_data;
        if (typeof grade5_data !== 'undefined') elementaryData.grade5 = grade5_data;
        if (typeof grade6_data !== 'undefined') elementaryData.grade6 = grade6_data;

        // 저장된 진도 로드
        const savedProgress = localStorage.getItem('elementary_progress');
        if (savedProgress) {
            elementaryProgress = JSON.parse(savedProgress);
        } else {
            // 초기화 - 1학년 1번 미션만 해금
            elementaryProgress = {
                1: { unlocked: true, missions: { 0: 'available' } },
                2: { unlocked: false, missions: {} },
                3: { unlocked: false, missions: {} },
                4: { unlocked: false, missions: {} },
                5: { unlocked: false, missions: {} },
                6: { unlocked: false, missions: {} }
            };
        }

        console.log('[Elementary] 데이터 로드 완료');
    } catch (error) {
        console.error('[Elementary] 데이터 로드 실패:', error);
    }
}

// 진도 저장
function saveElementaryProgress() {
    localStorage.setItem('elementary_progress', JSON.stringify(elementaryProgress));
}

// ==========================================
// HTML 구조 주입
// ==========================================
function injectElementaryHTML() {
    const container = document.getElementById('elementary-school');
    if (!container) return;

    container.innerHTML = `
        <!-- 학년 선택 화면 -->
        <div id="elementary-grades" class="container mx-auto px-4 pb-24">
            <div class="text-center mb-6">
                <h2 class="text-2xl font-bold text-gray-900 mb-2">🏫 일본 초등학교 입학하기</h2>
                <p class="text-gray-500 text-sm">1~6학년 과정을 단계별로 정복하세요!</p>
            </div>
            
            <!-- 전체 진도 표시 -->
            <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 text-white mb-6">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold">📊 전체 진행률</span>
                    <span id="total-progress-text" class="text-sm">0%</span>
                </div>
                <div class="bg-white/30 rounded-full h-3">
                    <div id="total-progress-bar" class="bg-white rounded-full h-3 transition-all" style="width: 0%"></div>
                </div>
            </div>
            
            <!-- 학년 그리드 -->
            <div id="grade-grid" class="grid grid-cols-2 gap-4"></div>
        </div>
        
        <!-- 미션 선택 화면 -->
        <div id="elementary-missions" class="container mx-auto px-4 pb-24" style="display: none;">
            <div class="flex items-center mb-6">
                <button onclick="backToGrades()" class="mr-4 text-gray-600 hover:text-gray-900">
                    <i class="fas fa-arrow-left text-xl"></i>
                </button>
                <div>
                    <h2 id="grade-title" class="text-xl font-bold text-gray-900"></h2>
                    <p id="grade-subtitle" class="text-sm text-gray-500"></p>
                </div>
            </div>
            
            <!-- 학년 진도 -->
            <div class="bg-gray-100 rounded-xl p-3 mb-6 flex items-center justify-between">
                <span class="text-sm font-medium text-gray-600">이 학년 진행률</span>
                <div class="flex items-center gap-2">
                    <div class="w-32 bg-gray-300 rounded-full h-2">
                        <div id="grade-progress-bar" class="bg-green-500 rounded-full h-2 transition-all" style="width: 0%"></div>
                    </div>
                    <span id="grade-progress-text" class="text-sm font-bold text-green-600">0%</span>
                </div>
            </div>
            
            <!-- 미션 리스트 -->
            <div id="mission-list" class="space-y-3"></div>
        </div>
        
        <!-- 학습 화면 -->
        <div id="elementary-learning" class="container mx-auto px-4 pb-24" style="display: none;">
            <div class="flex items-center justify-between mb-4">
                <button onclick="backToMissions()" class="text-gray-600 hover:text-gray-900">
                    <i class="fas fa-arrow-left text-xl"></i>
                </button>
                <h3 id="mission-title" class="text-lg font-bold text-gray-800"></h3>
                <div class="w-8"></div>
            </div>
            
            <!-- 진도 표시 -->
            <div class="bg-gray-100 rounded-xl p-3 mb-6">
                <div class="flex justify-between text-sm text-gray-600 mb-1">
                    <span>학습 진행</span>
                    <span id="learning-progress-text">0 / 0</span>
                </div>
                <div class="bg-gray-300 rounded-full h-2">
                    <div id="learning-progress-bar" class="bg-blue-500 rounded-full h-2 transition-all" style="width: 0%"></div>
                </div>
            </div>
            
            <!-- 학습 카드 -->
            <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <!-- 카드 앞면 (일본어) -->
                <div id="card-front" class="p-8 text-center">
                    <div id="word-kanji" class="text-5xl font-bold text-gray-800 mb-4"></div>
                    <div id="word-kana" class="text-2xl text-gray-500 mb-2"></div>
                    <div id="word-romaji" class="text-lg text-gray-400 mb-6"></div>
                    <button onclick="playElementaryAudio()" class="w-16 h-16 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 shadow-sm mx-auto flex items-center justify-center mb-6">
                        <i class="fas fa-volume-up text-2xl"></i>
                    </button>
                    <button onclick="flipCardToBack()" class="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition">
                        뜻 확인하기 <i class="fas fa-chevron-right ml-2"></i>
                    </button>
                </div>
                
                <!-- 카드 뒷면 (한국어/영어) -->
                <div id="card-back" class="p-8 text-center bg-gradient-to-b from-green-50 to-white" style="display: none;">
                    <div id="word-korean" class="text-4xl font-bold text-green-600 mb-2"></div>
                    <div id="word-english" class="text-xl text-gray-500 mb-4"></div>
                    <div id="word-category" class="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm mb-6"></div>
                    
                    <div class="flex gap-3">
                        <button onclick="markAsKnown(false)" class="flex-1 py-4 bg-orange-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition">
                            <i class="fas fa-redo mr-2"></i>다시 볼래요
                        </button>
                        <button onclick="markAsKnown(true)" class="flex-1 py-4 bg-green-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition">
                            <i class="fas fa-check mr-2"></i>알았어요!
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- 네비게이션 -->
            <div class="flex justify-between items-center mt-6">
                <button id="prev-word-btn" onclick="previousWord()" class="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold">
                    <i class="fas fa-chevron-left mr-2"></i>이전
                </button>
                <button id="next-word-btn" onclick="nextWord()" class="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold">
                    다음<i class="fas fa-chevron-right ml-2"></i>
                </button>
            </div>
        </div>
        
        <!-- 미션 완료 모달 -->
        <div id="mission-complete-modal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50" style="display: none;">
            <div class="bg-white rounded-2xl p-8 mx-4 max-w-sm w-full text-center animate-bounce-in">
                <div class="text-6xl mb-4">🎉</div>
                <h3 class="text-2xl font-bold text-gray-800 mb-2">미션 클리어!</h3>
                <p class="text-gray-500 mb-6">다음 미션이 해금되었습니다!</p>
                <div id="xp-earned" class="bg-yellow-100 text-yellow-800 rounded-xl py-3 px-4 font-bold mb-6">
                    +50 XP 획득!
                </div>
                <button onclick="closeMissionComplete()" class="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold shadow-lg">
                    계속하기
                </button>
            </div>
        </div>
    `;
}

// ==========================================
// 학년 그리드 렌더링
// ==========================================
function renderGradeGrid() {
    const grid = document.getElementById('grade-grid');
    if (!grid) return;

    const gradeInfo = [
        { grade: 1, kanji: 80, vocab: 200, icon: '🌸', color: 'from-pink-400 to-pink-500' },
        { grade: 2, kanji: 160, vocab: 300, icon: '🌷', color: 'from-purple-400 to-purple-500' },
        { grade: 3, kanji: 200, vocab: 400, icon: '🌻', color: 'from-yellow-400 to-yellow-500' },
        { grade: 4, kanji: 202, vocab: 450, icon: '🍀', color: 'from-green-400 to-green-500' },
        { grade: 5, kanji: 193, vocab: 500, icon: '🌊', color: 'from-blue-400 to-blue-500' },
        { grade: 6, kanji: 191, vocab: 550, icon: '🌟', color: 'from-indigo-400 to-indigo-500' }
    ];

    grid.innerHTML = gradeInfo.map(info => {
        const progress = elementaryProgress[info.grade];
        const isUnlocked = progress && progress.unlocked;
        const completedMissions = progress ? Object.values(progress.missions).filter(s => s === 'completed').length : 0;
        const totalMissions = getMissionCount(info.grade);
        const progressPercent = totalMissions > 0 ? Math.round((completedMissions / totalMissions) * 100) : 0;

        return `
            <div onclick="${isUnlocked ? `selectGrade(${info.grade})` : 'showLockedAlert()'}" 
                 class="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition hover:-translate-y-1 hover:shadow-xl ${!isUnlocked ? 'opacity-60' : ''}">
                <div class="bg-gradient-to-br ${info.color} p-5 text-white">
                    <div class="text-3xl mb-2">${info.icon}</div>
                    <h3 class="text-xl font-bold mb-1">${info.grade}학년</h3>
                    <p class="text-white/80 text-xs">한자 ${info.kanji}자 · ${info.vocab}+ 단어</p>
                    
                    ${!isUnlocked ? `
                        <div class="absolute top-3 right-3">
                            <i class="fas fa-lock text-white/50 text-xl"></i>
                        </div>
                    ` : `
                        <div class="mt-3 bg-white/20 rounded-full h-2">
                            <div class="bg-white rounded-full h-2" style="width: ${progressPercent}%"></div>
                        </div>
                        <p class="text-white/80 text-xs mt-1">${progressPercent}% 완료</p>
                    `}
                </div>
            </div>
        `;
    }).join('');

    updateTotalProgress();
}

// 총 미션 수 계산
function getMissionCount(grade) {
    const data = elementaryData[`grade${grade}`];
    if (!data || !data.vocabulary) return 0;

    // 20개 단어당 1미션
    return Math.ceil(data.vocabulary.length / 20);
}

// 전체 진도 업데이트
function updateTotalProgress() {
    let totalMissions = 0;
    let completedMissions = 0;

    for (let grade = 1; grade <= 6; grade++) {
        totalMissions += getMissionCount(grade);
        const progress = elementaryProgress[grade];
        if (progress && progress.missions) {
            completedMissions += Object.values(progress.missions).filter(s => s === 'completed').length;
        }
    }

    const percent = totalMissions > 0 ? Math.round((completedMissions / totalMissions) * 100) : 0;

    const bar = document.getElementById('total-progress-bar');
    const text = document.getElementById('total-progress-text');
    if (bar) bar.style.width = `${percent}%`;
    if (text) text.textContent = `${percent}%`;
}

// ==========================================
// 학년 선택
// ==========================================
function selectGrade(grade) {
    currentGrade = grade;

    document.getElementById('elementary-grades').style.display = 'none';
    document.getElementById('elementary-missions').style.display = 'block';

    const gradeData = elementaryData[`grade${grade}`];
    const titleEl = document.getElementById('grade-title');
    const subtitleEl = document.getElementById('grade-subtitle');

    if (titleEl) titleEl.textContent = `${grade}학년 과정`;
    if (subtitleEl && gradeData) subtitleEl.textContent = gradeData.info.description;

    renderMissionList();
}

// 미션 리스트 렌더링
function renderMissionList() {
    const list = document.getElementById('mission-list');
    if (!list) return;

    const gradeData = elementaryData[`grade${currentGrade}`];
    if (!gradeData || !gradeData.vocabulary) {
        list.innerHTML = '<p class="text-center text-gray-500">데이터를 불러오는 중...</p>';
        return;
    }

    const vocab = gradeData.vocabulary;
    const missionCount = getMissionCount(currentGrade);
    const progress = elementaryProgress[currentGrade] || { missions: {} };

    let completedCount = 0;

    list.innerHTML = Array.from({ length: missionCount }, (_, i) => {
        const startIdx = i * 20;
        const endIdx = Math.min(startIdx + 20, vocab.length);
        const missionWords = vocab.slice(startIdx, endIdx);

        const status = progress.missions[i] || 'locked';
        if (status === 'completed') completedCount++;

        const isLocked = status === 'locked';
        const isCompleted = status === 'completed';
        const isAvailable = status === 'available';

        // 카테고리 추출
        const categories = [...new Set(missionWords.map(w => w.category))].slice(0, 3);

        return `
            <div onclick="${!isLocked ? `startMission(${i})` : 'showLockedAlert()'}" 
                 class="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition ${isLocked ? 'opacity-50' : ''}">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${isCompleted ? 'bg-green-100' : isAvailable ? 'bg-blue-100' : 'bg-gray-100'
            }">
                        ${isCompleted ? '✅' : isLocked ? '🔒' : `📖`}
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-gray-800">미션 ${i + 1}: ${categories.join(' · ')}</h4>
                        <p class="text-sm text-gray-500">${missionWords.length}개 단어 학습</p>
                    </div>
                    <div class="text-gray-400">
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // 학년 진도 업데이트
    const percent = missionCount > 0 ? Math.round((completedCount / missionCount) * 100) : 0;
    const bar = document.getElementById('grade-progress-bar');
    const text = document.getElementById('grade-progress-text');
    if (bar) bar.style.width = `${percent}%`;
    if (text) text.textContent = `${percent}%`;
}

// ==========================================
// 미션 시작
// ==========================================
function startMission(missionIndex) {
    currentMission = missionIndex;
    currentMissionIndex = 0;

    const gradeData = elementaryData[`grade${currentGrade}`];
    if (!gradeData) return;

    const startIdx = missionIndex * 20;
    const endIdx = Math.min(startIdx + 20, gradeData.vocabulary.length);
    currentMissionWords = gradeData.vocabulary.slice(startIdx, endIdx);

    document.getElementById('elementary-missions').style.display = 'none';
    document.getElementById('elementary-learning').style.display = 'block';

    const titleEl = document.getElementById('mission-title');
    if (titleEl) titleEl.textContent = `${currentGrade}학년 미션 ${missionIndex + 1}`;

    displayCurrentWord();
    updateLearningProgress();
}

// 현재 단어 표시
function displayCurrentWord() {
    const word = currentMissionWords[currentMissionIndex];
    if (!word) return;

    // 앞면 표시
    document.getElementById('card-front').style.display = 'block';
    document.getElementById('card-back').style.display = 'none';

    document.getElementById('word-kanji').textContent = word.kanji || word.kana;
    document.getElementById('word-kana').textContent = word.kana;
    document.getElementById('word-romaji').textContent = word.romaji;
    document.getElementById('word-korean').textContent = word.korean;
    document.getElementById('word-english').textContent = word.english || '';
    document.getElementById('word-category').textContent = word.category;
}

// 카드 뒤집기
function flipCardToBack() {
    document.getElementById('card-front').style.display = 'none';
    document.getElementById('card-back').style.display = 'block';
}

// 학습 진도 업데이트
function updateLearningProgress() {
    const total = currentMissionWords.length;
    const current = currentMissionIndex + 1;
    const percent = Math.round((current / total) * 100);

    const bar = document.getElementById('learning-progress-bar');
    const text = document.getElementById('learning-progress-text');
    if (bar) bar.style.width = `${percent}%`;
    if (text) text.textContent = `${current} / ${total}`;

    // 버튼 상태
    const prevBtn = document.getElementById('prev-word-btn');
    const nextBtn = document.getElementById('next-word-btn');
    if (prevBtn) prevBtn.style.opacity = currentMissionIndex === 0 ? '0.5' : '1';
    if (nextBtn) nextBtn.style.opacity = currentMissionIndex === total - 1 ? '0.5' : '1';
}

// 이전/다음 단어
function previousWord() {
    if (currentMissionIndex > 0) {
        currentMissionIndex--;
        displayCurrentWord();
        updateLearningProgress();
    }
}

function nextWord() {
    if (currentMissionIndex < currentMissionWords.length - 1) {
        currentMissionIndex++;
        displayCurrentWord();
        updateLearningProgress();
    }
}

// 알았어요/다시 볼래요
function markAsKnown(known) {
    if (currentMissionIndex < currentMissionWords.length - 1) {
        nextWord();
    } else {
        // 미션 완료!
        completeMission();
    }
}

// 미션 완료
function completeMission() {
    // 현재 미션 완료 처리
    if (!elementaryProgress[currentGrade]) {
        elementaryProgress[currentGrade] = { unlocked: true, missions: {} };
    }
    elementaryProgress[currentGrade].missions[currentMission] = 'completed';

    // 다음 미션 해금
    const nextMission = currentMission + 1;
    const totalMissions = getMissionCount(currentGrade);

    if (nextMission < totalMissions) {
        elementaryProgress[currentGrade].missions[nextMission] = 'available';
    } else if (currentGrade < 6) {
        // 다음 학년 해금
        elementaryProgress[currentGrade + 1] = { unlocked: true, missions: { 0: 'available' } };
    }

    saveElementaryProgress();

    // XP 추가
    if (window.addXP) {
        window.addXP(50, 'elementary_mission');
    }

    // 🎉 축하 폭죽 효과
    triggerConfetti();

    // 모달 표시
    document.getElementById('mission-complete-modal').style.display = 'flex';
}

// 폭죽 효과
function triggerConfetti() {
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#1dd1a1'];
    const container = document.createElement('div');
    container.className = 'particle-container';
    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = `${Math.random() * 100}vw`;
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = `${Math.random() * 0.5}s`;
        piece.style.animationDuration = `${2 + Math.random() * 2}s`;
        container.appendChild(piece);
    }

    // 3초 후 컨테이너 제거
    setTimeout(() => container.remove(), 4000);
}

// XP 플라이업 표시
function showXPFlyup(amount) {
    const flyup = document.createElement('div');
    flyup.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-black text-yellow-500 animate-xp-flyup z-50';
    flyup.textContent = `+${amount} XP`;
    document.body.appendChild(flyup);
    setTimeout(() => flyup.remove(), 1500);
}

function closeMissionComplete() {
    document.getElementById('mission-complete-modal').style.display = 'none';
    backToMissions();
}

// 음성 재생
function playElementaryAudio() {
    const word = currentMissionWords[currentMissionIndex];
    if (!word) return;

    const text = word.kanji || word.kana;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

// ==========================================
// 네비게이션
// ==========================================
function backToGrades() {
    document.getElementById('elementary-missions').style.display = 'none';
    document.getElementById('elementary-grades').style.display = 'block';
    renderGradeGrid();
}

function backToMissions() {
    document.getElementById('elementary-learning').style.display = 'none';
    document.getElementById('elementary-missions').style.display = 'block';
    renderMissionList();
}

function showLockedAlert() {
    alert('이전 단계를 먼저 완료해주세요! 🔒');
}

// ==========================================
// 초기화
// ==========================================
async function initElementarySchool() {
    await loadElementaryData();
    injectElementaryHTML();
    renderGradeGrid();
    console.log('[Elementary School] 모듈 초기화 완료');
}

// 전역 노출
window.initElementarySchool = initElementarySchool;
window.selectGrade = selectGrade;
window.startMission = startMission;
window.backToGrades = backToGrades;
window.backToMissions = backToMissions;
window.flipCardToBack = flipCardToBack;
window.previousWord = previousWord;
window.nextWord = nextWord;
window.markAsKnown = markAsKnown;
window.playElementaryAudio = playElementaryAudio;
window.closeMissionComplete = closeMissionComplete;
window.showLockedAlert = showLockedAlert;

console.log('elementary_school.js loaded');
