import colors from 'vuetify/es5/util/colors'
import en from './src/i18n/en.ts'
import de from './src/i18n/de.ts'

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  router: {
    //base: '/scv-static/'
    base: '/'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - scv-static',
    title: 'scv-static',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.png' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/variables.scss',
    '@/assets/css/main.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: '~/plugins/vue-material-icons.js', mode:'client'},
    {src: '~/plugins/client.js', mode:'client'},
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: [
        '~/assets/variables.scss',
        '~/assets/css/main.scss',
    ],
    treeShake: true,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: 0xcc6600,
          accent: 0xffff44,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: 0xcc6600,
          accent: 0x882200,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    },
    lang: {  // IMPORTANT: set up i18n "scv" labels
        locales: {
            en,
            de,
        },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
