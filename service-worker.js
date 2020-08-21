/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "26911c313e8b097ff355dc3bcfaf3b3a"
  },
  {
    "url": "assets/css/0.styles.af084dce.css",
    "revision": "798677206ed5a35eb27b081db6d702a7"
  },
  {
    "url": "assets/img/logo.png",
    "revision": "d053f2e15f0b169d61486c7aaac06d56"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/2.a13100e2.js",
    "revision": "e7694f286b95c949b29d70aea70303b3"
  },
  {
    "url": "assets/js/3.ae6ec04c.js",
    "revision": "d80845447b86364347d9582d15d8c61d"
  },
  {
    "url": "assets/js/4.2f529c62.js",
    "revision": "677b677613a06d18225a897e6ceb9bef"
  },
  {
    "url": "assets/js/5.83bc0aa3.js",
    "revision": "b77fdd367d9248cd260e6c7a6e4ab6b3"
  },
  {
    "url": "assets/js/6.df9adbdf.js",
    "revision": "e17670d68a403f95be4ee1f5e1c5e371"
  },
  {
    "url": "assets/js/7.01b30525.js",
    "revision": "0e70bf4789941cc2f7be1a9e5f0cd1f7"
  },
  {
    "url": "assets/js/8.a9f793f7.js",
    "revision": "3f6811af98c9d6fae2d7ea8d2344cc25"
  },
  {
    "url": "assets/js/9.3e1d2ca7.js",
    "revision": "631b76356a2548505ab3754c583c3f29"
  },
  {
    "url": "assets/js/app.8edf5945.js",
    "revision": "e661d41ad9b8d8b8049928ef71b638c1"
  },
  {
    "url": "criandobot/aulas/Comunicacao.html",
    "revision": "2dd549fa86c9e24f186ee619e36e3ec1"
  },
  {
    "url": "criandobot/aulas/Piloto.html",
    "revision": "3cb311f2e465498745f60a744500c02d"
  },
  {
    "url": "index.html",
    "revision": "8c61fb3fcf335cf00569daf2d7b07c2c"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
