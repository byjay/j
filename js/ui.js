/**
 * ui.js - UI 관련 기능 모음
 */

// 손님용 광고 표시 - 비활성화됨 (사용자 요청)
function showGuestAd() {
    // ★ 광고 기능 완전 비활성화
    return;
}

function closeGuestAd() {
    // Stub for compatibility
}

// 탭 전환 함수
window.showTab = async function (tabName, addToHistory = true) {
    console.log('[UI] Switching to tab:', tabName);

    // 섹션 맵핑
    const sectionMap = {
        'home': 'sections/home.html',
        'arcade': 'sections/arcade.html',
        'characters': 'sections/characters.html',
        'vocabulary': 'sections/vocabulary.html',
        'conversation': 'sections/conversation.html',
        'progress': 'sections/progress.html',
        'japan_travel': 'sections/travel.html',
        'elementary': 'sections/elementary.html',
        'admin-settings': 'inline'
    };

    // 별칭 처리
    let targetId = tabName;
    if (tabName === 'travel' || tabName === 'fukuoka') targetId = 'japan_travel';
    if (tabName === 'elementary-school') targetId = 'elementary';
    if (tabName === 'settings' || tabName === 'config') targetId = 'admin-settings';

    // ★ History API - 브라우저 뒤로가기 시 사이트 이탈 방지
    if (addToHistory && window.history) {
        const currentState = { tab: targetId, timestamp: Date.now() };
        history.pushState(currentState, '', `#tab=${targetId}`);
        console.log('[History] Pushed state:', targetId);
    }

    // 섹션 로딩
    if (sectionMap[targetId] && window.SectionLoader) {
        await SectionLoader.load(targetId, sectionMap[targetId], () => {
            if (targetId === 'japan_travel' && typeof renderRegionSelection === 'function') renderRegionSelection();
            if (targetId === 'elementary' && typeof initElementarySchool === 'function') initElementarySchool();
            if (targetId === 'vocabulary' && typeof initVocabulary === 'function') initVocabulary();
        });
    }

    // UI 업데이트
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('active');
    });

    const targetTab = document.getElementById(targetId);
    if (targetTab) {
        targetTab.classList.remove('hidden');
        targetTab.classList.add('active');
        window.scrollTo(0, 0);
    }

    // 네비게이션 버튼 활성화 상태 업데이트
    document.querySelectorAll('.nav-tab').forEach(btn => {
        const btnOnClick = btn.getAttribute('onclick');
        if (btnOnClick && btnOnClick.includes(`'${tabName}'`)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 뒤로가기 버튼 표시/숨김
    const backBtn = document.getElementById('global-back-btn');
    if (backBtn) {
        (targetId === 'home' || targetId === 'sections/home.html') ? backBtn.classList.add('hidden') : backBtn.classList.remove('hidden');
    }

    // 마지막 탭 저장
    if (tabName !== 'home') localStorage.setItem('lastTab', tabName);

    // 탭별 초기화
    if (targetId === 'progress' && typeof showProgressDashboard === 'function') showProgressDashboard();
    if (targetId === 'characters' && typeof showCharacterGrid === 'function') {
        showCharacterGrid(localStorage.getItem('lastCharMode') || 'hiragana');
    }

    // ★ 회화 탭: 기본 '상황별 회화' 모드로 자동 진입
    if (targetId === 'conversation' && typeof showConversationMode === 'function') {
        setTimeout(() => showConversationMode('situational'), 100);
    }

    if (window.currentUser?.id === 'guest') showGuestAd();
}

// ★ 브라우저 뒤로/앞으로 버튼 핸들러
window.addEventListener('popstate', function (event) {
    console.log('[History] Popstate triggered:', event.state);

    if (event.state && event.state.tab) {
        // 히스토리에 저장된 탭으로 이동 (다시 history에 추가하지 않음)
        showTab(event.state.tab, false);
    } else {
        // 상태가 없으면 홈으로
        showTab('home', false);
    }
});

// ★ 초기 상태 설정 (새로고침 시)
window.addEventListener('DOMContentLoaded', function () {
    // 초기 히스토리 상태 설정
    const hashTab = window.location.hash.replace('#tab=', '');
    const initialTab = hashTab || 'home';
    history.replaceState({ tab: initialTab }, '', `#tab=${initialTab}`);
});

// 글로벌 뒤로가기 버튼 처리
function handleGlobalBack() {
    console.log('Global Back Triggered');

    // Priority 1: Manual Modal
    const manualModal = document.getElementById('manual-modal');
    if (manualModal && !manualModal.classList.contains('hidden')) {
        if (typeof closeManual === 'function') closeManual();
        return;
    }

    // Priority 2: Character Study Modal
    const charStudy = document.getElementById('character-study-container');
    if (charStudy && !charStudy.classList.contains('hidden')) {
        if (typeof closeModal === 'function') closeModal();
        return;
    }

    // Priority 3: Character Modal Container
    const charContainer = document.getElementById('character-modal-container');
    if (charContainer && charContainer.innerHTML.trim() !== '') {
        if (typeof closeModal === 'function') {
            closeModal();
            return;
        }
    }

    // Priority 4: Return to home tab
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab && activeTab.id !== 'home') {
        showTab('home');
        return;
    }

    console.log('Already at home');
}

// PWA 설치 프롬프트
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById('header-install-btn')?.classList.remove('hidden');
});

function triggerInstallPrompt() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') console.log('PWA installed');
        deferredPrompt = null;
    });
}

function showInstallGuide() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        alert("Safari 하단의 '공유' 버튼을 누르고 '홈 화면에 추가'를 선택해주세요.");
    } else {
        triggerInstallPrompt();
    }
}

// 전역 함수 등록
window.showTab = showTab;
window.openSection = showTab; // 별칭 - 홈화면 버튼들이 openSection 사용
window.handleGlobalBack = handleGlobalBack;
window.showInstallGuide = showInstallGuide;
window.triggerInstallPrompt = triggerInstallPrompt;
window.showGuestAd = showGuestAd;
window.closeGuestAd = closeGuestAd;

// Integrity Check Fixes - Missing Functions
window.closeHelpModal = function () {
    const modal = document.getElementById('help-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

// Stubs removed to prevent conflict with actual modules