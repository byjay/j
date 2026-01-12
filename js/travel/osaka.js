/**
 * osaka.js - 오사카 여행 가이드 (Perfect Mode)
 * Uses RegionalTravelGuide from TravelModule.js
 */

window.initOsakaTrip = async function () {
    console.log('[Osaka] Initializing trip...');

    try {
        // Fetch POI Data Asynchronously
        const response = await fetch('data/osaka_poi.json');
        if (!response.ok) throw new Error('Data fetch failed');
        const poiDB = await response.json();

        console.log(`[Osaka] Loaded ${poiDB.length} POI items.`);

        // Define Itinerary (Optimized 4-Day Plan)
        const osakaDays = [
            {
                day: 1,
                title: "Arrival & Kids' Logic",
                desc: "간사이 공항 도착! 짐 풀고 아이들이 제일 좋아하는 포켓몬 카페부터!",
                schedule: [
                    "kix",                  // 간사이 공항
                    "swissotel",            // 숙소 (난바)
                    "pokemon_cafe_osaka",   // [NEW] 포켓몬 카페 (예약 필수!)
                    "dotonbori",            // 도톤보리 구경
                    "kani_doraku",          // 게 요리 전문점
                    "midosuji_illumination" // 밤 산책: 미도스지 일루미네이션
                ]
            },
            {
                day: 2,
                title: "Universal Studios Japan",
                desc: "하루 종일 USJ! 닌텐도 월드와 해리포터에서 꿈같은 시간을.",
                schedule: [
                    "park_front",           // 숙소 (USJ 앞)
                    "usj",                  // 유니버설 스튜디오 재팬
                    "ichiran_dotonbori"     // 지친 몸엔 따뜻한 라멘 야식
                ]
            },
            {
                day: 3,
                title: "Classic & Modern Osaka",
                desc: "오사카의 역사(성)와 현재(우메다), 그리고 밤의 식물원.",
                schedule: [
                    "osaka_castle",         // 오전: 오사카성
                    "umeda_sky",            // 오후: 공중정원 전망대
                    "hep_five",             // 저녁: 헵파이브 관람차
                    "teamlab_osaka"         // [NEW] 밤: 팀랩 보태니컬 가든 (야간)
                ]
            },
            {
                day: 4,
                title: "Sky View & Farewell",
                desc: "일본 최고층 빌딩에서 전경을 보고, 공항으로 향합니다.",
                schedule: [
                    "abeno_harukas",        // [NEW] 오전: 아베노 하루카스 300
                    "shinsekai",            // 점심: 신세카이 & 쿠시카츠
                    "kuromon",              // 오후: 구로몬 시장 (간식)
                    "kix"                   // 공항으로 이동
                ]
            }
        ];

        // Initialize Guide
        window.osakaGuide = new RegionalTravelGuide({
            regionId: 'osaka',
            days: osakaDays,
            poiDatabase: poiDB,
            containerId: 'itinerary-content',
            theme: 'light',
            layout: 'grid'
        });

    } catch (error) {
        console.error('[Osaka] Failed to initialize:', error);
    }
};

console.log('[Osaka] Script loaded.');
