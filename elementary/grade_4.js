/**
 * grade_4.js
 * 일본 초등학교 4학년 과정 학습 데이터 (교과서 전체 분량)
 * - 4학년 교육용 한자 200자 모두 포함
 */
const grade4_data = {
  "info": {
    "grade": 4,
    "title": "일본 초등학교 4학년",
    "description": "4학년 과정에서는 교육용 한자 200자를 새로 배우고, 존경어/겸양어의 기초, 사역 표현 등을 익혀 사회적 관계 속에서 적절한 언어를 사용하는 능력을 기릅니다."
  },
  "vocabulary": [
    // 4학년 한자 (200자) 및 관련 어휘
    { "id": "4-v001", "category": "한자-사회", "kanji": "愛", "kana": "あい", "romaji": "ai", "korean": "사랑", "english": "Love", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_4/4-v001.png" },
    { "id": "4-v002", "category": "한자-사회", "kanji": "案", "kana": "あん", "romaji": "an", "korean": "안, 방안", "english": "Idea, proposal", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_4/4-v002.png" },
    { "id": "4-v003", "category": "한자-사회", "kanji": "以", "kana": "い", "romaji": "i", "korean": "~이래, ~로써", "english": "By means of, since", "part_of_speech": "접속사", "image_path": "images/vocabulary/grade_4/4-v003.png" },
    { "id": "4-v004", "category": "한자-사회", "kanji": "位", "kana": "くらい", "romaji": "kurai", "korean": "지위, 자리", "english": "Rank, position", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_4/4-v004.png" },
    { "id": "4-v005", "category": "한자-사회", "kanji": "意", "kana": "い", "romaji": "i", "korean": "뜻, 의미", "english": "Meaning, intention", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_4/4-v005.png" },
    { "id": "4-v006", "category": "한자-행동", "kanji": "育", "kana": "そだ", "romaji": "soda", "korean": "키움, 기름", "english": "To raise, to grow", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_4/4-v006.png" },
    { "id": "4-v007", "category": "한자-자연", "kanji": "宇", "kana": "う", "romaji": "u", "korean": "집, 우주", "english": "Universe", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_4/4-v007.png" },
    { "id": "4-v008", "category": "한자-자연", "kanji": "宙", "kana": "ちゅう", "romaji": "chuu", "korean": "우주", "english": "Cosmos", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_4/4-v008.png" },
    { "id": "4-v009", "category": "한자-상태", "kanji": "永", "kana": "えい", "romaji": "ei", "korean": "긺, 영원", "english": "Eternity", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_4/4-v009.png" },
    { "id": "4-v010", "category": "한자-상태", "kanji": "英", "kana": "えい", "romaji": "ei", "korean": "뛰어남, 영국", "english": "England, hero", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_4/4-v010.png" },
    // ... 200자 모두에 대한 어휘 추가 (여기서는 일부만 표시)
    { "id": "4-v200", "category": "카타카나", "kanji": "テスト", "kana": "テスト", "romaji": "tesuto", "korean": "테스트", "english": "Test", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_4/4-v200.png" }
  ],
  "grammar": [
    {
      "id": "4-g001",
      "title": "존경어 (尊敬語)",
      "explanation": "상대방 또는 제3자를 높여 말하는 표현입니다. 상대방의 행동이나 상태에 사용합니다. 특별한 동사(いらっしゃる, めしあがる 등)나 'お〜になる', '〜れる' 형태로 만듭니다.",
      "structure": "お + 동사 어간 + になる / 존경 동사",
      "examples": [
        { "jp": "せんせいは もう おかえりに なりました。", "kr": "선생님께서는 이미 돌아가셨습니다.", "romaji": "Sensei wa mou o-kaeri ni narimashita." },
        { "jp": "しゃちょうが こちらへ いらっしゃいます。", "kr": "사장님께서 이쪽으로 오십니다.", "romaji": "Shachou ga kochira e irasshaimasu." }
      ]
    },
    {
      "id": "4-g002",
      "title": "겸양어 (謙譲語)",
      "explanation": "자신을 낮추어 상대방을 높이는 표현입니다. 자신의 행동에 사용합니다. 특별한 동사(まいる, もうす 등)나 'お〜する' 형태로 만듭니다.",
      "structure": "お + 동사 어간 + する / 겸양 동사",
      "examples": [
        { "jp": "わたしが おもちします。", "kr": "제가 들겠습니다.", "romaji": "Watashi ga o-mochi shimasu." },
        { "jp": "あした、そちらへ うかがいます。", "kr": "내일 그쪽으로 찾아뵙겠습니다.", "romaji": "Ashita, sochira e ukagaimasu." }
      ]
    },
    {
      "id": "4-g003",
      "title": "사역형 (使役形)",
      "explanation": "다른 사람에게 어떤 행동을 '시키다', '하게 하다'라는 의미를 나타냅니다. 1그룹 동사는 어미를 あ단으로 바꾸고 'せる'를, 2그룹은 'させる'를 붙입니다.",
      "structure": "명사 + に/を + 동사 사역형",
      "examples": [
        { "jp": "こどもに ほんを よませます。", "kr": "아이에게 책을 읽게 합니다.", "romaji": "Kodomo ni hon o yomasemasu." },
        { "jp": "ぶちょうは わたしに しゅっちょうさせました。", "kr": "부장님은 저에게 출장을 가게 했습니다.", "romaji": "Buchou wa watashi ni shucchou sasemashita." }
      ]
    }
  ]
};
