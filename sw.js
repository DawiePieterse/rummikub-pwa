// Rummikub PWA service worker: caches the app shell so the game opens offline.
// Same-origin files are network-first (a deploy shows up on the next load, the cache is the
// fallback); the CDN library is cache-first (it never changes for a given version).
const CACHE = 'rummikub-pwa-v4';
const SHELL = ['./', './index.html', './tailwind.css', 'https://cdn.jsdelivr.net/npm/peerjs@1.5.4/dist/peerjs.min.js'];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE)
            .then(cache => Promise.allSettled(SHELL.map(url =>
                fetch(url, { mode: url.startsWith('http') ? 'no-cors' : 'same-origin' }).then(res => cache.put(url, res))
            )))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    const sameOrigin = url.origin === self.location.origin;
    if (!sameOrigin && !url.href.includes('/peerjs@')) return; // signalling, STUN/TURN etc. go straight out

    if (sameOrigin) {
        event.respondWith(
            fetch(req).then(res => {
                if (res.ok) caches.open(CACHE).then(cache => cache.put(req, res.clone()));
                return res;
            }).catch(() => caches.match(req, { ignoreSearch: true }))
        );
    } else {
        event.respondWith(
            caches.match(req).then(hit => hit || fetch(req).then(res => {
                caches.open(CACHE).then(cache => cache.put(req, res.clone()));
                return res;
            }))
        );
    }
});
