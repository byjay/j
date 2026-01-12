/**
 * grade_3_enhanced.js
 * ⛰️ 3학년: 지혜의 산
 * - 동사의 て형 (연결과 부탁)
 * - 조건 표현 (하면, 된다면)
 */

if (typeof window !== 'undefined') {
    window.grade3_enhanced_data = {
        "info": {
            "grade": 3,
            "title": "⛰️ 3학년: 지혜의 산",
            "description": "산 중턱에 오르니 문장이 길어집니다. '하고', '해서'로 문장을 연결해 보세요!",
            "target": "JLPT N5 활용",
            "curriculum_type": "동사 활용 심화",
            "estimated_hours": 60
        },
        "chapters": [
            {
                "chapter_id": "ch3-1",
                "title": "마법의 연결고리 (て형)",
                "subtitle": "문장과 문장을 이어주는 'て'의 마법",
                "order": 1,
                "lessons": [
                    {
                        "lesson_id": "ch3-L01",
                        "title": "동사의 て형 변신!",
                        "order": 1,
                        "type": "grammar",
                        "content": {
                            "introduction": "문장을 끝내지 않고 계속 이어가고 싶나요? 동사를 'て' 모양으로 바꿔보세요!",
                            "key_points": [
                                { "title": "1그룹: 우츠루 → 읏테 (って)", "explanation": "う,つ,る로 끝나는 동사는 'って'가 됩니다. (예: かう→かって)", "example": "まって (기다려)" },
                                { "title": "1그룹: 누부무 → 은데 (んで)", "explanation": "ぬ,ぶ,む로 끝나는 동사는 'んで'가 됩니다. (예: のむ→のんで)", "example": "よんで (읽어)" },
                                { "title": "2그룹은 너무 쉬워요", "explanation": "그냥 'る'를 빼고 'て'를 붙입니다.", "example": "たべる→たべて (먹고/먹어)" }
                            ],
                            "examples": [
                                { "japanese": "ごはんを たべて、がっこうへ いきます。", "korean": "밥을 먹고, 학교에 갑니다.", "romaji": "Gohan o tabete, gakkou e ikimasu." },
                                { "japanese": "てを あらってください。", "korean": "손을 씻어 주세요.", "romaji": "Te o aratte kudasai." }
                            ]
                        }
                    }
                ]
            },
            {
                "chapter_id": "ch3-2",
                "title": "만약의 산길 (조건)",
                "subtitle": "길을 잃으면 어떻게 하죠? 조건 표현 배우기",
                "order": 2,
                "lessons": [
                    {
                        "lesson_id": "ch3-L02",
                        "title": "봄이 오면 (~と)",
                        "order": 1,
                        "type": "grammar",
                        "content": {
                            "introduction": "자연의 법칙이나 길 안내에는 'と'를 씁니다.",
                            "key_points": [
                                { "title": "동사 기본형 + と", "explanation": "~하면 (반드시 ~된다)", "example": "はるに なると、はなが さきます (봄이 되면 꽃이 핍니다)" }
                            ],
                            "examples": [
                                { "japanese": "この ボタンを おすと、みずが でます。", "korean": "이 버튼을 누르면 물이 나옵니다.", "romaji": "Kono botan o osu to, mizu ga demasu." }
                            ]
                        }
                    }
                ]
            }
        ],
        "vocabulary": { "reference": "grade_3.js 참조" }
    };
}
