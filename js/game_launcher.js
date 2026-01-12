/**
 * game_launcher.js - Game Center Controller
 * Restored by Agent 4
 */

const GameLauncher = {
    currentGame: null,

    init: function () {
        console.log('[GameLauncher] Initialized');
        this.bindEvents();
    },

    bindEvents: function () {
        // Find all game start buttons
        document.querySelectorAll('[data-game-id]').forEach(btn => {
            btn.onclick = (e) => {
                const gameId = e.currentTarget.dataset.gameId;
                this.launch(gameId);
            };
        });
    },

    launch: function (gameId) {
        console.log('[GameLauncher] Launching:', gameId);

        // Hide Main Content
        const main = document.getElementById('main-content');
        if (main) main.classList.add('hidden');

        // Show Game Container
        const container = document.getElementById('game-container');
        if (container) {
            container.classList.remove('hidden');
            container.innerHTML = ''; // Clear previous

            // Inject Game Canvas/UI based on ID
            this.loadGameModule(gameId, container);
        }
    },

    loadGameModule: function (gameId, container) {
        // Simple mapping to existing game files logic
        if (gameId === 'sushi_survival') {
            if (window.startSushiSurvival) window.startSushiSurvival(container);
        } else if (gameId === 'neon_syntax') {
            if (window.startNeonSyntax) window.startNeonSyntax(container);
        } else if (gameId === 'kana_fill') {
            // Kana Fill Logic
            container.innerHTML = '<div class="text-white p-10">Starting Kana Fill...</div>';
            if (window.startKanaFill) window.startKanaFill(container);
        } else {
            container.innerHTML = `<div class="text-white text-center mt-20">Game Module '${gameId}' loading...</div>`;
        }
    },

    close: function () {
        const container = document.getElementById('game-container');
        if (container) container.classList.add('hidden');

        const main = document.getElementById('main-content');
        if (main) main.classList.remove('hidden');

        // Stop current game loop if any
        if (this.currentGame && this.currentGame.stop) {
            this.currentGame.stop();
        }
    }
};

window.GameLauncher = GameLauncher;

// Bridge for legacy HTML calls
window.showGame = (gameId) => GameLauncher.launch(gameId);

// Auto Init
document.addEventListener('DOMContentLoaded', () => {
    GameLauncher.init();
});
