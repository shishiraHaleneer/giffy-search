
var CACHE_NAME = 'my-site-cache-v3';
var urlsToCache = [
  '/static/css/main.css',
  '/static/js/main.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

function getQueryVariable(url,str) {
    var query = url.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == str) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', str);
}

self.addEventListener('activate', function(event) {
    console.log("active");
  // event.waitUntil(
  //   caches.keys().then(function(cacheNames) {
  //     return Promise.all(
  //       cacheNames.filter(function(cacheName) {
  //         // Return true if you want to remove this cache,
  //         // but remember that caches are shared across
  //         // the whole origin
  //       }).map(function(cacheName) {
  //         return caches.delete(cacheName);
  //       })
  //     );
  //   })
  // );
});

self.addEventListener('fetch', function(event) {
    console.log("event ",getQueryVariable(event.request.url,"q"));
  event.respondWith(
      //ccache all fetch responses
    caches.open(CACHE_NAME).then(function(cache) {
        console.log("cache ",cache);
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
