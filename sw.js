const CACHE_NAME = 'notas-cens-v1';
const ASSETS = [
  './',
  'con.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS);
      })
  );
});

self.addEventListener('fetch', event => {
  // Ignora requisições POST (como o formulário de salvar notas)
  if (event.request.method === 'POST') {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});