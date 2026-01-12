/**
 * elementary_data.js - 일본 초등학교 학습 데이터 (복구본)
 * 
 * 데이터 구조:
 * window.grade{N}_data = {
 *   info: { description: "..." },
 *   vocabulary: [ { id, kanji, kana, romaji, korean, category }, ... ],
 *   chapters: [ ... ] // Optional: Textbook content
 * }
 */

// ==========================================
// 1학년 (Grade 1) - 기초
// ==========================================
window.grade1_data = {
    info: { description: "히라가나, 숫자, 기초 인사말 배우기" },
    vocabulary: [
        // 숫자 (1-10)
        { category: '숫자', kanji: '一', kana: 'いち', romaji: 'ichi', korean: '일' },
        { category: '숫자', kanji: '二', kana: 'に', romaji: 'ni', korean: '이' },
        { category: '숫자', kanji: '三', kana: 'さん', romaji: 'san', korean: '삼' },
        { category: '숫자', kanji: '四', kana: 'よん', romaji: 'yon', korean: '사' },
        { category: '숫자', kanji: '五', kana: 'ご', romaji: 'go', korean: '오' },
        { category: '숫자', kanji: '六', kana: 'ろく', romaji: 'roku', korean: '육' },
        { category: '숫자', kanji: '七', kana: 'なな', romaji: 'nana', korean: '칠' },
        { category: '숫자', kanji: '八', kana: 'はち', romaji: 'hachi', korean: '팔' },
        { category: '숫자', kanji: '九', kana: 'きゅう', romaji: 'kyuu', korean: '구' },
        { category: '숫자', kanji: '十', kana: 'じゅう', romaji: 'juu', korean: '십' },
        // 인사
        { category: '인사', kanji: 'おはよう', kana: 'おはよう', romaji: 'ohayou', korean: '아침 인사' },
        { category: '인사', kanji: 'こんにちは', kana: 'こんにちは', romaji: 'konnichiwa', korean: '점심 인사' },
        { category: '인사', kanji: 'こんばんは', kana: 'こんばんは', romaji: 'konbanwa', korean: '저녁 인사' },
        { category: '인사', kanji: 'ありがとう', kana: 'ありがとう', romaji: 'arigatou', korean: '고맙습니다' },
        { category: '인사', kanji: 'さようなら', kana: 'さようなら', romaji: 'sayounara', korean: '안녕히 가세요' },
        // 가족
        { category: '가족', kanji: '父', kana: 'ちち', romaji: 'chichi', korean: '아빠(내 가족)' },
        { category: '가족', kanji: '母', kana: 'はは', romaji: 'haha', korean: '엄마(내 가족)' },
        { category: '가족', kanji: '私', kana: 'わたし', romaji: 'watashi', korean: '나/저' },
        { category: '가족', kanji: '兄', kana: 'あに', romaji: 'ani', korean: '형/오빠' },
        { category: '가족', kanji: '姉', kana: 'あね', romaji: 'ane', korean: '누나/언니' }
    ],
    chapters: [
        {
            order: 1,
            title: "일본어의 시작",
            subtitle: "히라가나와 인사말",
            lessons: [
                {
                    lesson_id: "g1_c1_l1",
                    order: 1,
                    title: "아침 인사를 해요",
                    content: {
                        introduction: "친구를 만나면 밝게 인사해봐요!",
                        key_points: [
                            { title: "おはよう (오하요-)", explanation: "아침에 만났을 때 하는 인사예요." },
                            { title: "こんにちは (콘니치와)", explanation: "낮에 하는 인사예요." }
                        ]
                    }
                }
            ]
        }
    ]
};

// ==========================================
// 2학년 (Grade 2) - 기초 문법
// ==========================================
window.grade2_data = {
    info: { description: "기초 문법과 동사 활용" },
    vocabulary: [
        { category: '동사', kanji: '食べる', kana: 'たべる', romaji: 'taberu', korean: '먹다' },
        { category: '동사', kanji: '飲む', kana: 'のむ', romaji: 'nomu', korean: '마시다' },
        { category: '동사', kanji: '見る', kana: 'みる', romaji: 'miru', korean: '보다' },
        { category: '동사', kanji: '行く', kana: 'いく', romaji: 'iku', korean: '가다' },
        { category: '동사', kanji: '来る', kana: 'くる', romaji: 'kuru', korean: '오다' }
    ]
};

// ==========================================
// 3학년 (Grade 3) - 형용사
// ==========================================
window.grade3_data = {
    info: { description: "이형용사와 나형용사" },
    vocabulary: [
        { category: '형용사', kanji: '大きい', kana: 'おおきい', romaji: 'ookii', korean: '크다' },
        { category: '형용사', kanji: '小さい', kana: 'ちいさい', romaji: 'chiisai', korean: '작다' },
        { category: '형용사', kanji: '高い', kana: 'たかい', romaji: 'takai', korean: '비싸다/높다' },
        { category: '형용사', kanji: '安い', kana: 'やすい', romaji: 'yasui', korean: '싸다' },
        { category: '형용사', kanji: '新しい', kana: 'あたらしい', romaji: 'atarashii', korean: '새롭다' }
    ]
};

// ==========================================
// 4~6학년 (Placeholders)
// ==========================================
window.grade4_data = { info: { description: "중급 한자와 문형" }, vocabulary: [] };
window.grade5_data = { info: { description: "고급 표현과 독해" }, vocabulary: [] };
window.grade6_data = { info: { description: "초등학교 과정 완성" }, vocabulary: [] };

console.log('[elementary_data.js] Data Loaded Successfully');
