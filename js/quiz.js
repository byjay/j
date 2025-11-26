/**
 * quiz.js - 퀴즈 모듈 (문자 + 단어)
 */

let currentQuizType = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let quizStartTime = null;

// 퀴즈 시작
function startQuiz(type) {
    currentQuizType = type;
    currentQuestions = [...quizData[type]]; // 복사
    currentQuestionIndex = 0;
    userAnswers = [];
    quizStartTime = Date.now();

    // 문제 섞기
    shuffleArray(currentQuestions);

    // UI 업데이트
    document.querySelectorAll('.category-buttons').forEach(el => el.style.display = 'none');
    document.getElementById('quiz-content').style.display = 'block';
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-total').textContent = currentQuestions.length;

    displayQuestion();
}

// 배열 섞기
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 문제 표시
function displayQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        showQuizResult();
        return;
    }

    const question = currentQuestions[currentQuestionIndex];

    // 진행도 업데이트
    document.getElementById('quiz-current').textContent = currentQuestionIndex + 1;

    // 문제 표시
    document.getElementById('quiz-question').textContent = question.question;

    // 선택지 표시
    const optionsContainer = document.getElementById('quiz-options');

    // 문자 퀴즈인 경우 그리드 레이아웃 적용
    if (currentQuizType === 'characters') {
        optionsContainer.classList.add('character-grid');
    } else {
        optionsContainer.classList.remove('character-grid');
    }

    let html = '';
    question.options.forEach((option, index) => {
        html += `
            <button class="quiz-option" onclick="selectAnswer(${index})">
                ${index + 1}. ${option}
            </button>
        `;
    });
    optionsContainer.innerHTML = html;

    // 다음 버튼 숨기기
    document.getElementById('next-btn').style.display = 'none';
}

// 답 선택
function selectAnswer(selectedIndex) {
    const question = currentQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;

    // 답안 저장
    userAnswers.push({
        question: question.question,
        selected: selectedIndex,
        correct: question.correct,
        isCorrect: isCorrect
    });

    // 선택지 비활성화 및 정답 표시
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        option.classList.add('disabled');
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedIndex && !isCorrect) {
            option.classList.add('incorrect');
        }
    });

    // 다음 버튼 표시
    document.getElementById('next-btn').style.display = 'block';
}

// 다음 문제
function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

// 퀴즈 결과 표시
function showQuizResult() {
    const correctCount = userAnswers.filter(a => a.isCorrect).length;
    const totalCount = userAnswers.length;
    const accuracy = Math.round((correctCount / totalCount) * 100);

    // 퀴즈 시간 계산
    const quizTime = Math.round((Date.now() - quizStartTime) / 1000 / 60); // 분

    // UI 업데이트
    document.getElementById('quiz-content').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('result-score').textContent = correctCount;
    document.getElementById('result-total').textContent = totalCount;
    document.getElementById('result-accuracy').textContent = accuracy;

    // 진도 저장
    if (currentUser) {
        const progress = loadUserProgress(currentUser.id);
        const quizKey = currentQuizType === 'characters' ? 'characterQuiz' : 'vocabularyQuiz';

        progress[quizKey].completed += 1;
        progress[quizKey].accuracy = accuracy;

        // 일별 학습 시간 추가
        const today = new Date().toISOString().split('T')[0];
        const dailyIndex = progress.dailyStudy.findIndex(d => d.date === today);
        if (dailyIndex >= 0) {
            progress.dailyStudy[dailyIndex].minutes += quizTime;
        } else {
            progress.dailyStudy.push({ date: today, minutes: quizTime });
        }

        saveUserProgress(currentUser.id, progress);
    }
}

// 퀴즈 다시 시작
function restartQuiz() {
    startQuiz(currentQuizType);
}

console.log('quiz.js loaded');
