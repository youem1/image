const CACHE_NAME = "version1";
const urlsToCache = [
    "static/js/main.5e0ba60c.js",
    "/static/css/main.44fb2667.css",
    "/static/css/main.44fb2667.css.map",
    '/static/js/main.5e0ba60c.js.map',
    '/manifest.json',
    '/',
    '/sw.js'
];

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
        .then((res) => {
            // console.log('5555', res)
            if (res) {
                return caches.open(CACHE_NAME)
                    .then(function(cache) {
                        cache.put(event.request.url, res.clone());
                        return res;
                    })

            }
        }).catch((err) => {
            // console.log('[Service Worker]:fetch data is failure cache is find')
            return (caches.match(event.request)
                .then((res) => {
                    console.log('[Service Worker]: find file in cache store');
                    return res;
                }))

        })
    )


})


//activate the sw
self.addEventListener('activate', (event) => {
    console.log('[Service Worker]: activated')
})