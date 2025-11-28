// ==========================================
// conversation_day.js 전용 기능 코드
// 변수명: Day prefix 사용
// ==========================================

let currentDayCategory = '';
let currentDayIndex = 0;

function initDayConversation() {
    const keys = Object.keys(dayConversationData);
    if (keys.length > 0) currentDayCategory = keys[0];
    renderDayNavigation();
    openDayLesson(currentDayCategory);
}

function renderDayNavigation() {
    const container = document.getElementById('practical-conversation-content');
    if (!container) return;

    const navWrapper = document.createElement('div');
    navWrapper.className = 'sticky-nav-container';
    navWrapper.innerHTML = `
        <div class="flex items-center justify-between px-4 mb-2 w-full max-w-4xl mx-auto">
            <div class="flex-1 overflow-x-auto no-scrollbar flex gap-2" id="day-category-scroll-area">
                ${Object.entries(dayConversationData).map(([key, data]) => `
                    <button onclick="openDayLesson('${key}')" id="day-nav-btn-${key}"
                        class="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 active:scale-95 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 text-sm shadow-sm">
                        <i class="${data.icon}"></i><span class="font-bold whitespace-nowrap">${data.title}</span>
                    </button>
                `).join('')}
            </div>
        </div>`;

    const viewerDiv = document.createElement('div');
    viewerDiv.id = 'day-conversation-viewer';
    viewerDiv.className = 'w-full max-w-4xl mx-auto px-4 pb-24';

    container.innerHTML = '';
    container.appendChild(navWrapper);
    container.appendChild(viewerDiv);
}

function openDayLesson(key) {
    currentDayCategory = key;
    currentDayIndex = 0;
    DayAudioController.stopAutoRepeat();
    updateDayNavigationStyles(key);
    displayCurrentDay();
}

function updateDayNavigationStyles(activeKey) {
    Object.keys(dayConversationData).forEach(key => {
        const btn = document.getElementById(`day-nav-btn-${key}`);
        if (btn) btn.className = `flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 text-sm shadow-sm`;
    });
    const activeBtn = document.getElementById(`day-nav-btn-${activeKey}`);
    const color = dayConversationData[activeKey].color;
    if (activeBtn) {
        activeBtn.className = `flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 scale-105 bg-${color}-50 border-${color}-500 text-${color}-600 shadow-md text-sm font-bold`;
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

function createDayCardHTML(data, type, index, color) {
    const isQuestion = type === 'question';
    const uniqueId = isQuestion ? 'day-card-q' : `day-card-a-${index}`;

    const vocabListHTML = data.vocab && data.vocab.length > 0
        ? `<div class="h-full flex flex-col">
            <div class="flex items-center gap-2 border-b border-gray-200 pb-3 mb-3">
                <i class="fas fa-book-reader text-${color}-500"></i>
                <span class="text-xs font-black text-gray-400 uppercase tracking-widest">Vocabulary</span>
            </div>
            <div class="flex-1 overflow-y-auto custom-scrollbar pr-1">
                <div class="vocab-grid">
                    ${data.vocab.map(v => `
                        <div class="vocab-item bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-${color}-200 cursor-pointer hover:bg-${color}-50 transition-colors" onclick="goToWordStudy('${v.word}')">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-lg font-bold text-gray-800 leading-tight">${v.word}</span>
                                ${v.type ? `<span class="text-[10px] bg-${color}-50 text-${color}-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ml-1 whitespace-nowrap">${v.type}</span>` : ''}
                            </div>
                            <div class="text-xs text-gray-400 font-mono mb-2 truncate">${v.read}</div>
                            <div class="mt-auto pt-2 border-t border-gray-50 text-sm font-bold text-${color}-600 leading-snug">${v.mean}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
           </div>`
        : `<div class="h-full flex flex-col items-center justify-center text-gray-300">
             <i class="fas fa-layer-group text-4xl mb-3 opacity-30"></i>
             <span class="text-sm font-medium">추가 단어 없음</span>
           </div>`;

    const frontHTML = `
        <div class="absolute w-full h-full backface-hidden bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between overflow-hidden" id="day-card-front-${uniqueId}">
            <div class="px-5 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                 <span class="px-3 py-1 rounded-full ${isQuestion ? `bg-${color}-100 text-${color}-700` : 'bg-gray-200 text-gray-600'} text-[10px] font-black tracking-widest uppercase">
                    ${isQuestion ? 'A' : 'B'}
                 </span>
                <span class="text-[10px] text-gray-400 font-bold flex items-center gap-1 cursor-pointer" onclick="event.stopPropagation(); toggleDayCardFlip('${uniqueId}')">
                    <i class="fas fa-sync-alt"></i> FLIP
                </span>
            </div>
            <div class="flex-1 flex flex-col justify-center px-5 space-y-4">
                <div class="text-2xl md:text-3xl font-black text-gray-800 leading-snug text-center break-keep select-none">${data.jp}</div>
                <div class="text-xs md:text-sm text-gray-400 font-medium text-center font-mono select-none">${data.romaji}</div>
                <div class="w-8 h-1 bg-${color}-100 mx-auto rounded-full"></div>
                <div class="text-lg md:text-xl text-${color}-600 font-bold text-center break-keep select-none">${data.kr}</div>
            </div>
            <div class="px-4 py-3 bg-gray-50 border-t border-gray-100 flex gap-2 justify-center" onclick="event.stopPropagation()">
                <button onclick="DayAudioController.playNormal(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"><i class="fas fa-volume-up"></i>듣기</button>
                <button onclick="DayAudioController.playSlowRepeat(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"><i class="fas fa-history"></i>3회</button>
                <button onclick="DayAudioController.playShadowing(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"><i class="fas fa-microphone-alt"></i>쉐도잉</button>
            </div>
        </div>`;

    const backHTML = `
        <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-50 rounded-3xl border-2 border-${color}-100 shadow-inner flex flex-col overflow-hidden">
             <div class="flex-1 p-4 overflow-hidden relative">${vocabListHTML}</div>
             <div class="py-3 bg-white border-t border-gray-200 text-center cursor-pointer hover:bg-gray-50" onclick="event.stopPropagation(); toggleDayCardFlip('${uniqueId}')">
                <span class="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2"><i class="fas fa-undo"></i> Return</span>
             </div>
        </div>`;

    return `<div class="perspective-1000 w-full mb-8 select-none group" onclick="toggleDayCardFlip('${uniqueId}')">
        <div id="${uniqueId}" class="card-inner relative w-full min-h-[450px] md:min-h-[500px] transform-style-3d shadow-lg rounded-3xl hover:shadow-xl transition-all duration-500 bg-white">${frontHTML}${backHTML}</div>
    </div>`;
}

function displayCurrentDay() {
    const convData = dayConversationData[currentDayCategory];
    if (!convData) return;
    const currentConv = convData.conversations[currentDayIndex];
    const viewer = document.getElementById('day-conversation-viewer');

    const autoPlayBtnState = DayAudioController.isAutoPlaying ?
        `<button id="day-auto-play-btn" onclick="DayAudioController.stopAutoRepeat()" class="btn-auto-active px-4 py-2 rounded-full font-bold text-sm shadow-md flex items-center gap-2 transition-all"><i class="fas fa-stop"></i>정지</button>` :
        `<button id="day-auto-play-btn" onclick="startDayAutoPlay()" class="bg-white border border-gray-200 text-gray-600 hover:text-${convData.color}-600 hover:border-${convData.color}-200 px-4 py-2 rounded-full font-bold text-sm shadow-sm flex items-center gap-2 transition-all active:scale-95"><i class=" fas fa-play-circle"></i>전체 자동재생</button>`;

    viewer.innerHTML = `
        <div class="flex items-center justify-between mb-6 px-1">
            <h3 class="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                <span class="w-1.5 h-6 bg-${convData.color}-500 rounded-full inline-block"></span>
                <span class="truncate max-w-[150px] md:max-w-none">${convData.title}</span>
                <span class="text-sm text-gray-400 font-normal ml-1">(${currentDayIndex + 1}/${convData.conversations.length})</span>
            </h3>
            <div class="flex gap-2 items-center">
                ${autoPlayBtnState}
            </div>
        </div>
        
        <div class="flex justify-between items-center mb-4 px-2">
             <button id="practical-prev-btn" onclick="previousDay()" class="w-10 h-10 rounded-full bg-white border border-gray-200 shadow text-gray-400 hover:text-gray-800 flex items-center justify-center active:scale-90 transition-transform"><i class="fas fa-arrow-left"></i></button>
             <div class="text-xs text-gray-300 font-medium tracking-widest">SWIPE OR CLICK</div>
             <button id="practical-next-btn" onclick="nextDay()" class="w-10 h-10 rounded-full bg-black shadow-lg text-white hover:bg-gray-800 flex items-center justify-center active:scale-90 transition-transform"><i class="fas fa-arrow-right"></i></button>
        </div>

        <div class="space-y-6 animate-fade-in pb-20">
            ${createDayCardHTML(currentConv.question, 'question', 0, convData.color)}
            <div class="relative pl-4 border-l-2 border-dashed border-gray-200 space-y-8">
                ${currentConv.answers.map((ans, idx) => createDayCardHTML(ans, 'answer', idx, convData.color)).join('')}
            </div>
        </div>`;
    updateDayButtons();
}

function toggleDayCardFlip(id) {
    const card = document.getElementById(id);
    if (card) card.classList.toggle('card-flipped');
}

const DayAudioController = {
    speechSynth: window.speechSynthesis,
    isAutoPlaying: false,
    wakeLock: null,
    speak: function (text, lang = 'ja-JP', rate = 1.0) {
        return new Promise((resolve) => {
            if (this.speechSynth.speaking) this.speechSynth.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = rate;
            const voices = this.speechSynth.getVoices();
            let voice;
            if (lang === 'ja-JP') voice = voices.find(v => v.lang === 'ja-JP') || voices.find(v => v.lang.includes('ja'));
            if (lang === 'ko-KR') voice = voices.find(v => v.lang === 'ko-KR') || voices.find(v => v.lang.includes('ko'));
            if (voice) utterance.voice = voice;
            utterance.onend = resolve;
            utterance.onerror = resolve;
            this.speechSynth.speak(utterance);
        });
    },
    wait: ms => new Promise(r => setTimeout(r, ms)),
    playNormal: async function (t) { this.speechSynth.cancel(); await this.speak(t, 'ja-JP', 1.0); },
    playSlowRepeat: async function (t) { this.speechSynth.cancel(); for (let i = 0; i < 3; i++) { await this.speak(t, 'ja-JP', 0.7); await this.wait(600); } },
    playShadowing: async function (t) { this.speechSynth.cancel(); await this.speak(t, 'ja-JP', 0.7); await this.wait(1500); await this.speak(t, 'ja-JP', 1.0); },
    playSentenceLoop: async function (jpText, krText) {
        for (let i = 0; i < 3; i++) {
            if (!this.isAutoPlaying) return false;
            await this.speak(jpText, 'ja-JP', 1.0);
            if (!this.isAutoPlaying) return false;
            await this.wait(300);
            await this.speak(krText, 'ko-KR', 1.2);
            if (!this.isAutoPlaying) return false;
            await this.wait(1500);
        }
        return true;
    },
    stopAutoRepeat: function () {
        this.isAutoPlaying = false;
        this.speechSynth.cancel();
        // 화면 꺼짐 방지 해제
        if (this.wakeLock) {
            this.wakeLock.release().then(() => {
                this.wakeLock = null;
            });
        }
        const btn = document.getElementById('day-auto-play-btn');
        if (btn) {
            btn.className = "bg-white border border-gray-200 text-gray-600 hover:text-blue-600 px-4 py-2 rounded-full font-bold text-sm shadow-sm flex items-center gap-2 transition-all active:scale-95";
            btn.innerHTML = '<i class="fas fa-play-circle"></i>전체 자동재생';
            btn.onclick = startDayAutoPlay;
        }
        document.querySelectorAll('.playing-highlight').forEach(el => el.classList.remove('playing-highlight'));
    }
};

async function startDayAutoPlay() {
    if (DayAudioController.isAutoPlaying) return;
    DayAudioController.isAutoPlaying = true;

    // 화면 꺼짐 방지 (Wake Lock)
    try {
        if ('wakeLock' in navigator) {
            DayAudioController.wakeLock = await navigator.wakeLock.request('screen');
        }
    } catch (err) {
        console.log('Wake Lock 실패:', err);
    }

    const btn = document.getElementById('day-auto-play-btn');
    if (btn) {
        btn.className = "btn-auto-active px-4 py-2 rounded-full font-bold text-sm shadow-md flex items-center gap-2 transition-all";
        btn.innerHTML = '<i class="fas fa-stop"></i>정지';
        btn.onclick = DayAudioController.stopAutoRepeat;
    }
    const convData = dayConversationData[currentDayCategory];
    for (let i = currentDayIndex; i < convData.conversations.length; i++) {
        if (!DayAudioController.isAutoPlaying) break;
        if (i !== currentDayIndex) {
            currentDayIndex = i;
            displayCurrentDay();
            const newBtn = document.getElementById('day-auto-play-btn');
            if (newBtn) {
                newBtn.className = "btn-auto-active px-4 py-2 rounded-full font-bold text-sm shadow-md flex items-center gap-2 transition-all";
                newBtn.innerHTML = '<i class="fas fa-stop"></i>정지';
                newBtn.onclick = DayAudioController.stopAutoRepeat;
            }
        }
        const conv = convData.conversations[i];
        const qCard = document.getElementById('day-card-front-day-card-q');
        if (qCard) qCard.classList.add('playing-highlight');
        const qContinued = await DayAudioController.playSentenceLoop(conv.question.jp, conv.question.kr);
        if (qCard) qCard.classList.remove('playing-highlight');
        if (!qContinued) break;
        for (let j = 0; j < conv.answers.length; j++) {
            if (!DayAudioController.isAutoPlaying) break;
            const aCard = document.getElementById(`day-card-front-day-card-a-${j}`);
            if (aCard) {
                aCard.scrollIntoView({ behavior: "smooth", block: "center" });
                aCard.classList.add('playing-highlight');
            }
            const aContinued = await DayAudioController.playSentenceLoop(conv.answers[j].jp, conv.answers[j].kr);
            if (aCard) aCard.classList.remove('playing-highlight');
            if (!aContinued) break;
        }
        await DayAudioController.wait(1000);
    }
    DayAudioController.stopAutoRepeat();
}

function updateDayButtons() {
    const conv = dayConversationData[currentDayCategory];
    const prev = document.getElementById('practical-prev-btn');
    const next = document.getElementById('practical-next-btn');
    if (prev) { prev.disabled = currentDayIndex === 0; prev.style.opacity = currentDayIndex === 0 ? '0.3' : '1'; }
    if (next) {
        const isLast = currentDayIndex === conv.conversations.length - 1;
        next.disabled = isLast;
        next.style.opacity = isLast ? '0.3' : '1';
    }
}

function previousDay() {
    DayAudioController.stopAutoRepeat();
    if (currentDayIndex > 0) {
        currentDayIndex--;
        displayCurrentDay();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function nextDay() {
    DayAudioController.stopAutoRepeat();
    if (currentDayIndex < dayConversationData[currentDayCategory].conversations.length - 1) {
        currentDayIndex++;
        displayCurrentDay();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function goToWordStudy(word) {
    if (typeof wordList === 'undefined') {
        console.error('wordList not loaded');
        return;
    }
    const found = wordList.find(w => w.japanese_word === word);
    if (found) {
        if (typeof showTab === 'function') showTab('vocabulary');
        if (typeof selectVocabularyCategory === 'function') selectVocabularyCategory(found.category);
    } else {
        console.warn('Word not found:', word);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('practical-conversation-content')) initDayConversation();
});

// 전역 노출
window.initDayConversation = initDayConversation;
