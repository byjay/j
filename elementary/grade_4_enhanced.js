/**
 * grade_4_enhanced.js
 * 🌊 4학년: 용기의 바다
 * - 존경어/겸양어 (예절)
 * - 가능형 (할 수 있다!)
 */

if (typeof window !== 'undefined') {
    window.grade4_enhanced_data = {
        "info": {
            "grade": 4,
            "title": "🌊 4학년: 용기의 바다",
            "description": "거친 파도 속에서도 예의를 지킵니다. 어른스럽게 말하는 법을 배워보아요.",
            "target": "JLPT N4 기초",
            "curriculum_type": "경어 및 복합 동사",
            "estimated_hours": 70
        },
        "chapters": [
            {
                "chapter_id": "ch4-1",
                "title": "할 수 있다! (가능형)",
                "subtitle": "나의 능력을 보여주는 가능 표현",
                "order": 1,
                "lessons": [
                    {
                        "lesson_id": "ch4-L01",
                        "title": "나는 헤엄칠 수 있어",
                        "order": 1,
                        "type": "grammar",
                        "content": {
                            "introduction": "바다를 건너려면 수영을 할 수 있어야겠죠? '~할 수 있다'를 배워봅시다.",
                            "key_points": [
                                { "title": "1그룹: 에단 + 루", "explanation": "u단을 e단으로 바꾸고 る를 붙입니다.", "example": "いく(가다) → いける(갈 수 있다)" },
                                { "title": "2그룹: 라레루", "explanation": "る를 떼고 られる를 붙입니다.", "example": "たべる(먹다) → たべられる(먹을 수 있다)" }
                            ],
                            "examples": [
                                { "japanese": "わたしは およげます。", "korean": "저는 수영할 수 있습니다.", "romaji": "Watashi wa oyogemasu." },
                                { "japanese": "さしみが たべられますか。", "korean": "수영을 먹을 수 있습니까?", "romaji": "Sashimi ga taberaremasu ka." }
                            ]
                        }
                    }
                ]
            },
            {
                "chapter_id": "ch4-2",
                "title": "왕궁의 예절 (존경어)",
                "subtitle": "상대방을 높이는 아름다운 말",
                "order": 2,
                "lessons": [
                    {
                        "lesson_id": "ch4-L02",
                        "title": "높으신 분의 행동",
                        "order": 1,
                        "type": "grammar",
                        "content": {
                            "introduction": "선생님이나 사장님께는 특별한 동사를 씁니다.",
                            "key_points": [
                                { "title": "가시다/오시다/계시다", "explanation": "이 세 가지는 모두 'いらっしゃる' 하나로 표현 가능합니다!", "example": "せんせいは いらっしゃいますか (선생님 계십니까?)" },
                                { "title": "드시다/말씀하시다", "explanation": "召し上がる(드시다), おっしゃる(말씀하시다)", "example": "どうぞ 召し上がってください (어서 드세요)" }
                            ],
                            "examples": [
                                { "japanese": "しゃちょうは かえられました。", "korean": "사장님은 돌아가셨습니다.", "romaji": "Shachou wa kaeraremashita." }
                            ]
                        }
                    }
                ]
            }
        ],
        "vocabulary": { "reference": "grade_4.js 참조" }
    };
}
