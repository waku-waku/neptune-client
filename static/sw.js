importScripts('/_nuxt/workbox.dev.7002ba07.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "nuxt-ssr",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.b5715372597074443232.js",
    "revision": "00f6a3ef0d5b4397a02f64451022b8ad"
  },
  {
    "url": "/_nuxt/common.e395a740e4d937d51f45.js",
    "revision": "f4c1b6621c461a40e1d03b81fa7ef09d"
  },
  {
    "url": "/_nuxt/layouts/default.a2d826d4de463feec689.js",
    "revision": "64cf6eeb752b0cbe434210da92595a3b"
  },
  {
    "url": "/_nuxt/manifest.66f3be24c77cf95e1838.js",
    "revision": "7aa68aa9e20ab22837f521312ac9142d"
  },
  {
    "url": "/_nuxt/pages/index.7bfa22bf6cc7e1eeabd8.js",
    "revision": "b849323ee6a64b096dcaa4ccd852362d"
  },
  {
    "url": "/_nuxt/pages/login/index.7b1e70f3844d6f115ebd.js",
    "revision": "606829cab583b85cdc7f06ba8a1c2e03"
  },
  {
    "url": "/_nuxt/pages/posts/index.7226c08fd69f925ec19e.js",
    "revision": "130f507fa5b9ff861e787c2409dc7171"
  },
  {
    "url": "/_nuxt/pages/recipes/_id.35934f66377d84777db1.js",
    "revision": "a4c349f38546378f7e2f2fe2920ae224"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

