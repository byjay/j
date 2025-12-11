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

    // 1. 상단 고정 헤더 (탭 + 퀴즈/통계 버튼) - fixed position 헤더 바로 아래
    const isHiragana = type === 'hiragana';
    const topHTML = `
        <div class="fixed top-14 left-0 right-0 z-40 bg-gray-900 border-b border-gray-800 shadow-lg">
            <!-- 1단: 메인 탭 (히라가나/가타카나) -->
            <div class="flex w-full">
                <button onclick="showCharacterGrid('hiragana')" 
                    class="flex-1 py-2.5 text-center font-bold text-sm transition-all ${isHiragana ? 'bg-red-600 text-white shadow-inner' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}">
                    히라가나
                </button>
                <button onclick="showCharacterGrid('katakana')" 
                    class="flex-1 py-2.5 text-center font-bold text-sm transition-all ${!isHiragana ? 'bg-blue-600 text-white shadow-inner' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}">
                    가타카나
                </button>
            </div>
            
            <!-- 2단: 서브 컨트롤 (퀴즈 & 통계) -->
            <div class="flex justify-between items-center px-2 py-1.5 bg-gray-900 gap-1 border-t border-gray-800">
                <div class="flex gap-1 overflow-x-auto no-scrollbar items-center">
                    <span class="px-2 py-1 bg-red-600 text-white rounded text-xs font-bold whitespace-nowrap">퀴즈</span>
                    <button onclick="startQuiz('hiragana')" class="px-2 py-1 bg-pink-600/20 text-pink-300 rounded text-xs border border-pink-600/50 whitespace-nowrap flex items-center gap-1 font-bold">
                         <span class="w-1.5 h-1.5 rounded-full bg-pink-500"></span> ひらがな
                    </button>
                    <button onclick="startQuiz('katakana')" class="px-2 py-1 bg-cyan-600/20 text-cyan-300 rounded text-xs border border-cyan-600/50 whitespace-nowrap flex items-center gap-1 font-bold">
                         <span class="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> カタカナ
                    </button>
                    <button onclick="startQuiz('mix')" class="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs border border-purple-600/50 whitespace-nowrap font-bold">
                         <i class="fas fa-random"></i> 섞어서
                    </button>
                </div>
                <button onclick="showHistory()" class="px-2 py-1 bg-yellow-600/20 text-yellow-300 rounded text-xs font-bold border border-yellow-600/50 whitespace-nowrap">
                    <i class="fas fa-chart-bar"></i> 통계
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
        <div id="character-grid" class="grid grid-cols-5 gap-1 pb-20 px-1 pt-[80px]">
            <div class="col-span-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg px-3 py-1.5 flex items-center gap-2 mb-1">
                <span class="text-base">👆</span>
                <span class="text-xs text-blue-800 font-medium">글자를 터치하면 <b>쓰기연습</b> 시작!</span>
            </div>
            ${cellsHTML}
        </div>
    `;
}

// ==========================================
// 3. 글자 학습 (쓰기 연습) 모달 - 컴팩트 최적화
// ==========================================

function selectCharacter(idx) {
    console.log('[SelectChar] Called with idx:', idx);
    currentIndex = idx;
    const item = charData[currentMode][idx];
    if (!item || !item.char) return;
    console.log('[SelectChar] Item:', item.char);

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
        <div class="fixed top-[120px] left-0 right-0 bottom-0 z-[45] bg-gray-900 flex flex-col">
            <!-- 상단 고정 헤더: 컴팩트 -->
            <div class="flex-shrink-0 bg-gray-800 border-b border-gray-700 safe-area-top">
                <!-- 1행: 목록/글자정보/닫기 -->
                <div class="flex justify-between items-center px-2 py-1.5">
                    <button onclick="closeModal(); showCharacterGrid(currentMode);" class="bg-red-600 px-2 py-1 flex items-center gap-1 rounded text-white text-xs font-bold">
                        <i class="fas fa-chevron-left text-xs"></i> 목록
                    </button>
                    <div class="flex items-center gap-2">
                        <span class="text-2xl font-black text-white">${item.char}</span>
                        <span class="text-sm font-bold text-red-400">${item.pron}</span>
                        <span class="text-xs text-gray-400">[${item.romaji}]</span>
                    </div>
                    <button onclick="closeModal()" class="bg-gray-700 w-7 h-7 flex items-center justify-center rounded-full text-white">
                        <i class="fas fa-times text-xs"></i>
                    </button>
                </div>
                <!-- 2행: 행 네비게이션 -->
                <div class="flex justify-center px-2 pb-1.5">
                    <div class="flex gap-0.5 bg-gray-700/50 p-0.5 rounded">
                        ${rowNavHTML}
                    </div>
                </div>
            </div>

            <!-- 캔버스 영역 (상단에 바로 시작) -->
            <div class="flex-1 flex flex-col items-center px-2 pt-2 pb-1 overflow-hidden">
                <div class="relative w-full max-w-[280px] aspect-square bg-white rounded-xl border-4 border-gray-300 overflow-hidden cursor-crosshair touch-none shadow-xl">
                    <!-- 획순 가이드 컨테이너 -->
                    <div id="stroke-guide-container" class="absolute inset-0 z-10 pointer-events-none flex items-center justify-center"></div>
                    
                    <!-- 십자 가이드 -->
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="w-full h-px bg-red-300/50"></div>
                    </div>
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div class="h-full w-px bg-red-300/50"></div>
                    </div>

                    <canvas id="writing-canvas" class="absolute inset-0 w-full h-full z-20"></canvas>
                </div>
                
                <!-- 모든 버튼 (캔버스 바로 아래) -->
                <div class="flex gap-2 mt-2">
                    <button onclick="playAudio('${item.char}')" class="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1">
                        <i class="fas fa-volume-up"></i> 듣기
                    </button>
                    <button id="practice-replay-btn" class="bg-yellow-600 text-white px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1">
                        <i class="fas fa-play"></i> 획순
                    </button>
                    <button id="practice-clear-btn" class="bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-bold flex items-center gap-1">
                        <i class="fas fa-eraser"></i> 지우기
                    </button>
                </div>
                <!-- 이전/다음 버튼 -->
                <div class="flex gap-4 mt-2 w-full max-w-[280px] justify-between">
                    <button id="prev-btn" class="flex-1 bg-gray-700 text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-1">
                        <i class="fas fa-chevron-left"></i> 이전
                    </button>
                    <button id="next-btn" class="flex-1 bg-red-600 text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-1">
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
    console.log('[SelectChar] Calling playStrokeAnimation for:', item.char);
    playStrokeAnimation(item.char);
    console.log('[SelectChar] playStrokeAnimation called successfully');
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
    if (!container) {
        console.error('[Stroke] No container');
        return;
    }

    // 1. 초기화
    container.innerHTML = '';
    if (typeof clearCanvas === 'function') clearCanvas();

    // 2. 로딩 스피너
    container.innerHTML = '<div class="absolute inset-0 flex items-center justify-center"><div class="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div></div>';

    try {
        // 3. SVG 가져오기
        const hex = char.charCodeAt(0).toString(16).padStart(5, '0');
        const url = `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${hex}.svg`;

        let svgText = svgCache[hex];
        if (!svgText) {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            svgText = await res.text();
            svgCache[hex] = svgText;
        }

        // 4. SVG 파싱
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, 'image/svg+xml');
        const svg = doc.querySelector('svg');
        if (!svg) throw new Error('Invalid SVG');

        // 5. 컨테이너 클리어
        container.innerHTML = '';

        // 6. SVG 설정
        svg.setAttribute('viewBox', '0 0 109 109');
        svg.style.cssText = 'width:100%;height:100%;position:absolute;top:0;left:0;';

        // 7. 숫자 제거
        const nums = svg.querySelector('g[id^="kvg:StrokeNumbers"]');
        if (nums) nums.remove();

        // 8. 모든 패스 찾기
        const paths = Array.from(svg.querySelectorAll('path'));
        if (paths.length === 0) throw new Error('No paths');

        // 9. 배경 가이드 생성 (연한 회색)
        paths.forEach(p => {
            const bg = p.cloneNode(true);
            bg.removeAttribute('id');
            bg.style.cssText = 'fill:none;stroke:#d1d5db;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;opacity:0.6;';
            // p.parentNode 사용 - paths가 <g> 안에 있을 수 있음
            p.parentNode.insertBefore(bg, p);
        });

        // 10. 애니메이션 패스 스타일 (빨간 실선) - 처음엔 숨김!
        paths.forEach(p => {
            // 스타일 설정
            p.style.cssText = 'fill:none;stroke:#ef4444;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;';
            // DOM 추가 전에 숨김 처리 (길이 추정값 사용)
            p.setAttribute('stroke-dasharray', '1000');
            p.setAttribute('stroke-dashoffset', '1000');
        });

        // 11. DOM에 추가 (빨간 획은 이미 숨겨짐)
        container.appendChild(svg);

        // 12. 강제 레이아웃 및 대기
        svg.getBoundingClientRect();
        await new Promise(r => setTimeout(r, 50));

        // 13. 순차 애니메이션 (setInterval 사용)
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];

            // 길이 계산
            let len = 200;
            try {
                const calcLen = path.getTotalLength();
                if (calcLen > 0) len = calcLen;
            } catch (e) { }

            console.log(`[Stroke] Path ${i}: len=${len}`);

            // 초기 상태 설정 (setAttribute 사용)
            path.setAttribute('stroke-dasharray', len);
            path.setAttribute('stroke-dashoffset', len);

            // setInterval로 애니메이션
            await new Promise(done => {
                const duration = 400;
                const steps = 20;
                const stepTime = duration / steps;
                let step = 0;

                const timer = setInterval(() => {
                    step++;
                    const progress = step / steps;
                    const offset = len * (1 - progress);
                    path.setAttribute('stroke-dashoffset', offset);

                    if (step >= steps) {
                        clearInterval(timer);
                        path.setAttribute('stroke-dashoffset', 0);
                        done();
                    }
                }, stepTime);
            });

            // 획 사이 대기
            await new Promise(r => setTimeout(r, 100));
        }

        console.log('[Stroke] Animation complete!');

    } catch (e) {
        console.error('[Stroke] Error:', e);
        // 폴백: 연한 글자
        container.innerHTML = `
            <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-[90px] font-bold" style="color:#d1d5db;font-family:'Noto Sans JP',sans-serif;">${char}</span>
                <span class="text-xs text-gray-400 mt-1">따라 써보세요</span>
            </div>
        `;
    }
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

    // 퀴즈 타입 라벨 결정
    const quizTypeLabel = currentMode === 'hiragana' ? '히라가나 퀴즈 🌸' :
        currentMode === 'katakana' ? '가타카나 퀴즈 ⚡' : '혼합 퀴즈 🎯';
    const quizTypeColor = currentMode === 'hiragana' ? 'bg-pink-100 text-pink-600' :
        currentMode === 'katakana' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600';

    container.innerHTML = `
        <div class="fixed top-14 bottom-0 left-0 right-0 z-40 bg-white flex flex-col items-center justify-center p-4">
            <div class="w-full max-w-sm mb-6">
                <!-- 퀴즈 타입 표시 -->
                <div class="text-center mb-3">
                    <span class="px-4 py-1.5 ${quizTypeColor} rounded-full text-sm font-bold">
                        ${quizTypeLabel}
                    </span>
                </div>
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
