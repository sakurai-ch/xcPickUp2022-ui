import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '2023 どじからす 飛んでけ～',
    title: '2023 どじからす 飛んでけ～',
    // titleTemplate: '2023 Sky grand prix in ASHIO',
    // title: '2023 Sky grand prix in ASHIO',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue2-google-maps.js' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://dojikarasu2022-api.herokuapp.com/api/v1'
    // baseURL: 'http://localhost:8000/api/v1'
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          background: colors.yellow.lighten4,
          bar: colors.brown.lighten3,
          modal: colors.brown.lighten5,
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {},
    vendor: ['vue2-google-maps'],
    transpile: [/^vue2-google-maps($|\/)/]
  },

  env: {
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || ''
  },

  generate: {
    routes: [
      '/driver/1',
      '/driver/2',
      '/driver/3',
      '/driver/4',
      '/driver/5',
      '/driver/6',
      '/driver/7',
      '/driver/8',
      '/driver/9',
      '/driver/10',
      '/driver/11',
      '/driver/12',
      '/driver/13',
      '/driver/14',
      '/driver/15',
      '/driver/16',
      '/driver/17',
      '/driver/18',
      '/driver/19',
      '/driver/20',
    ]
  },

  publicRuntimeConfig: {
    // playerNo: 'JID',
    playerNo: 'No',
    trackerNo: 'Tracker',
  },
}
