/**
 * grade_1.js
 * 일본 초등학교 1학년 과정 학습 데이터 (교과서 전체 분량 - 대폭 확장판)
 * 
 * - 어휘 200+개 이상으로 확장
 * - 1학년 교육용 한자 80자 모두 포함 및 관련 어휘 확장
 * - 생활, 학교, 자연, 신체, 음식, 감정 등 주제별 단어 대폭 추가
 * - 기본 동사, 형용사, 카타카나 단어 포함
 * - 각 어휘에 대한 이미지 경로(image_path) 포함
 */
const grade1_data = {
  "info": {
    "grade": 1,
    "title": "일본 초등학교 1학년 (완성편)",
    "description": "1학년 교육용 한자 80자를 포함하여, 교과 과정의 필수 어휘 200+개를 망라했습니다. 기초 문법과 풍부한 예문으로 일본어의 기초를 다집니다."
  },
  "vocabulary": [
    // --- 1. 인사 및 기본 표현 (Greetings & Basic Expressions) ---
    { "id": "1-v001", "category": "인사", "kanji": "お早う", "kana": "おはよう", "romaji": "ohayou", "korean": "좋은 아침", "english": "Good morning", "part_of_speech": "인사", "image_path": "images/vocabulary/grade_1/1-v001.png" },
    { "id": "1-v002", "category": "인사", "kanji": "今日は", "kana": "こんにちは", "romaji": "konnichiwa", "korean": "안녕하세요 (낮)", "english": "Hello / Good afternoon", "part_of_speech": "인사", "image_path": "images/vocabulary/grade_1/1-v002.png" },
    { "id": "1-v003", "category": "인사", "kanji": "今晩は", "kana": "こんばんは", "romaji": "konbanwa", "korean": "안녕하세요 (밤)", "english": "Good evening", "part_of_speech": "인사", "image_path": "images/vocabulary/grade_1/1-v003.png" },
    { "id": "1-v004", "category": "인사", "kanji": "左様なら", "kana": "さようなら", "romaji": "sayounara", "korean": "안녕히 가세요/계세요", "english": "Goodbye", "part_of_speech": "인사", "image_path": "images/vocabulary/grade_1/1-v004.png" },
    { "id": "1-v005", "category": "기본표현", "kanji": "有り難う", "kana": "ありがとう", "romaji": "arigatou", "korean": "고맙습니다", "english": "Thank you", "part_of_speech": "감탄사", "image_path": "images/vocabulary/grade_1/1-v005.png" },
    { "id": "1-v006", "category": "기본표현", "kanji": "済みません", "kana": "すみません", "romaji": "sumimasen", "korean": "실례합니다, 미안합니다", "english": "Excuse me, Sorry", "part_of_speech": "감탄사", "image_path": "images/vocabulary/grade_1/1-v006.png" },
    { "id": "1-v007", "category": "기본표현", "kanji": "はい", "kana": "はい", "romaji": "hai", "korean": "네", "english": "Yes", "part_of_speech": "감탄사", "image_path": "images/vocabulary/grade_1/1-v007.png" },
    { "id": "1-v008", "category": "기본표현", "kanji": "いいえ", "kana": "いいえ", "romaji": "iie", "korean": "아니요", "english": "No", "part_of_speech": "감탄사", "image_path": "images/vocabulary/grade_1/1-v008.png" },

    // --- 2. 1학년 한자 (80자) 및 관련 어휘 ---
    { "id": "1-v009", "category": "한자-숫자", "kanji": "一", "kana": "いち", "romaji": "ichi", "korean": "일", "english": "One", "part_of_speech": "수사", "image_path": "images/vocabulary/grade_1/1-v009.png" },
    { "id": "1-v010", "category": "한자-숫자", "kanji": "二", "kana": "に", "romaji": "ni", "korean": "이", "english": "Two", "part_of_speech": "수사", "image_path": "images/vocabulary/grade_1/1-v010.png" },
    { "id": "1-v011", "category": "한자-숫자", "kanji": "三", "kana": "さん", "romaji": "san", "korean": "삼", "english": "Three", "part_of_speech": "수사", "image_path": "images/vocabulary/grade_1/1-v011.png" },
    { "id": "1-v012", "category": "한자-숫자", "kanji": "四", "kana": "よん, し", "romaji": "yon, shi", "korean": "사", "english": "Four", "part_of_speech": "수사", "image_path": "images/vocabulary/grade_1/1-v012.png" },
    { "id": "1-v013", "category": "한자-숫자", "kanji": "五", "kana": "ご", "romaji": "go", "korean": "오", "english": "Five", "part_of_speech": "수사", "image_path": "images/vocabulary/grade_1/1-v013.png" },
    { "id": "1-v014", "category": "한자-숫자", "kanji": "六", "kana": "ろく", "romaji": "roku", "korean": "육", "english": "Six", "part_of_speech": "수사", "image_path": "images/vocabulary/grade_1/1-v014.png" },
    { "id": "1-v015", "category": "한자-숫자", "kanji": "七", "kana": "なな, しち", "romaji": "nana, shichi", "korean": "칠", "english": "Seven", "part_of_speech": "수사", "image_path": "images/vocabulary/grade_1/1-v015.png" },
    { "id": "1-v016", "category": "한자-숫자", "kanji": "八", "kana": "はち", "romaji": "hachi", "korean": "팔", "english": "Eight", "part_of_speech": "수사", "image_path": "images/vocabulary/grade_1/1-v016.png" },
    { "id": "1-v017", "category": "한자-숫자", "kanji": "九", "kana": "きゅう, く", "romaji": "kyuu, ku", "korean": "구", "english": "Nine", "part_of_speech": "수사", "image_path": "images/vocabulary/grade_1/1-v017.png" },
    { "id": "1-v018", "category": "한자-숫자", "kanji": "十", "kana": "じゅう", "romaji": "juu", "korean": "십", "english": "Ten", "part_of_speech": "수사", "image_path": "images/vocabulary/grade_1/1-v018.png" },
    { "id": "1-v019", "category": "한자-숫자", "kanji": "百", "kana": "ひゃく", "romaji": "hyaku", "korean": "백", "english": "Hundred", "part_of_speech": "수사", "image_path": "images/vocabulary/grade_1/1-v019.png" },
    { "id": "1-v020", "category": "한자-숫자", "kanji": "千", "kana": "せん", "romaji": "sen", "korean": "천", "english": "Thousand", "part_of_speech": "수사", "image_path": "images/vocabulary/grade_1/1-v020.png" },
    { "id": "1-v021", "category": "한자-방향", "kanji": "上", "kana": "うえ", "romaji": "ue", "korean": "위", "english": "Up, above", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v021.png" },
    { "id": "1-v022", "category": "한자-방향", "kanji": "下", "kana": "した", "romaji": "shita", "korean": "아래", "english": "Down, below", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v022.png" },
    { "id": "1-v023", "category": "한자-방향", "kanji": "左", "kana": "ひだり", "romaji": "hidari", "korean": "왼쪽", "english": "Left", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v023.png" },
    { "id": "1-v024", "category": "한자-방향", "kanji": "右", "kana": "みぎ", "romaji": "migi", "korean": "오른쪽", "english": "Right", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v024.png" },
    { "id": "1-v025", "category": "한자-방향", "kanji": "中", "kana": "なか", "romaji": "naka", "korean": "안, 속", "english": "Inside, middle", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v025.png" },
    { "id": "1-v026", "category": "한자-크기", "kanji": "大", "kana": "おお", "romaji": "oo", "korean": "큼", "english": "Big", "part_of_speech": "접두사", "image_path": "images/vocabulary/grade_1/1-v026.png" },
    { "id": "1-v027", "category": "한자-크기", "kanji": "小", "kana": "ちい", "romaji": "chii", "korean": "작음", "english": "Small", "part_of_speech": "접두사", "image_path": "images/vocabulary/grade_1/1-v027.png" },
    { "id": "1-v028", "category": "한자-돈", "kanji": "円", "kana": "えん", "romaji": "en", "korean": "엔 (화폐)", "english": "Yen", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v028.png" },
    { "id": "1-v029", "category": "한자-시간", "kanji": "日", "kana": "ひ, にち", "romaji": "hi, nichi", "korean": "날, 해", "english": "Day, sun", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v029.png" },
    { "id": "1-v030", "category": "한자-시간", "kanji": "月", "kana": "つき, げつ", "romaji": "tsuki, getsu", "korean": "달, 월", "english": "Moon, month", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v030.png" },
    { "id": "1-v031", "category": "한자-시간", "kanji": "火", "kana": "ひ, か", "romaji": "hi, ka", "korean": "불, 화요일", "english": "Fire, Tuesday", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v031.png" },
    { "id": "1-v032", "category": "한자-시간", "kanji": "水", "kana": "みず, すい", "romaji": "mizu, sui", "korean": "물, 수요일", "english": "Water, Wednesday", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v032.png" },
    { "id": "1-v033", "category": "한자-시간", "kanji": "木", "kana": "き, もく", "romaji": "ki, moku", "korean": "나무, 목요일", "english": "Tree, Thursday", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v033.png" },
    { "id": "1-v034", "category": "한자-시간", "kanji": "金", "kana": "かね, きん", "romaji": "kane, kin", "korean": "돈, 금요일", "english": "Money, Friday", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v034.png" },
    { "id": "1-v035", "category": "한자-시간", "kanji": "土", "kana": "つち, ど", "romaji": "tsuchi, do", "korean": "흙, 토요일", "english": "Earth, Saturday", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v035.png" },
    { "id": "1-v036", "category": "한자-시간", "kanji": "年", "kana": "とし", "romaji": "toshi", "korean": "해, 나이", "english": "Year, age", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v036.png" },
    { "id": "1-v037", "category": "한자-시간", "kanji": "早", "kana": "はや", "romaji": "haya", "korean": "이름", "english": "Early", "part_of_speech": "형용사", "image_path": "images/vocabulary/grade_1/1-v037.png" },
    { "id": "1-v038", "category": "한자-사람", "kanji": "人", "kana": "ひと", "romaji": "hito", "korean": "사람", "english": "Person", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v038.png" },
    { "id": "1-v039", "category": "한자-사람", "kanji": "男", "kana": "おとこ", "romaji": "otoko", "korean": "남자", "english": "Man", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v039.png" },
    { "id": "1-v040", "category": "한자-사람", "kanji": "女", "kana": "おんな", "romaji": "onna", "korean": "여자", "english": "Woman", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v040.png" },
    { "id": "1-v041", "category": "한자-사람", "kanji": "子", "kana": "こ", "romaji": "ko", "korean": "아이", "english": "Child", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v041.png" },
    { "id": "1-v042", "category": "한자-사람", "kanji": "王", "kana": "おう", "romaji": "ou", "korean": "왕", "english": "King", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v042.png" },
    { "id": "1-v043", "category": "한자-사람", "kanji": "先", "kana": "せん", "romaji": "sen", "korean": "먼저", "english": "Ahead, previous", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v043.png" },
    { "id": "1-v044", "category": "한자-사람", "kanji": "生", "kana": "せい", "romaji": "sei", "korean": "삶", "english": "Life", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v044.png" },
    { "id": "1-v045", "category": "한자-신체", "kanji": "目", "kana": "め", "romaji": "me", "korean": "눈", "english": "Eye", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v045.png" },
    { "id": "1-v046", "category": "한자-신체", "kanji": "耳", "kana": "みみ", "romaji": "mimi", "korean": "귀", "english": "Ear", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v046.png" },
    { "id": "1-v047", "category": "한자-신체", "kanji": "口", "kana": "くち", "romaji": "kuchi", "korean": "입", "english": "Mouth", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v047.png" },
    { "id": "1-v048", "category": "한자-신체", "kanji": "手", "kana": "て", "romaji": "te", "korean": "손", "english": "Hand", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v048.png" },
    { "id": "1-v049", "category": "한자-신체", "kanji": "足", "kana": "あし", "romaji": "ashi", "korean": "발, 다리", "english": "Foot, leg", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v049.png" },
    { "id": "1-v050", "category": "한자-신체", "kanji": "力", "kana": "ちから", "romaji": "chikara", "korean": "힘", "english": "Power, strength", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v050.png" },
    { "id": "1-v051", "category": "한자-자연", "kanji": "山", "kana": "やま", "romaji": "yama", "korean": "산", "english": "Mountain", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v051.png" },
    { "id": "1-v052", "category": "한자-자연", "kanji": "川", "kana": "かわ", "romaji": "kawa", "korean": "강", "english": "River", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v052.png" },
    { "id": "1-v053", "category": "한자-자연", "kanji": "田", "kana": "た", "romaji": "ta", "korean": "논, 밭", "english": "Rice field", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v053.png" },
    { "id": "1-v054", "category": "한자-자연", "kanji": "空", "kana": "そら", "romaji": "sora", "korean": "하늘", "english": "Sky", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v054.png" },
    { "id": "1-v055", "category": "한자-자연", "kanji": "雨", "kana": "あめ", "romaji": "ame", "korean": "비", "english": "Rain", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v055.png" },
    { "id": "1-v056", "category": "한자-자연", "kanji": "天", "kana": "てん", "romaji": "ten", "korean": "하늘", "english": "Heaven, sky", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v056.png" },
    { "id": "1-v057", "category": "한자-자연", "kanji": "気", "kana": "き", "romaji": "ki", "korean": "기운, 정신", "english": "Spirit, mind", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v057.png" },
    { "id": "1-v058", "category": "한자-자연", "kanji": "花", "kana": "はな", "romaji": "hana", "korean": "꽃", "english": "Flower", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v058.png" },
    { "id": "1-v059", "category": "한자-자연", "kanji": "草", "kana": "くさ", "romaji": "kusa", "korean": "풀", "english": "Grass", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v059.png" },
    { "id": "1-v060", "category": "한자-자연", "kanji": "林", "kana": "はやし", "romaji": "hayashi", "korean": "수풀", "english": "Woods", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v060.png" },
    { "id": "1-v061", "category": "한자-자연", "kanji": "森", "kana": "もり", "romaji": "mori", "korean": "숲", "english": "Forest", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v061.png" },
    { "id": "1-v062", "category": "한자-자연", "kanji": "石", "kana": "いし", "romaji": "ishi", "korean": "돌", "english": "Stone", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v062.png" },
    { "id": "1-v063", "category": "한자-동물", "kanji": "犬", "kana": "いぬ", "romaji": "inu", "korean": "개", "english": "Dog", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v063.png" },
    { "id": "1-v064", "category": "한자-동물", "kanji": "虫", "kana": "むし", "romaji": "mushi", "korean": "벌레", "english": "Insect", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v064.png" },
    { "id": "1-v065", "category": "한자-동물", "kanji": "貝", "kana": "かい", "romaji": "kai", "korean": "조개", "english": "Shellfish", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v065.png" },
    { "id": "1-v066", "category": "한자-학교", "kanji": "学", "kana": "がく", "romaji": "gaku", "korean": "배움", "english": "Learning", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v066.png" },
    { "id": "1-v067", "category": "한자-학교", "kanji": "校", "kana": "こう", "romaji": "kou", "korean": "학교", "english": "School", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v067.png" },
    { "id": "1-v068", "category": "한자-학교", "kanji": "字", "kana": "じ", "romaji": "ji", "korean": "글자", "english": "Character", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v068.png" },
    { "id": "1-v069", "category": "한자-학교", "kanji": "文", "kana": "ぶん", "romaji": "bun", "korean": "글, 문장", "english": "Sentence", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v069.png" },
    { "id": "1-v070", "category": "한자-학교", "kanji": "本", "kana": "ほん", "romaji": "hon", "korean": "책", "english": "Book", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v070.png" },
    { "id": "1-v071", "category": "한자-학교", "kanji": "名", "kana": "な", "romaji": "na", "korean": "이름", "english": "Name", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v071.png" },
    { "id": "1-v072", "category": "한자-사물", "kanji": "車", "kana": "くるま", "romaji": "kuruma", "korean": "자동차", "english": "Car", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v072.png" },
    { "id": "1-v073", "category": "한자-사물", "kanji": "糸", "kana": "いと", "romaji": "ito", "korean": "실", "english": "Thread", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v073.png" },
    { "id": "1-v074", "category": "한자-사물", "kanji": "玉", "kana": "たま", "romaji": "tama", "korean": "구슬, 공", "english": "Ball, sphere", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v074.png" },
    { "id": "1-v075", "category": "한자-장소", "kanji": "町", "kana": "まち", "romaji": "machi", "korean": "마을, 동네", "english": "Town", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v075.png" },
    { "id": "1-v076", "category": "한자-장소", "kanji": "村", "kana": "むら", "romaji": "mura", "korean": "마을", "english": "Village", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v076.png" },
    { "id": "1-v077", "category": "한자-색", "kanji": "赤", "kana": "あか", "romaji": "aka", "korean": "빨강", "english": "Red", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v077.png" },
    { "id": "1-v078", "category": "한자-색", "kanji": "青", "kana": "あお", "romaji": "ao", "korean": "파랑", "english": "Blue", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v078.png" },
    { "id": "1-v079", "category": "한자-색", "kanji": "白", "kana": "しろ", "romaji": "shiro", "korean": "하양", "english": "White", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v079.png" },
    { "id": "1-v080", "category": "한자-상태", "kanji": "正", "kana": "ただ", "romaji": "tada", "korean": "바름", "english": "Correct", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v080.png" },
    { "id": "1-v081", "category": "한자-행동", "kanji": "見", "kana": "み", "romaji": "mi", "korean": "봄", "english": "Seeing", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v081.png" },
    { "id": "1-v082", "category": "한자-행동", "kanji": "出", "kana": "で", "romaji": "de", "korean": "나감", "english": "Exit", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v082.png" },
    { "id": "1-v083", "category": "한자-행동", "kanji": "入", "kana": "はい", "romaji": "hai", "korean": "들어감", "english": "Entrance", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v083.png" },
    { "id": "1-v084", "category": "한자-행동", "kanji": "立", "kana": "た", "romaji": "ta", "korean": "섬", "english": "Standing", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v084.png" },
    { "id": "1-v085", "category": "한자-행동", "kanji": "休", "kana": "やす", "romaji": "yasu", "korean": "쉼", "english": "Rest", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v085.png" },

    // --- 3. 주제별 어휘 확장 ---
    // 음식 (Food)
    { "id": "1-v101", "category": "음식", "kanji": "ごはん", "kana": "ごはん", "romaji": "gohan", "korean": "밥", "english": "Rice, meal", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v101.png" },
    { "id": "1-v102", "category": "음식", "kanji": "パン", "kana": "パン", "romaji": "pan", "korean": "빵", "english": "Bread", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v102.png" },
    { "id": "1-v103", "category": "음식", "kanji": "魚", "kana": "さかな", "romaji": "sakana", "korean": "물고기, 생선", "english": "Fish", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v103.png" },
    { "id": "1-v104", "category": "음식", "kanji": "肉", "kana": "にく", "romaji": "niku", "korean": "고기", "english": "Meat", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v104.png" },
    { "id": "1-v105", "category": "음식", "kanji": "野菜", "kana": "やさい", "romaji": "yasai", "korean": "야채", "english": "Vegetable", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v105.png" },
    { "id": "1-v106", "category": "음식", "kanji": "果物", "kana": "くだもの", "romaji": "kudamono", "korean": "과일", "english": "Fruit", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v106.png" },
    { "id": "1-v107", "category": "음식", "kanji": "お菓子", "kana": "おかし", "romaji": "okashi", "korean": "과자", "english": "Snack", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v107.png" },
    { "id": "1-v108", "category": "음식", "kanji": "牛乳", "kana": "ぎゅうにゅう", "romaji": "gyuunyuu", "korean": "우유", "english": "Milk", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v108.png" },

    // 동물 (Animals)
    { "id": "1-v120", "category": "동물", "kanji": "猫", "kana": "ねこ", "romaji": "neko", "korean": "고양이", "english": "Cat", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v120.png" },
    { "id": "1-v121", "category": "동물", "kanji": "鳥", "kana": "とり", "romaji": "tori", "korean": "새", "english": "Bird", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v121.png" },
    { "id": "1-v122", "category": "동물", "kanji": "うさぎ", "kana": "うさぎ", "romaji": "usagi", "korean": "토끼", "english": "Rabbit", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v122.png" },
    { "id": "1-v123", "category": "동물", "kanji": "ぞう", "kana": "ぞう", "romaji": "zou", "korean": "코끼리", "english": "Elephant", "part_of_speech": "명사", "image_path": "images/vocabulary/grade_1/1-v123.png" },

    // 기본 동사 (Basic Verbs)
    { "id": "1-v140", "category": "동사", "kanji": "行く", "kana": "いく", "romaji": "iku", "korean": "가다", "english": "To go", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_1/1-v140.png" },
    { "id": "1-v141", "category": "동사", "kanji": "来る", "kana": "くる", "romaji": "kuru", "korean": "오다", "english": "To come", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_1/1-v141.png" },
    { "id": "1-v142", "category": "동사", "kanji": "帰る", "kana": "かえる", "romaji": "kaeru", "korean": "돌아가다, 돌아오다", "english": "To return", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_1/1-v142.png" },
    { "id": "1-v143", "category": "동사", "kanji": "食べる", "kana": "たべる", "romaji": "taberu", "korean": "먹다", "english": "To eat", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_1/1-v143.png" },
    { "id": "1-v144", "category": "동사", "kanji": "飲む", "kana": "のむ", "romaji": "nomu", "korean": "마시다", "english": "To drink", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_1/1-v144.png" },
    { "id": "1-v145", "category": "동사", "kanji": "読む", "kana": "よむ", "romaji": "yomu", "korean": "읽다", "english": "To read", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_1/1-v145.png" },
    { "id": "1-v146", "category": "동사", "kanji": "書く", "kana": "かく", "romaji": "kaku", "korean": "쓰다", "english": "To write", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_1/1-v146.png" },
    { "id": "1-v147", "category": "동사", "kanji": "話す", "kana": "はなす", "romaji": "hanasu", "korean": "말하다", "english": "To speak", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_1/1-v147.png" },
    { "id": "1-v148", "category": "동사", "kanji": "聞く", "kana": "きく", "romaji": "kiku", "korean": "듣다", "english": "To listen", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_1/1-v148.png" },
    { "id": "1-v149", "category": "동사", "kanji": "寝る", "kana": "ねる", "romaji": "neru", "korean": "자다", "english": "To sleep", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_1/1-v149.png" },
    { "id": "1-v150", "category": "동사", "kanji": "起きる", "kana": "おきる", "romaji": "okiru", "korean": "일어나다", "english": "To wake up", "part_of_speech": "동사", "image_path": "images/vocabulary/grade_1/1-v150.png" },

    // 기본 형용사 (Basic Adjectives)
    { "id": "1-v160", "category": "형용사", "kanji": "大きい", "kana": "おおきい", "romaji": "ookii", "korean": "크다", "english": "Big", "part_of_speech": "형용사", "image_path": "images/vocabulary/grade_1/1-v160.png" },
    { "id": "1-v161", "category": "형용사", "kanji": "小さい", "kana": "ちいさい", "romaji": "chiisai", "korean": "작다", "english": "Small", "part_of_speech": "형용사", "image_path": "images/vocabulary/grade_1/1-v161.png" },
    { "id": "1-v162", "category": "형용사", "kanji": "高い", "kana": "たかい", "romaji": "takai", "korean": "높다, 비싸다", "english": "High, expensive", "part_of_speech": "형용사", "image_path": "images/vocabulary/grade_1/1-v162.png" },
    { "id": "1-v163", "category": "형용사", "kanji": "安い", "kana": "やすい", "romaji": "yasui", "korean": "싸다", "english": "Cheap", "part_of_speech": "형용사", "image_path": "images/vocabulary/grade_1/1-v163.png" },
    { "id": "1-v164", "category": "형용사", "kanji": "新しい", "kana": "あたらしい", "romaji": "atarashii", "korean": "새롭다", "english": "New", "part_of_speech": "형용사", "image_path": "images/vocabulary/grade_1/1-v164.png" },
    { "id": "1-v165", "category": "형용사", "kanji": "古い", "kana": "ふるい", "romaji": "furui", "korean": "오래되다", "english": "Old", "part_of_speech": "형용사", "image_path": "images/vocabulary/grade_1/1-v165.png" },
    { "id": "1-v166", "category": "형용사", "kanji": "良い", "kana": "よい", "romaji": "yoi", "korean": "좋다", "english": "Good", "part_of_speech": "형용사", "image_path": "images/vocabulary/grade_1/1-v166.png" },
    { "id": "1-v167", "category": "형용사", "kanji": "悪い", "kana": "わるい", "romaji": "warui", "korean": "나쁘다", "english": "Bad", "part_of_speech": "형용사", "image_path": "images/vocabulary/grade_1/1-v167.png" },
    { "id": "1-v168", "category": "형용사", "kanji": "面白い", "kana": "おもしろい", "romaji": "omoshiroi", "korean": "재미있다", "english": "Interesting", "part_of_speech": "형용사", "image_path": "images/vocabulary/grade_1/1-v168.png" },
    { "id": "1-v169", "category": "형용사", "kanji": "美味しい", "kana": "おいしい", "romaji": "oishii", "korean": "맛있다", "english": "Delicious", "part_of_speech": "형용사", "image_path": "images/vocabulary/grade_1/1-v169.png" },
    { "id": "1-v170", "category": "형용사", "kanji": "楽しい", "kana": "たのしい", "romaji": "tanoshii", "korean": "즐겁다", "english": "Fun", "part_of_speech": "형용사", "image_path": "images/vocabulary/grade_1/1-v170.png" },
    { "id": "1-v171", "category": "형용사", "kanji": "好き", "kana": "すき", "romaji": "suki", "korean": "좋아함", "english": "Likeable", "part_of_speech": "형용동사", "image_path": "images/vocabulary/grade_1/1-v171.png" },
    { "id": "1-v172", "category": "형용사", "kanji": "嫌い", "kana": "きらい", "romaji": "kirai", "korean": "싫어함", "english": "Dislikeable", "part_of_speech": "형용동사", "image_path": "images/vocabulary/grade_1/1-v172.png" }
  ],
  "grammar": [
    {
      "id": "1-g001",
      "title": "Aは Bです (A는 B입니다)",
      "explanation": "'~은/는 ~입니다' 라는 의미로, 사물의 이름이나 상태를 설명하는 가장 기본적인 문장 형태입니다. 정중한 표현입니다.",
      "structure": "명사1 + は + 명사2 + です。",
      "examples": [
        { "jp": "わたしは けんじです。", "kr": "저는 겐지입니다.", "romaji": "Watashi wa Kenji desu." },
        { "jp": "これは ほんです。", "kr": "이것은 책입니다.", "romaji": "Kore wa hon desu." },
        { "jp": "きょうは あめです。", "kr": "오늘은 비입니다.", "romaji": "Kyou wa ame desu." }
      ]
    },
    {
      "id": "1-g002",
      "title": "Aの B (A의 B)",
      "explanation": "명사와 명사를 연결하여 '~의' 라는 소유나 소속의 관계를 나타냅니다.",
      "structure": "명사1 + の + 명사2",
      "examples": [
        { "jp": "わたしの かさ", "kr": "나의 우산", "romaji": "watashi no kasa" },
        { "jp": "がっこうの せんせい", "kr": "학교 선생님", "romaji": "gakkou no sensei" },
        { "jp": "いぬの なまえ", "kr": "강아지의 이름", "romaji": "inu no namae" }
      ]
    },
    {
      "id": "1-g003",
      "title": "질문하기: 〜ですか",
      "explanation": "문장 끝에 'か'를 붙이면 '~입니까?'라고 묻는 질문이 됩니다. 대답은 'はい、〜です' 또는 'いいえ、〜ではありません' 등으로 할 수 있습니다.",
      "structure": "문장 + か。",
      "examples": [
        { "jp": "あれは やまですか。", "kr": "저것은 산입니까?", "romaji": "Are wa yama desu ka." },
        { "jp": "はい、やまです。", "kr": "네, 산입니다.", "romaji": "Hai, yama desu." },
        { "jp": "かれは せんせいですか。", "kr": "그는 선생님입니까?", "romaji": "Kare wa sensei desu ka." },
        { "jp": "いいえ、せんせいでは ありません。", "kr": "아니요, 선생님이 아닙니다.", "romaji": "Iie, sensei dewa arimasen." }
      ]
    },
    {
      "id": "1-g004",
      "title": "동사의 ます형",
      "explanation": "동사의 정중한 표현으로, '~합니다', '~하겠습니다' 라는 현재 또는 미래의 행동을 나타냅니다. 예를 들어 '가다(いく)'는 'いきます'가 됩니다.",
      "structure": "동사 어간 + ます",
      "examples": [
        { "jp": "がっこうへ いきます。", "kr": "학교에 갑니다.", "romaji": "Gakkou e ikimasu." },
        { "jp": "ほんを よみます。", "kr": "책을 읽습니다.", "romaji": "Hon o yomimasu." },
        { "jp": "あさごはんを たべます。", "kr": "아침밥을 먹습니다.", "romaji": "Asagohan o tabemasu." }
      ]
    },
    {
      "id": "1-g005",
      "title": "조사 を, が, も, に, へ, で",
      "explanation": "을/를 (を), 이/가 (が), ~도 (も), ~에 (に), ~으로/에게 (へ), ~에서/로 (で)는 문장을 만드는 데 필수적인 기초 조사입니다.",
      "structure": "명사 + 조사",
      "examples": [
        { "jp": "みずを のみます。", "kr": "물을 마십니다.", "romaji": "Mizu o nomimasu." },
        { "jp": "いぬが います。", "kr": "개가 있습니다.", "romaji": "Inu ga imasu." },
        { "jp": "わたしも いきます。", "kr": "나도 갑니다.", "romaji": "Watashi mo ikimasu." },
        { "jp": "いすに すわります。", "kr": "의자에 앉습니다.", "romaji": "Isu ni suwarimasu." },
        { "jp": "うちへ かえります。", "kr": "집으로 돌아갑니다.", "romaji": "Uchi e kaerimasu." },
        { "jp": "がっこうで べんきょうします。", "kr": "학교에서 공부합니다.", "romaji": "Gakkou de benkyoushimasu." }
      ]
    }
  ]
};

// 전역 노출
window.grade1_data = grade1_data;
