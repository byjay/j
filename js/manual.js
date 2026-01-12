/**
 * manual.js - 아빠가 만든 가족 일본어 앱 매뉴얼
 * 
 * 💝 이 앱은 우리 가족의 첫 일본 여행을 앞두고,
 * 아빠가 시으니, 하롱이, 그리고 사랑하는 아내를 위해 만들었습니다.
 * 
 * 일본어를 재미있게 배우고, 여행을 더 즐겁게 준비하자는 마음으로
 * 밤새 코딩하며 완성했어요. 우리 가족 모두 화이팅! 🎌
 */

const ManualContent = {
    intro: {
        title: "💝 아빠의 마음",
        icon: "fa-heart",
        steps: [
            {
                title: "왜 이 앱을 만들었을까요?",
                desc: `우리 가족의 첫 일본 여행! 설레는 만큼 걱정도 됐어요. 
                <br><br>
                "시으니가 일본어를 조금이라도 알면 더 재미있지 않을까?"<br>
                "하롱이도 히라가나 정도는 읽을 수 있으면 좋겠다!"<br>
                "엄마도 간단한 회화는 할 수 있으면 좋겠는데..."<br><br>
                그래서 아빠가 밤새 코딩해서 만들었습니다. 🌙<br>
                <b>우리 가족만을 위한 특별한 일본어 앱!</b>`,
                visual: `
                    <div class="text-center p-4">
                        <div class="flex justify-center gap-4 mb-4">
                            <img src="images/dad.png" class="w-16 h-16 rounded-full border-4 border-red-200 shadow-lg">
                            <img src="images/mom_orig.png" class="w-16 h-16 rounded-full border-4 border-pink-200 shadow-lg">
                            <img src="images/sieun.png" class="w-16 h-16 rounded-full border-4 border-purple-200 shadow-lg">
                            <img src="images/harong.png" class="w-16 h-16 rounded-full border-4 border-blue-200 shadow-lg">
                        </div>
                        <p class="text-lg font-black text-red-500">❤️ 봉 패밀리 화이팅! ❤️</p>
                    </div>
                `
            },
            {
                title: "앱 이름의 의미",
                desc: `<b>JAP-BONG</b> = <span class="text-red-500">JAP</span>anese + <span class="text-blue-500">BONG</span>아빠 ID<br><br>
                일본어(Japanese) 학습 앱 + 아빠의 GitHub ID(byjay/봉)가 합쳐진 이름이에요!<br>
                아빠가 우리 가족을 위해 직접 만든 특별한 앱이랍니다. 🍌`,
                visual: `
                    <div class="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-xl">
                        <div class="flex items-center justify-center gap-3">
                            <img src="images/app_icon.png" class="w-16 h-16 rounded-xl shadow-lg">
                            <div class="text-left">
                                <h3 class="text-2xl font-black tracking-tight">JAP-BONG</h3>
                                <p class="text-xs text-red-200">아빠가 만든 가족 일본어 앱</p>
                            </div>
                        </div>
                    </div>
                `
            }
        ]
    },
    basics: {
        title: "🚀 시작하기",
        icon: "fa-rocket",
        steps: [
            {
                title: "가족 선택 & 로그인",
                desc: `앱을 열면 우리 가족 얼굴이 나와요!<br><br>
                <b>1️⃣</b> 자기 얼굴을 탭하세요<br>
                <b>2️⃣</b> 비밀번호 4자리를 입력하세요<br>
                <b>3️⃣</b> 학습 시작!<br><br>
                <span class="text-gray-500 text-xs">💡 비밀번호를 잊었다면 아빠에게 물어보세요~</span>`,
                visual: `
                    <div class="flex justify-center gap-4 scale-90">
                        <div class="user-card bg-white p-4 rounded-2xl shadow-lg border-2 border-transparent hover:border-pink-400 transition flex flex-col items-center cursor-pointer transform hover:scale-105">
                            <div class="w-16 h-16 mb-2 rounded-full overflow-hidden border-4 border-pink-100 shadow-md">
                                <img src="images/mom_orig.png" class="w-full h-full object-cover">
                            </div>
                            <h3 class="text-lg font-bold text-pink-600">엄마</h3>
                        </div>
                        <div class="relative">
                            <i class="fas fa-hand-pointer text-4xl text-yellow-400 absolute top-8 left-8 animate-bounce drop-shadow-lg z-10"></i>
                            <div class="user-card bg-white p-4 rounded-2xl shadow-lg border-2 border-purple-400 flex flex-col items-center ring-4 ring-purple-100">
                                <div class="w-16 h-16 mb-2 rounded-full overflow-hidden border-4 border-purple-100 shadow-md">
                                    <img src="images/sieun.png" class="w-full h-full object-cover">
                                </div>
                                <h3 class="text-lg font-bold text-purple-600">시으니</h3>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                title: "홈 화면 탐험",
                desc: `로그인하면 <b>6가지 메인 메뉴</b>가 보여요:<br><br>
                📝 <b>글자 연습</b> - 히라가나/가타카나 쓰기<br>
                📖 <b>단어 학습</b> - 주제별 필수 단어<br>
                💬 <b>실전 회화</b> - 여행에서 쓰는 표현<br>
                ✈️ <b>일본 여행</b> - 도시별 맛집/관광 가이드<br>
                🏫 <b>초등학교 입학</b> - 1~6학년 문법<br>
                🎮 <b>게임 아케이드</b> - 재미있게 복습<br>`,
                visual: `
                    <div class="grid grid-cols-3 gap-3 w-full max-w-xs mx-auto">
                        <div class="bg-white p-3 rounded-xl shadow-md border border-purple-100 flex flex-col items-center hover:scale-105 transition">
                            <i class="fas fa-pen-nib text-purple-500 text-xl mb-1"></i>
                            <span class="text-[10px] font-bold">글자</span>
                        </div>
                        <div class="bg-white p-3 rounded-xl shadow-md border border-green-100 flex flex-col items-center hover:scale-105 transition">
                            <i class="fas fa-book text-green-500 text-xl mb-1"></i>
                            <span class="text-[10px] font-bold">단어</span>
                        </div>
                        <div class="bg-white p-3 rounded-xl shadow-md border border-blue-100 flex flex-col items-center hover:scale-105 transition">
                            <i class="fas fa-comments text-blue-500 text-xl mb-1"></i>
                            <span class="text-[10px] font-bold">회화</span>
                        </div>
                        <div class="bg-white p-3 rounded-xl shadow-md border border-red-100 flex flex-col items-center hover:scale-105 transition">
                            <i class="fas fa-plane text-red-500 text-xl mb-1"></i>
                            <span class="text-[10px] font-bold">여행</span>
                        </div>
                        <div class="bg-white p-3 rounded-xl shadow-md border border-yellow-100 flex flex-col items-center hover:scale-105 transition">
                            <i class="fas fa-school text-yellow-500 text-xl mb-1"></i>
                            <span class="text-[10px] font-bold">문법</span>
                        </div>
                        <div class="bg-white p-3 rounded-xl shadow-md border border-indigo-100 flex flex-col items-center hover:scale-105 transition">
                            <i class="fas fa-gamepad text-indigo-500 text-xl mb-1"></i>
                            <span class="text-[10px] font-bold">게임</span>
                        </div>
                    </div>
                `
            }
        ]
    },
    writing: {
        title: "📝 글자 연습",
        icon: "fa-pen-fancy",
        steps: [
            {
                title: "히라가나 & 가타카나",
                desc: `일본어의 기초! 두 가지 문자 체계를 배워요:<br><br>
                <b>ひらがな (히라가나)</b><br>
                → 부드럽고 둥근 글자, 일상 단어에 사용<br>
                → あ, い, う, え, お...<br><br>
                <b>カタカナ (가타카나)</b><br>
                → 각진 글자, 외래어/외국 이름에 사용<br>
                → ア, イ, ウ, エ, オ...<br><br>
                <span class="text-xs text-gray-500">💡 여행에선 가타카나로 된 메뉴판/간판이 많아요!</span>`,
                visual: `
                    <div class="flex gap-6 justify-center">
                        <div class="text-center">
                            <div class="w-20 h-20 bg-pink-50 rounded-xl border-2 border-pink-200 flex items-center justify-center mb-2 shadow-inner">
                                <span class="text-4xl font-bold text-pink-600">あ</span>
                            </div>
                            <span class="text-xs font-bold text-pink-500">히라가나</span>
                        </div>
                        <div class="text-center">
                            <div class="w-20 h-20 bg-blue-50 rounded-xl border-2 border-blue-200 flex items-center justify-center mb-2 shadow-inner">
                                <span class="text-4xl font-bold text-blue-600">ア</span>
                            </div>
                            <span class="text-xs font-bold text-blue-500">가타카나</span>
                        </div>
                    </div>
                `
            },
            {
                title: "획순 애니메이션",
                desc: `글자를 터치하면 <b>획순 애니메이션</b>이 재생돼요!<br><br>
                <b>1️⃣</b> 글자를 선택<br>
                <b>2️⃣</b> 애니메이션을 보며 순서 익히기<br>
                <b>3️⃣</b> 손가락으로 따라 그리기<br>
                <b>4️⃣</b> 발음 듣기 버튼으로 소리 확인!<br><br>
                <span class="text-xs text-gray-500">🎵 스피커 버튼을 누르면 원어민 발음을 들을 수 있어요</span>`,
                visual: `
                    <div class="relative w-32 h-32 bg-white rounded-xl border-2 border-gray-200 mx-auto flex items-center justify-center overflow-hidden shadow-lg">
                        <span class="text-6xl font-black text-gray-200">あ</span>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                        </div>
                        <div class="absolute bottom-2 right-2 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                            <i class="fas fa-volume-up text-sm"></i>
                        </div>
                    </div>
                `
            },
            {
                title: "글자 퀴즈 도전!",
                desc: `배운 글자를 퀴즈로 확인해요!<br><br>
                🎯 <b>랜덤 10문제</b>가 출제됩니다<br>
                ⏱️ 시간 제한 없이 천천히 풀어도 OK<br>
                📊 점수와 오답이 기록됩니다<br><br>
                <span class="bg-yellow-100 px-2 py-1 rounded font-bold text-yellow-700">
                🔐 90점 이상 2번 달성 시 → 여행 가이드 잠금 해제!
                </span>`,
                visual: `
                    <div class="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-center text-white shadow-xl">
                        <div class="text-4xl font-black mb-2">90점!</div>
                        <div class="text-xs opacity-80 mb-3">여행 가이드 잠금 해제 조건</div>
                        <div class="flex justify-center gap-2">
                            <i class="fas fa-star text-yellow-300"></i>
                            <i class="fas fa-star text-yellow-300"></i>
                            <i class="fas fa-unlock text-yellow-300 animate-bounce"></i>
                        </div>
                    </div>
                `
            }
        ]
    },
    vocabulary: {
        title: "📖 단어 학습",
        icon: "fa-book",
        steps: [
            {
                title: "주제별 단어장",
                desc: `여행에 필요한 단어를 주제별로 정리했어요:<br><br>
                🔢 <b>숫자</b> - いち, に, さん... (가격, 시간 읽기)<br>
                🍜 <b>음식</b> - らーめん, すし, てんぷら...<br>
                👨‍👩‍👧‍👦 <b>가족</b> - おとうさん, おかあさん...<br>
                🚃 <b>교통</b> - でんしゃ, バス, ひこうき...<br>
                🏨 <b>숙소</b> - ホテル, へや, おふろ...<br><br>
                <span class="text-xs text-gray-500">💡 카드를 터치하면 한글 뜻이 나와요!</span>`,
                visual: `
                    <div class="grid grid-cols-3 gap-2 w-full max-w-xs mx-auto">
                        <div class="bg-green-50 h-14 rounded-lg border border-green-200 flex items-center justify-center text-2xl hover:scale-105 transition cursor-pointer">🔢</div>
                        <div class="bg-green-50 h-14 rounded-lg border border-green-200 flex items-center justify-center text-2xl hover:scale-105 transition cursor-pointer">🍜</div>
                        <div class="bg-green-50 h-14 rounded-lg border border-green-200 flex items-center justify-center text-2xl hover:scale-105 transition cursor-pointer">👨‍👩‍👧‍👦</div>
                        <div class="bg-green-50 h-14 rounded-lg border border-green-200 flex items-center justify-center text-2xl hover:scale-105 transition cursor-pointer">🚃</div>
                        <div class="bg-green-50 h-14 rounded-lg border border-green-200 flex items-center justify-center text-2xl hover:scale-105 transition cursor-pointer">🏨</div>
                        <div class="bg-green-50 h-14 rounded-lg border border-green-200 flex items-center justify-center text-2xl hover:scale-105 transition cursor-pointer">🎌</div>
                    </div>
                `
            },
            {
                title: "자동 재생 모드",
                desc: `▶️ 버튼을 누르면 <b>자동 재생</b>이 시작돼요!<br><br>
                🎧 단어와 뜻을 자동으로 읽어줍니다<br>
                🚗 이동 중/잠들기 전에 듣기 좋아요<br>
                ⏸️ 원할 때 멈출 수 있어요<br><br>
                <span class="text-xs text-gray-500">💡 엄마가 운전할 때 뒷좌석에서 들으면 좋아요!</span>`,
                visual: `
                    <div class="bg-gradient-to-r from-green-400 to-emerald-500 p-6 rounded-xl text-white shadow-xl flex items-center justify-center gap-4">
                        <i class="fas fa-play-circle text-5xl"></i>
                        <div>
                            <p class="font-bold text-lg">자동 재생</p>
                            <p class="text-xs opacity-80">터치하면 시작!</p>
                        </div>
                    </div>
                `
            }
        ]
    },
    conversation: {
        title: "💬 실전 회화",
        icon: "fa-comments",
        steps: [
            {
                title: "상황별 회화",
                desc: `여행에서 <b>진짜 쓰는 표현</b>만 모았어요!<br><br>
                ✈️ <b>공항/입국심사</b><br>
                → "관광입니다" = 観光です (칸코오데스)<br><br>
                🍜 <b>식당 주문</b><br>
                → "이거 주세요" = これください (코레 쿠다사이)<br><br>
                🛒 <b>쇼핑/계산</b><br>
                → "얼마예요?" = いくらですか (이쿠라데스카)<br><br>
                🚃 <b>교통/길찾기</b><br>
                → "~역은 어디예요?" = ~駅はどこですか`,
                visual: `
                    <div class="flex flex-wrap gap-2 justify-center">
                        <span class="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-bold shadow-sm">✈️ 공항</span>
                        <span class="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold shadow-sm">🍜 식당</span>
                        <span class="bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-bold shadow-sm">🛒 쇼핑</span>
                        <span class="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-bold shadow-sm">🚃 교통</span>
                        <span class="bg-purple-100 text-purple-600 px-4 py-2 rounded-full text-sm font-bold shadow-sm">🏨 숙소</span>
                        <span class="bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full text-sm font-bold shadow-sm">🆘 응급</span>
                    </div>
                `
            },
            {
                title: "카드 뒤집기 학습",
                desc: `회화 카드를 <b>터치하면 뒤집어져요!</b><br><br>
                <b>앞면:</b> 한국어 문장<br>
                <b>뒷면:</b> 일본어 + 발음<br><br>
                🔊 스피커 버튼으로 원어민 발음 듣기<br>
                ⭐ 즐겨찾기로 중요한 표현 저장<br><br>
                <span class="text-xs text-gray-500">💡 실제 상황에서 바로 꺼내 보세요!</span>`,
                visual: `
                    <div class="flex gap-4 justify-center items-center">
                        <div class="w-28 h-36 bg-white border-2 border-blue-200 rounded-xl flex flex-col items-center justify-center shadow-lg p-3">
                            <span class="text-xs text-gray-400 mb-2">한국어</span>
                            <span class="text-sm font-bold text-center">이거 주세요</span>
                        </div>
                        <i class="fas fa-exchange-alt text-gray-300 text-xl"></i>
                        <div class="w-28 h-36 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex flex-col items-center justify-center shadow-lg p-3 text-white">
                            <span class="text-xs opacity-80 mb-2">일본어</span>
                            <span class="text-lg font-bold">これください</span>
                            <span class="text-xs opacity-60 mt-1">코레 쿠다사이</span>
                        </div>
                    </div>
                `
            }
        ]
    },
    travel: {
        title: "✈️ 일본 여행",
        icon: "fa-plane",
        steps: [
            {
                title: "후쿠오카 가이드",
                desc: `우리 가족의 첫 여행지! <b>후쿠오카</b> 완벽 가이드<br><br>
                🍜 <b>맛집</b> - 하카타 라멘, 모츠나베, 야타이<br>
                🏯 <b>관광</b> - 다자이후 텐만구, 캐널시티<br>
                🛒 <b>쇼핑</b> - 텐진, 돈키호테, 드럭스토어<br>
                ♨️ <b>온천</b> - 유후인 당일치기<br><br>
                <span class="text-xs text-gray-500">💡 Day 1, 2, 3 탭을 눌러 일정을 확인하세요!</span>`,
                visual: `
                    <div class="bg-gradient-to-br from-red-500 to-orange-400 p-5 rounded-2xl text-white shadow-xl text-center">
                        <span class="text-3xl mb-2 block">🏯</span>
                        <h4 class="font-black text-lg mb-1">후쿠오카 3박 4일</h4>
                        <p class="text-xs opacity-80">라멘 · 온천 · 쇼핑</p>
                    </div>
                `
            },
            {
                title: "지도 & 내비게이션",
                desc: `장소마다 <b>지도 연동</b>이 되어 있어요!<br><br>
                📍 각 장소 카드에 위치가 표시됩니다<br>
                🗺️ 터치하면 구글 맵이 열려요<br>
                🚶 도보/대중교통 경로까지 안내!<br><br>
                <span class="text-xs text-gray-500">💡 "지도 열기" 버튼으로 바로 길찾기!</span>`,
                visual: `
                    <div class="bg-blue-50 p-5 rounded-2xl border-2 border-blue-200 flex items-center justify-center gap-4">
                        <i class="fas fa-map-marked-alt text-blue-500 text-4xl"></i>
                        <div class="text-left">
                            <p class="font-bold text-gray-800">구글 맵 연동</p>
                            <p class="text-xs text-gray-500">터치하면 경로 안내</p>
                        </div>
                    </div>
                `
            },
            {
                title: "장소별 상세 정보",
                desc: `장소 카드를 터치하면 <b>상세 정보</b>가 팝업돼요:<br><br>
                ⏰ <b>운영시간</b> - 영업시간, 휴무일<br>
                🚃 <b>가는 방법</b> - 대중교통 안내<br>
                💡 <b>꿀팁</b> - 아빠가 직접 조사한 팁!<br>
                🍜 <b>추천 메뉴</b> - 뭘 시켜야 할지 고민 끝!<br><br>
                <span class="text-xs text-gray-500">💡 사진을 보며 미리 여행 기분을 느껴보세요~</span>`,
                visual: `
                    <div class="bg-white p-4 rounded-xl shadow-lg border border-gray-200 w-full max-w-xs mx-auto">
                        <div class="flex gap-3 items-center mb-3">
                            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-2xl">🍜</div>
                            <div>
                                <p class="font-bold text-gray-800">하카타 라멘</p>
                                <p class="text-xs text-gray-500">11:00 - 24:00</p>
                            </div>
                        </div>
                        <div class="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                            💡 오픈 30분 전 도착 추천!
                        </div>
                    </div>
                `
            }
        ]
    },
    games: {
        title: "🎮 게임 아케이드",
        icon: "fa-gamepad",
        steps: [
            {
                title: "4가지 미니게임",
                desc: `배운 내용을 <b>게임으로 복습</b>해요!<br><br>
                🍣 <b>Sushi Survival</b><br>
                → 회전초밥 타자 게임! 빨리 입력하세요<br><br>
                ⚡ <b>Neon Syntax</b><br>
                → 사이버펑크 스타일 문법 퀴즈<br><br>
                ⚗️ <b>Verbum Alchimia</b><br>
                → 단어 조합 연금술 게임<br><br>
                🕯️ <b>Silent Archive</b><br>
                → 공포의 도서관 탈출 (살짝 무서움 주의!)`,
                visual: `
                    <div class="grid grid-cols-2 gap-3 w-full max-w-xs mx-auto">
                        <div class="bg-amber-50 p-4 rounded-xl border border-amber-200 flex flex-col items-center hover:scale-105 transition cursor-pointer">
                            <span class="text-2xl mb-1">🍣</span>
                            <span class="text-xs font-bold text-amber-700">Sushi</span>
                        </div>
                        <div class="bg-cyan-50 p-4 rounded-xl border border-cyan-200 flex flex-col items-center hover:scale-105 transition cursor-pointer">
                            <span class="text-2xl mb-1">⚡</span>
                            <span class="text-xs font-bold text-cyan-700">Neon</span>
                        </div>
                        <div class="bg-purple-50 p-4 rounded-xl border border-purple-200 flex flex-col items-center hover:scale-105 transition cursor-pointer">
                            <span class="text-2xl mb-1">⚗️</span>
                            <span class="text-xs font-bold text-purple-700">Alchemy</span>
                        </div>
                        <div class="bg-gray-900 p-4 rounded-xl border border-gray-700 flex flex-col items-center hover:scale-105 transition cursor-pointer">
                            <span class="text-2xl mb-1">🕯️</span>
                            <span class="text-xs font-bold text-gray-300">Archive</span>
                        </div>
                    </div>
                `
            }
        ]
    },
    tips: {
        title: "💡 꿀팁 모음",
        icon: "fa-lightbulb",
        steps: [
            {
                title: "앱 설치하기 (PWA)",
                desc: `이 앱을 <b>홈 화면에 설치</b>하면 더 편해요!<br><br>
                <b>아이폰:</b><br>
                1. Safari로 접속<br>
                2. 하단 공유 버튼 📤 탭<br>
                3. "홈 화면에 추가" 선택<br><br>
                <b>안드로이드:</b><br>
                1. Chrome으로 접속<br>
                2. 설치 배너가 뜨면 "설치" 탭<br>
                3. 또는 메뉴 → "앱 설치"`,
                visual: `
                    <div class="flex gap-4 justify-center">
                        <div class="bg-white p-4 rounded-xl shadow-lg border border-gray-200 text-center">
                            <i class="fab fa-apple text-3xl text-gray-800 mb-2"></i>
                            <p class="text-xs font-bold">iOS</p>
                        </div>
                        <div class="bg-white p-4 rounded-xl shadow-lg border border-gray-200 text-center">
                            <i class="fab fa-android text-3xl text-green-600 mb-2"></i>
                            <p class="text-xs font-bold">Android</p>
                        </div>
                    </div>
                `
            },
            {
                title: "오프라인 사용",
                desc: `인터넷이 없어도 대부분의 기능이 <b>오프라인으로 작동</b>해요!<br><br>
                ✅ 글자 연습<br>
                ✅ 단어 학습<br>
                ✅ 회화 카드<br>
                ✅ 여행 가이드 (캐시됨)<br><br>
                <span class="text-xs text-gray-500">💡 비행기 안에서도 공부할 수 있어요!</span>`,
                visual: `
                    <div class="bg-gradient-to-br from-gray-700 to-gray-800 p-5 rounded-2xl text-white text-center shadow-xl">
                        <i class="fas fa-wifi-slash text-3xl mb-2"></i>
                        <p class="font-bold">오프라인 모드</p>
                        <p class="text-xs opacity-70">인터넷 없이도 OK!</p>
                    </div>
                `
            },
            {
                title: "매일 조금씩!",
                desc: `<b>하루 10분</b>만 투자해도 충분해요!<br><br>
                🌅 아침: 글자 5분<br>
                🚗 이동 중: 단어 자동재생<br>
                🌙 저녁: 게임 5분<br><br>
                꾸준히 하면 <b>Streak 🔥</b>이 쌓여요!<br>
                <span class="text-xs text-gray-500">💪 우리 가족 모두 화이팅!</span>`,
                visual: `
                    <div class="flex items-center justify-center gap-2 text-4xl">
                        <span>🔥</span>
                        <span class="font-black text-orange-500">7</span>
                        <span class="text-sm text-gray-500 font-bold">일 연속!</span>
                    </div>
                `
            }
        ]
    }
};

let currentManualTab = 'intro';

function openManual() {
    // 이미 열려있다면 리턴
    if (document.getElementById('manual-modal')) return;

    const modalHtml = `
    <div id="manual-modal" class="fixed inset-0 z-[100] bg-white flex flex-col animate-fade-in">
        <!-- Header -->
        <div class="bg-gradient-to-r from-red-600 to-red-500 text-white p-4 flex justify-between items-center shadow-lg shrink-0">
            <div class="flex items-center gap-3">
                <img src="images/app_icon.png" class="w-12 h-12 rounded-xl shadow-lg border-2 border-white/20">
                <div>
                    <h2 class="text-lg font-black">JAP-BONG 사용 설명서</h2>
                    <p class="text-xs text-red-200">아빠가 만든 가족 일본어 앱 🍌</p>
                </div>
            </div>
            <button onclick="closeManual()" class="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-red-700 transition">
                <i class="fas fa-times text-lg"></i>
            </button>
        </div>

        <!-- Body -->
        <div class="flex-1 flex overflow-hidden">
            <!-- Sidebar (Tabs) -->
            <div class="w-24 bg-gray-50 border-r border-gray-200 flex flex-col py-3 gap-1 overflow-y-auto shrink-0 transition-all duration-300">
                ${Object.keys(ManualContent).map(key => `
                    <button onclick="setManualTab('${key}')" id="manual-tab-${key}" 
                        class="flex flex-col items-center justify-center p-2 text-gray-400 hover:text-red-600 hover:bg-white transition relative">
                        <div class="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-xl mb-1 border border-gray-200 tab-icon transition-all">
                            <i class="fas ${ManualContent[key].icon}"></i>
                        </div>
                        <span class="text-[9px] font-bold text-center leading-tight">${ManualContent[key].title.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim()}</span>
                    </button>
                `).join('')}
            </div>

            <!-- Content Area -->
            <div id="manual-content-area" class="flex-1 overflow-y-auto p-5 bg-gray-100">
                <!-- Dynamic Content Loads Here -->
            </div>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    setManualTab(currentManualTab);
}

function closeManual() {
    const modal = document.getElementById('manual-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.style.transform = 'translateY(20px)';
        setTimeout(() => modal.remove(), 200);
    }
}

function setManualTab(key) {
    currentManualTab = key;
    const data = ManualContent[key];

    // Update Side Tabs
    document.querySelectorAll('[id^="manual-tab-"]').forEach(el => {
        el.classList.remove('text-red-600', 'bg-white');
        el.classList.add('text-gray-400');
        const icon = el.querySelector('.tab-icon');
        if (icon) {
            icon.classList.remove('ring-2', 'ring-red-400', 'text-red-600', 'bg-red-50');
        }
    });

    const activeTab = document.getElementById(`manual-tab-${key}`);
    if (activeTab) {
        activeTab.classList.add('text-red-600', 'bg-white');
        activeTab.classList.remove('text-gray-400');
        const icon = activeTab.querySelector('.tab-icon');
        if (icon) {
            icon.classList.add('ring-2', 'ring-red-400', 'text-red-600', 'bg-red-50');
        }
    }

    // Render Content
    const contentArea = document.getElementById('manual-content-area');
    const stepsHtml = data.steps.map((step, idx) => `
        <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-5 animate-slide-up" style="animation-delay: ${idx * 80}ms">
            <div class="flex items-center gap-3 mb-4">
                <span class="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-black text-sm shadow-inner">${idx + 1}</span>
                <h3 class="text-lg font-bold text-gray-800">${step.title}</h3>
            </div>
            
            <div class="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 mb-4 flex justify-center items-center min-h-[140px] border border-gray-200">
                ${step.visual}
            </div>
            
            <div class="text-gray-600 text-sm leading-relaxed pl-4 border-l-4 border-red-200">
                ${step.desc}
            </div>
        </div>
    `).join('');

    contentArea.innerHTML = `
        <div class="max-w-md mx-auto pb-24">
            <h1 class="text-2xl font-black text-gray-900 mb-1">${data.title}</h1>
            <p class="text-sm text-gray-500 mb-6 flex items-center gap-2">
                <i class="fas fa-heart text-red-400"></i> 아빠가 정성껏 준비했어요
            </p>
            ${stepsHtml}
            
            <div class="mt-8 text-center">
                <button onclick="closeManual()" class="bg-gradient-to-r from-red-500 to-red-600 text-white px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 active:scale-95 transition-transform">
                    알겠어요! <i class="fas fa-check ml-1"></i>
                </button>
                <p class="text-xs text-gray-400 mt-3">우리 가족 화이팅! 🎌</p>
            </div>
        </div>
    `;
}

// Global exposure
window.openManual = openManual;
window.closeManual = closeManual;
window.setManualTab = setManualTab;

console.log('[Manual] 아빠의 마음이 담긴 매뉴얼 로드 완료! 💝');
