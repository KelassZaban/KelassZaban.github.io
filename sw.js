const CACHE_NAME = 'task-system-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    'icon-72x72.png',
    'icon-96x96.png',
    'icon-128x128.png',
    'icon-144x144.png',
    'icon-152x152.png',
    'icon-192x192.png',
    'icon-384x384.png',
    'icon-512x512.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('کش باز شد');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});