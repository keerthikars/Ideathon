const CACHE_NAME = 'postpartum-recovery-v1';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Install event - cache static files
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached');
        return self.skipWaiting();
      })
      .catch(err => {
        console.log('Service Worker: Error caching static files', err);
      })
  );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests
  if (!request.url.startsWith(self.location.origin)) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache', request.url);
          return cachedResponse;
        }
        
        // If not in cache, fetch from network
        return fetch(request)
          .then(fetchResponse => {
            // Check if we received a valid response
            if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
              return fetchResponse;
            }
            
            // Clone the response for caching
            const responseToCache = fetchResponse.clone();
            
            // Add to dynamic cache
            caches.open(DYNAMIC_CACHE)
              .then(cache => {
                console.log('Service Worker: Caching dynamic resource', request.url);
                cache.put(request, responseToCache);
              });
            
            return fetchResponse;
          })
          .catch(() => {
            // If both cache and network fail, return offline page for navigation requests
            if (request.mode === 'navigate') {
              return caches.match('/')
                .then(cachedResponse => {
                  if (cachedResponse) {
                    return cachedResponse;
                  }
                  // Fallback offline page
                  return new Response(`
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <title>Postpartum Recovery Companion - Offline</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                          body { 
                            font-family: system-ui, -apple-system, sans-serif; 
                            text-align: center; 
                            padding: 2rem; 
                            max-width: 400px; 
                            margin: 0 auto; 
                          }
                          .heart { font-size: 4rem; margin: 2rem 0; }
                          .title { color: #E8B4CB; margin-bottom: 1rem; }
                          .message { color: #666; line-height: 1.5; }
                        </style>
                      </head>
                      <body>
                        <div class="heart">❤️</div>
                        <h1 class="title">You're Offline</h1>
                        <p class="message">
                          Don't worry - your Recovery Companion is still here for you. 
                          Your data is safely stored on your device. 
                          Connect to the internet when you can to sync any updates.
                        </p>
                        <button onclick="window.location.reload()" 
                                style="background: #E8B4CB; color: white; border: none; padding: 1rem 2rem; border-radius: 0.5rem; margin-top: 1rem; cursor: pointer;">
                          Try Again
                        </button>
                      </body>
                    </html>
                  `, {
                    headers: { 'Content-Type': 'text/html' }
                  });
                });
            }
            
            // For other requests, return a simple offline response
            return new Response('Offline - Please check your connection', {
              status: 503,
              statusText: 'Service Unavailable'
            });
          });
      })
  );
});

// Background sync for when connection is restored
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'postpartum-data-sync') {
    event.waitUntil(
      // In a real app, you'd sync local data to server here
      Promise.resolve().then(() => {
        console.log('Service Worker: Data sync completed');
        
        // Notify the app that sync is complete
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'SYNC_COMPLETE',
              message: 'Your data has been synced successfully'
            });
          });
        });
      })
    );
  }
});

// Push notifications for reminders
self.addEventListener('push', event => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'Time for a self-care reminder!',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="30" fill="%23E8B4CB"/><text x="32" y="40" text-anchor="middle" font-size="32" fill="white">❤️</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="%23E8B4CB"/></svg>',
    vibrate: [200, 100, 200],
    tag: 'postpartum-reminder',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'View App',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="white"/></svg>'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="white"/></svg>'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Recovery Companion', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked', event.action);
  
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'dismiss') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.matchAll({ type: 'window' })
        .then(clientList => {
          // If app is already open, focus it
          for (let client of clientList) {
            if (client.url === '/' && 'focus' in client) {
              return client.focus();
            }
          }
          // Otherwise, open new window
          if (clients.openWindow) {
            return clients.openWindow('/');
          }
        })
    );
  }
});

// Message handling from the main app
self.addEventListener('message', event => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'SCHEDULE_REMINDER') {
    // In a real app, you'd schedule notifications here
    console.log('Service Worker: Scheduling reminder', event.data.reminder);
  }
});

console.log('Service Worker: Script loaded');
