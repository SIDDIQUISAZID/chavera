// console.log("sw public working");
const cacheName = "appV1";
this.addEventListener("install", (event) => {
  console.log("installing service worker");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("files cached");
      cache.addAll([
        "/",
        "/index.html",
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/bundle.js",
        // "/static/js/src_pages_Login_index_tsx.chunk.js",
        // "/static/js/src_assets_images_index_ts.chunk.js",
        "/login",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    // if (event.request.url === "http://localhost:3000/manifest.json") {
    //   console.log("notification pushed", event.request.url);
    //   event.waitUntil(
    //     this.registration.showNotification("Internet", {
    //       body: "Internet not working",
    //     })
    //   );
    // }
    // console.log("navigator is offline serve cache data");
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          //   console.log("request name", event.request, { resp });
          return resp;
        }
      })
    );
  } else {
    // console.log("navigator is online");
  }
});
