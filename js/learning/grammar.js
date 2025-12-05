/**
 * grammar.js
 * Handles the UI and logic for the AI-powered Grammar Practice module.
 */

const GrammarPractice = {
    currentMode: 'transform', // 'transform' or 'builder'

    init() {
        this.renderUI();
        this.bindEvents();
    },

    renderUI() {
        const container = document.getElementById('grammar-content');
        if (!container) return;

        container.innerHTML = `
            <div class="grammar-header">
                <button class="mode-btn active" data-mode="transform">🔄 문장 변환 (Conjugation)</button>
                <button class="mode-btn" data-mode="builder">🧩 문장 만들기 (Builder)</button>
            </div>
            
            <div id="grammar-workspace" class="grammar-workspace">
                <!-- Dynamic Content Loaded Here -->
            </div>
        `;
        this.loadMode(this.currentMode);
    },

    bindEvents() {
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentMode = e.target.dataset.mode;
                this.loadMode(this.currentMode);
            });
        });
    },

    loadMode(mode) {
        const workspace = document.getElementById('grammar-workspace');
        if (mode === 'transform') {
            workspace.innerHTML = `
                <div class="practice-card">
                    <h3>문장 변환 연습</h3>
                    <p>원하는 문장을 입력하고, 바꾸고 싶은 형태를 선택하세요.</p>
                    
                    <input type="text" id="input-sentence" placeholder="예: 밥을 먹다 (ご飯を食べる)" class="grammar-input">
                    
                    <div class="form-options">
                        <label><input type="radio" name="target-form" value="polite" checked> 정중형 (입니다/합니다)</label>
                        <label><input type="radio" name="target-form" value="negative"> 부정형 (아닙니다/안 합니다)</label>
                        <label><input type="radio" name="target-form" value="past"> 과거형 (했습니다)</label>
                        <label><input type="radio" name="target-form" value="question"> 의문형 (합니까?)</label>
                        <label><input type="radio" name="target-form" value="te-form"> 연결형 (~하고/~해서)</label>
                    </div>

                    <button id="btn-transform" class="action-btn">변환하기 (AI)</button>

                    <div id="result-area" class="result-area hidden">
                        <h4>결과:</h4>
                        <p id="result-text" class="highlight-text"></p>
                        <p id="result-romaji" class="sub-text"></p>
                        <div id="result-explanation" class="explanation-box"></div>
                    </div>
                </div>
            `;

            document.getElementById('btn-transform').addEventListener('click', () => this.handleTransform());

        } else if (mode === 'builder') {
            workspace.innerHTML = `
                <div class="practice-card">
                    <h3>문장 만들기 연습</h3>
                    <p>주어진 단어들을 사용해서 자연스러운 문장을 만들어보세요.</p>
                    
                    <div class="word-bank">
                        <span class="word-tag">私 (나)</span>
                        <span class="word-tag">学校 (학교)</span>
                        <span class="word-tag">行く (가다)</span>
                        <span class="word-tag">バス (버스)</span>
                    </div>

                    <input type="text" id="user-composition" placeholder="위 단어들을 사용해 문장을 만드세요" class="grammar-input">
                    
                    <button id="btn-check" class="action-btn">채점하기 (AI)</button>

                    <div id="check-result-area" class="result-area hidden">
                        <h4 id="check-status"></h4>
                        <p id="check-feedback"></p>
                    </div>
                </div>
            `;

            document.getElementById('btn-check').addEventListener('click', () => this.handleCheck());
        }
    },

    async handleTransform() {
        const sentence = document.getElementById('input-sentence').value;
        const targetForm = document.querySelector('input[name="target-form"]:checked').value;
        const resultArea = document.getElementById('result-area');

        if (!sentence) {
            alert('문장을 입력해주세요!');
            return;
        }

        // Show loading
        resultArea.classList.remove('hidden');
        document.getElementById('result-text').innerText = "AI가 생각 중입니다... 🤖";
        document.getElementById('result-romaji').innerText = "";
        document.getElementById('result-explanation').innerText = "";

        try {
            const data = await ApiClient.transformSentence(sentence, targetForm);

            document.getElementById('result-text').innerText = data.result;
            document.getElementById('result-romaji').innerText = data.romaji || '';
            document.getElementById('result-explanation').innerText = data.explanation || '';
        } catch (err) {
            document.getElementById('result-text').innerText = "오류가 발생했습니다. (API Key 확인 필요)";
            console.error(err);
        }
    },

    async handleCheck() {
        const words = ["私", "学校", "行く", "バス"]; // Hardcoded for demo, can be dynamic later
        const userSentence = document.getElementById('user-composition').value;
        const resultArea = document.getElementById('check-result-area');

        if (!userSentence) {
            alert('문장을 만들어주세요!');
            return;
        }

        resultArea.classList.remove('hidden');
        document.getElementById('check-status').innerText = "채점 중... 📝";
        document.getElementById('check-feedback').innerText = "";

        try {
            const data = await ApiClient.checkSentence(words, userSentence);

            const statusElem = document.getElementById('check-status');
            if (data.is_correct) {
                statusElem.innerText = "✅ 정답입니다! 아주 자연스러워요.";
                statusElem.style.color = "green";
            } else {
                statusElem.innerText = "⚠️ 조금 어색해요.";
                statusElem.style.color = "orange";
            }
            document.getElementById('check-feedback').innerText = data.feedback;
        } catch (err) {
            document.getElementById('check-status').innerText = "오류 발생";
            console.error(err);
        }
    }
};

// Initialize when tab is active (logic to be added in main script)
window.GrammarPractice = GrammarPractice;
