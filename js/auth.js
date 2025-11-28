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

    updateUserDisplay();
    hideLoginModal();

    // 로그인 후 메인 메뉴 표시, 탭 콘텐츠는 숨김
    const mainMenu = document.getElementById('main-menu');
    if (mainMenu) {
        mainMenu.style.display = 'grid';
    }

    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
        tab.classList.remove('active');
    });

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
    showLoginModal();
    console.log('Logged out');
}

function checkAutoLogin() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser && users[savedUser]) {
        console.log('Auto login:', savedUser);
        login(savedUser);
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

console.log('auth.js loaded');
