/**
 * security.js - Data Security & Storage Service
 * Provides basic obfuscation for client-side data (Maximization Goal).
 */
const SecurityService = {
    // Simple Base64 + Salt obfuscation (Not military grade, but prevents casual snooping)
    _salt: 'JAP_BONG_SECURE_SALT_',

    encrypt(data) {
        try {
            const json = JSON.stringify(data);
            return btoa(unescape(encodeURIComponent(this._salt + json)));
        } catch (e) {
            console.error('[Security] Encryption failed', e);
            return null;
        }
    },

    decrypt(ciphertext) {
        try {
            const decoded = decodeURIComponent(escape(atob(ciphertext)));
            if (!decoded.startsWith(this._salt)) return null;
            const json = decoded.replace(this._salt, '');
            return JSON.parse(json);
        } catch (e) {
            console.error('[Security] Decryption failed', e);
            return null;
        }
    },

    setItem(key, value) {
        const encrypted = this.encrypt(value);
        if (encrypted) {
            localStorage.setItem(key, encrypted);
        }
    },

    getItem(key) {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        // Try decrypting; if fails, might be legacy plaintext
        const decrypted = this.decrypt(raw);
        return decrypted || raw; // Fallback to raw if not encrypted
    }
};

window.SecurityService = SecurityService;
console.log('[Security] Service initialized');
