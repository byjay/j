/**
 * ui.js - UI 제어
 */

// 탭 전환
function openSection(tabName) {
    showTab(tabName);
}

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
        // alert("DEBUG: showTab('characters') reached"); 
        if (typeof showCharacterGrid === 'function') {
            showCharacterGrid('hiragana');
        } else {
            console.error("showCharacterGrid function not found!");
            alert("Error: showCharacterGrid function not found! Check characters.js loading.");
        }
    } else if (tabName === 'vocabulary') {
        if (typeof initVocabulary === 'function') {
            initVocabulary();
        }
    } else if (tabName === 'word_study') {
        if (typeof initWordStudy === 'function') {
            initWordStudy();
        }
    } else if (tabName === 'conversation') {
        if (typeof showConversationMode === 'function') {
            showConversationMode('practical');
        } else if (typeof initDayConversation === 'function') {
            initDayConversation();
        }
    } else if (tabName === 'fukuoka' || tabName === 'japan_travel') {
        if (typeof initJapanTravel === 'function') {
            initJapanTravel();
        } else if (typeof initFukuokaTrip === 'function') {
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
return;
        }

// 2. Android/Desktop: beforeinstallprompt 이벤트 리스너
window.addEventListener('beforeinstallprompt', (e) => {
    // 기본 미니 인포바 차단
    e.preventDefault();
    // 이벤트 저장 (나중에 트리거하기 위해)
    deferredPrompt = e;
    // 설치 버튼 표시
    showInstallPromotion();
});

// 3. iOS 감지 및 안내 (beforeinstallprompt 미지원)
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if (isIOS && !isStandalone) {
    // iOS는 사용자가 직접 설치해야 하므로, 최초 1회만 안내 모달 표시 (쿠키/로컬스토리지 체크)
    const hasSeenInstallGuide = localStorage.getItem('ios_install_guide_seen');
    if (!hasSeenInstallGuide) {
        setTimeout(() => {
            showIOSInstallGuide();
        }, 2000); // 앱 진입 2초 후 표시
    }
}
    }

// 설치 버튼 표시 (Android/Desktop)
function showInstallPromotion() {
    // 기존에 버튼이 있다면 중복 생성 방지
    if (document.getElementById('pwa-install-btn')) return;

    const btnHtml = `
        <div id="pwa-install-btn" class="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-slight">
            <button onclick="triggerInstallPrompt()" class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                <i class="fas fa-download"></i> 앱으로 설치하기
            </button>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', btnHtml);
}

// 설치 프롬프트 트리거
function triggerInstallPrompt() {
    if (!deferredPrompt) return;

    // 프롬프트 표시
    deferredPrompt.prompt();

    // 사용자 응답 대기
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
        // 버튼 제거
        const btn = document.getElementById('pwa-install-btn');
        if (btn) btn.remove();
    });
}

// iOS 설치 가이드 모달
function showIOSInstallGuide() {
    const modalHtml = `
        <div id="ios-install-modal" class="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 animate-fade-in" onclick="closeIOSInstallGuide()">
            <div class="bg-white w-full max-w-md rounded-t-3xl p-6 pb-10 animate-slide-up relative" onclick="event.stopPropagation()">
                <button onclick="closeIOSInstallGuide()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <i class="fas fa-times text-xl"></i>
                </button>
                <div class="flex items-center gap-4 mb-4">
                    <div class="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">📱</div>
                    <div>
                        <h3 class="font-bold text-lg text-gray-800">앱으로 더 편하게 보세요!</h3>
                        <p class="text-sm text-gray-500">주소창 없이 전체 화면으로 즐기세요.</p>
                    </div>
                </div>
                <div class="space-y-3 text-sm text-gray-700">
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <span class="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold text-xs">1</span>
                        <span>브라우저 하단의 <i class="fas fa-share-square text-blue-500 mx-1"></i> <strong>공유</strong> 버튼을 누르세요.</span>
                    </div>
                    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <span class="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-bold text-xs">2</span>
                        <span>메뉴에서 <i class="far fa-plus-square text-gray-600 mx-1"></i> <strong>홈 화면에 추가</strong>를 선택하세요.</span>
                    </div>
                </div>
                <button onclick="closeIOSInstallGuide()" class="w-full mt-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition">
                    알겠습니다
                </button>
            </div>
            <!-- 화살표 지시 (아이폰 하단 바 위치 대략적 조준) -->
            <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-center animate-bounce">
                <p class="text-sm font-bold mb-1">여기를 눌러주세요!</p>
                <i class="fas fa-arrow-down text-2xl"></i>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    localStorage.setItem('ios_install_guide_seen', 'true');
}

function closeIOSInstallGuide() {
    const modal = document.getElementById('ios-install-modal');
    if (modal) modal.remove();
}

// 전역 노출
window.initPWAInstall = initPWAInstall;
window.triggerInstallPrompt = triggerInstallPrompt;
window.closeIOSInstallGuide = closeIOSInstallGuide;

// 초기화 실행 (문서 로드 후)
document.addEventListener('DOMContentLoaded', () => {
    initPWAInstall();
});

console.log('ui.js loaded');
