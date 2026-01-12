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
    // 각 학년 데이터 로드 (window에서 직접 가져옴 - 변수명 다양성 대응)
    // 각 학년 데이터 로드 (window에서 직접 가져옴 - 변수명 다양성 대응)
    const mergeData = (g) => {
        const enh = window[`grade${g}_enhanced_data`];
        const org = window[`grade${g}_data`];

        // 1. Enhanced 데이터가 있으면 우선 사용
        if (enh) {
            // 단, vocabulary가 없거나 배열이 아니면(placeholder인 경우) 원본에서 가져옴
            if (!enh.vocabulary || !Array.isArray(enh.vocabulary)) {
                if (org && Array.isArray(org.vocabulary)) {
                    enh.vocabulary = org.vocabulary;
                }
            }
            return enh;
        }
        return org || [];
    };

    elementaryData.grade1 = mergeData(1);
    elementaryData.grade2 = mergeData(2);
    elementaryData.grade3 = mergeData(3);
    elementaryData.grade4 = mergeData(4);
    elementaryData.grade5 = mergeData(5);
    elementaryData.grade6 = mergeData(6);

    // 데이터 로드 확인 및 비상 더미 데이터 주입
    if (!elementaryData.grade1 || elementaryData.grade1.length === 0) {
        console.warn('[Elementary] Grade 1 data missing! Injecting dummy data.');
        elementaryData.grade1 = [
            { id: 'g1_m1', type: 'word', question: 'あ', answer: 'a', options: ['a', 'i', 'u', 'e'] },
            { id: 'g1_m2', type: 'word', question: 'い', answer: 'i', options: ['a', 'i', 'u', 'e'] }
        ];
    }

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
        <!-- 🎓 환영 가이드 모달 (Premium Glassmorphism) -->
        <div id="elementary-welcome-modal" class="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 backdrop-blur-xl" style="display: none;">
            <div class="bg-white rounded-[48px] p-8 mx-4 max-w-md w-full text-center shadow-2xl border-4 border-white animate-fade-in-up">
                <div class="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <span class="text-5xl animate-bounce-character">🏫</span>
                </div>
                <h3 class="text-3xl font-black text-slate-800 mb-4 tracking-tighter">일본 초등학교 입학! 🎉</h3>
                
                <div class="space-y-3 mb-8">
                    <div class="bg-indigo-50/50 rounded-3xl p-5 text-left border border-indigo-100/50">
                        <h4 class="font-black text-indigo-600 text-sm mb-2 flex items-center gap-2">
                            <i class="fas fa-book-open"></i> 무엇을 배우나요?
                        </h4>
                        <ul class="text-xs text-slate-600 space-y-2 font-bold leading-relaxed">
                            <li class="flex items-center gap-2"><i class="fas fa-check text-indigo-400"></i> 기초 조사 (은/는, 이/가, 을/를 등)</li>
                            <li class="flex items-center gap-2"><i class="fas fa-check text-indigo-400"></i> 필수 한자 1,026자 마스터</li>
                            <li class="flex items-center gap-2"><i class="fas fa-check text-indigo-400"></i> 2,000개 이상의 상용 어휘</li>
                        </ul>
                    </div>

                    <div class="bg-amber-50/50 rounded-3xl p-5 text-left border border-amber-100/50">
                        <h4 class="font-black text-amber-600 text-sm mb-2 flex items-center gap-2">
                            <i class="fas fa-trophy"></i> 미션 보상
                        </h4>
                        <p class="text-xs text-slate-600 font-bold leading-relaxed">
                            각 미션을 완료할 때마다 <span class="text-amber-600">+50 XP</span>를 획득하며, 모든 미션을 클리어하면 다음 학년이 해금됩니다!
                        </p>
                    </div>
                </div>

                <button onclick="closeWelcomeModal()" class="w-full py-5 bg-slate-900 text-white rounded-[32px] font-black shadow-2xl hover:bg-black transition-all active:scale-95 text-lg">
                    공부 시작하기! 🚀
                </button>
            </div>
        </div>

        <!-- 학년 선택 화면 (Premium Grid) -->
        <div id="elementary-grades" class="container mx-auto px-4 pb-24 pt-4">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-black text-slate-900 mb-2 tracking-tighter">일본 초등학교 탐험</h2>
                <div class="inline-flex items-center gap-4">
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-slate-200 transition-colors" onclick="showWelcomeModal()">
                        <i class="fas fa-info-circle text-indigo-500"></i> 가이드 보기
                    </div>
                    <div class="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-600 rounded-full text-[10px] font-black text-white uppercase tracking-widest cursor-pointer hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:scale-105 active:scale-95" onclick="showGrammarTransformer()">
                        <i class="fas fa-magic"></i> AI 문장 변환기
                    </div>
                </div>
            </div>
            
            <!-- 전체 진도 + XP 표시 (Premium Card) -->
            <div class="bg-slate-900 rounded-[40px] p-8 text-white mb-10 shadow-2xl shadow-slate-200 relative overflow-hidden group">
                <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
                <div class="flex justify-between items-end mb-4 relative z-10">
                    <div>
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Total Adventure</p>
                        <h3 class="text-2xl font-black italic">Quest Progress</h3>
                    </div>
                    <span id="total-progress-text" class="text-4xl font-black italic opacity-20">0%</span>
                </div>
                <div class="bg-white/10 rounded-full h-3 overflow-hidden mb-4 relative z-10">
                    <div id="total-progress-bar" class="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full h-full transition-all duration-1000" style="width: 0%"></div>
                </div>
                <div class="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest relative z-10">
                    <i class="fas fa-meteor animate-pulse text-orange-500"></i>
                    Keep going to unlock Grade 6!
                </div>
            </div>
            
            <!-- 🏔️ 학년 리스트 -->
            <div id="grade-pyramid" class="grid grid-cols-1 gap-4"></div>
        </div>
        
        <!-- 미션 선택 화면 -->
        <div id="elementary-missions" class="container mx-auto px-4 pb-24 pt-4" style="display: none;">
            <div id="mission-header-premium" class="mb-10 animate-fade-in-up">
                 <button onclick="handleGlobalBack()" class="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-slate-400 hover:text-slate-800 transition-all active:scale-90 mb-6 border border-slate-100">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <p id="grade-subtitle" class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2"></p>
                <h2 id="grade-title" class="text-4xl font-black text-slate-900 tracking-tighter"></h2>
            </div>
            
            <!-- 학년 진도 -->
            <div class="bg-slate-50 rounded-[32px] p-6 mb-10 flex items-center justify-between border border-slate-100">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-300">
                        <i class="fas fa-flag-checkered text-xs"></i>
                    </div>
                    <div>
                        <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Grade Stats</p>
                        <span class="text-xs font-black text-slate-800">Mastery Level</span>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <div class="w-32 bg-slate-200 rounded-full h-2">
                        <div id="grade-progress-bar" class="bg-slate-900 rounded-full h-2 transition-all duration-700" style="width: 0%"></div>
                    </div>
                    <span id="grade-progress-text" class="text-sm font-black text-slate-900 italic">0%</span>
                </div>
            </div>
            
            <!-- 미션 리스트 -->
            <div id="mission-list" class="space-y-4"></div>
        </div>
        
        <!-- 학습 화면 -->
        <div id="elementary-learning" class="container mx-auto px-4 pb-24 pt-4" style="display: none;">
            <div class="flex items-center justify-between mb-8 animate-fade-in">
                <button onclick="handleGlobalBack()" class="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center text-slate-400">
                    <i class="fas fa-times"></i>
                </button>
                <div class="text-center">
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Mission Active</p>
                    <h3 id="mission-title" class="text-sm font-black text-slate-800"></h3>
                </div>
                <div class="w-10"></div>
            </div>
            
            <!-- 진도 표시 -->
            <div class="px-2 mb-10">
                <div class="flex justify-between items-end mb-3">
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Learning Progress</span>
                    <span id="learning-progress-text" class="text-sm font-black text-slate-800 italic">0 / 0</span>
                </div>
                <div class="bg-slate-100 rounded-full h-2 shadow-inner">
                    <div id="learning-progress-bar" class="bg-slate-900 rounded-full h-2 transition-all duration-500" style="width: 0%"></div>
                </div>
            </div>
            
            <!-- 학습 카드 (Premium Study Unit) -->
            <div id="premium-study-unit" class="bg-white rounded-[48px] shadow-2xl shadow-slate-200 overflow-hidden border-4 border-white min-h-[420px] flex flex-col relative animate-fade-in-up">
                <!-- 카드 앞면 -->
                <div id="card-front" class="flex-1 flex flex-col p-8 pt-12 items-center text-center">
                    <div class="w-16 h-1 bg-slate-100 rounded-full mb-12"></div>
                    <div id="word-kanji" class="text-7xl font-black text-slate-900 mb-6 drop-shadow-sm tracking-tighter"></div>
                    <div id="word-kana" class="text-2xl font-bold text-slate-400 mb-2"></div>
                    <div id="word-romaji" class="text-xs font-black text-slate-300 uppercase tracking-[0.3em] mb-12"></div>
                    
                    <div class="mt-auto w-full space-y-4">
                        <button onclick="playElementaryAudio()" class="w-14 h-14 rounded-full bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all mx-auto flex items-center justify-center shadow-sm active:scale-90">
                            <i class="fas fa-volume-up text-xl"></i>
                        </button>
                        <button onclick="flipCardToBack()" class="w-full py-5 bg-slate-900 text-white rounded-[32px] font-black shadow-2xl active:scale-95 transition-all text-sm uppercase tracking-widest">
                            Reveal Meaning <i class="fas fa-chevron-right ml-2 text-[10px]"></i>
                        </button>
                    </div>
                </div>
                
                <!-- 카드 뒷면 -->
                <div id="card-back" class="flex-1 flex flex-col p-8 pt-12 items-center text-center bg-slate-50/50" style="display: none;">
                    <div class="w-16 h-1 bg-slate-200 rounded-full mb-12"></div>
                    <div id="word-korean" class="text-5xl font-black text-slate-900 mb-4 tracking-tighter"></div>
                    <div id="word-english" class="hidden"></div>
                    <div id="word-category" class="inline-block px-4 py-2 bg-white shadow-sm border border-slate-100 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest mb-12"></div>
                    
                    <div class="mt-auto w-full grid grid-cols-2 gap-4">
                        <button onclick="markAsKnown(false)" class="py-5 bg-white text-slate-400 rounded-[32px] font-black shadow-lg hover:text-slate-600 transition-all active:scale-95 text-xs uppercase tracking-widest border border-slate-100">
                            <i class="fas fa-redo mr-2 text-[10px]"></i> Review
                        </button>
                        <button onclick="markAsKnown(true)" class="py-5 bg-slate-900 text-white rounded-[32px] font-black shadow-2xl active:scale-95 transition-all text-xs uppercase tracking-widest">
                            <i class="fas fa-check mr-2 text-[10px]"></i> Mastered
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- 네비게이션 -->
            <div class="flex justify-between items-center mt-10 px-4">
                <button id="prev-word-btn" onclick="previousWord()" class="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-800 transition-colors">
                    <i class="fas fa-arrow-left"></i> Prev
                </button>
                <div class="flex gap-1.5">
                    <div class="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    <div class="w-3 h-1.5 rounded-full bg-slate-900"></div>
                    <div class="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                </div>
                <button id="next-word-btn" onclick="nextWord()" class="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-800 transition-colors">
                    Next <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
        
        <!-- 🎉 미션 완료 모달 (Premium Success) -->
        <div id="mission-complete-modal" class="fixed inset-0 bg-slate-900/60 flex items-center justify-center z-50 backdrop-blur-xl" style="display: none;">
            <div class="bg-white rounded-[48px] p-10 mx-4 max-w-sm w-full text-center shadow-2xl border-4 border-white animate-fade-in-up">
                <div class="w-24 h-24 bg-green-50 rounded-[32px] flex items-center justify-center mx-auto mb-6">
                    <span class="text-5xl animate-bounce">🎉</span>
                </div>
                <h3 class="text-3xl font-black text-slate-800 mb-2 tracking-tighter">Mission Clear!</h3>
                <p class="text-slate-400 font-bold mb-8">다음 모험이 당신을 기다립니다!</p>
                <div id="xp-earned" class="bg-slate-900 text-white rounded-3xl py-4 px-6 font-black mb-8 shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
                    <span class="text-yellow-400 text-xl">⭐</span> +50 XP 획득!
                </div>
                <button onclick="closeMissionComplete()" class="w-full py-5 bg-indigo-600 text-white rounded-[32px] font-black shadow-2xl hover:bg-indigo-700 transition-all active:scale-95 text-lg">
                    Keep Going!
                </button>
            </div>
        </div>

        <!-- 🤖 AI 문법 변환기 모달 (Premium Modal) -->
        <div id="grammar-transformer-modal" class="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex flex-col animate-fade-in" style="display: none;">
            <div class="bg-white/80 backdrop-blur-xl p-6 flex justify-between items-center shadow-2xl shadow-slate-200 shrink-0 border-b border-white/20">
                <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200">
                        <i class="fas fa-magic"></i>
                    </div>
                    <div>
                        <h2 class="text-xl font-black text-slate-800 tracking-tighter italic">
                            Sentence <span class="text-indigo-600">AI Master</span>
                        </h2>
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Powered by JAP-BONG AI</p>
                    </div>
                </div>
                <button onclick="closeGrammarTransformer()" 
                    class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center active:scale-90">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>
            <div class="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full no-scrollbar">
                <div id="grammar-content"></div>
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
        { grade: 1, kanji: 80, vocab: 200, icon: '🌸', color: 'from-pink-500 to-red-600', xp: 500, label: 'Early Bloom' },
        { grade: 2, kanji: 160, vocab: 300, icon: '🌷', color: 'from-purple-500 to-indigo-600', xp: 800, label: 'Steady Growth' },
        { grade: 3, kanji: 200, vocab: 400, icon: '🌻', color: 'from-amber-500 to-orange-600', xp: 1200, label: 'Bright Horizon' },
        { grade: 4, kanji: 202, vocab: 450, icon: '🍀', color: 'from-emerald-500 to-green-600', xp: 1500, label: 'Deep Roots' },
        { grade: 5, kanji: 193, vocab: 500, icon: '🌊', color: 'from-cyan-500 to-blue-600', xp: 2000, label: 'Rising Tide' },
        { grade: 6, kanji: 191, vocab: 550, icon: '🌟', color: 'from-indigo-600 to-slate-900', xp: 2500, label: 'Zenith Star' }
    ];

    pyramid.innerHTML = gradeInfo.map((info, index) => {
        const progress = elementaryProgress[info.grade];
        const isDad = (typeof currentUser !== 'undefined' && currentUser && currentUser.id === 'dad');
        const isUnlocked = isDad || (progress && progress.unlocked);
        const completedMissions = progress ? Object.values(progress.missions).filter(s => s === 'completed').length : 0;
        const totalMissions = getMissionCount(info.grade);
        const progressPercent = totalMissions > 0 ? Math.round((completedMissions / totalMissions) * 100) : 0;
        const isCompleted = progressPercent === 100;

        return `
            <div class="relative animate-fade-in-up" style="animation-delay: ${index * 100}ms">
                <div onclick="${isUnlocked ? `selectGrade(${info.grade})` : `showLockedGradeAlert(${info.grade})`}"
                     class="vocab-item bg-white p-2 rounded-[40px] shadow-xl shadow-slate-200/50 cursor-pointer group transition-all duration-500 hover:-translate-y-2 relative overflow-hidden ${!isUnlocked ? 'opacity-60' : ''}">
                    
                    <div class="flex items-center gap-6 p-4">
                        <!-- Grade Icon/Badge -->
                        <div class="w-24 h-24 rounded-[32px] bg-gradient-to-br ${info.color} flex items-center justify-center text-4xl shadow-xl relative shrink-0">
                            ${isCompleted ? '<i class="fas fa-check-circle text-white absolute -top-2 -right-2 text-2xl animate-sparkle"></i>' : ''}
                            <span class="${isUnlocked ? 'animate-bounce-character' : 'grayscale'}">${info.icon}</span>
                            <div class="absolute inset-x-0 bottom-0 py-1 bg-black/20 text-[9px] font-black text-white uppercase tracking-widest text-center rounded-b-[32px]">Grade ${info.grade}</div>
                        </div>

                        <!-- Info Area -->
                        <div class="flex-1 min-w-0">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest font-mono">${info.label}</span>
                                ${isUnlocked ? '<span class="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>' : ''}
                            </div>
                            <h3 class="text-2xl font-black text-slate-800 leading-none mb-2 tracking-tighter group-hover:text-red-600 transition-colors uppercase italic">${info.grade}학년</h3>
                            <div class="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <span class="flex items-center gap-1"><i class="fas fa-pen-nib text-slate-300"></i> ${info.kanji} Kanji</span>
                                <span class="flex items-center gap-1"><i class="fas fa-book text-slate-300"></i> ${info.vocab}+ Vocab</span>
                            </div>
                        </div>

                        <!-- Status Area -->
                        <div class="text-right pr-4">
                            ${!isUnlocked ? `
                                <div class="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-200 border border-slate-100">
                                    <i class="fas fa-lock text-sm"></i>
                                </div>
                            ` : `
                                <div class="flex flex-col items-end">
                                    <span class="text-2xl font-black italic text-slate-800 leading-none">${progressPercent}%</span>
                                    <span class="text-[8px] font-black text-slate-400 uppercase tracking-tighter mt-1">${completedMissions}/${totalMissions} Missions</span>
                                </div>
                            `}
                        </div>
                    </div>

                    <!-- Progress Bar (Bottom) -->
                    ${isUnlocked ? `
                        <div class="absolute inset-x-0 bottom-0 h-1.5 bg-slate-50 overflow-hidden">
                            <div class="h-full bg-gradient-to-r ${info.color} transition-all duration-1000" style="width: ${progressPercent}%"></div>
                        </div>
                    ` : ''}
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

    // 리스트 초기화
    list.innerHTML = '';

    // [New] 1학년 문법 교과서 버튼 (Premium Upgrade)
    if (currentGrade === 1 && gradeData.chapters) {
        list.innerHTML += `
            <div onclick="showGrammarBook()" 
                 class="bg-slate-900 rounded-[32px] p-8 shadow-2xl shadow-slate-200 cursor-pointer hover:shadow-slate-300 hover:scale-[1.02] transition-all mb-8 group relative overflow-hidden">
                <div class="absolute -right-6 -bottom-6 opacity-10 transform rotate-12 transition-transform group-hover:rotate-0">
                    <i class="fas fa-book-open text-9xl text-white"></i>
                </div>
                <div class="flex items-center gap-6 relative z-10">
                    <div class="w-20 h-20 rounded-[28px] bg-white/10 backdrop-blur-sm flex items-center justify-center text-4xl shadow-inner group-hover:bg-white/20 transition-all">
                        📚
                    </div>
                    <div class="flex-1">
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1 italic">Premium Edition</p>
                        <h3 class="text-2xl font-black text-white mb-2 tracking-tighter">1학년 일본어 교과서</h3>
                        <p class="text-slate-400 text-xs font-bold leading-relaxed">히라가나, 기본 조사, 문장 구조를 완벽하게 마스터하세요.</p>
                    </div>
                    <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-xs group-hover:bg-red-500 transition-colors">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-4 mb-8">
                <div class="h-px bg-slate-100 flex-1"></div>
                <span class="text-[8px] font-black text-slate-300 uppercase tracking-widest whitespace-nowrap">Primary Missions</span>
                <div class="h-px bg-slate-100 flex-1"></div>
            </div>
        `;
    }

    // 미션 리스트 추가 (Premium Mission Cards)
    list.innerHTML += Array.from({ length: missionCount }, (_, i) => {
        const startIdx = i * 20;
        const endIdx = Math.min(startIdx + 20, vocab.length);
        const missionWords = vocab.slice(startIdx, endIdx);

        const status = progress.missions[i] || 'locked';
        if (status === 'completed') completedCount++;

        const isLocked = status === 'locked';
        const isCompleted = status === 'completed';
        const isAvailable = status === 'available';

        const categories = [...new Set(missionWords.map(w => w.category))].slice(0, 3);

        return `
            <div onclick="${!isLocked ? `startMission(${i})` : 'showLockedAlert()'}" 
                 class="bg-white rounded-[28px] p-5 shadow-xl shadow-slate-100 group cursor-pointer hover:shadow-slate-200 transition-all border border-slate-50 relative overflow-hidden ${isLocked ? 'opacity-50' : ''}">
                <div class="flex items-center gap-5 relative z-10">
                    <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-all ${isCompleted ? 'bg-green-50 text-green-500' : isAvailable ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'bg-slate-50 text-slate-300'
            }">
                        ${isCompleted ? '<i class="fas fa-check"></i>' : isLocked ? '<i class="fas fa-lock text-sm"></i>' : i + 1}
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-0.5">
                            <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mission ${i + 1}</span>
                            ${isAvailable ? '<span class="px-1.5 py-0.5 bg-red-500 text-white text-[7px] font-black rounded uppercase">Next Up</span>' : ''}
                        </div>
                        <h4 class="text-base font-black text-slate-800 tracking-tight">${categories.join(' · ')}</h4>
                        <p class="text-[10px] text-slate-400 font-bold">${missionWords.length} Essential Words</p>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1">
                        <i class="fas fa-chevron-right text-[10px]"></i>
                    </div>
                </div>
                ${isCompleted ? '<div class="absolute inset-y-0 left-0 w-1 bg-green-500"></div>' : ''}
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

    // Premium Layout Control (Flex display)
    const front = document.getElementById('card-front');
    const back = document.getElementById('card-back');
    if (front) front.style.display = 'flex';
    if (back) back.style.display = 'none';

    const kanji = document.getElementById('word-kanji');
    const kana = document.getElementById('word-kana');
    const romaji = document.getElementById('word-romaji');
    const korean = document.getElementById('word-korean');
    const category = document.getElementById('word-category');

    if (kanji) kanji.textContent = word.kanji || word.kana;
    if (kana) kana.textContent = word.kana;
    if (romaji) romaji.textContent = (word.romaji || '').toUpperCase();
    if (korean) korean.textContent = word.korean;

    // Premium Category Badge Styling
    if (category) {
        const categoryText = word.category ? word.category : 'General';
        category.textContent = categoryText;
    }
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

// [New] 문법 교과서 보기
function showGrammarBook() {
    const gradeData = elementaryData[`grade${currentGrade}`];
    if (!gradeData || !gradeData.chapters) {
        alert('이 학년에는 교과서 데이터가 없습니다.');
        return;
    }

    const modal = document.createElement('div');
    modal.id = 'grammar-book-modal';
    modal.className = 'fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex flex-col animate-fade-in';
    modal.innerHTML = `
        <!-- 헤더 (Premium Header) -->
        <div class="bg-white/80 backdrop-blur-xl p-6 flex justify-between items-center shadow-2xl shadow-slate-200 shrink-0 border-b border-white/20">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                    <i class="fas fa-book-open"></i>
                </div>
                <div>
                    <h2 class="text-xl font-black text-slate-800 tracking-tighter italic">
                        Grade ${currentGrade} <span class="text-indigo-600">Textbook</span>
                    </h2>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Primary Language Course</p>
                </div>
            </div>
            <button onclick="document.getElementById('grammar-book-modal').remove()" 
                class="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center active:scale-90">
                <i class="fas fa-times text-xl"></i>
            </button>
        </div>
        
        <!-- 콘텐츠 영역 (Premium List) -->
        <div class="flex-1 overflow-y-auto p-6 bg-slate-50/50 max-w-2xl mx-auto w-full space-y-8 no-scrollbar scroll-smooth">
            <div class="text-center mb-10 mt-4">
                <div class="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-600 text-[10px] font-black rounded-full uppercase tracking-[0.3em] mb-4">Official Curriculum</div>
                <h3 class="text-3xl font-black text-slate-800 tracking-tighter mb-2">일본어 기초 교과서</h3>
                <p class="text-sm font-bold text-slate-400">일본 초등학교 1학년 수준의 핵심 문법과 표현을 배웁니다.</p>
            </div>

            ${gradeData.chapters.map(chapter => `
                <div class="space-y-4">
                    <div class="flex items-center gap-3">
                        <span class="text-[10px] font-black text-slate-300 uppercase tracking-widest">Chapter ${chapter.order}</span>
                        <div class="h-px bg-slate-200 flex-1"></div>
                    </div>
                    <div class="bg-white rounded-[32px] shadow-xl shadow-slate-100 border border-slate-50 overflow-hidden group">
                        <div class="bg-slate-900 p-8 relative overflow-hidden">
                            <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                            <h3 class="text-2xl font-black text-white tracking-tighter mb-1 relative z-10">${chapter.title}</h3>
                            <p class="text-slate-400 text-sm font-bold relative z-10">${chapter.subtitle}</p>
                        </div>
                        
                        <div class="p-4 space-y-3">
                            ${chapter.lessons.map(lesson => `
                                <div class="bg-slate-50 rounded-2xl overflow-hidden transition-all duration-300 border border-transparent hover:border-slate-200">
                                    <div class="p-6 cursor-pointer flex justify-between items-center group/item" 
                                         onclick="toggleLesson('lesson-${lesson.lesson_id}')">
                                        <div class="flex items-center gap-4">
                                            <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-sm font-black text-slate-400 group-hover/item:text-indigo-600 shadow-sm transition-colors">
                                                ${lesson.order}
                                            </div>
                                            <h4 class="font-black text-slate-700 tracking-tight group-hover/item:text-slate-900 transition-colors">
                                                ${lesson.title}
                                            </h4>
                                        </div>
                                        <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-300 transition-transform duration-300" id="icon-lesson-${lesson.lesson_id}">
                                            <i class="fas fa-chevron-down text-xs"></i>
                                        </div>
                                    </div>
                                    <div id="lesson-${lesson.lesson_id}" class="hidden bg-white border-t border-slate-100 p-8 text-sm leading-relaxed animate-fade-in text-slate-600">
                                        ${renderLessonContent(lesson)}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `).join('')}
            
            <div class="text-center py-16">
                <div class="w-16 h-16 bg-white rounded-2xl shadow-xl shadow-slate-200 flex items-center justify-center mx-auto mb-4 text-emerald-500">
                    <i class="fas fa-check-circle text-2xl"></i>
                </div>
                <h4 class="text-lg font-black text-slate-800 tracking-tighter">Congratulations!</h4>
                <p class="text-xs font-bold text-slate-400 mt-1">교과서의 모든 과정을 완료하셨습니다.</p>
                <button onclick="document.getElementById('grammar-book-modal').remove()" 
                    class="mt-8 px-8 py-3 bg-slate-900 text-white text-xs font-black rounded-full shadow-2xl hover:bg-black transition-all active:scale-95 uppercase tracking-widest">
                    Study Complete
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// 🤖 AI 문법 변환기 열기
function showGrammarTransformer() {
    const modal = document.getElementById('grammar-transformer-modal');
    if (!modal) return;

    modal.style.display = 'flex';

    // GrammarPractice 렌더링 (grammar.js에 정의됨)
    if (typeof GrammarPractice !== 'undefined') {
        GrammarPractice.render();
    }
}

// 🤖 AI 문법 변환기 닫기
function closeGrammarTransformer() {
    const modal = document.getElementById('grammar-transformer-modal');
    if (modal) modal.style.display = 'none';
}

// 레슨 내용 렌더링 도우미
function renderLessonContent(lesson) {
    const c = lesson.content;
    if (!c) return '';

    let html = '';

    // 도입부
    if (c.introduction) {
        html += `<div class="bg-blue-50 text-blue-800 p-3 rounded-lg mb-4 text-sm font-medium whitespace-pre-line">${c.introduction}</div>`;
    }

    // Key Points
    if (c.key_points) {
        html += `<div class="space-y-3 mb-4">`;
        c.key_points.forEach(point => {
            html += `
                <div class="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <h5 class="font-bold text-indigo-600 mb-1">📌 ${point.title}</h5>
                    <p class="text-gray-700 mb-2">${point.explanation}</p>
                    ${point.example ? `<div class="bg-gray-50 p-2 rounded text-gray-600 text-xs font-mono border-l-2 border-gray-300">${point.example}</div>` : ''}
                    ${point.note ? `<p class="mt-2 text-xs text-orange-600 bg-orange-50 inline-block px-2 py-1 rounded">💡 ${point.note}</p>` : ''}
                </div>
            `;
        });
        html += `</div>`;
    }

    // Grammar Point
    if (c.grammar_point) {
        html += `
            <div class="bg-indigo-50 border-2 border-indigo-100 rounded-xl p-4 mb-4 text-center">
                <div class="text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1">Grammar Point</div>
                <div class="text-3xl font-black text-indigo-600 mb-1">${c.grammar_point}</div>
                <div class="text-sm text-indigo-400">${c.korean_equivalent}</div>
            </div>
        `;
    }

    // Detailed Explanation & Lists
    if (c.detailed_explanation) {
        html += `<ul class="list-disc pl-5 space-y-1 mb-4 text-gray-700">`;
        c.detailed_explanation.forEach(exp => html += `<li>${exp}</li>`);
        html += `</ul>`;
    }

    // Structure
    if (c.structure) {
        html += `
            <div class="bg-gray-800 text-white p-3 rounded-lg mb-4 font-mono text-center shadow-md">
                <div class="text-[10px] text-gray-400 mb-1">SENTENCE STRUCTURE</div>
                ${c.structure}
            </div>
        `;
    }

    // Forms (활용)
    if (c.forms) {
        html += `<div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">`;
        Object.entries(c.forms).forEach(([key, val]) => {
            html += `
                <div class="bg-white border border-gray-200 p-3 rounded-lg">
                    <div class="text-xs text-gray-400 font-bold uppercase mb-1">${key}</div>
                    <div class="font-bold text-indigo-600 text-lg">${val.form}</div>
                    <div class="text-xs text-gray-500">${val.meaning}</div>
                    <div class="mt-1 text-xs text-gray-400 bg-gray-50 p-1 rounded">${val.example}</div>
                </div>
            `;
        });
        html += `</div>`;
    }

    // Examples
    if (c.examples) {
        html += `<h5 class="font-bold text-gray-800 mb-2 border-b pb-1">💬 예문</h5><div class="space-y-2 mb-4">`;
        c.examples.forEach(ex => {
            html += `
                <div class="bg-emerald-50 border border-emerald-100 p-3 rounded-lg relative overflow-hidden group hover:shadow-md transition">
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-emerald-400"></div>
                    <div class="pl-2">
                        <div class="font-bold text-gray-800 text-lg mb-1">${ex.japanese}</div>
                        ${ex.reading ? `<div class="text-xs text-gray-400 mb-1">${ex.reading}</div>` : ''}
                        <div class="text-emerald-700 font-medium">${ex.korean}</div>
                        ${ex.breakdown ? `<div class="text-xs text-gray-400 mt-1 pt-1 border-t border-emerald-100/50">${ex.breakdown}</div>` : ''}
                        ${ex.note ? `<div class="text-xs text-orange-500 mt-1">💡 ${ex.note}</div>` : ''}
                    </div>
                    <button onclick="speakText('${ex.japanese}')" class="absolute right-2 top-2 w-8 h-8 flex items-center justify-center rounded-full bg-white text-emerald-500 shadow-sm opacity-50 group-hover:opacity-100 transition">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
            `;
        });
        html += `</div>`;
    }

    // Comparison (for wa/ga, ni/de etc)
    if (c.comparison) {
        html += `<div class="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-4">`;
        html += `<h5 class="font-bold text-orange-700 mb-2">⚖️ ${c.comparison.title || '비교'}</h5>`;
        if (c.comparison.table) {
            c.comparison.table.forEach(row => {
                html += `<div class="flex gap-2 text-sm mb-1"><span class="font-bold w-8 text-center bg-white rounded">${row.particle}</span> <span class="text-gray-700">${row.example}</span></div>`;
            });
        }
        if (c.comparison.examples) {
            c.comparison.examples.forEach(ex => {
                html += `<div class="mb-2 text-sm"><div class="font-bold text-orange-600">${ex.particle} : ${ex.japanese}</div><div class="text-xs text-gray-500">${ex.nuance}</div></div>`;
            });
        }
        if (c.comparison.rules) {
            html += `<ul class="list-disc pl-5 mt-2 text-xs text-orange-800 space-y-1">` + c.comparison.rules.map(r => `<li>${r}</li>`).join('') + `</ul>`;
        }
        html += `</div>`;
    }

    // Practice Sentences
    if (c.practice_sentences) {
        html += `<h5 class="font-bold text-gray-800 mb-2 mt-4">✍️ 연습해보기</h5><div class="space-y-2">`;
        c.practice_sentences.forEach((p, idx) => {
            html += `
                <div class="bg-gray-100 p-3 rounded-lg text-sm">
                    <div class="font-medium text-gray-700 mb-2">Q${idx + 1}. ${p.korean}</div>
                    <div class="hidden text-indigo-600 font-bold bg-white p-2 rounded border border-indigo-100" id="ans-${lesson.lesson_id}-${idx}">${p.answer}</div>
                    <button onclick="document.getElementById('ans-${lesson.lesson_id}-${idx}').classList.remove('hidden'); this.remove()" class="text-xs bg-gray-200 px-2 py-1 rounded text-gray-600 hover:bg-gray-300">정답 보기</button>
                </div>
            `;
        });
        html += `</div>`;
    }

    if (c.summary) {
        html += `<div class="mt-4 p-3 bg-gray-800 text-white rounded-lg text-center text-sm font-medium">✨ ${c.summary}</div>`;
    }

    return html;
}

// 레슨 토글
window.toggleLesson = function (id) {
    const el = document.getElementById(id);
    const icon = document.getElementById('icon-' + id);
    if (el) {
        el.classList.toggle('hidden');
        if (icon) icon.classList.toggle('rotate-180');
    }
}

// 텍스트 읽기 (TTS)
window.speakText = function (text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
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

// [New] AI 문장 변환기 열기 (Grammar Practice 모달 연계)
function showGrammarTransformer() {
    console.log('[Elementary] showGrammarTransformer called');
    // Grammar 탭으로 전환하거나 별도 모달 표시 가능
    if (typeof showTab === 'function') {
        showTab('conversation'); // 대화/문법 탭으로 이동
        setTimeout(() => {
            if (typeof showConversationMode === 'function') {
                showConversationMode('grammar'); // 문법 모드 강제 진입
            }
        }, 300);
    } else {
        alert('AI 문장 변환기 기능을 준비 중입니다.');
    }
}

// [New] 1학년 교과서 보기
function showGrammarBook() {
    console.log('[Elementary] showGrammarBook called');

    let modal = document.getElementById('grammar-book-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'grammar-book-modal';
        document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fade-in';
    modal.innerHTML = `
        <div class="bg-white rounded-[40px] shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col animate-bounce-in border-4 border-white">
            <div class="p-8 bg-slate-900 text-white relative">
                <button onclick="this.closest('#grammar-book-modal').remove()" class="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all">
                    <i class="fas fa-times"></i>
                </button>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Premium Textbook</p>
                <h2 class="text-3xl font-black tracking-tighter">1학년 일본어 교과서 📚</h2>
            </div>
            <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
                <div class="space-y-8">
                    <div class="bg-indigo-50/50 rounded-3xl p-6 border border-indigo-100">
                        <h4 class="font-black text-indigo-600 mb-2">제1장: 기초 문자</h4>
                        <p class="text-sm font-bold text-slate-600 leading-relaxed">히라가나 50음도와 카타카나의 기본 발음을 익힙니다.</p>
                    </div>
                    <div class="bg-amber-50/50 rounded-3xl p-6 border border-amber-100 italic">
                        <h4 class="font-black text-amber-600 mb-2">Coming Soon...</h4>
                        <p class="text-sm font-bold text-slate-500 leading-relaxed">보다 상세한 교과서 내용은 현재 업데이트 중입니다.</p>
                    </div>
                </div>
            </div>
            <div class="p-6 bg-slate-50 border-t border-slate-100 text-center">
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Master Level: 12%</p>
                <button onclick="this.closest('#grammar-book-modal').remove()" class="w-full py-4 bg-slate-900 text-white rounded-3xl font-black shadow-xl active:scale-95 transition-all">
                    확인
                </button>
            </div>
        </div>
    `;

    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
}

// showElementaryMenu - 초등학교 메뉴 표시 함수
function showElementaryMenu() {
    console.log('[Elementary] showElementaryMenu called');

    // 먼저 초등학교 탭으로 전환
    if (typeof showTab === 'function') {
        showTab('elementary');
    }

    // elementary-school 컨테이너 확인 및 초기화
    const container = document.getElementById('elementary-school');
    if (container) {
        container.classList.remove('hidden');
        // 초기화가 안 되어 있으면 초기화
        if (!container.innerHTML.trim() || container.innerHTML.includes('로딩')) {
            initElementarySchool();
        }
    } else {
        console.warn('[Elementary] elementary-school container not found, initializing...');
        initElementarySchool();
    }
}

// 전역 노출
window.showElementaryMenu = showElementaryMenu;
window.initElementarySchool = initElementarySchool;
window.showGrammarTransformer = showGrammarTransformer;
window.showGrammarBook = showGrammarBook;
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
