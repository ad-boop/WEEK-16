var cacheName='petstore-v1';
var cacheFiles=[
    'index.html',
    'product.js',
    'petstore.webmanifest',
    'images/cat.jpg',
    'images/chicken.jpg',
    'images/dog.jpg',
    'images/horse.jpg',
    'images/mouse.jpg',
    'images/pet-food.png'
]

self.addEventListener('install',(e)=>{
    console.log('[Servie WOrker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache)=>{
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    )
})

// self.addEventListener('fetch',function(e){
//     e.respondWith(
//         // check if the cache has the file
//         caches.match(e.request).then(function(r){
//             console.log('[SERVICE WORKER] FETCHING RESOURCE:'+e.request.url);
//             // r is the matching file if it exists in the cache
//             return r
//         })
//     )
// })


self.addEventListener('fetch',function(e){
    e.respondWith(
        caches.match(e.request).then(function(r){
            return r || fetch(e.request).then(function(response){
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request,response.clone());
                    return response;
                })
            })
        })
    )
})