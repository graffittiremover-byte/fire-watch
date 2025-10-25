// sw.js — network-first for HTML, safe cache for static files
const STATIC_CACHE = 'static-v1';

self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Always get fresh HTML (navigations)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req, { cache: 'no-store' })
        .catch(() => caches.match('/fire-watch/offline.html') || new Response('Offline', { status: 503 }))
    );
    return;
  }

  // For static assets: try network, then cache (so updates win)
  if (/\.(js|css|png|jpg|jpeg|svg|ico|webp|gif|woff2?)($|\?)/i.test(req.url)) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(STATIC_CACHE);
        cache.put(req, fresh.clone());
        return fresh;
      } catch {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(req);
        return cached || fetch(req); // last fallback
      }
    })());
  }
});
