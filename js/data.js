/**
 * data.js - 모든 데이터 저장소
 */

// 단어 데이터
const vocabularyData = {
    basic: [
        { word: 'こんにちは', romaji: 'こんにちは', meaning: '안녕하세요' },
        { word: 'ありがとう', romaji: 'ありがとう', meaning: '감사합니다' },
        { word: 'すみません', romaji: 'すみません', meaning: '죄송합니다 / 실례합니다' },
        { word: 'さようなら', romaji: 'さようなら', meaning: '안녕히 가세요' },
        { word: 'おはよう', romaji: 'おはよう', meaning: '안녕 (아침)' },
        { word: 'こんばんは', romaji: 'こんばんは', meaning: '안녕하세요 (저녁)' },
        { word: 'はい', romaji: 'はい', meaning: '네' },
        { word: 'いいえ', romaji: 'いいえ', meaning: '아니요' },
        { word: 'わかりました', romaji: 'わかりました', meaning: '알겠습니다' },
        { word: 'ください', romaji: 'ください', meaning: '주세요' }
    ],
    food: [
        { word: 'おいしい', romaji: 'おいしい', meaning: '맛있다' },
        { word: 'みず', romaji: 'みず', meaning: '물' },
        { word: 'ごはん', romaji: 'ごはん', meaning: '밥' },
        { word: 'パン', romaji: 'パン', meaning: '빵' },
        { word: 'たべる', romaji: 'たべる', meaning: '먹다' },
        { word: 'のむ', romaji: 'のむ', meaning: '마시다' }
    ],
    numbers: [
        { word: 'いち', romaji: 'いち', meaning: '1' },
        { word: 'に', romaji: 'に', meaning: '2' },
        { word: 'さん', romaji: 'さん', meaning: '3' },
        { word: 'し', romaji: 'し', meaning: '4' },
        { word: 'ご', romaji: 'ご', meaning: '5' },
        { word: 'ろく', romaji: 'ろく', meaning: '6' },
        { word: 'しち', romaji: 'しち', meaning: '7' },
        { word: 'はち', romaji: 'はち', meaning: '8' },
        { word: 'きゅう', romaji: 'きゅう', meaning: '9' },
        { word: 'じゅう', romaji: 'じゅう', meaning: '10' }
    ]
};

// 회화 데이터
const conversationData = {
    restaurant: [
        { jp: 'メニューをください', romaji: 'めにゅーをください', kr: '메뉴 주세요' },
        { jp: 'これをください', romaji: 'これをください', kr: '이것 주세요' },
        { jp: 'おいしいです', romaji: 'おいしいです', kr: '맛있어요' },
        { jp: 'お会計お願いします', romaji: 'おかいけいおねがいします', kr: '계산해 주세요' },
        { jp: 'いただきます', romaji: 'いただきます', kr: '잘 먹겠습니다' },
        { jp: 'ごちそうさまでした', romaji: 'ごちそうさまでした', kr: '잘 먹었습니다' }
    ],
    shopping: [
        { jp: 'いくらですか', romaji: 'いくらですか', kr: '얼마예요?' },
        { jp: 'これをください', romaji: 'これをください', kr: '이것 주세요' },
        { jp: 'もっと安いのはありますか', romaji: 'もっとやすいのはありますか', kr: '더 싼 것 있나요?' },
        { jp: '見てるだけです', romaji: 'みてるだけです', kr: '보고 있는 것뿐이에요' }
    ],
    direction: [
        { jp: 'どこですか', romaji: 'どこですか', kr: '어디예요?' },
        { jp: 'まっすぐ行ってください', romaji: 'まっすぐいってください', kr: '직진해 주세요' },
        { jp: '右に曲がってください', romaji: 'みぎにまがってください', kr: '오른쪽으로 도세요' },
        { jp: '左に曲がってください', romaji: 'ひだりにまがってください', kr: '왼쪽으로 도세요' }
    ]
};

// 히라가나 데이터
const hiraganaData = {
    'a': 'あ', 'i': 'い', 'u': 'う', 'e': 'え', 'o': 'お',
    'ka': 'か', 'ki': 'き', 'ku': 'く', 'ke': 'け', 'ko': 'こ',
    'sa': 'さ', 'shi': 'し', 'su': 'す', 'se': 'せ', 'so': 'そ',
    'ta': 'た', 'chi': 'ち', 'tsu': 'つ', 'te': 'て', 'to': 'と',
    'na': 'な', 'ni': 'に', 'nu': 'ぬ', 'ne': 'ね', 'no': 'の',
    'ha': 'は', 'hi': 'ひ', 'fu': 'ふ', 'he': 'へ', 'ho': 'ほ',
    'ma': 'ま', 'mi': 'み', 'mu': 'む', 'me': 'め', 'mo': 'も',
    'ya': 'や', 'yu': 'ゆ', 'yo': 'よ',
    'ra': 'ら', 'ri': 'り', 'ru': 'る', 're': 'れ', 'ro': 'ろ',
    'wa': 'わ', 'wo': 'を', 'n': 'ん'
};

// 가타카나 데이터
const katakanaData = {
    'a': 'ア', 'i': 'イ', 'u': 'ウ', 'e': 'エ', 'o': 'オ',
    'ka': 'カ', 'ki': 'キ', 'ku': 'ク', 'ke': 'ケ', 'ko': 'コ',
    'sa': 'サ', 'shi': 'シ', 'su': 'ス', 'se': 'セ', 'so': 'ソ',
    'ta': 'タ', 'chi': 'チ', 'tsu': 'ツ', 'te': 'テ', 'to': 'ト',
    'na': 'ナ', 'ni': 'ニ', 'nu': 'ヌ', 'ne': 'ネ', 'no': 'ノ',
    'ha': 'ハ', 'hi': 'ヒ', 'fu': 'フ', 'he': 'ヘ', 'ho': 'ホ',
    'ma': 'マ', 'mi': 'ミ', 'mu': 'ム', 'me': 'メ', 'mo': 'モ',
    'ya': 'ヤ', 'yu': 'ユ', 'yo': 'ヨ',
    'ra': 'ラ', 'ri': 'リ', 'ru': 'ル', 're': 'レ', 'ro': 'ロ',
    'wa': 'ワ', 'wo': 'ヲ', 'n': 'ン'
};

// 퀴즈 데이터
const quizData = {
    characters: [
        { question: 'あ', options: ['a', 'i', 'u', 'e'], correct: 0 },
        { question: 'い', options: ['a', 'i', 'u', 'e'], correct: 1 },
        { question: 'う', options: ['a', 'i', 'u', 'e'], correct: 2 },
        { question: 'え', options: ['a', 'i', 'u', 'e'], correct: 3 },
        { question: 'か', options: ['ka', 'ki', 'ku', 'ke'], correct: 0 },
        { question: 'き', options: ['ka', 'ki', 'ku', 'ke'], correct: 1 },
        { question: 'さ', options: ['sa', 'shi', 'su', 'se'], correct: 0 },
        { question: 'し', options: ['sa', 'shi', 'su', 'se'], correct: 1 },
        { question: 'た', options: ['ta', 'chi', 'tsu', 'te'], correct: 0 },
        { question: 'ち', options: ['ta', 'chi', 'tsu', 'te'], correct: 1 }
    ],
    vocabulary: [
        { question: 'こんにちは', options: ['안녕하세요', '감사합니다', '죄송합니다', '안녕히 가세요'], correct: 0 },
        { question: 'ありがとう', options: ['안녕하세요', '감사합니다', '죄송합니다', '안녕히 가세요'], correct: 1 },
        { question: 'すみません', options: ['안녕하세요', '감사합니다', '죄송합니다', '안녕히 가세요'], correct: 2 },
        { question: 'さようなら', options: ['안녕하세요', '감사합니다', '죄송합니다', '안녕히 가세요'], correct: 3 },
        { question: 'おいしい', options: ['맛있다', '예쁘다', '크다', '작다'], correct: 0 },
        { question: 'みず', options: ['밥', '빵', '물', '차'], correct: 2 },
        { question: 'ごはん', options: ['밥', '빵', '물', '차'], correct: 0 },
        { question: 'いち', options: ['1', '2', '3', '4'], correct: 0 },
        { question: 'に', options: ['1', '2', '3', '4'], correct: 1 },
        { question: 'さん', options: ['1', '2', '3', '4'], correct: 2 }
    ]
};

console.log('data.js loaded');
