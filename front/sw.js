const CACHE_NAME = "version0002";
const CACHE_NAME_STATIC = "static0002"
    // const CACHE_NAME = "version0001";
    // const CACHE_NAME = "version0001";
    // const CACHE_NAME = "version0001";
    // const CACHE_NAME = "version0001";
const urlsToCache = [
    'https://s24.picofile.com/file/8452672792/unlocked_1_.png',
    'https://s24.picofile.com/file/8452672768/lock_1_.png',
    'https://s25.picofile.com/file/8452672784/lock_2_.png',
    'https://s24.picofile.com/file/8452730792/low_battery.png',
    'https://s24.picofile.com/file/8452289734/battery_6_.png',
    'https://s24.picofile.com/file/8452731442/batteru_2index.png',
    'https://s25.picofile.com/file/8452289750/battery_7_.png',
    'https://s24.picofile.com/file/8452289768/battery_8_.png',
    'https://s25.picofile.com/file/8452730818/no_battery.png'
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
                        return caches.open(CACHE_NAME_STATIC)
                            .then(function(cache) {
                                cache.put(event.request.url, res.clone());
                                return res;
                            })
                    });
            }
        })
    );


})


//activate the sw
self.addEventListener('activate', (event) => {
    console.log('[Service Worker]: activated');
    console.log('[Service Worker] Activating Service Worker ....', event);
    event.waitUntil(
        caches.keys()
        .then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== CACHE_NAME) {
                    console.log('[Service Worker] Removing old cache.', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
})