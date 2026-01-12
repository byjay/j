/**
 * grammar.js - AI 문장 연습 모듈
 */

const GrammarPractice = {
    init: function () {
        console.log('GrammarPractice initialized');
        this.render();
    },

    render: function () {
        const container = document.getElementById('grammar-content');
        if (!container) return;

        container.innerHTML = `
            <div class="space-y-10 animate-fade-in-up">
                <!-- 1. 문장 변환 연습 (Premium Transformer) -->
                <div class="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200 border border-slate-50 relative overflow-hidden group">
                    <div class="absolute -right-10 -top-10 w-40 h-40 bg-slate-50 rounded-full blur-3xl group-hover:bg-indigo-50 transition-colors duration-700"></div>
                    
                    <div class="relative z-10">
                        <div class="flex items-center gap-3 mb-8">
                            <div class="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200">
                                <i class="fas fa-magic text-sm"></i>
                            </div>
                            <div>
                                <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-0.5">AI Engine Level 4.0</p>
                                <h3 class="text-2xl font-black text-slate-800 tracking-tighter">문장 AI 마스터</h3>
                            </div>
                        </div>

                        <div class="space-y-6">
                            <div class="relative">
                                <textarea id="grammar-input" 
                                    class="w-full p-6 pb-2 rounded-[32px] border-2 border-slate-100 focus:border-slate-900 focus:ring-0 outline-none resize-none text-slate-800 font-bold placeholder:text-slate-300 transition-all text-lg shadow-inner bg-slate-50/50"
                                    rows="3" 
                                    placeholder="변환할 문장을 입력하세요..."></textarea>
                                <div class="absolute bottom-4 right-6 text-[10px] font-black text-slate-300 uppercase tracking-widest">Natural Language Sync</div>
                            </div>
                            
                            <div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
                                <button onclick="GrammarPractice.setInput('학교에 가다')" class="px-4 py-2 bg-white text-slate-500 text-[10px] font-black rounded-full border border-slate-100 hover:border-slate-900 hover:text-slate-900 transition-all uppercase tracking-widest whitespace-nowrap shadow-sm">학교에 가다</button>
                                <button onclick="GrammarPractice.setInput('밥을 먹다')" class="px-4 py-2 bg-white text-slate-500 text-[10px] font-black rounded-full border border-slate-100 hover:border-slate-900 hover:text-slate-900 transition-all uppercase tracking-widest whitespace-nowrap shadow-sm">밥을 먹다</button>
                                <button onclick="GrammarPractice.setInput('친구를 만나다')" class="px-4 py-2 bg-white text-slate-500 text-[10px] font-black rounded-full border border-slate-100 hover:border-slate-900 hover:text-slate-900 transition-all uppercase tracking-widest whitespace-nowrap shadow-sm">친구를 만나다</button>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="relative">
                                    <select id="target-form" class="w-full p-5 rounded-[28px] border-2 border-slate-100 bg-white text-slate-800 font-black appearance-none focus:border-slate-900 outline-none shadow-sm text-sm uppercase tracking-tighter shrink-0 pr-12">
                                        <option value="polite">정중형 (ます/입니다)</option>
                                        <option value="past">과거형 (た/했다)</option>
                                        <option value="negative">부정형 (ない/안한다)</option>
                                        <option value="te-form">연결형 (て/하고)</option>
                                        <option value="potential">가능형 (れる/할수있다)</option>
                                    </select>
                                    <div class="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <i class="fas fa-chevron-down text-xs"></i>
                                    </div>
                                </div>
                                <button onclick="GrammarPractice.transform()" 
                                    class="w-full p-5 bg-slate-900 text-white font-black rounded-[28px] shadow-2xl shadow-slate-200 hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em]">
                                    <span>Transform</span> <i class="fas fa-bolt text-red-500 animate-pulse"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- 결과 영역 (Premium Glass Window) -->
                    <div id="grammar-result" class="hidden mt-8 bg-slate-900 rounded-[36px] p-8 shadow-2xl shadow-slate-300 relative overflow-hidden animate-fade-in-up border-4 border-white/10">
                        <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
                        <div class="relative z-10">
                            <div class="flex justify-between items-center mb-6">
                                <span class="text-[10px] font-black text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full uppercase tracking-[0.3em] border border-indigo-500/20">Synthesized Result</span>
                                <button onclick="GrammarPractice.speak()" class="w-12 h-12 rounded-2xl bg-white/5 text-white hover:bg-white/10 flex items-center justify-center transition-all active:scale-90 border border-white/10">
                                    <i class="fas fa-volume-up"></i>
                                </button>
                            </div>
                            <div class="space-y-2 mb-8">
                                <p id="result-text" class="text-4xl font-black text-white tracking-tighter drop-shadow-lg leading-tight"></p>
                                <p id="result-romaji" class="text-sm font-black text-indigo-300/60 uppercase tracking-[0.4em]"></p>
                            </div>
                            <div class="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-inner">
                                <p id="result-explanation" class="text-sm font-bold text-slate-300 leading-relaxed"></p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2. 문장 만들기 퀴즈 (Upgrade) -->
                <div class="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] p-12 text-center group cursor-default">
                    <div class="w-20 h-20 bg-white rounded-[28px] shadow-xl shadow-slate-200 flex items-center justify-center mx-auto mb-6 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                        <i class="fas fa-puzzle-piece text-slate-200 text-3xl"></i>
                    </div>
                    <p class="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-2">Expansion Pack v2.0</p>
                    <h3 class="text-2xl font-black text-slate-400 tracking-tighter">문장 조립 시뮬레이터</h3>
                    <p class="text-sm font-bold text-slate-300 mt-2">차세대 학습 모듈이 준비 중입니다.</p>
                </div>
            </div>
        `;
    },

    setInput: function (text) {
        document.getElementById('grammar-input').value = text;
    },

    transform: async function () {
        const input = document.getElementById('grammar-input').value.trim();
        const form = document.getElementById('target-form').value;

        if (!input) {
            alert('문장을 입력해주세요!');
            return;
        }

        // UI 로딩 상태
        const btn = document.querySelector('button[onclick="GrammarPractice.transform()"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 변환 중...';
        btn.disabled = true;

        try {
            const data = await ApiClient.transformSentence(input, form);

            // 결과 표시
            const resultDiv = document.getElementById('grammar-result');
            document.getElementById('result-text').textContent = data.result;
            document.getElementById('result-romaji').textContent = data.romaji;
            document.getElementById('result-explanation').textContent = data.explanation;

            resultDiv.classList.remove('hidden');

            // TTS용 텍스트 저장
            this.currentText = data.result;

        } catch (error) {
            console.error('Transform failed:', error);
            alert('변환에 실패했습니다. 잠시 후 다시 시도해주세요.');
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    },

    speak: function () {
        if (!this.currentText) return;

        const utterance = new SpeechSynthesisUtterance(this.currentText);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    }
};

// 전역 노출
window.GrammarPractice = GrammarPractice;
