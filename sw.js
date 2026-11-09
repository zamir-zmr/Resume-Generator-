/* Resume Maker - service worker (offline shell + PDF libraries). Firebase calls are never cached. */
const SHELL = 'resume-shell-v1', ROOT = self.registration.scope;
const APP_SHELL = ['', 'index.html', 'resume.html', 'manifest.json', 'icon-192.png', 'icon-512.png', 'privacy-policy.html'].map(u => ROOT + u);
const LIBS = ['https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => Promise.allSettled([...APP_SHELL.map(u => c.add(new Request(u, { cache: 'reload' }))), ...LIBS.map(u => c.add(new Request(u, { mode: 'no-cors' })))])).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== SHELL).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  if (/(firebaseio\.com|firebasedatabase\.app|firebasestorage|googleapis\.com|gstatic\.com)/.test(url.host)) return;
  if (url.host === 'cdnjs.cloudflare.com') {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { const c = r.clone(); caches.open(SHELL).then(x => x.put(req, c)); return r; })));
    return;
  }
  if (req.mode === 'navigate' && url.origin === location.origin) {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(SHELL).then(x => x.put(req, c)); return r; }).catch(() => caches.match(req).then(h => h || caches.match(ROOT))));
    return;
  }
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r && r.ok) { const c = r.clone(); caches.open(SHELL).then(x => x.put(req, c)); } return r; }).catch(() => hit);
      return hit || net;
    }));
  }
});
