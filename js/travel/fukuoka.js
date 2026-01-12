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

        // Fetch POI Data (Use Preloaded or Fetch)
        let poiDB = [];
        if (window.FUKUOKA_POI_DATABASE) {
            poiDB = window.FUKUOKA_POI_DATABASE;
        } else if (window.fukuokaDataPromise) {
            poiDB = await window.fukuokaDataPromise;
        } else {
            // Fallback Fetch
            const response = await fetch('data/fukuoka_poi.json');
            if (!response.ok) throw new Error('Data fetch failed');
            poiDB = await response.json();
        }

        if (!poiDB || poiDB.length === 0) {
            console.warn('[Fukuoka] POI Database is empty or failed to load. Using backup data.');
            // Emergency Backup Data (Hardcoded to ensure display)
            poiDB = [
                { id: "fukuoka_airport", name: "후쿠오카 공항", type: "Transport", desc: "시내와 가까운 편리한 공항", photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Fukuoka_Airport_International_Terminal_Building_20160521.jpg/1200px-Fukuoka_Airport_International_Terminal_Building_20160521.jpg"] },
                { id: "hakata_station", name: "하카타역", type: "Hub", desc: "규슈 여행의 중심지", photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Hakata_Station_201108.jpg/1200px-Hakata_Station_201108.jpg"] },
                { id: "canal_city_hakata", name: "캐널시티 하카타", type: "Shopping", desc: "운하가 흐르는 복합 쇼핑몰", photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Canal_City_Hakata_20150607.jpg/1200px-Canal_City_Hakata_20150607.jpg"] },
                { id: "nakasu_yatai", name: "나카스 포장마차", type: "Food", desc: "낭만적인 강변 포장마차 거리", photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Nakasu_Yatai_2015.jpg/1200px-Nakasu_Yatai_2015.jpg"] },
                { id: "dazaifu_tenmangu_shrine", name: "다자이후 텐만구", type: "Culture", desc: "학문의 신을 모시는 신사", photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Dazaifu_Tenmangu_Honden.jpg/1200px-Dazaifu_Tenmangu_Honden.jpg"] },
                { id: "starbucks_dazaifu", name: "스타벅스 다자이후", type: "Cafe", desc: "쿠마 켄고가 디자인한 독특한 건축", photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Starbucks_Coffee_Dazaifu_Tenmangu_Omotesando_Store.jpg/1200px-Starbucks_Coffee_Dazaifu_Tenmangu_Omotesando_Store.jpg"] },
                { id: "momochi_beach", name: "모모치 해변", type: "Nature", desc: "도심 속 인공 해변", photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Momochi_Seaside_Park_2016.jpg/1200px-Momochi_Seaside_Park_2016.jpg"] },
                { id: "fukuoka_tower", name: "후쿠오카 타워", type: "View", desc: "해변에 우뚝 솟은 랜드마크", photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Fukuoka_Tower_2016.jpg/1200px-Fukuoka_Tower_2016.jpg"] },
                { id: "ohori_park", name: "오호리 공원", type: "Park", desc: "시민들의 휴식처 호수 공원", photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Ohori_Park_Fukuoka.jpg/1200px-Ohori_Park_Fukuoka.jpg"] },
                { id: "tenjin_underground", name: "텐진 지하상가", type: "Shopping", desc: "유럽풍의 세련된 지하 쇼핑가", photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Tenjin_Chikagai.jpg/1200px-Tenjin_Chikagai.jpg"] },
                { id: "parco_fukuoka", name: "파르코 후쿠오카", type: "Shopping", desc: "트렌디한 패션과 잡화", photos: ["https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Fukuoka_Parco.jpg/1200px-Fukuoka_Parco.jpg"] }
            ];
        }

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
