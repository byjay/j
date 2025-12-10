const CACHE_NAME = 'jap-bong-fam-v4';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './css/styles.css',
    './images/dad.png',
    './js/auth.js',
    './js/ui.js',
    './js/gamification.js',
    './js/commercial.js',
    './js/learning/conversation.js',
    './js/learning/characters.js',
    './js/learning/vocabulary.js',
    './js/learning/word_study.js',
    './js/learning/progress.js',
    './js/travel/japan_travel.js',
    './js/travel/transportation.js',
    './js/travel/tokyo.js',
    './js/travel/osaka.js',
    './js/travel/kyoto.js',
    './js/travel/fukuoka.js',
    './js/travel/sapporo.js',
    './js/travel/okinawa.js',
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
