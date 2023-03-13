const CACHE_NAME = "sthlm-mc-parking";

// Use the install event to pre-cache all initial resources.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      cache.addAll([
        "/",
        "/pages/**/*.tsx",
        "/styles/global.css",
        "/components/**/*.tsx",
        "/public/**/*.{html,json,png,txt,js}",
        "/types/**/*.d.ts",
        "utils/**/*.ts",
        "/config/**/*.perm",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    // Get the resource from the cache.
    caches
      .match(event.request)
      .then((res) => {
        // If the resource was not in the cache, try the network.
        return res || fetch(event.request);
      })
      .catch((err) => {
        console.log("The network failed.", err);
      })
  );
});
