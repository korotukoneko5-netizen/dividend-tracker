// Service Worker for 高配当株トラッカー
const CACHE_NAME = 'dividend-tracker-v2';
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
  const url = event.request.url;

  // APIリクエストはキャッシュせず、ネットワーク優先
  if (url.includes('yahoo.com') || url.includes('corsproxy') || url.includes('allorigins') || url.includes('codetabs') || url.includes('yanoshin') || url.includes('githubusercontent') || url.includes('api.github.com')) {
    event.respondWith(fetch(event.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  // HTML/JSON/JS はネットワーク優先（常に最新版を取得）
  if (url.endsWith('.html') || url.endsWith('.json') || url.endsWith('.js') || url.endsWith('/')) {
    event.respondWith(
      fetch(event.request).then(resp => {
        if (resp && resp.status === 200) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return resp;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // それ以外（画像など）はキャッシュ優先
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
