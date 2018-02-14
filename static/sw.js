importScripts('/_nuxt/workbox.dev.7002ba07.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-ssr",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.9ca3045d335d34ec7100.js",
    "revision": "70086b0af32f6a91a8cc19364fdb2112"
  },
  {
    "url": "/_nuxt/common.e395a740e4d937d51f45.js",
    "revision": "f4c1b6621c461a40e1d03b81fa7ef09d"
  },
  {
    "url": "/_nuxt/layouts/default.db76d73495ede0a7eb4c.js",
    "revision": "d24369b40125f07b9ada4bb1fa39971d"
  },
  {
    "url": "/_nuxt/manifest.3a4866228017c86856af.js",
    "revision": "d2a916d68b43958be8bc8e61aed872f2"
  },
  {
    "url": "/_nuxt/pages/index.78c9c83662a9c69d2547.js",
    "revision": "4fb38fc7bde9f752ea751776391a1985"
  },
  {
    "url": "/_nuxt/pages/login/index.9af7058f6a075c5d1ffc.js",
    "revision": "3df322c92d064dbc7aa79ce7900da63c"
  },
  {
    "url": "/_nuxt/pages/posts/index.ae42b2f9fb2778d63bf6.js",
    "revision": "9d777758fad96dc00bd738a69f82c744"
  },
  {
    "url": "/_nuxt/pages/recipes/_id.7880c8d3f32bbb48ea2d.js",
    "revision": "c8b2f6c6c088e830c597fbccb4b67498"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

