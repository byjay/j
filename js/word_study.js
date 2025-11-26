const conversationModuleData = {
    'immigration': {
        title: '입국 심사',
        icon: 'fas fa-passport',
        color: 'blue',
        conversations: [
            // [1~5] 기본 필수 질문
            { 
                question: { jp: 'パスポートを見せてください。', kr: '여권을 보여주세요.', romaji: 'Pasupo-to o misete kudasai', vocab: [{word:'パスポート', read:'파스포-토', mean:'여권'}, {word:'見せる', read:'미세루', mean:'보여주다'}] },
                answers: [{ jp: 'はい、どうぞ。', kr: '네, 여기 있습니다.', romaji: 'Hai, douzo', vocab: [] }, { jp: '入国カードもここにあります。', kr: '입국 카드도 여기 있습니다.', romaji: 'Nyuukoku ka-do mo koko ni arimasu', vocab: [] }] 
            },
            { 
                question: { jp: '訪問の目的は何ですか？', kr: '방문 목적은 무엇입니까?', romaji: 'Houmon no mokuteki wa nan desu ka?', vocab: [{word:'訪問', read:'호-몬', mean:'방문'}, {word:'目的', read:'모쿠테키', mean:'목적'}] },
                answers: [{ jp: '観光です。', kr: '관광입니다.', romaji: 'Kankou desu', vocab: [] }, { jp: '仕事できました。', kr: '일 때문에 왔습니다.', romaji: 'Shigoto de kimashita', vocab: [] }] 
            },
            { 
                question: { jp: 'どのくらい滞在しますか？', kr: '얼마나 체류합니까?', romaji: 'Dono kurai taizai shimasu ka?', vocab: [{word:'滞在', read:'타이자이', mean:'체류'}] },
                answers: [{ jp: '3泊4日です。', kr: '3박 4일입니다.', romaji: 'Sanpaku yokka desu', vocab: [] }, { jp: '一週間です。', kr: '일주일입니다.', romaji: 'Isshuukan desu', vocab: [] }] 
            },
            { 
                question: { jp: 'どこに泊まりますか？', kr: '어디에 묵습니까?', romaji: 'Doko ni tomarimasu ka?', vocab: [{word:'泊まる', read:'토마루', mean:'묵다'}] },
                answers: [{ jp: '予約したホテルです。', kr: '예약한 호텔입니다.', romaji: 'Yoyaku shita hoteru desu', vocab: [] }, { jp: '友人の家です。', kr: '친구 집입니다.', romaji: 'Yuujin no ie desu', vocab: [] }] 
            },
            { 
                question: { jp: '帰りのチケットは持っていますか？', kr: '돌아가는 티켓은 가지고 있나요?', romaji: 'Kaeri no chiketto wa motte imasu ka?', vocab: [{word:'帰り', read:'카에리', mean:'귀국'}, {word:'チケット', read:'치켓토', mean:'티켓'}] },
                answers: [{ jp: 'はい、Eチケットがあります。', kr: '네, E티켓이 있습니다.', romaji: 'Hai, i-chiketto ga arimasu', vocab: [] }, { jp: 'スマホに入っています。', kr: '스마트폰에 들어있습니다.', romaji: 'Sumaho ni haitte imasu', vocab: [] }] 
            },
            // [6~10] 동반자 및 체류 경험
            { 
                question: { jp: 'お一人ですか？', kr: '혼자입니까?', romaji: 'Ohitori desu ka?', vocab: [{word:'一人', read:'히토리', mean:'한 명/혼자'}] },
                answers: [{ jp: 'はい、一人旅です。', kr: '네, 혼자 여행입니다.', romaji: 'Hai, hitoritabi desu', vocab: [] }, { jp: 'いいえ、家族と一緒です。', kr: '아뇨, 가족과 함께입니다.', romaji: 'Iie, kazoku to issho desu', vocab: [] }] 
            },
            { 
                question: { jp: '日本の滞在は初めてですか？', kr: '일본 체류는 처음입니까?', romaji: 'Nihon no taizai wa hajimete desu ka?', vocab: [{word:'初めて', read:'하지메테', mean:'처음'}] },
                answers: [{ jp: 'はい、初めてです。', kr: '네, 처음입니다.', romaji: 'Hai, hajimete desu', vocab: [] }, { jp: 'いいえ、3回目です。', kr: '아뇨, 3번째입니다.', romaji: 'Iie, sankai me desu', vocab: [] }] 
            },
            { 
                question: { jp: '職業は何ですか？', kr: '직업이 무엇입니까?', romaji: 'Shokugyou wa nan desu ka?', vocab: [{word:'職業', read:'쇼쿠교-', mean:'직업'}] },
                answers: [{ jp: '会社員です。', kr: '회사원입니다.', romaji: 'Kaishain desu', vocab: [] }, { jp: '学生です。', kr: '학생입니다.', romaji: 'Gakusei desu', vocab: [] }] 
            },
            { 
                question: { jp: '所持金はいくらですか？', kr: '소지금은 얼마입니까?', romaji: 'Shojikin wa ikura desu ka?', vocab: [{word:'所持金', read:'쇼지킨', mean:'소지금'}] },
                answers: [{ jp: '5万円くらいです。', kr: '5만엔 정도입니다.', romaji: 'Gomanen kurai desu', vocab: [] }, { jp: '現金は少しで、カードを使います。', kr: '현금은 조금이고, 카드를 씁니다.', romaji: 'Genkin wa sukoshi de, ka-do o tsukaimasu', vocab: [] }] 
            },
            { 
                question: { jp: 'マスクを外してください。', kr: '마스크를 벗어주세요.', romaji: 'Masuku o hazushite kudasai', vocab: [{word:'外す', read:'하즈스', mean:'벗다/풀다'}] },
                answers: [{ jp: 'はい、これでいいですか？', kr: '네, 이러면 되나요?', romaji: 'Hai, kore de ii desu ka?', vocab: [] }, { jp: '眼鏡も外しますか？', kr: '안경도 벗을까요?', romaji: 'Megane mo hazushimasu ka?', vocab: [] }] 
            },
            // [11~20] 생체 정보 및 수하물
            { 
                question: { jp: '両手の人差し指を置いてください。', kr: '양손 검지를 올려주세요.', romaji: 'Ryoute no hitosashiyubi o oite kudasai', vocab: [{word:'人差し指', read:'히토사시유비', mean:'검지'}] },
                answers: [{ jp: 'ここですか？', kr: '여기요?', romaji: 'Koko desu ka?', vocab: [] }, { jp: '強く押したほうがいいですか？', kr: '세계 누르는 게 좋나요?', romaji: 'Tsuyoku oshita hou ga ii desu ka?', vocab: [] }] 
            },
            { 
                question: { jp: 'カメラを見てください。', kr: '카메라를 봐주세요.', romaji: 'Kamera o mite kudasai', vocab: [] },
                answers: [{ jp: 'はい。', kr: '네.', romaji: 'Hai', vocab: [] }, { jp: '動かないでください。', kr: '(심사관) 움직이지 마세요.', romaji: 'Ugokanaide kudasai', vocab: [] }] 
            },
            { 
                question: { jp: '申告するものはありますか？', kr: '신고할 물건이 있습니까?', romaji: 'Shinkoku suru mono wa arimasu ka?', vocab: [{word:'申告', read:'신코쿠', mean:'신고'}] },
                answers: [{ jp: 'いいえ、ありません。', kr: '아뇨, 없습니다.', romaji: 'Iie, arimasen', vocab: [] }, { jp: 'タバコが2カートンあります。', kr: '담배가 2보루 있습니다.', romaji: 'Tabako ga ni-ka-ton arimasu', vocab: [] }] 
            },
            { 
                question: { jp: 'この荷物は誰のものですか？', kr: '이 짐은 누구 것입니까?', romaji: 'Kono nimotsu wa dare no mono desu ka?', vocab: [{word:'荷物', read:'니모츠', mean:'짐'}] },
                answers: [{ jp: '全て私のものです。', kr: '전부 제 것입니다.', romaji: 'Subete watashi no mono desu', vocab: [] }, { jp: '友人から頼まれたものです。', kr: '친구에게 부탁받은 것입니다.', romaji: 'Yuujin kara tanomareta mono desu', vocab: [] }] 
            },
            { 
                question: { jp: '中身は何ですか？', kr: '내용물은 무엇입니까?', romaji: 'Nakami wa nan desu ka?', vocab: [{word:'中身', read:'나카미', mean:'내용물'}] },
                answers: [{ jp: '服と洗面用具です。', kr: '옷과 세면도구입니다.', romaji: 'Fuku to senmenyougu desu', vocab: [] }, { jp: 'お土産のお菓子です。', kr: '선물용 과자입니다.', romaji: 'Omiyage no okashi desu', vocab: [] }] 
            },
            { 
                question: { jp: '肉や果物は持っていますか？', kr: '고기나 과일은 가지고 있습니까?', romaji: 'Niku ya kudamono wa motte imasu ka?', vocab: [{word:'肉', read:'니쿠', mean:'고기'}, {word:'果物', read:'쿠다모노', mean:'과일'}] },
                answers: [{ jp: '持っていません。', kr: '안 가지고 있습니다.', romaji: 'Motte imasen', vocab: [] }, { jp: 'カップラーメンがあります。', kr: '컵라면이 있습니다.', romaji: 'Kappura-men ga arimasu', vocab: [] }] 
            },
            { 
                question: { jp: 'トランクを開けてください。', kr: '트렁크(가방)를 열어주세요.', romaji: 'Toranku o akete kudasai', vocab: [{word:'開ける', read:'아케루', mean:'열다'}] },
                answers: [{ jp: 'はい、鍵を開けます。', kr: '네, 잠금을 풀게요.', romaji: 'Hai, kagi o akemasu', vocab: [] }, { jp: '下着が入っていますが…。', kr: '속옷이 들어있는데요...', romaji: 'Shitagi ga haitte imasuga...', vocab: [] }] 
            },
            { 
                question: { jp: '乗り継ぎですか？', kr: '환승입니까?', romaji: 'Noritsugi desu ka?', vocab: [{word:'乗り継ぎ', read:'노리츠기', mean:'환승/경유'}] },
                answers: [{ jp: 'はい、アメリカへ行きます。', kr: '네, 미국으로 갑니다.', romaji: 'Hai, amerika e ikimasu', vocab: [] }, { jp: 'いいえ、ここが最終目的地です。', kr: '아뇨, 여기가 최종 목적지입니다.', romaji: 'Iie, koko ga saishuumokutekichi desu', vocab: [] }] 
            },
            { 
                question: { jp: 'ビザはお持ちですか？', kr: '비자는 가지고 계신가요?', romaji: 'Biza wa omochi desu ka?', vocab: [{word:'ビザ', read:'비자', mean:'비자/사증'}] },
                answers: [{ jp: '観光ビザを持っています。', kr: '관광 비자를 가지고 있습니다.', romaji: 'Kankou biza o motte imasu', vocab: [] }, { jp: 'ノービザで来ました。', kr: '무비자로 왔습니다.', romaji: 'No-biza de kimashita', vocab: [] }] 
            },
            { 
                question: { jp: '日本語は話せますか？', kr: '일본어 할 수 있습니까?', romaji: 'Nihongo wa hanasemasu ka?', vocab: [{word:'話す', read:'하나스', mean:'말하다'}] },
                answers: [{ jp: '少しだけ話せます。', kr: '조금만 할 수 있어요.', romaji: 'Sukoshi dake hanasemasu', vocab: [] }, { jp: '英語でお願いします。', kr: '영어로 부탁합니다.', romaji: 'Eigo de onegaishimasu', vocab: [] }] 
            },
            // [21~30] 돌발 상황 및 도움 요청
            { 
                question: { jp: '入国カードの書き方がわかりません。', kr: '(역질문) 입국 카드 쓰는 법을 모르겠어요.', romaji: 'Nyuukoku ka-do no kakikata ga wakarimasen', vocab: [{word:'書き方', read:'카키카타', mean:'쓰는 법'}] },
                answers: [{ jp: '韓国語の様式はありますか？', kr: '한국어 양식은 있나요?', romaji: 'Kankokugo no youshiki wa arimasu ka?', vocab: [] }, { jp: 'ボールペンを貸してください。', kr: '볼펜 좀 빌려주세요.', romaji: 'Bo-rupen o kashite kudasai', vocab: [] }] 
            },
            { 
                question: { jp: '列を間違えましたか？', kr: '(역질문) 줄을 잘못 섰나요?', romaji: 'Retsu o machigaemashita ka?', vocab: [{word:'列', read:'레츠', mean:'줄/열'}, {word:'間違える', read:'마치가에루', mean:'틀리다/실수하다'}] },
                answers: [{ jp: '外国人はあちらです。', kr: '외국인은 저쪽입니다.', romaji: 'Gaikokujin wa achira desu', vocab: [] }, { jp: 'こちらに並んでください。', kr: '이쪽에 서 주세요.', romaji: 'Kochira ni narande kudasai', vocab: [] }] 
            },
            { 
                question: { jp: '荷物が出てきません。', kr: '(문제) 짐이 안 나와요.', romaji: 'Nimotsu ga dete kimasen', vocab: [{word:'出る', read:'데루', mean:'나오다'}] },
                answers: [{ jp: '手荷物カウンターへ行ってください。', kr: '수하물 카운터로 가보세요.', romaji: 'Tenimotsu kaunta- e itte kudasai', vocab: [] }, { jp: '便名は何番ですか？', kr: '편명이 몇 번인가요?', romaji: 'Binmei wa nanban desu ka?', vocab: [] }] 
            },
            { 
                question: { jp: '出口はどこですか？', kr: '(역질문) 출구는 어디인가요?', romaji: 'Deguchi wa doko desu ka?', vocab: [{word:'出口', read:'데구치', mean:'출구'}] },
                answers: [{ jp: 'あちらです。', kr: '저쪽입니다.', romaji: 'Achira desu', vocab: [] }, { jp: '税関を通ってからです。', kr: '세관을 통과한 후입니다.', romaji: 'Zeikan o tootte kara desu', vocab: [] }] 
            },
            { 
                question: { jp: 'Wi-Fiは使えますか？', kr: '(역질문) 와이파이 쓸 수 있나요?', romaji: 'Waifai wa tsukaemasu ka?', vocab: [] },
                answers: [{ jp: 'フリーWi-Fiがあります。', kr: '무료 와이파이가 있습니다.', romaji: 'Furi- waifai ga arimasu', vocab: [] }, { jp: 'パスワードは不要です。', kr: '비밀번호는 필요 없습니다.', romaji: 'Pasuwa-do wa fuyou desu', vocab: [] }] 
            },
            { 
                question: { jp: 'トイレに行ってもいいですか？', kr: '(역질문) 화장실 가도 되나요?', romaji: 'Toire ni ittemo ii desu ka?', vocab: [] },
                answers: [{ jp: '審査が終わってからです。', kr: '심사가 끝난 후에요.', romaji: 'Shinsa ga owatte kara desu', vocab: [] }, { jp: 'はい、急いでください。', kr: '네, 서둘러 주세요.', romaji: 'Hai, isoide kudasai', vocab: [] }] 
            },
            { 
                question: { jp: '審査に時間がかかりますか？', kr: '(역질문) 심사에 시간이 걸리나요?', romaji: 'Shinsa ni jikan ga kakarimasu ka?', vocab: [{word:'時間', read:'지칸', mean:'시간'}] },
                answers: [{ jp: '混んでいるので30分くらいです。', kr: '붐비고 있어서 30분 정도입니다.', romaji: 'Konde iru node sanjuppun kurai desu', vocab: [] }, { jp: 'すぐ終わります。', kr: '금방 끝납니다.', romaji: 'Sugu owarimasu', vocab: [] }] 
            },
            { 
                question: { jp: '別室へ来てください。', kr: '(문제) 별실로 와주세요.', romaji: 'Besshitsu e kite kudasai', vocab: [{word:'別室', read:'벳시츠', mean:'별실'}] },
                answers: [{ jp: '私は何もしていません。', kr: '저는 아무것도 안 했습니다.', romaji: 'Watashi wa nanimo shite imasen', vocab: [] }, { jp: '通訳をお願いします。', kr: '통역을 부탁합니다.', romaji: 'Tsuuyaku o onegaishimasu', vocab: [] }] 
            },
            { 
                question: { jp: '連絡先はありますか？', kr: '연락처가 있습니까?', romaji: 'Renrakusaki wa arimasu ka?', vocab: [{word:'連絡先', read:'렌라쿠사키', mean:'연락처'}] },
                answers: [{ jp: 'ホテルの電話番号です。', kr: '호텔 전화번호입니다.', romaji: 'Hoteru no denwabangou desu', vocab: [] }, { jp: '日本の友人の番号です。', kr: '일본 친구 번호입니다.', romaji: 'Nihon no yuujin no bangou desu', vocab: [] }] 
            },
            { 
                question: { jp: 'ようこそ日本へ。', kr: '일본에 오신 걸 환영합니다.', romaji: 'Youkoso Nihon e', vocab: [{word:'ようこそ', read:'요-코소', mean:'환영합니다/어서오세요'}] },
                answers: [{ jp: 'ありがとうございます。', kr: '감사합니다.', romaji: 'Arigatou gozaimasu', vocab: [] }, { jp: 'お世話になります。', kr: '신세 지겠습니다(잘 부탁합니다).', romaji: 'Osewa ni narimasu', vocab: [] }] 
            }
        ]
    },
    // ... 다른 카테고리들도 동일한 방식으로 30개씩 채워져야 합니다 (생략)
};
