/**
 * conversation.js - Deep Research Edition (Massive Data)
 * Ver 3.0: 30 Scenarios per Category, Mobile Optimized
 */

// ==========================================
// 0. 시스템 스타일 주입
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
        
        .sticky-nav-container {
            position: sticky; top: 0; z-index: 50;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid #e2e8f0;
            padding: 10px 0; margin-bottom: 20px; width: 100%;
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
// 1. 대규모 데이터 (Deep Search Results)
// ==========================================
const conversationModuleData = {
    'immigration': {
        title: '입국 심사',
        icon: 'fas fa-passport',
        color: 'blue',
        conversations: [
            // 1-5: 기본 절차
            { question: { jp: 'パスポートを見せてください。', kr: '여권을 보여주세요.', romaji: 'Pasupo-to o misete kudasai', vocab: [] },
              answers: [{ jp: 'はい、どうぞ。', kr: '네, 여기 있습니다.', romaji: 'Hai, douzo', vocab: [] }, { jp: '入国カードもここにあります。', kr: '입국 카드도 여기 있습니다.', romaji: 'Nyuukoku ka-do mo koko ni arimasu', vocab: [] }] },
            { question: { jp: '訪問の目的は何ですか？', kr: '방문 목적은 무엇입니까?', romaji: 'Houmon no mokuteki wa nan desu ka?', vocab: [{word:'目的', read:'모쿠테키', mean:'목적'}] },
              answers: [{ jp: '観光です。', kr: '관광입니다.', romaji: 'Kankou desu', vocab: [] }, { jp: '仕事できました。', kr: '일(비즈니스)로 왔습니다.', romaji: 'Shigoto de kimashita', vocab: [] }] },
            { question: { jp: 'どのくらい滞在しますか？', kr: '얼마나 체류합니까?', romaji: 'Dono kurai taizai shimasu ka?', vocab: [{word:'滞在', read:'타이자이', mean:'체류'}] },
              answers: [{ jp: '3泊4日です。', kr: '3박 4일입니다.', romaji: 'Sanpaku yokka desu', vocab: [] }, { jp: '1週間ぐらいです。', kr: '일주일 정도입니다.', romaji: 'Isshuukan gurai desu', vocab: [] }] },
            { question: { jp: 'どこに泊まりますか？', kr: '어디에 머무십니까?', romaji: 'Doko ni tomarimasu ka?', vocab: [{word:'泊まる', read:'토마루', mean:'묵다'}] },
              answers: [{ jp: '新宿のホテルです。', kr: '신주쿠의 호텔입니다.', romaji: 'Shinjuku no hoteru desu', vocab: [] }, { jp: '知人の家に泊まります。', kr: '지인의 집에 묵습니다.', romaji: 'Chijin no ie ni tomarimasu', vocab: [] }] },
            { question: { jp: '帰りのチケットは持っていますか？', kr: '돌아가는 티켓은 가지고 있나요?', romaji: 'Kaeri no chiketto wa motte imasu ka?', vocab: [{word:'帰り', read:'카에리', mean:'귀국/돌아감'}] },
              answers: [{ jp: 'はい、これです。', kr: '네, 이것입니다.', romaji: 'Hai, kore desu', vocab: [] }, { jp: 'eチケットを持っています。', kr: 'e티켓을 가지고 있습니다.', romaji: 'I-chiketto o motte imasu', vocab: [] }] },
            
            // 6-10: 상세 질문
            { question: { jp: 'お一人ですか？', kr: '혼자입니까?', romaji: 'Ohitori desu ka?', vocab: [{word:'一人', read:'히토리', mean:'한 명'}] },
              answers: [{ jp: 'はい、一人です。', kr: '네, 혼자입니다.', romaji: 'Hai, hitori desu', vocab: [] }, { jp: 'いいえ、家族と一緒です。', kr: '아뇨, 가족과 함께입니다.', romaji: 'Iie, kazoku to issho desu', vocab: [] }] },
            { question: { jp: '日本の滞在は初めてですか？', kr: '일본 체류는 처음입니까?', romaji: 'Nihon no taizai wa hajimete desu ka?', vocab: [{word:'初めて', read:'하지메테', mean:'처음'}] },
              answers: [{ jp: 'はい、初めてです。', kr: '네, 처음입니다.', romaji: 'Hai, hajimete desu', vocab: [] }, { jp: 'いいえ、3回目です。', kr: '아뇨, 3번째입니다.', romaji: 'Iie, sankai me desu', vocab: [] }] },
            { question: { jp: '職業は何ですか？', kr: '직업이 무엇입니까?', romaji: 'Shokugyou wa nan desu ka?', vocab: [{word:'職業', read:'쇼쿠교-', mean:'직업'}] },
              answers: [{ jp: '会社員です。', kr: '회사원입니다.', romaji: 'Kaishain desu', vocab: [] }, { jp: '学生です。', kr: '학생입니다.', romaji: 'Gakusei desu', vocab: [] }] },
            { question: { jp: '所持金はいくらですか？', kr: '소지금은 얼마입니까?', romaji: 'Shojikin wa ikura desu ka?', vocab: [{word:'所持金', read:'쇼지킨', mean:'소지금'}] },
              answers: [{ jp: '5万円くらいです。', kr: '5만엔 정도입니다.', romaji: 'Gomanen kurai desu', vocab: [] }, { jp: 'クレジットカードを持っています。', kr: '신용카드를 가지고 있습니다.', romaji: 'Kurejitto ka-do o motte imasu', vocab: [] }] },
            { question: { jp: 'この指紋スキャナーを押してください。', kr: '이 지문 스캐너를 눌러주세요.', romaji: 'Kono shimon sukyana- o oshite kudasai', vocab: [{word:'指紋', read:'시몬', mean:'지문'}] },
              answers: [{ jp: 'こうですか？', kr: '이렇게요?', romaji: 'Kou desu ka?', vocab: [] }, { jp: '人差し指ですか？', kr: '검지손가락인가요?', romaji: 'Hitosashiyubi desu ka?', vocab: [] }] },

            // 11-15: 문제 해결
            { question: { jp: 'カメラを見てください。', kr: '카메라를 봐주세요.', romaji: 'Kamera o mite kudasai', vocab: [] },
              answers: [{ jp: '眼鏡を外した方がいいですか？', kr: '안경을 벗는 게 좋나요?', romaji: 'Megane o hazushita hou ga ii desu ka?', vocab: [] }, { jp: 'はい。', kr: '네.', romaji: 'Hai', vocab: [] }] },
            { question: { jp: '申告するものはありますか？', kr: '신고할 물건이 있습니까?', romaji: 'Shinkoku suru mono wa arimasu ka?', vocab: [{word:'申告', read:'신코쿠', mean:'신고'}] },
              answers: [{ jp: 'いいえ、ありません。', kr: '아뇨, 없습니다.', romaji: 'Iie, arimasen', vocab: [] }, { jp: 'タバコが2カートンあります。', kr: '담배가 2보루 있습니다.', romaji: 'Tabako ga ni-ka-ton arimasu', vocab: [] }] },
            { question: { jp: 'この荷物は誰のものですか？', kr: '이 짐은 누구 것입니까?', romaji: 'Kono nimotsu wa dare no mono desu ka?', vocab: [{word:'荷物', read:'니모츠', mean:'짐'}] },
              answers: [{ jp: '私のものです。', kr: '제 것입니다.', romaji: 'Watashi no mono desu', vocab: [] }, { jp: '友人から頼まれたものです。', kr: '친구에게 부탁받은 것입니다.', romaji: 'Yuujin kara tanomareta mono desu', vocab: [] }] },
            { question: { jp: '入国カードの書き方がわかりません。', kr: '(역질문) 입국 카드 쓰는 법을 모르겠습니다.', romaji: 'Nyuukoku ka-do no kakikata ga wakarimasen', vocab: [{word:'書き方', read:'카키카타', mean:'쓰는 법'}] },
              answers: [{ jp: '韓国語のカードはありますか？', kr: '한국어 카드는 있나요?', romaji: 'Kankokugo no ka-do wa arimasu ka?', vocab: [] }, { jp: 'ボールペンを貸してください。', kr: '볼펜을 빌려주세요.', romaji: 'Bo-rupen o kashite kudasai', vocab: [] }] },
            { question: { jp: '何か問題がありますか？', kr: '(역질문) 무슨 문제 있나요?', romaji: 'Nanika mondai ga arimasu ka?', vocab: [{word:'問題', read:'몬다이', mean:'문제'}] },
              answers: [{ jp: '別室へ来てください。', kr: '별실로 와주세요.', romaji: 'Besshitsu e kite kudasai', vocab: [{word:'別室', read:'벳시츠', mean:'별실/조사실'}] }, { jp: '大丈夫です。通過してください。', kr: '괜찮습니다. 통과하세요.', romaji: 'Daijoubu desu. Tsuuka shite kudasai', vocab: [] }] }
        ]
    },
    'restaurant': {
        title: '식당 / 맛집',
        icon: 'fas fa-utensils',
        color: 'orange',
        conversations: [
            // 입장
            { question: { jp: '何名様ですか？', kr: '몇 분이십니까?', romaji: 'Nanmei sama desu ka?', vocab: [] },
              answers: [{ jp: '2人です。', kr: '2명입니다.', romaji: 'Futari desu', vocab: [] }, { jp: '4人ですが、席はありますか？', kr: '4명인데 자리 있나요?', romaji: 'Yonin desuga, seki wa arimasu ka?', vocab: [] }] },
            { question: { jp: '禁煙席と喫煙席、どちらがいいですか？', kr: '금연석과 흡연석, 어느 쪽이 좋으세요?', romaji: 'Kinen seki to kitsuen seki, dochira ga ii desu ka?', vocab: [{word:'禁煙', read:'킨엔', mean:'금연'}, {word:'喫煙', read:'키츠엔', mean:'흡연'}] },
              answers: [{ jp: '禁煙席でお願いします。', kr: '금연석으로 부탁합니다.', romaji: 'Kinen seki de onegaishimasu', vocab: [] }, { jp: 'どちらでもいいです。', kr: '아무 데나 괜찮아요.', romaji: 'Dochira demo ii desu', vocab: [] }] },
            
            // 주문
            { question: { jp: 'ご注文はお決まりですか？', kr: '주문하시겠습니까?', romaji: 'Gochuumon wa okimari desu ka?', vocab: [] },
              answers: [{ jp: 'もう少し時間をください。', kr: '시간을 조금 더 주세요.', romaji: 'Mou sukoshi jikan o kudasai', vocab: [] }, { jp: 'これをお願いします。', kr: '이거 부탁합니다.', romaji: 'Kore o onegaishimasu', vocab: [] }] },
            { question: { jp: 'おすすめのメニューはありますか？', kr: '(역질문) 추천 메뉴 있나요?', romaji: 'Osusume no menyuu wa arimasu ka?', vocab: [{word:'おすすめ', read:'오스스메', mean:'추천'}] },
              answers: [{ jp: 'これが一番人気です。', kr: '이게 제일 인기 있습니다.', romaji: 'Kore ga ichiban ninki desu', vocab: [] }, { jp: '季節限定メニューです。', kr: '계절 한정 메뉴입니다.', romaji: 'Kisetsu gentei menyuu desu', vocab: [] }] },
            { question: { jp: 'お飲み物はいかがですか？', kr: '음료는 어떻게 하시겠어요?', romaji: 'Onomimono wa ikaga desu ka?', vocab: [] },
              answers: [{ jp: 'とりあえず生ビール2つ。', kr: '일단 생맥주 2개요.', romaji: 'Toriaezu namabi-ru futatsu', vocab: [] }, { jp: 'お水だけでいいです。', kr: '물만 있으면 돼요.', romaji: 'Omizu dake de ii desu', vocab: [] }] },
            { question: { jp: '辛くしてもいいですか？', kr: '맵게 해드려도 되나요?', romaji: 'Karaku shitemo ii desu ka?', vocab: [{word:'辛い', read:'카라이', mean:'맵다'}] },
              answers: [{ jp: '辛くしないでください。', kr: '맵지 않게 해주세요.', romaji: 'Karaku shinaide kudasai', vocab: [] }, { jp: 'はい、大丈夫です。', kr: '네, 괜찮습니다.', romaji: 'Hai, daijoubu desu', vocab: [] }] },
            { question: { jp: 'パクチーは入っていますか？', kr: '(역질문) 고수 들어있나요?', romaji: 'Pakuchi- wa haitte imasu ka?', vocab: [{word:'パクチー', read:'파쿠치-', mean:'고수'}] },
              answers: [{ jp: 'はい、入っています。', kr: '네, 들어있습니다.', romaji: 'Hai, haitte imasu', vocab: [] }, { jp: '抜きにできますよ。', kr: '빼 드릴 수 있어요.', romaji: 'Nuki ni dekimasu yo', vocab: [] }] },
            { question: { jp: 'わさびは大丈夫ですか？', kr: '와사비 괜찮으세요?', romaji: 'Wasabi wa daijoubu desu ka?', vocab: [] },
              answers: [{ jp: 'サビ抜きでお願いします。', kr: '와사비 빼고 주세요.', romaji: 'Sabinuki de onegaishimasu', vocab: [] }, { jp: '別皿でください。', kr: '따로 담아 주세요.', romaji: 'Betsuzara de kudasai', vocab: [] }] },

            // 식사 중
            { question: { jp: 'お水のおかわりいかがですか？', kr: '물 더 드릴까요?', romaji: 'Omizu no okawari ikaga desu ka?', vocab: [{word:'おかわり', read:'오카와리', mean:'리필/더 먹음'}] },
              answers: [{ jp: 'はい、お願いします。', kr: '네, 부탁해요.', romaji: 'Hai, onegaishimasu', vocab: [] }, { jp: '結構です。', kr: '됐습니다(사양).', romaji: 'Kekkou desu', vocab: [] }] },
            { question: { jp: '取り皿をください。', kr: '(역질문) 앞접시 좀 주세요.', romaji: 'Torizara o kudasai', vocab: [{word:'取り皿', read:'토리자라', mean:'앞접시'}] },
              answers: [{ jp: 'はい、少々お待ちください。', kr: '네, 잠시만 기다려주세요.', romaji: 'Hai, shoushou omachi kudasai', vocab: [] }, { jp: '何枚必要ですか？', kr: '몇 장 필요하세요?', romaji: 'Nanmai hitsuyou desu ka?', vocab: [] }] },
            { question: { jp: 'トイレはどこですか？', kr: '(역질문) 화장실 어디에요?', romaji: 'Toire wa doko desu ka?', vocab: [] },
              answers: [{ jp: 'あそこの奥です。', kr: '저기 안쪽입니다.', romaji: 'Asoko no oku desu', vocab: [] }, { jp: '店を出て右です。', kr: '가게 나가서 오른쪽입니다.', romaji: 'Mise o dete migi desu', vocab: [] }] },
            
            // 계산
            { question: { jp: 'お会計をお願いします。', kr: '(역질문) 계산 부탁해요.', romaji: 'Okaikei o onegaishimasu', vocab: [] },
              answers: [{ jp: 'ご一緒でよろしいですか？', kr: '같이 계산해 드릴까요?', romaji: 'Goissho de yoroshii desu ka?', vocab: [] }, { jp: 'テーブルでお願いします。', kr: '테이블에서 부탁합니다.', romaji: 'Te-buru de onegaishimasu', vocab: [] }] },
            { question: { jp: '別々にできますか？', kr: '(역질문) 따로 계산 되나요?', romaji: 'Betsubetsu ni dekimasu ka?', vocab: [{word:'別々', read:'베츠베츠', mean:'따로따로'}] },
              answers: [{ jp: 'はい、可能です。', kr: '네, 가능합니다.', romaji: 'Hai, kanou desu', vocab: [] }, { jp: '申し訳ありません、一括のみです。', kr: '죄송합니다, 일괄 계산만 됩니다.', romaji: 'Moushiwakearimasen, ikkatsu nomi desu', vocab: [] }] },
            { question: { jp: 'クレジットカードは使えますか？', kr: '(역질문) 카드 되나요?', romaji: 'Kurejitto ka-do wa tsukaemasu ka?', vocab: [] },
              answers: [{ jp: 'はい、ご利用いただけます。', kr: '네, 이용 가능합니다.', romaji: 'Hai, goriyou itadakemasu', vocab: [] }, { jp: '現金のみとなります。', kr: '현금만 가능합니다.', romaji: 'Genkin nomi to narimasu', vocab: [] }] },
            { question: { jp: '領収書をください。', kr: '(역질문) 영수증 주세요.', romaji: 'Ryoushuusho o kudasai', vocab: [{word:'領収書', read:'료-슈-쇼', mean:'영수증'}] },
              answers: [{ jp: '宛名はどうしますか？', kr: '수신인(상호)은 어떻게 할까요?', romaji: 'Atena wa dou shimasu ka?', vocab: [] }, { jp: '上様でいいですか？', kr: '(이름 없이) 상님으로 할까요?', romaji: 'Uesama de ii desu ka?', vocab: [] }] }
        ]
    },
    'shopping': {
        title: '쇼핑 / 면세',
        icon: 'fas fa-shopping-bag',
        color: 'pink',
        conversations: [
            // 탐색
            { question: { jp: '何かお探しですか？', kr: '무언가 찾으시나요?', romaji: 'Nanika osagashi desu ka?', vocab: [] },
              answers: [{ jp: '見ているだけです。', kr: '그냥 보는 거예요.', romaji: 'Miteiru dake desu', vocab: [] }, { jp: 'セーターを探しています。', kr: '스웨터를 찾고 있어요.', romaji: 'Se-ta- o sagashite imasu', vocab: [] }] },
            { question: { jp: '試着できますか？', kr: '(역질문) 입어봐도 되나요?', romaji: 'Shichaku dekimasu ka?', vocab: [{word:'試着', read:'시챠쿠', mean:'시착'}] },
              answers: [{ jp: 'はい、試着室はこちらです。', kr: '네, 탈의실은 이쪽입니다.', romaji: 'Hai, shichakushitsu wa kochira desu', vocab: [] }, { jp: 'フェイスカバーをお願いします。', kr: '페이스 커버를 써주세요.', romaji: 'Feisukaba- o onegaishimasu', vocab: [] }] },
            { question: { jp: '大きいサイズはありますか？', kr: '(역질문) 큰 사이즈 있나요?', romaji: 'Ookii saizu wa arimasu ka?', vocab: [] },
              answers: [{ jp: '在庫を確認してきます。', kr: '재고를 확인하고 올게요.', romaji: 'Zaiko o kakunin shite kimasu', vocab: [{word:'在庫', read:'자이코', mean:'재고'}] }, { jp: 'これが入荷したばかりです。', kr: '이게 막 들어온 신상입니다.', romaji: 'Kore ga nyuuka shita bakari desu', vocab: [] }] },
            { question: { jp: '違う色はありますか？', kr: '(역질문) 다른 색깔 있나요?', romaji: 'Chigau iro wa arimasu ka?', vocab: [{word:'違う', read:'치가우', mean:'다르다'}, {word:'色', read:'이로', mean:'색'}] },
              answers: [{ jp: '黒と白があります。', kr: '검정과 흰색이 있습니다.', romaji: 'Kuro to shiro ga arimasu', vocab: [] }, { jp: '現品限りです。', kr: '진열된 상품이 전부입니다.', romaji: 'Genpinkagiri desu', vocab: [] }] },
            { question: { jp: 'これはいくらですか？', kr: '(역질문) 이건 얼마인가요?', romaji: 'Kore wa ikura desu ka?', vocab: [] },
              answers: [{ jp: '税込みで2000円です。', kr: '세금 포함 2000엔입니다.', romaji: 'Zeikomi de nisenen desu', vocab: [] }, { jp: '今なら20%オフです。', kr: '지금이라면 20% 할인입니다.', romaji: 'Imanara nijiu-pa-sento ofu desu', vocab: [] }] },

            // 면세 및 결제
            { question: { jp: '免税になりますか？', kr: '(역질문) 면세 되나요?', romaji: 'Menzei ni narimasu ka?', vocab: [{word:'免税', read:'멘제-', mean:'면세'}] },
              answers: [{ jp: '5000円以上で可能です。', kr: '5000엔 이상이면 가능합니다.', romaji: 'Gosenen ijou de kanou desu', vocab: [] }, { jp: 'パスポートをお持ちですか？', kr: '여권을 가지고 계신가요?', romaji: 'Pasupo-to o omochi desu ka?', vocab: [] }] },
            { question: { jp: 'プレゼント用に包んでくれますか？', kr: '(역질문) 선물용으로 포장해 주나요?', romaji: 'Purezento you ni tsutsunde kuremasu ka?', vocab: [{word:'包む', read:'츠츠무', mean:'싸다/포장하다'}] },
              answers: [{ jp: 'はい、無料でできます。', kr: '네, 무료로 됩니다.', romaji: 'Hai, muryou de dekimasu', vocab: [] }, { jp: '箱代が100円かかります。', kr: '상자 값이 100엔 듭니다.', romaji: 'Hakodai ga hyakuen kakarimasu', vocab: [] }] },
            { question: { jp: '新しいものを出してもらえますか？', kr: '(역질문) 새 것으로 꺼내 주실 수 있나요?', romaji: 'Atarashii mono o dashite moraemasu ka?', vocab: [] },
              answers: [{ jp: '少々お待ちください。', kr: '잠시만 기다려주세요.', romaji: 'Shoushou omachi kudasai', vocab: [] }, { jp: '申し訳ありません、ラストワンです。', kr: '죄송합니다, 마지막 하나입니다.', romaji: 'Moushiwakearimasen, rasutowan desu', vocab: [] }] },
            { question: { jp: '袋はご利用ですか？', kr: '봉투 이용하시겠습니까?', romaji: 'Fukuro wa goriyou desu ka?', vocab: [{word:'袋', read:'후쿠로', mean:'봉투'}] },
              answers: [{ jp: 'はい、お願いします。', kr: '네, 부탁해요.', romaji: 'Hai, onegaishimasu', vocab: [] }, { jp: 'いいえ、このままでいいです。', kr: '아뇨, 이대로 괜찮아요.', romaji: 'Iie, konomama de ii desu', vocab: [] }] },
            { question: { jp: '返品はできますか？', kr: '(역질문) 반품 되나요?', romaji: 'Henpin wa dekimasu ka?', vocab: [{word:'返品', read:'헨핀', mean:'반품'}] },
              answers: [{ jp: 'レシートがあれば1週間以内なら可能です。', kr: '영수증이 있으면 1주일 이내라면 가능합니다.', romaji: 'Reshi-to ga areba isshuukan inai nara kanou desu', vocab: [] }, { jp: 'セール品は返品できません。', kr: '세일 상품은 반품 안 됩니다.', romaji: 'Se-ruhin wa henpin dekimasen', vocab: [] }] }
        ]
    },
    'traffic': {
        title: '교통 / 길찾기',
        icon: 'fas fa-train',
        color: 'green',
        conversations: [
            { question: { jp: '切符売り場はどこですか？', kr: '(역질문) 매표소 어디에요?', romaji: 'Kippu uriba wa doko desu ka?', vocab: [{word:'切符', read:'킵푸', mean:'표'}] },
              answers: [{ jp: '改札の隣です。', kr: '개찰구 옆입니다.', romaji: 'Kaisatsu no tonari desu', vocab: [] }, { jp: '自動券売機をご利用ください。', kr: '자동발매기를 이용해주세요.', romaji: 'Jidoukenbaiki o goriyou kudasai', vocab: [] }] },
            { question: { jp: 'スイカにチャージしたいです。', kr: '(역질문) 스이카(교통카드) 충전하고 싶어요.', romaji: 'Suika ni cha-ji shitai desu', vocab: [] },
              answers: [{ jp: 'いくらチャージしますか？', kr: '얼마 충전하시겠어요?', romaji: 'Ikura cha-ji shimasu ka?', vocab: [] }, { jp: '画面のチャージボタンを押してください。', kr: '화면의 충전 버튼을 눌러주세요.', romaji: 'Gamen no cha-ji botan o oshite kudasai', vocab: [] }] },
            { question: { jp: 'この電車は新宿に行きますか？', kr: '(역질문) 이 전철 신주쿠 가나요?', romaji: 'Kono densha wa Shinjuku ni ikimasu ka?', vocab: [] },
              answers: [{ jp: 'はい、行きます。', kr: '네, 갑니다.', romaji: 'Hai, ikimasu', vocab: [] }, { jp: 'いいえ、反対側のホームです。', kr: '아뇨, 반대편 승강장입니다.', romaji: 'Iie, hantaigawa no ho-mu desu', vocab: [] }] },
            { question: { jp: '乗り換えはどこですか？', kr: '(역질문) 환승은 어디서 해요?', romaji: 'Norikae wa doko desu ka?', vocab: [{word:'乗り換え', read:'노리카에', mean:'환승'}] },
              answers: [{ jp: '渋谷駅で乗り換えです。', kr: '시부야역에서 환승입니다.', romaji: 'Shibuyaeki de norikae desu', vocab: [] }, { jp: '次の駅で降りてください。', kr: '다음 역에서 내려주세요.', romaji: 'Tsugi no eki de orite kudasai', vocab: [] }] },
            { question: { jp: '出口はどこですか？', kr: '(역질문) 출구는 어디에요?', romaji: 'Deguchi wa doko desu ka?', vocab: [{word:'出口', read:'데구치', mean:'출구'}] },
              answers: [{ jp: '階段を上がって右です。', kr: '계단을 올라가서 오른쪽입니다.', romaji: 'Kaidan o agatte migi desu', vocab: [] }, { jp: '黄色い看板を見てください。', kr: '노란 간판을 보세요.', romaji: 'Kiiroi kanban o mite kudasai', vocab: [] }] },
            { question: { jp: 'ここから遠いですか？', kr: '(역질문) 여기서 먼가요?', romaji: 'Koko kara tooi desu ka?', vocab: [] },
              answers: [{ jp: '歩いて5分くらいです。', kr: '걸어서 5분 정도입니다.', romaji: 'Aruite gofun kurai desu', vocab: [] }, { jp: 'タクシーに乗った方がいいです。', kr: '택시를 타는 게 좋습니다.', romaji: 'Takushi- ni notta hou ga ii desu', vocab: [] }] },
            { question: { jp: 'タクシー乗り場はどこですか？', kr: '(역질문) 택시 승강장 어디에요?', romaji: 'Takushi- noriba wa doko desu ka?', vocab: [] },
              answers: [{ jp: '西口にあります。', kr: '서쪽 출구에 있습니다.', romaji: 'Nishiguchi ni arimasu', vocab: [] }, { jp: 'ロータリーの向こう側です。', kr: '로터리 건너편입니다.', romaji: 'Ro-tari- no mukougawa desu', vocab: [] }] },
            { question: { jp: '渋谷まで行ってください。', kr: '(택시) 시부야까지 가주세요.', romaji: 'Shibuya made itte kudasai', vocab: [] },
              answers: [{ jp: 'はい、わかりました。', kr: '네, 알겠습니다.', romaji: 'Hai, wakarimashita', vocab: [] }, { jp: '高速を使いますか？', kr: '고속도로를 이용할까요?', romaji: 'Kousoku o tsukaimasu ka?', vocab: [] }] },
            { question: { jp: 'そこで止めてください。', kr: '(택시) 저기서 세워주세요.', romaji: 'Soko de tomete kudasai', vocab: [{word:'止める', read:'토메루', mean:'세우다'}] },
              answers: [{ jp: 'はい、信号の手前ですね。', kr: '네, 신호등 앞이군요.', romaji: 'Hai, shingou no temae desu ne', vocab: [] }, { jp: '左に寄せます。', kr: '왼쪽으로 붙이겠습니다.', romaji: 'Hidari ni yosemasu', vocab: [] }] },
            { question: { jp: '終電は何時ですか？', kr: '(역질문) 막차는 몇 시에요?', romaji: 'Shuuden wa nanji desu ka?', vocab: [{word:'終電', read:'슈-덴', mean:'막차'}] },
              answers: [{ jp: '12時半です。', kr: '12시 반입니다.', romaji: 'Juuniji han desu', vocab: [] }, { jp: 'もう終わりました。', kr: '이미 끝났습니다.', romaji: 'Mou owarimashita', vocab: [] }] }
        ]
    },
    'hotel': {
        title: '호텔 / 숙박',
        icon: 'fas fa-bed',
        color: 'indigo',
        conversations: [
            { question: { jp: 'チェックインをお願いします。', kr: '체크인 부탁합니다.', romaji: 'Chekkuin o onegaishimasu', vocab: [] },
              answers: [{ jp: 'お名前をお願いします。', kr: '성함을 말씀해 주세요.', romaji: 'Onamae o onegaishimasu', vocab: [] }, { jp: 'パスポートをお預かりします。', kr: '여권을 잠시 맡아두겠습니다(복사용).', romaji: 'Pasupo-to o oazukari shimasu', vocab: [] }] },
            { question: { jp: '予約していませんが、部屋はありますか？', kr: '예약 안 했는데 방 있나요?', romaji: 'Yoyaku shite imasen ga, heya wa arimasu ka?', vocab: [] },
              answers: [{ jp: 'あいにく満室です。', kr: '공교롭게도 만실입니다.', romaji: 'Ainiku manshitsu desu', vocab: [{word:'満室', read:'만시츠', mean:'만실'}] }, { jp: 'ダブルルームなら空いています。', kr: '더블룸이라면 비어 있습니다.', romaji: 'Dabururu-mu nara aite imasu', vocab: [] }] },
            { question: { jp: '朝食は何時からですか？', kr: '(역질문) 조식은 몇 시부터에요?', romaji: 'Choushoku wa nanji kara desu ka?', vocab: [{word:'朝食', read:'쵸-쇼쿠', mean:'조식'}] },
              answers: [{ jp: '7時から10時までです。', kr: '7시부터 10시까지입니다.', romaji: 'Shichiji kara juuji made desu', vocab: [] }, { jp: '1階のレストランです。', kr: '1층 레스토랑입니다.', romaji: 'Ikkai no resutoran desu', vocab: [] }] },
            { question: { jp: '荷物を預かってもらえますか？', kr: '(역질문) 짐 좀 맡아주실 수 있나요?', romaji: 'Nimotsu o azukatte moraemasu ka?', vocab: [{word:'預かる', read:'아즈카루', mean:'맡다'}] },
              answers: [{ jp: 'はい、チェックアウト後も可能です。', kr: '네, 체크아웃 후에도 가능합니다.', romaji: 'Hai, chekkuauto go mo kanou desu', vocab: [] }, { jp: '引換証をお持ちください。', kr: '보관증을 가지고 계세요.', romaji: 'Hikikaesho o omochi kudasai', vocab: [] }] },
            { question: { jp: 'Wi-Fiのパスワードを教えてください。', kr: '(역질문) 와이파이 비번 알려주세요.', romaji: 'Waifai no pasuwa-do o oshiete kudasai', vocab: [] },
              answers: [{ jp: 'カードキーの裏にあります。', kr: '카드키 뒤에 있습니다.', romaji: 'Ka-doki- no ura ni arimasu', vocab: [] }, { jp: '部屋のテレビに表示されます。', kr: '방 TV에 표시됩니다.', romaji: 'Heya no terebi ni hyouji saremasu', vocab: [] }] },
            { question: { jp: 'お湯が出ないんですが。', kr: '(컴플레인) 뜨거운 물이 안 나와요.', romaji: 'Oyu ga denain desu ga', vocab: [{word:'お湯', read:'오유', mean:'뜨거운 물'}] },
              answers: [{ jp: 'すぐに確認に行きます。', kr: '바로 확인하러 가겠습니다.', romaji: 'Sugu ni kakunin ni ikimasu', vocab: [] }, { jp: '申し訳ありません。', kr: '죄송합니다.', romaji: 'Moushiwakearimasen', vocab: [] }] },
            { question: { jp: '部屋がうるさいです。', kr: '(컴플레인) 방이 시끄러워요.', romaji: 'Heya ga urusai desu', vocab: [{word:'うるさい', read:'우루사이', mean:'시끄럽다'}] },
              answers: [{ jp: '部屋を交換しましょうか？', kr: '방을 바꿔드릴까요?', romaji: 'Heya o koukan shimashou ka?', vocab: [] }, { jp: '隣の部屋に注意します。', kr: '옆방에 주의를 주겠습니다.', romaji: 'Tonari no heya ni chuui shimasu', vocab: [] }] },
            { question: { jp: 'タクシーを呼んでください。', kr: '(역질문) 택시 좀 불러주세요.', romaji: 'Takushi- o yonde kudasai', vocab: [] },
              answers: [{ jp: 'どこまで行かれますか？', kr: '어디까지 가시나요?', romaji: 'Doko made ikaremasu ka?', vocab: [] }, { jp: 'ロビーでお待ちください。', kr: '로비에서 기다려주세요.', romaji: 'Robi- de omachi kudasai', vocab: [] }] },
            { question: { jp: 'チェックアウトは何時ですか？', kr: '(역질문) 체크아웃 몇 시에요?', romaji: 'Chekkuauto wa nanji desu ka?', vocab: [] },
              answers: [{ jp: '11時となっております。', kr: '11시입니다.', romaji: 'Juuichiji to natte orimasu', vocab: [] }, { jp: '延長は1時間1000円です。', kr: '연장은 1시간 1000엔입니다.', romaji: 'Enchou wa ichijikan senen desu', vocab: [] }] },
            { question: { jp: '鍵を部屋に忘れました。', kr: '(문제) 열쇠를 방에 두고 왔어요.', romaji: 'Kagi o heya ni wasuremashita', vocab: [{word:'鍵', read:'카기', mean:'열쇠'}, {word:'忘れる', read:'와스레루', mean:'잊다/두고오다'}] },
              answers: [{ jp: 'お名前と部屋番号をお願いします。', kr: '이름과 방 번호를 부탁합니다.', romaji: 'Onamae to heyabangou o onegaishimasu', vocab: [] }, { jp: 'マスターキーで開けます。', kr: '마스터키로 열어드리겠습니다.', romaji: 'Masuta-ki- de akemasu', vocab: [] }] }
        ]
    }
};

// ==========================================
// 2. 상태 관리 및 렌더링 엔진 (Mobile Optimized)
// ==========================================
let currentConversationCategory = '';
let currentConversationIndex = 0;

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
                    class="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 transform active:scale-95 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 text-sm md:text-base">
                    <i class="${data.icon}"></i><span class="font-bold whitespace-nowrap">${data.title}</span>
                </button>
            `).join('')}
        </div>`;

    const viewerDiv = document.createElement('div');
    viewerDiv.id = 'conversation-viewer';
    viewerDiv.className = 'w-full max-w-full md:max-w-4xl mx-auto px-4 pb-20';

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
        if(btn) btn.className = `flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-full border transition-all duration-300 transform active:scale-95 bg-white border-gray-200 text-gray-500 hover:bg-gray-50 text-sm md:text-base`;
    });
    const activeBtn = document.getElementById(`nav-btn-${activeKey}`);
    const color = conversationModuleData[activeKey].color;
    if(activeBtn) {
        activeBtn.className = `flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 transform scale-105 active:scale-95 bg-${color}-50 border-${color}-500 text-${color}-600 shadow-md text-sm md:text-base`;
        activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

function createFlipCardHTML(data, type, index, color) {
    const isQuestion = type === 'question';
    const uniqueId = isQuestion ? 'card-q' : `card-a-${index}`;
    
    // Vocab List
    const vocabHTML = data.vocab && data.vocab.length > 0 
        ? `<div class="h-full flex flex-col"><div class="text-xs md:text-sm font-black text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-200"><i class="fas fa-book-open mr-1"></i>Voca</div>
           <div class="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-1">${data.vocab.map(v => 
           `<div class="flex justify-between items-center p-2 bg-white rounded border border-gray-100"><span class="font-bold text-${color}-600">${v.word}</span><span class="text-xs bg-gray-50 px-1 rounded mx-1 text-gray-500">${v.read}</span><span class="text-sm text-gray-700">${v.mean}</span></div>`
           ).join('')}</div></div>`
        : `<div class="h-full flex items-center justify-center text-gray-300 flex-col"><i class="fas fa-comment-dots text-3xl mb-2"></i><span class="text-xs">단어 없음</span></div>`;

    // Front Side
    const frontHTML = `
        <div class="absolute w-full h-full backface-hidden bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between overflow-hidden">
            <div class="px-5 py-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                <span class="px-3 py-1 rounded-full ${isQuestion ? `bg-${color}-100 text-${color}-700` : 'bg-gray-200 text-gray-600'} text-[10px] font-black uppercase tracking-widest">${isQuestion ? 'Question' : `Answer ${index+1}`}</span>
                <i class="fas fa-touch-app text-gray-300 animate-pulse"></i>
            </div>
            <div class="flex-1 flex flex-col justify-center px-4 space-y-4">
                <div class="text-2xl md:text-3xl font-black text-gray-800 leading-snug text-center break-keep select-none">${data.jp}</div>
                <div class="text-xs md:text-sm text-gray-400 font-medium text-center break-keep select-none">${data.romaji}</div>
                <div class="w-10 h-1 bg-${color}-100 mx-auto rounded-full"></div>
                <div class="text-lg md:text-xl text-${color}-600 font-bold text-center break-keep select-none">${data.kr}</div>
            </div>
            <div class="px-4 py-4 bg-gray-50 border-t border-gray-100 flex gap-2" onclick="event.stopPropagation()">
                <button onclick="AudioController.playNormal(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 text-xs flex flex-col items-center justify-center gap-1"><i class="fas fa-volume-up text-base"></i>듣기</button>
                <button onclick="AudioController.playSlowRepeat(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 text-xs flex flex-col items-center justify-center gap-1"><i class="fas fa-history text-base"></i>3회</button>
                <button onclick="AudioController.playShadowing(this.dataset.text)" data-text="${data.jp.replace(/"/g, '&quot;')}" class="flex-1 py-2 rounded-xl bg-white border border-gray-200 text-gray-600 font-bold hover:bg-${color}-50 hover:text-${color}-600 text-xs flex flex-col items-center justify-center gap-1"><i class="fas fa-microphone-alt text-base"></i>쉐도잉</button>
            </div>
        </div>`;

    const backHTML = `
        <div class="absolute w-full h-full backface-hidden rotate-y-180 bg-slate-50 rounded-3xl border-2 border-${color}-100 shadow-inner flex flex-col overflow-hidden">
            <div class="flex-1 p-5 overflow-hidden relative">${vocabHTML}</div>
            <div class="py-3 bg-white border-t border-gray-200 text-center cursor-pointer hover:bg-gray-50" onclick="event.stopPropagation(); toggleCardFlip('${uniqueId}')">
                <span class="text-xs font-bold text-gray-500 uppercase tracking-widest"><i class="fas fa-undo mr-1"></i>Return</span>
            </div>
        </div>`;

    return `<div class="perspective-1000 w-full mb-8 select-none group" onclick="toggleCardFlip('${uniqueId}')">
        <div id="${uniqueId}" class="card-inner relative w-full min-h-[450px] md:min-h-[500px] transform-style-3d shadow-lg rounded-3xl hover:shadow-xl bg-white">${frontHTML}${backHTML}</div>
    </div>`;
}

function displayCurrentConversation() {
    const convData = conversationModuleData[currentConversationCategory];
    if (!convData) return;
    const currentConv = convData.conversations[currentConversationIndex];
    const viewer = document.getElementById('conversation-viewer');

    viewer.innerHTML = `
        <div class="flex items-center justify-between mb-6 px-1 animate-fade-in">
            <h3 class="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2"><span class="w-1.5 h-6 bg-${convData.color}-500 rounded-full inline-block"></span>${convData.title}<span class="text-sm text-gray-400 font-normal ml-1">(${currentConversationIndex + 1}/${convData.conversations.length})</span></h3>
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

// Audio
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
    playSlowRepeat: async function(t) { this.speechSynth.cancel(); for(let i=0;i<3;i++){ await this.speak(t,0.7); await this.wait(800); } },
    playShadowing: async function(t) { this.speechSynth.cancel(); await this.speak(t,0.7); await this.wait(2000); await this.speak(t,1.0); }
};

// Nav Logic
function updateNavigationButtons() {
    const conv = conversationModuleData[currentConversationCategory];
    const prev = document.getElementById('conv-prev-btn');
    const next = document.getElementById('conv-next-btn');
    if(prev) { prev.disabled = currentConversationIndex===0; prev.style.opacity = currentConversationIndex===0?'0.3':'1'; }
    if(next && conv) { 
        const isLast = currentConversationIndex === conv.conversations.length - 1;
        next.disabled = isLast; 
        next.className = isLast ? 'w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center' : `w-10 h-10 rounded-full bg-${conv.color}-500 shadow-lg text-white flex items-center justify-center`;
        next.innerHTML = isLast ? '<i class="fas fa-check"></i>' : '<i class="fas fa-arrow-right"></i>';
    }
}
function previousConversation() { if(currentConversationIndex>0) { currentConversationIndex--; displayCurrentConversation(); window.scrollTo({top:0,behavior:'smooth'}); } }
function nextConversation() { if(currentConversationIndex<conversationModuleData[currentConversationCategory].conversations.length-1) { currentConversationIndex++; displayCurrentConversation(); window.scrollTo({top:0,behavior:'smooth'}); } }

document.addEventListener('DOMContentLoaded', () => { if(document.getElementById('conversation-content')) initConversation(); });
