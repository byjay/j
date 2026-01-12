/**
 * vocabulary.js - 단어 학습 모듈
 */

// 전역 변수
let vocabModuleData = {};
let currentCategory = '';
let currentWordIndex = 0;
let currentWords = [];

// 단어 데이터 로드 및 처리
function processVocabularyData() {
    if (typeof wordList !== 'undefined') {
        // wordList(words_data.js)를 카테고리별로 그룹화
        vocabModuleData = wordList.reduce((acc, item) => {
            if (!acc[item.category]) acc[item.category] = [];
            acc[item.category].push({
                word: item.japanese_word,
                pronunciation: item.reading + ' ' + item.pronunciation,
                translation: item.korean_meaning,
                romaji: item.reading
            });
            return acc;
        }, {});
        console.log('단어 데이터 처리 완료:', Object.keys(vocabModuleData));
    } else {
        console.error('wordList가 정의되지 않았습니다. js/words_data.js를 확인하세요.');
    }
}

// HTML 구조 주입 (Premium Reform)
function injectVocabularyHTML() {
    const container = document.getElementById('vocabulary');
    if (!container) return;

    container.innerHTML = `
        <div id="vocabulary-categories" class="animate-fade-in">
            <div class="flex items-center justify-between mb-8 px-2">
                <div>
                   <h2 class="text-2xl font-black text-slate-800 tracking-tight">📚 단어장</h2>
                   <p class="text-slate-500 text-xs font-medium">카테고리별 필수 단어를 학습하세요</p>
                </div>
            </div>
            <!-- Premium Category Grid (Using shared design tokens) -->
            <div id="vocabulary-category-grid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-1 pb-24"></div>
        </div>
        
        <div id="vocabulary-word-section" style="display: none;" class="animate-fade-in">
            <div class="flex items-center justify-between mb-6 px-1">
                <button onclick="backToVocabularyCategories()" class="bg-white/80 backdrop-blur-md px-3 py-2 rounded-2xl text-slate-600 font-black text-xs shadow-sm hover:shadow-md transition active:scale-95 flex items-center gap-2 border border-white">
                    <i class="fas fa-chevron-left text-[10px]"></i> 목록
                </button>
                <div class="px-4 py-1.5 bg-slate-100 rounded-full border border-slate-200">
                    <h3 id="current-category-title" class="text-xs font-black text-slate-600 uppercase tracking-widest text-center"></h3>
                </div>
                <button id="vocab-autoplay-btn" onclick="startVocabularyAutoPlay()" class="bg-emerald-500 text-white px-4 py-2 rounded-2xl shadow-lg shadow-emerald-200 hover:brightness-110 transition active:scale-95 font-black text-xs flex items-center gap-2">
                    <i class="fas fa-play text-[10px]"></i> 자동재생
                </button>
            </div>

            <div class="relative bg-white rounded-[40px] shadow-2xl p-8 text-center border border-slate-100 overflow-hidden group max-w-xs mx-auto">
                <!-- Background Decorative Element -->
                <div class="absolute -top-10 -right-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
                
                <div id="vocabulary-word" class="text-7xl font-black mb-4 text-slate-800 tracking-tighter transition-all duration-300 transform group-hover:scale-105"></div>
                <div id="vocabulary-pronunciation" class="text-xl text-slate-400 mb-6 font-bold tracking-wide italic"></div>
                <div id="vocabulary-translation" class="text-4xl text-blue-600 font-black mb-12 drop-shadow-sm"></div>
                
                <div class="flex justify-between items-center mb-10 px-6">
                    <button id="vocab-prev-btn" onclick="previousVocabulary()" class="w-14 h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-400 transition active:scale-90 flex items-center justify-center border border-slate-100">
                        <i class="fas fa-chevron-left text-lg"></i>
                    </button>
                    <button onclick="playVocabularyAudio()" class="w-24 h-24 rounded-full bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-200 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center border-8 border-white">
                        <i class="fas fa-volume-up text-3xl"></i>
                    </button>
                    <button id="vocab-next-btn" onclick="nextVocabulary()" class="w-14 h-14 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-400 transition active:scale-90 flex items-center justify-center border border-slate-100">
                        <i class="fas fa-chevron-right text-lg"></i>
                    </button>
                </div>
                
                <!-- Premium Progress Bar -->
                <div class="relative px-4">
                    <div class="flex mb-3 items-end justify-between">
                        <span class="text-[10px] font-black text-slate-400 tracking-tighter uppercase italic">Learning Mastery</span>
                        <span id="vocabulary-progress-text" class="text-xs font-black text-blue-600 font-mono">0 / 0</span>
                    </div>
                    <div class="overflow-hidden h-3 flex rounded-full bg-slate-100 p-0.5 border border-slate-50 shadow-inner">
                        <div id="vocabulary-progress" style="width:0%" class="rounded-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg transition-all duration-500 ease-out"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 단어 학습 초기화
function initVocabulary() {
    processVocabularyData();
    injectVocabularyHTML();
    createVocabularyCategories();
}

// 카테고리 카드 생성 (Premium Cards)
function createVocabularyCategories() {
    const grid = document.getElementById('vocabulary-category-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const categoryStyles = {
        '가족': { icon: 'fas fa-users', color: 'red' },
        '음식': { icon: 'fas fa-utensils', color: 'orange' },
        '동물': { icon: 'fas fa-paw', color: 'amber' },
        '색깔': { icon: 'fas fa-palette', color: 'purple' },
        '숫자': { icon: 'fas fa-calculator', color: 'slate' },
        '시간': { icon: 'fas fa-clock', color: 'blue' },
        '인사': { icon: 'fas fa-hand-paper', color: 'emerald' },
        '기타': { icon: 'fas fa-star', color: 'indigo' }
    };

    Object.keys(vocabModuleData).forEach(category => {
        const style = categoryStyles[category] || { icon: 'fas fa-book', color: 'blue' };
        const card = document.createElement('div');
        card.className = `vocab-item bg-gradient-to-br from-white to-${style.color}-50 cursor-pointer group hover:border-${style.color}-400 animate-fade-in-up`;
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div class="bg-${style.color}-500 text-white p-2 rounded-2xl shadow-lg shadow-${style.color}-200 group-hover:scale-110 transition-transform">
                    <i class="${style.icon} text-lg"></i>
                </div>
                <span class="bg-${style.color}-100 text-${style.color}-600 px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tight">${category === '음식' ? '맛있다' : '필수'}</span>
            </div>
            <h3 class="text-base font-black text-slate-800 mb-1 tracking-tight">${category}</h3>
            <p class="text-[10px] text-slate-500 font-bold">${vocabModuleData[category].length}개의 단어가 있어요</p>
        `;

        card.onclick = () => selectVocabularyCategory(category);
        grid.appendChild(card);
    });
}

// 카테고리 선택
function selectVocabularyCategory(category) {
    currentCategory = category;
    currentWordIndex = 0;
    currentWords = vocabModuleData[category] || [];

    if (currentWords.length === 0) {
        console.warn('선택한 카테고리에 단어가 없습니다.');
        return;
    }

    document.getElementById('vocabulary-categories').style.display = 'none';
    document.getElementById('vocabulary-word-section').style.display = 'block';

    // 카테고리 제목 설정
    const titleEl = document.getElementById('current-category-title');
    if (titleEl) titleEl.textContent = category;

    displayCurrentVocabulary();
    updateVocabularyProgress();
    updateVocabularyNavigation();
}

// 현재 단어 표시
function displayCurrentVocabulary() {
    const index = currentWordIndex;
    const word = currentWords[index];

    if (!word) return;

    const wordElement = document.getElementById('vocabulary-word');
    const pronunciationElement = document.getElementById('vocabulary-pronunciation');
    const translationElement = document.getElementById('vocabulary-translation');

    if (wordElement) wordElement.textContent = word.word;
    if (pronunciationElement) pronunciationElement.textContent = word.pronunciation;
    if (translationElement) translationElement.textContent = word.translation;
}

// 진도 업데이트
function updateVocabularyProgress() {
    const total = currentWords.length;
    const current = currentWordIndex + 1;
    const percentage = (current / total) * 100;

    const progressBar = document.getElementById('vocabulary-progress');
    const progressText = document.getElementById('vocabulary-progress-text');

    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (progressText) progressText.textContent = `${current} / ${total}`;
}

// 네비게이션 버튼 업데이트
function updateVocabularyNavigation() {
    const prevBtn = document.getElementById('vocab-prev-btn');
    const nextBtn = document.getElementById('vocab-next-btn');

    if (prevBtn) {
        prevBtn.disabled = currentWordIndex === 0;
        prevBtn.style.opacity = currentWordIndex === 0 ? '0.3' : '1';
        prevBtn.style.cursor = currentWordIndex === 0 ? 'not-allowed' : 'pointer';
    }

    if (nextBtn) {
        nextBtn.disabled = currentWordIndex === currentWords.length - 1;
        nextBtn.style.opacity = currentWordIndex === currentWords.length - 1 ? '0.3' : '1';
        nextBtn.style.cursor = currentWordIndex === currentWords.length - 1 ? 'not-allowed' : 'pointer';
    }
}

// 이전 단어
function previousVocabulary() {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        displayCurrentVocabulary();
        updateVocabularyProgress();
        updateVocabularyNavigation();
    }
}

// 다음 단어
function nextVocabulary() {
    if (currentWordIndex < currentWords.length - 1) {
        currentWordIndex++;
        displayCurrentVocabulary();
        updateVocabularyProgress();
        updateVocabularyNavigation();
    }
}

// 카테고리로 돌아가기
function backToVocabularyCategories() {
    document.getElementById('vocabulary-categories').style.display = 'block';
    document.getElementById('vocabulary-word-section').style.display = 'none';
    currentCategory = '';
    currentWordIndex = 0;
    currentWords = [];
}

// 발음 듣기
function playVocabularyAudio() {
    const word = currentWords[currentWordIndex];
    if (word && word.word) {
        // playAudio 함수는 index.html 또는 다른 js 파일에 정의되어 있어야 함
        if (typeof playAudio === 'function') {
            playAudio(word.word);
        } else {
            console.warn('playAudio function not found');
            // Fallback TTS
            const utterance = new SpeechSynthesisUtterance(word.word);
            utterance.lang = 'ja-JP';
            window.speechSynthesis.speak(utterance);
        }
    }
}

// loadVocabularyData 함수는 더 이상 필요 없지만 호환성을 위해 남겨두거나 빈 함수로 대체
// loadVocabularyData 함수는 더 이상 필요 없지만 호환성을 위해 남겨두거나 빈 함수로 대체
async function loadVocabularyData() {
    console.log('Using local wordList data instead of fetch');
    return Promise.resolve({});
}

// ==========================================
// 자동 재생 기능 (Auto Play)
// ==========================================
let isVocabAutoPlaying = false;
let vocabWakeLock = null;

async function startVocabularyAutoPlay() {
    if (isVocabAutoPlaying) return;
    isVocabAutoPlaying = true;

    // 화면 꺼짐 방지
    try {
        if ('wakeLock' in navigator) {
            vocabWakeLock = await navigator.wakeLock.request('screen');
        }
    } catch (err) {
        console.log('Wake Lock Error:', err);
    }

    // 버튼 상태 변경
    updateAutoPlayButton(true);

    // 루프 시작
    while (isVocabAutoPlaying && currentWordIndex < currentWords.length) {
        const word = currentWords[currentWordIndex];

        // 3회 반복
        for (let i = 0; i < 3; i++) {
            if (!isVocabAutoPlaying) break;

            // 1. 일본어
            await speakText(word.word, 'ja-JP');
            if (!isVocabAutoPlaying) break;
            await new Promise(r => setTimeout(r, 500));

            // 2. 한국어
            await speakText(word.translation, 'ko-KR');
            if (!isVocabAutoPlaying) break;
            await new Promise(r => setTimeout(r, 1000));
        }

        if (!isVocabAutoPlaying) break;

        // 3. 다음 단어로 이동
        if (currentWordIndex < currentWords.length - 1) {
            nextVocabulary();
            await new Promise(r => setTimeout(r, 1000)); // 이동 후 잠시 대기
        } else {
            // 마지막 단어면 종료
            stopVocabularyAutoPlay();
            break;
        }
    }
}

function speakText(text, lang) {
    return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = lang === 'ko-KR' ? 1.2 : 1.0; // 한국어는 조금 빠르게
        utterance.onend = resolve;
        utterance.onerror = resolve;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    });
}

function stopVocabularyAutoPlay() {
    isVocabAutoPlaying = false;

    // Wake Lock 해제
    if (vocabWakeLock) {
        vocabWakeLock.release().then(() => {
            vocabWakeLock = null;
        });
    }

    updateAutoPlayButton(false);
}

function updateAutoPlayButton(isPlaying) {
    const btn = document.getElementById('vocab-autoplay-btn');
    if (btn) {
        if (isPlaying) {
            btn.innerHTML = '<i class="fas fa-stop mr-2"></i>정지';
            btn.className = 'px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors font-bold text-sm animate-pulse';
            btn.onclick = stopVocabularyAutoPlay;
        } else {
            btn.innerHTML = '<i class="fas fa-play mr-2"></i>자동 재생';
            btn.className = 'px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors font-bold text-sm';
            btn.onclick = startVocabularyAutoPlay;
        }
    }
}

// 전역 노출
// 전역 노출
window.selectVocabularyCategory = selectVocabularyCategory;
window.startVocabularyAutoPlay = startVocabularyAutoPlay;
window.stopVocabularyAutoPlay = stopVocabularyAutoPlay;
window.previousVocabulary = previousVocabulary;
window.nextVocabulary = nextVocabulary;
window.backToVocabularyCategories = backToVocabularyCategories;
window.playVocabularyAudio = playVocabularyAudio;
window.initVocabulary = initVocabulary; // 초기화 함수도 노출

console.log('vocabulary.js loaded');
