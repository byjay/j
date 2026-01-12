/**
 * auth.js - 인증 시스템
 */

const users = {
    dad: { id: 'dad', name: '봉아빠', avatar: 'images/dad.png' },
    mom: { id: 'mom', name: '강엄마', avatar: 'images/mom_orig.png' },
    sieun: { id: 'sieun', name: '시으니', avatar: 'images/sieun.png' },
    harong: { id: 'harong', name: '하롱이', avatar: 'images/harong.png' },
    guest: { id: 'guest', name: '손님', avatar: 'images/sieun_dancing.png' }
};

// Encrypted credentials (SHA-256 simulation for client-side demo)
// In production, this should be validated server-side.
const authConfig = {
    // Hashes would be here in real app. For client-side demo without backend:
    // Storing obfuscated values or using env approach is recommended.
    // For this refactor, we move them to a separate config object that can be gitignored later.
    credentials: (function () {
        const tokens = window.SECURE_TOKENS || {};
        const decoded = {};
        for (const [k, v] of Object.entries(tokens)) {
            try {
                decoded[k] = atob(v);
            } catch (e) { decoded[k] = null; }
        }
        return decoded;
    })()
};

const userPasswords = authConfig.credentials;

let currentUser = null;
let loginCallback = null;

function showLoginModal(callback) {
    loginCallback = callback;
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) {
        loginScreen.style.display = 'flex';
        // Ensure background is correct
        loginScreen.style.backgroundImage = "url('images/BACK.png')";
        loginScreen.style.backgroundSize = "cover";
        loginScreen.style.backgroundPosition = "center";
    }

    // ★ Force hide app-container to reveal login screen
    const appContainer = document.getElementById('app-container');
    if (appContainer) {
        appContainer.style.display = 'none';
    }
}

function hideLoginModal() {
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) {
        loginScreen.style.display = 'none';
    }

    // ★ Show app-container when hiding login
    const appContainer = document.getElementById('app-container');
    if (appContainer) {
        appContainer.style.display = 'block';
    }
}

function login(userId) {
    if (!users[userId]) {
        console.error('Invalid user:', userId);
        return;
    }

    currentUser = users[userId];
    window.currentUser = currentUser;  // ★ Expose globally for learning_tracker.js
    if (window.SecurityService) {
        SecurityService.setItem('currentUser', userId);
    } else {
        localStorage.setItem('currentUser', userId);
    }
    console.log('Login successful:', currentUser.name);

    // ★ 로그인 이벤트 기록 (IP, 위치 포함)
    if (window.LoggingService) {
        LoggingService.logLogin(userId, currentUser.name, userId === 'guest' ? 'guest' : 'family');
    }

    // Gamification 사용자 전환 및 데이터 로드
    if (window.Gamification) {
        window.Gamification.switchUser(userId);
        // 아빠 계정은 XP 99999, 모든 권한 부여
        if (userId === 'dad') {
            window.Gamification.state.totalXP = 99999;
            window.Gamification.state.level = 999;
            window.Gamification.state.streak = 365;
            window.Gamification.saveState();
        }
    }

    // ★ 일본어 환영 음성 재생 (자연스러운 멘트)
    playLoginGreeting();

    updateUserDisplay();
    hideLoginModal();

    // 로그인 후 메인 메뉴 표시, 탭 콘텐츠는 숨김
    const mainMenu = document.getElementById('main-menu');
    if (mainMenu) {
        mainMenu.style.display = 'grid';
    }

    // 하단 네비게이션 표시
    const bottomNav = document.getElementById('bottom-nav');
    if (bottomNav) {
        bottomNav.classList.remove('hidden');
    }

    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('active');
    });

    // 아빠 계정이면 관리자 메뉴 표시
    const adminSection = document.getElementById('admin-reset-section');
    if (adminSection) {
        adminSection.style.display = userId === 'dad' ? 'block' : 'none';
    }

    // 아빠 계정이면 로그 대시보드 버튼 표시
    const adminLogBtn = document.getElementById('admin-log-btn');
    if (adminLogBtn) {
        adminLogBtn.style.display = userId === 'dad' ? 'flex' : 'none';
    }

    // 아빠 계정이면 하단 네비게이션 설정 버튼 표시
    const navSettingsBtn = document.getElementById('nav-settings-btn');
    if (navSettingsBtn) {
        navSettingsBtn.style.display = userId === 'dad' ? 'flex' : 'none';
    }

    // [손님 전용] 기능 제한 및 메인 화면 하단 고정 광고 제어
    const guestAdContainer = document.getElementById('guest-fixed-ad-container');
    const aiConversationTabs = document.querySelectorAll('[onclick*="showConversationMode"]');

    if (guestAdContainer) {
        if (userId === 'guest') {
            guestAdContainer.classList.remove('hidden');
            // AI 회화 탭 숨기기 (게스트는 이용 불가)
            aiConversationTabs.forEach(tab => tab.style.display = 'none');

            // 광고 로드
            setTimeout(() => {
                try {
                    (adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {
                    console.log('AdSense push error (ignored):', e);
                }
            }, 100);
        } else {
            guestAdContainer.classList.add('hidden');
            // 다른 사용자는 AI 회화 다시 표시
            aiConversationTabs.forEach(tab => tab.style.display = 'flex');
        }
    }

    // 헤더 사용자 프로필/로그아웃 버튼 표시 (손님도 포함)
    const profileIcon = document.getElementById('user-profile-icon');
    if (profileIcon) {
        profileIcon.classList.remove('hidden');
        profileIcon.classList.add('flex');
    }

    if (loginCallback) {
        loginCallback();
        loginCallback = null;
    }

    // 로그인 후에는 저장된 마지막 탭으로 이동 (없으면 홈)
    try {
        if (typeof showTab === 'function') {
            const lastTab = localStorage.getItem('lastTab');
            // 'home' 탭은 기본값이므로 굳이 복원할 필요 없거나, 복원해도 무방
            if (lastTab && lastTab !== 'undefined') {
                console.log('Restoring last tab:', lastTab);
                // [Modified] Always go to home for better UX on login, unless specific need
                // user requested "not previous menu", so let's default to home
                showTab('home');
                // showTab(lastTab); // Previous behavior
            } else {
                showTab('home');
            }
        } else {
            throw new Error("showTab is not defined");
        }
    } catch (e) {
        console.error("Tab restoration failed:", e);
        // Fallback: Force show home tab
        const homeTab = document.getElementById('home');
        if (homeTab) {
            homeTab.classList.remove('hidden');
            homeTab.classList.add('active');
        }
        const mainMenu = document.getElementById('main-menu');
        if (mainMenu) mainMenu.style.display = 'grid';
    }
}

function updateUserDisplay() {
    const avatarEl = document.getElementById('current-user-avatar');
    const nameEl = document.getElementById('current-user-name');

    if (avatarEl && currentUser) {
        // Clear previous content
        avatarEl.innerHTML = '';
        // Create image element
        const img = document.createElement('img');
        img.src = currentUser.avatar;
        img.alt = currentUser.name;
        img.className = 'w-6 h-6 rounded-full object-cover';
        avatarEl.appendChild(img);
    }
    if (nameEl && currentUser) {
        nameEl.textContent = currentUser.name;
    }
}

function logout() {
    currentUser = null;
    window.currentUser = null;  // ★ Also clear global reference
    localStorage.removeItem('currentUser'); // Remove standard key
    if (window.SecurityService) localStorage.removeItem('currentUser'); // SecurityService keys are same as standard for now, but explicit remove is creating ambiguity. 
    // Actually SecurityService uses localStorage under the hood. So standard remove works.

    // [New] 저장된 탭 상태 초기화 (로그아웃 후 재로그인 시에는 항상 홈으로)
    localStorage.removeItem('lastTab');
    localStorage.removeItem('lastCharMode');
    localStorage.removeItem('currentConversationMode'); // Conversions mode reset
    localStorage.removeItem('last_manual_page'); // Manual page reset

    // 세션 스토리지 초기화 (광고 카운트 등)
    sessionStorage.removeItem('guest_ad_count');

    // 하단 네비게이션 숨기기
    const bottomNav = document.getElementById('bottom-nav');
    if (bottomNav) {
        bottomNav.classList.add('hidden');
    }

    // 헤더 사용자 프로필/로그아웃 버튼 숨기기
    const profileIcon = document.getElementById('user-profile-icon');
    if (profileIcon) {
        profileIcon.classList.add('hidden');
        profileIcon.classList.remove('flex');
    }

    // 하단 설정 버튼 숨기기
    const navSettingsBtn = document.getElementById('nav-settings-btn');
    if (navSettingsBtn) {
        navSettingsBtn.style.display = 'none';
    }

    // 메인 메뉴 숨기기
    const mainMenu = document.getElementById('main-menu');
    if (mainMenu) {
        mainMenu.style.display = 'none';
    }

    // [손님 전용] 고정 광고 숨기기
    const guestAdContainer = document.getElementById('guest-fixed-ad-container');
    if (guestAdContainer) {
        guestAdContainer.classList.add('hidden');
    }

    // 모든 탭 숨기기
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
        tab.classList.add('hidden');
    });

    // 헤더 뒤로가기 버튼 숨기기
    const backBtn = document.getElementById('back-to-home-btn');
    if (backBtn) {
        backBtn.classList.add('hidden');
    }

    showLoginModal();
    console.log('Logged out');
}

function checkAutoLogin() {
    const savedUserId = window.SecurityService ? SecurityService.getItem('currentUser') : localStorage.getItem('currentUser');
    if (savedUserId && users[savedUserId]) {
        console.log('Auto-login found:', savedUserId);
        login(savedUserId);
    } else {
        showLoginModal();
    }
}

// 커스텀 비밀번호 모달 생성
function showPasswordModal(userId, userName) {
    // 기존 모달 제거
    const existing = document.getElementById('password-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'password-modal';
    modal.className = 'fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-bounce-in">
            <!-- 헤더 -->
            <div class="bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-center">
                <img src="images/dad.png" class="w-16 h-16 rounded-full mx-auto border-4 border-white shadow-lg mb-2" alt="아빠">
                <p class="text-white font-bold text-sm">👋 아빠가 보내는 멘트</p>
                <p class="text-white/80 text-xs mt-1">"${userName}! 비밀번호 입력해줘~ 📱"</p>
            </div>
            
            <!-- 입력 영역 -->
            <div class="p-6">
                <label class="block text-gray-600 text-sm font-bold mb-2">
                    📱 핸드폰 국번 4자리를 입력하세요:
                </label>
                <input type="password" id="password-input" maxlength="4" 
                    class="w-full px-4 py-3 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
                    placeholder="****" inputmode="numeric" pattern="[0-9]*">
                
                <div class="flex gap-3 mt-6">
                    <button onclick="closePasswordModal()" 
                        class="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition">
                        취소
                    </button>
                    <button onclick="submitPassword('${userId}')" 
                        class="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition">
                        확인
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // 입력 필드에 포커스
    setTimeout(() => {
        const input = document.getElementById('password-input');
        if (input) input.focus();
    }, 100);

    // 엔터키 입력 처리
    const input = document.getElementById('password-input');
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitPassword(userId);
    });
}

function closePasswordModal() {
    const modal = document.getElementById('password-modal');
    if (modal) modal.remove();
}

function submitPassword(userId) {
    const input = document.getElementById('password-input');
    const password = input?.value;

    if (password === userPasswords[userId]) {
        closePasswordModal();
        login(userId);
    } else if (password) {
        // 틀렸을 때 흔들림 애니메이션
        input.classList.add('animate-shake');
        input.value = '';
        setTimeout(() => input.classList.remove('animate-shake'), 500);

        // 알림
        const label = input.previousElementSibling;
        label.innerHTML = '❌ 비밀번호가 틀렸어요! 다시 입력해주세요:';
        label.classList.add('text-red-500');
    }
}

// 각 사용자별 비밀번호 프롬프트
function showPasswordPrompt() {
    showPasswordModal('dad', '봉아빠');
}

function showMomPasswordPrompt() {
    showPasswordModal('mom', '강엄마');
}

function showSieunPasswordPrompt() {
    showPasswordModal('sieun', '시으니');
}

function showHarongPasswordPrompt() {
    showPasswordModal('harong', '하롱이');
}

// 손님 체험하기
function loginAsGuest() {
    login('guest');
}
// 전체 학습진도 리셋 (아빠 계정 전용)
function resetAllProgress() {
    if (confirm('⚠️ 정말로 모든 학습 진도를 리셋하시겠습니까?\n\n모든 사용자의 학습 기록이 삭제됩니다!')) {
        const password = prompt('확인을 위해 비밀번호를 입력하세요:');
        if (password === '1435') {
            // 모든 사용자의 진도 데이터 삭제
            ['dad', 'mom', 'sieun', 'harong'].forEach(userId => {
                localStorage.removeItem(`progress_${userId}`);
                localStorage.removeItem(`jap_bong_history_v1_${userId}`);
                localStorage.removeItem(`fukuoka_unlock_count_${userId}`);
            });

            alert('✅ 모든 학습 진도가 리셋되었습니다!');
            location.reload(); // 페이지 새로고침
        } else if (password !== null) {
            alert('❌ 비밀번호가 틀렸습니다!');
        }
    }
}


// Guest Login Logic (Consolidated)
const guestCharacters = [
    { id: '1', name: '유이', img: 'images/avatars/avatar_p_1.png' },
    { id: '2', name: '켄지', img: 'images/avatars/avatar_p_2.png' },
    { id: '3', name: '하루카', img: 'images/avatars/avatar_p_3.png' },
    { id: '4', name: '타쿠야', img: 'images/avatars/avatar_p_4.png' },
    { id: '5', name: '사토미', img: 'images/avatars/avatar_p_5.png' },
    { id: '6', name: '다나카', img: 'images/avatars/avatar_p_6.png' },
    { id: '7', name: '고양이', img: 'images/avatars/avatar_1.png' },
    { id: '8', name: '강아지', img: 'images/avatars/avatar_2.png' },
    { id: '9', name: '팬더', img: 'images/avatars/avatar_3.png' }
];

let selectedGuestAvatar = null;
let selectedGuestName = '';

function showGuestLoginModal() {
    console.log('showGuestLoginModal called');
    const modal = document.getElementById('guest-login-modal');
    if (!modal) {
        console.error('Guest modal not found!');
        return;
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Reset State
    const step1 = document.getElementById('guest-step-1');
    const step2 = document.getElementById('guest-step-2');
    if (step1) step1.classList.remove('hidden');
    if (step2) step2.classList.add('hidden');

    // Populate Grid
    const grid = document.getElementById('guest-avatar-grid');
    if (grid) {
        grid.innerHTML = '';
        guestCharacters.forEach(char => {
            const btn = document.createElement('button');
            btn.className = "flex flex-col items-center gap-2 p-2 rounded-xl hover:bg-orange-50 transition border border-transparent hover:border-orange-200";
            btn.onclick = () => selectGuestAvatar(char);
            btn.innerHTML = `
                <img src="${char.img}" class="w-14 h-14 rounded-full bg-white shadow-sm object-cover" onerror="this.src='images/app_icon.png'">
                <span class="text-[10px] font-bold text-gray-600">${char.name}</span>
            `;
            grid.appendChild(btn);
        });
    } else {
        console.error('Guest avatar grid not found!');
    }
}

function selectGuestAvatar(char) {
    selectedGuestAvatar = char.img;
    selectedGuestName = char.name;

    // Update Preview
    const preview = document.getElementById('selected-avatar-preview');
    if (preview) preview.src = char.img;

    const nameInput = document.getElementById('guest-name-input');
    if (nameInput) nameInput.placeholder = char.name;

    // Switch Step
    const step1 = document.getElementById('guest-step-1');
    const step2 = document.getElementById('guest-step-2');
    if (step1) step1.classList.add('hidden');
    if (step2) step2.classList.remove('hidden');
}

function guestBackToAvatars() {
    const step1 = document.getElementById('guest-step-1');
    const step2 = document.getElementById('guest-step-2');
    if (step1) step1.classList.remove('hidden');
    if (step2) step2.classList.add('hidden');
}

function closeGuestLoginModal() {
    const modal = document.getElementById('guest-login-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

function completeGuestLogin() {
    const nameInput = document.getElementById('guest-name-input');
    const name = nameInput.value.trim() || selectedGuestName;

    // Update Guest User Object
    if (users.guest) {
        users.guest.name = name;
        users.guest.avatar = selectedGuestAvatar;
    }

    closeGuestLoginModal();
    login('guest');
}

// Global Exports
window.showGuestLoginModal = showGuestLoginModal;
window.closeGuestLoginModal = closeGuestLoginModal;
window.selectGuestAvatar = selectGuestAvatar;
window.guestBackToAvatars = guestBackToAvatars;
window.completeGuestLogin = completeGuestLogin;

// Legacy / Integrity Support
window.guestNextStep = () => { };
window.guestPrevStep = guestBackToAvatars;

// Other Global Exports
window.showLoginModal = showLoginModal;
window.hideLoginModal = hideLoginModal;
window.login = login;
window.logout = logout;
window.checkAutoLogin = checkAutoLogin;
window.showPasswordPrompt = showPasswordPrompt;
window.resetAllProgress = resetAllProgress;

// ========== 일본어 환영 음성 ==========
function playLoginGreeting() {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const phrases = [
        { text: "ようこそ。", delay: 800 },
        { text: "一生懸命、勉強しましょう。", delay: 1000 },
        { text: "ファイト！", delay: 0 }
    ];
    let currentIndex = 0;
    function speakNext() {
        if (currentIndex >= phrases.length) return;
        const item = phrases[currentIndex];
        const u = new SpeechSynthesisUtterance(item.text);
        u.lang = 'ja-JP';
        u.volume = 0.2;
        u.rate = 0.85;
        const voices = window.speechSynthesis.getVoices();
        const jaVoice = voices.find(v => v.lang === 'ja-JP') || voices.find(v => v.lang.includes('ja'));
        if (jaVoice) u.voice = jaVoice;
        u.onend = function () {
            currentIndex++;
            if (item.delay > 0) setTimeout(speakNext, item.delay);
            else speakNext();
        };
        window.speechSynthesis.speak(u);
    }
    if (window.speechSynthesis.getVoices().length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
            speakNext();
            window.speechSynthesis.onvoiceschanged = null;
        };
    } else {
        speakNext();
    }
}

console.log('auth.js loaded successfully');

