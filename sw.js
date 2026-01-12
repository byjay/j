// JAP-BONG PWA Service Worker - v2.1.0 (Banana Pro 8K & WebP Config)
// 자동 새로고침을 위한 강제 버전업 - 2026-01-12 12:51:00
const APP_VERSION = '1.0.20260112_235932';
const CACHE_NAME = 'jap-bong-fam-v20260112_180900';

// 핵심 자원만 캐시 (JS/CSS는 항상 네트워크 우선)
const ASSETS_TO_CACHE = [
    './',
    './images/app_icon.png'
];

// 설치: 새 버전 캐싱
self.addEventListener('install', (event) => {
    console.log(`[SW] Installing version: ${APP_VERSION}`);
    self.skipWaiting(); // 즉시 활성화
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 활성화: 구버전 캐시 즉시 삭제
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('[SW] Now controlling all clients.');
            return self.clients.claim();
        })
    );
});

// Fetch 전략: 모든 JS/CSS 및 HTML은 Network First
self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('google') || event.request.url.includes('adsbygoogle')) {
        return;
    }

    const url = new URL(event.request.url);
    const isCodeFile = url.pathname.endsWith('.js') || url.pathname.endsWith('.css') || url.pathname.endsWith('.html');
    const isNavigate = event.request.mode === 'navigate' || event.request.destination === 'document';

    // HTML, JS, CSS는 항상 네트워크 우선 (즉시 업데이트 반영)
    if (isNavigate || isCodeFile) {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    return caches.match(event.request);
                })
        );
        return;
    }

    // 이미지 등 정적 자원만 Cache First
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }
                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return networkResponse;
            });
        })
    );
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});