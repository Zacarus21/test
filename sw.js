// The service worker caches the app's files so it works offline
// Think of it as a little background helper that saves a copy of your app

const CACHE_NAME = 'tip-jar-v1';

// These are all the files we want to save for offline use
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json'
];

// When the app is first installed, save all the files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// When the app asks for a file, try the cache first
// If it's not there, go to the internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
