/**
 * ui.js - UI 제어
 */

// 탭 전환
function showTab(tabName) {
    console.log('showTab called:', tabName);

    // 모든 탭 숨기기
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
        tab.classList.add('hidden');
    });

    // 모든 네비게이션 버튼 비활성화
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.remove('active');
    });

    // 선택된 탭 표시
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.classList.add('active');
        targetTab.classList.remove('hidden');
        console.log('Tab activated:', tabName);
    } else {
        console.error('Tab not found:', tabName);
    }

    // 홈이 아닌 탭에서는 메인 메뉴(4개 카드) 숨기기
    const mainMenu = document.getElementById('main-menu');
    if (mainMenu) {
        if (tabName === 'home') {
            mainMenu.style.display = 'grid';
        } else {
            mainMenu.style.display = 'none';
        }
    }

    // 선택된 네비게이션 버튼 활성화
    const navButtons = document.querySelectorAll('.nav-tab');
    navButtons.forEach(btn => {
        const btnOnClick = btn.getAttribute('onclick');
        if (btnOnClick && btnOnClick.includes(`'${tabName}'`)) {
            btn.classList.add('active');
        }
    });

    // 탭별 초기화
    if (tabName === 'characters') {
        if (typeof showCharacterGrid === 'function') {
            showCharacterGrid('hiragana');
        }
    } else if (tabName === 'vocabulary' || tabName === 'word_study') {
        if (typeof initWordStudy === 'function') {
            initWordStudy();
        }
    } else if (tabName === 'conversation') {
        if (typeof initConversation === 'function') {
            initConversation();
        }
    } else if (tabName === 'fukuoka') {
        if (typeof initFukuokaTrip === 'function') {
            initFukuokaTrip();
        }
    } else if (tabName === 'progress') {
        if (typeof showProgressDashboard === 'function') {
            showProgressDashboard();
        }
    }
}

// ★ 하단 네비게이션 클릭 핸들러 (로그인 체크)
function handleNavClick(tabId) {
    if (!currentUser) {
        // 로그인 안 되어 있으면 애니메이션 표시
        triggerLoginAnimation();
        return;
    } else {
        // 로그인 되어 있으면 탭 전환
        showTab(tabId);
    }
}

// 로그인 유도 애니메이션
function triggerLoginAnimation() {
    const loginScreen = document.getElementById('login-screen');
    const avatarCards = document.querySelectorAll('.user-card');

    // 로그인 화면이 숨겨져 있으면 표시
    if (loginScreen) {
        loginScreen.style.display = 'flex';
        loginScreen.style.opacity = '1';
    }

    // 유저 카드가 있고 이미 애니메이션 중이 아니면 애니메이션 실행
    if (avatarCards.length > 0 && !avatarCards[0].classList.contains('login-attention')) {
        avatarCards.forEach(card => {
            card.classList.add('login-attention');
        });

        setTimeout(() => {
            avatarCards.forEach(card => {
                card.classList.remove('login-attention');
            });
        }, 1200);
    }
}

// 후쿠오카 접근 제어 함수 (90점 이상 2회 달성 필요)
function checkFukuokaAccess() {
    // 1. 로그인 안되어있으면 로그인 화면으로
    if (!currentUser) {
        triggerLoginAnimation();
        return;
    }

    // 2. 아빠인지 확인 (아빠는 바로 통과)
    if (currentUser.id === 'dad') {
        showTab('fukuoka');
        return;
    }

    // 3. 퀴즈 90점 이상 2회 달성 확인
    const highScoreCount = parseInt(localStorage.getItem('fukuoka_unlock_count') || '0');

    if (highScoreCount >= 2) {
        // 잠금 해제됨
        showTab('fukuoka');
    } else {
        // 아직 잠금 상태
        const remaining = 2 - highScoreCount;
        alert(`🔒 후쿠오카 여행 정보는 잠겨있습니다!\n\n퀴즈 90점 이상을 ${remaining}회 더 달성해야 합니다.\n현재 달성: ${highScoreCount}/2회\n\n글자 탭에서 퀴즈를 풀어보세요!`);
        showTab('characters');
    }
}

// 오디오 재생 (TTS)
function playAudio(text) {
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);

    console.log('Playing audio:', text);
}

// 전역 노출
window.showTab = showTab;
window.handleNavClick = handleNavClick;

// 구버전 호환성을 위한 별칭
window.openSection = handleNavClick;
window.checkFukuokaAccess = checkFukuokaAccess;
window.triggerLoginAnimation = triggerLoginAnimation;
window.playAudio = playAudio;

console.log('ui.js loaded');
