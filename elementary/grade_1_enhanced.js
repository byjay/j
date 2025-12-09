/**
 * grade_1_enhanced.js
 * 일본 초등학교 1학년 과정 - 문법 중심 완전판
 * 
 * 📚 문법 우선 교육 원칙:
 * - 외국인 학습자를 위한 상세한 한국어 설명
 * - JLPT N5 수준의 기초 문법 완전 정복
 * - 학원 수업처럼 단계적 학습 구조
 * - 풍부한 예문과 주석
 */

const grade1_enhanced_data = {
    "info": {
        "grade": 1,
        "title": "🏫 일본 초등학교 1학년 - 문법 기초 완전판",
        "description": "일본어 문법의 기초를 탄탄하게! 조사, 동사 활용, 기본 문형을 학원에서 배우듯 상세히 배웁니다.",
        "target": "일본어 완전 초보, JLPT N5 준비생",
        "curriculum_type": "문법 중심 + 어휘 병행",
        "estimated_hours": 40
    },

    // =====================================================
    // 📖 CHAPTER 1: 일본어의 기초 - 문자와 발음
    // =====================================================
    "chapters": [
        {
            "chapter_id": "ch1",
            "title": "Chapter 1: 일본어의 세계로 첫 걸음",
            "subtitle": "일본어 문자 체계와 기본 발음 마스터",
            "order": 1,
            "lessons": [
                {
                    "lesson_id": "ch1-L01",
                    "title": "일본어 문자 체계 이해하기",
                    "order": 1,
                    "type": "lecture",
                    "content": {
                        "introduction": "일본어는 세 가지 문자를 사용합니다: 히라가나(ひらがな), 가타카나(カタカナ), 한자(漢字)입니다.\n\n한국어가 한글 하나로 모든 것을 표현하는 것과 달리, 일본어는 이 세 가지를 섞어서 사용합니다.",
                        "key_points": [
                            {
                                "title": "히라가나 (ひらがな)",
                                "explanation": "일본어의 기본 문자입니다. 곡선이 많고 부드러운 느낌의 글자로, 일본 고유어와 문법 요소(조사, 어미 등)를 표기합니다.",
                                "example": "わたし (나), たべる (먹다), です (입니다)",
                                "note": "✨ 먼저 히라가나 46자를 완벽하게 익혀야 합니다!"
                            },
                            {
                                "title": "가타카나 (カタカナ)",
                                "explanation": "주로 외래어, 외국 이름, 의성어/의태어를 표기합니다. 각진 느낌의 글자입니다.",
                                "example": "パン (빵, 포르투갈어에서 옴), コーヒー (커피), テレビ (텔레비전)",
                                "note": "💡 히라가나를 먼저 배우고, 그 다음 가타카나를 배웁니다."
                            },
                            {
                                "title": "한자 (漢字)",
                                "explanation": "중국에서 유래한 문자로, 각 글자가 의미를 담고 있습니다. 1학년에서는 80자를 배웁니다.",
                                "example": "山 (やま, 산), 川 (かわ, 강), 日 (ひ/にち, 해/날)",
                                "note": "📝 한자에는 '음독(音読み)'과 '훈독(訓読み)' 두 가지 읽는 방법이 있습니다."
                            }
                        ],
                        "summary": "일본어 학습의 첫 단계는 히라가나를 완벽하게 익히는 것입니다. 히라가나를 모르면 어떤 문법도 배울 수 없습니다!"
                    }
                },
                {
                    "lesson_id": "ch1-L02",
                    "title": "일본어 발음의 특징",
                    "order": 2,
                    "type": "lecture",
                    "content": {
                        "introduction": "일본어 발음은 한국어와 비슷한 점도 있지만, 다른 점도 많습니다. 특히 장음, 촉음, 요음에 주의해야 합니다.",
                        "key_points": [
                            {
                                "title": "모음 (あいうえお)",
                                "explanation": "일본어의 기본 모음 5개입니다. 한국어의 아, 이, 우, 에, 오와 비슷하지만, '우'는 입술을 둥글게 하지 않습니다.",
                                "example": "あ(a), い(i), う(u), え(e), お(o)",
                                "note": "🎤 일본어 'う'는 한국어 '으'와 '우'의 중간 느낌입니다."
                            },
                            {
                                "title": "장음 (長音)",
                                "explanation": "모음을 길게 발음하는 것입니다. 의미가 완전히 달라지므로 매우 중요합니다!",
                                "example": "おばさん(아줌마) vs おばあさん(할머니), ビル(건물) vs ビール(맥주)",
                                "note": "⚠️ 장음을 무시하면 완전히 다른 뜻이 됩니다!"
                            },
                            {
                                "title": "촉음 (促音, っ)",
                                "explanation": "작은 'っ'는 다음 자음을 잠깐 멈추고 발음합니다. 영어의 겹자음과 비슷합니다.",
                                "example": "きて(와서) vs きって(표, 우표) / がこ vs がっこう(학교)",
                                "note": "💡 촉음 위치에서 0.5박자 정도 멈추세요."
                            },
                            {
                                "title": "요음 (拗音, きゃ, しゅ 등)",
                                "explanation": "작은 야, 유, 요(ゃ, ゅ, ょ)가 붙어서 한 박자로 발음됩니다.",
                                "example": "きゃ(캬), しゅ(슈), ちょ(쵸), にゃ(냐)",
                                "note": "🎯 두 글자처럼 보여도 한 박자입니다!"
                            }
                        ],
                        "summary": "정확한 발음은 소통의 기본입니다. 장음, 촉음, 요음을 정확히 구분하는 연습을 많이 하세요!"
                    }
                }
            ]
        },

        // =====================================================
        // 📖 CHAPTER 2: 조사(助詞) - 일본어 문법의 핵심
        // =====================================================
        {
            "chapter_id": "ch2",
            "title": "Chapter 2: 조사(助詞) 마스터하기",
            "subtitle": "일본어 문장의 뼈대를 이루는 핵심 문법",
            "order": 2,
            "importance": "최상",
            "lessons": [
                {
                    "lesson_id": "ch2-L01",
                    "title": "조사란 무엇인가?",
                    "order": 1,
                    "type": "lecture",
                    "content": {
                        "introduction": "조사(助詞, じょし)는 단어 뒤에 붙어서 그 단어의 역할을 알려주는 문법 요소입니다.\n\n한국어의 '은/는', '이/가', '을/를'과 비슷하지만, 사용법에 차이가 있습니다.",
                        "key_points": [
                            {
                                "title": "조사의 역할",
                                "explanation": "조사가 없으면 일본어 문장은 성립하지 않습니다. 조사가 문장에서 각 단어의 역할을 결정합니다.",
                                "example": "わたし「は」 りんご「を」 たべます。(나는 사과를 먹습니다)",
                                "note": "💡 조사 하나가 바뀌면 문장의 의미가 완전히 달라집니다!"
                            }
                        ],
                        "summary": "조사는 일본어의 핵심입니다. 이 장에서 가장 중요한 조사 6개를 완벽하게 익힙니다."
                    }
                },
                {
                    "lesson_id": "ch2-L02",
                    "title": "は (wa) - 주제를 나타내는 조사",
                    "order": 2,
                    "type": "grammar",
                    "content": {
                        "grammar_point": "は",
                        "reading": "wa (글자는 'は'이지만 조사로 쓸 때는 'wa'로 발음)",
                        "korean_equivalent": "~은/는",
                        "level": "JLPT N5",
                        "introduction": "'は'는 문장의 주제(토픽)를 나타냅니다. '이것에 대해 말할게'라는 느낌입니다.",
                        "detailed_explanation": [
                            "は는 가장 기본적인 조사로, 문장에서 '무엇에 대해 이야기하고 있는지'를 나타냅니다.",
                            "주의! 글자는 'は(ha)'이지만, 조사로 사용될 때는 반드시 'wa'로 발음합니다.",
                            "한국어의 '~은/는'과 거의 같은 역할을 합니다."
                        ],
                        "structure": "[명사] + は + [설명/서술]",
                        "examples": [
                            {
                                "japanese": "わたしは がくせいです。",
                                "reading": "わたしは がくせいです",
                                "romaji": "Watashi wa gakusei desu.",
                                "korean": "저는 학생입니다.",
                                "breakdown": "わたし(나) + は(는) + がくせい(학생) + です(~입니다)",
                                "note": "'나에 대해 말하자면, 학생이야'라는 뉘앙스"
                            },
                            {
                                "japanese": "これは ペンです。",
                                "reading": "これは ぺんです",
                                "romaji": "Kore wa pen desu.",
                                "korean": "이것은 펜입니다.",
                                "breakdown": "これ(이것) + は(은) + ペン(펜) + です(~입니다)",
                                "note": "'이것에 대해 말하자면, 펜이야'라는 뉘앙스"
                            },
                            {
                                "japanese": "きょうは あめです。",
                                "reading": "きょうは あめです",
                                "romaji": "Kyou wa ame desu.",
                                "korean": "오늘은 비입니다.",
                                "breakdown": "きょう(오늘) + は(은) + あめ(비) + です(~입니다)",
                                "note": "'오늘 날씨에 대해 말하자면' 이라는 느낌"
                            }
                        ],
                        "common_mistakes": [
                            {
                                "mistake": "は를 'ha'로 발음하는 것",
                                "correction": "조사로 쓸 때는 반드시 'wa'로 발음합니다.",
                                "tip": "히라가나 연습할 때 따로 외우세요: 'は'는 조사에서 'wa'!"
                            }
                        ],
                        "practice_sentences": [
                            { "korean": "저는 선생님입니다.", "answer": "わたしは せんせいです。" },
                            { "korean": "이것은 책입니다.", "answer": "これは ほんです。" },
                            { "korean": "오늘은 월요일입니다.", "answer": "きょうは げつようびです。" }
                        ],
                        "summary": "は는 'wa'로 발음하며, 문장의 주제(~에 대해 말하자면)를 나타냅니다."
                    }
                },
                {
                    "lesson_id": "ch2-L03",
                    "title": "が (ga) - 주어를 나타내는 조사",
                    "order": 3,
                    "type": "grammar",
                    "content": {
                        "grammar_point": "が",
                        "reading": "ga",
                        "korean_equivalent": "~이/가",
                        "level": "JLPT N5",
                        "introduction": "'が'는 새로운 정보의 주어를 나타내거나, 특정 대상을 강조할 때 사용합니다.",
                        "detailed_explanation": [
                            "が는 '이것이 바로 그거야!'라고 강조하거나 새로운 정보를 소개할 때 씁니다.",
                            "は와 비교: は는 이미 알고 있는 주제, が는 새로운 정보/강조",
                            "⚠️ 중요! 좋아함(すき), 싫어함(きらい), 능력(できる), 원함(ほしい) 표현에서는 목적어처럼 보여도 が를 씁니다!"
                        ],
                        "structure": "[명사] + が + [동사/형용사]",
                        "examples": [
                            {
                                "japanese": "だれが きましたか？",
                                "reading": "だれが きましたか",
                                "romaji": "Dare ga kimashita ka?",
                                "korean": "누가 왔나요?",
                                "breakdown": "だれ(누구) + が(가) + きました(왔습니다) + か(~요?)",
                                "note": "'누가'라는 새로운 정보를 묻고 있음"
                            },
                            {
                                "japanese": "わたしが せんせいです。",
                                "reading": "わたしが せんせいです",
                                "romaji": "Watashi ga sensei desu.",
                                "korean": "제가 선생님입니다. (다른 사람 아니고 바로 내가!)",
                                "breakdown": "わたし(나) + が(가) + せんせい(선생님) + です(~입니다)",
                                "note": "여러 사람 중에서 '바로 나!'라고 강조"
                            },
                            {
                                "japanese": "ラーメンが すきです。",
                                "reading": "らーめんが すきです",
                                "romaji": "Raamen ga suki desu.",
                                "korean": "라면을 좋아합니다.",
                                "breakdown": "ラーメン(라면) + が(를/이) + すき(좋아함) + です(~입니다)",
                                "note": "⚠️ 한국어로 '라면을'이지만 일본어는 'が'를 씁니다!"
                            },
                            {
                                "japanese": "あたまが いたいです。",
                                "reading": "あたまが いたいです",
                                "romaji": "Atama ga itai desu.",
                                "korean": "머리가 아픕니다.",
                                "breakdown": "あたま(머리) + が(가) + いたい(아프다) + です(~입니다)",
                                "note": "신체 부위의 감각/상태를 표현할 때 が"
                            }
                        ],
                        "comparison_with_wa": {
                            "title": "は vs が 비교",
                            "explanation": "가장 많이 헷갈리는 부분입니다. 핵심 차이를 알아봅시다.",
                            "examples": [
                                {
                                    "wa_example": "わたしは がくせいです。",
                                    "wa_meaning": "나에 대해 말하자면, 학생이야. (일반적 소개)",
                                    "ga_example": "わたしが がくせいです。",
                                    "ga_meaning": "바로 내가 학생이야! (여러 명 중 강조)"
                                }
                            ],
                            "rules": [
                                "질문에 '누가/무엇이'가 있으면 → 답에 が",
                                "이미 알고 있는 주제에 대해 설명하면 → は",
                                "すき, きらい, ほしい, できる 앞에는 항상 → が"
                            ]
                        },
                        "practice_sentences": [
                            { "korean": "누가 먹었어요?", "answer": "だれが たべましたか?" },
                            { "korean": "고양이를 좋아합니다.", "answer": "ねこが すきです。" },
                            { "korean": "바로 제가 다나카입니다.", "answer": "わたしが たなかです。" }
                        ],
                        "summary": "が는 새로운 정보/강조, そして すき・きらい・ほしい・できる 앞에 사용합니다."
                    }
                },
                {
                    "lesson_id": "ch2-L04",
                    "title": "を (o) - 목적어를 나타내는 조사",
                    "order": 4,
                    "type": "grammar",
                    "content": {
                        "grammar_point": "を",
                        "reading": "o (글자는 'を'이지만 'o'로 발음)",
                        "korean_equivalent": "~을/를",
                        "level": "JLPT N5",
                        "introduction": "'を'는 동작의 대상(목적어)을 나타냅니다. 타동사와 함께 사용됩니다.",
                        "detailed_explanation": [
                            "を는 '무엇을 ~하다'에서 '무엇을'에 해당합니다.",
                            "주의! 글자는 'を(wo)'이지만, 현대 일본어에서는 'o'로 발음합니다.",
                            "を는 오직 목적어에만 사용됩니다. 다른 용도로 쓰이지 않아서 외우기 쉽습니다!"
                        ],
                        "structure": "[목적어] + を + [타동사]",
                        "examples": [
                            {
                                "japanese": "パンを たべます。",
                                "reading": "ぱんを たべます",
                                "romaji": "Pan o tabemasu.",
                                "korean": "빵을 먹습니다.",
                                "breakdown": "パン(빵) + を(을) + たべます(먹습니다)",
                                "note": "먹는 대상(목적어)이 빵"
                            },
                            {
                                "japanese": "みずを のみます。",
                                "reading": "みずを のみます",
                                "romaji": "Mizu o nomimasu.",
                                "korean": "물을 마십니다.",
                                "breakdown": "みず(물) + を(을) + のみます(마십니다)",
                                "note": "마시는 대상이 물"
                            },
                            {
                                "japanese": "ほんを よみます。",
                                "reading": "ほんを よみます",
                                "romaji": "Hon o yomimasu.",
                                "korean": "책을 읽습니다.",
                                "breakdown": "ほん(책) + を(을) + よみます(읽습니다)",
                                "note": "읽는 대상이 책"
                            },
                            {
                                "japanese": "えいがを みます。",
                                "reading": "えいがを みます",
                                "romaji": "Eiga o mimasu.",
                                "korean": "영화를 봅니다.",
                                "breakdown": "えいが(영화) + を(를) + みます(봅니다)",
                                "note": "보는 대상이 영화"
                            }
                        ],
                        "special_usage": {
                            "title": "を의 특수 용법: 장소 이동",
                            "explanation": "이동 동사(歩く, 走る, 渡る 등)와 함께 쓰이면 '~을/를 지나서/통해서'라는 의미",
                            "examples": [
                                {
                                    "japanese": "こうえんを あるきます。",
                                    "korean": "공원을 걷습니다. (공원을 지나서 걷다)",
                                    "note": "공원 안을 걸어 지나간다는 뉘앙스"
                                },
                                {
                                    "japanese": "はしを わたります。",
                                    "korean": "다리를 건너갑니다.",
                                    "note": "다리를 통과하며 이동"
                                }
                            ]
                        },
                        "practice_sentences": [
                            { "korean": "사과를 먹습니다.", "answer": "りんごを たべます。" },
                            { "korean": "음악을 듣습니다.", "answer": "おんがくを ききます。" },
                            { "korean": "일본어를 공부합니다.", "answer": "にほんごを べんきょうします。" }
                        ],
                        "summary": "を는 목적어에만 사용! '~을/를 [동작하다]'에서 을/를에 해당합니다."
                    }
                },
                {
                    "lesson_id": "ch2-L05",
                    "title": "に (ni) - 시간/장소/대상 조사",
                    "order": 5,
                    "type": "grammar",
                    "content": {
                        "grammar_point": "に",
                        "reading": "ni",
                        "korean_equivalent": "~에, ~에게",
                        "level": "JLPT N5",
                        "introduction": "'に'는 여러 가지 의미로 사용되는 다목적 조사입니다. 시간, 장소, 대상을 나타낼 수 있습니다.",
                        "detailed_explanation": [
                            "に는 일본어에서 가장 많이 쓰이는 조사 중 하나입니다.",
                            "시간, 장소(도착점), 목적, 대상(~에게) 등 다양한 의미로 사용됩니다.",
                            "で와 헷갈리기 쉬우므로 차이점을 정확히 알아두세요!"
                        ],
                        "usages": [
                            {
                                "usage_title": "1️⃣ 시간을 나타낼 때",
                                "explanation": "구체적인 시각이나 날짜 뒤에 붙습니다.",
                                "examples": [
                                    {
                                        "japanese": "７じに おきます。",
                                        "korean": "7시에 일어납니다.",
                                        "note": "구체적인 시각 뒤에 に"
                                    },
                                    {
                                        "japanese": "にちようびに いきます。",
                                        "korean": "일요일에 갑니다.",
                                        "note": "요일 뒤에 に"
                                    }
                                ],
                                "exception": "⚠️ 'きょう(오늘)', 'あした(내일)' 등 상대적 시간에는 に를 붙이지 않습니다!"
                            },
                            {
                                "usage_title": "2️⃣ 장소(도착점)를 나타낼 때",
                                "explanation": "이동해서 도착하는 장소를 나타냅니다.",
                                "examples": [
                                    {
                                        "japanese": "がっこうに いきます。",
                                        "korean": "학교에 갑니다.",
                                        "note": "도착 장소 = 학교"
                                    },
                                    {
                                        "japanese": "うちに かえります。",
                                        "korean": "집에 돌아갑니다.",
                                        "note": "도착 장소 = 집"
                                    }
                                ]
                            },
                            {
                                "usage_title": "3️⃣ 대상(~에게)을 나타낼 때",
                                "explanation": "주는 동작의 대상을 나타냅니다.",
                                "examples": [
                                    {
                                        "japanese": "ともだちに プレゼントを あげます。",
                                        "korean": "친구에게 선물을 줍니다.",
                                        "note": "주는 대상 = 친구"
                                    }
                                ]
                            },
                            {
                                "usage_title": "4️⃣ 존재 장소를 나타낼 때",
                                "explanation": "있다/없다(いる/ある)와 함께 쓰입니다.",
                                "examples": [
                                    {
                                        "japanese": "へやに ねこが います。",
                                        "korean": "방에 고양이가 있습니다.",
                                        "note": "존재하는 장소 = 방"
                                    }
                                ]
                            }
                        ],
                        "comparison": {
                            "title": "に vs へ vs で 비교",
                            "table": [
                                { "particle": "に", "meaning": "도착점/존재 장소", "example": "がっこう「に」いきます (학교에 갑니다 - 도착점 강조)" },
                                { "particle": "へ", "meaning": "방향", "example": "がっこう「へ」いきます (학교쪽으로 갑니다 - 방향 강조)" },
                                { "particle": "で", "meaning": "동작이 일어나는 장소", "example": "がっこう「で」べんきょうします (학교에서 공부합니다)" }
                            ]
                        },
                        "practice_sentences": [
                            { "korean": "8시에 먹습니다.", "answer": "８じに たべます。" },
                            { "korean": "도서관에 갑니다.", "answer": "としょかんに いきます。" },
                            { "korean": "선생님에게 질문합니다.", "answer": "せんせいに しつもんします。" }
                        ],
                        "summary": "に는 시간, 도착장소, 대상, 존재장소에 사용됩니다. で(동작 장소)와 구분하세요!"
                    }
                },
                {
                    "lesson_id": "ch2-L06",
                    "title": "で (de) - 수단/장소의 조사",
                    "order": 6,
                    "type": "grammar",
                    "content": {
                        "grammar_point": "で",
                        "reading": "de",
                        "korean_equivalent": "~에서, ~으로",
                        "level": "JLPT N5",
                        "introduction": "'で'는 동작이 일어나는 장소나 수단/방법을 나타냅니다.",
                        "detailed_explanation": [
                            "で는 크게 두 가지 의미로 사용됩니다: 장소(~에서)와 수단(~으로)",
                            "に와 헷갈리기 쉬운 조사입니다. 핵심: で는 '동작이 일어나는' 장소!"
                        ],
                        "usages": [
                            {
                                "usage_title": "1️⃣ 동작이 일어나는 장소",
                                "explanation": "'~에서'라는 의미로, 어떤 활동이 진행되는 장소를 나타냅니다.",
                                "examples": [
                                    {
                                        "japanese": "がっこうで べんきょうします。",
                                        "korean": "학교에서 공부합니다.",
                                        "note": "공부하는 장소 = 학교"
                                    },
                                    {
                                        "japanese": "デパートで ふくを かいます。",
                                        "korean": "백화점에서 옷을 삽니다.",
                                        "note": "쇼핑하는 장소 = 백화점"
                                    }
                                ]
                            },
                            {
                                "usage_title": "2️⃣ 수단/방법/도구",
                                "explanation": "'~으로'라는 의미로, 어떤 도구나 수단을 나타냅니다.",
                                "examples": [
                                    {
                                        "japanese": "バスで いきます。",
                                        "korean": "버스로 갑니다.",
                                        "note": "이동 수단 = 버스"
                                    },
                                    {
                                        "japanese": "はしで たべます。",
                                        "korean": "젓가락으로 먹습니다.",
                                        "note": "도구 = 젓가락"
                                    },
                                    {
                                        "japanese": "にほんごで はなします。",
                                        "korean": "일본어로 말합니다.",
                                        "note": "수단 = 일본어"
                                    }
                                ]
                            },
                            {
                                "usage_title": "3️⃣ 원인/이유",
                                "explanation": "'~으로 인해'라는 의미로, 어떤 일의 원인을 나타냅니다.",
                                "examples": [
                                    {
                                        "japanese": "びょうきで やすみました。",
                                        "korean": "병으로 쉬었습니다.",
                                        "note": "원인 = 병"
                                    }
                                ]
                            }
                        ],
                        "comparison": {
                            "title": "で vs に 완벽 정리",
                            "explanation": "가장 많이 헷갈리는 부분! 핵심 차이를 외우세요.",
                            "rules": [
                                "✅ 이동해서 도착하는 장소 → に (がっこうに いきます)",
                                "✅ 그 장소에서 무언가를 하는 장소 → で (がっこうで べんきょうします)",
                                "✅ 있다/없다의 장소 → に (へやに います)",
                                "✅ 교통수단, 도구 → で (バスで いきます)"
                            ]
                        },
                        "practice_sentences": [
                            { "korean": "집에서 텔레비전을 봅니다.", "answer": "うちで テレビを みます。" },
                            { "korean": "전철로 갑니다.", "answer": "でんしゃで いきます。" },
                            { "korean": "레스토랑에서 밥을 먹습니다.", "answer": "レストランで ごはんを たべます。" }
                        ],
                        "summary": "で는 동작이 일어나는 장소(~에서)와 수단/도구(~으로)에 사용!"
                    }
                },
                {
                    "lesson_id": "ch2-L07",
                    "title": "の (no) - 소유/연결의 조사",
                    "order": 7,
                    "type": "grammar",
                    "content": {
                        "grammar_point": "の",
                        "reading": "no",
                        "korean_equivalent": "~의",
                        "level": "JLPT N5",
                        "introduction": "'の'는 명사와 명사를 연결하여 소유, 소속, 설명의 관계를 나타냅니다.",
                        "detailed_explanation": [
                            "の는 한국어의 '~의'와 거의 같습니다.",
                            "명사 + の + 명사 형태로 사용됩니다.",
                            "소유 외에도 소속, 설명, 동격 등 다양한 관계를 나타낼 수 있습니다."
                        ],
                        "usages": [
                            {
                                "usage_title": "1️⃣ 소유 (~의)",
                                "examples": [
                                    { "japanese": "わたしの ほん", "korean": "나의 책" },
                                    { "japanese": "せんせいの かばん", "korean": "선생님의 가방" }
                                ]
                            },
                            {
                                "usage_title": "2️⃣ 소속 (~의)",
                                "examples": [
                                    { "japanese": "にほんの くるま", "korean": "일본의 자동차 (일본 차)" },
                                    { "japanese": "がっこうの せんせい", "korean": "학교의 선생님 (학교 선생님)" }
                                ]
                            },
                            {
                                "usage_title": "3️⃣ 동격 (= ~인)",
                                "examples": [
                                    { "japanese": "ともだちの たなかさん", "korean": "친구인 다나카 씨" }
                                ]
                            }
                        ],
                        "practice_sentences": [
                            { "korean": "나의 이름", "answer": "わたしの なまえ" },
                            { "korean": "일본의 음식", "answer": "にほんの たべもの" },
                            { "korean": "회사의 사람", "answer": "かいしゃの ひと" }
                        ],
                        "summary": "の는 명사와 명사를 연결! 소유, 소속, 설명의 관계를 표현합니다."
                    }
                },
                {
                    "lesson_id": "ch2-L08",
                    "title": "へ (e) - 방향의 조사",
                    "order": 8,
                    "type": "grammar",
                    "content": {
                        "grammar_point": "へ",
                        "reading": "e (글자는 'へ'이지만 조사로 쓸 때는 'e'로 발음)",
                        "korean_equivalent": "~에, ~쪽으로",
                        "level": "JLPT N5",
                        "introduction": "'へ'는 이동의 방향을 나타냅니다. に와 비슷하지만 방향성을 더 강조합니다.",
                        "detailed_explanation": [
                            "へ는 '~쪽으로'라는 방향을 나타냅니다.",
                            "주의! 글자는 'へ(he)'이지만, 조사로 쓸 때는 'e'로 발음합니다.",
                            "に와 바꿔 쓸 수 있는 경우가 많지만, へ는 방향에 초점, に는 도착점에 초점"
                        ],
                        "comparison": {
                            "title": "へ vs に",
                            "examples": [
                                {
                                    "particle": "へ",
                                    "japanese": "にほんへ いきます",
                                    "nuance": "일본 쪽으로 갑니다 (방향 강조)"
                                },
                                {
                                    "particle": "に",
                                    "japanese": "にほんに いきます",
                                    "nuance": "일본에 갑니다 (도착점 강조)"
                                }
                            ]
                        },
                        "examples": [
                            {
                                "japanese": "がっこうへ いきます。",
                                "korean": "학교에 갑니다.",
                                "note": "방향 강조: 학교 쪽으로"
                            },
                            {
                                "japanese": "みなみへ あるきます。",
                                "korean": "남쪽으로 걷습니다.",
                                "note": "방향만 나타내므로 へ가 자연스러움"
                            }
                        ],
                        "practice_sentences": [
                            { "korean": "역으로 갑니다.", "answer": "えきへ いきます。" },
                            { "korean": "동쪽으로 갑니다.", "answer": "ひがしへ いきます。" }
                        ],
                        "summary": "へ는 방향(~쪽으로)을 나타내며, 'e'로 발음합니다."
                    }
                }
            ]
        },

        // =====================================================
        // 📖 CHAPTER 3: 기본 문형 - です/ます 체계
        // =====================================================
        {
            "chapter_id": "ch3",
            "title": "Chapter 3: 기본 문형 마스터",
            "subtitle": "정중체(ます/です)로 기본 문장 만들기",
            "order": 3,
            "lessons": [
                {
                    "lesson_id": "ch3-L01",
                    "title": "명사문: ~は ~です",
                    "order": 1,
                    "type": "grammar",
                    "content": {
                        "grammar_point": "AはBです",
                        "reading": "A wa B desu",
                        "korean_equivalent": "A는 B입니다",
                        "level": "JLPT N5",
                        "introduction": "가장 기본적인 일본어 문장 구조입니다. 'A는 B입니다'라고 정중하게 말하는 법을 배웁니다.",
                        "structure": "[명사A] + は + [명사B] + です",
                        "forms": {
                            "positive": { "form": "~です", "meaning": "~입니다", "example": "がくせいです (학생입니다)" },
                            "negative": { "form": "~ではありません / ~じゃありません", "meaning": "~이/가 아닙니다", "example": "がくせいではありません (학생이 아닙니다)" },
                            "past": { "form": "~でした", "meaning": "~이었습니다", "example": "がくせいでした (학생이었습니다)" },
                            "past_negative": { "form": "~ではありませんでした", "meaning": "~이/가 아니었습니다", "example": "がくせいではありませんでした" }
                        },
                        "examples": [
                            {
                                "japanese": "わたしは かいしゃいんです。",
                                "korean": "저는 회사원입니다.",
                                "breakdown": "わたし(나) + は(는) + かいしゃいん(회사원) + です(입니다)"
                            },
                            {
                                "japanese": "かれは にほんじんではありません。",
                                "korean": "그는 일본인이 아닙니다.",
                                "breakdown": "かれ(그) + は(는) + にほんじん(일본인) + ではありません(이 아닙니다)"
                            }
                        ],
                        "practice_sentences": [
                            { "korean": "저는 한국인입니다.", "answer": "わたしは かんこくじんです。" },
                            { "korean": "이것은 사과가 아닙니다.", "answer": "これは りんごではありません。" },
                            { "korean": "어제는 일요일이었습니다.", "answer": "きのうは にちようびでした。" }
                        ],
                        "summary": "명사문의 기본! 입니다(です), 아닙니다(ではありません), 이었습니다(でした) 4가지 형태를 외우세요."
                    }
                },
                {
                    "lesson_id": "ch3-L02",
                    "title": "동사문: ~ます형",
                    "order": 2,
                    "type": "grammar",
                    "content": {
                        "grammar_point": "동사 ます형",
                        "reading": "doushi masu-kei",
                        "korean_equivalent": "~합니다",
                        "level": "JLPT N5",
                        "introduction": "'ます'형은 일본어의 정중한 동사 표현입니다. 처음 배우는 동사는 모두 ます형으로 시작합니다.",
                        "forms": {
                            "positive": { "form": "~ます", "meaning": "~합니다", "example": "たべます (먹습니다)" },
                            "negative": { "form": "~ません", "meaning": "~하지 않습니다", "example": "たべません (먹지 않습니다)" },
                            "past": { "form": "~ました", "meaning": "~했습니다", "example": "たべました (먹었습니다)" },
                            "past_negative": { "form": "~ませんでした", "meaning": "~하지 않았습니다", "example": "たべませんでした (먹지 않았습니다)" }
                        },
                        "common_verbs": [
                            { "masu": "たべます", "meaning": "먹습니다", "dictionary": "たべる" },
                            { "masu": "のみます", "meaning": "마십니다", "dictionary": "のむ" },
                            { "masu": "いきます", "meaning": "갑니다", "dictionary": "いく" },
                            { "masu": "きます", "meaning": "옵니다", "dictionary": "くる" },
                            { "masu": "みます", "meaning": "봅니다", "dictionary": "みる" },
                            { "masu": "ききます", "meaning": "듣습니다", "dictionary": "きく" },
                            { "masu": "よみます", "meaning": "읽습니다", "dictionary": "よむ" },
                            { "masu": "かきます", "meaning": "씁니다", "dictionary": "かく" },
                            { "masu": "はなします", "meaning": "말합니다", "dictionary": "はなす" },
                            { "masu": "べんきょうします", "meaning": "공부합니다", "dictionary": "べんきょうする" }
                        ],
                        "examples": [
                            {
                                "japanese": "まいにち にほんごを べんきょうします。",
                                "korean": "매일 일본어를 공부합니다.",
                                "breakdown": "まいにち(매일) + にほんご(일본어) + を(를) + べんきょうします(공부합니다)"
                            },
                            {
                                "japanese": "きのう えいがを みませんでした。",
                                "korean": "어제 영화를 보지 않았습니다.",
                                "breakdown": "きのう(어제) + えいが(영화) + を(를) + みませんでした(보지 않았습니다)"
                            }
                        ],
                        "practice_sentences": [
                            { "korean": "아침에 빵을 먹습니다.", "answer": "あさ パンを たべます。" },
                            { "korean": "어제 학교에 가지 않았습니다.", "answer": "きのう がっこうに いきませんでした。" },
                            { "korean": "내일 친구가 옵니다.", "answer": "あした ともだちが きます。" }
                        ],
                        "summary": "동사 ます형의 4가지 활용(ます/ません/ました/ませんでした)을 완벽하게 익히세요!"
                    }
                }
            ]
        }
    ],

    // =====================================================
    // 📝 어휘 섹션 (기존 데이터 유지 + 확장)
    // =====================================================
    "vocabulary": {
        "note": "어휘는 기존 grade_1.js 파일의 vocabulary 배열을 그대로 사용합니다.",
        "reference": "grade_1.js 파일의 vocabulary 섹션 참조"
    }
};

// 전역 노출
if (typeof window !== 'undefined') {
    window.grade1_enhanced_data = grade1_enhanced_data;
}

console.log('[Grade 1 Enhanced] 문법 중심 완전판 데이터 로드됨');
