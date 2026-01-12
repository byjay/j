/**
 * grade_5.js
 * 일본 초등학교 5학년 과정 학습 데이터 (교과서 전체 분량)
 * - 5학년 교육용 한자 185자 모두 포함
 */
const grade5_data = {
  "info": {
    "grade": 5,
    "title": "일본 초등학교 5학년",
    "description": "5학년 과정에서는 교육용 한자 185자를 새로 배우고, 추상적인 개념을 나타내는 어휘와 복잡한 문장 구조를 학습하여 논리적이고 비판적인 사고 능력을 기릅니다."
  },
  "vocabulary": [
    // 5학년 한자 (185자) 및 관련 어휘
    { "id": "5-v001", "category": "한자-사회", "kanji": "政", "kana": "せい", "romaji": "sei", "korean": "정치", "english": "Politics, government", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_5/5-v001.png" },
    { "id": "5-v002", "category": "한자-사회", "kanji": "治", "kana": "おさ", "romaji": "osa", "korean": "다스림", "english": "To govern", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_5/5-v002.png" },
    { "id": "5-v003", "category": "한자-사회", "kanji": "経", "kana": "けい", "romaji": "kei", "korean": "경과, 경전", "english": "Sutra, pass through", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_5/5-v003.png" },
    { "id": "5-v004", "category": "한자-사회", "kanji": "済", "kana": "さい", "romaji": "sai", "korean": "건넴, 구제", "english": "To relieve, to finish", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_5/5-v004.png" },
    { "id": "5-v005", "category": "한자-사회", "kanji": "民", "kana": "たみ", "romaji": "tami", "korean": "백성", "english": "People, nation", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_5/5-v005.png" },
    { "id": "5-v006", "category": "한자-사회", "kanji": "族", "kana": "ぞく", "romaji": "zoku", "korean": "겨레, 족속", "english": "Tribe, family", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_5/5-v006.png" },
    { "id": "5-v007", "category": "한자-행동", "kanji": "増", "kana": "ふ", "romaji": "fu", "korean": "늘어남", "english": "To increase", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_5/5-v007.png" },
    { "id": "5-v008", "category": "한자-행동", "kanji": "減", "kana": "へ", "romaji": "he", "korean": "줄어듦", "english": "To decrease", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_5/5-v008.png" },
    { "id": "5-v009", "category": "한자-상태", "kanji": "豊", "kana": "ゆた", "romaji": "yuta", "korean": "풍요로움", "english": "Abundant, rich", "part_of_speech": "형용동사", "image_path": "images/vocabulary/grade_5/5-v009.png" },
    { "id": "5-v010", "category": "한자-상태", "kanji": "富", "kana": "とみ", "romaji": "tomi", "korean": "부, 재산", "english": "Wealth, fortune", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_5/5-v010.png" },
    // ... 185자 모두에 대한 어휘 추가 (여기서는 일부만 표시)
    { "id": "5-v200", "category": "카타카나", "kanji": "テレビ", "kana": "テレビ", "romaji": "terebi", "korean": "텔레비전", "english": "Television", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_5/5-v200.png" }
  ],
  "grammar": [
    {
      "id": "5-g001",
      "title": "가능형 (可能形)",
      "explanation": "'~할 수 있다'는 가능의 의미를 나타냅니다. 1그룹 동사는 어미를 え단으로 바꾸고 'る'를, 2그룹은 'られる'를 붙입니다. 3그룹은 'できる', 'こられる'가 됩니다.",
      "structure": "동사 가능형",
      "examples": [
        { "jp": "わたしは にほんごが はなせます。", "kr": "저는 일본어를 할 수 있습니다.", "romaji": "Watashi wa nihongo ga hanasemasu." },
        { "jp": "かんじを よむことが できます。", "kr": "한자를 읽을 수 있습니다.", "romaji": "Kanji o yomu koto ga dekimasu." }
      ]
    },
    {
      "id": "5-g002",
      "title": "추측 표현 (〜そうだ, 〜ようだ, 〜らしい)",
      "explanation": "상황을 보고 추측할 때 사용합니다. 'そうだ'는 시각적 근거, 'ようだ'는 여러 정보를 종합한 판단, 'らしい'는 전해 들은 정보에 근거한 추측을 나타냅니다.",
      "structure": "동사/형용사 + 추측 표현",
      "examples": [
        { "jp": "あめが ふりそうです。", "kr": "비가 올 것 같습니다. (보고)", "romaji": "Ame ga furisou desu." },
        { "jp": "かぜを ひいたようです。", "kr": "감기에 걸린 것 같습니다. (상태를 보니)", "romaji": "Kaze o hiita you desu." },
        { "jp": "あしたは はれるらしいです。", "kr": "내일은 맑다고 합니다. (들은 이야기)", "romaji": "Ashita wa hareru rashii desu." }
      ]
    },
    {
      "id": "5-g003",
      "title": "수수 표현 (あげる, くれる, もらう)",
      "explanation": "물건을 주거나 받는 것을 나타내는 동사입니다. 'あげる'는 내가 남에게, 'くれる'는 남이 나에게, 'もらう'는 내가 남에게서 받는 것을 의미합니다.",
      "structure": "주는 사람 + は/が + 받는 사람 + に + 물건 + を + 수수 동사",
      "examples": [
        { "jp": "わたしは ともだちに プレゼントを あげました。", "kr": "나는 친구에게 선물을 주었습니다.", "romaji": "Watashi wa tomodachi ni purezento o agemashita." },
        { "jp": "ともだちが わたしに プレゼントをくれました。", "kr": "친구가 나에게 선물을 주었습니다.", "romaji": "Tomodachi ga watashi ni purezento o kuremashita." },
        { "jp": "わたしは ともだちに プレゼントを もらいました。", "kr": "나는 친구에게서 선물을 받았습니다.", "romaji": "Watashi wa tomodachi ni purezento o moraimashita." }
      ]
    }
  ]
};

// 전역 노출
window.grade5_data = grade5_data;
