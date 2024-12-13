const CACHE_NAME = "acc-calc-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./styles/bootstrap.min.css", // Substitua pelo nome do seu arquivo CSS
  "./styles/styles.css", // Substitua pelo nome do seu arquivo CSS
  "./scripts/main.js",  // Substitua pelo nome do seu arquivo JS
  "./scripts/bootstrap.bundle.min.js",  // Substitua pelo nome do seu arquivo JS
  "./img/icon-192x192.png",
  "./img/icon-512x512.png",
];

// Instalação do Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativação do Service Worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Interceptar requisições
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});