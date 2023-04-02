import { defineNuxtConfig } from '@nuxt/bridge'
import webpack from 'webpack'
export default defineNuxtConfig({
  // Target: https://go.nuxtjs.dev/config-target
  //ssr: false,
  target: 'server',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Doc - Zchool",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'This documentations are created to client of Zchool' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/fav-icon.png' }
    ]
  },



  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    //"~/plugins/axios",
    // { src: '~/plugins/vue-qr.client.ts' },
    { src: '~/plugins/font-awesome.ts' },
    // { src: '~/plugins/vue2-editor.client', ssr: false },
    { src: '~/plugins/axios-accessor.ts' },
    { src: '~/plugins/axios.client.ts' },
    //{ src: '~/plugins/persistedState.client.js' }
    //{ src: '~/plugins/vueAwesomeCountdown.client.ts' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['@pinia/nuxt', { disableVuex: false }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    // '@nuxtjs/pwa',
    '@nuxtjs/auth-next',
  ],

  dynamicForms: {
    theme: 'material',
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/user/css/modern.css'
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.EDFAL_API_URL,
    proxyHeaders: false,
    credentials: false
  },
  publicRuntimeConfig: {
    image_host: process.env.EDFAL_IMAGE_HOST,
    image_user: process.env.EDFAL_IMAGE_USER,
    image_pass: process.env.EDFAL_IMAGE_PASS
  },
  privateRuntimeConfig: {
    url: process.env.EDFAL_API_URL,
    image_url: process.env.EDFAL_IMAGE_URL,
    image_thumbail_url: process.env.EDFAL_IMAGES_THUMBNAIL_URL,
    client_id: process.env.EDFAL_CLIENT_ID,
    client_secret: process.env.EDFAL_CLIENT_SECRET,

  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  // pwa: {
  //   meta: {
  //     name: "Smartschool",
  //     description: "Smartschool for internal schools systems",
  //     author: "edfal.com",
  //     favicon: "/fav-icon.png"
  //   },

  // },

  auth: {
    strategies: {
      local: {
        user: {
          property: 'data',
          autoFetch: true
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 30
        },
        endpoints: {
          login: {
            url: "/oauth/token",
            method: "post",
          },
          refresh: {
            url: "/oauth/token/refresh",
            method: "post",
          },
          logout: {
            url: "/auth/logout",
            method: "post",
          },
          user: {
            url: "/user",
            method: "get"
          }
        },
        token: {
          property: 'access_token',
          required: true,
          type: 'Bearer'
        },
      }
    },
    redirect: {
      login: '/login',
      logout: '/',
      callback: '/login',
      home: '/'
    },
    plugins: ['~/plugins/auth.ts']

  },
  router: {
    middleware: ['auth']
  },
  serverHandlers: [
    { route: '/identifier', handler: '~/server/middleware/auth.ts' }
  ],
  serverMiddleware: [
    { path: '/identifier', handler: '~/server/middleware/auth.ts' }
  ],
  //serverMiddleware: ['~/server-middleware/school-identifier.ts'],
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {


  },
  loading: {
    color: 'blue',
    height: '3px'
  },
  server: {
    port: 8009 // default: 3000
  },
  bridge: {
    nitro: false,
    vite: false,
    meta: true,

  }
})
