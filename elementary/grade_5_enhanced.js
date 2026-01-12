/**
 * grade_5_enhanced.js
 * 🏰 5학년: 구름의 성
 * - 수동태 (당하다/되다)
 * - 수수 표현 (주고 받기)
 */

if (typeof window !== 'undefined') {
    window.grade5_enhanced_data = {
        "info": {
            "grade": 5,
            "title": "🏰 5학년: 구름의 성",
            "description": "구름 위의 성에서는 관계가 중요합니다. 주고 받는 마음과 입장을 바꿔 생각하는 법을 배웁니다.",
            "target": "JLPT N4 완성",
            "curriculum_type": "수동태 및 수수 표현",
            "estimated_hours": 80
        },
        "chapters": [
            {
                "chapter_id": "ch5-1",
                "title": "입장 바꿔 생각하기 (수동태)",
                "subtitle": "내가 당한 일을 표현할 때",
                "order": 1,
                "lessons": [
                    {
                        "lesson_id": "ch5-L01",
                        "title": "혼났어요 / 칭찬받았어요",
                        "order": 1,
                        "type": "grammar",
                        "content": {
                            "introduction": "선생님이 나를 칭찬했습니다. → 나는 선생님께 칭찬받았습니다.\n주어를 '나'로 바꾸는 마법입니다.",
                            "key_points": [
                                { "title": "1그룹: 아단 + 레루", "explanation": "u단을 a단으로 바꾸고 れる를 붙입니다.", "example": "しかる(꾸짖다) → しかられる(꾸지람 듣다)" },
                                { "title": "2그룹: 라레루", "explanation": "가능형과 모양이 같습니다. 문맥으로 구별하세요!", "example": "みる → みられる (보이다/봄을 당하다)" }
                            ],
                            "examples": [
                                { "japanese": "せんせいに ほめられました。", "korean": "선생님께 칭찬받았습니다.", "romaji": "Sensei ni homeraremashita." },
                                { "japanese": "あしを ふまれました。", "korean": "(누군가에게) 발을 밟혔습니다.", "romaji": "Ashi o fumaremashita." }
                            ]
                        }
                    }
                ]
            },
            {
                "chapter_id": "ch5-2",
                "title": "선물의 순환 (수수 표현)",
                "subtitle": "주고 받는 기쁨",
                "order": 2,
                "lessons": [
                    {
                        "lesson_id": "ch5-L02",
                        "title": "내가 줄 때 vs 남이 줄 때",
                        "order": 1,
                        "type": "grammar",
                        "content": {
                            "introduction": "일본어는 '주다'가 두 개입니다. 내가 남에게 줄 때는 'あげる', 남이 나에게 줄 때는 'くれる'입니다.",
                            "key_points": [
                                { "title": "내가 준다: あげる", "explanation": "I give you. (상대방을 올려줌)", "example": "はなに みずを あげる (꽃에 물을 주다)" },
                                { "title": "남이 나에게 준다: くれる", "explanation": "He gives me. (나에게 내려줌)", "example": "ちちが ほんを くれました (아버지가 책을 주셨습니다)" }
                            ],
                            "examples": [
                                { "japanese": "ともだちに チョコを あげました。", "korean": "친구에게 초콜릿을 주었습니다.", "romaji": "Tomodachi ni choko o agemashita." },
                                { "japanese": "サンタさんが プレゼントを くれました。", "korean": "산타 할아버지가 선물을 주셨습니다.", "romaji": "Santa-san ga purezento o kuremashita." }
                            ]
                        }
                    }
                ]
            }
        ],
        "vocabulary": { "reference": "grade_5.js 참조" }
    };
}
