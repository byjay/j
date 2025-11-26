/**
 * characters.js - 50음도 학습 시스템
 * - [Fix] 퀴즈/통계 버튼을 그리드 밖으로 분리하여 레이아웃 겹침 현상 완벽 해결
 * - [Feat] 쓰기 연습 시 해당 행(Row) 5글자 내비게이션 바 & 현재 글자 하이라이트 기능 포함
 */

// ==========================================
// 1. 데이터 (50음도)
// ==========================================
const charData = {
    hiragana: [
        { char: 'あ', romaji: 'a', pron: '아' }, { char: 'い', romaji: 'i', pron: '이' }, { char: 'う', romaji: 'u', pron: '우' }, { char: 'え', romaji: 'e', pron: '에' }, { char: 'お', romaji: 'o', pron: '오' },
        { char: 'か', romaji: 'ka', pron: '카' }, { char: 'き', romaji: 'ki', pron: '키' }, { char: 'く', romaji: 'ku', pron: '쿠' }, { char: 'け', romaji: 'ke', pron: '케' }, { char: 'こ', romaji: 'ko', pron: '코' },
        { char: 'さ', romaji: 'sa', pron: '사' }, { char: 'し', romaji: 'shi', pron: '시' }, { char: 'す', romaji: 'su', pron: '스' }, { char: 'せ', romaji: 'se', pron: '세' }, { char: 'そ', romaji: 'so', pron: '소' },
        { char: 'た', romaji: 'ta', pron: '타' }, { char: 'ち', romaji: 'chi', pron: '치' }, { char: 'つ', romaji: 'tsu', pron: '츠' }, { char: 'て', romaji: 'te', pron: '테' }, { char: 'と', romaji: 'to', pron: '토' },
        { char: 'な', romaji: 'na', pron: '나' }, { char: 'に', romaji: 'ni', pron: '니' }, { char: 'ぬ', romaji: 'nu', pron: '누' }, { char: 'ね', romaji: 'ne', pron: '네' }, { char: 'の', romaji: 'no', pron: '노' },
        { char: 'は', romaji: 'ha', pron: '하' }, { char: 'ひ', romaji: 'hi', pron: '히' }, { char: 'ふ', romaji: 'fu', pron: '후' }, { char: 'へ', romaji: 'he', pron: '헤' }, { char: 'ほ', romaji: 'ho', pron: '호' },
        { char: 'ま', romaji: 'ma', pron: '마' }, { char: 'み', romaji: 'mi', pron: '미' }, { char: 'む', romaji: 'mu', pron: '무' }, { char: 'め', romaji: 'me', pron: '메' }, { char: 'も', romaji: 'mo', pron: '모' },
        { char: 'や', romaji: 'ya', pron: '야' }, { char: '', romaji: '', pron: '' }, { char: 'ゆ', romaji: 'yu', pron: '유' }, { char: '', romaji: '', pron: '' }, { char: 'よ', romaji: 'yo', pron: '요' },
        { char: 'ら', romaji: 'ra', pron: '라' }, { char: 'り', romaji: 'ri', pron: '리' }, { char: 'る', romaji: 'ru', pron: '루' }, { char: 'れ', romaji: 're', pron: '레' }, { char: 'ろ', romaji: 'ro', pron: '로' },
        { char: 'わ', romaji: 'wa', pron: '와' }, { char: '', romaji: '', pron: '' }, { char: '', romaji: '', pron: '' }, { char: '', romaji: '', pron: '' }, { char: 'を', romaji: 'wo', pron: '오' },
        { char: 'ん', romaji: 'n', pron: '응' }, { char: '', romaji: '', pron: '' }, { char: '', romaji: '', pron: '' }, { char: '', romaji: '', pron: '' }, { char: '', romaji: '', pron: '' }
    ],
    katakana: [
        { char: 'ア', romaji: 'a', pron: '아' }, { char: 'イ', romaji: 'i', pron: '이' }, { char: 'ウ', romaji: 'u', pron: '우' }, { char: 'エ', romaji: 'e', pron: '에' }, { char: 'オ', romaji: 'o', pron: '오' },
        { char: 'カ', romaji: 'ka', pron: '카' }, { char: 'キ', romaji: 'ki', pron: '키' }, { char: 'ク', romaji: 'ku', pron: '쿠' }, { char: 'ケ', romaji: 'ke', pron: '케' }, { char: 'コ', romaji: 'ko', pron: '코' },
        { char: 'サ', romaji: 'sa', pron: '사' }, { char: 'シ', romaji: 'shi', pron: '시' }, { char: 'ス', romaji: 'su', pron: '스' }, { char: 'セ', romaji: 'se', pron: '세' }, { char: 'ソ', romaji: 'so', pron: '소' },
        { char: 'タ', romaji: 'ta', pron: '타' }, { char: 'チ', romaji: 'chi', pron: '치' }, { char: 'ツ', romaji: 'tsu', pron: '츠' }, { char: 'テ', romaji: 'te', pron: '테' }, { char: 'ト', romaji: 'to', pron: '토' },
        { char: 'ナ', romaji: 'na', pron: '나' }, { char: 'ニ', romaji: 'ni', pron: '니' }, { char: 'ヌ', romaji: 'nu', pron: '누' }, { char: 'ネ', romaji: 'ne', pron: '네' }, { char: 'ノ', romaji: 'no', pron: '노' },
        { char: 'ハ', romaji: 'ha', pron: '하' }, { char: 'ヒ', romaji: 'hi', pron: '히' }, { char: 'フ', romaji: 'fu', pron: '후' }, { char: 'ヘ', romaji: 'he', pron: '헤' }, { char: 'ホ', romaji: 'ho', pron: '호' },
        { char: 'マ', romaji: 'ma', pron: '마' }, { char: 'ミ', romaji: 'mi', pron: '미' }, { char: 'ム', romaji: 'mu', pron: '무' }, { char: 'メ', romaji: 'me', pron: '메' }, { char: 'モ', romaji: 'mo', pron: '모' },
        { char: 'ヤ', romaji: 'ya', pron: '야' }, { char: '', romaji: '', pron: '' }, { char: 'ユ', romaji: 'yu', pron: '유' }, { char: '', romaji: '', pron: '' }, { char: 'ヨ', romaji: 'yo', pron: '요' },
        { char: 'ラ', romaji: 'ra', pron: '라' }, { char: 'リ', romaji: 'ri', pron: '리' }, { char: 'ル', romaji: 'ru', pron: '루' }, { char: 'レ', romaji: 're', pron: '레' }, { char: 'ロ', romaji: 'ro', pron: '로' },
        { char: 'ワ', romaji: 'wa', pron: '와' }, { char: '', romaji: '', pron: '' }, { char: '', romaji: '', pron: '' }, { char: '', romaji: '', pron: '' }, { char: 'ヲ', romaji: 'wo', pron: '오' },
        { char: 'ン', romaji: 'n', pron: '응' }, { char: '', romaji: '', pron: '' }, { char: '', romaji: '', pron: '' }, { char: '', romaji: '', pron: '' }, { char: '', romaji: '', pron: '' }
    ]
};

// 상태 변수
let currentMode = 'hiragana';
let currentIndex = 0;
let quizQuestions = [];
let currentQuestionIdx = 0;
let quizScore = 0;

// 캔버스 관련 변수
let canvas = null;
let ctx = null;
let isDrawing = false;

// ==========================================
// 2. 메인 화면 & 그리드 그리기 (레이아웃 수정됨)
// ==========================================

function showCharacterGrid(type) {
    currentMode = type;
    
    // ★ 핵심 수정: character-grid가 아니라 그 부모 컨테이너를 타겟팅
    const container = document.getElementById('character-grid-container');
    
    // 탭 스타일 업데이트
    const tabHiragana = document.getElementById('tab-hiragana');
    const tabKatakana = document.getElementById('tab-katakana');
    
    if (tabHiragana && tabKatakana) {
        if (type === 'hiragana') {
            tabHiragana.classList.add('bg-red-500', 'text-white');
            tabHiragana.classList.remove('bg-gray-200');
            tabKatakana.classList.remove('bg-blue-500', 'text-white');
            tabKatakana.classList.add('bg-gray-200');
        } else {
            tabHiragana.classList.remove('bg-red-500', 'text-white');
            tabHiragana.classList.add('bg-gray-200');
            tabKatakana.classList.add('bg-blue-500', 'text-white');
            tabKatakana.classList.remove('bg-gray-200');
        }
    }

    if (!container) {
        console.error("character-grid-container ID를 찾을 수 없습니다.");
        return;
    }

    // 1. 상단 버튼 영역 (그리드 밖으로 분리)
    const topHTML = `
        <div class="w-full mb-6 px-2">
            <div class="flex gap-2 mb-3">
                <button onclick="startQuiz('hiragana')" class="flex-1 bg-red-50 text-red-600 border border-red-200 py-3 rounded-xl text-xs font-bold hover:bg-red-100 transition shadow-sm">
                    <i class="fas fa-question-circle mr-1"></i>히라가나 퀴즈
                </button>
                <button onclick="startQuiz('katakana')" class="flex-1 bg-blue-50 text-blue-600 border border-blue-200 py-3 rounded-xl text-xs font-bold hover:bg-blue-100 transition shadow-sm">
                    <i class="fas fa-question-circle mr-1"></i>가타카나 퀴즈
                </button>
                <button onclick="startQuiz('mix')" class="flex-1 bg-purple-50 text-purple-600 border border-purple-200 py-3 rounded-xl text-xs font-bold hover:bg-purple-100 transition shadow-sm">
                    <i class="fas fa-random mr-1"></i>섞어서
                </button>
            </div>
            <button onclick="showHistory()" class="w-full bg-gray-800 text-white py-3 rounded-xl text-sm font-bold hover:bg-gray-900 shadow-md flex items-center justify-center">
                <i class="fas fa-chart-bar mr-2 text-yellow-400"></i>나의 학습 통계 보기
            </button>
        </div>
    `;

    // 2. 그리드 내용 (순수 글자 카드만 포함)
    const list = charData[type];
    const cellsHTML = list.map((item, idx) => {
        if (!item.char) {
            return `<div class="aspect-square"></div>`; // 빈 공간 유지
        }
        
        const history = getStudyHistory();
        const isMastered = history.masteredChars.includes(item.char);
        const badge = isMastered ? '<span class="absolute top-1 right-1 text-[10px]">⭐</span>' : '';
        
        return `
            <button onclick="selectCharacter(${idx})" 
                class="relative aspect-square flex flex-col items-center justify-center bg-white rounded-xl border border-gray-200 shadow-sm active:scale-95 transition-transform hover:border-red-300 hover:shadow-md ${isMastered ? 'bg-yellow-50 border-yellow-300' : ''}">
                ${badge}
                <span class="text-xl font-bold text-gray-800">${item.char}</span>
                <span class="text-[10px] text-gray-400">${item.pron}</span>
            </button>
        `;
    }).join('');

    // 3. 컨테이너에 HTML 주입 (상단 버튼 + 그리드 분리)
    container.innerHTML = `
        ${topHTML}
        <div id="character-grid" class="grid grid-cols-5 gap-2 pb-24">
            ${cellsHTML}
        </div>
    `;
}

// ==========================================
// 3. 글자 학습 (쓰기 연습) 모달
// ==========================================

function selectCharacter(idx) {
    currentIndex = idx;
    const item = charData[currentMode][idx];
    if (!item || !item.char) return;

    const container = document.getElementById('character-study-container');
    const strokeUrl = `https://upload.wikimedia.org/wikipedia/commons/6/6f/BW_Hiragana_${item.romaji}_2021.svg`;

    // ★ 기능 추가: 같은 행 5글자 추출 및 내비게이션 바 생성
    const list = charData[currentMode];
    const rowStart = Math.floor(idx / 5) * 5; 
    const rowItems = list.slice(rowStart, rowStart + 5);

    const rowNavHTML = rowItems.map((rowItem, i) => {
        const currentItemIdx = rowStart + i;
        if (!rowItem.char) return `<div class="w-10 h-10"></div>`; // 빈 칸

        // 현재 글자 하이라이트 처리
        const isCurrent = (currentItemIdx === idx);
        const activeClass = isCurrent 
            ? "bg-red-600 text-white border-red-600 ring-2 ring-red-200 transform scale-110 z-10 shadow-lg" 
            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50";

        return `
            <button onclick="selectCharacter(${currentItemIdx})" 
                class="w-10 h-10 rounded-lg border flex items-center justify-center font-bold text-lg transition-all duration-200 ${activeClass}">
                ${rowItem.char}
            </button>
        `;
    }).join('');

    container.innerHTML = `
        <div class="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 animate-fade-in">
            <!-- 상단 닫기 버튼 -->
            <div class="w-full max-w-md flex justify-end mb-2">
                <button onclick="closeModal()" class="bg-white/20 p-2 rounded-full text-white hover:bg-white/30 transition">
                    <i class="fas fa-times text-xl"></i>
                </button>
            </div>

            <!-- ★ 같은 행 내비게이션 바 -->
            <div class="w-full max-w-md bg-gray-800/50 backdrop-blur-md p-3 rounded-2xl mb-6 flex justify-center gap-3 border border-white/10">
                ${rowNavHTML}
            </div>

            <!-- 메인 학습 카드 -->
            <div class="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl relative">
                <div class="flex justify-between items-start mb-6">
                    <div>
                        <h1 class="text-7xl font-black text-gray-800 mb-1 leading-none">${item.char}</h1>
                        <div class="flex items-center gap-2 mt-2">
                            <span class="text-2xl font-bold text-red-500">${item.pron}</span>
                            <span class="text-lg text-gray-400 font-medium uppercase">[${item.romaji}]</span>
                        </div>
                    </div>
                    <div class="flex flex-col gap-3">
                        <button onclick="playAudio('${item.char}')" class="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition shadow-sm border border-blue-100">
                            <i class="fas fa-volume-up text-2xl"></i>
                        </button>
                        <button onclick="clearCanvas()" class="w-14 h-14 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-gray-100 transition shadow-sm border border-gray-100">
                            <i class="fas fa-eraser text-2xl"></i>
                        </button>
                    </div>
                </div>

                <!-- 쓰기 캔버스 영역 -->
                <div class="relative w-full aspect-square bg-gray-50 rounded-2xl border-2 border-gray-200 overflow-hidden cursor-crosshair touch-none shadow-inner">
                    <!-- 배경 가이드 -->
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08]">
                        <span class="text-[250px]" style="font-family: 'Noto Sans JP', sans-serif;">${item.char}</span>
                    </div>
                    <!-- 십자선 -->
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="w-full h-px bg-red-300/30 border-t border-dashed border-red-300"></div>
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="h-full w-px bg-red-300/30 border-l border-dashed border-red-300"></div>
                    </div>
                    
                    <canvas id="writing-canvas" class="absolute inset-0 w-full h-full"></canvas>
                </div>

                <!-- 하단 내비게이션 -->
                <div class="mt-6 flex justify-between items-center">
                    <button onclick="prevChar()" class="text-gray-400 hover:text-gray-800 p-3 transition ${currentIndex === 0 ? 'invisible' : ''}">
                        <i class="fas fa-chevron-left text-2xl"></i>
                    </button>
                    <span class="text-xs text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">따라 써보세요 ✍️</span>
                    <button onclick="nextChar()" class="bg-red-500 text-white pl-6 pr-5 py-3 rounded-xl font-bold shadow-lg hover:bg-red-600 active:scale-95 transition flex items-center gap-2">
                        다음 <i class="fas fa-chevron-right text-sm"></i>
                    </button>
                </div>
            </div>
        </div>
    `;

    container.classList.remove('hidden');
    setTimeout(initCanvas, 50); // DOM 렌더링 후 캔버스 초기화
    playAudio(item.char);
    saveStudyLog('view', item.char);
}

// ... (이하 closeModal, nextChar, prevChar, initCanvas 등 기존 로직 유지) ...

function closeModal() {
    document.getElementById('character-study-container').classList.add('hidden');
}

function nextChar() {
    const item = charData[currentMode][currentIndex];
    if(item.char) saveStudyLog('master', item.char);

    let nextIdx = currentIndex + 1;
    while (nextIdx < charData[currentMode].length && !charData[currentMode][nextIdx].char) {
        nextIdx++;
    }

    if (nextIdx < charData[currentMode].length) {
        selectCharacter(nextIdx);
    } else {
        alert("마지막 글자입니다!");
        closeModal();
        showCharacterGrid(currentMode);
    }
}

function prevChar() {
    let prevIdx = currentIndex - 1;
    while (prevIdx >= 0 && !charData[currentMode][prevIdx].char) {
        prevIdx--;
    }
    if (prevIdx >= 0) selectCharacter(prevIdx);
}

// 캔버스 로직
function initCanvas() {
    canvas = document.getElementById('writing-canvas');
    if (!canvas) return;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx = canvas.getContext('2d');
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1f2937'; // 진한 회색
    isDrawing = false;

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', drawing);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseout', stopDraw);
    canvas.addEventListener('touchstart', (e) => { startDraw(e.touches[0]); e.preventDefault(); }, { passive: false });
    canvas.addEventListener('touchmove', (e) => { drawing(e.touches[0]); e.preventDefault(); }, { passive: false });
    canvas.addEventListener('touchend', stopDraw);
}

function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}
function startDraw(e) { isDrawing = true; const pos = getPos(e); ctx.beginPath(); ctx.moveTo(pos.x, pos.y); }
function drawing(e) { if (!isDrawing) return; const pos = getPos(e); ctx.lineTo(pos.x, pos.y); ctx.stroke(); }
function stopDraw() { isDrawing = false; }
function clearCanvas() { if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height); }

// 퀴즈 로직
function startQuiz(mode) {
    let pool = [];
    if (mode === 'hiragana') pool = charData.hiragana;
    else if (mode === 'katakana') pool = charData.katakana;
    else pool = [...charData.hiragana, ...charData.katakana];
    pool = pool.filter(item => item.char);

    quizQuestions = [];
    for (let i = 0; i < 10; i++) {
        const answer = pool[Math.floor(Math.random() * pool.length)];
        const distractors = [];
        while (distractors.length < 3) {
            const d = pool[Math.floor(Math.random() * pool.length)];
            if (d.char !== answer.char && !distractors.includes(d)) distractors.push(d);
        }
        const options = [answer, ...distractors].sort(() => Math.random() - 0.5);
        quizQuestions.push({ answer, options });
    }
    currentQuestionIdx = 0;
    quizScore = 0;
    showQuizModal();
}

function showQuizModal() {
    const q = quizQuestions[currentQuestionIdx];
    const container = document.getElementById('character-study-container');
    container.innerHTML = `
        <div class="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-4">
            <div class="w-full max-w-sm mb-8">
                <div class="flex justify-between items-center mb-2 text-gray-500 font-bold">
                    <span>문제 ${currentQuestionIdx + 1} / 10</span>
                    <button onclick="closeModal()"><i class="fas fa-times"></i></button>
                </div>
                <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-500 transition-all duration-300" style="width: ${(currentQuestionIdx / 10) * 100}%"></div>
                </div>
            </div>
            <div class="text-center mb-10">
                <p class="text-gray-500 mb-4">다음 글자의 발음은?</p>
                <div class="text-8xl font-black text-gray-800 animate-bounce-short">${q.answer.char}</div>
            </div>
            <div class="grid grid-cols-2 gap-4 w-full max-w-sm">
                ${q.options.map((opt, idx) => `
                    <button onclick="submitAnswer(${idx})" class="py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-xl font-bold text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition active:scale-95">
                        ${opt.pron}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    container.classList.remove('hidden');
}

function submitAnswer(selectedIdx) {
    const q = quizQuestions[currentQuestionIdx];
    const isCorrect = q.options[selectedIdx].char === q.answer.char;
    if (isCorrect) quizScore++;
    if (currentQuestionIdx < 9) { currentQuestionIdx++; showQuizModal(); }
    else { showQuizResult(); }
}

function showQuizResult() {
    saveStudyLog('quiz', quizScore);
    const container = document.getElementById('character-study-container');
    const message = quizScore === 10 ? "만점입니다! 🎉" : "수고하셨어요! 👍";
    container.innerHTML = `
        <div class="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-4 animate-fade-in">
            <div class="text-6xl mb-4">🏆</div>
            <h2 class="text-3xl font-black text-gray-800 mb-2">퀴즈 종료!</h2>
            <p class="text-gray-500 mb-8">${message}</p>
            <div class="bg-gray-50 px-10 py-8 rounded-3xl mb-8 text-center border border-gray-200">
                <span class="block text-sm text-gray-400 uppercase tracking-widest mb-1">SCORE</span>
                <span class="text-6xl font-black ${quizScore >= 7 ? 'text-blue-500' : 'text-red-500'}">${quizScore} <span class="text-3xl text-gray-300">/ 10</span></span>
            </div>
            <div class="w-full max-w-xs space-y-3">
                <button onclick="closeModal(); showCharacterGrid(currentMode);" class="w-full py-4 bg-gray-800 text-white rounded-xl font-bold shadow-lg active:scale-95 transition">목록으로</button>
                <button onclick="startQuiz('mix')" class="w-full py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 active:scale-95 transition">다시 하기</button>
            </div>
        </div>
    `;
}

// 통계 및 유틸리티
const STORAGE_KEY = 'jap_bong_history_v1';
function getStudyHistory() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { logs: [], masteredChars: [] };
    return JSON.parse(raw);
}
function saveStudyLog(type, val) {
    const history = getStudyHistory();
    const today = new Date().toISOString().split('T')[0];
    history.logs.push({ date: today, type, val, ts: Date.now() });
    if (type === 'master' && !history.masteredChars.includes(val)) history.masteredChars.push(val);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}
function showHistory() {
    const history = getStudyHistory();
    const container = document.getElementById('character-study-container');
    const masteredCount = history.masteredChars.length;
    container.innerHTML = `
        <div class="fixed inset-0 z-50 bg-gray-900/95 flex flex-col items-center justify-center p-4 text-white animate-fade-in">
            <div class="w-full max-w-md bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl p-6 text-center">
                <h2 class="text-xl font-bold mb-4">📊 학습 리포트</h2>
                <div class="mb-6">
                    <p class="text-gray-400 text-sm mb-1">마스터한 글자</p>
                    <p class="text-4xl font-bold text-green-400">${masteredCount} <span class="text-lg text-gray-500">/ 104</span></p>
                </div>
                <button onclick="closeModal()" class="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-bold">닫기</button>
            </div>
        </div>
    `;
    container.classList.remove('hidden');
}
function playAudio(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.8;
        window.speechSynthesis.speak(utterance);
    }
}

// 전역 노출
window.showCharacterGrid = showCharacterGrid;
window.selectCharacter = selectCharacter;
window.closeModal = closeModal;
window.nextChar = nextChar;
window.prevChar = prevChar;
window.clearCanvas = clearCanvas;
window.playAudio = playAudio;
window.startQuiz = startQuiz;
window.submitAnswer = submitAnswer;
window.showHistory = showHistory;

console.log("characters.js loaded (Fixed Layout)");