export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'phones-contacts',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/firebase.js',
    '@/plugins/sorter.js',
    { src: '@/plugins/phone-mask-input.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    '~/components',
    '~/components/HeaderPanel',
    '~/components/Contact',
    { path: '~/components/UI', prefix: 'UI' },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxt/postcss8',
    '@nuxtjs/fontawesome',
    '@nuxtjs/style-resources',
    '@nuxt/components',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyAhORnOZyWUkMvKXSZpbP27YneRTr_C4f4',
          authDomain: 'contacts-e1491.firebaseapp.com',
          projectId: 'contacts-e1491',
          storageBucket: 'contacts-e1491.appspot.com',
          messagingSenderId: '119542997896',
          appId: '1:119542997896:web:24195bfc29b841c506903d',
        },
        services: { firestore: true, functions: true, storage: true },
        lazy: true,
        firestore: {
          enablePersistence: true,
        },
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  fontawesome: {
    icons: {
      regular: true,
      brands: true,
      solid: true,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  router: {
    '/': { middleware: ['sorter'] },
  },
}
