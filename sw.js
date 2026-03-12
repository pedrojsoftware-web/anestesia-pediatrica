const CACHE_NAME = 'anestesia-pedia-v3';
// Get the repository name from the URL path.
// For example, from https://username.github.io/anestesia-pediatrica/
// it extracts '/anestesia-pediatrica/'
const basePath = self.location.pathname.substring(0, self.location.pathname.lastIndexOf('/') + 1);

const urlsToCache = [
  basePath,
  basePath + 'index.html',
  basePath + 'style.css',
  basePath + 'app.js',
  basePath + 'manifest.json',
  basePath + 'icons/icon-192x192.png',
  basePath + 'icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Si está en caché, lo devuelve (Offline support)
        }
        return fetch(event.request);
      })
  );
});
