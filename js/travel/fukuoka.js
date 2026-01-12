/**
 * fukuoka.js - 후쿠오카 여행 가이드 (Refactored)
 * Uses RegionalTravelGuide from TravelModule.js
 */

window.initFukuokaTrip = async function () {
    console.log('[Fukuoka] Initializing trip...');

    const waitForDeps = () => new Promise(resolve => {
        if (window.RegionalTravelGuide && window.LeafletMap) return resolve();
        const check = setInterval(() => {
            if (window.RegionalTravelGuide && window.LeafletMap) {
                clearInterval(check);
                resolve();
            }
        }, 100);
        setTimeout(() => { clearInterval(check); resolve(); }, 5000);
    });

    try {
        await waitForDeps();

        if (!window.RegionalTravelGuide) {
            console.error('RegionalTravelGuide class not found after waiting.');
            // Retry once more via dynamic import if module
            const { RegionalTravelGuide } = await import('./TravelModule.js');
            window.RegionalTravelGuide = RegionalTravelGuide;
        }

        // Fetch POI Data Asynchronously
        const response = await fetch('data/fukuoka_poi.json');
        if (!response.ok) throw new Error('Data fetch failed');
        const poiDB = await response.json();

        console.log(`[Fukuoka] Loaded ${poiDB.length} POI items.`);

        // Define Itinerary (Standard 3-Day Plan)
        const fukuokaDays = [
            {
                day: 1,
                title: "Arrival & City Vibes",
                desc: "후쿠오카 도착! 하카타와 나카스에서 첫 식사를.",
                schedule: [
                    "fukuoka_airport",      // 공항
                    "hakata_station",       // 하카타역
                    "canal_city_hakata",    // 캐널시티
                    "nakasu_yatai"          // 나카스 포장마차
                ]
            },
            {
                day: 2,
                title: "Culture & Beach",
                desc: "다자이후의 전통과 모모치의 해변을 즐기는 날.",
                schedule: [
                    "dazaifu_tenmangu_shrine", // 다자이후 텐만구
                    "starbucks_dazaifu",    // 컨셉 스타벅스
                    "momochi_beach",        // 모모치 해변
                    "fukuoka_tower"         // 후쿠오카 타워
                ]
            },
            {
                day: 3,
                title: "Park & Shopping",
                desc: "오호리 공원 산책 후 텐진 쇼핑, 그리고 귀국.",
                schedule: [
                    "ohori_park",           // 오호리 공원
                    "tenjin_underground",   // 텐진 지하상가
                    "parco_fukuoka",        // 파르코 백화점
                    "fukuoka_airport"       // 공항으로 이동
                ]
            }
        ];

        // Initialize Guide
        window.fukuokaGuide = new RegionalTravelGuide({
            regionId: 'fukuoka',
            days: fukuokaDays,
            poiDatabase: poiDB,
            containerId: 'itinerary-content',
            theme: 'light',
            layout: 'grid'
        });

    } catch (error) {
        console.error('[Fukuoka] Failed to initialize:', error);
        alert('후쿠오카 여행 데이터를 불러오는 데 실패했습니다.');
    }
};

console.log('[Fukuoka] Script loaded.');
