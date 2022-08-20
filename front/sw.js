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
            fetch(event.request)
            .then(async res => {
                const cache = await caches.open(CACHE_NAME);
                cache.put(event.request.url, res.clone());
                console.log('[Service Worker]:fetching.');
                return res;
            }).catch(err => {
                caches.match(event.request)
                    .then(res => {
                        if (res) {
                            console.log('[Service Worker]:caching.')
                            return res;

                        } else {
                            console.log('[Service Worker]:can not fetch and caching!')
                        }
                    })
            })
        )
        // event.respondWith(
        //     caches.match(event.request)
        //     .then(function(response) {
        //         if (response) {
        //             return response;
        //         } else {
        //             return fetch(event.request)
        //                 .then(function(res) {
        //                     return caches.open(CACHE_NAME)
        //                         .then(function(cache) {
        //                             cache.put(event.request.url, res.clone());
        //                             return res;
        //                         })
        //                 });
        //         }
        //     })
        // );


})


//activate the sw
self.addEventListener('activate', (event) => {
    console.log('[Service Worker]: activated')
})