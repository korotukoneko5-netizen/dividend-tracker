// Service Worker for 高配当株トラッカー
const CACHE_NAME = 'dividend-tracker-v1';
const URLS_TO_CACHE = ['./', './index.html', './manifest.json'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // APIリクエストはキャッシュせず、ネットワーク優先
  const url = event.request.url;
  if (url.includes('yahoo.com') || url.includes('corsproxy') || url.includes('allorigins') || url.includes('codetabs') || url.includes('yanoshin')) {
    event.respondWith(fetch(event.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // 静的ファイルはキャッシュ優先
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(resp => {
      if (resp && resp.status === 200 && event.request.method === 'GET') {
        const respClone = resp.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, respClone));
      }
      return resp;
    }).catch(() => cached))
  );
});
