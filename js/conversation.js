/**
 * conversation.js - Final Complete Edition (Full Vocab Data & Fixed UI)
 */

// ==========================================
// 0. 스타일 정의 (모바일 최적화 & 고정 네비게이션)
// ==========================================
(function injectStyles() {
    const oldStyle = document.getElementById('conversation-styles');
    if (oldStyle) oldStyle.remove();

    const css = `
        /* 3D Flip Animation */
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .card-inner { transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1); }
        .card-flipped .card-inner { transform: rotateY(180deg); }
        
        /* Sticky Navigation (확실한 고정) */
        .sticky-nav-container {
            position: sticky; 
            top: 0; 
            z-index: 999;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid #e5e7eb;
            padding: 12px 0;
            margin-bottom: 24px;
            width: 100%;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        /* Scrollbars */
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        
        /* Animation */
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
    `;
    const style = document.createElement('style');
    style.id = 'conversation-styles';
    style.textContent = css;
    document.head.appendChild(style);
})();

// ==========================================
// 1. 완전한 데이터 (단어 분석 100% 완료)
// ==========================================
const conversationModuleData = {
    'immigration': {
        title: '입국 심사',
        icon: 'fas fa-passport',
        color: 'blue',
        conversations: [
            { 
                question: { 
                    jp: 'パスポートを見せてください。', 
                    kr: '여권을 보여주세요.', 
                    romaji: 'Pasupo-to o misete kudasai', 
                    vocab: [
                        {word:'パスポート', read:'파스포-토', mean:'여권'}, 
                        {word:'見せる', read:'미세루', mean:'보여주다'}, 
                        {word:'ください', read:'쿠다사이', mean:'주세요'}
                    ] 
                },
                answers: [
                    { 
                        jp: 'はい、どうぞ。', 
                        kr: '네, 여기 있습니다.', 
                        romaji: 'Hai, douzo', 
                        vocab: [{word:'はい', read:'하이', mean:'네'}, {word:'どうぞ', read:'도-조', mean:'여기요'}] 
                    },
                    { 
                        jp: '入国カードもここにあります。', 
                        kr: '입국 카드도 여기 있습니다.', 
                        romaji: 'Nyuukoku ka-do mo koko ni arimasu', 
                        vocab: [
                            {word:'入国(にゅうこく)', read:'뉴-코쿠', mean:'입국'}, 
                            {word:'カード', read:'카-도', mean:'카드'},
                            {word:'ここ', read:'코코', mean:'여기'},
                            {word:'あります', read:'아리마스', mean:'있습니다'}
                        ] 
                    }
                ] 
            },
            { 
                question: { 
                    jp: '訪問の目的は何ですか？', 
                    kr: '방문 목적은 무엇입니까?', 
                    romaji: 'Houmon no mokuteki wa nan desu ka?', 
                    vocab: [
                        {word:'訪問(ほうもん)', read:'호-몬', mean:'방문'}, 
                        {word:'目的(もくてき)', read:'모쿠테키', mean:'목적'},
                        {word:'何(なん)', read:'난', mean:'무엇'}
                    ] 
                },
                answers: [
                    { 
                        jp: '観光です。', 
                        kr: '관광입니다.', 
                        romaji: 'Kankou desu', 
                        vocab: [{word:'観光(かんこう)', read:'칸코-', mean:'관광'}] 
                    },
                    { 
                        jp: '仕事できました。', 
                        kr: '일(출장) 때문에 왔습니다.', 
                        romaji: 'Shigoto de kimashita', 
                        vocab: [{word:'仕事(しごと)', read:'시고토', mean:'일'}, {word:'来(き)ました', read:'키마시타', mean:'왔습니다'}] 
                    }
                ] 
            },
            { 
                question: { 
                    jp: 'どのくらい滞在しますか？', 
                    kr: '얼마나 체류합니까?', 
                    romaji: 'Dono kurai taizai shimasu ka?', 
                    vocab: [
                        {word:'どのくらい', read:'도노쿠라이', mean:'얼마나/어느정도'}, 
                        {word:'滞在(たいざい)', read:'타이자이', mean:'체류'}
                    ] 
                },
                answers: [
                    { 
                        jp: '3泊4日です。', 
                        kr: '3박 4일입니다.', 
                        romaji: 'Sanpaku yokka desu', 
                        vocab: [
                            {word:'3泊(さんぱく)', read:'삼파쿠', mean:'3박'}, 
                            {word:'4日(よっか)', read:'욧카', mean:'4일'}
                        ] 
                    },
                    { 
                        jp: '一週間です。', 
                        kr: '일주일입니다.', 
                        romaji: 'Isshuukan desu', 
                        vocab: [{word:'一週間(いっしゅうかん)', read:'잇슈-칸', mean:'일주일'}] 
                    }
                ] 
            },
            { 
                question: { 
                    jp: 'どこに泊まりますか？', 
                    kr: '어디에 묵습니까?', 
                    romaji: 'Doko ni tomarimasu ka?', 
                    vocab: [
                        {word:'どこ', read:'도코', mean:'어디'}, 
                        {word:'泊(と)まる', read:'토마루', mean:'묵다/숙박하다'}
                    ] 
                },
                answers: [
                    { 
                        jp: '新宿のホテルです。', 
                        kr: '신주쿠의 호텔입니다.', 
                        romaji: 'Shinjuku no hoteru desu', 
                        vocab: [{word:'新宿(しんじゅく)', read:'신쥬쿠', mean:'신주쿠(지명)'}, {word:'ホテル', read:'호테루', mean:'호텔'}] 
                    },
                    { 
                        jp: '友人の家です。', 
                        kr: '친구 집입니다.', 
                        romaji: 'Yuujin no ie desu', 
                        vocab: [{word:'友人(ゆうじん)', read:'유-진', mean:'친구'}, {word:'家(いえ)', read:'이에', mean:'집'}] 
                    }
                ] 
            },
            { 
                question: { 
                    jp: '帰りのチケットはありますか？', 
                    kr: '돌아가는 티켓은 있습니까?', 
                    romaji: 'Kaeri no chiketto wa arimasu ka?', 
                    vocab: [
                        {word:'帰(かえ)り', read:'카에리', mean:'돌아감/귀국'}, 
                        {word:'チケット', read:'치켓토', mean:'티켓'}
                    ] 
                },
                answers: [
                    { 
                        jp: 'はい、これです。', 
                        kr: '네, 이겁니다.', 
                        romaji: 'Hai, kore desu', 
                        vocab: [{word:'これ', read:'코레', mean:'이것'}] 
                    },
                    { 
                        jp: 'スマホに入っています。', 
                        kr: '스마트폰에 들어있습니다.', 
                        romaji: 'Sumaho ni haitte imasu', 
                        vocab: [{word:'スマホ', read:'스마호', mean:'스마트폰'}, {word:'入(はい)る', read:'하이루', mean:'들어있다'}] 
                    }
                ] 
            },
            { 
                question: { 
                    jp: '指紋を登録してください。', 
                    kr: '지문을 등록해 주세요.', 
                    romaji: 'Shimon o touroku shite kudasai', 
                    vocab: [
                        {word:'指紋(しもん)', read:'시몬', mean:'지문'}, 
                        {word:'登録(とうろく)', read:'토-로쿠', mean:'등록'}
                    ] 
                },
                answers: [
                    { 
                        jp: '人差し指ですか？', 
                        kr: '검지손가락인가요?', 
                        romaji: 'Hitosashiyubi desu ka?', 
                        vocab: [{word:'人差(ひとさ)し指(ゆび)', read:'히토사시유비', mean:'검지'}] 
                    },
                    { 
                        jp: 'はい、わかりました。', 
                        kr: '네, 알겠습니다.', 
                        romaji: 'Hai, wakarimashita', 
                        vocab: [{word:'わかる', read:'와카루', mean:'알다/이해하다'}] 
                    }
                ] 
            }
        ]
    },
    'restaurant': {
        title: '식당 / 주문',
        icon: 'fas fa-utensils',
        color: 'orange',
        conversations: [
            { 
                question: { 
                    jp: 'いらっしゃいませ。何名様ですか？', 
                    kr: '어서오세요. 몇 분이세요?', 
                    romaji: 'Irasshaimase. Nanmei sama desu ka?', 
                    vocab: [
                        {word:'いらっしゃいませ', read:'이랏샤이마세', mean:'어서오세요'}, 
                        {word:'何名(なんめい)', read:'난메-', mean:'몇 명'},
                        {word:'様(さま)', read:'사마', mean:'~분/님'}
                    ] 
                },
                answers: [
                    { 
                        jp: '2人です。', 
                        kr: '2명입니다.', 
                        romaji: 'Futari desu', 
                        vocab: [{word:'2人(ふたり)', read:'후타리', mean:'두 명'}] 
                    },
                    { 
                        jp: '4人ですが、席はありますか？', 
                        kr: '4명인데 자리가 있나요?', 
                        romaji: 'Yonin desuga, seki wa arimasu ka?', 
                        vocab: [
                            {word:'4人(よにん)', read:'요닌', mean:'네 명'}, 
                            {word:'席(せき)', read:'세키', mean:'자리/좌석'}
                        ] 
                    }
                ] 
            },
            { 
                question: { 
                    jp: 'ご注文はお決まりですか？', 
                    kr: '주문하시겠습니까? (정해지셨나요?)', 
                    romaji: 'Gochuumon wa okimari desu ka?', 
                    vocab: [
                        {word:'注文(ちゅうもん)', read:'츄-몬', mean:'주문'}, 
                        {word:'決(き)まる', read:'키마루', mean:'정해지다'}
                    ] 
                },
                answers: [
                    { 
                        jp: 'おすすめは何ですか？', 
                        kr: '추천 메뉴는 무엇인가요?', 
                        romaji: 'Osusume wa nan desu ka?', 
                        vocab: [{word:'おすすめ', read:'오스스메', mean:'추천'}] 
                    },
                    { 
                        jp: 'これをお願いします。', 
                        kr: '이것을 부탁합니다.', 
                        romaji: 'Kore o onegaishimasu', 
                        vocab: [{word:'お願(ねが)いします', read:'오네가이시마스', mean:'부탁합니다'}] 
                    }
                ] 
            },
            { 
                question: { 
                    jp: 'お飲み物はいかがですか？', 
                    kr: '음료는 어떻게 하시겠어요?', 
                    romaji: 'Onomimono wa ikaga desu ka?', 
                    vocab: [
                        {word:'飲(の)み物(もの)', read:'노미모노', mean:'음료'}, 
                        {word:'いかが', read:'이카가', mean:'어떻게/어떠신지'}
                    ] 
                },
                answers: [
                    { 
                        jp: '生ビールを2つください。', 
                        kr: '생맥주 2개 주세요.', 
                        romaji: 'Namabi-ru o futatsu kudasai', 
                        vocab: [{word:'生(なま)ビール', read:'나마비-루', mean:'생맥주'}, {word:'2つ(ふたつ)', read:'후타츠', mean:'두 개'}] 
                    },
                    { 
                        jp: 'お水だけでいいです。', 
                        kr: '물만 있으면 돼요.', 
                        romaji: 'Omizu dake de ii desu', 
                        vocab: [{word:'水(みず)', read:'미즈', mean:'물'}, {word:'だけ', read:'다케', mean:'~만/뿐'}] 
                    }
                ] 
            },
            { 
                question: { 
                    jp: 'アレルギーはありますか？', 
                    kr: '알레르기가 있습니까?', 
                    romaji: 'Arerugi- wa arimasu ka?', 
                    vocab: [{word:'アレルギー', read:'아레루기-', mean:'알레르기'}] 
                },
                answers: [
                    { 
                        jp: 'エビのアレルギーがあります。', 
                        kr: '새우 알레르기가 있습니다.', 
                        romaji: 'Ebi no arerugi- ga arimasu', 
                        vocab: [{word:'エビ', read:'에비', mean:'새우'}] 
                    },
                    { 
                        jp: '特にありません。', 
                        kr: '딱히 없습니다.', 
                        romaji: 'Toku ni arimasen', 
                        vocab: [{word:'特(とく)に', read:'토쿠니', mean:'특별히/딱히'}] 
                    }
                ] 
            },
            { 
                question: { 
                    jp: 'お会計をお願いします。', 
                    kr: '(역질문) 계산 부탁합니다.', 
                    romaji: 'Okaikei o onegaishimasu', 
                    vocab: [{word:'会計(かいけい)', read:'카이케-', mean:'계산/회계'}] 
                },
                answers: [
                    { 
                        jp: '別々にお願いします。', 
                        kr: '따로따로 부탁합니다.', 
                        romaji: 'Betsubetsu ni onegaishimasu', 
                        vocab: [{word:'別々(べつべつ)', read:'베츠베츠', mean:'따로따로/각자'}] 
                    },
                    { 
                        jp: 'カードで払えますか？', 
                        kr: '카드로 지불할 수 있나요?', 
                        romaji: 'Ka-do de haraemasu ka?', 
                        vocab: [{word:'払(はら)う', read:'하라우', mean:'지불하다/내다'}] 
                    }
                ] 
            }
        ]
    },
    'shopping': {
        title: '쇼핑 / 면세',
        icon: 'fas fa-shopping-bag',
        color: 'pink',
        conversations: [
            { 
                question: { 
                    jp: '何かお探しですか？', 
                    kr: '무언가 찾으시는 게 있나요?', 
                    romaji: 'Nanika osagashi desu ka?', 
                    vocab: [
                        {word:'何(なに)か', read:'나니카', mean:'무언가'}, 
                        {word:'探(さが)す', read:'사가스', mean:'찾다'}
                    ] 
                },
                answers: [
                    { 
                        jp: 'ただ見ているだけです。', 
                        kr: '그냥 좀 둘러보는 거예요.', 
                        romaji: 'Tada miteiru dake desu', 
                        vocab: [{word:'ただ', read:'타다', mean:'그냥/단지'}, {word:'見(み)る', read:'미루', mean:'보다'}] 
                    },
                    { 
                        jp: '試着してもいいですか？', 
                        kr: '입어봐도(시착해도) 되나요?', 
                        romaji: 'Shichaku shitemo ii desu ka?', 
                        vocab: [{word:'試着(しちゃく)', read:'시챠쿠', mean:'시착/입어봄'}, {word:'いい', read:'이-', mean:'좋다/괜찮다'}] 
                    }
                ] 
            },
            { 
                question: { 
                    jp: '免税になりますか？', 
                    kr: '(역질문) 면세 되나요?', 
                    romaji: 'Menzei ni narimasu ka?', 
                    vocab: [{word:'免税(めんぜい)', read:'멘제-', mean:'면세'}] 
                },
                answers: [
                    { 
                        jp: 'パスポートをお持ちですか？', 
                        kr: '여권을 가지고 계신가요?', 
                        romaji: 'Pasupo-to o omochi desu ka?', 
                        vocab: [{word:'持(も)つ', read:'모츠', mean:'가지다'}] 
                    },
                    { 
                        jp: '5000円以上で可能です。', 
                        kr: '5000엔 이상이면 가능합니다.', 
                        romaji: 'Gosenen ijou de kanou desu', 
                        vocab: [{word:'以上(いじょう)', read:'이죠-', mean:'이상'}, {word:'可能(かのう)', read:'카노-', mean:'가능'}] 
                    }
                ] 
            },
            { 
                question: { 
                    jp: '新しいものを出してもらえますか？', 
                    kr: '(역질문) 새 것으로 꺼내 주실 수 있나요?', 
                    romaji: 'Atarashii mono o dashite moraemasu ka?', 
                    vocab: [
                        {word:'新(あたら)しい', read:'아타라시-', mean:'새롭다/새것'}, 
                        {word:'出(だ)す', read:'다스', mean:'꺼내다/내다'}
                    ] 
                },
                answers: [
                    { 
                        jp: '在庫を確認してきます。', 
                        kr: '재고를 확인하고 오겠습니다.', 
                        romaji: 'Zaiko o kakunin shite kimasu', 
                        vocab: [{word:'在庫(ざいこ)', read:'자이코', mean:'재고'}, {word:'確認(かくにん)', read:'카쿠닌', mean:'확인'}] 
                    },
                    { 
                        jp: 'これが現品限りです。', 
                        kr: '이게 진열된 상품(현품)이 전부입니다.', 
                        romaji: 'Kore ga genpinkagiri desu', 
                        vocab: [{word:'現品(げんぴん)', read:'겐핀', mean:'현품/진열상품'}, {word:'限(かぎ)り', read:'카기리', mean:'~한정/끝'}] 
                    }
                ] 
            }
        ]
    },
    'hotel': {
        title: '호텔 / 숙박',
        icon: 'fas fa-bed',
        color: 'indigo',
        conversations: [
            { 
                question: { 
                    jp: 'チェックインをお願いします。', 
                    kr: '체크인 부탁합니다.', 
                    romaji: 'Chekkuin o onegaishimasu', 
                    vocab: [{word:'チェックイン', read:'쳇쿠인', mean:'체크인'}] 
                },
                answers: [
                    { 
                        jp: 'お名前を教えていただけますか？', 
                        kr: '성함을 알려주시겠습니까?', 
                        romaji: 'Onamae o oshiete itadakemasu ka?', 
                        vocab: [{word:'名前(なまえ)', read:'나마에', mean:'이름'}, {word:'教(おし)える', read:'오시에루', mean:'가르치다/알리다'}] 
                    },
                    { 
                        jp: '予約番号はわかりますか？', 
                        kr: '예약 번호를 아시나요?', 
                        romaji: 'Yoyakubangou wa wakarimasu ka?', 
                        vocab: [{word:'予約(よやく)', read:'요야쿠', mean:'예약'}, {word:'番号(ばんごう)', read:'반고-', mean:'번호'}] 
                    }
                ] 
            },
            { 
                question: { 
                    jp: '荷物を預かってもらえますか？', 
                    kr: '(역질문) 짐을 맡아주실 수 있나요?', 
                    romaji: 'Nimotsu o azukatte moraemasu ka?', 
                    vocab: [
                        {word:'荷物(にもつ)', read:'니모츠', mean:'짐'}, 
                        {word:'預(あず)かる', read:'아즈카루', mean:'맡다/보관하다'}
                    ] 
                },
                answers: [
                    { 
                        jp: 'はい、可能です。', 
                        kr: '네, 가능합니다.', 
                        romaji: 'Hai, kanou desu', 
                        vocab: [] 
                    },
                    { 
                        jp: 'チェックアウト後も大丈夫です。', 
                        kr: '체크아웃 후에도 괜찮습니다.', 
                        romaji: 'Chekkuauto go mo daijoubu desu', 
                        vocab: [{word:'後(ご)', read:'고', mean:'후/뒤'}, {word:'大丈夫(だいじょうぶ)', read:'다이죠-부', mean:'괜찮음'}] 
                    }
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
// 3. 렌더링 엔진 (Mobile Responsive)
// ==========================================
function initConversation() {
    const keys = Object.keys(conversationModuleData);
    if (keys.length > 0) {
        currentConversationCategory = keys[0];
    }
    renderNavigation();
    openConversationLesson(currentConversationCategory);
}

function renderNavigation() {
    const container = document.getElementById('conversation-content');
    if (!container) return;

    // Sticky Nav
    const navWrapper = document.createElement('div');
    navWrapper.className = 'sticky-nav-container';
    navWrapper.innerHTML = `
        <div class="flex overflow-x-auto no-scrollbar gap-2 px-4 md:justify-center w-full" id="category-scroll-area">
            ${Object.entries(conversationModuleData).map(([key, data]) => `
                <button onclick="openConversationLesson('${key}')" id="nav-btn-${key}"
                    class="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 active:scale-95 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 text-sm">
                    <i class="${data.icon}"></i>
                    <span class="font-bold whitespace-nowrap">${data.title}</span>
                </button>
            `).join('')}
        </div>
    `;

    const viewerDiv = document.createElement('div');
    viewerDiv.id = 'conversation-viewer';
    viewerDiv.className = 'w-full max-w-4xl mx-auto px-4 pb-24'; 

    container.innerHTML = '';
    container.appendChild(navWrapper);
    container.appendChild(viewerDiv);
}

function openConversationLesson(categoryKey) {
    currentConversationCategory = categoryKey;
    currentConversationIndex = 0;
    updateNavigationStyles(categoryKey);
    displayCurrentConversation();
}

function updateNavigationStyles(activeKey) {
    Object.keys(conversationModuleData).forEach(key => {
        const btn = document.getElementById(`nav-btn-${key}`);
        if(btn) btn.className = `flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 text-sm`;
    });

    const activeBtn = document.getElementById(`nav-btn-${activeKey}`);
    const color = conversationModuleData[activeKey].color;
    if(activeBtn) {
        activeBtn.className = `flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 scale-105 bg-${color}-50 border-${color}-500 text-${color}-600 shadow-md text-sm`;
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

// ------------------------------------------
// 핵심: 데이터 기반 카드 생성 (단어장 포함)
// ------------------------------------------
function createFlipCardHTML(data, type, index, color) {
    const isQuestion = type === 'question';
    const uniqueId = isQuestion ? 'card-q' : `card-a-${index}`;

    // 단어장 HTML (Back Side) - 디자인 개선
    const vocabListHTML = data.vocab && data.vocab.length > 0
        ? `<div class="h-full flex flex-col">
            <div class="flex items-center gap-2 border-b border-gray-200 pb-2 mb-2">
                <i class="fas fa-book-reader text-${color}-500"></i>
                <span class="text-xs font-black text-gray-400 uppercase tracking-widest">Vocabulary</span>
            </div>
            <div class="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">
            ${data.vocab.map(v => `
                <div class="bg-white p-3 rounded-lg border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                        <span class="text-lg font-bold text-${color}-600 mr-2">${v.word}</span>
                        <span class="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-mono">${v.read}</span>
                    </div>
                    <span class="text-sm text-gray-700 font-medium mt-1 sm:mt-0">${v.mean}</span>
                </div>
            `).join('')}
            </div>
           </div>`
        : `<div class="h-full flex flex-col items-center justify-center text-gray-300">
             <i class="fas fa-search-minus text-4xl mb-2 opacity-30"></i>
             <span class="text-sm">추가 단어 없음</span>
           </div>`;

    // 카드 앞면 HTML (Front Side)
    const frontHTML = `
        <div class="absolute w-full h-full backface-hidden bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between overflow-hidden">
            <div class="px-5 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                 <span class="px-3 py-1 rounded-full ${isQuestion ? `bg-${color}-100 text-${color}-700` : 'bg-gray-200 text-gray-600'} text-[10px] font-black tracking-widest uppercase">
                    ${isQuestion ? 'Question' : `Answer ${index + 1}`}
                 </span>
                <span class="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                    <i class="fas fa-sync-alt"></i> TAP TO FLIP
                </span>
            </div>

            <div class="flex-1 flex flex-col justify-center px-4 space-y-4">
                <div class="text-2xl md:text-3xl font-black text-gray-800 leading-snug break-keep text-center select-none">
                    ${data.jp}
                </div>
                <div class="text-xs md:text-sm text-gray-400 font-medium text-center break-keep select-none font-mono">
                    ${data.romaji}
                </div>
                <div class="w-8 h-1 bg-${color}-100 mx-auto rounded-full"></div>
                <div class="text-lg md:text-xl text-${color}-600 font-bold text-center break-keep select-none">
                    ${data.kr}
                </div>
            </div>

            <div class="px-4 py-3 bg-gray-50 border-t border-gray-100 flex gap-2 justify-center" onclick="event.stopPropagation();">
                <button onclick="AudioController.playNormal(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" 
                    class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 active:scale-95 transition-all flex flex-col items-center justify-center gap-1">
                    <i class="fas fa-volume-up text-sm"></i>
                    <span class="text-[10px]">듣기</span>
                </button>
                <button onclick="AudioController.playSlowRepeat(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" 
                    class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 active:scale-95 transition-all flex flex-col items-center justify-center gap-1">
                    <i class="fas fa-history text-sm"></i>
                    <span class="text-[10px]">3회</span>
                </button>
                <button onclick="AudioController.playShadowing(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" 
                    class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 active:scale-95 transition-all flex flex-col items-center justify-center gap-1">
                    <i class="fas fa-microphone-alt text-sm"></i>
                    <span class="text-[10px]">쉐도잉</span>
                </button>
            </div>
        </div>
    `;

    const backHTML = `
        <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-50 rounded-3xl border-2 border-${color}-100 shadow-inner flex flex-col overflow-hidden">
             <div class="flex-1 p-5 overflow-hidden relative">
                ${vocabListHTML}
             </div>
             <div class="py-3 bg-white border-t border-gray-200 text-center cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors" onclick="event.stopPropagation(); toggleCardFlip('${uniqueId}')">
                <span class="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2">
                    <i class="fas fa-undo"></i> Return to Card
                </span>
             </div>
        </div>
    `;

    return `
        <div class="perspective-1000 w-full mb-8 select-none group" onclick="toggleCardFlip('${uniqueId}')">
            <div id="${uniqueId}" class="card-inner relative w-full min-h-[450px] md:min-h-[500px] transform-style-3d shadow-lg rounded-3xl hover:shadow-xl transition-all duration-500 bg-white">
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
        <div class="flex items-center justify-between mb-6 px-1 animate-fade-in">
            <h3 class="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                <span class="w-1.5 h-6 bg-${convData.color}-500 rounded-full inline-block"></span>
                <span class="truncate">${convData.title}</span>
                <span class="text-sm text-gray-400 font-normal ml-1">(${currentConversationIndex + 1}/${convData.conversations.length})</span>
            </h3>
            <div class="flex gap-2">
                <button id="conv-prev-btn" onclick="previousConversation()" class="w-10 h-10 rounded-full bg-white border border-gray-200 shadow text-gray-400 hover:text-gray-800 transition-all flex items-center justify-center">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <button id="conv-next-btn" onclick="nextConversation()" class="w-10 h-10 rounded-full bg-black shadow-lg text-white hover:bg-gray-800 transition-all flex items-center justify-center">
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>

        <div class="space-y-6 animate-fade-in">
            ${createFlipCardHTML(currentConv.question, 'question', 0, convData.color)}
            <div class="relative pl-4 border-l-2 border-dashed border-gray-200 space-y-8">
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
// 4. 오디오 컨트롤러
// ==========================================
const AudioController = {
    speechSynth: window.speechSynthesis,
    speak: function (text, rate = 1.0) {
        return new Promise((resolve) => {
            if (this.speechSynth.speaking) this.speechSynth.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP';
            utterance.rate = rate;
            // iOS/Android 호환성 강화
            const voices = this.speechSynth.getVoices();
            const jaVoice = voices.find(v => v.lang === 'ja-JP') || voices[0];
            if(jaVoice) utterance.voice = jaVoice;
            
            utterance.onend = () => resolve();
            utterance.onerror = () => resolve();
            this.speechSynth.speak(utterance);
        });
    },
    wait: function (ms) { return new Promise(resolve => setTimeout(resolve, ms)); },
    playNormal: async function (text) {
        this.speechSynth.cancel();
        await this.speak(text, 1.0);
    },
    playSlowRepeat: async function (text) {
        this.speechSynth.cancel();
        for (let i = 0; i < 3; i++) {
            await this.speak(text, 0.7);
            await this.wait(600);
        }
    },
    playShadowing: async function (text) {
        this.speechSynth.cancel();
        await this.speak(text, 0.7);
        await this.wait(1500);
        await this.speak(text, 1.0);
    }
};

window.playAudio = function (text) { AudioController.playNormal(text); };

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
        prevBtn.style.opacity = isDisabled ? '0.3' : '1';
    }

    if (nextBtn && conv) {
        const isLast = currentConversationIndex === conv.conversations.length - 1;
        nextBtn.disabled = isLast;
        nextBtn.innerHTML = isLast ? '<i class="fas fa-check"></i>' : '<i class="fas fa-arrow-right"></i>';
        nextBtn.className = isLast
            ? 'w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center cursor-not-allowed'
            : `w-10 h-10 rounded-full bg-${conv.color}-500 shadow-lg text-white transition-all flex items-center justify-center`;
    }
}

function previousConversation() {
    if (currentConversationIndex > 0) {
        currentConversationIndex--;
        displayCurrentConversation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function nextConversation() {
    const conv = conversationModuleData[currentConversationCategory];
    if (currentConversationIndex < conv.conversations.length - 1) {
        currentConversationIndex++;
        displayCurrentConversation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('conversation-content')) {
        initConversation();
    }
});
