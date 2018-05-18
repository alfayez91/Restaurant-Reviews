let cacheName = 'restaurant-review';

self.addEventListener('install', function (event) {
  console.log('Service Worker Install...');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        '/',
        './index.html',
        './restaurant.html',
        './css/styles.css',
        './js/dbhelper.js',
        './js/main.js',
        './js/restaurant_info.js',
        './data/restaurants.json',
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
        './img/9.jpg',
        './img/10.jpg',
      ])}).catch((error) =>  {
        console.error('Failed to cache', error);
      })
  );
});

self.addEventListener('activate', event => {
  console.log("Claiming");
  event.waitUntil(self.clients.claim());
  console.log("Activated");
});

self.addEventListener('fetch', function(event) {
  console.log("Service Worker Fetch...");
  // console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(err => console.log(err))
  );  
});