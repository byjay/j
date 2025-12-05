/**
 * auth.js - 인증 시스템
 */

const users = {
    dad: { id: 'dad', name: '봉아빠', avatar: 'images/dad.png' },
    mom: { id: 'mom', name: '강엄마', avatar: 'images/mom_orig.png' },
    sieun: { id: 'sieun', name: '시으니', avatar: 'images/sieun.png' },
    harong: { id: 'harong', name: '하롱이', avatar: 'images/harong.png' }
};

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
}

function hideLoginModal() {
    const loginScreen = document.getElementById('login-screen');
    if (loginScreen) {
        loginScreen.style.display = 'none';
    }
}

function login(userId) {
    if (!users[userId]) {
        console.error('Invalid user:', userId);
        return;
    }

    currentUser = users[userId];
    localStorage.setItem('currentUser', userId);
    console.log('Login successful:', currentUser.name);

    // Gamification 사용자 전환 및 데이터 로드
    if (window.Gamification) {
        window.Gamification.switchUser(userId);
    }

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

    if (loginCallback) {
        loginCallback();
        loginCallback = null;
    }

    // 로그인 후에는 홈 탭을 누른 것처럼 바로 홈 화면을 보여준다
    if (typeof showTab === 'function') {
        showTab('home');
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
    localStorage.removeItem('currentUser');

    // 하단 네비게이션 숨기기
    const bottomNav = document.getElementById('bottom-nav');
    if (bottomNav) {
        bottomNav.classList.add('hidden');
    }

    showLoginModal();
    console.log('Logged out');
}

function checkAutoLogin() {
    const savedUserId = localStorage.getItem('currentUser');
    if (savedUserId && users[savedUserId]) {
        console.log('Auto-login found:', savedUserId);
        login(savedUserId);
    } else {
        showLoginModal();
    }
}

// 아빠 비밀번호 입력
function showPasswordPrompt() {
    const password = prompt('아빠 비밀번호를 입력하세요:');
    if (password === '1435') {
        login('dad');
    } else if (password !== null) {
        alert('비밀번호가 틀렸습니다!');
    }
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


// 전역 노출
window.showLoginModal = showLoginModal;
window.hideLoginModal = hideLoginModal;
window.login = login;
window.logout = logout;
window.checkAutoLogin = checkAutoLogin;
window.showPasswordPrompt = showPasswordPrompt;
window.resetAllProgress = resetAllProgress;

console.log('auth.js loaded');

