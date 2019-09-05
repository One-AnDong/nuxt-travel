const path = require('path')
export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: '仿马蜂窝旅游网站',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: '//at.alicdn.com/t/font_1168872_ehvuah8v57g.css' //全局字体样式
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'assets/stylus/main.styl',
    'assets/stylus/reset.styl'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/element-ui',
    '@/plugins/axios',
    '@/plugins/tool',
    { src: '@/plugins/localStorage', ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios'],
  axios: {
    baseURL: 'http://127.0.0.1:1337' //基础路径
  },
  alias: {
    img: path.join(__dirname, './assets/images/'),
    components: path.join(__dirname, './components'),
    styl: path.join(__dirname, './assets/stylus')
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
