const CACHE_NAME = "version1";
const urlsToCache = [
    "static/js/main.5e0ba60c.js",
    "/static/css/main.44fb2667.css",
    "/static/css/main.44fb2667.css.map",
    '/static/js/main.5e0ba60c.js.map',
    '/manifest.json',
    '/',
    '/index.html',
    '/sw.js',
    'https://fonts.googleapis.com/css2?family=Nunito&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&family=Vazirmatn:wght@100;200;300;400;500;600;900&display=swap',
    'https://fonts.gstatic.com/s/vazirmatn/v6/Dxxo8j6PP2D_kU2muijlGMWWIGroe7ll.woff2',
    'https://fonts.gstatic.com/s/vazirmatn/v6/Dxxo8j6PP2D_kU2muijlHcWWIGroew.woff2',
    // 'https://s24.picofile.com/file/8451959984/ic_launcher.bmp',
    // 'https://s25.picofile.com/file/8451911668/BeFunky_photo.png'

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