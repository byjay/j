# JAP-BONG Verification Checklist

## 1. Layout & Core UI
- [ ] **Desktop Mobile Frame**: On wide screens, app width is limited to 480px and centered.
- [ ] **Fixed Header**: Top bar (Logo, User Profile) stays fixed at the top when scrolling.
- [ ] **Fixed Bottom Nav**: Bottom menu bar stays fixed at the bottom when scrolling.
- [ ] **Scroll Area**: Content scrolls *behind* the header/footer, not moving them.
- [ ] **Splash Screen**: Appears on load and disappears automatically.

## 2. Authentication
- [ ] **Family Login**: "Dad", "Mom", "Sieun", "Harong" buttons open password prompt.
- [ ] **Password Validation**: Correct password logs in, incorrect shows error.
- [ ] **Guest Login**: "Guest Experience" button opens modal.
- [ ] **Guest Avatar**: Select avatar -> Enter Name -> Login success.
- [ ] **Logout**: Logout button in header returns to login screen.

## 3. Home Tab
- [ ] **Cards**: All 6 main menu cards (Characters, Vocab, Conversation, Travel, School, Arcade) click and switch tabs.
- [ ] **Admin Menu (Dad only)**: "Admin Settings" section visible only for Dad.
- [ ] **Admin Reset**: "Reset All Progress" button works (with confirmation).

## 4. Characters Tab (글자 연습)
- [ ] **Grid Display**: Hiragana/Katakana characters displayed in grid.
- [ ] **Toggle Switch**: Switch between Hiragana/Katakana works.
- [ ] **Modal Open**: Clicking a character opens the detail modal.
- [ ] **Stroke Order**: "Stroke Order" button plays animation.
- [ ] **Canvas**: Drawing on canvas works.
- [ ] **Sound**: Speaker icon plays sound.
- [ ] **Quiz**: "Quiz" button starts character quiz.

## 5. Vocabulary Tab (단어 열공)
- [ ] **Categories**: Category list (Animals, Food, etc.) displayed.
- [ ] **Category Select**: Clicking category opens word list.
- [ ] **Word Cards**: Words displayed with Japanese/Korean/Image.
- [ ] **TTS**: Clicking word plays pronunciation.
- [ ] **Navigation**: Next/Prev buttons navigate through words.
- [ ] **Auto Play**: "Auto Play" button cycles through words.
- [ ] **Quiz**: "Take Quiz" button starts vocabulary quiz.

## 6. Conversation Tab (회화 연습)
- [ ] **Mode Switch**: "Situational" vs "Practical" toggle works.
- [ ] **Situational Categories**: Categories (Greeting, Shopping, etc.) displayed.
- [ ] **Conversation Viewer**: Clicking category shows dialogue list.
- [ ] **TTS**: Speaker icon plays dialogue audio.
- [ ] **Practical List**: Switching to Practical shows useful phrase list.

## 7. Japan Travel Tab (일본 여행)
- [ ] **Region Select**: Fukuoka map/card visible.
- [ ] **Fukuoka Detail**: Clicking Fukuoka opens the 4-day itinerary view.
- [ ] **Itinerary Navigation**: Day 1, 2, 3, 4 buttons switch schedules.
- [ ] **POI Details**: Clicking a schedule item (e.g., "Ichiran") opens detail modal.
- [ ] **Map Toggle**: Map button toggles Google Map view (if API key valid) or placeholder.

## 8. Elementary School Tab (초등 일본어)
- [ ] **Grade Selection**: Grade 3, 4, 5, 6 cards displayed.
- [ ] **Lesson List**: Clicking grade shows curriculum chapters.
- [ ] **Detail View**: Clicking chapter shows grammar/vocab content.

## 9. Arcade Tab (게임)
- [ ] **Game List**: Sushi, Neon, Alchemy, Archive, KanaFill cards visible.
- [ ] **Sushi Survival**: Launches game modal.
- [ ] **Neon Syntax**: Launches game modal.
- [ ] **Verbum Alchimia**: Launches game modal.
- [ ] **Silent Archive**: Launches game modal.
- [ ] **Kana Fill**: Launches game modal.
- [ ] **Close Game**: Game modal close button works.

## 10. System
- [ ] **Build Timestamp**: Checkfooter/header for correct build time.
- [ ] **Offline Support**: Service Worker registers (console log check).
