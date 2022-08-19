const CACHE_NAME = "version1";
const urlsToCache = [];
//install sw
self.addEventListener('install', (event) => {
    console.log('[Service Worker]: installed')
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
                console.log("[Service Worker]: opened cache.");
                return cache.addAll(urlsToCache)
            }

        )
    )
})

//listen for request
self.addEventListener('fetch', (event) => {
    console.log('[Service Worker]: fetched');
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request)
                    .then(function(res) {
                        return caches.open(CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request.url, res.clone());
                                return res;
                            })
                    });
            }
        })
    );
    // event.waitUntil(
    //     caches.match(event.request)
    //     .then((res) => {
    //             if (res) {
    //                 return res;
    //             } else {
    //                 fetch(event.request)
    //                     .then(res1 => {
    //                         return caches.open(CACHE_NAME)
    //                             .then(cache => {
    //                                 cache.put(event.request.url, res1.clone())
    //                                 return res1;
    //                             })
    //                     })
    //             }

    //         }

    //     )
    // )

})


//activate the sw
self.addEventListener('activate', (event) => {
    console.log('[Service Worker]: activated')
})