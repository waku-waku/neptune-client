module.exports = {
  /*
  ** Headers of the page
  */
  mode: 'spa',
  head: {
    title: 'nuxt-ssr',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/reset.css' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  // loading: { color: '#3B8070' },
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: 'white',
    background: '#188269'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Import outside module
    */
    vendor: ['axios'],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules = config.module.rules.map((rule) => {
        if (rule.loader === 'babel-loader') {
          rule.exclude = /node_modules|vendor/
        }
        return rule
      })
    }
  },
  // plugins: [],
  // router: {
  //   middleware: []
  // },
  manifest: {
    name: 'Gourmet',
    description: 'Gourmet clone built with Nuxt.js',
    theme_color: '#188269'
  },
  modules: [
    '@nuxtjs/pwa'
  ],
  workbox: {
    dev: true,
  },
  render: {
    static: {
      maxAge: '1y',
      setHeaders (res, path) {
        if (path.includes('sw.js')) {
          res.setHeader('Cache-Control', 'public, max-age=0')
        }
      }
    }
  }
}
