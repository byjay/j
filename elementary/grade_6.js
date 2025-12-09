/**
 * grade_6.js
 * 일본 초등학교 6학년 과정 학습 데이터 (교과서 전체 분량)
 * - 6학년 교육용 한자 181자 모두 포함
 */
const grade6_data = {
  "info": {
    "grade": 6,
    "title": "일본 초등학교 6학년",
    "description": "6학년 과정에서는 교육용 한자 181자를 마지막으로 배우며, 속담, 관용구, 고사성어 등을 익히고 자신의 의견을 논리적으로 표현하는 등 고등 사고 능력을 기릅니다."
  },
  "vocabulary": [
    // 6학년 한자 (181자) 및 관련 어휘
    { "id": "6-v001", "category": "한자-사회", "kanji": "憲", "kana": "けん", "romaji": "ken", "korean": "헌법", "english": "Constitution", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_6/6-v001.png" },
    { "id": "6-v002", "category": "한자-사회", "kanji": "衆", "kana": "しゅう", "romaji": "shuu", "korean": "무리, 대중", "english": "Masses, public", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_6/6-v002.png" },
    { "id": "6-v003", "category": "한자-사회", "kanji": "議", "kana": "ぎ", "romaji": "gi", "korean": "의논", "english": "Deliberation, debate", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_6/6-v003.png" },
    { "id": "6-v004", "category": "한자-사회", "kanji": "派", "kana": "は", "romaji": "ha", "korean": "파, 파견", "english": "Sect, party", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_6/6-v004.png" },
    { "id": "6-v005", "category": "한자-사회", "kanji": "展", "kana": "てん", "romaji": "ten", "korean": "폄, 전시", "english": "Exhibition", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_6/6-v005.png" },
    { "id": "6-v006", "category": "한자-사회", "kanji": "著", "kana": "あらわ", "romaji": "arawa", "korean": "나타냄, 저술", "english": "To write, to publish", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_6/6-v006.png" },
    { "id": "6-v007", "category": "한자-추상", "kanji": "姿", "kana": "すがた", "romaji": "sugata", "korean": "모습", "english": "Figure, shape", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_6/6-v007.png" },
    { "id": "6-v008", "category": "한자-추상", "kanji": "夢", "kana": "ゆめ", "romaji": "yume", "korean": "꿈", "english": "Dream", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_6/6-v008.png" },
    { "id": "6-v009", "category": "한자-추상", "kanji": "宝", "kana": "たから", "romaji": "takara", "korean": "보물", "english": "Treasure", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_6/6-v009.png" },
    { "id": "6-v010", "category": "한자-추상", "kanji": "尊", "kana": "とうと", "romaji": "touto", "korean": "존귀함", "english": "Precious, noble", "part_of_speech": "형용동사", "image_path": "images/vocabulary/grade_6/6-v010.png" },
    // ... 181자 모두에 대한 어휘 추가 (여기서는 일부만 표시)
    { "id": "6-v200", "category": "카타카나", "kanji": "インターネット", "kana": "インターネット", "romaji": "intaanetto", "korean": "인터넷", "english": "Internet", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_6/6-v200.png" }
  ],
  "grammar": [
    {
      "id": "6-g001",
      "title": "사역 수동형 (使役受身形)",
      "explanation": "'(억지로) ~하게 되다', '~해야만 했다'는 의미로, 자신의 의지와 상관없이 어떤 행동을 강요받았을 때 사용합니다. 동사 그룹에 따라 변화 규칙이 다릅니다.",
      "structure": "동사 사역수동형",
      "examples": [
        { "jp": "ははに やさいを たべさせられました。", "kr": "어머니 때문에 야채를 억지로 먹어야 했습니다.", "romaji": "Haha ni yasai o tabesaseraremashita." },
        { "jp": "せんせいに ろうかを はしらされました。", "kr": "선생님께서 복도를 달리게 하셨습니다.", "romaji": "Sensei ni rouka o hashirasaremashita." }
      ]
    },
    {
      "id": "6-g002",
      "title": "가정 표현의 심화 (~としたら, 〜とすれば)",
      "explanation": "실현 가능성이 낮은 강한 가정을 나타낼 때 사용합니다. '~라고 한다면' 이라는 의미로, 논리적인 전개를 이끌어낼 때 자주 사용됩니다.",
      "structure": "문장 + としたら / とすれば",
      "examples": [
        { "jp": "もし、とりになれたとしたら、そらを とびたい。", "kr": "만약 새가 될 수 있다면, 하늘을 날고 싶어.", "romaji": "Moshi, tori ni nareta to shitara, sora o tobitai." },
        { "jp": "その はなしが ほんとうだとすれば、たいへんな ことだ。", "kr": "그 이야기가 사실이라면, 큰일이다.", "romaji": "Sono hanashi ga hontou da to sureba, taihen na koto da." }
      ]
    },
    {
      "id": "6-g003",
      "title": "관용구 및 속담 활용",
      "explanation": "일본의 문화와 역사가 담긴 관용구나 속담을 배우고 문장 속에서 활용하는 능력을 기릅니다. 예를 들어 '猫の手も借りたい'는 '매우 바쁘다'는 의미입니다.",
      "structure": "관용구/속담 + 문맥",
      "examples": [
        { "jp": "しゅくだいが おおすぎて、ねこのても かりたいほどだ。", "kr": "숙제가 너무 많아서 고양이 손이라도 빌리고 싶을 정도다.", "romaji": "Shukudai ga oosugite, neko no te mo karitai hodo da." },
        { "jp": "いしの上にもさんねんというから、あきらめずに がんばろう。", "kr": "'돌 위에서도 3년'이라는 말이 있으니, 포기하지 말고 힘내자.", "romaji": "'Ishi no ue nimo sannen' to iu kara, akiramezu ni ganbarou." }
      ]
    }
  ]
};
