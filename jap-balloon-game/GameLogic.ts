export const GameLogic = {
    getInitialState: () => ({
        score: 0,
        lives: 3,
        currentTarget: 'あ',
        currentKatakana: 'ア',
        isGameOver: false,
        level: 1,
        hit: false
    }),

    processInput: (state: any, input: string) => {
        if (state.isGameOver) return state;

        // Strict Hiragana-Katakana Pairs
        const pairs: { [key: string]: string } = {
            'あ': 'ア', 'い': 'イ', 'う': 'ウ', 'え': 'エ', 'お': 'オ',
            'か': 'カ', 'き': 'キ', 'く': 'ク', 'け': 'ケ', 'こ': 'コ',
            'さ': 'サ', 'し': 'シ', 'す': 'ス', 'せ': 'セ', 'そ': 'ソ',
            'た': 'タ', 'ち': 'チ', 'つ': 'ツ', 'て': 'テ', 'と': 'ト'
        };

        // Check against currentTarget
        // Logic: If input matches target, Score UP + New Target + Signal HIT
        if (input.trim() === state.currentTarget) {
            return {
                ...state,
                score: state.score + 10,
                currentTarget: GameLogic.getRandomTarget(),
                lives: state.lives, // Keep lives
                level: state.level + 0.1,
                hit: true // Signal to clear input
            };
        }

        return { ...state, hit: false };
    },

    getRandomTarget: () => {
        const targets = [
            'あ', 'い', 'う', 'え', 'お',
            'か', 'き', 'く', 'け', 'こ',
            'さ', 'し', 'す', 'せ', 'そ',
            'た', 'ち', 'つ', 'て', 'と'
        ];
        return targets[Math.floor(Math.random() * targets.length)];
    }
};
