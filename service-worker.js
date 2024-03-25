// Service worker to cache assets and handle push notifications
self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('offline-cache').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          // Add more URLs of assets you want to cache
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  
  self.addEventListener('push', event => {
    const title = 'Push Notification';
    const options = {
      body: 'This is a push notification from your PWA.',
      icon: '/icon.png'
      // You can customize the notification further here
    };
    event.waitUntil(self.registration.showNotification(title, options));
  });
  