const CACHE_NAME = "clusterlog-v1";

const ASSETS = [
    "./",
    "./index.html",
    "./css/variables.css",
    "./css/base.css",
    "./css/app.css",
    "./js/app.js",
    "./manifest.json"
];

// Installation
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS);
        })
    );
});

// Aktivierung
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            )
        )
    );
});

// Netzwerkanfragen
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});