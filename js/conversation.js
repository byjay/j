/**
 * conversation.js - Ultimate Japanese Conversation System (Mobile Optimized)
 * Ver 2.1: Fully Responsive, Sticky Nav, Tall Cards
 */

// ==========================================
// 0. 시스템 스타일 주입 (Advanced UI/UX)
// ==========================================
(function injectStyles() {
    // 기존 스타일 제거 (중복 방지)
    const oldStyle = document.getElementById('conversation-styles');
    if (oldStyle) oldStyle.remove();

    const css = `
        /* 3D Flip Core */
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        /* Card Animation */
        .card-inner { transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1); }
        .card-flipped .card-inner { transform: rotateY(180deg); }
        
        /* Sticky Header Glassmorphism */
        .sticky-nav-container {
            position: sticky;
            top: 0;
            z-index: 50;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid #e2e8f0;
            padding: 10px 0;
            margin-bottom: 20px;
            width: 100%; /* 모바일 대응 */
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
// 1. 대규모 회화 데이터 (Massive Dataset)
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
                    romaji: 'Pasupo-to to nyuukoku ka-do o misete kudasai',
                    vocab: [
                        { word: 'パスポート', read: '파스포-토', mean: '여권' },
                        { word: '入国(にゅうこく)', read: '뉴-코쿠', mean: '입국' },
                        { word: 'カード', read: '카-도', mean: '카드' },
                        { word: '見(み)せる', read: '미세루', mean: '보여주다' }
                    ]
                },
                answers: [
                    { 
                        jp: 'はい、どうぞ。', 
                        kr: '네, 여기 있습니다.', 
                        romaji: 'Hai, douzo', 
                        vocab: [{ word: 'どうぞ', read: '도-조', mean: '여기요(권유)' }] 
                    },
                    { 
                        jp: '機内で入国カードを貰えませんでした。', 
                        kr: '기내에서 입국 카드를 받지 못했습니다.', 
                        romaji: 'Kinai de nyuukoku ka-do o moraemasen deshita', 
                        vocab: [
                            { word: '機内(きない)', read: '키나이', mean: '기내' },
                            { word: '貰(もら)う', read: '모라우', mean: '받다' }
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
                        { word: '訪問(ほうもん)', read: '호-몬', mean: '방문' },
                        { word: '目的(もくてき)', read: '모쿠테키', mean: '목적' }
                    ]
                },
                answers: [
                    { 
                        jp: '観光できました。', 
                        kr: '관광하러 왔습니다.', 
                        romaji: 'Kankou de kimashita', 
                        vocab: [{ word: '観光(かんこう)', read: '칸코-', mean: '관광' }] 
                    },
                    { 
                        jp: '仕事の出張です。', 
                        kr: '업무 출장입니다.', 
                        romaji: 'Shigoto no shucchou desu', 
                        vocab: [
                            { word: '仕事(しごと)', read: '시고토', mean: '일' },
                            { word: '出張(しゅっちょう)', read: '슛쵸-', mean: '출장' }
                        ] 
                    }
                ]
            },
            {
                question: {
                    jp: 'どのくらい滞在しますか？',
                    kr: '얼마나 체류합니까?',
                    romaji: 'Dono kurai taizai shimasu ka?',
                    vocab: [
                        { word: 'どのくらい', read: '도노쿠라이', mean: '어느 정도' },
                        { word: '滞在(たいざい)', read: '타이자이', mean: '체류' }
                    ]
                },
                answers: [
                    { 
                        jp: '一週間です。', 
                        kr: '일주일입니다.', 
                        romaji: 'Isshuukan desu', 
                        vocab: [{ word: '一週間(いっしゅうかん)', read: '잇슈-칸', mean: '일주일' }] 
                    },
                    { 
                        jp: '帰りのチケットはこれです。', 
                        kr: '돌아가는 티켓은 이것입니다.', 
                        romaji: 'Kaeri no chiketto wa kore desu', 
                        vocab: [
                            { word: '帰(かえ)り', read: '카에리', mean: '돌아감' },
                            { word: 'チケット', read: '치켓토', mean: '티켓/표' }
                        ] 
                    }
                ]
            },
            {
                question: {
                    jp: '宿泊先はどこですか？',
                    kr: '숙박지는 어디입니까?',
                    romaji: 'Shukuhakusaki wa doko desu ka?',
                    vocab: [
                        { word: '宿泊先(しゅくはくさき)', read: '슈쿠하쿠사키', mean: '숙박지/묵을 곳' }
                    ]
                },
                answers: [
                    { 
                        jp: '大阪のヒルトンホテルです。', 
                        kr: '오사카의 힐튼 호텔입니다.', 
                        romaji: 'Oosaka no hiruton hoteru desu', 
                        vocab: [{ word: 'ホテル', read: '호테루', mean: '호텔' }] 
                    },
                    { 
                        jp: 'まだ決めていません。', 
                        kr: '아직 정하지 않았습니다.', 
                        romaji: 'Mada kimete imasen', 
                        vocab: [
                            { word: 'まだ', read: '마다', mean: '아직' },
                            { word: '決(き)める', read: '키메루', mean: '정하다' }
                        ] 
                    }
                ]
            }
        ]
    },
    'restaurant': {
        title: '식당/주문',
        icon: 'fas fa-utensils',
        color: 'orange',
        conversations: [
            {
                question: {
                    jp: 'いらっしゃいませ。何名様ですか？',
                    kr: '어서 오세요. 몇 분이세요?',
                    romaji: 'Irasshaimase. Nanmeisama desu ka?',
                    vocab: [
                        { word: 'いらっしゃいませ', read: '이랏샤이마세', mean: '어서 오세요' },
                        { word: '何名様(なんめいさま)', read: '난메-사마', mean: '몇 분(존경)' }
                    ]
                },
                answers: [
                    { 
                        jp: '二人です。席は空いてますか？', 
                        kr: '두 명입니다. 자리 비어 있나요?', 
                        romaji: 'Futari desu. Seki wa aite maska?', 
                        vocab: [
                            { word: '二人(ふたり)', read: '후타리', mean: '두 명' },
                            { word: '空(あ)く', read: '아쿠', mean: '비다' }
                        ] 
                    },
                    { 
                        jp: '予約した田中です。', 
                        kr: '예약한 다나카입니다.', 
                        romaji: 'Yoyaku shita Tanaka desu', 
                        vocab: [{ word: '予約(よやく)', read: '요야쿠', mean: '예약' }] 
                    }
                ]
            },
            {
                question: {
                    jp: 'ご注文はお決まりですか？',
                    kr: '주문하시겠습니까?',
                    romaji: 'Gochuumon wa okimari desu ka?',
                    vocab: [
                        { word: '注文(ちゅうもん)', read: '츄-몬', mean: '주문' },
                        { word: '決(き)まり', read: '키마리', mean: '결정' }
                    ]
                },
                answers: [
                    { 
                        jp: 'おすすめのメニューは何ですか？', 
                        kr: '추천 메뉴는 무엇입니까?', 
                        romaji: 'Osusume no menyuu wa nan desu ka?', 
                        vocab: [
                            { word: 'おすすめ', read: '오스스메', mean: '추천' },
                            { word: 'メニュー', read: '메뉴-', mean: '메뉴' }
                        ] 
                    },
                    { 
                        jp: 'とりあえず生ビール二つください。', 
                        kr: '일단 생맥주 두 개 주세요.', 
                        romaji: 'Toriaezu namabi-ru futatsu kudasai', 
                        vocab: [
                            { word: 'とりあえず', read: '토리아에즈', mean: '일단/우선' },
                            { word: '生(なま)ビール', read: '나마비-루', mean: '생맥주' }
                        ] 
                    }
                ]
            },
            {
                question: {
                    jp: 'アレルギーはありますか？',
                    kr: '알레르기가 있습니까?',
                    romaji: 'Arerugi- wa arimasu ka?',
                    vocab: [{ word: 'アレルギー', read: '아레루기-', mean: '알레르기' }]
                },
                answers: [
                    { 
                        jp: 'エビのアレルギーがあります。', 
                        kr: '새우 알레르기가 있습니다.', 
                        romaji: 'Ebi no arerugi- ga arimasu', 
                        vocab: [{ word: 'エビ', read: '에비', mean: '새우' }] 
                    },
                    { 
                        jp: '特にありません。', 
                        kr: '딱히 없습니다.', 
                        romaji: 'Toku ni arimasen', 
                        vocab: [{ word: '特(とく)に', read: '토쿠니', mean: '특별히/딱히' }] 
                    }
                ]
            },
            {
                question: {
                    jp: 'お会計はどうなさいますか？',
                    kr: '계산은 어떻게 하시겠습니까?',
                    romaji: 'Okaikei wa dou nasaimasu ka?',
                    vocab: [
                        { word: '会計(かいけい)', read: '카이케-', mean: '계산' },
                        { word: 'どう', read: '도-', mean: '어떻게' }
                    ]
                },
                answers: [
                    { 
                        jp: '別々にお願いします。', 
                        kr: '따로따로 부탁합니다.', 
                        romaji: 'Betsubetsu ni onegaishimasu', 
                        vocab: [{ word: '別々(べつべつ)', read: '베츠베츠', mean: '따로따로' }] 
                    },
                    { 
                        jp: 'クレジットカードは使えますか？', 
                        kr: '신용카드 사용할 수 있나요?', 
                        romaji: 'Kurejitto ka-do wa tsukaemasu ka?', 
                        vocab: [
                            { word: '使(つか)える', read: '츠카에루', mean: '사용 가능하다' }
                        ] 
                    }
                ]
            }
        ]
    },
    'shopping': {
        title: '쇼핑/면세',
        icon: 'fas fa-shopping-bag',
        color: 'pink',
        conversations: [
            {
                question: {
                    jp: '何かお探しですか？',
                    kr: '무언가 찾으시는 게 있나요?',
                    romaji: 'Nanika osagashi desu ka?',
                    vocab: [
                        { word: '探(さが)す', read: '사가스', mean: '찾다' }
                    ]
                },
                answers: [
                    { 
                        jp: 'ただ見ているだけです。', 
                        kr: '그냥 구경하는 중이에요.', 
                        romaji: 'Tada miteiru dake desu', 
                        vocab: [{ word: 'だけ', read: '다케', mean: '~뿐/만' }] 
                    },
                    { 
                        jp: '試着してもいいですか？', 
                        kr: '입어봐도(시착해도) 되나요?', 
                        romaji: 'Shichaku shitemo ii desu ka?', 
                        vocab: [
                            { word: '試着(しちゃく)', read: '시챠쿠', mean: '시착/입어봄' },
                            { word: '〜てもいい', read: '~테모이-', mean: '~해도 좋다' }
                        ] 
                    }
                ]
            },
            {
                question: {
                    jp: 'これは免税になりますか？',
                    kr: '이거 면세 되나요?',
                    romaji: 'Kore wa menzei ni narimasu ka?',
                    vocab: [{ word: '免税(めんぜい)', read: '멘제-', mean: '면세' }]
                },
                answers: [
                    { 
                        jp: 'はい、パスポートを見せてください。', 
                        kr: '네, 여권을 보여주세요.', 
                        romaji: 'Hai, pasupo-to o misete kudasai', 
                        vocab: [] 
                    },
                    { 
                        jp: '5000円以上で免税可能です。', 
                        kr: '5000엔 이상이어야 면세 가능합니다.', 
                        romaji: 'Gosenen ijou de menzei kanou desu', 
                        vocab: [
                            { word: '以上(いじょう)', read: '이죠-', mean: '이상' },
                            { word: '可能(かのう)', read: '카노-', mean: '가능' }
                        ] 
                    }
                ]
            }
        ]
    },
    'traffic': {
        title: '교통/길찾기',
        icon: 'fas fa-subway',
        color: 'green',
        conversations: [
            {
                question: {
                    jp: '切符売り場はどこですか？',
                    kr: '표 사는 곳(매표소)은 어디입니까?',
                    romaji: 'Kippu uriba wa doko desu ka?',
                    vocab: [
                        { word: '切符(きっぷ)', read: '킵푸', mean: '표/티켓' },
                        { word: '売(う)り場(ば)', read: '우리바', mean: '파는 곳/매장' }
                    ]
                },
                answers: [
                    { 
                        jp: '改札の右側にあります。', 
                        kr: '개찰구 오른쪽에 있습니다.', 
                        romaji: 'Kaisatsu no migigawa ni arimasu', 
                        vocab: [
                            { word: '改札(かいさつ)', read: '카이사츠', mean: '개찰구' },
                            { word: '右側(みぎがわ)', read: '미기가와', mean: '오른쪽' }
                        ] 
                    },
                    { 
                        jp: 'ICカードにチャージしたいです。', 
                        kr: 'IC카드에 충전하고 싶습니다.', 
                        romaji: 'ICka-do ni cha-ji shitai desu', 
                        vocab: [
                            { word: 'チャージ', read: '챠-지', mean: '충전' },
                            { word: '〜したい', read: '~시타이', mean: '~하고 싶다' }
                        ] 
                    }
                ]
            },
            {
                question: {
                    jp: 'この電車は新宿に行きますか？',
                    kr: '이 전철은 신주쿠에 갑니까?',
                    romaji: 'Kono densha wa Shinjuku ni ikimasu ka?',
                    vocab: [{ word: '電車(でんしゃ)', read: '덴샤', mean: '전철' }]
                },
                answers: [
                    { 
                        jp: 'いいえ、反対側のホームです。', 
                        kr: '아니요, 반대편 승강장입니다.', 
                        romaji: 'Iie, hantaigawa no ho-mu desu', 
                        vocab: [
                            { word: '反対(はんたい)', read: '한타이', mean: '반대' },
                            { word: 'ホーム', read: '호-무', mean: '승강장(플랫폼)' }
                        ] 
                    },
                    { 
                        jp: 'はい、快速で2つ目です。', 
                        kr: '네, 쾌속으로 2번째 역입니다.', 
                        romaji: 'Hai, kaisoku de futatsume desu', 
                        vocab: [
                            { word: '快速(かいそく)', read: '카이소쿠', mean: '쾌속' },
                            { word: '〜目(め)', read: '~메', mean: '~번째' }
                        ] 
                    }
                ]
            }
        ]
    },
    'hotel': {
        title: '호텔/숙박',
        icon: 'fas fa-bed',
        color: 'indigo',
        conversations: [
            {
                question: {
                    jp: 'チェックインをお願いします。',
                    kr: '체크인 부탁합니다.',
                    romaji: 'Chekkuin o onegaishimasu',
                    vocab: [{ word: 'チェックイン', read: '쳇쿠인', mean: '체크인' }]
                },
                answers: [
                    { 
                        jp: 'お名前を教えていただけますか？', 
                        kr: '성함을 알려주시겠습니까?', 
                        romaji: 'Onamae o oshiete itadakemasu ka?', 
                        vocab: [
                            { word: '名前(なまえ)', read: '나마에', mean: '이름' },
                            { word: '教(おし)える', read: '오시에루', mean: '가르쳐주다/알려주다' }
                        ] 
                    },
                    { 
                        jp: '荷物を預かってもらえますか？', 
                        kr: '짐을 맡아주실 수 있나요?', 
                        romaji: 'Nimotsu o azukatte moraemasu ka?', 
                        vocab: [
                            { word: '荷物(にもつ)', read: '니모츠', mean: '짐' },
                            { word: '預(あず)かる', read: '아즈카루', mean: '맡다/보관하다' }
                        ] 
                    }
                ]
            },
            {
                question: {
                    jp: 'Wi-Fiのパスワードは何ですか？',
                    kr: '와이파이 비밀번호는 무엇입니까?',
                    romaji: 'Waifai no pasuwa-do wa nan desu ka?',
                    vocab: [{ word: 'パスワード', read: '파스와-도', mean: '비밀번호' }]
                },
                answers: [
                    { 
                        jp: 'カードキーの裏に書いてあります。', 
                        kr: '카드키 뒤에 적혀 있습니다.', 
                        romaji: 'Ka-doki- no ura ni kaite arimasu', 
                        vocab: [
                            { word: '裏(うら)', read: '우라', mean: '뒤/뒷면' },
                            { word: '書(か)く', read: '카쿠', mean: '쓰다' }
                        ] 
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

    // Sticky Navigation Wrapper
    const navWrapper = document.createElement('div');
    navWrapper.className = 'sticky-nav-container';
    
    navWrapper.innerHTML = `
        <div class="flex overflow-x-auto no-scrollbar gap-2 px-4 md:justify-center w-full" id="category-scroll-area">
            ${Object.entries(conversationModuleData).map(([key, data]) => `
                <button onclick="openConversationLesson('${key}')" 
                    id="nav-btn-${key}"
                    class="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 transform active:scale-95 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 text-sm md:text-base">
                    <i class="${data.icon}"></i>
                    <span class="font-bold whitespace-nowrap">${data.title}</span>
                </button>
            `).join('')}
        </div>
    `;

    const viewerDiv = document.createElement('div');
    viewerDiv.id = 'conversation-viewer';
    viewerDiv.className = 'w-full max-w-full md:max-w-4xl mx-auto px-4 pb-20'; // 모바일 패딩 조정

    container.innerHTML = '';
    container.appendChild(navWrapper);
    container.appendChild(viewerDiv);
}

function openConversationLesson(categoryKey) {
    currentConversationCategory = categoryKey;
    currentConversationIndex = 0;
    updateNavigationStyles(categoryKey);

    const viewer = document.getElementById('conversation-viewer');
    if (viewer) {
        displayCurrentConversation();
    }
}

function updateNavigationStyles(activeKey) {
    Object.keys(conversationModuleData).forEach(key => {
        const btn = document.getElementById(`nav-btn-${key}`);
        if(btn) {
            btn.className = `flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 transform active:scale-95 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 text-sm md:text-base`;
        }
    });

    const activeBtn = document.getElementById(`nav-btn-${activeKey}`);
    const color = conversationModuleData[activeKey].color;
    if(activeBtn) {
        activeBtn.className = `flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 transform scale-105 active:scale-95 bg-${color}-50 border-${color}-500 text-${color}-600 shadow-md text-sm md:text-base`;
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

// ------------------------------------------
// 핵심: 반응형 카드 (Mobile: Compact / Desktop: Wide)
// ------------------------------------------
function createFlipCardHTML(data, type, index, color) {
    const isQuestion = type === 'question';
    const uniqueId = isQuestion ? 'card-q' : `card-a-${index}`;

    // 단어장 (뒷면)
    const vocabListHTML = data.vocab && data.vocab.length > 0
        ? `<div class="h-full flex flex-col">
            <div class="text-xs md:text-sm font-black text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-200 flex items-center gap-2">
                <i class="fas fa-book-open"></i> Essential Vocabulary
            </div>
            <div class="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-2">
            ${data.vocab.map(v => `
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 md:p-3 bg-white rounded-lg border border-gray-100 hover:border-${color}-300 hover:shadow-md transition-all">
                    <div class="mb-1 sm:mb-0">
                        <span class="text-lg md:text-xl font-bold text-${color}-600 mr-2">${v.word}</span>
                        <span class="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-0.5 rounded">${v.read}</span>
                    </div>
                    <span class="text-sm md:text-base text-gray-700 font-medium pl-1 border-l-2 border-${color}-100 sm:border-0 sm:pl-0">${v.mean}</span>
                </div>
            `).join('')}
            </div>
           </div>`
        : `<div class="h-full flex flex-col items-center justify-center text-gray-300">
             <i class="fas fa-layer-group text-4xl mb-3 opacity-30"></i>
             <span class="text-sm">단어 없음</span>
           </div>`;

    // 카드 앞면
    const frontHTML = `
        <div class="absolute w-full h-full backface-hidden bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between overflow-hidden">
            <div class="px-5 py-4 md:px-8 md:py-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                 ${isQuestion ?
                    `<span class="px-3 py-1 rounded-full bg-${color}-100 text-${color}-700 text-[10px] md:text-xs font-black tracking-widest uppercase">Question</span>` :
                    `<span class="px-3 py-1 rounded-full bg-gray-200 text-gray-600 text-[10px] md:text-xs font-black tracking-widest uppercase">Answer ${index + 1}</span>`
                }
                <i class="fas fa-touch-app text-gray-300 animate-pulse text-sm"></i>
            </div>

            <div class="flex-1 flex flex-col justify-center px-4 py-4 md:px-8 space-y-4 md:space-y-6">
                <div class="text-2xl md:text-4xl font-black text-gray-800 leading-snug break-keep select-none text-center">
                    ${data.jp}
                </div>
                <div class="text-xs md:text-base text-gray-400 font-medium text-center break-keep select-none">
                    ${data.romaji}
                </div>
                <div class="w-12 h-1 bg-${color}-100 mx-auto rounded-full"></div>
                <div class="text-lg md:text-2xl text-${color}-600 font-bold text-center break-keep select-none">
                    ${data.kr}
                </div>
            </div>

            <div class="px-4 py-4 md:px-8 md:py-6 bg-gray-50 border-t border-gray-100 flex gap-2 justify-center" onclick="event.stopPropagation();">
                <button onclick="AudioController.playNormal(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" 
                    class="flex-1 py-2 md:py-3 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 hover:border-${color}-200 shadow-sm active:scale-95 transition-all flex flex-col items-center justify-center gap-1">
                    <i class="fas fa-volume-up text-base md:text-lg"></i>
                    <span class="text-[10px] md:text-xs">듣기</span>
                </button>
                
                <button onclick="AudioController.playSlowRepeat(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" 
                    class="flex-1 py-2 md:py-3 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 hover:border-${color}-200 shadow-sm active:scale-95 transition-all flex flex-col items-center justify-center gap-1">
                    <i class="fas fa-history text-base md:text-lg"></i>
                    <span class="text-[10px] md:text-xs">3회</span>
                </button>

                <button onclick="AudioController.playShadowing(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" 
                    class="flex-1 py-2 md:py-3 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 hover:border-${color}-200 shadow-sm active:scale-95 transition-all flex flex-col items-center justify-center gap-1">
                    <i class="fas fa-microphone-alt text-base md:text-lg"></i>
                    <span class="text-[10px] md:text-xs">쉐도잉</span>
                </button>
            </div>
        </div>
    `;

    const backHTML = `
        <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-50 rounded-3xl border-2 border-${color}-100 shadow-inner flex flex-col overflow-hidden">
             <div class="flex-1 p-5 md:p-8 overflow-hidden relative">
                ${vocabListHTML}
             </div>
             <div class="py-3 md:py-4 bg-white border-t border-gray-200 text-center cursor-pointer hover:bg-gray-50 transition-colors" onclick="event.stopPropagation(); toggleCardFlip('${uniqueId}')">
                <span class="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2">
                    <i class="fas fa-undo"></i> Return
                </span>
             </div>
        </div>
    `;

    // Responsive Height: Mobile 450px / Desktop 600px
    return `
        <div class="perspective-1000 w-full mb-8 md:mb-12 select-none group" onclick="toggleCardFlip('${uniqueId}')">
            <div id="${uniqueId}" class="card-inner relative w-full min-h-[450px] md:min-h-[600px] transform-style-3d shadow-lg rounded-3xl hover:shadow-xl transition-all duration-500 bg-white">
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
            <h3 class="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2 md:gap-3">
                <span class="w-1.5 h-6 md:w-2 md:h-8 bg-${convData.color}-500 rounded-full inline-block"></span>
                <span class="truncate max-w-[150px] md:max-w-none">${convData.title}</span>
                <span class="text-sm md:text-base text-gray-400 font-normal ml-1">(${currentConversationIndex + 1}/${convData.conversations.length})</span>
            </h3>
            <div class="flex gap-2 md:gap-3">
                <button id="conv-prev-btn" onclick="previousConversation()" class="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white border border-gray-200 shadow text-gray-400 hover:text-gray-800 transition-all flex items-center justify-center">
                    <i class="fas fa-arrow-left text-sm md:text-xl"></i>
                </button>
                <button id="conv-next-btn" onclick="nextConversation()" class="w-10 h-10 md:w-14 md:h-14 rounded-full bg-black shadow-lg text-white hover:bg-gray-800 transition-all flex items-center justify-center">
                    <i class="fas fa-arrow-right text-sm md:text-xl"></i>
                </button>
            </div>
        </div>

        <div class="space-y-6 md:space-y-8 animate-fade-in">
            ${createFlipCardHTML(currentConv.question, 'question', 0, convData.color)}

            <div class="relative pl-3 md:pl-10 border-l-2 md:border-l-4 border-dashed border-gray-200 space-y-8 md:space-y-12">
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
            await this.wait(800);
        }
    },
    playShadowing: async function (text) {
        this.speechSynth.cancel();
        await this.speak(text, 0.7);
        await this.wait(2000);
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
            ? 'w-10 h-10 md:w-14 md:h-14 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center cursor-not-allowed'
            : `w-10 h-10 md:w-14 md:h-14 rounded-full bg-${conv.color}-500 shadow-lg text-white transition-all flex items-center justify-center`;
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

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('conversation-content')) {
        initConversation();
    }
});
