/**
 * grade_6_enhanced.js
 * 🗼 6학년: 전설의 탑
 * - 사역 수동형 (억지로 ~하다)
 * - 졸업 시험 (종합)
 */

if (typeof window !== 'undefined') {
    window.grade6_enhanced_data = {
        "info": {
            "grade": 6,
            "title": "🗼 6학년: 전설의 탑",
            "description": "초등학교의 마지막 관문입니다. 가장 복잡한 감정을 표현하고 졸업 자격을 증명하세요!",
            "target": "JLPT N3 기초",
            "curriculum_type": "고급 표현 및 종합",
            "estimated_hours": 90
        },
        "chapters": [
            {
                "chapter_id": "ch6-1",
                "title": "어쩔 수 없었어 (사역수동)",
                "subtitle": "하기 싫은 일을 억지로 했을 때",
                "order": 1,
                "lessons": [
                    {
                        "lesson_id": "ch6-L01",
                        "title": "시키니까 했다",
                        "order": 1,
                        "type": "grammar",
                        "content": {
                            "introduction": "엄마가 채소를 먹으라고 해서 억지로 먹었습니다. 이 복잡한 상황을 한 단어로!",
                            "key_points": [
                                { "title": "사역(하게 하다) + 수동(당하다)", "explanation": "누군가가 시켜서 (어쩔 수 없이) 행동을 당하다 = 하게 되다.", "example": "たべる → たべさせる(시키다) → たべさせられる(억지로 먹다)" },
                                { "title": "1그룹 단축형 (세라레루 → 사레루)", "explanation": "발음이 너무 길어서 줄여 씁니다. (書かせる → 書かされる)", "example": "かかされました (억지로 썼습니다)" }
                            ],
                            "examples": [
                                { "japanese": "きらいな ピアノを ならわされました。", "korean": "싫어하는 피아노를 억지로 배웠습니다.", "romaji": "Kirai na piano o narawasaremashita." },
                                { "japanese": "いちじかんも またされました。", "korean": "1시간이나 (억지로) 기다리게 되었습니다.", "romaji": "Ichijikan mo matasaremashita." }
                            ]
                        }
                    }
                ]
            },
            {
                "chapter_id": "ch6-2",
                "title": "졸업 시험",
                "subtitle": "전설의 탑 꼭대기",
                "order": 2,
                "lessons": [
                    {
                        "lesson_id": "ch6-L02",
                        "title": "마스터 퀴즈",
                        "order": 1,
                        "type": "grammar",
                        "content": {
                            "introduction": "지금까지 배운 모든 것(1~6학년)을 확인합니다.",
                            "key_points": [
                                { "title": "축하합니다!", "explanation": "모든 과정을 마치면 중학교 과정(진짜 모험)이 기다립니다.", "example": "おめでとうございます！" }
                            ],
                            "examples": [
                                { "japanese": "にほんごの べんきょうは つづきます。", "korean": "일본어 공부는 계속됩니다.", "romaji": "Nihongo no benkyou wa tsuzukimasu." }
                            ]
                        }
                    }
                ]
            }
        ],
        "vocabulary": { "reference": "grade_6.js 참조" }
    };
}
