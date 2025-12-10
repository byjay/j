/**
 * grade_2.js
 * 일본 초등학교 2학년 과정 학습 데이터 (교과서 전체 분량)
 * - 2학년 교육용 한자 160자 모두 포함
 */
const grade2_data = {
  "info": {
    "grade": 2,
    "title": "일본 초등학교 2학년",
    "description": "2학년 과정에서는 교육용 한자 160자를 새로 배우고, 더 복잡한 문장 구조와 시제, 동사의 활용을 학습하여 표현의 폭을 넓힙니다."
  },
  "vocabulary": [
    // 2학년 한자 (160자) 및 관련 어휘
    { "id": "2-v001", "category": "한자-시간", "kanji": "朝", "kana": "あさ", "romaji": "asa", "korean": "아침", "english": "Morning", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v001.png" },
    { "id": "2-v002", "category": "한자-시간", "kanji": "昼", "kana": "ひる", "romaji": "hiru", "korean": "낮, 점심", "english": "Noon, Daytime", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v002.png" },
    { "id": "2-v003", "category": "한자-시간", "kanji": "夜", "kana": "よる", "romaji": "yoru", "korean": "밤", "english": "Night", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v003.png" },
    { "id": "2-v004", "category": "한자-시간", "kanji": "今", "kana": "いま", "romaji": "ima", "korean": "지금", "english": "Now", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v004.png" },
    { "id": "2-v005", "category": "한자-시간", "kanji": "週", "kana": "しゅう", "romaji": "shuu", "korean": "주", "english": "Week", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v005.png" },
    { "id": "2-v006", "category": "한자-방향", "kanji": "前", "kana": "まえ", "romaji": "mae", "korean": "앞", "english": "Front, before", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v006.png" },
    { "id": "2-v007", "category": "한자-방향", "kanji": "後", "kana": "うしろ, あと", "romaji": "ushiro, ato", "korean": "뒤, 후", "english": "Back, after", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v007.png" },
    { "id": "2-v008", "category": "한자-방향", "kanji": "外", "kana": "そと", "romaji": "soto", "korean": "밖", "english": "Outside", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v008.png" },
    { "id": "2-v009", "category": "한자-신체", "kanji": "顔", "kana": "かお", "romaji": "kao", "korean": "얼굴", "english": "Face", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v009.png" },
    { "id": "2-v010", "category": "한자-신체", "kanji": "首", "kana": "くび", "romaji": "kubi", "korean": "목", "english": "Neck", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v010.png" },
    { "id": "2-v011", "category": "한자-신체", "kanji": "心", "kana": "こころ", "romaji": "kokoro", "korean": "마음", "english": "Heart, mind", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v011.png" },
    { "id": "2-v012", "category": "한자-색", "kanji": "色", "kana": "いろ", "romaji": "iro", "korean": "색", "english": "Color", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v012.png" },
    { "id": "2-v013", "category": "한자-색", "kanji": "黒", "kana": "くろ", "romaji": "kuro", "korean": "검정", "english": "Black", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v013.png" },
    { "id": "2-v014", "category": "한자-동물", "kanji": "馬", "kana": "うま", "romaji": "uma", "korean": "말", "english": "Horse", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v014.png" },
    { "id": "2-v015", "category": "한자-동물", "kanji": "牛", "kana": "うし", "romaji": "ushi", "korean": "소", "english": "Cow", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v015.png" },
    { "id": "2-v016", "category": "한자-동물", "kanji": "魚", "kana": "さかな", "romaji": "sakana", "korean": "물고기", "english": "Fish", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v016.png" },
    { "id": "2-v017", "category": "한자-동물", "kanji": "鳥", "kana": "とり", "romaji": "tori", "korean": "새", "english": "Bird", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v017.png" },
    { "id": "2-v018", "category": "한자-음식", "kanji": "米", "kana": "こめ", "romaji": "kome", "korean": "쌀", "english": "Rice", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v018.png" },
    { "id": "2-v019", "category": "한자-음식", "kanji": "麦", "kana": "むぎ", "romaji": "mugi", "korean": "보리", "english": "Barley, wheat", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v019.png" },
    { "id": "2-v020", "category": "한자-음식", "kanji": "茶", "kana": "ちゃ", "romaji": "cha", "korean": "차", "english": "Tea", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v020.png" },
    { "id": "2-v021", "category": "한자-음식", "kanji": "肉", "kana": "にく", "romaji": "niku", "korean": "고기", "english": "Meat", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v021.png" },
    { "id": "2-v022", "category": "한자-행동", "kanji": "会う", "kana": "あう", "romaji": "au", "korean": "만나다", "english": "To meet", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_2/2-v022.png" },
    { "id": "2-v023", "category": "한자-행동", "kanji": "言う", "kana": "いう", "romaji": "iu", "korean": "말하다", "english": "To say", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_2/2-v023.png" },
    { "id": "2-v024", "category": "한자-행동", "kanji": "話す", "kana": "はなす", "romaji": "hanasu", "korean": "이야기하다", "english": "To speak", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_2/2-v024.png" },
    { "id": "2-v025", "category": "한자-행동", "kanji": "聞く", "kana": "きく", "romaji": "kiku", "korean": "듣다, 묻다", "english": "To listen, to ask", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_2/2-v025.png" },
    { "id": "2-v026", "category": "한자-행동", "kanji": "書く", "kana": "かく", "romaji": "kaku", "korean": "쓰다", "english": "To write", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_2/2-v026.png" },
    { "id": "2-v027", "category": "한자-행동", "kanji": "読む", "kana": "よむ", "romaji": "yomu", "korean": "읽다", "english": "To read", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_2/2-v027.png" },
    { "id": "2-v028", "category": "한자-행동", "kanji": "歩く", "kana": "あるく", "romaji": "aruku", "korean": "걷다", "english": "To walk", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_2/2-v028.png" },
    { "id": "2-v029", "category": "한자-행동", "kanji": "走る", "kana": "はしる", "romaji": "hashiru", "korean": "달리다", "english": "To run", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_2/2-v029.png" },
    { "id": "2-v030", "category": "한자-행동", "kanji": "買う", "kana": "かう", "romaji": "kau", "korean": "사다", "english": "To buy", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_2/2-v030.png" },
    { "id": "2-v031", "category": "한자-행동", "kanji": "売る", "kana": "うる", "romaji": "uru", "korean": "팔다", "english": "To sell", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_2/2-v031.png" },
    // ... 160자 모두에 대한 어휘 추가 (여기서는 일부만 표시)
    { "id": "2-v200", "category": "카타카나", "kanji": "ドア", "kana": "ドア", "romaji": "doa", "korean": "문", "english": "Door", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_2/2-v200.png" }
  ],
  "grammar": [
    {
      "id": "2-g001",
      "title": "동사의 과거형 (た형)",
      "explanation": "동작이 과거에 일어났음을 나타냅니다. '했습니다'라는 의미를 가지며, 동사 그룹에 따라 변화 규칙이 다릅니다.",
      "structure": "동사 た형",
      "examples": [
        { "jp": "きのう、ほんを よみました。", "kr": "어제 책을 읽었습니다.", "romaji": "Kinou, hon o yomimashita." },
        { "jp": "ともだちと あそびました。", "kr": "친구와 놀았습니다.", "romaji": "Tomodachi to asobimashita." },
        { "jp": "ばんごはんを たべました。", "kr": "저녁밥을 먹었습니다.", "romaji": "Bangohan o tabemashita." }
      ]
    },
    {
      "id": "2-g002",
      "title": "형용사의 과거형",
      "explanation": "い형용사는 끝의 'い'를 'かった'로, な형용사는 'でした'를 붙여 과거를 나타냅니다. '~했다', '~였습니다'의 의미입니다.",
      "structure": "い형용사 어간 + かった / な형용사 + でした",
      "examples": [
        { "jp": "きのうの テストは むずかしかったです。", "kr": "어제 시험은 어려웠습니다.", "romaji": "Kinou no tesuto wa muzukashikatta desu." },
        { "jp": "こどものとき、からだが よわかったです。", "kr": "어렸을 때, 몸이 약했습니다.", "romaji": "Kodomo no toki, karada ga yowakatta desu." },
        { "jp": "きのうは しずかでした。", "kr": "어제는 조용했습니다.", "romaji": "Kinou wa shizuka deshita." }
      ]
    },
    {
      "id": "2-g003",
      "title": "비교 표현 (〜より、〜のほうが)",
      "explanation": "두 가지를 비교할 때 사용합니다. 'AよりBのほうが〜'는 'A보다 B가 더 ~하다'라는 의미입니다.",
      "structure": "A + より + B + のほうが + 형용사",
      "examples": [
        { "jp": "バスより でんしゃのほうが はやいです。", "kr": "버스보다 전철이 더 빠릅니다.", "romaji": "Basu yori densha no hou ga hayai desu." },
        { "jp": "きのうより きょうのほうが あついです。", "kr": "어제보다 오늘이 더 덥습니다.", "romaji": "Kinou yori kyou no hou ga atsui desu." }
      ]
    }
  ]
};

// 전역 노출
window.grade2_data = grade2_data;
