const fs = require('fs');
const path = require('path');

const conversationPath = path.join(__dirname, 'js', 'conversation.js');
const wordsDataPath = path.join(__dirname, 'js', 'words_data.js');
const outputPath = path.join(__dirname, 'js', 'conversation.js');

console.log('📖 Loading data...');

// 1. Load words_data.js
let wordList = [];
try {
    let wordsContent = fs.readFileSync(wordsDataPath, 'utf8');
    const start = wordsContent.indexOf('[');
    const end = wordsContent.lastIndexOf(']');
    if (start !== -1 && end !== -1) {
        const jsonStr = wordsContent.substring(start, end + 1);
        wordList = eval(jsonStr);
    }
} catch (e) {
    console.error('Warning: Could not load words_data.js, proceeding with supplemental only.', e);
}

// Supplemental Dictionary
const supplementalWords = [
    { word: 'ありがとう', read: 'ありがとう', mean: '고맙습니다', type: '인사' },
    { word: 'どういたしまして', read: 'どういたしまして', mean: '천만에요', type: '인사' },
    { word: 'すみません', read: 'すみません', mean: '죄송합니다/실례합니다', type: '인사' },
    { word: '使う', read: 'つかう', mean: '사용하다', type: '동사', stem: '使' },
    { word: '助ける', read: 'たすける', mean: '돕다', type: '동사', stem: '助' },
    { word: '食べる', read: 'たべる', mean: '먹다', type: '동사', stem: '食' },
    { word: '飲む', read: 'のむ', mean: '마시다', type: '동사', stem: '飲' },
    { word: '行く', read: 'いく', mean: '가다', type: '동사', stem: '行' },
    { word: '来る', read: 'くる', mean: '오다', type: '동사', stem: '来' },
    { word: '見る', read: 'みる', mean: '보다', type: '동사', stem: '見' },
    { word: '聞く', read: 'きく', mean: '듣다', type: '동사', stem: '聞' },
    { word: '話す', read: 'はなす', mean: '말하다', type: '동사', stem: '話' },
    { word: '会う', read: 'あう', mean: '만나다', type: '동사', stem: '会' },
    { word: '考える', read: 'かんがえる', mean: '생각하다', type: '동사', stem: '考' },
    { word: '思う', read: 'おもう', mean: '생각하다', type: '동사', stem: '思' },
    { word: '勉強', read: 'べんきょう', mean: '공부', type: '명사', stem: '勉' },
    { word: '好き', read: 'すき', mean: '좋아하다', type: '나형용사', stem: '好' },
    { word: '嫌い', read: 'きらい', mean: '싫어하다', type: '나형용사', stem: '嫌' },
    { word: '上手', read: 'じょうず', mean: '잘하다', type: '나형용사' },
    { word: '下手', read: 'へた', mean: '못하다', type: '나형용사' },
    { word: '面白い', read: 'おもしろい', mean: '재미있다', type: '이형용사', stem: '面白' },
    { word: '楽しい', read: 'たのしい', mean: '즐겁다', type: '이형용사', stem: '楽' },
    { word: '難しい', read: 'むずかしい', mean: '어렵다', type: '이형용사', stem: '難' },
    { word: '易しい', read: 'やさしい', mean: '쉽다', type: '이형용사', stem: '易' },
    { word: '高い', read: 'たかい', mean: '비싸다/높다', type: '이형용사', stem: '高' },
    { word: '安い', read: 'やすい', mean: '싸다', type: '이형용사', stem: '安' },
    { word: '新しい', read: 'あたらしい', mean: '새롭다', type: '이형용사', stem: '新' },
    { word: '古い', read: 'ふるい', mean: '낡다', type: '이형용사', stem: '古' },
];

const allWords = [...wordList.map(w => ({
    word: w.japanese_word,
    read: w.reading,
    mean: w.korean_meaning,
    type: '핵심단어'
})), ...supplementalWords];

console.log(`✅ Dictionary ready with ${allWords.length} words.`);

// 2. Load conversation.js
let convContent = fs.readFileSync(conversationPath, 'utf8');

// Robust parsing using brace counting
function extractObject(content, startMarker) {
    const startIndex = content.indexOf(startMarker);
    if (startIndex === -1) return null;

    let openBraces = 0;
    let foundStart = false;
    let objectStart = -1;

    // Start searching from the marker
    for (let i = startIndex; i < content.length; i++) {
        if (content[i] === '{') {
            if (!foundStart) {
                objectStart = i;
                foundStart = true;
            }
            openBraces++;
        } else if (content[i] === '}') {
            openBraces--;
            if (foundStart && openBraces === 0) {
                return {
                    start: objectStart,
                    end: i + 1,
                    content: content.substring(objectStart, i + 1)
                };
            }
        }
    }
    return null;
}

const startMarker = 'const conversationModuleData =';
const extracted = extractObject(convContent, startMarker);

if (!extracted) {
    console.error('Could not extract conversationModuleData object');
    process.exit(1);
}

let convData = {};
try {
    // Wrap in parentheses for eval
    convData = eval('(' + extracted.content + ')');
} catch (e) {
    console.error('Error parsing extracted object:', e);
    process.exit(1);
}

console.log('🔍 Enriching vocab & Fixing Korean...');

let stats = { total: 0, added: 0, fixed: 0 };

// Korean Grammar Fixer
function fixKoreanGrammar(text) {
    if (!text) return text;
    let original = text;

    // Common conjugation errors fix
    text = text.replace(/하다습니다/g, '합니다');
    text = text.replace(/하다요/g, '해요');
    text = text.replace(/오다습니다/g, '옵니다');
    text = text.replace(/가다습니다/g, '갑니다');
    text = text.replace(/먹다습니다/g, '먹습니다');
    text = text.replace(/보다습니다/g, '봅니다');
    text = text.replace(/있다습니다/g, '있습니다');
    text = text.replace(/없다습니다/g, '없습니다');
    text = text.replace(/이다습니다/g, '입니다');
    text = text.replace(/생각하다습니다/g, '생각합니다');
    text = text.replace(/좋아하다습니다/g, '좋아합니다');

    // General "다습니다" -> "습니다" (risky but likely needed for this dataset)
    // Only apply if preceded by a hangul char
    text = text.replace(/([가-힣])다습니다/g, '$1습니다');

    return text;
}

Object.values(convData).forEach(category => {
    if (category.conversations) {
        category.conversations.forEach(conv => {
            stats.total++;

            // 1. Fix Korean
            if (conv.question && conv.question.kr) {
                const oldKrQ = conv.question.kr;
                const newKrQ = fixKoreanGrammar(oldKrQ);
                if (oldKrQ !== newKrQ) {
                    conv.question.kr = newKrQ;
                    stats.fixed++;
                }
            }

            if (conv.answers) {
                conv.answers.forEach(ans => {
                    if (ans.kr) {
                        const oldKrA = ans.kr;
                        const newKrA = fixKoreanGrammar(oldKrA);
                        if (oldKrA !== newKrA) {
                            ans.kr = newKrA;
                            stats.fixed++;
                        }
                    }
                });
            }

            // 2. Enrich Vocab
            if (conv.question && conv.question.jp) {
                const jpSentence = conv.question.jp;
                if (!conv.question.vocab) conv.question.vocab = [];

                const hasWord = (w) => conv.question.vocab.some(v => v.word === w);

                allWords.forEach(dictWord => {
                    let match = false;
                    if (jpSentence.includes(dictWord.word)) match = true;
                    else if (dictWord.stem && jpSentence.includes(dictWord.stem)) match = true;

                    if (match && !hasWord(dictWord.word)) {
                        conv.question.vocab.push({
                            word: dictWord.word,
                            read: dictWord.read,
                            mean: dictWord.mean,
                            type: dictWord.type
                        });
                        stats.added++;
                    }
                });
            }
        });
    }
});

console.log(`📊 Results:
  Total conversations: ${stats.total}
  Added words: ${stats.added}
  Fixed Korean sentences: ${stats.fixed}
`);

// 3. Save back
console.log('💾 Saving...');

const newDataStr = JSON.stringify(convData, null, 4);
const newContent = convContent.substring(0, extracted.start) +
    newDataStr +
    convContent.substring(extracted.end);

fs.writeFileSync(outputPath, newContent, 'utf8');
console.log('✅ Done! conversation.js updated.');
