// app_core.js - Core Application Logic & Initialization

// Version Check & Cache Busting
const APP_VERSION = '1.0.4';
const STORED_VERSION = localStorage.getItem('app_version');

if (STORED_VERSION && STORED_VERSION !== APP_VERSION) {
    console.log(`New version detected: ${APP_VERSION}. Cleaning up...`);
    localStorage.setItem('app_version', APP_VERSION);
    if ('caches' in window) {
        caches.keys().then(names => {
            for (let name of names) caches.delete(name);
        });
    }
    location.reload(true);
} else if (!STORED_VERSION) {
    localStorage.setItem('app_version', APP_VERSION);
}

// Conversation Mode Logic
window.showConversationMode = function (mode) {
    const situationalContainer = document.getElementById('situational-conversation-container');
    const practicalContainer = document.getElementById('practical-conversation-container');
    const situationalBtn = document.getElementById('mode-situational-btn');
    const practicalBtn = document.getElementById('mode-practical-btn');

    if (situationalContainer) situationalContainer.classList.add('hidden');
    if (practicalContainer) practicalContainer.classList.add('hidden');

    const baseBtnClass = 'flex-1 py-2 px-4 rounded-xl font-bold text-base transition-all duration-300 bg-white text-gray-600 border-2 border-gray-200';
    const activeSituationalClass = 'flex-1 py-2 px-4 rounded-xl font-bold text-base transition-all duration-300 bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg';
    const activePracticalClass = 'flex-1 py-2 px-4 rounded-xl font-bold text-base transition-all duration-300 bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg';

    if (situationalBtn) situationalBtn.className = baseBtnClass;
    if (practicalBtn) practicalBtn.className = baseBtnClass;

    if (mode === 'situational') {
        if (situationalContainer) situationalContainer.classList.remove('hidden');
        if (situationalBtn) situationalBtn.className = activeSituationalClass;
        if (typeof window.initConversation === 'function') window.initConversation();
    } else if (mode === 'practical') {
        if (practicalContainer) practicalContainer.classList.remove('hidden');
        if (practicalBtn) practicalBtn.className = activePracticalClass;
        if (typeof window.initDayConversation === 'function') window.initDayConversation();
    }
};

// Manual Modal Logic - Defined in js/manual.js (not duplicated here)

// Guest Login Logic
let guestAvatars = [];
let selectedAvatar = null;

window.showGuestLoginModal = async function () {
    const modal = document.getElementById('guest-login-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    document.getElementById('guest-step-1')?.classList.remove('hidden');
    document.getElementById('guest-step-2')?.classList.add('hidden');
    selectedAvatar = null;

    if (guestAvatars.length === 0) {
        try {
            const response = await fetch('data/guest_avatars.json');
            if (!response.ok) throw new Error('Failed to fetch avatars');
            guestAvatars = await response.json();
        } catch (e) {
            console.warn('Using fallback avatars');
            guestAvatars = [
                { id: 1, name: "?†Ïù¥", avatar: "images/avatars/avatar_p_1.png" },
                { id: 2, name: "ÏºÑÏ?", avatar: "images/avatars/avatar_p_2.png" },
                { id: 3, name: "?òÎ£®Ïπ?, avatar: "images/avatars/avatar_p_3.png" },
                { id: 4, name: "?ÄÏø†Ïïº", avatar: "images/avatars/avatar_p_4.png" },
                { id: 5, name: "?¨ÌÜ†ÎØ?, avatar: "images/avatars/avatar_p_5.png" },
                { id: 6, name: "?§ÎÇòÏπ?, avatar: "images/avatars/avatar_p_6.png" }
            ];
        }
    }
    renderAvatarGrid();
};

window.renderAvatarGrid = function () {
    const grid = document.getElementById('guest-avatar-grid');
    if (!grid) return;
    grid.innerHTML = guestAvatars.map(avatar => `
        <div onclick="selectGuestAvatar(${avatar.id})" id="avatar-item-${avatar.id}"
            class="avatar-item group relative cursor-pointer aspect-square rounded-2xl overflow-hidden border-4 border-transparent hover:border-amber-500 transition-all transform hover:scale-105 shadow-sm">      
            <img src="${avatar.avatar}" class="w-full h-full object-cover" loading="lazy">
            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-end p-2">
                <span class="text-[10px] text-white font-bold truncate">${avatar.name}</span>
            </div>
        </div>
    `).join('');
};

window.selectGuestAvatar = function (avatarId) {
    selectedAvatar = guestAvatars.find(a => a.id === avatarId);
    if (!selectedAvatar) return;

    document.getElementById('guest-step-1')?.classList.add('hidden');
    document.getElementById('guest-step-2')?.classList.remove('hidden');

    const preview = document.getElementById('selected-avatar-preview');
    if (preview) preview.src = selectedAvatar.avatar;

    const modalTitle = document.querySelector('#guest-login-modal p');
    if (modalTitle) modalTitle.innerText = "?âÎÑ§?ÑÏùÑ ?ÖÎ†•?¥Ï£º?∏Ïöî!";

    setTimeout(() => document.getElementById('guest-name-input')?.focus(), 100);
};

window.completeGuestLogin = async function () {
    const nameInput = document.getElementById('guest-name-input');
    const name = nameInput?.value.trim();

    if (!name) {
        alert('¥–≥◊¿”¿ª ¿‘∑¬«ÿ¡÷ººø‰!');
        nameInput?.focus();
        return;
    }

    window.currentUser = {
        id: 'guest_' + Date.now(),
        name: name,
        avatar: selectedAvatar?.avatar || "images/avatars/avatar_p_1.png",
        isGuest: true,
        progress: {}
    };

    localStorage.setItem('currentUser', JSON.stringify(window.currentUser));
    window.closeGuestLoginModal();

    document.getElementById('login-screen') && (document.getElementById('login-screen').style.display = 'none');

    const userProfileIcon = document.getElementById('user-profile-icon');
    if (userProfileIcon) {
        userProfileIcon.classList.remove('hidden');
        userProfileIcon.classList.add('flex');
        document.getElementById('current-user-avatar').innerHTML = `<img src="${window.currentUser.avatar}" class="w-8 h-8 rounded-full border-2 border-white/50 shadow-sm">`;
        document.getElementById('current-user-name').textContent = name;
    }

    document.getElementById('bottom-nav')?.classList.remove('hidden');
    showTab('home');

    if (window.LoggingService) LoggingService.log('guest_login', { name, avatar: selectedAvatar?.name });
};

window.closeGuestLoginModal = function () {
    const modal = document.getElementById('guest-login-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
};

// Initialization
window.addEventListener('DOMContentLoaded', async () => {
    if (window.SectionLoader) {
        // ?Ë¢Å‚ë∏ UI                      ??Í≥??•‚â™Ë´?        await Promise.all([
            SectionLoader.load('login-container', 'sections/login.html'),
            SectionLoader.load('manual-container', 'sections/manual.html'),
            SectionLoader.load('help-container', 'sections/help.html'),
            SectionLoader.load('bottom-nav-container', 'sections/bottom_nav.html')
        ]);
    }

    try {
        if (typeof checkAutoLogin === 'function') checkAutoLogin();

        const lastTab = localStorage.getItem('lastTab') || 'home';
        showTab(lastTab);

        if (typeof initVocabulary === 'function') initVocabulary();
        if (typeof showCharacterGrid === 'function') showCharacterGrid('hiragana');
    } catch (error) {
        console.error("Initialization error:", error);
    }
});
