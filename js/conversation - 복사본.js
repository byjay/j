/**
 * conversation.js - 심층 일본어 회화 학습 (Deep Research & Shadowing Edition)
 */

// ==========================================
// 0. 시스템 스타일 주입 (3D Flip & Layout)
// ==========================================
(function injectStyles() {
    const css = `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .rotate-y-0 { transform: rotateY(0deg); }
        
        /* 카드 애니메이션 */
        .card-inner { transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1); }
        .card-flipped .card-inner { transform: rotateY(180deg); }

        /* 스크롤바 커스텀 */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    `;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
})();

// ==========================================
// 1. 대규모 회화 데이터 (Full Expanded Data)
// ==========================================
const conversationModuleData = {
    'immigration': {
        title: '입국 심사',
        icon: 'fas fa-passport',
        color: 'blue',
        conversations: [
            {
                question: {
                    jp: 'パスポートと入国カードを見せてください。',
                    kr: '여권과 입국 카드를 보여주세요.',
                    romaji: '파스포-토토 뉴-코쿠카-도오 미세테 쿠다사이',
                    vocab: [
                        { word: 'パスポート', read: '파스포-토', mean: '여권' },
                        { word: '入国(にゅうこく)', read: '뉴-코쿠', mean: '입국' },
                        { word: '見(み)せる', read: '미세루', mean: '보여주다' }
                    ]
                },
                answers: [
                    { jp: 'はい、どうぞ。', kr: '네, 여기 있습니다.', romaji: '하이, 도-조', vocab: [{ word: 'どうぞ', read: '도-조', mean: '여기요/부디' }] },
                    { jp: '入国カードをなくしました。', kr: '입국 카드를 잃어버렸어요.', romaji: '뉴-코쿠카-도오 나쿠시마시타', vocab: [{ word: 'なくす', read: '나쿠스', mean: '잃어버리다' }] }
                ]
            },
            {
                question: {
                    jp: '訪問の目的は何ですか？',
                    kr: '방문 목적은 무엇입니까?',
                    romaji: '호-몬노 모쿠테키와 난데스카?',
                    vocab: [{ word: '訪問(ほうもん)', read: '호-몬', mean: '방문' }, { word: '目的(もくてき)', read: '모쿠테키', mean: '목적' }]
                },
                answers: [
                    { jp: '観光です。', kr: '관광입니다.', romaji: '칸코-데스', vocab: [{ word: '観光(かんこう)', read: '칸코-', mean: '관광' }] },
                    { jp: '仕事できました。', kr: '일 때문에 왔습니다.', romaji: '시고토데 키마시타', vocab: [{ word: '仕事(しごと)', read: '시고토', mean: '일/업무' }] }
                ]
            },
            {
                question: {
                    jp: '滞在期間はどのくらいですか？',
                    kr: '체류 기간은 어느 정도입니까?',
                    romaji: '타이자이 키칸와 도노쿠라이 데스카?',
                    vocab: [{ word: '滞在(たいざい)', read: '타이자이', mean: '체류' }, { word: '期間(きかん)', read: '키칸', mean: '기간' }]
                },
                answers: [
                    { jp: '3泊4日です。', kr: '3박 4일입니다.', romaji: '삼파쿠 욧카데스', vocab: [{ word: '〜泊(はく)', read: '하쿠', mean: '~박' }, { word: '〜日(か)', read: '카', mean: '~일' }] },
                    { jp: '1週間ぐらいです。', kr: '일주일 정도입니다.', romaji: '잇슈-칸 구라이데스', vocab: [{ word: '週間(しゅうかん)', read: '슈-칸', mean: '주간' }] }
                ]
            },
            {
                question: {
                    jp: 'どこに泊まりますか？',
                    kr: '어디에 머무십니까?',
                    romaji: '도코니 토마리마스카?',
                    vocab: [{ word: '泊(と)まる', read: '토마루', mean: '묵다/머물다' }]
                },
                answers: [
                    { jp: '新宿のホテルです。', kr: '신주쿠의 호텔입니다.', romaji: '신쥬쿠노 호테루데스', vocab: [] },
                    { jp: '友人の家です。', kr: '친구 집입니다.', romaji: '유-진노 이에데스', vocab: [{ word: '友人(ゆうじん)', read: '유-진', mean: '친구' }, { word: '家(いえ)', read: '이에', mean: '집' }] }
                ]
            }
        ]
    },
    'restaurant': {
        title: '식당 / 식사',
        icon: 'fas fa-utensils',
        color: 'orange',
        conversations: [
            {
                question: {
                    jp: '何名様ですか？',
                    kr: '몇 분이십니까?',
                    romaji: '난메-사마 데스카?',
                    vocab: [{ word: '何名(なんめい)', read: '난메-', mean: '몇 명' }, { word: '様(さま)', read: '사마', mean: '님/분' }]
                },
                answers: [
                    { jp: '2人です。', kr: '2명입니다.', romaji: '후타리 데스', vocab: [{ word: '2人(ふたり)', read: '후타리', mean: '두 명' }] },
                    { jp: '4人ですが、席はありますか？', kr: '4명인데, 자리 있나요?', romaji: '요닌 데스가, 세키와 아리마스카?', vocab: [{ word: '席(せき)', read: '세키', mean: '자리/좌석' }] }
                ]
            },
            {
                question: {
                    jp: 'ご注文はお決まりですか？',
                    kr: '주문하시겠습니까? (정해지셨나요?)',
                    romaji: '고츄-몬와 오키마리 데스카?',
                    vocab: [{ word: '注文(ちゅうもん)', read: '츄-몬', mean: '주문' }, { word: '決(き)まる', read: '키마루', mean: '정해지다' }]
                },
                answers: [
                    { jp: 'これとこれをください。', kr: '이것과 이것 주세요.', romaji: '코레토 코레오 쿠다사이', vocab: [] },
                    { jp: 'おすすめは何ですか？', kr: '추천 메뉴는 무엇인가요?', romaji: '오스스메와 난데스카?', vocab: [{ word: 'おすすめ', read: '오스스메', mean: '추천' }] }
                ]
            },
            {
                question: {
                    jp: 'お箸はお使いになりますか？',
                    kr: '젓가락 사용하시나요?',
                    romaji: '오하시와 오츠카이니 나리마스카?',
                    vocab: [{ word: '箸(はし)', read: '하시', mean: '젓가락' }, { word: '使(つか)う', read: '츠카우', mean: '쓰다/사용하다' }]
                },
                answers: [
                    { jp: 'はい、一膳ください。', kr: '네, 하나 주세요.', romaji: '하이, 이치젠 쿠다사이', vocab: [{ word: '一膳(いちぜん)', read: '이치젠', mean: '한 벌(젓가락 세는 단위)' }] },
                    { jp: 'スプーンをつけてください。', kr: '숟가락을 넣어주세요.', romaji: '스푸-온 츠케테 쿠다사이', vocab: [{ word: 'スプーン', read: '스푸-온', mean: '숟가락' }] }
                ]
            },
            {
                question: {
                    jp: 'お会計をお願いします。',
                    kr: '계산 부탁합니다.',
                    romaji: '오카이케-오 오네가이시마스',
                    vocab: [{ word: '会計(かいけい)', read: '카이케-', mean: '계산/회계' }]
                },
                answers: [
                    { jp: '別々でお願いします。', kr: '따로따로 부탁해요.', romaji: '베츠베츠데 오네가이시마스', vocab: [{ word: '別々(べつべつ)', read: '베츠베츠', mean: '따로따로' }] },
                    { jp: 'カードで払えますか？', kr: '카드로 계산할 수 있나요?', romaji: '카-도데 하라에마스카?', vocab: [{ word: '払(はら)う', read: '하라우', mean: '지불하다' }] }
                ]
            }
        ]
    },
    'cafe': {
        title: '카페 / 주문',
        icon: 'fas fa-coffee',
        color: 'brown',
        conversations: [
            {
                question: {
                    jp: '店内でお召し上がりですか？',
                    kr: '매장에서 드시고 가십니까?',
                    romaji: '텐나이데 오메시아가리 데스카?',
                    vocab: [{ word: '店内(てんない)', read: '텐나이', mean: '점내/매장안' }, { word: '召(め)し上(あ)がる', read: '메시아가루', mean: '드시다(존경)' }]
                },
                answers: [
                    { jp: 'はい、店内で。', kr: '네, 매장에서요.', romaji: '하이, 텐나이데', vocab: [] },
                    { jp: '持ち帰りでお願いします。', kr: '테이크아웃으로 부탁합니다.', romaji: '모치카에리데 오네가이시마스', vocab: [{ word: '持(も)ち帰(かえ)り', read: '모치카에리', mean: '포장/테이크아웃' }] }
                ]
            },
            {
                question: {
                    jp: 'サイズはいかがなさいますか？',
                    kr: '사이즈는 어떻게 하시겠습니까?',
                    romaji: '사이즈와 이카가 나사이마스카?',
                    vocab: [{ word: 'いかが', read: '이카가', mean: '어떻게/어떠니' }]
                },
                answers: [
                    { jp: 'トールサイズで。', kr: '톨 사이즈로요.', romaji: '토-루 사이즈데', vocab: [] },
                    { jp: '一番小さいので。', kr: '제일 작은 거로요.', romaji: '이치방 치-사이노데', vocab: [{ word: '一番(いちばん)', read: '이치방', mean: '가장' }, { word: '小(ちい)さい', read: '치-사이', mean: '작다' }] }
                ]
            },
            {
                question: {
                    jp: 'ホイップクリームを追加しますか？',
                    kr: '휘핑크림을 추가하시겠습니까?',
                    romaji: '호잇푸쿠리-무오 츠이카 시마스카?',
                    vocab: [{ word: '追加(ついか)', read: '츠이카', mean: '추가' }]
                },
                answers: [
                    { jp: 'はい、多めでお願いします。', kr: '네, 많이 주세요.', romaji: '하이, 오-메데 오네가이시마스', vocab: [{ word: '多(おお)め', read: '오-메', mean: '많이/넉넉히' }] },
                    { jp: 'いいえ、抜きでいいです。', kr: '아뇨, 빼 주세요.', romaji: '이-에, 누키데 이-데스', vocab: [{ word: '抜(ぬ)き', read: '누키', mean: '뺌/제외' }] }
                ]
            },
            {
                question: {
                    jp: '氷少なめにできますか？',
                    kr: '얼음 적게 해 주실 수 있나요?',
                    romaji: '코-리 스쿠나메니 데키마스카?',
                    vocab: [{ word: '氷(こおり)', read: '코-리', mean: '얼음' }, { word: '少(すく)なめ', read: '스쿠나메', mean: '적게' }]
                },
                answers: [
                    { jp: 'はい、可能です。', kr: '네, 가능합니다.', romaji: '하이, 카노-데스', vocab: [{ word: '可能(かのう)', read: '카노-', mean: '가능' }] },
                    { jp: 'ミルクを足しますか？', kr: '우유를 더 넣어드릴까요?', romaji: '미루쿠오 타시마스카?', vocab: [{ word: '足(た)す', read: '타스', mean: '더하다' }] }
                ]
            },
            {
                question: {
                    jp: 'コンセントのある席はありますか？',
                    kr: '콘센트 있는 자리 있나요?',
                    romaji: '콘센토노 아루 세키와 아리마스카?',
                    vocab: [{ word: 'コンセント', read: '콘센토', mean: '콘센트' }]
                },
                answers: [
                    { jp: 'カウンター席にございます。', kr: '카운터석에 있습니다.', romaji: '카운타-세키니 고자이마스', vocab: [{ word: 'ございます', read: '고자이마스', mean: '있습니다(겸양)' }] },
                    { jp: '窓側にあります。', kr: '창가 쪽에 있습니다.', romaji: '마도가와니 아리마스', vocab: [{ word: '窓側(まどがわ)', read: '마도가와', mean: '창가' }] }
                ]
            }
        ]
    },
    'tourism': {
        title: '관광지',
        icon: 'fas fa-map-marked-alt',
        color: 'indigo',
        conversations: [
            {
                question: {
                    jp: '写真を撮ってもらえませんか？',
                    kr: '사진 좀 찍어주시겠어요?',
                    romaji: '샤신오 톳테 모라에마센카?',
                    vocab: [{ word: '写真(しゃしん)', read: '샤신', mean: '사진' }, { word: '撮(と)る', read: '토루', mean: '찍다' }]
                },
                answers: [
                    { jp: 'いいですよ。はい、チーズ！', kr: '좋아요. 자, 치즈!', romaji: '이-데스요. 하이, 치-즈!', vocab: [] },
                    { jp: 'シャッターはどこですか？', kr: '셔터는 어디인가요?', romaji: '샷타-와 도코데스카?', vocab: [] }
                ]
            },
            {
                question: {
                    jp: '大人2枚ください。',
                    kr: '어른 2장 주세요.',
                    romaji: '오토나 니마이 쿠다사이',
                    vocab: [{ word: '大人(おとな)', read: '오토나', mean: '어른' }, { word: '枚(まい)', read: '마이', mean: '장' }]
                },
                answers: [
                    { jp: '2000円になります。', kr: '2000엔입니다.', romaji: '니센엔니 나리마스', vocab: [] },
                    { jp: '学生割引はありますか？', kr: '학생 할인 있나요?', romaji: '가쿠세- 와리비키와 아리마스카?', vocab: [{ word: '学生(がくせい)', read: '가쿠세-', mean: '학생' }, { word: '割引(わりびき)', read: '와리비키', mean: '할인' }] }
                ]
            },
            {
                question: {
                    jp: 'ここから一番近い駅はどこですか？',
                    kr: '여기서 가장 가까운 역은 어디인가요?',
                    romaji: '코코카라 이치방 치카이 에키와 도코데스카?',
                    vocab: [{ word: '近(ちか)い', read: '치카이', mean: '가깝다' }, { word: '駅(えき)', read: '에키', mean: '역' }]
                },
                answers: [
                    { jp: 'まっすぐ行って右です。', kr: '쭉 가서 오른쪽입니다.', romaji: '맛스구 잇테 미기데스', vocab: [{ word: 'まっすぐ', read: '맛스구', mean: '똑바로/쭉' }, { word: '右(みぎ)', read: '미기', mean: '오른쪽' }] },
                    { jp: '歩くと遠いですよ。', kr: '걸어가면 멀어요.', romaji: '아루쿠토 토-이데스요', vocab: [{ word: '歩(ある)く', read: '아루쿠', mean: '걷다' }, { word: '遠(とお)い', read: '토-이', mean: '멀다' }] }
                ]
            },
            {
                question: {
                    jp: '何時まで開いていますか？',
                    kr: '몇 시까지 합니까(열려 있나요)?',
                    romaji: '난지마데 아이테 이마스카?',
                    vocab: [{ word: '開(あ)く', read: '아쿠', mean: '열리다' }]
                },
                answers: [
                    { jp: '午後6時までです。', kr: '오후 6시까지입니다.', romaji: '고고 로쿠지마데 데스', vocab: [{ word: '午後(ごご)', read: '고고', mean: '오후' }] },
                    { jp: '最終入場は5時半です。', kr: '최종 입장은 5시 반입니다.', romaji: '사이슈-뉴-죠-와 고지한 데스', vocab: [{ word: '最終(さいしゅう)', read: '사이슈-', mean: '최종' }, { word: '入場(にゅうじょう)', read: '뉴-죠-', mean: '입장' }] }
                ]
            },
            {
                question: {
                    jp: 'コインロッカーはありますか？',
                    kr: '코인 로커(물품보관함) 있나요?',
                    romaji: '코인롯카-와 아리마스카?',
                    vocab: [{ word: 'コインロッカー', read: '코인롯카-', mean: '물품보관함' }]
                },
                answers: [
                    { jp: '駅の改札前にあります。', kr: '역 개찰구 앞에 있습니다.', romaji: '에키노 카이사츠마에니 아리마스', vocab: [] },
                    { jp: '案内所で聞いてください。', kr: '안내소에서 물어보세요.', romaji: '안나이쇼데 키이테 쿠다사이', vocab: [{ word: '案内所(あんないじょ)', read: '안나이쇼', mean: '안내소' }, { word: '聞(き)く', read: '키쿠', mean: '듣다/묻다' }] }
                ]
            }
        ]
    },
    'emergency': {
        title: '긴급 / 약국',
        icon: 'fas fa-first-aid',
        color: 'red',
        conversations: [
            {
                question: {
                    jp: '頭が痛いんですが、薬はありますか？',
                    kr: '머리가 아픈데, 약 있습니까?',
                    romaji: '아타마가 이타인 데스가, 쿠스리와 아리마스카?',
                    vocab: [{ word: '頭(あたま)', read: '아타마', mean: '머리' }, { word: '痛(いた)い', read: '이타이', mean: '아프다' }, { word: '薬(くすり)', read: '쿠스리', mean: '약' }]
                },
                answers: [
                    { jp: '鎮痛剤ならこれです。', kr: '진통제라면 이겁니다.', romaji: '친츠-자이나라 코레데스', vocab: [{ word: '鎮痛剤(ちんつうざい)', read: '친츠-자이', mean: '진통제' }] },
                    { jp: '薬剤師に相談してください。', kr: '약사와 상담해 주세요.', romaji: '야쿠자이시니 소-단 시테쿠다사이', vocab: [{ word: '薬剤師(やくざいし)', read: '야쿠자이시', mean: '약사' }] }
                ]
            },
            {
                question: {
                    jp: '財布をなくしました。',
                    kr: '지갑을 잃어버렸습니다.',
                    romaji: '사이후오 나쿠시마시타',
                    vocab: [{ word: '財布(さいふ)', read: '사이후', mean: '지갑' }, { word: 'なくす', read: '나쿠스', mean: '잃어버리다' }]
                },
                answers: [
                    { jp: '交番に行きましたか？', kr: '파출소(코반)에 갔습니까?', romaji: '코-반니 이키마시타카?', vocab: [{ word: '交番(こうばん)', read: '코-반', mean: '파출소' }] },
                    { jp: '中身は何ですか？', kr: '내용물은 무엇입니까?', romaji: '나카미와 난데스카?', vocab: [{ word: '中身(なかみ)', read: '나카미', mean: '내용물' }] }
                ]
            },
            {
                question: {
                    jp: '警察を呼んでください！',
                    kr: '경찰을 불러주세요!',
                    romaji: '케이사츠오 욘데 쿠다사이!',
                    vocab: [{ word: '警察(けいさつ)', read: '케이사츠', mean: '경찰' }, { word: '呼(よ)ぶ', read: '요부', mean: '부르다' }]
                },
                answers: [
                    { jp: '今、通報しました。', kr: '지금 신고했습니다.', romaji: '이마, 츠-호- 시마시타', vocab: [{ word: '通報(つうほう)', read: '츠-호-', mean: '신고/통보' }] },
                    { jp: '落ち着いてください。', kr: '진정하세요.', romaji: '오치츠이테 쿠다사이', vocab: [{ word: '落(お)ち着(つ)く', read: '오치츠쿠', mean: '진정하다' }] }
                ]
            }
        ]
    }
};

// ==========================================
// 2. 상태 관리 및 유틸리티
// ==========================================
let currentConversationCategory = '';
let currentConversationIndex = 0;

// ==========================================
// 3. 초기화 및 렌더링
// ==========================================
function initConversation() {
    renderConversationCategories();
    const keys = Object.keys(conversationModuleData);
    if (keys.length > 0) {
        openConversationLesson(keys[0]);
    }
}

function renderConversationCategories() {
    const container = document.getElementById('conversation-content');
    if (!container) return;

    let html = `
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            ${Object.entries(conversationModuleData).map(([key, data]) => `
                <button onclick="openConversationLesson('${key}')" 
                    class="p-3 rounded-xl bg-${data.color}-50 hover:bg-${data.color}-100 border border-${data.color}-100 transition-all flex flex-col items-center gap-2 group">
                    <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-${data.color}-500 group-hover:scale-110 transition-transform">
                        <i class="${data.icon} text-lg"></i>
                    </div>
                    <span class="text-xs font-bold text-gray-700">${data.title}</span>
                </button>
            `).join('')}
        </div>
        
        <div id="conversation-viewer" class="hidden">
            <!-- 동적 콘텐츠 영역 -->
        </div>
    `;
    container.innerHTML = html;
}

function openConversationLesson(categoryKey) {
    currentConversationCategory = categoryKey;
    currentConversationIndex = 0;

    const viewer = document.getElementById('conversation-viewer');
    if (viewer) {
        viewer.classList.remove('hidden');
        displayCurrentConversation();
    }
}

function createFlipCardHTML(data, type, index, color) {
    const isQuestion = type === 'question';
    const uniqueId = isQuestion ? 'card-q' : `card-a-${index}`;

    // 단어장 HTML (뒷면)
    const vocabListHTML = data.vocab && data.vocab.length > 0
        ? `<div class="space-y-2 custom-scrollbar">
            <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                <i class="fas fa-book"></i> Vocabulary
            </div>
            ${data.vocab.map(v => `
                <div class="flex justify-between items-center border-b border-gray-100 pb-1 last:border-0 hover:bg-gray-50 p-1 rounded transition-colors">
                    <div>
                        <span class="text-sm font-bold text-${color}-600">${v.word}</span>
                        <span class="text-xs text-gray-500 ml-1">[${v.read}]</span>
                    </div>
                    <span class="text-sm text-gray-700">${v.mean}</span>
                </div>
            `).join('')}
           </div>`
        : `<div class="h-full flex flex-col items-center justify-center text-gray-400">
             <i class="fas fa-box-open text-3xl mb-2 opacity-50"></i>
             <span class="text-sm">단어 정보가 없습니다.</span>
           </div>`;

    // 카드 앞면 HTML (문장 + 오디오 컨트롤러)
    const frontHTML = `
        <div class="absolute w-full h-full backface-hidden bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
                ${isQuestion ?
            `<div class="inline-block text-[10px] font-bold text-${color}-600 tracking-wide uppercase bg-${color}-50 px-2 py-0.5 rounded mb-2">Question</div>` :
            `<div class="inline-block px-2 py-0.5 rounded bg-gray-100 text-[10px] font-bold text-gray-500 mb-2">Answer ${index + 1}</div>`
        }
                
                <div class="text-lg md:text-xl font-bold text-gray-800 mb-1 leading-snug break-keep select-none">
                    ${data.jp}
                </div>
                <div class="text-xs text-gray-400 mb-1 font-medium break-keep select-none">
                    ${data.romaji}
                </div>
                <div class="text-sm md:text-base text-${color}-600 font-medium break-keep select-none">
                    ${data.kr}
                </div>
            </div>

            <!-- 오디오 컨트롤 버튼 그룹 (이벤트 버블링 방지 적용) -->
            <div class="mt-2 pt-3 border-t border-gray-50 flex flex-wrap gap-2 justify-between items-center" onclick="event.stopPropagation();">
                <div class="flex gap-2">
                    <!-- 1. 기본 듣기 -->
                    <button onclick="AudioController.playNormal(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="px-2 py-1.5 rounded-lg bg-gray-50 hover:bg-${color}-50 text-gray-500 hover:text-${color}-600 text-xs font-bold transition-colors flex items-center gap-1 border border-gray-200 hover:border-${color}-200">
                        <i class="fas fa-volume-up"></i>
                        <span>듣기</span>
                    </button>
                    
                    <!-- 2. 천천히 3번 -->
                    <button onclick="AudioController.playSlowRepeat(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="px-2 py-1.5 rounded-lg bg-gray-50 hover:bg-${color}-50 text-gray-500 hover:text-${color}-600 text-xs font-bold transition-colors flex items-center gap-1 border border-gray-200 hover:border-${color}-200">
                        <i class="fas fa-history"></i>
                        <span>3회</span>
                    </button>

                    <!-- 3. 쉐도잉 -->
                    <button onclick="AudioController.playShadowing(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="px-2 py-1.5 rounded-lg bg-gray-50 hover:bg-${color}-50 text-gray-500 hover:text-${color}-600 text-xs font-bold transition-colors flex items-center gap-1 border border-gray-200 hover:border-${color}-200">
                        <i class="fas fa-microphone-alt"></i>
                        <span>쉐도잉</span>
                    </button>
                </div>
                
                <div class="text-gray-300 animate-pulse">
                    <i class="fas fa-sync-alt text-xs"></i>
                </div>
            </div>
        </div>
    `;

    const backHTML = `
        <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-50 p-5 rounded-xl border border-gray-200 shadow-inner flex flex-col overflow-y-auto custom-scrollbar">
             ${vocabListHTML}
             <div class="mt-auto pt-2 text-center" onclick="event.stopPropagation();">
                <span class="text-[10px] text-gray-400 cursor-pointer hover:text-gray-600"><i class="fas fa-undo mr-1"></i>Tap to flip back</span>
             </div>
        </div>
    `;

    return `
        <div class="perspective-1000 w-full min-h-[18rem] md:min-h-[20rem] cursor-pointer group mb-6 select-none" onclick="toggleCardFlip('${uniqueId}')">
            <div id="${uniqueId}" class="card-inner relative w-full h-full transform-style-3d shadow-lg rounded-2xl hover:shadow-xl transition-all duration-500">
                ${frontHTML}
                ${backHTML}
            </div>
        </div>
    `;
}

function displayCurrentConversation() {
    const convData = conversationModuleData[currentConversationCategory];
    if (!convData) return;

    const currentConv = convData.conversations[currentConversationIndex];
    const viewer = document.getElementById('conversation-viewer');

    viewer.innerHTML = `
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-bold text-gray-800 flex items-center gap-2">
                <i class="${convData.icon} text-${convData.color}-500"></i>
                ${convData.title} <span class="text-sm text-gray-400 font-normal">(${currentConversationIndex + 1}/${convData.conversations.length})</span>
            </h3>
            <div class="flex gap-2">
                <button id="conv-prev-btn" onclick="previousConversation()" aria-label="Previous Conversation" class="w-12 h-12 rounded-full bg-white shadow text-gray-400"><i class="fas fa-chevron-left"></i></button>
                <button id="conv-next-btn" onclick="nextConversation()" aria-label="Next Conversation" class="w-12 h-12 rounded-full bg-blue-500 shadow text-white"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>

        <div class="space-y-6">
            <!-- 질문 카드 -->
            ${createFlipCardHTML(currentConv.question, 'question', 0, convData.color)}

            <!-- 답변 카드 리스트 -->
            <div class="relative pl-4 border-l-2 border-gray-100 space-y-6">
                ${currentConv.answers.map((ans, idx) => createFlipCardHTML(ans, 'answer', idx, convData.color)).join('')}
            </div>
        </div>
    `;

    updateConversationNavigation();
}

function toggleCardFlip(id) {
    const card = document.getElementById(id);
    if (card) {
        card.parentElement.classList.toggle('card-flipped');
    }
}

// ==========================================
// 4. 오디오 컨트롤러 (AudioController)
// ==========================================
const AudioController = {
    speechSynth: window.speechSynthesis,

    speak: function (text, rate = 1.0) {
        return new Promise((resolve) => {
            if (this.speechSynth.speaking) {
                this.speechSynth.cancel();
            }

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = rate;

            utterance.onend = () => {
                resolve();
            };

            utterance.onerror = (e) => {
                console.error('Audio Error', e);
                resolve();
            };

            this.speechSynth.speak(utterance);
        });
    },

    wait: function (ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    playNormal: async function (text) {
        this.speechSynth.cancel();
        await this.speak(text, 1.0);
    },

    playSlowRepeat: async function (text) {
        this.speechSynth.cancel();
        for (let i = 0; i < 3; i++) {
            await this.speak(text, 0.7);
            await this.wait(500);
        }
    },

    playShadowing: async function (text) {
        this.speechSynth.cancel();
        await this.speak(text, 0.7);
        await this.wait(3000);
        await this.speak(text, 1.0);
    }
};

window.playAudio = function (text) {
    AudioController.playNormal(text);
};

// ==========================================
// 5. 네비게이션 제어
// ==========================================
function updateConversationNavigation() {
    const conv = conversationModuleData[currentConversationCategory];
    const prevBtn = document.getElementById('conv-prev-btn');
    const nextBtn = document.getElementById('conv-next-btn');

    if (prevBtn) {
        const isDisabled = currentConversationIndex === 0;
        prevBtn.disabled = isDisabled;
        prevBtn.className = isDisabled
            ? 'w-12 h-12 rounded-full bg-gray-100 text-gray-300 flex items-center justify-center cursor-not-allowed transition-all'
            : 'w-12 h-12 rounded-full bg-white shadow-md text-gray-600 hover:text-blue-600 flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all';
    }

    if (nextBtn && conv) {
        const isLast = currentConversationIndex === conv.conversations.length - 1;
        nextBtn.disabled = isLast;
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.className = isLast
            ? 'w-12 h-12 rounded-full bg-gray-100 text-gray-300 flex items-center justify-center cursor-not-allowed opacity-50'
            : `w-12 h-12 rounded-full bg-${conv.color}-500 shadow-md text-white flex items-center justify-center hover:bg-${conv.color}-600 active:scale-95 transition-all`;
    }
}

function previousConversation() {
    if (currentConversationIndex > 0) {
        currentConversationIndex--;
        displayCurrentConversation();
        updateConversationNavigation();
    }
}

function nextConversation() {
    const conv = conversationModuleData[currentConversationCategory];
    if (currentConversationIndex < conv.conversations.length - 1) {
        currentConversationIndex++;
        displayCurrentConversation();
        updateConversationNavigation();
    }
}

// Auto-initialize if loaded dynamically
if (document.getElementById('conversation-content')) {
    initConversation();
}
