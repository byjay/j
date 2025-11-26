/**
 * conversation.js - Final Complete Edition
 * Ver 4.0: Full Vocabulary Mapping with Parts of Speech
 */

// ==========================================
// 0. 스타일 정의 (UI 최적화)
// ==========================================
(function injectStyles() {
    const oldStyle = document.getElementById('conversation-styles');
    if (oldStyle) oldStyle.remove();

    const css = `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .card-inner { transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1); }
        .card-flipped .card-inner { transform: rotateY(180deg); }
        
        /* Sticky Nav */
        .sticky-nav-container {
            position: sticky; top: 0; z-index: 999;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid #e5e7eb;
            padding: 12px 0; margin-bottom: 24px; width: 100%;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    `;
    const style = document.createElement('style');
    style.id = 'conversation-styles';
    style.textContent = css;
    document.head.appendChild(style);
})();

// ==========================================
// 1. 대규모 데이터 (회화 30 + 품사 포함 완벽 단어장)
// ==========================================
const conversationModuleData = {
    'immigration': {
        title: '입국 심사',
        icon: 'fas fa-passport',
        color: 'blue',
        conversations: [
            // [1]
            { 
                question: { 
                    jp: 'パスポートを見せてください。', kr: '여권을 보여주세요.', romaji: 'Pasupo-to o misete kudasai', 
                    vocab: [
                        {word:'パスポート', read:'파스포-토', mean:'여권', type:'명사'}, 
                        {word:'見せる', read:'미세루', mean:'보여주다', type:'동사'}, 
                        {word:'ください', read:'쿠다사이', mean:'주세요', type:'표현'}
                    ] 
                },
                answers: [
                    { jp: 'はい、どうぞ。', kr: '네, 여기 있습니다.', romaji: 'Hai, douzo', vocab: [{word:'はい', read:'하이', mean:'네', type:'감탄사'}, {word:'どうぞ', read:'도-조', mean:'여기요', type:'표현'}] },
                    { jp: '入国カードもここにあります。', kr: '입국 카드도 여기 있습니다.', romaji: 'Nyuukoku ka-do mo koko ni arimasu', vocab: [{word:'入国カード', read:'뉴-코쿠카-도', mean:'입국카드', type:'명사'}, {word:'ここ', read:'코코', mean:'여기', type:'대명사'}, {word:'ある', read:'아루', mean:'있다', type:'동사'}] }
                ] 
            },
            // [2]
            { 
                question: { 
                    jp: '訪問の目的は何ですか？', kr: '방문 목적은 무엇입니까?', romaji: 'Houmon no mokuteki wa nan desu ka?', 
                    vocab: [
                        {word:'訪問', read:'호-몬', mean:'방문', type:'명사'}, 
                        {word:'目的', read:'모쿠테키', mean:'목적', type:'명사'},
                        {word:'何', read:'난', mean:'무엇', type:'대명사'}
                    ] 
                },
                answers: [
                    { jp: '観光です。', kr: '관광입니다.', romaji: 'Kankou desu', vocab: [{word:'観光', read:'칸코-', mean:'관광', type:'명사'}] },
                    { jp: '仕事できました。', kr: '일(출장) 때문에 왔습니다.', romaji: 'Shigoto de kimashita', vocab: [{word:'仕事', read:'시고토', mean:'일/업무', type:'명사'}, {word:'来る', read:'쿠루', mean:'오다', type:'동사'}] }
                ] 
            },
            // [3]
            { 
                question: { 
                    jp: 'どのくらい滞在しますか？', kr: '얼마나 체류합니까?', romaji: 'Dono kurai taizai shimasu ka?', 
                    vocab: [
                        {word:'どのくらい', read:'도노쿠라이', mean:'얼마나', type:'부사'}, 
                        {word:'滞在', read:'타이자이', mean:'체류', type:'명사'}
                    ] 
                },
                answers: [
                    { jp: '3泊4日です。', kr: '3박 4일입니다.', romaji: 'Sanpaku yokka desu', vocab: [{word:'3泊', read:'삼파쿠', mean:'3박', type:'명사'}, {word:'4日', read:'욧카', mean:'4일', type:'명사'}] },
                    { jp: '一週間です。', kr: '일주일입니다.', romaji: 'Isshuukan desu', vocab: [{word:'一週間', read:'잇슈-칸', mean:'일주일', type:'명사'}] }
                ] 
            },
            // [4]
            { 
                question: { 
                    jp: 'どこに泊まりますか？', kr: '어디에 묵습니까?', romaji: 'Doko ni tomarimasu ka?', 
                    vocab: [
                        {word:'どこ', read:'도코', mean:'어디', type:'대명사'}, 
                        {word:'泊まる', read:'토마루', mean:'묵다', type:'동사'}
                    ] 
                },
                answers: [
                    { jp: '予約したホテルです。', kr: '예약한 호텔입니다.', romaji: 'Yoyaku shita hoteru desu', vocab: [{word:'予約', read:'요야쿠', mean:'예약', type:'명사'}, {word:'ホテル', read:'호테루', mean:'호텔', type:'명사'}] },
                    { jp: '友人の家です。', kr: '친구 집입니다.', romaji: 'Yuujin no ie desu', vocab: [{word:'友人', read:'유-진', mean:'친구', type:'명사'}, {word:'家', read:'이에', mean:'집', type:'명사'}] }
                ] 
            },
            // [5]
            { 
                question: { 
                    jp: '帰りのチケットは持っていますか？', kr: '돌아가는 티켓은 가지고 있나요?', romaji: 'Kaeri no chiketto wa motte imasu ka?', 
                    vocab: [
                        {word:'帰り', read:'카에리', mean:'귀국/돌아감', type:'명사'}, 
                        {word:'チケット', read:'치켓토', mean:'티켓', type:'명사'},
                        {word:'持つ', read:'모츠', mean:'가지다', type:'동사'}
                    ] 
                },
                answers: [
                    { jp: 'はい、Eチケットがあります。', kr: '네, E티켓이 있습니다.', romaji: 'Hai, i-chiketto ga arimasu', vocab: [{word:'Eチケット', read:'이-치켓토', mean:'E티켓', type:'명사'}, {word:'ある', read:'아루', mean:'있다', type:'동사'}] },
                    { jp: 'スマホに入っています。', kr: '스마트폰에 들어있습니다.', romaji: 'Sumaho ni haitte imasu', vocab: [{word:'スマホ', read:'스마호', mean:'스마트폰', type:'명사'}, {word:'入る', read:'하이루', mean:'들어있다', type:'동사'}] }
                ] 
            },
            // [6]
            { 
                question: { 
                    jp: 'お一人ですか？', kr: '혼자입니까?', romaji: 'Ohitori desu ka?', 
                    vocab: [{word:'一人', read:'히토리', mean:'한 명/혼자', type:'명사'}] 
                },
                answers: [
                    { jp: 'はい、一人旅です。', kr: '네, 혼자 여행입니다.', romaji: 'Hai, hitoritabi desu', vocab: [{word:'一人旅', read:'히토리타비', mean:'나홀로 여행', type:'명사'}] },
                    { jp: 'いいえ、家族と一緒です。', kr: '아뇨, 가족과 함께입니다.', romaji: 'Iie, kazoku to issho desu', vocab: [{word:'家族', read:'카조쿠', mean:'가족', type:'명사'}, {word:'一緒', read:'잇쇼', mean:'함께', type:'명사'}] }
                ] 
            },
            // [7]
            { 
                question: { 
                    jp: '日本の滞在は初めてですか？', kr: '일본 체류는 처음입니까?', romaji: 'Nihon no taizai wa hajimete desu ka?', 
                    vocab: [
                        {word:'日本', read:'니혼', mean:'일본', type:'명사'},
                        {word:'初めて', read:'하지메테', mean:'처음', type:'부사'}
                    ] 
                },
                answers: [
                    { jp: 'はい、初めてです。', kr: '네, 처음입니다.', romaji: 'Hai, hajimete desu', vocab: [] },
                    { jp: 'いいえ、3回目です。', kr: '아뇨, 3번째입니다.', romaji: 'Iie, sankai me desu', vocab: [{word:'3回目', read:'산카이메', mean:'3번째', type:'명사'}] }
                ] 
            },
            // [8]
            { 
                question: { 
                    jp: '職業は何ですか？', kr: '직업이 무엇입니까?', romaji: 'Shokugyou wa nan desu ka?', 
                    vocab: [{word:'職業', read:'쇼쿠교-', mean:'직업', type:'명사'}] 
                },
                answers: [
                    { jp: '会社員です。', kr: '회사원입니다.', romaji: 'Kaishain desu', vocab: [{word:'会社員', read:'카이샤인', mean:'회사원', type:'명사'}] },
                    { jp: '学生です。', kr: '학생입니다.', romaji: 'Gakusei desu', vocab: [{word:'学生', read:'가쿠세-', mean:'학생', type:'명사'}] }
                ] 
            },
            // [9]
            { 
                question: { 
                    jp: '所持金はいくらですか？', kr: '소지금은 얼마입니까?', romaji: 'Shojikin wa ikura desu ka?', 
                    vocab: [
                        {word:'所持金', read:'쇼지킨', mean:'소지금', type:'명사'},
                        {word:'いくら', read:'이쿠라', mean:'얼마', type:'대명사'}
                    ] 
                },
                answers: [
                    { jp: '5万円くらいです。', kr: '5만엔 정도입니다.', romaji: 'Gomanen kurai desu', vocab: [{word:'5万円', read:'고만엔', mean:'5만엔', type:'명사'}, {word:'くらい', read:'쿠라이', mean:'정도', type:'조사'}] },
                    { jp: 'カードを使います。', kr: '카드를 씁니다.', romaji: 'Ka-do o tsukaimasu', vocab: [{word:'使う', read:'츠카우', mean:'쓰다/사용하다', type:'동사'}] }
                ] 
            },
            // [10]
            { 
                question: { 
                    jp: 'マスクを外してください。', kr: '마스크를 벗어주세요.', romaji: 'Masuku o hazushite kudasai', 
                    vocab: [
                        {word:'マスク', read:'마스쿠', mean:'마스크', type:'명사'},
                        {word:'外す', read:'하즈스', mean:'벗다/풀다', type:'동사'}
                    ] 
                },
                answers: [
                    { jp: 'はい、これでいいですか？', kr: '네, 이러면 되나요?', romaji: 'Hai, kore de ii desu ka?', vocab: [{word:'これ', read:'코레', mean:'이것', type:'대명사'}, {word:'いい', read:'이-', mean:'좋다/괜찮다', type:'형용사'}] },
                    { jp: '眼鏡も外しますか？', kr: '안경도 벗을까요?', romaji: 'Megane mo hazushimasu ka?', vocab: [{word:'眼鏡', read:'메가네', mean:'안경', type:'명사'}] }
                ] 
            },
            // [11]
            { 
                question: { 
                    jp: '両手の人差し指を置いてください。', kr: '양손 검지를 올려주세요.', romaji: 'Ryoute no hitosashiyubi o oite kudasai', 
                    vocab: [
                        {word:'両手', read:'료-테', mean:'양손', type:'명사'},
                        {word:'人差し指', read:'히토사시유비', mean:'검지', type:'명사'},
                        {word:'置く', read:'오쿠', mean:'두다/놓다', type:'동사'}
                    ] 
                },
                answers: [
                    { jp: 'ここですか？', kr: '여기요?', romaji: 'Koko desu ka?', vocab: [] },
                    { jp: '強く押したほうがいいですか？', kr: '세게 누르는 게 좋나요?', romaji: 'Tsuyoku oshita hou ga ii desu ka?', vocab: [{word:'強く', read:'츠요쿠', mean:'강하게/세게', type:'부사'}, {word:'押す', read:'오스', mean:'누르다', type:'동사'}] }
                ] 
            },
            // [12]
            { 
                question: { 
                    jp: 'カメラを見てください。', kr: '카메라를 봐주세요.', romaji: 'Kamera o mite kudasai', 
                    vocab: [
                        {word:'カメラ', read:'카메라', mean:'카메라', type:'명사'},
                        {word:'見る', read:'미루', mean:'보다', type:'동사'}
                    ] 
                },
                answers: [
                    { jp: 'はい。', kr: '네.', romaji: 'Hai', vocab: [] },
                    { jp: '動かないでください。', kr: '(심사관) 움직이지 마세요.', romaji: 'Ugokanaide kudasai', vocab: [{word:'動く', read:'우고쿠', mean:'움직이다', type:'동사'}] }
                ] 
            },
            // [13]
            { 
                question: { 
                    jp: '申告するものはありますか？', kr: '신고할 물건이 있습니까?', romaji: 'Shinkoku suru mono wa arimasu ka?', 
                    vocab: [
                        {word:'申告', read:'신코쿠', mean:'신고', type:'명사'},
                        {word:'もの', read:'모노', mean:'물건/것', type:'명사'}
                    ] 
                },
                answers: [
                    { jp: 'いいえ、ありません。', kr: '아뇨, 없습니다.', romaji: 'Iie, arimasen', vocab: [] },
                    { jp: 'タバコが2カートンあります。', kr: '담배가 2보루 있습니다.', romaji: 'Tabako ga ni-ka-ton arimasu', vocab: [{word:'タバコ', read:'타바코', mean:'담배', type:'명사'}, {word:'カートン', read:'카-톤', mean:'보루/카톤', type:'단위'}] }
                ] 
            },
            // [14]
            { 
                question: { 
                    jp: 'この荷物は誰のものですか？', kr: '이 짐은 누구 것입니까?', romaji: 'Kono nimotsu wa dare no mono desu ka?', 
                    vocab: [
                        {word:'荷物', read:'니모츠', mean:'짐/수하물', type:'명사'},
                        {word:'誰', read:'다레', mean:'누구', type:'대명사'}
                    ] 
                },
                answers: [
                    { jp: '全て私のものです。', kr: '전부 제 것입니다.', romaji: 'Subete watashi no mono desu', vocab: [{word:'全て', read:'스베테', mean:'전부/모두', type:'명사'}, {word:'私', read:'와타시', mean:'나/저', type:'대명사'}] },
                    { jp: '友人から頼まれたものです。', kr: '친구에게 부탁받은 것입니다.', romaji: 'Yuujin kara tanomareta mono desu', vocab: [{word:'頼む', read:'타노무', mean:'부탁하다', type:'동사'}] }
                ] 
            },
            // [15]
            { 
                question: { 
                    jp: '中身は何ですか？', kr: '내용물은 무엇입니까?', romaji: 'Nakami wa nan desu ka?', 
                    vocab: [{word:'中身', read:'나카미', mean:'내용물', type:'명사'}] 
                },
                answers: [
                    { jp: '服と洗面用具です。', kr: '옷과 세면도구입니다.', romaji: 'Fuku to senmenyougu desu', vocab: [{word:'服', read:'후쿠', mean:'옷', type:'명사'}, {word:'洗面用具', read:'센멘요-구', mean:'세면도구', type:'명사'}] },
                    { jp: 'お土産のお菓子です。', kr: '선물용 과자입니다.', romaji: 'Omiyage no okashi desu', vocab: [{word:'お土産', read:'오미야게', mean:'선물/기념품', type:'명사'}, {word:'お菓子', read:'오카시', mean:'과자', type:'명사'}] }
                ] 
            },
            // [16]
            { 
                question: { 
                    jp: '肉や果物は持っていますか？', kr: '고기나 과일은 가지고 있습니까?', romaji: 'Niku ya kudamono wa motte imasu ka?', 
                    vocab: [
                        {word:'肉', read:'니쿠', mean:'고기', type:'명사'},
                        {word:'果物', read:'쿠다모노', mean:'과일', type:'명사'},
                        {word:'持つ', read:'모츠', mean:'가지다', type:'동사'}
                    ] 
                },
                answers: [
                    { jp: '持っていません。', kr: '안 가지고 있습니다.', romaji: 'Motte imasen', vocab: [] },
                    { jp: 'カップラーメンがあります。', kr: '컵라면이 있습니다.', romaji: 'Kappura-men ga arimasu', vocab: [{word:'カップラーメン', read:'캅푸라-멘', mean:'컵라면', type:'명사'}] }
                ] 
            },
            // [17]
            { 
                question: { 
                    jp: 'トランクを開けてください。', kr: '트렁크(가방)를 열어주세요.', romaji: 'Toranku o akete kudasai', 
                    vocab: [
                        {word:'トランク', read:'토랑쿠', mean:'트렁크/가방', type:'명사'},
                        {word:'開ける', read:'아케루', mean:'열다', type:'동사'}
                    ] 
                },
                answers: [
                    { jp: 'はい、鍵を開けます。', kr: '네, 잠금을 풀게요.', romaji: 'Hai, kagi o akemasu', vocab: [{word:'鍵', read:'카기', mean:'열쇠/잠금', type:'명사'}] },
                    { jp: '下着が入っていますが…。', kr: '속옷이 들어있는데요...', romaji: 'Shitagi ga haitte imasuga...', vocab: [{word:'下着', read:'시타기', mean:'속옷', type:'명사'}, {word:'入る', read:'하이루', mean:'들어있다', type:'동사'}] }
                ] 
            },
            // [18]
            { 
                question: { 
                    jp: '乗り継ぎですか？', kr: '환승입니까?', romaji: 'Noritsugi desu ka?', 
                    vocab: [{word:'乗り継ぎ', read:'노리츠기', mean:'환승/경유', type:'명사'}] 
                },
                answers: [
                    { jp: 'はい、アメリカへ行きます。', kr: '네, 미국으로 갑니다.', romaji: 'Hai, amerika e ikimasu', vocab: [{word:'アメリカ', read:'아메리카', mean:'미국', type:'명사'}, {word:'行く', read:'이쿠', mean:'가다', type:'동사'}] },
                    { jp: 'いいえ、ここが最終目的地です。', kr: '아뇨, 여기가 최종 목적지입니다.', romaji: 'Iie, koko ga saishuumokutekichi desu', vocab: [{word:'最終', read:'사이슈-', mean:'최종', type:'명사'}, {word:'目的地', read:'모쿠테키치', mean:'목적지', type:'명사'}] }
                ] 
            },
            // [19]
            { 
                question: { 
                    jp: 'ビザはお持ちですか？', kr: '비자는 가지고 계신가요?', romaji: 'Biza wa omochi desu ka?', 
                    vocab: [{word:'ビザ', read:'비자', mean:'비자', type:'명사'}] 
                },
                answers: [
                    { jp: '観光ビザを持っています。', kr: '관광 비자를 가지고 있습니다.', romaji: 'Kankou biza o motte imasu', vocab: [] },
                    { jp: 'ノービザで来ました。', kr: '무비자로 왔습니다.', romaji: 'No-biza de kimashita', vocab: [{word:'ノービザ', read:'노-비자', mean:'무비자', type:'명사'}] }
                ] 
            },
            // [20]
            { 
                question: { 
                    jp: '日本語は話せますか？', kr: '일본어 할 수 있습니까?', romaji: 'Nihongo wa hanasemasu ka?', 
                    vocab: [
                        {word:'日本語', read:'니혼고', mean:'일본어', type:'명사'},
                        {word:'話す', read:'하나스', mean:'말하다', type:'동사'}
                    ] 
                },
                answers: [
                    { jp: '少しだけ話せます。', kr: '조금만 할 수 있어요.', romaji: 'Sukoshi dake hanasemasu', vocab: [{word:'少し', read:'스코시', mean:'조금', type:'부사'}] },
                    { jp: '英語でお願いします。', kr: '영어로 부탁합니다.', romaji: 'Eigo de onegaishimasu', vocab: [{word:'英語', read:'에이고', mean:'영어', type:'명사'}] }
                ] 
            },
            // [21]
            { 
                question: { 
                    jp: '入国カードの書き方がわかりません。', kr: '(역질문) 입국 카드 쓰는 법을 모르겠어요.', romaji: 'Nyuukoku ka-do no kakikata ga wakarimasen', 
                    vocab: [
                        {word:'書き方', read:'카키카타', mean:'쓰는 법', type:'명사'},
                        {word:'わかる', read:'와카루', mean:'알다', type:'동사'}
                    ] 
                },
                answers: [
                    { jp: '韓国語の様式はありますか？', kr: '한국어 양식은 있나요?', romaji: 'Kankokugo no youshiki wa arimasu ka?', vocab: [{word:'韓国語', read:'칸코쿠고', mean:'한국어', type:'명사'}, {word:'様式', read:'요-시키', mean:'양식/서식', type:'명사'}] },
                    { jp: 'ボールペンを貸してください。', kr: '볼펜 좀 빌려주세요.', romaji: 'Bo-rupen o kashite kudasai', vocab: [{word:'貸す', read:'카스', mean:'빌려주다', type:'동사'}] }
                ] 
            },
            // [22]
            { 
                question: { 
                    jp: '列を間違えましたか？', kr: '(역질문) 줄을 잘못 섰나요?', romaji: 'Retsu o machigaemashita ka?', 
                    vocab: [
                        {word:'列', read:'레츠', mean:'줄/열', type:'명사'},
                        {word:'間違える', read:'마치가에루', mean:'틀리다/실수하다', type:'동사'}
                    ] 
                },
                answers: [
                    { jp: '外国人はあちらです。', kr: '외국인은 저쪽입니다.', romaji: 'Gaikokujin wa achira desu', vocab: [{word:'外国人', read:'가이코쿠진', mean:'외국인', type:'명사'}] },
                    { jp: 'こちらに並んでください。', kr: '이쪽에 서 주세요.', romaji: 'Kochira ni narande kudasai', vocab: [{word:'並ぶ', read:'나라부', mean:'줄서다', type:'동사'}] }
                ] 
            },
            // [23]
            { 
                question: { 
                    jp: '荷物が出てきません。', kr: '(문제) 짐이 안 나와요.', romaji: 'Nimotsu ga dete kimasen', 
                    vocab: [{word:'出る', read:'데루', mean:'나오다', type:'동사'}] 
                },
                answers: [
                    { jp: '手荷物カウンターへ行ってください。', kr: '수하물 카운터로 가보세요.', romaji: 'Tenimotsu kaunta- e itte kudasai', vocab: [{word:'手荷物', read:'테니모츠', mean:'수하물', type:'명사'}, {word:'カウンター', read:'카운타-', mean:'카운터', type:'명사'}] },
                    { jp: '便名は何番ですか？', kr: '편명이 몇 번인가요?', romaji: 'Binmei wa nanban desu ka?', vocab: [{word:'便名', read:'빈메-', mean:'편명', type:'명사'}, {word:'何番', read:'난반', mean:'몇 번', type:'명사'}] }
                ] 
            },
            // [24]
            { 
                question: { 
                    jp: '出口はどこですか？', kr: '(역질문) 출구는 어디인가요?', romaji: 'Deguchi wa doko desu ka?', 
                    vocab: [{word:'出口', read:'데구치', mean:'출구', type:'명사'}] 
                },
                answers: [
                    { jp: 'あちらです。', kr: '저쪽입니다.', romaji: 'Achira desu', vocab: [{word:'あちら', read:'아치라', mean:'저쪽', type:'대명사'}] },
                    { jp: '税関を通ってからです。', kr: '세관을 통과한 후입니다.', romaji: 'Zeikan o tootte kara desu', vocab: [{word:'税関', read:'제-칸', mean:'세관', type:'명사'}, {word:'通る', read:'토-루', mean:'통하다/지나다', type:'동사'}] }
                ] 
            },
            // [25]
            { 
                question: { 
                    jp: 'Wi-Fiは使えますか？', kr: '(역질문) 와이파이 쓸 수 있나요?', romaji: 'Waifai wa tsukaemasu ka?', 
                    vocab: [{word:'使える', read:'츠카에루', mean:'쓸 수 있다', type:'동사'}] 
                },
                answers: [
                    { jp: 'フリーWi-Fiがあります。', kr: '무료 와이파이가 있습니다.', romaji: 'Furi- waifai ga arimasu', vocab: [{word:'フリー', read:'후리-', mean:'무료(free)', type:'명사'}] },
                    { jp: 'パスワードは不要です。', kr: '비밀번호는 필요 없습니다.', romaji: 'Pasuwa-do wa fuyou desu', vocab: [{word:'不要', read:'후요-', mean:'불필요', type:'명사'}] }
                ] 
            },
            // [26]
            { 
                question: { 
                    jp: 'トイレに行ってもいいですか？', kr: '(역질문) 화장실 가도 되나요?', romaji: 'Toire ni ittemo ii desu ka?', 
                    vocab: [{word:'トイレ', read:'토이레', mean:'화장실', type:'명사'}, {word:'行く', read:'이쿠', mean:'가다', type:'동사'}] 
                },
                answers: [
                    { jp: '審査が終わってからです。', kr: '심사가 끝난 후에요.', romaji: 'Shinsa ga owatte kara desu', vocab: [{word:'審査', read:'신사', mean:'심사', type:'명사'}, {word:'終わる', read:'오와루', mean:'끝나다', type:'동사'}] },
                    { jp: 'はい、急いでください。', kr: '네, 서둘러 주세요.', romaji: 'Hai, isoide kudasai', vocab: [{word:'急ぐ', read:'이소구', mean:'서두르다', type:'동사'}] }
                ] 
            },
            // [27]
            { 
                question: { 
                    jp: '審査に時間がかかりますか？', kr: '(역질문) 심사에 시간이 걸리나요?', romaji: 'Shinsa ni jikan ga kakarimasu ka?', 
                    vocab: [
                        {word:'時間', read:'지칸', mean:'시간', type:'명사'},
                        {word:'かかる', read:'카카루', mean:'걸리다', type:'동사'}
                    ] 
                },
                answers: [
                    { jp: '混んでいるので30分くらいです。', kr: '붐비고 있어서 30분 정도입니다.', romaji: 'Konde iru node sanjuppun kurai desu', vocab: [{word:'混む', read:'코무', mean:'붐비다', type:'동사'}, {word:'30分', read:'산쥽푼', mean:'30분', type:'명사'}] },
                    { jp: 'すぐ終わります。', kr: '금방 끝납니다.', romaji: 'Sugu owarimasu', vocab: [{word:'すぐ', read:'스구', mean:'곧/바로', type:'부사'}] }
                ] 
            },
            // [28]
            { 
                question: { 
                    jp: '別室へ来てください。', kr: '(문제) 별실로 와주세요.', romaji: 'Besshitsu e kite kudasai', 
                    vocab: [{word:'別室', read:'벳시츠', mean:'별실', type:'명사'}] 
                },
                answers: [
                    { jp: '私は何もしていません。', kr: '저는 아무것도 안 했습니다.', romaji: 'Watashi wa nanimo shite imasen', vocab: [{word:'何', read:'나니', mean:'무엇', type:'대명사'}] },
                    { jp: '通訳をお願いします。', kr: '통역을 부탁합니다.', romaji: 'Tsuuyaku o onegaishimasu', vocab: [{word:'通訳', read:'츠-야쿠', mean:'통역', type:'명사'}] }
                ] 
            },
            // [29]
            { 
                question: { 
                    jp: '連絡先はありますか？', kr: '연락처가 있습니까?', romaji: 'Renrakusaki wa arimasu ka?', 
                    vocab: [{word:'連絡先', read:'렌라쿠사키', mean:'연락처', type:'명사'}] 
                },
                answers: [
                    { jp: 'ホテルの電話番号です。', kr: '호텔 전화번호입니다.', romaji: 'Hoteru no denwabangou desu', vocab: [{word:'電話番号', read:'덴와반고-', mean:'전화번호', type:'명사'}] },
                    { jp: '日本の友人の番号です。', kr: '일본 친구 번호입니다.', romaji: 'Nihon no yuujin no bangou desu', vocab: [{word:'番号', read:'반고-', mean:'번호', type:'명사'}] }
                ] 
            },
            // [30]
            { 
                question: { 
                    jp: 'ようこそ日本へ。', kr: '일본에 오신 걸 환영합니다.', romaji: 'Youkoso Nihon e', 
                    vocab: [{word:'ようこそ', read:'요-코소', mean:'환영합니다', type:'인사'}] 
                },
                answers: [
                    { jp: 'ありがとうございます。', kr: '감사합니다.', romaji: 'Arigatou gozaimasu', vocab: [] },
                    { jp: 'お世話になります。', kr: '신세 지겠습니다(잘 부탁합니다).', romaji: 'Osewa ni narimasu', vocab: [{word:'世話', read:'세와', mean:'돌봄/신세', type:'명사'}] }
                ] 
            }
        ]
    }
};

// ==========================================
// 2. 상태 관리
// ==========================================
let currentConversationCategory = '';
let currentConversationIndex = 0;

// ==========================================
// 3. 렌더링 엔진 (Mobile Responsive + Vocab Tag)
// ==========================================
function initConversation() {
    const keys = Object.keys(conversationModuleData);
    if (keys.length > 0) currentConversationCategory = keys[0];
    renderNavigation();
    openConversationLesson(currentConversationCategory);
}

function renderNavigation() {
    const container = document.getElementById('conversation-content');
    if (!container) return;

    const navWrapper = document.createElement('div');
    navWrapper.className = 'sticky-nav-container';
    navWrapper.innerHTML = `
        <div class="flex overflow-x-auto no-scrollbar gap-2 px-4 md:justify-center w-full" id="category-scroll-area">
            ${Object.entries(conversationModuleData).map(([key, data]) => `
                <button onclick="openConversationLesson('${key}')" id="nav-btn-${key}"
                    class="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 active:scale-95 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 text-sm">
                    <i class="${data.icon}"></i><span class="font-bold whitespace-nowrap">${data.title}</span>
                </button>
            `).join('')}
        </div>`;

    const viewerDiv = document.createElement('div');
    viewerDiv.id = 'conversation-viewer';
    viewerDiv.className = 'w-full max-w-4xl mx-auto px-4 pb-24';
    container.innerHTML = '';
    container.appendChild(navWrapper);
    container.appendChild(viewerDiv);
}

function openConversationLesson(key) {
    currentConversationCategory = key;
    currentConversationIndex = 0;
    updateNavigationStyles(key);
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
// 핵심: 렌더링 로직 (품사 태그 추가)
// ------------------------------------------
function createFlipCardHTML(data, type, index, color) {
    const isQuestion = type === 'question';
    const uniqueId = isQuestion ? 'card-q' : `card-a-${index}`;

    // 단어장 HTML (품사 배지 포함)
    const vocabListHTML = data.vocab && data.vocab.length > 0
        ? `<div class="h-full flex flex-col">
            <div class="flex items-center gap-2 border-b border-gray-200 pb-2 mb-2">
                <i class="fas fa-book-reader text-${color}-500"></i>
                <span class="text-xs font-black text-gray-400 uppercase tracking-widest">Vocabulary</span>
            </div>
            <div class="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">
            ${data.vocab.map(v => `
                <div class="bg-white p-2.5 rounded-lg border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div class="flex items-center gap-2 mb-1 sm:mb-0">
                        ${v.type ? `<span class="text-[10px] bg-${color}-50 text-${color}-600 px-1.5 py-0.5 rounded font-bold border border-${color}-100 min-w-[30px] text-center">${v.type}</span>` : ''}
                        <span class="text-lg font-bold text-gray-800">${v.word}</span>
                        <span class="text-xs text-gray-400 font-mono">${v.read}</span>
                    </div>
                    <span class="text-sm text-gray-700 font-medium pl-1 sm:pl-0">${v.mean}</span>
                </div>
            `).join('')}
            </div>
           </div>`
        : `<div class="h-full flex flex-col items-center justify-center text-gray-300">
             <i class="fas fa-comment-slash text-3xl mb-2 opacity-30"></i>
             <span class="text-xs">추가 단어 없음</span>
           </div>`;

    // 카드 앞면
    const frontHTML = `
        <div class="absolute w-full h-full backface-hidden bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between overflow-hidden">
            <div class="px-5 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                 <span class="px-3 py-1 rounded-full ${isQuestion ? `bg-${color}-100 text-${color}-700` : 'bg-gray-200 text-gray-600'} text-[10px] font-black tracking-widest uppercase">
                    ${isQuestion ? 'Question' : `Answer ${index + 1}`}
                 </span>
                <span class="text-[10px] text-gray-400 font-bold"><i class="fas fa-sync-alt mr-1"></i>FLIP</span>
            </div>
            <div class="flex-1 flex flex-col justify-center px-4 space-y-4">
                <div class="text-2xl md:text-3xl font-black text-gray-800 leading-snug text-center break-keep select-none">${data.jp}</div>
                <div class="text-xs md:text-sm text-gray-400 font-medium text-center font-mono select-none">${data.romaji}</div>
                <div class="w-8 h-1 bg-${color}-100 mx-auto rounded-full"></div>
                <div class="text-lg md:text-xl text-${color}-600 font-bold text-center break-keep select-none">${data.kr}</div>
            </div>
            <div class="px-4 py-3 bg-gray-50 border-t border-gray-100 flex gap-2 justify-center" onclick="event.stopPropagation()">
                <button onclick="AudioController.playNormal(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 text-xs flex flex-col items-center justify-center gap-1"><i class="fas fa-volume-up"></i>듣기</button>
                <button onclick="AudioController.playSlowRepeat(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 text-xs flex flex-col items-center justify-center gap-1"><i class="fas fa-history"></i>3회</button>
                <button onclick="AudioController.playShadowing(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 text-xs flex flex-col items-center justify-center gap-1"><i class="fas fa-microphone-alt"></i>쉐도잉</button>
            </div>
        </div>`;

    // 카드 뒷면
    const backHTML = `
        <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-50 rounded-3xl border-2 border-${color}-100 shadow-inner flex flex-col overflow-hidden">
             <div class="flex-1 p-4 overflow-hidden relative">${vocabListHTML}</div>
             <div class="py-3 bg-white border-t border-gray-200 text-center cursor-pointer hover:bg-gray-50" onclick="event.stopPropagation(); toggleCardFlip('${uniqueId}')">
                <span class="text-xs font-bold text-gray-500 uppercase tracking-widest"><i class="fas fa-undo mr-1"></i>Return</span>
             </div>
        </div>`;

    return `<div class="perspective-1000 w-full mb-8 select-none group" onclick="toggleCardFlip('${uniqueId}')">
        <div id="${uniqueId}" class="card-inner relative w-full min-h-[450px] md:min-h-[500px] transform-style-3d shadow-lg rounded-3xl hover:shadow-xl transition-all duration-500 bg-white">${frontHTML}${backHTML}</div>
    </div>`;
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
                <span class="truncate max-w-[200px]">${convData.title}</span>
                <span class="text-sm text-gray-400 font-normal ml-1">(${currentConversationIndex + 1}/${convData.conversations.length})</span>
            </h3>
            <div class="flex gap-2">
                <button id="conv-prev-btn" onclick="previousConversation()" class="w-10 h-10 rounded-full bg-white border border-gray-200 shadow text-gray-400 hover:text-gray-800 flex items-center justify-center"><i class="fas fa-arrow-left"></i></button>
                <button id="conv-next-btn" onclick="nextConversation()" class="w-10 h-10 rounded-full bg-black shadow-lg text-white hover:bg-gray-800 flex items-center justify-center"><i class="fas fa-arrow-right"></i></button>
            </div>
        </div>
        <div class="space-y-6 animate-fade-in">
            ${createFlipCardHTML(currentConv.question, 'question', 0, convData.color)}
            <div class="relative pl-4 border-l-2 border-dashed border-gray-200 space-y-8">
                ${currentConv.answers.map((ans, idx) => createFlipCardHTML(ans, 'answer', idx, convData.color)).join('')}
            </div>
        </div>`;
    updateNavigationButtons();
}

function toggleCardFlip(id) { document.getElementById(id)?.parentElement.classList.toggle('card-flipped'); }

// Audio & Nav
const AudioController = {
    speechSynth: window.speechSynthesis,
    speak: function (text, rate = 1.0) {
        return new Promise((resolve) => {
            if (this.speechSynth.speaking) this.speechSynth.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ja-JP'; utterance.rate = rate;
            const voices = this.speechSynth.getVoices();
            const jaVoice = voices.find(v => v.lang === 'ja-JP') || voices[0];
            if(jaVoice) utterance.voice = jaVoice;
            utterance.onend = resolve; utterance.onerror = resolve;
            this.speechSynth.speak(utterance);
        });
    },
    wait: ms => new Promise(r => setTimeout(r, ms)),
    playNormal: async function(t) { this.speechSynth.cancel(); await this.speak(t, 1.0); },
    playSlowRepeat: async function(t) { this.speechSynth.cancel(); for(let i=0;i<3;i++){ await this.speak(t,0.7); await this.wait(600); } },
    playShadowing: async function(t) { this.speechSynth.cancel(); await this.speak(t,0.7); await this.wait(1500); await this.speak(t,1.0); }
};

function updateNavigationButtons() {
    const conv = conversationModuleData[currentConversationCategory];
    const prev = document.getElementById('conv-prev-btn');
    const next = document.getElementById('conv-next-btn');
    if(prev) { prev.disabled = currentConversationIndex===0; prev.style.opacity = currentConversationIndex===0?'0.3':'1'; }
    if(next && conv) { 
        const isLast = currentConversationIndex === conv.conversations.length - 1;
        next.disabled = isLast; 
        next.innerHTML = isLast ? '<i class="fas fa-check"></i>' : '<i class="fas fa-arrow-right"></i>';
        next.className = isLast ? 'w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center cursor-not-allowed' : `w-10 h-10 rounded-full bg-${conv.color}-500 shadow-lg text-white flex items-center justify-center`;
    }
}
function previousConversation() { if(currentConversationIndex>0) { currentConversationIndex--; displayCurrentConversation(); window.scrollTo({top:0,behavior:'smooth'}); } }
function nextConversation() { if(currentConversationIndex<conversationModuleData[currentConversationCategory].conversations.length-1) { currentConversationIndex++; displayCurrentConversation(); window.scrollTo({top:0,behavior:'smooth'}); } }

document.addEventListener('DOMContentLoaded', () => { if(document.getElementById('conversation-content')) initConversation(); });
