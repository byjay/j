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
    // alert(`DEBUG: showCharacterGrid called with type: ${type}`); // 디버깅용 알림
    console.log(`showCharacterGrid called with type: ${type}`);

    // [New] 현재 모드 저장
    if (type) {
        localStorage.setItem('lastCharMode', type);
    } else {
        type = localStorage.getItem('lastCharMode') || 'hiragana';
    }

    currentMode = type;
    const container = document.getElementById('character-grid-container');

    if (!container) {
        console.error("character-grid-container ID를 찾을 수 없습니다.");
        alert("Error: character-grid-container ID를 찾을 수 없습니다.");
        return;
    }

    // 1. 상단 고정 헤더 (탭 + 퀴즈/통계 버튼) - 더욱 컴팩트하게 수정
    const isHiragana = type === 'hiragana';
    // 1. 상단 고정 헤더 (탭 + 퀴즈/통계 버튼) - 2단 분리 및 디자인 개선
    const isHiragana = type === 'hiragana';
    const topHTML = `
        <div class="sticky top-10 z-30 bg-gray-900 border-b border-gray-800 shadow-md transform transition-all">
            <!-- 1단: 메인 탭 (히라가나/가타카나) -->
            <div class="flex w-full">
                <button onclick="showCharacterGrid('hiragana')" 
                    class="flex-1 py-3 text-center font-bold text-sm transition-all ${isHiragana ? 'bg-red-600 text-white shadow-inner' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}">
                    히라가나
                </button>
                <button onclick="showCharacterGrid('katakana')" 
                    class="flex-1 py-3 text-center font-bold text-sm transition-all ${!isHiragana ? 'bg-blue-600 text-white shadow-inner' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}">
                    가타카나
                </button>
            </div>
            
            <!-- 2단: 서브 컨트롤 (퀴즈 & 통계) -->
            <div class="flex justify-between items-center px-4 py-2 bg-gray-900/95 backdrop-blur gap-2 border-t border-gray-800">
                <div class="flex gap-2 overflow-x-auto no-scrollbar">
                    <button onclick="startQuiz('hiragana')" class="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-xs border border-gray-700 hover:bg-gray-700 hover:text-white transition whitespace-nowrap flex items-center gap-1">
                         <span class="w-2 h-2 rounded-full bg-red-500 inline-block"></span> 퀴즈
                    </button>
                    <button onclick="startQuiz('katakana')" class="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-xs border border-gray-700 hover:bg-gray-700 hover:text-white transition whitespace-nowrap flex items-center gap-1">
                         <span class="w-2 h-2 rounded-full bg-blue-500 inline-block"></span> 퀴즈
                    </button>
                    <button onclick="startQuiz('mix')" class="px-3 py-1.5 bg-gray-800 text-gray-300 rounded-lg text-xs border border-gray-700 hover:bg-gray-700 hover:text-white transition whitespace-nowrap font-bold">
                         <i class="fas fa-random text-purple-400 mr-1"></i>섞어서
                    </button>
                </div>
                <button onclick="showHistory()" class="px-3 py-1.5 bg-gray-700 text-yellow-400 rounded-lg text-xs font-bold hover:bg-gray-600 border border-gray-600 whitespace-nowrap shadow-sm">
                    <i class="fas fa-chart-bar mr-1"></i>통계
                </button>
            </div>
        </div>
    `;

    // 2. 그리드 내용 (컴팩트: h-20 -> h-14, text-xl -> text-lg)
    const list = charData[type];
    const cellsHTML = list.map((item, idx) => {
        if (!item.char) {
            return `<div class="aspect-square"></div>`;
        }

        const history = getStudyHistory();
        const isMastered = history.masteredChars.includes(item.char);
        const badge = isMastered ? '<span class="absolute top-0.5 right-0.5 text-[8px]">⭐</span>' : '';

        return `
            <button onclick="selectCharacter(${idx})" 
                class="relative h-11 flex flex-col items-center justify-center bg-white rounded-lg border border-gray-200 shadow-sm active:scale-95 transition-transform hover:border-red-300 ${isMastered ? 'bg-yellow-50 border-yellow-300' : ''}">
                ${badge}
                <span class="text-base font-bold text-gray-800 leading-none mb-0.5">${item.char}</span>
                <span class="text-[9px] text-gray-500 font-bold leading-none">${item.pron}</span>
            </button>
        `;
    }).join('');

    container.innerHTML = `
        ${topHTML}
        <div id="character-grid" class="grid grid-cols-5 gap-1 pb-20 px-1">
            ${cellsHTML}
        </div>
    `;
}

// ==========================================
// 3. 글자 학습 (쓰기 연습) 모달 - 컴팩트 최적화
// ==========================================

function selectCharacter(idx) {
    currentIndex = idx;
    const item = charData[currentMode][idx];
    if (!item || !item.char) return;

    const container = document.getElementById('character-study-container');

    // 같은 행 내비게이션
    const list = charData[currentMode];
    const rowStart = Math.floor(idx / 5) * 5;
    const rowItems = list.slice(rowStart, rowStart + 5);

    const rowNavHTML = rowItems.map((rowItem, i) => {
        const currentItemIdx = rowStart + i;
        if (!rowItem.char) return `<div class="w-8 h-8"></div>`;

        const isCurrent = (currentItemIdx === idx);
        const activeClass = isCurrent
            ? "bg-red-600 text-white border-red-600 ring-1 ring-red-200 transform scale-105 z-10 shadow"
            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50";

        return `
            <button onclick="selectCharacter(${currentItemIdx})" 
                class="w-8 h-8 rounded-md border flex items-center justify-center font-bold text-sm transition-all duration-200 ${activeClass}">
                ${rowItem.char}
            </button>
        `;
    }).join('');

    container.innerHTML = `
        <div class="fixed top-14 bottom-0 left-0 right-0 z-40 bg-black/90 flex flex-col items-center justify-center p-3 animate-fade-in">
            <!-- 상단 컨트롤: 닫기 & 행 내비게이션 -->
            <div class="w-full max-w-sm flex justify-between items-center mb-3">
                <div class="flex gap-1 bg-gray-800/50 p-1 rounded-lg border border-white/10">
                    ${rowNavHTML}
                </div>
                <button onclick="closeModal()" class="bg-white/20 w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-white/30 transition ml-2">
                    <i class="fas fa-times text-sm"></i>
                </button>
            </div>

            <!-- 메인 학습 카드 -->
            <div class="w-full max-w-sm bg-white rounded-2xl p-4 shadow-2xl relative flex flex-col gap-3">
                
                <!-- 글자 정보 & 오디오 -->
                <div class="flex justify-between items-center">
                    <div class="flex items-end gap-3">
                        <h1 class="text-5xl font-black text-gray-800 leading-none">${item.char}</h1>
                        <div class="flex flex-col">
                            <span class="text-xl font-bold text-red-500 leading-none">${item.pron}</span>
                            <span class="text-xs text-gray-400 font-medium uppercase tracking-wider">[${item.romaji}]</span>
                        </div>
                    </div>
                    <div class="flex gap-2">
                        <button onclick="playAudio('${item.char}')" class="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition shadow-sm border border-blue-100">
                            <i class="fas fa-volume-up text-sm"></i>
                        </button>
                        <button onclick="clearCanvas()" class="w-10 h-10 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center hover:bg-gray-100 transition shadow-sm border border-gray-100">
                            <i class="fas fa-eraser text-sm"></i>
                        </button>
                    </div>
                </div>

                <!-- 쓰기 캔버스 영역 (비율 조정) -->
                <div class="relative w-full aspect-square bg-gray-50 rounded-xl border-2 border-gray-200 overflow-hidden cursor-crosshair touch-none shadow-inner">
                    <!-- 획순 애니메이션 & 가이드 컨테이너 -->
                    <div id="stroke-guide-container" class="absolute inset-0 z-10 pointer-events-none flex items-center justify-center p-4"></div>

                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="w-full h-px bg-red-300/30 border-t border-dashed border-red-300"></div>
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="h-full w-px bg-red-300/30 border-l border-dashed border-red-300"></div>
                    </div>

                    <canvas id="writing-canvas" class="absolute inset-0 w-full h-full z-20"></canvas>
                </div>

                <!-- 컨트롤 버튼 -->
                <div class="flex justify-between items-center mt-6 gap-2">
                    <button id="prev-btn" class="bg-gray-700 text-white p-3 rounded-xl hover:bg-gray-600 transition flex items-center justify-center min-w-[48px]">
                        <i class="fas fa-chevron-left"></i>
                    </button>

                    <div class="flex gap-2">
                        <button id="practice-replay-btn" class="bg-gray-700 text-white px-4 py-3 rounded-xl hover:bg-gray-600 transition flex items-center gap-2 text-sm font-bold">
                            <i class="fas fa-redo"></i> 다시쓰기
                        </button>
                        <button id="practice-clear-btn" class="bg-gray-700 text-white px-4 py-3 rounded-xl hover:bg-gray-600 transition flex items-center gap-2 text-sm font-bold">
                            <i class="fas fa-eraser"></i> 지우기
                        </button>
                    </div>

                    <div class="flex gap-2 items-center">
                        <span class="text-xs text-gray-400 mr-1" id="tracing-guide-text">따라쓰기 👉</span>
                        <button id="next-btn" class="bg-red-600 text-white px-5 py-3 rounded-xl hover:bg-red-700 transition flex items-center gap-2 font-bold shadow-lg shadow-red-900/20">
                            다음 <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
        </div>
    `;

    container.classList.remove('hidden');
    setTimeout(initCanvas, 50);

    // 버튼 이벤트 연결
    document.getElementById('prev-btn').onclick = prevChar;
    document.getElementById('next-btn').onclick = nextChar;
    document.getElementById('practice-replay-btn').onclick = () => { clearCanvas(); playStrokeAnimation(item.char); };
    document.getElementById('practice-clear-btn').onclick = clearCanvas;

    playAudio(item.char);
    saveStudyLog('view', item.char);

    // 획순 애니메이션 자동 재생 (즉시 시작)
    playStrokeAnimation(item.char);
}

function closeModal() {
    document.getElementById('character-study-container').classList.add('hidden');
}

function nextChar() {
    const item = charData[currentMode][currentIndex];
    if (item.char) saveStudyLog('master', item.char);

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
    ctx.strokeStyle = '#2563eb'; // 파란색 (Tailwind blue-600)
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

// ==========================================
// 획순 애니메이션 로직 (KanjiVG)
// ==========================================

function getCharHex(char) {
    return char.charCodeAt(0).toString(16).padStart(5, '0');
}

const svgCache = {};

async function playStrokeAnimation(char) {
    const container = document.getElementById('stroke-guide-container');
    if (!container) return;

    // 초기화
    container.innerHTML = '';
    clearCanvas();

    // 로딩 표시
    container.innerHTML = '<div class="absolute inset-0 flex items-center justify-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div></div>';

    try {
        const hex = getCharHex(char);
        let svgText = svgCache[hex];

        if (!svgText) {
            const url = `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${hex}.svg`;
            const response = await fetch(url);
            if (!response.ok) throw new Error('SVG fetch failed');
            svgText = await response.text();
            svgCache[hex] = svgText; // 캐싱
        }

        // 로딩 제거 후 렌더링
        container.innerHTML = '';
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const svg = doc.querySelector('svg');

        // 스타일 설정
        svg.style.width = '100%';
        svg.style.height = '100%';
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';

        // 숫자 제거
        const numbers = svg.querySelector('g[id^="kvg:StrokeNumbers"]');
        if (numbers) numbers.remove();

        // 1. 배경 레이어 (회색 가이드) - 항상 표시 (따라쓰기용)
        const bgLayer = svg.cloneNode(true);
        bgLayer.setAttribute('id', 'bg-layer');
        const bgPaths = bgLayer.querySelectorAll('path');
        bgPaths.forEach(path => {
            path.style.fill = 'none';
            path.style.stroke = '#e5e7eb'; // gray-200 (연한 회색)
            path.style.strokeWidth = '6'; // 두께 줄임 (10 -> 6)
            path.style.strokeLinecap = 'round';
            path.style.strokeLinejoin = 'round';
            path.style.opacity = '1';
        });
        container.appendChild(bgLayer);

        // 2. 애니메이션 레이어 (빨간 점선) - Mask 사용
        // 원리: 빨간 점선 패스(A) 위에, 마스크(B)를 씌운다.
        // 마스크(B)는 처음엔 검정(숨김)이고, 흰색 실선이 그려지면서 A를 보여준다.

        const animLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
        animLayer.setAttribute('id', 'anim-layer');

        const originalPaths = svg.querySelectorAll('path');
        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        animLayer.appendChild(defs);

        const animPaths = []; // 애니메이션 대상 (마스크 내부의 패스들)

        originalPaths.forEach((p, idx) => {
            // 1. 실제 보여질 빨간 점선 패스
            const redDashedPath = p.cloneNode(true);
            redDashedPath.style.fill = 'none';
            redDashedPath.style.stroke = '#ef4444'; // red-500
            redDashedPath.style.strokeWidth = '6';   // 굵게
            redDashedPath.style.strokeLinecap = 'round';
            redDashedPath.style.strokeLinejoin = 'round';
            redDashedPath.style.strokeDasharray = '15, 15'; // 명확한 점선
            redDashedPath.style.opacity = '1';

            // 마스크 적용
            const maskId = `mask-stroke-${idx}`;
            redDashedPath.setAttribute('mask', `url(#${maskId})`);
            animLayer.appendChild(redDashedPath);

            // 2. 마스크 정의 (실선으로 그려짐)
            const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
            mask.setAttribute('id', maskId);

            const maskPath = p.cloneNode(true);
            maskPath.style.fill = 'none';
            maskPath.style.stroke = 'white'; // 마스크는 흰색이 보이는 영역
            maskPath.style.strokeWidth = '8'; // 본체보다 약간 굵게 커버
            maskPath.style.strokeLinecap = 'round';
            maskPath.style.strokeLinejoin = 'round';
            // 초기 상태: 숨김 (length만큼 offset)
            const len = maskPath.getTotalLength();
            maskPath.style.strokeDasharray = len;
            maskPath.style.strokeDashoffset = len;

            mask.appendChild(maskPath);
            defs.appendChild(mask);

            // 애니메이션을 위해 마스크 패스 저장
            animPaths.push(maskPath);
        });

        container.appendChild(animLayer);

        // 애니메이션 시작
        await animateStrokes(animPaths);

    } catch (e) {
        console.error("Stroke animation failed:", e);
        container.innerHTML = `<span class="text-[180px] text-gray-100 font-bold" style="font-family: 'Noto Sans JP', sans-serif;">${char}</span>`;
    }
}

function animateStrokes(maskPaths) {
    return new Promise(async (resolve) => {
        // 순차적으로 그리기
        for (let i = 0; i < maskPaths.length; i++) {
            const path = maskPaths[i];
            const length = path.getTotalLength();

            // 초기화 (이미 위에서 했지만 확실하게)
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;

            // 애니메이션 진행
            await new Promise(r => {
                const duration = 600; // 0.6초 (경쾌하게)
                const start = performance.now();

                function step(timestamp) {
                    const progress = Math.min((timestamp - start) / duration, 1);
                    // easeOutCubic
                    const ease = 1 - Math.pow(1 - progress, 3);

                    path.style.strokeDashoffset = length * (1 - ease);

                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        r();
                    }
                }
                requestAnimationFrame(step);
            });
        }

        // 완료 후 1초 뒤 페이드 아웃
        setTimeout(() => {
            const animLayer = document.getElementById('anim-layer');
            if (animLayer) {
                animLayer.style.transition = 'opacity 0.5s';
                animLayer.style.opacity = '0';
                setTimeout(() => {
                    animLayer.remove();
                }, 500);
            }
            resolve();
        }, 1000);
    });
}

// 퀴즈 로직

let wrongAnswers = []; // 오답 노트용 배열

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
    wrongAnswers = []; // 초기화
    showQuizModal();
}

function showQuizModal() {
    const q = quizQuestions[currentQuestionIdx];
    const container = document.getElementById('character-study-container');
    container.innerHTML = `
        <div class="fixed top-14 bottom-0 left-0 right-0 z-40 bg-white flex flex-col items-center justify-center p-4">
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
            
            <!-- 정답 팝업 (숨김 상태로 시작) -->
            <div id="correct-answer-popup" class="hidden absolute inset-0 bg-black/80 flex items-center justify-center z-[60] animate-fade-in">
                <div class="text-center">
                    <div class="text-9xl font-black text-red-500 mb-4 animate-bounce">${q.answer.char}</div>
                    <div class="text-4xl font-bold text-white">${q.answer.pron}</div>
                </div>
            </div>
        </div>
    `;
    container.classList.remove('hidden');
}

function submitAnswer(selectedIdx) {
    const q = quizQuestions[currentQuestionIdx];
    const isCorrect = q.options[selectedIdx].char === q.answer.char;

    if (isCorrect) {
        quizScore++;
        nextQuestion();
    } else {
        // 오답 기록
        wrongAnswers.push({
            question: q.answer.char,
            answer: q.answer.pron,
            wrong: q.options[selectedIdx].pron
        });

        // 오답 시 정답 팝업 표시
        const popup = document.getElementById('correct-answer-popup');
        if (popup) {
            popup.classList.remove('hidden');
            playAudio(q.answer.char); // 정답 소리 재생
            setTimeout(() => {
                nextQuestion();
            }, 1500); // 1.5초 후 다음 문제로
        } else {
            nextQuestion();
        }
    }
}

function nextQuestion() {
    if (currentQuestionIdx < 9) {
        currentQuestionIdx++;
        showQuizModal();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    saveStudyLog('quiz', quizScore);
    const container = document.getElementById('character-study-container');
    const message = quizScore === 10 ? "만점입니다! 🎉" : "수고하셨어요! 👍";

    // 오답 리스트 HTML 생성
    let wrongListHTML = '';
    if (wrongAnswers.length > 0) {
        wrongListHTML = `
            <div class="w-full max-w-xs bg-red-50 rounded-xl p-4 mb-6 border border-red-100">
                <h3 class="font-bold text-red-500 mb-3 text-sm text-center">❌ 오답 노트</h3>
                <div class="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                    ${wrongAnswers.map(item => `
                        <div class="flex justify-between items-center bg-white p-2 rounded-lg shadow-sm">
                            <span class="text-2xl font-bold text-gray-800">${item.question}</span>
                            <div class="text-right">
                                <span class="text-xs text-gray-400 line-through mr-2">${item.wrong}</span>
                                <span class="text-lg font-bold text-red-500">${item.answer}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // 춤추는 캐릭터 (10점 만점 시)
    let celebrationHTML = '';
    if (quizScore === 10) {
        // 현재 로그인한 사용자 확인 (전역 window.currentUser 우선 사용)
        let localUserId = 'dad'; // 기본값
        if (window.currentUser && window.currentUser.id) {
            localUserId = window.currentUser.id;
        } else {
            try {
                const storedUserId = localStorage.getItem('currentUser');
                if (storedUserId) {
                    localUserId = storedUserId;
                }
            } catch (e) {
                console.error('User check failed', e);
            }
        }

        // 이미지 매핑
        const dancingImages = {
            'dad': 'images/dad_dancing.png',
            'mom': 'images/mom_dancing.png',
            'sieun': 'images/sieun_dancing.png',
            'harong': 'images/harong_dancing.png'
        };

        // 하롱이 이미지가 없으면 기본 이미지 사용 (Rate Limit 대응)
        // 실제 파일 존재 여부는 JS에서 체크하기 어려우므로, 
        // 서버 사이드나 빌드 타임에 보장되어야 하지만, 
        // 여기서는 일단 매핑대로 출력. 
        // 만약 파일이 없으면 엑박이 뜨므로, onerror 처리를 추가함.

        const dancingImg = dancingImages[localUserId] || dancingImages['dad'];

        celebrationHTML = `
            <div class="mb-6 relative h-48 flex justify-center items-center">
                <!-- Dancing Character -->
                <img src="${dancingImg}" 
                     class="h-full object-contain drop-shadow-2xl animate-bounce" 
                     alt="Dancing Character"
                     onerror="this.src='images/${localUserId}.png'">
                
                <!-- Squirrel Trophy -->
                <img src="images/squirrel.png" 
                     class="absolute -bottom-2 -right-4 w-24 h-24 object-contain animate-bounce-short drop-shadow-lg" 
                     style="animation-delay: 0.5s;"
                     alt="Squirrel Trophy">
            </div>
        `;
    }

    container.innerHTML = `
        <div class="fixed top-12 bottom-0 left-0 right-0 z-50 bg-white flex flex-col items-center justify-center p-4 animate-fade-in">
            ${celebrationHTML}
            <div class="text-6xl mb-4">${quizScore === 10 ? '🎉' : '🏆'}</div>
            <h2 class="text-3xl font-black text-gray-800 mb-2">퀴즈 종료!</h2>
            <p class="text-gray-500 mb-6">${message}</p>
            
            <div class="bg-gray-50 px-10 py-6 rounded-3xl mb-6 text-center border border-gray-200">
                <span class="block text-sm text-gray-400 uppercase tracking-widest mb-1">SCORE</span>
                <span class="text-6xl font-black ${quizScore >= 7 ? 'text-blue-500' : 'text-red-500'}">${quizScore} <span class="text-3xl text-gray-300">/ 10</span></span>
            </div>

            ${wrongListHTML}

            <div class="w-full max-w-xs space-y-3">
                <button onclick="closeModal(); showCharacterGrid(currentMode);" class="w-full py-4 bg-gray-800 text-white rounded-xl font-bold shadow-lg active:scale-95 transition">목록으로</button>
                <button onclick="startQuiz(currentMode)" class="w-full py-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-bold hover:bg-gray-50 active:scale-95 transition">다시 하기</button>
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

// 관리자 데이터 초기화 (모든 사용자 데이터 포함)
function resetAllData() {
    // 아빠 계정인지 확인
    if (!window.currentUser || window.currentUser.id !== 'dad') {
        alert('관리자 권한이 필요합니다.');
        return;
    }

    const pw = prompt("관리자 비밀번호를 입력하세요 (데이터가 모두 삭제됩니다)");
    if (pw === '1435') {
        // 기존 공통 키 삭제
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('fukuoka_unlock_count');

        // 모든 사용자별 히스토리 키 삭제
        const userIds = ['dad', 'mom', 'sieun', 'harong'];
        userIds.forEach(userId => {
            localStorage.removeItem(`jap_bong_history_v1_${userId}`);
            localStorage.removeItem(`jap_bong_xp_${userId}`);
            localStorage.removeItem(`jap_bong_streak_${userId}`);
            localStorage.removeItem(`jap_bong_last_login_${userId}`);
        });

        // 글자별 마스터 상태 삭제 (히라가나/가타카나 개별 문자들)
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && (key.startsWith('char_mastered_') || key.startsWith('char_practice_'))) {
                localStorage.removeItem(key);
            }
        }

        alert('모든 사용자의 학습 데이터가 초기화되었습니다!');
        location.reload();
    } else {
        if (pw !== null) alert('비밀번호가 틀렸습니다.');
    }
}

function showHistory() {
    const history = getStudyHistory();
    const container = document.getElementById('character-study-container');
    const masteredCount = history.masteredChars.length;

    // 아빠 계정일 때만 초기화 버튼 표시
    const isAdmin = window.currentUser && window.currentUser.id === 'dad';
    const adminBtn = isAdmin ? `
        <button onclick="resetAllData()" class="mt-4 text-xs text-red-400 hover:text-red-300 underline">
            <i class="fas fa-trash-alt mr-1"></i>데이터 초기화 (관리자)
        </button>
    ` : '';

    container.innerHTML = `
        <div class="fixed top-12 bottom-0 left-0 right-0 z-50 bg-gray-900/95 flex flex-col items-center justify-center p-4 text-white animate-fade-in">
            <div class="w-full max-w-md bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl p-6 text-center">
                <h2 class="text-xl font-bold mb-4">📊 학습 리포트</h2>
                <!-- 마스터 현황 -->
                <div class="mb-6 border-b border-gray-700 pb-4">
                    <p class="text-gray-400 text-sm mb-1">마스터한 글자</p>
                    <p class="text-4xl font-bold text-green-400">${masteredCount} <span class="text-lg text-gray-500">/ 104</span></p>
                </div>

                <!-- 주간 학습 현황 (최근 7일) -->
                <div class="mb-6 text-left">
                    <h3 class="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
                        <i class="far fa-calendar-alt"></i> 최근 7일 학습 활동
                    </h3>
                    <div class="space-y-2">
                        ${getWeeklyActivityHTML(history.logs)}
                    </div>
                </div>
                <button onclick="closeModal()" class="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-lg font-bold">닫기</button>
                ${adminBtn}
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
window.resetAllData = resetAllData;
window.playStrokeAnimation = playStrokeAnimation;

// 주간 활동 HTML 생성 헬퍼
function getWeeklyActivityHTML(logs) {
    const today = new Date();
    const days = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        days.push(d.toISOString().split('T')[0]);
    }

    // 날짜별 활동 수 집계
    const counts = {};
    logs.forEach(log => {
        if (counts[log.date]) counts[log.date]++;
        else counts[log.date] = 1;
    });

    return days.map(date => {
        const count = counts[date] || 0;
        // 활동량에 따른 색상/길이 (최대 50개 기준)
        const percentage = Math.min(count * 2, 100);
        const barColor = count > 0 ? 'bg-blue-500' : 'bg-gray-700';
        const dateLabel = date.slice(5).replace('-', '/'); // MM/DD

        return `
            <div class="flex items-center text-xs">
                <span class="w-10 text-gray-400 font-mono">${dateLabel}</span>
                <div class="flex-1 h-2 bg-gray-700 rounded-full mx-2 overflow-hidden">
                    <div class="h-full ${barColor} transition-all duration-500" style="width: ${percentage}%"></div>
                </div>
                <span class="w-8 text-right text-gray-300">${count}회</span>
            </div>
        `;
    }).join('');
}

// 전역 노출
// Duplicate exports removed

console.log("characters.js loaded (Fixed Layout & Weekly Report)");
