/**
 * conversation.js - Final Ultimate Edition Ver 7.0
 * Features: 
 * 1. 10 Categories (Immigration to Business)
 * 2. Advanced Auto-Play: JP(1x) -> KR(1.2x) -> Pause -> Repeat 3x -> Next Sentence -> Next Card
 * 3. Dynamic Masonry Layout for Vocabulary
 * 4. Mobile Optimized Sticky Navigation
 */

// ==========================================
// 0. 스타일 정의 (UI & Animation)
// ==========================================
(function injectStyles() {
    const oldStyle = document.getElementById('conversation-styles');
    if (oldStyle) oldStyle.remove();

    const css = `
        /* 3D Flip & Card Styles */
       .perspective-1000 { perspective: 1000px; }
       .transform-style-3d { transform-style: preserve-3d; }
       .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
       .rotate-y-180 { transform: rotateY(180deg); }
       .card-inner { transition: transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1); }
       .card-flipped.card-inner { transform: rotateY(180deg); }
        
        /* Sticky Navigation Bar */
       .sticky-nav-container {
            position: sticky; top: 0; z-index: 999;
            background: rgba(255, 255, 255, 0.96);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid #e5e7eb;
            padding: 10px 0; margin-bottom: 20px; width: 100%;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        /* Auto Play Button Active State */
       .btn-auto-active {
            background-color: #ef4444!important; /* Red-500 */
            color: white!important;
            border-color: #ef4444!important;
            animation: pulse-red 2s infinite;
        }
        @keyframes pulse-red { 
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        /* Vocabulary Grid (Masonry) */
       .vocab-grid { display: flex; flex-wrap: wrap; gap: 8px; align-content: flex-start; }
       .vocab-item {
            flex: 1 1 auto; min-width: 110px; max-width: 100%;
            display: flex; flex-direction: column; justify-content: space-between;
        }

        /* Utilities */
       .no-scrollbar::-webkit-scrollbar { display: none; }
       .custom-scrollbar::-webkit-scrollbar { width: 4px; }
       .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
       .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
       .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        /* Current Playing Highlight */
       .playing-highlight { border: 2px solid #3b82f6; background-color: #eff6ff; transform: scale(1.02); transition: all 0.3s; }
    `;
    const style = document.createElement('style');
    style.id = 'conversation-styles';
    style.textContent = css;
    document.head.appendChild(style);
})();

// ==========================================
// 1. 데이터 (10개 카테고리 × 대규모 데이터)
// ==========================================
const conversationModuleData = {
    'immigration': {
        title: '입국 심사', icon: 'fas fa-passport', color: 'blue',
        conversations: [
            { question: { jp: 'パスポートを見せてください。', kr: '여권을 보여주세요.', romaji: 'Pasupooto o misete kudasai.', vocab: [{word:'パスポート', read:'파스포-토', mean:'여권', type:'명사'}, {word:'見せる', read:'미세루', mean:'보여주다', type:'동사'}] },
              answers: [{ jp: 'はい、どうぞ。', kr: '네, 여기 있습니다.', romaji: 'Hai, douzo.', vocab: [{word:'どうぞ', read:'도-조', mean:'여기요', type:'표현'}] }, { jp: '入国カードもここにあります。', kr: '입국 카드도 여기 있습니다.', romaji: 'Nyuukoku kaado mo koko ni arimasu.', vocab: [{word:'入国', read:'뉴-코쿠', mean:'입국', type:'명사'}] }] },
            { question: { jp: '訪問の目的は何ですか？', kr: '방문 목적은 무엇입니까?', romaji: 'Houmon no mokuteki wa nan desu ka?', vocab: [{word:'訪問', read:'호-몬', mean:'방문', type:'명사'}, {word:'目的', read:'모쿠테키', mean:'목적', type:'명사'}] },
              answers: [{ jp: '観光です。', kr: '관광입니다.', romaji: 'Kankou desu.', vocab: [{word:'観光', read:'칸코-', mean:'관광', type:'명사'}] }, { jp: '仕事で来ました。', kr: '일 때문에 왔습니다.', romaji: 'Shigoto de kimashita.', vocab: [{word:'仕事', read:'시고토', mean:'일', type:'명사'}] }] },
            { question: { jp: 'どのくらい滞在しますか？', kr: '얼마나 체류합니까?', romaji: 'Dono kurai taizai shimasu ka?', vocab: [{word:'滞在', read:'타이자이', mean:'체류', type:'명사'}] },
              answers: [{ jp: '一週間です。', kr: '일주일입니다.', romaji: 'Isshuukan desu.', vocab: [{word:'一週間', read:'잇슈-칸', mean:'일주일', type:'명사'}] }, { jp: '3泊4日です。', kr: '3박 4일입니다.', romaji: 'Sanpaku yokka desu.', vocab: [{word:'泊', read:'하쿠', mean:'박', type:'단위'}] }] },
            { question: { jp: 'どこに泊まりますか？', kr: '어디에 묵습니까?', romaji: 'Doko ni tomarimasu ka?', vocab: [{word:'泊まる', read:'토마루', mean:'묵다', type:'동사'}] },
              answers: }, { jp: '友人の家です。', kr: '친구 집입니다.', romaji: 'Yuujin no ie desu.', vocab: [{word:'友人', read:'유-진', mean:'친구', type:'명사'}] }] },
            { question: { jp: '帰りのチケットはありますか？', kr: '돌아가는 티켓은 있습니까?', romaji: 'Kaeri no chiketto wa arimasu ka?', vocab: [{word:'帰り', read:'카에리', mean:'귀국', type:'명사'}] },
              answers: [{ jp: 'はい、これです。', kr: '네, 이겁니다.', romaji: 'Hai, kore desu.', vocab: }, { jp: 'スマホに入っています。', kr: '스마트폰에 들어있습니다.', romaji: 'Sumaho ni haitte imasu.', vocab: [{word:'入る', read:'하이루', mean:'들어있다', type:'동사'}] }] },
            { question: { jp: '指紋を登録してください。', kr: '지문을 등록해주세요.', romaji: 'Shimon o touroku shite kudasai.', vocab: [{word:'指紋', read:'시몬', mean:'지문', type:'명사'}] },
              answers: [{ jp: '人差し指ですか？', kr: '검지손가락인가요?', romaji: 'Hitosashiyubi desu ka?', vocab: [{word:'人差し指', read:'히토사시유비', mean:'검지', type:'명사'}] }, { jp: 'こうですか？', kr: '이렇게요?', romaji: 'Kou desu ka?', vocab: }] },
            { question: { jp: 'マスクを外してください。', kr: '마스크를 벗어주세요.', romaji: 'Masuku o hazushite kudasai.', vocab: [{word:'外す', read:'하즈스', mean:'벗다', type:'동사'}] },
              answers: [{ jp: 'はい、わかりました。', kr: '네, 알겠습니다.', romaji: 'Hai, wakarimashita.', vocab: }, { jp: '眼鏡もですか？', kr: '안경도요?', romaji: 'Megane mo desu ka?', vocab: [{word:'眼鏡', read:'메가네', mean:'안경', type:'명사'}] }] },
            { question: { jp: '申告するものはありますか？', kr: '신고할 물건이 있습니까?', romaji: 'Shinkoku suru mono wa arimasu ka?', vocab: [{word:'申告', read:'신코쿠', mean:'신고', type:'명사'}] },
              answers: [{ jp: 'いいえ、ありません。', kr: '아뇨, 없습니다.', romaji: 'Iie, arimasen.', vocab: }, { jp: 'タバコが2カートンあります。', kr: '담배 2보루 있습니다.', romaji: 'Tabako ga ni-kaaton arimasu.', vocab: [{word:'タバコ', read:'타바코', mean:'담배', type:'명사'}] }] }
        ]
    },
    'transportation': {
        title: '교통', icon: 'fas fa-subway', color: 'green',
        conversations: [
            { question: { jp: '駅はどこですか？', kr: '역은 어디입니까?', romaji: 'Eki wa doko desu ka?', vocab: [{word:'駅', read:'에키', mean:'역', type:'명사'}] },
              answers: [{ jp: 'まっすぐ行ってください。', kr: '쭉 가세요.', romaji: 'Massugu itte kudasai.', vocab: [{word:'まっすぐ', read:'맛스구', mean:'똑바로', type:'부사'}] }, { jp: 'あの信号を右です。', kr: '저 신호를 오른쪽입니다.', romaji: 'Ano shingou o migi desu.', vocab: [{word:'信号', read:'신고-', mean:'신호', type:'명사'}] }] },
            { question: { jp: 'この電車は新宿に行きますか？', kr: '이 전철은 신주쿠에 갑니까?', romaji: 'Kono densha wa Shinjuku ni ikimasu ka?', vocab: [{word:'電車', read:'덴샤', mean:'전철', type:'명사'}] },
              answers: [{ jp: 'はい、行きます。', kr: '네, 갑니다.', romaji: 'Hai, ikimasu.', vocab: }, { jp: '反対側のホームです。', kr: '반대편 승강장입니다.', romaji: 'Hantaigawa no hoomu desu.', vocab: [{word:'反対', read:'한타이', mean:'반대', type:'명사'}] }] },
            { question: { jp: '切符売り場はどこですか？', kr: '매표소는 어디입니까?', romaji: 'Kippu uriba wa doko desu ka?', vocab: [{word:'切符', read:'킵푸', mean:'표', type:'명사'}, {word:'売り場', read:'우리바', mean:'매장', type:'명사'}] },
              answers: [{ jp: '改札の隣です。', kr: '개찰구 옆입니다.', romaji: 'Kaisatsu no tonari desu.', vocab: [{word:'改札', read:'카이사츠', mean:'개찰구', type:'명사'}] }, { jp: 'あそこです。', kr: '저기입니다.', romaji: 'Asoko desu.', vocab: }] },
            { question: { jp: '渋谷までいくらですか？', kr: '시부야까지 얼마입니까?', romaji: 'Shibuya made ikura desu ka?', vocab: [{word:'いくら', read:'이쿠라', mean:'얼마', type:'대명사'}] },
              answers: [{ jp: '200円です。', kr: '200엔입니다.', romaji: 'Nihyaku-en desu.', vocab: }, { jp: '路線図を見てください。', kr: '노선도를 봐주세요.', romaji: 'Rosenzu o mite kudasai.', vocab: [{word:'路線図', read:'로센즈', mean:'노선도', type:'명사'}] }] },
            { question: { jp: 'タクシー乗り場はどこですか？', kr: '택시 승강장은 어디입니까?', romaji: 'Takushii noriba wa doko desu ka?', vocab: [{word:'乗り場', read:'노리바', mean:'타는 곳', type:'명사'}] },
              answers: [{ jp: '北口にあります。', kr: '북쪽 출구에 있습니다.', romaji: 'Kitaguchi ni arimasu.', vocab: [{word:'北口', read:'키타구치', mean:'북쪽 출구', type:'명사'}] }, { jp: 'ロータリーの向こうです。', kr: '로터리 건너편입니다.', romaji: 'Rootarii no mukou desu.', vocab: [{word:'向こう', read:'무코-', mean:'건너편', type:'명사'}] }] }
        ]
    },
    'hotel': {
        title: '호텔', icon: 'fas fa-bed', color: 'indigo',
        conversations: [
            { question: { jp: 'チェックインをお願いします。', kr: '체크인을 부탁합니다.', romaji: 'Chekkuin o onegaishimasu.', vocab: [{word:'チェックイン', read:'체킨', mean:'체크인', type:'명사'}] },
              answers: [{ jp: 'お名前をいただけますか？', kr: '성함을 알려주시겠습니까?', romaji: 'Onamae o itadakemasu ka?', vocab: }, { jp: 'パスポートをお預かりします。', kr: '여권을 잠시 맡겠습니다.', romaji: 'Pasupooto o oazukari shimasu.', vocab: [{word:'預かる', read:'아즈카루', mean:'맡다', type:'동사'}] }] },
            { question: { jp: '荷物を預かってもらえますか？', kr: '짐을 맡아주실 수 있나요?', romaji: 'Nimotsu o azukatte moraemasu ka?', vocab: [{word:'荷物', read:'니모츠', mean:'짐', type:'명사'}] },
              answers: [{ jp: 'はい、もちろんです。', kr: '네, 물론입니다.', romaji: 'Hai, mochiron desu.', vocab: }, { jp: 'チェックアウト後も可能です。', kr: '체크아웃 후에도 가능합니다.', romaji: 'Chekkuauto go mo kanou desu.', vocab: [{word:'可能', read:'카노-', mean:'가능', type:'명사'}] }] },
            { question: { jp: 'Wi-Fiのパスワードは何ですか？', kr: '와이파이 비번이 뭔가요?', romaji: 'Waifai no pasuwaado wa nan desu ka?', vocab: },
              answers: [{ jp: 'カードキーに書いてあります。', kr: '카드키에 적혀 있습니다.', romaji: 'Kaadokii ni kaite arimasu.', vocab: [{word:'書く', read:'카쿠', mean:'쓰다', type:'동사'}] }, { jp: '部屋のテレビを見てください。', kr: '방의 TV를 봐주세요.', romaji: 'Heya no terebi o mite kudasai.', vocab: }] },
            { question: { jp: '朝食は何時からですか？', kr: '조식은 몇 시부터입니까?', romaji: 'Choushoku wa nanji kara desu ka?', vocab: [{word:'朝食', read:'쵸-쇼쿠', mean:'조식', type:'명사'}] },
              answers: }, { jp: '1階のレストランです。', kr: '1층 레스토랑입니다.', romaji: 'Ikkai no resutoran desu.', vocab: [{word:'階', read:'카이', mean:'층', type:'단위'}] }] }
        ]
    },
    'restaurant': {
        title: '식당', icon: 'fas fa-utensils', color: 'orange',
        conversations: [
            { question: { jp: '何名様ですか？', kr: '몇 분이십니까?', romaji: 'Nanmeisama desu ka?', vocab: [{word:'何名', read:'난메-', mean:'몇 명', type:'명사'}] },
              answers: [{ jp: '2人です。', kr: '2명입니다.', romaji: 'Futari desu.', vocab: [{word:'2人', read:'후타리', mean:'두 명', type:'명사'}] }, { jp: '4人ですが席はありますか？', kr: '4명인데 자리 있나요?', romaji: 'Yonin desu ga seki wa arimasu ka?', vocab: [{word:'席', read:'세키', mean:'자리', type:'명사'}] }] },
            { question: { jp: 'ご注文はお決まりですか？', kr: '주문하시겠습니까?', romaji: 'Gochuumon wa okimari desu ka?', vocab: [{word:'注文', read:'츄-몬', mean:'주문', type:'명사'}, {word:'決まる', read:'키마루', mean:'정해지다', type:'동사'}] },
              answers: [{ jp: 'これをお願いします。', kr: '이거 부탁합니다.', romaji: 'Kore o onegaishimasu.', vocab: }, { jp: 'おすすめは何ですか？', kr: '추천 메뉴는 무엇입니까?', romaji: 'Osusume wa nan desu ka?', vocab: [{word:'おすすめ', read:'오스스메', mean:'추천', type:'명사'}] }] },
            { question: { jp: 'お水をください。', kr: '물 좀 주세요.', romaji: 'Omizu o kudasai.', vocab: [{word:'水', read:'미즈', mean:'물', type:'명사'}] },
              answers: [{ jp: 'はい、少々お待ちください。', kr: '네, 잠시만 기다려주세요.', romaji: 'Hai, shoushou omachi kudasai.', vocab: [{word:'少々', read:'쇼-쇼-', mean:'잠시/조금', type:'부사'}] }, { jp: 'セルフサービスです。', kr: '셀프 서비스입니다.', romaji: 'Serufusaabisu desu.', vocab: }] },
            { question: { jp: 'お会計をお願いします。', kr: '계산 부탁합니다.', romaji: 'Okaikei o onegaishimasu.', vocab: [{word:'会計', read:'카이케-', mean:'계산', type:'명사'}] },
              answers: [{ jp: 'ご一緒ですか？', kr: '같이 계산하시나요?', romaji: 'Goissho desu ka?', vocab: [{word:'一緒', read:'잇쇼', mean:'함께', type:'명사'}] }, { jp: '別々にお願いします。', kr: '따로따로 부탁합니다.', romaji: 'Betsubetsu ni onegaishimasu.', vocab: [{word:'別々', read:'베츠베츠', mean:'따로따로', type:'명사'}] }] }
        ]
    },
    'shopping': {
        title: '쇼핑', icon: 'fas fa-shopping-bag', color: 'pink',
        conversations: [
            { question: { jp: 'これはいくらですか？', kr: '이것은 얼마입니까?', romaji: 'Kore wa ikura desu ka?', vocab: [{word:'いくら', read:'이쿠라', mean:'얼마', type:'대명사'}] },
              answers: [{ jp: '税込みで2000円です。', kr: '세금 포함 2000엔입니다.', romaji: 'Zeikomi de nisen-en desu.', vocab: [{word:'税込', read:'제이코미', mean:'세금포함', type:'명사'}] }, { jp: 'セールで半額です。', kr: '세일이라 반값입니다.', romaji: 'Seeru de hangaku desu.', vocab: [{word:'半額', read:'한가쿠', mean:'반값', type:'명사'}] }] },
            { question: { jp: '試着してもいいですか？', kr: '입어봐도 됩니까?', romaji: 'Shichaku shitemo ii desu ka?', vocab: [{word:'試着', read:'시챠쿠', mean:'시착', type:'명사'}] },
              answers: [{ jp: 'はい、どうぞ。', kr: '네, 하세요.', romaji: 'Hai, douzo.', vocab: }, { jp: '試着室はこちらです。', kr: '탈의실은 이쪽입니다.', romaji: 'Shichakushitsu wa kochira desu.', vocab: [{word:'試着室', read:'시챠쿠시츠', mean:'탈의실', type:'명사'}] }] },
            { question: { jp: '免税になりますか？', kr: '면세 됩니까?', romaji: 'Menzei ni narimasu ka?', vocab: [{word:'免税', read:'멘제-', mean:'면세', type:'명사'}] },
              answers: [{ jp: 'パスポートを見せてください。', kr: '여권을 보여주세요.', romaji: 'Pasupooto o misete kudasai.', vocab: }, { jp: '5000円以上で可能です。', kr: '5000엔 이상이면 가능합니다.', romaji: 'Gosen-en ijou de kanou desu.', vocab: [{word:'以上', read:'이죠-', mean:'이상', type:'명사'}] }] },
            { question: { jp: '新しいものはありますか？', kr: '새것은 있습니까?', romaji: 'Atarashii mono wa arimasu ka?', vocab: [{word:'新しい', read:'아타라시-', mean:'새롭다', type:'형용사'}] },
              answers: [{ jp: '在庫を確認します。', kr: '재고를 확인하겠습니다.', romaji: 'Zaiko o kakunin shimasu.', vocab: [{word:'在庫', read:'자이코', mean:'재고', type:'명사'}] }, { jp: '現品限りです。', kr: '진열 상품이 전부입니다.', romaji: 'Genpinkagiri desu.', vocab: [{word:'現品', read:'겐핀', mean:'현품', type:'명사'}] }] }
        ]
    },
    'medical': {
        title: '의료', icon: 'fas fa-hospital', color: 'red',
        conversations: },
              answers: [{ jp: '頭が痛いです。', kr: '머리가 아픕니다.', romaji: 'Atama ga itai desu.', vocab: [{word:'頭', read:'아타마', mean:'머리', type:'명사'}, {word:'痛い', read:'이타이', mean:'아프다', type:'형용사'}] }, { jp: '熱があります。', kr: '열이 있습니다.', romaji: 'Netsu ga arimasu.', vocab: [{word:'熱', read:'네츠', mean:'열', type:'명사'}] }] },
            { question: { jp: 'いつからですか？', kr: '언제부터입니까?', romaji: 'Itsu kara desu ka?', vocab: [{word:'いつ', read:'이츠', mean:'언제', type:'대명사'}] },
              answers: [{ jp: '昨日からです。', kr: '어제부터입니다.', romaji: 'Kinou kara desu.', vocab: [{word:'昨日', read:'키노-', mean:'어제', type:'명사'}] }, { jp: '今朝からです。', kr: '오늘 아침부터입니다.', romaji: 'Kesa kara desu.', vocab: [{word:'今朝', read:'케사', mean:'오늘아침', type:'명사'}] }] },
            { question: { jp: '薬のアレルギーはありますか？', kr: '약 알레르기 있습니까?', romaji: 'Kusuri no arerugii wa arimasu ka?', vocab: [{word:'薬', read:'쿠스리', mean:'약', type:'명사'}] },
              answers: }, { jp: '抗生物質がダメです。', kr: '항생제가 안 됩니다.', romaji: 'Kouseibusshitsu ga dame desu.', vocab: [{word:'抗生物質', read:'코-세-붓시츠', mean:'항생제', type:'명사'}] }] }
        ]
    },
    'bank_post': {
        title: '금융/우편', icon: 'fas fa-university', color: 'slate',
        conversations: },
              answers: [{ jp: '円からウォンですか？', kr: '엔에서 원으로입니까?', romaji: 'En kara won desu ka?', vocab: }, { jp: 'パスポートが必要です。', kr: '여권이 필요합니다.', romaji: 'Pasupooto ga hitsuyou desu.', vocab: [{word:'必要', read:'히츠요-', mean:'필요', type:'명사'}] }] },
            { question: { jp: 'ATMはどこですか？', kr: 'ATM은 어디입니까?', romaji: 'Ee-tii-emu wa doko desu ka?', vocab: },
              answers: [{ jp: 'あちらにあります。', kr: '저쪽에 있습니다.', romaji: 'Achira ni arimasu.', vocab: }, { jp: 'コンビニにあります。', kr: '편의점에 있습니다.', romaji: 'Konbini ni arimasu.', vocab: [{word:'コンビニ', read:'콘비니', mean:'편의점', type:'명사'}] }] },
            { question: { jp: 'これを送りたいです。', kr: '이것을 보내고 싶습니다.', romaji: 'Kore o okuritai desu.', vocab: [{word:'送る', read:'오쿠루', mean:'보내다', type:'동사'}] },
              answers: [{ jp: '中身は何ですか？', kr: '내용물은 무엇입니까?', romaji: 'Nakami wa nan desu ka?', vocab: [{word:'中身', read:'나카미', mean:'내용물', type:'명사'}] }, { jp: '船便ですか、航空便ですか？', kr: '선편입니까, 항공편입니까?', romaji: 'Funabin desu ka, koukuubin desu ka?', vocab: [{word:'船便', read:'후나빈', mean:'선편', type:'명사'}] }] }
        ]
    },
    'emergency': {
        title: '긴급', icon: 'fas fa-exclamation-triangle', color: 'red',
        conversations: },
              answers: }, { jp: '警察を呼びますか？', kr: '경찰을 부를까요?', romaji: 'Keisatsu o yobimasu ka?', vocab: [{word:'警察', read:'케이사츠', mean:'경찰', type:'명사'}, {word:'呼ぶ', read:'요부', mean:'부르다', type:'동사'}] }] },
            { question: { jp: '財布をなくしました。', kr: '지갑을 잃어버렸습니다.', romaji: 'Saifu o nakushimashita.', vocab: [{word:'財布', read:'사이후', mean:'지갑', type:'명사'}, {word:'なくす', read:'나쿠스', mean:'잃어버리다', type:'동사'}] },
              answers: [{ jp: '交番に行きましょう。', kr: '파출소에 갑시다.', romaji: 'Kouban ni ikimashou.', vocab: [{word:'交番', read:'코-반', mean:'파출소', type:'명사'}] }, { jp: 'どんな財布ですか？', kr: '어떤 지갑입니까?', romaji: 'Donna saifu desu ka?', vocab: }] },
            { question: { jp: '救急車を呼んでください。', kr: '구급차를 불러주세요.', romaji: 'Kyuukyuusha o yonde kudasai.', vocab: [{word:'救急車', read:'큐-큐-샤', mean:'구급차', type:'명사'}] },
              answers: [{ jp: '今呼びました。', kr: '지금 불렀습니다.', romaji: 'Ima yobimashita.', vocab: }, { jp: 'ここで待っていてください。', kr: '여기서 기다려주세요.', romaji: 'Koko de matte ite kudasai.', vocab: [{word:'待つ', read:'마츠', mean:'기다리다', type:'동사'}] }] }
        ]
    },
    'social': {
        title: '사교', icon: 'fas fa-user-friends', color: 'yellow',
        conversations: [
            { question: { jp: '初めまして。', kr: '처음 뵙겠습니다.', romaji: 'Hajimemashite.', vocab: [{word:'初めまして', read:'하지메마시테', mean:'처음뵙겠습니다', type:'인사'}] },
              answers: }, { jp: 'お会いできて嬉しいです。', kr: '만나서 반갑습니다.', romaji: 'Oai dekite ureshii desu.', vocab: [{word:'嬉しい', read:'우레시-', mean:'기쁘다', type:'형용사'}] }] },
            { question: { jp: '趣味は何ですか？', kr: '취미가 뭡니까?', romaji: 'Shumi wa nan desu ka?', vocab: [{word:'趣味', read:'슈미', mean:'취미', type:'명사'}] },
              answers: [{ jp: '映画鑑賞です。', kr: '영화 감상입니다.', romaji: 'Eiga kanshou desu.', vocab: [{word:'映画', read:'에이가', mean:'영화', type:'명사'}] }, { jp: '旅行が好きです。', kr: '여행을 좋아합니다.', romaji: 'Ryokou ga suki desu.', vocab: [{word:'旅行', read:'료코-', mean:'여행', type:'명사'}] }] },
            { question: { jp: '連絡先を教えてもらえますか？', kr: '연락처 알려주실 수 있나요?', romaji: 'Renrakusaki o oshiete moraemasu ka?', vocab: [{word:'連絡先', read:'렌라쿠사키', mean:'연락처', type:'명사'}] },
              answers: }, { jp: 'これが私の名刺です。', kr: '이게 제 명함입니다.', romaji: 'Kore ga watashi no meishi desu.', vocab: [{word:'名刺', read:'메이시', mean:'명함', type:'명사'}] }] }
        ]
    },
    'business': {
        title: '비즈니스', icon: 'fas fa-briefcase', color: 'gray',
        conversations: [
            { question: { jp: '名刺交換をお願いします。', kr: '명함 교환 부탁드립니다.', romaji: 'Meishi koukan o onegaishimasu.', vocab: [{word:'名刺', read:'메이시', mean:'명함', type:'명사'}, {word:'交換', read:'코-칸', mean:'교환', type:'명사'}] },
              answers: [{ jp: '頂戴いたします。', kr: '잘 받겠습니다(겸양).', romaji: 'Choudai itashimasu.', vocab: [{word:'頂戴', read:'쵸-다이', mean:'받음', type:'겸양'}] }, { jp: '申し遅れました。', kr: '인사가 늦었습니다.', romaji: 'Moushiokuremashita.', vocab: [{word:'申し遅れる', read:'모-시오쿠레루', mean:'인사가 늦다', type:'겸양'}] }] },
            { question: { jp: 'お世話になります。', kr: '신세 지겠습니다(인사).', romaji: 'Osewa ni narimasu.', vocab: [{word:'世話', read:'세와', mean:'신세/돌봄', type:'명사'}] },
              answers: [{ jp: 'こちらこそ。', kr: '저야말로요.', romaji: 'Kochira koso.', vocab: }, { jp: '今後ともよろしくお願いします。', kr: '앞으로도 잘 부탁드립니다.', romaji: 'Kongo tomo yoroshiku onegaishimasu.', vocab: [{word:'今後', read:'콘고', mean:'금후/앞으로', type:'명사'}] }] },
            { question: { jp: '会議は何時からですか？', kr: '회의는 몇 시부터입니까?', romaji: 'Kaigi wa nanji kara desu ka?', vocab: [{word:'会議', read:'카이기', mean:'회의', type:'명사'}] },
              answers: }, { jp: '会議室に集まってください。', kr: '회의실에 모여주세요.', romaji: 'Kaigishitsu ni atsumatte kudasai.', vocab: [{word:'集まる', read:'아츠마루', mean:'모이다', type:'동사'}] }] }
        ]
    }
};

// ==========================================
// 2. 상태 관리 및 초기화
// ==========================================
let currentConversationCategory = '';
let currentConversationIndex = 0;

function initConversation() {
    const keys = Object.keys(conversationModuleData);
    if (keys.length > 0) currentConversationCategory = keys;
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
        <div class="flex items-center justify-between px-4 mb-2 w-full max-w-4xl mx-auto">
            <div class="flex-1 overflow-x-auto no-scrollbar flex gap-2" id="category-scroll-area">
                ${Object.entries(conversationModuleData).map(([key, data]) => `
                    <button onclick="openConversationLesson('${key}')" id="nav-btn-${key}"
                        class="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 active:scale-95 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 text-sm shadow-sm">
                        <i class="${data.icon}"></i><span class="font-bold whitespace-nowrap">${data.title}</span>
                    </button>
                `).join('')}
            </div>
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
    AudioController.stopAutoRepeat(); // 카테고리 변경 시 자동재생 중단
    updateNavigationStyles(key);
    displayCurrentConversation();
}

function updateNavigationStyles(activeKey) {
    Object.keys(conversationModuleData).forEach(key => {
        const btn = document.getElementById(`nav-btn-${key}`);
        if(btn) btn.className = `flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 text-sm shadow-sm`;
    });
    const activeBtn = document.getElementById(`nav-btn-${activeKey}`);
    const color = conversationModuleData[activeKey].color;
    if(activeBtn) {
        activeBtn.className = `flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 scale-105 bg-${color}-50 border-${color}-500 text-${color}-600 shadow-md text-sm font-bold`;
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

// ==========================================
// 3. 렌더링 엔진
// ==========================================
function createFlipCardHTML(data, type, index, color) {
    const isQuestion = type === 'question';
    const uniqueId = isQuestion? 'card-q' : `card-a-${index}`;

    // 단어장 HTML
    const vocabListHTML = data.vocab && data.vocab.length > 0
       ? `<div class="h-full flex flex-col">
            <div class="flex items-center gap-2 border-b border-gray-200 pb-3 mb-3">
                <i class="fas fa-book-reader text-${color}-500"></i>
                <span class="text-xs font-black text-gray-400 uppercase tracking-widest">Vocabulary</span>
            </div>
            <div class="flex-1 overflow-y-auto custom-scrollbar pr-1">
                <div class="vocab-grid">
                    ${data.vocab.map(v => `
                        <div class="vocab-item bg-white p-3 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-${color}-200 cursor-default">
                            <div class="flex justify-between items-start mb-1">
                                <span class="text-lg font-bold text-gray-800 leading-tight">${v.word}</span>
                                ${v.type? `<span class="text-[10px] bg-${color}-50 text-${color}-600 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ml-1 whitespace-nowrap">${v.type}</span>` : ''}
                            </div>
                            <div class="text-xs text-gray-400 font-mono mb-2 truncate">${v.read}</div>
                            <div class="mt-auto pt-2 border-t border-gray-50 text-sm font-bold text-${color}-600 leading-snug">${v.mean}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
           </div>`
        : `<div class="h-full flex flex-col items-center justify-center text-gray-300">
             <i class="fas fa-layer-group text-4xl mb-3 opacity-30"></i>
             <span class="text-sm font-medium">추가 단어 없음</span>
           </div>`;

    // 앞면 HTML (자동재생 버튼 제거됨)
    const frontHTML = `
        <div class="absolute w-full h-full backface-hidden bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between overflow-hidden" id="card-front-${uniqueId}">
            <div class="px-5 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                 <span class="px-3 py-1 rounded-full ${isQuestion? `bg-${color}-100 text-${color}-700` : 'bg-gray-200 text-gray-600'} text-[10px] font-black tracking-widest uppercase">
                    ${isQuestion? 'Question' : `Answer ${index + 1}`}
                 </span>
                <span class="text-[10px] text-gray-400 font-bold flex items-center gap-1 cursor-pointer" onclick="event.stopPropagation(); toggleCardFlip('${uniqueId}')">
                    <i class="fas fa-sync-alt"></i> FLIP
                </span>
            </div>
            <div class="flex-1 flex flex-col justify-center px-5 space-y-4">
                <div class="text-2xl md:text-3xl font-black text-gray-800 leading-snug text-center break-keep select-none">${data.jp}</div>
                <div class="text-xs md:text-sm text-gray-400 font-medium text-center font-mono select-none">${data.romaji}</div>
                <div class="w-8 h-1 bg-${color}-100 mx-auto rounded-full"></div>
                <div class="text-lg md:text-xl text-${color}-600 font-bold text-center break-keep select-none">${data.kr}</div>
            </div>
            <div class="px-4 py-3 bg-gray-50 border-t border-gray-100 flex gap-2 justify-center" onclick="event.stopPropagation()">
                <button onclick="AudioController.playNormal(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"><i class="fas fa-volume-up"></i>듣기</button>
                <button onclick="AudioController.playSlowRepeat(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"><i class="fas fa-history"></i>3회</button>
                <button onclick="AudioController.playShadowing(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 text-xs flex flex-col items-center justify-center gap-1 active:scale-95 transition-transform"><i class="fas fa-microphone-alt"></i>쉐도잉</button>
            </div>
        </div>`;

    const backHTML = `
        <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-50 rounded-3xl border-2 border-${color}-100 shadow-inner flex flex-col overflow-hidden">
             <div class="flex-1 p-4 overflow-hidden relative">${vocabListHTML}</div>
             <div class="py-3 bg-white border-t border-gray-200 text-center cursor-pointer hover:bg-gray-50" onclick="event.stopPropagation(); toggleCardFlip('${uniqueId}')">
                <span class="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2"><i class="fas fa-undo"></i> Return</span>
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

    // 자동재생 버튼 상태 확인
    const autoPlayBtnState = AudioController.isAutoPlaying? 
        `<button id="global-auto-play-btn" onclick="AudioController.stopAutoRepeat()" class="btn-auto-active px-4 py-2 rounded-full font-bold text-sm shadow-md flex items-center gap-2 transition-all"><i class="fas fa-stop"></i>정지</button>` :
        `<button id="global-auto-play-btn" onclick="startCategoryAutoPlay()" class="bg-white border border-gray-200 text-gray-600 hover:text-${convData.color}-600 hover:border-${convData.color}-200 px-4 py-2 rounded-full font-bold text-sm shadow-sm flex items-center gap-2 transition-all active:scale-95"><i class="fas fa-play-circle"></i>전체 자동재생</button>`;

    viewer.innerHTML = `
        <div class="flex items-center justify-between mb-6 px-1">
            <h3 class="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
                <span class="w-1.5 h-6 bg-${convData.color}-500 rounded-full inline-block"></span>
                <span class="truncate max-w-[150px] md:max-w-none">${convData.title}</span>
                <span class="text-sm text-gray-400 font-normal ml-1">(${currentConversationIndex + 1}/${convData.conversations.length})</span>
            </h3>
            <div class="flex gap-2 items-center">
                ${autoPlayBtnState}
            </div>
        </div>
        
        <div class="flex justify-between items-center mb-4 px-2">
             <button id="conv-prev-btn" onclick="previousConversation()" class="w-10 h-10 rounded-full bg-white border border-gray-200 shadow text-gray-400 hover:text-gray-800 flex items-center justify-center active:scale-90 transition-transform"><i class="fas fa-arrow-left"></i></button>
             <div class="text-xs text-gray-300 font-medium tracking-widest">SWIPE OR CLICK</div>
             <button id="conv-next-btn" onclick="nextConversation()" class="w-10 h-10 rounded-full bg-black shadow-lg text-white hover:bg-gray-800 flex items-center justify-center active:scale-90 transition-transform"><i class="fas fa-arrow-right"></i></button>
        </div>

        <div class="space-y-6 animate-fade-in pb-20">
            ${createFlipCardHTML(currentConv.question, 'question', 0, convData.color)}
            <div class="relative pl-4 border-l-2 border-dashed border-gray-200 space-y-8">
                ${currentConv.answers.map((ans, idx) => createFlipCardHTML(ans, 'answer', idx, convData.color)).join('')}
            </div>
        </div>`;
    updateNavigationButtons();
}

function toggleCardFlip(id) { 
    const card = document.getElementById(id);
    if(card) card.parentElement.classList.toggle('card-flipped'); 
}

// ==========================================
// 4. 고급 오디오 컨트롤러 (자동재생 로직 수정됨)
// ==========================================
const AudioController = {
    speechSynth: window.speechSynthesis,
    isAutoPlaying: false,

    speak: function (text, lang = 'ja-JP', rate = 1.0) {
        return new Promise((resolve) => {
            if (this.speechSynth.speaking) this.speechSynth.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang; 
            utterance.rate = rate;
            const voices = this.speechSynth.getVoices();
            let voice;
            if (lang === 'ja-JP') voice = voices.find(v => v.lang === 'ja-JP') |

| voices.find(v => v.lang.includes('ja'));
            if (lang === 'ko-KR') voice = voices.find(v => v.lang === 'ko-KR') |

| voices.find(v => v.lang.includes('ko'));
            if(voice) utterance.voice = voice;
            
            utterance.onend = resolve; 
            utterance.onerror = resolve;
            this.speechSynth.speak(utterance);
        });
    },

    wait: ms => new Promise(r => setTimeout(r, ms)),

    playNormal: async function(t) { this.speechSynth.cancel(); await this.speak(t, 'ja-JP', 1.0); },
    playSlowRepeat: async function(t) { this.speechSynth.cancel(); for(let i=0;i<3;i++){ await this.speak(t,'ja-JP',0.7); await this.wait(600); } },
    playShadowing: async function(t) { this.speechSynth.cancel(); await this.speak(t,'ja-JP',0.7); await this.wait(1500); await this.speak(t,'ja-JP',1.0); },

    // [핵심] 자동재생 로직: (JP 1회 -> KR 1.2배속 1회 -> 대기) x 3회 반복
    playSentenceLoop: async function(jpText, krText) {
        for(let i=0; i<3; i++) {
            if(!this.isAutoPlaying) return false;
            
            // 1. 일본어 1회
            await this.speak(jpText, 'ja-JP', 1.0);
            if(!this.isAutoPlaying) return false;
            await this.wait(300); 

            // 2. 한국어 빠르게 1회
            await this.speak(krText, 'ko-KR', 1.2); 
            if(!this.isAutoPlaying) return false;
            
            // 3. 따라할 시간 (쉐도잉 타임)
            await this.wait(1500); 
        }
        return true;
    },

    stopAutoRepeat: function() {
        this.isAutoPlaying = false;
        this.speechSynth.cancel();
        const btn = document.getElementById('global-auto-play-btn');
        if(btn) {
            btn.className = "bg-white border border-gray-200 text-gray-600 hover:text-blue-600 px-4 py-2 rounded-full font-bold text-sm shadow-sm flex items-center gap-2 transition-all active:scale-95";
            btn.innerHTML = '<i class="fas fa-play-circle"></i>전체 자동재생';
            btn.onclick = startCategoryAutoPlay;
        }
        // 하이라이트 제거
        document.querySelectorAll('.playing-highlight').forEach(el => el.classList.remove('playing-highlight'));
    }
};

// 전체 카테고리 자동재생 시작 함수
async function startCategoryAutoPlay() {
    if (AudioController.isAutoPlaying) return;
    AudioController.isAutoPlaying = true;

    // 버튼 상태 변경
    const btn = document.getElementById('global-auto-play-btn');
    if(btn) {
        btn.className = "btn-auto-active px-4 py-2 rounded-full font-bold text-sm shadow-md flex items-center gap-2 transition-all";
        btn.innerHTML = '<i class="fas fa-stop"></i>정지';
        btn.onclick = AudioController.stopAutoRepeat;
    }

    const convData = conversationModuleData[currentConversationCategory];
    
    // 현재 인덱스부터 시작
    for (let i = currentConversationIndex; i < convData.conversations.length; i++) {
        if (!AudioController.isAutoPlaying) break;

        // 화면 이동 (스크롤)
        if (i!== currentConversationIndex) {
            currentConversationIndex = i;
            displayCurrentConversation();
            // 버튼 상태 재적용 (화면 갱신되므로)
            const newBtn = document.getElementById('global-auto-play-btn');
            if(newBtn) {
                newBtn.className = "btn-auto-active px-4 py-2 rounded-full font-bold text-sm shadow-md flex items-center gap-2 transition-all";
                newBtn.innerHTML = '<i class="fas fa-stop"></i>정지';
                newBtn.onclick = AudioController.stopAutoRepeat;
            }
        }

        const conv = convData.conversations[i];

        // 1. 질문 재생
        const qCard = document.getElementById('card-front-card-q');
        if(qCard) qCard.classList.add('playing-highlight');
        
        const qContinued = await AudioController.playSentenceLoop(conv.question.jp, conv.question.kr);
        if(qCard) qCard.classList.remove('playing-highlight');
        if (!qContinued) break;

        // 2. 답변들 순차 재생
        for (let j = 0; j < conv.answers.length; j++) {
            if (!AudioController.isAutoPlaying) break;
            
            // 답변 카드로 스크롤
            const aCard = document.getElementById(`card-front-card-a-${j}`);
            if(aCard) {
                aCard.scrollIntoView({ behavior: "smooth", block: "center" });
                aCard.classList.add('playing-highlight');
            }

            const aContinued = await AudioController.playSentenceLoop(conv.answers[j].jp, conv.answers[j].kr);
            if(aCard) aCard.classList.remove('playing-highlight');
            if (!aContinued) break;
        }
        
        await AudioController.wait(1000); // 다음 대화로 넘어가기 전 대기
    }

    AudioController.stopAutoRepeat();
}

function updateNavigationButtons() {
    const conv = conversationModuleData[currentConversationCategory];
    const prev = document.getElementById('conv-prev-btn');
    const next = document.getElementById('conv-next-btn');
    if(prev) { prev.disabled = currentConversationIndex===0; prev.style.opacity = currentConversationIndex===0?'0.3':'1'; }
    if(next) { 
        const isLast = currentConversationIndex === conv.conversations.length - 1;
        next.disabled = isLast; 
        next.style.opacity = isLast? '0.3' : '1';
    }
}

function previousConversation() { 
    AudioController.stopAutoRepeat(); 
    if(currentConversationIndex > 0) { 
        currentConversationIndex--; 
        displayCurrentConversation(); 
        window.scrollTo({top: 0, behavior: 'smooth'}); 
    } 
}

function nextConversation() { 
    AudioController.stopAutoRepeat(); 
    if(currentConversationIndex < conversationModuleData[currentConversationCategory].conversations.length - 1) { 
        currentConversationIndex++; 
        displayCurrentConversation(); 
        window.scrollTo({top: 0, behavior: 'smooth'}); 
    } 
}

document.addEventListener('DOMContentLoaded', () => { 
    if(document.getElementById('conversation-content')) initConversation(); 
});
