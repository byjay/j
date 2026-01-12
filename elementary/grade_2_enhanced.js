/**
 * grade_2_enhanced.js
 * 일본 초등학교 2학년 과정 - 문법/회화 심화 완전판
 * 
 * 🌲 모험의 숲 테마:
 * - 과거형(동사/형용사) 정복
 * - 비교 표현 및 원함 표현
 * - 2학년 필수 한자 160자 (시간/방향 중심)
 */

if (typeof window !== 'undefined') {
    window.grade2_enhanced_data = {
        "info": {
            "grade": 2,
            "title": "🌲 2학년: 모험의 숲",
            "description": "이제 과거의 이야기를 할 수 있습니다! 더 넓은 세상과 비교하고, 원하는 것을 말해보세요.",
            "target": "초급 탈출, JLPT N5 완성, N4 기초",
            "curriculum_type": "문법 심화 + 한자 확장",
            "estimated_hours": 50
        },

        "chapters": [
            // =====================================================
            // 🕰️ CHAPTER 1: 시간 여행자 (과거형)
            // =====================================================
            {
                "chapter_id": "ch1",
                "title": "Chapter 1: 시간 여행자",
                "subtitle": "과거의 일을 말하는 법 (동사/형용사 과거형)",
                "order": 1,
                "lessons": [
                    {
                        "lesson_id": "ch1-L01",
                        "title": "동사의 과거형 (~ました)",
                        "order": 1,
                        "type": "grammar",
                        "content": {
                            "introduction": "우리는 지금까지 '합니다(~ます)'만 배웠습니다.\n이제 '했습니다(~ました)'를 배워서 어제 있었던 일을 친구에게 말해봅시다!",
                            "key_points": [
                                {
                                    "title": "규칙은 아주 간단합니다!",
                                    "explanation": "현재형 'ます'를 'ました'로 바꾸면 과거형이 됩니다.",
                                    "example": "たべます (먹습니다) → たべました (먹었습니다)",
                                    "note": "✨ ます → ました (마스 → 마시타) 이것만 기억하세요!"
                                },
                                {
                                    "title": "부정 과거형 (안 했습니다)",
                                    "explanation": "부정형 'ません' 뒤에 'でした'를 붙입니다.",
                                    "example": "たべません (안 먹습니다) → たべませんでした (안 먹었습니다)",
                                    "note": "⚠️ 'ません' + 'でした' 합체!"
                                }
                            ],
                            "examples": [
                                { "japanese": "きのう、べんきょうしました。", "korean": "어제 공부했습니다.", "romaji": "Kinou, benkyoushimashita." },
                                { "japanese": "けさ、ごはんを たべませんでした。", "korean": "오늘 아침, 밥을 먹지 않았습니다.", "romaji": "Kesa, gohan o tabemasendeshita." },
                                { "japanese": "テレビを みましたか。", "korean": "텔레비전을 봤습니까?", "romaji": "Terebi o mimashita ka." }
                            ],
                            "practice_sentences": [
                                { "korean": "어제 친구를 만났습니다.", "answer": "きのう ともだちに あいました。" },
                                { "korean": "학교에 가지 않았습니다.", "answer": "がっこうに いきませんでした。" }
                            ]
                        }
                    },
                    {
                        "lesson_id": "ch1-L02",
                        "title": "형용사의 과거형 (재미있었다 / 조용했다)",
                        "order": 2,
                        "type": "grammar",
                        "content": {
                            "introduction": "'맛있어요'는 '맛있었어요'로 어떻게 바꿀까요?\n일본어 형용사는 두 종류(い형용사, な형용사)가 있어서 조금 다릅니다!",
                            "key_points": [
                                {
                                    "title": "い형용사의 과거 (〜かったです)",
                                    "explanation": "끝의 'い'를 떼고 'かったです'를 붙입니다.",
                                    "example": "おいしい (맛있다) → おいしかったです (맛있었습니다)",
                                    "note": "💡 '이'가 없어지고 '캇타'가 붙어요!"
                                },
                                {
                                    "title": "な형용사/명사의 과거 (〜でした)",
                                    "explanation": "그냥 뒤에 'でした'를 붙이면 됩니다. (현재형 'です' 대신 'でした')",
                                    "example": "しずかです (조용합니다) → しずかでした (조용했습니다)",
                                    "note": "명사도 똑같아요: がくせいでした (학생이었습니다)"
                                },
                                {
                                    "title": "⚠️ 주의! '좋다(いい)'의 과거",
                                    "explanation": "いい는 특별하게 변합니다. 'よかったです'가 됩니다.",
                                    "example": "いいです (좋습니다) → よかったです (좋았습니다)",
                                    "note": "익캇타(X) → 요캇타(O)"
                                }
                            ],
                            "examples": [
                                { "japanese": "きのうは あつかったです。", "korean": "어제는 더웠습니다.", "romaji": "Kinou wa atsukatta desu." },
                                { "japanese": "りょこうは たのしかったです。", "korean": "여행은 즐거웠습니다.", "romaji": "Ryokou wa tanoshikatta desu." },
                                { "japanese": "ひまでした。", "korean": "한가했습니다.", "romaji": "Hima deshita." }
                            ],
                            "practice_sentences": [
                                { "korean": "재미있었습니다.", "answer": "おもしろかったです。" },
                                { "korean": "어제는 일요일이었습니다.", "answer": "きのうは にちようびでした。" }
                            ]
                        }
                    }
                ]
            },
            // =====================================================
            // ⚖️ CHAPTER 2: 선택의 갈림길 (비교와 원함)
            // =====================================================
            {
                "chapter_id": "ch2",
                "title": "Chapter 2: 선택의 갈림길",
                "subtitle": "비교하기(보다/더)와 원함(하고 싶다)",
                "order": 2,
                "lessons": [
                    {
                        "lesson_id": "ch2-L01",
                        "title": "비교 표현 (~보다 ~가 더)",
                        "order": 1,
                        "type": "grammar",
                        "content": {
                            "introduction": "짜장면이 좋아, 짬뽕이 좋아?\n두 가지를 비교해서 어느 쪽이 더 좋은지 말해보세요.",
                            "key_points": [
                                {
                                    "title": "Aより Bのほうが (A보다 B가 더)",
                                    "explanation": "비교의 기준에는 'より(보다)', 더한 쪽에는 'のほうが(쪽이)'를 씁니다.",
                                    "example": "バスより でんしゃのほうが はやいです (버스보다 전철이 더 빠릅니다)",
                                    "note": "순서를 바꿔도 뜻은 같습니다. (Bのほうが Aより...)"
                                },
                                {
                                    "title": "질문하기 (Aと Bと どっちが?)",
                                    "explanation": "두 개 중 어느 쪽이냐고 물을 때는 'どっち(어느 쪽)'를 씁니다.",
                                    "example": "いぬと ねこと どっちが すきですか (개와 고양이 중 어느 쪽을 좋아합니까?)",
                                    "note": "대답할 때는 '〜のほうが すきです'라고 합니다."
                                }
                            ],
                            "examples": [
                                { "japanese": "きょうは きのうより あついです。", "korean": "오늘은 어제보다 덥습니다.", "romaji": "Kyou wa kinou yori atsui desu." },
                                { "japanese": "にくのほうが すきです。", "korean": "고기 쪽을 더 좋아합니다.", "romaji": "Niku no hou ga suki desu." }
                            ],
                            "practice_sentences": [
                                { "korean": "일본보다 한국이 춥습니다.", "answer": "にほんより かんこくのほうが さむいです。" }
                            ]
                        }
                    },
                    {
                        "lesson_id": "ch2-L02",
                        "title": "원함 표현 (~하고 싶다)",
                        "order": 2,
                        "type": "grammar",
                        "content": {
                            "introduction": "일본에 가고 싶어요! 라면을 먹고 싶어요!\n나의 소망을 말하는 강력한 주문 'たい'를 배워봅시다.",
                            "key_points": [
                                {
                                    "title": "동사 마스형 + たい입니다",
                                    "explanation": "동사의 'ます'를 떼고 'たいです'를 붙입니다.",
                                    "example": "たべます → たべたいです (먹고 싶습니다)",
                                    "note": "가고 싶다: いきたい, 보고 싶다: みたい"
                                },
                                {
                                    "title": "조사 'を' 대신 'が'를 많이 씁니다",
                                    "explanation": "'~을/를 하고 싶다' 할 때, 일본어는 '~가 하고 싶다'라고 표현하는 것을 좋아합니다.",
                                    "example": "みずが のみたいです (물을 마시고 싶습니다)",
                                    "note": "현대 일본어에서는 'を'도 쓰지만, 'が'가 더 자연스러운 경우가 많습니다."
                                }
                            ],
                            "examples": [
                                { "japanese": "にほんへ いきたいです。", "korean": "일본에 가고 싶습니다.", "romaji": "Nihon e ikitai desu." },
                                { "japanese": "あいたいです。", "korean": "만나고 싶습니다.", "romaji": "Aitai desu." }
                            ],
                            "practice_sentences": [
                                { "korean": "영화를 보고 싶습니다.", "answer": "えいがが みたいです。" },
                                { "korean": "쉬고 싶습니다.", "answer": "やすみたいです。" }
                            ]
                        }
                    }
                ]
            }
        ],

        "vocabulary": {
            "reference": "grade_2.js 파일 참조"
        }
    };

    console.log('[Grade 2 Enhanced] 모험의 숲 데이터 로드됨');
}
