/**
 * word_study.js - 다국어(JP-Kana-KR-EN) 단어 암기 플래시카드 시스템
 * * [업데이트 사항]
 * 1. 데이터 구조 강화: Kanji(한자)와 Kana(히라가나/가타카나) 분리 저장
 * 2. 디스플레이 순서 변경: 순번 -> 한자 -> 히라가나 -> 한글발음 -> 의미(한/영) -> 품사
 * 3. UI 개선: 가독성을 위한 타이포그래피 계층 구조 재설계
 */

// ==========================================
// 1. 단어 데이터 (Vocabulary Data with Kana & Numbering)
// ==========================================
const wordData = {
    'immigration': {
        title: '입국 심사 (Immigration)',
        icon: 'fas fa-passport',
        color: 'blue',
        words: [
            { id: 1, kanji: 'パスポート', kana: 'ぱすぽーと', kr_pron: '파스포-토', kr: '여권', en: 'Passport', type: '명사' },
            { id: 2, kanji: '入国カード', kana: 'にゅうこくかーど', kr_pron: '뉴-코쿠카-도', kr: '입국 카드', en: 'Arrival Card', type: '명사' },
            { id: 3, kanji: '見せる', kana: 'みせる', kr_pron: '미세루', kr: '보여주다', en: 'To show', type: '동사' },
            { id: 4, kanji: '目的', kana: 'もくてき', kr_pron: '모쿠테키', kr: '목적', en: 'Purpose', type: '명사' },
            { id: 5, kanji: '観光', kana: 'かんこう', kr_pron: '칸코-', kr: '관광', en: 'Sightseeing', type: '명사' },
            { id: 6, kanji: '仕事', kana: 'しごと', kr_pron: '시고토', kr: '일/업무', en: 'Work/Job', type: '명사' },
            { id: 7, kanji: '滞在', kana: 'たいざい', kr_pron: '타이자이', kr: '체류', en: 'Stay', type: '명사' },
            { id: 8, kanji: '期間', kana: 'きかん', kr_pron: '키칸', kr: '기간', en: 'Period', type: '명사' },
            { id: 9, kanji: '泊まる', kana: 'とまる', kr_pron: '토마루', kr: '묵다', en: 'To stay', type: '동사' },
            { id: 10, kanji: '指紋', kana: 'しもん', kr_pron: '시몬', kr: '지문', en: 'Fingerprint', type: '명사' }
        ]
    },
    'transportation': {
        title: '교통 (Transportation)',
        icon: 'fas fa-subway',
        color: 'red',
        words: [
            { id: 1, kanji: '電車', kana: 'でんしゃ', kr_pron: '덴샤', kr: '전철', en: 'Train', type: '명사' },
            { id: 2, kanji: '行く', kana: 'いく', kr_pron: '이쿠', kr: '가다', en: 'To go', type: '동사' },
            { id: 3, kanji: '反対', kana: 'はんたい', kr_pron: '한타이', kr: '반대', en: 'Opposite', type: '명사' },
            { id: 4, kanji: '方向', kana: 'ほうこう', kr_pron: '호-코-', kr: '방향', en: 'Direction', type: '명사' },
            { id: 5, kanji: '切符売り場', kana: 'きっぷうりば', kr_pron: '킵푸 우리바', kr: '매표소', en: 'Ticket Office', type: '명사' },
            { id: 6, kanji: '改札', kana: 'かいさつ', kr_pron: '카이사츠', kr: '개찰구', en: 'Ticket Gate', type: '명사' },
            { id: 7, kanji: '隣', kana: 'となり', kr_pron: '토나리', kr: '옆', en: 'Next to', type: '명사' },
            { id: 8, kanji: '自動券売機', kana: 'じどうけんばいき', kr_pron: '지도-켄바이키', kr: '자동 발매기', en: 'Ticket Machine', type: '명사' },
            { id: 9, kanji: '乗り換え', kana: 'のりかえ', kr_pron: '노리카에', kr: '환승', en: 'Transfer', type: '명사' },
            { id: 10, kanji: '降ろす', kana: 'おろす', kr_pron: '오로스', kr: '내려주다', en: 'To drop off', type: '동사' }
        ]
    },
    'hotel': {
        title: '호텔 (Hotel)',
        icon: 'fas fa-bed',
        color: 'green',
        words: [
            { id: 1, kanji: 'チェックイン', kana: 'ちぇっくいん', kr_pron: '쳇쿠인', kr: '체크인', en: 'Check-in', type: '명사' },
            { id: 2, kanji: '名前', kana: 'なまえ', kr_pron: '나마에', kr: '이름', en: 'Name', type: '명사' },
            { id: 3, kanji: '預かる', kana: 'あずかる', kr_pron: '아즈카루', kr: '맡다', en: 'To keep', type: '동사' },
            { id: 4, kanji: '朝食', kana: 'ちょうしょく', kr_pron: '쵸-쇼쿠', kr: '조식', en: 'Breakfast', type: '명사' },
            { id: 5, kanji: '部屋番号', kana: 'へやばんごう', kr_pron: '헤야 방고-', kr: '방 번호', en: 'Room Number', type: '명사' },
            { id: 6, kanji: '荷物', kana: 'にもつ', kr_pron: '니모츠', kr: '짐', en: 'Luggage', type: '명사' },
            { id: 7, kanji: '引換証', kana: 'ひきかえしょう', kr_pron: '히키카에쇼-', kr: '보관증', en: 'Claim Tag', type: '명사' },
            { id: 8, kanji: 'お湯', kana: 'おゆ', kr_pron: '오유', kr: '뜨거운 물', en: 'Hot water', type: '명사' },
            { id: 9, kanji: '予約', kana: 'よやく', kr_pron: '요야쿠', kr: '예약', en: 'Reservation', type: '명사' },
            { id: 10, kanji: '満室', kana: 'まんしつ', kr_pron: '만시츠', kr: '만실', en: 'No vacancy', type: '명사' }
        ]
    },
    'restaurant': {
        title: '식당 (Restaurant)',
        icon: 'fas fa-utensils',
        color: 'orange',
        words: [
            { id: 1, kanji: '何名', kana: 'なんめい', kr_pron: '난메-', kr: '몇 명', en: 'How many people', type: '명사' },
            { id: 2, kanji: '席', kana: 'せき', kr_pron: '세키', kr: '좌석', en: 'Seat', type: '명사' },
            { id: 3, kanji: '注文', kana: 'ちゅうもん', kr_pron: '츄-몬', kr: '주문', en: 'Order', type: '명사' },
            { id: 4, kanji: '決まる', kana: 'きまる', kr_pron: '키마루', kr: '정해지다', en: 'To be decided', type: '동사' },
            { id: 5, kanji: 'おすすめ', kana: 'おすすめ', kr_pron: '오스스메', kr: '추천', en: 'Recommendation', type: '명사' },
            { id: 6, kanji: '会計', kana: 'かいけい', kr_pron: '카이케이', kr: '계산', en: 'Check/Bill', type: '명사' },
            { id: 7, kanji: '別々', kana: 'べつべつ', kr_pron: '베츠베츠', kr: '따로따로', en: 'Separately', type: '명사' },
            { id: 8, kanji: '現金', kana: 'げんきん', kr_pron: '겐킨', kr: '현금', en: 'Cash', type: '명사' },
            { id: 9, kanji: '美味しい', kana: 'おいしい', kr_pron: '오이시-', kr: '맛있다', en: 'Delicious', type: '형용사' },
            { id: 10, kanji: '水', kana: 'みず', kr_pron: '미즈', kr: '물', en: 'Water', type: '명사' }
        ]
    },
    'shopping': {
        title: '쇼핑 (Shopping)',
        icon: 'fas fa-shopping-bag',
        color: 'purple',
        words: [
            { id: 1, kanji: '試着', kana: 'しちゃく', kr_pron: '시챠쿠', kr: '시착', en: 'Trying on', type: '명사' },
            { id: 2, kanji: '探す', kana: 'さがす', kr_pron: '사가스', kr: '찾다', en: 'To look for', type: '동사' },
            { id: 3, kanji: '在庫', kana: 'ざいこ', kr_pron: '자이코', kr: '재고', en: 'Stock', type: '명사' },
            { id: 4, kanji: '免税', kana: 'めんぜい', kr_pron: '멘제-', kr: '면세', en: 'Tax-free', type: '명사' },
            { id: 5, kanji: '包む', kana: 'つつむ', kr_pron: '츠츠무', kr: '포장하다', en: 'To wrap', type: '동사' },
            { id: 6, kanji: '有料', kana: 'ゆうりょう', kr_pron: '유-료-', kr: '유료', en: 'Fee-based', type: '명사' },
            { id: 7, kanji: '鏡', kana: 'かがみ', kr_pron: '카가미', kr: '거울', en: 'Mirror', type: '명사' },
            { id: 8, kanji: '高い', kana: 'たかい', kr_pron: '타카이', kr: '비싸다/높다', en: 'Expensive', type: '형용사' },
            { id: 9, kanji: '安い', kana: 'やすい', kr_pron: '야스이', kr: '싸다', en: 'Cheap', type: '형용사' },
            { id: 10, kanji: '現金', kana: 'げんきん', kr_pron: '겐킨', kr: '현금', en: 'Cash', type: '명사' }
        ]
    },
    'convenience': {
        title: '편의점 (Convenience Store)',
        icon: 'fas fa-store',
        color: 'teal',
        words: [
            { id: 1, kanji: 'お弁当', kana: 'おべんとう', kr_pron: '오벤토-', kr: '도시락', en: 'Bento', type: '명사' },
            { id: 2, kanji: '温める', kana: 'あたためる', kr_pron: '아타타메루', kr: '데우다', en: 'To warm up', type: '동사' },
            { id: 3, kanji: '袋', kana: 'ふくろ', kr_pron: '후쿠로', kr: '봉투', en: 'Bag', type: '명사' },
            { id: 4, kanji: '年齢', kana: 'ねんれい', kr_pron: '넨레-', kr: '나이', en: 'Age', type: '명사' },
            { id: 5, kanji: '押す', kana: 'おす', kr_pron: '오스', kr: '누르다', en: 'To push', type: '동사' },
            { id: 6, kanji: '画面', kana: 'がめん', kr_pron: '가멘', kr: '화면', en: 'Screen', type: '명사' },
            { id: 7, kanji: '借りる', kana: 'かりる', kr_pron: '카리루', kr: '빌리다', en: 'To borrow', type: '동사' },
            { id: 8, kanji: '箸', kana: 'はし', kr_pron: '하시', kr: '젓가락', en: 'Chopsticks', type: '명사' },
            { id: 9, kanji: 'スプーン', kana: 'すぷーん', kr_pron: '스푸-ㄴ', kr: '숟가락', en: 'Spoon', type: '명사' },
            { id: 10, kanji: 'トイレ', kana: 'といれ', kr_pron: '토이레', kr: '화장실', en: 'Toilet', type: '명사' }
        ]
    },
    'cafe': {
        title: '카페 (Cafe)',
        icon: 'fas fa-coffee',
        color: 'brown',
        words: [
            { id: 1, kanji: '店内', kana: 'てんない', kr_pron: '텐나이', kr: '매장 내', en: 'In-store', type: '명사' },
            { id: 2, kanji: '持ち帰り', kana: 'もちかえり', kr_pron: '모치카에리', kr: '포장', en: 'Take-out', type: '명사' },
            { id: 3, kanji: '氷', kana: 'こおり', kr_pron: '코-리', kr: '얼음', en: 'Ice', type: '명사' },
            { id: 4, kanji: '少なめ', kana: 'すくなめ', kr_pron: '스쿠나메', kr: '적게', en: 'Less', type: '명사' },
            { id: 5, kanji: '足す', kana: 'たす', kr_pron: '타스', kr: '더하다', en: 'To add', type: '동사' },
            { id: 6, kanji: '返却口', kana: 'へんきゃくぐち', kr_pron: '헨캬쿠구치', kr: '반납구', en: 'Return counter', type: '명사' },
            { id: 7, kanji: '砂糖', kana: 'さとう', kr_pron: '사토-', kr: '설탕', en: 'Sugar', type: '명사' },
            { id: 8, kanji: '甘い', kana: 'あまい', kr_pron: '아마이', kr: '달다', en: 'Sweet', type: '형용사' },
            { id: 9, kanji: '苦い', kana: 'にがい', kr_pron: '니가이', kr: '쓰다', en: 'Bitter', type: '형용사' },
            { id: 10, kanji: '注文', kana: 'ちゅうもん', kr_pron: '츄-몬', kr: '주문', en: 'Order', type: '명사' }
        ]
    },
    'tourism': {
        title: '관광 (Tourism)',
        icon: 'fas fa-map-marked-alt',
        color: 'indigo',
        words: [
            { id: 1, kanji: '写真', kana: 'しゃしん', kr_pron: '샤신', kr: '사진', en: 'Photo', type: '명사' },
            { id: 2, kanji: '撮る', kana: 'とる', kr_pron: '토루', kr: '찍다', en: 'To take (photo)', type: '동사' },
            { id: 3, kanji: '大人', kana: 'おとな', kr_pron: '오토나', kr: '어른', en: 'Adult', type: '명사' },
            { id: 4, kanji: '子供', kana: 'こども', kr_pron: '코도모', kr: '아이', en: 'Child', type: '명사' },
            { id: 5, kanji: '近い', kana: 'ちかい', kr_pron: '치카이', kr: '가깝다', en: 'Near', type: '형용사' },
            { id: 6, kanji: '歩く', kana: 'あるく', kr_pron: '아루쿠', kr: '걷다', en: 'To walk', type: '동사' },
            { id: 7, kanji: '最終', kana: 'さいしゅう', kr_pron: '사이슈-', kr: '최종/마지막', en: 'Final', type: '명사' },
            { id: 8, kanji: '入場', kana: 'にゅうじょう', kr_pron: '뉴-죠-', kr: '입장', en: 'Admission', type: '명사' },
            { id: 9, kanji: '地図', kana: 'ちず', kr_pron: '치즈', kr: '지도', en: 'Map', type: '명사' },
            { id: 10, kanji: '無料', kana: 'むりょう', kr_pron: '무료', kr: '무료', en: 'Free', type: '명사' }
        ]
    },
    'emergency': {
        title: '긴급 (Emergency)',
        icon: 'fas fa-first-aid',
        color: 'red',
        words: [
            { id: 1, kanji: '頭', kana: 'あたま', kr_pron: '아타마', kr: '머리', en: 'Head', type: '명사' },
            { id: 2, kanji: '痛い', kana: 'いたい', kr_pron: '이타이', kr: '아프다', en: 'Painful', type: '형용사' },
            { id: 3, kanji: '薬', kana: 'くすり', kr_pron: '쿠스리', kr: '약', en: 'Medicine', type: '명사' },
            { id: 4, kanji: '相談', kana: 'そうだん', kr_pron: '소-단', kr: '상담', en: 'Consultation', type: '명사' },
            { id: 5, kanji: 'なくす', kana: 'なくす', kr_pron: '나쿠스', kr: '잃어버리다', en: 'To lose', type: '동사' },
            { id: 6, kanji: '交番', kana: 'こうばん', kr_pron: '코-반', kr: '파출소', en: 'Police box', type: '명사' },
            { id: 7, kanji: '呼ぶ', kana: 'よぶ', kr_pron: '요부', kr: '부르다', en: 'To call', type: '동사' },
            { id: 8, kanji: '救急車', kana: 'きゅうきゅうしゃ', kr_pron: '큐-큐-샤', kr: '구급차', en: 'Ambulance', type: '명사' },
            { id: 9, kanji: '警察', kana: 'けいさつ', kr_pron: '케이사츠', kr: '경찰', en: 'Police', type: '명사' },
            { id: 10, kanji: '助けて', kana: 'たすけて', kr_pron: '타스케테', kr: '도와줘', en: 'Help me', type: '문장' }
        ]
    },
    'social': {
        title: '사교 (Social)',
        icon: 'fas fa-handshake',
        color: 'pink',
        words: [
            { id: 1, kanji: '来る', kana: 'くる', kr_pron: '쿠루', kr: '오다', en: 'To come', type: '동사' },
            { id: 2, kanji: '勉強', kana: 'べんきょう', kr_pron: '벤쿄-', kr: '공부', en: 'Study', type: '명사' },
            { id: 3, kanji: '時計', kana: 'とけい', kr_pron: '토케-', kr: '시계', en: 'Clock', type: '명사' },
            { id: 4, kanji: '天気', kana: 'てんき', kr_pron: '텐키', kr: '날씨', en: 'Weather', type: '명사' },
            { id: 5, kanji: '散歩', kana: 'さんぽ', kr_pron: '산포', kr: '산책', en: 'Walk', type: '명사' },
            { id: 6, kanji: '尋ねる', kana: 'たずねる', kr_pron: '타즈네루', kr: '묻다', en: 'To ask', type: '동사' },
            { id: 7, kanji: '急ぐ', kana: 'いそぐ', kr_pron: '이소구', kr: '서두르다', en: 'To hurry', type: '동사' },
            { id: 8, kanji: '雨', kana: 'あめ', kr_pron: '아메', kr: '비', en: 'Rain', type: '명사' },
            { id: 9, kanji: '友達', kana: 'ともだち', kr_pron: '토모다치', kr: '친구', en: 'Friend', type: '명사' },
            { id: 10, kanji: '趣味', kana: 'しゅみ', kr_pron: '슈미', kr: '취미', en: 'Hobby', type: '명사' }
        ]
    }
};

// ==========================================
// 2. 상태 관리 변수
// ==========================================
let currentWordCategory = '';
let currentWordIndex = 0;
let isCardFlipped = false;
let isShuffled = false;
let activeWordList = [];

// ==========================================
// 3. 초기화 및 유틸리티
// ==========================================
function initWordStudy() {
    renderWordCategories();
    document.addEventListener('keydown', handleKeyboardInput);
    console.log('단어 학습 모듈(Kana Enhanced) 초기화 완료');
}

function handleKeyboardInput(e) {
    const lessonView = document.getElementById('word-lesson');
    if (!lessonView || lessonView.style.display === 'none') return;

    if (e.code === 'Space') {
        e.preventDefault();
        flipCard();
    } else if (e.code === 'ArrowRight') {
        nextWord();
    } else if (e.code === 'ArrowLeft') {
        prevWord();
    } else if (e.code === 'ArrowUp' || e.code === 'ArrowDown') {
        const currentWord = activeWordList[currentWordIndex];
        playWordAudio(currentWord.kanji);
    }
}

function playWordAudio(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
    } else {
        alert('이 브라우저는 음성 재생을 지원하지 않습니다.');
    }
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// ==========================================
// 4. 카테고리 렌더링
// ==========================================
function renderWordCategories() {
    const container = document.getElementById('word-grid');
    if (!container) return;

    container.innerHTML = '';

    Object.keys(wordData).forEach(key => {
        const data = wordData[key];
        const card = document.createElement('div');
        
        card.className = `bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 group relative overflow-hidden`;
        
        const colorClass = data.color === 'blue' ? 'border-blue-500' :
                           data.color === 'red' ? 'border-red-500' :
                           data.color === 'green' ? 'border-green-500' :
                           data.color === 'orange' ? 'border-orange-500' :
                           data.color === 'purple' ? 'border-purple-500' :
                           data.color === 'teal' ? 'border-teal-500' :
                           data.color === 'brown' ? 'border-yellow-700' :
                           data.color === 'indigo' ? 'border-indigo-500' :
                           data.color === 'pink' ? 'border-pink-500' : 'border-gray-500';
                           
        card.classList.add(colorClass);

        card.innerHTML = `
            <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <i class="${data.icon} text-6xl text-gray-800"></i>
            </div>
            <div class="relative z-10">
                <div class="flex items-center justify-between mb-3">
                    <i class="${data.icon} text-${data.color}-500 text-3xl group-hover:scale-110 transition-transform"></i>
                    <span class="text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded uppercase">Word Book</span>
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-1 truncate">${data.title}</h3>
                <p class="text-sm text-gray-500 mb-4">${data.words.length} Words</p>
                <div class="flex items-center text-xs font-medium text-${data.color}-600 group-hover:underline">
                    학습 시작하기 <i class="fas fa-arrow-right ml-1"></i>
                </div>
            </div>
        `;
        
        card.onclick = () => openWordLesson(key);
        container.appendChild(card);
    });
}

// ==========================================
// 5. 학습 화면 진입
// ==========================================
function openWordLesson(category) {
    currentWordCategory = category;
    currentWordIndex = 0;
    isCardFlipped = false;
    isShuffled = false;
    
    activeWordList = [...wordData[category].words];

    document.getElementById('word-categories').style.display = 'none';
    const lessonView = document.getElementById('word-lesson');
    lessonView.style.display = 'block';
    
    const data = wordData[category];
    document.getElementById('word-lesson-title').innerHTML = `
        <span class="flex items-center gap-2">
            <i class="${data.icon}"></i> ${data.title}
        </span>
    `;

    renderCard();
    updateWordNavigation();
}

function toggleShuffle() {
    isShuffled = !isShuffled;
    currentWordIndex = 0;
    isCardFlipped = false;
    
    const shuffleBtn = document.getElementById('btn-shuffle');
    
    if (isShuffled) {
        activeWordList = shuffleArray([...wordData[currentWordCategory].words]);
        if(shuffleBtn) {
            shuffleBtn.classList.add('bg-indigo-100', 'text-indigo-700');
            shuffleBtn.innerHTML = '<i class="fas fa-random mr-1"></i> 셔플 켜짐';
        }
    } else {
        activeWordList = [...wordData[currentWordCategory].words]; // ID 순서 복구
        if(shuffleBtn) {
            shuffleBtn.classList.remove('bg-indigo-100', 'text-indigo-700');
            shuffleBtn.innerHTML = '<i class="fas fa-random mr-1"></i> 셔플 끄기';
        }
    }
    
    renderCard();
    updateWordNavigation();
}

// ==========================================
// 6. 플래시카드 렌더링 (순서: 한자 -> 히라가나 -> 발음 -> 뜻 -> 품사)
// ==========================================
function renderCard() {
    const word = activeWordList[currentWordIndex];
    const container = document.getElementById('word-card-container');
    
    let contentHtml = '';
    
    if (!isCardFlipped) {
        // [앞면] 번호 + 한자(메인)
        contentHtml = `
            <div class="w-full h-[500px] flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl border-2 border-gray-100 cursor-pointer hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group" onclick="flipCard()">
                
                <!-- 상단 번호 뱃지 -->
                <div class="absolute top-6 left-6">
                    <span class="px-3 py-1 rounded-full bg-gray-800 text-white text-sm font-bold tracking-widest shadow-md">
                        #${String(word.id).padStart(2, '0')}
                    </span>
                </div>
                
                <!-- 오디오 버튼 -->
                <button onclick="event.stopPropagation(); playWordAudio('${word.kanji}')" class="absolute top-6 right-6 w-12 h-12 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-colors shadow-sm z-10">
                    <i class="fas fa-volume-up text-lg"></i>
                </button>

                <!-- 메인 한자 -->
                <div class="text-center z-0 px-4">
                    <div class="text-xs text-gray-400 font-bold uppercase mb-4 tracking-widest">Japanese (Kanji)</div>
                    <div class="text-6xl md:text-8xl font-black text-gray-800 mb-6 tracking-tight group-hover:scale-105 transition-transform duration-300">
                        ${word.kanji}
                    </div>
                </div>

                <!-- 하단 힌트 -->
                <div class="absolute bottom-10 text-gray-400 font-medium text-sm animate-bounce">
                    Click to flip
                </div>
                <div class="absolute bottom-0 w-full h-3 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            </div>
        `;
    } else {
        // [뒷면] 히라가나 -> 한글발음 -> 뜻 -> 품사 순서 배치
        contentHtml = `
            <div class="w-full h-[500px] flex flex-col bg-blue-50 rounded-2xl shadow-xl border-2 border-blue-200 cursor-pointer relative overflow-hidden" onclick="flipCard()">
                
                <!-- 상단: 한자 작게 (참고용) -->
                <div class="w-full py-4 bg-white/50 border-b border-blue-100 text-center relative">
                    <span class="text-gray-400 text-sm font-bold mr-2">#${String(word.id).padStart(2, '0')}</span>
                    <span class="text-2xl font-bold text-gray-600">${word.kanji}</span>
                    <button onclick="event.stopPropagation(); playWordAudio('${word.kanji}')" class="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>

                <!-- 메인 내용 영역 (Flex Column) -->
                <div class="flex-1 flex flex-col items-center justify-center p-6 space-y-6 overflow-y-auto">
                    
                    <!-- 1. 히라가나 (가장 강조) -->
                    <div class="text-center w-full">
                        <div class="text-[10px] text-blue-400 font-bold uppercase mb-1">1. Reading (Kana)</div>
                        <div class="text-5xl font-bold text-blue-600 font-serif">
                            ${word.kana}
                        </div>
                    </div>

                    <!-- 2. 한글 발음 -->
                    <div class="text-center w-full bg-white rounded-lg py-2 shadow-sm border border-blue-100">
                        <div class="text-[10px] text-gray-400 font-bold uppercase mb-1">2. Pronunciation</div>
                        <div class="text-xl font-medium text-gray-700">
                            [ ${word.kr_pron} ]
                        </div>
                    </div>

                    <!-- 3. 의미 (한글/영어) -->
                    <div class="text-center w-full grid grid-cols-2 gap-4">
                        <div class="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <div class="text-[10px] text-gray-400 font-bold uppercase mb-1">3. Korean</div>
                            <div class="text-2xl font-bold text-gray-800 break-keep">${word.kr}</div>
                        </div>
                        <div class="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <div class="text-[10px] text-indigo-400 font-bold uppercase mb-1">4. English</div>
                            <div class="text-lg font-medium text-indigo-700 leading-tight flex items-center justify-center h-full">${word.en}</div>
                        </div>
                    </div>

                    <!-- 4. 품사 (뱃지) -->
                    <div class="mt-2">
                        <span class="px-3 py-1 bg-gray-200 text-gray-600 rounded-full text-xs font-bold uppercase">
                            ${word.type}
                        </span>
                    </div>

                </div>
            </div>
        `;
    }

    container.innerHTML = contentHtml;
    
    if(isCardFlipped) {
        playWordAudio(word.kanji);
    }
}

// ==========================================
// 7. 네비게이션
// ==========================================
function flipCard() {
    isCardFlipped = !isCardFlipped;
    renderCard();
}

function prevWord() {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        isCardFlipped = false;
        renderCard();
        updateWordNavigation();
    }
}

function nextWord() {
    if (currentWordIndex < activeWordList.length - 1) {
        currentWordIndex++;
        isCardFlipped = false;
        renderCard();
        updateWordNavigation();
    }
}

function updateWordNavigation() {
    const prevBtn = document.getElementById('word-prev-btn');
    const nextBtn = document.getElementById('word-next-btn');
    const counter = document.getElementById('word-counter');

    if (counter) {
        counter.innerText = `${currentWordIndex + 1} / ${activeWordList.length}`;
    }

    if (prevBtn) {
        prevBtn.disabled = currentWordIndex === 0;
        prevBtn.className = currentWordIndex === 0 
            ? 'text-gray-300 cursor-not-allowed' 
            : 'text-gray-600 hover:text-blue-600 transition-colors';
    }

    if (nextBtn) {
        nextBtn.disabled = currentWordIndex === activeWordList.length - 1;
        nextBtn.className = currentWordIndex === activeWordList.length - 1
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-600 hover:text-blue-600 transition-colors';
    }
    
    const progressBar = document.getElementById('word-progress-bar');
    if (progressBar) {
        const percent = ((currentWordIndex + 1) / activeWordList.length) * 100;
        progressBar.style.width = `${percent}%`;
    }
}

function backToWordCategories() {
    document.getElementById('word-categories').style.display = 'block';
    document.getElementById('word-lesson').style.display = 'none';
    isShuffled = false; 
    
    const shuffleBtn = document.getElementById('btn-shuffle');
    if(shuffleBtn) {
        shuffleBtn.classList.remove('bg-indigo-100', 'text-indigo-700');
        shuffleBtn.innerHTML = '<i class="fas fa-random mr-1"></i> 셔플 끄기';
    }
}

console.log('word_study.js (Kana Enhanced) 로드 완료');