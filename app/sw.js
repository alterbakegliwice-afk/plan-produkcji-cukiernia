// Service worker — praca offline (cache-first z aktualizacją w tle)
// UWAGA: przy każdej zmianie plików aplikacji podbij numer wersji poniżej,
// inaczej telefony zostaną na starej wersji do wygaśnięcia cache.
const CACHE = "alterbake-planer-v4";
const PLIKI = [
  "./", "index.html", "manifest.webmanifest", "ikona.svg", "css/app.css",
  "data/receptury.js", "data/zasoby.js", "data/wiedza.js", "data/korpus-cukiernia.js",
  "data/piekarnia.js", "data/zasoby-piekarnia.js", "data/wiedza-piekarnia.js", "data/korpus-piekarnia.js",
  "data/moduly.js",
  "js/util.js", "js/wiedza-index.js", "js/store.js", "js/nauka.js", "js/czas.js",
  "js/symulacja.js", "js/automat.js", "js/wykresy.js", "js/souschef.js",
  "js/widok-plan.js", "js/widok-receptury.js", "js/widok-zadania.js",
  "js/widok-inspiracje.js", "js/widok-souschef.js", "js/app.js"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(PLIKI)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(klucze =>
      Promise.all(klucze.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  // API i zewnętrzne zapytania idą zawsze do sieci
  if (url.origin !== location.origin || e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(cache => {
      const siec = fetch(e.request).then(odp => {
        if (odp.ok) caches.open(CACHE).then(c => c.put(e.request, odp.clone()));
        return odp;
      }).catch(() => cache);
      return cache || siec;
    })
  );
});
