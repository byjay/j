/**
 * app.js - 앱 초기화 (간소화 버전)
 */

async function initApp() {
    console.log('=== 재뽕 일본어 앱 초기화 시작 ===');

    try {
        // 1. 템플릿 렌더링
        if (typeof renderTemplates === 'function') {
            renderTemplates();
        } else {
            console.error('renderTemplates not found');
        }

        // 2. 자동 로그인 체크
        if (typeof checkAutoLogin === 'function') {
            checkAutoLogin();
        }

        // 3. 후쿠오카 일정 초기화
        if (typeof initFukuokaTrip === 'function') {
            initFukuokaTrip();
        }

        // 4. 회화 카테고리 초기화
        if (typeof initConversation === 'function') {
            initConversation();
        }

        // 5. 단어 카테고리 초기화
        if (typeof initVocabulary === 'function') {
            initVocabulary();
        }

        // 6. 글자 학습 초기화
        if (typeof showCharacterSet === 'function') {
            showCharacterSet('hiragana');
        }

        console.log('=== 앱 초기화 완료 ===');
    } catch (error) {
        console.error('앱 초기화 중 오류:', error);
    }
}

// DOMContentLoaded 이벤트로 앱 시작
document.addEventListener('DOMContentLoaded', initApp);

console.log('app.js loaded');
