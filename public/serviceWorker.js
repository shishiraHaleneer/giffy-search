
var SCRIPT_CACHE_NAME = 'my-site-cache';
var IMAGE_CACHE = 'my-image-cache';
var API_CACHE = 'my-api-cache';
const API_NAME = "api.giphy.com";
var lastAPi = null;
var urlsToCache = [
  '/static/css/main.css',
  '/static/js/main.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(SCRIPT_CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});


function deleteImageCache() {
    caches.delete(IMAGE_CACHE);
}

self.addEventListener('activate', function(event) {
    console.log("active");

});

self.addEventListener('fetch', function(event) {
    //console.log("event ",event);
    if(event && event.request && event.request.destination === 'image'){
        event.respondWith(
        //ccache all fetch responses
            caches.open(IMAGE_CACHE).then(function(cache) {
            //console.log("cache ",cache);
                return cache.match(event.request).then(function (response) {
                    return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
        );

    }else if(event && event.request && event.request.destination === 'script') {

        event.respondWith(
            //ccache all fetch responses
            caches.open(SCRIPT_CACHE_NAME).then(function (cache) {
                //console.log("cache ",cache);
                return cache.match(event.request).then(function (response) {
                    return response || fetch(event.request).then(function (response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
        );
    }else if(event && event.request && event.request.url.indexOf(API_NAME) > 0){
       console.log("api name1",event.request.url,"lastAPi ",lastAPi);
        if(event.request.url && event.request.url.indexOf(lastAPi) >= 0){
            console.log("dont delete ");
        }else{
            lastAPi = event.request.url.split("&api_key")[0];
            console.log("image cache delete ",lastAPi);
            deleteImageCache();
        }

        event.respondWith(
            //ccache all fetch responses
            caches.open(API_CACHE).then(function (cache) {
                //console.log("cache ",cache);
                return cache.match(event.request).then(function (response) {
                    return response || fetch(event.request).then(function (response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
        );

    }else{
        event.respondWith(
            //ccache all fetch responses
            caches.open(SCRIPT_CACHE_NAME).then(function (cache) {
                //console.log("cache ",cache);
                return cache.match(event.request).then(function (response) {
                    return response || fetch(event.request).then(function (response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
        );
    }
});

self.addEventListener('message', function(event){
    console.log("SW Received Message1: " + (event.data.data));
  //  lastAPi = event.data.data;

});
