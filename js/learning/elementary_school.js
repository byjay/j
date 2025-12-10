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
function loadElementaryData() {
    console.log('[Elementary] Loading data...');

    // 각 학년 데이터 로드 (window에서 직접 가져옴)
    elementaryData.grade1 = window.grade1_data || null;
    elementaryData.grade2 = window.grade2_data || null;
    elementaryData.grade3 = window.grade3_data || null;
    elementaryData.grade4 = window.grade4_data || null;
    elementaryData.grade5 = window.grade5_data || null;
    elementaryData.grade6 = window.grade6_data || null;

    console.log('[Elementary] grade1_data:', elementaryData.grade1 ? 'loaded' : 'NOT FOUND');

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

    console.log('[Elementary] Data load complete');
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
        <!-- 🎓 환영 가이드 모달 -->
        <div id="elementary-welcome-modal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50" style="display: none;">
            <div class="bg-white rounded-3xl p-6 mx-4 max-w-md w-full text-center shadow-2xl animate-bounce-in">
                <div class="text-6xl mb-4 animate-bounce-character">🏫</div>
                <h3 class="text-2xl font-black text-gray-800 mb-3">일본 초등학교 입학을 환영합니다! 🎉</h3>
                
                <div class="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 mb-4 text-left">
                    <h4 class="font-bold text-orange-600 mb-2">📚 이 과정에서 배우게 됩니다:</h4>
                    <ul class="text-sm text-gray-700 space-y-1">
                        <li>✅ 일본어 기초 조사 (は, が, を, に, で, の)</li>
                        <li>✅ 기본 문장 구조와 문법</li>
                        <li>✅ 1학년~6학년 필수 한자 1,026자</li>
                        <li>✅ 2,000개 이상의 필수 어휘</li>
                    </ul>
                </div>

                <div class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-4 text-left">
                    <h4 class="font-bold text-blue-600 mb-2">🎮 미션 시스템:</h4>
                    <ul class="text-sm text-gray-700 space-y-1">
                        <li>🔑 각 미션을 <b>완료</b>하면 다음 미션이 <b>자동 해금</b>됩니다!</li>
                        <li>⭐ 미션 클리어 시 <b class="text-yellow-600">+50 XP</b> 획득!</li>
                        <li>🏆 학년을 모두 끝내면 다음 학년이 열려요!</li>
                        <li>🎯 1학년부터 차근차근 도전하세요!</li>
                    </ul>
                </div>

                <button onclick="closeWelcomeModal()" class="w-full py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition transform hover:scale-105">
                    📖 학습 시작하기!
                </button>
            </div>
        </div>

        <!-- 학년 선택 화면 (계단/피라미드 스타일) -->
        <div id="elementary-grades" class="container mx-auto px-4 pb-24">
            <div class="text-center mb-4">
                <h2 class="text-2xl font-bold text-gray-900 mb-1">🏫 일본 초등학교 입학하기</h2>
                <p class="text-gray-500 text-sm">계단을 올라 일본어 마스터가 되세요!</p>
                <button onclick="showWelcomeModal()" class="mt-2 text-blue-500 text-xs underline">
                    <i class="fas fa-info-circle mr-1"></i>과정 안내 보기
                </button>
            </div>
            
            <!-- 전체 진도 + XP 표시 -->
            <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-4 text-white mb-6 shadow-lg">
                <div class="flex justify-between items-center mb-2">
                    <span class="font-bold flex items-center gap-2">
                        <span class="animate-sparkle">⭐</span> 모험 진행률
                    </span>
                    <span id="total-progress-text" class="text-sm bg-white/20 px-2 py-1 rounded-full">0%</span>
                </div>
                <div class="bg-white/30 rounded-full h-4 overflow-hidden">
                    <div id="total-progress-bar" class="bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full h-4 transition-all animate-progress-fill" style="width: 0%"></div>
                </div>
                <p class="text-white/80 text-xs mt-2 text-center">🎯 미션을 완료하여 XP를 모으고 다음 학년을 해금하세요!</p>
            </div>
            
            <!-- 🏔️ 계단식 학년 피라미드 -->
            <div id="grade-pyramid" class="relative"></div>
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
// 학년 피라미드/계단 렌더링 (게임 스타일)
// ==========================================
function renderGradeGrid() {
    const pyramid = document.getElementById('grade-pyramid');
    if (!pyramid) return;

    const gradeInfo = [
        { grade: 1, kanji: 80, vocab: 200, icon: '🌸', color: 'from-pink-400 to-rose-500', xp: 500 },
        { grade: 2, kanji: 160, vocab: 300, icon: '🌷', color: 'from-purple-400 to-violet-500', xp: 800 },
        { grade: 3, kanji: 200, vocab: 400, icon: '🌻', color: 'from-amber-400 to-yellow-500', xp: 1200 },
        { grade: 4, kanji: 202, vocab: 450, icon: '🍀', color: 'from-emerald-400 to-green-500', xp: 1500 },
        { grade: 5, kanji: 193, vocab: 500, icon: '🌊', color: 'from-cyan-400 to-blue-500', xp: 2000 },
        { grade: 6, kanji: 191, vocab: 550, icon: '🌟', color: 'from-indigo-400 to-purple-500', xp: 2500 }
    ];

    // 순서대로 표시 (1학년이 위, 6학년이 아래)
    // reversedGrades 삭제하고 gradeInfo 직접 사용

    pyramid.innerHTML = `
        <div class="flex flex-col items-center space-y-3">
            <!-- 시작 (입학) -->
            <div class="text-center mb-2">
                <div class="text-4xl animate-bounce-character">�</div>
                <p class="text-xs text-gray-500 font-bold">입학!</p>
            </div>
            
            <!-- 순서대로 학년 카드 -->
            ${gradeInfo.map((info, index) => {
        const progress = elementaryProgress[info.grade];
        // 아빠(dad)는 모든 학년 잠금 해제
        const isDad = (typeof currentUser !== 'undefined' && currentUser && currentUser.id === 'dad');
        const isUnlocked = isDad || (progress && progress.unlocked);
        const completedMissions = progress ? Object.values(progress.missions).filter(s => s === 'completed').length : 0;
        const totalMissions = getMissionCount(info.grade);
        const progressPercent = totalMissions > 0 ? Math.round((completedMissions / totalMissions) * 100) : 0;
        const isCompleted = progressPercent === 100;
        const prevGrade = info.grade - 1;

        return `
                    <div class="relative w-full" style="max-width: ${300 + (5 - index) * 20}px;">
                        <!-- 연결선 (이전 학년으로) -->
                        ${info.grade < 6 ? `
                            <div class="absolute left-1/2 -top-3 w-1 h-3 bg-gradient-to-b ${isUnlocked ? 'from-green-400 to-green-300' : 'from-gray-300 to-gray-200'}"></div>
                        ` : ''}
                        
                        <!-- 학년 카드 -->
                        <div onclick="${isUnlocked ? `selectGrade(${info.grade})` : `showLockedGradeAlert(${info.grade})`}"
                             class="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 
                                    ${isUnlocked ? 'hover:-translate-y-1 hover:shadow-xl hover:scale-105' : 'opacity-50 grayscale'} 
                                    ${isCompleted ? 'ring-4 ring-yellow-400 ring-offset-2' : ''}">
                            
                            <div class="bg-gradient-to-r ${info.color} p-4 text-white">
                                <div class="flex items-center justify-between">
                                    <!-- 왼쪽: 아이콘 + 학년 정보 -->
                                    <div class="flex items-center gap-3">
                                        <div class="text-4xl ${isUnlocked ? 'animate-bounce-character' : ''}" style="animation-delay: ${index * 0.1}s;">
                                            ${isCompleted ? '✅' : info.icon}
                                        </div>
                                        <div>
                                            <h3 class="text-xl font-black">${info.grade}학년</h3>
                                            <p class="text-white/80 text-xs">한자 ${info.kanji}자 · ${info.vocab}+ 단어</p>
                                        </div>
                                    </div>
                                    
                                    <!-- 오른쪽: 상태 표시 -->
                                    <div class="text-right">
                                        ${!isUnlocked ? `
                                            <div class="flex flex-col items-center">
                                                <i class="fas fa-lock text-2xl text-white/60 lock-shake"></i>
                                                <span class="text-xs text-white/60 mt-1">${prevGrade}학년 완료 필요</span>
                                            </div>
                                        ` : isCompleted ? `
                                            <div class="flex flex-col items-center">
                                                <span class="text-2xl animate-sparkle">🏆</span>
                                                <span class="text-xs text-white/80">완료!</span>
                                            </div>
                                        ` : `
                                            <div class="flex flex-col items-center">
                                                <span class="text-lg font-bold">${progressPercent}%</span>
                                                <span class="text-xs text-white/80">진행중</span>
                                            </div>
                                        `}
                                    </div>
                                </div>
                                
                                <!-- 진행 바 -->
                                ${isUnlocked ? `
                                    <div class="mt-3 bg-white/20 rounded-full h-2 overflow-hidden">
                                        <div class="bg-white rounded-full h-2 transition-all" style="width: ${progressPercent}%"></div>
                                    </div>
                                ` : ''}
                                
                                <!-- XP 보상 표시 -->
                                <div class="mt-2 flex justify-between items-center">
                                    <span class="text-xs text-white/70">
                                        ${totalMissions > 0 ? `${completedMissions}/${totalMissions} 미션` : '준비중...'}
                                    </span>
                                    <span class="text-xs bg-yellow-400/30 text-yellow-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                        <span class="animate-sparkle">⭐</span> ${info.xp} XP
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    }).join('')}
            
            <!-- 시작점 -->
            <div class="text-center mt-2">
                <div class="text-3xl">🚀</div>
                <p class="text-xs text-gray-500 font-bold">시작!</p>
            </div>
        </div>
    `;

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

// 학년 잠금 알림 (상세 버전)
function showLockedGradeAlert(grade) {
    const prevGrade = grade - 1;
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/70 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full text-center shadow-2xl animate-bounce-in">
            <div class="text-5xl mb-4 lock-shake">🔒</div>
            <h3 class="text-xl font-bold text-gray-800 mb-2">${grade}학년은 아직 잠겨있어요!</h3>
            <p class="text-gray-600 mb-4">
                먼저 <b class="text-pink-500">${prevGrade}학년 과정</b>을 모두 완료해주세요.
            </p>
            <div class="bg-yellow-50 rounded-xl p-3 mb-4">
                <p class="text-sm text-yellow-700">
                    💡 <b>팁:</b> ${prevGrade}학년의 모든 미션을 클리어하면<br>
                    자동으로 ${grade}학년이 해금됩니다!
                </p>
            </div>
            <button onclick="this.closest('.fixed').remove()" 
                    class="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold shadow-lg">
                알겠어요! 🚀
            </button>
        </div>
    `;
    document.body.appendChild(modal);

    // 배경 클릭시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });
}

// 환영 모달 표시
function showWelcomeModal() {
    const modal = document.getElementById('elementary-welcome-modal');
    if (modal) modal.style.display = 'flex';
}

// 환영 모달 닫기
function closeWelcomeModal() {
    const modal = document.getElementById('elementary-welcome-modal');
    if (modal) modal.style.display = 'none';

    // 첫 방문 표시 저장
    localStorage.setItem('elementary_welcomed', 'true');
}

// ==========================================
// 초기화
// ==========================================
async function initElementarySchool() {
    await loadElementaryData();
    injectElementaryHTML();
    renderGradeGrid();

    // 첫 방문시 환영 모달 표시
    const hasVisited = localStorage.getItem('elementary_welcomed');
    if (!hasVisited) {
        setTimeout(() => showWelcomeModal(), 500);
    }

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
window.showLockedGradeAlert = showLockedGradeAlert;
window.showWelcomeModal = showWelcomeModal;
window.closeWelcomeModal = closeWelcomeModal;
window.triggerConfetti = triggerConfetti;

console.log('elementary_school.js loaded');
