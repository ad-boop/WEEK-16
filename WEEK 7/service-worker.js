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