

// ==================== 데이터베이스 ====================
const placesDB = {
    // ================= [ 1일차: 도착 & 하카타 탐방 ] =================
    'airport_in': {
        name: '후쿠오카 공항 (도착)',
        lat: 33.5859, lng: 130.4507,
        type: 'transport',
        rating: 4.2,
        desc: '세계에서 시내 접근성이 가장 좋은 공항. 지하철로 5분이면 하카타역!',
        openHours: '24시간 운영 (국제선)',
        tips: '💡 꿀팁: 공항 2층 면세점에서 로이즈 초콜릿 미리 사두면 귀국 때 편해요! 지하철 타려면 무료 셔틀로 국내선 이동 필수.',
        info: [
            { label: '교통', val: '지하철 260엔 (5분) / 버스 270엔 / 택시 1,500엔' },
            { label: 'WiFi', val: 'Fukuoka City Wi-Fi 무료 (30분)' },
            { label: '편의시설', val: '세븐일레븐(1층), 로손(지하1층), 환전소(2층)' }
        ],
        links: [
            { name: '공항 공식 홈페이지', url: 'https://www.fukuoka-airport.jp/korea/' },
            { name: '지하철 노선도', url: 'https://subway.city.fukuoka.lg.jp/kor/index.html' }
        ],
        recommend: [
            { name: '후쿠오카 공항 면세점', type: '쇼핑', desc: '귀국 전 마지막 쇼핑 찬스! 히요코, 멘타이코 필수', icon: '🛍️' },
            { name: '공항 라멘 활주로', type: '식당', desc: '이치란 공항점 - 탑승 전 마지막 라멘', icon: '🍜' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=600',
            'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600',
            'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=600'
        ]
    },

    'hotel_checkin': {
        name: '몬탄 하카타 (숙소)',
        lat: 33.5878, lng: 130.4285,
        type: 'hotel',
        rating: 4.5,
        desc: '가족 여행객 최애 호텔! 넓고 깨끗한 객실, 하카타역 도보 8분',
        openHours: '체크인 15:00 / 체크아웃 11:00',
        tips: '💡 꿀팁: 1층 라운지 무료 커피 24시간! 체크인 전/후 짐 보관 무료. 세탁기(200엔) 완비.',
        info: [
            { label: '주소', val: '후쿠오카시 하카타구 하카타역 마에 2-18-1' },
            { label: '조식', val: '07:00~09:30 (일식/양식 뷔페)' },
            { label: '편의시설', val: '무료 WiFi, 냉장고, 전자레인지, 세탁실' }
        ],
        links: [
            { name: '호텔 예약 (Booking.com)', url: 'https://www.booking.com/hotel/jp/montan-hakata.html' },
            { name: '호텔 예약 (Agoda)', url: 'https://www.agoda.com/ko-kr/' }
        ],
        recommend: [
            { name: '로손 하카타역앞점', type: '편의점', desc: '호텔에서 도보 1분, 24시간 영업', icon: '🏪' },
            { name: '코메다 커피', type: '카페', desc: '아침 모닝세트 맛집 (07:00~)', icon: '☕' },
            { name: '서니(Sunny) 마트', type: '마트', desc: '24시간 대형마트, 술/간식 저렴', icon: '🛒' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600',
            'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600',
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600'
        ]
    },

    'lunch_hakata': {
        name: '하카타 우동 하가쿠레',
        lat: 33.5855, lng: 130.4250,
        type: 'food',
        rating: 4.6,
        desc: '백종원도 극찬한 부들부들 우동 맛집! 현금만 가능',
        openHours: '10:00~21:00 (브레이크타임 15:30~17:00)',
        priceRange: '500~800엔',
        tips: '💡 꿀팁: 11:30 오픈런 추천! 피크타임엔 1시간 대기. 현금만 받으니 미리 준비하세요. 우엉튀김(고보텐) 꼭 추가!',
        info: [
            { label: '위치', val: '하카타역 지하 고메 스트리트 (B1층)' },
            { label: '결제', val: '현금만 가능 (자판기 주문)' },
            { label: '대기', val: '평일 30분, 주말 1시간 (회전율 빠름)' }
        ],
        menus: [
            { name: '니쿠 우동 (고기 우동)', price: '650엔', desc: '달달한 소고기 육수가 예술! 면발이 쫄깃함의 끝판왕', photo: '🍜' },
            { name: '고보텐 (우엉튀김)', price: '100엔', desc: '바삭고소! 우동에 넣어 먹으면 국물이 더 진해짐', photo: '🍤' },
            { name: '유부초밥', price: '200엔', desc: '우동 국물에 찍어먹는 꿀조합', photo: '🍣' },
            { name: '마루텐 (어묵튀김)', price: '120엔', desc: '현지인 필수템, 부드럽고 고소함', photo: '🍢' }
        ],
        links: [
            { name: '구글맵으로 보기', url: 'https://maps.app.goo.gl/hakata-hagakure' },
            { name: '네이버 블로그 후기', url: 'https://search.naver.com/search.naver?query=하카타+우동+하가쿠레' }
        ],
        recommend: [
            { name: '하카타 잇소우 (라멘)', type: '식당', desc: '돈코츠 라멘 원조! 하카타1번가 입구', icon: '🍜' },
            { name: 'Rec Coffee', type: '카페', desc: '하카타역 마루이 6층 루프탑 뷰 카페', icon: '☕' },
            { name: '하카타 명과 히요코', type: '간식', desc: '병아리 모양 만쥬, 선물용 최고', icon: '🐣' }
        ],
        reviews: [
            { user: '면발요정', text: '면발이 정말 독특해요. 부들부들하면서도 쫄깃함이 살아있어요!', score: 5 },
            { user: '대기1시간도OK', text: '줄 서도 먹을 가치 있음. 고보텐 꼭 추가하세요!', score: 4.5 },
            { user: '현금주의', text: '카드 안돼서 당황했지만 맛은 인정!', score: 4 }
        ],
        photos: [
            'https://images.unsplash.com/photo-1618841557871-b9a1c1b8a8d4?w=600',
            'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=600',
            'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600'
        ]
    },

    'canal_city': {
        name: '캐널시티 하카타',
        lat: 33.5898, lng: 130.4108,
        type: 'tour',
        rating: 4.4,
        desc: '쇼핑·엔터·맛집이 한곳에! 분수쇼는 저녁 8시가 베스트',
        openHours: '10:00~21:00 (음식점 ~23:00)',
        tips: '💡 꿀팁: 분수쇼는 B1층 선플라자 스테이지가 정면뷰! 저녁 8시 3D 매핑쇼가 가장 예쁩니다. 5층 라멘 스타디움 추천!',
        info: [
            { label: '분수쇼', val: '매시 정각/30분 (야간 조명쇼 포함)' },
            { label: '쇼핑', val: '무인양품, 유니클로, 디즈니, 프랑프랑' },
            { label: '면세', val: '5,500엔 이상 구매 시 면세 가능' }
        ],
        links: [
            { name: '캐널시티 공식 홈페이지', url: 'https://canalcity.co.jp/korea' },
            { name: '층별 매장 안내', url: 'https://canalcity.co.jp/korea/shops' }
        ],
        recommend: [
            { name: '라멘 스타디움', type: '식당', desc: '5층, 전국 유명 라멘집 8곳 집결! 이치란도 있음', icon: '🍜' },
            { name: '긴타코 (타코야키)', type: '간식', desc: '1층, 겉바속촉 타코야키 350엔', icon: '🐙' },
            { name: '타카오 텐푸라', type: '식당', desc: '바삭한 튀김 정식 맛집, 줄서서 먹는 집', icon: '🍤' },
            { name: 'BAKE 치즈타르트', type: '디저트', desc: '갓 구운 치즈타르트 240엔', icon: '🧀' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600',
            'https://images.unsplash.com/photo-1567449303183-e3422c0b7975?w=600',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600'
        ]
    },

    'dinner_motsu': {
        name: '모츠나베 라쿠텐치',
        lat: 33.5905, lng: 130.4200,
        type: 'food',
        rating: 4.3,
        desc: '후쿠오카 3대 명물! 부추 산더미 곱창전골 맛집',
        openHours: '17:00~23:00 (L.O. 22:00)',
        priceRange: '2,500~4,000엔',
        tips: '💡 꿀팁: 저녁 6시 이후 예약 필수! 다 먹고 짬뽕면 추가는 국룰. 국물 짜면 육수 추가 요청하세요(무료).',
        info: [
            { label: '예약', val: '전화 예약 추천 (구글 번역 사용)' },
            { label: '인원', val: '2인부터 주문 가능 (1인분 1,300엔)' },
            { label: '분위기', val: '현지인 많은 이자카야 스타일' }
        ],
        menus: [
            { name: '모츠나베 코스', price: '2,600엔~', desc: '곱창전골 + 두부 + 야채 + 짬뽕면 마무리', photo: '🍲' },
            { name: '스모츠 (곱창초무침)', price: '세트포함', desc: '새콤달콤 곱창무침, 맥주 안주 최고', photo: '🥗' },
            { name: '생맥주', price: '580엔', desc: '시원한 생맥주로 곱창의 기름기를 잡아줌', photo: '🍺' },
            { name: '하이볼', price: '480엔', desc: '위스키 소다, 가볍게 마시기 좋음', photo: '🥃' }
        ],
        links: [
            { name: 'Tabelog 예약', url: 'https://tabelog.com/fukuoka/A4001/A400104/40000309/' },
            { name: '구글맵 위치', url: 'https://maps.app.goo.gl/rakutenchi' }
        ],
        recommend: [
            { name: '하카타 텐진 포장마차', type: '분위기', desc: '나카스 강변 포장마차 거리 (도보 10분)', icon: '🏮' },
            { name: '돈키호테 나카스점', type: '쇼핑', desc: '24시간 마트, 귀국 선물 사기 좋음', icon: '🛒' }
        ],
        reviews: [
            { user: '곱창러버', text: '냄새 하나도 안나고 부추가 산더미! 짬뽕면 마무리 꼭 하세요', score: 5 },
            { user: '예약필수', text: '예약 안하고 갔다가 1시간 기다림ㅠ 맛은 최고!', score: 4.5 }
        ],
        photos: [
            'https://images.unsplash.com/photo-1583325701194-48e8b847d1fa?w=600',
            'https://images.unsplash.com/photo-1551218372-a8789b81b253?w=600',
            'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600'
        ]
    },

    // ================= [ 2일차: 규슈 버스 투어 ] =================
    'tour_meet': {
        name: '🚩 투어 미팅 포인트',
        lat: 33.5902, lng: 130.4225,
        type: 'transport',
        rating: 5.0,
        desc: '오리엔탈 호텔 앞 집결! 늦으면 버스는 떠납니다 😱',
        openHours: '미팅 시간: 08:00 (7:50까지 도착 필수)',
        tips: '💡 꿀팁: 하카타역 "치쿠시구치(筑紫口)" 출구로 나와야 가까워요! 로손 편의점 옆에서 가이드가 깃발 들고 대기 중.',
        info: [
            { label: '준비물', val: '여권, 투어 바우처, 편한 신발' },
            { label: '소요시간', val: '약 10시간 (18:00 하카타역 복귀)' },
            { label: '식사', val: '점심 미포함 (유후인 자유식)' }
        ],
        links: [
            { name: 'KKday 투어 예약', url: 'https://www.kkday.com/ko/product/11903' },
            { name: 'Klook 투어 예약', url: 'https://www.klook.com/activity/1785-beppu-yufuin-day-tour/' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=600',
            'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600'
        ]
    },

    'dazaifu': {
        name: '다자이후 텐만구',
        lat: 33.5215, lng: 130.5348,
        type: 'tour',
        rating: 4.7,
        desc: '학문의 신을 모시는 신사! 수험생 필수 코스 🙏',
        openHours: '06:00~19:00 (참배 무료)',
        tips: '💡 꿀팁: 입구 소 동상의 머리를 만지면 머리가 좋아진대요! 스타벅스 컨셉스토어 앞 사진 필수. 우메가에모치는 따끈할 때 먹어야 맛있어요!',
        info: [
            { label: '입장료', val: '무료 (보물관 500엔)' },
            { label: '소요시간', val: '약 1시간 (관람 + 간식)' },
            { label: '주차', val: '버스 주차장 완비' }
        ],
        menus: [
            { name: '우메가에모치', price: '130엔', desc: '따끈한 매화 찹쌀떡, 팥소가 꽉! 카사노야/테라다야 추천', photo: '🍡' },
            { name: '스타벅스 음료', price: '500엔~', desc: '나무 건축이 예술! 인스타 필수 인증샷', photo: '☕' },
            { name: '다자이후 한정 사이다', price: '200엔', desc: '매실맛 사이다, 여름에 시원함', photo: '🥤' }
        ],
        links: [
            { name: '다자이후 공식 홈페이지', url: 'https://www.dazaifutenmangu.or.jp/kr' },
            { name: '가는 법 (니시테츠)', url: 'https://www.nishitetsu.jp/ko/' }
        ],
        recommend: [
            { name: '카사노야', type: '카페', desc: '80년 전통 우메가에모치 맛집, 정원이 예쁨', icon: '🍵' },
            { name: '이치란 다자이후점', type: '라멘', desc: '합격 기원 5각형 그릇! 여기만의 특별 메뉴', icon: '🍜' },
            { name: '스타벅스 컨셉스토어', type: '카페', desc: '쿠마 켄고 건축, 나무 빨대 사용', icon: '☕' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600',
            'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600',
            'https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=600'
        ]
    },

    'yufuin': {
        name: '유후인 (긴린코 호수)',
        lat: 33.2655, lng: 131.3600,
        type: 'tour',
        rating: 4.9,
        desc: '동화 속 온천마을! 아침 물안개가 장관 ✨',
        openHours: '상점가 10:00~17:00',
        tips: '💡 꿀팁: 긴린코 호수는 아침에 물안개가 가장 예쁨! 금상고로케 2호점이 본점보다 줄이 짧아요. 미르히 치즈케이크는 따뜻할 때 먹어야 제맛!',
        info: [
            { label: '상점가', val: '유노츠보거리 (도보 15분)' },
            { label: '소요시간', val: '2시간 (점심 + 관광)' },
            { label: '주차', val: '유후인역 공영 주차장' }
        ],
        menus: [
            { name: '금상고로케', price: '200엔', desc: '겉바속촉! 감자+고기 고로케, 맥주와 찰떡궁합', photo: '🥔' },
            { name: '미르히 치즈케이크', price: '350엔', desc: '따뜻한 컵 치즈케이크, 부들부들 식감', photo: '🧀' },
            { name: 'B-speak 롤케이크', price: '1,500엔', desc: '예약 필수! 현지인도 줄서는 명품 롤케이크', photo: '🍰' },
            { name: '유후인 버거', price: '800엔', desc: '와규 패티 버거, 길거리 음식 최고봉', photo: '🍔' }
        ],
        links: [
            { name: '유후인 관광 가이드', url: 'https://www.yufuin.gr.jp/' },
            { name: 'B-speak 온라인 예약', url: 'http://www.b-speak.net/' }
        ],
        recommend: [
            { name: '플로랄 빌리지', type: '포토존', desc: '해리포터 느낌 나는 유럽풍 마을, 인형 가게', icon: '🏰' },
            { name: '스누피 찻집', type: '카페', desc: '스누피 굿즈 천국! 귀여운 디저트', icon: '🐕' },
            { name: '긴린코 호수', type: '산책', desc: '한바퀴 20분, 물안개 명소', icon: '🌫️' },
            { name: '유후다케 케이블카', type: '액티비티', desc: '왕복 1,600엔, 산 정상 전망대', icon: '🚡' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600',
            'https://images.unsplash.com/photo-1576487503401-173fea862428?w=600',
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600'
        ]
    },

    'beppu': {
        name: '벳푸 가마도 지옥',
        lat: 33.3150, lng: 131.4750,
        type: 'tour',
        rating: 4.4,
        desc: '땅에서 김이 모락모락! 신기한 지옥 온천 체험',
        openHours: '08:00~17:00 (입장 마감 16:30)',
        tips: '💡 꿀팁: 족욕장 무료! 수건도 무료 대여해줘요. 온천 달걀 꼭 드셔보세요(유황향 쌉니다). 담배쇼 아저씨 공연이 재밌어요!',
        info: [
            { label: '입장료', val: '성인 450엔 (5개 지옥 공통권 2,000엔)' },
            { label: '소요시간', val: '1~1.5시간' },
            { label: '무료 체험', val: '족욕장, 음용 온천수' }
        ],
        menus: [
            { name: '온천 달걀', price: '80엔', desc: '유황 온천수로 삶은 달걀, 특유의 향', photo: '🥚' },
            { name: '지옥 푸딩', price: '350엔', desc: '온천 증기로 찐 부드러운 푸딩', photo: '🍮' },
            { name: '라무네 사이다', price: '200엔', desc: '구슬 넣는 재미! 여름에 시원함', photo: '🥤' }
        ],
        links: [
            { name: '벳푸 지옥온천 공식', url: 'http://www.beppu-jigoku.com/' },
            { name: '입장권 할인 (Klook)', url: 'https://www.klook.com/activity/1785/' }
        ],
        recommend: [
            { name: '바다지옥 (우미지고쿠)', type: '온천', desc: '코발트블루 색깔이 신기함! 1번 지옥', icon: '💙' },
            { name: '혈지옥 (치노이케지고쿠)', type: '온천', desc: '빨간 온천수가 실제로 존재! 포토존', icon: '❤️' },
            { name: '악어 지옥', type: '구경', desc: '온천에서 악어 키움ㅋㅋ 신기함', icon: '🐊' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?w=600',
            'https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?w=600',
            'https://images.unsplash.com/photo-1540206395-68808572332f?w=600'
        ]
    },

    // ================= [ 3일차: 후쿠오카 시내 투어 ] =================
    'ohori': {
        name: '오호리 공원',
        lat: 33.5861, lng: 130.3764,
        type: 'tour',
        rating: 4.6,
        desc: '도심 속 거대 호수 공원! 현지인 힐링 스팟 🌳',
        openHours: '24시간 개방 (일본정원 09:00~17:00)',
        tips: '💡 꿀팁: 스타벅스 창가 자리 경쟁 치열! 오전 9시 오픈런 추천. 호수 한바퀴 산책 40분. 자전거 대여 추천(1시간 200엔).',
        info: [
            { label: '입장료', val: '무료 (일본정원 250엔)' },
            { label: '시설', val: '오리배 대여, 자전거 대여, 카페' },
            { label: '볼거리', val: '후쿠오카 미술관, 마이즈루 공원(성터)' }
        ],
        links: [
            { name: '오호리공원 가이드', url: 'https://www.ohorikouen.jp/' },
            { name: '스타벅스 위치', url: 'https://maps.app.goo.gl/ohori-starbucks' }
        ],
        recommend: [
            { name: '스타벅스 오호리공원점', type: '카페', desc: '호수 뷰 최고! 테라스 자리 강추, 아침 일찍 가야 자리 있음', icon: '☕' },
            { name: '후쿠오카 미술관', type: '문화', desc: '공원 내 위치, 쿠사마 야요이 작품 있음 (입장 200엔)', icon: '🎨' },
            { name: '마이즈루 공원', type: '산책', desc: '바로 옆, 후쿠오카 성터, 벚꽃 명소', icon: '🌸' },
            { name: '앤 로컬스', type: '카페', desc: '전통 찻집, 말차와 화과자 세트 800엔', icon: '🍵' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1551918120-9739cb430c6d?w=600',
            'https://images.unsplash.com/photo-1568849676085-51415703900f?w=600',
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600'
        ]
    },

    'lunch_sushi': {
        name: '효탄 스시 (텐진 솔라리아점)',
        lat: 33.5900, lng: 130.3980,
        type: 'food',
        rating: 4.6,
        desc: '텐진 최고의 가성비 회전초밥! 신선도 미쳤다 🍣',
        openHours: '11:00~22:00 (L.O. 21:30)',
        priceRange: '380~800엔',
        tips: '💡 꿀팁: 본점보다 솔라리아점이 덜 붐벼요! 점심시간 피해 14시쯤 가면 웨이팅 없음. 활고등어 초밥은 여기만의 시그니처!',
        info: [
            { label: '위치', val: '텐진 솔라리아 플라자 B2층' },
            { label: '대기', val: '점심 30분, 오후 웨이팅 거의 없음' },
            { label: '결제', val: '카드 가능' }
        ],
        menus: [
            { name: '활고등어 초밥', price: '480엔', desc: '비리지 않고 고소함 끝판왕! 회전초밥 아까움', photo: '🐟' },
            { name: '오늘의 특선', price: '380엔~', desc: '그날 가장 신선한 생선, 주방장 추천', photo: '⭐' },
            { name: '구운 붕장어', price: '580엔', desc: '한 마리가 통째로! 달콤한 소스가 일품', photo: '🦎' },
            { name: '연어 뱃살', price: '420엔', desc: '입에서 녹는 부드러움, 지방 가득', photo: '🐠' }
        ],
        links: [
            { name: 'Tabelog 페이지', url: 'https://tabelog.com/fukuoka/A4001/A400103/40000176/' },
            { name: '구글맵 위치', url: 'https://maps.app.goo.gl/hyotan-sushi' }
        ],
        recommend: [
            { name: 'BAKE 치즈타르트', type: '디저트', desc: '텐진 지하상가, 갓 구운 치즈타르트 240엔', icon: '🧀' },
            { name: 'RINGO 애플파이', type: '디저트', desc: '줄서서 사는 애플파이 전문점, 한입 크기', icon: '🍎' },
            { name: '텐진 지하상가', type: '쇼핑', desc: '150개 매장, 비 와도 쇼핑 가능', icon: '🛍️' }
        ],
        reviews: [
            { user: '초밥러버', text: '활고등어가 진짜 신선해요! 비린내 1도 없고 고소함', score: 5 },
            { user: '가성비갑', text: '이 가격에 이 퀄리티면 한국에서 3배 가격', score: 4.5 }
        ],
        photos: [
            'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600',
            'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=600',
            'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600'
        ]
    },

    'momochi': {
        name: '모모치 해변 & 후쿠오카 타워',
        lat: 33.5932, lng: 130.3515,
        type: 'tour',
        rating: 4.5,
        desc: '인공 해변과 후쿠오카 랜드마크! 일몰이 예술 🌅',
        openHours: '타워 09:30~22:00 (입장 마감 21:30)',
        tips: '💡 꿀팁: 일몰 30분 전에 가세요! 타워 야경과 석양을 동시에 볼 수 있는 골든타임. 마리존 건물 배경으로 사진 필수!',
        info: [
            { label: '타워 입장료', val: '성인 800엔 (여권 제시 시 640엔)' },
            { label: '일몰 시간', val: '계절별 다름 (여름 19:00, 겨울 17:30)' },
            { label: '주차', val: '해변 무료 주차장 있음' }
        ],
        links: [
            { name: '후쿠오카 타워 공식', url: 'https://www.fukuokatower.co.jp/kr/' },
            { name: '할인 입장권 (Klook)', url: 'https://www.klook.com/activity/1783/' }
        ],
        recommend: [
            { name: '마리존 카페', type: '카페', desc: '해변가 테라스 카페, 바다 뷰 맛집, 음료 600엔~', icon: '☕' },
            { name: 'THE BEACH 레스토랑', type: '식당', desc: '마리존 내 이탈리안, 파스타 1,500엔~', icon: '🍝' },
            { name: '야토카제 타워', type: '포토존', desc: '하얀 돛 모양 건물, 인스타 명소', icon: '📸' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
            'https://images.unsplash.com/photo-1566024287689-4da8b58db77e?w=600',
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600'
        ]
    },

    'dinner_yakiniku': {
        name: '야키니쿠 바쿠로 (하카타점)',
        lat: 33.5920, lng: 130.4150,
        type: 'food',
        rating: 4.8,
        desc: '자체 농장 와규! 합리적 가격의 고기 천국 🥩',
        openHours: '11:30~15:00 / 17:00~22:00 (L.O. 21:30)',
        priceRange: '3,000~6,000엔',
        tips: '💡 꿀팁: 예약 필수! 특수부위 "메가 죠"는 일찍 품절되니 입장하자마자 주문하세요. 한국어 메뉴판 있어요.',
        info: [
            { label: '예약', val: 'Tabelog 온라인 예약 가능' },
            { label: '메뉴', val: '한국어 메뉴판 있음' },
            { label: '주차', val: '제휴 주차장 2시간 무료' }
        ],
        menus: [
            { name: '바쿠로 모듬', price: '5,800엔', desc: '다양한 부위 300g (2~3인분), 가성비 최고', photo: '🥩' },
            { name: '특상 우설', price: '1,500엔', desc: '두툼하고 쫄깃한 식감, 레몬즙과 환상 조합', photo: '👅' },
            { name: '메가 죠 (특수부위)', price: '1,800엔', desc: '하루 한정! 희귀 부위, 녹는 식감', photo: '💎' },
            { name: '스키야키 풍 로스', price: '1,200엔', desc: '계란 노른자에 찍어먹는 고기 끝판왕', photo: '🍖' }
        ],
        links: [
            { name: 'Tabelog 예약', url: 'https://tabelog.com/fukuoka/A4001/A400104/40007081/' },
            { name: '구글맵 위치', url: 'https://maps.app.goo.gl/bakuro' }
        ],
        recommend: [
            { name: '니쿠이치', type: '식당', desc: '또 다른 야키니쿠 맛집, 한우 전문점', icon: '🥩' },
            { name: '하카타 텐진 밤거리', type: '분위기', desc: '식후 산책 코스, 네온사인 예쁨', icon: '🌃' }
        ],
        reviews: [
            { user: '고기덕후', text: '고기 질이 미쳤어요. 가격 대비 만족도 200%', score: 5 },
            { user: '예약필수자', text: '예약 안하면 못 먹어요. 특수부위는 순삭', score: 5 }
        ],
        photos: [
            'https://images.unsplash.com/photo-1558030006-450675393462?w=600',
            'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600',
            'https://images.unsplash.com/photo-1544025162-d76694265947?w=600'
        ]
    },

    // ================= [ 4일차: 귀국 ] =================
    'airport_out': {
        name: '후쿠오카 공항 (귀국)',
        lat: 33.5859, lng: 130.4507,
        type: 'transport',
        rating: 4.0,
        desc: '아쉬운 이별... 다음에 또 만나요 후쿠오카! 👋',
        openHours: '국제선 24시간 운영',
        tips: '💡 꿀팁: 보안검색 후 면세점 줄 깁니다! 로이즈 초콜릿, 히요코 만쥬는 보이면 바로 사세요. 동전 남으면 가챠(뽑기) 추천!',
        info: [
            { label: '체크인', val: '출발 2시간 전 (JAL/ANA 1.5시간 전)' },
            { label: '면세점', val: '화장품, 과자, 술, 담배 판매' },
            { label: '동전 처리', val: '편의점, 가챠, 자판기 활용' }
        ],
        links: [
            { name: '공항 실시간 정보', url: 'https://www.fukuoka-airport.jp/korea/' },
            { name: '면세점 목록', url: 'https://www.fukuoka-airport.jp/shops/' }
        ],
        recommend: [
            { name: '히요코 만쥬', type: '선물', desc: '병아리 모양 과자, 후쿠오카 대표 기념품', icon: '🐣' },
            { name: '로이즈 초콜릿', type: '선물', desc: '녹지 않는 초콜릿, 한국보다 저렴', icon: '🍫' },
            { name: '멘타이코(명란)', type: '선물', desc: '진공포장 명란젓, 부모님 선물 추천', icon: '🐟' }
        ],
        photos: [
            'https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600',
            'https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?w=600'
        ]
    }
};

// 일정표
const schedule = {
    1: {
        title: '1일차: 도착 & 하카타 먹방 투어 🍜',
        items: ['airport_in', 'hotel_checkin', 'lunch_hakata', 'canal_city', 'dinner_motsu'],
        summary: '공항 도착 → 호텔 체크인 → 하카타 우동 → 캐널시티 쇼핑 → 곱창전골'
    },
    2: {
        title: '2일차: 규슈 버스 투어 (다자이후·유후인·벳푸) 🚌',
        items: ['tour_meet', 'dazaifu', 'yufuin', 'beppu'],
        summary: '버스 미팅 → 다자이후 신사 → 유후인 온천마을 → 벳푸 지옥온천'
    },
    3: {
        title: '3일차: 후쿠오카 시내 관광 🏙️',
        items: ['ohori', 'lunch_sushi', 'momochi', 'dinner_yakiniku'],
        summary: '오호리공원 산책 → 회전초밥 → 모모치해변 일몰 → 야키니쿠'
    },
    4: {
        title: '4일차: 마지막 쇼핑 & 귀국 ✈️',
        items: ['hotel_checkin', 'airport_out'],
        summary: '호텔 체크아웃 → 면세점 쇼핑 → 귀국'
    }
};

let activeDay = 1;
let map, markers = [];
let directionsService, directionsRenderer;

// ==================== 초기화 ====================
function initFukuokaTrip() {
    try {
        console.log('🎌 후쿠오카 여행 가이드 시작!');
        renderTabs();
        renderTabs();
        renderSchedule(activeDay);
        loadFlightInfo(); // 항공권 정보 로드
        loadAccommodation(); // 숙소 정보 로드
        initHotelSearch(); // 숙소 검색 초기화

        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
            try {
                initMap();
                directionsService = new google.maps.DirectionsService();
                directionsRenderer = new google.maps.DirectionsRenderer({
                    map: map,
                    suppressMarkers: true,
                    polylineOptions: {
                        strokeColor: '#4285F4',
                        strokeWeight: 5
                    }
                });
            } catch (mapErr) {
                console.warn('Google Maps Init Failed:', mapErr);
            }
        } else {
            console.warn('⚠️ Google Maps API 로딩 중... 또는 로드 실패');
            const mapEl = document.getElementById('map');
            if (mapEl) {
                mapEl.innerHTML = '<div class="flex items-center justify-center h-full bg-gray-100 text-gray-400 text-sm">지도 로딩 중...</div>';
            }
        }
    } catch (error) {
        console.error('Fukuoka Module Init Error:', error);
    }
}

function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    map = new google.maps.Map(mapElement, {
        center: { lat: 33.5902, lng: 130.4207 },
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        styles: [
            { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
            { featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "simplified" }] }
        ]
    });

    updateMarkers(activeDay);
}

// ==================== UI 렌더링 ====================
function renderTabs() {
    const container = document.getElementById('day-tabs');
    if (!container) return;

    container.innerHTML = Object.keys(schedule).map(day =>
        `<button onclick="changeFukuokaDay(${day})" 
                class="day-tab px-5 py-3 rounded-xl border-2 text-sm font-bold transition-all duration-300 ${day == activeDay
            ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-red-600 shadow-lg transform scale-105'
            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
        }">
            <div class="flex flex-col items-center gap-1">
                <span class="text-xs opacity-80">${day}일차</span>
                <span>${schedule[day].title.split(':')[0]}</span>
            </div>
        </button>`
    ).join('');
}

function changeFukuokaDay(day) {
    activeDay = day;
    renderTabs();
    renderSchedule(day);
    if (map) updateMarkers(day);
    if (directionsRenderer) directionsRenderer.setDirections({ routes: [] });

    // 스크롤 부드럽게 올리기
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateMarkers(day) {
    if (!map || typeof google === 'undefined') return;

    markers.forEach(m => m.setMap(null));
    markers = [];
    const bounds = new google.maps.LatLngBounds();

    schedule[day].items.forEach((key, idx) => {
        const item = getPlace(key);
        if (!item) return;

        const marker = new google.maps.Marker({
            position: { lat: item.lat, lng: item.lng },
            map: map,
            label: {
                text: (idx + 1).toString(),
                color: "white",
                fontWeight: "bold",
                fontSize: "14px"
            },
            title: item.name,
            animation: google.maps.Animation.DROP
        });

        marker.addListener('click', () => {
            const listElement = document.getElementById(`place-item-${idx}`);
            if (listElement) {
                listElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                const panel = document.getElementById(`detail-${idx}`);
                if (panel && panel.classList.contains('hidden')) {
                    toggleDetail(idx, item.lat, item.lng);
                }
            }
        });

        markers.push(marker);
        bounds.extend(marker.getPosition());
    });

    if (markers.length > 0) {
        map.fitBounds(bounds);
        const listener = google.maps.event.addListener(map, "idle", () => {
            if (map.getZoom() > 14) map.setZoom(14);
            google.maps.event.removeListener(listener);
        });
    }
}

function renderSchedule(day) {
    const container = document.getElementById('itinerary-content');
    if (!container) return;

    // 일정 요약 헤더
    const summaryDiv = document.createElement('div');
    summaryDiv.className = "bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-6 border-l-4 border-blue-500";
    summaryDiv.innerHTML = `
        <h3 class="font-bold text-lg text-gray-800 mb-2">📍 ${schedule[day].title}</h3>
        <p class="text-sm text-gray-600">${schedule[day].summary}</p>
    `;
    container.innerHTML = '';
    container.appendChild(summaryDiv);

    schedule[day].items.forEach((key, idx) => {
        const item = getPlace(key);
        if (!item) return;

        let iconClass = 'fa-map-marker-alt';
        let typeColor = 'text-gray-400';
        let bgColor = 'bg-gray-50';

        if (item.type === 'food') {
            iconClass = 'fa-utensils';
            typeColor = 'text-orange-500';
            bgColor = 'bg-orange-50';
        }
        if (item.type === 'hotel') {
            iconClass = 'fa-bed';
            typeColor = 'text-blue-500';
            bgColor = 'bg-blue-50';
        }
        if (item.type === 'transport') {
            iconClass = 'fa-plane';
            typeColor = 'text-purple-500';
            bgColor = 'bg-purple-50';
        }
        if (item.type === 'tour') {
            iconClass = 'fa-camera';
            typeColor = 'text-green-500';
            bgColor = 'bg-green-50';
        }

        const div = document.createElement('div');
        div.id = `place-item-${idx}`;
        div.className = "bg-white rounded-2xl shadow-md border-2 border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-blue-300 mb-4";

        div.innerHTML = `
            <div class="click-trigger p-5 cursor-pointer flex items-center justify-between bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-blue-50 transition" 
                 onclick="toggleDetail(${idx}, ${item.lat}, ${item.lng})">
                <div class="flex items-center gap-4 overflow-hidden flex-1">
                    <span class="flex-none w-12 h-12 rounded-full ${bgColor} ${typeColor} flex items-center justify-center font-bold text-xl border-2 border-current shadow-md">
                        ${idx + 1}
                    </span>
                    <div class="flex flex-col min-w-0 flex-1">
                        <h4 class="font-bold text-gray-800 text-lg truncate">${item.name}</h4>
                        <div class="flex items-center gap-2 mt-1">
                            <i class="fas ${iconClass} ${typeColor} text-sm"></i>
                            <span class="text-sm text-gray-500 truncate">${item.desc}</span>
                        </div>
                        ${item.rating ? `
                            <div class="flex items-center gap-2 mt-1">
                                <span class="text-xs font-bold text-yellow-600">⭐ ${item.rating}</span>
                                ${item.priceRange ? `<span class="text-xs text-gray-400">| ${item.priceRange}</span>` : ''}
                            </div>
                        ` : ''}
                    </div>
                </div>
                <div class="flex-none ml-3 w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100">
                     <i id="chevron-${idx}" class="fas fa-chevron-down ${typeColor} transition-transform duration-300"></i>
                </div>
            </div>
            
            <div id="detail-${idx}" class="hidden border-t-2 border-gray-100 bg-gradient-to-b from-gray-50 to-white">
                ${generateDetailHTML(item, idx)}
            </div>
        `;

        container.appendChild(div);
    });
}

// ==================== 상세 정보 생성 ====================
function generateDetailHTML(item, idx) {
    const stars = Array(5).fill(0).map((_, i) =>
        `<i class="fas fa-star ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'} text-sm"></i>`
    ).join('');

    // 1. 사진 갤러리
    let photosHTML = '';
    if (item.photos && item.photos.length > 0) {
        photosHTML = `
            <div class="grid grid-cols-2 gap-2 p-4">
                ${item.photos.slice(0, 4).map(url =>
            `<div class="aspect-video rounded-xl overflow-hidden shadow-md relative group">
                        <img src="${url}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="사진" loading="lazy">
                        <div class="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
                    </div>`
        ).join('')}
            </div>
        `;
    }

    // 2. 영업시간 & 가격대
    let infoBarHTML = '';
    if (item.openHours || item.priceRange) {
        infoBarHTML = `
            <div class="px-4 mb-4">
                <div class="bg-white rounded-xl border-2 border-blue-100 p-3 flex flex-wrap gap-3">
                    ${item.openHours ? `
                        <div class="flex items-center gap-2">
                            <i class="fas fa-clock text-blue-500"></i>
                            <span class="text-sm text-gray-700"><strong>영업:</strong> ${item.openHours}</span>
                        </div>
                    ` : ''}
                    ${item.priceRange ? `
                        <div class="flex items-center gap-2">
                            <i class="fas fa-yen-sign text-green-500"></i>
                            <span class="text-sm text-gray-700"><strong>가격대:</strong> ${item.priceRange}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // 3. 꿀팁 박스
    let tipsHTML = '';
    if (item.tips) {
        tipsHTML = `
            <div class="px-4 mb-4">
                <div class="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-4 rounded-r-xl shadow-md">
                    <div class="flex items-start gap-3">
                        <i class="fas fa-lightbulb text-yellow-500 text-xl mt-1 animate-pulse"></i>
                        <div class="flex-1">
                            <p class="text-xs font-bold text-yellow-800 mb-1.5">💡 여행 고수의 꿀팁</p>
                            <p class="text-sm text-gray-700 leading-relaxed">${item.tips}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // 4. 메뉴판
    let menusHTML = '';
    if (item.menus && item.menus.length > 0) {
        const menuRows = item.menus.map(m => `
            <div class="border-b border-gray-100 last:border-0 hover:bg-blue-50 transition-colors p-3 rounded-lg">
                <div class="flex justify-between items-center mb-1">
                    <span class="text-base font-bold text-gray-800">${m.photo || '🍽️'} ${m.name}</span>
                    <span class="text-lg font-bold text-red-600 whitespace-nowrap ml-3">${m.price}</span>
                </div>
                <p class="text-xs text-gray-600 pl-6">${m.desc}</p>
            </div>
        `).join('');

        menusHTML = `
            <div class="px-4 mb-4">
                <div class="bg-white rounded-xl border-2 border-orange-200 shadow-lg overflow-hidden">
                    <div class="bg-gradient-to-r from-orange-400 to-red-400 px-4 py-3 flex items-center gap-2">
                        <i class="fas fa-utensils text-white text-lg"></i> 
                        <span class="text-sm font-bold text-white">추천 메뉴 & 가격</span>
                    </div>
                    <div class="p-2">${menuRows}</div>
                </div>
            </div>
        `;
    }

    // 5. 일반 정보
    let infoTableHTML = '';
    if (item.info && item.info.length > 0) {
        const rows = item.info.map(info => `
            <tr class="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition">
                <td class="py-3 pl-4 text-xs font-bold text-gray-500 w-24 bg-gray-50">${info.label}</td>
                <td class="py-3 pl-4 pr-3 text-sm text-gray-700">${info.val}</td>
            </tr>
        `).join('');

        infoTableHTML = `
            <div class="px-4 mb-4">
                <div class="bg-white rounded-xl border-2 border-gray-200 shadow-md overflow-hidden">
                    <div class="bg-gray-100 px-4 py-2.5 flex items-center gap-2 border-b border-gray-200">
                        <i class="fas fa-info-circle text-blue-500"></i> 
                        <span class="text-xs font-bold text-gray-700">상세 정보</span>
                    </div>
                    <table class="w-full">${rows}</table>
                </div>
            </div>
        `;
    }

    // 6. 주변 추천 장소
    let recommendHTML = '';
    if (item.recommend && item.recommend.length > 0) {
        const items = item.recommend.map(rec => `
            <div class="flex items-center gap-3 bg-white p-3 rounded-xl border-2 border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center flex-shrink-0 text-2xl">
                    ${rec.icon || '📍'}
                </div>
                <div class="min-w-0 flex-1">
                    <p class="text-sm font-bold text-gray-800 truncate">${rec.name}</p>
                    <p class="text-xs text-gray-500 truncate">${rec.desc}</p>
                </div>
            </div>
        `).join('');

        recommendHTML = `
            <div class="px-4 mb-4">
                <h5 class="text-sm font-bold text-gray-700 mb-3 pl-1 flex items-center gap-2">
                    <i class="fas fa-map-marked-alt text-purple-500"></i> 주변 핫플 (동선 기준)
                </h5>
                <div class="grid grid-cols-1 gap-2.5">
                    ${items}
                </div>
            </div>
        `;
    }

    // 7. 예약 & 링크
    let linksHTML = '';
    if (item.links && item.links.length > 0) {
        const buttons = item.links.map(link => `
            <a href="${link.url}" target="_blank" 
               class="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-xl text-sm font-bold hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg">
                <i class="fas fa-external-link-alt"></i> ${link.name}
            </a>
        `).join('');

        linksHTML = `
            <div class="px-4 mb-4">
                <h5 class="text-sm font-bold text-gray-700 mb-3 pl-1 flex items-center gap-2">
                    <i class="fas fa-link text-blue-500"></i> 예약 & 정보 링크
                </h5>
                <div class="grid grid-cols-1 gap-2">
                    ${buttons}
                </div>
            </div>
        `;
    }

    // 8. 리뷰
    let reviewsHTML = '';
    if (item.reviews && item.reviews.length > 0) {
        const reviewItems = item.reviews.map(review => `
            <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div class="flex justify-between items-center mb-1.5">
                    <span class="text-xs font-bold text-gray-700">${review.user}</span>
                    <span class="text-xs text-yellow-600 font-bold">⭐ ${review.score}</span>
                </div>
                <p class="text-sm text-gray-600 leading-snug">${review.text}</p>
            </div>
        `).join('');

        reviewsHTML = `
            <div class="px-4 mb-4">
                <h5 class="text-sm font-bold text-gray-700 mb-3 pl-1 flex items-center gap-2">
                    <i class="fas fa-comments text-green-500"></i> 생생한 후기
                </h5>
                <div class="space-y-2">
                    ${reviewItems}
                </div>
            </div>
        `;
    }

    // 9. 길찾기
    const directionsHTML = `
        <div class="px-4 mb-4">
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg p-4 text-white">
                <div class="flex justify-between items-center mb-3">
                    <h5 class="font-bold text-sm flex items-center gap-2">
                        <i class="fas fa-route"></i> 내 위치에서 가는 법
                    </h5>
                    <span class="text-[10px] bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">실시간</span>
                </div>
                <button onclick="calculateRoute(${item.lat}, ${item.lng}, 'route-result-${idx}')" 
                        class="w-full bg-white text-indigo-600 font-bold py-3 px-4 rounded-lg text-sm hover:bg-indigo-50 transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 transform hover:scale-105">
                    <i class="fas fa-search-location"></i> 최적 경로 검색 (버스/지하철)
                </button>
                <div id="route-result-${idx}" class="mt-3 hidden"></div>
            </div>
        </div>
    `;

    // 10. 구글맵 링크
    const googleMapHTML = `
        <div class="px-4 pb-6">
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name)}&query=${item.lat},${item.lng}" target="_blank" 
               class="flex items-center justify-center w-full bg-gray-800 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-gray-900 transition-all shadow-md hover:shadow-lg gap-2">
                <i class="fas fa-map-marker-alt"></i> 구글맵 앱으로 크게 보기
            </a>
        </div>
    `;

    return `
        ${photosHTML}
        ${infoBarHTML}
        ${tipsHTML}
        ${menusHTML}
        ${infoTableHTML}
        ${recommendHTML}
        ${reviewsHTML}
        ${linksHTML}
        ${directionsHTML}
        ${googleMapHTML}
    `;
}

// ==================== 인터랙션 ====================
function toggleDetail(idx, lat, lng) {
    const detailPanel = document.getElementById(`detail-${idx}`);
    const chevron = document.getElementById(`chevron-${idx}`);

    if (detailPanel.classList.contains('hidden')) {
        // 열기
        detailPanel.classList.remove('hidden');
        chevron.classList.add('rotate-180');

        // 지도 자동 포커싱
        if (map && lat && lng) {
            const pos = { lat: lat, lng: lng };
            map.panTo(pos);
            map.setZoom(16);
        }
    } else {
        // 닫기
        detailPanel.classList.add('hidden');
        chevron.classList.remove('rotate-180');
    }
}

function calculateRoute(destLat, destLng, resultDivId) {
    const resultDiv = document.getElementById(resultDivId);
    if (!resultDiv) return;

    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <div class="bg-white/10 backdrop-blur-sm rounded-lg p-3 flex items-center justify-center gap-2 text-white">
            <div class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
            <span class="text-sm">경로 탐색 중...</span>
        </div>
    `;

    if (!navigator.geolocation) {
        resultDiv.innerHTML = '<p class="text-red-200 text-center text-sm">❌ GPS를 사용할 수 없습니다</p>';
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const start = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            const end = new google.maps.LatLng(destLat, destLng);

            const request = {
                origin: start,
                destination: end,
                travelMode: google.maps.TravelMode.TRANSIT,
                provideRouteAlternatives: true
            };

            directionsService.route(request, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                    renderRouteResult(result, resultDiv);
                } else {
                    resultDiv.innerHTML = '<p class="text-red-200 text-center text-sm">❌ 경로를 찾을 수 없습니다</p>';
                }
            });
        },
        (error) => {
            resultDiv.innerHTML = '<p class="text-red-200 text-center text-sm">❌ 현재 위치를 가져올 수 없습니다</p>';
        }
    );
}

function renderRouteResult(response, container) {
    const route = response.routes[0];
    const leg = route.legs[0];

    let html = `
        <div class="bg-white rounded-xl p-4 mt-2 text-gray-800 shadow-xl">
            <div class="flex justify-between items-center mb-3 border-b-2 border-blue-100 pb-3">
                <div class="flex items-center gap-2">
                    <i class="fas fa-clock text-blue-500"></i>
                    <span class="font-bold text-xl text-blue-600">${leg.duration.text}</span>
                </div>
                <div class="flex items-center gap-2">
                    <i class="fas fa-map-marker-alt text-gray-400"></i>
                    <span class="text-sm text-gray-500">${leg.distance.text}</span>
                </div>
            </div>
            <div class="space-y-3 text-sm">
    `;

    leg.steps.forEach((step, idx) => {
        if (step.travel_mode === 'TRANSIT') {
            const t = step.transit;
            const lineName = t.line.short_name || t.line.name;
            const vehicleType = t.line.vehicle.type;
            const isBus = vehicleType === 'BUS';
            const color = isBus ? 'bg-blue-100 text-blue-700 border-blue-300' : 'bg-green-100 text-green-700 border-green-300';
            const icon = isBus ? 'fa-bus' : 'fa-subway';

            html += `
                <div class="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border-l-4 ${color}">
                    <i class="fas ${icon} text-xl mt-1"></i>
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="${color} border px-2 py-0.5 rounded-full font-bold text-xs">${lineName}</span>
                            <span class="text-gray-500 text-xs">${step.duration.text}</span>
                        </div>
                        <p class="text-gray-700 font-medium">🚏 ${t.departure_stop.name}</p>
                        <div class="text-xs text-gray-400 pl-4 my-1 border-l-2 border-gray-300">
                            ${t.num_stops}개 정류장 이동
                        </div>
                        <p class="text-gray-700 font-medium">🏁 ${t.arrival_stop.name}</p>
                    </div>
                </div>
            `;
        } else if (step.travel_mode === 'WALKING') {
            html += `
                <div class="flex items-center gap-3 text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <i class="fas fa-walking text-lg"></i>
                    <span class="text-sm">도보 ${step.duration.text} (${step.distance.text})</span>
                </div>
            `;
        }
    });

    html += `</div></div>`;
    container.innerHTML = html;
}

// ==================== 일정 요약 및 편집 ====================
function showItinerarySummary() {
    let summary = "📅 후쿠오카 여행 일정 요약\n\n";
    Object.keys(schedule).forEach(day => {
        summary += `[${day}일차] ${schedule[day].title}\n`;
        schedule[day].items.forEach((key, idx) => {
            const item = placesDB[key];
            if (item) {
                summary += `  ${idx + 1}. ${item.name}\n`;
            }
        });
        summary += "\n";
    });
    alert(summary);
}

function editItinerary() {
    const day = prompt("편집할 일차를 입력하세요 (1-3):", activeDay);
    if (day && schedule[day]) {
        alert(`${day}일차 일정을 편집합니다. (기능 구현 중)`);
        // 추후 드래그 앤 드롭 또는 선택 UI 구현 예정
    } else {
        alert("올바른 일차를 입력해주세요.");
    }
}

// ==================== 데이터 오버라이드 헬퍼 ====================
function getPlace(key) {
    const override = localStorage.getItem(`fukuoka_place_${key}`);
    if (override) {
        return { ...placesDB[key], ...JSON.parse(override) };
    }
    return placesDB[key];
}

// ==================== 숙소 정보 관리 ====================
let hotelAutocomplete;

function initHotelSearch() {
    const input = document.getElementById('hotel-search-input');
    if (!input || typeof google === 'undefined' || !google.maps || !google.maps.places) return;

    hotelAutocomplete = new google.maps.places.Autocomplete(input, {
        types: ['lodging'],
        fields: ['name', 'geometry', 'formatted_address', 'place_id']
    });

    hotelAutocomplete.addListener('place_changed', () => {
        const place = hotelAutocomplete.getPlace();
        if (!place.geometry) {
            alert("장소 정보를 가져올 수 없습니다.");
            return;
        }
        updateAccommodation(place);
    });
}

function toggleHotelSearch() {
    const input = document.getElementById('hotel-search-input');
    const btn = document.getElementById('hotel-edit-btn');

    if (input.classList.contains('hidden')) {
        input.classList.remove('hidden');
        input.focus();
        btn.innerHTML = '<i class="fas fa-times mr-1"></i> 취소';
        initHotelSearch();
    } else {
        input.classList.add('hidden');
        btn.innerHTML = '<i class="fas fa-search mr-1"></i> 숙소 변경';
    }
}

function updateAccommodation(place) {
    const newHotelData = {
        name: place.name,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        desc: place.formatted_address,
    };

    localStorage.setItem('fukuoka_place_hotel_checkin', JSON.stringify(newHotelData));

    // Update UI
    loadAccommodation();
    toggleHotelSearch();

    // Refresh map and schedule if active day involves hotel
    if (activeDay == 1) {
        renderSchedule(activeDay);
        updateMarkers(activeDay);
    }

    alert(`숙소가 '${place.name}'(으)로 변경되었습니다.`);
}

function loadAccommodation() {
    const item = getPlace('hotel_checkin');
    const display = document.getElementById('hotel-info-display');
    if (display && item) {
        display.innerHTML = `<span class="text-gray-800 font-bold">${item.name}</span><br><span class="text-xs text-gray-500">${item.desc}</span>`;
    }
}

// ==================== 항공권 정보 관리 ====================
let flightInfo = {
    departure: '',
    arrival: '',
    number: ''
};

function loadFlightInfo() {
    const saved = localStorage.getItem('fukuoka_flight_info');
    if (saved) {
        flightInfo = JSON.parse(saved);
        updateFlightInfoUI();
    }
}

function updateFlightInfoUI() {
    const display = document.getElementById('flight-info-display');
    const btn = document.getElementById('flight-edit-btn');

    if (!display || !btn) return;

    if (flightInfo.departure || flightInfo.arrival) {
        display.innerHTML = `
            <div class="flex justify-between"><span>🛫 가는편:</span> <span class="font-bold">${flightInfo.departure || '-'}</span></div>
            <div class="flex justify-between"><span>🛬 오는편:</span> <span class="font-bold">${flightInfo.arrival || '-'}</span></div>
            <div class="flex justify-between text-xs text-gray-500 mt-1"><span>🎫 편명:</span> <span>${flightInfo.number || '-'}</span></div>
        `;
        display.classList.remove('hidden');
        btn.innerHTML = '<i class="fas fa-edit mr-1"></i> 정보 수정';
        btn.className = "w-full py-1.5 bg-gray-50 text-gray-500 rounded-lg text-xs hover:bg-gray-100 transition-colors border border-gray-200 mt-2";
    } else {
        display.classList.add('hidden');
        btn.innerHTML = '<i class="fas fa-plus mr-1"></i> 항공권 정보 입력';
        btn.className = "w-full py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors border border-blue-200";
    }
}

function editFlightInfo() {
    const dep = prompt("🛫 가는편 항공권 정보를 입력하세요 (예: 11/25 09:00 7C1402)", flightInfo.departure);
    if (dep === null) return;

    const arr = prompt("🛬 오는편 항공권 정보를 입력하세요 (예: 11/27 18:00 7C1401)", flightInfo.arrival);
    if (arr === null) return;

    const num = prompt("🎫 항공편명 또는 예약번호를 입력하세요:", flightInfo.number);
    if (num === null) return;

    flightInfo = { departure: dep, arrival: arr, number: num };
    localStorage.setItem('fukuoka_flight_info', JSON.stringify(flightInfo));
    updateFlightInfoUI();
}

// ==================== 전역 함수 노출 ====================
window.showItinerarySummary = showItinerarySummary;
window.editItinerary = editItinerary;
window.editFlightInfo = editFlightInfo;
window.toggleHotelSearch = toggleHotelSearch;
window.initFukuokaTrip = initFukuokaTrip;
window.changeFukuokaDay = changeFukuokaDay;
window.toggleDetail = toggleDetail;
window.calculateRoute = calculateRoute;

// ==================== 자동 초기화 ====================
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initFukuokaTrip === 'function') {
        initFukuokaTrip();
    }
});

console.log('✅ 후쿠오카 여행 가이드 로드 완료!');
