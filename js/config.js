/**
 * config.js - Global Configuration and Environment Variables
 * @module config
 */
export const Config = {
    app: {
        name: 'JAP-BONG',
        version: '1.2.0-commercial',
        environment: 'production', // 'development' | 'production'
    },
    users: {
        adminId: 'dad',
        authorizedUsers: ['dad', 'mom', 'sieun', 'harong', 'guest'],
        defaultAvatar: 'images/avatars/default.png',
    },
    api: {
        // Future Use: Endpoints for backend services
        baseUrl: '',
    },
    storageKeys: {
        currentUser: 'jap_bong_current_user_v2',
        studyHistory: 'jap_bong_history_v2',
        settings: 'jap_bong_settings',
    },
    features: {
        adsEnabled: false,
        analyticsEnabled: true,
    }
};


